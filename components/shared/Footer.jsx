"use client";
import React from "react";
import Link from "next/link";
import { FaBookReader, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f0a07] border-t border-[#2d1f18] text-[#e7dec8] w-full">
      <div className="max-w-7xl px-4 py-10 mx-auto">
        <div className="flex flex-wrap gap-10 justify-between">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <FaBookReader className="text-2xl text-[#d4a373]" />
              <span className="text-xl font-serif font-bold text-[#d4a373]">
                BookWorm
              </span>
            </Link>
            <p className="text-sm text-gray-400 italic max-w-2xs">
              Your personalized sanctuary for tracking books and discovering new
              stories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#d4a373] font-bold">Quick Links</h4>
            <Link
              href="/books"
              className="text-sm hover:text-[#d4a373] transition"
            >
              Browse Books
            </Link>
            <Link
              href="/user/my-library"
              className="text-sm hover:text-[#d4a373] transition"
            >
              My Library
            </Link>
            <Link
              href="/tutorials"
              className="text-sm hover:text-[#d4a373] transition"
            >
              Tutorials
            </Link>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#d4a373] font-bold">Community</h4>
            <div className="flex gap-4 text-xl">
              <FaGithub className="cursor-pointer hover:text-[#d4a373]" />
              <FaLinkedin className="cursor-pointer hover:text-[#d4a373]" />
            </div>
          </div>
        </div>

        <div className="border-t border-[#2d1f18] mt-10 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 BookWorm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
