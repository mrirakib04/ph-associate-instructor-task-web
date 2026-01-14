"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { FaSearch, FaYoutube } from "react-icons/fa";

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    fetchTutorials();
  }, [search]);

  const fetchTutorials = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/tutorials?search=${search}`);
      const data = await res.json();
      setTutorials(data);
    } catch (error) {
      console.error("Failed to fetch tutorials:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full min-h-screen">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <Typography
            variant="h4"
            className="font-serif font-bold text-[#d4a373]! mb-2!"
          >
            Learning Hub
          </Typography>
          <Typography variant="body1" className="text-gray-400!">
            Discover handpicked tutorials and book reviews.
          </Typography>
        </div>

        <TextField
          placeholder="Search tutorials..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={searchStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch className="text-[#d4a373]" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Main Content Area using standard divs */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <CircularProgress sx={{ color: "#d4a373" }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((item) => (
            <div
              key={item._id}
              className="bg-[#1a120b] border border-[#3c2a21] rounded-2xl overflow-hidden flex flex-col hover:border-[#d4a373] transition-all duration-300 shadow-xl group"
            >
              {/* Video Player Section */}
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(item.videoUrl)}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Text Content Section */}
              <div className="p-6 flex flex-col grow">
                <div className="flex items-start gap-3 mb-4">
                  <FaYoutube
                    className="text-red-500 mt-1 shrink-0 group-hover:scale-110 transition-transform"
                    size={20}
                  />
                  <Typography
                    variant="h6"
                    className="text-[#e7dec8]! font-serif! font-semibold leading-snug line-clamp-2"
                  >
                    {item.title}
                  </Typography>
                </div>

                <div className="mt-auto pt-4 border-t border-[#3c2a21]">
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                    Published: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && tutorials.length === 0 && (
        <div className="text-center py-32 bg-[#1a120b] rounded-3xl border border-dashed border-[#3c2a21]">
          <Typography className="text-gray-500! italic font-serif">
            "Every book has a story, but we couldn't find this tutorial."
          </Typography>
        </div>
      )}
    </div>
  );
};

// Search styles constant
const searchStyle = {
  width: { xs: "100%", md: "350px" },
  "& .MuiOutlinedInput-root": {
    color: "#e7dec8",
    backgroundColor: "#1a120b",
    fontFamily: "var(--font-serif)",
    "& fieldset": { borderColor: "#3c2a21" },
    "&:hover fieldset": { borderColor: "#d4a373" },
    "&.Mui-focused fieldset": { borderColor: "#d4a373" },
  },
};

export default Tutorials;
