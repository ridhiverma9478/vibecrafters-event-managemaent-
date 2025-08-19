import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin } from "lucide-react";

const EventHero = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 mt-25">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
            animate={{
              x: [0, 40, 0],
              y: [0, -20, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center mt-15">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          Discover Inspiring Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-xl text-gray-200 max-w-2xl mx-auto"
        >
          Explore a curated selection of ongoing and upcoming events designed to spark creativity, connection, and community engagement.
        </motion.p>
      </div>
    </section>
  );
};

export default EventHero;