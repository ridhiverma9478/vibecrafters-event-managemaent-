import { motion } from "framer-motion";
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from "react-router-dom";

const OurWork = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Event categories
  const eventCategories = [
    { id: 'all', name: 'All Events' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'festivals', name: 'Festivals' },
    { id: 'concerts', name: 'Live Concerts' },
    { id: 'celebrations', name: 'Celebrations' }
  ];

  // Complete event data with 6 events per category
  const events = [
    // Weddings (6 events)
    {
      id: 1,
      title: 'Royal Palace Wedding',
      category: 'weddings',
      image: 'https://t3.ftcdn.net/jpg/02/46/22/48/360_F_246224832_aSoSICzJB4G49WcNz0BdVwTxxCNK2tTS.jpg',
      description: 'Luxury wedding at heritage palace with 500+ guests'
    },
    {
      id: 2,
      title: 'Beachside Sangeet',
      category: 'weddings',
      image: 'https://th.bing.com/th/id/R.52b17e3473ad594dfe73362544de783d?rik=GU3zpg5qELo6XQ&riu=http%3a%2f%2fwww.thephuketwedding.com%2fassets%2fimages%2fslide%2fimg-1.jpeg&ehk=WvJHfFCaqO4qhBOXU3Nve9%2bFJBo1HMYwWzwBpJaX5L8%3d&risl=&pid=ImgRaw&r=0',
      description: 'Pre-wedding celebration with dance performances under the stars'
    },
    {
      id: 3,
      title: 'Traditional Mandap Setup',
      category: 'weddings',
      image: 'https://www.shaadidukaan.com/editor-img/image/decor/mandap-decoration11.jpg',
      description: 'Floral mandap with intricate decorations'
    },
    {
      id: 4,
      title: 'Mehndi Ceremony',
      category: 'weddings',
      image: 'https://i.pinimg.com/originals/2d/b7/85/2db7859ae7a5086c4d4e6a4d623674db.jpg',
      description: 'Henna artists creating beautiful designs'
    },
    {
      id: 5,
      title: 'Grand Reception',
      category: 'weddings',
      image: 'https://i.pinimg.com/originals/9c/39/c3/9c39c3ade15b5ae20c545a9482a25a45.jpg',
      description: '500-guest reception with luxury decor'
    },
    {
      id: 6,
      title: 'Haldi Ceremony',
      category: 'weddings',
      image: 'https://storage.googleapis.com/shy-pub/337348/1701912549758_SKU-0363_3.jpg',
      description: 'Traditional haldi ceremony with vibrant colors'
    },

    // Corporate (6 events)
    {
      id: 7,
      title: 'Product Launch',
      category: 'corporate',
      image: 'https://www.bambooevents.co.in/images/new/product-launch-event-planner.png',
      description: 'Tech product reveal with immersive experience'
    },
    {
      id: 8,
      title: 'Annual Conference',
      category: 'corporate',
      image: 'https://www.westerncity.com/sites/main/files/imagecache/medium/main-images/annual_conference_educational_opportunities_0.jpg?1659026974',
      description: '500+ delegate corporate conference'
    },
    {
      id: 9,
      title: 'Award Ceremony',
      category: 'corporate',
      image: 'https://th.bing.com/th/id/OIP.fpye2yQxACoQa11RjHHrtQHaFj?rs=1&pid=ImgDetMain',
      description: 'Glamorous corporate awards night'
    },
    {
      id: 10,
      title: 'Team Building Retreat',
      category: 'corporate',
      image: 'https://th.bing.com/th/id/OIP.IRJlsaRDuyWGPW-fdTc3IAHaE8?rs=1&pid=ImgDetMain',
      description: 'Outdoor activities for team bonding'
    },
    {
      id: 11,
      title: 'Diwali Corporate Party',
      category: 'corporate',
      image: 'https://blog.cherishx.com/wp-content/uploads/2022/10/main.jpg',
      description: 'Festive celebration with cultural performances'
    },
    {
      id: 12,
      title: 'Leadership Summit',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407',
      description: 'Executive leadership conference with keynote speakers'
    },

    // Festivals (6 events)
    {
      id: 13,
      title: 'Ganesh Chaturthi',
      category: 'festivals',
      image: 'https://1.bp.blogspot.com/-3spOsl_hXF4/XTb93BGGtEI/AAAAAAAAAiM/G6KkQbqOidw8hHtLP_D0IzE_wZen7lFcwCLcBGAs/s640/011e957c-2405-4052-9025-c045d11c9acd.jpg',
      description: 'Traditional pandal decorations'
    },
    {
      id: 14,
      title: 'Durga Puja Celebration',
      category: 'festivals',
      image: 'https://i.pinimg.com/originals/74/df/1e/74df1e9e81135a2a8a3007a2fdde8cab.jpg',
      description: 'Cultural performances and pandal hopping'
    },
    {
      id: 15,
      title: 'Navratri Garba Night',
      category: 'festivals',
      image: 'https://ik.imagekit.io/j83rchiauw/seo_popular_master/202309271307_WIUyhgJW8As8xnEI.jpg',
      description: 'Traditional dance festival with live music'
    },
    {
      id: 16,
      title: 'Pongal Celebration',
      category: 'festivals',
      image: 'https://th.bing.com/th/id/OIP.ozOhVrFBYd3Kfo5iw2wxMAHaE8?rs=1&pid=ImgDetMain',
      description: 'Harvest festival with traditional cooking'
    },
    {
      id: 17,
      title: 'New Years Celebration',
      category: 'festivals',
      image: 'https://cheetah.cherishx.com/uploads/1733308584_original.jpg',
      description: 'Dance Like the World’s Watching… Because Tonight, It Is!'
    },
    {
      id: 18,
      title: 'Diwali Mela',
      category: 'festivals',
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/1/381990679/RP/NK/YJ/4494602/diwali-package-500x500.png',
      description: 'Festive fair with lights and traditional food'
    },

    // Live Concerts (6 events)
    {
      id: 19,
      title: 'Bollywood Night',
      category: 'concerts',
      image: 'https://i.pinimg.com/originals/a3/a5/23/a3a52344168527284201c3c078c732f1.jpg',
      description: 'Energetic Bollywood performance with full orchestra'
    },
    {
      id: 20,
      title: 'Classical Music Festival',
      category: 'concerts',
      image: 'https://cdn.theculturetrip.com/wp-content/uploads/2017/07/jodhpur-riff-varun-shiv-kapurflickr.jpg',
      description: 'Traditional Indian classical music concert'
    },
    {
      id: 21,
      title: 'Indie Band Performance',
      category: 'concerts',
      image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Independent artists showcase'
    },
    {
      id: 22,
      title: 'Fusion Music Night',
      category: 'concerts',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'East meets West musical experience'
    },
    {
      id: 23,
      title: 'DJ Night',
      category: 'concerts',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Electronic dance music experience'
    },
    {
      id: 24,
      title: 'Jazz Night',
      category: 'concerts',
      image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f',
      description: 'Smooth jazz performances by renowned artists'
    },

    // Celebrations (6 events)
    {
      id: 25,
      title: 'Anniversary Party',
      category: 'celebrations',
      image: 'https://deowgxgt4vwfe.cloudfront.net/uploads/1662373992_original.jpg',
      description: 'Elegant 25th anniversary celebration'
    },
    {
      id: 26,
      title: 'Birthday Bash',
      category: 'celebrations',
      image: 'https://i.pinimg.com/originals/b4/ba/3c/b4ba3c74118180a7e7cf17887f0478da.jpg',
      description: 'Milestone birthday with custom decor'
    },
    {
      id: 27,
      title: 'Baby Shower',
      category: 'celebrations',
      image: 'https://m.media-amazon.com/images/I/71IC2lqIgdL._SL1500_.jpg',
      description: 'Themed baby shower celebration'
    },
    {
      id: 28,
      title: 'Engagement Party',
      category: 'celebrations',
      image: 'https://th.bing.com/th/id/OIP.liobdIaiyM6nFXu_UT046QHaHa?rs=1&pid=ImgDetMain',
      description: 'Intimate engagement celebration'
    },
    {
      id: 29,
      title: 'Graduation Party',
      category: 'celebrations',
      image: 'https://m.media-amazon.com/images/I/71LmvkK66gL.jpg',
      description: 'Academic achievement celebration'
    },
    {
      id: 30,
      title: 'Farewell Party',
      category: 'celebrations',
      image: 'https://rukminim3.flixcart.com/image/850/1000/xif0q/birthday-combo/q/a/e/farewell-party-decoration-balloons-garland-for-school-collage-original-imags578btnyuyhu.jpeg?q=90&crop=false',
      description: 'Celebrating new beginnings with loved ones'
    }
  ];

  // Additional event that will only appear in "All Events" tab
  const specialEvent = {
    id: 31,
    title: 'Platinum Jubilee Celebration',
    category: 'celebrations',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf',
    description: 'Once-in-a-lifetime royal celebration'
  };

  // Filtering logic - shows 1 per category for "All" plus special event, full list for specific categories
  const filteredEvents = activeCategory === 'all' 
    ? [
        events.find(e => e.category === 'weddings'),
        events.find(e => e.category === 'corporate'),
        events.find(e => e.category === 'festivals'),
        events.find(e => e.category === 'concerts'),
        events.find(e => e.category === 'celebrations'),
        specialEvent // Adding the special event to "All Events" tab
      ].filter(Boolean)
    : events.filter(event => event.category === activeCategory);

  return (
    <section className="relative min-h-screen w-full bg-slate-900 py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />
      <div className="absolute inset-0 bg-radial-gradient from-purple-400/10 via-transparent to-transparent" />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          initial={{ scale: 0, x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
          animate={{ scale: [0, 1, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: Math.random() * 4 + 3, repeat: Infinity }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* <Sparkles className="mx-auto w-12 h-12 text-amber-400 mb-4 animate-pulse" /> */}
          <h1 className="text-4xl md:text-4xl font-extrabold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Our Event Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 font-medium max-w-2xl mx-auto">
            Where Every Promise Shines Like a Pearl
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {eventCategories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-br from-amber-500 to-purple-600 text-white'
                  : 'bg-purple-900/30 text-purple-200 hover:bg-purple-900/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              {activeCategory === category.id && (
                <Sparkles className="w-4 h-4 inline-block ml-2 text-amber-300" />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Event Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { 
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {filteredEvents.map(event => (
            event && (
              <motion.div
                key={event.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0 }
                }}
                className="relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer h-96"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent z-10" />
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-purple-100 font-medium">{event.category}</p>
                </div>
              </motion.div>
            )
          ))}
        </motion.div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative bg-slate-900 rounded-3xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-purple-200 hover:text-amber-400 z-50"
              onClick={() => setSelectedEvent(null)}
            >
              <Sparkles className="w-8 h-8" />
            </button>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative h-96 lg:h-full">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              </div>
              
              <div className="p-8 space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedEvent.title}
                </h2>
                <p className="text-purple-200 uppercase font-medium">{selectedEvent.category}</p>
                <p className="text-purple-100">{selectedEvent.description}</p>
                <Link to="/organize">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-amber-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold"
                  >
                    Book Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating Highlights */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, -60, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 w-40 h-40 bg-amber-400/20 rounded-full blur-xl"
      />
    </section>
  );
};

export default OurWork;