import React, { useState } from 'react';

const OtpContainer = ({ onConfirm }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      await onConfirm(otp);
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-blue-50">
  <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 flex flex-col items-center space-y-4 border border-blue-100">
    <h2 className="text-2xl font-bold text-blue-900 mb-1">Email Confirmation</h2>
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
      <label htmlFor="otp" className="block text-gray-700 font-medium text-sm mb-1">
        Enter OTP sent to your email
      </label>
      <input
        type="text"
        id="otp"
        name="otp"
        value={otp}
        onChange={handleChange}
        maxLength={6}
        autoComplete="one-time-code"
        placeholder="123456"
        required
        disabled={loading}
        className="tracking-widest text-lg md:text-2xl text-center border-2 border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-blue-50 disabled:opacity-60"
      />
      {error && (
        <p className="text-red-500 text-sm font-semibold -mt-2">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-150 shadow-md disabled:bg-blue-200 disabled:cursor-not-allowed"
      >
        {loading ? "Verifying..." : "Confirm OTP"}
      </button>
    </form>
  </div>
</div>

  );
};

export default OtpContainer;


    // <div className="otp-container">
    //   <h2>Email Confirmation</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="otp">Enter OTP sent to your email</label>
    //     <input
    //       type="text"
    //       id="otp"
    //       name="otp"
    //       value={otp}
    //       onChange={handleChange}
    //       maxLength={6}
    //       autoComplete="one-time-code"
    //       placeholder="123456"
    //       required
    //       disabled={loading}
    //       className="otp-input"
    //       style={{ letterSpacing: '0.3em', fontSize: '1.2rem', textAlign: 'center' }}
    //     />
    //     {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
    //     <button type="submit" disabled={loading} className="confirm-button">
    //       {loading ? 'Verifying...' : 'Confirm OTP'}
    //     </button>
    //   </form>
    // </div>