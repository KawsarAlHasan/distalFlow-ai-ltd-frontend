import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Image, Spin } from "antd";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import CampaignHero from "./CampaignHero";
import DoctorSection from "./DoctorSection";
import PatientTestimonials from "./PatientTestimonials";
import HowItWorks from "./HowItWorks";
import TreatmentFAQ from "./TreatmentFAQ";
import SecondaryCTA from "./SecondaryCTA";
import CampaignVideo from "./CampaignVideo";
import CampaignFooter from "./CampaignFooter";
import { fetchCampaignByIdApi } from "../../api/campaignApi";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function CampaignsView() {
  const { campaignId } = useParams();

  // Fetch campaign data from backend if campaignId is a valid ID
  const { data: campaign, isLoading } = useQuery({
    queryKey: ["campaignView", campaignId],
    queryFn: () => fetchCampaignByIdApi(campaignId),
    enabled: Boolean(campaignId),
    retry: 1,
  });

  if (!campaignId) {
    return (
      <div className="min-h-screen bg-[#1c1826] text-white flex items-center justify-center">
        Invalid campaign ID
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1c1826] text-white flex flex-col items-center justify-center gap-3">
        <Spin size="large" />
        <p className="text-gray-400 text-sm">Loading campaign details...</p>
      </div>
    );
  }

  // Fallback name if slug used instead of ID
  const fallbackName = campaignId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const campaignName = campaign?.name || fallbackName;

  console.log("campaign", campaign);

  return (
    <div className="min-h-screen bg-[#1c1826] font-serif text-white">
      {/* NAVBAR */}
      <motion.header
        initial="hidden"
        animate="show"
        variants={fadeDown}
        className="py-3 border-b border-[#d9b46a]/30"
      >
        <div className="flex justify-between max-w-7xl mx-auto px-4">
          <Image
            preview={false}
            className="cursor-pointer !w-[207px] !h-[62px] object-contain"
            src={campaign?.logoUrl || "/images/homeLogo.png"}
            alt="logo"
          />

          <div className="flex items-center gap-2 sm:gap-3 ml-auto mr-2 sm:mr-0">
            {campaign?.navWhatsapp && (
              <Button
                className="!bg-[#25D366] !border-none !text-white !font-semibold !flex !items-center !gap-2 !h-9 sm:!h-10 !px-3 sm:!px-4"
                title="WhatsApp"
                onClick={() =>
                  window.open(
                    `https://wa.me/${campaign.navWhatsapp.replace(/[^0-9]/g, "")}`,
                    "_blank",
                  )
                }
              >
                <FaWhatsapp className="text-base" />
                <span className="hidden sm:inline">WhatsApp</span>
              </Button>
            )}

            <Button
              className="!bg-transparent !border !border-gray-500 !text-white !font-semibold !items-center !gap-2 !h-9 sm:!h-10 !px-3 sm:!px-4 hidden md:!flex"
              onClick={() =>
                (window.location.href = `tel:${(campaign?.navPhone || "01235 643729").replace(/\s/g, "")}`)
              }
            >
              <FaPhoneAlt className="text-sm" />{" "}
              {campaign?.navPhone || "01235 643729"}
            </Button>

            <Button className="!bg-[#d9b46a] !border-none !text-[#1c1826] !font-bold !h-9 sm:!h-10 !px-3 sm:!px-4 !text-xs sm:!text-sm">
              <span className="hidden sm:inline">
                {campaign?.navCtaText || "Book Free Consultation"}
              </span>
              <span className="sm:hidden">Book Now</span>
              <FaArrowRight className="inline ml-1.5 text-xs" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* 1. HERO SECTION (REQUIRED) */}
      <CampaignHero
        container={container}
        fadeUp={fadeUp}
        campaignName={campaignName}
        heroBadge={campaign?.heroBadge}
        headline={campaign?.headline}
        subheadline={campaign?.subheadline}
        bodyCopy={campaign?.bodyCopy}
        rating={campaign?.rating ?? 4.9}
        reviewCount={campaign?.patientCount ?? 340}
        cta={campaign?.cta || "Claim my free consultation"}
        whatsappCta={campaign?.whatsappCta || "WhatsApp Us"}
        formBadge={campaign?.formBadge}
        formTitle={campaign?.formTitle}
        formSubtitle={campaign?.formSubtitle}
        formButtonText={campaign?.formButtonText}
        formCallbackText={campaign?.formCallbackText}
      />

      {/* 2. VIDEO SECTION (OPTIONAL) */}
      {(!campaign || campaign.showVideoSection) && (
        <CampaignVideo
          label={campaign?.videoLabel || "See It For Yourself"}
          title={campaign?.videoTitle || "Watch how it works."}
          subtitle={campaign?.videoSubtitle}
          videoSrc={
            campaign?.videoUrl ||
            campaign?.generatedVideoUrl ||
            "/demo-video.mp4"
          }
          posterSrc={campaign?.videoPosterUrl || ""}
        />
      )}

      {/* 3. DOCTOR SECTION (OPTIONAL) */}
      {(!campaign || campaign.showDoctorSection) && (
        <DoctorSection
          name={campaign?.doctorName || "Mr Alaa Aldaadaa"}
          title={
            campaign?.doctorTitle ||
            "Consultant Oral Surgeon & Implant Specialist · GDC Registered"
          }
          photoSrc={
            campaign?.doctorImageUrl ||
            "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg"
          }
          badgeTitle={campaign?.doctorBadgeTitle || "PhD"}
          badgeSubtitle={
            campaign?.doctorBadgeSubtitle || "UCL Eastman\nDental Institute"
          }
          description={campaign?.doctorDescription}
          credentials={
            campaign?.doctorCredentials && campaign.doctorCredentials.length > 0
              ? campaign.doctorCredentials
              : undefined
          }
        />
      )}

      {/* 4. PATIENT TESTIMONIALS SECTION (OPTIONAL) */}
      {(!campaign || campaign.showTestimonialsSection) && (
        <PatientTestimonials
          rating={campaign?.testimonialRating ?? 5.0}
          reviewCount={campaign?.testimonialReviewCount ?? 200}
          badge={campaign?.testimonialBadge}
          title={campaign?.testimonialTitle}
          testimonials={
            campaign?.testimonials && campaign.testimonials.length > 0
              ? campaign.testimonials
              : undefined
          }
        />
      )}

      {/* 5. HOW IT WORKS SECTION (OPTIONAL) */}
      {(!campaign || campaign.showHowItWorksSection) && (
        <HowItWorks
          badge={campaign?.howItWorksBadge}
          title={campaign?.howItWorksTitle}
          subtitle={campaign?.howItWorksSubtitle}
          steps={
            campaign?.howItWorksSteps && campaign.howItWorksSteps.length > 0
              ? campaign.howItWorksSteps
              : undefined
          }
        />
      )}

      {/* 6. TREATMENT FAQ SECTION (OPTIONAL) */}
      {(!campaign || campaign.showFaqSection) && (
        <TreatmentFAQ
          badge={campaign?.faqBadge}
          title={campaign?.faqTitle}
          subtitle={campaign?.faqSubtitle}
          phone={campaign?.faqPhone || campaign?.navPhone || "01235 643729"}
          faqs={
            campaign?.faqs && campaign.faqs.length > 0
              ? campaign.faqs
              : undefined
          }
        />
      )}

      {/* 7. SECONDARY CTA SECTION (OPTIONAL) */}
      {(!campaign || campaign.showSecondaryCtaSection) && (
        <SecondaryCTA
          phone={
            campaign?.secondaryCtaPhone || campaign?.navPhone || "01235 643729"
          }
        />
      )}

      {/* 8. FOOTER SECTION (OPTIONAL) */}
      {(!campaign || campaign.showFooterSection !== false) && (
        <CampaignFooter
          clinicName={
            campaign?.footerClinicName ||
            campaign?.clinic?.name ||
            "Oxford Smile Clinic"
          }
        />
      )}
    </div>
  );
}

export default CampaignsView;
