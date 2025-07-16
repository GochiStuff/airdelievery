import Link from "next/link";

export default function WhyAds() {
  return (
    <main className="max-w-3xl h-full mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Why Ads?</h1>
      <p className="text-gray-600 text-lg mb-6">
        Airdelivery is an indie project with zero external funding. It costs us money to keep the servers running, maintain infrastructure, and improve the service.
      </p>

      <p className="mb-4">
        Ads help us keep the core of Airdelivery <strong>free for everyone</strong>. We’re committed to showing minimal, privacy-respecting ads only — no trackers, no invasive popups.
      </p>

      <p className="mb-4">
        Our goal isn’t to make money from ads. As soon as we recover the basic server and development costs, we plan to <strong>remove ads entirely</strong> for everyone.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-2">Going Beyond Just “Pro”</h2>
      <p className="mb-4">
        The <Link href="/plans" className="text-blue-600 underline">Pro Plan</Link> is not just about removing ads — it unlocks a smoother, more powerful experience designed to make your daily digital flow seamless:
      </p>

      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
        <li>Access to upcoming native apps for Android, iOS, Windows, macOS, and Linux</li>
        <li>Clipboard sync across all your devices</li>
        <li>Smart file and folder sync (simplified and modern)</li>
        <li>Offline device-to-device sharing</li>
        <li>Scheduled file transfers and automation tools</li>
        <li>Device control features to manage files and actions remotely</li>
        <li>Optinal Cloud fallbacks</li>
        <li>Early access to experimental tools and power features</li>
        <li>Priority support and direct feedback access to the developer</li>
      </ul>

      <p className="mt-6">
        Whether you're a student, a remote worker, or just someone who transfers files often — we want to build tools that actually make your workflow better, faster, and more unified.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-2">Support the Mission </h2>
      <p className="mb-4">
        You can support us by upgrading to Pro — a one-time or subscription-based plan that directly funds development. Just you and us, building the future of seamless device communication.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Thank you for understanding and supporting our vision. Let’s build something truly useful, together.
      </p>
    </main>
  );
}
