import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CreditCard, Search } from 'lucide-react';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const RecentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}events/get_public_events/`);
      const result = await response.json();
      if (response.ok && result.success) {
        setEvents(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch events.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const searchLower = searchQuery.toLowerCase().trim();
  const filteredEvents = !searchLower
    ? events
    : events.filter((event) => {
        const title = event.title?.toLowerCase() || '';
        const description = event.description?.toLowerCase() || '';
        const location = event.location?.toLowerCase() || '';
        return (
          title.includes(searchLower) ||
          description.includes(searchLower) ||
          location.includes(searchLower)
        );
      });

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-300">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-400">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent text-center drop-shadow-lg"
        >
          Recent Events
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-center max-w-2xl mx-auto text-lg text-gray-300"
        >
          Discover our latest events and join the experience. Browse through a curated list of public events designed to inspire and engage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex justify-center items-center space-x-4"
        >
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-200 placeholder-gray-400 transition-all"
            />
          </div>
        </motion.div>

        {filteredEvents.length === 0 && searchQuery.trim() ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-gray-400"
          >
            <p>No events found matching your search.</p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: 'easeOut' },
                  },
                }}
                className="bg-slate-800/70 border border-slate-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate('/event_detail', { state: { eventId: event.id } })}
              >
                {event.images && event.images.length > 0 ? (
                  <img
                    src={`http://localhost:8000${event.images[0].url}`}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Event+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                    <span className="text-white">No Image Available</span>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Calendar size={16} className="text-purple-400" />
                    <span className="text-white">
                      {new Date(event.start_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <MapPin size={16} className="text-rose-400" />
                    <span className="text-white">
                      {event.location || 'Location not specified'}
                    </span>
                  </div>
                  <p className="text-white text-sm mb-4 line-clamp-2">
                    {event.description || 'No description available'}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard size={16} className="text-yellow-400" />
                    <span className="text-white">
                      {event.event_price ? `INR ${event.event_price}` : 'Free'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RecentEvents;