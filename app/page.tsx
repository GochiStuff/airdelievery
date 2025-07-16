"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useSocket } from "@/hooks/socketContext";
import { useRouter } from "next/navigation";
import AboutCard from "@/components/aboutCard";
import { useInvitationToJoin } from "@/hooks/invitationToJoin";
import { getLocalIp } from "@/hooks/useWebRTCforIP";
import { useWebRTCContext } from "@/context/WebRTCContext";
import InfoSection from "@/components/InfoSection";
import TermsModal from "@/components/terms";
import Link from "next/link";


export default function MainPage() {
  const router = useRouter();
  const { socket, user } = useSocket();

  const [username, setUsername] = useState<string>("");
  const [flightCode, setFlightCode] = useState<string>("");
  const {
    flightId,
    handleFileSelect,
    connectToFlight,
    inviteToFlight,
    leaveFlight,
    status,
    nearByUsers,
    refreshNearby,
  } = useWebRTCContext();

  useEffect(() => {
    if (flightId) {
      setFlightCode(flightId);
    }
  }, [flightId]);

  const handleCreate = async () => {

    const accepted = localStorage.getItem("acceptedTerms");
    if (!accepted) 
      {
        setShowTerms(true);
        return;
      }
    if (!socket) return;
    if (flightId) {
      router.push(`/flight/${flightId}`);
    } else {
      socket.emit("createFlight", (response: { code: string }) => {
        router.push(`/flight/${response.code}`);
      });
    }
  };

  useEffect(() => setUsername(user.name ?? ""), [user]);

  const handleJoin = () => {
    if (flightCode.trim()) {
      router.push(`/flight/${flightCode.trim()}`);
    }
  };

  useEffect(() => {
    getLocalIp((ip) => {
      socket?.emit("registerLocalIp", { localIP: ip });
    });

    refreshNearby();

    const interval = setInterval(() => {
      refreshNearby();
    }, 5000);

    return () => clearInterval(interval);
  }, [socket]);

  const handleLeaveFlight = () => {
    leaveFlight();
  };

  const [showTerms, setShowTerms] = useState(false);


  const handleAccept = () => {
    localStorage.setItem("acceptedTerms", "true");
  };



  const invitationPop = useInvitationToJoin();
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  return (
    <>




      {/* Main content */}
      
      <main className="relative flex mb-10 flex-col md:flex-row items-center max-w-9xl mx-auto justify-around min-h-screen overflow-hidden">
        {invitationPop}
        {flightId && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4">
            <div className="flex animate-fadeIn items-center justify-between px-6 py-3 backdrop-blur-lg bg-white/30 border border-white/20 rounded-full shadow-[0_8px_32px_rgba(31,38,135,0.2)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(31,38,135,0.3)] text-sm text-zinc-800 space-x-4">
              {/* Left Side - Flight Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold truncate text-black/90">
                  Flight:{" "}
                  <code className="text-orange-500 font-mono">{flightId}</code>
                </div>
                <div className="text-[12px] font-medium mt-0.5">
                  <span
                    className={`${
                      status.includes("Connection")
                        ? "text-green-600"
                        : status.includes("Failed") ||
                          status.includes("Disconnected")
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
              {/* Right Side - Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`flight/${flightId}`)}
                  className="px-3 py-1.5 rounded-full bg-zinc-100/60 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold transition duration-200 shadow-inner"
                >
                  Open
                </button>
                <button
                  onClick={handleLeaveFlight}
                  className="px-3 py-1.5 rounded-full bg-red-100/70 hover:bg-red-200 text-red-600 text-xs font-semibold transition duration-200 shadow-inner"
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        )}

          <TermsModal
                show={showTerms}
                onClose={() => setShowTerms(false)}
                onAccept={handleAccept}
              />

        {/* Tagline background */}
<section className="relative  hidden md:flex flex-col items-start justify-center text-left px-8">
<h2 className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl text-zinc-900 select-none mb-4">
  Share Files in a Click.  
  <br />
  Sync Everything Instantly.
</h2>
<p className="text-lg md:text-xl text-zinc-700 font-medium max-w-xl">
  A platform built for blazing-fast, private peer-to-peer file sharing — easier than ever.  
  Now with powerful sync features using our latest apps, keeping all your devices in perfect harmony while still letting you share instantly with anything nearby.
</p>



  <div className="mt-6 flex gap-4">
    <Link href='/download'>
    <button className="bg-zinc-900 hover:bg-zinc-800 text-white text-sm md:text-base px-6 py-3 rounded-full font-medium shadow-lg transition">
      Download Now
    </button>
    </Link>

      <Link href="#new-features">
    <button className="border border-zinc-300 hover:bg-zinc-100 text-zinc-700 text-sm md:text-base px-6 py-3 rounded-full font-medium transition">
      See What's New
    </button>
      </Link>
  </div>
</section>

<section className="relative md:hidden  mb-5 w-full flex flex-col items-center text-center px-6 space-y-3 mt-10">
  <h1 className="text-4xl font-bold flex-nowrap text-zinc-900">
    Share or Sync Everything. Instantly.
  </h1>
  <h2 className="text-base text-zinc-600">
    Your files, clipboard, and more — perfectly in sync between all your devices.
  </h2>
  <div className="flex gap-3 pt-2">
    
      <Link href="/download">
    <button className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-full text-sm font-medium transition">
      Download
    </button>
      </Link>
    
      <Link href="#new-features">
    <button className="border border-zinc-300 hover:bg-zinc-100 text-zinc-700 px-5 py-2 rounded-full text-sm font-medium transition">
      New Features
    </button>
      </Link>
  </div>
</section>









        {/* section 2 */}
        <section className="flex relative items-center sm:items-start flex-col md:flex-row gap-2">
          {/* nearByUsers grid */}
          {!flightId && (
            <div
              className="
                z-50 p-2 mt-6 gap-2
                grid
                sm:absolute sm:-left-20
                grid-flow-col auto-cols-max
                md:grid-flow-row md:grid-cols-1
                max-w-screen
              "
            >
              {nearByUsers.length === 0 && (
                <p className="text-sm animate-fadeIn md:-rotate-90 font-mono md:mt-10 md:h-5">
                  No user nearby
                </p>
              )}
              {nearByUsers.map((m) => {
                const isDragOver = dragOverId === m.id;
                return (
                  <div
                    key={m.id}
                    className={`
                      group
                      animate-fadeIn
                      w-16 h-16 origin-right
                      bg-white/60 backdrop-blur-md border border-zinc-300
                      rounded-xl shadow-sm overflow-hidden
                      transition-all duration-300 ease-in-out
                      cursor-pointer
                      flex items-center justify-center drag-target
                      relative
                      hover:w-52 hover:h-24 hover:scale-110 hover:z-10
                      ${isDragOver ? "w-52 h-24 scale-110 z-10" : ""}
                    `}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragOverId(m.id);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (dragOverId !== m.id) {
                        setDragOverId(m.id);
                      }
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setDragOverId(null);
                      }
                    }}
                    onClick={() => {
                      socket?.emit("createFlight", (response: { code: string }) => {
                        connectToFlight(response.code);
                        inviteToFlight(m, response.code);
                        router.push(`/flight/${response.code}`);
                      });
                    }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragOverId(null);
                      if (!socket) return;
                      if (flightId) return;
                      socket.emit("createFlight", (response: { code: string }) => {
                        connectToFlight(response.code);
                        inviteToFlight(m, response.code);
                      });
                      const items = e.dataTransfer.items;
                      const files: File[] = [];
                      for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        if (item.kind === "file") {
                          const file = item.getAsFile();
                          if (file) files.push(file);
                        }
                      }
                      if (files.length === 0) return;
                      const dt = new DataTransfer();
                      files.forEach((file) => dt.items.add(file));
                      const fileList = dt.files;
                      handleFileSelect({
                        target: { files: fileList },
                      } as ChangeEvent<HTMLInputElement>);
                    }}
                  >
                    {/* Compact View */}
                    <div className="absolute inset-0 flex items-center justify-center text-center px-2 pointer-events-none">
                      <span className="text-sm font-semibold group-hover:opacity-0 text-zinc-800 transition-opacity">
                        {m.name}
                      </span>
                    </div>
                    {/* Expanded View */}
                    <div
                      className={`
                        absolute inset-0 flex flex-col items-center justify-center opacity-0
                        transition-opacity duration-200 px-2
                        group-hover:opacity-100
                        ${isDragOver ? "opacity-100" : ""}
                      `}
                    >
                      <span className="text-sm font-semibold text-zinc-800">
                        {m.name}
                      </span>
                      <code className="text-[0.7rem] text-zinc-800 break-words text-center">
                        ID: {m.id}
                      </code>
                      <code className="mt-1 text-[0.7rem] text-zinc-700 bg-white/70 border border-dotted border-black rounded-xl px-2 py-1">
                        Drop files to send
                      </code>
                      <span className="text-[0.7rem]">click to quick create a flight</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-10 max-w-84">
            <div className="relative flex flex-col items-center pt-24 rounded-3xl shadow-2xl text-zinc-900 bg-orange-600 min-h-[480px] w-full max-w-md transition-all overflow-hidden ticket-border">
              {/* Ticket Header */}
              <div className="flex flex-col items-center mb-6">
                <span className="uppercase text-center tracking-widest text-xs font-bold text-zinc-100 opacity-70">
                  airdelivery.site <br /> p2p file share here
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-100 mt-2 mb-1">
                  {username}
                </h2>
                <span className="text-sm text-zinc-100 opacity-70">
                  Your file transfer ticket
                </span>
              </div>

            
              {/* File and Folder Section */}
              <div className="flex flex-row space-x-4 w-full mb-2 px-8">
                <label className="flex flex-col flex-1 items-center text-zinc-700 px-8 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-100 font-semibold shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer ">
                  <span>
                    {flightId ? "You're currently in a flight...." : "Tap to start sending"}
                  </span>
                  <button className="hidden" onClick={handleCreate} />
                </label>
              </div>

              <p className="text-xs text-zinc-50 mb-0 tracking-tight uppercase font-mono">
                Select files or folder to send
              </p>

              {/* Divider - Ticket Perforation */}
              <div className="w-full flex justify-between items-center h-8">
                <div className="w-8 h-8 bg-zinc-300 rounded-full -ml-4"></div>
                <div className="flex-grow border-t-2 border-dashed border-zinc-200" />
                <span className="mx-4 text-zinc-50 font-semibold px-2 bg-orange-600 tracking-widest uppercase text-xs">
                  or
                </span>
                <div className="flex-grow border-t-2 border-dashed border-zinc-200" />
                <div className="w-8 h-8 bg-zinc-300 rounded-full -mr-4"></div>
              </div>

              {/* Receive Section with permanent input */}
              <div className="flex items-center w-full px-8 gap-2 mb-2">
                <input
                  type="text"
                  value={flightCode}
                  readOnly={!!flightId}
                  onChange={(e) => setFlightCode(e.target.value)}
                  placeholder="Flight Id"
                  aria-label="Enter flight code"
                  className="px-6 py-3 rounded-2xl w-54 bg-zinc-100 outline-0 font-mono text-zinc-800 border border-zinc-300"
                />
                <button
                  onClick={handleJoin}
                  aria-label="Launch or Send"
                  className="p-3 rounded-2xl shadow-lg bg-zinc-900 hover:bg-zinc-800 transition"
                >
                  {/* Paperplane SVG icon */}
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                      fill="#ffffff"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-xs text-zinc-50 tracking-tight uppercase font-mono mb-4">
                Enter your flight code to receive
              </p>

              <code className="text-xs absolute bottom-5 right-8 tracking-tight text-zinc-100 mt-2 -mb-3">
                ID:{user.id}
              </code>
            </div>

          </div>
        </section>
      </main>

      <InfoSection/>
    </>
  );
}
