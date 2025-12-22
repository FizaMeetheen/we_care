import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { updateAnnouncementAPI } from "../../services/allAPI";
import toast from "react-hot-toast";

export default function EditAnnouncement({
    editData,
    setEditData,
    onClose,
    onUpdate
}) {


    if (!editData) return null;

   

    const handleUpdate = async () => {
        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                'Authorization': `Bearer ${token}`
            }
            const result = await updateAnnouncementAPI(editData._id, editData, reqHeader)
            console.log(result);
            if (result.status == 200) {
                toast.success("Request Updated Successfully")
                onUpdate()
                onClose()
            } else {
                toast.error("Error in updating requests")
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl text-gray-500"
                >
                    <IoClose />
                </button>

                <h2 className="text-2xl font-bold text-[#0D3A33] mb-6">
                    Edit {editData.announcementType === "donation" ? "Donation" : "Event"} Announcement
                </h2>

                {/* ================= DONATION ================= */}
                {editData.announcementType === "donation" && (
                    <>
                        <label className="font-medium">Donation Name</label>
                        <input
                            value={editData.title}
                            onChange={(e) =>
                                setEditData({ ...editData, title: e.target.value })
                            }
                            className="w-full p-3 border rounded-xl mb-4"
                        />

                        <label className="font-medium">Donation Type</label>
                        <select
                            value={editData.donationType}
                            onChange={(e) =>
                                setEditData({ ...editData, donationType: e.target.value })
                            }
                            className="w-full p-3 border rounded-xl mb-4"
                        >
                            <option>Money</option>
                            <option>Food</option>
                            <option>Medicines</option>
                            <option>Clothes</option>
                            <option>Essential Kits</option>
                        </select>

                        {editData.donationType === "Money" ? (
                            <>
                                <label className="font-medium">Amount</label>
                                <input
                                    value={editData.amount}
                                    onChange={(e) =>
                                        setEditData({ ...editData, amount: e.target.value })
                                    }
                                    className="w-full p-3 border rounded-xl mb-4"
                                />
                            </>
                        ) : (
                            <>
                                <label className="font-medium">Quantity</label>
                                <input
                                    value={editData.quantity}
                                    onChange={(e) =>
                                        setEditData({ ...editData, quantity: e.target.value })
                                    }
                                    className="w-full p-3 border rounded-xl mb-4"
                                />
                            </>
                        )}

                        <label className="font-medium">Purpose</label>
                        <textarea
                            value={editData.abstract}
                            onChange={(e) =>
                                setEditData({ ...editData, abstract: e.target.value })
                            }
                            className="w-full p-3 border rounded-xl h-24"
                        />
                    </>
                )}

                {/* ================= EVENT ================= */}
                {editData.announcementType === "event" && (
                    <>
                        <label className="font-medium">Event Name</label>
                        <input
                            value={editData.title}
                            onChange={(e) =>
                                setEditData({ ...editData, title: e.target.value })
                            }
                            className="w-full p-3 border rounded-xl mb-4"
                        />

                        <label className="font-medium">Event Date</label>
                        <input
                            type="date"
                            value={editData.eventDate}
                            onChange={(e) =>
                                setEditData({ ...editData, eventDate: e.target.value })
                            }
                            className="w-full p-3 border rounded-xl mb-4"
                        />

                        <label className="font-medium">Event Time</label>
                        <input
                            type="time"
                            value={editData.eventTime}
                            onChange={(e) =>
                                setEditData({ ...editData, eventTime: e.target.value })
                            }
                            className="w-full p-3 border rounded-xl mb-4"
                        />

                        <label className="font-medium">Place</label>
                        <input
                            value={editData.eventPlace}
                            onChange={(e) =>
                                setEditData({ ...editData, eventPlace: e.target.value })
                            }
                            className="w-full p-3 border rounded-xl mb-4"
                        />

                        <label className="font-medium">Details</label>
                        <textarea
                            value={editData.abstract}
                            onChange={(e) =>
                                setEditData({ ...editData, abstract: e.target.value })
                            }
                            className="w-full p-3 border rounded-xl h-24"
                        />
                    </>
                )}

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        className="px-5 py-2 bg-[#127f67] text-white rounded-lg"
                    >
                        Update
                    </button>
                </div>

            </div>
        </div>
    );
}
