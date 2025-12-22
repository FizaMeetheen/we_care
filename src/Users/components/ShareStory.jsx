import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { ShareStoryAPI } from "../../services/allAPI";

export default function ShareStory({ onClose }) {
    const [storyDetails, setStoryDetails] = useState({
        name: "",
        title: "",
        story: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoryDetails({ ...storyDetails, [name]: value });
    };

    const handleSubmit = async () => {
        const { name, title, story } = storyDetails;

        if (!name || !title || !story) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                'Authorization': `Bearer ${token}`
            }
            const result = await ShareStoryAPI(storyDetails, reqHeader)
            console.log(result);

            if (result.status == 200) {
                toast.success("Story submitted for review 💚");
                setStoryDetails({
                    name: "",
                    title: "",
                    story: ""
                });

                onClose();
            }




        } catch (error) {
            console.log(error);

        }
    }

    

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-2xl relative">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-black text-2xl"
                >
                    <IoClose />
                </button>

                {/* TITLE */}
                <h2 className="text-3xl font-extrabold text-center text-[#127f67] mb-6">
                    Share Your Story
                </h2>

                <p className="text-gray-600 text-center mb-8">
                    Your experience can inspire others. Tell us how WeCare made a difference.
                </p>

                {/* NAME */}
                <div className="mb-4">
                    <label className="text-gray-600 font-semibold">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        value={storyDetails.name}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border rounded-xl focus:border-[#127f67]"
                        placeholder="Enter your name"
                    />
                </div>

                {/* TITLE */}
                <div className="mb-4">
                    <label className="text-gray-600 font-semibold">Story Title</label>
                    <input
                        type="text"
                        name="title"
                        value={storyDetails.title}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border rounded-xl focus:border-[#127f67]"
                        placeholder="Eg: They reached us in time..."
                    />
                </div>

                {/* STORY */}
                <div className="mb-6">
                    <label className="text-gray-600 font-semibold">Your Story</label>
                    <textarea
                        rows="5"
                        name="story"
                        value={storyDetails.story}
                        onChange={handleChange}
                        className="w-full p-3 mt-2 border rounded-xl focus:border-[#127f67]"
                        placeholder="Write your experience here..."
                    />
                </div>

                {/* BUTTON */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-[#127f67] text-white font-bold rounded-xl hover:bg-[#0D3A33] transition"
                >
                    Submit Story
                </button>
            </div>
        </div>
    );
}
