import React, { useEffect, useState } from "react";
import VolunteerSidebar from "../components/VolunteerSidebar";
import { FiEdit2, FiBell } from "react-icons/fi";
import toast from "react-hot-toast";
import { getAnnouncementsAPI, postAnnouncementAPI } from "../../services/allAPI";
import EditAnnouncement from "../components/editAnnouncement";


export default function VolAnnouncements() {

  const [announcementType, setAnnouncementType] = useState("");
  const [donationDetails, setDonationDetails] = useState({
    title: "",
    donationType: "",
    amount: "",
    quantity: "",
    abstract: ""
  })

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventPlace: "",
    eventAbstract: ""
  })
  const [announcements, setAnnouncements] = useState([])
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);


  const handleEdit = (item) => {
    setEditData(item);
    setShowEditModal(true);
  };

   const getVolunteerAnnouncements = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      'Authorization': `Bearer ${token}`
    }
    const result = await getAnnouncementsAPI(reqHeader)
    if (result.status == 200) {
      console.log(result.data);
      setAnnouncements(result.data.reverse())
    }

  }



  const handleAnnouncement = async () => {
    if (!announcementType) {
      return toast.error("Select announcement type");
    }

    let payload = {};

    if (announcementType === "donation") {
      const { title, donationType, amount, quantity, abstract } = donationDetails;

      if (!title || !donationType || !abstract) {
        return toast.error("Fill all required donation fields");
      }

      if (donationType === "Money" && !amount) {
        return toast.error("Enter donation amount");
      }

      if (donationType !== "Money" && !quantity) {
        return toast.error("Enter donation quantity");
      }

      payload = {
        announcementType: "donation",
        title,
        abstract,
        donationType,
        amount: donationType === "Money" ? amount : null,
        quantity: donationType !== "Money" ? quantity : null
      };
    }

    if (announcementType === "event") {
      const { eventName, eventDate, eventTime, eventPlace, eventAbstract } = eventDetails;

      if (!eventName || !eventDate || !eventTime || !eventPlace || !eventAbstract) {
        return toast.error("Fill all required event fields");
      }

      payload = {
        announcementType: "event",
        title: eventName,
        abstract: eventAbstract,
        eventDate,
        eventTime,
        eventPlace
      };
    }


    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const result = await postAnnouncementAPI(payload, reqHeader);
      console.log(result);
      getVolunteerAnnouncements()

      if (result.status === 200) {
        toast.success("Announcement posted successfully");

        // reset
        setAnnouncementType("");
        setDonationDetails({
          title: "",
          donationType: "",
          amount: "",
          quantity: "",
          abstract: ""
        });
        setEventDetails({
          eventName: "",
          eventDate: "",
          eventTime: "",
          eventPlace: "",
          eventAbstract: ""
        });
      }
    } catch (error) {
      toast.error("Server error");
      console.log(error);
    }
  };

 

  useEffect(() => {
    getVolunteerAnnouncements()
  }, [])




  return (
    <div className="flex min-h-screen bg-[#f4faf8]">

      {/* SIDEBAR */}
      <div className="w-72 fixed h-screen">
        <VolunteerSidebar />
      </div>

      {/* MAIN */}
      <div className="ml-72 w-full p-10">

        <h1 className="text-3xl font-extrabold text-[#0D3A33] mb-10">
          Post <span className="text-[#127f67]">Announcements</span>
        </h1>

        {/* FORM */}
        <div className="bg-white p-8 rounded-3xl shadow-md border border-[#d9f5ec] mb-14">
          <h2 className="text-2xl font-bold text-[#0D3A33] flex items-center gap-2 mb-8">
            <FiEdit2 className="text-[#127f67]" />
            Create Announcement
          </h2>

          {/* ANNOUNCEMENT TYPE */}
          <label className="text-gray-700 font-medium">Announcement Type</label>
          <div className="grid grid-cols-2 gap-6 mt-2 mb-8">
            <button
              onClick={() => setAnnouncementType("donation")}
              className={`p-4 border rounded-xl font-semibold
                ${announcementType === "donation"
                  ? "border-[#127f67] bg-[#e7f6f2]"
                  : "bg-[#f9fffd]"}`}
            >
              Donation
            </button>

            <button
              onClick={() => setAnnouncementType("event")}
              className={`p-4 border rounded-xl font-semibold
                ${announcementType === "event"
                  ? "border-[#127f67] bg-[#e7f6f2]"
                  : "bg-[#f9fffd]"}`}
            >
              Event
            </button>
          </div>

          {/* ================= DONATION SECTION ================= */}
          {announcementType === "donation" && (
            <div className="border border-[#d9f5ec] rounded-2xl p-6 mb-8">

              <h3 className="text-xl font-bold text-[#127f67] mb-6">
                Donation Details
              </h3>

              {/* DONATION NAME */}
              <label className="text-gray-700 font-medium">Donation Name</label>
              <input value={donationDetails?.title} onChange={(e) => setDonationDetails({ ...donationDetails, title: e.target.value })}
                className="w-full mt-2 mb-6 p-3 border rounded-xl bg-[#f9fffd]"
              />

              {/* DONATION TYPE */}
              <label className="text-gray-700 font-medium">Donation Type</label>
              <select
                value={donationDetails?.donationType}
                onChange={(e) => setDonationDetails({ ...donationDetails, donationType: e.target.value })}
                className="w-full mt-2 mb-6 p-3 border rounded-xl bg-[#f9fffd]"
              >
                <option value="">Select donation type</option>
                <option value="Money">Money</option>
                <option value="Food">Food</option>
                <option value="Medicines">Medicines</option>
                <option value="Clothes">Clothes</option>
                <option value="Essential Kits">Essential Kits</option>
              </select>

              {/* MONEY */}
              {donationDetails.donationType === "Money" && (
                <>
                  <label className="text-gray-700 font-medium">Amount Required (₹)</label>
                  <input value={donationDetails?.amount}
                    onChange={(e) => setDonationDetails({ ...donationDetails, amount: e.target.value })}
                    className="w-full mt-2 mb-6 p-3 border rounded-xl bg-[#f9fffd]"
                  />
                </>
              )}

              {/* NON-MONEY */}
              {donationDetails.donationType && donationDetails.donationType !== "Money" && (
                <>
                  <label className="text-gray-700 font-medium">Quantity Required</label>
                  <input value={donationDetails?.quantity}
                    onChange={(e) => setDonationDetails({ ...donationDetails, quantity: e.target.value })}
                    className="w-full mt-2 mb-6 p-3 border rounded-xl bg-[#f9fffd]"
                  />

                </>
              )}

              {/* PURPOSE */}
              <label className="text-gray-700 font-medium">Donation Needed For</label>
              <textarea value={donationDetails?.abstract}
                onChange={(e) => setDonationDetails({ ...donationDetails, abstract: e.target.value })}
                className="w-full mt-2 p-3 border rounded-xl bg-[#f9fffd] h-24 resize-none"
                placeholder="Explain why this donation is required"
              />
            </div>
          )}

          {/* ================= EVENT SECTION ================= */}
          {announcementType === "event" && (
            <div className="border border-[#d9f5ec] rounded-2xl p-6 mb-8">

              <h3 className="text-xl font-bold text-[#127f67] mb-6">
                Event Details
              </h3>

              <label className="text-gray-700 font-medium">Event Name</label>
              <input value={eventDetails?.eventName} onChange={(e) => setEventDetails({ ...eventDetails, eventName: e.target.value })}
                className="w-full mt-2 mb-6 p-3 border rounded-xl bg-[#f9fffd]"
              />

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-gray-700 font-medium">Date</label>
                  <input type="date" value={eventDetails?.eventDate} onChange={(e) => setEventDetails({ ...eventDetails, eventDate: e.target.value })}
                    className="w-full mt-2 p-3 border rounded-xl bg-[#f9fffd]" />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Time</label>
                  <input type="time" value={eventDetails?.eventTime} onChange={(e) => setEventDetails({ ...eventDetails, eventTime: e.target.value })}
                    className="w-full mt-2 p-3 border rounded-xl bg-[#f9fffd]" />
                </div>
              </div>

              <label className="text-gray-700 font-medium">Place</label>
              <input value={eventDetails?.eventPlace} onChange={(e) => setEventDetails({ ...eventDetails, eventPlace: e.target.value })}
                className="w-full mt-2 mb-6 p-3 border rounded-xl bg-[#f9fffd]"
              />

              <label className="text-gray-700 font-medium">Event Details</label>
              <textarea value={eventDetails?.eventAbstract} onChange={(e) => setEventDetails({ ...eventDetails, eventAbstract: e.target.value })}
                className="w-full mt-2 p-3 border rounded-xl bg-[#f9fffd] h-24 resize-none"
                placeholder="Explain event purpose and volunteer needs"
              />
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="button" onClick={handleAnnouncement}
            className="px-8 py-3 bg-[#127f67] text-white rounded-xl font-semibold
                       hover:bg-[#0D3A33] transition"
          >
            Post Announcement
          </button>
        </div>

        <h2 className="text-2xl font-bold text-[#0D3A33] mb-6 flex items-center gap-2">
          <FiBell className="text-[#127f67]" />
          Your Previous Announcements
        </h2>

        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements posted yet.</p>
        ) : (
          announcements.map(item => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-2xl mb-4 border border-[#d9f5ec]
                 hover:shadow-lg transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-[#0D3A33]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#127f67] font-medium capitalize">
                    {item.announcementType}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(item)}
                    className="px-4 py-1 text-sm rounded-lg border
                       border-[#127f67] text-[#127f67]
                       hover:bg-[#127f67] hover:text-white transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-4 py-1 text-sm rounded-lg border
                       border-red-400 text-red-500
                       hover:bg-red-500 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              


              {/* CONTENT */}
              <p className="text-gray-600 mt-3">
                {item.abstract}
              </p>

              {/* EXTRA INFO */}
              {item.announcementType === "donation" && (
                <p className="mt-2 text-sm text-gray-500">
                  {item.donationType === "Money"
                    ? `Amount: ₹${item.amount}`
                    : `Quantity: ${item.quantity}`}
                </p>
              )}

              {item.announcementType === "event" && (
                <p className="mt-2 text-sm text-gray-500">
                  📍 {item.eventPlace} • 🗓 {item.eventDate} • ⏰ {item.eventTime}
                </p>
              )}
            </div>
          ))
        )}

      </div>
      {showEditModal && (
                <EditAnnouncement
                  editData={editData}
                  setEditData={setEditData}
                  onClose={() => setShowEditModal(false)}
                  onUpdate={getVolunteerAnnouncements}
                />
              )}
    </div>
    
  );
}
