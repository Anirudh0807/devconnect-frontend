// CopyButton.tsx
"use client";
import React from "react";
import Image from "next/image"; // Import your Image component or use an HTML <img> tag directly
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CopyButtonProps {
  onClick: () => void;
}

const CopyButton = ({ id }) => {
  function copyText() {
    navigator.clipboard.writeText(
      `https://dev-connect-ai.vercel.app/thread/${id}`
    );
    toast.success(
      "Link copied to clipboard!"
    );
  }

  return (
    <>
      <button onClick={copyText} className="cursor-pointer">
        <Image
          src="/assets/share.svg"
          alt="share"
          width={24}
          height={24}
          className="object-contain"
        />
      </button>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default CopyButton;
