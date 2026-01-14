"use client";
import React from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { FaChevronDown, FaQuestionCircle, FaHeadset } from "react-icons/fa";

const faqs = [
  {
    question: "How can I add a book to my personal library?",
    answer:
      "To add a book, simply browse the collection, click on the book details, and select the 'Add to Library' button. You can then categorize it as 'Read', 'Currently Reading', or 'Plan to Read'.",
  },
  {
    question: "Are the tutorials free to watch?",
    answer:
      "Yes! All tutorials in our Visual Learning Hub are free for registered readers. We believe in making wisdom accessible to everyone.",
  },
  {
    question: "How do I write a review for a book?",
    answer:
      "Once you have read a book, go to the book's detail page and scroll down to the review section. You can give a star rating and share your thoughts. Reviews are moderated before being published.",
  },
  {
    question: "Can I become an author or contributor?",
    answer:
      "We are always looking for passionate intellectuals! You can apply for an 'Admin/Author' role through your profile settings or contact our support team for more details.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Currently, we are a web-based platform optimized for all mobile devices. A native mobile app is in our future roadmap for 2026!",
  },
];

const SupportFAQ = () => {
  return (
    <section className="w-full bg-[#0f0a07] py-24 px-4 border-t border-[#3c2a21]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1a120b] border border-[#d4a373]/30 px-4 py-1.5 rounded-full mb-4">
            <FaHeadset className="text-[#d4a373] text-xs" />
            <Typography className="text-[#d4a373]! text-[10px]! uppercase! font-bold! tracking-widest!">
              Support Center
            </Typography>
          </div>
          <Typography
            variant="h4"
            className="text-[#e7dec8]! font-serif! font-bold! mb-4!"
          >
            Frequently Asked <span className="text-[#d4a373]">Questions</span>
          </Typography>
          <Typography className="text-gray-500! max-w-lg! mx-auto!">
            Everything you need to know about the platform. Can't find an
            answer? Contact our 24/7 support team.
          </Typography>
        </div>

        {/* FAQ Accordions */}
        <Box className="space-y-4!">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              className="bg-[#1a120b]! border! border-[#3c2a21]! rounded-2xl! before:hidden! overflow-hidden!"
              sx={{
                "&.Mui-expanded": {
                  border: "1px solid #d4a37366 !important",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5) !important",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<FaChevronDown className="text-[#d4a373]" />}
                className="px-6! py-2!"
              >
                <div className="flex items-center gap-4">
                  <FaQuestionCircle className="text-[#d4a373] opacity-50" />
                  <Typography className="text-[#e7dec8]! font-bold! font-serif!">
                    {faq.question}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className="px-16! pb-6! pt-0!">
                <Typography className="text-gray-400! leading-relaxed! border-l-2! border-[#d4a373]/30! pl-4!">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Footer Contact */}
        <div className="mt-16 text-center p-8 border border-dashed border-[#3c2a21] rounded-3xl bg-[#1a120b]/30">
          <Typography className="text-gray-400! mb-4!">
            Still have questions? We're here to help you.
          </Typography>
          <button className="bg-[#d4a373] hover:bg-[#faedcd] text-[#1a120b] px-8 py-3 rounded-xl font-bold transition-all cursor-pointer shadow-lg active:scale-95">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportFAQ;
