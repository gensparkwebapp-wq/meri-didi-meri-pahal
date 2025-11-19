import React, { useState } from 'react';
import { Image as ImageIcon, X, ZoomIn, Filter, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface GalleryItem {
  id: string;
  url: string;
  category: 'Training' | 'Events' | 'Distribution' | 'Success Stories' | 'Media';
  title: string;
  date: string;
}

// Mock Data
const galleryData: GalleryItem[] = [
  {
    id: '1',
    category: 'Training',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Skill Development Workshop - Jaipur',
    date: 'Oct 2023'
  },
  {
    id: '2',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1526662092594-e98c1e356527?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Women Day Celebration',
    date: 'Mar 2023'
  },
  {
    id: '3',
    category: 'Distribution',
    url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Free Sewing Machine Distribution',
    date: 'Aug 2023'
  },
  {
    id: '4',
    category: 'Success Stories',
    url: 'https://images.unsplash.com/photo-1596450533115-53002f2224f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Self-Help Group Success',
    date: 'Sep 2023'
  },
  {
    id: '5',
    category: 'Training',
    url: 'https://images.unsplash.com/photo-1605218427368-35b09e7f1b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Ghee Making Training',
    date: 'Nov 2023'
  },
  {
    id: '6',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'State Level Conference',
    date: 'Jul 2023'
  },
  {
    id: '7',
    category: 'Media',
    url: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Press Conference Coverage',
    date: 'Jun 2023'
  },
  {
    id: '8',
    category: 'Success Stories',
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Young Entrepreneur Award',
    date: 'Dec 2023'
  },
  {
    id: '9',
    category: 'Training',
    url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Digital Literacy Class',
    date: 'May 2023'
  }
];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Training', 'Events', 'Distribution', 'Success Stories', 'Media'];

  const filteredImages = selectedCategory === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-earth text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-block p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
             <ImageIcon size={32} className="text-saffron" />
          </div>
          <h1 className="text-4xl font-heading font-bold mb-4">Impact Gallery</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Visual stories of change. Witness the journey of empowerment, training, and success of our Desi Didis.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-saffron text-white border-saffron shadow-md transform scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-saffron hover:text-saffron'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                   <span className="inline-block px-2 py-1 bg-saffron text-white text-[10px] font-bold uppercase tracking-wider rounded w-fit mb-2">
                      {item.category}
                   </span>
                   <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.title}</h3>
                   <div className="flex items-center text-gray-300 text-xs">
                      <Calendar size={12} className="mr-1" /> {item.date}
                   </div>
                   
                   <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                      <ZoomIn size={20} />
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredImages.length === 0 && (
            <div className="text-center py-20">
                <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No images found in this category.</p>
            </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
            >
               <button 
                 onClick={() => setSelectedImage(null)}
                 className="absolute -top-12 right-0 text-white hover:text-saffron transition-colors"
               >
                  <X size={32} />
               </button>
               
               <img 
                 src={selectedImage.url} 
                 alt={selectedImage.title} 
                 className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl bg-black"
               />
               
               <div className="mt-4 text-white">
                  <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-gray-300">
                     <span className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20">
                        {selectedImage.category}
                     </span>
                     <span className="flex items-center gap-1 text-sm">
                        <Calendar size={16} /> {selectedImage.date}
                     </span>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;