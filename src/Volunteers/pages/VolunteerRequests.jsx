import React, { useEffect, useState } from "react";
import { FiMapPin, FiClock, FiPhone, FiCheck, FiX, FiArchive } from "react-icons/fi";
import VolunteerSidebar from "../components/VolunteerSidebar";
import { acceptRequestsAPI, getAllRequestAPI } from "../../services/allAPI";
import toast from "react-hot-toast";
import serverURL from "../../services/serverURL";

export default function VolunteerRequests() {

  const [requests, setRequests] = useState([])

  const token = sessionStorage.getItem("token")

  const getAllRequests = async () => {
    try {
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      }
      const result = await getAllRequestAPI(reqHeader)
      console.log(result);
      setRequests(result.data)
    } catch (error) {
      console.log(error);

    }
  }

  const handleAcceptorReject = async (id, status) => {
    try {
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      }
      const result = await acceptRequestsAPI(id, status, reqHeader)
      console.log(result);
      getAllRequests()
      if (result.status == 200) {
        toast.success(`Request ${status} Successfully..`)
      } else {
        toast.error("Something went wrong ")
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getAllRequests()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#f7f9f8]">

      {/* SIDEBAR */}
      <div className="w-72 fixed h-screen">
        <VolunteerSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-72 w-full p-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-[#0D3A33]">
            Assigned <span className="text-[#127f67]">Requests</span>
          </h1>

        </div>

        {/* REQUEST LIST */}
        <div className="space-y-6">
          {requests?.length > 0 &&
            requests?.filter(req => req.status !== "rejected")
              .map((req, index) => (
                <div key={index}
                  className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold text-[#0D3A33] mb-2">
                    {req.emergency_type}
                  </h2>

                  <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-2">
                      <FiMapPin className="text-[#127f67]" /> {req.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiClock className="text-[#127f67]" /> {new Date(req.createdAt).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiPhone className="text-[#127f67]" /> {req.phone}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {req.abstract}
                  </p>

                  {req.proof && (
                    <a
                      href={`${serverURL}/imageUploads/${req.proof}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mb-4 text-sm text-[#127f67] font-semibold underline hover:text-[#0D3A33]"
                    >
                      View Proof Document
                    </a>
                  )}




                  <div className="flex gap-4">

                    {/* ACCEPTED */}
                    {req.status === "accepted" && (
                      <span className="px-5 py-2 bg-green-800 text-white rounded-lg flex items-center gap-2">
                        <FiCheck /> Accepted
                      </span>
                    )}

                    {/* REJECTED */}
                    {req.status === "rejected" && (
                      <span className="px-5 py-2 bg-red-800 text-white rounded-lg flex items-center gap-2">
                        <FiX /> Rejected
                      </span>
                    )}

                    {/* PENDING */}
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAcceptorReject(req._id, "accepted")}
                          className="px-5 py-2 bg-[#127f67] text-white rounded-lg flex items-center gap-2 hover:bg-[#0f6d59]"
                        >
                          <FiCheck /> Accept
                        </button>

                        <button
                          onClick={() => handleAcceptorReject(req._id, "rejected")}
                          className="px-5 py-2 border border-red-500 text-red-500 rounded-lg flex items-center gap-2 hover:bg-red-500 hover:text-white"
                        >
                          <FiX /> Reject
                        </button>
                      </>
                    )}

                  </div>

                </div>
              ))}
        </div>

      </div>
    </div>
  );
}
