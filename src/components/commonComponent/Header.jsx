 import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, X, Trophy } from "lucide-react";
import { logoutUser } from '../../features/auth/authUserSlice';
import { useSelector, useDispatch } from 'react-redux';

const linkClasses = "transition-colors duration-300";
const activeNavClass = "text-red-600 no-underline";
const inactiveNavClass = "text-gray-700";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

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

  // 2. Shop products from localStorage
  const [shopCount, setShopCount] = useState(0);

  useEffect(() => {
    const updateShopCount = () => {
      try {
        const savedShopItems = JSON.parse(localStorage.getItem('shop_cart_items')) || [];
        // Unique shop products count (or use reduce for total quantities: items.reduce((sum, item) => sum + item.quantity, 0))
        setShopCount(savedShopItems.length);
      } catch {
        setShopCount(0);
      }
    };

    updateShopCount();

    // Listen for custom/storage changes if updated dynamically across components
    window.addEventListener('storage', updateShopCount);
    return () => window.removeEventListener('storage', updateShopCount);
  }, []);

  // Total items in cart
  const totalCartCount = ticketsCount + shopCount;

  const handlelogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="w-full p-4">
      <div className="container mx-auto flex items-center justify-between uppercase">
        <Link to="/">
          <img src={'/images/luckmytrip-logo.png'} alt="Luckymytrip Logo" className="w-24 sm:w-28" />
        </Link>
        <div className="flex items-center space-x-4">
          <ul className="hidden md:flex space-x-6 lg:space-x-12 font-semibold font-montserrat">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass}`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass}`
                }
              >
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ticket"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass}`
                }
              >
                Tickets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contactus"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex md:space-x-4 space-x-2 font-semibold items-center font-montserrat">
          {user ? (
            <button
              onClick={handlelogout}
              className="hidden md:block text-lg hover:underline hover:text-blue-500"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="md:block hidden text-lg hover:underline hover:text-blue-500"
            >
              Login
            </Link>
          )}

          {!user && (
            <Link
              to="/signup"
              className="hidden md:block hover:underline text-lg font-semibold bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Register
            </Link>
          )}

          {/* Cart Icon & Badge - Visible whether logged in or guest */}
          <Link to="/addtocart" className="relative flex items-center justify-center p-1">
            <ShoppingCart className="text-red-500 md:w-8 md:h-8 w-6 h-6 cursor-pointer active:text-blue-600" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {totalCartCount}
              </span>
            )}
          </Link>

          <Link to="/winners">
            <Trophy className="text-red-500 md:w-8 md:h-8 w-6 h-6 cursor-pointer active:text-blue-600" />
          </Link>
          
          <button className="md:hidden text-2xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 bg-white shadow-md rounded-md p-4 space-y-4 font-semibold flex flex-col font-montserrat">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass} block`
          } end>
            Home
          </NavLink>
          <NavLink to="/explore" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass} block`
          }>Explore</NavLink>
          <NavLink to="/ticket" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass} block`
          }>Tickets</NavLink>
          <NavLink to="/contactus" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass} block`
          }>Contact</NavLink>
          <div className="flex flex-col space-y-2 pt-2 border-t">
            {user ? (
              <button onClick={handlelogout} className="w-full text-left active:underline active:text-blue-500">Logout</button>
            ) : (
              <>
                <Link to="/login" className="w-full text-left">Login</Link>
                <Link to="/signup" className="hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;