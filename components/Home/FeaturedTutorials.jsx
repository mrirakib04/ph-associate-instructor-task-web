"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { FaYoutube, FaArrowRight, FaPlay, FaRegClock } from "react-icons/fa";
import Link from "next/link";

const FeaturedTutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null); // ক্লিক করলে ভিডিও প্লে করার জন্য

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await fetch(`${serverUrl}/home/latest/tutorials`);
        const data = await res.json();
        setTutorials(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorials();
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    // autoplay=1 যোগ করা হয়েছে যাতে ক্লিক করলে প্লে হয়
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : url;
  };

  if (loading)
    return (
      <Box className="flex! justify-center! py-20!">
        <CircularProgress sx={{ color: "#d4a373" }} />
      </Box>
    );

  return (
    <section className="w-full bg-[#0f0a07] py-24 px-4 border-t border-[#3c2a21]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-0.5 w-10 bg-[#d4a373]"></span>
              <Typography className="text-[#d4a373]! font-bold! tracking-[0.2em] text-xs! uppercase!">
                Video Masterclass
              </Typography>
            </div>
            <Typography
              variant="h4"
              className="text-[#e7dec8]! font-serif! font-bold! mb-4!"
            >
              Visual Learning <span className="text-[#d4a373]">Hub</span>
            </Typography>
            <Typography className="text-gray-500! leading-relaxed!">
              Watch expert-led tutorials on literature analysis, writing
              techniques, and deep-dives into classic collections.
            </Typography>
          </div>
          <Link href="/tutorials">
            <button className="flex items-center gap-3 bg-[#1a120b] border border-[#3c2a21] hover:border-[#d4a373] text-[#e7dec8] px-8 py-4 rounded-xl font-bold transition-all group cursor-pointer shadow-lg">
              View All Tutorials{" "}
              <FaArrowRight className="group-hover:translate-x-2 transition-transform text-[#d4a373]" />
            </button>
          </Link>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tutorials.map((item) => (
            <div
              key={item._id}
              className="group relative flex flex-col bg-[#1a120b] border border-[#3c2a21] rounded-3xl overflow-hidden hover:border-[#d4a373]/50 transition-all duration-500 shadow-2xl"
            >
              {/* Video Player Container */}
              <div className="relative aspect-video w-full bg-black overflow-hidden z-20">
                {activeVideo === item._id ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={getEmbedUrl(item.videoUrl)}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 z-30"
                  ></iframe>
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setActiveVideo(item._id)}
                  >
                    {/* Thumbnail Placeholder (ইউটিউব থাম্বনেইল অটো দেখাবে) */}
                    <img
                      src={`https://img.youtube.com/vi/${
                        item.videoUrl.split("v=")[1]?.split("&")[0] ||
                        item.videoUrl.split("/").pop()
                      }/mqdefault.jpg`}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      alt="thumbnail"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#d4a373] p-4 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform">
                        <FaPlay className="text-[#1a120b] ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Info Content */}
              <div className="md:p-8 p-4 flex flex-col grow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-red-500/10 p-2 rounded-lg">
                    <FaYoutube className="text-red-500 text-xl" />
                  </div>
                  <div className="flex flex-col">
                    <Typography className="text-gray-500! text-[10px]! font-bold! uppercase! tracking-widest!">
                      Latest Upload
                    </Typography>
                    <div className="flex items-center gap-1 text-gray-600 text-[10px]">
                      <FaRegClock />{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <Typography
                  variant="h6"
                  className="text-[#e7dec8]! font-serif! font-semibold! leading-tight! line-clamp-2 min-h-14 group-hover:text-[#d4a373]! transition-colors!"
                >
                  {item.title}
                </Typography>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setActiveVideo(item._id)}
                    className="flex items-center gap-2 text-[#d4a373] font-bold text-xs uppercase tracking-widest hover:text-[#e7dec8] transition-colors cursor-pointer outline-none"
                  >
                    <FaPlay size={10} />{" "}
                    {activeVideo === item._id ? "Playing..." : "Play Now"}
                  </button>
                  <span className="h-1 w-12 bg-[#3c2a21] rounded-full group-hover:w-24 group-hover:bg-[#d4a373] transition-all duration-700"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutorials;
