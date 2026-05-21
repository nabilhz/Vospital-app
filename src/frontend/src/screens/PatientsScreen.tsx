import { Clock, MapPin, Plus, Search, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PatientStatus = "healthy" | "follow-up" | "urgent";

interface Patient {
  id: number;
  name: string;
  age: number;
  sex: string;
  village: string;
  lastVisit: string;
  initials: string;
  status: PatientStatus;
}

const PATIENTS: Patient[] = [
  {
    id: 1,
    name: "Amara Diallo",
    age: 34,
    sex: "F",
    village: "Kologo Village",
    lastVisit: "3 days ago",
    initials: "AD",
    status: "healthy",
  },
  {
    id: 2,
    name: "Kwame Asante",
    age: 67,
    sex: "M",
    village: "Tamale North",
    lastVisit: "1 week ago",
    initials: "KA",
    status: "urgent",
  },
  {
    id: 3,
    name: "Fatima Ouedraogo",
    age: 28,
    sex: "F",
    village: "Bawku East",
    lastVisit: "Today",
    initials: "FO",
    status: "healthy",
  },
  {
    id: 4,
    name: "Ibrahim Traore",
    age: 45,
    sex: "M",
    village: "Navrongo",
    lastVisit: "2 weeks ago",
    initials: "IT",
    status: "urgent",
  },
  {
    id: 5,
    name: "Ama Mensah",
    age: 19,
    sex: "F",
    village: "Bolgatanga",
    lastVisit: "5 days ago",
    initials: "AM",
    status: "follow-up",
  },
  {
    id: 6,
    name: "Moussa Coulibaly",
    age: 52,
    sex: "M",
    village: "Yendi",
    lastVisit: "Yesterday",
    initials: "MC",
    status: "follow-up",
  },
  {
    id: 7,
    name: "Abena Owusu",
    age: 41,
    sex: "F",
    village: "Wa Central",
    lastVisit: "4 days ago",
    initials: "AO",
    status: "healthy",
  },
  {
    id: 8,
    name: "Seidu Mahama",
    age: 58,
    sex: "M",
    village: "Zebilla",
    lastVisit: "3 weeks ago",
    initials: "SM",
    status: "follow-up",
  },
];

const STATUS_CONFIG: Record<
  PatientStatus,
  { dot: string; label: string; leftBorder: string }
> = {
  healthy: {
    dot: "bg-green-500",
    label: "Healthy",
    leftBorder: "border-l-green-500",
  },
  "follow-up": {
    dot: "bg-amber-400",
    label: "Follow-up",
    leftBorder: "border-l-amber-400",
  },
  urgent: {
    dot: "bg-red-500",
    label: "Urgent",
    leftBorder: "border-l-red-500",
  },
};

export function PatientsScreen() {
  const [query, setQuery] = useState("");

  const filtered = PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.village.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-vospital-deep px-4 pt-4 pb-4">
        <h1 className="text-white font-bold text-xl mb-3">My Patients</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            data-ocid="patients.search_input"
            type="text"
            placeholder="Search patients or village…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-white rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vospital-primary"
          />
        </div>
      </div>

      {/* Patient list */}
      <div className="flex-1 px-4 pt-4 pb-4 space-y-3 animate-fade-in">
        {filtered.length === 0 ? (
          <div
            data-ocid="patients.empty_state"
            className="flex flex-col items-center justify-center py-16 text-gray-400"
          >
            <User className="w-12 h-12 mb-3 opacity-40" />
            <p className="font-semibold">No patients found</p>
          </div>
        ) : (
          filtered.map((patient, idx) => {
            const cfg = STATUS_CONFIG[patient.status];
            return (
              <button
                type="button"
                key={patient.id}
                data-ocid={`patients.item.${idx + 1}`}
                className={`w-full bg-white rounded-2xl shadow-card p-4 flex items-center gap-3 text-left active:scale-[0.98] transition-transform border-y border-r border-gray-100 border-l-4 ${cfg.leftBorder}`}
              >
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-vospital-primary flex items-center justify-center flex-shrink-0 font-bold text-sm text-white">
                  {patient.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {patient.name}
                    </p>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {patient.age} {patient.sex}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-500 truncate">
                      {patient.village}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-500">
                      Last visit: {patient.lastVisit}
                    </span>
                  </div>
                </div>

                {/* Status dot */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <span
                    aria-label={cfg.label}
                    className={`w-3.5 h-3.5 rounded-full ${cfg.dot}`}
                  />
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide leading-none">
                    {cfg.label}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* FAB */}
      <button
        type="button"
        data-ocid="patients.add.primary_button"
        onClick={() => toast("New patient form coming soon")}
        className="fixed bottom-20 right-4 w-14 h-14 bg-vospital-primary text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
