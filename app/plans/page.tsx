"use client";
import React, { useState } from "react";
import Link from "next/link";

// Backend-like pricing
const backendPricing = {
  lifetime: {
    pro: { original: 19.99, discount: 80 },
    teams: { original: 0, discount: 0 },
  },
};

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

export default function PlusUltraPage() {
  const { original, discount } = backendPricing.lifetime.pro;
  const final = original - (original * discount) / 100;

  const getPrice = (type: "pro" | "teams") => {
    const { original, discount } = backendPricing.lifetime[type];
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
      name: "Pro — Plus Ultra",
      priceDisplay: getPrice("pro").display,
      subtext: "One-time payment — lifetime access",
      features: [
        "Everything in Free Plan",
        "No Ads — Clean & Private",
        "Files up to 400 GB (10x limit)",
        "Clipboard & Folder Sync (Coming Soon)",
        "Smart Clipboard History & Actions",
        "Notification Mirroring",
        "Optional Per-File Extra Encryption",
        "Trusted Device Quick Send",
        "Cross-Platform Remote Control",
        "Optional Cloud Fallback",
        "Up to 5 Linked Devices",
        "Priority Support",
        "Early Access to All New Features",
      ],
      highlight: true,
      button: {
        label: "Go Pro",
        href: "/plans",
      },
    },
    {
      name: "Creative Teams / Custom",
      priceDisplay: getPrice("teams").display || "–",
      subtext: "Coming Soon — For Teams & Workspaces",
      features: [
        "All Pro Features",
        "Shared Clipboard & Folder Sync",
        "Access Controls & Roles",
        "Device Activity Logs",
        "Custom Branding & Onboarding",
        "10+ Linked Devices",
        "Real-Time Collaboration",
        "Team Dashboards & Flow Views",
      ],
      comingSoon: true,
      button: {
        label: "Coming Soon",
        disabled: true,
      },
    },
  ];

  return (
    <main className="min-h-screen px-4 pt-16 pb-20 bg-white text-gray-900">
      {/* Hero Heading */}
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Plus Ultra — Go Beyond Limits 🚀
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Unlock the ultimate Airdelivery experience. Support the mission, skip the ads, and get pro-level syncing, encryption, and speed.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          All prices are one-time and in USD. No subscriptions.
        </p>
      </section>

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
            {/* Title and Price */}
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

            {/* CTA */}
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

            {/* Features */}
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

      {/* Support Message */}
      <section className="text-center my-10 text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
        <p>
          Airdelivery is a solo project built with ❤️. Your support funds future development like:
        </p>
        <ul className="mt-4 list-disc pl-6 text-left text-gray-600">
          <li>Native apps for Android, iOS, Windows, Linux & macOS</li>
          <li>Folder sync, clipboard sync, tab/link sharing, & more</li>
          <li>Superfast private transfer flows across all devices</li>
        </ul>
        <p className="mt-4">
          With your support, we can build a truly open, private, high-performance sharing tool for everyone.
        </p>
      </section>

      {/* Notes */}
      <section className="text-center text-sm text-gray-500 mt-16 max-w-xl mx-auto leading-relaxed">
        * Lifetime plans are one-time purchases, valid for the product’s lifetime.<br />
        Early Bird deal ends after 1,000 users — act fast!<br />
        All payments are secure. Refund & license terms apply.
      </section>
    </main>
  );
}
