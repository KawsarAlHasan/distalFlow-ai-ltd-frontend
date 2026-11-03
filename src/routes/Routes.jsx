import { createBrowserRouter } from "react-router-dom";

import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import CheckCode from "../pages/authentication/CheckCode";
import SetNewPassword from "../pages/authentication/SetNewPassword";
import Unauthorized from "../components/Unauthorized";
import Home from "../pages/homePage/Home";
import { AdminProvider } from "../context/AdminContext";
import MainLayout from "../layout/MainLayout";
import Leads from "../pages/leads/Leads";
import Campaigns from "../pages/campaigns/Campaigns";
import CreateCampaignPage from "../pages/campaigns/CreateCampaignPage";
import Ads from "../pages/ads/Ads";
import Nurture from "../pages/nurture/Nurture";
import Bookings from "../pages/bookings/Bookings";
import Reports from "../pages/reports/Reports";
import Billing from "../pages/billing/Billing";
import Settings from "../pages/settings/Settings";
import NotFound from "../components/NotFound";
import CampaignsView from "../pages/campaignsView/CampaignsView";
import Privacy from "../pages/privacy/Privacy";
import Terms from "../pages/terms/Terms";
import HomeLayout from "../layout/HomeLayout";
import AcceptanceScreen from "../pages/authentication/AcceptanceScreen";
import OnboardingSuccess from "../pages/onboarding/OnboardingSuccess";
import OnboardingCancel from "../pages/onboarding/OnboardingCancel";
import Dashboard from "../pages/dashboard/Dashboard";
import TestAds from "./TestAds";
import IntegrationsPanel from "./IntegrationsPanel";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/onboarding/acceptance",
    element: <AcceptanceScreen />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/check-code",
    element: <CheckCode />,
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/onboarding/success",
    element: <OnboardingSuccess />,
  },
  {
    path: "/onboarding/cancel",
    element: <OnboardingCancel />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
    ],
  },
  {
    path: "/campaign/:campaignId",
    element: <CampaignsView />,
  },
  {
    path: "/",
    element: (
      <AdminProvider>
        <MainLayout />
      </AdminProvider>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/leads",
        element: <Leads />,
      },
      {
        path: "/campaigns",
        element: <Campaigns />,
      },
      {
        path: "/campaigns/new",
        element: <CreateCampaignPage />,
      },
      {
        path: "/ads",
        element: <Ads />,
      },
      {
        path: "/nurture",
        element: <Nurture />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/billing",
        element: <Billing />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/test-ads",
        element: <TestAds />,
      },
      {
        path: "/integrations",
        element: <IntegrationsPanel />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
