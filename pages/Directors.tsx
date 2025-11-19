import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Directors: React.FC = () => {
  const directors = [
    {
      id: 1,
      name: "Dr. Aditi Sharma",
      role: "Founder & CEO",
      image: "https://picsum.photos/400/400?random=10",
      bio: "With over 15 years of experience in social development, Dr. Aditi has spearheaded numerous initiatives for women's rights in rural Rajasthan.",
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Co-Founder & Operations Head",
      image: "https://picsum.photos/400/400?random=11",
      bio: "An IIM graduate with a passion for supply chain optimization, Rajesh ensures that our products reach customers efficiently.",
      linkedin: "#",
      twitter: "#"
    },
    {
      id: 3,
      name: "Priya Singh",
      role: "Director of Impact",
      image: "https://picsum.photos/400/400?random=12",
      bio: "Priya manages our training centers and ensures that our impact metrics align with the United Nations SDGs.",
      linkedin: "#",
      twitter: "#"
    }
  ];

  const advisors = [
    { name: "Amitabh Bachchan", role: "Honorary Advisor", image: "https://picsum.photos/200/200?random=13" },
    { name: "Indra Nooyi", role: "Strategic Advisor", image: "https://picsum.photos/200/200?random=14" },
    { name: "Sudha Murthy", role: "Philanthropy Guide", image: "https://picsum.photos/200/200?random=15" },
    { name: "Ratan Tata", role: "Ethics Committee", image: "https://picsum.photos/200/200?random=16" },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen">
       {/* Header */}
       <div className="bg-earth text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Leadership Team</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Meet the visionaries behind Meri Didi - Meri Pehal who are dedicated to driving social change.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Directors Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {directors.map((director) => (
            <div key={director.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-64 overflow-hidden">
                <img 
                  src={director.image} 
                  alt={director.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{director.name}</h3>
                <p className="text-saffron font-medium mb-4">{director.role}</p>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {director.bio}
                </p>
                <div className="flex gap-4">
                  <a href={director.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href={director.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter size={20} />
                  </a>
                  <button className="text-gray-400 hover:text-earth transition-colors">
                    <Mail size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Board */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-heading font-bold text-center text-earth mb-12">Advisory Board</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {advisors.map((advisor, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100">
                  <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-gray-900">{advisor.name}</h4>
                <p className="text-sm text-gray-500">{advisor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directors;