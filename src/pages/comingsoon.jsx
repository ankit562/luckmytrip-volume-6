 import React, { useEffect } from 'react';
import Header from '../components/commonComponent/Header';
import Footer from '../components/commonComponent/Footer';

// Desktop Horizontal Image
import desktopBg from '../components/assets/images/Gemini_Generated_Image_7eh40e7eh40e7eh4.png';
// Mobile/Portrait Vertical Image
import mobileBg from '../components/assets/images/Luck Trip Travel Merchandise Mockup.png';

const ComingSoon = () => {
  // Inject Google Fonts dynamically
  useEffect(() => {
    const linkFont = document.createElement('link');
    linkFont.href =
      'https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Work+Sans:wght@400;500;600;700&display=swap';
    linkFont.rel = 'stylesheet';
    document.head.appendChild(linkFont);
  }, []);

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Header section */}
      <Header />

      {/* Main Container */}
      <div className="relative w-screen h-screen overflow-hidden bg-[#F8FAFC] select-none font-['Work_Sans',sans-serif] flex items-center justify-center">
        
        {/* ----------------- MOBILE / PORTRAIT LAYOUT (< 768px) ----------------- */}
        <div className="block md:hidden relative w-full h-full max-w-[500px] overflow-hidden bg-white flex flex-col justify-between shadow-sm">
          {/* Vertical Poster Background */}
          <img
            src={mobileBg}
            alt="Luck Trip Travel Merchandise Poster"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Content Overlay */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-7 sm:p-9">
            
            {/* Top Left Text */}
            <div className="w-[82%] pt-3 mt-16 sm:mt-12">
              {/* Main Headline */}
              <h1 
                className="text-3xl sm:text-4xl font-extrabold text-[#04415D] leading-[1.05] uppercase mb-3 tracking-wide"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                WHAT IS<br />
                LUCK MY TRIP?
              </h1>

              {/* Sub-headline */}
              <p className="text-sm sm:text-base font-bold text-[#0C4765] leading-snug mb-3">
                Premium travel merchandise—with an extra reason to share your journey.
              </p>

              {/* 3-Line Body Description */}
              <p className="text-xs sm:text-sm font-semibold text-[#1D4C5C] leading-relaxed">
                Buy any product. Post your creative story.<br />
                Our panel selects one standout story each week for a travel reward.
              </p>
            </div>

            {/* Bottom Left Button & Legal Section */}
            <div className="pb-6 pt-2">
              <button className="bg-[#EF3842] hover:bg-[#d82a34] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer">
                <span>COMING SOON</span>
                <span className="text-base leading-none">&rarr;</span>
              </button>

              <p className="text-[10px] sm:text-xs text-slate-600 font-semibold mt-2.5 pl-1">
                Judged promotion. Eligibility and terms apply.
              </p>
            </div>

          </div>
        </div>


        {/* ----------------- DESKTOP / WIDESCREEN LAYOUT (>= 768px) ----------------- */}
        <div className="hidden md:flex relative w-full h-[100vh] max-h-[950px] items-center justify-center">
          
          {/* Horizontal Background Image with a subtle gradient mask at the top to blend edges */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <img
              src={desktopBg}
              alt="Luck Trip Travel Merchandise Background"
              className="w-full h-full object-contain object-right"
            />
            {/* Soft gradient overlay at the very top edge to eliminate color contrast lines */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#F8FAFC] to-transparent opacity-85"></div>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 w-full h-full flex flex-col justify-between p-10 lg:p-14">
            
            {/* Upper Section */}
            <div className="max-w-xl lg:max-w-2xl pt-4 pl-6 lg:pl-10">
              <h1 
                className="text-5xl lg:text-6xl font-extrabold text-[#04415D] leading-[1.05] uppercase mb-4 lg:mb-6 tracking-wide drop-shadow-sm"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                WHAT IS<br />
                LUCK MY TRIP?
              </h1>

              <p className="text-xl lg:text-2xl font-bold text-[#0C4765] leading-snug mb-4 lg:mb-5 max-w-lg">
                Premium travel merchandise—with an extra reason to share your journey.
              </p>

              <p className="text-base lg:text-lg font-semibold text-[#1D4C5C] leading-relaxed max-w-md">
                Buy any product. Post your creative story.<br />
                Our panel selects one standout story each week for a travel reward.
              </p>
            </div>

            {/* Lower Left Button & Legal */}
            <div className="pb-6 pl-6 lg:pl-10">
              <button className="bg-[#EF3842] hover:bg-[#d82a34] text-white font-bold text-base lg:text-lg px-8 py-3.5 rounded-full shadow-lg flex items-center gap-3 transition-transform active:scale-95 cursor-pointer">
                <span>COMING SOON</span>
                <span className="text-xl leading-none">&rarr;</span>
              </button>

              <p className="text-xs lg:text-sm text-slate-600 font-semibold mt-3 pl-1">
                Judged promotion. Eligibility and terms apply.
              </p>
            </div>

          </div>
        </div>

      </div>
       <Footer />
    </div>
   
  );
};

export default ComingSoon;