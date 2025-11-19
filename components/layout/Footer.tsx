import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube, Heart, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-earth text-white pt-16 pb-8 border-t-4 border-saffron">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-12 w-12 rounded-full bg-white text-earth flex items-center justify-center font-bold text-xl">
                MP
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold leading-none">Meri Didi</span>
                <span className="text-xs text-saffron-100 font-bold tracking-wider uppercase">Meri Pehal</span>
              </div>
            </div>
            <h4 className="font-bold text-saffron mb-2">Meri Pehal Fast Help Artists Welfare Association (Trust)</h4>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              Empowering rural women through self-employment. Join us to create a sustainable ecosystem of skill and respect.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-saffron">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/coordinators" className="text-gray-300 hover:text-white transition-colors">Search Coordinators</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Desi Didi Mart</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Join as Business Partner</Link>
              </li>
              <li>
                <Link to="/directors" className="text-gray-300 hover:text-white transition-colors">Leadership</Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-saffron transition-colors text-sm flex items-center gap-1">
                  <ShieldCheck size={14} /> Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-saffron">Legal & Policy</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Self-Employment Scheme</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Refund Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Distributor Terms</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-saffron">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-saffron shrink-0 mt-1" size={18} />
                <span className="text-gray-300">
                  Jaipur, Rajasthan<br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-saffron shrink-0" size={18} />
                <span className="text-gray-300 font-bold text-lg">7073741421</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-saffron shrink-0" size={18} />
                <span className="text-gray-300">help@merididimart.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Meri Pehal Fast Help Artists Welfare Association (Trust). All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;