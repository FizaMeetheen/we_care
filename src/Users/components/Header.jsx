import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import serverURL from "../../services/serverURL";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isAnnouncements = location.pathname === "/announcements";

  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));

  let profilePic =
    "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";

  if (existingUser?.picture) {
    profilePic = existingUser.picture;
  } else if (existingUser?.profile) {
    profilePic = `${serverURL}/imageUploads/${existingUser.profile}`;
  }


  const handleLogout = () => {
  sessionStorage.clear();
  navigate("/login");
};


  return (
    <header
      className={`w-full py-4 px-8 transition-all duration-300
        ${isAnnouncements
          ? "bg-black border-b border-[#1dd3b0]/30"
          : "bg-white shadow-sm"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LEFT: MENU + LOGO */}
        <div className="flex items-center gap-4">
          <TiThMenu
            className={`text-3xl md:hidden cursor-pointer
              ${isAnnouncements ? "text-[#1dd3b0]" : "text-[#127f67]"}
            `}
            onClick={() => setMenuOpen(!menuOpen)}
          />

          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10015/10015580.png"
              alt="WeCare Logo"
              className="w-10 h-10"
            />
            <h1
              className={`font-bold text-2xl hidden md:block
                ${isAnnouncements ? "text-white" : "text-[#0d3a33]"}
              `}
            >
              We
              <span
                className={`${isAnnouncements ? "text-[#1dd3b0]" : "text-[#127f67]"
                  }`}
              >
                Care
              </span>
            </h1>
          </div>
        </div>

        {/* NAV LINKS (DESKTOP) */}
        <nav
          className={`hidden md:flex gap-10 font-medium
            ${isAnnouncements ? "text-gray-300" : "text-gray-700"}
          `}
        >
          <Link className="hover:text-[#1dd3b0]" to="/">Home</Link>
          <Link className="hover:text-[#1dd3b0]" to="/blogs">Blogs</Link>
          <Link className="hover:text-[#1dd3b0]" to="/stories">Stories</Link>
          <Link className="hover:text-[#1dd3b0]" to="/emergency">Emergency</Link>
          <Link className="hover:text-[#1dd3b0]" to="/announcements">
            Announcements
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:block relative">
          {existingUser ? (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span
                className={`font-semibold
                  ${isAnnouncements ? "text-[#1dd3b0]" : "text-[#127f67]"}
                `}
              >
                {existingUser?.username}
              </span>

              <img
                src={profilePic}
                referrerPolicy="no-referrer"
                alt=""
                onError={(e) => {
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/1144/1144760.png";
                }}
                className={`w-12 h-12 rounded-full border p-[2px]
    ${isAnnouncements ? "border-[#1dd3b0]" : "border-[#127f67]"}
  `}
              />

            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`px-5 py-2 rounded-xl transition
                ${isAnnouncements
                  ? "bg-[#1dd3b0] text-black hover:bg-[#14b8a6]"
                  : "border border-[#127f67] text-[#127f67] hover:bg-[#127f67] hover:text-white"
                }
              `}
            >
              Login
            </button>
          )}

          {/* PROFILE DROPDOWN */}
          {profileOpen && existingUser && (
            <div
              className={`absolute right-0 mt-3 rounded-xl w-44 p-2 z-10
      ${isAnnouncements
                  ? "bg-[#0b1f1a] border border-[#1dd3b0]/30 text-white"
                  : "bg-white border shadow-lg"
                }
    `}
            >
              <Link
                className="block p-2 rounded hover:bg-black/20"
                to="/profile"
              >
                My Profile
              </Link>

              {/* ✅ NEW HISTORY LINK */}
              <Link
                className="block p-2 rounded hover:bg-black/20"
                to="/history"
              >
                History
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 w-full p-2 rounded hover:bg-red-500/10"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className={`md:hidden mt-4 rounded-xl p-4 space-y-3
            ${isAnnouncements
              ? "bg-[#0b1f1a] border border-[#1dd3b0]/30 text-gray-300"
              : "bg-white shadow"
            }
          `}
        >
          <Link className="block p-2 hover:text-[#1dd3b0]" to="/">Home</Link>
          <Link className="block p-2 hover:text-[#1dd3b0]" to="/blogs">Blogs</Link>
          <Link className="block p-2 hover:text-[#1dd3b0]" to="/stories">Stories</Link>
          <Link className="block p-2 hover:text-[#1dd3b0]" to="/emergency">Emergency</Link>
          <Link className="block p-2 hover:text-[#1dd3b0]" to="/announcements">
            Announcements
          </Link>
        </div>
      )}
    </header>
  );
}
