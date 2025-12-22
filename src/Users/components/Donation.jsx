import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import {
  MakeDonationAPI,
  getAnnouncementByIdAPI,
} from "../../services/allAPI";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51ScgS0IMPKPd4SixYTprNcdpRorAsMfNTlcazDu34IYvcTMx7PYFpyRjqTUvQiy0SLJe9QpOfSk4IekCcb6o3kIW00OMf32QO7"
);

export default function Donation({ onClose, announcementId }) {
  const [announcement, setAnnouncement] = useState(null);

  const [donationDetails, setDonationDetails] = useState({
    donationType: "",
    amount: "",
    quantity: "",
    pickup_location: "",
    notes: "",
  });

  /* ---------------- LOAD ANNOUNCEMENT ---------------- */
  useEffect(() => {
    if (!announcementId) return;

    const fetchAnnouncement = async () => {
      try {
        const result = await getAnnouncementByIdAPI(announcementId);
        if (result.status === 200) {
          setAnnouncement(result.data);
        }
      } catch {
        toast.error("Failed to load announcement");
      }
    };

    fetchAnnouncement();
  }, [announcementId]);

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- MAIN SUBMIT ---------------- */
const handleProceed = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) return toast.error("Please login first");

  /* ---------- MONEY DONATION ---------- */
  if (donationDetails.donationType === "Money") {
    if (!donationDetails.amount || donationDetails.amount <= 0) {
      return toast.error("Enter valid amount");
    }

    try {
  const response = await fetch(
    "https://wecare-backend-2.onrender.com/create-checkout-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: Number(donationDetails.amount),
        title: announcement.title,
        announcementId,
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error("Stripe error:", errText);
    return toast.error("Unable to start payment");
  }

  const data = await response.json();

  if (data.checkoutSessionUrl) {
    window.location.href = data.checkoutSessionUrl;
  } else {
    toast.error("Stripe session not created");
  }
} catch (error) {
  console.error(error);
  toast.error("Payment failed");
}


    return;
  }

  /* ---------- NON-MONEY DONATION ---------- */
  if (!donationDetails.quantity || !donationDetails.pickup_location) {
    return toast.error("Quantity and pickup location required");
  }

  try {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      donationType: donationDetails.donationType,
      quantity: donationDetails.quantity,
      pickup_location: donationDetails.pickup_location,
      notes: donationDetails.notes,
    };

    const result = await MakeDonationAPI(
      announcementId,
      body,
      reqHeader
    );

    if (result.status === 200) {
      toast.success("Donation submitted successfully");
      onClose();
    } else {
      toast.error("Failed to submit donation");
    }
  } catch {
    toast.error("Donation failed");
  }
};


  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-[#0b1f1a] border border-[#1dd3b0]/30 rounded-2xl p-8 text-white">

        <button onClick={onClose} className="float-right text-2xl text-gray-400">
          <IoClose />
        </button>

        <h2 className="text-3xl font-bold text-center text-[#1dd3b0] mb-4">
          Make a Donation
        </h2>

        {announcement && (
          <div className="mb-6 p-4 rounded-xl bg-black/40 border border-[#1dd3b0]/30">
            <h3 className="text-xl font-bold">{announcement.title}</h3>
            <p className="text-gray-400 mt-2">{announcement.abstract}</p>
          </div>
        )}

        {/* DONATION TYPE */}
        <label className="font-semibold">Donation Type</label>
        <select
          name="donationType"
          value={donationDetails.donationType}
          onChange={handleChange}
          className="w-full p-3 mt-2 mb-4 bg-black/40 rounded-xl border"
        >
          <option value="">Select</option>
          <option>Money</option>
          <option>Food</option>
          <option>Clothes</option>
          <option>Medicines</option>
          <option>Essential Kits</option>
        </select>

        {/* AMOUNT / QUANTITY */}
        <label className="font-semibold">
          {donationDetails.donationType === "Money"
            ? "Amount (₹)"
            : "Quantity"}
        </label>
        <input
          type="text"
          name={
            donationDetails.donationType === "Money" ? "amount" : "quantity"
          }
          value={
            donationDetails.donationType === "Money"
              ? donationDetails.amount
              : donationDetails.quantity
          }
          onChange={handleChange}
          className="w-full p-3 mt-2 mb-4 bg-black/40 rounded-xl border"
        />

        {/* PICKUP */}
        {donationDetails.donationType &&
          donationDetails.donationType !== "Money" && (
            <>
              <label className="font-semibold">Pickup Location</label>
              <input
                type="text"
                name="pickup_location"
                value={donationDetails.pickup_location}
                onChange={handleChange}
                className="w-full p-3 mt-2 mb-4 bg-black/40 rounded-xl border"
              />
            </>
          )}

        {/* NOTES */}
        <label className="font-semibold">Notes</label>
        <textarea
          rows="3"
          name="notes"
          value={donationDetails.notes}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-black/40 rounded-xl border"
        />

        <button
          onClick={handleProceed}
          className="w-full mt-6 py-3 bg-[#1dd3b0] text-black font-bold rounded-xl"
        >
          {donationDetails.donationType === "Money"
            ? "Proceed to Payment"
            : "Submit Donation"}
        </button>
      </div>
    </div>
  );
}
