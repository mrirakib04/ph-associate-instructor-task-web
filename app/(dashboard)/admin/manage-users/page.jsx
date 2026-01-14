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
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { FaUserShield, FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ManageUsers = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const serverUrl =
    "https://mrirakib-ph-associate-instructor-task-server.vercel.app";

  useEffect(() => {
    if (status === "authenticated") {
      fetchAllUsers();
    }
  }, [status]);

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(`${serverUrl}/users`);
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (id, currentRole) => {
    const newRole = currentRole === "Admin" ? "Reader" : "Admin";

    // Prevent admin from demoting themselves accidentally
    if (session?.user?.email === users.find((u) => u._id === id)?.email) {
      return toast.warning("You cannot change your own role!");
    }

    try {
      const res = await fetch(`${serverUrl}/users/role/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        toast.success(`Role updated to ${newRole}!`);
        fetchAllUsers();
      } else {
        toast.error("Action failed");
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <CircularProgress sx={{ color: "#d4a373" }} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full">
      <div className="mb-8">
        <Typography
          variant="h4"
          className="font-serif font-bold text-[#d4a373]! mb-1!"
        >
          Manage Users
        </Typography>
        <Typography variant="body2" className="text-gray-500!">
          Promote or demote users to manage application access.
        </Typography>
      </div>

      <TableContainer
        component={Paper}
        className="bg-[#1a120b]! border border-[#3c2a21]! text-nowrap rounded-2xl overflow-hidden shadow-2xl!"
      >
        <Table>
          <TableHead className="bg-[#2d241e]!">
            <TableRow>
              <TableCell className="text-[#d4a373]! font-bold!">User</TableCell>
              <TableCell className="text-[#d4a373]! font-bold!">
                Email
              </TableCell>
              <TableCell className="text-[#d4a373]! font-bold!">
                Current Role
              </TableCell>
              <TableCell className="text-[#d4a373]! font-bold! text-right!">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                className="hover:bg-[#2d241e]! transition-colors"
              >
                <TableCell className="text-[#e7dec8]! border-b-[#3c2a21]!">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.image}
                      alt={user.name}
                      sx={{ border: "1px solid #3c2a21" }}
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[#e7dec8]! border-b-[#3c2a21]!">
                  {user.email}
                </TableCell>
                <TableCell className="text-[#e7dec8]! border-b-[#3c2a21]!">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === "Admin"
                        ? "bg-[#d4a373] text-[#1a120b]"
                        : "bg-[#3c2a21] text-[#d4a373]"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-right! border-b-[#3c2a21]!">
                  <Button
                    startIcon={
                      user.role === "Admin" ? <FaUserEdit /> : <FaUserShield />
                    }
                    onClick={() => handleRoleUpdate(user._id, user.role)}
                    className={`${
                      user.role === "Admin"
                        ? "text-blue-400! hover:bg-blue-400/10!"
                        : "text-green-400! hover:bg-green-400/10!"
                    } font-bold! capitalize!`}
                  >
                    Make {user.role === "Admin" ? "Reader" : "Admin"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {users.length === 0 && (
          <div className="text-center py-10 text-gray-500!">
            No users found in the database.
          </div>
        )}
      </TableContainer>
    </div>
  );
};

export default ManageUsers;
