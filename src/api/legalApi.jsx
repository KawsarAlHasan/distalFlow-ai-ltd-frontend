import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

// Fetch active document (public)
export const useActiveDocument = (type = "TERMS_OF_SERVICE") => {
  const getData = async () => {
    const response = await API.get(`/legal/active?type=${type}`);
    return response.data.data;
  };

  const {
    data: activeDoc,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["activeLegalDocument", type],
    queryFn: getData,
  });

  return { activeDoc, isLoading, isError, error, refetch };
};

// Fetch clinic's accepted agreements (authenticated)
export const useMyAgreements = (type) => {
  const token = localStorage.getItem("token");
  const getData = async () => {
    if (!token) return null;
    const url = type ? `/legal/my-agreements?type=${type}` : "/legal/my-agreements";
    const response = await API.get(url);
    return response.data.data;
  };

  const {
    data: myAgreements,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myLegalAgreements", type],
    queryFn: getData,
    enabled: !!token,
  });

  return { myAgreements, isLoading, isError, error, refetch };
};

// Check if current clinic has accepted agreements
export const useAcceptanceStatus = () => {
  const token = localStorage.getItem("token");
  const getData = async () => {
    if (!token) return { hasAccepted: true };
    const response = await API.get("/legal/acceptance-status");
    return response.data.data;
  };

  const {
    data: statusData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["legalAcceptanceStatus"],
    queryFn: getData,
    enabled: !!token,
  });

  return { statusData, isLoading, isError, error, refetch };
};

// Accept agreements permanently for clinic
export const acceptLegalAgreementsApi = async ({ termsDocumentId, privacyDocumentId }) => {
  const response = await API.post("/legal/accept", { termsDocumentId, privacyDocumentId });
  return response.data;
};

