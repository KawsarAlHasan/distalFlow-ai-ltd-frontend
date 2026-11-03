import React from "react";
import { useAdsCustomers } from "../api/api";

function TestAds() {
  const { adsCustomers, isLoading, isError, error, refetch } =
    useAdsCustomers();

  console.log(adsCustomers);

  return <div>TestAds</div>;
}

export default TestAds;
