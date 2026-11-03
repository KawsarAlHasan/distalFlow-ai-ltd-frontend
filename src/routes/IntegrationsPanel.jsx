import { useState, useEffect } from "react";
import { FiX, FiAlertTriangle, FiCalendar } from "react-icons/fi";
import { FaMeta } from "react-icons/fa6";
import { FaGoogle, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { fetchCustomers, selectCustomer, createCampaign } from "../api/adsAPi";
import { API } from "../api/api";

// আপনার আগের values এখানে রাখুন
const AD_SPEND_TEXT =
  "By connecting this integration, you acknowledge that advertising spend may be incurred.";

const AD_SPEND_CHECKBOX_LABEL =
  "I understand and agree that this integration may incur advertising spend.";

// ============================================
// Connect Modal
// ============================================
function ConnectModal({ integration, onClose, onConfirm }) {
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

  //   const handleConnect = () => {
  //     if (!checked) return;

  //     setConnecting(true);

  //     // Google OAuth page-এ redirect
  //     const authUrl = import.meta.env.VITE_API_URL
  //       ? `${import.meta.env.VITE_API_URL}/auth/google`
  //       : "http://localhost:5000/auth/google";

  //     window.location.href = authUrl;
  //   };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-xl border border-black/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
          <div className="flex items-center gap-3">
            <span
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${integration.iconBg}`}
            >
              {integration.icon}
            </span>

            <div className="font-serif text-sm text-gray-900">
              Connect {integration.name}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3.5">
            <FiAlertTriangle
              size={16}
              className="text-amber-500 shrink-0 mt-0.5"
            />

            <p className="text-xs leading-relaxed text-amber-800">
              {AD_SPEND_TEXT}
            </p>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checked}
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
          <button
            onClick={onClose}
            className="text-xs font-medium px-3.5 py-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleConnect}
            disabled={!checked || connecting}
            className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors ${
              checked
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {connecting ? "Redirecting..." : `Connect ${integration.name}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================
export default function IntegrationsPanel() {
  const [integrations, setIntegrations] = useState([
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

  // Google Ads state
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [campaignBudget, setCampaignBudget] = useState(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // ============================================
  // OAuth Callback Handling
  // ============================================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const status = params.get("status");
    const provider = params.get("provider");

    if (status === "success" && provider === "google") {
      // Google integration Connected করুন
      setIntegrations((prev) =>
        prev.map((it) =>
          it.name === "Google"
            ? {
                ...it,
                status: "Connected",
              }
            : it,
        ),
      );

      // URL থেকে parameters remove
      window.history.replaceState({}, document.title, window.location.pathname);

      // Customer list automatically fetch
      loadCustomers();
    }
  }, []);

  // ============================================
  // Customer List Load
  // ============================================
  const loadCustomers = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const customers = await fetchCustomers();

      setCustomerList(customers);

      if (customers.length === 0) {
        setMessage({
          type: "error",
          text: "No Google Ads accounts found. Please create a test account first.",
        });
      } else {
        setSelectedCustomer(customers[0]);

        setMessage({
          type: "success",
          text: `${customers.length} account(s) found. Select one.`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.error || "Failed to load customers",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Select Customer
  // ============================================
  const handleSelectCustomer = async () => {
    if (!selectedCustomer) return;

    setLoading(true);
    setMessage(null);

    try {
      await selectCustomer(selectedCustomer);

      setMessage({
        type: "success",
        text: `Account ${selectedCustomer} selected successfully!`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.error || "Failed to select account",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Create Campaign
  // ============================================
  const handleCreateCampaign = async () => {
    if (!campaignName.trim()) {
      setMessage({
        type: "error",
        text: "Please enter a campaign name",
      });

      return;
    }

    if (campaignBudget < 1) {
      setMessage({
        type: "error",
        text: "Budget must be at least 1 USD",
      });

      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await createCampaign(campaignName, campaignBudget);

      setMessage({
        type: "success",
        text: `✅ Campaign created! ID: ${result.campaignId}`,
      });

      setCampaignName("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.error || "Failed to create campaign",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Confirm Connect
  // ============================================
  const handleConfirmConnect = (name) => {
    setIntegrations((prev) =>
      prev.map((it) =>
        it.name === name
          ? {
              ...it,
              status: "Connected",
            }
          : it,
      ),
    );

    setActiveModal(null);
  };

  const isGoogleConnected =
    integrations.find((i) => i.name === "Google")?.status === "Connected";

  // ============================================
  // Render
  // ============================================
  return (
    <>
      {/* Integration Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {integrations.map((it) => (
          <div
            key={it.name}
            className="bg-white rounded-2xl border border-black/5 px-5 py-5 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${it.iconBg}`}
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

            {/* Status */}
            {it.status === "Connected" ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Connected
              </span>
            ) : it.requiresAdSpendConsent ? (
              <button
                onClick={() => setActiveModal(it)}
                className="bg-orange-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-orange-600 transition-colors shrink-0"
              >
                Connect
              </button>
            ) : (
              <button className="bg-orange-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-orange-600 transition-colors shrink-0">
                Finish setup
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ============================================
          Google Ads Management
          ============================================ */}
      {isGoogleConnected && (
        <div className="mt-8 p-6 bg-white rounded-2xl border border-black/5 shadow-sm">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
            📊 Google Ads Management
          </h3>

          {/* Message */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Step 1: Customer List */}
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Select Google Ads Account
              </label>

              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={loading || customerList.length === 0}
              >
                {customerList.length === 0 ? (
                  <option value="">No accounts found</option>
                ) : (
                  customerList.map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Select Account */}
            <button
              onClick={handleSelectCustomer}
              disabled={loading || !selectedCustomer}
              className="bg-orange-500 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Saving..." : "Select Account"}
            </button>

            {/* Refresh */}
            <button
              onClick={loadCustomers}
              disabled={loading}
              className="bg-gray-100 text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Step 2: Campaign */}
          <div className="border-t border-gray-100 pt-4 mt-2">
            <p className="text-xs font-medium text-gray-500 mb-3">
              🚀 Create New Campaign
            </p>

            <div className="flex flex-wrap items-end gap-4">
              {/* Campaign Name */}
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs text-gray-500 mb-1">
                  Campaign Name
                </label>

                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Summer Sale"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Budget */}
              <div className="w-32">
                <label className="block text-xs text-gray-500 mb-1">
                  Budget (USD)
                </label>

                <input
                  type="number"
                  value={campaignBudget}
                  onChange={(e) => setCampaignBudget(Number(e.target.value))}
                  min={1}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Publish */}
              <button
                onClick={handleCreateCampaign}
                disabled={loading || !campaignName.trim()}
                className="bg-orange-500 text-white text-xs font-medium px-5 py-2 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Creating..." : "Publish Campaign"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          Connect Modal
          ============================================ */}
      {activeModal && (
        <ConnectModal
          integration={activeModal}
          onClose={() => setActiveModal(null)}
          onConfirm={handleConfirmConnect}
        />
      )}
    </>
  );
}
