"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Typography,
  CircularProgress,
  Rating,
  TextField,
  Divider,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  FaUserCircle,
  FaRegClock,
  FaStar,
  FaPlus,
  FaBookReader,
} from "react-icons/fa";
import { toast } from "react-toastify";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userReview, setUserReview] = useState({ rating: 5, comment: "" });

  // AuthContext থেকে আসা উচিত (ডামি ডাটা)
  const user = { name: "John Doe", email: "reader@example.com" };

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    if (id) fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/books/data/${id}`);
      const data = await res.json();
      setBook(data);
    } catch (err) {
      console.error("Error fetching book:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToLibrary = async (shelf) => {
    const libraryData = {
      bookId: id,
      userEmail: user.email,
      shelf,
      title: book.title,
      image: book.image,
      author: book.author,
      authorEmail: book.authorEmail,
    };

    try {
      const res = await fetch(`${serverUrl}/my-library`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libraryData),
      });
      if (res.ok) toast.success(`Saved to ${shelf}!`);
    } catch (err) {
      toast.error("Failed to add to library");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!userReview.comment)
      return toast.warning("Please share your thoughts!");

    setSubmitting(true);
    const reviewPayload = {
      bookId: id,
      bookTitle: book.title,
      authorEmail: book.authorEmail,
      review: userReview.comment,
      rating: userReview.rating,
      reviewer: user.name,
      reviewerEmail: user.email,
    };

    try {
      const res = await fetch(`${serverUrl}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewPayload),
      });

      if (res.ok) {
        toast.success("Review sent for moderation!");
        setUserReview({ rating: 5, comment: "" });
        fetchBookDetails();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(book.reviews);
  const totalReviews = book.reviews?.length || 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f0a06]">
        <CircularProgress sx={{ color: "#d4a373" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0a06] text-[#e7dec8] selection:bg-[#d4a373] selection:text-[#1a120b]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* --- Main Section --- */}
        <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
          {/* Left: Book Cover */}
          <div className="w-full md:w-2/5 lg:w-1/3 sticky top-24">
            <Paper
              elevation={24}
              className="bg-[#1a120b] p-3 border border-[#3c2a21] rounded-2xl overflow-hidden"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-auto rounded-xl object-cover transition-transform duration-500 hover:scale-105"
              />
            </Paper>

            {/* Action Buttons for Library */}
            <div className="mt-8 grid grid-cols-1 gap-3">
              <p className="text-[#d4a373] text-sm uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <FaBookReader /> Add to My Library
              </p>
              <div className="flex flex-wrap gap-2">
                {["Want to Read", "Currently Reading", "Read"].map((shelf) => (
                  <button
                    key={shelf}
                    onClick={() => addToLibrary(shelf)}
                    className="flex-1 min-w-30 cursor-pointer py-2 px-3 border border-[#3c2a21] bg-[#1a120b] hover:bg-[#d4a373] hover:text-[#1a120b] transition-all duration-300 rounded-lg text-xs font-bold uppercase"
                  >
                    {shelf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="w-full md:w-3/5 lg:w-2/3">
            <div className="mb-6">
              <span className="bg-[#d4a373] text-[#1a120b] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                {book.genre}
              </span>
            </div>

            <Typography
              variant="h2"
              className="font-serif font-bold text-[#e7dec8] mb-4 leading-tight"
            >
              {book.title}
            </Typography>

            <Typography
              variant="h5"
              className="text-[#d4a373] font-serif italic mb-6!"
            >
              by{" "}
              <span className="underline decoration-wavy">{book.author}</span>
            </Typography>

            <div className="flex items-center gap-6 mb-10 bg-[#1a120b]/40 p-4 rounded-2xl border border-[#3c2a21]/50 w-fit">
              <div className="flex flex-col">
                <Rating
                  value={Number(averageRating) || 0}
                  readOnly
                  precision={0.1}
                  icon={
                    <FaStar className="text-[#d4a373]" fontSize="inherit" />
                  }
                  emptyIcon={
                    <FaStar className="text-gray-800" fontSize="inherit" />
                  }
                />
                <span className="text-gray-500 text-xs mt-1 font-mono uppercase">
                  {averageRating > 0
                    ? `${averageRating} / 5.0 Rating`
                    : "No Ratings Yet"}
                </span>
                <span className="text-[10px] text-gray-600 italic">
                  Based on {totalReviews} reviews
                </span>
              </div>
              <Divider
                orientation="vertical"
                flexItem
                className="bg-[#3c2a21]"
              />
              <div className="text-center">
                <p className="text-[#e7dec8] font-bold text-xl">
                  {book.reviews?.length || 0}
                </p>
                <p className="text-gray-500 text-[10px] uppercase">Reviews</p>
              </div>
            </div>

            <Typography className="text-gray-400 leading-loose text-lg mb-12 font-light first-letter:text-5xl first-letter:font-serif first-letter:text-[#d4a373] first-letter:mr-3 first-letter:float-left">
              {book.description}
            </Typography>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <InfoCard label="Publisher" value="Cozy Reads Press" />
              <InfoCard
                label="Author Email"
                value={book.authorEmail}
                isTruncated
              />
              <InfoCard label="Book ID" value={`#${book._id.slice(-6)}`} />
            </div>
          </div>
        </div>

        <Divider className="bg-[#3c2a21] mb-20" />

        {/* --- Review Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Review List */}
          <div>
            <div className="flex items-center justify-between mb-10">
              <Typography variant="h4" className="text-[#e7dec8] font-serif">
                Community <span className="text-[#d4a373]">Voice</span>
              </Typography>
            </div>

            <div className="space-y-8 max-h-175 overflow-y-auto pr-4 custom-scrollbar">
              {book.reviews && book.reviews.length > 0 ? (
                book.reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="group relative bg-[#1a120b]/30 p-8 rounded-3xl border border-[#3c2a21] hover:border-[#d4a373]/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-[#d4a373] p-0.5 rounded-full">
                          <FaUserCircle className="text-[#1a120b] text-4xl" />
                        </div>
                        <div>
                          <p className="text-[#e7dec8] font-bold text-lg">
                            {rev.reviewer}
                          </p>
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <FaRegClock />{" "}
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Rating
                        value={rev.rating}
                        size="small"
                        readOnly
                        sx={{ color: "#d4a373" }}
                      />
                    </div>
                    <p className="text-gray-400 leading-relaxed italic text-lg relative z-10">
                      "{rev.review}"
                    </p>
                    <div className="absolute bottom-4 right-8 text-[#3c2a21] text-6xl font-serif opacity-20 group-hover:opacity-40 transition-opacity">
                      ”
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-[#1a120b]/20 rounded-3xl border border-dashed border-[#3c2a21]">
                  <p className="text-gray-500 italic">
                    No whispers yet. Start the conversation.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Review Form */}
          <div className="bg-[#1a120b] p-10 rounded-4xl border border-[#3c2a21] h-fit sticky top-24 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4a373] opacity-5 rounded-bl-full"></div>

            <Typography variant="h5" className="text-[#e7dec8] font-serif mb-2">
              Leave your Mark
            </Typography>
            <p className="text-gray-500 mb-10 text-sm italic font-light">
              Your review helps other wanderers find their next journey.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-8">
              <div className="bg-[#0f0a06] p-4 rounded-2xl border border-[#3c2a21] w-fit">
                <p className="text-[#d4a373] text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">
                  Your Rating
                </p>
                <Rating
                  size="large"
                  value={userReview.rating}
                  onChange={(e, val) =>
                    setUserReview({ ...userReview, rating: val })
                  }
                  sx={{ color: "#d4a373" }}
                />
              </div>

              <TextField
                fullWidth
                multiline
                rows={5}
                placeholder="What feelings did this book evoke? Would you recommend it?"
                value={userReview.comment}
                onChange={(e) =>
                  setUserReview({ ...userReview, comment: e.target.value })
                }
                sx={formStyle}
              />

              <button
                type="submit"
                disabled={submitting}
                className={`group relative mt-4 w-full py-5 bg-[#d4a373] text-[#1a120b] font-black rounded-2xl transition-all uppercase tracking-widest shadow-lg overflow-hidden ${
                  submitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-[1.02] active:scale-95"
                }`}
              >
                <span className="relative z-10">
                  {submitting ? "Sharing..." : "Publish Review"}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoCard = ({ label, value, isTruncated }) => (
  <div className="p-4 bg-[#1a120b] border border-[#3c2a21] rounded-2xl hover:border-[#d4a373]/30 transition-colors">
    <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">
      {label}
    </p>
    <p
      className={`text-[#e7dec8] font-bold text-sm ${
        isTruncated ? "truncate" : ""
      }`}
    >
      {value}
    </p>
  </div>
);

const formStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#e7dec8",
    backgroundColor: "#0f0a06",
    fontSize: "1.1rem",
    "& fieldset": { borderColor: "#3c2a21", borderRadius: "4px" },
    "&:hover fieldset": { borderColor: "#d4a373" },
    "&.Mui-focused fieldset": { borderColor: "#d4a373" },
  },
};

export default BookDetails;
