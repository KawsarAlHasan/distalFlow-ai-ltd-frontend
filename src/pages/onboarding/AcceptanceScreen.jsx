// src/pages/authentication/AcceptanceScreen.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Typography, Alert, Space, Spin } from "antd";
import {
  LockOutlined,
  MailOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { API } from "../../api/api";

const { Title, Text, Paragraph } = Typography;

function AcceptanceScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    temporaryPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/auth/first-login", {
        email: formData.email,
        temporaryPassword: formData.temporaryPassword,
        newPassword: formData.newPassword,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to set password");
      }

      setSuccess(true);
      setLoading(false);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
        <Card className="text-center p-8 max-w-md w-full shadow-xl rounded-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircleOutlined
              style={{
                fontSize: 64,
                color: "#1FA463",
                background: "#EAFBF3",
                padding: "20px",
                borderRadius: "50%",
              }}
            />
          </motion.div>
          <Title level={2} className="mt-4">
            Password Set Successfully!
          </Title>
          <Paragraph className="text-gray-600">
            Your password has been updated. Redirecting to login...
          </Paragraph>
          <Spin className="mt-4" />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-2xl overflow-hidden border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LockOutlined className="text-emerald-600 text-2xl" />
            </div>
            <Title level={2} className="text-2xl font-bold">
              Set Your Password
            </Title>
            <Text className="text-gray-500">
              Please use the temporary password from your email to set a new
              permanent password.
            </Text>
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              className="mb-4"
              closable
              onClose={() => setError(null)}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Text strong className="block mb-1">
                Email Address
              </Text>
              <Input
                size="large"
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-lg"
              />
            </div>

            <div>
              <Text strong className="block mb-1">
                Temporary Password
              </Text>
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter temporary password from email"
                name="temporaryPassword"
                value={formData.temporaryPassword}
                onChange={handleChange}
                required
                className="rounded-lg"
              />
              <Text className="text-xs text-gray-400 mt-1">
                This password was sent to your email and expires in 24 hours.
              </Text>
            </div>

            <div>
              <Text strong className="block mb-1">
                New Password
              </Text>
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Create a new password (min 8 characters)"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="rounded-lg"
              />
            </div>

            <div>
              <Text strong className="block mb-1">
                Confirm New Password
              </Text>
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm your new password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="rounded-lg"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-3 mt-4">
              <Text className="text-sm text-blue-800">
                <strong>Password Requirements:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Use a mix of letters, numbers, and symbols</li>
                  <li>Don't use common words or personal information</li>
                </ul>
              </Text>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="bg-emerald-600 hover:bg-emerald-700 border-0 h-12 text-base font-medium rounded-xl shadow-lg shadow-emerald-200"
            >
              Set Password
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Text type="secondary" className="text-sm">
              Didn't receive the temporary password?{" "}
              <a
                href="/resend-password"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Resend
              </a>
            </Text>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default AcceptanceScreen;
