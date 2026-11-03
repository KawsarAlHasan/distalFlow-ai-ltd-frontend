import React from "react";
import Navbar from "./homeComponents/Navbar";
import HeroSection from "./homeComponents/HeroSection";
import FeaturesSection from "./homeComponents/FeaturesSection";
import HowItWorksSection from "./homeComponents/HowItWorksSection";
import IntegrationsSection from "./homeComponents/IntegrationsSection";
import PricingSection from "./homeComponents/PricingSection";
import FAQSection from "./homeComponents/FAQSection";
import CTASection from "./homeComponents/CTASection";
import Footer from "./homeComponents/Footer";
import "./Home.css";
import FeaturesSection3 from "./homeComponents/FeaturesSection3";
import FeaturesSection2 from "./homeComponents/FeaturesSection2";

function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      {/* <FeaturesSection2 /> for test
      <FeaturesSection3 /> for test */}
      <HowItWorksSection />
      <IntegrationsSection />
      {/* <PricingSection /> */}
      <FAQSection />
      <CTASection />
    </div>
  );
}

export default Home;
