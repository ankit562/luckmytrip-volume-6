import axios from 'axios';

const BASE_URL = '/api/user-info'; // Adjust this to your actual base path

export const listUserInfos = () => axios.get(BASE_URL);

export const getUserInfoById = (id) => axios.get(`${BASE_URL}/${id}`);

export const addUserInfo = (userData) =>
  axios.post(BASE_URL, userData, {
    headers: { 'Content-Type': 'application/json' }
  });

export const updateUserInfo = (id, userData) =>
  axios.put(`${BASE_URL}/${id}`, userData, {
    headers: { 'Content-Type': 'application/json' }
  });

export const deleteUserInfo = (id) => axios.delete(`${BASE_URL}/${id}`);
