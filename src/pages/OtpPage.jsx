import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // add useLocation
import OtpContainer from '../components/OtpContainer';
import { verifyOtpUser } from '../features/auth/authUserSlice';

const OtpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;  // get email from route state

  const handleOtpConfirm = async (otp) => {
    if (!email) {
      throw new Error("No email found for OTP verification");
    }
    await dispatch(verifyOtpUser({ email, otp })).unwrap();
    navigate('/login');
  };

  return <OtpContainer onConfirm={handleOtpConfirm} />;
};

export default OtpPage;
