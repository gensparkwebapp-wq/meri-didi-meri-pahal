import React from 'react';
import { 
  TrendingUp, ShieldCheck, FileText, Users, CheckCircle, BadgeIndianRupee, Scale, Building2, 
  Facebook, Instagram, MessageCircle, MapPin, Calendar, Gift,
  ScanBarcode, ClipboardCheck, BarChart3, FileSignature,
  Map, Smartphone, Globe, ArrowDown, Download, Bell
} from 'lucide-react';
import Button from '../components/ui/Button';

const Franchise: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-earth text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-saffron/20 border border-saffron/30 text-saffron-100 font-semibold text-sm mb-4">
            Limited Opportunity: 10 Slots Only
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Investor Model – Mini Franchise
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Join Desi Didi Mart as a major stakeholder. Invest in rural women empowerment and earn sustainable returns with complete transparency.
          </p>
          <Button variant="primary" size="lg" className="shadow-lg shadow-saffron/20">
            Apply for Partnership
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Investment Model Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg border-t-4 border-saffron p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 bg-saffron text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">Tier 1 Investment</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-earth">₹1 Lakh</span>
              <span className="text-gray-500">/ One Time</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <TrendingUp className="text-green-600 shrink-0 mt-1" size={20} />
                <div>
                  <span className="font-bold text-gray-900">3.5% – 5% Dividend</span>
                  <p className="text-sm text-gray-600">Monthly/Quarterly returns from profits</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="text-blue-600 shrink-0 mt-1" size={20} />
                <div>
                  <span className="font-bold text-gray-900">Fixed Partnership Agreement</span>
                  <p className="text-sm text-gray-600">Legally binding MOU & Terms</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-saffron shrink-0 mt-1" size={20} />
                <div>
                  <span className="font-bold text-gray-900">Daily Reporting</span>
                  <p className="text-sm text-gray-600">Complete transparency on sales & ops</p>
                </div>
              </li>
            </ul>
            <Button variant="outline" className="w-full">Select Tier 1</Button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-t-4 border-earth p-8 group hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">Tier 2 Investment</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-earth">₹2 Lakh</span>
              <span className="text-gray-500">/ One Time</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <TrendingUp className="text-green-600 shrink-0 mt-1" size={20} />
                <div>
                  <span className="font-bold text-gray-900">3.5% – 5% Dividend</span>
                  <p className="text-sm text-gray-600">Monthly/Quarterly returns from profits</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="text-purple-600 shrink-0 mt-1" size={20} />
                <div>
                  <span className="font-bold text-gray-900">Advisory Role</span>
                  <p className="text-sm text-gray-600">Strategic input in district operations</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BadgeIndianRupee className="text-saffron shrink-0 mt-1" size={20} />
                <div>
                  <span className="font-bold text-gray-900">Priority Revenue Share</span>
                  <p className="text-sm text-gray-600">Priority in profit distribution</p>
                </div>
              </li>
            </ul>
            <Button variant="earth" className="w-full">Select Tier 2</Button>
          </div>
        </div>

        {/* Branding & Marketing Strategy */}
        <div className="mb-12">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-earth mb-4">Branding & Marketing Strategy</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                 Our robust multi-channel marketing approach ensures high visibility, consistent sales, and deep community engagement.
              </p>
           </div>

           <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Social Media */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:border-blue-300 transition-colors">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                       <Facebook size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900">Social Media</h3>
                 </div>
                 <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Product Posts & Reels</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Live Demos by Didis</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Customer Testimonials</li>
                 </ul>
              </div>

              {/* Community Engagement */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:border-green-300 transition-colors">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-full">
                       <MessageCircle size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900">WhatsApp Groups</h3>
                 </div>
                 <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Local Customer Engagement</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Daily "Fresh Stock" Offers</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Direct Order Booking</li>
                 </ul>
              </div>

              {/* Local Presence */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 hover:border-red-300 transition-colors">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-full">
                       <MapPin size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900">Google Business</h3>
                 </div>
                 <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Store Location Mapping</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Local SEO Optimization</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Reviews & Ratings Management</li>
                 </ul>
              </div>
           </div>

           {/* Campaigns */}
           <div className="bg-gradient-to-r from-earth to-saffron rounded-2xl p-8 md:p-12 text-white shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                 <div>
                    <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-3">
                       <Calendar className="text-white" /> Strategic Campaigns
                    </h3>
                    <div className="grid gap-6">
                       <div>
                          <h4 className="font-bold text-lg mb-1 text-saffron-100">Festive Sales</h4>
                          <p className="text-white/80 text-sm">Special discounts and gift hampers for Women's Day, Raksha Bandhan, and Diwali.</p>
                       </div>
                       <div>
                          <h4 className="font-bold text-lg mb-1 text-saffron-100">Mart Week Sale</h4>
                          <p className="text-white/80 text-sm">"Offer Week" every month to boost recurring sales and clear inventory.</p>
                       </div>
                    </div>
                 </div>
                 <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 max-w-sm">
                    <div className="flex items-center gap-3 mb-3">
                       <Gift size={24} className="text-yellow-300" />
                       <span className="font-bold text-lg">Next Big Campaign</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                       Preparing for the upcoming <strong>"Desi Diwali"</strong> campaign. Join us now to maximize your returns during the festive season!
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Tech Integrations */}
        <div className="mb-16">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-earth mb-4">Tech-Enabled Marketing Integrations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                 Leveraging cutting-edge technology to automate reach, showcase products, and drive engagement.
              </p>
           </div>
           <div className="grid md:grid-cols-4 gap-6">
              {/* Instagram API */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                 <div className="w-14 h-14 mx-auto bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-4">
                    <Instagram size={28} />
                 </div>
                 <h3 className="font-bold text-gray-900 mb-2">Instagram API</h3>
                 <p className="text-sm text-gray-600">Automated product showcase directly from inventory to Instagram Shop.</p>
              </div>

              {/* WhatsApp Broadcast */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                 <div className="w-14 h-14 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle size={28} />
                 </div>
                 <h3 className="font-bold text-gray-900 mb-2">WhatsApp Broadcast</h3>
                 <p className="text-sm text-gray-600">One-tap bulk messaging link for coordinators to share updates instantly.</p>
              </div>

              {/* Google Map */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                 <div className="w-14 h-14 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <MapPin size={28} />
                 </div>
                 <h3 className="font-bold text-gray-900 mb-2">Google Business Map</h3>
                 <p className="text-sm text-gray-600">Integrated live store location and SEO for higher footfall.</p>
              </div>

              {/* Push Notifications */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-saffron-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                 <div className="w-14 h-14 mx-auto bg-saffron-50 text-saffron rounded-full flex items-center justify-center mb-4">
                    <Bell size={28} />
                 </div>
                 <h3 className="font-bold text-gray-900 mb-2">Push Notifications</h3>
                 <p className="text-sm text-gray-600">Real-time alerts for flash sales, new offers, and order updates.</p>
              </div>
           </div>
        </div>

        {/* Inventory Management System */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-earth mb-4">Inventory & Operations Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A streamlined, tech-enabled approach to manage stock and sales efficiently while empowering women.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Barcode */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <ScanBarcode size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Barcode-Based Stock</h3>
              <p className="text-sm text-gray-600"> Automated tracking of every product unit for zero-error inventory management.</p>
            </div>

            {/* Weekly Check */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <ClipboardCheck size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Weekly Stock Checking</h3>
              <p className="text-sm text-gray-600">Regular physical audits to ensure digital records match ground reality.</p>
            </div>

            {/* Daily Report */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                <BarChart3 size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Daily Sales Report</h3>
              <p className="text-sm text-gray-600">Transparent daily analytics sent to all stakeholders and partners.</p>
            </div>

            {/* Contract */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-saffron-100 text-center hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-saffron/10 rounded-bl-full -mr-8 -mt-8"></div>
              <div className="w-14 h-14 mx-auto bg-saffron-50 text-saffron rounded-full flex items-center justify-center mb-4">
                <FileSignature size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Women-First Contract</h3>
              <p className="text-sm text-gray-600">"Inventory Contract" is exclusively issued in the name of a <span className="font-bold text-saffron">Female Member</span> to ensure direct benefit.</p>
            </div>
          </div>
        </div>

        {/* Expansion Roadmap */}
        <div className="mb-16">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-earth mb-4">Strategic Expansion Roadmap</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                 Our step-by-step plan to scale Desi Didi Mart from a local initiative to a global movement.
              </p>
           </div>

           <div className="max-w-4xl mx-auto relative">
              {/* Connecting Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -ml-px hidden md:block"></div>
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 -ml-px md:hidden"></div>

              {/* Phase 1 */}
              <div className="relative mb-12 md:mb-8">
                 <div className="md:flex items-center justify-between w-full">
                    <div className="order-1 md:w-5/12 mb-4 md:mb-0 md:text-right">
                       <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-saffron">
                          <h3 className="text-xl font-bold text-earth mb-1">Phase 1: Pilot Launch</h3>
                          <p className="text-sm text-gray-600">Establishing 3–5 Marts in <span className="font-bold text-saffron">Jaipur</span> to validate the model and operational flow.</p>
                       </div>
                    </div>
                    <div className="order-1 md:w-2/12 flex justify-center relative z-10">
                       <div className="w-16 h-16 bg-saffron text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <MapPin size={24} />
                       </div>
                    </div>
                    <div className="order-1 md:w-5/12"></div>
                 </div>
              </div>

              {/* Phase 2 */}
              <div className="relative mb-12 md:mb-8">
                 <div className="md:flex items-center justify-between w-full">
                    <div className="order-1 md:w-5/12"></div>
                    <div className="order-1 md:w-2/12 flex justify-center relative z-10">
                       <div className="w-16 h-16 bg-earth text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <Map size={24} />
                       </div>
                    </div>
                    <div className="order-1 md:w-5/12 mb-4 md:mb-0">
                       <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-earth">
                          <h3 className="text-xl font-bold text-earth mb-1">Phase 2: Regional Expansion</h3>
                          <p className="text-sm text-gray-600">Expanding to other districts of Rajasthan and neighboring states with established supply chains.</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Phase 3 */}
              <div className="relative mb-12 md:mb-8">
                 <div className="md:flex items-center justify-between w-full">
                    <div className="order-1 md:w-5/12 mb-4 md:mb-0 md:text-right">
                       <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                          <h3 className="text-xl font-bold text-earth mb-1">Phase 3: Digital Ecosystem</h3>
                          <p className="text-sm text-gray-600">Launch of the comprehensive <strong>"Desi Didi Mart Online"</strong> App for seamless pan-India ordering.</p>
                       </div>
                    </div>
                    <div className="order-1 md:w-2/12 flex justify-center relative z-10">
                       <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <Smartphone size={24} />
                       </div>
                    </div>
                    <div className="order-1 md:w-5/12"></div>
                 </div>
              </div>

              {/* Phase 4 */}
              <div className="relative">
                 <div className="md:flex items-center justify-between w-full">
                    <div className="order-1 md:w-5/12"></div>
                    <div className="order-1 md:w-2/12 flex justify-center relative z-10">
                       <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <Globe size={24} />
                       </div>
                    </div>
                    <div className="order-1 md:w-5/12 mb-4 md:mb-0">
                       <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-600">
                          <h3 className="text-xl font-bold text-earth mb-1">Phase 4: Global Export</h3>
                          <p className="text-sm text-gray-600">Exploring the export market for Handicrafts and non-perishable traditional goods.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Legal & Policy Setup */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-earth mb-4">Legal & Policy Setup</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We operate with 100% compliance and legal integrity. Our foundation is built on trust and verified documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "NGO/Trust Registration", desc: "Registered under Indian Trust Act", icon: <Building2 size={24} /> },
              { title: "Operation Permit", desc: "Authorized for nationwide operations", icon: <CheckCircle size={24} /> },
              { title: "Trade License", desc: "Municipal Corporation approved", icon: <FileText size={24} /> },
              { title: "GST Registration", desc: "Fully tax compliant (Transactions > ₹20L)", icon: <BadgeIndianRupee size={24} /> },
              { title: "FSSAI License", desc: "Certified for Food Safety & Standards", icon: <ShieldCheck size={24} /> },
              { title: "Women Members MOU", desc: "Legal agreements for all beneficiaries", icon: <Scale size={24} /> },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-cream-50 hover:bg-cream-100 transition-colors border border-cream-200">
                <div className="bg-white p-3 rounded-full text-saffron shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto bg-forest-50 rounded-2xl p-8 border border-forest-100">
           <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-forest-800">Interest Form</h2>
              <p className="text-forest-600 mb-4">Fill this form to schedule a meeting with our Directors regarding the franchise model.</p>
              <Button variant="outline" className="bg-white border-forest-200 text-forest-700 hover:bg-forest-50" onClick={() => alert('Pitch Deck Download Started')}>
                 <Download size={16} className="mr-2" /> Download Investor Pitch Deck (PDF)
              </Button>
           </div>
           
           <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest outline-none" placeholder="Your Name" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                    <input type="tel" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest outline-none" placeholder="+91" />
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700">Email Address</label>
                 <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest outline-none" placeholder="you@example.com" />
              </div>
              <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700">Investment Capacity</label>
                 <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest outline-none bg-white">
                    <option>₹1 Lakh (Tier 1)</option>
                    <option>₹2 Lakh (Tier 2)</option>
                    <option>Other</option>
                 </select>
              </div>
              <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700">Message</label>
                 <textarea rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest outline-none resize-none" placeholder="Any specific questions?"></textarea>
              </div>
              <Button variant="forest" className="w-full">Submit Expression of Interest</Button>
           </form>
        </div>

      </div>
    </div>
  );
};

export default Franchise;