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
          // log response data
    }
);


export const fetchTicket = createAsyncThunk(
    'tickets/fetchTicket', async (id) => {
        const res = await getTicketById(id);
        return res.data;
    }
);

export const createTicket = createAsyncThunk(
    'tickets/createTicket', async (formData) => {
        const res = await addTicket(formData);
        return res.data;
    }
);

export const editTicket = createAsyncThunk(
  'tickets/editTicket',
  async ({ id, formData }) => {
    const res = await updateTicket(id, formData);
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
            .addCase(createTicket.fulfilled, (state, action) => {
                state.tickets.push(action.payload);
            })
            .addCase(editTicket.fulfilled, (state, action) => {
                state.tickets = state.tickets.map(t => t._id === action.payload._id ? action.payload : t);
            })
            .addCase(removeTicket.fulfilled, (state, action) => {
                state.tickets = state.tickets.filter(t => t._id !== action.payload);
            })
            .addCase(runTicketDraw.fulfilled, (state) => {})
            ;
    }
});

export default ticketSlice.reducer;
