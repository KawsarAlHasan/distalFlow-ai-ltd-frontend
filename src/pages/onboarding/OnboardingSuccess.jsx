// src/pages/onboarding/OnboardingSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Result, Spin, Card, Space, Typography, Alert } from "antd";
import { motion } from "framer-motion";
import { API } from "../../api/api";

const { Title, Text, Paragraph } = Typography;

function OnboardingSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("processing");
  const [clinicData, setClinicData] = useState(null);
  const [error, setError] = useState(null);

  const clinicId = searchParams.get("clinicId");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPaymentAndActivate = async () => {
      if (!clinicId) {
        setStatus("error");
        setError("No clinic ID found in the URL.");
        setLoading(false);
        return;
      }

      try {
        // First, get the clinic status to check if already activated

        const statusResponse = await API.get(
          `/clinic/onboarding-status/${clinicId}`,
        );

        if (!statusResponse.ok) {
          throw new Error("Failed to fetch clinic status");
        }

        const statusData = await statusResponse.json();

        if (statusData.data?.status === "ACTIVE") {
          // Clinic is already active
          setStatus("success");
          setClinicData(statusData.data);
          setLoading(false);
          return;
        }

        // If not active, trigger payment verification
        const response = await API.post("/clinic/webhook/payment", {
          clinicId,
          sessionId,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Payment verification failed");
        }

        setStatus("success");
        setClinicData(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
        setError(
          err.message || "Failed to verify payment. Please contact support.",
        );
        setLoading(false);
      }
    };

    verifyPaymentAndActivate();
  }, [clinicId, sessionId]);

  const handleGoToDashboard = () => {
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@yourclinic.com";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
        <Card className="text-center p-8 max-w-md w-full shadow-xl rounded-2xl">
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            className="mb-4"
          />
          <Title level={3} className="mt-4">
            Verifying Your Payment
          </Title>
          <Paragraph className="text-gray-500">
            Please wait while we confirm your payment and activate your
            clinic...
          </Paragraph>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <Card className="text-center p-8 max-w-md w-full shadow-xl rounded-2xl">
          <Result
            status="error"
            title="Payment Verification Failed"
            subTitle="We couldn't verify your payment. Don't worry, our team will help you."
            extra={[
              <Space
                direction="vertical"
                size="middle"
                key="actions"
                className="w-full"
              >
                <Alert
                  message="What to do next?"
                  description={
                    <ul className="text-left list-disc pl-4 space-y-1">
                      <li>
                        Check your email for payment confirmation from Stripe
                      </li>
                      <li>Contact our support team for assistance</li>
                      <li>Try completing the payment again</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
                <Button
                  type="primary"
                  onClick={handleContactSupport}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Contact Support
                </Button>
                <Button onClick={handleGoHome} className="w-full">
                  Go Home
                </Button>
              </Space>,
            ]}
          />
          {error && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg text-left">
              <Text type="secondary" className="text-sm">
                Error details: {error}
              </Text>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-2xl rounded-3xl overflow-hidden border-0">
            <div className="text-center p-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <CheckCircleOutlined
                  style={{
                    fontSize: 80,
                    color: "#1FA463",
                    background: "#EAFBF3",
                    padding: "20px",
                    borderRadius: "50%",
                  }}
                />
              </motion.div>

              <Title level={2} className="mt-6 text-3xl font-bold">
                🎉 Payment Successful!
              </Title>
              <Paragraph className="text-lg text-gray-600 mt-2">
                Your clinic has been successfully onboarded and activated.
              </Paragraph>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 mx-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text type="secondary" className="text-sm">
                    Clinic Name
                  </Text>
                  <Text strong className="block text-base">
                    {clinicData?.name || "Your Clinic"}
                  </Text>
                </div>
                <div>
                  <Text type="secondary" className="text-sm">
                    Status
                  </Text>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <Text strong className="text-emerald-600">
                      Active
                    </Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary" className="text-sm">
                    Plan
                  </Text>
                  <Text strong className="block text-base">
                    {clinicData?.subscription?.plan || "N/A"}
                  </Text>
                </div>
                <div>
                  <Text type="secondary" className="text-sm">
                    Admin Email
                  </Text>
                  <Text strong className="block text-base">
                    {clinicData?.admin?.email || "Check your email"}
                  </Text>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 text-xl">📧</div>
                  <div>
                    <Text strong className="block">
                      Check Your Email
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      We've sent a confirmation email with login instructions.
                      Use the temporary password provided in the email.
                    </Text>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-amber-500 text-xl">🔑</div>
                  <div>
                    <Text strong className="block">
                      First Time Login
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Use the temporary password from the email to log in.
                      You'll be prompted to set a new password for security.
                    </Text>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleGoToDashboard}
                  className="bg-emerald-600 hover:bg-emerald-700 border-0 h-12 text-base font-medium rounded-xl shadow-lg shadow-emerald-200"
                >
                  Go to Login
                </Button>
                <Button
                  size="large"
                  block
                  onClick={handleGoHome}
                  className="h-12 text-base rounded-xl"
                >
                  Return Home
                </Button>
              </div>
            </div>
          </Card>

          <div className="text-center mt-6">
            <Text type="secondary" className="text-sm">
              Need help?{" "}
              <a
                href="mailto:support@yourclinic.com"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Contact Support
              </a>
            </Text>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OnboardingSuccess;
