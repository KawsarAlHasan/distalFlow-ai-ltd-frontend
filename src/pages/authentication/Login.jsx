import { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, EyeOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import "./Authentication.css";
import { API } from "../../api/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await API.post("/auth/clinic-admin/signin", {
        email: values.email,
        password: values.password,
      });

      message.success("Login successful!");
      localStorage.setItem("token", res.data.data.token);

      // Verify legal terms acceptance status
      try {
        const statusRes = await API.get("/legal/acceptance-status");
        if (statusRes.data?.data?.hasAccepted === false) {
          navigate("/onboarding/acceptance");
          return;
        }
      } catch (checkError) {
        console.error("Legal acceptance status check failed:", checkError);
      }

      navigate("/dashboard");
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
    <div className="flex items-center justify-center mainBG px-3 lg:px-4 py-4 min-h-screen">
      <div className="authCard w-full max-w-[550px] rounded-3xl px-4 lg:px-12 py-8 shadow-2xl">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-3">
          <img
            src="/images/Frame2147228573.png"
            alt="logo"
            className="cursor-pointer !w-[240px] !h-[75px] object-contain"
          />
        </Link>

        {/* Title */}
        <h2 className="text-center text-[26px] lg:text-[34px] font-semibold text-white mb-2">
          Login to Account
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#A1A1AA] text-[15px] mb-6">
          Please enter your email and password to access your clinic portal
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
                message: "Please enter a valid email",
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
          <div className="flex justify-between items-center mb-6">
            <Form.Item name="remember" valuePropName="checked" className="mb-0">
              <Checkbox>
                <span className="text-gray-300 text-[14px]">Remember me</span>
              </Checkbox>
            </Form.Item>

            <Link
              to="/forget-password"
              className="text-[#D6B575] hover:text-[#e7c98b] text-[14px]"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <Button
            htmlType="submit"
            loading={loading}
            className="my-main-button w-full h-[52px] rounded-xl text-[17px] font-semibold"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Legal Footer Notice */}
          <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed">
            By signing in, you agree to the{" "}
            <Link
              to="/terms"
              target="_blank"
              className="text-[#D6B575] hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              target="_blank"
              className="text-[#D6B575] hover:underline"
            >
              Privacy Policy
            </Link>
            . First-time sign-ins will review and confirm clinic legal agreements.
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;