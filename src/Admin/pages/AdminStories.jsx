import React, { useEffect, useState } from "react";
import { FiBookOpen, FiTrash2 } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import { deleteStoryAPI, getAllStoryAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

export default function AdminStories() {

  const [storyDetails, setStoryDetails] = useState([]);

  const getAllStories = async () => {
    try {
      const result = await getAllStoryAPI();
      setStoryDetails(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStories = async (id) => {
    const token = sessionStorage.getItem("token")
     const reqHeader = {
       'Authorization': `Bearer ${token}`
     }
     const result = await deleteStoryAPI(id,reqHeader)
     console.log(result);
     if(result.status == 200){
       toast.success("Story Deleted Successfully")
       getAllStories()
     }
     else{
       toast.error("Can't delete right now")
     }
   }

  useEffect(() => {
    getAllStories();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0b1f1a] text-white">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="ml-72 w-full">

        {/* HEADER */}
        <header className="px-10 py-6 bg-[#0d3a33] border-b border-[#1dd3b0]/30">
          <h1 className="text-3xl font-bold">
            Manage <span className="text-[#1dd3b0]">Stories</span>
          </h1>
        </header>

        {/* CONTENT */}
        <div className="px-10 py-14 max-w-6xl">

          <h2 className="text-2xl font-semibold text-[#c8f7ec] mb-10">
            Stories Shared by Users
          </h2>

          <div className="space-y-8">
            {storyDetails.map((story) => (
              <div
                key={story._id}
                className="bg-[#0d3a33] border border-[#1dd3b0]/30
                           rounded-3xl p-8 shadow-lg hover:shadow-xl transition"
              >

                {/* TITLE + AUTHOR */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#9ff2da] flex items-center gap-3">
                    <FiBookOpen className="text-[#1dd3b0]" />
                    {story.title}
                  </h3>

                  <span className="text-sm text-[#c8f7ec] font-medium">
                    {story.name}
                  </span>
                </div>

                {/* DIVIDER */}
                <div className="h-[1px] bg-[#1dd3b0]/20 my-5"></div>

                {/* STORY CONTENT */}
                <p className="text-gray-300 leading-relaxed text-[15px] line-clamp-4">
                  {story.story}
                </p>

                {/* ACTION */}
                <div className="mt-6 flex justify-end">
                  <button type="button" onClick={()=>deleteStories(story._id)}
                    className="px-5 py-2 bg-red-600/80 text-white rounded-xl
                               hover:bg-red-600 transition flex items-center gap-2"
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
