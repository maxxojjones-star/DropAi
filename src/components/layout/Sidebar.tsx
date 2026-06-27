"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/lib/stores";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  TrendingUp,
  Users,
  Settings,
  Store,
  Sparkles,
  BarChart3,
  Bot,
  Megaphone,
  Globe,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  HelpCircle,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { label: "AI Product Research", icon: Sparkles, href: "/products/research" },
      { label: "My Products", icon: Package, href: "/products" },
      { label: "Stores", icon: Store, href: "/stores" },
    ],
  },
  {
    section: "Sales & Marketing",
    items: [
      { label: "Orders", icon: ShoppingBag, href: "/orders" },
      { label: "Marketing Center", icon: Megaphone, href: "/marketing" },
      { label: "Analytics", icon: BarChart3, href: "/analytics" },
    ],
  },
  {
    section: "Tools",
    items: [
      { label: "AI Automations", icon: Bot, href: "/automation" },
      { label: "Marketplace", icon: Globe, href: "/marketplace" },
      { label: "Customers", icon: Users, href: "/customers" },
      { label: "Trends", icon: TrendingUp, href: "/analytics/trends" },
    ],
  },
  {
    section: "Settings",
    items: [
      { label: "Settings", icon: Settings, href: "/settings" },
    ],
  },
];

export function Sidebar() {
  const { isCollapsed, toggleCollapsed } = useSidebarStore();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden",
          "transition-opacity duration-300"
        )}
        onClick={() => useSidebarStore.getState().setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen flex flex-col",
          "bg-surface-elevated/80 backdrop-blur-xl border-r border-border",
          "transition-all duration-300 ease-smooth",
          isCollapsed ? "w-[72px]" : "w-[280px]"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-border",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {isCollapsed ? (
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold gradient-text">DropAI</h1>
                  <p className="text-[10px] text-text-muted">AI Dropshipping OS</p>
                </div>
              </div>
            </>
          )}
          <button
            onClick={toggleCollapsed}
            className={cn(
              "p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors",
              "text-text-muted hover:text-text-primary",
              isCollapsed && "hidden"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Expand button when collapsed */}
        {isCollapsed && (
          <button
            onClick={toggleCollapsed}
            className="mx-auto mt-3 p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-text-muted hover:text-text-primary transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-4 space-y-6">
          {navigation.map((section) => (
            <div key={section.section}>
              {!isCollapsed && (
                <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                  {section.section}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname?.startsWith(item.href);
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                          "text-text-secondary hover:text-text-primary hover:bg-surface-100 dark:hover:bg-surface-800",
                          isActive &&
                            "bg-gradient-brand-subtle text-brand-500 dark:text-brand-400 font-medium shadow-inner-glow"
                        )}
                      >
                        <item.icon className={cn(
                          "w-5 h-5 flex-shrink-0",
                          isCollapsed ? "mx-auto" : ""
                        )} />
                        {!isCollapsed && (
                          <span className="text-sm">{item.label}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Upgrade / Profile */}
        <div className={cn(
          "p-3 border-t border-border",
          isCollapsed && "flex justify-center"
        )}>
          {isCollapsed ? (
            <Avatar name="John Doe" size="sm" status="online" />
          ) : (
            <div className="glass rounded-2xl p-3">
              <div className="flex items-center gap-3">
                <Avatar name="John Doe" size="md" status="online" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-text-muted truncate">Pro Plan</p>
                </div>
                <Badge variant="premium" size="sm">PRO</Badge>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}