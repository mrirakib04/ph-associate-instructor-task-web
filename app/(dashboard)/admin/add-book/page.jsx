"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddBook = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    image: "",
  });

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => ({
        ...prev,
        author: session.user.name,
      }));
    }
  }, [session]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch(`${serverUrl}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories");
      }
    };
    fetchCats();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== "authenticated") return toast.error("Please login first!");

    setLoading(true);

    const bookData = {
      ...formData,
      authorEmail: session?.user?.email,
    };

    try {
      const res = await fetch(`${serverUrl}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (res.ok) {
        toast.success("Book added successfully!");
        router.push("/admin/manage-books");
      } else {
        toast.error("Failed to add book.");
      }
    } catch (error) {
      toast.error("Network error!");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading")
    return (
      <div className="p-10 text-center text-[#d4a373]">Loading Session...</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      <Typography
        variant="h4"
        className="font-serif! md:text-4xl! sm:text-3xl! text-2xl! font-bold! text-[#d4a373]! mb-8!"
      >
        Add New <span className="text-[#e7dec8]">Book</span>
      </Typography>

      <Paper className="bg-[#1a120b]! border border-[#3c2a21]! p-6 md:p-10 rounded-2xl shadow-2xl!">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Row 1: Title and Author */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <TextField
                fullWidth
                label="Book Title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                sx={inputStyle}
              />
            </div>
            <div className="flex-1">
              <TextField
                fullWidth
                label="Author Name"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                sx={inputStyle}
              />
            </div>
          </div>

          {/* Row 2: Genre and Image URL */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <TextField
                select
                fullWidth
                label="Genre / Category"
                name="genre"
                required
                value={formData.genre}
                onChange={handleChange}
                sx={inputStyle}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="flex-1">
              <TextField
                fullWidth
                label="Book Cover Image URL"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                sx={inputStyle}
              />
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="w-full">
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              sx={inputStyle}
            />
          </div>

          {/* Row 4: Info and Action */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
            <Typography
              variant="caption"
              className="text-gray-500! order-2 md:order-1"
            >
              Posting as:{" "}
              <span className="text-[#d4a373]">{session?.user?.email}</span>
            </Typography>

            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-[#d4a373]! text-[#1a120b]! font-bold! py-3! px-12! rounded-lg! hover:bg-[#faedcd]! transition-all! order-1 md:order-2 shadow-lg"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add Book"
              )}
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#e7dec8 !important",
    "& fieldset": { borderColor: "#3c2a21 !important" },
    "&:hover fieldset": { borderColor: "#d4a373 !important" },
    "&.Mui-focused fieldset": { borderColor: "#d4a373 !important" },
  },
  "& .MuiInputLabel-root": { color: "#d4a373 !important" },
  "& .MuiSelect-icon": { color: "#d4a373 !important" },
};

export default AddBook;
