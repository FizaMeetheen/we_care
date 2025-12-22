import commonAPI from "./commonAPI"
import serverURL from "./serverURL"


//register
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/register`, reqBody)
}

//login
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/login`, reqBody)
}

//google-login
export const googleLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/google-login`, reqBody)
}

//emergency-request
export const emergencyRequestAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/emergency`, reqBody)
}

//update-profile
export const editSaveProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/edit-profile`, reqBody, reqHeader)
}

//donation-submit
export const MakeDonationAPI = async (id,reqBody, reqHeader) => {
    return await commonAPI("POST", `${serverURL}/make-donation/${id}`, reqBody, reqHeader)
}

//event-regsitration
export const EventRegisterAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("POST", `${serverURL}/event-registration/${id}`,reqBody,reqHeader);
};


//share-story
export const ShareStoryAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${serverURL}/share-story`, reqBody, reqHeader)
}

//get-story
export const getAllStoryAPI = async () => {
    return await commonAPI("GET", `${serverURL}/get-allstories`)
}

//get-donation
export const getAllDonationsAPI = async ( reqHeader) => {
    return await commonAPI("GET", `${serverURL}/get-alldonations`, "", reqHeader)
}


//get-event
export const getAllEventsAPI = async ( reqHeader) => {
    return await commonAPI("GET", `${serverURL}/get-allevents`, "", reqHeader)
}

//get-allannouncements -user
export const getAllAnnouncementsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/get-allannouncements`,"",reqHeader)
}

// get single announcement by id
export const getAnnouncementByIdAPI = async (id) => {
    return await commonAPI("GET", `${serverURL}/get-announcement/${id}`);
};



//-----------------VOLUNTEER--------------------

//post-annoucnements
export const postAnnouncementAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${serverURL}/post-announcements`, reqBody, reqHeader)
}

//get-volunteer's announcements
export const getAnnouncementsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/get-announcements`, "", reqHeader)
}

//get-allrequests
export const getAllRequestAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/get-allrequests`, "", reqHeader)
}

//accept - requests
export const acceptRequestsAPI = async (id,status,reqHeader) => {
    return await commonAPI("PUT",`${serverURL}/accept-requests/${id}`,{status},reqHeader)
}

//update-announcements
export const updateAnnouncementAPI = async(id,reqBody,reqHeader) => {
    return await commonAPI("PUT",`${serverURL}/update-announcement/${id}`,reqBody,reqHeader)
}

//create-post
export const createPostAPI = async(reqBody,reqHeader) => {
    return await commonAPI("POST",`${serverURL}/create-post`,reqBody,reqHeader)
}

//get-allposts
export const getAllPostsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/get-allposts`, "", reqHeader)
}

//reply
export const sendReplyAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${serverURL}/community-reply/${id}`, reqBody, reqHeader);
};

//reply
export const deleteCommunityAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE", `${serverURL}/delete-community/${id}`, "", reqHeader);
};




//-------------ADMIN----------------

//get-users
export const getUsersAPI = async(reqHeader) => {
    return await commonAPI("GET",`${serverURL}/get-users`,"",reqHeader)
}

//remove-user
export const removeUsersAPI = async(id,reqHeader) => {
    return await commonAPI("DELETE",`${serverURL}/remove-users/${id}`,"",reqHeader)
}

//get-volunteers
export const getVolunteersAPI = async(reqHeader) => {
    return await commonAPI("GET",`${serverURL}/get-volunteers`,"",reqHeader)
}

//remove-volunteer
export const removeVolunteersAPI = async(id,reqHeader) => {
    return await commonAPI("DELETE",`${serverURL}/remove-volunteers/${id}`,"",reqHeader)
}

//delete-stories
export const deleteStoryAPI = async(id,reqHeader) => {
    return await commonAPI("DELETE",`${serverURL}/delete-stories/${id}`,"",reqHeader)
}

//delete-announcements
export const deleteAnnouncementsAPI = async(id,reqHeader) => {
    return await commonAPI("DELETE",`${serverURL}/delete-announcements/${id}`,"",reqHeader)
}

//add-blogs
export const addBlogsAPI = async(reqBody,reqHeader) => {
    return await commonAPI("POST",`${serverURL}/add-blogs`,reqBody,reqHeader)
}

//get-blogs
export const getBlogsAPI = async(reqHeader) => {
    return await commonAPI("GET",`${serverURL}/get-allblogs`,"",reqHeader)
}

//delete-blogs
export const deleteBlogsAPI = async(id,reqHeader) => {
    return await commonAPI("DELETE",`${serverURL}/delete-blogs/${id}`,"",reqHeader)
}

//edit-blogs
export const editBlogAPI = async (id,reqBody,reqHeader) => {
    return await commonAPI("PUT",`${serverURL}/edit-blogs/${id}`,reqBody,reqHeader)
}
