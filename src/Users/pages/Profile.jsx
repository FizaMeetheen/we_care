import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiEye, FiEyeOff } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { editSaveProfileAPI } from "../../services/allAPI";
import serverURL from "../../services/serverURL";

export default function Profile() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
    profile: "",
  });

  /* LOAD USER */
  useEffect(() => {
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        profile: user.profile || "",
      }));
    }
  }, []);

  /* SAVE PROFILE */
  const handleEditOrSave = async () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    const {
      username,
      email,
      phone,
      address,
      oldPassword,
      password,
      confirmPassword,
      profile,
    } = userDetails;

    if (!username || !email) {
      return toast.error("Name and email are required");
    }

    if ((password || confirmPassword) && !oldPassword) {
      return toast.error("Enter your current password");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };

      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("phone", phone);
      reqBody.append("address", address);

      if (password) {
        reqBody.append("oldPassword", oldPassword);
        reqBody.append("password", password);
      }

      if (profile instanceof File) {
        reqBody.append("profile", profile);
      }

      const result = await editSaveProfileAPI(reqBody, reqHeader);

      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data));
        toast.success("Profile updated successfully");
        setEditMode(false);
        setUserDetails((prev) => ({
          ...prev,
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }));
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error(error.response?.data || "Server error");
    }
  };

  /* PROFILE IMAGE */
  const getProfileImage = () => {
    if (userDetails.profile instanceof File) {
      return URL.createObjectURL(userDetails.profile);
    }
    if (userDetails.profile) {
      return `${serverURL}/imageUploads/${userDetails.profile}`;
    }
    return "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  };

  return (
    <div className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="max-w-3xl mx-auto bg-[#0d0d0d] p-10 rounded-3xl shadow-2xl border border-[#18b892]/40 relative">

        {/* CLOSE */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-6 text-3xl text-gray-300 hover:text-white"
        >
          <IoClose />
        </button>

        <h1 className="text-4xl font-extrabold text-center mb-10">
          Your <span className="text-[#18b892]">Profile</span>
        </h1>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-10">
          <img
            src={getProfileImage()}
            alt=""
            className="w-32 h-32 rounded-full border-4 border-[#18b892] object-cover"
          />

          {editMode && (
            <>
              <input
                type="file"
                id="profileUpload"
                hidden
                accept="image/*"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, profile: e.target.files[0] })
                }
              />
              <label
                htmlFor="profileUpload"
                className="mt-4 px-6 py-2 bg-[#18b892] text-black rounded-xl cursor-pointer hover:bg-[#0D3A33] hover:text-white transition"
              >
                Change Photo
              </label>
            </>
          )}
        </div>

        {/* EDIT BUTTON */}
        <button
          onClick={handleEditOrSave}
          className="float-right mb-6 px-6 py-2 bg-[#18b892] text-black rounded-xl flex items-center gap-2 hover:bg-[#0D3A33] hover:text-white transition"
        >
          {editMode ? "Save Changes" : <><FiEdit2 /> Edit Profile</>}
        </button>

        {/* FORM */}
        <div className="space-y-6 clear-both">
          {["username", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label className="text-gray-400 text-sm capitalize">{field}</label>
              <input
                disabled={!editMode}
                value={userDetails[field]}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, [field]: e.target.value })
                }
                className={`w-full bg-[#111] p-3 rounded-xl border border-[#18b892]/40 ${editMode ? "focus:border-[#18b892]" : "opacity-70"
                  }`}
              />
            </div>
          ))}

          {/* PASSWORD SECTION */}
          {editMode && (
            <>
              {/* OLD PASSWORD */}
              <div className="relative">
                <label className="text-gray-400 text-sm">Current Password</label>
                <input
                  type={showOldPass ? "text" : "password"}
                  value={userDetails.oldPassword}
                  autoComplete="current-password"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, oldPassword: e.target.value })
                  }
                  className="w-full bg-[#111] p-3 rounded-xl border border-[#18b892]/40"
                />

                <span
                  onClick={() => setShowOldPass(!showOldPass)}
                  className="absolute right-4 top-10 cursor-pointer"
                >
                  {showOldPass ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              {/* NEW PASSWORD */}
              <div className="relative">
                <label className="text-gray-400 text-sm">New Password</label>
                <input
                  type={showNewPass ? "text" : "password"}
                  value={userDetails.password}
                  autoComplete="new-password"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  className="w-full bg-[#111] p-3 rounded-xl border border-[#18b892]/40"
                />
                <span
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-4 top-10 cursor-pointer"
                >
                  {showNewPass ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative">
                <label className="text-gray-400 text-sm">Confirm Password</label>
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={userDetails.confirmPassword}
                   autoComplete="new-password"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, confirmPassword: e.target.value })
                  }
                  className="w-full bg-[#111] p-3 rounded-xl border border-[#18b892]/40"
                />
                <span
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 top-10 cursor-pointer"
                >
                  {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </>
          )}
        </div>

        {/* LOGOUT */}
        <Link to="/login">
          <button className="mt-10 w-full py-3 bg-red-600 rounded-xl hover:bg-red-700 transition">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}
