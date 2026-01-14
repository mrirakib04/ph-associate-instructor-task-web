"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Typography, Box, CircularProgress } from "@mui/material";
import {
  FaBook,
  FaUsers,
  FaChartLine,
  FaPlusCircle,
  FaTags,
  FaStar,
  FaChalkboardTeacher,
} from "react-icons/fa";
import Link from "next/link";

const Admin = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    if (user?.email) {
      fetch(`${serverUrl}/admin/stats/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setStats(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const statCardClass =
    "flex-1 min-w-[240px] bg-[#1a120b] border border-[#3c2a21] rounded-2xl sm:p-6 p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#d4a373]";
  const actionCardClass =
    "sm:p-6 p-5 bg-[#1a120b] border border-[#3c2a21] rounded-2xl group-hover:bg-[#2d241e] transition-all cursor-pointer h-full flex flex-col justify-center";

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress sx={{ color: "#d4a373" }} />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* Header Section */}
      <Box className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <Typography
            variant="h4"
            className="font-serif! md:text-4xl! sm:text-3xl! text-2xl! font-bold text-[#d4a373]!"
          >
            Admin <span className="text-[#e7dec8]">Control Center</span>
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            Welcome back, {user?.name || "Admin"}. Here is your library's
            performance.
          </Typography>
        </div>
        <Link href="/admin/manage-books">
          <button className="flex items-center gap-2 bg-[#d4a373] hover:bg-[#faedcd] text-[#1a120b] px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg cursor-pointer">
            <FaPlusCircle /> Manage My Books
          </button>
        </Link>
      </Box>

      {/* Dynamic Stats Row */}
      <div className="flex flex-wrap gap-6 items-stretch mb-10">
        <div className={statCardClass}>
          <div className="flex justify-between">
            <Typography className="text-gray-500 uppercase text-xs font-bold">
              Your Books
            </Typography>
            <FaBook className="text-[#d4a373]" />
          </div>
          <Typography variant="h4" className="text-white font-bold mt-2">
            {stats?.totalBooks || 0}
          </Typography>
          <div className="mt-4 text-emerald-500 text-xs">Live in Library</div>
        </div>

        <div className={statCardClass}>
          <div className="flex justify-between">
            <Typography className="text-gray-500 uppercase text-xs font-bold">
              Total Platform Users
            </Typography>
            <FaUsers className="text-[#d4a373]" />
          </div>
          <Typography variant="h4" className="text-white font-bold mt-2">
            {stats?.totalUsers || 0}
          </Typography>
          <div className="mt-4 text-emerald-500 text-xs">
            Registered readers
          </div>
        </div>

        <div className={statCardClass}>
          <div className="flex justify-between">
            <Typography className="text-gray-500 uppercase text-xs font-bold">
              Total Reviews
            </Typography>
            <FaStar className="text-[#d4a373]" />
          </div>
          <Typography variant="h4" className="text-white font-bold mt-2">
            {stats?.totalReviews || 0}
          </Typography>
          <div className="mt-4 text-amber-500 text-xs">Feedback received</div>
        </div>
      </div>

      {/* Management Grid */}
      <Typography
        variant="h6"
        className="text-[#d4a373] font-serif mb-6! border-l-4! border-[#d4a373] pl-4!"
      >
        Quick Management Links
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <Link href="/admin/manage-books" className="group">
          <div className={actionCardClass}>
            <FaBook className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              Books ({stats?.totalBooks})
            </Typography>
            <p className="text-gray-500 text-sm">Inventory & Stock</p>
          </div>
        </Link>

        <Link href="/admin/manage-categories" className="group">
          <div className={actionCardClass}>
            <FaTags className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              Genres ({stats?.totalCategories})
            </Typography>
            <p className="text-gray-500 text-sm">Organize Tags</p>
          </div>
        </Link>

        <Link href="/admin/manage-users" className="group">
          <div className={actionCardClass}>
            <FaUsers className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              Users
            </Typography>
            <p className="text-gray-500 text-sm">Roles & Accounts</p>
          </div>
        </Link>

        <Link href="/admin/manage-tutorials" className="group">
          <div className={actionCardClass}>
            <FaChalkboardTeacher className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              Videos ({stats?.totalTutorials})
            </Typography>
            <p className="text-gray-500 text-sm">Resources</p>
          </div>
        </Link>

        <Link href="/admin/manage-reviews" className="group">
          <div className={actionCardClass}>
            <FaStar className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              Reviews ({stats?.totalReviews})
            </Typography>
            <p className="text-gray-500 text-sm">Moderation</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
