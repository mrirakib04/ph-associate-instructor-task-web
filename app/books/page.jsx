"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import Link from "next/link";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination & Filters State
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [search, selectedGenre, sort, page]); // page পরিবর্তন হলে আবার ফেচ হবে

  const fetchCategories = async () => {
    const res = await fetch(`${serverUrl}/categories`);
    const data = await res.json();
    setCategories(data);
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // Backend এ page ০ থেকে শুরু হয়, তাই (page - 1) পাঠানো হয়েছে
      const res = await fetch(
        `${serverUrl}/books?search=${search}&genre=${selectedGenre}&sort=${sort}&page=${
          page - 1
        }&size=${pageSize}`
      );
      const data = await res.json();
      setBooks(data.books);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full min-h-screen">
      {/* --- Filter Header --- */}
      <div className="bg-[#1a120b] p-6 rounded-2xl border border-[#3c2a21] mb-10 shadow-2xl">
        <Typography
          variant="h4"
          className="font-serif font-bold text-[#d4a373]! mb-6!"
        >
          Browse Library
        </Typography>

        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <TextField
            fullWidth
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch className="text-[#d4a373]" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth sx={inputStyle}>
            <InputLabel id="genre-label">All Genres</InputLabel>
            <Select
              labelId="genre-label"
              value={selectedGenre}
              label="All Genres"
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">All Genres</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={inputStyle}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sort}
              label="Sort By"
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="newest">Newest Added</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* --- Books Grid --- */}
      {loading ? (
        <div className="text-center py-20">
          <CircularProgress></CircularProgress>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-[#1a120b] border border-[#3c2a21] rounded-xl overflow-hidden hover:border-[#d4a373] transition-all group flex flex-col shadow-lg hover:shadow-2xl"
              >
                <div className="relative aspect-7/8 overflow-hidden bg-black">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full text-white object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-[#d4a373] text-[#1a120b] px-2 py-1 rounded text-xs font-bold shadow-lg uppercase">
                    {book.genre}
                  </div>
                </div>

                <div className="p-4 flex flex-col grow">
                  <Typography
                    variant="h6"
                    className="text-[#e7dec8]! font-serif! font-bold line-clamp-1 mb-1!"
                  >
                    {book.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500! mb-4!">
                    by {book.author}
                  </Typography>
                  <Link href={`/books/${book._id}`} className="mt-auto">
                    <button className="w-full flex cursor-pointer items-center justify-center gap-2 py-2.5 bg-[#2d241e] text-[#d4a373] border border-[#d4a373]/30 rounded-lg hover:bg-[#d4a373] hover:text-[#1a120b] transition-all font-bold text-sm uppercase tracking-wider">
                      <FaBookOpen /> View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* --- Pagination Control --- */}
          {totalCount > pageSize && (
            <div className="flex justify-center mt-12 mb-6">
              <Pagination
                count={Math.ceil(totalCount / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={paginationStyle}
                size="large"
              />
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && books.length === 0 && (
        <div className="text-center py-24 bg-[#1a120b] rounded-2xl border border-dashed border-[#3c2a21]">
          <Typography className="text-gray-500! italic font-serif">
            "Every book is a new adventure, but we couldn't find this one."
          </Typography>
        </div>
      )}
    </div>
  );
};

// Custom Styles
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#e7dec8",
    "& fieldset": { borderColor: "#3c2a21", borderRadius: "12px" },
    "&:hover fieldset": { borderColor: "#d4a373" },
    "&.Mui-focused fieldset": { borderColor: "#d4a373" },
  },
  "& .MuiInputLabel-root": { color: "#d4a373" },
  "& .MuiSelect-icon": { color: "#d4a373" },
};

const paginationStyle = {
  "& .MuiPaginationItem-root": {
    color: "#d4a373",
    borderColor: "#3c2a21",
    "&:hover": { backgroundColor: "#2d241e" },
    "&.Mui-selected": {
      backgroundColor: "#d4a373",
      color: "#1a120b",
      fontWeight: "bold",
      "&:hover": { backgroundColor: "#faedcd" },
    },
  },
};

export default Books;
