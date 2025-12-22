import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiX, FiBookOpen } from "react-icons/fi";
import { addBlogsAPI, editBlogAPI } from "../../services/allAPI";

export default function AddBlogs({ onClose, editData = null }) {

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    content: "",
    imageUrl: "",
    shortDescription: ""
  })
  const token = sessionStorage.getItem("token")

  const addBlogs = async () => {
    const { title, category, content, imageUrl, shortDescription } = blogData;
    if (!title || !category || !imageUrl || !shortDescription || !content) {
      toast.error("Fill All Required Fields...")
    }
    else {
      try {
        const reqHeader = {
          'Authorization': `Bearer ${token}`
        }
        let result;
        if (editData) {
          result = await editBlogAPI(editData._id, blogData, reqHeader)
          console.log(result);
          toast.success("Blog updated successfully");
        } else {
          result = await addBlogsAPI(blogData, reqHeader)
          console.log(result);
          toast.success("Blog added successfully");
        } if (result.status === 200 || result.status === 201) {
          setBlogData({
            title: "",
            category: "",
            content: "",
            imageUrl: "",
            shortDescription: "",
          });
          onClose();
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
      }
    }
  }

  useEffect(() => {
    if (editData) {
      setBlogData(editData)
    }
  }, [editData])




  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">

      {/* MODAL BOX */}
      <div className="w-full max-w-4xl max-h-[90vh]
                      bg-[#0d3a33]
                      border border-[#1dd3b0]/30
                      rounded-3xl shadow-2xl
                      flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6
                        border-b border-[#1dd3b0]/20">
          <h2 className="text-2xl font-bold text-[#9ff2da] flex items-center gap-3">
            <FiBookOpen className="text-[#1dd3b0]" />
            {!editData ? "Add Blog" : "Edit Blog"}
          </h2>

          <button
            onClick={onClose}
            className="text-[#9ff2da]/70 hover:text-red-400 transition"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* BODY (Scrollable) */}
        <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-6
                        overflow-y-auto max-h-[60vh]">

          {/* Blog Title */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-[#c8f7ec]">
              Blog Title
            </label>
            <input name="title" value={blogData.title} onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
              type="text"
              placeholder="Enter blog title"
              className="w-full px-4 py-3 rounded-xl
                         bg-[#0b1f1a] text-white
                         border border-[#1dd3b0]/30
                         focus:outline-none focus:ring-2
                         focus:ring-[#1dd3b0]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#c8f7ec]">
              Category
            </label>
            <select name="category" value={blogData.category} onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl
                         bg-[#0b1f1a] text-white
                         border border-[#1dd3b0]/30
                         focus:outline-none focus:ring-2
                         focus:ring-[#1dd3b0]"
            >
              <option value="Safety & Awareness">Safety & Awareness</option>
              <option value="Emergency Preparedness">Emergency Preparedness</option>
              <option value="Health & Wellbeing">Health & Wellbeing</option>
              <option value="Guides & Resources">Guides & Resources</option>
              <option value="Success Stories">Success Stories</option>
              <option value="Volunteer Experiences">Volunteer Experiences</option>
              <option value="Community Updates">Community Updates</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#c8f7ec]">
              Cover Image URL
            </label>
            <input name="imageUrl" value={blogData.imageUrl} onChange={(e) => setBlogData({ ...blogData, imageUrl: e.target.value })}
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl
                         bg-[#0b1f1a] text-white
                         border border-[#1dd3b0]/30
                         focus:outline-none focus:ring-2
                         focus:ring-[#1dd3b0]"
            />
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-[#c8f7ec]">
              Short Description
            </label>
            <textarea name="shortDescription" value={blogData.shortDescription} onChange={(e) => setBlogData({ ...blogData, shortDescription: e.target.value })}
              rows={3}
              placeholder="Write a short introduction..."
              className="w-full px-4 py-3 rounded-xl
                         bg-[#0b1f1a] text-white
                         border border-[#1dd3b0]/30
                         resize-none focus:outline-none focus:ring-2
                         focus:ring-[#1dd3b0]"
            />
          </div>

          {/* Full Content */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-[#c8f7ec]">
              Full Content
            </label>
            <textarea name="content" value={blogData.content} onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
              rows={5}
              placeholder="Write the complete blog content..."
              className="w-full px-4 py-3 rounded-xl
                         bg-[#0b1f1a] text-white
                         border border-[#1dd3b0]/30
                         resize-none focus:outline-none focus:ring-2
                         focus:ring-[#1dd3b0]"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-8 py-6 flex justify-end gap-4
                        border-t border-[#1dd3b0]/20">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl
                       bg-[#0b1f1a] text-[#c8f7ec]
                       border border-[#1dd3b0]/30
                       hover:bg-[#123f36] transition"
          >
            Cancel
          </button>

          <button type="button" onClick={addBlogs}
            className="px-6 py-2 rounded-xl
                       bg-[#1dd3b0] text-[#0b1f1a]
                       font-semibold
                       hover:bg-[#17bfa0] transition"
          >
            {!editData ? "Create Blog" : "Update Blog"}
          </button>
        </div>

      </div>
    </div>
  );
}
