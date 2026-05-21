import { Home, Mic, RefreshCw, Stethoscope, Users } from "lucide-react";

export type TabKey = "home" | "patients" | "visit" | "consult" | "sync";

interface Tab {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const TABS: Tab[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "patients", label: "Patients", icon: Users },
  { key: "visit", label: "Visit", icon: Stethoscope },
  { key: "consult", label: "Consult", icon: Mic },
  { key: "sync", label: "Sync", icon: RefreshCw, badge: 4 },
];

interface BottomNavProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200 z-50 safe-bottom">
      <div className="flex items-stretch h-16">
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          const Icon = tab.icon;
          return (
            <button
              type="button"
              key={tab.key}
              data-ocid={`nav.${tab.key}.tab`}
              onClick={() => onChange(tab.key)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative min-h-[48px] transition-colors ${
                isActive ? "text-vospital-primary" : "text-gray-500"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-vospital-primary rounded-b-full" />
              )}
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-vospital-urgent text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold ${isActive ? "text-vospital-primary" : "text-gray-500"}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
