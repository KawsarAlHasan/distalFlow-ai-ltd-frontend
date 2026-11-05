import React, { createContext, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { useAdminProfile } from "../hooks/useAdminProfile";
import { useAcceptanceStatus } from "../api/legalApi";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const profileData = useAdminProfile();
  const { statusData, isLoading: statusLoading } = useAcceptanceStatus();

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const location = useLocation();

  if (profileData?.isLoading || statusLoading) {
    return <Loading />;
  }

  if (
    profileData?.isError ||
    profileData?.error ||
    !profileData?.adminProfile
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("adminProfile");
    localStorage.removeItem("profileTimestamp");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    profileData?.adminProfile?.is_active === false ||
    profileData?.adminProfile?.user_role === "User"
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("adminProfile");
    localStorage.removeItem("profileTimestamp");
    return <Navigate to="/unauthorized" />;
  }

  // Clinic legal acceptance onboarding gate: if not accepted, redirect to onboarding acceptance
  if (statusData && statusData.hasAccepted === false) {
    return <Navigate to="/onboarding/acceptance" state={{ from: location }} replace />;
  }

  return (
    <AdminContext.Provider value={profileData}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};