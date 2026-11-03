import { API } from "./api";

// ১. কাস্টমার লিস্ট ফেচ
export const fetchCustomers = async () => {
  const res = await API.get("/ads/customers");
  return res.data.data;
};

// ২. কাস্টমার সিলেক্ট
export const selectCustomer = async (customerId) => {
  const res = await API.post("/ads/select-customer", { customerId });
  return res.data;
};

// ৩. ক্যাম্পেইন তৈরি
export const createCampaign = async (name, budget) => {
  const res = await API.post("/ads/create-campaign", { name, budget });
  return res.data;
};
