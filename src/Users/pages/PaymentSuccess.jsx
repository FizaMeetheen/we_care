import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4faf8] px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-md w-full text-center">

        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-[#0D3A33] mb-3">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your contribution.  
          Your payment has been processed successfully.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl bg-[#1dd3b0] text-black font-semibold hover:bg-[#17b89f]"
          >
            Go to Home
          </button>

        </div>

      </div>
    </div>
  );
}
