"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import { FaTrash, FaCheck, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageReviews = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [open, setOpen] = useState(false);

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    if (user?.email) {
      fetchReviews();
    }
  }, [user?.email, filterStatus]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${serverUrl}/manage-reviews/${user.email}?status=${filterStatus}`
      );
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${serverUrl}/reviews/approve/${id}`, {
        method: "PATCH",
      });
      if (res.ok) {
        toast.success("Review Approved!");
        fetchReviews();
      }
    } catch (err) {
      toast.error("Error approving review");
    }
  };

  const handleDelete = async (id) => {
    // SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d4a373",
      cancelButtonColor: "#3c2a21",
      confirmButtonText: "Yes, delete it!",
      background: "#1a120b",
      color: "#e7dec8",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${serverUrl}/reviews/dlt/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "The review has been deleted.",
              icon: "success",
              background: "#1a120b",
              color: "#e7dec8",
              confirmButtonColor: "#d4a373",
            });
            fetchReviews();
          }
        } catch (err) {
          toast.error("Error deleting review");
        }
      }
    });
  };
  const handleOpenDialog = (review) => {
    setSelectedReview(review);
    setOpen(true);
  };

  if (loading)
    return (
      <div className="py-20">
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 10 }} />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <Typography
            variant="h4"
            className="text-[#e7dec8]! font-serif! md:text-4xl! sm:text-3xl! text-2xl! font-bold!"
          >
            Manage <span className="text-[#d4a373]">Reviews</span>
          </Typography>

          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            displayEmpty
            size="small"
            sx={{
              backgroundColor: "#1a120b",
              color: "#e7dec8",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#3c2a21" },
              "& .MuiSvgIcon-root": { color: "#d4a373" },
            }}
          >
            <MenuItem value="">All Reviews</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
          </Select>
        </div>

        <TableContainer
          component={Paper}
          sx={{ bgcolor: "#1a120b", border: "1px solid #3c2a21" }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "#0f0a06" }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4a373",
                    fontWeight: "bold",
                    textWrap: "nowrap",
                  }}
                >
                  Book Title
                </TableCell>
                <TableCell sx={{ color: "#d4a373", fontWeight: "bold" }}>
                  Reviewer
                </TableCell>
                <TableCell sx={{ color: "#d4a373", fontWeight: "bold" }}>
                  Rating
                </TableCell>
                <TableCell sx={{ color: "#d4a373", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "#d4a373", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((rev) => (
                <TableRow
                  key={rev._id}
                  sx={{ "&:hover": { bgcolor: "#251b13" } }}
                >
                  <TableCell sx={{ color: "#e7dec8" }}>
                    {rev.bookTitle}
                  </TableCell>
                  <TableCell sx={{ color: "#e7dec8" }}>
                    {rev.reviewer}
                  </TableCell>
                  <TableCell sx={{ color: "#e7dec8" }}>
                    {rev.rating}/5
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={rev.status}
                      color={rev.status === "approved" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <IconButton
                        onClick={() => handleOpenDialog(rev)}
                        sx={{ color: "#d4a373" }}
                      >
                        <FaEye size={18} />
                      </IconButton>
                      {rev.status === "pending" && (
                        <IconButton
                          onClick={() => handleApprove(rev._id)}
                          sx={{ color: "#4caf50" }}
                        >
                          <FaCheck size={18} />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => handleDelete(rev._id)}
                        sx={{ color: "#f44336" }}
                      >
                        <FaTrash size={18} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* View Review Dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{ sx: { bgcolor: "#1a120b", color: "#e7dec8" } }}
        >
          <DialogTitle
            sx={{ borderBottom: "1px solid #3c2a21", color: "#d4a373" }}
          >
            Review for {selectedReview?.bookTitle}
          </DialogTitle>
          <DialogContent className="mt-4">
            <Typography variant="subtitle2" color="gray">
              Reviewer: {selectedReview?.reviewer} (
              {selectedReview?.reviewerEmail})
            </Typography>
            <Typography variant="h6" className="mt-4 italic">
              "{selectedReview?.review}"
            </Typography>
            <Typography className="mt-2 text-[#d4a373]">
              Rating: {selectedReview?.rating}/5
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} sx={{ color: "#d4a373" }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManageReviews;
