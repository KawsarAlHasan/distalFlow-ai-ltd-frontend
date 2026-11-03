import { API } from "./api";

// -----------------------------------------------------------------------------
// Campaign API Services
// -----------------------------------------------------------------------------

// 1. Create a new campaign (supports both JSON payload and FormData for uploads)
export const createCampaignApi = async (payload) => {
  const isFormData = payload instanceof FormData;
  // For FormData, let Axios / browser automatically set multipart/form-data with proper boundary
  const config = isFormData
    ? { headers: { "Content-Type": undefined } }
    : {};

  const res = await API.post("/campaign/create", payload, config);
  return res.data;
};

// 2. Fetch all campaigns for the logged-in clinic
export const fetchCampaignsApi = async () => {
  const res = await API.get("/campaign/all");
  return res.data.data;
};

// 3. Fetch single campaign details by ID
export const fetchCampaignByIdApi = async (id) => {
  const res = await API.get(`/campaign/${id}`);
  return res.data.data;
};
