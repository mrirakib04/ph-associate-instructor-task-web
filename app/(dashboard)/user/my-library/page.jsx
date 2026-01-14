"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import { FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyLibrary = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    if (user?.email) fetchLibrary();
  }, [user?.email]);

  const fetchLibrary = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/my-library/${user.email}`);
      const data = await res.json();
      setLibraryBooks(data);
    } catch (err) {
      toast.error("Failed to load your library");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    Swal.fire({
      title: "Remove Book?",
      text: "This will remove the book from your personal shelf.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d4a373",
      cancelButtonColor: "#3c2a21",
      confirmButtonText: "Yes, remove!",
      background: "#1a120b",
      color: "#e7dec8",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${serverUrl}/my-library/remove/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            setLibraryBooks(libraryBooks.filter((book) => book._id !== id));
            toast.success("Book removed");
          }
        } catch (err) {
          toast.error("Error removing book");
        }
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f0a06]">
        <CircularProgress sx={{ color: "#d4a373" }} />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full min-h-screen bg-[#0f0a06]">
      <header className="mb-10">
        <Typography
          variant="h4"
          className="font-serif font-bold text-[#e7dec8] mb-1"
        >
          Library <span className="text-[#d4a373]">Inventory</span>
        </Typography>
        <p className="text-gray-500 text-sm">
          Manage and track your saved collection.
        </p>
      </header>

      {libraryBooks.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: "#1a120b",
            borderRadius: "16px",
            border: "1px solid #3c2a21",
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "#0f0a06" }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4a373",
                    fontWeight: "bold",
                    borderBottom: "1px solid #3c2a21",
                  }}
                >
                  Book
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4a373",
                    fontWeight: "bold",
                    borderBottom: "1px solid #3c2a21",
                  }}
                >
                  Author
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4a373",
                    fontWeight: "bold",
                    borderBottom: "1px solid #3c2a21",
                  }}
                >
                  Shelf
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4a373",
                    fontWeight: "bold",
                    borderBottom: "1px solid #3c2a21",
                  }}
                >
                  Pages
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#d4a373",
                    fontWeight: "bold",
                    borderBottom: "1px solid #3c2a21",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {libraryBooks.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:hover": { bgcolor: "#251b13" }, transition: "0.3s" }}
                >
                  <TableCell sx={{ borderBottom: "1px solid #3c2a21" }}>
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{
                          width: 45,
                          height: 60,
                          border: "1px solid #3c2a21",
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#e7dec8",
                          fontWeight: "medium",
                          fontSize: "0.95rem",
                          textWrap: "nowrap",
                        }}
                      >
                        {item.title}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#a8a29e",
                      borderBottom: "1px solid #3c2a21",
                      textWrap: "nowrap",
                    }}
                  >
                    {item.author}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "1px solid #3c2a21" }}>
                    <span className="px-3 py-1 text-nowrap rounded-full text-[11px] font-bold uppercase bg-[#d4a373]/10 text-[#d4a373] border border-[#d4a373]/20">
                      {item.shelf}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{ color: "#a8a29e", borderBottom: "1px solid #3c2a21" }}
                  >
                    {item.totalPages || "N/A"}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderBottom: "1px solid #3c2a21" }}
                  >
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() =>
                          (window.location.href = `/books/${item.bookId}`)
                        }
                        className="p-2 text-[#d4a373] hover:bg-[#d4a373]/10 rounded-full transition-all cursor-pointer"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-all cursor-pointer"
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="text-center py-24 border-2 border-dashed border-[#3c2a21] rounded-3xl">
          <Typography className="text-gray-500 italic">
            No books found in your inventory.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
