"use client";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code" | "new-password" | "success">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "request" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send reset code");
      }
      setStep("code");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send reset code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, action: "verify" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid verification code");
      }
      setStep("new-password");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password, action: "reset" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to reset password");
      }
      setStep("success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={
        step === "email"
          ? "Reset Password"
          : step === "code"
          ? "Check Your Email"
          : step === "new-password"
          ? "Create New Password"
          : "Password Reset Complete"
      }
      subtitle={
        step === "email"
          ? "Enter your email and we'll send you a reset code"
          : step === "code"
          ? `We sent a 6-digit code to ${email}`
          : step === "new-password"
          ? "Choose a strong password for your account"
          : "Your password has been successfully reset"
      }
      footer={
        step !== "success" ? (
          <Link href="/login" className="text-brand-500 hover:text-brand-400 font-medium inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Back to sign in
          </Link>
        ) : (
          <Link href="/login" className="text-brand-500 hover:text-brand-400 font-medium">
            Sign in with your new password
          </Link>
        )
      }
    >
      {step === "email" && (
        <form onSubmit={handleSendCode} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" isFullWidth size="lg" isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Send Reset Code
          </Button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={handleVerifyCode} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Enter 6-digit code</label>
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full text-center text-3xl font-mono tracking-[0.5em] px-4 py-4 rounded-2xl bg-surface-elevated border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              placeholder="000000"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" isFullWidth size="lg" isLoading={isLoading}>
            Verify Code
          </Button>
          <button
            type="button"
            onClick={handleSendCode}
            className="w-full text-center text-sm text-brand-500 hover:text-brand-400"
          >
            Resend code
          </button>
        </form>
      )}

      {step === "new-password" && (
        <form onSubmit={handleResetPassword} className="space-y-5">
          <Input
            label="New Password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Type your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" isFullWidth size="lg" isLoading={isLoading}>
            Reset Password
          </Button>
        </form>
      )}

      {step === "success" && (
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="text-text-secondary mb-6">Your password has been updated successfully.</p>
          <Link href="/login">
            <Button isFullWidth size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Sign In
            </Button>
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}