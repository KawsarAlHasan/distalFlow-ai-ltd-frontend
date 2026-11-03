import { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, EyeOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FiFileText, FiExternalLink } from "react-icons/fi";
import "./Authentication.css";
import { API } from "../../api/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [checks, setChecks] = useState({
    terms: false,
    privacy: false,
    controller: false,
    dpa: false,
  });

  const handleCheck = (key) => (e) => {
    setChecks((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  const allChecked = Object.values(checks).every(Boolean);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    if (!allChecked) {
      message.error(
        "Please check all the required acknowledgements before logging in.",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/clinic-admin/signin", {
        email: values.email,
        password: values.password,
      });

      message.success("Login successful!");

      localStorage.setItem("token", res.data.data.token);

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.error(error, "error");
      message.error(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mainBG px-3 lg:px-4 py-4">
      <div className="authCard w-full max-w-[550px] rounded-3xl px-4 lg:px-12 py-6">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-2">
          <img
            src="/images/Frame2147228573.png"
            alt="logo"
            className="cursor-pointer !w-[267px] !h-[80px] object-contain"
          />
        </Link>

        {/* Title */}
        <h2 className="text-center text-[28px] lg:text-[38px] font-semibold text-white mb-3">
          Login to Account
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#A1A1AA] text-[16px] mb-5 lg:mb-6">
          Please enter your email and password to continue
        </p>

        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {/* Email */}
          <Form.Item
            label={
              <span className="text-[#D6B575] text-[15px]">Email Address</span>
            }
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email address",
              },
              {
                type: "email",
                message: "Please enter valid email",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Enter your email address"
              className="h-[50px] rounded-xl"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={<span className="text-[#D6B575] text-[15px]">Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              className="h-[50px] rounded-xl"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: "#d6b575" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "#d6b575" }} />
                )
              }
            />
          </Form.Item>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember" valuePropName="checked" className="mb-0">
              <Checkbox>
                <span className="text-gray-300">Remember Password</span>
              </Checkbox>
            </Form.Item>

            <Link
              to="/forget-password"
              className="text-[#D6B575] hover:text-[#e7c98b]"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Acknowledgement checkboxes */}
          <div className="mb-4 ">
            <div className="flex items-center gap-2 mb-4">
              <FiFileText className="text-[#D6B575]" size={16} />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#D6B575] uppercase">
                Required acknowledgements
              </span>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={checks.terms}
                  onChange={handleCheck("terms")}
                  className="mt-0.5"
                />
                <span className="text-[14px] text-gray-300 leading-relaxed">
                  I have read and agree to the{" "}
                  <Link
                    to="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D6B575] font-medium underline decoration-[#D6B575] decoration-2 underline-offset-2 inline-flex items-center gap-1"
                  >
                    Platform Terms and Conditions
                    <FiExternalLink size={11} />
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={checks.privacy}
                  onChange={handleCheck("privacy")}
                  className="mt-0.5"
                />
                <span className="text-[14px] text-gray-300 leading-relaxed">
                  I accept the{" "}
                  <Link
                    to="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D6B575] font-medium underline decoration-[#D6B575] decoration-2 underline-offset-2 inline-flex items-center gap-1"
                  >
                    Privacy Policy
                    <FiExternalLink size={11} />
                  </Link>
                  , including how patient and lead data is collected, used, and
                  stored.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={checks.controller}
                  onChange={handleCheck("controller")}
                  className="mt-0.5"
                />
                <span className="text-[14px] text-gray-300 leading-relaxed">
                  I acknowledge that my clinic acts as the{" "}
                  <strong className="text-white">Data Controller</strong> for
                  all Patient Data processed through the Platform, and that
                  DistalFlo AI Ltd acts solely as a Data Processor on the
                  clinic's behalf.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={checks.dpa}
                  onChange={handleCheck("dpa")}
                  className="mt-0.5"
                />
                <span className="text-[14px] text-gray-300 leading-relaxed">
                  I agree to the{" "}
                  <span className="font-medium text-white">
                    Data Processing Agreement
                  </span>{" "}
                  governing DistalFlo's processing of Patient Data on behalf of
                  the clinic.
                </span>
              </label>
            </div>
          </div>

          {/* Button */}
          <Button
            htmlType="submit"
            loading={loading}
            disabled={!allChecked}
            className="my-main-button w-full h-[55px] rounded-xl text-[18px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
