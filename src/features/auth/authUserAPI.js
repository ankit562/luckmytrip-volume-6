import axios from '../../lib/axios';

const API_URL = '/auth';
const API_USER_INFO = '/auth/billing-info';
const config = { withCredentials: true };

const signup = (userData) => axios.post(`${API_URL}/register`, userData, config);
const login = (credentials) => axios.post(`${API_URL}/login`, credentials, config);
const logout = () => axios.post(`${API_URL}/logout`, {}, config);
const getProfile = () => axios.get(`${API_URL}/profile`, config);
const verifyOtp = (otpData) => axios.post(`${API_URL}/verify-email`, otpData, config);
const deleteUser = (id) => axios.delete(`${API_URL}/${id}`, config);
const UpdateProfile = (id, userData) => axios.patch(`${API_URL}/update-profile/${id}`, userData, config);
const searchUser = (query) => axios.get(`${API_URL}/search-user`, { params: { query }, ...config });
const getAllProfile = () => axios.get(`${API_URL}/allprofiles`, config);
const getBillingInfo = () => axios.get(API_USER_INFO, config);
const saveBillingInfo = (info) => axios.post(API_USER_INFO, info, config);

export default {
  signup,
  login,
  logout,
  getProfile,
  verifyOtp,
  getAllProfile, 
  deleteUser,
  UpdateProfile,
  searchUser,
  getBillingInfo,
  saveBillingInfo
};