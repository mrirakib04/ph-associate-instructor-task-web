"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button, Divider, TextField } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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

  // Submit Login Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;

    const email = target.email.value;
    const password = target.password.value;

    await performLogin(email, password);
  };

  // Common Login Function
  const performLogin = async (email, password) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      router.push("/");
    } else {
      toast.error(`Login Error: ${res?.error || "Invalid Credentials"}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Quick Login Handler
  const handleQuickLogin = (role) => {
    const credentials = {
      admin: { email: "admin@mailinator.com", pass: "ABC@123abc" },
      user: { email: "user@mailinator.com", pass: "ABC@123abc" },
    };
    const { email, pass } = credentials[role];
    performLogin(email, pass);
  };

  // Google Login
  const handleGoogleMethod = async () => {
    await signIn("google", { callbackUrl: "/callback" });
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-10 flex flex-col items-center">
      <div className="w-full lg:w-2/6 md:w-5/12 sm:w-7/12 bg-[#1a120b] border border-[#3c2a21] p-4 sm:p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col gap-1 items-center mb-6">
          <h3 className="md:text-4xl text-2xl font-serif font-bold text-[#d4a373]">
            Login
          </h3>
          <p className="text-base font-medium text-gray-400">
            Welcome back to your library
          </p>
        </div>

        <Divider className="bg-[#3c2a21] mb-8!" />

        <div className="flex flex-col gap-4">
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col justify-center gap-4 w-full"
          >
            <TextField
              name="email"
              className="w-full"
              type="email"
              label="Email"
              variant="outlined"
              required
              sx={inputStyles}
            />

            <div className="w-full relative">
              <TextField
                name="password"
                className="w-full"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                required
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
              className="w-full mt-2 bg-[#d4a373]! hover:bg-[#faedcd]! text-[#1a120b]! font-bold py-3 rounded-lg transition-all duration-300 shadow-lg"
            >
              Login
            </Button>
          </form>

          {/* Quick Login Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-px bg-[#3c2a21] flex-1"></div>
              <span className="text-gray-500 text-xs uppercase tracking-widest">
                Quick Access
              </span>
              <div className="h-px bg-[#3c2a21] flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="bg-[#3c2a21] cursor-pointer hover:bg-[#d4a373] text-[#e7dec8] hover:text-[#1a120b] py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border border-[#d4a373]/20"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("user")}
                className="bg-[#3c2a21] cursor-pointer hover:bg-[#d4a373] text-[#e7dec8] hover:text-[#1a120b] py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border border-[#d4a373]/20"
              >
                User Demo
              </button>
            </div>
          </div>

          <div className="mt-4 text-center font-medium text-gray-400 flex items-center gap-1 flex-wrap justify-center">
            <span>New User? </span>
            <Link
              className="text-[#d4a373] hover:text-[#faedcd] font-bold underline duration-300"
              href={"/register"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
