import React, { useEffect, useState } from "react";
import {
  FiBell,
  FiClock,
  FiCheckCircle,
  FiEdit2,
  FiEye,
  FiEyeOff
} from "react-icons/fi";
import toast from "react-hot-toast";
import VolunteerSidebar from "../components/VolunteerSidebar";
import {
  getAnnouncementsAPI,
  getAllRequestAPI,
  editSaveProfileAPI
} from "../../services/allAPI";
import serverURL from "../../services/serverURL";

export default function VolHome() {
  const [username, setUsername] = useState("Volunteer");
  const [announcements, setAnnouncements] = useState([]);
  const [requests, setRequests] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
    profile: ""
  });

  const token = sessionStorage.getItem("token");

  const getVolunteerAnnouncements = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const res = await getAnnouncementsAPI(reqHeader);
      if (res.status === 200) setAnnouncements(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRequests = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const res = await getAllRequestAPI(reqHeader);
      if (res.status === 200) setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUsername(parsed.username || "Volunteer");
      setUser({
        username: parsed.username || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        address: parsed.address || "",
        profile: parsed.profile || "",
        oldPassword: "",
        password: "",
        confirmPassword: ""
      });
    }
    getVolunteerAnnouncements();
    getAllRequests();
  }, []);

  const acceptedRequests = requests.filter(
    (item) => item.status === "accepted"
  );

  const getProfileImage = () => {
    if (user.profile instanceof File)
      return URL.createObjectURL(user.profile);
    if (user.profile)
      return `${serverURL}/imageUploads/${user.profile}`;
    return "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  };

  const handleSave = async () => {
    if (!editMode) return setEditMode(true);

    if (!user.username || !user.email)
      return toast.error("Name and email required");

    if (user.password || user.confirmPassword || user.oldPassword) {
      if (!user.oldPassword)
        return toast.error("Enter current password");
      if (user.password !== user.confirmPassword)
        return toast.error("Passwords do not match");
    }

    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const formData = new FormData();

      ["username", "email", "phone", "address"].forEach((f) =>
        formData.append(f, user[f])
      );

      if (user.password) {
        formData.append("oldPassword", user.oldPassword);
        formData.append("password", user.password);
      }

      if (user.profile instanceof File)
        formData.append("profile", user.profile);

      const res = await editSaveProfileAPI(formData, reqHeader);
      if (res.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(res.data));
        toast.success("Profile updated");
        setEditMode(false);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#eef8f5] to-[#f7fffb]">
      <div className="w-72 fixed h-screen">
        <VolunteerSidebar />
      </div>

      <div className="ml-72 w-full px-12 py-10">

        {/* HERO */}
        <div className="bg-gradient-to-r from-[#0D3A33] to-[#127f67] p-10 rounded-3xl shadow-xl mb-14 text-white">
          <h1 className="text-4xl font-extrabold">
            Welcome back,
            <span className="text-[#b6f5e4]"> {username}</span>
          </h1>
          <p className="mt-4 text-lg text-[#e6fff8]">
            Your efforts are making a difference. Thank you for supporting WeCare.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <FiBell />, label: "Total Requests", value: requests.length },
            { icon: <FiClock />, label: "Accepted Requests", value: acceptedRequests.length },
            { icon: <FiCheckCircle />, label: "My Announcements", value: announcements.length }
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="text-[#127f67] text-4xl mb-3">{card.icon}</div>
              <h3 className="font-semibold text-[#0D3A33]">{card.label}</h3>
              <p className="text-4xl font-extrabold text-[#127f67] mt-2">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* PROFILE */}
        <div className="bg-gradient-to-r from-[#0D3A33] to-[#127f67] rounded-3xl shadow-xl p-8 text-white">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              Volunteer <span className="text-[#b6f5e4]">Profile</span>
            </h2>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg border border-[#b6f5e4]
                         text-[#b6f5e4] text-sm font-semibold
                         hover:bg-[#b6f5e4] hover:text-[#0D3A33] transition"
            >
              {editMode ? "Save" : <FiEdit2 />}
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#0D3A33] to-[#127f67] rounded-2xl p-8">

            {/* IMAGE */}
            <div className="flex items-center gap-6 mb-10">
              <img
                src={getProfileImage()}
                className="w-28 h-28 rounded-full border-4 border-[#127f67]"
              />

              {editMode && (
                <>
                  <input
                    type="file"
                    hidden
                    id="profileUpload"
                    onChange={(e) =>
                      setUser({ ...user, profile: e.target.files[0] })
                    }
                  />
                  <label
                    htmlFor="profileUpload"
                    className="px-4 py-2 bg-[#127f67] text-white text-sm
                               rounded-lg cursor-pointer hover:bg-[#0D3A33]"
                  >
                    Change Photo
                  </label>
                </>
              )}
            </div>

            {/* FORM */}
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              {["username", "email", "phone", "address"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 capitalize text-white font-medium">
                    {field}
                  </label>
                  <input
                    disabled={!editMode}
                    value={user[field]}
                    onChange={(e) =>
                      setUser({ ...user, [field]: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-lg border
                      focus:outline-none focus:ring-2 focus:ring-[#127f67]
                      ${
                        editMode
                          ? "border-[#127f67] bg-white text-[#0D3A33]"
                          : "bg-[#e9f7f2] cursor-not-allowed"
                      }`}
                  />
                </div>
              ))}
            </div>

            {/* PASSWORD */}
            {editMode && (
              <div className="mt-10 max-w-md">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Change Password
                </h3>

                {[
                  { key: "oldPassword", show: showOld, set: setShowOld, ph: "Current Password" },
                  { key: "password", show: showNew, set: setShowNew, ph: "New Password" },
                  { key: "confirmPassword", show: showConfirm, set: setShowConfirm, ph: "Confirm Password" }
                ].map((p, i) => (
                  <div key={i} className="relative mb-4">
                    <input
                      type={p.show ? "text" : "password"}
                      placeholder={p.ph}
                      value={user[p.key]}
                      onChange={(e) =>
                        setUser({ ...user, [p.key]: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg
                                 bg-white text-[#0D3A33]
                                 border border-[#127f67]
                                 placeholder:text-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-[#127f67]"
                    />
                    <span
                      onClick={() => p.set(!p.show)}
                      className="absolute right-4 top-3 cursor-pointer text-[#127f67]"
                    >
                      {p.show ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
