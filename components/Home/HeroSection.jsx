"use client";
import React from "react";
import { Typography, Box, InputBase } from "@mui/material";
import { FaSearch, FaBookOpen, FaCompass, FaLightbulb } from "react-icons/fa";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Box className="w-full bg-[#0f0a07] py-24 px-4 border-b border-[#3c2a21] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <FaBookOpen className="absolute -left-20 -top-10 text-[#d4a373] text-[400px] -rotate-12" />
        <FaLightbulb className="absolute -right-20 -bottom-10 text-[#d4a373] text-[300px] rotate-12" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-[#1a120b] border border-[#d4a373]/30 px-5 py-2 rounded-full mb-8 shadow-xl">
          <span className="flex h-2 w-2 rounded-full bg-[#d4a373] animate-pulse"></span>
          <Typography className="text-[#d4a373] text-[11px]! uppercase font-bold tracking-[0.2em]">
            The Ultimate Knowledge Hub
          </Typography>
        </div>

        {/* Heading */}
        <Typography
          variant="h1"
          className="font-serif! text-[#d4a373]! font-bold mb-6! md:text-7xl! text-5xl! tracking-tight"
        >
          Master Your <span className="text-[#e7dec8]">Craft</span>
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          className="text-gray-400 max-w-2xl mx-auto! mb-12! text-lg md:text-xl leading-relaxed"
        >
          Access premium tutorials, deep-dive book reviews, and a sanctuary of
          resources designed for the modern intellectual.
        </Typography>

        {/* Search & Action Box */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 max-w-3xl mx-auto">
          <Link href="/books" className="w-full md:w-auto">
            <button className="w-full bg-[#d4a373] hover:bg-[#faedcd] text-[#1a120b] px-10 py-4 rounded-2xl font-black transition-all shadow-[0_10px_30px_rgba(212,163,115,0.2)] flex items-center justify-center gap-3 group cursor-pointer active:scale-95">
              EXPLORE
              <FaCompass className="group-hover:rotate-180 transition-transform duration-500 text-xl" />
            </button>
          </Link>
        </div>

        {/* Trust Markers */}
        <div className="mt-16! pt-10! border-t! border-[#3c2a21]/50! flex! flex-wrap! justify-center! gap-10! md:gap-20! opacity-60!">
          <div className="text-center!">
            <Typography className="text-[#e7dec8]! font-bold! text-2xl! block!">
              150+
            </Typography>
            <Typography className="text-gray-500! text-xs! uppercase! tracking-widest!">
              Tutorials
            </Typography>
          </div>

          <div className="text-center!">
            <Typography className="text-[#e7dec8]! font-bold! text-2xl! block!">
              1.2k
            </Typography>
            <Typography className="text-gray-500! text-xs! uppercase! tracking-widest!">
              Books
            </Typography>
          </div>

          <div className="text-center!">
            <Typography className="text-[#e7dec8]! font-bold! text-2xl! block!">
              45k
            </Typography>
            <Typography className="text-gray-500! text-xs! uppercase! tracking-widest!">
              Readers
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default HeroSection;
