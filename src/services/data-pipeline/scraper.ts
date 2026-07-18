// ============================================================
// Orbit Data Pipeline — Puppeteer Web Scraper
// Scrapes Shopify products, TikTok trends, Facebook Ad Library
// Uses Puppeteer for JavaScript-rendered pages
// ============================================================

import type { ScrapedShopifyProduct, ScrapedAdCreative } from './types';

let puppeteerModule: typeof import('puppeteer') | null = null;

async function getPuppeteer() {
  if (puppeteerModule) return puppeteerModule;
  try {
    puppeteerModule = await import('puppeteer');
    return puppeteerModule;
  } catch {
    console.warn('[Scraper] Puppeteer not installed — using lightweight fallback');
    return null;
  }
}

// ── Shopify Product Scraping ────────────────────────────────

export async function scrapeShopifyProduct(
  productUrl: string
): Promise<ScrapedShopifyProduct | null> {
  // Try structured JSON API first (fast, no browser needed)
  try {
    const jsonUrl = productUrl.replace(/\/$/, '') + '.json';
    const res = await fetch(jsonUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Orbit-Dropship-Research/1.0',
      },
    });
    if (res.ok) {
      const data = await res.json();
      const p = data.product;
      if (p) {
        return {
          title: p.title || '', price: parseFloat(p.price) / 100 || 0,
          compareAtPrice: p.compare_at_price ? parseFloat(p.compare_at_price) / 100 : undefined,
          description: p.body_html || '',
          images: (p.images || []).map((img: { src: string }) => img.src),
          vendor: p.vendor || '', productType: p.product_type || '',
          tags: (p.tags || []).filter(Boolean), url: productUrl,
          variants: (p.variants || []).map((v: { title: string; price: string; available: boolean }) => ({
            title: v.title, price: parseFloat(v.price) / 100, available: v.available,
          })),
        };
      }
    }
  } catch { /* fall through to Puppeteer */ }

  // Fallback: Puppeteer for JS-rendered pages
  const puppeteer = await getPuppeteer();
  if (!puppeteer) return null;

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
    const page = await browser.newPage();
    await page.setUserAgent('Orbit-Dropship-Research/1.0');
    await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    const product = await page.evaluate(() => {
      const title = (document.querySelector('meta[property="og:title"]') as HTMLMetaElement)?.content
        || document.querySelector('h1')?.textContent || '';
      const desc = (document.querySelector('meta[property="og:description"]') as HTMLMetaElement)?.content || '';
      const image = (document.querySelector('meta[property="og:image"]') as HTMLMetaElement)?.content || '';
      const priceEl = document.querySelector('[data-price], .price, .product-price');
      const priceText = priceEl?.textContent?.replace(/[^0-9.]/g, '') || '0';
      return { title, description: desc, images: image ? [image] : [], price: parseFloat(priceText) || 0 };
    });

    return { ...product, vendor: '', productType: '', tags: [], url: productUrl };
  } catch (err) {
    console.error('[Scraper] Puppeteer Shopify scrape failed:', err);
    return null;
  } finally {
    if (browser) await browser.close();
  }
}

// ── Shopify Store Discovery ─────────────────────────────────

export async function discoverShopifyStoreProducts(
  storeUrl: string, maxProducts = 20
): Promise<ScrapedShopifyProduct[]> {
  try {
    const cleanUrl = storeUrl.replace(/\/$/, '');
    const res = await fetch(`${cleanUrl}/collections/all/products.json?limit=${maxProducts}`, {
      headers: { Accept: 'application/json', 'User-Agent': 'Orbit-Dropship-Research/1.0' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || []).map((p: Record<string, unknown>) => ({
      title: String(p.title || ''), price: parseFloat(String((p.variants as Array<{price: string}>)?.[0]?.price || '0')),
      compareAtPrice: (p.variants as Array<{compare_at_price: string}>)?.[0]?.compare_at_price
        ? parseFloat(String((p.variants as Array<{compare_at_price: string}>)?.[0]?.compare_at_price)) : undefined,
      description: String(p.body_html || ''),
      images: ((p.images || []) as {src: string}[]).map(img => img.src),
      vendor: String(p.vendor || ''), productType: String(p.product_type || ''),
      tags: ((p.tags || []) as string[]).filter(Boolean),
      url: `${cleanUrl}/products/${p.handle}`,
    }));
  } catch (err) {
    console.error('[Scraper] Store discovery failed:', err);
    return [];
  }
}

// ── Competitor Store Detection ──────────────────────────────

export interface CompetitorStoreInfo {
  name: string; url: string;
  platform: 'shopify' | 'woocommerce' | 'custom';
  productCount: number; themeName?: string; installedApps?: string[];
}

export async function detectStorePlatform(storeUrl: string): Promise<CompetitorStoreInfo | null> {
  try {
    const res = await fetch(storeUrl, { headers: { 'User-Agent': 'Orbit-Dropship-Research/1.0' } });
    if (!res.ok) return null;
    const html = await res.text();

    let platform: CompetitorStoreInfo['platform'] = 'custom';
    let themeName: string | undefined;
    const apps: string[] = [];

    if (html.includes('cdn.shopify.com') || html.includes('Shopify.shop')) {
      platform = 'shopify';
      const m = html.match(/Shopify\.theme\s*=\s*\{[^}]*"name":\s*"([^"]+)"/);
      themeName = m?.[1];

      // Detect apps from script sources
      for (const m of html.matchAll(/src="https:\/\/cdn\.shopify\.com\/[^"]*\/([^"/]+)\/[^"]*"/g)) {
        apps.push(m[1]);
      }
    } else if (html.includes('woocommerce') || html.includes('wp-content/plugins/woocommerce')) {
      platform = 'woocommerce';
    }

    const siteName = html.match(/<meta[^>]*property="og:site_name"[^>]*content="([^"]+)"/)?.[1]
      || html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim()
      || new URL(storeUrl).hostname.replace('www.', '');

    // Product count from sitemap
    let productCount = 0;
    if (platform === 'shopify') {
      try {
        const sr = await fetch(`${storeUrl.replace(/\/$/, '')}/sitemap_products_1.xml`);
        if (sr.ok) {
          const txt = await sr.text();
          productCount = (txt.match(/<url>/g) || []).length;
        }
      } catch { /* ignore */ }
    }

    return { name: siteName, url: storeUrl, platform, productCount, themeName, installedApps: [...new Set(apps)].slice(0, 10) };
  } catch (err) {
    console.error('[Scraper] Store detection failed:', err);
    return null;
  }
}

// ── Ad Scraping (Facebook Ad Library via Puppeteer) ─────────

export async function scrapeFacebookAdLibrary(
  query: string, maxAds = 20
): Promise<ScrapedAdCreative[]> {
  const puppeteer = await getPuppeteer();
  if (!puppeteer) {
    console.warn('[Scraper] Puppeteer not available for ad scraping');
    return [];
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Facebook Ad Library public page
    const adLibraryUrl = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=${encodeURIComponent(query)}&search_type=keyword_unordered&media_type=all`;
    await page.goto(adLibraryUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for results to load
    await page.waitForSelector('div[role="article"]', { timeout: 15000 }).catch(() => {});

    const ads: ScrapedAdCreative[] = await page.evaluate((max) => {
      const results: Array<Record<string, unknown>> = [];
      const cards = document.querySelectorAll('div[role="article"]');
      cards.forEach((card, i) => {
        if (i >= max) return;
        const text = card.textContent || '';
        const brand = card.querySelector('a[href*="/page/"]')?.textContent || '';
        const link = card.querySelector('a[href*="l.facebook.com"]')?.getAttribute('href') || '';
        results.push({
          brandName: brand || 'Unknown',
          headline: text.slice(0, 120),
          description: text.slice(0, 300),
          landingUrl: link,
          adType: 'image',
          platform: 'facebook',
        });
      });
      return results as unknown as ScrapedAdCreative[];
    }, maxAds);

    return ads;
  } catch (err) {
    console.error('[Scraper] Ad library scrape failed:', err);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

// ── TikTok Trending Products ────────────────────────────────

export async function scrapeTikTokTrending(
  category?: string, maxResults = 20
): Promise<ScrapedAdCreative[]> {
  const puppeteer = await getPuppeteer();
  if (!puppeteer) {
    console.warn('[Scraper] Puppeteer not available for TikTok scraping');
    return [];
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    const searchQuery = category ? `${category} trending products` : 'trending products';
    await page.goto(`https://www.tiktok.com/search?q=${encodeURIComponent(searchQuery)}`, {
      waitUntil: 'networkidle2', timeout: 30000,
    });

    await page.waitForSelector('div[data-e2e="search_video-item"]', { timeout: 15000 }).catch(() => {});

    const ads = await page.evaluate((max) => {
      const results: Array<Record<string, unknown>> = [];
      const items = document.querySelectorAll('div[data-e2e="search_video-item"]');
      items.forEach((item, i) => {
        if (i >= max) return;
        const desc = item.querySelector('div[data-e2e="video-desc"]')?.textContent || '';
        const author = item.querySelector('p[data-e2e="video-author-uniqueid"]')?.textContent || '';
        const link = item.querySelector('a')?.getAttribute('href') || '';
        results.push({
          brandName: author || 'TikTok Creator',
          headline: desc.slice(0, 120),
          description: desc.slice(0, 300),
          landingUrl: link ? `https://www.tiktok.com${link}` : '',
          adType: 'video',
          platform: 'tiktok',
        });
      });
      return results as unknown as ScrapedAdCreative[];
    }, maxResults);

    return ads;
  } catch (err) {
    console.error('[Scraper] TikTok scrape failed:', err);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}
