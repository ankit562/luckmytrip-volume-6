// TripSection.jsx
import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  setGiftQtys
} from '../../features/addtocart/addtocartSlice';
import { useDispatch } from "react-redux";

export default function TripSection({
  trip,
  qty,
  onIncrement,
  onDecrement,
  onAddToCart,
  onBuyMore,
 

}){

  const dispatch = useDispatch();



  const features = [
    { text: `Return Ticket from India to ${trip.name}`, available: true },
    { text: "Pick & drop from airport", available: true },
    { text: "VISA", available: false },
    { text: "3 Star hotel for 2 nights with breakfast", available: true },
    { text: "Basic City Tour", available: true },
    { text: "Lunch, Dinner and Alcohol", available: false },
  ];
  
  const navigator = useNavigate();
  const handleGift = () => {
    dispatch(setGiftQtys(1))
    navigator("/addtocart", { state: { giftprice4: 49, giftQty: 1, isGift: true } });
     toast.success("Gift  is added to cart");
  }
  // useEffect(()=>{
  //   dispatch(setGiftQtys(1))

  // },[dispatch ])

  return (
    <section className="bg-[#edf8fd] py-10">
      <div className="container mx-auto md:px-4 px-0.5 max-w-5xl">
        <h1 className="font-berlin text-4xl font-bold text-[#ef3232] mb-6 uppercase">
          {trip.name} Trip
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left — Trip Card */}
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-md h-80">
            <img src={trip.image} alt={trip.name} className="absolute inset-0 w-full h-full object-cover z-10 " />
            <img src={"/images/shade.png"} alt="shade" className="absolute inset-0 w-full h-full object-cover z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
            <div className="absolute z-30 py-10 px-2  md:px-4 md:py-6 w-full h-full flex flex-col justify-between text-white">
              <div className="flex justify-between items-center">
                <div className="font-berlin md:text-8xl text-5xl font-bold leading-none">WIN</div>
                <div className="text-right">
                  <div className="font-berlin text-2xl md:text-5xl font-bold">{trip.name[0].toUpperCase() + trip.name.slice(1)}</div>
                  <span className="font-montserrat inline-block bg-yellow-400 text-gray-900 font-semibold px-1 py-0.5 md:py-1 md:px-1 rounded-lg text-xs md:text-sm mt-2">
                    {trip.description}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-end gap-1 mb-2">
                    <div className="font-berlin flex flex-col items-center text-sm leading-tight">
                      <span className="font-bold">Buy</span><span>Rs</span>
                    </div>
                    <span className="font-berlin text-4xl md:text-5xl font-bold text-yellow-400">{trip.price}</span>
                    <div className="font-berlin flex flex-col items-start text-sm leading-tight">
                      <span className="font-bold">From</span><span>India</span>
                    </div>
                  </div>
                  <p className="font-montserrat text-xs">
                    Draw Date: {new Date(trip.date).toLocaleDateString()}
                    <br />earlier if sold out
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-montserrat text-xs font-bold block">Total Tickets</span>
                  <span className="font-berlin text-4xl md:text-5xl font-bold text-yellow-300 block">{trip.ticket}</span>
                  <button className="font-montserrat mt-2 bg-[#ef3232] hover:bg-[#d32c2c] text-white font-bold text-xs md:text-sm px-4 py-2 rounded-lg">
                    BUY TICKET
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Controls */}
          <div className="relative">
            <div className="relative h-80 flex items-center justify-center">
              <button
                className="absolute left-0 bg-white shadow-md hover:bg-gray-100 rounded-full
                 w-10 h-10 flex items-center justify-center z-30"

                style={{ backgroundColor: "#8AC43F" }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <img src={"/images/Vector.png"} alt="Outline" className="lg:w-[340px] lg:h-[300px]  object-contain 
               md:h-96  md:w-[80%]  w-[80%] h-[370px] relative z-0 " />

              <img src={"/images/bag.png"} alt="Luggage" className="absolute lg:w-[250px] lg:h-[250px] 
               md:w-2xl md:h-[430px] w-lg h-[70%]
              
                 object-contain z-10  drop-shadow-2xl  md:right-6 right-3" />

              <div className="absolute bottom-30 left-28 z-10 text-left lg:top-28 md:mt-[-30px] lg:ml-[-12px] md:ml-4 ml-[-43px] top-[7.1rem]">
                <h3 className="font-berlin lg:text-3xl md:text-5xl text-sm font-bold text-[#21b8b3] uppercase leading-tight mb-1">
                 {trip.name}<br /> TRIP TICKET
                </h3>
                {/* <p className="font-montserrat text-blue-900 font-bold text-xs md:text-lg lg:text-sm">{trip.name} TRIP TICKET</p> */}
                <p className="font-montserrat text-blue-900 lg:text-xs text-xs md:text-base mb-2">(one person)</p>
                <button onClick={handleGift} className="font-montserrat bg-[#ef3232] hover:bg-[#d41313] text-white font-bold md:px-4 md:py-1 
                rounded lg:text-sm text-sm md:text-xl lg:mr-0 md:ml-4 lg:mt-0 md:mt-2 mt-0 px-2 py-1">
                  GIFT BUY
                </button>
              </div>

              <button
                className="absolute right-0 shadow-md hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-30"
                style={{ backgroundColor: "#8AC43F" }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-4 mt-4">
              <div className="flex items-center border-2 border-gray-600 rounded-md px-2 py-1 bg-white">
                <button onClick={onDecrement} className="font-montserrat w-6 h-6 rounded bg-gray-100 font-bold">-</button>
                <span className="font-montserrat px-3 font-bold">{qty}</span>
                <button onClick={onIncrement} className="font-montserrat w-6 h-6 rounded bg-green-400 text-white font-bold">+</button>
              </div>
              <button onClick={onAddToCart} className="font-montserrat bg-[#ef3232] hover:bg-[#d41313] text-white font-bold px-6 py-2 rounded-lg">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mb-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full ${f.available ? "bg-green-500" : "bg-red-500"} flex items-center justify-center`}>
                {f.available ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-white" />}
              </div>
              <span className="font-montserrat text-sm text-gray-700">{f.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={onBuyMore} className="bg-[#2CB4AD] hover:bg-teal-500 text-white font-bold px-6 py-2.5 rounded-lg mb-2 uppercase tracking-wide">
            +Buy More Tickets
          </button>
          <p className="text-gray-700 text-sm font-medium">Buy More Tickets To Increase Your Chances Of Winning!</p>
        </div>
      </div>
      <hr className="border-t-2 border-gray-300 mx-auto max-w-4xl my-8" />
    </section>

  );
}
