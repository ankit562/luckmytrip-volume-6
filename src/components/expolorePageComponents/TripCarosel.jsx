import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import {
  setDubaiQtys,
  setThailandQtys,
  setGoaQtys
} from '../../features/addtocart/addtocartSlice';


const images = [
    "/images/MaskGroup.png",
    "/images/MaskGroup.png",
    "/images/MaskGroup.png"
];

const rightImages = [
    "/images/MaskGroup2.png",
    "/images/MaskGroup2.png",
    "/images/MaskGroup2.png"
];

const destinations = [
    "DUBAI",
    "THAILAND",
    "GOA"
];

const TripCarosel = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const dubaiQty = useSelector(state => state.addtocart?.cartItems?.dubaiQty || 0);
     const thailandQty = useSelector(state => state.addtocart?.cartItems?.thailandQty || 0);
    const goaQty = useSelector(state => state.addtocart?.cartItems?.goaQty || 0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sync carousels and headings
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Manual control (arrows/buttons)
    const goTo = (index) => {
        setCurrentIndex(index);
    };

    const next = () => setCurrentIndex(prev => (prev + 1) % images.length);
    const prev = () => setCurrentIndex(prev => (prev - 1 + images.length) % images.length);

    //const handledubai = () => {
        //dispatch(setDubaiQtys(dubaiQty + 1));
        //navigator("/ticket", { state: { fromdubaicarosel: true } });
       // toast.success("Redirecting to Ticket Page");
    //};
    const handleSelectTrip = () => {
  const selected = destinations[currentIndex];

  if (selected === "DUBAI") {
    dispatch(setDubaiQtys(dubaiQty > 0 ? dubaiQty + 1 : 1));
    navigator("/ticket", { state: { fromdubai1: true } });
  }

  if (selected === "THAILAND") {
    dispatch(setThailandQtys(thailandQty > 0 ? thailandQty + 1 : 1));
    navigator("/ticket", { state: { fromthailand1: true } });
  }

  if (selected === "GOA") {
    dispatch(setGoaQtys(goaQty > 0 ? goaQty + 1 : 1));
    navigator("/ticket", { state: { fromgoa1: true } });
  }

  toast.success("Redirecting to Ticket Page");
};



    return (
        <div className="bg-[#edf8fd] flex justify-center items-center min-h-screen md:mt-0">
            <div className="max-w-7xl w-full flex flex-col lg:flex-row lg:px-32 px-5 mx-auto ">

                {/* Left Carousel */}
                <div className="w-full md:w-[70%]  flex-col items-center lg:gap-6 relative hidden lg:block">
                    {/* ... heading ... */}
                    <div className="absolute top-0 lg:left-[-85px] left-[20px] w-full z-20">
                        <h1 className="font-bold text-5xl leading-[1] mt-3">
                            <span className="font-berlin text-stroke-red text-[30px] lg:text-[62px]">
                                Win Your
                            </span>
                            <br />
                            <span className="text-[#19c6b2] font-berlin text-[30px] lg:text-[60px]">
                                Dream
                            </span>
                            <br />
                            <span className="text-[#19c6b2] font-berlin text-[30px] lg:text-[50px]">
                                Trip
                            </span>
                        </h1>
                    </div>

                    {/* Image carousel */}
                    <div className="overflow-hidden w-full mx-auto md:max-w-[650px] rounded-[30px]">
                        <div className="slider-track flex transition-transform duration-700"
                            style={{ transform: `translateX(-${currentIndex * 100}% )` }}>
                            {images.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    className="w-full flex-shrink-0 object-cover rounded-[30px]"
                                    alt={`Slide ${i + 1}`}
                                    style={{ minWidth: "100%" }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Carousel Controls */}
                    <div className="absolute bottom-0 lg:left-[-135px] w-full flex gap-2 items-center">
                        <span onClick={prev}
                            className="mx-3 cursor-pointer text-gray-400 text-3xl py-1 px-2 rounded transition"
                        >
                            &larr;
                        </span>
                        <span className="text-xl">{String(currentIndex + 1).padStart(2, "0")}</span>
                        <span onClick={next}
                            className="mx-3 cursor-pointer text-gray-700 text-3xl py-1 px-2 rounded transition"
                        >
                            &rarr;
                        </span>
                    </div>
                </div>

                {/* Right Carousel and Heading */}
                <div className="lg:w-[30%] w-full flex flex-col py-0 items-start">
                    <div className="relative mb-5 w-full">
                        <button onClick={prev}
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 py-2 px-3
               bg-white/40 rounded-full shadow lg:hidden"
                        >
                            &#8592;
                        </button>
                        <button onClick={next}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 py-2 px-3
               bg-white/40 rounded-full shadow lg:hidden"
                        >
                            &#8594;
                        </button>

                        {/* Small carousel for mobile */}
                        <div className="overflow-hidden w-full rounded-[20px] lg:hidden"
                            style={{ touchAction: "pan-y pinch-zoom" }}>
                            <div className="slider-track flex transition-transform duration-700"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {rightImages.map((src, i) => (
                                    <div key={i} className="w-full flex-shrink-0">
                                        <img src={src} className="w-full object-cover" alt={`Small ${i + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right carousel for desktop */}
                        <div className="overflow-hidden w-full rounded-[20px] hidden lg:block">
                            <div className="slider-track flex transition-transform duration-700"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {rightImages.map((src, i) => (
                                    <img key={i} src={src} className="w-full flex-shrink-0 object-cover" alt={`Right ${i + 1}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Dynamic heading & CTA */}
                    <div className="lg:mb-6 ">
                        <div className="md:mb-6  font-open-sans font-extrabold">
                            <span className="block text-[#0d3559] text-xl lg:text-[60px]">
                                FLY TO
                            </span>
                            <span className="block text-[#f6b21d] text-xl lg:text-[38px] md:mt-3">
                                {destinations[currentIndex]}
                            </span>
                        </div>

                        <button
                            onClick={handleSelectTrip}
                            className="lg:mt-7 mt-4 bg-[#8ac541] text-white 
                lg:py-5 lg:px-6 py-2 px-3 text-sm lg:text-2xl rounded-[100%] 
                shadow-lg hover:bg-[#3d660b] transition font-bold"
                        >
                            ➜
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripCarosel;
