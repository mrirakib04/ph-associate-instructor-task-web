"use client";

import { useState } from "react";
import { Avatar, Button, TextField, Typography, Divider } from "@mui/material";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, update } = useSession();

  const [userName, setUserName] = useState(session?.user?.name || "");
  const [userImage, setUserImage] = useState(session?.user?.image || "");
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);
  const [isImageSubmitting, setIsImageSubmitting] = useState(false);

  // MUI Custom Styles for Dark Theme
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": { borderColor: "#3c2a21" },
      "&:hover fieldset": { borderColor: "#d4a373" },
      "&.Mui-focused fieldset": { borderColor: "#d4a373" },
    },
    "& .MuiInputLabel-root": { color: "#a1a1aa" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#d4a373" },
  };

  // Update Name Function (Logic kept as provided)
  const updateName = async (e) => {
    e.preventDefault();
    setIsNameSubmitting(true);
    try {
      const res = await fetch(
        "https://mrirakib-ph-associate-instructor-task-server.vercel.app/update-name",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session?.user.email,
            name: userName,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      await update({
        ...session,
        user: { ...session?.user, name: userName },
      });
      toast.success("Name updated!", { position: "top-center" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsNameSubmitting(false);
    }
  };

  // Update Image Function (Logic kept as provided)
  const updateImage = async (e) => {
    e.preventDefault();
    setIsImageSubmitting(true);
    try {
      const res = await fetch(
        "https://mrirakib-ph-associate-instructor-task-server.vercel.app/update-photo",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session?.user.email,
            image: userImage,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      await update({
        ...session,
        user: { ...session?.user, image: userImage },
      });
      toast.success("Photo updated!", { position: "top-center" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsImageSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-10 flex flex-col md:flex-row justify-center items-start gap-10">
      {/* Left Profile Card */}
      <div className="flex flex-col h-full items-center gap-4 w-full max-w-md bg-[#1a120b] border border-[#3c2a21] py-10 px-6 rounded-2xl shadow-2xl text-center">
        <Avatar
          src={userImage || session?.user?.image}
          alt={userName}
          sx={{
            width: 160,
            height: 160,
            border: "4px solid #3c2a21",
            boxShadow: "0 0 20px rgba(212, 163, 115, 0.2)",
          }}
          className="bg-[#2d241e]"
        />
        <div className="mt-4">
          <Typography
            variant="h5"
            className="font-serif font-bold text-[#d4a373]"
          >
            {userName || session?.user?.name}
          </Typography>
          <Typography variant="body1" className="text-gray-400 mt-1">
            {session?.user?.email}
          </Typography>
        </div>

        <Divider className="bg-[#3c2a21] w-full mt-4" />

        <div className="flex gap-4 mt-4">
          <div className="text-center px-4">
            <p className="text-[#d4a373] font-bold">Role</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              {session?.user?.role || "Reader"}
            </p>
          </div>
        </div>
      </div>

      {/* Right Update Forms */}
      <div className="w-full h-full max-w-md flex flex-col gap-8">
        {/* Update Name Section */}
        <div className="bg-[#1a120b] border border-[#3c2a21] p-4 rounded-2xl shadow-xl">
          <Typography className="text-[#d4a373] font-bold! mb-4! uppercase tracking-tighter">
            Account Settings
          </Typography>
          <form onSubmit={updateName} className="flex flex-col gap-4">
            <TextField
              required
              fullWidth
              name="name"
              label="Display Name"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={inputStyles}
            />
            <Button
              type="submit"
              fullWidth
              disabled={isNameSubmitting}
              className="bg-[#d4a373]! hover:bg-[#faedcd]! text-[#1a120b]! font-bold! py-2.5! rounded-lg! transition-all"
            >
              {isNameSubmitting ? "Saving..." : "Update Name"}
            </Button>
          </form>
        </div>

        {/* Update Image Section */}
        <div className="bg-[#1a120b] border border-[#3c2a21] p-4 rounded-2xl shadow-xl">
          <Typography className="text-[#d4a373] font-bold! mb-4! uppercase tracking-tighter">
            Profile Picture
          </Typography>
          <form onSubmit={updateImage} className="flex flex-col gap-4">
            <TextField
              required
              fullWidth
              name="imageURL"
              label="Direct Image URL"
              variant="outlined"
              value={userImage}
              onChange={(e) => setUserImage(e.target.value)}
              sx={inputStyles}
            />
            <Button
              type="submit"
              fullWidth
              disabled={isImageSubmitting}
              className="bg-[#3c2a21]! hover:bg-[#4e362a]! text-[#e7dec8]! font-bold! py-2.5! rounded-lg! transition-all"
            >
              {isImageSubmitting ? "Uploading..." : "Update Photo"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
