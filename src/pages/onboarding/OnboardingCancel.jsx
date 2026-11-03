// src/pages/onboarding/OnboardingCancel.jsx
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Space, Typography, Alert, Result } from "antd";
import { motion } from "framer-motion";
import { API } from "../../api/api";

const { Title, Text, Paragraph } = Typography;

function OnboardingCancel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clinicId = searchParams.get("clinicId");

  // Log the cancellation for analytics
  useEffect(() => {
    if (clinicId) {
      // You can send analytics event here
      console.log(`Payment cancelled for clinic: ${clinicId}`);

      // Optional: Update clinic status to reflect cancellation
      const logCancellation = async () => {
        try {
          await API.post("/clinic/cancel-onboarding", {
            clinicId,
          });
        } catch (error) {
          console.error("Failed to log cancellation:", error);
        }
      };

      logCancellation();
    }
  }, [clinicId]);

  const handleTryAgain = () => {
    navigate("/");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@yourclinic.com";
  };

  const handleContinueLater = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4">
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
                <CloseCircleOutlined
                  style={{
                    fontSize: 80,
                    color: "#DC2626",
                    background: "#FEF2F2",
                    padding: "20px",
                    borderRadius: "50%",
                  }}
                />
              </motion.div>

              <Title level={2} className="mt-6 text-3xl font-bold text-red-600">
                Payment Cancelled
              </Title>
              <Paragraph className="text-lg text-gray-600 mt-2">
                You've cancelled the payment process for your clinic onboarding.
              </Paragraph>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 mx-6 mb-6">
              <div className="flex items-start gap-3">
                <ExclamationCircleOutlined className="text-amber-500 text-xl" />
                <div>
                  <Text strong className="block text-amber-800">
                    What happens now?
                  </Text>
                  <Text className="text-amber-700 text-sm block mt-1">
                    Your clinic has been created but is not yet active. You can
                    complete the payment anytime using the link sent to your
                    email.
                  </Text>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl mb-2">💳</div>
                  <Text strong className="block">
                    Payment Not Processed
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    No payment has been taken from your account.
                  </Text>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl mb-2">📧</div>
                  <Text strong className="block">
                    Check Your Email
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    We've sent a payment link to your email for later
                    completion.
                  </Text>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 text-xl">⏳</div>
                  <div>
                    <Text strong className="block">
                      Temporary Password Expires in 24 Hours
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Your temporary password will expire in 24 hours. If you
                      don't complete the payment, you'll need to request a new
                      one.
                    </Text>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleTryAgain}
                  className="bg-emerald-600 hover:bg-emerald-700 border-0 h-12 text-base font-medium rounded-xl shadow-lg shadow-emerald-200"
                >
                  Start Over
                </Button>
                <Button
                  size="large"
                  block
                  onClick={handleContactSupport}
                  className="h-12 text-base rounded-xl border-amber-200 text-amber-700 hover:border-amber-300 hover:text-amber-800"
                >
                  Need Help? Contact Support
                </Button>
                <Button
                  size="large"
                  block
                  onClick={handleContinueLater}
                  className="h-12 text-base rounded-xl"
                >
                  Continue Later
                </Button>
              </div>
            </div>
          </Card>

          <div className="text-center mt-6">
            <Text type="secondary" className="text-sm">
              Didn't receive the email?{" "}
              <a
                href="mailto:support@yourclinic.com"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Resend Payment Link
              </a>
            </Text>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OnboardingCancel;
