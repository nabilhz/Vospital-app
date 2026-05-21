import {
  ArrowLeft,
  Check,
  ChevronRight,
  ClipboardList,
  MapPin,
  Search,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── Data ────────────────────────────────────────────────────────────────────

const PATIENTS = [
  { id: 1, name: "Amara Diallo", village: "Kologo Village", initials: "AD" },
  { id: 2, name: "Kwame Asante", village: "Tamale North", initials: "KA" },
  { id: 3, name: "Fatima Ouedraogo", village: "Bawku East", initials: "FO" },
  { id: 4, name: "Ibrahim Traore", village: "Navrongo", initials: "IT" },
  { id: 5, name: "Ama Mensah", village: "Bolgatanga", initials: "AM" },
];

const SYMPTOM_LIST = ["Fever", "Cough", "Headache", "Fatigue", "Vomiting"];

const RECENT_VISITS = [
  {
    id: 1,
    patient: "Fatima Ouedraogo",
    date: "Today, 09:15 AM",
    status: "Draft",
  },
  {
    id: 2,
    patient: "Kwame Asante",
    date: "Yesterday, 02:30 PM",
    status: "Draft",
  },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface VisitData {
  patientId: number | null;
  symptoms: string[];
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  notes: string;
}

const INITIAL_DATA: VisitData = {
  patientId: null,
  symptoms: [],
  temperature: "",
  bloodPressure: "",
  heartRate: "",
  notes: "",
};

// ── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center px-4 py-3 bg-white border-b border-gray-100">
      {([1, 2, 3] as const).map((step, i) => {
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                done
                  ? "bg-vospital-primary text-white"
                  : active
                    ? "bg-vospital-deep text-white"
                    : "bg-gray-200 text-gray-400"
              }`}
            >
              {done ? <Check className="w-4 h-4" strokeWidth={3} /> : step}
            </div>
            {i < 2 && (
              <div
                className={`h-0.5 w-12 mx-1 ${
                  done ? "bg-vospital-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1 — Select Patient ──────────────────────────────────────────────────

function Step1({
  data,
  onUpdate,
  onContinue,
  onBack,
}: {
  data: VisitData;
  onUpdate: (d: Partial<VisitData>) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.village.toLowerCase().includes(query.toLowerCase()),
  );
  const selected = data.patientId;

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="bg-vospital-deep px-4 pt-4 pb-4 flex items-center gap-3">
        <button
          type="button"
          data-ocid="visit.step1.back_button"
          onClick={onBack}
          className="text-white p-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white font-bold text-xl">Select Patient</h1>
      </div>

      <StepIndicator current={1} />

      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            data-ocid="visit.step1.search_input"
            type="text"
            placeholder="Search patient or village…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-white rounded-xl text-sm font-medium placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-vospital-primary"
          />
        </div>
      </div>

      {/* Patient list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {filtered.map((patient, idx) => {
          const isSelected = selected === patient.id;
          return (
            <button
              type="button"
              key={patient.id}
              data-ocid={`visit.step1.item.${idx + 1}`}
              onClick={() => onUpdate({ patientId: patient.id })}
              className={`w-full rounded-xl p-4 flex items-center gap-3 text-left transition-all border-2 ${
                isSelected
                  ? "bg-vospital-pale border-vospital-primary"
                  : "bg-white border-transparent shadow-card"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-vospital-primary flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
                {patient.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">
                  {patient.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {patient.village}
                  </span>
                </div>
              </div>
              {isSelected && (
                <Check
                  className="w-5 h-5 text-vospital-primary flex-shrink-0"
                  strokeWidth={3}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Continue */}
      <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-100">
        <button
          type="button"
          data-ocid="visit.step1.continue_button"
          onClick={onContinue}
          disabled={!selected}
          className="w-full min-h-[52px] bg-vospital-primary text-white font-bold rounded-xl text-base disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ── Step 2 — Symptoms & Vitals ────────────────────────────────────────────────

function Step2({
  data,
  onUpdate,
  onContinue,
  onBack,
}: {
  data: VisitData;
  onUpdate: (d: Partial<VisitData>) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const toggleSymptom = (s: string) => {
    const next = data.symptoms.includes(s)
      ? data.symptoms.filter((x) => x !== s)
      : [...data.symptoms, s];
    onUpdate({ symptoms: next });
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="bg-vospital-deep px-4 pt-4 pb-4 flex items-center gap-3">
        <button
          type="button"
          data-ocid="visit.step2.back_button"
          onClick={onBack}
          className="text-white p-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white font-bold text-xl">Symptoms &amp; Vitals</h1>
      </div>

      <StepIndicator current={2} />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4 space-y-4">
        {/* Symptoms */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Symptoms
          </p>
          <div className="space-y-2">
            {SYMPTOM_LIST.map((symptom, idx) => {
              const checked = data.symptoms.includes(symptom);
              return (
                <button
                  type="button"
                  key={symptom}
                  data-ocid={`visit.step2.checkbox.${idx + 1}`}
                  onClick={() => toggleSymptom(symptom)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    checked
                      ? "bg-vospital-pale border-vospital-primary"
                      : "bg-white border-gray-200 shadow-card"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                      checked
                        ? "bg-vospital-primary border-vospital-primary"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {checked && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span
                    className={`font-semibold text-sm ${checked ? "text-vospital-deep" : "text-gray-800"}`}
                  >
                    {symptom}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vitals */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Vitals
          </p>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="visit-temp"
                className="text-xs font-semibold text-gray-600 mb-1 block"
              >
                Temperature (°C)
              </label>
              <input
                id="visit-temp"
                data-ocid="visit.step2.temperature_input"
                type="number"
                placeholder="e.g. 37.5"
                value={data.temperature}
                onChange={(e) => onUpdate({ temperature: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-vospital-primary"
              />
            </div>
            <div>
              <label
                htmlFor="visit-bp"
                className="text-xs font-semibold text-gray-600 mb-1 block"
              >
                Blood Pressure (mmHg)
              </label>
              <input
                id="visit-bp"
                data-ocid="visit.step2.bp_input"
                type="text"
                placeholder="e.g. 120/80"
                value={data.bloodPressure}
                onChange={(e) => onUpdate({ bloodPressure: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-vospital-primary"
              />
            </div>
            <div>
              <label
                htmlFor="visit-hr"
                className="text-xs font-semibold text-gray-600 mb-1 block"
              >
                Heart Rate (bpm)
              </label>
              <input
                id="visit-hr"
                data-ocid="visit.step2.heartrate_input"
                type="number"
                placeholder="e.g. 72"
                value={data.heartRate}
                onChange={(e) => onUpdate({ heartRate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-vospital-primary"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Notes
          </p>
          <textarea
            data-ocid="visit.step2.notes_textarea"
            placeholder="Add any additional observations…"
            value={data.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-vospital-primary resize-none"
          />
        </div>
      </div>

      {/* Continue */}
      <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-100">
        <button
          type="button"
          data-ocid="visit.step2.continue_button"
          onClick={onContinue}
          className="w-full min-h-[52px] bg-vospital-primary text-white font-bold rounded-xl text-base hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}

// ── Step 3 — Review ──────────────────────────────────────────────────────────

function Step3({
  data,
  onSubmit,
  onBack,
}: {
  data: VisitData;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const patient = PATIENTS.find((p) => p.id === data.patientId);

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="bg-vospital-deep px-4 pt-4 pb-4 flex items-center gap-3">
        <button
          type="button"
          data-ocid="visit.step3.back_button"
          onClick={onBack}
          className="text-white p-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white font-bold text-xl">Review Visit</h1>
      </div>

      <StepIndicator current={3} />

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4 space-y-4">
        {/* Patient card */}
        <div className="bg-white rounded-xl shadow-card border-t-2 border-t-[#1B5E20] border-x border-b border-gray-100 p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Patient
          </p>
          <p className="font-bold text-gray-900">{patient?.name}</p>
          {patient && (
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{patient.village}</span>
            </div>
          )}
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-xl shadow-card border-t-2 border-t-[#1B5E20] border-x border-b border-gray-100 p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Symptoms
          </p>
          {data.symptoms.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.symptoms.map((s) => (
                <span
                  key={s}
                  className="bg-vospital-pale text-vospital-deep text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">None selected</p>
          )}
        </div>

        {/* Vitals */}
        <div className="bg-white rounded-xl shadow-card border-t-2 border-t-[#1B5E20] border-x border-b border-gray-100 p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Vitals
          </p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Temperature</span>
              <span className="font-semibold text-gray-900">
                {data.temperature ? `${data.temperature} °C` : "—"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Blood Pressure</span>
              <span className="font-semibold text-gray-900">
                {data.bloodPressure ? `${data.bloodPressure} mmHg` : "—"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Heart Rate</span>
              <span className="font-semibold text-gray-900">
                {data.heartRate ? `${data.heartRate} bpm` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow-card border-t-2 border-t-[#1B5E20] border-x border-b border-gray-100 p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Notes
          </p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {data.notes || <span className="text-gray-400">—</span>}
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-100">
        <button
          type="button"
          data-ocid="visit.step3.submit_button"
          onClick={onSubmit}
          className="w-full min-h-[52px] bg-vospital-primary text-white font-bold rounded-xl text-base hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Submit Visit
        </button>
      </div>
    </div>
  );
}

// ── Landing (Step 0) ─────────────────────────────────────────────────────────

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-vospital-deep px-4 pt-4 pb-4">
        <h1 className="text-white font-bold text-xl">New Visit</h1>
      </div>

      <div className="flex-1 px-4 pt-8 pb-4 flex flex-col items-center animate-fade-in">
        <div className="w-32 h-32 bg-vospital-pale rounded-full flex items-center justify-center mb-6">
          <ClipboardList
            className="w-16 h-16 text-vospital-primary"
            strokeWidth={1.5}
          />
        </div>

        <p className="text-center text-gray-500 text-sm font-medium mb-8 max-w-[240px]">
          Select a patient to begin recording a visit
        </p>

        <button
          type="button"
          data-ocid="visit.start.primary_button"
          onClick={onStart}
          className="w-full max-w-[320px] min-h-[52px] py-4 bg-vospital-primary text-white font-bold rounded-xl text-base tracking-wide hover:opacity-90 active:scale-[0.98] transition-all shadow-card"
        >
          Start Visit
        </button>

        <div className="w-full mt-10">
          <p className="text-sm font-bold text-gray-700 mb-3">Recent Visits</p>
          <div className="space-y-3">
            {RECENT_VISITS.map((visit, idx) => (
              <button
                type="button"
                key={visit.id}
                data-ocid={`visit.item.${idx + 1}`}
                className="w-full bg-white rounded-xl shadow-card p-4 flex items-center justify-between border-t-2 border-t-[#1B5E20] border-x border-b border-gray-100 active:scale-[0.98] transition-transform"
              >
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {visit.patient}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{visit.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    {visit.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────

export function VisitScreen() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [visitData, setVisitData] = useState<VisitData>(INITIAL_DATA);

  const update = (patch: Partial<VisitData>) =>
    setVisitData((prev) => ({ ...prev, ...patch }));

  const reset = () => {
    setStep(0);
    setVisitData(INITIAL_DATA);
  };

  const handleSubmit = () => {
    toast("Visit saved. Pending sync.");
    reset();
  };

  if (step === 0) return <Landing onStart={() => setStep(1)} />;
  if (step === 1)
    return (
      <Step1
        data={visitData}
        onUpdate={update}
        onContinue={() => setStep(2)}
        onBack={reset}
      />
    );
  if (step === 2)
    return (
      <Step2
        data={visitData}
        onUpdate={update}
        onContinue={() => setStep(3)}
        onBack={() => setStep(1)}
      />
    );
  return (
    <Step3 data={visitData} onSubmit={handleSubmit} onBack={() => setStep(2)} />
  );
}
