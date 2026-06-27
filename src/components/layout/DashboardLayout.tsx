"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useSidebarStore } from "@/lib/stores";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function DashboardLayout({ children, title, breadcrumbs }: DashboardLayoutProps) {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-surface-bg">
      <Sidebar />
      <main
        className={cn(
          "transition-all duration-300 ease-smooth min-h-screen",
          isCollapsed ? "lg:ml-[72px]" : "lg:ml-[280px]"
        )}
      >
        <Navbar title={title} breadcrumbs={breadcrumbs} />
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}