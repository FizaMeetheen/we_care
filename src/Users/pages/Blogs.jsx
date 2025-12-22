import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getBlogsAPI } from "../../services/allAPI";

export default function Blogs() {

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const token = sessionStorage.getItem("token");

  const getAllBlogs = async () => {
    try {
      const reqHeader = { 
        'Authorization': `Bearer ${token}` 
      };
      const result = await getBlogsAPI(reqHeader);
      setBlogs(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  /* --------- CATEGORY LOGIC --------- */
  const categories = [
    "All",
    ...new Set(blogs.map(blog => blog.category))
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#f4faf8] px-6 py-16">

        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#0D3A33]">
          WeCare <span className="text-[#127f67]">Blogs</span>
        </h1>

        <div className="max-w-7xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* -------- CATEGORY FILTER -------- */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
            <h3 className="text-lg font-bold text-[#0D3A33] mb-4">
              Categories
            </h3>

            <div className="flex flex-col gap-3">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-4 py-2 rounded-xl font-medium transition
                    ${selectedCategory === cat
                      ? "bg-[#127f67] text-white"
                      : "bg-[#f4faf8] text-[#0D3A33] hover:bg-[#dff4ee]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* -------- BLOG LIST -------- */}
          <div className="md:col-span-3 grid md:grid-cols-3 gap-8">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-2xl shadow-lg border border-[#daf6ee]
                             hover:shadow-xl transition p-5 flex flex-col"
                >
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="rounded-xl h-48 w-full object-cover"
                  />

                  <h3 className="text-xl font-bold text-[#0D3A33] mt-4">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                    {blog.shortDescription}
                  </p>

                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="mt-4 text-[#127f67] font-semibold hover:text-[#0d3a33]"
                  >
                    Read More →
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No blogs found in this category
              </p>
            )}
          </div>

        </div>
      </div>

      {/* -------- MODAL -------- */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full rounded-2xl p-8 relative overflow-y-auto max-h-[90vh]">

            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <img
              src={selectedBlog.imageUrl}
              alt={selectedBlog.title}
              className="rounded-xl w-full h-64 object-cover mb-6"
            />

            <h2 className="text-3xl font-bold text-[#0D3A33]">
              {selectedBlog.title}
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {selectedBlog.content}
            </p>

            <p className="text-sm text-[#127f67] mt-6 font-medium">
              {selectedBlog.date}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
