import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch, Input, Select, message, Spin } from "antd";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiCheck,
  FiVideo,
  FiUser,
  FiMessageSquare,
  FiList,
  FiHelpCircle,
  FiMousePointer,
  FiStar,
  FiGlobe,
  FiLayout,
  FiUploadCloud,
  FiFilm,
  FiImage,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { createCampaignApi } from "../../api/campaignApi";

const { TextArea } = Input;
const { Option } = Select;

export default function CreateCampaignPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  // ---------------------------------------------------------------------------
  // State: Files & Previews (Direct File Uploads, No Links)
  // ---------------------------------------------------------------------------
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [doctorImageFile, setDoctorImageFile] = useState(null);
  const [doctorImagePreview, setDoctorImagePreview] = useState(null);

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [videoPosterFile, setVideoPosterFile] = useState(null);
  const [videoPosterPreview, setVideoPosterPreview] = useState(null);

  // ---------------------------------------------------------------------------
  // State: Text & Config Fields
  // ---------------------------------------------------------------------------

  // Top Navbar / Header Info
  const [headerState, setHeaderState] = useState({
    navPhone: "01235 643729",
    navWhatsapp: "07700900000",
    navCtaText: "Book Free Consultation",
  });

  // 1. HERO SECTION (REQUIRED)
  const [heroState, setHeroState] = useState({
    name: "Dental Implants",
    heroBadge: "DENTAL IMPLANTS",
    headline: "A brighter smile in one visit",
    subheadline: "done properly.",
    bodyCopy:
      "Permanent, natural-looking dental implants placed by our award-winning Oxford team. Book your free consultation.",
    rating: 4.9,
    patientCount: 340,
    cta: "Claim my free consultation",
    whatsappCta: "WhatsApp Us",
    heroHighlights: [
      "Free consultation, no obligation",
      "Medically-trained practitioners",
      "No surgery, no downtime",
      "Results in days",
    ],
    // Form Card
    formBadge: "FREE CONSULTATION",
    formTitle: "Book Your Free Consultation",
    formSubtitle:
      "No charge. No obligation. Tell us what you'd like to achieve and we'll guide you through your options.",
    formButtonText: "Claim my free consultation",
    formCallbackText: "We'll call you within 5 minutes — Mon to Sat, 8am–8pm.",
    formGuarantees: ["Completely free", "No hard sell", "We'll reply promptly"],
    clinicLocations: ["Oxford", "Didcot"],
    aiGreeting:
      "Hi, this is Bright Smile Dental calling about your dental implant enquiry. Is now a good time for a quick chat?",
  });

  // 2. VIDEO SECTION (OPTIONAL)
  const [videoSection, setVideoSection] = useState({
    show: false,
    label: "See It For Yourself",
    title: "Watch how it works.",
    subtitle:
      "A quick look inside the clinic, the process, and the results our patients love — straight from the team who deliver them.",
    videoScript: "",
  });

  // 3. DOCTOR SECTION (OPTIONAL)
  const [doctorSection, setDoctorSection] = useState({
    show: true,
    badge: "Your Surgeon",
    name: "Mr Alaa Aldaadaa",
    title: "Consultant Oral Surgeon & Implant Specialist · GDC Registered",
    qualification: "Consultant Oral Surgeon",
    badgeTitle: "PhD",
    badgeSubtitle: "UCL Eastman\nDental Institute",
    description:
      "Alaa — or 'Al' as his patients know him — is a multi-award-winning oral surgeon and one of a handful of surgeons in the UK with triple higher training: a PhD, a Master's in Clinical Oral Surgery (with distinction), and a Diploma in Implant Dentistry.",
    credentials: [
      "PhD & Masters in Clinical Oral Surgery (with distinction) — UCL Eastman",
      "Diploma in Implant Dentistry — Harley Street & University of Warwick",
      "Member of the Royal College of Surgeons of England",
      "Higher surgical training: Barts & the Royal London Hospitals",
      "Dentistry Awards 2024 Finalist",
    ],
  });

  // 4. TESTIMONIALS SECTION (OPTIONAL)
  const [testimonialsSection, setTestimonialsSection] = useState({
    show: true,
    badge: "Patient Stories",
    title: "Real results from real Oxfordshire patients.",
    rating: 5.0,
    reviewCount: 200,
    testimonials: [
      {
        name: "Paul",
        detail: "Dental Implants",
        quote:
          "It's exactly what I envisaged — you've restored my smile and my confidence. I can eat anything I want again. I genuinely wish I'd done this years ago.",
        rating: 5,
        highlight: false,
      },
      {
        name: "Margaret",
        detail: "Single Implant, Didcot",
        quote:
          "Alaa is exceptional. He explained everything at every stage and I felt completely at ease. The result is incredible — no one can tell they're not my real teeth.",
        rating: 5,
        highlight: false,
      },
      {
        name: "Richard",
        detail: "Multiple Implants, Oxford",
        quote:
          "I'd been living with a gap for three years and was terrified of the procedure. The team were so reassuring, and honestly — it was nothing like I feared.",
        rating: 5,
        highlight: true,
      },
    ],
  });

  // 5. HOW IT WORKS SECTION (OPTIONAL)
  const [howItWorksSection, setHowItWorksSection] = useState({
    show: true,
    badge: "How It Works",
    title: "Three steps to your new smile.",
    subtitle:
      "The whole process is straightforward, dentist-led, and at your own pace.",
    steps: [
      {
        stepNumber: 1,
        title: "Free Smile Consultation",
        description:
          "Tell us about your smile and what you'd like to change. Our dental team reviews your case and recommends a plan — completely free, no pressure.",
      },
      {
        stepNumber: 2,
        title: "3D Scan & Treatment Plan",
        description:
          "Visit us in Oxford or Didcot for a full oral health check and a precision 3D scan. We design your aligners and show you a digital preview of your result before you commit.",
      },
      {
        stepNumber: 3,
        title: "Wear & Transform",
        description:
          "Your custom aligners are delivered to the clinic. Wear them 22 hours a day, swapping to a new set every 1–2 weeks. Your dentist checks your progress throughout.",
      },
    ],
  });

  // 6. TREATMENT FAQ SECTION (OPTIONAL)
  const [faqSection, setFaqSection] = useState({
    show: true,
    badge: "FAQ",
    title: "Common questions.",
    subtitle: "Still unsure? Call us — we're happy to chat.",
    phone: "01235 643729",
    faqs: [
      {
        question: "Am I a suitable candidate for this treatment?",
        answer:
          "Most patients with mild to moderate needs are suitable. The best way to know for sure is a free consultation and scan — our team will assess your case honestly.",
      },
      {
        question: "How long will treatment take?",
        answer:
          "Treatment typically takes between 4 and 12 months depending on complexity. Simpler cases can be as quick as a few months.",
      },
      {
        question: "What is 0% finance — and do I qualify?",
        answer:
          "0% finance lets you spread the cost of treatment over several months with no added interest. Most patients qualify subject to a simple affordability check.",
      },
    ],
  });

  // 7. SECONDARY CTA SECTION (OPTIONAL)
  const [secondaryCtaSection, setSecondaryCtaSection] = useState({
    show: true,
    badge: "Book Now",
    title: "Ready to see what's possible?",
    subtitle:
      "Book your free consultation — we'll assess your smile, answer every question, and show you exactly what treatment would look like for you. Zero cost, zero obligation.",
    buttonText: "Claim my free consultation",
    phone: "01235 643729",
    whatsapp: "07700900000",
    concerns: ["Crowding", "Gaps / Spacing", "Bite Issues", "Something else"],
  });

  // 8. FOOTER SECTION (OPTIONAL)
  const [footerSection, setFooterSection] = useState({
    show: true,
    clinicName: "Oxford Smile Clinic",
    text: "All rights reserved.",
  });

  // ---------------------------------------------------------------------------
  // File Upload Handlers (No URLs/Links)
  // ---------------------------------------------------------------------------
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };
  const removeLogo = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleDoctorPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (doctorImagePreview) URL.revokeObjectURL(doctorImagePreview);
    setDoctorImageFile(file);
    setDoctorImagePreview(URL.createObjectURL(file));
  };
  const removeDoctorPhoto = () => {
    if (doctorImagePreview) URL.revokeObjectURL(doctorImagePreview);
    setDoctorImageFile(null);
    setDoctorImagePreview(null);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };
  const removeVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null);
    setVideoPreview(null);
  };

  const handleVideoPosterUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (videoPosterPreview) URL.revokeObjectURL(videoPosterPreview);
    setVideoPosterFile(file);
    setVideoPosterPreview(URL.createObjectURL(file));
  };
  const removeVideoPoster = () => {
    if (videoPosterPreview) URL.revokeObjectURL(videoPosterPreview);
    setVideoPosterFile(null);
    setVideoPosterPreview(null);
  };

  // ---------------------------------------------------------------------------
  // Handlers for Repeating Lists
  // ---------------------------------------------------------------------------

  // Highlights
  const addHighlight = () => {
    setHeroState((prev) => ({
      ...prev,
      heroHighlights: [...prev.heroHighlights, "New benefit point"],
    }));
  };
  const updateHighlight = (index, value) => {
    setHeroState((prev) => {
      const arr = [...prev.heroHighlights];
      arr[index] = value;
      return { ...prev, heroHighlights: arr };
    });
  };
  const removeHighlight = (index) => {
    setHeroState((prev) => ({
      ...prev,
      heroHighlights: prev.heroHighlights.filter((_, i) => i !== index),
    }));
  };

  // Guarantees
  const addGuarantee = () => {
    setHeroState((prev) => ({
      ...prev,
      formGuarantees: [...prev.formGuarantees, "New guarantee"],
    }));
  };
  const updateGuarantee = (index, value) => {
    setHeroState((prev) => {
      const arr = [...prev.formGuarantees];
      arr[index] = value;
      return { ...prev, formGuarantees: arr };
    });
  };
  const removeGuarantee = (index) => {
    setHeroState((prev) => ({
      ...prev,
      formGuarantees: prev.formGuarantees.filter((_, i) => i !== index),
    }));
  };

  // Doctor Credentials
  const addDoctorCredential = () => {
    setDoctorSection((prev) => ({
      ...prev,
      credentials: [...prev.credentials, "New surgeon credential"],
    }));
  };
  const updateDoctorCredential = (index, value) => {
    setDoctorSection((prev) => {
      const arr = [...prev.credentials];
      arr[index] = value;
      return { ...prev, credentials: arr };
    });
  };
  const removeDoctorCredential = (index) => {
    setDoctorSection((prev) => ({
      ...prev,
      credentials: prev.credentials.filter((_, i) => i !== index),
    }));
  };

  // Testimonials
  const addTestimonial = () => {
    setTestimonialsSection((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        {
          name: "Patient Name",
          detail: "Treatment detail",
          quote: "Write patient experience or review quote here...",
          rating: 5,
          highlight: false,
        },
      ],
    }));
  };
  const updateTestimonial = (index, key, value) => {
    setTestimonialsSection((prev) => {
      const list = [...prev.testimonials];
      list[index] = { ...list[index], [key]: value };
      return { ...prev, testimonials: list };
    });
  };
  const removeTestimonial = (index) => {
    setTestimonialsSection((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }));
  };

  // Steps
  const addStep = () => {
    setHowItWorksSection((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          stepNumber: prev.steps.length + 1,
          title: "New step title",
          description: "Describe what happens during this step...",
        },
      ],
    }));
  };
  const updateStep = (index, key, value) => {
    setHowItWorksSection((prev) => {
      const list = [...prev.steps];
      list[index] = { ...list[index], [key]: value };
      return { ...prev, steps: list };
    });
  };
  const removeStep = (index) => {
    setHowItWorksSection((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  // FAQs
  const addFaq = () => {
    setFaqSection((prev) => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        {
          question: "New frequently asked question?",
          answer: "Detailed answer explaining the process or options...",
        },
      ],
    }));
  };
  const updateFaq = (index, key, value) => {
    setFaqSection((prev) => {
      const list = [...prev.faqs];
      list[index] = { ...list[index], [key]: value };
      return { ...prev, faqs: list };
    });
  };
  const removeFaq = (index) => {
    setFaqSection((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  // ---------------------------------------------------------------------------
  // Submit Campaign via FormData (Direct File Uploads)
  // ---------------------------------------------------------------------------
  const handleSubmit = async () => {
    if (!heroState.name.trim()) {
      message.error("Campaign / Treatment name is required!");
      setActiveTab("hero");
      return;
    }

    try {
      setSubmitting(true);

      const campaignData = {
        // Navbar
        navPhone: headerState.navPhone,
        navWhatsapp: headerState.navWhatsapp,
        navCtaText: headerState.navCtaText,

        // Hero (Required)
        name: heroState.name,
        heroBadge: heroState.heroBadge,
        headline: heroState.headline,
        subheadline: heroState.subheadline,
        bodyCopy: heroState.bodyCopy,
        rating: Number(heroState.rating),
        patientCount: Number(heroState.patientCount),
        cta: heroState.cta,
        whatsappCta: heroState.whatsappCta,
        heroHighlights: heroState.heroHighlights,
        formBadge: heroState.formBadge,
        formTitle: heroState.formTitle,
        formSubtitle: heroState.formSubtitle,
        formButtonText: heroState.formButtonText,
        formCallbackText: heroState.formCallbackText,
        formGuarantees: heroState.formGuarantees,
        clinicLocations: heroState.clinicLocations,
        aiGreeting: heroState.aiGreeting,

        // Video Section (Optional)
        showVideoSection: videoSection.show,
        videoLabel: videoSection.label,
        videoTitle: videoSection.title,
        videoSubtitle: videoSection.subtitle,
        videoScript: videoSection.videoScript || undefined,

        // Doctor Section (Optional)
        showDoctorSection: doctorSection.show,
        doctorBadge: doctorSection.badge,
        doctorName: doctorSection.name,
        doctorTitle: doctorSection.title,
        doctorQualification: doctorSection.qualification,
        doctorBadgeTitle: doctorSection.badgeTitle,
        doctorBadgeSubtitle: doctorSection.badgeSubtitle,
        doctorDescription: doctorSection.description,
        doctorCredentials: doctorSection.credentials,

        // Testimonials (Optional)
        showTestimonialsSection: testimonialsSection.show,
        testimonialBadge: testimonialsSection.badge,
        testimonialTitle: testimonialsSection.title,
        testimonialRating: Number(testimonialsSection.rating),
        testimonialReviewCount: Number(testimonialsSection.reviewCount),
        testimonials: testimonialsSection.show
          ? testimonialsSection.testimonials.map((t, idx) => ({
              ...t,
              order: idx,
            }))
          : [],

        // How It Works (Optional)
        showHowItWorksSection: howItWorksSection.show,
        howItWorksBadge: howItWorksSection.badge,
        howItWorksTitle: howItWorksSection.title,
        howItWorksSubtitle: howItWorksSection.subtitle,
        howItWorksSteps: howItWorksSection.show
          ? howItWorksSection.steps.map((s, idx) => ({
              stepNumber: s.stepNumber || idx + 1,
              title: s.title,
              description: s.description,
              order: idx,
            }))
          : [],

        // FAQs (Optional)
        showFaqSection: faqSection.show,
        faqBadge: faqSection.badge,
        faqTitle: faqSection.title,
        faqSubtitle: faqSection.subtitle,
        faqPhone: faqSection.phone,
        faqs: faqSection.show
          ? faqSection.faqs.map((f, idx) => ({
              ...f,
              order: idx,
            }))
          : [],

        // Secondary CTA (Optional)
        showSecondaryCtaSection: secondaryCtaSection.show,
        secondaryCtaBadge: secondaryCtaSection.badge,
        secondaryCtaTitle: secondaryCtaSection.title,
        secondaryCtaSubtitle: secondaryCtaSection.subtitle,
        secondaryCtaButtonText: secondaryCtaSection.buttonText,
        secondaryCtaPhone: secondaryCtaSection.phone,
        secondaryCtaWhatsapp: secondaryCtaSection.whatsapp,
        secondaryCtaConcerns: secondaryCtaSection.concerns,

        // Footer (Optional)
        showFooterSection: footerSection.show,
        footerClinicName: footerSection.clinicName,
        footerText: footerSection.text,
      };

      // Construct FormData for direct file posting
      const formData = new FormData();
      formData.append("data", JSON.stringify(campaignData));

      // Append direct binary files if user uploaded them
      if (logoFile) {
        formData.append("logo", logoFile);
      }
      if (doctorImageFile) {
        formData.append("doctorImage", doctorImageFile);
      }
      if (videoFile) {
        formData.append("video", videoFile);
      }
      if (videoPosterFile) {
        formData.append("videoPoster", videoPosterFile);
      }

      await createCampaignApi(formData);

      message.success("Campaign created with uploaded media successfully!");
      navigate("/campaigns");
    } catch (err) {
      console.error(err);
      message.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create campaign. Please check inputs.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const navItems = [
    {
      id: "hero",
      label: "1. Hero Section",
      required: true,
      icon: HiOutlineSparkles,
    },
    { id: "navbar", label: "Header & Branding", optional: true, icon: FiGlobe },
    { id: "video", label: "Video Section", optional: true, icon: FiVideo },
    { id: "doctor", label: "Doctor Profile", optional: true, icon: FiUser },
    {
      id: "testimonials",
      label: "Patient Stories",
      optional: true,
      icon: FiMessageSquare,
    },
    { id: "howItWorks", label: "How It Works", optional: true, icon: FiList },
    { id: "faq", label: "Treatment FAQ", optional: true, icon: FiHelpCircle },
    {
      id: "secondaryCta",
      label: "Secondary CTA",
      optional: true,
      icon: FiMousePointer,
    },
    { id: "footer", label: "Footer", optional: true, icon: FiLayout },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-24 text-gray-900">
      {/* Top Header / Sticky Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/campaigns")}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <FiArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#c08a2e] bg-[#fbf5e8] px-2 py-0.5 rounded">
                  New Campaign
                </span>
                <span className="text-xs text-gray-400">
                  · Direct Media Upload
                </span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                {heroState.name || "Untitled Campaign"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/campaigns")}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 rounded-xl shadow-md transition-all cursor-pointer"
            >
              {submitting ? (
                <>
                  <Spin size="small" /> Uploading &amp; Creating...
                </>
              ) : (
                <>
                  <FiCheck size={16} /> Save &amp; Publish Campaign
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm sticky top-24 space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Campaign Sections
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    {item.required && (
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          isActive
                            ? "bg-amber-400 text-gray-950"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        Req
                      </span>
                    )}
                    {item.optional && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        Opt
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* ------------------------------------------------------------- */}
            {/* 1. HERO SECTION (REQUIRED) */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "hero" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      Required Section
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mt-1">
                    Hero Section &amp; Consultation Form
                  </h2>
                  <p className="text-xs text-gray-500">
                    This is the above-the-fold content visitors see first on the
                    campaign landing page.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Treatment / Campaign Name *
                    </label>
                    <Input
                      size="large"
                      placeholder="e.g. Dental Implants, Invisalign, Teeth Whitening"
                      value={heroState.name}
                      onChange={(e) =>
                        setHeroState({ ...heroState, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Badge / Eyebrow Tagline
                      </label>
                      <Input
                        size="large"
                        placeholder="e.g. DENTAL IMPLANTS"
                        value={heroState.heroBadge}
                        onChange={(e) =>
                          setHeroState({
                            ...heroState,
                            heroBadge: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Italic Subheadline Finish
                      </label>
                      <Input
                        size="large"
                        placeholder="e.g. done properly."
                        value={heroState.subheadline}
                        onChange={(e) =>
                          setHeroState({
                            ...heroState,
                            subheadline: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Main Headline
                    </label>
                    <Input
                      size="large"
                      placeholder="e.g. A brighter smile in one visit"
                      value={heroState.headline}
                      onChange={(e) =>
                        setHeroState({ ...heroState, headline: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Body Copy (Introduction Description)
                    </label>
                    <TextArea
                      rows={3}
                      placeholder="Explain the offer, quality standards, and invite to consultation..."
                      value={heroState.bodyCopy}
                      onChange={(e) =>
                        setHeroState({ ...heroState, bodyCopy: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Rating Score (★)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        size="large"
                        value={heroState.rating}
                        onChange={(e) =>
                          setHeroState({ ...heroState, rating: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Patient / Review Count
                      </label>
                      <Input
                        type="number"
                        min="1"
                        size="large"
                        value={heroState.patientCount}
                        onChange={(e) =>
                          setHeroState({
                            ...heroState,
                            patientCount: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Primary CTA Button Text
                      </label>
                      <Input
                        size="large"
                        value={heroState.cta}
                        onChange={(e) =>
                          setHeroState({ ...heroState, cta: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Secondary WhatsApp Button Text
                      </label>
                      <Input
                        size="large"
                        value={heroState.whatsappCta}
                        onChange={(e) =>
                          setHeroState({
                            ...heroState,
                            whatsappCta: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                        Sparkle Highlights / Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={addHighlight}
                        className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FiPlus size={13} /> Add Point
                      </button>
                    </div>
                    <div className="space-y-2">
                      {heroState.heroHighlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={hl}
                            onChange={(e) => updateHighlight(i, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => removeHighlight(i)}
                            className="text-gray-400 hover:text-red-500 p-2 cursor-pointer"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Consultation Form Customization */}
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">
                      Hero Consultation Form Card
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                      Customize the booking card embedded on the right side of
                      the hero banner.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Form Top Badge
                        </label>
                        <Input
                          value={heroState.formBadge}
                          onChange={(e) =>
                            setHeroState({
                              ...heroState,
                              formBadge: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Form Submit Button Text
                        </label>
                        <Input
                          value={heroState.formButtonText}
                          onChange={(e) =>
                            setHeroState({
                              ...heroState,
                              formButtonText: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Form Heading Title
                      </label>
                      <Input
                        value={heroState.formTitle}
                        onChange={(e) =>
                          setHeroState({
                            ...heroState,
                            formTitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Form Subtitle Text
                      </label>
                      <TextArea
                        rows={2}
                        value={heroState.formSubtitle}
                        onChange={(e) =>
                          setHeroState({
                            ...heroState,
                            formSubtitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        5-Minute Callback Commitment
                      </label>
                      <Input
                        value={heroState.formCallbackText}
                        onChange={(e) =>
                          setHeroState({
                            ...heroState,
                            formCallbackText: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Guarantees */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                          Trust Guarantees / Checks
                        </label>
                        <button
                          type="button"
                          onClick={addGuarantee}
                          className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FiPlus size={13} /> Add Check
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {heroState.formGuarantees.map((g, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Input
                              value={g}
                              onChange={(e) =>
                                updateGuarantee(i, e.target.value)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => removeGuarantee(i)}
                              className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                            >
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Greeting */}
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      AI Phone Agent Greeting Script
                    </label>
                    <TextArea
                      rows={2}
                      value={heroState.aiGreeting}
                      onChange={(e) =>
                        setHeroState({
                          ...heroState,
                          aiGreeting: e.target.value,
                        })
                      }
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      What the AI receptionist says when calling back leads from
                      this campaign.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 2. NAVBAR & BRANDING (OPTIONAL) - DIRECT LOGO UPLOAD */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "navbar" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-gray-900">
                    Header Navbar &amp; Clinic Logo
                  </h2>
                  <p className="text-xs text-gray-500">
                    Directly upload your clinic logo and configure contact
                    numbers.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* DIRECT LOGO FILE UPLOAD (NO URL INPUT) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                      Clinic Logo (Upload Image)
                    </label>
                    {logoPreview ? (
                      <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="h-14 w-auto max-w-[180px] object-contain rounded bg-white p-2 border border-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {logoFile?.name || "logo.png"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {logoFile
                              ? `${(logoFile.size / 1024).toFixed(1)} KB`
                              : "Uploaded logo"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-900 hover:bg-gray-50/50 cursor-pointer transition-all">
                        <FiImage size={28} className="text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">
                          Click or drag logo image here
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          PNG, JPG, SVG, WebP (Max 20MB)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </label>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Navbar Phone Number
                      </label>
                      <Input
                        size="large"
                        placeholder="01235 643729"
                        value={headerState.navPhone}
                        onChange={(e) =>
                          setHeaderState({
                            ...headerState,
                            navPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        WhatsApp Number
                      </label>
                      <Input
                        size="large"
                        placeholder="07700900000"
                        value={headerState.navWhatsapp}
                        onChange={(e) =>
                          setHeaderState({
                            ...headerState,
                            navWhatsapp: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Navbar CTA Button Text
                    </label>
                    <Input
                      size="large"
                      value={headerState.navCtaText}
                      onChange={(e) =>
                        setHeaderState({
                          ...headerState,
                          navCtaText: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 3. VIDEO SECTION (OPTIONAL) - DIRECT VIDEO & POSTER UPLOADS */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "video" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      Campaign Video Section
                    </h2>
                    <p className="text-xs text-gray-500">
                      Directly upload your video file (MP4, MOV, WebM) and
                      optional poster thumbnail.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {videoSection.show
                        ? "Section Enabled"
                        : "Section Disabled"}
                    </span>
                    <Switch
                      checked={videoSection.show}
                      onChange={(checked) =>
                        setVideoSection({ ...videoSection, show: checked })
                      }
                    />
                  </div>
                </div>

                {videoSection.show ? (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Eyebrow Label
                        </label>
                        <Input
                          value={videoSection.label}
                          onChange={(e) =>
                            setVideoSection({
                              ...videoSection,
                              label: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Title
                        </label>
                        <Input
                          value={videoSection.title}
                          onChange={(e) =>
                            setVideoSection({
                              ...videoSection,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Subtitle
                      </label>
                      <TextArea
                        rows={2}
                        value={videoSection.subtitle}
                        onChange={(e) =>
                          setVideoSection({
                            ...videoSection,
                            subtitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* DIRECT VIDEO FILE UPLOAD (NO URL INPUT) */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                        Upload Video File (Direct Upload)
                      </label>
                      {videoPreview ? (
                        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                          <video
                            src={videoPreview}
                            controls
                            className="w-full max-h-60 rounded-lg bg-black"
                          />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-gray-800">
                                {videoFile?.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {videoFile
                                  ? `${(videoFile.size / (1024 * 1024)).toFixed(2)} MB`
                                  : "Uploaded video"}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={removeVideo}
                              className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                            >
                              Remove Video
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-900 hover:bg-gray-50/50 cursor-pointer transition-all">
                          <FiFilm size={32} className="text-gray-400 mb-2" />
                          <span className="text-sm font-semibold text-gray-700">
                            Select or drop video file here
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            MP4, MOV, WebM, MKV (Up to 500MB)
                          </span>
                          <input
                            type="file"
                            accept="video/mp4,video/webm,video/quicktime,video/*"
                            className="hidden"
                            onChange={handleVideoUpload}
                          />
                        </label>
                      )}
                    </div>

                    {/* DIRECT VIDEO POSTER IMAGE UPLOAD (NO URL INPUT) */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                        Video Cover / Poster Image (Optional)
                      </label>
                      {videoPosterPreview ? (
                        <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl bg-gray-50">
                          <img
                            src={videoPosterPreview}
                            alt="Poster Preview"
                            className="h-16 w-28 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {videoPosterFile?.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {videoPosterFile
                                ? `${(videoPosterFile.size / 1024).toFixed(1)} KB`
                                : ""}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={removeVideoPoster}
                            className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-3 p-4 border border-dashed border-gray-300 rounded-xl hover:border-gray-900 hover:bg-gray-50/50 cursor-pointer transition-all">
                          <FiImage size={20} className="text-gray-400" />
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-gray-700 block">
                              Upload Video Poster Image
                            </span>
                            <span className="text-[11px] text-gray-400 block">
                              JPG, PNG, WebP thumbnail
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleVideoPosterUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-xl text-gray-400 text-sm">
                    This section is currently disabled. Toggle the switch above
                    to include it on the landing page.
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 4. DOCTOR SECTION (OPTIONAL) - DIRECT DOCTOR PHOTO UPLOAD */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "doctor" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      Surgeon / Doctor Profile Section
                    </h2>
                    <p className="text-xs text-gray-500">
                      Directly upload the doctor's portrait photo and
                      credentials.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {doctorSection.show
                        ? "Section Enabled"
                        : "Section Disabled"}
                    </span>
                    <Switch
                      checked={doctorSection.show}
                      onChange={(checked) =>
                        setDoctorSection({ ...doctorSection, show: checked })
                      }
                    />
                  </div>
                </div>

                {doctorSection.show ? (
                  <div className="space-y-5">
                    {/* DIRECT DOCTOR PHOTO UPLOAD (NO URL INPUT) */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                        Doctor Portrait Photo (Direct Upload)
                      </label>
                      {doctorImagePreview ? (
                        <div className="flex items-center gap-5 p-4 border border-gray-200 rounded-xl bg-gray-50">
                          <img
                            src={doctorImagePreview}
                            alt="Doctor Portrait Preview"
                            className="w-20 h-24 object-cover rounded-xl border border-gray-200 shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {doctorImageFile?.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {doctorImageFile
                                ? `${(doctorImageFile.size / 1024).toFixed(1)} KB`
                                : "Uploaded photo"}
                            </p>
                            <span className="inline-block mt-2 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              Photo ready to attach
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={removeDoctorPhoto}
                            className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                          >
                            Remove Photo
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-900 hover:bg-gray-50/50 cursor-pointer transition-all">
                          <FiUser size={32} className="text-gray-400 mb-2" />
                          <span className="text-sm font-semibold text-gray-700">
                            Upload Doctor Photo
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            Click or drag JPG, PNG, WebP portrait image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleDoctorPhotoUpload}
                          />
                        </label>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Doctor Name
                        </label>
                        <Input
                          size="large"
                          value={doctorSection.name}
                          onChange={(e) =>
                            setDoctorSection({
                              ...doctorSection,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Badge Eyebrow
                        </label>
                        <Input
                          size="large"
                          value={doctorSection.badge}
                          onChange={(e) =>
                            setDoctorSection({
                              ...doctorSection,
                              badge: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Title / Role / GDC Registration
                      </label>
                      <Input
                        size="large"
                        value={doctorSection.title}
                        onChange={(e) =>
                          setDoctorSection({
                            ...doctorSection,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Floating Badge Title
                        </label>
                        <Input
                          value={doctorSection.badgeTitle}
                          onChange={(e) =>
                            setDoctorSection({
                              ...doctorSection,
                              badgeTitle: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Floating Badge Subtitle
                        </label>
                        <Input
                          value={doctorSection.badgeSubtitle}
                          onChange={(e) =>
                            setDoctorSection({
                              ...doctorSection,
                              badgeSubtitle: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Doctor Bio / Narrative
                      </label>
                      <TextArea
                        rows={3}
                        value={doctorSection.description}
                        onChange={(e) =>
                          setDoctorSection({
                            ...doctorSection,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Credentials */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                          Credentials &amp; Awards (Checkmark Bullets)
                        </label>
                        <button
                          type="button"
                          onClick={addDoctorCredential}
                          className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FiPlus size={13} /> Add Credential
                        </button>
                      </div>
                      <div className="space-y-2">
                        {doctorSection.credentials.map((cred, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Input
                              value={cred}
                              onChange={(e) =>
                                updateDoctorCredential(i, e.target.value)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => removeDoctorCredential(i)}
                              className="text-gray-400 hover:text-red-500 p-2 cursor-pointer"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-xl text-gray-400 text-sm">
                    This section is currently disabled.
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 5. PATIENT TESTIMONIALS (OPTIONAL) */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "testimonials" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      Patient Stories &amp; Testimonials
                    </h2>
                    <p className="text-xs text-gray-500">
                      Social proof cards with star ratings and treatment
                      context.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {testimonialsSection.show
                        ? "Section Enabled"
                        : "Section Disabled"}
                    </span>
                    <Switch
                      checked={testimonialsSection.show}
                      onChange={(checked) =>
                        setTestimonialsSection({
                          ...testimonialsSection,
                          show: checked,
                        })
                      }
                    />
                  </div>
                </div>

                {testimonialsSection.show ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Eyebrow Badge
                        </label>
                        <Input
                          value={testimonialsSection.badge}
                          onChange={(e) =>
                            setTestimonialsSection({
                              ...testimonialsSection,
                              badge: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Title
                        </label>
                        <Input
                          value={testimonialsSection.title}
                          onChange={(e) =>
                            setTestimonialsSection({
                              ...testimonialsSection,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Overall Rating (e.g. 5.0)
                        </label>
                        <Input
                          type="number"
                          step="0.1"
                          value={testimonialsSection.rating}
                          onChange={(e) =>
                            setTestimonialsSection({
                              ...testimonialsSection,
                              rating: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Google Review Count
                        </label>
                        <Input
                          type="number"
                          value={testimonialsSection.reviewCount}
                          onChange={(e) =>
                            setTestimonialsSection({
                              ...testimonialsSection,
                              reviewCount: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Testimonials List */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                          Testimonial Reviews List (
                          {testimonialsSection.testimonials.length})
                        </label>
                        <button
                          type="button"
                          onClick={addTestimonial}
                          className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FiPlus size={13} /> Add Review
                        </button>
                      </div>

                      <div className="space-y-4">
                        {testimonialsSection.testimonials.map((t, i) => (
                          <div
                            key={i}
                            className={`p-4 rounded-xl border transition-all ${
                              t.highlight
                                ? "border-amber-300 bg-amber-50/20"
                                : "border-gray-200 bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-bold text-gray-600">
                                Review #{i + 1}
                              </span>
                              <div className="flex items-center gap-3">
                                <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={t.highlight}
                                    onChange={(e) =>
                                      updateTestimonial(
                                        i,
                                        "highlight",
                                        e.target.checked,
                                      )
                                    }
                                  />
                                  Highlight Card (Gold Border)
                                </label>
                                <button
                                  type="button"
                                  onClick={() => removeTestimonial(i)}
                                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                                >
                                  <FiTrash2 size={14} />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                                  Patient Name
                                </label>
                                <Input
                                  value={t.name}
                                  placeholder="e.g. Paul"
                                  onChange={(e) =>
                                    updateTestimonial(i, "name", e.target.value)
                                  }
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                                  Treatment Detail / Location
                                </label>
                                <Input
                                  value={t.detail}
                                  placeholder="e.g. Dental Implants, Oxford"
                                  onChange={(e) =>
                                    updateTestimonial(
                                      i,
                                      "detail",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                                Review Quote
                              </label>
                              <TextArea
                                rows={2}
                                value={t.quote}
                                onChange={(e) =>
                                  updateTestimonial(i, "quote", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-xl text-gray-400 text-sm">
                    This section is currently disabled.
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 6. HOW IT WORKS (OPTIONAL) */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "howItWorks" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      How It Works Section
                    </h2>
                    <p className="text-xs text-gray-500">
                      A simple step-by-step roadmap guiding patients to
                      treatment.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {howItWorksSection.show
                        ? "Section Enabled"
                        : "Section Disabled"}
                    </span>
                    <Switch
                      checked={howItWorksSection.show}
                      onChange={(checked) =>
                        setHowItWorksSection({
                          ...howItWorksSection,
                          show: checked,
                        })
                      }
                    />
                  </div>
                </div>

                {howItWorksSection.show ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Eyebrow
                        </label>
                        <Input
                          value={howItWorksSection.badge}
                          onChange={(e) =>
                            setHowItWorksSection({
                              ...howItWorksSection,
                              badge: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Title
                        </label>
                        <Input
                          value={howItWorksSection.title}
                          onChange={(e) =>
                            setHowItWorksSection({
                              ...howItWorksSection,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Subtitle
                      </label>
                      <TextArea
                        rows={2}
                        value={howItWorksSection.subtitle}
                        onChange={(e) =>
                          setHowItWorksSection({
                            ...howItWorksSection,
                            subtitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Steps Manager */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                          Steps List ({howItWorksSection.steps.length})
                        </label>
                        <button
                          type="button"
                          onClick={addStep}
                          className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FiPlus size={13} /> Add Step
                        </button>
                      </div>

                      <div className="space-y-4">
                        {howItWorksSection.steps.map((st, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                                Step {i + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeStep(i)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                                Step Title
                              </label>
                              <Input
                                value={st.title}
                                onChange={(e) =>
                                  updateStep(i, "title", e.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                                Step Description
                              </label>
                              <TextArea
                                rows={2}
                                value={st.description}
                                onChange={(e) =>
                                  updateStep(i, "description", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-xl text-gray-400 text-sm">
                    This section is currently disabled.
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 7. TREATMENT FAQ (OPTIONAL) */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "faq" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      Treatment FAQ Accordion
                    </h2>
                    <p className="text-xs text-gray-500">
                      Address objections, costs, timelines, and common queries.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {faqSection.show ? "Section Enabled" : "Section Disabled"}
                    </span>
                    <Switch
                      checked={faqSection.show}
                      onChange={(checked) =>
                        setFaqSection({ ...faqSection, show: checked })
                      }
                    />
                  </div>
                </div>

                {faqSection.show ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Eyebrow
                        </label>
                        <Input
                          value={faqSection.badge}
                          onChange={(e) =>
                            setFaqSection({
                              ...faqSection,
                              badge: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Title
                        </label>
                        <Input
                          value={faqSection.title}
                          onChange={(e) =>
                            setFaqSection({
                              ...faqSection,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Subtitle Text
                        </label>
                        <Input
                          value={faqSection.subtitle}
                          onChange={(e) =>
                            setFaqSection({
                              ...faqSection,
                              subtitle: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Direct Call Phone Number
                        </label>
                        <Input
                          value={faqSection.phone}
                          onChange={(e) =>
                            setFaqSection({
                              ...faqSection,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* FAQ Items */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                          Question &amp; Answer List ({faqSection.faqs.length})
                        </label>
                        <button
                          type="button"
                          onClick={addFaq}
                          className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <FiPlus size={13} /> Add FAQ
                        </button>
                      </div>

                      <div className="space-y-4">
                        {faqSection.faqs.map((f, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-gray-600">
                                Question #{i + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFaq(i)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                                Question
                              </label>
                              <Input
                                value={f.question}
                                onChange={(e) =>
                                  updateFaq(i, "question", e.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                                Answer
                              </label>
                              <TextArea
                                rows={2}
                                value={f.answer}
                                onChange={(e) =>
                                  updateFaq(i, "answer", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-xl text-gray-400 text-sm">
                    This section is currently disabled.
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 8. SECONDARY CTA (OPTIONAL) */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "secondaryCta" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      Secondary Bottom CTA Form
                    </h2>
                    <p className="text-xs text-gray-500">
                      Second opportunity for patients to convert near the
                      footer.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {secondaryCtaSection.show
                        ? "Section Enabled"
                        : "Section Disabled"}
                    </span>
                    <Switch
                      checked={secondaryCtaSection.show}
                      onChange={(checked) =>
                        setSecondaryCtaSection({
                          ...secondaryCtaSection,
                          show: checked,
                        })
                      }
                    />
                  </div>
                </div>

                {secondaryCtaSection.show ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          Section Eyebrow
                        </label>
                        <Input
                          value={secondaryCtaSection.badge}
                          onChange={(e) =>
                            setSecondaryCtaSection({
                              ...secondaryCtaSection,
                              badge: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          CTA Heading
                        </label>
                        <Input
                          value={secondaryCtaSection.title}
                          onChange={(e) =>
                            setSecondaryCtaSection({
                              ...secondaryCtaSection,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Subtitle Description
                      </label>
                      <TextArea
                        rows={2}
                        value={secondaryCtaSection.subtitle}
                        onChange={(e) =>
                          setSecondaryCtaSection({
                            ...secondaryCtaSection,
                            subtitle: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        CTA Button Text
                      </label>
                      <Input
                        value={secondaryCtaSection.buttonText}
                        onChange={(e) =>
                          setSecondaryCtaSection({
                            ...secondaryCtaSection,
                            buttonText: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-xl text-gray-400 text-sm">
                    This section is currently disabled.
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 9. FOOTER (OPTIONAL) */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "footer" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      Landing Page Footer
                    </h2>
                    <p className="text-xs text-gray-500">
                      Clinic copyright and footer branding.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {footerSection.show
                        ? "Section Enabled"
                        : "Section Disabled"}
                    </span>
                    <Switch
                      checked={footerSection.show}
                      onChange={(checked) =>
                        setFooterSection({ ...footerSection, show: checked })
                      }
                    />
                  </div>
                </div>

                {footerSection.show ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Clinic Brand Name
                      </label>
                      <Input
                        value={footerSection.clinicName}
                        onChange={(e) =>
                          setFooterSection({
                            ...footerSection,
                            clinicName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                        Copyright / Legal Disclaimer
                      </label>
                      <Input
                        value={footerSection.text}
                        onChange={(e) =>
                          setFooterSection({
                            ...footerSection,
                            text: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-xl text-gray-400 text-sm">
                    This section is currently disabled.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
