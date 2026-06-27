"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore, useNotificationStore, useUIStore } from "@/lib/stores";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Search,
  Bell,
  Command,
  Sun,
  Moon,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

interface NavbarProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Navbar({ title, breadcrumbs }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const { unreadCount } = useNotificationStore();
  const { setCommandPaletteOpen, setMobileOpen } = useUIStore();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6 bg-surface-bg/80 backdrop-blur-xl border-b border-border">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <Menu className="w-5 h-5 text-text-secondary" />
          </button>

          {/* Title & Breadcrumbs */}
          <div>
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <div className="flex items-center gap-2 text-xs text-text-muted">
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <ChevronDown className="w-3 h-3 -rotate-90" />}
                    <span className={i === breadcrumbs.length - 1 ? "text-text-primary font-medium" : ""}>
                      {crumb.label}
                    </span>
                  </span>
                ))}
              </div>
            ) : title && (
              <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className={cn(
              "hidden md:flex items-center gap-2 px-3 py-2 rounded-xl",
              "bg-surface-elevated border border-border",
              "text-text-muted text-sm",
              "hover:border-brand-500/30 transition-all duration-200",
              "min-w-[200px]"
            )}
          >
            <Search className="w-4 h-4" />
            <span>Search anything...</span>
            <kbd className="ml-auto px-1.5 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-[10px] font-mono text-text-muted border border-border">
              ⌘K
            </kbd>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors text-text-secondary hover:text-text-primary"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors text-text-secondary hover:text-text-primary">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Theme toggle / Avatar */}
          <Avatar name="John Doe" size="sm" className="ring-2 ring-brand-500/30" />
        </div>
      </div>
    </header>
  );
}