import React, { useEffect, useState } from "react";
import { FaHeart, FaTicketAlt, FaTrash } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import { deleteAnnouncementsAPI, getAllAnnouncementsAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

export default function AdminAnnouncements() {

  const [announcements, setAnnouncements] = useState([]);
  const token = sessionStorage.getItem("token");

  const getAllAnnouncements = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    const result = await getAllAnnouncementsAPI(reqHeader);
    if (result.status === 200) {
      setAnnouncements(result.data);
    }
  };

  const deleteAnnouncements = async (id) => {
     const reqHeader = {
       'Authorization': `Bearer ${token}`
     }
     const result = await deleteAnnouncementsAPI(id,reqHeader)
     console.log(result);
     if(result.status == 200){
       toast.success("Announcement Deleted Successfully")
       getAllAnnouncements()
     }
     else{
       toast.error("Can't delete right now")
     }
   }



  useEffect(() => {
    getAllAnnouncements();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0b1f1a] text-white">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="ml-72 w-full">

        {/* HEADER */}
        <header className="px-10 py-6 bg-[#0d3a33] border-b border-[#1dd3b0]/30">
          <h1 className="text-3xl font-bold">
            Manage <span className="text-[#1dd3b0]">Announcements</span>
          </h1>
        </header>

        {/* CONTENT */}
        <div className="px-10 py-14 max-w-6xl">

          {/* DONATIONS */}
          <h2 className="text-2xl font-semibold text-[#c8f7ec] mb-8">
            Donation Announcements
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {announcements.filter(a => a.announcementType === "donation").length === 0 ? (
              <p className="text-gray-400">No donation announcements.</p>
            ) : (
              announcements
                .filter(a => a.announcementType === "donation")
                .map(item => (
                  <div
                    key={item._id}
                    className="bg-[#0d3a33] border border-[#1dd3b0]/30
                               rounded-3xl p-8 shadow-lg hover:shadow-xl transition"
                  >
                    <FaHeart className="text-[#1dd3b0] text-4xl mb-4" />

                    <h3 className="text-xl font-bold text-[#9ff2da] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-300 mb-4">
                      {item.abstract}
                    </p>

                    <p className="text-sm text-[#c8f7ec] mb-6">
                      {item.donationType === "Money"
                        ? `Amount: ₹${item.amount}`
                        : `Quantity: ${item.quantity}`}
                    </p>

                    <button type="button" onClick={()=>deleteAnnouncements(item._id)}
                      className="px-5 py-2 bg-red-600/80 text-white rounded-xl
                                 hover:bg-red-600 transition flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                ))
            )}
          </div>

          {/* EVENTS */}
          <h2 className="text-2xl font-semibold text-[#c8f7ec] mb-8">
            Event Announcements
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {announcements.filter(a => a.announcementType === "event").length === 0 ? (
              <p className="text-gray-400">No event announcements.</p>
            ) : (
              announcements
                .filter(a => a.announcementType === "event")
                .map(item => (
                  <div
                    key={item._id}
                    className="bg-[#0d3a33] border border-[#1dd3b0]/30
                               rounded-3xl p-8 shadow-lg hover:shadow-xl transition"
                  >
                    <FaTicketAlt className="text-[#1dd3b0] text-4xl mb-4" />

                    <h3 className="text-xl font-bold text-[#9ff2da] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-300 mb-4">
                      {item.abstract}
                    </p>

                    <p className="text-sm text-[#c8f7ec] mb-6">
                      📍 {item.eventPlace} • 🗓 {item.eventDate} • ⏰ {item.eventTime}
                    </p>

                    <button type="button" onClick={()=>deleteAnnouncements(item._id)}
                      className="px-5 py-2 bg-red-600/80 text-white rounded-xl
                                 hover:bg-red-600 transition flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
