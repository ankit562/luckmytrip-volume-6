 import React, { useEffect, useRef } from 'react';
import Header from '../components/commonComponent/Header';
import Footer from '../components/commonComponent/Footer';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import TripSection from '../components/ticketpageComponent/TicketCompo';
import { Helmet } from 'react-helmet';
import { fetchTickets } from '../features/tickets/ticketSlice';
import { fetchProducts } from "../features/products/productSlice";

import {
  setDubaiQtys,
  setThailandQtys,
  setGoldenWinnerQtys,
  setGoaQtys,
  setDubaiPrices,
  setThailandPrices,
  setGoldenWinnerPrices,
  setGoaPrices,
  setGiftPrices,
  setJackpotPrices,
  setJackpotQtys,
} from '../features/addtocart/addtocartSlice';

export default function Tickets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const dubaiRef = useRef(null);
  const thailandRef = useRef(null);
  const goaRef = useRef(null);
  const jackpotRef = useRef(null);
  const goldenWinnerRef = useRef(null);

  // Safely extract arrays from Redux state with fallback default arrays []
  const { products = [] } = useSelector((state) => state.products || {});
  const { tickets = [] } = useSelector((state) => state.tickets || {});
  const cartItems = useSelector((state) => state.addtocart.cartItems || {});

  const fromExplore = location.state?.fromExplore;
  const fromHome = location.state?.fromHome;
  const fromdubaicarosel = location.state?.fromdubaicarosel;
  const fromdubai1 = location.state?.fromdubai1;
  const fromthailand1 = location.state?.fromthailand1;
  const fromgoa1 = location.state?.fromgoa1;

  const {
    dubaiQty = 0,
    thailandQty = 0,
    goldenWinnerQty = 0,
    goaQty = 0,
    jackpotQty = 0,
  } = cartItems;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(tickets) && tickets.length > 0) {
      const dubaiTicket = tickets.find(t => t.name?.toLowerCase() === 'dubai');
      const thailandTicket = tickets.find(t => t.name?.toLowerCase() === 'thailand');
      const goaTicket = tickets.find(t => t.name?.toLowerCase() === 'goa');
      const jackpotTicket = tickets.find(t => t.name?.toLowerCase() === 'jackpot');

      if (dubaiTicket) dispatch(setDubaiPrices(dubaiTicket.price));
      if (thailandTicket) dispatch(setThailandPrices(thailandTicket.price));
      if (goaTicket) dispatch(setGoaPrices(goaTicket.price));
      if (jackpotTicket) dispatch(setJackpotPrices(jackpotTicket.price));
      dispatch(setGoldenWinnerPrices(149));
      dispatch(setGiftPrices(49));
      dispatch(setJackpotPrices(49));
    }
  }, [tickets, dispatch]);

  // Scroll to section on hash change
  useEffect(() => {
    const hash = (location.hash || '').toLowerCase();
    if (hash === '#dubai') {
      dubaiRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (hash === '#thailand') {
      thailandRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (hash === '#goa') {
      goaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (hash === '#jackpot') {
      jackpotRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (hash === '#goldenwinner') {
      goldenWinnerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  const dubaiStock = Array.isArray(tickets) ? (tickets.find(t => t.name?.toLowerCase() === 'dubai')?.ticket ?? 0) : 0;
  const thailandStock = Array.isArray(tickets) ? (tickets.find(t => t.name?.toLowerCase() === 'thailand')?.ticket ?? 0) : 0;
  const goaStock = Array.isArray(tickets) ? (tickets.find(t => t.name?.toLowerCase() === 'goa')?.ticket ?? 0) : 0;

  // Handlers for Dubai Ticket
  const handleIncrementDubai = () => {
    if (dubaiStock <= 0) {
      toast.error('Dubai ticket is out of stock');
      return;
    }
    if (dubaiQty + 1 > dubaiStock) {
      toast.error(`Only ${dubaiStock} Dubai ticket(s) available`);
      return;
    }
    dispatch(setDubaiQtys(dubaiQty + 1));
    if (dubaiQty === 0) toast.success('Tickets added to cart');
  };
  const handleDecrementDubai = () => {
    if (dubaiQty === 1) toast.success('Ticket discarded successfully');
    dispatch(setDubaiQtys(Math.max(0, dubaiQty - 1)));
  };
  const handleAddToCartDubai = () => {
    if (dubaiStock <= 0) {
      toast.error('Dubai ticket is out of stock');
      return;
    }
    if (dubaiQty === 0) dispatch(setDubaiQtys(1));
    toast.success('Tickets added to cart');
    navigate('/addtocart');
  };

  // Handlers for Thailand Ticket
  const handleIncrementThailand = () => {
    if (thailandStock <= 0) {
      toast.error('Thailand ticket is out of stock');
      return;
    }
    if (thailandQty + 1 > thailandStock) {
      toast.error(`Only ${thailandStock} Thailand ticket(s) available`);
      return;
    }
    dispatch(setThailandQtys(thailandQty + 1));
    if (thailandQty === 0) toast.success('Tickets added to cart');
  };
  const handleDecrementThailand = () => {
    if (thailandQty === 1) toast.success('Ticket discarded successfully');
    dispatch(setThailandQtys(Math.max(0, thailandQty - 1)));
  };
  const handleAddToCartThailand = () => {
    if (thailandStock <= 0) {
      toast.error('Thailand ticket is out of stock');
      return;
    }
    if (thailandQty === 0) dispatch(setThailandQtys(1));
    toast.success('Tickets added to cart');
    navigate('/addtocart');
  };

  // Handlers for Goa Ticket
  const handleIncrementGoa = () => {
    if (goaStock <= 0) {
      toast.error('Goa ticket is out of stock');
      return;
    }
    if (goaQty + 1 > goaStock) {
      toast.error(`Only ${goaStock} Goa ticket(s) available`);
      return;
    }
    dispatch(setGoaQtys(goaQty + 1));
    if (goaQty === 0) toast.success('Tickets added to cart');
  };
  const handleDecrementGoa = () => {
    if (goaQty === 1) toast.success('Ticket discarded successfully');
    dispatch(setGoaQtys(Math.max(0, goaQty - 1)));
  };
  const handleAddToCartGoa = () => {
    if (goaStock <= 0) {
      toast.error('Goa ticket is out of stock');
      return;
    }
    if (goaQty === 0) dispatch(setGoaQtys(1));
    toast.success('Tickets added to cart');
    navigate('/addtocart');
  };

  // Handlers for Golden Ticket
  const handleIncrementGolden = () => {
    dispatch(setGoldenWinnerQtys(goldenWinnerQty + 1));
    if (goldenWinnerQty === 0) toast.success('Tickets added to cart');
  };
  const handleDecrementGolden = () => {
    if (goldenWinnerQty === 1) toast.success('Ticket discarded successfully');
    dispatch(setGoldenWinnerQtys(Math.max(0, goldenWinnerQty - 1)));
  };
  const handleAddToCartGolden = () => {
    if (goldenWinnerQty === 0) dispatch(setGoldenWinnerQtys(1));
    toast.success('Tickets added to cart');
    navigate('/addtocart');
  };

  // Handlers for Jackpot Ticket
  const handleIncrementJackpot = () => {
    dispatch(setJackpotQtys(jackpotQty + 1));
    if (jackpotQty === 0) toast.success('Tickets added to cart');
  };
  const handleDecrementJackpot = () => {
    if (jackpotQty === 1) toast.success('Ticket discarded successfully');
    dispatch(setJackpotQtys(Math.max(0, jackpotQty - 1)));
  };
  const handleAddToCartJackpot = () => {
    if (jackpotQty === 0) dispatch(setJackpotQtys(1));
    toast.success('Tickets added to cart');
    navigate('/addtocart');
  };

  const options = [
    'VIP AIRPORT PICKUP',
    'PREMIUM LUXURY HOTEL',
    'CITY TOUR WITH MODEL',
    'RE-TURN TICKET',
    'DINNER WITH MODEL',
  ];

  useEffect(() => {
    if (fromdubai1 && dubaiQty === 0) {
      navigate('/explore');
    }
  }, [fromdubai1, dubaiQty, navigate]);

  useEffect(() => {
    if (fromthailand1 && thailandQty === 0) {
      navigate('/explore');
    }
  }, [fromthailand1, thailandQty, navigate]);

  useEffect(() => {
    if (fromgoa1 && goaQty === 0) {
      navigate('/explore');
    }
  }, [fromgoa1, goaQty, navigate]);

  useEffect(() => {
    if (fromExplore && goldenWinnerQty === 0) {
      navigate('/explore');
    }
  }, [fromExplore, goldenWinnerQty, navigate]);

  useEffect(() => {
    if (fromHome && jackpotQty === 0) {
      navigate('/');
    }
  }, [fromHome, jackpotQty, navigate]); // Added dependency array to fix render loop

  useEffect(() => {
    if (fromdubaicarosel && dubaiQty === 0) {
      navigate('/explore');
    }
  }, [fromdubaicarosel, dubaiQty, navigate]);

  const handleBuyMore = () => {
    navigate('/explore');
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-10 min-h-screen">
      <Header />

      <Helmet>
        <title>Buy Contest Tickets & Win Trips</title>
        <meta name="description" content="Buy your contest tickets today (₹299, ₹499, ₹599). Each draw limited to 2000 entries. Play now and win Dubai, Baku, Thailand packages!" />
        <meta name="keywords" content="buy contest tickets, contest entry, lucky draw ticket, win trips, Dubai Baku Thailand packages" />
        <meta property="og:title" content="Buy Contest Tickets & Win Trips" />
        <meta property="og:description" content="Secure your spot in contests with limited entries. Purchase tickets and stand a chance to win luxury trips!" />
        <meta property="og:url" content="https://www.theluckmytrip.com/tickets/" />
        <link rel="canonical" href="https://www.theluckmytrip.com/tickets/" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Contest Tickets",
            "url": "https://www.theluckmytrip.com/tickets/",
            "description": "Buy contest tickets at ₹299, ₹499, or ₹599. Limited draw of 2000 entries. Win trips to Dubai, Baku, Thailand.",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "299",
              "availability": "https://schema.org/InStock",
              "url": "https://www.theluckmytrip.com/tickets/"
            },
            "mainEntityOfPage": {
              "@type": "Contest",
              "name": "Luxury Travel Contest",
              "url": "https://www.theluckmytrip.com/tickets/",
              "description": "Purchase contest tickets and stand a chance to win luxury trips."
            }
          }
          `}
        </script>
      </Helmet>

      {/* Trip Sections */}
      {Array.isArray(tickets) &&
        tickets
          .filter(tri => ['dubai', 'thailand', 'goa'].includes(tri.name?.toLowerCase()))
          .map(trip => (
            <div
              key={trip.id || trip._id}
              ref={
                trip.name?.toLowerCase() === 'dubai'
                  ? dubaiRef
                  : trip.name?.toLowerCase() === 'thailand'
                    ? thailandRef
                    : trip.name?.toLowerCase() === 'goa'
                      ? goaRef
                      : null
              }
            >
              <TripSection
                trip={trip}
                qty={
                  trip.name?.toLowerCase() === 'dubai'
                    ? dubaiQty
                    : trip.name?.toLowerCase() === 'thailand'
                      ? thailandQty
                      : trip.name?.toLowerCase() === 'goa'
                        ? goaQty
                        : 0
                }
                onIncrement={
                  trip.name?.toLowerCase() === 'dubai'
                    ? handleIncrementDubai
                    : trip.name?.toLowerCase() === 'thailand'
                      ? handleIncrementThailand
                      : trip.name?.toLowerCase() === 'goa'
                        ? handleIncrementGoa
                        : () => { }
                }
                onDecrement={
                  trip.name?.toLowerCase() === 'dubai'
                    ? handleDecrementDubai
                    : trip.name?.toLowerCase() === 'thailand'
                      ? handleDecrementThailand
                      : trip.name?.toLowerCase() === 'goa'
                        ? handleDecrementGoa
                        : () => { }
                }
                onAddToCart={
                  trip.name?.toLowerCase() === 'dubai'
                    ? handleAddToCartDubai
                    : trip.name?.toLowerCase() === 'thailand'
                      ? handleAddToCartThailand
                      : trip.name?.toLowerCase() === 'goa'
                        ? handleAddToCartGoa
                        : () => { }
                }
                onBuyMore={handleBuyMore}
              />
            </div>
          ))}

      {/* Monthly Winner Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-[3.1rem] font-bold text-red-500 text-center mb-12 font-berlin">
            Monthly Winner
          </h2>
          <div ref={goldenWinnerRef} className="relative max-w-[1053.7px] mx-auto rounded-3xl overflow-hidden shadow-2xl md:h-[452.59px] h-[320px]">
            <img src="/images/beautifulview.jpg" alt="Desert" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative h-full flex items-end justify-between md:p-12 p-4">
              <div className="z-30 relative">
                <img src="/images/goldenwinner.png" className="md:w-96 w-40 md:mb-24 ml-2" alt="Golden Winner" />
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border-2 border-black rounded-md px-2 py-1">
                    <button onClick={handleDecrementGolden} className="w-6 h-6 bg-gray-100 text-black font-bold">-</button>
                    <span className="px-3 font-bold text-white">{goldenWinnerQty}</span>
                    <button onClick={handleIncrementGolden} className="w-6 h-6 bg-green-400 text-white font-bold">+</button>
                  </div>
                  <button
                    onClick={handleAddToCartGolden}
                    className="bg-[#ef3232] hover:bg-[#d41313] text-white text-xs font-bold md:px-6 md:py-2 px-3 py-2 rounded-lg"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
              <img src="/images/104-copy-3.png" alt="Winner" className="absolute right-16 bottom-0 h-[100%] object-contain" />
            </div>
          </div>

          <div className="w-full max-w-[85%] mx-auto mt-8 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {options.map((option) => (
                <button
                  key={option}
                  className="border-2 border-teal-500 rounded-lg px-3 py-6 text-sm font-bold text-teal-900 text-center hover:bg-teal-100"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jackpot Section */}
      {Array.isArray(products) &&
        products
          .filter(items => items.name === "jackpot")
          .map(imgs => (
            <section key={imgs.id || imgs._id} ref={jackpotRef} className="max-w-[1100px] mx-auto py-8 relative overflow-hidden ">
              <div className="container mx-auto px-4 relative z-10">
                <div className="mb-4">
                  <div className="hero-container bg-blue-900 rounded-xl flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
                    <div className="hero-text px-1 md:px-4 z-10 md:py-8 py-2">
                      <img
                        src={"/images/Jackpot.png"}
                        alt="Jackpot Logo"
                        className="md:w-72 w-48"
                      />
                      <p className="text-white font-bold md:text-lg text-sm w-72 mb-3 md:mb-8 ml-0 md:ml-10">
                        {imgs.content || "Enter for your chance to win this amazing prize."}
                      </p>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border-2 border-black rounded-md px-2 py-1">
                          <button onClick={handleDecrementJackpot} className="w-6 h-6 bg-gray-100 text-black font-bold">-</button>
                          <span className="px-3 font-bold text-white">{jackpotQty}</span>
                          <button onClick={handleIncrementJackpot} className="w-6 h-6 bg-green-400 text-white font-bold">+</button>
                        </div>
                        <button
                          onClick={handleAddToCartJackpot}
                          className="bg-[#ef3232] hover:bg-[#d41313] text-white md:text-xs text-[10px] font-bold md:px-6 md:py-2 px-1.5 py-1 rounded-lg"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <img
                        src={imgs.image}
                        alt={"Lady with city background"}
                        className="lady-image "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

      <Footer />
    </div>
  );
}