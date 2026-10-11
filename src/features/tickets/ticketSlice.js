 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    listTickets,
    getTicketById,
    addTicket,
    updateTicket,
    deleteTicket,
    runDraw
} from './ticketAPI';

// Thunks for async CRUD operations
export const fetchTickets = createAsyncThunk(
    'tickets/fetchTickets',
    async () => {
        const res = await listTickets();  
        return res.data;
    }
);

export const fetchTicket = createAsyncThunk(
    'tickets/fetchTicket', async (id) => {
        const res = await getTicketById(id);
        return res.data;
    }
);

export const createTicket = createAsyncThunk(
    'tickets/createTicket', async (formData, { dispatch }) => {
        const res = await addTicket(formData);
        dispatch(fetchTickets()); // Cleanly refetches the updated list
        return res.data;
    }
);

export const editTicket = createAsyncThunk(
  'tickets/editTicket',
  async ({ id, formData }, { dispatch }) => {
    const res = await updateTicket(id, formData);
    dispatch(fetchTickets()); // Cleanly refetches the updated list
    return res.data;
  }
);

export const removeTicket = createAsyncThunk(
    'tickets/removeTicket', async (id) => {
        await deleteTicket(id);
        return id;
    }
);

export const runTicketDraw = createAsyncThunk(
  'tickets/runTicketDraw',
  async (name) => {
    const res = await runDraw(name);
    return res.data;
  }
);

// Slice definition
const ticketSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        selectedTicket: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => { state.loading = true; })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTicket.fulfilled, (state, action) => {
                state.selectedTicket = action.payload;
            })
            .addCase(removeTicket.fulfilled, (state, action) => {
                state.tickets = state.tickets.filter(t => t._id !== action.payload);
            })
            .addCase(runTicketDraw.fulfilled, (state) => {})
            ;
    }
});

export default ticketSlice.reducer;
