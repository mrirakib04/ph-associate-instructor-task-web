"use client";
import { useState } from "react";
import { Typography, Box, InputBase, CircularProgress } from "@mui/material";
import {
  FaPaperPlane,
  FaEnvelopeOpenText,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

const KnowledgeNewsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    setLoading(true);

    // API Call
    setTimeout(() => {
      toast.success("Subscribed successfully! Welcome to the hub.", {
        style: {
          border: "1px solid #d4a373",
          padding: "16px",
          color: "#e7dec8",
          background: "#1a120b",
        },
        iconTheme: {
          primary: "#d4a373",
          secondary: "#1a120b",
        },
      });
      setEmail("");
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="w-full bg-[#0f0a07] py-24 px-4 border-t border-[#3c2a21]">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-[#1a120b] border border-[#3c2a21] rounded-[40px] p-4 sm:p-8 md:p-16 overflow-hidden shadow-2xl">
          {/* Background Decorative Icon */}
          <FaEnvelopeOpenText className="absolute -right-10 -bottom-10 text-[#d4a373] text-[200px] opacity-5 rotate-12 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Badge */}
            <div className="flex items-center gap-2 bg-[#d4a373]/10 border border-[#d4a373]/20 px-4 py-1.5 rounded-full mb-6">
              <FaPaperPlane className="text-[#d4a373] text-xs" />
              <Typography className="text-[#d4a373]! text-[10px]! uppercase! font-bold! tracking-[0.3em]!">
                Weekly Wisdom
              </Typography>
            </div>

            {/* Heading */}
            <Typography
              variant="h4"
              className="text-[#e7dec8]! md:text-4xl! sm:text-3xl! text-2xl! font-serif! font-bold! mb-4!"
            >
              Join Our <span className="text-[#d4a373]">Intellectual</span>{" "}
              Circle
            </Typography>

            <Typography className="text-gray-500! max-w-xl! mx-auto! mb-10! leading-relaxed!">
              Get curated book summaries, exclusive tutorial updates, and
              deep-dive literary insights delivered straight to your inbox. No
              spam, just pure knowledge.
            </Typography>

            {/* Subscription Form */}
            <form
              onSubmit={handleSubscribe}
              className="w-full max-w-md flex flex-col sm:flex-row items-center gap-4 bg-[#0f0a07] p-2 rounded-2xl border border-[#3c2a21] focus-within:border-[#d4a373] transition-all duration-300 shadow-inner"
            >
              <InputBase
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="text-[#e7dec8]! w-full! px-4! font-serif!"
                sx={{
                  input: { "&::placeholder": { color: "#4b3f35", opacity: 1 } },
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#d4a373] hover:bg-[#faedcd] text-[#1a120b] px-8 py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <>
                    SUBSCRIBE <FaCheckCircle className="text-sm" />
                  </>
                )}
              </button>
            </form>

            <Typography className="mt-6! text-gray-600! text-xs! tracking-wide!">
              * Join 15,000+ readers already on the list.
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeNewsletter;
