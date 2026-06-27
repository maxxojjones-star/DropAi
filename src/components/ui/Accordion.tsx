"use client";

import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

interface AccordionItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export function Accordion({
  items,
  className,
  allowMultiple = false,
  defaultOpen = [],
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="glass rounded-2xl overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-brand-subtle flex items-center justify-center">
                    <Icon className="w-4 h-4 text-brand-500" />
                  </div>
                )}
                <span className="font-medium text-sm">{item.title}</span>
              </div>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-text-muted" />
              ) : (
                <ChevronDown className="w-4 h-4 text-text-muted" />
              )}
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-96 pb-4 px-4" : "max-h-0"
              )}
            >
              <div className="text-sm text-text-secondary">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface StepperProps {
  steps: { label: string; description?: string }[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  isCompleted &&
                    "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25",
                  isCurrent &&
                    "bg-brand-500 text-white shadow-lg shadow-brand-500/25 ring-4 ring-brand-500/20",
                  !isCompleted &&
                    !isCurrent &&
                    "bg-surface-100 dark:bg-surface-800 text-text-muted"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <p
                className={cn(
                  "text-xs mt-2 font-medium whitespace-nowrap",
                  isCurrent && "text-brand-500",
                  isCompleted && "text-emerald-500",
                  !isCompleted && !isCurrent && "text-text-muted"
                )}
              >
                {step.label}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 rounded-full transition-all duration-300",
                  isCompleted
                    ? "bg-emerald-500"
                    : "bg-surface-200 dark:bg-surface-700"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}