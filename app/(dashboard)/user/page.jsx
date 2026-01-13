"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Typography, Paper, Box } from "@mui/material";
import { FaBookOpen, FaHistory, FaStar } from "react-icons/fa";

const User = () => {
  const { data: session } = useSession();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* Welcome Header */}
      <Box className="mb-10">
        <Typography
          variant="h4"
          className="font-serif font-bold text-[#d4a373] mb-2"
        >
          Welcome back, {session?.user?.name || "Reader"}!
        </Typography>
        <Typography variant="body1" className="text-gray-400">
          Here is a quick overview of your reading sanctuary.
        </Typography>
      </Box>

      {/* Stats Overview - Using Flex instead of Grid */}
      <div className="flex flex-wrap md:flex-nowrap gap-6 items-stretch w-full">
        {/* Books Read Card */}
        <div className="flex-1 min-w-62.5 bg-[#1a120b] border border-[#3c2a21] rounded-2xl p-6 flex items-center gap-5 transition hover:border-[#d4a373]">
          <div className="bg-[#2d241e] p-4 rounded-xl flex items-center justify-center">
            <FaBookOpen className="text-3xl text-[#d4a373]" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white leading-none">
              12
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              Books Read
            </span>
          </div>
        </div>

        {/* In Progress Card */}
        <div className="flex-1 min-w-62.5 bg-[#1a120b] border border-[#3c2a21] rounded-2xl p-6 flex items-center gap-5 transition hover:border-[#d4a373]">
          <div className="bg-[#2d241e] p-4 rounded-xl flex items-center justify-center">
            <FaHistory className="text-3xl text-[#d4a373]" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white leading-none">
              05
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              In Progress
            </span>
          </div>
        </div>

        {/* Avg Rating Card */}
        <div className="flex-1 min-w-62.5 bg-[#1a120b] border border-[#3c2a21] rounded-2xl p-6 flex items-center gap-5 transition hover:border-[#d4a373]">
          <div className="bg-[#2d241e] p-4 rounded-xl flex items-center justify-center">
            <FaStar className="text-3xl text-[#d4a373]" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white leading-none">
              4.8
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              Avg Rating
            </span>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <Paper
        elevation={0}
        sx={{
          mt: 8,
          p: 4,
          bgcolor: "#0f0a07",
          border: "1px dashed #3c2a21",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <Typography className="text-gray-500 italic font-serif">
          "A room without books is like a body without a soul." — Marcus Tullius
          Cicero
        </Typography>
      </Paper>
    </div>
  );
};

export default User;
