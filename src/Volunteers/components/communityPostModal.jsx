import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { createPostAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

export default function CommunityPostModal({ onClose }) {

  const [type, setType] = useState("");

  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    location: "",
    phone: ""
  });

  const createPost = async () => {
    const { title, description, location, phone } = postDetails;

    if (!title || !description || !location || !phone || !type) {
      return toast.error("Fill all required fields");
    }

    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      };

      const payload = {
        ...postDetails,
        type   
      };

      const result = await createPostAPI(payload, reqHeader);
      console.log(result);
      
      if (result.status === 200) {
        toast.success("Posted Successfully");

        setPostDetails({
          title: "",
          description: "",
          location: "",
          phone: ""
        });
        setType("");
        onClose();        
      }else{
        toast("Error in posting")
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to post");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">

        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-500">
          <IoClose />
        </button>

        <h2 className="text-2xl font-bold mb-6">Create Community Post</h2>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setType("offering")}
            className={`flex-1 p-4 rounded-xl font-semibold border
              ${type === "offering" ? "bg-[#e7f6f2] border-[#127f67]" : ""}`}
          >
            Offering Help
          </button>

          <button
            onClick={() => setType("need")}
            className={`flex-1 p-4 rounded-xl font-semibold border
              ${type === "need" ? "bg-[#fdecec] border-red-500" : ""}`}
          >
            Need Help
          </button>
        </div>

        {type && (
          <>
            <input
              placeholder="Title"
              value={postDetails.title}
              onChange={e => setPostDetails({ ...postDetails, title: e.target.value })}
              className="w-full p-3 border rounded-xl mb-3"
            />

            <textarea
              placeholder="Description"
              value={postDetails.description}
              onChange={e => setPostDetails({ ...postDetails, description: e.target.value })}
              className="w-full p-3 border rounded-xl mb-3 h-24"
            />

            <input
              placeholder="Location"
              value={postDetails.location}
              onChange={e => setPostDetails({ ...postDetails, location: e.target.value })}
              className="w-full p-3 border rounded-xl mb-3"
            />

            <input
              placeholder="Phone"
              value={postDetails.phone}
              onChange={e => setPostDetails({ ...postDetails, phone: e.target.value })}
              className="w-full p-3 border rounded-xl mb-5"
            />

            <button
              onClick={createPost}
              className={`w-full py-3 rounded-xl text-white
                ${type === "offering" ? "bg-[#127f67]" : "bg-red-500"}`}
            >
              Post
            </button>
          </>
        )}
      </div>
    </div>
  );
}
