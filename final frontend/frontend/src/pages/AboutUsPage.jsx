import { motion } from 'framer-motion';
import { Sparkles, Ticket, Heart, Users, Gem } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

const AboutUs = () => {
  const teamMembers = [
    { 
      name: 'Aarav Sharma', 
      role: 'Creative Director', 
      exp: '10+ years in luxury events',
      image: 'https://media.istockphoto.com/id/1297832726/photo/portrait-of-a-smiling-young-businessman.jpg?s=612x612&w=0&k=20&c=32Qg7TnqfGkrDwTL3q0X0Kx9ab3JDzuqxzp4poH39zc=' 
    },
    { 
      name: 'Priya Kapoor', 
      role: 'Lead Designer', 
      exp: 'Expert in thematic storytelling',
      image: 'data:image/jpeg;base64,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' 
    },
    { 
      name: 'Rohan Mehra', 
      role: 'Client Relations', 
      exp: '5-star hospitality background',
      image: 'https://t4.ftcdn.net/jpg/05/08/09/55/360_F_508095569_gWiezEAqSNpFlgJXfQpugdcs5fMBd7f1.jpg' 
    },
    { 
      name: 'Ananya Reddy', 
      role: 'Master Jeweler', 
      exp: '3rd generation craftsman',
      image: 'data:image/jpeg;base64,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' 
    },
  ];

  const stats = [
    { number: '1K+', label: 'Events Curated' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Award Wins' },
    { number: '5M', label: 'Memories Created' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-28 px-6 text-center overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block mb-8"
          >
            <Sparkles className="h-24 w-24 text-amber-400 mx-auto animate-pulse" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent mb-6"
          >
            Crafting Unforgettable Moments
          </motion.h1>
          
          <motion.p
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-xl text-purple-200 max-w-3xl mx-auto mb-12"
          >
            At VIBE CRAFTERS, we transform dreams into reality through exquisite event curation and bespoke jewelry design, creating timeless memories that glitter through generations.
          </motion.p>

          {/* Floating Pearls Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 100 - 50 + '%',
                  y: Math.random() * 100 - 50 + '%'
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  boxShadow: '0 0 15px rgba(245, 158, 11, 0.5)'
                }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Craftsmanship Section */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            className="space-y-6 relative"
          >
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />
            <h2 className="text-3xl font-bold text-white mb-6">Our Artistry</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Every event and jewelry piece is a symphony of precision and passion. We blend traditional craftsmanship with modern innovation to create experiences that resonate with elegance and emotion.
            </p>
            <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/10">
              <Gem className="h-12 w-12 text-amber-400" />
              <p className="text-gray-300">
                500+ hours of meticulous planning in every flagship event
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/30 transition-colors">
                <div className="text-3xl font-bold text-amber-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Master Craftsmen</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A collective of visionaries, artisans, and perfectionists dedicated to exceeding your expectations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/30 transition-all group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-purple-400 mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Heart className="h-12 w-12 text-rose-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Promise</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-purple-400/30 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Uncompromised Quality</h3>
              <p className="text-gray-300">
                From venue selection to gemstone sourcing, we accept nothing less than perfection
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/30 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Bespoke Experiences</h3>
              <p className="text-gray-300">
                Every detail tailored to reflect your unique story and personality
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-rose-400/30 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">End-to-End Excellence</h3>
              <p className="text-gray-300">
                Seamless execution from first consultation to final curtain call
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Ticket className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Process</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-amber-500" />
            {['Vision Casting', 'Design Alchemy', 'Precision Crafting', 'Grand Revelation'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-16`}
              >
                <div className="w-1/2 p-6">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-amber-400 text-lg font-semibold mb-2">Phase 0{index + 1}</div>
                    <h3 className="text-xl text-white mb-2">{step}</h3>
                    <p className="text-gray-300">Detailed description of {step.toLowerCase()} phase...</p>
                  </div>
                </div>
                <div className="w-1/2 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 border-2 border-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;