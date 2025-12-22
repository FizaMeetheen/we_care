import React from "react";
import { FiMapPin, FiPackage, FiDollarSign } from "react-icons/fi";
import VolunteerSidebar from "../components/VolunteerSidebar";

export default function VolDonations() {
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
            Assigned <span className="text-[#127f67]">Donations</span>
          </h1>
        </div>

        {/* DONATION LIST */}
        <div className="space-y-6">

          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-[#0D3A33] mb-2">
                Food Donation
              </h2>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-2">
                  <FiPackage className="text-[#127f67]" /> 5 Packs
                </span>
                <span className="flex items-center gap-2">
                  <FiMapPin className="text-[#127f67]" /> Kochi
                </span>
              </div>

              <p className="text-gray-600 mb-6">
                Packed food items to be collected from donor.
              </p>

              <span className="px-5 py-2 bg-yellow-600 text-white rounded-lg inline-flex items-center gap-2">
                Pending
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
