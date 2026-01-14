"use client";
import React from "react";
import { Typography, Box, Paper } from "@mui/material";
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
  // কার্ডের জন্য কমন স্টাইল ক্লাস
  const statCardClass =
    "flex-1 min-w-[280px] bg-[#1a120b] border border-[#3c2a21] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#d4a373]";
  const actionCardClass =
    "p-6 bg-[#1a120b] border border-[#3c2a21] rounded-2xl group-hover:bg-[#2d241e] transition-all cursor-pointer h-full flex flex-col justify-center";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
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
            Overview of your library performance and management tools.
          </Typography>
        </div>
        <Link href="/admin/manage-books">
          <button className="flex items-center gap-2 bg-[#d4a373] hover:bg-[#faedcd] text-[#1a120b] px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg">
            <FaPlusCircle /> Add/Manage Books
          </button>
        </Link>
      </Box>

      {/* Primary Stats - Same Height Layout */}
      <div className="flex flex-wrap gap-6 items-stretch mb-10">
        <div className={statCardClass}>
          <div className="flex justify-between">
            <Typography className="text-gray-500 uppercase text-xs font-bold">
              Total Books
            </Typography>
            <FaBook className="text-[#d4a373]" />
          </div>
          <Typography variant="h4" className="text-white font-bold mt-2">
            1,284
          </Typography>
          <div className="mt-4 text-emerald-500 text-xs">+12 this week</div>
        </div>

        <div className={statCardClass}>
          <div className="flex justify-between">
            <Typography className="text-gray-500 uppercase text-xs font-bold">
              Total Users
            </Typography>
            <FaUsers className="text-[#d4a373]" />
          </div>
          <Typography variant="h4" className="text-white font-bold mt-2">
            856
          </Typography>
          <div className="mt-4 text-emerald-500 text-xs">+45 active</div>
        </div>

        <div className={statCardClass}>
          <div className="flex justify-between">
            <Typography className="text-gray-500 uppercase text-xs font-bold">
              Growth
            </Typography>
            <FaChartLine className="text-[#d4a373]" />
          </div>
          <Typography variant="h4" className="text-white font-bold mt-2">
            78%
          </Typography>
          <div className="mt-4 text-amber-500 text-xs">Top Performance</div>
        </div>
      </div>

      {/* Management Grid - Mapping to your folder structure */}
      <Typography
        variant="h6"
        className="text-[#d4a373] font-serif mb-6! border-l-4! border-[#d4a373] pl-4!"
      >
        Quick Management Links
      </Typography>

      <div className="flex flex-wrap gap-6 justify-center items-stretch">
        {/* Manage Books */}
        <Link href="/admin/manage-books" className="group w-full sm:max-w-xs">
          <div className={actionCardClass}>
            <FaBook className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              Books List
            </Typography>
            <p className="text-gray-500 text-sm">Inventory, stock & details</p>
          </div>
        </Link>

        {/* Manage Categories */}
        <Link
          href="/admin/manage-categories"
          className="group w-full sm:max-w-xs"
        >
          <div className={actionCardClass}>
            <FaTags className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              Categories
            </Typography>
            <p className="text-gray-500 text-sm">Organize genres & tags</p>
          </div>
        </Link>

        {/* Manage Users */}
        <Link href="/admin/manage-users" className="group w-full sm:max-w-xs">
          <div className={actionCardClass}>
            <FaUsers className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              User Control
            </Typography>
            <p className="text-gray-500 text-sm">Roles & account status</p>
          </div>
        </Link>

        {/* Manage Tutorials */}
        <Link
          href="/admin/manage-tutorials"
          className="group w-full sm:max-w-xs"
        >
          <div className={actionCardClass}>
            <FaChalkboardTeacher className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              Tutorials
            </Typography>
            <p className="text-gray-500 text-sm">Educational resources</p>
          </div>
        </Link>

        {/* Manage Reviews */}
        <Link href="/admin/manage-reviews" className="group w-full sm:max-w-xs">
          <div className={actionCardClass}>
            <FaStar className="text-2xl text-[#d4a373] mb-3" />
            <Typography variant="h6" className="text-white font-bold mb-1">
              Reviews
            </Typography>
            <p className="text-gray-500 text-sm">Feedback & moderation</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
