import { useOnlineStatus } from "../hooks/useOnlineStatus";

export function StatusBar() {
  const isOnline = useOnlineStatus();

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-vospital-deep">
      <span className="text-white font-bold text-lg tracking-wide">
        Vospital
      </span>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline
                ? "bg-vospital-status-green animate-pulse-dot"
                : "bg-red-400"
            }`}
          />
          <span
            className={`text-xs font-bold tracking-widest ${
              isOnline ? "text-vospital-status-green" : "text-red-400"
            }`}
          >
            {isOnline ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
        <span className="text-white/50 text-[10px]">Last sync: 14 min ago</span>
      </div>
    </div>
  );
}
