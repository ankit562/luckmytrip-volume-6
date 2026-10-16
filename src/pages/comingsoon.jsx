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
      <div className="relative w-full overflow-hidden bg-[#F8FAFC] select-none font-['Work_Sans',sans-serif] flex items-center justify-center py-4 md:py-0 min-h-screen">

        {/* ----------------- MOBILE / PORTRAIT LAYOUT (< 768px) ----------------- */}
        {/* ----------------- MOBILE / PORTRAIT LAYOUT (< 768px) ----------------- */}
        <div className="block md:hidden relative w-full max-w-[480px] aspect-[3/4] overflow-hidden bg-white shadow-lg rounded-2xl mx-4">

          {/* Vertical Poster Background - Shifted to object-top to pull the bag up */}
          <img
            src={mobileBg}
            alt="Luck Trip Travel Merchandise Poster"
            className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none"
          />

          {/* Content Overlay */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-6">

            {/* Top Left Text Container - Restricted to max-w-[55%] to keep text strictly on the left side */}
            <div className="max-w-[55%] sm:max-w-[58%] pt-1 mt-10 sm:mt-8">
              {/* Main Headline */}
              <h1
                className="text-xl sm:text-2xl font-extrabold text-[#04415D] leading-[1.05] uppercase mb-1.5 tracking-wide"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                WHAT IS<br />
                LUCK MY TRIP?
              </h1>

              {/* Sub-headline */}
              <p className="text-[11px] sm:text-xs font-bold text-[#0C4765] leading-snug mb-1.5">
                Premium travel merchandise—with an extra reason to share your journey.
              </p>

              {/* Body Description */}
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#1D4C5C] leading-tight">
                Buy any product. Post your creative story.<br />
                Our panel selects one standout story each week for a travel reward.
              </p>
            </div>

            {/* Bottom Left Button & Legal Section */}
            <div className="pb-1 pt-1">
              <button className="bg-[#EF3842] hover:bg-[#d82a34] text-white font-bold text-[11px] sm:text-xs px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer">
                <span>COMING SOON</span>
                <span className="text-xs leading-none">&rarr;</span>
              </button>

              <p className="text-[8px] sm:text-[9px] text-slate-600 font-semibold mt-1.5 pl-0.5">
                Judged promotion. Eligibility and terms apply.
              </p>
            </div>

          </div>
        </div>


        {/* ----------------- DESKTOP / WIDESCREEN LAYOUT (>= 768px) ----------------- */}
        <div className="hidden md:flex relative w-full h-[100vh] max-h-[950px] items-center justify-center">

          {/* Horizontal Background Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <img
              src={desktopBg}
              alt="Luck Trip Travel Merchandise Background"
              className="w-full h-full object-contain object-right"
            />
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