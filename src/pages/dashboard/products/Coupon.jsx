import React, { useState, useEffect } from "react";
import Header from "../../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../../components/dashboardComponent/LeftsideNavbar";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoupons, createCoupon, editCoupon, removeCoupon } from '../../../features/shops/couponSlice';
import toast from "react-hot-toast";

function CreateCouponForm({ onCancel, onSubmit, initialData }) {
  const [form, setForm] = useState({
    code: initialData?.code || "",
    discountAmount: initialData?.discountAmount || "",
    maxQuantity: initialData?.maxQuantity || "",
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-2">{initialData ? "Edit Coupon" : "Create New Coupon"}</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
        <input
          name="code"
          placeholder="e.g. TEE100"
          value={form.code}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2 uppercase"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Amount / Value (₹)</label>
        <input
          name="discountAmount"
          placeholder="e.g. 100"
          type="number"
          min="0"
          value={form.discountAmount}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Claim Limit / Quantity per user</label>
        <input
          name="maxQuantity"
          placeholder="e.g. 10"
          type="number"
          min="1"
          value={form.maxQuantity}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          checked={form.isActive}
          onChange={handleChange}
          className="h-4 w-4 text-purple-600 rounded border-gray-300"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active Status</label>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded border hover:bg-gray-100">Cancel</button>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">Save Coupon</button>
      </div>
    </form>
  );
}

export default function Coupon() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { coupons = [], loading } = useSelector(state => state.coupons);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState(null);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleCreateSubmit = async (formData) => {
    try {
      await dispatch(createCoupon(formData)).unwrap();
      setCreateModalOpen(false);
      toast.success("Coupon created successfully!");
    } catch (e) {
      toast.error(e || "Failed to create coupon");
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      await dispatch(editCoupon({ id: editModalData._id, couponData: formData })).unwrap();
      setEditModalData(null);
      toast.success("Coupon updated successfully!");
    } catch (e) {
      toast.error(e || "Failed to update coupon");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(removeCoupon(deleteModalData._id)).unwrap();
      setDeleteModalData(null);
      toast.success("Coupon deleted successfully!");
    } catch (e) {
      toast.error(e || "Failed to delete coupon");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftsideNavbar user={user} />
        <main className="flex flex-col md:px-10 px-4 py-8 bg-blue-50 min-h-0 w-full">
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-6">Coupon Management</h1>
          <section className="p-6 m-6 bg-white rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base md:text-2xl font-semibold">Active Coupons List</h2>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-lg font-medium md:px-6 md:py-2 px-3 py-1 rounded-lg transition"
              >
                Create New Coupon
              </button>
            </div>

            {loading ? (
              <p>Loading coupons...</p>
            ) : coupons.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[250px]">
                <span className="text-6xl mb-3">🎟️</span>
                <p className="text-lg text-gray-600 mb-4 text-center">No coupons created yet</p>
                <button onClick={() => setCreateModalOpen(true)} className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold">
                  Create Your First Coupon
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      {["Code", "Discount (₹)", "Max Quantity", "Status", "Edit", "Delete"].map(col => (
                        <th key={col} className="text-left p-3 border-b border-gray-300 whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-300 font-bold text-purple-700">{item.code}</td>
                        <td className="p-3 border-b border-gray-300">₹{item.discountAmount}</td>
                        <td className="p-3 border-b border-gray-300">{item.maxQuantity}</td>
                        <td className="p-3 border-b border-gray-300">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
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
                <CreateCouponForm onSubmit={handleCreateSubmit} onCancel={() => setCreateModalOpen(false)} />
              </Modal>
            )}

            {editModalData && (
              <Modal onClose={() => setEditModalData(null)}>
                <CreateCouponForm initialData={editModalData} onSubmit={handleEditSubmit} onCancel={() => setEditModalData(null)} />
              </Modal>
            )}

            {deleteModalData && (
              <Modal onClose={() => setDeleteModalData(null)}>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                  <p>Are you sure you want to delete coupon "{deleteModalData.code}"?</p>
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