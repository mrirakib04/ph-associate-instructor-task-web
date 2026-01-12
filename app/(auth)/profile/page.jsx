"use client";

import { useState } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, update } = useSession();

  const [userName, setUserName] = useState(session?.user?.name || "");
  const [userImage, setUserImage] = useState(session?.user?.image || "");
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);
  const [isImageSubmitting, setIsImageSubmitting] = useState(false);

  // Update Name
  const updateName = async (e) => {
    e.preventDefault();
    setIsNameSubmitting(true);

    try {
      const res = await fetch(
        "https://mrirakib-ejp-nextjs-task-server.vercel.app/update-name",
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

      // Update NextAuth session instantly
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

  // Update Image
  const updateImage = async (e) => {
    e.preventDefault();
    setIsImageSubmitting(true);

    try {
      const res = await fetch(
        "https://mrirakib-ejp-nextjs-task-server.vercel.app/update-photo",
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

      // Update NextAuth session
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
    <div className="w-full flex md:flex-row justify-center flex-col items-center gap-5 mt-10 px-5 py-10">
      {/* Left Profile Card */}
      <div className="flex flex-col items-center gap-3 w-full max-w-md bg-linear-to-b from-purple-900 to-white py-10 rounded-xl shadow-lg text-center">
        <Avatar
          src={userImage || session?.user.image}
          alt={userName}
          sx={{ width: 160, height: 160 }}
          className="bg-gray-300"
        />
        <Typography variant="h5" className="font-bold mt-3">
          {userName || session?.user.name}
        </Typography>
        <Typography variant="body1" className="text-gray-600 font-semibold">
          {session?.user?.email}
        </Typography>
      </div>

      {/* Right Update Forms */}
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Update Name */}
        <form onSubmit={updateName} className="flex flex-col gap-2">
          <TextField
            required
            name="name"
            label="New Name"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            className="font-medium"
            disabled={isNameSubmitting}
          >
            {isNameSubmitting ? "Updating..." : "Update Name"}
          </Button>
        </form>

        {/* Update Image */}
        <form onSubmit={updateImage} className="flex flex-col gap-2">
          <TextField
            required
            name="imageURL"
            label="New Photo URL"
            variant="outlined"
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            className="font-medium"
            disabled={isImageSubmitting}
          >
            {isImageSubmitting ? "Updating..." : "Update Photo"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
