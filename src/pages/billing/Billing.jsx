import React, { useState } from "react";
import { Modal, Button, InputNumber } from "antd";
import { FiExternalLink, FiDownload, FiCheck, FiPhone } from "react-icons/fi";

// ---------------------------------------------------------------------------
// Subscription tiers — internal use only (billing, admin, onboarding).
// Never surface tier names/pricing on the public marketing website.
//
// Tier rules (keep in sync with onboarding + admin dashboard):
// 1. Only 'Enterprise' may have `locations > 1`. All other tiers are
//    single-location — enforce this server-side too, not just in the UI.
// 2. 'Enterprise' is NEVER self-serve — no instant plan-change / proration,
//    no automated Stripe update. Any Enterprise change (new signup, adding
//    a location, etc.) routes to sales instead of calling onConfirm directly.
// ---------------------------------------------------------------------------

const plans = [
  {
    key: "Solo",
    name: "Solo",
    desc: "1 active campaign · Single location",
    monthly: 997,
    setup: 497,
    priceLabel: "£997/mo + £497 setup",
    selfServe: true,
  },
  {
    key: "Growth",
    name: "Growth",
    desc: "3 active campaigns · Single location",
    monthly: 1497,
    setup: 497,
    priceLabel: "£1,497/mo + £497 setup",
    popular: true,
    selfServe: true,
  },
  {
    key: "Pro",
    name: "Pro",
    desc: "Unlimited campaigns · Single location",
    monthly: 2297,
    setup: 497,
    priceLabel: "£2,297/mo + £497 setup",
    selfServe: true,
  },
  {
    key: "Enterprise",
    name: "Enterprise",
    desc: "Unlimited campaigns · Multiple locations · Group reporting & admin",
    baseMonthly: 2997,
    baseSetup: 994,
    perExtraLocationMonthly: 997,
    perExtraLocationSetup: 497,
    baseLocations: 2,
    priceLabel: "£2,997/mo for first 2 locations",
    selfServe: false,
  },
];

function getPlanPricing(planKey, locations = 1) {
  const plan = plans.find((p) => p.key === planKey);
  if (!plan) return { monthly: 0, setup: 0, label: "—" };

  if (plan.key !== "Enterprise") {
    return {
      monthly: plan.monthly,
      setup: plan.setup,
      label: `£${plan.monthly.toLocaleString()}/mo + £${plan.setup} setup`,
    };
  }

  const extraLocations = Math.max(0, locations - plan.baseLocations);
  const monthly = plan.baseMonthly + extraLocations * plan.perExtraLocationMonthly;
  const setup = plan.baseSetup + extraLocations * plan.perExtraLocationSetup;

  const label =
    extraLocations > 0
      ? `£${plan.baseMonthly.toLocaleString()}/mo (2 locations) + ${extraLocations} × £${plan.perExtraLocationMonthly}/mo — £${monthly.toLocaleString()}/mo total + £${setup.toLocaleString()} setup`
      : `£${plan.baseMonthly.toLocaleString()}/mo + £${plan.baseSetup} setup (covers up to 2 locations)`;

  return { monthly, setup, label };
}

// ---------- Fake data ----------
const invoices = [
  { id: "INV-2026-006", date: "1 Jun 2026", amount: "£2,396.40", status: "Paid" },
  { id: "INV-2026-005", date: "1 May 2026", amount: "£2,396.40", status: "Paid" },
  { id: "INV-2026-004", date: "1 Apr 2026", amount: "£1,796.40", status: "Paid" },
  { id: "INV-2026-003", date: "1 Mar 2026", amount: "£1,796.40", status: "Paid" },
];

const billingContact = [
  { label: "Name", value: "Dr. Amira Patel" },
  { label: "Email", value: "accounts@brightsmile.co.uk" },
  { label: "Company", value: "Bright Smile Ltd" },
  { label: "VAT", value: "GB 123 4567 89" },
];

// ---------- Sub components ----------
function StatusTag({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      {status}
    </span>
  );
}

function InfoBlock({ eyebrow, eyebrowColor, children }) {
  return (
    <div>
      <div
        className={`font-mono text-[11px] uppercase tracking-wider mb-2 ${eyebrowColor}`}
      >
        {eyebrow}
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Change Plan modal
// ---------------------------------------------------------------------------

function ChangePlanModal({ open, onClose, currentPlan, currentLocations, onConfirm, onRequestSales }) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [locations, setLocations] = useState(currentLocations || 1);
  const [salesRequestSent, setSalesRequestSent] = useState(false);

  // Re-sync local state whenever the modal is (re)opened
  React.useEffect(() => {
    if (open) {
      setSelectedPlan(currentPlan);
      setLocations(currentLocations || (currentPlan === "Enterprise" ? 2 : 1));
      setSalesRequestSent(false);
    }
  }, [open, currentPlan, currentLocations]);

  const pricing = getPlanPricing(selectedPlan, locations);
  const isEnterpriseSelected = selectedPlan === "Enterprise";
  const isCurrent =
    selectedPlan === currentPlan &&
    (selectedPlan !== "Enterprise" || locations === currentLocations);

  // Self-serve tiers only: applies instantly, prorated on next invoice.
  const handleConfirm = () => {
    onConfirm({ plan: selectedPlan, locations: 1 });
    onClose();
  };

  // Enterprise: never applied instantly. Just notifies sales — the actual
  // plan/location change happens after a human agrees terms, not from here.
  const handleRequestSales = () => {
    onRequestSales?.({ plan: "Enterprise", locations });
    setSalesRequestSent(true);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={560}
      closeIcon={<span className="text-gray-400 text-lg">×</span>}
      styles={{ content: { padding: 0, borderRadius: 16, overflow: "hidden" } }}
    >
      <div className="px-7 pt-6 pb-2">
        <h2 className="font-serif text-2xl text-gray-900">Change plan</h2>
        <p className="text-sm text-gray-500 mt-1">
          Self-serve plans apply immediately and are prorated on your next invoice.
          Enterprise is agreed directly with our team.
        </p>
      </div>

      <div className="px-7 py-5 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.key;
          const isActivePlan = plan.key === currentPlan;
          return (
            <button
              key={plan.key}
              type="button"
              onClick={() => {
                setSelectedPlan(plan.key);
                setSalesRequestSent(false);
                if (plan.key === "Enterprise") setLocations((l) => Math.max(2, l));
              }}
              className="relative w-full flex items-center justify-between text-left px-5 py-4 rounded-xl border transition-colors"
              style={{
                borderColor: isSelected ? "#1FA463" : "#E5E7EB",
                backgroundColor: isSelected ? "#EAFBF3" : "#FFFFFF",
              }}
            >
              {plan.popular && (
                <span className="absolute top-2.5 right-4 text-[11px] font-semibold text-white bg-emerald-600 px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              {!plan.selfServe && (
                <span className="absolute top-2.5 right-4 text-[11px] font-semibold text-white bg-gray-800 px-2 py-0.5 rounded-full">
                  Sales-assisted
                </span>
              )}
              <div className="flex items-center gap-3">
                <span
                  className="w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0"
                  style={{
                    borderColor: isSelected ? "#1FA463" : "#D1D5DB",
                    backgroundColor: isSelected ? "#1FA463" : "#FFFFFF",
                  }}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <div>
                  <div className="text-[15px] font-semibold text-gray-900 flex items-center gap-2">
                    {plan.name}
                    {isActivePlan && (
                      <span className="text-[10.5px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-[13px] text-gray-500 mt-0.5">{plan.desc}</div>
                </div>
              </div>
              <span className="text-[13px] font-semibold text-gray-900 shrink-0 text-right max-w-[170px]">
                {plan.priceLabel}
              </span>
            </button>
          );
        })}

        {isEnterpriseSelected && (
          <div className="rounded-xl border border-gray-200 px-5 py-4 bg-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[14px] font-semibold text-gray-900">
                  Number of locations
                </div>
                <div className="text-[12.5px] text-gray-500 mt-0.5">
                  First 2 included. £997/mo + £497 setup per additional site.
                </div>
              </div>
              <InputNumber
                size="large"
                min={2}
                max={50}
                value={locations}
                onChange={(v) => {
                  setLocations(v || 2);
                  setSalesRequestSent(false);
                }}
                className="!rounded-lg !w-24"
              />
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 text-[13px] text-gray-700">
              {pricing.label}
            </div>
            <div className="mt-3 rounded-lg px-3 py-2.5 bg-amber-50 flex items-start gap-2">
              <FiPhone size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <span className="text-[12.5px] text-amber-900">
                {salesRequestSent
                  ? "Request sent — our team will follow up to confirm terms and update billing manually. Nothing has been charged yet."
                  : "This isn't applied automatically. We'll pass your requested tier and location count to our team, who'll agree the contract and set up billing directly."}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-7 py-5 bg-gray-50 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          {isEnterpriseSelected ? (
            <>
              Estimated:{" "}
              <span className="font-semibold text-gray-900">
                £{pricing.monthly.toLocaleString()}/mo + VAT
              </span>
            </>
          ) : (
            <>
              New total:{" "}
              <span className="font-semibold text-gray-900">
                £{pricing.monthly.toLocaleString()}/mo + VAT
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onClose} className="!rounded-lg !h-10 !px-5 !text-[13.5px] !font-medium">
            Cancel
          </Button>
          {isEnterpriseSelected ? (
            <Button
              type="primary"
              // disabled={salesRequestSent}
              onClick={handleRequestSales}
              className="!rounded-lg !bg-gray-900 !border-gray-900 !h-10 !px-5 !text-[13.5px] !font-medium disabled:!opacity-40"
            >
              <span className="inline-flex items-center gap-1.5">
                <FiPhone size={13} />
                {salesRequestSent ? "Request sent" : "Contact sales"}
              </span>
            </Button>
          ) : (
            <Button
              type="primary"
              // disabled={isCurrent}
              onClick={handleConfirm}
              className="!rounded-lg !bg-gray-900 !border-gray-900 !h-10 !px-5 !text-[13.5px] !font-medium disabled:!opacity-40"
            >
              <span className="inline-flex items-center gap-1.5">
                <FiCheck size={14} />
                Confirm change
              </span>
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function Billing() {
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("Growth");
  const [currentLocations, setCurrentLocations] = useState(1);

  const pricing = getPlanPricing(currentPlan, currentLocations);
  const planInfo = plans.find((p) => p.key === currentPlan);

  // Self-serve tiers only (Solo/Growth/Pro) — instant, prorated.
  const handleConfirmPlan = ({ plan, locations }) => {
    setCurrentPlan(plan);
    setCurrentLocations(locations);
  };

  // Enterprise — does NOT change currentPlan/currentLocations here.
  // Hook this up to whatever notifies sales/CRM (e.g. create a lead,
  // open a mail composer, ping a Slack channel). The account stays on
  // its existing plan until sales manually applies the change.
  const handleRequestSales = ({ plan, locations }) => {
    console.log("Enterprise change requested — routed to sales, not applied automatically:", {
      plan,
      locations,
    });
  };

  return (
    <div>
      <div>
        {/* Header */}
        <div className="lg:flex items-start justify-between mb-2">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-2">
              Billing &amp; Plan
            </h1>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Manage your subscription, payment method and invoices. Billing
              is handled securely by Stripe.
            </p>
          </div>
          {/* <button className="inline-flex items-center gap-1.5 bg-white text-sm text-gray-700 font-medium px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors shrink-0">
            <FiExternalLink size={14} />
            Stripe customer portal
          </button> */}
        </div>

        {/* Plan card */}
        <div className="bg-white rounded-2xl border border-black/5 p-6 mb-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-600">
                {planInfo?.name} plan
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
              {currentPlan === "Enterprise" && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {currentLocations} location{currentLocations > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 bg-white text-sm text-gray-700 font-medium px-4 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <FiExternalLink size={13} />
                Update card
              </button>
              <button
                onClick={() => setChangePlanOpen(true)}
                className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Change plan
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-serif text-4xl text-gray-900">
              £{pricing.monthly.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400">/month + VAT</span>
          </div>
          <div className="text-sm text-gray-500 mb-6">
            Next payment <span className="font-semibold text-gray-800">1 July 2026</span>{" "}
            · Visa ending 4242
          </div>

          <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <InfoBlock eyebrow="Plan Tier" eyebrowColor="text-blue-500">
              <div className="text-sm text-gray-900 font-semibold">{planInfo?.desc}</div>
            </InfoBlock>

            <InfoBlock eyebrow="WhatsApp Channel" eyebrowColor="text-emerald-500">
              <div className="font-semibold text-emerald-600 text-sm">
                Included
              </div>
            </InfoBlock>

            <InfoBlock eyebrow="Postcode Exclusivity" eyebrowColor="text-violet-500">
              <div className="font-semibold text-gray-900 text-sm">
                OX1–OX4
              </div>
            </InfoBlock>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Invoices */}
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <h2 className="font-serif text-xl text-gray-900">Invoices</h2>
              <button className="inline-flex items-center gap-1.5 bg-white text-sm text-gray-700 font-medium px-3.5 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <FiDownload size={13} />
                Download all
              </button>
            </div>

            <div className="grid grid-cols-[1.4fr_1.2fr_1.2fr_1fr_0.4fr] px-6 py-3 border-b border-gray-100">
              {["Invoice", "Date", "Amount", "Status", ""].map((h) => (
                <div
                  key={h}
                  className="font-mono text-[11px] uppercase tracking-wider text-gray-400"
                >
                  {h}
                </div>
              ))}
            </div>

            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="grid grid-cols-[1.4fr_1.2fr_1.2fr_1fr_0.4fr] items-center px-6 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/60 transition-colors"
              >
                <div className="text-sm font-semibold text-gray-900">{inv.id}</div>
                <div className="text-sm text-gray-500">{inv.date}</div>
                <div className="text-sm font-mono text-gray-900">{inv.amount}</div>
                <div>
                  <StatusTag status={inv.status} />
                </div>
                <div className="flex justify-end">
                  <button className="text-gray-400 hover:text-gray-700 transition-colors">
                    <FiDownload size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h2 className="font-serif text-xl text-gray-900 mb-4">
                Payment method
              </h2>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <span className="w-9 h-6 rounded bg-gray-900 text-white text-[9px] font-bold flex items-center justify-center tracking-wide shrink-0">
                  VISA
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">
                    •••• 4242
                  </div>
                  <div className="text-xs text-gray-400">Expires 08/27</div>
                </div>
                <button className="bg-white text-sm text-gray-700 font-medium px-3.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors shrink-0">
                  Update
                </button>
              </div>
            </div>

            {/* Billing contact */}
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h2 className="font-serif text-xl text-gray-900 mb-4">
                Billing contact
              </h2>
              <div className="flex flex-col gap-3 mb-5">
                {billingContact.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-400">{row.label}</span>
                    <span className="font-medium text-gray-900">{row.value}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-white text-sm text-gray-700 font-medium py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                Edit details
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangePlanModal
        open={changePlanOpen}
        onClose={() => setChangePlanOpen(false)}
        currentPlan={currentPlan}
        currentLocations={currentLocations}
        onConfirm={handleConfirmPlan}
        onRequestSales={handleRequestSales}
      />
    </div>
  );
}

export default Billing;