import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../../components/dashboardComponent/LeftsideNavbar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  fetchProfile,
  getAllProfile,
  UpdateProfile,
  deleteUser,
  signupUser
  // createUser thunk to be implemented separately for add functionality
} from "../../../features/auth/authUserSlice";


export default function SuperAdmin() {
  const dispatch = useDispatch();
  const {
    user,
    loading: authLoading,
    isInitialized,
    users,
    loading,
    error,
  } = useSelector((state) => state.auth);

  const [editId, setEditId] = useState(null);
  const [editAdminData, setEditAdminData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (isInitialized && !user && !authLoading) {
      dispatch(fetchProfile());
    }
  }, [isInitialized, user, authLoading, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getAllProfile());
    }
  }, [user, dispatch]);

  // Filter users for role = "superadmin"
  const superAdmins = users?.filter((u) => u.role === "superadmin") || [];

  const openAddModal = () => {
    setEditId(null);
    setEditAdminData(null);
    setShowAddModal(true);
  };

  const openEditModal = (admin) => {
    setEditId(admin._id);
    setEditAdminData(admin);
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setEditId(null);
    setEditAdminData(null);
  };


const onAddSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const newAdmin = {
    fullName: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    role: "superadmin", // ensure the created user gets the 'admin' role
  };

  try {
    await dispatch(signupUser(newAdmin)).unwrap();
    closeModals();
      toast.success("Admin added successfully");
    dispatch(getAllProfile());
  } catch (err) {
    alert("Failed to add admin: " + (err.message || "Unknown error"));
  }
};



  const onEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedAdmin = {
      fullName: formData.get("name"),
      email: formData.get("email"),
      type: "superadmin",
      phone: formData.get("phone"),
      address: formData.get("address"),
    };
    const password = formData.get("password");
    if (password && password.trim().length > 0) {
      updatedAdmin.password = password;
    }
    try {
      await dispatch(UpdateProfile({ id: editId, userData: updatedAdmin })).unwrap();
      closeModals();
      toast("Super Admin updated successfully")
      dispatch(getAllProfile());
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  const onDeleteClick = (admin) => {
    setEditAdminData(admin);
    setShowDeleteModal(true);
  };

  const onDeleteConfirm = async () => {
    try {
      await dispatch(deleteUser(editAdminData._id)).unwrap();
      closeModals();
      toast("Super Admin updated successfully")
      dispatch(getAllProfile());
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftsideNavbar user={user} />
        <main className="flex flex-col md:px-10 px-1 py-8 bg-blue-50 min-h-0 w-full">
          <section className="bg-white rounded-xl shadow md:p-6 md:m-6 p-1 m-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-2xl font-semibold">Super Admin</h2>
              <button
                onClick={openAddModal}
                className="bg-blue-600 text-sm md:text-base text-white font-semibold px-3 md:px-6 py-1 md:py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>

            {loading ? (
              <p>Loading super admins...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : superAdmins.length === 0 ? (
              <p>No data</p>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
                {superAdmins.map((admin) => (
                  <div
                    key={admin._id}
                    className="bg-white rounded-lg border p-1 md:p-5 flex items-center gap-5"
                  >
                    <div className="md:w-12 md:h-12 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm md:text-lg font-bold">
                      {admin.fullName?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="md:text-lg text-sm font-bold mb-0.5">
                        {admin.name}
                      </div>
                      <div className="text-gray-600 mb-2 text-xs md:text-sm">
                        {admin.email}
                      </div>
                      <div className="text-gray-600 mb-2 text-xs md:text-sm">
                        {admin.address}
                      </div>
                      <span className="inline-block px-1.5 md:px-3 py-[2px] md:py-1 rounded-lg text-xs font-semibold bg-purple-200 text-purple-700">
                        superadmin
                      </span>
                    </div>
                    <div className="flex gap-3 ml-auto">
                      <span
                        className="text-blue-600 font-medium cursor-pointer hover:underline text-xs md:text-sm lg:text-lg"
                        onClick={() => openEditModal(admin)}
                      >
                        Edit
                      </span>
                      <span
                        className="text-red-500 font-medium cursor-pointer hover:underline text-xs md:text-sm lg:text-lg"
                        onClick={() => onDeleteClick(admin)}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Add Admin Modal */}
          {showAddModal && (
            <Modal title="Add Super Admin" onClose={closeModals}>
              <AdminForm onSubmit={onAddSubmit} />
            </Modal>
          )}

          {/* Edit Admin Modal */}
          {showEditModal && editAdminData && (
            <Modal title="Edit Super Admin" onClose={closeModals}>
              <AdminForm onSubmit={onEditSubmit} admin={editAdminData} />
            </Modal>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && editAdminData && (
            <Modal title="Confirm Delete" onClose={closeModals}>
              <p>Are you sure you want to delete {editAdminData.name}?</p>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={onDeleteConfirm}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

// Modal Component
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>
  );
}

// Admin form component
function AdminForm({ onSubmit, admin }) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 font-semibold" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={admin?.fullName || ""}
          type="text"
          
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          defaultValue={admin?.email || ""}
          type="email"
          
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder={admin ? "Leave blank to keep existing password" : ""}
          className="w-full px-3 py-2 border rounded"
          required={!admin}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          name="address"
          defaultValue={admin?.address || ""}
          type="text"
          
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="type">
          Type
        </label>
        <select
          id="type"
          name="type"
          defaultValue={admin?.type || "superadmin"}
          
          className="w-full px-3 py-2 border rounded"
          disabled
        >
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
          <option value="content-creator">Content Creator</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="phone">
          Phone No.
        </label>
        <input
          id="phone"
          name="phone"
          defaultValue={admin?.phone || ""}
          type="text"
          maxLength={10}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="md:col-span-2 text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
