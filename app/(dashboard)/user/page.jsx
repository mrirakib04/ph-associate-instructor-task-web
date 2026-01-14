"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Typography, Box, Paper, CircularProgress } from "@mui/material";
import { FaBookOpen, FaHistory, FaStar } from "react-icons/fa";

const User = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    if (user?.email) {
      fetch(`${serverUrl}/user/stats/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setStats(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const statCardClass =
    "flex-1 min-w-[250px] bg-[#1a120b] border border-[#3c2a21] rounded-2xl p-6 flex items-center gap-5 transition hover:border-[#d4a373]";

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress sx={{ color: "#d4a373" }} />
      </div>
    );

  const getAIGuidance = () => {
    if (!stats) return "Loading your personal insights...";

    const { totalRead, inProgress, avgRating } = stats;

    // Case 1: (The Scholar)
    if (totalRead > 10) {
      return `You're on a roll, ${
        user?.name?.split(" ")[0]
      }! With ${totalRead} books completed, your wisdom is growing. Keep nurturing that inner scholar.`;
    }

    // Case 2: (The Multitasker)
    if (inProgress > 3) {
      return `You're exploring ${inProgress} different worlds right now! Focus is the key—try finishing one of these journeys today.`;
    }

    // Case 3: (The Appreciator)
    if (parseFloat(avgRating) >= 4.5) {
      return `You have a great eye for quality! Your average rating of ${avgRating} shows you truly appreciate fine literature.`;
    }

    // Case 4:
    if (totalRead === 0 && inProgress === 0) {
      return "Your sanctuary is quiet. Why not pick up a new book and start a new adventure today?";
    }

    // Default Case
    return "Every page turned is a step toward a better you. What will you discover next?";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* Welcome Header */}
      <Box className="mb-10">
        <Typography
          variant="h4"
          className="font-serif font-bold text-[#d4a373] mb-2"
        >
          Welcome back, {user?.name || "Reader"}!
        </Typography>
        <Typography variant="body1" className="text-gray-400">
          Here is a quick overview of your reading sanctuary.
        </Typography>
      </Box>

      {/* Dynamic Stats Overview */}
      <div className="flex flex-wrap md:flex-nowrap gap-6 items-stretch w-full">
        {/* Books Read Card */}
        <div className={statCardClass}>
          <div className="bg-[#2d241e] p-4 rounded-xl flex items-center justify-center">
            <FaBookOpen className="text-3xl text-[#d4a373]" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white leading-none">
              {stats?.totalRead || 0}
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              Books Read
            </span>
          </div>
        </div>

        {/* In Progress Card */}
        <div className={statCardClass}>
          <div className="bg-[#2d241e] p-4 rounded-xl flex items-center justify-center">
            <FaHistory className="text-3xl text-[#d4a373]" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white leading-none">
              {String(stats?.inProgress || 0).padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              In Progress
            </span>
          </div>
        </div>

        {/* Avg Rating Card */}
        <div className={statCardClass}>
          <div className="bg-[#2d241e] p-4 rounded-xl flex items-center justify-center">
            <FaStar className="text-3xl text-[#d4a373]" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white leading-none">
              {stats?.avgRating || "0.0"}
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              Your Avg Rating ({stats?.totalReviews || 0} Reviews)
            </span>
          </div>
        </div>
      </div>
      {/* AI Insight Section */}
      <Box className="mt-8!">
        <div className="bg-linear-to-r from-[#1a120b] to-[#2d241e] border border-[#d4a373]/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          {/* Decorative Background Icon */}
          <div className="absolute -right-4 -top-4 opacity-10">
            <FaBookOpen size={120} className="text-[#d4a373]" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Typography className="text-[#d4a373] text-xs font-bold uppercase tracking-[0.2em]">
                AI Reading Persona
              </Typography>
            </div>

            <Typography
              variant="h6"
              className="text-[#e7dec8] font-serif italic leading-relaxed"
            >
              "{getAIGuidance()}"
            </Typography>
          </div>
        </div>
      </Box>

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
