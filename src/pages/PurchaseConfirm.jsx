import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Package, Mail, User, Phone, MapPin, ArrowRight, Download } from "lucide-react";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import Header from "../components/commonComponent/Header";
import Footer from "../components/commonComponent/Footer";
import { fetchPurchaseById, clearCurrentPurchase, clearCartItems } from "../features/addtocart/addtocartSlice";

export const PurchaseConfirm = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { 
    currentPurchase: orderDetails, 
    purchaseLoading: loading, 
    purchaseError: error 
  } = useSelector((state) => state.addtocart);

  useEffect(() => {
    const txnid = searchParams.get("txnid");
    const status = searchParams.get("status");
    const mihpayid = searchParams.get("mihpayid");

   

    if (txnid) {
      // Fetch order details
      dispatch(fetchPurchaseById(txnid))
        .unwrap()
        .then(() => toast.success("Order details loaded successfully!"))
        .catch((err) => toast.error(`Failed to load order: ${err}`));

      // Clear cart only if payment success
      if (status && status.toLowerCase() === "success") {
        dispatch(clearCartItems());
        localStorage.removeItem("cartItems");
      }
    } else {
      toast.error("No transaction ID found in URL");
    }

    // Clean up order details on unmount
    return () => {
      dispatch(clearCurrentPurchase());
    };
  }, [dispatch, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500 mb-4"></div>
            <p className="text-xl text-gray-600">Loading your order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="text-4xl">❌</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Unable to Load Order</h1>
            <p className="text-gray-600 mb-8">
              {error || "Order not found or invalid transaction ID"}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-600 transition"
            >
              Back to Home
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Success state rendering
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-slate-50">
      <Header />

      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.15}
        numberOfPieces={500}
        recycle={false}
        style={{ position: "fixed", zIndex: 50 }}
      />

      <section className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full shadow-2xl mb-6 animate-bounce">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for your purchase! Your order has been confirmed and is being processed.
          </p>
        </div>

        {/* Order and Customer Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-teal-100">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-teal-500" />
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Order ID</span>
                <span className="font-bold text-teal-600 text-sm font-mono">
                  #{orderDetails._id?.slice(-8).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Status</span>
                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {orderDetails.status === "confirmed" ? "Confirmed" : "Processing"}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Order Date</span>
                <span className="font-semibold text-gray-800">
                  {new Date(orderDetails.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-600 font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-teal-600">
                  ₹{orderDetails.totalPrice?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-teal-100">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-teal-500" />
              <h2 className="text-2xl font-bold text-gray-800">Customer Details</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-800">{orderDetails.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800 break-all">{orderDetails.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-800">{orderDetails.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold text-gray-800">
                    {orderDetails.streetAddress}
                    {orderDetails.apartmentAddress && `, ${orderDetails.apartmentAddress}`}
                    <br />
                    {orderDetails.town}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Purchased */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-teal-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tickets Purchased</h2>
          <div className="space-y-4">
            {orderDetails.tickets?.map((ticket, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">🎫</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {ticket.ticket.replace(/_/g, " ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{ticket.ticketPrice} × {ticket.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-teal-600">
                    ₹{(ticket.ticketPrice * ticket.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">{ticket.quantity} ticket{ticket.quantity > 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}

            {/* Gift Items */}
            {orderDetails.gift?.length > 0 &&
              orderDetails.gift.map((gift, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">🎁</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">
                        {gift.gift.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm text-gray-600">
                        ₹{gift.giftPrice} × {gift.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-600">
                      ₹{(gift.giftPrice * gift.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{gift.quantity} item{gift.quantity > 1 ? 's' : ''}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">Check Your Email</h3>
              <p className="text-gray-600">
                A confirmation email with your order details and tickets has been sent to{" "}
                <span className="font-semibold text-teal-600">{orderDetails.email}</span>.
                Please check your inbox and spam folder.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-white border-2 border-teal-500 text-teal-600 px-8 py-4 rounded-xl font-bold hover:bg-teal-50 transition shadow-md"
          >
            <Download className="w-5 h-5" />
            Download Receipt
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:from-teal-600 hover:to-teal-700 transition shadow-lg"
          >
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};
