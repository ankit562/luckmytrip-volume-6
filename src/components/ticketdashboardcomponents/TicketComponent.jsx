import React from "react";

export const OfferCard = ({
  title,
  subtitle,
  badge,
  totalTickets,
  endsIn,
  price,
  country,
  drawDate,
  limitedTime =true,
}) => (
  <div className="w-full my-1 relative rounded-xl shadow-xl bg-gradient-to-r from-purple-900 to-purple-700 text-white overflow-hidden">
    <div className="absolute top-4 right-4 flex flex-col items-end space-y-2 z-10">
      {limitedTime && (
        <div className="bg-yellow-400 lg:px-4 lg:py-1 px-2 py-0.5 rounded-lg text-black font-semibold text-sm md:text-base">
          Limited Time
        </div>
      )}
      <div className="bg-white text-purple-700 rounded-xl px-4 py-2 text-center shadow-lg">
        <div className="lg:text-2xl md:text-xl text-sm font-bold">₹{price}</div>
        <div className="text-xs">{`From ${country}`}</div>
      </div>
    </div>

    <div className="px-4 lg:px-8 pt-10 pb-6">
      <h1 className="text-5xl font-extrabold">{title}</h1>
      <div className="text-2xl mt-3 mb-6 font-semibold">{subtitle}</div>
      <span className="inline-block bg-green-400 text-black rounded-md px-5 py-2 mb-8 font-semibold">{badge}</span>
      <div className="flex justify-between items-center bg-black/40 mt-3 mb-2 lg:px-4 lg:py-4 py-2 px-2 rounded-lg">
        <div>
          <div className="text-sm md:text-base text-white/80 font-semibold">Total Tickets</div>
          <div className="text-3xl font-bold text-yellow-400">{totalTickets}</div>
        </div>
        <div className="text-right">
          <div className="lg:text-base tetxt-sm text-white/80 font-semibold">Ends In</div>
          <div className="lg:text-2xl md:text-lg text-base font-bold text-yellow-400">{endsIn}</div>
        </div>
      </div>
      <div className="text-white/70 text-base mb-3">
        Draw Date: {drawDate} or earlier if sold out
      </div>
      
      {/* <div className="flex justify-end gap-3 mt-4">
        <button
          className="px-5 py-2 bg-white text-purple-900 rounded hover:bg-purple-200 font-semibold transition"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div> */}
    </div>
  </div>
);
