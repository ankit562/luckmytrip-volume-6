 import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser, loginUser, logoutUser } from '../features/auth/authUserSlice';
import { setDubaiQtys, setThailandQtys } from '../features/addtocart/addtocartSlice';
import Footer from '../components/commonComponent/Footer';
import toast from 'react-hot-toast';
import axios from 'axios';

const FAQS = [
  ["Is LuckMyTrip a lottery?", "No. Every week a panel reads eligible stories and selects one using published judging criteria: creativity, originality and storytelling. Winners are chosen on merit, not by a random draw."],
  ["How do I take part?", "Buy any LuckMyTrip product, post a creative story about your travels, and tag @LuckMyTrip. Purchase and posting requirements apply."],
  ["What can I win?", "One standout story each week wins a trip to Dubai or Thailand. Inclusions and dates are listed in the full terms."],
  ["Which payment methods do you accept?", "UPI, debit and credit cards, net banking and selected cryptocurrencies. You can also pay from your LuckMyTrip wallet."],
  ["What is the wallet?", "A balance you top up and spend on LuckMyTrip products. It cannot be withdrawn or transferred."],
  ["Will my photo be shown if I win?", "Only with your written consent. Winners choose whether to share their photo, name and story."],
  ["Where can I read the full terms?", "The complete terms, eligibility rules and judging criteria are linked at checkout and in the footer."]
];

// Seamless infinite carousel track for the footer banner
const FOOTER_SLIDES = [
  { src: '/images/dubaifooter.png', alt: 'Dubai Journey', destination: 'to Dubai' },
  { src: '/images/thailandfooter.png', alt: 'Thailand Journey', destination: 'to Thailand' },
  { src: '/images/dubaifooter.png', alt: 'Dubai Journey', destination: 'to Dubai' },
];

// Only Dubai and Thailand for the hero carousel
const rightImages = [
  "/images/MaskGroup2.png",
  "/images/MaskGroup2.png"
];

const destinations = [
  "DUBAI",
  "THAILAND"
];

export default function DemoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Hero Right-Side Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % rightImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const dubaiQty = useSelector(state => state.addtocart?.cartItems?.dubaiQty || 0);
  const thailandQty = useSelector(state => state.addtocart?.cartItems?.thailandQty || 0);

  const handleSelectTrip = () => {
    const selected = destinations[carouselIndex];

    if (selected === "DUBAI") {
      dispatch(setDubaiQtys(dubaiQty > 0 ? dubaiQty + 1 : 1));
      navigate("/ticket", { state: { fromdubai1: true } });
    }

    if (selected === "THAILAND") {
      dispatch(setThailandQtys(thailandQty > 0 ? thailandQty + 1 : 1));
      navigate("/ticket", { state: { fromthailand1: true } });
    }

    toast.success("Redirecting to Ticket Page");
  };

  // Footer banner slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(slideInterval);
  }, []);

  const handleSlideTransitionEnd = () => {
    if (currentSlide === FOOTER_SLIDES.length - 1) {
      setIsTransitioning(false);
      setCurrentSlide(0);
    }
  };

  // Profile dropdown toggle state
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // 1. Ticket quantities from Redux
  const cartItems = useSelector(state => state.addtocart?.cartItems || {});
  const {
    dubaiQty: dQty = 0,
    thailandQty: tQty = 0,
    goldenWinnerQty = 0,
    giftQty = 0,
    goaQty: gQty = 0,
    jackpotQty = 0,
  } = cartItems;

  const ticketsCount = (
    (dQty > 0 ? 1 : 0) +
    (tQty > 0 ? 1 : 0) +
    (goldenWinnerQty > 0 ? 1 : 0) +
    (giftQty > 0 ? 1 : 0) +
    (gQty > 0 ? 1 : 0) +
    (jackpotQty > 0 ? 1 : 0)
  );

  // 2. Shop items from localStorage
  const [shopCount, setShopCount] = useState(0);

  useEffect(() => {
    const updateShopCount = () => {
      try {
        const savedShopItems = JSON.parse(localStorage.getItem('shop_cart_items')) || [];
        setShopCount(savedShopItems.length);
      } catch {
        setShopCount(0);
      }
    };

    updateShopCount();

    window.addEventListener('storage', updateShopCount);
    return () => window.removeEventListener('storage', updateShopCount);
  }, []);

  const totalCartCount = ticketsCount + shopCount;

  // Fetch shop products dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://luckmytrip-backend-volume-6.onrender.com/api/v1/shop');
        const rawData = response.data?.products || response.data?.data || response.data;
        setProducts(Array.isArray(rawData) ? rawData : []);
      } catch (err) {
        console.error('Failed to fetch shop products:', err);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.slice(1) || 'home';
      if (h === 'wallet' && !user) {
        navigate('/login');
        return;
      }
      if (['home', 'how', 'shop'].includes(h)) {
        setActiveTab('home');
        if (h === 'how' || h === 'shop') {
          setTimeout(() => {
            const el = document.getElementById(h);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        setActiveTab(h);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, [user, navigate]);

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    window.location.hash = '#home';
    toast.success('Logged out successfully');
  };

  const buyProduct = (product) => {
    if (!user) {
      toast.error('Please log in to buy');
      navigate('/login');
      return;
    }

    let existingCart = [];
    try {
      existingCart = JSON.parse(localStorage.getItem('shop_cart_items')) || [];
    } catch {
      existingCart = [];
    }

    const index = existingCart.findIndex(item => item.id === product._id);
    if (index > -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({
        id: product._id,
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
        couponCode: (product.assignedCoupon && product.assignedCoupon !== 'none') ? product.assignedCoupon : null,
      });
    }

    localStorage.setItem('shop_cart_items', JSON.stringify(existingCart));
    setShopCount(existingCart.length);

    navigate('/addtocart', {
      state: { shopProducts: existingCart }
    });
  };

  return (
    <div className="bg-[#F3F7F7] text-[#0E3E52] font-['Work_Sans',sans-serif] min-h-screen box-border antialiased flex flex-col justify-between">
      <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Caveat:wght@700&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <header className="sticky top-0 z-20 bg-[#F3F7F7] border-b border-[#0E3E52]/20">
        <div className="max-w-[1100px] mx-auto px-5 py-3.5 flex flex-wrap items-center justify-between gap-y-3">
          <a className="flex items-center no-underline" href="#home">
            <img 
              src="/images/luckmytrip-logo.png" 
              alt="LuckMyTrip" 
              className="h-12 w-auto object-contain" 
            />
          </a>

          <div className="flex items-center gap-[22px] max-lg:w-full max-lg:order-3 max-lg:justify-between flex-wrap lg:ml-auto">
            <nav className="flex gap-[22px] max-md:gap-x-[12px] flex-wrap items-center">
              <a href="#home" className={`no-underline font-semibold text-[15px] py-0.5 border-b-2 ${activeTab === 'home' ? 'border-[#1F8E92]' : 'border-transparent'}`}>Home</a>
              <a href="#how" className="no-underline font-semibold text-[15px] py-0.5 border-b-2 border-transparent hover:border-[#1F8E92]">How it works</a>
              <a href="#shop" className="no-underline font-semibold text-[15px] py-0.5 border-b-2 border-transparent hover:border-[#1F8E92]">Shop</a>
              <a href="#winners" className={`no-underline font-semibold text-[15px] py-0.5 border-b-2 ${activeTab === 'winners' ? 'border-[#1F8E92]' : 'border-transparent'}`}>Winners</a>
              <a href="#faq" className="no-underline font-semibold text-[15px] py-0.5 border-b-2 border-transparent hover:border-[#1F8E92]">FAQ</a>
              <a href="#contact" className="no-underline font-semibold text-[15px] py-0.5 border-b-2 border-transparent hover:border-[#1F8E92]">Contact</a>
            </nav>

            <div className="flex gap-3 items-center relative">
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)} 
                  className="bg-transparent border-0 cursor-pointer p-1 text-[#0E3E52] flex items-center hover:opacity-80 transition-opacity"
                  title="Profile"
                >
                  <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#0E3E52]/20 rounded-xl shadow-lg p-2 z-50">
                    {user ? (
                      <>
                        <div className="px-3 py-2 text-[13px] font-bold text-[#0E3E52] border-b border-gray-100">
                          Hello, {user.fullName || user.name || 'Traveler'}!
                        </div>
                        <button 
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate('/orders');
                          }}
                          className="w-full text-left px-3 py-2 text-[13px] text-[#0E3E52] hover:bg-[#E3F6F7] rounded-lg font-medium cursor-pointer border-0 bg-transparent"
                        >
                          My Orders
                        </button>
                        <button 
                          onClick={() => {
                            setShowProfileMenu(false);
                            handleLogoutClick();
                          }}
                          className="w-full text-left px-3 py-2 text-[13px] text-[#ED363E] hover:bg-red-50 rounded-lg font-semibold cursor-pointer border-0 bg-transparent mt-1"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate('/login');
                          }}
                          className="w-full text-left px-3 py-2 text-[13px] text-[#104A64] hover:bg-[#E3F6F7] rounded-lg font-bold cursor-pointer border-0 bg-transparent"
                        >
                          Log In
                        </button>
                        <button 
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate('/login', { state: { mode: 'signup' } });
                          }}
                          className="w-full text-left px-3 py-2 text-[13px] text-[#0E3E52] hover:bg-[#E3F6F7] rounded-lg font-medium cursor-pointer border-0 bg-transparent"
                        >
                          Sign Up
                        </button>
                        <button 
                          onClick={() => {
                            setShowProfileMenu(false);
                            toast.error('Please log in to view orders');
                            navigate('/login');
                          }}
                          className="w-full text-left px-3 py-2 text-[13px] text-[#587885] hover:bg-[#E3F6F7] rounded-lg font-medium cursor-pointer border-0 bg-transparent border-t border-gray-100 mt-1"
                        >
                          My Orders
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button 
                onClick={() => navigate('/addtocart')} 
                className="bg-transparent border-0 cursor-pointer p-1 text-[#0E3E52] flex items-center relative hover:opacity-80 transition-opacity"
                title="Shopping Cart"
              >
                <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#ED363E] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className={`py-11 pb-12 ${activeTab === 'home' ? '' : 'hidden'}`} id="v-home">
          <div className="max-w-[1100px] mx-auto px-5">
            {/* HERO SECTION GRID (Aligned at the top with items-start) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              <div>
                <span className="inline-block bg-[#FFCD32] text-[#3a2d00] font-bold text-[13px] rounded-full px-4 py-1.5 mb-3">Shop, Win, Fly.</span>
                
                <div className="flex flex-col gap-3 mt-1 w-full max-w-[460px]">
                  <div className="bg-[#7b1fa2] text-white font-['Baloo_2',sans-serif] text-[30px] max-md:text-[22px] font-extrabold py-3 px-6 rounded-xl shadow-md w-full text-left">
                    Shop travel gear.
                  </div>
                  <div className="bg-[#00a59b] text-white font-['Baloo_2',sans-serif] text-[30px] max-md:text-[22px] font-extrabold py-3 px-6 rounded-xl shadow-md w-full text-left">
                    Share your story.
                  </div>
                  <div className="bg-[#104a64] text-white font-['Baloo_2',sans-serif] text-[30px] max-md:text-[22px] font-extrabold py-3 px-6 rounded-xl shadow-md w-full text-left">
                    Get selected for a trip.
                  </div>
                </div>

                <p className="text-[#587885] max-w-[60ch] text-[18px] my-[18px]">
                  Buy our products, post your creative story, and the best story will get weekly trip to Dubai or Thailand.
                </p>
                <div className="flex gap-[14px] flex-wrap items-center">
                  <a className="border-0 rounded-full py-[13px] px-[26px] bg-[#ED363E] text-white font-bold text-[15px] cursor-pointer no-underline inline-block" href="#shop">Shop the collection</a>
                  <a className="rounded-full py-[13px] px-[26px] bg-transparent text-[#0E3E52] border-2 border-[#0E3E52] font-bold text-[15px] cursor-pointer no-underline inline-block" href="#how">See how it works</a>
                </div>
              </div>

              {/* RIGHT SIDE: Dubai and Thailand Carousel */}
              <div className="w-full flex flex-col py-0 items-start">
                <div className="relative mb-5 w-full">
                  <div className="overflow-hidden w-full rounded-[20px]">
                    <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                      {rightImages.map((src, i) => (
                        <img key={i} src={src} className="w-full flex-shrink-0 object-cover rounded-[20px]" alt={`Right ${i + 1}`} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:mb-6 w-full">
                  <div className="font-open-sans font-extrabold">
                    <span className="block text-[#0d3559] text-xl lg:text-[60px] leading-none">
                      FLY TO
                    </span>
                    <span className="block text-[#f6b21d] text-xl lg:text-[38px] md:mt-3">
                      {destinations[carouselIndex]}
                    </span>
                  </div>

                  <button
                    onClick={handleSelectTrip}
                    className="lg:mt-7 mt-4 bg-[#8ac541] hover:bg-[#3d660b] text-white lg:py-5 lg:px-6 py-2 px-3 text-sm lg:text-2xl rounded-full shadow-lg transition font-bold cursor-pointer flex items-center justify-center"
                  >
                    ➜
                  </button>
                </div>
              </div>
            </div>

            {/* PLANE DIVIDER IMAGE */}
            <div className="mt-14 mb-2 w-full flex items-center justify-center">
              <img 
                src="/images/plane-divider.svg" 
                alt="Plane flight divider" 
                className="w-full max-w-[1100px] h-auto object-contain opacity-90" 
              />
            </div>

            {/* SHOP TRAVEL GEAR */}
            <div className="mt-2 scroll-mt-24" id="shop">
              <h2 className="font-['Baloo_2',sans-serif] text-[34px] font-bold">Shop travel gear</h2>
              <div className="text-[#587885] mt-[10px] space-y-1 text-[16px]">
                <p>Choose any LuckMyTrip merchandise from our store. Post a creative story and tag us - <span className="font-semibold text-[#1F8E92]">@LuckMyTrip</span></p>
                <p>Our panel reviews the stories and select one winner each week.</p>
              </div>
              
              {productsLoading ? (
                <div className="py-12 text-center text-gray-500 font-semibold">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="py-12 text-center text-gray-500 font-semibold">No products found in the database.</div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 mt-[26px]">
                  {products.map((p, i) => (
                    <div key={p._id || i} className="bg-white border border-[#0E3E52]/20 rounded-[20px] overflow-hidden flex flex-col relative shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full h-[170px] bg-gray-50 overflow-hidden flex items-center justify-center">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-[18px] flex flex-col flex-1 gap-[6px]">
                        <h3 className="font-['Baloo_2',sans-serif] text-[20px] font-bold mt-[2px]">{p.title}</h3>
                        <p className="text-[#587885] text-[14px] flex-1">{p.description}</p>
                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                          <span className="font-['Baloo_2',sans-serif] font-bold text-[20px]">
                            ₹{p.price}
                          </span>
                          <button className="border-0 rounded-full py-2 px-5 bg-[#104A64] text-white font-bold text-[14px] cursor-pointer hover:opacity-90" onClick={() => buyProduct(p)}>Buy</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* CONTINUOUS INFINITE HORIZONTAL SLIDER ABOVE FOOTER */}
      <section className="relative w-full h-[180px] md:h-[260px] overflow-hidden select-none">
        <div
          onTransitionEnd={handleSlideTransitionEnd}
          className={`flex w-full h-full ${
            isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''
          }`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {FOOTER_SLIDES.map((slide, idx) => (
            <div key={idx} className="relative w-full h-full flex-shrink-0">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/25 pointer-events-none" />

              <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-6 md:pt-8 px-4 text-center">
                <h2 className="font-['Caveat',cursive] text-white text-[44px] md:text-[60px] font-bold leading-none drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)] tracking-wide">
                  Join the Journey
                </h2>
                <span className="font-['Caveat',cursive] text-[#FFCD32] text-[38px] md:text-[52px] font-bold leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.75)] mt-0.5">
                  {slide.destination}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
