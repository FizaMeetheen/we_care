import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import ShareStory from "../components/ShareStory";
import { deleteStoryAPI, getAllStoryAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

export default function Stories() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReadModal, setShowReadModal] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [storyDetails, setStoryDetails] = useState([]);

  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
  const userEmail = existingUser?.email?.trim().toLowerCase();

  const openReadModal = (story) => {
    setActiveStory(story);
    setShowReadModal(true);
  };

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

  const myStories = userEmail
    ? storyDetails.filter(
        (story) =>
          story.email?.trim().toLowerCase() === userEmail
      )
    : [];

  const otherStories = userEmail
    ? storyDetails.filter(
        (story) =>
          story.email?.trim().toLowerCase() !== userEmail
      )
    : storyDetails;

  /* STORY CARD */
  const StoryCard = ({ story, isMine }) => (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 relative flex flex-col justify-between">

      {/* DELETE BUTTON – UI ONLY */}
      {isMine && (
        <button type="button" onClick={()=>deleteStories(story._id)}
          title="Delete story"
          className="absolute bottom-4 right-4 text-red-500 hover:text-red-700"
        >
          <IoTrashOutline size={22} />
        </button>
      )}

      <div>
        <h3 className="text-xl font-bold text-[#127f67] mb-3">
          {story.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
          {story.story}
        </p>
      </div>

      <button
        onClick={() => openReadModal(story)}
        className="mt-5 flex items-center gap-2 text-[#127f67] font-semibold text-sm hover:underline"
      >
        <BiMessageRoundedDetail size={18} />
        Read full story
      </button>
    </div>
  );

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-b from-[#eaf6f2] to-white py-24 text-center">
        <h1 className="text-5xl font-extrabold text-[#0D3A33]">
          Real <span className="text-[#127f67]">Stories</span> That Inspire
        </h1>
        <p className="mt-6 text-gray-700 max-w-3xl mx-auto text-lg">
          Discover heartfelt stories from people and volunteers who made a
          difference through WeCare.
        </p>
      </section>

      {/* STORIES */}
      <section className="bg-[#f7fffb] py-20 px-6">

        {/* MY STORIES */}
        {userEmail && myStories.length > 0 && (
          <div className="max-w-7xl mx-auto mb-24">
            <h2 className="text-3xl font-bold text-[#127f67] mb-10">
              My Stories
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {myStories.map((story) => (
                <StoryCard
                  key={story._id}
                  story={story}
                  isMine={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* ALL STORIES */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#127f67] mb-10">
            All Stories
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherStories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                isMine={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SHARE STORY CTA */}
      {existingUser && (
        <section className="py-24 bg-white text-center">
          <h2 className="text-4xl font-extrabold text-[#0D3A33]">
            Have a <span className="text-[#127f67]">Story</span> to Share?
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Your experience can inspire others in the community.
          </p>
          <button
            onClick={() => setShowShareModal(true)}
            className="mt-8 px-10 py-3 bg-[#127f67] text-white text-lg font-semibold rounded-xl hover:bg-[#0D3A33]"
          >
            Share Your Story
          </button>
        </section>
      )}

      <Footer />

      {/* READ MODAL */}
      {showReadModal && activeStory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-8 relative">
            <button
              onClick={() => setShowReadModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
            >
              <IoClose />
            </button>

            <h2 className="text-3xl font-bold text-[#127f67] mb-4">
              {activeStory.title}
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {activeStory.story}
            </p>
          </div>
        </div>
      )}

      {/* SHARE STORY MODAL */}
      {showShareModal && (
        <ShareStory onClose={() => setShowShareModal(false)} />
      )}
    </>
  );
}
