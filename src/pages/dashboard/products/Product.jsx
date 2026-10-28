import React, { useState, useEffect } from "react";
import Header from "../../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../../components/dashboardComponent/LeftsideNavbar";
import { useSelector, useDispatch } from 'react-redux';
import { fetchShopItems, createShopItem, editShopItem, removeShopItem } from '../../../features/shops/shopSlice';
import { fetchCoupons } from '../../../features/shops/couponSlice';
import toast from "react-hot-toast";

function CreateProductForm({ onCancel, onSubmit, initialData, coupons }) {
  // First option default fallback
  const defaultCoupon = coupons.length > 0 ? coupons[0].code : "none";

  const [form, setForm] = useState({
    title: initialData?.title || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    assignedCoupon: initialData?.assignedCoupon || defaultCoupon,
    image: null,
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
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("assignedCoupon", form.assignedCoupon);
    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    onSubmit(formData);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-2">{initialData ? "Edit Product" : "Add New Product"}</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
        <input
          name="title"
          placeholder="e.g. Travel Tee"
          value={form.title}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
        <input
          name="price"
          placeholder="799"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Product details..."
          value={form.description}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />
      </div>

      {/* Optional Coupon Dropdown (Defaults to first option) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Attach Coupon (Optional)</label>
        <select
          name="assignedCoupon"
          value={form.assignedCoupon}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2 bg-white"
        >
          <option value="none">-- No Coupon / Standard Price --</option>
          {coupons.map((coupon) => (
            <option key={coupon._id} value={coupon.code}>
              {coupon.code} (₹{coupon.discountAmount} Off)
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Select from your active database coupons.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
          required={!initialData}
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded border hover:bg-gray-100">Cancel</button>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">Save Product</button>
      </div>
    </form>
  );
}

export default function Product() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items: products = [], loading } = useSelector(state => state.shop);
  const { coupons = [] } = useSelector(state => state.coupons);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState(null);

  useEffect(() => {
    dispatch(fetchShopItems());
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleCreateSubmit = async (formData) => {
    try {
      await dispatch(createShopItem(formData)).unwrap();
      setCreateModalOpen(false);
      toast.success("Product added successfully!");
    } catch (e) {
      toast.error(e || "Failed to add product");
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await dispatch(editShopItem({ id: editModalData._id, formData })).unwrap();
      setEditModalData(null);
      toast.success("Product updated successfully!");
    } catch (e) {
      toast.error(e || "Failed to update product");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(removeShopItem(deleteModalData._id)).unwrap();
      setDeleteModalData(null);
      toast.success("Product deleted successfully!");
    } catch (e) {
      toast.error(e || "Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftsideNavbar user={user} />
        <main className="flex flex-col md:px-10 px-4 py-8 bg-blue-50 min-h-0 w-full">
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-6">Product Management</h1>
          <section className="p-6 m-6 bg-white rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base md:text-2xl font-semibold">Products Catalog</h2>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-lg font-medium md:px-6 md:py-2 px-3 py-1 rounded-lg transition"
              >
                Add New Product
              </button>
            </div>

            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[250px]">
                <span className="text-6xl mb-3">🛍️</span>
                <p className="text-lg text-gray-600 mb-4 text-center">No products added yet</p>
                <button onClick={() => setCreateModalOpen(true)} className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold">
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      {["Product Title", "Price", "Description", "Attached Coupon", "Image", "Edit", "Delete"].map(col => (
                        <th key={col} className="text-left p-3 border-b border-gray-300 whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-300 font-bold">{item.title}</td>
                        <td className="p-3 border-b border-gray-300">₹{item.price}</td>
                        <td className="p-3 border-b border-gray-300 max-w-xs truncate">{item.description}</td>
                        <td className="p-3 border-b border-gray-300">
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                            {item.assignedCoupon || "none"}
                          </span>
                        </td>
                        <td className="p-3 border-b border-gray-300">
                          {item.image ? (
                            <img src={item.image} alt="product" className="h-12 w-12 object-cover rounded" />
                          ) : (
                            <span className="text-gray-400 text-xs">No Image</span>
                          )}
                        </td>
                        <td className="p-3 border-b border-gray-300">
                          <button onClick={() => setEditModalData(item)} className="text-blue-600 hover:underline">Edit</button>
                        </td>
                        <td className="p-3 border-b border-gray-300">
                          <button onClick={() => setDeleteModalData(item)} className="text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {createModalOpen && (
              <Modal onClose={() => setCreateModalOpen(false)}>
                <CreateProductForm coupons={coupons} onSubmit={handleCreateSubmit} onCancel={() => setCreateModalOpen(false)} />
              </Modal>
            )}

            {editModalData && (
              <Modal onClose={() => setEditModalData(null)}>
                <CreateProductForm coupons={coupons} initialData={editModalData} onSubmit={handleEditSubmit} onCancel={() => setEditModalData(null)} />
              </Modal>
            )}

            {deleteModalData && (
              <Modal onClose={() => setDeleteModalData(null)}>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                  <p>Are you sure you want to delete product "{deleteModalData.title}"?</p>
                  <div className="mt-6 flex justify-end gap-4">
                    <button onClick={() => setDeleteModalData(null)} className="px-4 py-2 rounded border hover:bg-gray-100">Cancel</button>
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
        <button aria-label="Close modal" className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}