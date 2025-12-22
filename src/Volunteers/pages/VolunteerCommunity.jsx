import React, { useEffect, useState } from "react";
import VolunteerSidebar from "../components/VolunteerSidebar";
import {
  FiPlusCircle,
  FiMapPin,
  FiMessageCircle,
  FiTrash2
} from "react-icons/fi";
import CommunityPostModal from "../components/communityPostModal";
import {
  deleteCommunityAPI,
  getAllPostsAPI,
  sendReplyAPI
} from "../../services/allAPI";
import toast from "react-hot-toast";

export default function VolCommunity() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);

  const getAllPosts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };
      const result = await getAllPostsAPI(reqHeader);
      setPosts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendReply = async (id) => {
    if (!replyText) return;

    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };

      await sendReplyAPI(id, { message: replyText }, reqHeader);

      setReplyText("");
      setActiveReplyId(null);
      getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const deletedCommunity = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };
      const result = await deleteCommunityAPI(id, reqHeader);
      if (result.status === 200) {
        toast.success("Post Deleted Successfully");
        getAllPosts();
      } else {
        toast.error("Can't delete right now");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f4faf8]">
      {/* SIDEBAR */}
      <div className="w-72 fixed h-screen">
        <VolunteerSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-72 w-full p-10">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-[#0D3A33] mb-8">
          Volunteer <span className="text-[#127f67]">Community</span>
        </h1>

        {/* CREATE POST */}
        <div className="flex justify-end mb-10">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#127f67] text-white 
                       rounded-xl hover:bg-[#0D3A33] transition shadow-md"
          >
            <FiPlusCircle />
            Create Post
          </button>
        </div>

        {/* POSTS */}
        <div className="space-y-8">
          {posts.length > 0 &&
            posts.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-md border border-[#d9f5ec]"
              >
                {/* HEADER ROW */}
                <div className="flex justify-between items-start mb-4">
                  
                  {/* LEFT: TYPE + USER */}
                  <h2
                    className={`text-xl font-bold ${
                      item.type === "need"
                        ? "text-red-500"
                        : "text-[#127f67]"
                    }`}
                  >
                    {item.type === "need" ? "Need Help" : "Offering Help"}
                    <br />
                    <span className="text-sm text-gray-500">
                      by {item.createdBy}
                    </span>
                  </h2>

                  {/* RIGHT: DELETE */}
                  <button
                    onClick={() => deletedCommunity(item._id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>

                <h3 className="text-2xl font-semibold text-[#0D3A33]">
                  {item.title}
                </h3>

                <p className="text-gray-700 mt-2">
                  {item.description}
                </p>

                <p className="flex items-center gap-2 text-gray-600 mt-4 mb-6">
                  <FiMapPin className="text-[#127f67]" /> {item.location}
                </p>

                {/* REPLIES */}
                {item.replies?.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {item.replies.map((reply, i) => (
                      <div
                        key={i}
                        className="bg-[#f4faf8] p-3 rounded-xl border text-sm"
                      >
                        <p className="text-gray-700">{reply.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Replied on{" "}
                          {new Date(reply.createdAt).toLocaleString()} by{" "}
                          {reply.repliedBy}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* REPLY BOX */}
                <div className="mt-4 bg-[#f9fffd] p-4 rounded-xl border border-[#d9f5ec]">
                  <button
                    onClick={() => setActiveReplyId(item._id)}
                    className="flex items-center gap-2 text-[#127f67]"
                  >
                    <FiMessageCircle /> Reply
                  </button>

                  {activeReplyId === item._id && (
                    <div className="mt-4 bg-[#f9fffd] p-4 rounded-xl border">
                      <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 rounded-xl border"
                        placeholder="Write a reply..."
                      />
                      <button
                        onClick={() => sendReply(item._id)}
                        className="mt-3 px-5 py-2 bg-[#127f67] text-white rounded-xl"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {showModal && (
        <CommunityPostModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
