import React, { useState, useEffect } from "react";
import { Modal, Button, InputNumber, Form, Input, message, Spin } from "antd";
import { FiExternalLink, FiDownload, FiCheck, FiPhone, FiCreditCard } from "react-icons/fi";
import {
  useClinicBillingData,
  changeClinicPlanApi,
  requestEnterpriseSalesApi,
  updateBillingContactApi,
  updatePaymentMethodApi,
  createStripePortalSessionApi,
} from "../../api/billingApi";

// ---------------------------------------------------------------------------
// Fallback subscription tiers
// ---------------------------------------------------------------------------

const defaultPlans = [
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

function getPlanPricing(plansList, planKey, locations = 1) {
  const plan = plansList.find((p) => p.key === planKey || p.name === planKey);
  if (!plan) return { monthly: 0, setup: 0, label: "—" };

  if (plan.key !== "Enterprise" && plan.name !== "Enterprise") {
    return {
      monthly: plan.monthly,
      setup: plan.setup,
      label: `£${plan.monthly.toLocaleString()}/mo + £${plan.setup} setup`,
    };
  }

  const baseLocations = plan.baseLocations || 2;
  const extraLocations = Math.max(0, locations - baseLocations);
  const baseMonthly = plan.baseMonthly || 2997;
  const baseSetup = plan.baseSetup || 994;
  const perExtraMonthly = plan.perExtraLocationMonthly || 997;
  const perExtraSetup = plan.perExtraLocationSetup || 497;

  const monthly = baseMonthly + extraLocations * perExtraMonthly;
  const setup = baseSetup + extraLocations * perExtraSetup;

  const label =
    extraLocations > 0
      ? `£${baseMonthly.toLocaleString()}/mo (2 locations) + ${extraLocations} × £${perExtraMonthly}/mo — £${monthly.toLocaleString()}/mo total + £${setup.toLocaleString()} setup`
      : `£${baseMonthly.toLocaleString()}/mo + £${baseSetup} setup (covers up to 2 locations)`;

  return { monthly, setup, label };
}

// ---------- Sub components ----------
function StatusTag({ status }) {
  const isPaid = status === "Paid" || status === "active" || status === "Active";
  const isFailed = status === "Failed" || status === "failed";
  const isPending = status === "Pending" || status === "pending";

  const colorClasses = isPaid
    ? "bg-emerald-50 text-emerald-600"
    : isFailed
    ? "bg-red-50 text-red-600"
    : "bg-amber-50 text-amber-600";

  const dotClasses = isPaid
    ? "bg-emerald-500"
    : isFailed
    ? "bg-red-500"
    : "bg-amber-500";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClasses}`} />
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

function ChangePlanModal({
  open,
  onClose,
  currentPlan,
  currentLocations,
  plansList,
  onConfirm,
  onRequestSales,
  loading,
}) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [locations, setLocations] = useState(currentLocations || 1);
  const [salesRequestSent, setSalesRequestSent] = useState(false);

  React.useEffect(() => {
    if (open) {
      setSelectedPlan(currentPlan);
      setLocations(currentLocations || (currentPlan === "Enterprise" ? 2 : 1));
      setSalesRequestSent(false);
    }
  }, [open, currentPlan, currentLocations]);

  const pricing = getPlanPricing(plansList, selectedPlan, locations);
  const isEnterpriseSelected = selectedPlan === "Enterprise";

  const handleConfirm = () => {
    onConfirm({ plan: selectedPlan, locations: 1 });
  };

  const handleRequestSales = () => {
    onRequestSales({ plan: "Enterprise", locations });
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
        {plansList.map((plan) => {
          const isSelected = selectedPlan === plan.key || selectedPlan === plan.name;
          const isActivePlan = plan.key === currentPlan || plan.name === currentPlan;
          return (
            <button
              key={plan.key || plan.name}
              type="button"
              onClick={() => {
                setSelectedPlan(plan.name || plan.key);
                setSalesRequestSent(false);
                if (plan.name === "Enterprise" || plan.key === "Enterprise") {
                  setLocations((l) => Math.max(2, l));
                }
              }}
              className="relative w-full flex items-center justify-between text-left px-5 py-4 rounded-xl border transition-colors cursor-pointer"
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
              loading={loading}
              onClick={handleRequestSales}
              className="!rounded-lg !bg-gray-900 !border-gray-900 !h-10 !px-5 !text-[13.5px] !font-medium"
            >
              <span className="inline-flex items-center gap-1.5">
                <FiPhone size={13} />
                {salesRequestSent ? "Request sent" : "Contact sales"}
              </span>
            </Button>
          ) : (
            <Button
              type="primary"
              loading={loading}
              onClick={handleConfirm}
              className="!rounded-lg !bg-gray-900 !border-gray-900 !h-10 !px-5 !text-[13.5px] !font-medium"
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
// Edit Billing Contact Modal
// ---------------------------------------------------------------------------

function EditContactModal({ open, onClose, currentContact, onSave, loading }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && currentContact) {
      const getVal = (label) => currentContact.find((c) => c.label === label)?.value || "";
      form.setFieldsValue({
        billingName: getVal("Name"),
        billingEmail: getVal("Email"),
        tradingCompany: getVal("Company"),
        vatNumber: getVal("VAT"),
      });
    }
  }, [open, currentContact, form]);

  const handleFinish = async (values) => {
    await onSave(values);
    onClose();
  };

  return (
    <Modal
      title="Edit billing contact"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Save changes"
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-4">
        <Form.Item label="Contact Name" name="billingName" rules={[{ required: true }]}>
          <Input placeholder="e.g. Dr. Amira Patel" />
        </Form.Item>
        <Form.Item label="Billing Email" name="billingEmail" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="e.g. accounts@clinic.com" />
        </Form.Item>
        <Form.Item label="Company Name" name="tradingCompany">
          <Input placeholder="e.g. Bright Smile Ltd" />
        </Form.Item>
        <Form.Item label="VAT Number" name="vatNumber">
          <Input placeholder="e.g. GB 123 4567 89" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Update Payment Method Modal
// ---------------------------------------------------------------------------

function UpdateCardModal({ open, onClose, onSave, onOpenStripePortal, loading }) {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    await onSave({
      brand: values.brand || "VISA",
      last4: values.last4,
      expMonth: values.expMonth,
      expYear: values.expYear,
    });
    onClose();
  };

  return (
    <Modal
      title="Update payment method"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <div className="py-2">
        <p className="text-sm text-gray-500 mb-4">
          Update your payment card on file for automated monthly renewals.
        </p>
        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ brand: "VISA", expMonth: "08", expYear: "27" }}>
          <Form.Item label="Card Brand" name="brand">
            <Input placeholder="VISA / Mastercard" />
          </Form.Item>
          <Form.Item
            label="Last 4 Digits"
            name="last4"
            rules={[{ required: true, len: 4, message: "Enter 4 digits" }]}
          >
            <Input maxLength={4} placeholder="e.g. 4242" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item label="Expiry Month" name="expMonth" rules={[{ required: true }]}>
              <Input maxLength={2} placeholder="MM" />
            </Form.Item>
            <Form.Item label="Expiry Year" name="expYear" rules={[{ required: true }]}>
              <Input maxLength={2} placeholder="YY" />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="!h-10 !rounded-xl !bg-gray-900 !border-gray-900"
            >
              Update card details
            </Button>
            <Button
              type="default"
              icon={<FiExternalLink size={14} />}
              onClick={onOpenStripePortal}
              className="!h-10 !rounded-xl"
            >
              Manage in Stripe Customer Portal
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function Billing() {
  const { billingData, isLoading, refetch } = useClinicBillingData();

  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [editContactOpen, setEditContactOpen] = useState(false);
  const [updateCardOpen, setUpdateCardOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const availablePlans = billingData?.availablePlans && billingData.availablePlans.length > 0
    ? billingData.availablePlans
    : defaultPlans;

  const currentPlan = billingData?.subscription?.plan || "Growth";
  const currentLocations = billingData?.subscription?.locations || 1;
  const currentStatus = billingData?.subscription?.status || "Active";
  const currentMonthlyFee = billingData?.subscription?.monthlyFee || 1497;
  const nextPaymentDate = billingData?.subscription?.nextPaymentDate || "1 July 2026";
  const paymentMethod = billingData?.subscription?.paymentMethod || {
    brand: "VISA",
    last4: "4242",
    expiry: "08/27",
  };
  const invoices = billingData?.invoices || [
    { id: "INV-2026-006", date: "1 Jun 2026", amount: "£2,396.40", status: "Paid" },
    { id: "INV-2026-005", date: "1 May 2026", amount: "£2,396.40", status: "Paid" },
    { id: "INV-2026-004", date: "1 Apr 2026", amount: "£1,796.40", status: "Paid" },
    { id: "INV-2026-003", date: "1 Mar 2026", amount: "£1,796.40", status: "Paid" },
  ];
  const billingContact = billingData?.billingContact || [
    { label: "Name", value: "Dr. Amira Patel" },
    { label: "Email", value: "accounts@brightsmile.co.uk" },
    { label: "Company", value: "Bright Smile Ltd" },
    { label: "VAT", value: "GB 123 4567 89" },
  ];
  const postcodeExclusivity = billingData?.postcodeExclusivity || "OX1–OX4";

  const planInfo = availablePlans.find((p) => p.name === currentPlan || p.key === currentPlan);

  // Self-serve plan change
  const handleConfirmPlan = async ({ plan, locations }) => {
    try {
      setActionLoading(true);
      await changeClinicPlanApi({ plan, locations });
      message.success(`Successfully switched to ${plan} plan!`);
      setChangePlanOpen(false);
      refetch();
    } catch (err) {
      message.error(err?.response?.data?.message || "Failed to change plan");
    } finally {
      setActionLoading(false);
    }
  };

  // Enterprise sales request
  const handleRequestSales = async ({ plan, locations }) => {
    try {
      setActionLoading(true);
      await requestEnterpriseSalesApi({ plan, locations });
      message.success("Enterprise request received. Our sales team will reach out shortly.");
      refetch();
    } catch (err) {
      message.error(err?.response?.data?.message || "Failed to submit request");
    } finally {
      setActionLoading(false);
    }
  };

  // Save billing contact
  const handleSaveContact = async (values) => {
    try {
      setActionLoading(true);
      await updateBillingContactApi(values);
      message.success("Billing contact updated successfully");
      refetch();
    } catch (err) {
      message.error(err?.response?.data?.message || "Failed to update contact");
    } finally {
      setActionLoading(false);
    }
  };

  // Update payment card
  const handleSaveCard = async (values) => {
    try {
      setActionLoading(true);
      await updatePaymentMethodApi(values);
      message.success("Payment method updated successfully");
      refetch();
    } catch (err) {
      message.error(err?.response?.data?.message || "Failed to update card");
    } finally {
      setActionLoading(false);
    }
  };

  // Open Stripe portal
  const handleOpenStripePortal = async () => {
    try {
      const res = await createStripePortalSessionApi();
      if (res?.url) {
        window.open(res.url, "_blank");
      } else {
        message.info("Stripe portal opened in test mode");
      }
    } catch (err) {
      message.error("Failed to connect to billing portal");
    }
  };

  // Download all invoices as CSV
  const handleDownloadAllInvoices = () => {
    const headers = ["Invoice ID,Date,Amount,Status"];
    const rows = invoices.map((inv) => `"${inv.id}","${inv.date}","${inv.amount}","${inv.status}"`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `invoices-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Invoices downloaded successfully");
  };

  // Download single invoice
  const handleDownloadSingleInvoice = (inv) => {
    const receiptText = `INVOICE RECEIPT\n------------------\nInvoice: ${inv.id}\nDate: ${inv.date}\nAmount: ${inv.amount}\nStatus: ${inv.status}\n\nThank you for choosing Orbis Healthcare!`;
    const element = document.createElement("a");
    const file = new Blob([receiptText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${inv.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    message.success(`Receipt ${inv.id} downloaded`);
  };

  return (
    <div>
      <div>
        {/* Header */}
        <div className="lg:flex items-start justify-between mb-4">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-2">
              Billing &amp; Plan
            </h1>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Manage your subscription, payment method and invoices. Billing
              is handled securely by Stripe.
            </p>
          </div>
          <button
            onClick={handleOpenStripePortal}
            className="inline-flex items-center gap-1.5 bg-white text-sm text-gray-700 font-medium px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors shrink-0 cursor-pointer mt-3 lg:mt-0"
          >
            <FiExternalLink size={14} />
            Stripe customer portal
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="py-2 mb-2 text-xs text-gray-400 flex items-center gap-2">
            <Spin size="small" /> Fetching subscription status...
          </div>
        )}

        {/* Plan card */}
        <div className="bg-white rounded-2xl border border-black/5 p-6 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-600">
                {planInfo?.name || currentPlan} plan
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {currentStatus}
              </span>
              {currentPlan === "Enterprise" && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {currentLocations} location{currentLocations > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUpdateCardOpen(true)}
                className="inline-flex items-center gap-1.5 bg-white text-sm text-gray-700 font-medium px-4 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <FiCreditCard size={13} />
                Update card
              </button>
              <button
                onClick={() => setChangePlanOpen(true)}
                className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Change plan
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-serif text-4xl text-gray-900">
              £{currentMonthlyFee.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400">/month + VAT</span>
          </div>
          <div className="text-sm text-gray-500 mb-6">
            Next payment <span className="font-semibold text-gray-800">{nextPaymentDate}</span>{" "}
            · {paymentMethod.brand} ending {paymentMethod.last4}
          </div>

          <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <InfoBlock eyebrow="Plan Tier" eyebrowColor="text-blue-500">
              <div className="text-sm text-gray-900 font-semibold">{planInfo?.desc || `${currentPlan} Tier`}</div>
            </InfoBlock>

            <InfoBlock eyebrow="WhatsApp Channel" eyebrowColor="text-emerald-500">
              <div className="font-semibold text-emerald-600 text-sm">
                Included
              </div>
            </InfoBlock>

            <InfoBlock eyebrow="Postcode Exclusivity" eyebrowColor="text-violet-500">
              <div className="font-semibold text-gray-900 text-sm">
                {postcodeExclusivity}
              </div>
            </InfoBlock>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Invoices */}
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <h2 className="font-serif text-xl text-gray-900">Invoices</h2>
              <button
                onClick={handleDownloadAllInvoices}
                className="inline-flex items-center gap-1.5 bg-white text-sm text-gray-700 font-medium px-3.5 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              >
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
                  <button
                    onClick={() => handleDownloadSingleInvoice(inv)}
                    className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                    title="Download receipt"
                  >
                    <FiDownload size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
              <h2 className="font-serif text-xl text-gray-900 mb-4">
                Payment method
              </h2>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <span className="w-9 h-6 rounded bg-gray-900 text-white text-[9px] font-bold flex items-center justify-center tracking-wide shrink-0">
                  {paymentMethod.brand}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">
                    •••• {paymentMethod.last4}
                  </div>
                  <div className="text-xs text-gray-400">Expires {paymentMethod.expiry}</div>
                </div>
                <button
                  onClick={() => setUpdateCardOpen(true)}
                  className="bg-white text-sm text-gray-700 font-medium px-3.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors shrink-0 cursor-pointer"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Billing contact */}
            <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
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
              <button
                onClick={() => setEditContactOpen(true)}
                className="w-full bg-white text-sm text-gray-700 font-medium py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              >
                Edit details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Plan Modal */}
      <ChangePlanModal
        open={changePlanOpen}
        onClose={() => setChangePlanOpen(false)}
        currentPlan={currentPlan}
        currentLocations={currentLocations}
        plansList={availablePlans}
        onConfirm={handleConfirmPlan}
        onRequestSales={handleRequestSales}
        loading={actionLoading}
      />

      {/* Edit Contact Modal */}
      <EditContactModal
        open={editContactOpen}
        onClose={() => setEditContactOpen(false)}
        currentContact={billingContact}
        onSave={handleSaveContact}
        loading={actionLoading}
      />

      {/* Update Card Modal */}
      <UpdateCardModal
        open={updateCardOpen}
        onClose={() => setUpdateCardOpen(false)}
        onSave={handleSaveCard}
        onOpenStripePortal={handleOpenStripePortal}
        loading={actionLoading}
      />
    </div>
  );
}

export default Billing;
