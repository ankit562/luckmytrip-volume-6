import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import TicketPage from './pages/TicketPage';
import ContactUsPage from './pages/ContactUsPage'
import AddToCartPage from './pages/AddToCartPage'
import Dashboard from './pages/dashboard/DashboardPage';
import OtpPage from './pages/OtpPage';
import { Toaster } from "react-hot-toast";
import { Loading } from './components/Loading';
import { useEffect } from 'react';
import { fetchProfile } from './features/auth/authUserSlice';

import Journey from './pages/dashboard/home/Journey';
import Jackpot from './pages/dashboard/home/Jackpot';
import SpinLuck from './pages/dashboard/home/SpinLuck';
import DreamTrip from './pages/dashboard/explore/DreamTrip';
import TripInfo from './pages/dashboard/explore/TripInfo';
import GoldenWinner from './pages/dashboard/explore/GoldenWinner';
import SuperAdmin from './pages/dashboard/users/SuperAdmin';
import Admin from './pages/dashboard/users/Admin';
import ContentCreator from './pages/dashboard/users/Content-creator';
import Client from './pages/dashboard/Client';
import Ticket from './pages/dashboard/Tickets';
import { PurchaseConfirm } from './pages/PurchaseConfirm';
import {PurchaseCancel} from './pages/PurchaseCancel';
import Aboutus from './pages/Aboutus';
import Privacy from './pages/Privacy';
import TaC from './pages/TaC';
import HowToPlay from './pages/HowToPlay';
import Faq from './pages/Faq';
import WinnerList from './pages/Winners';




function App() {
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const isInitialized = useSelector(state => state.auth.isInitialized);
  const dispatch = useDispatch();

useEffect(() => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  if (!isInitialized && !loading) {
    if (token) {
      // Fetch profile only when user has a saved token
      dispatch(fetchProfile());
    } else {
      // If no token exists, run fetchProfile anyway so Redux sets isInitialized to true
      // OR if your slice has an init action, run dispatch(fetchProfile())
      dispatch(fetchProfile());
    }
  }
}, [dispatch, isInitialized, loading]);

if (!isInitialized) {
  return <Loading />;
}


  return (
    <div className=''>
      <Routes>

        <Route path="/home/journey"
          element={
            user && ["content-creator", "admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<Journey />)
              : (<Navigate to="/login" />)
          } />

        <Route path="/home/jackpot"
          element={
            user && ["content-creator", "admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<Jackpot />)
              : (<Navigate to="/login" />)
          } />
        <Route path="/home/spinluck"
          element={
            user && ["content-creator", "admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<SpinLuck />)
              : (<Navigate to="/login" />)
          } />
        {/* home end*/}



        <Route path="/explore/dreamtrip"
          element={
            user && ["content-creator", "admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<DreamTrip />)
              : (<Navigate to="/login" />)
          } />
        <Route path="/explore/tripinfo"
          element={
            user && ["content-creator", "admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<TripInfo />)
              : (<Navigate to="/login" />)
          } />
        <Route path="/explore/goldenwinner"
          element={
            user && ["content-creator", "admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<GoldenWinner />)
              : (<Navigate to="/login" />)
          } />
        {/* explore end */}



        <Route path="/users/superadmin"
          element={
            user && ["superadmin"].includes(user.role?.toLowerCase())
              ? (<SuperAdmin />)
              : (<Navigate to="/login" />)
          } />
        <Route path="/users/admin"
          element={
            user && ["admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<Admin />)
              : (<Navigate to="/login" />)
          } />
        <Route path="/users/content-creator"
          element={
            user && ["content-creator", "admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<ContentCreator />)
              : (<Navigate to="/login" />)
          } />
        {/* users types */}




        <Route path="/dashboard/client"
          element={
            user && ["admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<Client />)
              : (<Navigate to="/login" />)
          } />
        <Route path="/dashboard/tickets"
          element={
            user && ["content-creator", "admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<Ticket />)
              : (<Navigate to="/login" />)
          } />
        <Route path="/dashboard"
          element={
            user && ["content-creator", "admin", "superadmin"].includes(user.role?.toLowerCase())
              ? (<Dashboard />)
              : (<Navigate to="/login" />)
          } />
        {/* dashboard end here */}
        

        <Route path="/signup" element={ <SignupPage />} />

        <Route path="/login" element={<LoginPage />} />


        <Route path="/otp-verification" element={<OtpPage />} />

        <Route path="/"  element={  <HomePage />} />
        <Route path="/explore" element={ <ExplorePage />} />
        <Route path="/ticket" element={ <TicketPage /> } />
        <Route path="/contactus" element={ <ContactUsPage /> } />
        <Route path="/addtocart" element={ <AddToCartPage /> } />
        <Route path="/payment-success" element={ <PurchaseConfirm/> }/>
        <Route path="/payment-failed" element={ <PurchaseCancel/> }/>
        <Route path="/aboutus" element={ <Aboutus/> }/>
        <Route path="/privacypolicy" element={ <Privacy/> }/>
        <Route path="/termsandconditions" element={ <TaC/> }/>
        <Route path="/howtoplay" element={ <HowToPlay/> }/>
        <Route path="/faq" element={ <Faq/> }/>
        <Route path="/winners"  element={<WinnerList/>} />

        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
