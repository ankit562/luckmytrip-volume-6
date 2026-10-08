import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTickets,
  createTicket,
  editTicket,
  removeTicket,
} from "../../features/tickets/ticketSlice";

function CreateContentForm({ onCancel, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    ticket: initialData?.ticket || "",
    date: initialData?.date ? initialData.date.slice(0, 10) : "",
    image: null,
    category: initialData?.category || "offer",
    status: initialData?.status || "publish",
  });

  // Preview for existing or newly picked image
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file || null }));
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(initialData?.image || "");
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (key === "image") {
        // Append image only if a new file is chosen (File instance)
        if (form.image instanceof File) {
          formData.append("image", form.image);
        }
        // Do not append image field if editing and no new image is selected
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
        required={!initialData}
      />
      {/* Show preview of existing or newly selected image */}
      {imagePreview && (
        <div>
          <p className="mt-2 text-sm font-semibold">Image Preview:</p>
          <img
            src={imagePreview}
            alt="Preview"
            className="h-24 mt-1 rounded object-cover"
          />
        </div>
      )}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border rounded w-full px-2 py-1"
      >
        <option value="offer">Offer</option>
        <option value="event">Event</option>
      </select>
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border rounded w-full px-2 py-1"
      >
        <option value="publish">Publish</option>
        <option value="archived">Archived</option>
      </select>
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

export default function MyContentEmpty() {
  const dispatch = useDispatch();

  const { tickets = [], loading } = useSelector((state) => state.tickets || {});

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
    <section className="p-6 m-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base md:text-2xl font-semibold">My Content</h2>
        <button
          onClick={openCreateModal}
          className="bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-lg font-medium md:px-6 md:py-2 px-3 py-1 rounded-lg transition"
        >
          Create New Content
        </button>
      </div>

      {loading ? (
        <p>Loading contents...</p>
      ) : tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[250px]">
          <span className="text-6xl mb-3" role="img" aria-label="file">
            📝
          </span>
          <p className="text-lg text-gray-600 mb-4 text-center">
            You haven't created any content yet
          </p>
          <button
            onClick={openCreateModal}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 md:px-6 md:py-2 rounded-lg text-sm md:text-base font-semibold"
          >
            Create Your First Content
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Name",
                  "Tickets",
                  "Price",
                  "Description",
                  "Image",
                  "Darw-Date",
                  "Status",
                  "Category",
                  "Edit",
                  "Delete",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left p-3 border-b border-gray-300 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map(
                ({
                  _id,
                  name,
                  ticket,
                  price,
                  description,
                  image,
                  date,
                  status,
                  category,
                }) => (
                  <tr key={_id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-300">{name}</td>
                    <td className="p-3 border-b border-gray-300">{ticket}</td>
                    <td className="p-3 border-b border-gray-300">₹{price}</td>
                    <td
                      className="p-3 border-b border-gray-300 max-w-xs truncate"
                      title={description}
                    >
                      {description}
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      {image ? (
                        <img
                          src={image}
                          alt="banner"
                          className="h-12 w-20 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      {new Date(date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b border-gray-300">{status}</td>
                    <td className="p-3 border-b border-gray-300">{category}</td>
                    <td className="p-3 border-b border-gray-300">
                      <button
                        onClick={() => openEditModal(tickets.find((c) => c._id === _id))}
                        className="text-blue-600 "
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <button
                        onClick={() => openDeleteModal(tickets.find((c) => c._id === _id))}
                        className="text-red-600 "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
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
          <CreateContentForm
            initialData={editModalData}
            onSubmit={handleEditSubmit}
            onCancel={closeEditModal}
          />
        </Modal>
      )}

      {deleteModalData && (
        <Modal onClose={closeDeleteModal}>
          <div>
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteModalData.title}"?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={closeDeleteModal} className="px-4 py-2 rounded border hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
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
