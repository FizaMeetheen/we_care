import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { userAuthContext } from "./context/AuthContext";

import Home from "./Users/pages/Home";
import Auth from "./common/Auth";
import Blogs from "./Users/pages/Blogs";
import Emergency from "./Users/pages/Emergency";
import Announcements from "./Users/pages/Announcements";
import Stories from "./Users/pages/Stories";
import Profile from "./Users/pages/Profile";
import History from "./Users/pages/History";
import PaymentSuccess from "./Users/pages/PaymentSuccess";
import PaymentCancel from "./Users/pages/PaymentCancel";

import AdminHome from "./Admin/pages/AdminHome";
import AdminUsers from "./Admin/pages/AdminUsers";
import AdminVolunteers from "./Admin/pages/AdminVolunteers";
import AdminAnnouncements from "./Admin/pages/AdminAnnouncements";
import AdminStories from "./Admin/pages/AdminStories";
import AdminBlogs from "./Admin/pages/AdminBlogs";

import VolHome from "./Volunteers/pages/VolHome";
import VolunteerRequests from "./Volunteers/pages/VolunteerRequests";
import VolAnnouncements from "./Volunteers/pages/VolAnnouncements";
import VolunteerCommunity from "./Volunteers/pages/VolunteerCommunity";

import PageNotFound from "./common/Pnf";

function App() {
  const { role } = useContext(userAuthContext);


  return (
    <Routes>
      {/* ---------- PUBLIC ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth register />} />

      {/* ---------- USER ---------- */}
      {role == "user" && (
        <>
          <Route path="/stories" element={<Stories />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
        </>
      )}

      {/* ---------- ADMIN ---------- */}
      {role == "admin" && (
        <>
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminHome/adminUsers" element={<AdminUsers />} />
          <Route path="/adminHome/adminVolunteers" element={<AdminVolunteers />} />
          <Route path="/adminHome/adminAnnouncements" element={<AdminAnnouncements />} />
          <Route path="/adminHome/adminStories" element={<AdminStories />} />
          <Route path="/adminHome/adminBlogs" element={<AdminBlogs />} />
        </>
      )}

      {/* ---------- VOLUNTEER ---------- */}
      {role == "volunteer" && (
        <>
          <Route path="/volunteerHome" element={<VolHome />} />
          <Route path="/volunteerHome/requests" element={<VolunteerRequests />} />
          <Route path="/volunteerHome/announcements" element={<VolAnnouncements />} />
          <Route path="/volunteerHome/community" element={<VolunteerCommunity />} />
        </>
      )}

      {/* ---------- 404 ---------- */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
