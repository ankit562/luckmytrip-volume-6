import {
  Home,
  Search,
  ShoppingCart,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Users,
  FileText,
  Settings,
  BarChart3,
  MenuIcon,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import Header from "../../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../../components/dashboardComponent/LeftsideNavbar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProfile } from '../../../features/auth/authUserSlice';
 
import { fetchTickets, createTicket, editTicket, removeTicket } from '../../../features/tickets/ticketSlice'; // adjust import path

function CreateContentForm({ onCancel, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    ticket: initialData?.ticket || "",
    date: initialData?.date ? initialData.date.slice(0, 10) : "", 
    image: null,
    category: initialData?.category || "offer",
    status: initialData?.status || "publish"
  });

const handleChange = (e) => {
  const { name, value, files, type } = e.target;
  setForm((prev) =>
    type === "file" ? { ...prev, [name]: files[0] } : { ...prev, [name]: value }
  );
};

const handleSubmit = (e) => {
  
  e.preventDefault();

  const formData = new FormData();
  for (const key in form) {
    if (key === "image" && form.image instanceof File) {
      formData.append("image", form.image);
    } else {
      formData.append(key, form[key]);
    }
  }
  
  onSubmit(formData);
};


  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="border rounded w-full px-2 py-1"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="border rounded w-full px-2 py-1"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          name="price"
          placeholder="Price (₹)"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange}
          required
          className="border rounded w-full px-2 py-1"
        />
        <input
          name="ticket"
          placeholder="Total Tickets"
          type="number"
          min="0"
          value={form.ticket}
          onChange={handleChange}
          required
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        className="border rounded w-full px-2 py-1"
      />
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
        required={!initialData} // require if creating new, optional if editing
      />
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1 rounded border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-1 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default function Journey() {
  const dispatch = useDispatch();

const { tickets = [], loading, } = useSelector(state => state.tickets || {});
 const { user, isInitialized } = useSelector(state => state.auth);
 

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState(null);

  useEffect(() => {
    dispatch(fetchTickets());
    
  }, [dispatch]);


  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);
  const openEditModal = (content) => setEditModalData(content);
  const closeEditModal = () => setEditModalData(null);
  const openDeleteModal = (content) => setDeleteModalData(content);
  const closeDeleteModal = () => setDeleteModalData(null);

  // Add content handler
  const handleCreateSubmit = async (formData) => {
    try {
      await dispatch(createTicket(formData)).unwrap();
      closeCreateModal();
    } catch (e) {
      alert("Failed to create content: " + (e?.message || "Unknown error"));
    }
  };

  // Edit content handler
  const handleEditSubmit = async (formData) => {
    try {
      await dispatch(editTicket({ id: editModalData._id, formData })).unwrap();
      closeEditModal();
    } catch (e) {
      alert("Failed to update content: " + (e?.message || "Unknown error"));
    }
  };

  // Delete content handler
  const handleDeleteConfirm = async () => {
    try {
      await dispatch(removeTicket(deleteModalData._id)).unwrap();
      closeDeleteModal();
    } catch (e) {
      alert("Failed to delete content: " + (e?.message || "Unknown error"));
    }
  };


  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
     
      <div className="flex flex-1 min-h-0">
        
        <LeftsideNavbar user={user} />

        <main className="flex flex-col md:px-10 px-4 py-8 bg-blue-50 min-h-0 w-full">
          <h1 className=" text-2xl md:text-4xl font-bold text-black mb-6">Journey</h1>
              <section className="p-6 m-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" text-base md:text-2xl font-semibold">Trip Details</h2>
        <button
          onClick={openCreateModal}
          className="bg-purple-600 hover:bg-purple-700 text-white  text-xs md:text-lg font-medium md:px-6 md:py-2 px-3 py-1 rounded-lg transition"
        >
          Create New Content
        </button>
      </div>

      {loading ? (
        <p>Loading contents...</p>
      ) : tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[250px]">
          <span className="text-6xl mb-3" role="img" aria-label="file">📝</span>
          <p className="text-lg text-gray-600 mb-4 text-center">
            You haven't created any content yet
          </p>
          <button
            onClick={openCreateModal}
            className="bg-purple-600 hover:bg-purple-700 text-white  px-3 py-2 :md:px-6 md:py-2 rounded-lg  text-sm md:text-base font-semibold"
          >
            Create Your First Content
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {["Trip", "Tickets", "Price", "Description", "Image", "Draw-Date", "Edit" , "Delete"].map(col => (
                  <th key={col} className="text-left p-3 border-b border-gray-300 whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map(({ _id, name, ticket, price, description, image, date, }) => (
                <tr key={_id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-300">{name}</td>
                  <td className="p-3 border-b border-gray-300">{ticket}</td>
                  <td className="p-3 border-b border-gray-300">₹{price}</td>
                  <td className="p-3 border-b border-gray-300 max-w-xs truncate" title={description}>{description}</td>
                  <td className="p-3 border-b border-gray-300">
                    {image ? (
                      <img src={image} alt="banner" className="h-12 w-20 object-cover rounded" />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-3 border-b border-gray-300">{new Date(date).toLocaleDateString()}</td>
                  <td className="p-3 border-b border-gray-300">
                    <button onClick={() => openEditModal(tickets.find(c => c._id === _id))} className="text-blue-600 ">Edit</button>
                  </td>
                  <td className="p-3 border-b border-gray-300">
                     <button onClick={() => openDeleteModal(tickets.find(c => c._id === _id))} className="text-red-600 ">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {createModalOpen && (
        <Modal onClose={closeCreateModal}>
          <CreateContentForm onSubmit={handleCreateSubmit} onCancel={closeCreateModal} />
        </Modal>
      )}

      {editModalData && (
        <Modal onClose={closeEditModal}>
          <CreateContentForm initialData={editModalData} onSubmit={handleEditSubmit} onCancel={closeEditModal} />
        </Modal>
      )}

      {deleteModalData && (
        <Modal onClose={closeDeleteModal}>
          <div>
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteModalData.title}"?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={closeDeleteModal} className="px-4 py-2 rounded border hover:bg-gray-100">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </section>
        </main>
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>
  );
}
