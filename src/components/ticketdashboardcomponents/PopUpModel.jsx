import React from "react";

const PopUpModal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-6 min-w-[320px] w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-purple-700">{title}</h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-500 hover:text-red-600 px-2 py-0 rounded">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
export default PopUpModal;
