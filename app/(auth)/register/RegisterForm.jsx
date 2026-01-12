"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Button, Divider, TextField } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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
    "& .MuiFormLabel-root.Mui-required .MuiFormLabel-asterisk": {
      color: "#d4a373",
    },
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, imageURL } = e.target;
    const nameVal = name.value;
    const emailVal = email.value;
    const passwordVal = password.value;
    const imageVal = imageURL?.value?.trim();

    if (!validatePassword(passwordVal)) {
      toast.info(
        "Password must be at least 6 characters, include a number, uppercase, lowercase & special char.",
        { position: "top-right", autoClose: 3000 }
      );
      return;
    }

    try {
      const res = await fetch(
        "https://mrirakib-ph-associate-instructor-task-server.vercel.app/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            password: passwordVal,
            image: imageVal,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success("Registration successful! Logging in...", {
        position: "top-right",
        autoClose: 2000,
      });

      await signIn("credentials", {
        email: emailVal,
        password: passwordVal,
        callbackUrl: "/",
      });
    } catch (err) {
      toast.error(`Registration Error: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleGoogleMethod = async () => {
    await signIn("google", { callbackUrl: "/callback" });
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-10 flex flex-col items-center">
      <div className="w-full lg:w-3/5 md:w-8/12 bg-[#1a120b] border border-[#3c2a21] p-4 sm:p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col gap-1 items-center mb-6">
          <h3 className="md:text-4xl text-2xl font-serif font-bold text-[#d4a373]">
            Create Account
          </h3>
          <p className="text-base font-medium text-gray-400">
            Join our community of book lovers today.
          </p>
        </div>

        <Divider className="bg-[#3c2a21]" />

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              name="name"
              label="Full Name"
              variant="outlined"
              required
              fullWidth
              sx={inputStyles}
            />
            <TextField
              name="email"
              label="Email Address"
              variant="outlined"
              type="email"
              required
              fullWidth
              sx={inputStyles}
            />
          </div>

          <TextField
            name="imageURL"
            label="Profile Image URL"
            variant="outlined"
            fullWidth
            placeholder="e.g. https://cloudinary.com/my-photo"
            sx={inputStyles}
          />

          <div className="relative">
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              required
              fullWidth
              sx={inputStyles}
            />
            <div
              className="absolute top-4 right-3 text-[#d4a373] text-2xl cursor-pointer z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full md:w-1/2 mx-auto! mt-4 bg-[#d4a373]! hover:bg-[#faedcd]! text-[#1a120b]! font-bold! py-3! rounded-lg! transition-all duration-300"
          >
            Register
          </Button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px bg-[#3c2a21] flex-1"></div>
          <span className="text-gray-500 text-sm">Continue with</span>
          <div className="h-px bg-[#3c2a21] flex-1"></div>
        </div>

        <button
          onClick={handleGoogleMethod}
          className="w-full md:w-1/2 mx-auto border border-[#3c2a21] bg-transparent text-[#e7dec8] rounded-lg py-3 flex items-center justify-center gap-3 transition hover:bg-[#2d241e] cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-semibold text-lg">Google</span>
        </button>

        <div className="mt-8 text-center text-gray-400 flex items-center gap-1 flex-wrap">
          <span>Already have an account? </span>
          <Link
            href="/login"
            className="text-[#d4a373] hover:text-[#faedcd] font-bold underline transition"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
