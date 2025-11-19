import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Star, ChevronRight, ChevronLeft, Percent, Users, Award, Briefcase, ShieldCheck, Instagram, MapPin, Phone, Navigation } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { InstagramPost } from '../types';

// Mock Instagram Data for Homepage
const mockInstaFeed: InstagramPost[] = [
  { id: '1', caption: 'Fresh Ghee Stock Arrived! #DesiDidi', media_url: 'https://images.unsplash.com/photo-1605218427368-35b09e7f1b5a?q=80&w=300&auto=format&fit=crop', permalink: '#', timestamp: '2h ago', likes: 120 },
  { id: '2', caption: 'Handmade with love ❤️ #Empowerment', media_url: 'https://images.unsplash.com/photo-1596450533115-53002f2224f8?q=80&w=300&auto=format&fit=crop', permalink: '#', timestamp: '5h ago', likes: 85 },
  { id: '3', caption: 'New Collection of Sarees 🧣', media_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300&auto=format&fit=crop', permalink: '#', timestamp: '1d ago', likes: 200 },
  { id: '4', caption: 'Diwali Special Offers! 🪔', media_url: 'https://images.unsplash.com/photo-1603903631867-6a1f0c143776?q=80&w=300&auto=format&fit=crop', permalink: '#', timestamp: '2d ago', likes: 150 },
];

const Home: React.FC = () => {
  // Hero Animation State
  const [heroIndex, setHeroIndex] = useState(0);
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  
  const heroSlides = [
    {
      id: 1,
      text: "Recognition of skill, respect for Didi!",
      subtext: "Pure Desi Ghee churned in the courtyard of the house. Preserving the authentic taste of tradition.",
      // Image of rural woman / dairy context
      image: "https://images.unsplash.com/photo-1605218427368-35b09e7f1b5a?q=80&w=2000&auto=format&fit=crop", 
    },
    {
      id: 2,
      text: "Women Empowerment - Self-Employment Scheme",
      subtext: "Making Pickles and Papads with skill and love. A path to self-reliance for every rural woman.",
      // Image of spices / food prep
      image: "https://images.unsplash.com/photo-1596450533115-53002f2224f8?q=80&w=2000&auto=format&fit=crop", 
    },
    {
      id: 3,
      text: "Join Desi Didi Mart",
      subtext: "Become our Distributor, Coordinator, or Business Partner. Get employment, respect, and income – everything on one platform!",
      // Image of women group / empowerment
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: "Household Items", icon: "🏠", color: "bg-orange-100 text-orange-700" }, // Spices, Papad, Pickles
    { name: "Handicrafts", icon: "🎨", color: "bg-purple-100 text-purple-700" }, // Rakhi, Bandhanwar
    { name: "Textiles", icon: "🧵", color: "bg-blue-100 text-blue-700" }, // Bags, Sarees
    { name: "Herbal Products", icon: "🌿", color: "bg-green-100 text-green-700" }, // Oils, Soaps
    { name: "Home-made Food", icon: "🍪", color: "bg-yellow-100 text-yellow-700" }, // Namkeen, Laddus
  ];

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryContainerRef.current) {
      const scrollAmount = 300;
      categoryContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section with Animation */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-earth-800">
        <AnimatePresence mode='wait'>
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={heroSlides[heroIndex].image} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-10">
          <div className="max-w-3xl">
            <AnimatePresence mode='wait'>
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                 <div className="inline-block px-4 py-1 rounded-full bg-saffron text-white font-semibold text-sm mb-4 shadow-lg">
                    Meri Didi - Meri Pehal
                  </div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-lg">
                  {heroSlides[heroIndex].text}
                </h1>
                <p className="text-xl text-cream-50 mb-8 leading-relaxed font-medium drop-shadow-md">
                  {heroSlides[heroIndex].subtext}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl border-2 border-transparent hover:border-white">
                  Shop Desi Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white hover:text-earth border-white">
                  Join as Partner
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white/80 hover:text-white hover:bg-white/10 border-2 border-transparent">
                   <ShieldCheck className="mr-2" size={18} /> Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discount Banner */}
      <div className="bg-saffron text-white py-3 overflow-hidden relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-bold text-lg md:text-xl flex items-center justify-center gap-2"
          >
            <Percent size={24} className="fill-white text-saffron bg-white rounded-full p-1" />
            10% to 30% DISCOUNT on all products for Members & Workers!
          </motion.div>
        </div>
      </div>

      {/* Categories Carousel Section */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-earth mb-4">Desi Didi Mart Grocery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Authentic village-made products directly from rural households. Pure, Organic, and Homemade.
            </p>
          </div>

          <div className="relative group px-4 md:px-8">
            {/* Navigation Buttons */}
            <button 
                onClick={() => scrollCategories('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-earth hover:bg-saffron hover:text-white transition-all md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous category"
            >
                <ChevronLeft size={24} />
            </button>
            
            <button 
                onClick={() => scrollCategories('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-earth hover:bg-saffron hover:text-white transition-all md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                aria-label="Next category"
            >
                <ChevronRight size={24} />
            </button>

            {/* Scrollable Container */}
            <div 
                ref={categoryContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 snap-x snap-mandatory scroll-smooth justify-center md:justify-start"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((cat, idx) => (
                  <Link to="/shop" key={idx} className="flex-shrink-0 w-48 md:w-64 snap-start">
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="flex flex-col items-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer h-full relative overflow-hidden group/card"
                    >
                      {/* Decorative Background Element */}
                      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover/card:scale-150 ${cat.color.split(' ')[0]}`}></div>
                      
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 ${cat.color} shadow-inner ring-4 ring-white`}>
                        {cat.icon}
                      </div>
                      <h3 className="font-heading font-semibold text-gray-900 text-center text-lg">{cat.name}</h3>
                      <div className="mt-3 flex items-center text-xs text-gray-400 font-medium opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <span>Shop Now</span>
                        <ArrowRight size={12} className="ml-1" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
            <div className="text-center mt-8">
               <Link to="/shop" className="inline-flex items-center font-bold text-saffron hover:text-saffron-600 transition-colors">
                  View All Categories <ArrowRight size={16} className="ml-2" />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Integration */}
      <section className="py-16 bg-white border-t border-gray-100">
         <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
               <div>
                  <h2 className="text-3xl font-heading font-bold text-earth mb-2 flex items-center gap-2">
                     <Instagram className="text-pink-600" /> Follow @MeriDidiMart
                  </h2>
                  <p className="text-gray-600">See what our Didis are creating today. Live from the villages.</p>
               </div>
               <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                     View on Instagram
                  </Button>
               </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
               {mockInstaFeed.map((post) => (
                  <a 
                     key={post.id} 
                     href={post.permalink} 
                     target="_blank" 
                     rel="noreferrer"
                     className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                  >
                     <img src={post.media_url} alt={post.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <p className="text-white text-sm font-medium text-center line-clamp-3">{post.caption}</p>
                     </div>
                     <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm">
                        ❤️ {post.likes}
                     </div>
                  </a>
               ))}
            </div>
         </div>
      </section>

      {/* Google Map Store Integration */}
      <section className="py-16 bg-gray-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">
               <div className="md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-earth text-white">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                     <MapPin size={32} className="text-saffron" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold mb-4">Visit Our Store</h2>
                  <p className="text-gray-200 mb-8 leading-relaxed">
                     Experience the quality firsthand. Visit our main center to see how we package joy and tradition.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                     <div className="flex items-start gap-4">
                        <MapPin className="shrink-0 text-saffron mt-1" />
                        <div>
                           <h4 className="font-bold">Desi Didi Mart HQ</h4>
                           <p className="text-sm text-gray-300">123 Social Impact Way, Sector 4,<br/>Jaipur, Rajasthan 302004</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <Phone className="shrink-0 text-saffron mt-1" />
                        <div>
                           <h4 className="font-bold">Contact</h4>
                           <p className="text-sm text-gray-300">+91 70737 41421</p>
                        </div>
                     </div>
                  </div>

                  <Button variant="primary" className="w-full justify-center bg-white text-earth hover:bg-gray-100">
                     <Navigation size={18} className="mr-2" /> Get Directions
                  </Button>
               </div>
               <div className="md:w-2/3 h-80 md:h-auto bg-gray-200 relative">
                   {/* Placeholder for Interactive Google Map */}
                   <img 
                     src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
                     alt="Store Location Map" 
                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                   />
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white p-2 rounded-lg shadow-xl transform -translate-y-8 animate-bounce">
                         <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-saffron rounded-md flex items-center justify-center text-white font-bold">MP</div>
                            <div className="text-xs text-gray-800 font-bold pr-2">We are here!</div>
                         </div>
                         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45"></div>
                      </div>
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* Join Movement CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-earth rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20"></div>
            
            <div className="grid md:grid-cols-2 gap-10 p-8 md:p-16 relative z-10">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Get Employment, Respect & Income
                </h2>
                <p className="text-lg text-gray-200 mb-8">
                  Join Desi Didi Mart and become our Distributor, Coordinator, or Business Partner. 
                  Everything on one platform!
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="bg-saffron rounded-full p-1"><Briefcase size={16} /></div>
                    <span>Self-Employment Scheme</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-saffron rounded-full p-1"><Award size={16} /></div>
                    <span>Recognition of Skill</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-saffron rounded-full p-1"><Users size={16} /></div>
                    <span>Community Leadership</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button variant="primary" size="lg" className="bg-white text-earth hover:bg-gray-100">
                    Apply Now
                  </Button>
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center">
                 {/* Placeholder for Trust Logo or illustration */}
                 <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center">
                    <h3 className="text-2xl font-bold text-saffron mb-2">Meri Pehal</h3>
                    <p className="text-white text-sm uppercase tracking-widest mb-4">Fast Help Artists Welfare Association (Trust)</p>
                    <p className="text-4xl font-bold text-white">Jaipur</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
