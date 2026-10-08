import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../../components/dashboardComponent/LeftsideNavbar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchProducts,
  createProduct,
  editProduct,
  removeProduct,
} from "../../../features/products/productSlice"; 

import { fetchProfile } from "../../../features/auth/authUserSlice";

export default function TripInfo() {
  const dispatch = useDispatch();
  const { user, loading: authLoading, isInitialized } = useSelector(
    (state) => state.auth
  );
  const { products, loading: productsLoading, error: productsError } = useSelector(
    (state) => state.products
  );

  const [editId, setEditId] = useState(null); 
  const [editData, setEditData] = useState({
    name: "",
    content: "",
    image: null,
    imageUrl: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (isInitialized && !user && !authLoading) {
      dispatch(fetchProfile());
    }
  }, [isInitialized, user, authLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Open add new modal
  const onAddNew = () => {
    setEditId(null);
    setEditData({
      name: "",
      content: "",
      image: null,
      imageUrl: "",
    });
    setIsEditModalOpen(true);
  };

  // Open edit modal
  const onEdit = (product) => {
    setEditId(product._id);
    setEditData({
      name: product.name,
      content: product.content,
      image: null,
      imageUrl: product.image || "",
    });
    setIsEditModalOpen(true);
  };

  // Close modal
  const onCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditData({ name: "", content: "", image: null, imageUrl: "" });
    setEditId(null);
  };

  // Handle form changes incl. image upload preview
  const onFormChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file && file.size < 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = (evt) =>
          setEditData((prev) => ({
            ...prev,
            image: file,
            imageUrl: evt.target.result,
          }));
        reader.readAsDataURL(file);
      } else {
        alert("Max image size: 1MB");
      }
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Confirm add or edit
  const onConfirmEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("content", editData.content);
      if (editData.image instanceof File) {
        formData.append("image", editData.image);
      }

      if (editId === null) {
        await dispatch(createProduct(formData)).unwrap();
      } else {
        await dispatch(editProduct({ id: editId, formData })).unwrap();
      }
      onCancelEdit();
    } catch (err) {
      alert("Failed to save product: " + err.message);
    }
  };

  // Open delete modal
  const onDelete = (product) => {
    setDeleteId(product._id);
    setIsDeleteModalOpen(true);
  };

  // Cancel delete modal
  const cancelDelete = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    try {
      await dispatch(removeProduct(deleteId)).unwrap();
      cancelDelete();
    } catch (err) {
      alert("Failed to delete product: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftsideNavbar user={user} />
        <main className="flex flex-col md:px-10 px-4 py-8 bg-blue-50 min-h-0 w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">TripInfo Slide</h1>

          <div
            onClick={onAddNew}
            className="flex justify-start items-center cursor-pointer px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 max-w-32 md:max-w-36 mb-2 gap-1"
          >
            <IoIosAddCircleOutline className="w-5 h-5" />
            <button className="text-sm md:text-base">Add Field</button>
          </div>

          {productsLoading ? (
            <p>Loading contents...</p>
          ) : productsError ? (
            <p className="text-red-500 text-center">Error loading products: { productsError}</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="min-w-full border text-sm bg-white rounded shadow overflow-x-auto">
                <thead>
                  <tr className="bg-gray-100 text-sm md:text-base">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Content</th>
                    <th className="p-3 text-left">Edit</th>
                    <th className="p-3 text-left">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-t hover:bg-gray-50 ">
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="md:w-12 md:h-12 w-10 h-10 object-cover rounded"
                          />
                        )}
                      </td>
                      <td className="p-3 max-w-md truncate text-sm md:text-base">{product.content}</td>
                      <td className="p-3 space-x-1">
                        <button
                          onClick={() => onEdit(product)}
                          className="text-blue-600 hover:underline bg-yellow-100 px-2 py-1"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="p-3 space-x-1 ">
                        <button
                          onClick={() => onDelete(product)}
                          className="text-red-600 hover:underline bg-red-100 px-2 py-1"
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
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg p-3 md:p-6 md:w-full w-[90%] max-w-md relative overflow-auto max-h-[90vh]">
                <button
                  onClick={onCancelEdit}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                  aria-label="Close edit form"
                >
                  ×
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {editId === null ? "Add Trip Info" : "Edit Trip Info"}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onConfirmEdit();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                      name="name"
                      type="text"
                      value={editData.name}
                      onChange={onFormChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Image</label>
                    {editData.imageUrl && (
                      <img
                        src={editData.imageUrl}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded mb-2"
                      />
                    )}
                    <input name="image" type="file" accept="image/*" onChange={onFormChange} />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Content</label>
                    <textarea
                      name="content"
                      value={editData.content}
                      onChange={onFormChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      {editId === null ? "Add" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={onCancelEdit}
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
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg md:p-6 p-3 md:w-full w-[90%] max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
                <p className="mb-6">Are you sure you want to delete this trip info?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
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
