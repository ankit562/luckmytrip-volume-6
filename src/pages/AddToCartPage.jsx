 import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const cartItems = useSelector(state => state.addtocart?.cartItems) || {};
  const billingInfo = useSelector(state => state.auth?.billingInfo);
  const billingLoading = useSelector(state => state.auth?.billingLoading);

  // Extract raw tickets state safely
  const rawTickets = useSelector(state => state.tickets?.tickets || state.tickets);
  // Ensure tickets is strictly an Array to avoid ".find is not a function"
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
    jackpotPrice = 149, // Fixed jackpot price at 149
  } = cartItems;

  const hasItems =
    dubaiQty > 0 ||
    thailandQty > 0 ||
    goldenWinnerQty > 0 ||
    giftQty > 0 ||
    goaQty > 0 ||
    jackpotQty > 0;

  const subtotal = parseFloat(
    (
      dubaiQty * dubaiPrice +
      thailandQty * thailandPrice +
      goldenWinnerQty * goldenWinnerPrice +
      giftQty * giftPrice +
      goaQty * goaPrice +
      jackpotQty * jackpotPrice
    ).toFixed(2)
  );
  const totalPrice = subtotal;

  const [showForm, setShowForm] = useState(!billingInfo);
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

  // Safe checks for stocks using optional chaining and guarded array lookup
  const dubaiStock = tickets.find(t => t.name?.toLowerCase() === 'dubai')?.ticket ?? 0;
  const thailandStock = tickets.find(t => t.name?.toLowerCase() === 'thailand')?.ticket ?? 0;
  const goaStock = tickets.find(t => t.name?.toLowerCase() === 'goa')?.ticket ?? 0;

  useEffect(() => {
    if (billingInfo) {
      setFormData({ ...billingInfo, saveInfo: false });
      setShowForm(false);
    } else {
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
  }, [billingInfo]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
      let digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        phone: digitsOnly,
      }));
      if (errors.phone) setErrors(prev => ({ ...prev, phone: false }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.address.trim()) newErrors.address = true;
    if (!formData.city.trim()) newErrors.city = true;
    if (!formData.phone.trim() || formData.phone.length !== 10) newErrors.phone = true;
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = true;
    if (!hasItems) newErrors.ticketQty = 'At least one ticket is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    if (formData.saveInfo) {
      try {
        await dispatch(saveBillingInfoThunk(formData)).unwrap();
        toast.success('Billing info saved for future checkout!');
        setShowForm(false);
      } catch (err) {
        toast.error('Could not save billing info: ' + err);
      }
    }

    const ticketsPurchased = [];
    const giftPurchased = [];
    if (dubaiQty > 0)
      ticketsPurchased.push({ ticket: 'DUBAI_TICKET', ticketPrice: dubaiPrice, quantity: dubaiQty });
    if (thailandQty > 0)
      ticketsPurchased.push({ ticket: 'THAILAND_TICKET', ticketPrice: thailandPrice, quantity: thailandQty });
    if (goldenWinnerQty > 0)
      ticketsPurchased.push({ ticket: 'GOLDEN_WINNER_TICKET', ticketPrice: goldenWinnerPrice, quantity: goldenWinnerQty });
    if (goaQty > 0)
      ticketsPurchased.push({ ticket: 'GOA_TICKET', ticketPrice: goaPrice, quantity: goaQty });
    if (jackpotQty > 0)
      ticketsPurchased.push({ ticket: 'JACKPOT_TICKET', ticketPrice: jackpotPrice, quantity: jackpotQty });
    if (giftQty > 0)
      giftPurchased.push({ gift: 'GIFT_TICKET', giftPrice: giftPrice, quantity: giftQty });

    const purchaseData = {
      name: formData.firstName,
      companyName: formData.companyName,
      streetAddress: formData.address,
      apartmentAddress: formData.apartment,
      town: formData.city,
      phone: formData.phone,
      email: formData.email,
      tickets: ticketsPurchased,
      gift: giftPurchased,
      totalPrice: totalPrice,
    };

    try {
      const purchase = await dispatch(createPurchase(purchaseData)).unwrap();
      const paymentRequest = await dispatch(placeOrders(purchase._id)).unwrap();

      // Redirect to payment gateway without clearing cart yet
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
        <title>Buy Contest Tickets & Win Trips</title>
        <meta name="description" content="Participate in contests by buying tickets. Win luxury trips!" />
        <meta name="keywords" content="contest tickets, travel packages, lucky draw" />
        <meta property="og:title" content="Buy Contest Tickets & Win Trips" />
        <meta property="og:description" content="Get tickets for luxury travel contests." />
        <meta property="og:url" content="https://www.theluckmytrip.com/addtocart" />
        <link rel="canonical" href="https://www.theluckmytrip.com/addtocart" />
      </Helmet>
      <Header />
      <section className="container mx-auto md:px-4 px-2 py-12 max-w-7xl">
        {hasItems ? (
          <div className={`grid gap-8 ${showForm ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            <div>
              {billingLoading ? (
                <div className="text-lg">Loading billing info...</div>
              ) : (
                <>
                  {!showForm && (
                    <FileText
                      className="w-6 h-6 text-teal-500 cursor-pointer"
                      title="Edit Billing Info"
                      onClick={() => setShowForm(true)}
                      tabIndex={0}
                      role="button"
                      aria-label="Edit Billing Info"
                      onKeyDown={e => { if (e.key === 'Enter') setShowForm(true); }}
                    />
                  )}
                  {showForm && (
                    <BillingForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      errors={errors}
                      setToggleForm={setShowForm}
                    />
                  )}
                </>
              )}
            </div>
            <div className="space-y-6">
              {dubaiQty > 0 && (
                <TicketRow
                  title="Dubai Ticket"
                  qty={dubaiQty}
                  price={dubaiPrice}
                  setQty={q => dispatch(setDubaiQtys(q))}
                  stock={dubaiStock}
                />
              )}
              {thailandQty > 0 && (
                <TicketRow
                  title="Thailand Ticket"
                  qty={thailandQty}
                  price={thailandPrice}
                  setQty={q => dispatch(setThailandQtys(q))}
                  stock={thailandStock}
                />
              )}
              {goaQty > 0 && (
                <TicketRow
                  title="Goa Ticket"
                  qty={goaQty}
                  price={goaPrice}
                  setQty={q => dispatch(setGoaQtys(q))}
                  stock={goaStock}
                />
              )}
              {goldenWinnerQty > 0 && (
                <TicketRow
                  title="Golden Winner Ticket"
                  qty={goldenWinnerQty}
                  price={goldenWinnerPrice}
                  setQty={q => dispatch(setGoldenWinnerQtys(q))}
                />
              )}
              {giftQty > 0 && (
                <TicketRow
                  title="Gift Package"
                  qty={giftQty}
                  price={giftPrice}
                  setQty={q => dispatch(setGiftQtys(q))}
                />
              )}
              {jackpotQty > 0 && (
                <TicketRow
                  title="Jackpot Ticket"
                  qty={jackpotQty}
                  price={jackpotPrice}
                  setQty={q => dispatch(setJackpotQtys(q))}
                />
              )}
              <Totals subtotal={subtotal} total={totalPrice} />
              <PaymentSelector />
              <CouponSection />
              <button
                onClick={handlePlaceOrder}
                className="w-full md:w-auto bg-red-500 text-white md:py-3 md:px-8 px-4 py-2 rounded-xl font-bold hover:bg-red-600 transition uppercase text-base md:text-lg shadow-lg"
              >
                Place Order
              </button>
              {errors.ticketQty && <p className="text-red-600 mt-4">{errors.ticketQty}</p>}
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

const BillingForm = ({ formData, handleInputChange, errors, setToggleForm }) => (
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
      <div className="flex items-center mt-3">
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
  <div className="bg-white rounded-md md:rounded-2xl shadow-md md:px-6 px-2 py-3 md:py-5">
    <div className="flex justify-between items-center">
      <div className="flex items-center md:gap-3 gap-1">
        <span className="font-medium text-gray-800">Bank</span>
      </div>
      <div className="flex md:gap-2 gap-1.5">
        <div className="md:px-2 md:py-1 px-1 py-0.5 bg-pink-500 text-white text-xs font-bold rounded">bKash</div>
        <div className="md:px-2 md:py-1 px-1 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">VISA</div>
        <div className="md:px-2 md:py-1 px-1 py-0.5 bg-orange-500 text-white text-xs font-bold rounded">MC</div>
        <div className="md:px-2 md:py-1 px-1 py-0.5 bg-orange-600 text-white text-xs font-bold rounded">Nagad</div>
      </div>
    </div>
  </div>
);

const CouponSection = () => (
  <div className="flex md:gap-3 gap-1 md:text-base text-xs">
    <input type="text" placeholder="Coupon Code" className="flex-1 border border-gray-300 rounded-md md:rounded-xl md:px-4 md:py-3 px-2 py-1 focus:ring-2 focus:ring-teal-500" />
    <button className="bg-teal-500 text-white font-bold md:py-3 md:px-6 py-1 px-2 rounded-md md:rounded-xl hover:bg-teal-600 transition uppercase">Apply Coupon</button>
  </div>
);

const TicketRow = ({ title, qty, price, setQty, stock }) => {
  const handleIncrement = () => {
    if (stock !== undefined && stock !== null) {
      if (stock <= 0) {
        toast.error(`${title} is out of stock`);
        return;
      }
      if (qty + 1 > stock) {
        toast.error(`Only ${stock} ${title}(s) available`);
        return;
      }
    }
    setQty(qty + 1);
  };

  return (
    <div className="bg-white md:rounded-2xl rounded-lg shadow-md md:px-6 md:py-5 px-2 py-1 flex items-center justify-between">
      <div className="font-bold text-teal-600 uppercase md:text-lg text-sm">{title}</div>
      <div className="flex items-center md:gap-6 gap-2">
        <button onClick={() => setQty(Math.max(0, qty - 1))} className="w-8 h-8 bg-white flex items-center hover:bg-gray-50 justify-center rounded-md transition">
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <span className="px-4 font-semibold text-gray-800 text-xs md:text-base">{qty}</span>
        <button onClick={handleIncrement} className="w-8 h-8 bg-green-500 flex items-center justify-center hover:bg-green-600 rounded-md">
          <Plus className="w-4 h-4 text-white" />
        </button>
        <div className="font-semibold text-gray-800 min-w-[80px] text-right">Rs. {(qty * price).toFixed(2)}</div>
      </div>
    </div>
  );
};

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
  <section className="container mx-auto px-4 py-12 max-w-7xl mb-40">
    <div className="text-center text-gray-500 font-semibold flex flex-col items-center mt-6">
      <ShoppingCart className="w-16 h-16 mb-3" />
      <h1 className="text-3xl">Your cart is empty.</h1>
    </div>
  </section>
);