import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../../components/dashboardComponent/LeftsideNavbar";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchProducts,
  createProduct,
  editProduct,
  removeProduct,
} from "../../../features/products/productSlice";
import { fetchProfile } from "../../../features/auth/authUserSlice";
import toast from "react-hot-toast";

export default function Jackpot() {
  const dispatch = useDispatch();

  const { user, loading: authLoading, isInitialized } = useSelector(
    (state) => state.auth
  );
  const {
    products = [],
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);

  const [editId, setEditId] = useState(null); // null means add
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    image: null,
    imageUrl: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fetch user profile
  useEffect(() => {
    if (isInitialized && !user && !authLoading) {
      dispatch(fetchProfile());
    }
  }, [isInitialized, user, authLoading, dispatch]);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ---- Handlers ----

  const openAddModal = () => {
    setEditId(null);
    setFormData({ name: "", content: "", image: null, imageUrl: "" });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditId(product._id);
    setFormData({
      name: product.name,
      content: product.content,
      image: null,
      imageUrl: product.image || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: "", content: "", image: null, imageUrl: "" });
    setEditId(null);
  };

  const onFormChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file && file.size < 2 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = (ev) =>
          setFormData((prev) => ({ ...prev, image: file, imageUrl: ev.target.result }));
        reader.readAsDataURL(file);
      } else {
        toast.error("Max image size: 2MB");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("content", formData.content);

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      if (editId === null) {
        // Create
        await dispatch(createProduct(data)).unwrap();
      } else {
        // Edit
        await dispatch(editProduct({ id: editId, formData: data })).unwrap();
      }
      closeModal();

      toast.success(`Product ${editId === null ? "added" : "updated"} successfully`);

    } catch (err) {
      toast("Error saving product: " + err.message);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setDeleteModalOpen(false);
  };

  const onDeleteConfirm = async () => {
    try {
      await dispatch(removeProduct(deleteId)).unwrap();
      closeDeleteModal();
      dispatch(fetchProducts());
      toast.success("Product deleted successfully");
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  // ---- Render ----
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftsideNavbar user={user} />
        <main className="flex flex-col lg:px-10 md:px-4 px-2 md:py-8 py-4 bg-blue-50 min-h-0 w-full">
          <h1 className="text-xl md:text-3xl font-bold text-black md:mt-0 mt-5 mb-4">
            Jackpot
          </h1>

          <button
            onClick={openAddModal}
            className="mb-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 max-w-xs"
          >
            Add New Product
          </button>

          {productsLoading ? (
            <p>Loading products...</p>
          ) : productsError ? (
            <p className="text-red-500 text-center">Error loading products: {productsError}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border bg-white rounded shadow overflow-x-auto text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 border-b">Name</th>
                    <th className="p-3 border-b">Image</th>
                    <th className="p-3 border-b">Content</th>
                    <th className="p-3 border-b">Edit</th>
                    <th className="p-3 border-b">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products.filter((prod) => prod.name === "jackpot")
                    .map((prod) => (
                      <tr key={prod._id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{prod.name}</td>
                        <td className="p-3">
                          {prod.image && (
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                        </td>
                        <td className="p-3 max-w-lg truncate">{prod.content}</td>
                        <td className="p-3">
                          <button
                            onClick={() => openEditModal(prod)}
                            className="bg-yellow-300 px-3 py-1 rounded hover:bg-yellow-400"
                          >
                            Edit
                          </button>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => openDeleteModal(prod._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}


          {/* Edit/Add Modal */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                  aria-label="Close modal"
                >
                  ×
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {editId === null ? "Add Product" : "Edit Product"}
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={onFormChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Image</label>
                    {formData.imageUrl && (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded mb-2"
                      />
                    )}
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={onFormChange}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={onFormChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      {editId === null ? "Add" : "Save"}
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded shadow-lg max-w-sm w-full p-6 relative">
                <h3 className="text-xl font-semibold mb-4">Delete Confirmation</h3>
                <p className="mb-6">Are you sure you want to delete this product?</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onDeleteConfirm}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
