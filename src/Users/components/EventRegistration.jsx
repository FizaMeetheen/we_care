import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { EventRegisterAPI, getAnnouncementByIdAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

export default function EventRegistration({ onClose, announcementId }) {
  const [announcement, setAnnouncement] = useState(null);

  const [eventDetails, setEventDetails] = useState({
    fullname: "",
    email: "",
    phone: "",
    notes: ""
  });

  useEffect(() => {
    if (!announcementId) return;

    const fetchAnnouncement = async () => {
      try {
        const result = await getAnnouncementByIdAPI(announcementId);
        if (result.status === 200) {
          setAnnouncement(result.data);
        }
      } catch {
        toast.error("Failed to load event");
      }
    };

    fetchAnnouncement();
  }, [announcementId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleEventRegister = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return toast.error("Please login first");

    const { fullname, email, phone } = eventDetails;
    if (!fullname || !email || !phone)
      return toast.error("Fill all required fields");

    try {
      const reqHeader = { Authorization: `Bearer ${token}` };

      const result = await EventRegisterAPI(
        announcementId,
        eventDetails,
        reqHeader
      );

      if (result.status === 200) {
        toast.success("Event registered successfully 💚");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-[#0b1f1a] rounded-xl p-8 text-white border">

        <button onClick={onClose} className="float-right text-2xl text-gray-400">
          <IoClose />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#1dd3b0] mb-4">
          Event Registration
        </h2>

        {announcement && (
          <div className="mb-6 p-4 rounded-xl bg-black/40 border">
            <h3 className="text-xl font-bold">{announcement.title}</h3>
            <p className="text-gray-400 mt-2">{announcement.abstract}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="fullname"
            placeholder="Full Name"
            value={eventDetails.fullname}
            onChange={handleChange}
            className="p-3 bg-black/40 rounded border"
          />
          <input
            name="email"
            placeholder="Email"
            value={eventDetails.email}
            onChange={handleChange}
            className="p-3 bg-black/40 rounded border"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={eventDetails.phone}
            onChange={handleChange}
            className="p-3 bg-black/40 rounded border md:col-span-2"
          />
        </div>

        <textarea
          rows="3"
          name="notes"
          placeholder="Message (optional)"
          value={eventDetails.notes}
          onChange={handleChange}
          className="w-full mt-4 p-3 bg-black/40 rounded border"
        />

        <button
          onClick={handleEventRegister}
          className="w-full mt-6 py-3 bg-[#1dd3b0] text-black font-bold rounded-xl"
        >
          Register
        </button>
      </div>
    </div>
  );
}
