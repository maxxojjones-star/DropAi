"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, type ReactNode } from "react";

interface TabsProps {
  tabs: { id: string; label: string; icon?: ReactNode; badge?: ReactNode }[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  variant?: "default" | "pills" | "underline";
  children?: ReactNode;
}

export function Tabs({
  tabs,
  activeTab: controlledTab,
  onTabChange,
  className,
  variant = "default",
  children,
}: TabsProps) {
  const [internalTab, setInternalTab] = useState(tabs[0]?.id);
  const activeTab = controlledTab ?? internalTab;

  const handleChange = (tabId: string) => {
    setInternalTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={className}>
      <div
        className={cn(
          "flex gap-1",
          variant === "underline" && "border-b border-border",
          variant === "pills" && "p-1 glass rounded-2xl inline-flex",
          variant === "default" && "border-b border-border"
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap",
              variant === "default" &&
                (activeTab === tab.id
                  ? "text-brand-500 border-b-2 border-brand-500 -mb-[1px]"
                  : "text-text-muted hover:text-text-primary"),
              variant === "pills" &&
                (activeTab === tab.id
                  ? "bg-surface-elevated text-text-primary shadow-sm rounded-xl"
                  : "text-text-muted hover:text-text-primary rounded-xl"),
              variant === "underline" &&
                (activeTab === tab.id
                  ? "text-brand-500 border-b-2 border-brand-500 -mb-[1px]"
                  : "text-text-muted hover:text-text-primary")
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}

interface TabPanelProps {
  tabId: string;
  activeTab?: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ tabId, activeTab, children, className }: TabPanelProps) {
  if (tabId !== activeTab) return null;
  return <div className={cn("pt-4", className)}>{children}</div>;
}