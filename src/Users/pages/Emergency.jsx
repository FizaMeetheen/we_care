import React, { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaHeartbeat, FaHandsHelping, FaBullhorn } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { emergencyRequestAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

export default function Emergency() {

  const [emergencyDetails, setEmergencydetails] = useState({
    fullname: "",
    phone: "",
    location: "",
    emergency_type: "",
    abstract: "",
    amount: "",
    proof: null
  });


  const handleSubmit = async () => {
    const { fullname, phone, location, emergency_type, abstract } = emergencyDetails
    console.log(fullname, phone, location, emergency_type, abstract);

    if (!fullname || !phone || !location || !emergency_type || !abstract) {
      toast("Fill all the required fields")
    }

    const reqBody = new FormData()

    for(let key in emergencyDetails){
      reqBody.append(key,emergencyDetails[key])
    }

    try {
      const result = await emergencyRequestAPI(reqBody)
      console.log(result);
      if (result.status == 200) {
        toast.success("Request has been sent successfully!!")
        setEmergencydetails({
          fullname: "",
          phone: "",
          location: "",
          emergency_type: "",
          abstract: "",
          amount: "",
          proof : null
        })
      }
      else {
        toast("Request Failed")
      }

    } catch (error) {
      console.log(error);

    }
  }

  const handleFileChange = (e) => {
    setEmergencydetails({ ...emergencyDetails, proof: e.target.files[0] })
  }

  return (
    <>
      <Header />

      {/* PAGE WRAPPER */}
      <div className="min-h-screen bg-[#f4faf8] px-6 py-20 relative overflow-hidden">

        {/* SOFT BACKGROUND GLOWS */}
        <div className="absolute top-[-180px] right-[-200px] w-[600px] h-[600px] bg-[#e6f7f0] rounded-full blur-[150px] opacity-80"></div>
        <div className="absolute bottom-[-180px] left-[-150px] w-[450px] h-[450px] bg-[#daf6ee] rounded-full blur-[120px] opacity-70"></div>

        {/* HEADING */}
        <div className="text-center mb-14 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D3A33]">
            Request <span className="text-[#127f67]">Emergency</span> Support
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Fill out the details below so our community volunteers can help you quickly.
          </p>
        </div>

        {/* FORM UI ONLY */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-[#daf6ee] relative z-10">

          {/* FULL NAME */}
          <label className="block mb-2 text-[#0D3A33] font-semibold">Full Name</label>
          <input value={emergencyDetails?.fullname} onChange={(e) => setEmergencydetails({ ...emergencyDetails, fullname: e.target.value })}
            type="text"
            className="w-full bg-[#f4faf8] border border-gray-300 rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-[#127f67]"
            placeholder="Enter your name"
          />

          {/* PHONE */}
          <label className="block mb-2 text-[#0D3A33] font-semibold">Contact Number</label>
          <div className="flex items-center gap-3 mb-6">
            <FaPhoneAlt className="text-[#127f67] text-xl" />
            <input value={emergencyDetails?.phone} onChange={(e) => setEmergencydetails({ ...emergencyDetails, phone: e.target.value })}
              type="text"
              className="w-full bg-[#f4faf8] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#127f67]"
              placeholder="Enter your phone number"
            />
          </div>

          {/* LOCATION */}
          <label className="block mb-2 text-[#0D3A33] font-semibold">Location</label>
          <div className="flex items-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-[#127f67] text-xl" />
            <input value={emergencyDetails?.location} onChange={(e) => setEmergencydetails({ ...emergencyDetails, location: e.target.value })}
              type="text"
              className="w-full bg-[#f4faf8] border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#127f67]"
            />
          </div>

          {/* TYPE OF EMERGENCY */}
          <label className="block mb-2 text-[#0D3A33] font-semibold">Emergency Type</label>
          <select value={emergencyDetails?.emergency_type} onChange={(e) => setEmergencydetails({ ...emergencyDetails, emergency_type: e.target.value })}
            className="w-full bg-[#f4faf8] border border-gray-300 rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-[#127f67]"
          >
            <option>Select an option</option>
            <option>Medical Emergency</option>
            <option>Rescue Needed</option>
            <option>Food / Water Help</option>
            <option>Shelter Required</option>
            <option>Other Support</option>
          </select>

          {/* DESCRIPTION */}
          <label className="block mb-2 text-[#0D3A33] font-semibold">Describe the Situation</label>
          <textarea value={emergencyDetails?.abstract} onChange={(e) => setEmergencydetails({ ...emergencyDetails, abstract: e.target.value })}
            className="w-full bg-[#f4faf8] border border-gray-300 rounded-xl px-4 py-3 h-32 outline-none focus:ring-2 focus:ring-[#127f67]"
            placeholder="Explain what kind of assistance is required..."
          ></textarea>

          {/* MONEY SUPPORT UI (DESIGN ONLY) */}
          {(emergencyDetails.emergency_type === "Medical Emergency" ||
            emergencyDetails.emergency_type === "Other Support") && (
              <div className="mt-6 p-6 bg-[#f4faf8] border border-[#daf6ee] rounded-2xl">

                <h3 className="text-xl font-bold text-[#0D3A33] mb-4">
                  Financial Assistance Details
                </h3>

                {/* AMOUNT REQUIRED */}
                <label className="block mb-2 text-[#0D3A33] font-semibold">
                  Amount Required (₹)
                </label>
                <input value={emergencyDetails?.amount} onChange={(e) => setEmergencydetails({ ...emergencyDetails, amount: e.target.value })}
                  type="number"
                  placeholder="Enter amount needed"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-[#127f67]"
                />

                {/* PROOF UPLOAD */}
                <label className="block mb-2 text-[#0D3A33] font-semibold">
                  Upload Proof (Medical Bill / Document)
                </label>

                <div className="flex items-center gap-4 bg-white border border-dashed border-gray-300 rounded-xl p-4">
                  <input onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    className="w-full text-gray-600"
                  />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Upload any supporting document such as prescriptions or reports
                </p>

              </div>
            )}


          {/* SUBMIT BUTTON UI ONLY */}
          <button type="button" onClick={handleSubmit}
            className="w-full mt-6 py-3 bg-[#127f67] text-white rounded-xl text-lg font-semibold 
            shadow-md hover:bg-[#0D3A33] transition"
          >
            Submit Request
          </button>
        </div>

        {/* HOW IT WORKS SECTION - UI ONLY */}
        <section className="max-w-6xl mx-auto mt-24 relative z-10">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0D3A33]">
            How <span className="text-[#127f67]">WeCare</span> Helps You
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            <div className="bg-white p-10 rounded-2xl shadow-lg border border-[#daf6ee] text-center hover:shadow-xl transition">
              <FaHeartbeat className="text-[#127f67] text-5xl mx-auto mb-4" />
              <h3 className="font-bold text-xl text-[#0D3A33]">Submit Emergency</h3>
              <p className="text-gray-600 mt-3">
                Share your emergency details in a simple form.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-lg border border-[#daf6ee] text-center hover:shadow-xl transition">
              <FaHandsHelping className="text-[#127f67] text-5xl mx-auto mb-4" />
              <h3 className="font-bold text-xl text-[#0D3A33]">Volunteers Notified</h3>
              <p className="text-gray-600 mt-3">
                Nearby volunteers receive alerts instantly.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-lg border border-[#daf6ee] text-center hover:shadow-xl transition">
              <FaBullhorn className="text-[#127f67] text-5xl mx-auto mb-4" />
              <h3 className="font-bold text-xl text-[#0D3A33]">Help Arrives Fast</h3>
              <p className="text-gray-600 mt-3">
                Support reaches you as quickly as possible.
              </p>
            </div>

          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
