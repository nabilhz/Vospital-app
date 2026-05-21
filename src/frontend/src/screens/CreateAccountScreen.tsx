import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateAccountScreenProps {
  onBack: () => void;
}

const inputClass =
  "w-full rounded-xl border-2 border-gray-200 focus:border-[#1B5E20] outline-none px-4 py-3 text-base bg-white text-gray-800 placeholder-gray-400 transition-colors";

export function CreateAccountScreen({ onBack }: CreateAccountScreenProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [linkIcp, setLinkIcp] = useState(false);

  const handleSubmit = () => {
    toast("Account created. Awaiting approval.");
    setTimeout(onBack, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center px-4 pt-4 pb-3 border-b border-gray-100">
        <button
          type="button"
          data-ocid="create_account.cancel_button"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-100 text-[#1B5E20] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800 -ml-11">
          Create Account
        </h1>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8 pb-4">
        <div className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              data-ocid="create_account.input"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              data-ocid="create_account.input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={inputClass}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="text-sm font-semibold text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              data-ocid="create_account.input"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className={inputClass}
            />
          </div>

          {/* Organization */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="organization"
              className="text-sm font-semibold text-gray-700"
            >
              Organization
            </label>
            <input
              id="organization"
              data-ocid="create_account.input"
              type="text"
              autoComplete="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Enter your organization"
              className={inputClass}
            />
          </div>

          {/* Role Request */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="role"
              className="text-sm font-semibold text-gray-700"
            >
              Role Request
            </label>
            <select
              id="role"
              data-ocid="create_account.select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 focus:border-[#1B5E20] outline-none px-4 py-3 text-base bg-white text-gray-800 transition-colors appearance-none"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="chw">Community Health Worker</option>
              <option value="doctor">Doctor</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
              <option value="researcher">Researcher</option>
            </select>
          </div>

          {/* Link ICP DID toggle */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <Switch
                id="link-icp"
                data-ocid="create_account.switch"
                checked={linkIcp}
                onCheckedChange={setLinkIcp}
              />
              <Label
                htmlFor="link-icp"
                className="text-sm font-semibold text-gray-700 cursor-pointer"
              >
                Link ICP DID{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </Label>
            </div>
            {linkIcp && (
              <p className="text-sm text-gray-500 pl-1">
                Your ICP Digital Identity will be linked to your Vospital
                account.
              </p>
            )}
          </div>

          <button
            type="button"
            data-ocid="create_account.submit_button"
            onClick={handleSubmit}
            style={{ minHeight: "52px" }}
            className="w-full rounded-xl bg-[#1B5E20] text-white font-bold text-base shadow-md mt-2 active:scale-[0.98] transition-transform"
          >
            Create Account
          </button>
        </div>
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
