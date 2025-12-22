import React, { useEffect, useState } from "react";
import { FaHeart, FaTicketAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Donation from "../components/Donation";
import EventRegistration from "../components/EventRegistration";
import { useNavigate } from "react-router-dom";
import { getAllAnnouncementsAPI, getAllDonationsAPI, getAllEventsAPI } from "../../services/allAPI";

export default function Announcements() {
  const navigate = useNavigate();

  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);
  const [donatedIds, setDonatedIds] = useState([]);
  const [registeredIds, setRegisteredIds] = useState([]);


  const isLoggedIn = () => sessionStorage.getItem("token");

  const handleDonateClick = () => {
    if (!isLoggedIn()) setShowLoginModal(true);
    else setShowDonationModal(true);
  };

  const handleEventRegisterClick = () => {
    if (!isLoggedIn()) setShowLoginModal(true);
    else setShowEventModal(true);
  };

  const token = sessionStorage.getItem("token");

  const getAllAnnouncements = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await getAllAnnouncementsAPI(reqHeader);
    console.log(result.data);
    if (result.status === 200) {
      setAnnouncements(result.data);
    }
  };

  const getUserActivity = async () => {


    const reqHeader = { Authorization: `Bearer ${token}` };

    const donationRes = await getAllDonationsAPI(reqHeader);
    const eventRes = await getAllEventsAPI(reqHeader);

    setDonatedIds(donationRes.data.map(d => d.announcementId));
    setRegisteredIds(eventRes.data.map(e => e.announcementId));
  };


  useEffect(() => {
    if (!token) return;
    getAllAnnouncements();
    getUserActivity()
  }, []);

  return (
    <>
      <Header />

      {/* MAIN */}
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0b1f1a] to-black px-6 py-24">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Community{" "}
            <span className="text-[#1dd3b0]">Announcements</span>
          </h1>
          <p className="text-gray-400 mt-4">
            Events, donation drives, and community initiatives.
          </p>
        </div>

        {/* DONATION ANNOUNCEMENTS */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-[#1dd3b0] mb-8">
            Donation Announcements
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {announcements.filter(a => a.announcementType === "donation").length === 0 ? (
              <p className="text-gray-400">No donation announcements.</p>
            ) : (
              announcements
                .filter(
                  a =>
                    a.announcementType === "donation" &&
                    !donatedIds.includes(String(a._id))

                ).map(item => (
                  <div
                    key={item._id}
                    className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl
                    border border-[#1dd3b0]/30 hover:shadow-lg transition"
                  >
                    <FaHeart className="text-[#1dd3b0] text-5xl mb-4" />

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 mb-4">
                      {item.abstract}
                    </p>

                    <p className="text-gray-500 mb-4 text-sm">
                      {item.donationType === "Money"
                        ? `Amount Required: ₹${item.amount}`
                        : `Quantity Required: ${item.quantity}`}
                    </p>



                    <button
                      onClick={() => {
                        setSelectedAnnouncementId(item._id);
                        handleDonateClick();
                      }}
                      className="px-6 py-2 rounded-xl font-semibold
  bg-[#1dd3b0] text-black hover:bg-[#14b8a6]"
                    >
                      Donate
                    </button>

                  </div>
                ))
            )}
          </div>
        </div>

        {/* EVENT ANNOUNCEMENTS */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-[#1dd3b0] mb-8">
            Event Announcements
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {announcements
              .filter(
                a =>
                  a.announcementType === "event" &&
                  !registeredIds.includes(a._id)
              )
              .length === 0 ? (
              <p className="text-gray-400">No event announcements.</p>
            ) : (
              announcements
                .filter(
                  a =>
                    a.announcementType === "event" &&
                    !registeredIds.includes(String(a._id))
                )

                .map(item => (

                  <div
                    key={item._id}
                    className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl
                    border border-[#1dd3b0]/30 hover:shadow-lg transition"
                  >
                    <FaTicketAlt className="text-[#1dd3b0] text-5xl mb-4" />

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 mb-4">
                      {item.abstract}
                    </p>

                    <p className="text-gray-500 mb-4 text-sm">
                      📍 {item.eventPlace} • 🗓 {item.eventDate} • ⏰ {item.eventTime}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedAnnouncementId(item._id);
                        handleEventRegisterClick();
                      }}

                      className="px-6 py-2 rounded-xl font-semibold
                      bg-[#1dd3b0] text-black hover:bg-[#14b8a6]"
                    >
                      Register
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0b1f1a] border border-[#1dd3b0]/30 w-full max-w-md rounded-2xl p-6 relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              <IoClose />
            </button>

            <h2 className="text-2xl font-bold text-center text-[#1dd3b0] mb-3">
              Please Login
            </h2>

            <p className="text-center text-gray-400 mb-6">
              Login required to continue.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-5 py-2 border border-gray-600 text-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-[#1dd3b0] text-black rounded-xl"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {showDonationModal && (
        <Donation
          announcementId={selectedAnnouncementId}
          onClose={() => {
            setShowDonationModal(false);
            getUserActivity()
            getAllAnnouncements();
          }}
        />
      )}

      {showEventModal && (
        <EventRegistration
          announcementId={selectedAnnouncementId}
          onClose={() => {
            setShowEventModal(false);
            getUserActivity()
            getAllAnnouncements();
          }}
        />
      )}

      <Footer />
    </>
  );
}
