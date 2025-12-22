import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaHandHoldingHeart, FaCalendarCheck } from "react-icons/fa";
import {
  getAllDonationsAPI,
  getAllEventsAPI
} from "../../services/allAPI";

export default function History() {
  const [activeTab, setActiveTab] = useState("donations");
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]);

  // ---------------- DONATIONS ----------------
  const getAllDonations = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await getAllDonationsAPI(reqHeader);
      setDonations(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- EVENTS ----------------
  const getAllEvents = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await getAllEventsAPI(reqHeader);
      setEvents(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDonations();
    getAllEvents();
  }, []);

  return (
    <>
      <Header />

      <section className="min-h-screen px-6 py-24 bg-gradient-to-b from-[#eaf7f2] via-[#f4faf8] to-white">
        <div className="max-w-6xl mx-auto">

          {/* TITLE */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-[#0D3A33]">
              My <span className="text-[#127f67]">History</span>
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              View your donation and event participation history
            </p>
          </div>

          {/* TABS */}
          <div className="flex justify-center gap-4 mb-16">
            <TabButton
              label="Donations"
              icon={<FaHandHoldingHeart />}
              active={activeTab === "donations"}
              onClick={() => setActiveTab("donations")}
            />
            <TabButton
              label="Events"
              icon={<FaCalendarCheck />}
              active={activeTab === "events"}
              onClick={() => setActiveTab("events")}
            />
          </div>

          {/* CONTENT */}
          <div className="relative min-h-[300px]">

            {/* DONATIONS */}
            <Slide active={activeTab === "donations"}>
              <div className="grid md:grid-cols-2 gap-6">
                {donations.length > 0 ? (
                  donations.map(donation => (
                    <div
                      key={donation._id}
                      className="bg-white p-6 rounded-2xl shadow-md border border-[#d9f7ee]"
                    >
                      <h3 className="text-xl font-bold text-[#127f67] mb-1">
                        {donation.title}
                      </h3>

                      <p className="text-gray-600 mb-3">
                        {donation.abstract}
                      </p>

                      <p><b>Type:</b> {donation.donationType}</p>

                      {donation.donationType === "Money" ? (
                        <p><b>Amount:</b> ₹{donation.amount}</p>
                      ) : (
                        <p><b>Quantity:</b> {donation.quantity}</p>
                      )}

                      <p className="text-sm text-gray-500 mt-2">
                        Donated on{" "}
                        {donation.createdAt
                          ? new Date(donation.createdAt).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                  ))
                ) : (
                  <Empty text="No donations found" />
                )}
              </div>
            </Slide>

            {/* EVENTS */}
            <Slide active={activeTab === "events"}>
              <div className="grid md:grid-cols-2 gap-6">
                {events.length > 0 ? (
                  events.map(event => (
                    <div
                      key={event._id}
                      className="bg-white p-6 rounded-2xl shadow-md border border-[#d9f7ee]"
                    >
                      <h3 className="text-xl font-bold text-[#127f67] mb-2">
                        {event.title}
                      </h3>

                      <p className="text-gray-700">
                        <b>Event Date:</b>{" "}
                        {event.eventDate
                          ? new Date(event.eventDate).toLocaleDateString()
                          : "—"}
                      </p>

                      <p className="text-gray-700 mt-1">
                        <b>Registered By:</b> {event.fullname}
                      </p>
                    </div>
                  ))
                ) : (
                  <Empty text="No registered events found" />
                )}
              </div>
            </Slide>


          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ---------- REUSABLE ---------- */

function TabButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition
        ${active
          ? "bg-[#127f67] text-white shadow-lg scale-105"
          : "bg-white text-[#127f67] border border-[#127f67]/30 hover:bg-[#127f67]/10"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Slide({ active, children }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-500
        ${active ? "opacity-100 relative" : "opacity-0 pointer-events-none"}`}
    >
      {children}
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="col-span-full text-center text-gray-500 text-lg">
      {text}
    </div>
  );
}
