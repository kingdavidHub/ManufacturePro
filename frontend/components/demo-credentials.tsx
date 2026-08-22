"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Users } from "lucide-react";

interface DemoUser {
  email: string;
  password: string;
  role: string;
  label: string;
  color: string;
}

const demoUsers: DemoUser[] = [
  {
    email: "production@factory.com",
    password: "password123",
    role: "PRODUCTION_MANAGER",
    label: "Production Manager",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    email: "warehouse.swift@factory.com",
    password: "password123",
    role: "WAREHOUSE_MANAGER",
    label: "Warehouse Mgr (SwiftStock)",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  },
  {
    email: "warehouse.prime@factory.com",
    password: "password123",
    role: "WAREHOUSE_MANAGER",
    label: "Warehouse Mgr (PrimeStorage)",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  },
  {
    email: "warehouse.nextgen@factory.com",
    password: "password123",
    role: "WAREHOUSE_MANAGER",
    label: "Warehouse Mgr (NextGen)",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  },
  {
    email: "sales@factory.com",
    password: "password123",
    role: "SALES_REP",
    label: "Sales Representative",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  },
];

interface DemoCredentialsProps {
  onFill: (email: string, password: string) => void;
}

export function DemoCredentials({ onFill }: DemoCredentialsProps) {
  const [expanded, setExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/30 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Demo Credentials</span>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-2">
          <p className="text-xs text-muted-foreground mb-3">
            Click any row to auto-fill the login form. All accounts use password{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              password123
            </code>
          </p>
          {demoUsers.map((user, i) => (
            <button
              key={user.email}
              type="button"
              onClick={() => onFill(user.email, user.password)}
              className="flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-left text-sm transition-all hover:border-primary/40 hover:bg-accent/50 hover:shadow-sm active:scale-[0.99]"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${user.color}`}
                  >
                    {user.label}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(user.email, i);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    handleCopy(user.email, i);
                  }
                }}
                className="shrink-0 rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Copy email"
              >
                {copiedIndex === i ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
