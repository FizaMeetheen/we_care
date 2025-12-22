import React, { useEffect, useState } from "react";
import {
  FiHome,
  FiBell,
  FiUsers,
  FiLogOut
} from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import serverURL from "../../services/serverURL";

export default function VolunteerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    username: "Volunteer",
    profile: "",
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        username: parsedUser.username || "Volunteer",
        profile: parsedUser.profile || "",
      });
    }
  }, []);

  const getProfileImage = () => {
    if (user.profile) {
      return `${serverURL}/imageUploads/${user.profile}`;
    }
    return "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-[#1dd3b0]/20 border border-[#1dd3b0]/40"
      : "hover:bg-[#1dd3b0]/10";

  return (
    <div className="h-screen w-72 bg-[#0b1f1a]
                    border-r border-[#1dd3b0]/30
                    flex flex-col justify-between
                    px-6 py-8 shadow-xl">

      {/* TOP */}
      <div>
        {/* PROFILE DISPLAY */}
        <div className="flex flex-col items-center mb-12">
          <img
            src={getProfileImage()}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover
                       border-4 border-[#1dd3b0]"
          />
          <h2 className="mt-3 text-xl font-bold text-white">
            {user.username}
          </h2>
          <span className="text-sm text-[#9ff2da]">Volunteer</span>
        </div>

        {/* MENU */}
        <nav className="space-y-2">

          <Link to="/volunteerHome">
            <div className={`flex items-center gap-4 p-3 rounded-xl transition
                            ${isActive("/volunteerHome")}`}>
              <FiHome className="text-[#9ff2da] text-xl" />
              <span className="text-white font-medium">Dashboard</span>
            </div>
          </Link>

          <Link to="/volunteerHome/requests">
            <div className={`flex items-center gap-4 p-3 rounded-xl transition
                            ${isActive("/volunteerHome/requests")}`}>
              <FiBell className="text-[#9ff2da] text-xl" />
              <span className="text-white font-medium">Requests</span>
            </div>
          </Link>

          <Link to="/volunteerHome/announcements">
            <div className={`flex items-center gap-4 p-3 rounded-xl transition
                            ${isActive("/volunteerHome/announcements")}`}>
              <FiBell className="text-[#9ff2da] text-xl" />
              <span className="text-white font-medium">Announcements</span>
            </div>
          </Link>


           <Link to="/volunteerHome/community">
            <div className={`flex items-center gap-4 p-3 rounded-xl transition
                            ${isActive("/volunteerHome/community")}`}>
              <FiUsers className="text-[#9ff2da] text-xl" />
              <span className="text-white font-medium">Community</span>
            </div>
          </Link>

        </nav>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-3 p-3
                   bg-[#1dd3b0] text-black font-semibold rounded-xl
                   hover:bg-[#14b8a6] transition"
      >
        <FiLogOut /> Logout
      </button>
    </div>
  );
}
