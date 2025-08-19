import React, { useEffect, useState } from 'react';
import { Sparkles, Ticket, Calendar, MapPin, Clock, User, Hash, Mail, Home, Smartphone, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

const TicketBookings = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get(`${BASE_URL}bookings/get_tickets_by_user/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data.success) {
          setTickets(data.data);
        }
      } catch (error) {
        toast.error('Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
        <Ticket className="inline-block w-8 h-8 mr-2" />
        My Tickets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group bg-slate-800/50 rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Event Header */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">{ticket.event.title}</h3>
              <div className="flex items-center gap-2 text-purple-300">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>{ticket.event.start_date}</span>
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-300">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>{ticket.event.start_date.split(', ')[2]}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>{ticket.event.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-300">
                  <Hash className="w-5 h-5 text-amber-400" />
                  <span>{ticket.ticket_quantity} Tickets</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>₹{ticket.total_price}</span>
                </div>
              </div>
            </div>

            {/* Attendee Information */}
            <div className="border-t border-white/10 pt-4 mb-4">
              <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                Attendee Details
              </h4>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-300">
                  <User className="w-5 h-5 text-amber-400" />
                  <span>{ticket.tickets[0].attendee.firstName} {ticket.tickets[0].attendee.lastName}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span>{ticket.tickets[0].attendee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <span>{ticket.tickets[0].attendee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Home className="w-5 h-5 text-amber-400" />
                  <span>{ticket.tickets[0].attendee.address1}, {ticket.tickets[0].attendee.address2}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <Map className="w-5 h-5 text-amber-400" />
                  <span>{ticket.tickets[0].attendee.state} - {ticket.tickets[0].attendee.pincode}</span>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="border-t border-white/10 pt-4">
              <div className="relative aspect-square bg-white/5 rounded-xl overflow-hidden">
                <img
                  src={`${BASE_URL}${ticket.tickets[0].qr_code}`}
                  alt="QR Code"
                  className="w-full h-full object-contain p-4"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <p className="text-xs text-center text-purple-300 mt-2">
                Booked on {ticket.tickets[0].created_at}
              </p>
            </div>

            {/* Status Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600/30 to-purple-600/30 text-amber-400 text-sm border border-amber-400/30">
              {ticket.booking_status}
            </div>
          </motion.div>
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="text-center py-12 text-purple-300">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-amber-400 animate-pulse" />
          No tickets found. Start exploring events!
        </div>
      )}
    </div>
  );
};

export default TicketBookings;