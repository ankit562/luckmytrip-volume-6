import React, { useEffect, useState } from "react";
import Header from "../../components/dashboardComponent/Header";
import LeftsideNavbar from "../../components/dashboardComponent/LeftsideNavbar";
import { OfferCard } from "../../components/ticketdashboardcomponents/TicketComponent";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../../features/auth/authUserSlice';
import { fetchTickets } from '../../features/tickets/ticketSlice'; 


export default function Ticket() {
  const dispatch = useDispatch();

  const { user, loading: authLoading, isInitialized } = useSelector(state => state.auth);
  const { tickets, loading: ticketsLoading, error: ticketsError } = useSelector(state => state.tickets);

  useEffect(() => {
    if (isInitialized && !user && !authLoading) {
      dispatch(fetchProfile());
    }
  }, [isInitialized, user, authLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  if (ticketsLoading) return <p>Loading tickets...</p>;
  if (ticketsError) return <p>Error loading tickets: {ticketsError}</p>;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftsideNavbar user={user} />
        <main className="flex flex-col lg:px-10 md:px-4 px-2 md:py-8 py-4 bg-blue-50 min-h-0 w-full">
          <h1 className="text-xl md:text-3xl font-bold text-black md:mt-0 mt-5">Tickets details</h1>
          <div className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-0 px-3">
            {tickets.map(ticket => (
              <OfferCard
                key={ticket._id}
                title={ticket.name}
                subtitle={ticket.description.substring(0, 30) + "..."} 
                badge={ticket.status}
                totalTickets={ticket.ticket}
                endsIn={calculateEndsIn(ticket.date)}  
                price={ticket.price}
                country={"India"} 
                drawDate={new Date(ticket.date).toLocaleDateString()}
                limitedTime={true} 
                
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper: Calculate days left from current date until ticket.date
function calculateEndsIn(drawDate) {
  const now = new Date();
  const end = new Date(drawDate);
  const diffTime = end - now;
  if (diffTime <= 0) return "Ended";
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} Day${diffDays !== 1 ? "s" : ""}`;
}
