import { useState } from "react";
import {
  FiCalendar,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";
import { FaMeta, FaGoogle, FaWhatsapp, FaTwitter } from "react-icons/fa6";
import { API } from "../../../api/api";
import { message } from "antd";

const AD_SPEND_TEXT =
  "Important: All advertising spend is charged directly to your Meta and Google accounts. DistalFlo manages your campaigns but does not hold your budget or take responsibility for charges made by these platforms. Ensure you have set appropriate spending limits within your Meta and Google accounts before activating campaigns.";

const AD_SPEND_CHECKBOX_LABEL =
  "I understand that I am solely responsible for all advertising spend incurred through my connected Meta and Google accounts. DistalFlo does not hold or advance advertising budgets.";

function ConnectModal({ integration, onClose }) {
  const [checked, setChecked] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    if (!checked || connecting) return;

    // Immediately show loading state
    setConnecting(true);

    // Let React render "Connecting..." before API request starts
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      let response;

      if (integration.name === "Google") {
        response = await API.get("/settings/google");
      } else if (integration.name === "Meta") {
        response = await API.get("/settings/meta");
      } else {
        throw new Error("Unsupported integration");
      }

      console.log("OAuth response:", response.data);

      const redirectUrl = response?.data?.data;

      if (!redirectUrl) {
        throw new Error("OAuth URL not found.");
      }

      // Redirect to Google/Meta OAuth
      window.location.assign(redirectUrl);
    } catch (error) {
      console.error("Connect error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        `Failed to connect ${integration.name}.`;

      message.error(errorMessage);

      // Only stop loading if there was an error
      setConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm ${
          connecting ? "cursor-not-allowed" : ""
        }`}
        onClick={() => {
          if (!connecting) {
            onClose();
          }
        }}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-xl border border-black/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
          <div className="flex items-center gap-3">
            <span
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${integration.iconBg}`}
            >
              {integration.icon}
            </span>

            <div>
              <div className="font-serif text-sm text-gray-900">
                Connect {integration.name}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={connecting}
            className={`text-gray-400 hover:text-gray-600 transition-colors ${
              connecting ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Warning */}
          <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3.5">
            <FiAlertTriangle
              size={16}
              className="text-amber-500 shrink-0 mt-0.5"
            />

            <p className="text-xs leading-relaxed text-amber-800">
              {AD_SPEND_TEXT}
            </p>
          </div>

          {/* Checkbox */}
          <label
            className={`flex items-start gap-2.5 select-none ${
              connecting ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={connecting}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 shrink-0"
            />

            <span className="text-xs leading-relaxed text-gray-600">
              {AD_SPEND_CHECKBOX_LABEL}
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-black/5 bg-gray-50/50">
          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            disabled={connecting}
            className={`text-xs font-medium px-3.5 py-2 rounded-lg text-gray-500 transition-colors ${
              connecting
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>

          {/* Connect */}
          <button
            type="button"
            onClick={handleConnect}
            disabled={!checked || connecting}
            className={`
              min-w-[150px]
              h-[34px]
              inline-flex
              items-center
              justify-center
              gap-2
              text-xs
              font-medium
              px-4
              rounded-lg
              transition-all
              duration-200
              ${
                checked && !connecting
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {connecting ? (
              <>
                {/* Spinner */}
                <span
                  className="
                    inline-block
                    w-3.5
                    h-3.5
                    rounded-full
                    border-2
                    border-white/40
                    border-t-white
                    animate-spin
                  "
                />

                <span>Connecting...</span>
              </>
            ) : (
              <span>Connect {integration.name}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsPanel() {
  const [integrations] = useState([
    {
      name: "CareStack",
      desc: "Two-way calendar sync for bookings",
      icon: <FiCalendar size={18} className="text-blue-500" />,
      iconBg: "bg-blue-50",
      status: "Connected",
    },

    {
      name: "Twilio",
      desc: "SMS & AI voice calling",
      icon: <FaTwitter size={16} className="text-blue-500" />,
      iconBg: "bg-blue-50",
      status: "Connected",
    },

    {
      name: "WhatsApp Business",
      desc: "Nurture on WhatsApp",
      icon: <FaWhatsapp size={18} className="text-emerald-500" />,
      iconBg: "bg-emerald-50",
      status: "Connected",
    },

    {
      name: "Meta",
      desc: "",
      icon: <FaMeta size={16} className="text-blue-500" />,
      iconBg: "bg-blue-50",
      status: "setup",
      requiresAdSpendConsent: true,
    },

    {
      name: "Google",
      desc: "",
      icon: <FaGoogle size={15} className="text-[#4285F4]" />,
      iconBg: "bg-gray-50",
      status: "setup",
      requiresAdSpendConsent: true,
    },
  ]);

  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {integrations.map((it) => (
          <div
            key={it.name}
            className="
              bg-white
              rounded-2xl
              border border-black/5
              px-5 py-5
              flex items-center
              justify-between
              gap-3
            "
          >
            {/* Left side */}
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`
                  w-9 h-9
                  rounded-lg
                  flex items-center
                  justify-center
                  shrink-0
                  ${it.iconBg}
                `}
              >
                {it.icon}
              </span>

              <div className="min-w-0">
                <div className="font-serif text-sm text-gray-900 truncate">
                  {it.name}
                </div>

                {it.desc && (
                  <div className="text-xs text-gray-400 truncate">
                    {it.desc}
                  </div>
                )}
              </div>
            </div>

            {/* Right side */}
            {it.status === "Connected" ? (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  px-2.5
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                  bg-emerald-50
                  text-emerald-600
                  shrink-0
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Connected
              </span>
            ) : it.requiresAdSpendConsent ? (
              <button
                type="button"
                onClick={() => setActiveModal(it)}
                className="
                  bg-orange-500
                  text-white
                  text-xs
                  font-medium
                  px-3.5
                  py-2
                  rounded-lg
                  hover:bg-orange-600
                  transition-colors
                  shrink-0
                "
              >
                Connect
              </button>
            ) : (
              <button
                type="button"
                className="
                  bg-orange-500
                  text-white
                  text-xs
                  font-medium
                  px-3.5
                  py-2
                  rounded-lg
                  hover:bg-orange-600
                  transition-colors
                  shrink-0
                "
              >
                Finish setup
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Connect Modal */}
      {activeModal && (
        <ConnectModal
          integration={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}