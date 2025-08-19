import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Mail, Lock, User, Phone, Heart } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { BASE_URL } from '../config';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const endpoint = isLogin
      ? `${BASE_URL}users/user_login/`
      : `${BASE_URL}users/user_register/`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isLogin ? {
          email: formData.email,
          password: formData.password
        } : {
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phone
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        const userResponse = await fetch(`${BASE_URL}users/user_details/`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        const userData = await userResponse.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData.user_details));

        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/", { replace: true }), 2000);
      } else {
        toast.success("Registered successfully!");
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex flex-col">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex-grow flex mt-20">
        {/* Left Section */}
        <motion.div
          className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background overlay with animated subtle circles */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
          <div className="relative z-20 px-16 text-center">
            <motion.div
              key={isLogin ? 'login-text' : 'register-text'}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ duration: 0.5 }}
            >
              <Heart className="h-16 w-16 text-rose-500 mx-auto mb-6" />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent mb-4">
                VIBE CRAFTERS ✨
              </h2>
              <p className="text-xl text-gray-200">
                {isLogin 
                  ? "Welcome back! Secure access to a community of inspiration and innovation."
                  : "Join our community for an elevated experience in creativity and connection."}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent mb-8">
                {isLogin ? 'Secure Login' : 'Create Account'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group relative">
                        <User className="h-5 w-5 text-white absolute left-3 top-3" />
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all text-white"
                        />
                      </div>
                      <div className="group relative">
                        <User className="h-5 w-5 text-white absolute left-3 top-3" />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all text-white"
                        />
                      </div>
                    </div>
                    <div className="group relative">
                      <Phone className="h-5 w-5 text-white absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all text-white"
                      />
                    </div>
                  </>
                )}

                <div className="group relative">
                  <Mail className="h-5 w-5 text-white absolute left-3 top-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all text-white"
                  />
                </div>

                <div className="group relative">
                  <Lock className="h-5 w-5 text-white absolute left-3 top-3" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all text-white"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg hover:from-rose-600 hover:to-purple-600 transition-all text-white font-semibold flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isLogin ? 'Logging in...' : 'Creating account...'}
                    </>
                  ) : (
                    isLogin ? 'Secure Login' : 'Create Account'
                  )}
                </motion.button>
              </form>

              <p className="mt-6 text-gray-400">
                {isLogin ? "New to VIBE CRAFTERS?" : "Already have an account?"}
                <button
                  onClick={toggleForm}
                  className="ml-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {isLogin ? 'Register Now' : 'Login Instead'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginRegister;