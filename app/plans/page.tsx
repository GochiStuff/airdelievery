"use client";
import React, { useState } from "react";
import Link from "next/link";

// Simulating backend data
const backendPricing = {
  monthly: {
    pro: { original: 1.49, discount: 40 }, // in USD
    teams: { original: 0, discount: 0 },
  },
  yearly: {
    pro: { original: 14.99, discount: 60 },
    teams: { original: 0, discount: 0 },
  },
  lifetime: {
    pro: { original: 49.99, discount: 80 }, // 80% OFF
    teams: { original: 0, discount: 0 }, // Not available yet
  },
};

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

const PlansPage = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly" | "lifetime">(
    "lifetime"
  );

  const getPrice = (type: "pro" | "teams") => {
    const { original, discount } = backendPricing[billing][type];
    if (discount > 0) {
      const finalPrice = original - (original * discount) / 100;
      return {
        display: (
          <>
            <span className="line-through text-sm text-gray-400 mr-1">
              {formatPrice(original)}
            </span>
            <span className="text-2xl font-bold text-yellow-500">
              {formatPrice(finalPrice)}
            </span>
            <span className="ml-1 text-xs font-semibold text-green-900 bg-green-200 px-1.5 py-0.5 rounded">
              {discount}% OFF
            </span>
          </>
        ),
        raw: formatPrice(finalPrice),
      };
    }
    return {
      display: <span className="text-2xl font-bold">{formatPrice(original)}</span>,
      raw: formatPrice(original),
    };
  };

const planCards = [
  {
    name: "Free Plan",
    priceDisplay: "Free",
    subtext: "No login required",
    features: [
      "Unlimited P2P File Sharing",
      "End-to-End Encryption",
      "Nearby Device Discovery",
      "Quick Connect via Code / QR / Link",
      "LAN & Cross-Network Support",
      "Transfer Queue Support",
      "Files up to 40 GB",
      "Smooth UI/UX",
      "Blazing Fast Transfers",
      "No Trusted Device Setup",
      "Non-Intrusive Ads",
      "Basic Manual Sync (File & Clipboard)",
    ],
    button: {
      label: "Start Free",
      disabled: false,
      href: "/download",
    },
  },
  {
    name: "Pro Plan",
    priceDisplay: getPrice("pro").display,
    subtext:
      billing === "lifetime"
        ? "One-time payment — no renewals ever"
        : "Unlock powerful features for seamless flow",
    features: [
      "Everything in Free Plan",
      "High-Limit Clipboard & File/Folder Sync",
      "No limit p2p file share",
      "Real-Time & Scheduled Sync",
      "Smart Clipboard History & Actions",
      "Notification Mirroring (Mobile → Desktop)",
      "One-Click Send to Trusted Devices",
      "Sync Browser Tabs & Links Across Devices",
      "Cross-Platform Remote Controls (Phone ⇄ PC)",
      "Optional Extra E2EE Layers (Per-File)",
      "Sync-Shared Folders for Notes, Screenshot, Clips",
      "Super Private — Your Data Never Leaves Your Devices",
      "Optional Encrypted Cloud Fallback",
      "Up to 5 Linked Devices",
      "Priority Email Support",
      "Coming Soon: NAS Integration",
      "Coming Soon: All Drive Management in One Place",
    ],
    highlight: true,
    button: {
      label: "Go Pro",
      href: "/download",
    },
  },
  {
    name: "Creative Teams / Custom",
    priceDisplay: getPrice("teams").display || "–",
    subtext: "Coming Soon — Built for Teams & Businesses",
    features: [
      "All Pro Features",
      "Designed for Teams & Businesses",
      "Shared Folders & Clipboard Sync",
      "Access Controls & Roles",
      "Activity Logging & Device History",
      "Real-Time Collaboration Boards",
      "Custom Branding & Onboarding",
      "Supports 10+ Linked Devices",
      "Dedicated Team Spaces & Flow Views",
    ],
    comingSoon: true,
    button: {
      label: "Coming Soon",
      disabled: true,
    },
  },
];




  return (
    <main className="min-h-screen px-2 mt-15  bg-white mb-20 text-gray-900">


      {/* Heading */}
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Simple pricing for all your needs
        </h1>
        <p className="text-gray-600 text-lg">
          Start free, upgrade when it feels right — no credit card required.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          All prices listed in USD. Local taxes may apply.
        </p>
      </section>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-2 inline-flex">
          {(["monthly", "yearly", "lifetime"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setBilling(type)}
              className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                billing === type
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
  {planCards.map((plan, i) => (
    <div
      key={i}
      className={`rounded-2xl border p-6 flex flex-col shadow-sm transition ${
        plan.highlight
          ? "bg-black text-white border-black shadow-md"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      {/* Title and Price - Center aligned */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
        <p className="mb-1">{plan.priceDisplay}</p>
        {plan.subtext && (
          <p
            className={`text-sm mb-4 ${
              plan.highlight ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {plan.subtext}
          </p>
        )}
      </div>

      {/* CTA Button - Center aligned */}
      <div className="flex justify-center">
        {plan.button.disabled ? (
          <button
            className="mt-4 px-6 py-2 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            disabled
          >
            {plan.button.label}
          </button>
        ) : (
          <Link href={plan.button.href || "#"}>
            <button
              className={`mt-4 px-6 py-2 rounded-md font-medium transition ${
                plan.highlight
                  ? "bg-orange-400 text-black hover:bg-orange-300"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {plan.button.label}
            </button>
          </Link>
        )}
      </div>

      {/* Features - Left aligned */}
      <ul className="mt-6 space-y-2 text-sm list-none text-left">
        {plan.features.map((feature, j) => (
          <li key={j} className="flex items-start">
            <span className="mr-2">✔️</span> {feature}
          </li>
        ))}
      </ul>
    </div>
  ))}
</section>


      {/* Notes */}
      <section className="text-center text-sm text-gray-500 mt-16 max-w-xl mx-auto leading-relaxed">
        * Lifetime plans are one-time purchases, valid for the lifetime of the product.<br />
        Early Bird pricing may end anytime after the first 1,000 users.<br />
         Contact us for early access of Teams plan<br />
        Team / Creative plans are launching soon. Custom enterprise pricing available on request.<br />
        All payments are securely processed. Refund policy and license terms apply.
      </section>
    </main>
  );
};

export default PlansPage;
