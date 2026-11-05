import React, { useState, useEffect } from "react";
import {
  FiUpload,
  FiEye,
  FiLock,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import { Form, Input, Button, message, Alert } from "antd";
import TeamPanel from "./teamPanel/TeamPanel";
import IntegrationsPanel from "./IntegrationsPanel/IntegrationsPanel";
import { useAdmin } from "../../context/AdminContext";
import { API } from "../../api/api";
import { clearAdminProfileCache } from "../../hooks/useAdminProfile";

// ---------- Tabs ----------
const tabs = ["Branding", "Integrations", "Team & roles", "Security & Password"];

// ---------- Sub components ----------
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative pb-3 text-sm font-medium transition-colors ${
        active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {label}
      {active && (
        <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-gray-900 rounded-full" />
      )}
    </button>
  );
}

// ---------- Panel: Branding & Clinic Profile ----------
function BrandingPanel() {
  const { adminProfile, refetch } = useAdmin();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (adminProfile) {
      form.setFieldsValue({
        clinicName: adminProfile.clinic?.name || adminProfile.name || "",
        phone: adminProfile.phone || "",
        email: adminProfile.email || "",
      });
    }
  }, [adminProfile, form]);

  const onSave = async (values) => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (values.clinicName) formData.append("clinicName", values.clinicName);
      if (values.phone) formData.append("phone", values.phone);

      await API.patch("/auth/clinic-admin/update-profile", formData);
      message.success("Clinic details updated successfully!");
      clearAdminProfileCache();
      refetch?.();
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Failed to save clinic details");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onSave}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Clinic identity
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Applied to every landing page and patient message.
          </p>

          <div className="flex flex-col gap-4">
            <Form.Item
              label={<span className="text-sm font-medium text-gray-700">Clinic Name</span>}
              name="clinicName"
              rules={[{ required: true, message: "Clinic name is required" }]}
              className="mb-2"
            >
              <Input
                placeholder="Enter clinic name"
                className="h-10 text-sm rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-sm font-medium text-gray-700">Registered Email</span>}
              name="email"
              className="mb-2"
            >
              <Input
                disabled
                className="h-10 text-sm rounded-lg bg-gray-50 text-gray-500"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-sm font-medium text-gray-700">Contact Phone (Shown to patients)</span>}
              name="phone"
              className="mb-2"
            >
              <Input
                placeholder="e.g. 01865 000 000"
                className="h-10 text-sm rounded-lg"
              />
            </Form.Item>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Brand appearance
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Theme accent for patient lead funnels.
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg border border-black/5 shrink-0 bg-[#1C6168]" />
                <input
                  type="text"
                  readOnly
                  defaultValue="#1C6168"
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3.5 py-2 text-gray-700 font-mono"
                />
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mt-4">
              <FiEye className="text-blue-500 shrink-0 mt-0.5" size={15} />
              <p className="text-xs text-blue-900 leading-relaxed">
                Patients never see the platform backend name — pages and nurture sequences are fully white-labelled for your clinic.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          type="primary"
          htmlType="submit"
          loading={saving}
          className="bg-gray-900 text-white text-sm font-medium h-10 px-6 rounded-xl hover:bg-gray-800 transition-colors"
        >
          {saving ? "Saving..." : "Save Clinic Identity"}
        </Button>
      </div>
    </Form>
  );
}

// ---------- Panel: Security & Password ----------
function SecurityPanel() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await API.put("/auth/clinic-admin/change-password", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      message.success("Password updated successfully!");
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <FiLock className="text-neutral-700" size={17} />
        <h2 className="text-base font-semibold text-gray-900">
          Change Clinic Password
        </h2>
      </div>
      <p className="text-xs text-gray-400 mb-6">
        Keep your account secure by choosing a strong password with at least 6 characters.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Current Password"
          name="oldPassword"
          rules={[{ required: true, message: "Please enter your current password" }]}
        >
          <Input.Password
            placeholder="Enter current password"
            className="h-10 rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "New password is required" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password
            placeholder="Enter new password (min. 6 characters)"
            className="h-10 rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Re-type new password"
            className="h-10 rounded-lg"
          />
        </Form.Item>

        <Form.Item className="mt-6 mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-gray-900 text-white font-medium h-10 px-6 rounded-xl hover:bg-gray-800 transition-colors"
          >
            {loading ? "Updating Password..." : "Update Password"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// ---------- Main component ----------
function Settings() {
  const [tab, setTab] = useState("Branding");

  return (
    <div>
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-serif text-3xl text-gray-900 mb-2">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your clinic profile, branding, security and integrations.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-7 border-b border-gray-200 mb-6 flex-wrap">
          {tabs.map((t) => (
            <TabButton
              key={t}
              label={t}
              active={tab === t}
              onClick={() => setTab(t)}
            />
          ))}
        </div>

        {/* Panels */}
        {tab === "Branding" && <BrandingPanel />}
        {tab === "Integrations" && <IntegrationsPanel />}
        {tab === "Team & roles" && <TeamPanel />}
        {tab === "Security & Password" && <SecurityPanel />}
      </div>
    </div>
  );
}

export default Settings;
