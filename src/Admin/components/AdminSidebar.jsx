import React, { useState } from "react";
import {
  FiUsers,
  FiBell,
  FiBookOpen,
  FiLogOut,
  FiHome,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <FiHome />,
      path: "/adminHome",
    },
    {
      label: "Users",
      icon: <FiUsers />,
      path: "/adminHome/adminUsers",
    },
    {
      label: "Volunteers",
      icon: <FiUsers />,
      path: "/adminHome/adminVolunteers",
    },
    {
      label: "Stories",
      icon: <FiBookOpen />,
      path: "/adminHome/adminStories",
    },
    {
      label: "Blogs",
      icon: <FiBookOpen />,
      path: "/adminHome/adminBlogs",
    },
    {
      label: "Announcements",
      icon: <FiBell />,
      path: "/adminHome/adminAnnouncements",
    }
  ];

  return (
    <aside
      className={`h-screen fixed top-0 left-0 z-40
      ${collapsed ? "w-20" : "w-72"}
      bg-[#0b1f1a] text-gray-200
      border-r border-[#1dd3b0]/20
      transition-all duration-300`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-[#1dd3b0]/20">
        {!collapsed && (
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            Admin
            <span className="text-[#1dd3b0]">Panel</span>
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#1dd3b0] text-xl"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* MENU */}
      <nav className="mt-6 flex flex-col gap-2 px-3">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <div
              className={`flex items-center gap-4 px-4 py-3 rounded-xl
              hover:bg-[#1dd3b0]/10 hover:text-[#1dd3b0]
              transition cursor-pointer`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && (
                <span className="font-medium text-sm tracking-wide">
                  {item.label}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="absolute bottom-6 w-full px-3">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 px-4 py-3 w-full
          rounded-xl text-red-400 hover:bg-red-500/10
          transition`}
        >
          <FiLogOut className="text-xl" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
