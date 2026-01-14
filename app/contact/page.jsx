"use client";
import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  return (
    <Box className="min-h-screen! bg-[#0f0a07]! py-12! sm:py-24! px-4!">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-20">
          <Typography className="text-[#d4a373]! font-bold! tracking-[0.2em] sm:tracking-[0.3em]! uppercase! text-[10px]! sm:text-xs! mb-4!">
            Get In Touch
          </Typography>
          <Typography className="text-[#e7dec8]! font-serif! font-bold! mb-6! text-3xl! sm:text-5xl!">
            Connect With Our <span className="text-[#d4a373]">Curators</span>
          </Typography>
          <Typography className="text-gray-500! max-w-2xl! mx-auto! text-base! sm:text-lg! leading-relaxed!">
            Whether you have a question about our collection, need technical
            support, or want to contribute to our hub, our team is here to
            assist you.
          </Typography>
        </div>

        {/* Contact Information & Social Section */}
        <Grid container spacing={4} justifyContent="center">
          {/* Info Cards Column */}
          <Grid item xs={12} lg={6}>
            <div className="flex items-center justify-center flex-wrap  gap-6">
              {/* Email Card */}
              <a
                href="mailto:admin@bookworm.com"
                className="block group bg-[#1a120b] border border-[#3c2a21] p-6 sm:p-8 rounded-3xl hover:border-[#d4a373] transition-all duration-500"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                  <div className="bg-[#d4a373]/10 p-4 rounded-2xl group-hover:bg-[#d4a373] transition-colors duration-500">
                    <FaEnvelope className="text-[#d4a373] group-hover:text-[#1a120b] text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <Typography className="text-gray-500! uppercase! text-[10px]! font-black! tracking-widest! mb-1!">
                      Send an Email
                    </Typography>
                    <Typography className="text-[#e7dec8]! font-bold! text-lg sm:text-xl!">
                      admin@bookworm.com
                    </Typography>
                    <Typography className="text-gray-600! text-sm! mt-2!">
                      Our curators usually respond within 24 hours.
                    </Typography>
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="bg-[#1a120b] border border-[#3c2a21] p-6 sm:p-8 rounded-3xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                  <div className="bg-[#3c2a21] p-4 rounded-2xl">
                    <FaMapMarkerAlt className="text-[#d4a373] text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <Typography className="text-gray-500! uppercase! text-[10px]! font-black! tracking-widest! mb-1!">
                      Visit Sanctuary
                    </Typography>
                    <Typography className="text-[#e7dec8]! font-bold! text-lg sm:text-xl!">
                      Knowledge Hub Street, Dhaka
                    </Typography>
                    <Typography className="text-gray-600! text-sm! mt-2!">
                      Open for visitors: Mon - Fri, 9am - 6pm.
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-[#1a120b] border border-[#3c2a21] p-6 sm:p-8 rounded-3xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                  <div className="bg-[#3c2a21] p-4 rounded-2xl">
                    <FaPhoneAlt className="text-[#d4a373] text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <Typography className="text-gray-500! uppercase! text-[10px]! font-black! tracking-widest! mb-1!">
                      Call Support
                    </Typography>
                    <Typography className="text-[#e7dec8]! font-bold! text-lg sm:text-xl!">
                      +880 1234 567 890
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          {/* Social & Aesthetic Section */}
          <Grid item xs={12} lg={6}>
            <div className="h-full bg-[#1a120b] border border-[#3c2a21] rounded-[40px] p-8 sm:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-2xl">
              {/* Abstract Background Circle */}
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-[#d4a373] opacity-5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

              <Typography className="text-[#e7dec8]! font-serif! font-bold! mb-6! text-2xl! sm:text-4xl!">
                Follow Our <span className="text-[#d4a373]">Journey</span>
              </Typography>
              <Typography className="text-gray-500! mb-8 sm:mb-10! leading-relaxed! text-sm sm:text-base!">
                Stay updated with our latest releases, community events, and
                literary discussions on our social platforms.
              </Typography>

              <div className="flex gap-4 sm:gap-6">
                {[
                  {
                    icon: <FaLinkedin />,
                    link: "https://www.linkedin.com/in/webdev-rakib/",
                  },
                  {
                    icon: <FaGithub />,
                    link: "https://github.com/mrirakib04/",
                  },
                  { icon: <FaTwitter />, link: "https://x.com/mrirakib04" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#3c2a21] flex items-center justify-center text-[#d4a373] text-lg sm:text-2xl hover:bg-[#d4a373] hover:text-[#1a120b] transition-all duration-300 shadow-xl"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#3c2a21] w-full">
                <Typography className="text-[#d4a373]! font-serif! italic! text-sm sm:text-base!">
                  "Knowledge is the only treasure that increases when shared."
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Contact;
