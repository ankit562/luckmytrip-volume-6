 import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser, loginUser, logoutUser } from '../features/auth/authUserSlice';
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

export default function DemoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Profile dropdown toggle state
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // 1. Ticket quantities from Redux
  const cartItems = useSelector(state => state.addtocart?.cartItems || {});
  const {
    dubaiQty = 0,
    thailandQty = 0,
    goldenWinnerQty = 0,
    giftQty = 0,
    goaQty = 0,
    jackpotQty = 0,
  } = cartItems;

  const ticketsCount = (
    (dubaiQty > 0 ? 1 : 0) +
    (thailandQty > 0 ? 1 : 0) +
    (goldenWinnerQty > 0 ? 1 : 0) +
    (giftQty > 0 ? 1 : 0) +
    (goaQty > 0 ? 1 : 0) +
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

  // Total combined cart item count
  const totalCartCount = ticketsCount + shopCount;

  // Fetch shop products dynamically with safe array fallback
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

  const [localWallet] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lmt_wallet')) || { bal: 0, tx: [] };
    } catch {
      return { bal: 0, tx: [] };
    }
  });

  const [authModal, setAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authName, setAuthName] = useState('');
  const [authEmailOrPhone, setAuthEmailOrPhone] = useState('');
  const [authPass, setAuthPass] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

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
      <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <header className="sticky top-0 z-20 bg-[#F3F7F7] border-b border-[#0E3E52]/20">
        <div className="max-w-[1100px] mx-auto px-5 py-3.5 flex flex-wrap items-center justify-between gap-y-3">
          <a className="font-['Baloo_2',sans-serif] font-extrabold text-[23px] text-inherit no-underline" href="#home">
            Luck<b className="text-[#1F8E92]">My</b>Trip<i className="text-[#ED363E] not-italic">.</i>
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

            {/* Profile Dropdown & Add-to-Cart Icons */}
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

              {/* Add to Cart Icon with Dynamic Count Badge */}
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
        <section className={`py-11 pb-18 ${activeTab === 'home' ? '' : 'hidden'}`} id="v-home">
          <div className="max-w-[1100px] mx-auto px-5">
            <div className="grid grid-cols-[1.1fr_0.9fr] max-md:grid-cols-1 gap-10 items-center">
              <div>
                <span className="inline-block bg-[#FFCD32] text-[#3a2d00] font-bold text-[13px] rounded-full px-3 py-1">Judged weekly. Not a lottery.</span>
                <h1 className="font-['Baloo_2',sans-serif] text-[50px] max-md:text-[36px] font-extrabold tracking-[-0.5px] leading-[1.1] mt-4">
                  Shop travel gear. Share your story. <span className="text-[#1F8E92]">Get selected for a trip.</span>
                </h1>
                <p className="text-[#587885] max-w-[60ch] text-[18px] my-[18px]">
                  Buy any LuckMyTrip product, post your creative story, and our panel picks one standout story every week for a trip to Dubai or Thailand.
                </p>
                <div className="flex gap-[14px] flex-wrap items-center">
                  <a className="border-0 rounded-full py-[13px] px-[26px] bg-[#ED363E] text-white font-bold text-[15px] cursor-pointer no-underline inline-block" href="#shop">Shop the collection</a>
                  <a className="rounded-full py-[13px] px-[26px] bg-transparent text-[#0E3E52] border-2 border-[#0E3E52] font-bold text-[15px] cursor-pointer no-underline inline-block" href="#how">See how it works</a>
                </div>
              </div>
            </div>

            {/* SHOP TRAVEL GEAR */}
            <div className="mt-16 scroll-mt-24" id="shop">
              <h2 className="font-['Baloo_2',sans-serif] text-[34px] font-bold">Shop travel gear</h2>
              <p className="text-[#587885] max-w-[60ch] mt-[10px]">Premium everyday travel merchandise, with an extra reason to share your journey.</p>
              
              {productsLoading ? (
                <div className="py-12 text-center text-gray-500 font-semibold">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="py-12 text-center text-gray-500 font-semibold">No products found in the database.</div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 mt-[26px]">
                  {products.map((p, i) => (
                    <div key={p._id || i} className="bg-white border border-[#0E3E52]/20 rounded-[20px] p-[18px] flex flex-col gap-[6px] relative">
                      <div className="h-[120px] rounded-[14px] overflow-hidden flex items-center justify-center p-2 bg-[#E3F6F7]">
                        <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                      </div>
                      <h3 className="font-['Baloo_2',sans-serif] text-[20px] font-bold mt-[6px]">{p.title}</h3>
                      <p className="text-[#587885] text-[14px] flex-1">{p.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-['Baloo_2',sans-serif] font-bold text-[20px]">
                          ₹{p.price}
                        </span>
                        <button className="border-0 rounded-full py-2 px-4 bg-[#104A64] text-white font-bold text-[14px] cursor-pointer" onClick={() => buyProduct(p)}>Buy</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#EAF2F2] border-t border-[#0E3E52]/10 py-6 px-5 mt-12 text-center text-[#587885] text-[13px]">
        <div className="max-w-[1100px] mx-auto">
          Judged promotion. Purchase, posting requirements, eligibility and full terms apply. © 2026 LuckMyTrip
        </div>
      </footer>
    </div>
  );
}