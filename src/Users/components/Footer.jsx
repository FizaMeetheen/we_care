import { FaFacebookF, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-r from-[#0d3a33] to-[#127f67] text-white pt-12 pb-6 ">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">

          <div>
            <h2 className="text-3xl font-extrabold tracking-wide">
              We<span className="text-[#7fe0c2]">Care</span>
            </h2>
            <p className="mt-3 text-white/80">
              Supporting communities with compassion, unity, and timely help.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#7fe0c2] text-lg">Quick Links</h3>
            <ul className="space-y-2 text-white/90">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/emergency">Emergency Requests</Link></li>
              <li><Link to="/announcements">Announcements</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#7fe0c2] text-lg">Help</h3>
            <ul className="space-y-2 text-white/90">
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/volunteer">Become a Volunteer</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#7fe0c2] text-lg">Follow Us</h3>
            <div className="flex gap-5 text-xl">
              <a href="#"><FaFacebookF className="hover:text-[#9ff9d7] transition" /></a>
              <a href="#"><FaInstagram className="hover:text-[#9ff9d7] transition" /></a>
              <a href="#"><FaTwitter className="hover:text-[#9ff9d7] transition" /></a>
            </div>
          </div>

        </div>

        <div className="text-center text-white/80 mt-10 border-t border-white/20 pt-4 text-sm">
          © {new Date().getFullYear()} We<span className="text-[#7fe0c2]">Care</span>.
          Built with <FaHeart className="inline text-[#7fe0c2] mx-1" /> to support humanity.
        </div>

      </footer>
    </>
  );
}

export default Footer;
