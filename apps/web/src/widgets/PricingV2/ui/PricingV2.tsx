"use client";

import { Check } from "lucide-react";
import { Button } from "@/shared/ui/Button";

const PLANS = [
  {
    name: "Standard",
    price: "49",
    description: "Perfect for local sports clubs and individual auditors.",
    features: [
      "Up to 5 data sources",
      "Basic AI preparation",
      "Standard D3 visualizations",
      "Email support",
      "Community access",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "199",
    description: "Advanced analytics for professional teams and agencies.",
    features: [
      "Unlimited data sources",
      "Advanced AI models",
      "Custom D3 dashboards",
      "Predictive analytics",
      "Priority 24/7 support",
      "Collaborative workspaces",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale solution for national federations and leagues.",
    features: [
      "White-labeling",
      "Dedicated infrastructure",
      "On-premise deployment",
      "SLA guarantees",
      "Custom ML training",
      "Full API & SDK access",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const PricingV2 = () => {
  return (
    <section className="py-96 bg-white">
      <div className="container">
        <div className="text-center mb-64 space-y-16">
          <h2 className="text-[32px] md:text-[42px] font-black text-elbruso-text">
            Simple, transparent pricing.
          </h2>
          <p className="text-elbruso-text-muted text-lg max-w-2xl mx-auto">
            Choose the plan that fits your audit scale. Start for free, upgrade as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-40 rounded-32 border transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary-blue shadow-2xl shadow-primary-blue/10 scale-105 z-10"
                  : "border-gray-100 hover:border-gray-300"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-blue text-white text-[10px] font-black uppercase tracking-widest px-16 py-6 rounded-full">
                  Mostly Popular
                </div>
              )}

              <div className="mb-32">
                <h3 className="text-xl font-black text-elbruso-text mb-8">{plan.name}</h3>
                <div className="flex items-baseline gap-4">
                  {plan.price !== "Custom" && <span className="text-2xl font-bold text-elbruso-text">$</span>}
                  <span className="text-5xl font-black text-elbruso-text">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-elbruso-text-muted font-bold">/mo</span>}
                </div>
                <p className="mt-16 text-sm text-elbruso-text-muted font-semibold leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-16 mb-40">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-12 text-sm font-bold text-elbruso-text">
                    <div className="w-20 h-20 rounded-full bg-primary-blue/10 flex items-center justify-center">
                       <Check size={12} className="text-primary-blue" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <Button
                variant={plan.highlighted ? "primary" : "outline"}
                className={`w-full h-[56px] rounded-16 font-black text-sm uppercase tracking-widest transition-all ${
                  plan.highlighted ? "shadow-lg shadow-primary-blue/20" : ""
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-64 text-center">
           <p className="text-sm text-elbruso-text-muted font-semibold">
              Prices exclude applicable taxes. Looking for education or non-profit discounts? <a href="#" className="text-primary-blue hover:underline">Contact us</a>.
           </p>
        </div>
      </div>
    </section>
  );
};
