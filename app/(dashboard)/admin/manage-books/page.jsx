"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Pagination, // Pagination Component added
} from "@mui/material";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "white !important",
    "& fieldset": { borderColor: "#3c2a21 !important" },
    "&:hover fieldset": { borderColor: "#d4a373 !important" },
    "&.Mui-focused fieldset": { borderColor: "#d4a373 !important" },
  },
  "& .MuiInputLabel-root": { color: "#d4a373 !important" },
  "& .MuiSelect-icon": { color: "#d4a373 !important" },
};

const ManageBooks = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const size = 10;

  const [open, setOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  const fetchData = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    try {
      // Fetching My Books with pagination and Categories
      const [bookRes, catRes] = await Promise.all([
        fetch(
          `${serverUrl}/my-books/${session.user.email}?page=${
            page - 1
          }&size=${size}`
        ),
        fetch(`${serverUrl}/categories`),
      ]);

      const bookData = await bookRes.json();
      const catData = await catRes.json();

      setBooks(bookData.books || []);
      setTotalBooks(bookData.totalCount || 0);
      setCategories(catData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session, page]); // Re-fetch when session or page changes

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this book?")) {
      const res = await fetch(`${serverUrl}/books/dlt/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Book deleted successfully");
        fetchData(); // Refresh current page
      }
    }
  };

  const handleEditClick = (book) => {
    setCurrentBook({ ...book });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentBook(null);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${serverUrl}/books/update/${currentBook._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentBook),
      });

      if (res.ok) {
        toast.success("Book updated successfully!");
        fetchData();
        handleClose();
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Typography
            variant="h4"
            className="text-[#e7dec8]! font-serif! md:text-4xl! sm:text-3xl! text-2xl! font-bold!"
          >
            Manage My <span className="text-[#d4a373]">Books</span>
          </Typography>
          <Typography variant="body2" className="text-gray-500! mt-1">
            Total books found: {totalBooks}
          </Typography>
        </div>
        <Link href="/admin/add-book">
          <button className="flex items-center gap-2 cursor-pointer bg-[#d4a373] text-[#1a120b] px-5 py-2 rounded-lg font-bold hover:bg-[#faedcd] transition-all shadow-lg">
            <FaPlus /> Add Book
          </button>
        </Link>
      </div>

      <TableContainer
        component={Paper}
        className="bg-[#1a120b]! border text-nowrap border-[#3c2a21]! rounded-2xl overflow-hidden shadow-2xl"
      >
        <Table>
          <TableHead className="bg-[#2d241e]!">
            <TableRow>
              <TableCell className="text-[#d4a373]! font-bold!">
                Cover
              </TableCell>
              <TableCell className="text-[#d4a373]! font-bold!">
                Title & Author
              </TableCell>
              <TableCell className="text-[#d4a373]! font-bold!">
                Genre
              </TableCell>
              <TableCell className="text-[#d4a373]! font-bold!">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book._id}
                className="hover:bg-[#2d241e]! transition-colors"
              >
                <TableCell className="border-b-[#3c2a21]!">
                  <Avatar
                    variant="rounded"
                    src={book.image}
                    sx={{ width: 50, height: 70 }}
                    className="border border-[#3c2a21]!"
                  />
                </TableCell>
                <TableCell className="border-b-[#3c2a21]!">
                  <div className="text-[#e7dec8]! font-bold!">{book.title}</div>
                  <div className="text-gray-500! text-sm!">{book.author}</div>
                </TableCell>
                <TableCell className="border-b-[#3c2a21]!">
                  <span className="bg-[#3c2a21] text-[#e7dec8] px-3 py-1 rounded-full text-xs border border-[#d4a373]/30">
                    {book.genre}
                  </span>
                </TableCell>
                <TableCell className="border-b-[#3c2a21]!">
                  <div className="flex gap-2">
                    <IconButton
                      onClick={() => handleEditClick(book)}
                      className="text-blue-400! hover:bg-blue-400/10!"
                    >
                      <FaEdit size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(book._id)}
                      className="text-red-400! hover:bg-red-400/10!"
                    >
                      <FaTrash size={18} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && (
          <div className="text-center py-10 text-[#d4a373]">
            Loading books...
          </div>
        )}
        {!loading && books.length === 0 && (
          <div className="text-center py-10 text-gray-500!">
            No books found in your account.
          </div>
        )}
      </TableContainer>

      {/* Pagination Controls */}
      {totalBooks > size && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={Math.ceil(totalBooks / size)}
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": { color: "#d4a373" },
              "& .Mui-selected": {
                backgroundColor: "#d4a373!important",
                color: "#1a120b",
              },
            }}
          />
        </div>
      )}

      {/* Dialog remains the same as your code */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          className: "bg-[#1a120b]! border border-[#3c2a21]! text-white!",
        }}
      >
        <DialogTitle className="text-[#d4a373]! font-serif! font-bold!">
          Update Book Details
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <div className="flex items-center w-full md:flex-row flex-col gap-4 mt-2">
            <TextField
              label="Book Title"
              fullWidth
              value={currentBook?.title || ""}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, title: e.target.value })
              }
              sx={inputStyle}
            />
            <TextField
              select
              label="Genre"
              fullWidth
              value={currentBook?.genre || ""}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, genre: e.target.value })
              }
              sx={inputStyle}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <TextField
            label="Author"
            fullWidth
            value={currentBook?.author || ""}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, author: e.target.value })
            }
            sx={inputStyle}
          />
          <TextField
            label="Image URL"
            fullWidth
            value={currentBook?.image || ""}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, image: e.target.value })
            }
            sx={inputStyle}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={currentBook?.description || ""}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, description: e.target.value })
            }
            sx={inputStyle}
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleClose} className="text-gray-400!">
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            className="bg-[#d4a373]! text-[#1a120b]! font-bold! hover:bg-[#faedcd]!"
          >
            Update Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageBooks;
