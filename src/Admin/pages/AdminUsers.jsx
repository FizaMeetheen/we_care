import React, { useEffect, useState } from "react";
import { FiUser, FiTrash2 } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import { getUsersAPI, removeUsersAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

export default function AdminUsers() {

  const [users, setUsers] = useState([])
  const token = sessionStorage.getItem("token")

  const getUsers = async () => {
    try {
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      }
      const result = await getUsersAPI(reqHeader)
      console.log(result);
      setUsers(result.data)
    } catch (error) {
      console.log(error);

    }
  }

  const removeUsers = async (id) => {
    const reqHeader = {
      'Authorization': `Bearer ${token}`
    }
    const result = await removeUsersAPI(id,reqHeader)
    console.log(result);
    if(result.status == 200){
      toast.success("User Deleted Successfully")
      getUsers()
    }
    else{
      toast.error("Can't delete right now")
    }
  }

  useEffect(() => {
    getUsers()
  },[])

  return (
    <div className="flex min-h-screen bg-[#0b1f1a] text-white">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="ml-72 w-full">

        {/* HEADER */}
        <header className="px-10 py-6 bg-[#0d3a33] border-b border-[#1dd3b0]/30">
          <h1 className="text-3xl font-bold">
            Manage <span className="text-[#1dd3b0]">Users</span>
          </h1>
        </header>

        {/* CONTENT */}
        <div className="px-10 py-14">

          <h2 className="text-2xl font-semibold text-[#c8f7ec] mb-8">
            User List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-[#0d3a33] rounded-3xl shadow-xl
                               border border-[#1dd3b0]/30 overflow-hidden">

              <thead className="bg-[#0b1f1a] text-[#9ff2da]">
                <tr>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-[#1dd3b0]/20
                               hover:bg-[#0b1f1a] transition"
                  >

                    {/* USER */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <FiUser className="text-[#1dd3b0] text-lg" />
                      <span className="font-medium">{user.name}</span>
                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-4 text-gray-300">
                      {user.email}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4 text-gray-300">
                      {user.role}
                    </td>

                    {/* DELETE */}
                    <td className="px-6 py-4 text-center">
                      <button type="button" onClick={()=>removeUsers(user._id)}
                        className="px-4 py-2 bg-red-600/80 text-white rounded-xl
                                   hover:bg-red-600 transition flex items-center gap-2 mx-auto"
                      >
                        <FiTrash2 /> Remove
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
