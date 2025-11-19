import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, ShieldCheck, Phone, MessageCircle, Award, Info } from 'lucide-react';
import { SHGGroup } from '../types';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

// Helper to find SHG from mock/local
const getSHGById = (id: string): SHGGroup | undefined => {
  const stored = localStorage.getItem('shg_directory');
  const storedSHGs = stored ? JSON.parse(stored) : [];
  // Mock data needs to be same as Directory
  const MOCK_SHG_DATA: SHGGroup[] = [
    {
        id: 'shg-001',
        name: 'Udaan Mahila SHG',
        state: 'Rajasthan',
        district: 'Jaipur',
        block: 'Sanganer',
        village: 'Muhana',
        category: 'Handicrafts',
        leaderName: 'Sita Devi',
        leaderFatherHusbandName: 'Ram Singh',
        leaderPhone: '9876543210',
        leaderWhatsapp: '9876543210',
        members: Array(10).fill({ name: 'Member Name', role: 'Member', photo: null }),
        workCategory: 'Handmade goods',
        workDescription: 'We specialize in making handmade bags and embroidery work for local markets.',
        status: 'Verified',
        verificationBadge: true,
        createdAt: '2023-10-15',
        leaderPhoto: 'https://images.unsplash.com/photo-1623155234982-69674883e633?w=200'
    } as any,
    {
        id: 'shg-002',
        name: 'Shakti Swarupa Group',
        state: 'Uttar Pradesh',
        district: 'Lucknow',
        block: 'Sarojini Nagar',
        village: 'Amausi',
        category: 'Women Empowerment',
        leaderName: 'Radha Kumari',
        leaderFatherHusbandName: 'Mohan Lal',
        leaderPhone: '98765XXXXX',
        leaderWhatsapp: '98765XXXXX',
        members: Array(10).fill({ name: 'Member', role: 'Member', photo: null }),
        workCategory: 'Stitching/Tailoring',
        workDescription: 'Group of women working on school uniforms and local clothing.',
        status: 'Pending',
        verificationBadge: false,
        createdAt: '2023-11-01'
    } as any,
    {
        id: 'shg-003',
        name: 'Gramin Vikas SHG',
        state: 'Madhya Pradesh',
        district: 'Bhopal',
        block: 'Huzur',
        village: 'Ratibad',
        category: 'Rural Products',
        leaderName: 'Kavita Yadav',
        leaderFatherHusbandName: 'Suresh Yadav',
        leaderPhone: '98765XXXXX',
        leaderWhatsapp: '98765XXXXX',
        members: Array(10).fill({ name: 'Member', role: 'Member', photo: null }),
        workCategory: 'Food/Packaging',
        workDescription: 'Processing and packaging of organic spices and pulses.',
        status: 'Verified',
        verificationBadge: true,
        createdAt: '2023-09-20'
    } as any
  ];
  
  const allSHGs = [...MOCK_SHG_DATA, ...storedSHGs]; 
  return allSHGs.find((s: SHGGroup) => s.id === id);
};

const SHGDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shg, setShg] = useState<SHGGroup | null>(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  useEffect(() => {
    if (id) {
       const found = getSHGById(id);
       if (found) {
         setShg(found);
       }
    }
  }, [id]);

  if (!shg) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
       {/* Banner */}
       <div className="h-48 bg-gradient-to-r from-earth to-earth-800 relative">
          <div className="container mx-auto px-4 h-full flex items-end pb-8">
             <div className="text-white">
                <div className="flex items-center gap-3 mb-2">
                   <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {shg.category}
                   </span>
                   {shg.status === 'Verified' && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                         <ShieldCheck size={12} /> Verified
                      </span>
                   )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{shg.name}</h1>
                <p className="flex items-center gap-2 text-white/80 mt-1">
                   <MapPin size={16} /> {shg.village}, {shg.block}, {shg.district}, {shg.state}
                </p>
             </div>
          </div>
       </div>

       <div className="container mx-auto px-4 mt-8">
          <div className="grid md:grid-cols-3 gap-8">
             {/* Main Info */}
             <div className="md:col-span-2 space-y-8">
                
                {/* About */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                   <h2 className="text-xl font-bold text-gray-900 mb-4">About Our Group</h2>
                   <p className="text-gray-600 leading-relaxed">
                      {shg.workDescription || "This group is dedicated to empowering women through sustainable work and self-reliance."}
                   </p>
                   
                   <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-4">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                         <Award size={24} />
                      </div>
                      <div>
                         <h4 className="font-bold text-blue-900">Specialization</h4>
                         <p className="text-blue-800">{shg.workCategory}</p>
                      </div>
                   </div>
                </div>

                {/* Members Grid */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                   <h2 className="text-xl font-bold text-gray-900 mb-6 flex justify-between items-center">
                      Group Members
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">10 Members</span>
                   </h2>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {/* Leader Card */}
                      <div className="text-center p-4 bg-saffron-50 rounded-xl border border-saffron-100 relative">
                         <div className="absolute top-2 right-2">
                            <Award size={16} className="text-saffron" />
                         </div>
                         <img 
                           src={shg.leaderPhoto || "https://via.placeholder.com/100?text=Leader"} 
                           className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-white shadow-sm" 
                           alt={shg.leaderName}
                         />
                         <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{shg.leaderName}</h4>
                         <p className="text-xs text-saffron font-bold mt-1">Group Leader</p>
                      </div>

                      {/* Other Members */}
                      {shg.members.slice(1).map((m, i) => (
                         <div key={i} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-white mx-auto mb-3 flex items-center justify-center text-gray-300 border border-gray-200 overflow-hidden">
                               {m.photo ? (
                                  <img src={m.photo as string} className="w-full h-full object-cover" alt="" />
                               ) : (
                                  <Users size={24} />
                               )}
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{m.name || `Member ${i+2}`}</h4>
                            <p className="text-xs text-gray-500 mt-1">{m.role || 'Member'}</p>
                         </div>
                      ))}
                   </div>

                   <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-center text-white relative overflow-hidden">
                      <div className="relative z-10">
                         <h3 className="text-lg font-bold mb-2">Digital Identity</h3>
                         <p className="text-gray-300 text-sm">SHG Digital ID Cards Coming Soon – stay connected!</p>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
                   </div>
                </div>
             </div>

             {/* Sidebar - Contact (Admin Only) */}
             <div className="space-y-6">
                {isAdmin ? (
                   <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-saffron">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                         <ShieldCheck className="text-saffron" size={20} /> Admin Access
                      </h3>
                      <div className="space-y-4">
                         <div>
                            <label className="text-xs text-gray-500 font-bold uppercase">Leader Phone</label>
                            <div className="flex items-center gap-2 text-gray-900 font-medium mt-1">
                               <Phone size={16} className="text-green-600" /> {shg.leaderPhone}
                            </div>
                         </div>
                         <div>
                            <label className="text-xs text-gray-500 font-bold uppercase">WhatsApp</label>
                            <div className="flex items-center gap-2 text-gray-900 font-medium mt-1">
                               <MessageCircle size={16} className="text-green-600" /> {shg.leaderWhatsapp}
                            </div>
                         </div>
                         <div className="pt-4 border-t">
                            <Button size="sm" variant="primary" className="w-full">Edit Group Details</Button>
                         </div>
                      </div>
                   </div>
                ) : (
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Info</h3>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                         <ShieldCheck size={32} className="mx-auto text-gray-400 mb-2" />
                         <p className="text-sm text-gray-600">
                            Contact details are private to protect our members.
                         </p>
                         <p className="text-xs text-gray-400 mt-2">Only Administrators can view phone numbers.</p>
                      </div>
                      <Link to="/contact">
                        <Button variant="outline" className="w-full mt-4">Contact Admin for Inquiry</Button>
                      </Link>
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};

export default SHGDetails;