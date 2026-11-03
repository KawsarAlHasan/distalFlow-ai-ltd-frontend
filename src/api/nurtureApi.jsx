import { API } from "./api";

// -----------------------------------------------------------------------------
// Nurture Sequences & Steps API Services
// -----------------------------------------------------------------------------

// 1. Fetch all sequences for the logged-in clinic
export const fetchNurtureSequencesApi = async () => {
  const res = await API.get("/nurture/all");
  return res.data.data;
};

// 2. Fetch single sequence by ID
export const fetchNurtureSequenceByIdApi = async (id) => {
  const res = await API.get(`/nurture/${id}`);
  return res.data.data;
};

// 3. Create a new sequence
export const createNurtureSequenceApi = async (payload) => {
  const res = await API.post("/nurture/create", payload);
  return res.data.data;
};

// 4. Update sequence (e.g. name, active, campaignId)
export const updateNurtureSequenceApi = async (id, payload) => {
  const res = await API.patch(`/nurture/${id}`, payload);
  return res.data.data;
};

// 5. Delete sequence
export const deleteNurtureSequenceApi = async (id) => {
  const res = await API.delete(`/nurture/${id}`);
  return res.data.data;
};

// 6. Add a step to sequence
export const addNurtureStepApi = async (payload) => {
  const res = await API.post("/nurture/step", payload);
  return res.data.data;
};

// 7. Update step
export const updateNurtureStepApi = async (id, payload) => {
  const res = await API.patch(`/nurture/step/${id}`, payload);
  return res.data.data;
};

// 8. Delete step
export const deleteNurtureStepApi = async (id) => {
  const res = await API.delete(`/nurture/step/${id}`);
  return res.data.data;
};

