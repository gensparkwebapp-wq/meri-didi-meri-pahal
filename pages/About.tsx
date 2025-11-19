import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="bg-cream py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-heading font-bold text-earth mb-4">About Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meri Didi - Meri Pehal is more than an organization; it's a movement to redefine the economic landscape for rural women in India.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <img 
                src="https://picsum.photos/600/400?random=3" 
                alt="Group of women" 
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-earth mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2023, Meri Didi started with a simple observation: rural women possess incredible skills in traditional crafts and agriculture but lack direct access to markets where these skills are valued correctly.
                </p>
                <p>
                  Middlemen often absorb the majority of profits, leaving the actual creators with barely enough to survive. We decided to change this narrative.
                </p>
                <p>
                  By leveraging technology and a grassroots network of coordinators, we created a platform where Self-Help Groups (SHGs) can sell directly to consumers. Today, we support thousands of women across multiple states, helping them become financially independent leaders in their communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-saffron"
            >
              <div className="w-12 h-12 bg-saffron-50 text-saffron rounded-full flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To empower 1 million rural women by 2030 through digital literacy, skill development, and market access, ensuring sustainable livelihoods.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-earth"
            >
              <div className="w-12 h-12 bg-earth-50 text-earth rounded-full flex items-center justify-center mb-6">
                <Eye size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A world where every rural woman has the agency, resources, and opportunity to shape her own destiny and contribute to the economy.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-forest"
            >
              <div className="w-12 h-12 bg-forest-50 text-forest rounded-full flex items-center justify-center mb-6">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Transparency, Sustainability, Community-First, and Integrity are the pillars upon which every decision at Meri Didi is made.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-heading font-bold text-center text-earth mb-12">How We Work</h2>
            <div className="grid md:grid-cols-4 gap-8">
               {[
                 { title: "Identify", desc: "We identify skilled artisan groups and SHGs in remote areas." },
                 { title: "Train", desc: "We provide training on quality control, packaging, and digital tools." },
                 { title: "Connect", desc: "We list their products on our marketplace for global visibility." },
                 { title: "Deliver", desc: "We handle logistics to ensure products reach you safely." }
               ].map((step, i) => (
                 <div key={i} className="text-center">
                    <div className="w-16 h-16 mx-auto bg-cream rounded-full flex items-center justify-center text-xl font-bold text-saffron mb-4 border-2 border-saffron-100">
                      {i + 1}
                    </div>
                    <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                 </div>
               ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;