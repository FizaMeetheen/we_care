import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import peopleImage from "../assets/people.png";
import { googleLoginAPI, loginAPI, registerAPI } from "../services/allAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { userAuthContext } from "../context/AuthContext";

function Auth({ register }) {
  const [viewPwd, setViewPwd] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: ""
  });

  const { setRole, setAuthorisedUser } = useContext(userAuthContext);

  /* ---------------- REGISTER ---------------- */
  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = userDetails;

    if (!username || !email || !password || !confirmPassword) {
      return toast.error("Fill all the required fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const result = await registerAPI({
        username,
        password,
        email,
        role: selectedRole
      });

      if (result.status === 200) {
        toast.success("Registered Successfully");
        navigate("/login");
        setUserDetails({
          username: "",
          password: "",
          email: "",
          confirmPassword: ""
        });
      } else {
        toast.error(result.response?.data || "Registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async () => {
    const { email, password } = userDetails;

    if (!email || !password) {
      return toast.error("Fill all the necessary details");
    }

    try {
      const result = await loginAPI({ email, password });

      if (result.status === 200) {
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);

        setRole(result.data.existingUser.role);
        setAuthorisedUser(true);

        toast.success("Login Successfully!!");

        if (result.data.existingUser.role === "admin") {
          navigate("/adminHome");
        } else if (result.data.existingUser.role === "volunteer") {
          navigate("/volunteerHome");
        } else {
          navigate("/");
        }

        setUserDetails({ email: "", password: "" });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const handleGoogleLogin = async (credentialResponse) => {
    const googleData = jwtDecode(credentialResponse.credential);

    try {
      const result = await googleLoginAPI({
        username: googleData.name,
        password: "googleopass",
        profile: googleData.picture,
        email: googleData.email,
        role: selectedRole
      });

      if (result.status === 200) {
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);

        setRole(result.data.existingUser.role);
        setAuthorisedUser(true);

        toast.success("Login Successfully!!");

        if (result.data.existingUser.role === "admin") {
          navigate("/adminHome");
        } else if (result.data.existingUser.role === "volunteer") {
          navigate("/volunteerHome");
        } else {
          navigate("/");
        }

        setUserDetails({ email: "", password: "" });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden 
      bg-gradient-to-br from-[#0d3a33] to-[#1b4d44]
      animate-[gradientMove_10s_ease-in-out_infinite_alternate]
      bg-[length:200%_200%]"
    >
      {/* FLOATING LIGHT BUBBLES */}
      <div className="absolute w-10 h-10 bg-white/10 rounded-full left-10 top-20 animate-[bubble_6s_linear_infinite]" />
      <div className="absolute w-8 h-8 bg-white/10 rounded-full right-20 top-56 animate-[bubble_7s_linear_infinite] delay-300" />
      <div className="absolute w-6 h-6 bg-white/10 rounded-full left-1/2 top-1/3 animate-[bubble_8s_linear_infinite] delay-700" />

      <div className="w-full max-w-5xl bg-[#1b4d44] rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="relative bg-[#e6f3ef] p-10 flex flex-col items-center justify-center rounded-br-[200px] md:rounded-br-[260px] overflow-hidden">
          <h1 className="text-4xl font-extrabold tracking-wide text-[#0d3a33] drop-shadow-md mb-4">
            Welcome to <span className="text-[#127f67]">WeCare</span>
          </h1>

          <img
            src={peopleImage}
            alt="community support"
            className="w-80 max-w-[340px] opacity-80 mix-blend-multiply animate-[float_4s_ease-in-out_infinite]"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10 bg-[#1b4d44]/95 text-white flex flex-col justify-center">
          <h2 className="text-center text-3xl font-bold mb-4 text-[#9ff2da] tracking-wide">
            {register ? "Create your account" : "Login to continue"}
          </h2>

          {/* ROLE */}
          {register && (
            <div className="mb-6 text-center">
              <p className="font-medium mb-2 text-[#c8f7ec]">Sign in as</p>
              <div className="flex justify-center gap-8 text-gray-200">
                {["user", "volunteer"].map((r) => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedRole === r}
                      onChange={() => setSelectedRole(r)}
                      className="accent-[#9ff2da]"
                    />
                    <span className="capitalize">{r}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* FORM */}
          <form className="space-y-5">
            {register && (
              <div>
                <label className="block mb-1 text-[#c8f7ec]">Username</label>
                <input
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                  type="text"
                  className="w-full bg-[#103e36] text-white placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#7fe0c2] outline-none"
                  placeholder="Enter your username"
                />
              </div>
            )}

            <div>
              <label className="block mb-1 text-[#c8f7ec]">Email</label>
              <input
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                type="email"
                className="w-full bg-[#103e36] text-white placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#7fe0c2] outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#c8f7ec]">Password</label>
              <div className="flex items-center">
                <input
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  type={viewPwd ? "text" : "password"}
                  className="w-full bg-[#103e36] text-white placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#7fe0c2] outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setViewPwd(!viewPwd)}
                  className="-ml-10 text-gray-300 hover:text-[#9ff2da]"
                >
                  {viewPwd ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            {register && (
              <div>
                <label className="block mb-1 text-[#c8f7ec]">
                  Confirm Password
                </label>
                <div className="flex items-center">
                  <input
                    value={userDetails.confirmPassword}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        confirmPassword: e.target.value
                      })
                    }
                    type={confirmPass ? "text" : "password"}
                    className="w-full bg-[#103e36] text-white placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#7fe0c2] outline-none"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPass(!confirmPass)}
                    className="-ml-10 text-gray-300 hover:text-[#9ff2da]"
                  >
                    {confirmPass ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4">
              {register ? (
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full bg-[#7fe0c2] text-[#0d3a33] font-bold py-3 rounded-xl hover:bg-[#9ff9d7] transition"
                >
                  Register
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full bg-[#7fe0c2] text-[#0d3a33] font-bold py-3 rounded-xl hover:bg-[#9ff9d7] transition"
                >
                  Login
                </button>
              )}
            </div>

            {!register && (
              <div className="mt-3">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => console.log("Login Failed")}
                />
              </div>
            )}
          </form>

          <p className="text-center mt-6 text-[#c8f7ec]">
            {register ? (
              <>
                Already have an account?{" "}
                <a href="/login" className="text-[#9ff2da] underline">
                  Login
                </a>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <a href="/register" className="text-[#9ff2da] underline">
                  Register
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
