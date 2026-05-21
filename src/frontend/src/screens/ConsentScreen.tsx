interface ConsentScreenProps {
  onAgree: () => void;
  onDecline: () => void;
}

export function ConsentScreen({ onAgree, onDecline }: ConsentScreenProps) {
  const [checked, setChecked] = useState(false);

  const handleAgree = () => {
    localStorage.setItem("vospital_consent_agreed", "1");
    onAgree();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      {/* Logo + App Name */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/assets/generated/vospital-logo-transparent.dim_200x200.png"
          alt="Vospital Logo"
          className="w-16 h-16 mb-2 object-contain"
        />
        <h1 className="text-2xl font-extrabold text-[#1B5E20] tracking-tight">
          Vospital
        </h1>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-[#1B5E20] text-center mb-4">
        Data Privacy Agreement
      </h2>

      {/* Consent text box */}
      <div
        className="flex-1 overflow-y-auto rounded-xl border-2 border-green-300 bg-[#E8F5E9] p-4 mb-6 text-sm text-gray-800 leading-relaxed shadow-inner"
        style={{ maxHeight: "260px" }}
      >
        <p>
          By using Vospital, you agree to the collection and processing of
          health data in compliance with HIPAA and regional health data
          regulations. Your data will be stored securely and will only be
          accessible to authorized personnel.
        </p>
        <p className="mt-3">
          We are committed to protecting your privacy and ensuring the
          confidentiality of all patient and health worker information. Data
          collected through this application will only be used for the purposes
          of providing and improving community health services.
        </p>
        <p className="mt-3">
          You have the right to request access to your data, request
          corrections, or withdraw consent at any time by contacting your
          organization's data protection officer.
        </p>
      </div>

      {/* Checkbox */}
      <label
        className="flex items-start gap-3 mb-6 cursor-pointer"
        data-ocid="consent.checkbox"
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-0.5 w-5 h-5 accent-[#1B5E20] cursor-pointer flex-shrink-0"
        />
        <span className="text-sm font-semibold text-gray-700">
          I have read and agree to the terms
        </span>
      </label>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          data-ocid="consent.confirm_button"
          onClick={handleAgree}
          disabled={!checked}
          style={{ minHeight: "52px" }}
          className="w-full rounded-xl bg-[#1B5E20] text-white font-bold text-base shadow-md active:scale-[0.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        >
          I Agree
        </button>
        <button
          type="button"
          data-ocid="consent.cancel_button"
          onClick={onDecline}
          style={{ minHeight: "52px" }}
          className="w-full rounded-xl bg-gray-200 text-gray-600 font-bold text-base active:scale-[0.98] transition-transform"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
