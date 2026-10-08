import axios from '../../lib/axios';

const API_URL = '/api/v1/cart';

const config = { withCredentials: true };

export const startTicketPurchase = async (purchaseData) => {
  const response = await axios.post(`${API_URL}`, purchaseData, config);
  return response.data;
};

export const getUserCart = async () => {
  const response = await axios.get(`${API_URL}`, config);
  return response.data;
};

export const updateCartItem = async (itemId, updateData) => {
  const response = await axios.patch(`${API_URL}/${itemId}`, updateData, config);
  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await axios.delete(`${API_URL}/${itemId}`, config);
  return response.data;
};

export const placeOrder = async (purchaseId) => {
  const response = await axios.post(`${API_URL}/place-order`, { purchaseId }, config);
  return response.data;
};

// Fetch purchase by ID (no auth needed for success page)
export const getPurchaseDetails = async (purchaseId) => {
  const response = await axios.get(`${API_URL}/purchase/${purchaseId}`);
  return response.data;
};
