import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff5f5] px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-md w-full text-center">

        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-[#7a1c1c] mb-3">
          Payment Cancelled ❌
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was not completed.  
          Don’t worry — no amount has been deducted.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl border border-red-400 text-red-600 font-semibold hover:bg-red-50"
          >
            Go to Home
          </button>
        </div>

      </div>
    </div>
  );
}
