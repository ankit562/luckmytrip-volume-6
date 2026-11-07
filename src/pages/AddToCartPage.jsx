import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/commonComponent/Header';
import Footer from '../components/commonComponent/Footer';
import toast from 'react-hot-toast';
import { FileText, X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Helmet } from 'react-helmet';

import {
  createPurchase,
  placeOrders,
  setDubaiQtys,
  setThailandQtys,
  setGoldenWinnerQtys,
  setGiftQtys,
  setGoaQtys,
  setJackpotQtys,
} from '../features/addtocart/addtocartSlice';
import { fetchTickets } from '../features/tickets/ticketSlice';

import {
  fetchBillingInfo,
  saveBillingInfoThunk,
} from "../features/auth/authUserSlice";

export default function AddToCartPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [shopProducts, setShopProducts] = useState(() => {
    if (location.state?.shopProducts) {
      localStorage.setItem('shop_cart_items', JSON.stringify(location.state.shopProducts));
      return location.state.shopProducts;
    }
    try {
      return JSON.parse(localStorage.getItem('shop_cart_items')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (shopProducts.length > 0) {
      dispatch(setDubaiQtys(0));
      dispatch(setThailandQtys(0));
      dispatch(setGoaQtys(0));
      dispatch(setGoldenWinnerQtys(0));
      dispatch(setGiftQtys(0));
      dispatch(setJackpotQtys(0));
    }
  }, [shopProducts, dispatch]);

  const updateShopItemQty = (id, newQty) => {
    let updated;
    if (newQty <= 0) {
      updated = shopProducts.filter(item => item.id !== id);
    } else {
      updated = shopProducts.map(item => {
        if (item.id === id) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
    }
    setShopProducts(updated);
    localStorage.setItem('shop_cart_items', JSON.stringify(updated));
  };

  const cartItems = useSelector(state => state.addtocart?.cartItems) || {};
  const user = useSelector(state => state.auth?.user);
  const billingInfo = useSelector(state => state.auth?.billingInfo);
  const billingLoading = useSelector(state => state.auth?.billingLoading);

  const rawTickets = useSelector(state => state.tickets?.tickets || state.tickets);
  const tickets = Array.isArray(rawTickets) ? rawTickets : [];

  const {
    dubaiQty = 0,
    thailandQty = 0,
    goldenWinnerQty = 0,
    giftQty = 0,
    goaQty = 0,
    jackpotQty = 0,
    dubaiPrice = 0,
    thailandPrice = 0,
    goldenWinnerPrice = 149,
    giftPrice = 49,
    goaPrice = 0,
    jackpotPrice = 149,
  } = cartItems;

  const shopSubtotal = shopProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const ticketsSubtotal = (
    dubaiQty * dubaiPrice +
    thailandQty * thailandPrice +
    goldenWinnerQty * goldenWinnerPrice +
    giftQty * giftPrice +
    goaQty * goaPrice +
    jackpotQty * jackpotPrice
  );

  const subtotal = parseFloat((shopSubtotal + ticketsSubtotal).toFixed(2));
  const totalPrice = subtotal;

  const hasItems = shopProducts.length > 0 || dubaiQty > 0 || thailandQty > 0 || goldenWinnerQty > 0 || giftQty > 0 || goaQty > 0 || jackpotQty > 0;

  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    saveInfo: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBillingInfo());
    dispatch(fetchTickets());
  }, [dispatch]);

  const dubaiStock = tickets.find(t => t.name?.toLowerCase() === 'dubai')?.ticket ?? 0;
  const thailandStock = tickets.find(t => t.name?.toLowerCase() === 'thailand')?.ticket ?? 0;
  const goaStock = tickets.find(t => t.name?.toLowerCase() === 'goa')?.ticket ?? 0;

  // Automatically populate form data from saved billing info or user registration data
  useEffect(() => {
    if (billingInfo && Object.keys(billingInfo).length > 0) {
      // 1. If saved billing info exists in DB, use it
      setFormData({
        firstName: billingInfo.firstName || billingInfo.name || '',
        companyName: billingInfo.companyName || '',
        address: billingInfo.address || billingInfo.streetAddress || '',
        apartment: billingInfo.apartment || billingInfo.apartmentAddress || '',
        city: billingInfo.city || billingInfo.town || '',
        phone: billingInfo.phone || '',
        email: billingInfo.email || '',
        saveInfo: false
      });
      setShowForm(false);
    } else if (user) {
      // 2. Fallback: Auto-fill registration data from user model (fullName, email, phone, address)
      setFormData({
        firstName: user.fullName || user.firstName || user.name || '',
        companyName: '',
        address: user.address || '',
        apartment: '',
        city: '',
        phone: user.phone || '',
        email: user.email || '',
        saveInfo: false,
      });
      setShowForm(true);
    } else {
      // 3. Guest / not logged in
      setFormData({
        firstName: '',
        companyName: '',
        address: '',
        apartment: '',
        city: '',
        phone: '',
        email: '',
        saveInfo: false,
      });
      setShowForm(true);
    }
  }, [billingInfo, user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
      let digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: digitsOnly }));
      if (errors.phone) setErrors(prev => ({ ...prev, phone: false }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.address.trim()) newErrors.address = true;
    if (!formData.city.trim()) newErrors.city = true;
    if (!formData.phone.trim() || formData.phone.length !== 10) newErrors.phone = true;
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = true;
    if (!hasItems) newErrors.ticketQty = 'At least one item is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Dedicated function to save billing info separately
  const handleSaveBillingInfo = async () => {
    if (!validateForm()) return;

    try {
      const response = await dispatch(saveBillingInfoThunk(formData)).unwrap();
      toast.success('Billing details saved successfully!');

      // Update local state immediately with the saved values
      const saved = response?.billingInfo || response || formData;
      setFormData(prev => ({
        ...prev,
        firstName: saved.firstName || saved.name || prev.firstName,
        companyName: saved.companyName || prev.companyName,
        address: saved.address || saved.streetAddress || prev.address,
        apartment: saved.apartment || saved.apartmentAddress || prev.apartment,
        city: saved.city || saved.town || prev.city,
        phone: saved.phone || prev.phone,
        email: saved.email || prev.email,
        saveInfo: false,
      }));

      // Keep the form open/visible so the user sees their saved info right there
      setShowForm(true);

    } catch (err) {
      toast.error('Could not save billing info: ' + err);
    }
  };

   const handlePlaceOrder = async () => {
  // 1. Guard check: Prompt login if user is not authenticated
  if (!user) {
    toast.error('Please login to place your order!');
    navigate('/login', { state: { from: '/addtocart' } });
    return;
  }

  // 2. Your existing validation & order logic stays exactly as it was
  if (!validateForm()) return;

  if (formData.saveInfo) {
    try {
      await dispatch(saveBillingInfoThunk(formData)).unwrap();
      toast.success('Billing info saved for future checkout!');
    } catch (err) {
      toast.error('Could not save billing info: ' + err);
    }
  }

  const ticketsPurchased = [];
  shopProducts.forEach(sp => {
    ticketsPurchased.push({ ticket: sp.name, ticketPrice: sp.price, quantity: sp.quantity });
  });
  if (dubaiQty > 0) ticketsPurchased.push({ ticket: 'DUBAI_TICKET', ticketPrice: dubaiPrice, quantity: dubaiQty });
  if (thailandQty > 0) ticketsPurchased.push({ ticket: 'THAILAND_TICKET', ticketPrice: thailandPrice, quantity: thailandQty });

  const purchaseData = {
    name: formData.firstName,
    companyName: formData.companyName,
    streetAddress: formData.address,
    apartmentAddress: formData.apartment,
    town: formData.city,
    phone: formData.phone,
    email: formData.email,
    tickets: ticketsPurchased,
    gift: [],
    totalPrice: totalPrice,
  };

  try {
    const purchase = await dispatch(createPurchase(purchaseData)).unwrap();
    const paymentRequest = await dispatch(placeOrders(purchase._id)).unwrap();

    const form = document.createElement('form');
    form.action = paymentRequest.actionUrl;
    form.method = 'POST';
    form.target = '_self';
    Object.entries(paymentRequest).forEach(([key, value]) => {
      if (key !== 'actionUrl') {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    });
    document.body.appendChild(form);
    form.submit();
  } catch (err) {
    toast.error('Failed to place order: ' + err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50">
      <Helmet>
        <title>Checkout & Cart - LuckMyTrip</title>
      </Helmet>
      <Header />
      <section className="container mx-auto md:px-4 px-2 py-12 max-w-7xl">
        {hasItems ? (
          <div className={`grid gap-8 ${showForm ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Left Column: Billing Details */}
            <div>
              {billingLoading ? (
                <div className="text-lg font-semibold text-gray-500">Loading billing info...</div>
              ) : (
                <>
                  {!showForm && (
                    <FileText
                      className="w-6 h-6 text-teal-500 cursor-pointer mb-4"
                      title="Edit Billing Info"
                      onClick={() => setShowForm(true)}
                      tabIndex={0}
                      role="button"
                      aria-label="Edit Billing Info"
                      onKeyDown={(e) => { if (e.key === 'Enter') setShowForm(true); }}
                    />
                  )}
                  {showForm && (
                    <BillingForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      errors={errors}
                      setToggleForm={setShowForm}
                      onSaveBillingInfo={handleSaveBillingInfo}
                    />
                  )}
                </>
              )}
            </div>
            <div className="space-y-4">
              {shopProducts.map((product) => (
                <div key={product.id} className="space-y-2">
                  {/* Product Main Strip */}
                  <div className="bg-white md:rounded-2xl rounded-lg shadow-md md:px-6 md:py-4 px-3 py-3 grid grid-cols-12 items-center">
                    <div className="col-span-5 font-bold text-teal-600 uppercase md:text-lg text-sm truncate">
                      {product.name}
                    </div>
                    <div className="col-span-4 flex items-center justify-center md:gap-3 gap-1.5">
                      <button
                        onClick={() => updateShopItemQty(product.id, product.quantity - 1)}
                        className="w-8 h-8 bg-white flex items-center hover:bg-gray-50 justify-center rounded-md border border-gray-200 transition"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-semibold text-gray-800 text-xs md:text-base w-6 text-center">{product.quantity}</span>
                      <button
                        onClick={() => updateShopItemQty(product.id, product.quantity + 1)}
                        className="w-8 h-8 bg-green-500 flex items-center justify-center hover:bg-green-600 rounded-md"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="col-span-3 font-semibold text-gray-800 text-right md:text-base text-sm">
                      Rs. {(product.quantity * product.price).toFixed(2)}
                    </div>
                  </div>

                  {/* Coupon Strip */}
                  {product.couponCode && (
                    <div className="bg-[#F8FAFC] md:rounded-2xl rounded-lg shadow-sm md:px-6 md:py-3 px-3 py-2 grid grid-cols-12 items-center border-2 border-dashed border-teal-500/30">
                      <div className="col-span-5 flex items-center gap-2 truncate">
                        <span className="bg-teal-500/10 text-teal-600 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                          Coupon
                        </span>
                        <span className="font-bold text-gray-700 text-xs md:text-sm truncate">
                          {product.couponCode}
                        </span>
                      </div>
                      <div className="col-span-4 flex items-center justify-center">
                        <div className="w-8 text-center font-bold text-xs md:text-sm text-gray-600">
                          {product.quantity}
                        </div>
                      </div>
                      <div className="col-span-3 flex items-center justify-end gap-2 text-right">
                        <span className="line-through text-gray-400 font-medium text-xs">
                          Rs. {(product.quantity * 50).toFixed(2)}
                        </span>
                        <span className="font-bold text-teal-600 text-sm md:text-base">
                          Rs. 0
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Totals subtotal={subtotal} total={totalPrice} />
              <PaymentSelector />

              <button
                onClick={handlePlaceOrder}
                className="w-full md:w-auto bg-red-500 text-white md:py-3 md:px-8 px-4 py-2 rounded-xl font-bold hover:bg-red-600 transition uppercase text-base md:text-lg shadow-lg"
              >
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </section>
      <Footer />
    </div>
  );
}

const BillingForm = ({ formData, handleInputChange, errors, setToggleForm, onSaveBillingInfo }) => (
  <div className="bg-white rounded-3xl shadow-lg px-8 py-8">
    <div className="flex justify-between items-center">
      <h2 className="md:text-3xl text-base font-bold text-teal-500 mb-8 uppercase tracking-wide">Billing Details</h2>
      <button onClick={() => setToggleForm(false)} aria-label="Close billing form">
        <X className="md:w-6 md:h-6 w-5 h-5 mb-8 text-teal-500" />
      </button>
    </div>
    <div className="space-y-5">
      <InputField name="firstName" label="First Name*" required value={formData.firstName} onChange={handleInputChange} error={errors.firstName} />
      <InputField name="companyName" label="Company Name (optional)" value={formData.companyName} onChange={handleInputChange} />
      <InputField name="address" label="Street Address*" required value={formData.address} onChange={handleInputChange} error={errors.address} />
      <InputField name="apartment" label="Apartment, floor, etc. (optional)" value={formData.apartment} onChange={handleInputChange} />
      <InputField name="city" label="Town/City*" required value={formData.city} onChange={handleInputChange} error={errors.city} />
      <InputField name="phone" label="Phone Number*" maxLength={10} required value={formData.phone} onChange={handleInputChange} error={errors.phone} />
      <InputField name="email" label="Email Address*" required value={formData.email} onChange={handleInputChange} error={errors.email} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
        <div className="flex items-center">
          <input
            id="saveInfo"
            name="saveInfo"
            type="checkbox"
            checked={formData.saveInfo}
            onChange={handleInputChange}
            className="w-5 h-5 accent-pink-500"
          />
          <label htmlFor="saveInfo" className="ml-2 text-gray-800 md:text-sm text-xs font-medium">
            Save this information for faster check-out next time
          </label>
        </div>

        <button
          type="button"
          onClick={onSaveBillingInfo}
          className="bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-xl transition shadow"
        >
          Save Info
        </button>
      </div>
    </div>
  </div>
);

const InputField = ({ name, label, value, onChange, required, error, maxLength }) => (
  <div>
    <label className="block text-gray-400 text-sm mb-2" htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      required={required}
      value={value}
      maxLength={maxLength}
      onChange={onChange}
      className={`p-3 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 ${error ? 'ring-2 ring-red-500' : ''}`}
    />
    {error && <span className="text-sm text-red-600">This field is required.</span>}
  </div>
);

const PaymentSelector = () => (
  <div className="bg-[#1F8E92] rounded-md md:rounded-2xl shadow-md md:px-6 px-2 py-3 md:py-5 text-white">
    <div className="flex justify-between items-center">
      <span className="font-medium">Bank</span>
      <div className="flex md:gap-2 gap-1.5">
        <div className="md:px-2 md:py-1 px-1 py-0.5 bg-pink-500 text-white text-xs font-bold rounded">bKash</div>
        <div className="md:px-2 md:py-1 px-1 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">VISA</div>
        <div className="md:px-2 md:py-1 px-1 py-0.5 bg-orange-500 text-white text-xs font-bold rounded">MC</div>
        <div className="md:px-2 md:py-1 px-1 py-0.5 bg-orange-600 text-white text-xs font-bold rounded">Nagad</div>
      </div>
    </div>
  </div>
);

const Totals = ({ subtotal, total }) => (
  <div className="bg-white rounded-2xl shadow-md px-6 py-6 space-y-4">
    <div className="flex justify-between">
      <span className="font-medium">Subtotal:</span>
      <span className="font-semibold">Rs. {subtotal}</span>
    </div>
    <hr className="border-gray-200" />
    <div className="flex justify-between text-lg">
      <span className="font-semibold">Total:</span>
      <span className="font-bold">Rs. {total}</span>
    </div>
  </div>
);

const EmptyCart = () => (
  <section className="container mx-auto px-4 py-16 max-w-7xl text-center">
    <div className="flex flex-col items-center justify-center space-y-4">
      <ShoppingCart className="w-16 h-16 text-gray-300" />
      <h2 className="text-2xl font-bold text-gray-600">Your cart is currently empty</h2>
      <p className="text-gray-400 text-sm">Explore our shop and add products to start your checkout.</p>
      <a
        href="/#shop"
        className="mt-4 px-6 py-2.5 bg-[#1F8E92] text-white font-bold rounded-xl shadow hover:bg-[#187578] transition no-underline"
      >
        Go to Shop
      </a>
    </div>
  </section>
);