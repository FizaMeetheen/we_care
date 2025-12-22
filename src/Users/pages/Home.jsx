import React from "react";
import { Link } from "react-router-dom";
import { FaHandsHelping, FaHeartbeat, FaBullhorn } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import heroImage from "../../assets/hero.png"
import volunteerImage from "../../assets/volunteer.png"
import weCareImage from "../../assets/wecare.png"
import { BiArrowToRight } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <Header />

      {/* MAIN WRAPPER */}
      <div className="min-h-screen bg-[#f4faf8]">

        {/* HERO SECTION */}
        <section className="w-full px-3 py-20 bg-white relative overflow-hidden">

          <div className="absolute top-[-160px] right-[-200px] w-[650px] h-[650px] 
      bg-[#e6f7f0] rounded-full blur-[150px] opacity-80"></div>

          {/* MAIN CONTAINER */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#0D3A33] leading-tight">
                We<span className="text-[#127f67]">Care</span> :  <br /> Together for the <span className="text-red-400">Community.</span>
              </h1>

              <p className="text-gray-600 mt-6 text-lg max-w-md leading-relaxed">
                WeCare connects people in need with nearby volunteers, community resources,
                shelters, and life-saving emergency support.
              </p>

              <Link to={'/emergency'}><button className="mt-8 px-8 py-3 bg-[#127f67] text-white rounded-xl text-lg font-semibold 
        shadow-md hover:bg-[#0D3A33] transition">
                Request Help
              </button></Link>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className="absolute w-[480px] h-[430px] bg-[#ddf8ee]
          rounded-[60%_40%_55%_45%/50%_65%_40%_55%]
          top-[-20px] right-[-20px] opacity-80 blur-[45px]
          animate-[blobMove_8s_ease-in-out_infinite] -z-10"></div>

              <div className="absolute w-[380px] h-[350px] bg-[#c9f2e4]
          rounded-[45%_55%_60%_40%/55%_45%_60%_40%]
          top-[40px] right-[10px] opacity-60 blur-[30px]
          animate-[float1_7s_ease-in-out_infinite] -z-10"></div>

              <img
                src={heroImage}
                alt="WeCare Community"
                className="relative w-[700px] md:w-[700px] drop-shadow-2xl 
          animate-[fadein_1.2s_ease]"
              />
            </div>

          </div>


          {/* ANIMATIONS */}
          <style>{`
    @keyframes fadein {
      0% {opacity: 0; transform: translateY(20px);}
      100% {opacity: 1; transform: translateY(0);}
    }

    @keyframes float1 {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }

    @keyframes blobMove {
      0%, 100% { 
        border-radius: 60% 40% 55% 45% / 50% 65% 40% 55%; 
      }
      50% { 
        border-radius: 55% 45% 60% 40% / 45% 55% 60% 40%; 
      }
    }
  `}</style>

        </section>

        {/* ABOUT SECTION */}
        <section className="w-full px-3 py-20 bg-white relative overflow-hidden">
          <div className="absolute top-[-120px] left-[50px] w-[420px] h-[420px] 
      bg-[#e6f7f0] rounded-full blur-[120px] opacity-70"></div>

          <div className="absolute bottom-[-150px] right-[50px] w-[380px] h-[380px] 
      bg-[#d4f2e7] rounded-full blur-[110px] opacity-60"></div>

          {/* MAIN CONTAINER */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0D3A33] leading-tight">
                About <span className="text-[#127f67]">WeCare</span>
              </h2>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                WeCare is a community-first emergency and resource support platform created
                to connect people in need with volunteers, shelters, and life-saving assistance.
                <br /><br />
                Our mission is simple — empower communities to help one another, respond faster
                during emergencies, and build a network where support is always within reach.
              </p>

              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Explore real stories, safety tips, and community updates on our blog — all created
                to educate, inspire, and strengthen our WeCare family.
              </p>

              <Link
                to="/blogs"
                className="mt-6 inline-flex items-center gap-2 text-[#127f67] font-semibold text-lg 
             hover:text-[#0D3A33] transition"
              >
                Visit our blog to know more
                <span className="text-xl"><BiArrowToRight /></span>
              </Link>

            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className="absolute w-[400px] h-[360px] bg-[#ddf8ee]
          rounded-[60%_40%_55%_45%/50%_65%_40%_55%]
          top-[20px] right-[20px] opacity-70 blur-[40px]
          animate-[blobMove_8s_ease-in-out_infinite] -z-10"></div>

              {/* ILLUSTRATION */}
              <img
                src={weCareImage}
                alt="About WeCare"
                className="relative w-[420px] md:w-[460px] drop-shadow-xl animate-[fadein_1.2s_ease]"
              />
            </div>

          </div>

          {/* ANIMATIONS*/}
          <style>{`
    @keyframes fadein {
      0% {opacity: 0; transform: translateY(20px);}
      100% {opacity: 1; transform: translateY(0);}
    }

    @keyframes blobMove {
      0%, 100% {
        border-radius: 60% 40% 55% 45% / 50% 65% 40% 55%;
      }
      50% {
        border-radius: 55% 45% 60% 40% / 45% 55% 60% 40%;
      }
    }
  `}</style>

        </section>

        {/* FEATURES  */}
        <section className="w-full px-6 py-24 bg-white relative overflow-hidden">

          <div className="absolute top-[-120px] left-[-150px] w-[550px] h-[550px]
            bg-[#e6f7f0] blur-[150px] rounded-full opacity-70"></div>

          <h2 className="text-5xl font-extrabold text-center text-[#0D3A33] mb-10">
            What <span className="text-[#127f67]">WeCare</span> Provides
          </h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 relative z-10">

            <div className="bg-white shadow-lg rounded-2xl p-10 text-center border border-[#daf6ee] hover:shadow-xl transition">

              <FaHeartbeat className="text-[#127f67] text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0d3a33] mb-2">Emergency Help</h3>
              <p className="text-gray-700">
                Instantly request support for medical emergencies, rescue needs, food, or shelter.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-10 text-center border border-[#daf6ee] hover:shadow-xl transition">
              <FaHandsHelping className="text-[#127f67] text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0d3a33] mb-2">Volunteer Network</h3>
              <p className="text-gray-700">
                Verified volunteers respond quickly and provide trusted on-ground assistance.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-10 text-center border border-[#daf6ee] hover:shadow-xl transition">
              <FaBullhorn className="text-[#127f67] text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0d3a33] mb-2">Live Alerts</h3>
              <p className="text-gray-700">
                Stay informed with real-time updates on relief camps, alerts, and community resources.
              </p>
            </div>
          </div>

        </section>

        {/* CALL TO ACTION  */}
        <section className="w-full px-6 py-24 bg-white relative overflow-hidden">

          <div className="absolute top-[-150px] left-[-200px] w-[600px] h-[600px] 
      bg-[#e6f7f0] rounded-full blur-[150px] opacity-80"></div>

          <div className="absolute bottom-[-150px] left-[40px] w-[380px] h-[380px] 
      bg-[#d3f4ea] rounded-full blur-[110px] opacity-80"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

            <div className="relative flex justify-center md:justify-start">

              <div className="absolute w-[450px] h-[420px] bg-[#ddf8ee]
          rounded-[60%_40%_55%_45%/50%_65%_40%_55%]
          top-[-20px] left-[-20px] opacity-80 blur-[45px]
          animate-[blobMove_8s_ease-in-out_infinite] -z-10"></div>

              <div className="absolute w-[360px] h-[340px] bg-[#c9f2e4]
          rounded-[45%_55%_60%_40%/55%_45%_60%_40%]
          top-[40px] left-[10px] opacity-60 blur-[25px]
          animate-[float1_7s_ease-in-out_infinite] -z-10"></div>

              <img
                src={volunteerImage}
                alt="WeCare Volunteers"
                className="relative w-[650px] md:w-[700px] drop-shadow-2xl 
          animate-[fadein_1.2s_ease]"
              />
            </div>

            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0D3A33] leading-tight">
                Join the <span className="text-[#127f67]">WeCare</span> Community
              </h2>

              <p className="text-gray-600 mt-6 text-lg max-w-md leading-relaxed">
                Become a part of a compassionate network that stands with people
                during emergencies. Together, we empower communities and save lives.
              </p>

              <Link
                to="/register"
                className="mt-8 inline-block px-8 py-3 bg-[#127f67] text-white rounded-xl 
                  text-lg font-semibold shadow-md hover:bg-[#0D3A33] transition"
              >
                Become a Volunteer
              </Link>
            </div>

          </div>

          {/* Animations */}
          <style>{`
    @keyframes fadein {
      0% {opacity: 0; transform: translateY(20px);}
      100% {opacity: 1; transform: translateY(0);}
    }
    @keyframes float1 {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    @keyframes blobMove {
      0%, 100% { 
        border-radius: 60% 40% 55% 45% / 50% 65% 40% 55%; 
      }
      50% { 
        border-radius: 55% 45% 60% 40% / 45% 55% 60% 40%; 
      }
    }
  `}</style>

        </section>



      </div>

      <Footer />
    </>
  );
}
