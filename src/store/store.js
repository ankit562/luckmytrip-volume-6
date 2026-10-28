import {configureStore} from "@reduxjs/toolkit"
import authReducer from '../features/auth/authUserSlice'
import ticketReducer from '../features/tickets/ticketSlice';
import productReducer from '../features/products/productSlice';
import shopReducer from '../features/shops/shopSlice';
import couponReducer from '../features/shops/couponSlice';
import  userInfoSlice from "../features/userinfo/userInfoContactSlice"
import addtocartReducer from '../features/addtocart/addtocartSlice';
import winnerList from "../features/winner/winnersSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    products : productReducer,
    userInfo: userInfoSlice,
    addtocart: addtocartReducer,
    winner: winnerList,
    shop: shopReducer,
    coupons: couponReducer
    
  },
});
export default store;