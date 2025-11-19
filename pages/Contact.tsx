import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  return (
    <div className="w-full bg-white">
      <div className="bg-cream py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-heading font-bold text-earth mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our products, or want to join as a coordinator? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-saffron-50 p-3 rounded-lg text-saffron">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Head Office</p>
                    <p className="text-gray-600 mt-1">
                      123 Social Impact Way, Sector 4,<br />
                      Connaught Place, New Delhi 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-saffron-50 p-3 rounded-lg text-saffron">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600 mt-1">+91 98765 43210</p>
                    <p className="text-sm text-gray-500">Mon-Sat, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-saffron-50 p-3 rounded-lg text-saffron">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600 mt-1">hello@merididi.org</p>
                    <p className="text-gray-600">support@merididi.org</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Connect on WhatsApp</h4>
                <Button variant="forest" className="w-full flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Chat with Support
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-xl h-64 w-full overflow-hidden relative">
              <img 
                src="https://picsum.photos/600/400?random=20" 
                alt="Map location" 
                className="w-full h-full object-cover opacity-80" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <span className="bg-white px-4 py-2 rounded-lg shadow-md font-medium text-sm">View on Google Maps</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-earth mb-6">Send us a Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      placeholder="John Doe" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      placeholder="+91 9876543210" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="john@example.com" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                  <select 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="coordinator">Become a Coordinator</option>
                    <option value="seller">Become a Seller</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    id="message"
                    rows={5}
                    placeholder="How can we help you?" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto">
                  Send Message <Send size={18} className="ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;