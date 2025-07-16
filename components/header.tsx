"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const isLoggedIn = false; 

  return (
    <>
    
    <header className="flex items-center justify-between px-4 md:px-10 backdrop-blur-md border-b bg-white shadow-lg h-20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/icons/logo.png" alt="Logo" width={40} height={40} />
        <Link href="/" className="text-xl md:text-2xl font-semibold tracking-tighter text-zinc-900">
          AIR DELIVERY
        </Link>
      </div>


      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6 text-sm md:text-base font-medium text-zinc-700">
        <Link href="/sync" className="hover:text-black transition">Sync</Link>
        {!isLoggedIn && (
          <Link href="/plans" className="hover:text-black transition">Plans</Link>
        )}
        <Link href="/about" className="hover:text-black transition">About</Link>

        <Link
          href="/download"
          className="hover:text-zinc-100 text-zinc-50 px-4 py-2 rounded-full hover:bg-zinc-950 transition bg-zinc-800"
        >
          Download App
        </Link>

        {!isLoggedIn ? (
          <Link
            href="/login"
            className="text-zinc-800 border border-zinc-300 px-4 py-2 rounded-full hover:bg-zinc-100 transition"
          >
            Join
          </Link>
        ) : (
          <Link
            href="/account"
            className="text-zinc-800 border border-zinc-300 px-4 py-2 rounded-full hover:bg-zinc-100 transition"
          >
            Manage Account
          </Link>
        )}
      </nav>


      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
         
          <SheetTrigger asChild>
            <button aria-label="Open Menu">
              <Menu size={28} className="text-zinc-800" />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64 p-6">
            <SheetHeader>
              <div className="flex items-center gap-2 mb-6">
                <Image src="/icons/logo.png" alt="Logo" width={32} height={32} />
                   <SheetTitle className="text-lg font-semibold tracking-tight text-zinc-900">

       
                  AIR DELIVERY
                   </SheetTitle>
              </div>
            </SheetHeader>

            <nav className="flex flex-col gap-4 text-zinc-800 text-sm font-medium">
              <Link href="/sync" className="hover:text-black transition ">Sync</Link>
              {!isLoggedIn && (
                <Link href="/plans" className="hover:text-black transition">Plans</Link>
              )}
              <Link href="/about" className="hover:text-black transition">About</Link>
              <Link
                href="/download"
                className="mt-2 bg-zinc-800 text-white text-center rounded-full px-4 py-2 hover:bg-zinc-950 transition"
              >
                Download App
              </Link>
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="text-center border border-zinc-300 text-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-100 transition"
                >
                  Join
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="text-center border border-zinc-300 text-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-100 transition"
                >
                  Manage Account
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

<<<<<<< Updated upstream
           

            

           
        </header>   
    );
}
=======
            {/* Banner */}
    </header>
      <div className="bg-yellow-400 text-black text-center py-3 px-6  font-semibold text-sm border-yellow-500">
        🎉 <span className="uppercase font-bold tracking-wide">Early Bird Deal</span> — Get <span className="font-semibold underline underline-offset-2 decoration-red-600">Pro Lifetime</span> at <span className="text-green-700 font-bold">80% OFF</span> – Just <span className="line-through text-gray-700">$49.99</span> <span className="font-bold text-black">→ $9.99</span> for the first <span className="font-bold">1,000 users</span>!
      </div>
    </>
  );
}
>>>>>>> Stashed changes
