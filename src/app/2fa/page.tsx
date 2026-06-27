"use client";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Shield, Smartphone, KeyRound, CheckCircle, Copy, ArrowRight } from "lucide-react";

export default function TwoFactorPage() {
  const [activeTab, setActiveTab] = useState("authenticator");
  const [isSetup, setIsSetup] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const setupKey = "DROPAI-2FA-KEY-EXAMPLE";
  const qrUrl = `otpauth://totp/DropAI:user@example.com?secret=${setupKey}&issuer=DropAI`;

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(setupKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleVerify2FA = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) return;
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: fullCode, action: isSetup ? "setup" : "verify" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid code");
      }
      setIsVerified(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid code");
      setCode(["", "", "", "", "", ""]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <AuthLayout
        title="2FA Enabled ✅"
        subtitle="Two-factor authentication is now active on your account"
        footer={
          <Link href="/dashboard" className="text-brand-500 hover:text-brand-400 font-medium">
            Go to Dashboard
          </Link>
        }
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="text-text-secondary mb-6">
            Your account is now more secure. Keep your recovery codes in a safe place.
          </p>
          <Link href="/dashboard">
            <Button isFullWidth size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Two-Factor Authentication"
      subtitle="Add an extra layer of security to your account"
      footer={
        <Link href="/login" className="text-brand-500 hover:text-brand-400 font-medium">
          Back to sign in
        </Link>
      }
    >
      <Tabs
        tabs={[
          { id: "authenticator", label: "Authenticator App", icon: <Smartphone className="w-4 h-4" /> },
          { id: "recovery", label: "Recovery Code", icon: <KeyRound className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="pills"
        className="mb-6"
      />

      <TabPanel tabId="authenticator" activeTab={activeTab}>
        {!isSetup ? (
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-brand flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Set Up 2FA</h3>
              <p className="text-sm text-text-muted mb-4">
                Use an authenticator app like Google Authenticator or Authy to scan this code.
              </p>

              {/* Simulated QR code */}
              <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-4 mb-4 flex items-center justify-center">
                <div className="grid grid-cols-11 gap-0.5">
                  {Array.from({ length: 121 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-sm ${
                        Math.random() > 0.5 ? "bg-black" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-4">
                <code className="text-xs bg-surface-100 dark:bg-surface-800 px-3 py-1.5 rounded-lg font-mono">
                  {setupKey}
                </code>
                <button
                  onClick={handleCopyKey}
                  className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                >
                  <Copy className="w-4 h-4 text-text-muted" />
                </button>
              </div>
              {copied && <p className="text-xs text-emerald-500">Copied to clipboard!</p>}
            </div>

            <Button isFullWidth size="lg" onClick={() => setIsSetup(true)}>
              I&apos;ve Scanned the Code
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-text-secondary text-center">
              Enter the 6-digit code from your authenticator app
            </p>
            <div className="flex justify-center gap-2">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newCode = [...code];
                    newCode[i] = e.target.value.replace(/\D/g, "").slice(0, 1);
                    setCode(newCode);
                    if (e.target.value && i < 5) inputRefs.current[i + 1]?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !code[i] && i > 0) {
                      inputRefs.current[i - 1]?.focus();
                    }
                  }}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-surface-elevated border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                  autoFocus={i === 0}
                />
              ))}
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button
              isFullWidth
              size="lg"
              onClick={handleVerify2FA}
              isLoading={isLoading}
              disabled={code.some((d) => !d)}
            >
              Verify & Enable
            </Button>
          </div>
        )}
      </TabPanel>

      <TabPanel tabId="recovery" activeTab={activeTab}>
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 text-center">
            <KeyRound className="w-12 h-12 mx-auto text-amber-400 mb-4" />
            <h3 className="font-semibold mb-2">Recovery Code</h3>
            <p className="text-sm text-text-muted mb-4">
              Lost access to your authenticator app? Use one of your recovery codes.
            </p>
          </div>
          <Input
            label="Recovery Code"
            placeholder="XXXXX-XXXXX"
            className="text-center font-mono tracking-wider"
          />
          <Button isFullWidth size="lg">
            Verify Recovery Code
          </Button>
        </div>
      </TabPanel>
    </AuthLayout>
  );
}