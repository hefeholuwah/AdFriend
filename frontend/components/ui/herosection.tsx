"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChromeIcon, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-br from-purple-500 to-blue-600 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)] blur-3xl opacity-50 animate-pulse"></div>

      {/* Floating Blurry Lights */}
      <div className="absolute -top-10 left-1/4 w-32 h-32 bg-white/20 blur-3xl opacity-40 rounded-full animate-bounce" />
      <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-white/10 blur-2xl opacity-30 rounded-full animate-bounce" />

      {/* Logo & Heading */}
      <div className="relative z-10 flex items-center gap-4 animate-fade-in">
        <Image src="/adfriend-logo.png" alt="AdFriend Logo" width={64} height={64} />
        <h1 className="text-4xl font-bold text-white sm:text-5xl drop-shadow-md">
          Your Smart Ad Companion
        </h1>
      </div>

      {/* Subtitle */}
      <p className="mt-4 text-lg text-white/80 max-w-lg animate-fade-in opacity-80">
        Stay motivated, manage your time, and protect your privacy with AdFriend.
      </p>

      {/* Enhanced CTA Button */}
      <a
        href="https://chrome.google.com/webstore/detail/adfriend/your-extension-id"
        target="_blank"
        className="mt-6 inline-flex items-center gap-3 px-8 py-4 text-xl font-semibold bg-white text-blue-600 rounded-full shadow-xl hover:bg-gray-100 transition-all animate-pulse hover:scale-110 focus:ring-4 focus:ring-blue-300"
      >
        <ChromeIcon className="w-6 h-6 text-blue-600" /> Try AdFriend – It’s Free
      </a>

      {/* Social Proof: Star Ratings */}
      <div className="mt-6 flex items-center gap-1 text-yellow-400 animate-fade-in">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Star key={i} className="w-6 h-6" />
          ))}
        <span className="text-white text-lg ml-2">5.0 Star Rating</span>
      </div>

      {/* Extension Preview Image */}
      <div className="relative mt-10 w-full max-w-2xl animate-fade-in">
        <Image
          src="/adfriend-preview.png"
          alt="AdFriend Preview"
          width={800}
          height={450}
          className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
    </section>
  );
}
