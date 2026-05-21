import {
  CheckCircle2,
  ClipboardList,
  FileText,
  Mic,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useState } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const PENDING_ITEMS = [
  { id: 1, label: "Visit - Uwimana Claudine", icon: ClipboardList },
  { id: 2, label: "Patient Form - Moussa Abdou", icon: FileText },
  { id: 3, label: "Voice Recording - Aïssatou", icon: Mic },
];

const COMPLETED_ITEMS = [
  { id: 1, label: "Visit - Amina Diallo", synced: "Today 08:15" },
  { id: 2, label: "Patient Form - Kofi Mensah", synced: "Today 07:50" },
];

export function SyncScreen() {
  const isOnline = useOnlineStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  const handleSync = () => {
    if (!isOnline || isSyncing) return;
    setIsSyncing(true);
    setSyncDone(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncDone(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-vospital-deep px-4 pt-4 pb-4 flex items-center justify-between">
        <h1 className="text-white font-bold text-xl">Sync Center</h1>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline ? "bg-[#9BE28A] animate-pulse-dot" : "bg-red-400"
            }`}
          />
          <span
            className={`text-xs font-bold tracking-widest ${
              isOnline ? "text-[#9BE28A]" : "text-red-400"
            }`}
          >
            {isOnline ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 pt-4 pb-6 space-y-5 animate-fade-in">
        {/* Last sync time */}
        <p className="text-xs text-gray-500 font-medium">
          Last synced: Today 09:30
        </p>

        {/* Sync success banner */}
        {syncDone && (
          <div className="bg-green-50 border-y border-r border-green-200 border-l-4 border-l-green-600 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm font-bold text-green-700">
              All data synced successfully!
            </p>
          </div>
        )}

        {/* Pending section */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">
            Pending ({PENDING_ITEMS.length})
          </p>
          <div className="space-y-2">
            {PENDING_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-card p-4 flex items-center justify-between border-y border-r border-gray-100 border-l-4 border-l-amber-400"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <Icon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500">Pending upload</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sync Now button */}
        <button
          type="button"
          onClick={handleSync}
          disabled={!isOnline || isSyncing}
          className={`w-full min-h-[52px] py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            isOnline && !isSyncing
              ? "bg-vospital-primary text-white hover:opacity-90 active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isSyncing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Sync Now
            </>
          )}
        </button>

        {/* Completed section */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">Completed</p>
          <div className="space-y-2">
            {COMPLETED_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-green-50 rounded-xl shadow-card p-4 flex items-center justify-between border-y border-r border-green-200 border-l-4 border-l-green-600"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      Synced {item.synced}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
