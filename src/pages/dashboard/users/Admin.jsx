import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../../components/dashboardComponent/LeftsideNavbar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchProfile,
  getAllProfile,
  UpdateProfile,
  deleteUser,
  signupUser,
} from "../../../features/auth/authUserSlice";
import toast from "react-hot-toast";

export default function Admin() {
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
  const [editAdminData, setEditAdminData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    type: "admin",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (isInitialized && !user && !authLoading) {
      dispatch(fetchProfile());
    }
  }, [isInitialized, user, authLoading, dispatch]);

  useEffect(() => {
    if (user) dispatch(getAllProfile());
  }, [user, dispatch]);

  const admins = users?.filter((u) => u.role === "admin") || [];

  const openAddModal = () => {
    setEditId(null);
    setEditAdminData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      type: "admin",
    });
    setShowAddModal(true);
  };

  const openEditModal = (admin) => {
    setEditId(admin._id);
    setEditAdminData({
      fullName: admin.fullName || "",
      email: admin.email || "",
      password: "",
      phone: admin.phone || "",
      address: admin.address || "",
      type: admin.type || "admin",
    });
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setEditId(null);
    setEditAdminData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      type: "admin",
    });
  };

  // Input change handler for controlled inputs
  const onInputChange = (e) => {
    const { name, value } = e.target;

    // Phone number validation - digits only, max 10 chars
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > 10) return;
      setEditAdminData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    setEditAdminData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new admin submit with controlled data
  const onAddSubmit = async (e) => {
    e.preventDefault();
    const newAdmin = {
      fullName: editAdminData.fullName,
      email: editAdminData.email,
      password: editAdminData.password,
      phone: editAdminData.phone,
      address: editAdminData.address,
      role: "admin",
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

  // Edit existing admin submit
  const onEditSubmit = async (e) => {
    e.preventDefault();
    const updatedAdmin = {
      fullName: editAdminData.fullName,
      email: editAdminData.email,
      type: "admin",
      phone: editAdminData.phone,
      address: editAdminData.address,
    };
    if (editAdminData.password && editAdminData.password.trim()) {
      updatedAdmin.password = editAdminData.password;
    }
    try {
      await dispatch(UpdateProfile({ id: editId, userData: updatedAdmin })).unwrap();
      closeModals();
      toast.success("Admin updated successfully");
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
      if (!editAdminData?._id) {
        alert("No admin selected for deletion");
        return;
      }
      await dispatch(deleteUser(editAdminData._id)).unwrap();
      closeModals();
      toast.success("Admin deleted successfully");
      dispatch(getAllProfile());
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed: " + (err.message || "Something went wrong"));
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
              <h2 className="text-lg md:text-2xl font-semibold">Admin</h2>
              <button
                onClick={openAddModal}
                className="bg-blue-600 text-white font-semibold px-3 md:px-6 py-1 md:py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>

            {loading ? (
              <p>Loading admins...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : admins.length === 0 ? (
              <p>No data</p>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
                {admins.map((admin) => (
                  <div
                    key={admin._id}
                    className="bg-white rounded-lg border p-5 flex items-center gap-5"
                  >
                    <div className="md:w-12 md:h-12 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm md:text-lg font-bold">
                      {admin.fullName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="md:text-lg text-sm font-bold mb-0.5">{admin.fullName}</div>
                      <div className="text-gray-600 mb-2 text-xs md:text-sm">{admin.email}</div>
                      <div className="text-gray-600 mb-2 text-xs md:text-sm">{admin.address}</div>
                      <span className="inline-block px-1.5 md:px-3 py-[2px] md:py-1 rounded-lg text-xs font-semibold bg-blue-200 text-blue-700">
                        admin
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

          {/* Add Modal */}
          {showAddModal && (
            <Modal title="Add Admin" onClose={closeModals}>
              <AdminForm
                onSubmit={onAddSubmit}
                admin={editAdminData}
                onInputChange={onInputChange}
                formData={editAdminData}
              />
            </Modal>
          )}

          {/* Edit Modal */}
          {showEditModal && editAdminData && (
            <Modal title="Edit Admin" onClose={closeModals}>
              <AdminForm
                onSubmit={onEditSubmit}
                admin={editAdminData}
                onInputChange={onInputChange}
                formData={editAdminData}
              />
            </Modal>
          )}

          {/* Delete Modal */}
          {showDeleteModal && editAdminData && (
            <Modal title="Confirm Delete" onClose={closeModals}>
              <p>Are you sure you want to delete {editAdminData.fullName}?</p>
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

function AdminForm({ onSubmit, formData, onInputChange, admin }) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 font-semibold" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={onInputChange}
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
          type="email"
          required
          value={formData.email}
          onChange={onInputChange}
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
          value={formData.password}
          onChange={onInputChange}
          required={!admin}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={onInputChange}
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
          value={formData.type}
          disabled
          className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
          onChange={onInputChange}
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
          type="text"
          maxLength={10}
          required
          value={formData.phone}
          onChange={onInputChange}
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
