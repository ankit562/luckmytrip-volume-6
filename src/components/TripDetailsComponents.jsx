// Reusable OfferCard component
import React from "react";
export
  function OfferCard({
    mainImage,
    shadeImage,
    mainText,
    location,
    subtitle,
    price,
    currency,
    fromLocation,
    drawDate,
    totalTickets,
    onClick,

  }) {
  return (
    <div onClick={onClick} className="relative font-montserrat bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-md md:w-full  flex items-end mb-7 lg:mb-0 cursor-pointer">
      <img
        src={mainImage}
        alt={location}
        className="inset-0 w-full max-w-full block h-full object-cover rounded-xl md:rounded-3xl z-10"
      />
      <img
        src={shadeImage}
        alt={`${location} shade`}
        className="absolute inset-0 w-full max-w-full block h-full object-cover rounded-xl md:rounded-3xl z-20"
      />

      <div className="absolute z-30 p-4 w-full flex flex-col h-full justify-between">
        <div className="flex justify-between w-full xl:h-[30%] md:h-[40%] sm:[40%]  items-center xl:mt-5">
          <div className="flex justify-start items-end">
            <span className="md:ml-3 font-berlin text-white font-bold text-[50px] xl:mt-16
            sm:text-[70px] md:text-[90px] leading-[0.9] tracking-tight">
              {mainText}
            </span>
          </div>
          <div className="flex flex-col items-end space-y-4">
            <span className="text-white font-bold md:text-[55px] text-[30px] leading-[0.9] tracking-tight xl:mt-20">
              {location[0].toUpperCase() + location.slice(1)}
            </span>

          </div>
        </div>

        <div className="flex justify-between w-full xl:h-[70%] md:h-[60%]  sm:h-[60%]   items-center xl:mt-0 mt-[-80px]">
          <div className="flex flex-col items-start justify-start space-y-5 md:ml-4 " >
            <div className="mt-8 mb-0 flex justify-start items-center md:gap-1 ">
              <div className="flex flex-col items-center justify-start leading-[0.7]">
                <span className="block text-white text-sm md:text-base lg:text-lg font-bold leading-0.8">Buy<br/>RS</span>
                {/* <span className="text-white font-bold text-sm md:text-lg">{currency}</span> */}
              </div>
              <span className="text-yellow-400 text-3xl md:text-5xl font-extrabold leading-[0.5] ">
                {price}
              </span>
              <div className="flex flex-col items-start justify-start leading-[0.7]">
                <span className="block text-white lg:text-lg md:text-base text-sm font-bold">From</span>
                <span className="text-white font-bold md:text-base text-sm align-top">{fromLocation}</span>
              </div>
            </div>
            <p className="text-white text-[9px] sm:text-sm font-normal flex-wrap">
              Draw Date: {drawDate} or{window.innerWidth > 640 && <br />} earlier if the campaign is sold out
            </p>
            <p className="text-white bg-yellow-400 px-1 py-0.5 rounded-md text-[9px] sm:text-sm font-normal flex-wrap">
               Term & Conditions Apply    
            </p>

          </div>

          <div className="mt-8 mb-0 flex flex-col justify-start items-center space-y-3 space-x-1">
            <span className="mt-1 inline-block bg-yellow-400 text-[#183f68] 
             font-semibold md:py-1 py-1/2 px-1 md:px-3 rounded-md md:rounded-lg text-[8px] md:text-base">
              {subtitle}
            </span>
            <div className="flex flex-col items-start pl-4">
              <span className="text-white text-xs sm:text-sm opacity-95 md:font-extrabold font-semibold leading-none">Total Tickets</span>
              <span className="text-yellow-300 text-lg sm:text-3xl opacity-95 font-extrabold mt-0 leading-none">{totalTickets}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
