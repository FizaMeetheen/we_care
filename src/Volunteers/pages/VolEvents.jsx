import React from "react";
import { FiMapPin, FiClock, FiCalendar } from "react-icons/fi";
import VolunteerSidebar from "../components/VolunteerSidebar";

export default function VolEvents() {
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
            Assigned <span className="text-[#127f67]">Events</span>
          </h1>
        </div>

        {/* EVENT LIST */}
        <div className="space-y-6">

          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-[#0D3A33] mb-2">
                Blood Donation Camp
              </h2>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-2">
                  <FiMapPin className="text-[#127f67]" /> Kozhikode
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-[#127f67]" /> 20 Feb 2025
                </span>
                <span className="flex items-center gap-2">
                  <FiClock className="text-[#127f67]" /> 10:00 AM
                </span>
              </div>

              <p className="text-gray-600 mb-6">
                Volunteer assistance required for crowd management.
              </p>

              <span className="px-5 py-2 bg-green-700 text-white rounded-lg inline-flex items-center gap-2">
                Assigned
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
