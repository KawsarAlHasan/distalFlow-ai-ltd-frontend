import { BsCheckCircleFill, BsDashCircle } from "react-icons/bs";
import { RxCross2, RxCrossCircled } from "react-icons/rx";

const plans = [
  {
    name: "Starter",
    tagline: "Perfect for single clinics getting started.",
    price: "$50",
    period: "/mo per clinic",
    cta: "Start Free Trial",
    popular: false,
    features: [
      { text: "Basic Lead Management", ok: true },
      { text: "1 Clinic Location", ok: true },
      { text: "Standard Email Support", ok: true },
      { text: "No AI Call Agent", ok: false },
    ],
  },
  {
    name: "Growth",
    tagline: "Everything you need to scale fast.",
    price: "$79",
    period: "/mo per clinic",
    cta: "Start Free Trial",
    popular: true,
    features: [
      { text: "AI Call Agent (100 mins)", ok: true },
      { text: "CareStack Integration", ok: true },
      { text: "Marketing Automation", ok: true },
      { text: "Up to 3 Locations", ok: true },
      { text: "Priority Support", ok: true },
    ],
  },
  {
    name: "Enterprise",
    tagline: "For large groups and MSOs.",
    price: "$100",
    period: "/mo per clinic",
    cta: "Contact Sales",
    popular: false,
    features: [
      { text: "Unlimited AI Calling", ok: true },
      { text: "Custom AI Training", ok: true },
      { text: "Unlimited Locations", ok: true },
      { text: "Dedicated Account Manager", ok: true },
      { text: "Custom Integrations", ok: true },
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#170e21] py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="cormorantFont text-3xl text-[48px] font-semibold secondColor mb-4">
            Simple, predictable pricing
          </h2>
          <p className="subTitleText text-[18px] max-w-2xl mx-auto leading-relaxed">
            Scale your clinic operations without worrying about complex billing.
            All plans include unlimited users.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border transition-all duration-300 ${
                plan.popular
                  ? "bg-[#160D20] border-[#c9a84c]/50 shadow-2xl shadow-[#c9a84c]/10 scale-[1.02]"
                  : "bg-[#251636] border-white/10 hover:border-white/20"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#c9a063] text-[#160d20] text-[11px] font-black px-4 py-1.5 rounded-full tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="secondColor font-semibold text-[20px] mb-1">
                  {plan.name}
                </p>
                <p className="subTitleText text-[14px] leading-snug">
                  {plan.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="mb-7">
                <span className="text-[#c9a063] text-5xl font-black">
                  {plan.price}
                </span>
                <span className="subTitleText text-[16px] ml-1.5">
                  {plan.period}
                </span>
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105 mb-7 ${
                  plan.popular
                    ? "mainBtn"
                    : "cursor-pointer border border-[#C9A063] secondColor hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </button>

              {/* Features */}
              <ul className="flex flex-col gap-3.5">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3">
                    {f.ok ? (
                      <BsCheckCircleFill
                        size={14}
                        className="text-[#c9a84c] flex-shrink-0"
                      />
                    ) : (
                      <RxCrossCircled
                        size={15}
                        className="text-[#B3A7C4] flex-shrink-0"
                      />
                    )}
                    <span
                      className={`text-[14px] ${f.ok ? "secondColor" : "subTitleText"}`}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
