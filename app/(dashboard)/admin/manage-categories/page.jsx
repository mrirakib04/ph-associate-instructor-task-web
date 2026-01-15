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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Pagination,
  CircularProgress,
  Box,
} from "@mui/material";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ManageCategories = () => {
  const { data: session, status } = useSession();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [page, setPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const size = 10;

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchMyCategories();
    }
  }, [session, status, page]);

  const fetchMyCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${serverUrl}/my-categories/${session.user.email}?page=${
          page - 1
        }&size=${size}`
      );
      const data = await res.json();
      setCategories(data.categories || []);
      setTotalCategories(data.totalCount || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error loading categories:", error);
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpen = (cat = null) => {
    if (cat) {
      setEditMode(true);
      setSelectedId(cat._id);
      setCategoryName(cat.name);
    } else {
      setEditMode(false);
      setCategoryName("");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryName("");
  };

  const handleSubmit = async () => {
    if (!categoryName) return toast.error("Name is required!");
    if (!session?.user?.email) return toast.error("User session not found!");

    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `${serverUrl}/categories/update/${selectedId}`
      : `${serverUrl}/categories`;

    const categoryData = {
      name: categoryName,
      authorEmail: session.user.email,
    };

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (res.ok) {
        toast.success(editMode ? "Updated!" : "Added Successfully!");
        fetchMyCategories();
        handleClose();
      } else {
        const err = await res.json();
        toast.error(err.message || "Action failed");
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this category?")) {
      const res = await fetch(`${serverUrl}/categories/dlt/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Deleted!");
        fetchMyCategories();
      }
    }
  };

  // MUI Loader
  if (status === "loading")
    return (
      <Box className="flex justify-center items-center min-h-100">
        <CircularProgress sx={{ color: "#d4a373" }} />
      </Box>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-5">
        <div>
          <Typography
            variant="h4"
            className="text-[#e7dec8]! font-serif! md:text-4xl! sm:text-3xl! text-2xl! font-bold! mb-1!"
          >
            Manage <span className="text-[#d4a373]">Categories</span>
          </Typography>
          <Typography variant="body2" className="text-gray-500!">
            Total categories found: {totalCategories}
          </Typography>
        </div>
        <button
          onClick={() => handleOpen()}
          className="flex items-center gap-2 bg-[#d4a373] text-[#1a120b] px-5 py-2 rounded-lg font-bold hover:bg-[#faedcd] transition-all shadow-lg"
        >
          <FaPlus /> Add New
        </button>
      </div>

      <TableContainer
        component={Paper}
        className="bg-[#1a120b]! border border-[#3c2a21]! rounded-2xl overflow-hidden shadow-2xl! min-h-75 relative"
      >
        {loading ? (
          <Box className="absolute inset-0 flex justify-center items-center bg-[#1a120b]/50 z-10">
            <CircularProgress sx={{ color: "#d4a373" }} />
          </Box>
        ) : (
          <Table>
            <TableHead className="bg-[#2d241e]!">
              <TableRow>
                <TableCell className="text-[#d4a373]! font-bold!">
                  Category Name
                </TableCell>
                <TableCell className="text-[#d4a373]! font-bold! text-right!">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat) => (
                <TableRow
                  key={cat._id}
                  className="hover:bg-[#2d241e]! transition-colors"
                >
                  <TableCell className="text-[#e7dec8]! border-b-[#3c2a21]! font-medium!">
                    {cat.name}
                  </TableCell>
                  <TableCell className="text-right! border-b-[#3c2a21]!">
                    <IconButton
                      onClick={() => handleOpen(cat)}
                      className="text-blue-400! hover:bg-blue-400/10!"
                    >
                      <FaEdit size={18} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-400! hover:bg-red-400/10!"
                    >
                      <FaTrash size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {!loading && categories.length === 0 && (
          <div className="text-center py-10 text-gray-500!">
            No categories found for you.
          </div>
        )}
      </TableContainer>

      {/* Pagination Controls */}
      {totalCategories > size && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={Math.ceil(totalCategories / size)}
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": { color: "#d4a373" },
              "& .Mui-selected": {
                backgroundColor: "#d4a373 !important",
                color: "#1a120b",
              },
              "& .MuiPaginationItem-ellipsis": { color: "#d4a373" },
            }}
          />
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "bg-[#1a120b]! border border-[#3c2a21]! min-w-[350px]",
        }}
      >
        <DialogTitle className="text-[#d4a373]! font-serif! font-bold!">
          {editMode ? "Update Category" : "Add New Category"}
        </DialogTitle>
        <DialogContent className="pt-2!">
          <TextField
            fullWidth
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={inputStyle}
          />
        </DialogContent>
        <DialogActions className="p-4!">
          <Button onClick={handleClose} className="text-gray-400!">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#d4a373]! text-[#1a120b]! font-bold! hover:bg-[#faedcd]!"
          >
            {editMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
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
};

export default ManageCategories;
