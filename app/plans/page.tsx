import Link from "next/link";

export default function PlusUltra() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Plus Ultra — Go Beyond</h1>
      <p className="text-gray-600 mb-6 text-lg">
        Unlock the ultimate Airdelivery experience with our Pro plan. Go beyond limits.
      </p>

      <ul className="list-disc pl-6 space-y-4 text-gray-700 text-base">
        <li><strong>No Ads</strong> – A clean, distraction-free experience</li>
        <li><strong>Beyond Limits</strong> – Share files up to 10x larger</li>
        <li><strong>Extra Encryption Layers</strong> – Optional per-file E2EE</li>
        <li><strong>Priority Access</strong> – Try clipboard sync, folder sync, and more as soon as they’re released</li>
      </ul>

      <p className="mt-8 text-sm text-gray-500">
        Your support helps us build features faster and hire developers — Airdelivery is currently a solo indie project.
      </p>

      <Link href="/plans" className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition">
        View Plans
      </Link>
    </main>
  );
}
