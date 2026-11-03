import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      localStorage.setItem("email", values.clientEmail);
      message.success("Registration successful!");
    //   setTimeout(() => navigate("/verify-email"), 500);
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainBG flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-[660px]">
        {/* Card */}
        <div className="reg-cardd authCard rounded-2xl overflow-hidden">
          {/* Logo + Header */}
          <div className="text-center my-8">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/images/Frame2147228573.png"
                alt="logo"
                className="w-[222px] h-[80px] object-contain mx-auto"
              />
            </Link>

            <h1 className="text-white text-[32px] font-bold tracking-tight leading-tight mb-2">
              Create your account
            </h1>
            <p className="text-[#9b8fa8] text-[15px]">
              Fill in the details below to get started
            </p>
          </div>

          {/* Section: Clinic */}
          <div className="reg-section px-8 pt-8 pb-6">
            <div className="section-label mb-5">
              <BankOutlined className="section-label-icon" />
              <span>Clinic information</span>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={() =>
                message.error("Please fill all required fields correctly.")
              }
              autoComplete="off"
              requiredMark={false}
            >
              <div className="grid grid-cols-2 gap-x-5">
                <Form.Item
                  label={<span className="field-label">Clinic name</span>}
                  name="companyName"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input
                    prefix={<BankOutlined className="input-icon" />}
                    placeholder="Clinic name.."
                    size="large"
                    className="reg-input"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="field-label">Clinic email</span>}
                  name="companyEmail"
                  rules={[
                    { required: true, message: "Required" },
                    { type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="input-icon" />}
                    placeholder="info@clinic.com"
                    size="large"
                    className="reg-input"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label={
                  <span className="field-label">
                    Clinic phone
                    <span className="optional-badge">optional</span>
                  </span>
                }
                name="companyPhone"
              >
                <Input
                  prefix={<PhoneOutlined className="input-icon" />}
                  placeholder="+880 1700-000000"
                  size="large"
                  className="reg-input"
                />
              </Form.Item>

              {/* Divider */}
              <div className="reg-divider" />

              {/* Section: Admin */}
              <div className="section-label mb-5">
                <UserOutlined className="section-label-icon" />
                <span>Admin account</span>
              </div>

              <div className="grid grid-cols-2 gap-x-5">
                <Form.Item
                  label={<span className="field-label">Full name</span>}
                  name="clientName"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input
                    prefix={<UserOutlined className="input-icon" />}
                    placeholder="John Doe"
                    size="large"
                    className="reg-input"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="field-label">Personal email</span>}
                  name="clientEmail"
                  rules={[
                    { required: true, message: "Required" },
                    { type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="input-icon" />}
                    placeholder="john@example.com"
                    size="large"
                    className="reg-input"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="field-label">Password</span>}
                  name="clientPassword"
                  rules={[
                    { required: true, message: "Required" },
                    { min: 8, message: "At least 8 characters" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="input-icon" />}
                    placeholder="Min. 8 characters"
                    size="large"
                    className="reg-input"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="field-label">Confirm password</span>}
                  name="confirmPassword"
                  dependencies={["clientPassword"]}
                  hasFeedback
                  rules={[
                    { required: true, message: "Required" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("clientPassword") === value)
                          return Promise.resolve();
                        return Promise.reject(
                          new Error("Passwords do not match"),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="input-icon" />}
                    placeholder="Re-enter password"
                    size="large"
                    className="reg-input"
                  />
                </Form.Item>
              </div>

              {/* Submit */}
              <Button
                htmlType="submit"
                loading={loading}
                className="my-main-button w-full h-[52px] rounded-xl text-[16px] font-semibold mt-2"
                icon={!loading && <ArrowRightOutlined />}
                iconPosition="end"
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </Form>
          </div>

          {/* Footer */}
          <div className="reg-footer px-8 py-5 text-center">
            <p className="text-[#9b8fa8] text-[14px]">
              Already have an account?{" "}
              <Link to="/login" className="reg-link font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        /* Card */
        .reg-card {
          background: linear-gradient(160deg, #2e1a40 0%, #3a1d56 60%, #2a1540 100%);
          border: 1px solid rgba(214, 181, 117, 0.18);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 24px 60px rgba(0, 0, 0, 0.5);
        }

        /* Section header label */
        .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #d6b575;
        }
        .section-label-icon {
          font-size: 13px;
          color: #d6b575;
          opacity: 0.8;
        }

        /* Field label */
        .field-label {
          font-size: 13px;
          font-weight: 600;
          color: #c8b8d8;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Optional badge */
        .optional-badge {
          font-size: 10px;
          font-weight: 500;
          color: #9b8fa8;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 1px 6px;
          letter-spacing: 0;
          text-transform: none;
        }

        /* Divider */
        .reg-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(214,181,117,0.2) 0%, transparent 100%);
          margin: 4px 0 24px;
        }

        /* Input icon */
        .input-icon {
          color: #7a6a8a !important;
          font-size: 14px;
        }

        /* Inputs */
        .reg-input.ant-input-affix-wrapper,
        .reg-input.ant-input {
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(214, 181, 117, 0.2) !important;
          border-radius: 10px !important;
          color: #fff !important;
          transition: border-color 0.2s, background 0.2s;
        }
        .reg-input.ant-input-affix-wrapper:hover,
        .reg-input.ant-input-affix-wrapper-focused {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(214, 181, 117, 0.55) !important;
          box-shadow: 0 0 0 3px rgba(214, 181, 117, 0.08) !important;
        }
        .reg-input .ant-input,
        .reg-input input {
          background: transparent !important;
          color: #fff !important;
        }
        .reg-input .ant-input::placeholder,
        .reg-input input::placeholder {
          color: #5c5070 !important;
        }
        .reg-input .ant-input-password-icon,
        .reg-input .anticon-eye,
        .reg-input .anticon-eye-invisible {
          color: #d6b575 !important;
        }

        /* Form spacing */
        .ant-form-item {
          margin-bottom: 18px !important;
        }
        .ant-form-item-label {
          padding-bottom: 6px !important;
        }
        .ant-form-item-explain-error {
          font-size: 12px !important;
          color: #f87171 !important;
          margin-top: 4px !important;
        }

        /* Feedback icon colors */
        .ant-form-item-feedback-icon-success .anticon {
          color: #d6b575 !important;
        }

        /* Footer strip */
        .reg-footer {
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Link */
        .reg-link {
          color: #d6b575 !important;
          transition: color 0.15s;
        }
        .reg-link:hover {
          color: #e7ca8b !important;
          text-decoration: underline;
        }

        /* Submit button */
        .my-main-button {
          background: linear-gradient(135deg, #d6b575 0%, #c9a75f 100%) !important;
          border: none !important;
          color: #1d1029 !important;
          letter-spacing: 0.3px;
          transition: all 0.2s ease !important;
        }
        .my-main-button:hover {
          background: linear-gradient(135deg, #e2c484 0%, #d4b06a 100%) !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(214, 181, 117, 0.3) !important;
        }
        .my-main-button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Register;
