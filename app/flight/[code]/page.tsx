"use client"
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { File, Folder, Share2, Users, User, Heart, X, Play, Pause } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useFileTransfer } from "@/hooks/useFileTransfer";

export default function RoomPage() {
  const { code } = useParams();
  const flight = typeof code === "string" ? code : "";
  const [showQR, setShowQR] = useState(false);

  // Logs & Hooks
  const [logs, setLogs] = React.useState<string[]>([]);
  const addLog = React.useCallback((msg: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()} - ${msg}`]);
  }, []);
  const { dataChannel, status, members  , } = useWebRTC(flight, e => fileTrans.handleMessage(e), addLog);
  const fileTrans = useFileTransfer(dataChannel, addLog);

  return (
    <main className="min-h-screen  p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Flight Info & Share */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl shadow-xl p-8 mb-6 ">
          {/* Left: Flight Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">

              <h1 className="text-3xl font-extrabold  tracking-wider flex items-center gap-2">
          FLIGHT <span className="bg-zinc-100 font-mono text-zinc-700 px-2 py-1 rounded-lg border border-zinc-200">{flight}</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <Badge color={typeof status === "string" && status.includes("Connection") ? "green" : "yellow"}>{status}</Badge>
              <Badge color="gray">{members.length } Member{members.length ? "s" : ""}</Badge>
            </div>
         
          </div>

          {/* Right: Owner, Members, Share */}
          <div className="flex flex-col md:flex-row items-center gap-8 mt-6 md:mt-0">
           
            {/* Share Button */}
            <div className="flex flex-col items-center">
              <button
          onClick={() => setShowQR(prev => !prev)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-semibold shadow-lg transition"
              >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
              </button>
              <span className="text-xs text-zinc-500 mt-1">Show QR / Code</span>
            </div>
          </div>
        </header>

        {/* Share QR Popup */}
        {showQR && (
          <div className="fixed inset-0 bg-zinc-900/60 h-screen flex items-center justify-center z-50">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xs flex flex-col items-center border-2 border-orange-400">
     
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-3 right-3 text-zinc-400 hover:text-orange-600 text-2xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-lg bg-orange-100 text-orange-700 px-3 py-1 rounded-lg border border-orange-200">
                  {flight}
                </span>
                <span className="text-xs text-zinc-500">Flight Code</span>
              </div>
      
              <h2 className="text-xl font-bold text-zinc-900 mb-3 text-center">Share this Flight</h2>
     
              <div className="flex justify-center mb-4">
                <QRCodeSVG value={typeof window !== "undefined" ? window.location.href : ""} size={180} />
              </div>

              <div className="w-full flex flex-col items-center mb-2">
                <div className="flex items-center gap-2 w-full">
                  <input
                    className="flex-1 bg-zinc-100 rounded-lg px-2 py-1 text-sm font-mono border border-zinc-200 text-zinc-700"
                    value={typeof window !== "undefined" ? window.location.href : ""}
                    readOnly
                    onFocus={e => e.target.select()}
                  />
                  
                  <button
                    onClick={async () => {
                      if (typeof window !== "undefined" && navigator.share) {
                        await navigator.share({
                          title: "Join my Flight",
                          text: "Join my Flight on AirDelivery!",
                          url: window.location.href,
                        });
                      }
                    }}
                    className="p-1 rounded hover:bg-orange-100 text-orange-600"
                    title="Share via OS"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-xs text-zinc-500 mt-1">Ask the reciver to join.</span>
              </div>
              {/* Scan to join */}
              <p className="mt-2 text-sm text-zinc-600 text-center">Scan QR or share the link to join this flight.</p>
            </div>
          </div>
        )}


        {/* File/Folder Picker & Drag & Drop */}
        <section className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8 ">
          {/* Left: Drag & Drop + Select */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div
              className="w-full min-h-[140px] flex flex-col items-center justify-center border-2 border-dashed border-orange-400 rounded-xl bg-white hover:bg-orange-50 transition cursor-pointer p-6 text-center"
              onDragOver={e => {
          e.preventDefault();
          e.stopPropagation();
              }}
              onDrop={e => {
          e.preventDefault();
          e.stopPropagation();
          const files = Array.from(e.dataTransfer.files);
          fileTrans.handleFileSelect({ target: { files } } as any);
              }}
            >
              <div className="flex flex-col items-center gap-2">
          <Folder className="w-8 h-8 text-orange-500" />
          <span className="font-semibold text-zinc-900">Drag & Drop files or folders here</span>
          <span className="text-xs text-zinc-500">or</span>
          <div className="flex gap-2">
            <label className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-3 py-2 cursor-pointer flex items-center gap-2">
              <File className="w-4 h-4" /> Select Files
              <input type="file" multiple hidden onChange={fileTrans.handleFileSelect} />
            </label>
            <label className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-3 py-2 cursor-pointer flex items-center gap-2">
              <Folder className="w-4 h-4" /> Select Folder
              <input
                type="file"
                multiple
                hidden
                //@ts-ignore
                webkitdirectory="true"
                onChange={fileTrans.handleFileSelect}
              />
            </label>
          </div>
              </div>
            </div>
          </div>
          {/* Right: Members List Card */}
          <div className="w-full md:w-72 flex-shrink-0">
            <Card
              title="Members"
              icon={<Users className="w-5 h-5 text-orange-500" />}
            >
              <div className="flex flex-col gap-4">
         
          {/* Members */}
          {members.length === 0 && (
            <div className="text-zinc-400 text-sm text-center">No other members</div>
          )}
          {members.map((id, idx) => (
            <div key={id} className="flex items-center gap-3 bg-zinc-50 rounded-lg px-3 py-2">
              <User className="w-6 h-6 text-orange-400" />
              <div>
                <div className="font-semibold text-zinc-900">Member {idx + 1}</div>
                <div className="text-xs text-zinc-500">id: <span className="font-mono">{id}</span></div>
              </div>
            </div>
          ))}
              </div>
            </Card>
          </div>
        </section>

         {/* Right: Sending Queue Preview */}
          <div className="flex flex-col gap-6">
            <div className="flex-1">
              <QueueTray title="Sending Queue" items={fileTrans.queue} 
              pauseTransfer={fileTrans.pauseTransfer}
              resumeTransfer={fileTrans.resumeTransfer}
              cancelTransfer={fileTrans.cancelTransfer}
              reciver = {false}
              />
            </div>
            <div className="flex-1">
                  <QueueTray title="Reciever Queue" items={fileTrans.recvQueue} 

              cancelTransfer={fileTrans.cancelTransfer}
              reciver = {true}
              />
            </div>
          </div>

        {/* Overall Metrics */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Metrics Section */}
          <section className="flex-1 bg-white rounded-2xl shadow-lg p-6 ">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">Overall Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 text-sm text-zinc-700">
              <Metric label="Sent" value={`${(fileTrans.meta.totalSent / 1e9).toFixed(2)} GB`} />
              <Metric label="Received" value={`${(fileTrans.meta.totalReceived / 1e9).toFixed(2)} GB`} />
              <Metric
                label="Speed"
                value={
                  fileTrans.meta.speedBps >= 1048576
                    ? `${(fileTrans.meta.speedBps / 1048576).toFixed(2)} MB/s`
                    : `${(fileTrans.meta.speedBps / 1024).toFixed(2)} KB/s`
                }
              />
            
            </div>
          </section>

            {/* Promote Site Experience Tip Card */}
            <section className="flex-1 bg-white rounded-2xl shadow-lg p-8  flex flex-col gap-6 justify-between">
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0">
              </div>
              <div>
              <h3 className="font-bold flex gap-2 items-center text-2xl text-black mb-2">
                <Heart className="fill-black"/> Love Air Delivery ?</h3>
              <p className="text-black text-xl">
 Save this site or install as an app (PWA) for instant access anytime!
              </p>
              </div>
            </div>
             <div className="flex justify-end mt-2">
              <button
                className="px-3 py-1 rounded text-red-500 underline font-medium  transition text-xs"
                onClick={() => alert('Thank you for your feedback!')}
                title="Report an issue"
              >
                Report
              </button>
            </div>
            </section>
        </div>

        {/* Logs */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-400">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Activity Logs</h2>
          <div className="h-48 overflow-y-auto bg-zinc-50 p-4 rounded-lg font-mono text-sm text-zinc-800 space-y-1">
            {logs.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
// Improved UI components

function Badge({ children, color }: { children: React.ReactNode; color: "green" | "yellow" | "gray" }) {
  const base = "inline-flex items-center rounded-full font-semibold text-xs px-3 py-1 shadow-sm border";
  const colors = {
    green: "bg-green-100 text-green-800 border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    gray: "bg-zinc-100 text-zinc-800 border-zinc-200"
  };
  return (
    <span className={`${base} ${colors[color]} transition-all duration-150`}>
      {children}
    </span>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4 border-2 border-orange-200 hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center gap-2 text-orange-600 mb-2">
        <span className="bg-orange-100 rounded-full p-2 flex items-center justify-center">{icon}</span>
        <h3 className="font-semibold text-lg text-zinc-900">{title}</h3>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
interface QueueTrayProp {
  title: string;
  items: any[];
  reciver ?: boolean;
  pauseTransfer ?: any;
  resumeTransfer ?: any;
  cancelTransfer ?: any;
}


function QueueTray(prop: QueueTrayProp) {
  const { title, items, reciver, pauseTransfer, resumeTransfer, cancelTransfer } = prop;

  const statusLabels: Record<string, string> = {
    queued: "Queued",
    sending: "Sending",
    paused: "Paused",
    done: "Done",
    error: "Error",
    canceled: "Canceled",
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl shadow-lg px-6 py-6 w-full">
      <h3 className="font-semibold text-2xl text-zinc-800 mb-6">{title}</h3>

      <div className="flex gap-5 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-300 pb-2">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full text-zinc-400 py-12">
            <File className="w-8 h-8 mb-2" />
            <span className="text-sm">No items yet</span>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.transferId}
              className="w-56 flex-shrink-0 rounded-2xl border border-zinc-100 bg-white shadow-md hover:shadow-xl transition-all p-5"
            >
              {/* File Info */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                  <File className="w-5 h-5 text-zinc-600" />
                </div>

                <span className="text-sm font-medium text-zinc-800 text-center truncate max-w-[180px]">
                  {item.file?.name || item.name}
                </span>

                {/* Progress Bar */}
                <div className="w-full bg-zinc-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress || 0}%` }}
                  />
                </div>

                {/* Progress & Status */}
                <div className="w-full flex justify-between text-xs text-zinc-500 mt-1">
                  <span>{item.progress}%</span>
                  <span>{statusLabels[item.status] || item.status}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3 mt-5">
                {reciver ? (
                  item.status !== "done" &&
                  item.status !== "canceled" && (
                    <button
                      className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 shadow-sm transition"
                      onClick={() => cancelTransfer(item.transferId)}
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )
                ) : (
                  <>
                    {item.status === "paused" && (
                      <button
                        className="p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 shadow-sm transition"
                        onClick={() => resumeTransfer(item.transferId)}
                        title="Resume"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    {item.status === "sending" && (
                      <button
                        className="p-2 rounded-full bg-yellow-50 hover:bg-yellow-100 text-yellow-600 border border-yellow-200 shadow-sm transition"
                        onClick={() => pauseTransfer(item.transferId)}
                        title="Pause"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                    {item.status !== "done" && item.status !== "canceled" && (
                      <button
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 shadow-sm transition"
                        onClick={() => cancelTransfer(item.transferId)}
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}




function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start bg-zinc-100 rounded-lg px-4 py-3 shadow-sm min-w-[90px]">
      <span className="text-zinc-500 text-xs mb-1">{label}</span>
      <span className="text-zinc-900 font-bold text-lg">{value}</span>
    </div>
  );
}

