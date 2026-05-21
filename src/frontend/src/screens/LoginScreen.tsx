import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface LoginScreenProps {
  onLogin: () => void;
  onCreateAccount: () => void;
}

export function LoginScreen({ onLogin, onCreateAccount }: LoginScreenProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [view, setView] = useState<"options" | "web2form">("options");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const handleWeb3Login = () => {
    toast("Connecting to Internet Identity...");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-50 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#1B5E20] animate-spin"
            data-ocid="login.loading_state"
          />
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center justify-end px-4 pt-4 pb-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline ? "bg-green-500 animate-pulse" : "bg-red-400"
            }`}
          />
          <span
            className={`text-xs font-bold tracking-widest ${
              isOnline ? "text-green-600" : "text-red-500"
            }`}
          >
            {isOnline ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
      </div>

      {/* Hero area */}
      <div className="flex flex-col items-center pt-8 pb-10 px-6">
        <img
          src="/assets/generated/vospital-logo-transparent.dim_200x200.png"
          alt="Vospital Logo"
          className="w-20 h-20 mb-4 object-contain"
        />
        <h1 className="text-3xl font-extrabold text-[#1B5E20] tracking-tight mb-1">
          Vospital
        </h1>
        <p className="text-sm font-semibold text-green-600 text-center">
          AI-Assisted Primary Healthcare
        </p>
      </div>

      {/* Auth section */}
      <div className="flex-1 px-6">
        {view === "options" ? (
          <div className="flex flex-col gap-4">
            <button
              type="button"
              data-ocid="login.primary_button"
              onClick={() => setView("web2form")}
              style={{ minHeight: "52px" }}
              className="w-full rounded-xl bg-[#1B5E20] text-white font-bold text-base shadow-md active:scale-[0.98] transition-transform"
            >
              Login with Web2
            </button>

            <button
              type="button"
              data-ocid="login.secondary_button"
              onClick={handleWeb3Login}
              style={{ minHeight: "52px" }}
              className="w-full rounded-xl border-2 border-[#1B5E20] text-[#1B5E20] bg-white font-bold text-base active:scale-[0.98] transition-transform"
            >
              Login with Web3 / ICP
            </button>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                data-ocid="login.link"
                onClick={onCreateAccount}
                className="text-[#1B5E20] font-semibold text-sm underline underline-offset-2"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Back arrow */}
            <button
              type="button"
              data-ocid="login.cancel_button"
              onClick={() => setView("options")}
              className="flex items-center gap-2 text-[#1B5E20] font-semibold mb-2 -ml-1"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-sm font-semibold text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                data-ocid="login.input"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-xl border-2 border-gray-200 focus:border-[#1B5E20] outline-none px-4 py-3 text-base bg-white text-gray-800 placeholder-gray-400 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                data-ocid="login.textarea"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border-2 border-gray-200 focus:border-[#1B5E20] outline-none px-4 py-3 text-base bg-white text-gray-800 placeholder-gray-400 transition-colors"
              />
            </div>

            <button
              type="button"
              data-ocid="login.submit_button"
              onClick={handleLogin}
              disabled={isLoading}
              style={{ minHeight: "52px" }}
              className="w-full rounded-xl bg-[#1B5E20] text-white font-bold text-base shadow-md mt-2 active:scale-[0.98] transition-transform disabled:opacity-60"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-6 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
