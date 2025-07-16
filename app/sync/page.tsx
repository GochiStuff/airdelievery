import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";

export default function SyncPage() {
  return (
    <main className="w-full min-h-screen bg-white text-gray-900  pt-20">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Go Beyond P2P Sharing. Sync Everything.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            airdelivery.site is your cross-platform file tool. Share files peer-to-peer from anywhere. 
            But with our native apps, you can go even further: instantly sync files, devices, clipboards, and more — no cloud required.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link href="/download" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900">
              Get the App
            </Link>
            <Link href="/try" className="border border-black text-black px-6 py-3 rounded-md hover:bg-gray-100">
              Try Web Share
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl p-4 shadow-md w-full aspect-video">
          {/* Placeholder for hero image / preview UI */}
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-xl">
            [ Native App UI Preview or Animation ]
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="bg-black text-white py-6">
        <div className="max-w-5xl mx-auto text-center text-sm md:text-base font-medium">
          Trusted by teams, developers, and individuals worldwide.
        </div>
      </section>

      {/* SYNC FEATURE SECTION */}
      <section className="max-w-6xl mx-auto py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
          Sync Features (Only on Native Apps)
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
          With the airdelivery.site native apps, you're not just sending files — you're syncing your digital life. Everything happens locally and instantly.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Auto Folder Sync", desc: "Keep folders mirrored across devices in real time." },
            { title: "Clipboard Sync", desc: "Copy text, links, or data — and paste across devices." },
            { title: "Multi-Drive Control", desc: "Manage and sync cloud drives like local storage (Coming Soon)." },
            { title: "Mobile Camera Input", desc: "Use your phone camera directly from your PC (Coming Soon)." },
            { title: "Device Link", desc: "Link multiple devices permanently for secure, fast syncing." },
            { title: "Offline First", desc: "Sync without internet. All peer-to-peer, no server required." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* P2P ONLY NOTICE */}
      <section className="max-w-4xl mx-auto text-center mb-20 px-4">
        <h2 className="text-2xl font-bold mb-2">Web Access = Easy P2P</h2>
        <p className="text-lg text-gray-700">
          You can share files instantly without any setup using our web app. Just open airdelivery.site and send.
        </p>
        <p className="text-md text-gray-500 mt-2">
          Sync features require the native app (Windows, Mac, Linux).
        </p>
        <div className="mt-6">
          <Link href="/try" className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Use Web App Now
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Download the Native App</h2>
          <p className="text-gray-700 mb-6">
            To unlock sync, install the desktop app. Full control, zero cloud, ultra privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/download" className="bg-black flex gap-2 items-center text-white px-6 py-3 rounded-full ">
              Download Now <Download className="w-4 h-4"/>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
