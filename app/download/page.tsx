// app/download/page.tsx

"use client";

import { Apple, Monitor, Laptop2, Server, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function DownloadPage() {
  const [showWinDropdown, setShowWinDropdown] = useState(false);
  const [showLinuxDropdown, setShowLinuxDropdown] = useState(false);

  return (
    <div className="bg-white min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Download AirDelivery
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Get the latest version of AirDelivery across all your platforms.
        </p>

        {/* Desktop section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">Desktop</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">

          {/* Windows */}
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-md relative">
            <div className="flex items-center gap-3 mb-3">
<img width="240" className="h-8 w-8" height="240" src="https://img.icons8.com/color/240/windows-11.png" alt="windows-11"/>
              <h3 className="text-lg font-semibold text-gray-900">Windows</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Get the AirDelivery client for Windows 10 and 11.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Download .exe
            </a>
            <button
              onClick={() => setShowWinDropdown(!showWinDropdown)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
            >
              <MoreHorizontal />
            </button>
            {showWinDropdown && (
              <div className="absolute right-6 mt-2 bg-white border shadow rounded-md text-sm z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Windows 8</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Portable Version</a>
              </div>
            )}
          </div>

          {/* MacOS */}
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Monitor className="w-6 h-6 text-gray-800" />
              <h3 className="text-lg font-semibold text-gray-900">MacOS</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Download the app for macOS Monterey and above.
            </p>
            <a
              href="#"
              className="inline-block bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Download for Mac
            </a>
          </div>

          {/* Linux */}
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-md relative">
            <div className="flex items-center gap-3 mb-3">
              <Server className="w-6 h-6 text-green-700" />
              <h3 className="text-lg font-semibold text-gray-900">Linux</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Choose your preferred package for Linux distributions.
            </p>
            <a
              href="#"
              className="inline-block bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Download .deb
            </a>
            <button
              onClick={() => setShowLinuxDropdown(!showLinuxDropdown)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
            >
              <MoreHorizontal />
            </button>
            {showLinuxDropdown && (
              <div className="absolute right-6 mt-2 bg-white border shadow rounded-md text-sm z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Download .rpm</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">AppImage</a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">Mobile</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">

          {/* iOS */}
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <img  className="h-8 w-8" width="250" height="250" src="https://img.icons8.com/ios-filled/250/mac-os.png" alt="mac-os"/>
              <h3 className="text-lg font-semibold text-gray-900">iOS</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Available on the App Store for iPhone and iPad.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Sorry, All features are not available on IPhone
            </p>
            <a
              href="#"
              className="inline-block"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10 opacity-40"
              />
            </a>
          </div>

          {/* Android */}
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <img  className="h-8 w-8" width="144" height="144" src="https://img.icons8.com/fluency/144/android-os.png" alt="android-os"/>
              <h3 className="text-lg font-semibold text-gray-900">Android</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Get it on Google Play for Android devices and tablets.
            </p>
            <a
              href="#"
              className="inline-block"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
