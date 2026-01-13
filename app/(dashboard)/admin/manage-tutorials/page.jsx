"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import { FaEdit, FaTrash, FaPlus, FaYoutube } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageTutorials = () => {
  const { data: session } = useSession();
  const [tutorials, setTutorials] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
  });

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    if (session?.user?.email) {
      fetchTutorials();
    }
  }, [session]);

  const fetchTutorials = async () => {
    const res = await fetch(
      `${serverUrl}/my-tutorials/${session?.user?.email}`
    );
    const data = await res.json();
    setTutorials(data);
  };

  const handleOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, videoUrl: item.videoUrl });
    } else {
      setEditingItem(null);
      setFormData({ title: "", videoUrl: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ title: "", videoUrl: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      authorEmail: session?.user?.email,
    };

    const url = editingItem
      ? `${serverUrl}/tutorials/update/${editingItem._id}`
      : `${serverUrl}/tutorials`;

    const method = editingItem ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(
          editingItem ? "Updated Successfully" : "Added Successfully"
        );
        fetchTutorials();
        handleClose();
      }
    } catch (error) {
      toast.error("Process Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this tutorial?")) {
      const res = await fetch(`${serverUrl}/tutorials/dlt/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Deleted");
        fetchTutorials();
      }
    }
  };

  // Helper to convert standard YT links to Embed links
  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/embed/")) return url;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      <div className="flex justify-between items-center mb-8">
        <Typography
          variant="h4"
          className="font-serif font-bold text-[#d4a373]!"
        >
          Manage Tutorials
        </Typography>
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          onClick={() => handleOpen()}
          className="bg-[#d4a373]! hover:bg-[#b08968]! text-[#1a120b]! font-bold!"
        >
          Add Tutorial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((item) => (
          <Paper
            key={item._id}
            className="bg-[#1a120b]! border border-[#3c2a21]! p-4 rounded-xl overflow-hidden"
          >
            <div className="aspect-video mb-4">
              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl(item.videoUrl)}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <Typography
              variant="h6"
              className="text-[#e7dec8]! line-clamp-1 mb-2"
            >
              {item.title}
            </Typography>
            <div className="flex justify-end gap-2">
              <IconButton
                onClick={() => handleOpen(item)}
                className="text-blue-400!"
              >
                <FaEdit size={18} />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(item._id)}
                className="text-red-400!"
              >
                <FaTrash size={18} />
              </IconButton>
            </div>
          </Paper>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle className="bg-[#1a120b] text-[#d4a373] font-bold">
          {editingItem ? "Update Tutorial" : "Add New Tutorial"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className="bg-[#1a120b] flex flex-col gap-4">
            <TextField
              label="Tutorial Title"
              fullWidth
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              sx={inputStyle}
            />
            <TextField
              label="YouTube Video URL"
              placeholder="https://www.youtube.com/watch?v=..."
              fullWidth
              required
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              sx={inputStyle}
              helperText="You can paste standard YouTube links or Embed links"
            />
          </DialogContent>
          <DialogActions className="bg-[#1a120b] p-4">
            <Button onClick={handleClose} className="text-gray-400!">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#d4a373]! text-[#1a120b]! font-bold!"
            >
              {loading ? "Processing..." : editingItem ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
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
  "& .MuiFormHelperText-root": { color: "#8b7e74 !important" },
};

export default ManageTutorials;
