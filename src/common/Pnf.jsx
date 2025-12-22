import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4faf8] px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-md w-full text-center">
        <h1 className="text-6xl font-extrabold text-[#127f67]">404</h1>
        <p className="text-gray-600 mt-4">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 rounded-xl bg-[#1dd3b0] text-black font-semibold"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
