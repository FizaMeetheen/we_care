import React, { useEffect, useState } from "react";
import { FiBookOpen, FiEdit2, FiTrash2, FiPlusCircle } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import AddBlogs from "../components/AddBlogs";
import { deleteBlogsAPI, getBlogsAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

export default function AdminBlogs() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [editData, setEditData] = useState(null)
  const token = sessionStorage.getItem("token");

  const getAllBlogs = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await getBlogsAPI(reqHeader);
      setBlogs(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      }
      const result = await deleteBlogsAPI(id, reqHeader)
      console.log(result);
      if (result.status == 200) {
        toast.success("Blog Deleted Successfully")
        getAllBlogs()
      }
      else {
        toast.error("Can't delete right now")
      }
    } catch (error) {
      console.log(error);


    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0b1f1a] text-white">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="ml-72 w-full">

        {/* HEADER */}
        <header className="px-10 py-6 bg-[#0d3a33] border-b border-[#1dd3b0]/30">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              Manage <span className="text-[#1dd3b0]">Blogs</span>
            </h1>

            <button
              onClick={() => { setEditData(null); setShowShareModal(true) }}
              className="flex items-center gap-2 px-6 py-2
                         bg-[#1dd3b0] text-[#0b1f1a]
                         rounded-xl font-semibold
                         hover:bg-[#17bfa0] transition"
            >
              <FiPlusCircle /> Add Blog
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-10 py-14 max-w-6xl">

          <h2 className="text-2xl font-semibold text-[#c8f7ec] mb-10">
            Published Blogs
          </h2>

          <div className="space-y-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-[#0d3a33] border border-[#1dd3b0]/30
                             rounded-3xl p-8 shadow-lg
                             hover:shadow-xl transition"
                >

                  {/* TITLE + META */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#9ff2da] flex items-center gap-3">
                      <FiBookOpen className="text-[#1dd3b0]" />
                      {blog.title}
                    </h3>

                    <span className="text-sm text-[#c8f7ec] font-medium">
                      {new Date(blog.createdAt).toLocaleDateString()} • {blog.category}
                    </span>
                  </div>

                  {/* DIVIDER */}
                  <div className="h-[1px] bg-[#1dd3b0]/20 my-5"></div>

                  {/* PREVIEW */}
                  <p className="text-gray-300 leading-relaxed text-[15px] line-clamp-3">
                    {blog.shortDescription}
                  </p>

                  {/* ACTIONS */}
                  <div className="mt-6 flex justify-end gap-3">
                    <button onClick={() => { setEditData(blog); setShowShareModal(true) }}
                      className="px-5 py-2 bg-blue-600/80 text-white rounded-xl
                                 hover:bg-blue-600 transition flex items-center gap-2"
                    >
                      <FiEdit2 /> Edit
                    </button>

                    <button type="button" onClick={() => deleteBlog(blog._id)}
                      className="px-5 py-2 bg-red-600/80 text-white rounded-xl
                                 hover:bg-red-600 transition flex items-center gap-2"
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">
                No blogs available
              </p>
            )}
          </div>

        </div>
      </div>

      {/* ADD BLOG MODAL */}
      {showShareModal && (
        <AddBlogs
          editData={editData}
          onClose={() => {
            setShowShareModal(false);
            getAllBlogs();
          }}
        />
      )}

    </div>
  );
}
