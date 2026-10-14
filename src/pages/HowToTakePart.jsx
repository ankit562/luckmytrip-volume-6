 import React, { useEffect } from 'react';
import Header from '../components/commonComponent/Header';
import Footer from '../components/commonComponent/Footer';

// Full Card Strip Images
import strip1Img from '../components/assets/images/strip1.png';
import strip2Img from '../components/assets/images/strip2.png';
import strip3Img from '../components/assets/images/strip3.png';

const HowToTakePart = () => {
  // Inject Google Fonts dynamically
  useEffect(() => {
    const linkFont = document.createElement('link');
    linkFont.href =
      'https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Work+Sans:wght@400;500;600;700&display=swap';
    linkFont.rel = 'stylesheet';
    document.head.appendChild(linkFont);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between font-['Work_Sans',sans-serif] select-none">
      {/* Standard Header */}
      <Header />

      {/* Main Container - Controlled tight gap */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-1 pb-4 flex flex-col gap-1.5 sm:gap-2">
        
        {/* HEADING WITH DASHES */}
        <div className="relative flex items-center justify-center md:justify-end md:pr-12 mt-0 mb-0">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#04415D] tracking-wide uppercase leading-tight"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            HOW TO TAKE PART?
          </h2>

          {/* Top Right Colorful Dashes */}
          <div className="hidden sm:flex absolute right-4 md:right-2 -top-1 flex-col gap-1 pointer-events-none">
            <span className="w-5 h-1.5 bg-[#FFC527] rounded-full transform rotate-45"></span>
            <span className="w-6 h-1.5 bg-[#00C4D6] rounded-full transform -rotate-12"></span>
            <span className="w-4 h-1.5 bg-[#7839A2] rounded-full transform rotate-12"></span>
          </div>
        </div>

        {/* ----------------- STRIP 1 ----------------- */}
        <div className="w-full flex justify-center">
          <img
            src={strip1Img}
            alt="Step 1: BUY - Choose any LuckMyTrip merchandise"
            className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl pointer-events-none"
          />
        </div>

        {/* ----------------- STRIP 2 ----------------- */}
        <div className="w-full flex justify-center">
          <img
            src={strip2Img}
            alt="Step 2: SHARE - Post a creative story and tag LuckMyTrip"
            className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl pointer-events-none"
          />
        </div>

        {/* ----------------- STRIP 3 ----------------- */}
        <div className="w-full flex justify-center">
          <img
            src={strip3Img}
            alt="Step 3: GET SELECTED - Winners chosen by panel"
            className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl pointer-events-none"
          />
        </div>

        {/* FOOTER BAR (Text aligned to the right) */}
        <div className="mt-1 flex justify-end w-full px-1">
          <p className="text-slate-500 text-[11px] sm:text-xs text-right font-semibold">
            Purchase, posting requirements and full terms apply.
          </p>
        </div>

      </main>

      {/* Standard Footer */}
      <Footer />
    </div>
  );
};

export default HowToTakePart;