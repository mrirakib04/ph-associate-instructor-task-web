"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, Tooltip } from "@mui/material";
import { FaBook, FaArrowRight, FaStar, FaPlusCircle } from "react-icons/fa";
import Link from "next/link";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    fetch(`${serverUrl}/home/latest/books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading)
    return (
      <Box className="flex! justify-center! py-20!">
        <CircularProgress sx={{ color: "#d4a373" }} />
      </Box>
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <Typography
            variant="h4"
            className="text-[#e7dec8]! font-serif! font-bold! mb-2!"
          >
            Newly Arrived <span className="text-[#d4a373]">Treasures</span>
          </Typography>
          <Typography className="text-gray-500! text-sm!">
            The latest additions to our curated library, fresh from the authors.
          </Typography>
        </div>
        <Link href="/books">
          <button className="bg-transparent border border-[#3c2a21] hover:border-[#d4a373] text-[#d4a373] px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all group cursor-pointer">
            Explore All Books{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Books Grid - 4 Columns on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="group bg-[#1a120b] border border-[#3c2a21] rounded-2xl overflow-hidden hover:border-[#d4a373] transition-all duration-500 flex flex-col h-full shadow-2xl hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative aspect-7/8 overflow-hidden bg-[#0f0a07]">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute top-4 right-4 bg-[#d4a373] text-[#1a120b] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                {book.genre}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col grow">
              <Typography
                variant="h6"
                className="text-[#e7dec8]! font-serif! font-bold! text-lg! leading-snug! line-clamp-1 mb-1! group-hover:text-[#d4a373]! transition-colors!"
              >
                {book.title}
              </Typography>
              <Typography className="text-gray-500! text-xs! italic! mb-4!">
                by{" "}
                <span className="text-gray-400! font-medium!">
                  {book.author}
                </span>
              </Typography>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#3c2a21]">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-600" size={12} />
                  <span className="text-gray-400 text-xs font-bold">New</span>
                </div>

                <Link href={`/books/data/${book._id}`}>
                  <Tooltip title="View Details" arrow>
                    <button className="text-[#d4a373] flex items-center gap-1 px-2 py-1 rounded-full bg-[#3c2a21] hover:text-[#e7dec8] transition-colors cursor-pointer">
                      Details <FaPlusCircle size={22} />
                    </button>
                  </Tooltip>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;
