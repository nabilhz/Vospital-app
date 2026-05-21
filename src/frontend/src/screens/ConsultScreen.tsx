import { Mic } from "lucide-react";
import { useState } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg z-50 animate-fade-in">
      {message}
    </div>
  );
}

export function ConsultScreen() {
  const isOnline = useOnlineStatus();
  const [isRecording, setIsRecording] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-vospital-deep px-4 pt-4 pb-4 flex items-center justify-between">
        <h1 className="text-white font-bold text-xl">Voice Consultation</h1>
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

      {/* Body */}
      <div className="flex-1 px-6 pt-10 pb-6 flex flex-col items-center">
        {/* Mic button */}
        <div className="relative flex items-center justify-center mb-8">
          {isRecording && (
            <>
              <span className="absolute w-44 h-44 rounded-full bg-[#1B5E20]/20 animate-ping" />
              <span className="absolute w-52 h-52 rounded-full bg-[#1B5E20]/10 animate-ping [animation-delay:0.3s]" />
            </>
          )}
          <button
            type="button"
            data-ocid="consult.mic.primary_button"
            onClick={() => setIsRecording((v) => !v)}
            className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: "#1B5E20" }}
          >
            <Mic className="w-16 h-16 text-white" strokeWidth={1.5} />
          </button>
        </div>

        {/* Status text */}
        <p className="text-sm font-semibold text-gray-600 mb-8 h-5">
          {isRecording ? "Listening..." : "Tap microphone to start"}
        </p>

        {/* Transcript box */}
        <div className="w-full rounded-2xl bg-vospital-pale border border-vospital-primary/20 p-4 min-h-[130px] flex items-start">
          <p className="text-sm text-gray-400 italic">
            Transcript will appear here...
          </p>
        </div>

        <div className="flex-1" />

        {/* Bottom buttons */}
        <div className="w-full space-y-3 mt-8">
          <button
            type="button"
            data-ocid="consult.end_consultation.button"
            onClick={() => showToast("Consultation ended (placeholder)")}
            className="w-full min-h-[52px] py-4 rounded-2xl font-bold text-white text-base active:scale-[0.98] transition-transform"
            style={{ backgroundColor: "#C62828" }}
          >
            End Consultation
          </button>
          <button
            type="button"
            data-ocid="consult.generate_note.button"
            onClick={() => showToast("Generating care note... (placeholder)")}
            className="w-full min-h-[52px] py-4 rounded-2xl font-bold text-white text-base active:scale-[0.98] transition-transform bg-vospital-primary"
          >
            Generate Care Note
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  );
}
