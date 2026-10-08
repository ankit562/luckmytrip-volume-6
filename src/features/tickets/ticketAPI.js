import axios from '../../lib/axios';

const BASE_URL = '/tickets';

export const listTickets = () => axios.get(BASE_URL,{ withCredentials: true });

export const getTicketById = (id) => axios.get(`${BASE_URL}/${id}`,{ withCredentials: true });

export const addTicket = (formData) =>
  axios.post(BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
export const updateTicket = (id, formData) =>
  axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

export const deleteTicket = (id) => axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });

export const runDraw = (name) =>
  axios.post(`${BASE_URL}/run-draw`, { name }, { withCredentials: true });