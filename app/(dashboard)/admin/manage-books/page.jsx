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
} from "@mui/material";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load books from Backend
  const fetchBooks = async () => {
    try {
      const res = await fetch(
        "https://mrirakib-ph-associate-instructor-task-server.vercel.app/books"
      );
      const data = await res.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this book?")) {
      const res = await fetch(
        `https://mrirakib-ph-associate-instructor-task-server.vercel.app/books/dlt/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Book deleted successfully");
        setBooks(books.filter((book) => book._id !== id));
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      <div className="flex justify-between items-center mb-8">
        <Typography
          variant="h4"
          className="font-serif font-bold text-[#d4a373]!"
        >
          Manage Inventory
        </Typography>
        <Link href="/admin/add-book">
          <button className="flex items-center gap-2 bg-[#d4a373] text-[#1a120b] px-5 py-2 rounded-lg font-bold hover:bg-[#faedcd] transition-all">
            <FaPlus /> Add Book
          </button>
        </Link>
      </div>

      <TableContainer
        component={Paper}
        className="bg-[#1a120b]! border border-[#3c2a21]! rounded-2xl overflow-hidden"
      >
        <Table>
          <TableHead className="bg-[#2d241e]">
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
              <TableCell className="text-[#d4a373]! font-bold! align-center!">
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
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={book.image}
                    sx={{ width: 50, height: 70 }}
                  />
                </TableCell>
                <TableCell>
                  <div className="text-[#e7dec8]! font-bold!">{book.title}</div>
                  <div className="text-gray-500! text-sm!">{book.author}</div>
                </TableCell>
                <TableCell className="text-[#e7dec8]!">
                  <span className="bg-[#3c2a21] px-3 py-1 rounded-full text-xs border border-[#d4a373]/30">
                    {book.genre}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton className="text-blue-400! hover:bg-blue-400/10!">
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
        {books.length === 0 && !loading && (
          <div className="text-center py-10 text-gray-500">
            No books found in the library.
          </div>
        )}
      </TableContainer>
    </div>
  );
};

export default ManageBooks;
