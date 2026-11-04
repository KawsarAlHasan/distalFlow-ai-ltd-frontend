import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

// Fetch current clinic billing details, subscription, invoices, contacts
export const useClinicBillingData = () => {
  const getData = async () => {
    const response = await API.get("/billing/my-billing");
    return response.data.data;
  };

  const {
    data: billingData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["clinicBillingData"],
    queryFn: getData,
  });

  return { billingData, isLoading, isError, error, refetch };
};

// Change subscription tier (Solo, Growth, Pro)
export const changeClinicPlanApi = async ({ plan, locations = 1 }) => {
  const response = await API.post("/billing/change-plan", { plan, locations });
  return response.data;
};

// Request enterprise sales-assisted tier
export const requestEnterpriseSalesApi = async ({ plan = "Enterprise", locations = 2, notes }) => {
  const response = await API.post("/billing/request-sales", { plan, locations, notes });
  return response.data;
};

// Update billing contact details
export const updateBillingContactApi = async (payload) => {
  const response = await API.patch("/billing/billing-contact", payload);
  return response.data;
};

// Update card / payment method details
export const updatePaymentMethodApi = async (payload) => {
  const response = await API.patch("/billing/update-payment-method", payload);
  return response.data;
};

// Create Stripe Customer Portal session
export const createStripePortalSessionApi = async () => {
  const response = await API.post("/billing/create-portal-session");
  return response.data.data;
};

