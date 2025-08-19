import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Heart, Sparkles, Loader2, Star, Mail, User } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { BASE_URL } from '../config';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ message: '' });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-register');
      return;
    }

    // Get user data from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message || !rating) {
      return toast.error('Please provide both a message and rating!');
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      // Using FormData to match your Django API expectations
      const formDataToSend = new FormData();
      formDataToSend.append('message', formData.message);
      formDataToSend.append('rating', rating.toString());

      const response = await fetch(`${BASE_URL}users/create_feedback/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success('Thank you for your feedback! 💖');
        setFormData({ message: '' });
        setRating(0);
      } else {
        toast.error(data.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Feedback submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex flex-col">
      {/* Pearl Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: "url('https://img.freepik.com/premium-photo/beautiful-background-pearls-shells-light-pink-beige-aesthetic-flat-lay_505557-50399.jpg')",
          zIndex: 0
        }}
      />
      
      <Navbar />
      
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ zIndex: 1 }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            initial={{ scale: 0, x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
            animate={{ scale: [0, 1, 0], opacity: [0, 0.4, 0] }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity }}
          />
        ))}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        toastStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-grow flex items-center justify-center p-8 mt-24 relative z-10"
      >
        <motion.div
          className="w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8 relative">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-8 left-1/2 -translate-x-1/2"
            >
              <Heart className="h-16 w-16 text-amber-400/80 fill-amber-400/20" />
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent mt-8">
              Share Your Feedback
            </h2>
            <p className="mt-2 text-purple-300">Your experience helps us improve</p>
            
            {userData && (
              <div className="mt-4 text-sm text-purple-200">
                <p>Logged in as: {userData.first_name} {userData.last_name}</p>
                <p className="text-purple-300">{userData.email}</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <textarea
                  name="message"
                  placeholder="Share your thoughts..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 text-white placeholder-purple-300/50 resize-none transition-all"
                  required
                />
              </div>

              <div className="py-4">
                <p className="text-center text-purple-300 mb-2">How would you rate your experience?</p>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    >
                      <Star
                        className={`h-8 w-8 transition-colors duration-300 ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-600/20 text-gray-600'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting || !rating}
              className={`w-full py-3 bg-gradient-to-r from-amber-600 to-purple-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-purple-700 transition-all relative overflow-hidden group ${
                !rating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center justify-center gap-2"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </motion.div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  Submit Feedback
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default FeedbackPage;