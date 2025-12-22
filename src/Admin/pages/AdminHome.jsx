import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiBell,
  FiActivity,
  FiBookOpen,
  FiEdit2,
  FiEye,
  FiEyeOff
} from "react-icons/fi";
import toast from "react-hot-toast";
import AdminSidebar from "../components/AdminSidebar";
import {
  editSaveProfileAPI,
  getAllAnnouncementsAPI,
  getAllStoryAPI,
  getUsersAPI,
  getVolunteersAPI
} from "../../services/allAPI";
import serverURL from "../../services/serverURL";

export default function AdminHome() {

  /* ---------- STATES ---------- */
  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [announcements,setAnnouncements] = useState([])
  const [stories,setStories] = useState([])

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

  /* ---------- LOAD ADMIN + COUNTS ---------- */
  useEffect(() => {
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
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
    loadCounts();
  }, []);

  const loadCounts = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };

      const usersRes = await getUsersAPI(reqHeader);
      if (usersRes.status === 200) setUsers(usersRes.data);

      const volRes = await getVolunteersAPI(reqHeader);
      if (volRes.status === 200) setVolunteers(volRes.data);

      const AnnouncementRes = await getAllAnnouncementsAPI(reqHeader)
      if (AnnouncementRes.status === 200) setAnnouncements(AnnouncementRes.data);

      const StoryRes = await getAllStoryAPI(reqHeader)
      if (StoryRes.status === 200) setStories(StoryRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  /* ---------- PROFILE IMAGE ---------- */
  const getProfileImage = () => {
    if (user.profile instanceof File) return URL.createObjectURL(user.profile);
    if (user.profile) return `${serverURL}/imageUploads/${user.profile}`;
    return "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";
  };

  /* ---------- SAVE PROFILE ---------- */
  const handleSave = async () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    // if (!user.username || !user.email)
    //   return toast.error("Name and email required");

    if (user.password || user.confirmPassword || user.oldPassword) {
      if (!user.oldPassword) return toast.error("Enter current password");
      if (user.password !== user.confirmPassword)
        return toast.error("Passwords do not match");
    }

    try {
      const reqHeader = { 
        'Authorization': `Bearer ${token}` 
      };
      const formData = new FormData();

      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("address", user.address);

      if (user.password) {
        formData.append("oldPassword", user.oldPassword);
        formData.append("password", user.password);
      }

      if (user.profile instanceof File)
        formData.append("profile", user.profile);

      const result = await editSaveProfileAPI(formData, reqHeader);

      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data));
        toast.success("Profile updated");
        setEditMode(false);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b1f1a] text-white">

      <AdminSidebar />

      <div className="ml-72 w-full px-10 py-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-10">
          Admin <span className="text-[#1dd3b0]">Dashboard</span>
        </h1>

        {/* -------- DASHBOARD COUNTS -------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

          {[
            { label: "Total Users", icon: <FiUsers />, value: users.length },
            { label: "Volunteers", icon: <FiActivity />, value: volunteers.length },
            { label: "Announcements", icon: <FiBell />, value: announcements.length },
            { label: "Stories Shared", icon: <FiBookOpen />, value: stories.length },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#0d3a33] p-6 rounded-2xl border border-[#1dd3b0]/30"
            >
              <div className="flex justify-between items-center">
                <span className="text-[#c8f7ec]">{item.label}</span>
                <span className="text-[#1dd3b0] text-xl">{item.icon}</span>
              </div>
              <p className="text-3xl font-bold text-[#1dd3b0] mt-4">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* -------- PROFILE FORM -------- */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="bg-[#0d3a33] rounded-3xl border border-[#1dd3b0]/30 p-10 max-w-4xl"
        >

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold">
              Admin <span className="text-[#1dd3b0]">Profile</span>
            </h2>

            <button
              type="submit"
              className="px-6 py-2 border border-[#1dd3b0]
                         text-[#1dd3b0] rounded-xl
                         hover:bg-[#1dd3b0] hover:text-black transition"
            >
              {editMode ? "Save Changes" : <FiEdit2 />}
            </button>
          </div>

          {/* IMAGE */}
          <div className="flex items-center gap-8 mb-12">
            <img
              src={getProfileImage()}
              className="w-28 h-28 rounded-full border-4 border-[#1dd3b0]"
            />
            {editMode && (
              <>
                <input
                  type="file"
                  hidden
                  id="adminProfile"
                  onChange={(e) =>
                    setUser({ ...user, profile: e.target.files[0] })
                  }
                />
                <label
                  htmlFor="adminProfile"
                  className="px-5 py-2 bg-[#1dd3b0] text-black rounded-xl cursor-pointer"
                >
                  Change Photo
                </label>
              </>
            )}
          </div>

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-8">
            {["username", "email", "phone", "address"].map((field) => (
              <div key={field}>
                <label className="block text-gray-300 mb-1 capitalize">
                  {field}
                </label>
                <input
                  disabled={!editMode}
                  value={user[field]}
                  onChange={(e) =>
                    setUser({ ...user, [field]: e.target.value })
                  }
                  className={`w-full p-3 rounded-xl bg-[#0b1f1a]
                    border ${editMode ? "border-[#1dd3b0]" : "border-[#1dd3b0]/20"}`}
                />
              </div>
            ))}
          </div>

          {/* PASSWORD */}
          {editMode && (
            <div className="mt-12 max-w-xl">
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>

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
                    className="w-full p-3 rounded-xl bg-[#0b1f1a] border border-[#1dd3b0]"
                  />
                  <span
                    onClick={() => p.set(!p.show)}
                    className="absolute right-4 top-4 cursor-pointer text-gray-400"
                  >
                    {p.show ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              ))}
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
