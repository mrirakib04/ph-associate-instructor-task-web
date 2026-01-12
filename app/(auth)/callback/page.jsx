"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CallbackUser = () => {
  const router = useRouter();

  useEffect(() => {
    toast.success("Login Successful!", { autoClose: 2000 });
    router.push("/");
  }, []);

  return (
    <p className="text-center py-20 font-medium text-lg">Redirecting...</p>
  );
};

export default CallbackUser;
