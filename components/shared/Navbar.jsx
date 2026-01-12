"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import { Avatar, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";

const Navbar = () => {
  const { data: session } = useSession();
  const [nav, setNav] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const navLinks = [
    { name: "Browse Books", link: "/books" },
    { name: "My Library", link: "/user/my-library" },
    { name: "Tutorials", link: "/tutorials" },
  ];

  // Admin access links
  if (session?.user?.role === "admin") {
    navLinks.push({ name: "Admin Dashboard", link: "/admin" });
  }

  return (
    <nav className="bg-[#1a120b] border-b border-[#3c2a21] text-[#e7dec8] fixed top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <FaBookReader className="text-3xl text-[#d4a373] group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-serif font-bold tracking-tight bg-linear-to-r from-[#d4a373] to-[#faedcd] bg-clip-text text-transparent">
              BookWorm
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-sm font-medium hover:text-[#d4a373] transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}

            {session ? (
              <div className="flex items-center gap-4">
                <Tooltip title="Account settings">
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar
                      src={session?.user?.image}
                      alt="User"
                      sx={{
                        width: 35,
                        height: 35,
                        border: "2px solid #d4a373",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      bgcolor: "#2d241e",
                      color: "#e7dec8",
                      mt: 1.5,
                      border: "1px solid #3c2a21",
                      "& .MuiMenuItem-root:hover": { bgcolor: "#3c2a21" },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#d4a373] text-[#1a120b] px-5 py-2 rounded-full font-bold hover:bg-[#faedcd] transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setNav(!nav)} className="text-2xl">
              {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#1a120b] transform ${
          nav ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={() => setNav(false)}
            className="absolute top-6 right-6 text-3xl"
          >
            <AiOutlineClose />
          </button>
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => setNav(false)}
              className="text-2xl font-serif hover:text-[#d4a373]"
            >
              {item.name}
            </Link>
          ))}
          {!session ? (
            <Link
              href="/login"
              onClick={() => setNav(false)}
              className="text-2xl text-[#d4a373]"
            >
              Login
            </Link>
          ) : (
            <Link
              href="/profile"
              onClick={() => setNav(false)}
              className="text-2xl text-[#d4a373]"
            >
              Profile
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
