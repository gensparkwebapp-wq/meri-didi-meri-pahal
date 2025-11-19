import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Briefcase, Filter, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { SHGGroup } from '../types';

// Mock Data - In a real app, this would fetch from API
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
    leaderPhone: '98765XXXXX', // Hidden in mock
    leaderWhatsapp: '98765XXXXX',
    members: Array(10).fill({}),
    workCategory: 'Handmade goods',
    workDescription: 'We specialize in making handmade bags and embroidery work.',
    status: 'Verified',
    verificationBadge: true,
    createdAt: '2023-10-15'
  },
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
    members: Array(10).fill({}),
    workCategory: 'Stitching/Tailoring',
    workDescription: 'Group of women working on school uniforms and local clothing.',
    status: 'Pending',
    verificationBadge: false,
    createdAt: '2023-11-01'
  },
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
    members: Array(10).fill({}),
    workCategory: 'Food/Packaging',
    workDescription: 'Processing and packaging of organic spices and pulses.',
    status: 'Verified',
    verificationBadge: true,
    createdAt: '2023-09-20'
  }
];

const SHGDirectory: React.FC = () => {
  const [shgs, setShgs] = useState<SHGGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    // Merge mock data with local storage data for demo
    const stored = localStorage.getItem('shg_directory');
    const storedSHGs = stored ? JSON.parse(stored) : [];
    setShgs([...MOCK_SHG_DATA, ...storedSHGs]);
  }, []);

  const filteredSHGs = shgs.filter(shg => {
    const matchesSearch = shg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          shg.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !filterState || shg.state === filterState;
    const matchesCategory = !filterCategory || shg.category === filterCategory;
    
    return matchesSearch && matchesState && matchesCategory;
  });

  // Get unique states and categories for filters
  const states = Array.from(new Set(shgs.map(s => s.state)));
  const categories = Array.from(new Set(shgs.map(s => s.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-earth text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">SHG Directory</h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover Self-Help Groups across India. Connecting grassroot women entrepreneurs with opportunities.
          </p>
          
          <Link to="/shg/register">
            <Button variant="primary" size="lg" className="shadow-lg shadow-saffron/20">
               Register Your SHG Group
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
           <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                   type="text" 
                   placeholder="Search by Group Name or District..." 
                   className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              <div>
                 <select 
                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none bg-white"
                   value={filterState}
                   onChange={(e) => setFilterState(e.target.value)}
                 >
                    <option value="">All States</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
              </div>
              <div>
                 <select 
                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none bg-white"
                   value={filterCategory}
                   onChange={(e) => setFilterCategory(e.target.value)}
                 >
                    <option value="">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
              </div>
           </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredSHGs.length > 0 ? (
              filteredSHGs.map((shg) => (
                 <div key={shg.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="h-2 bg-gradient-to-r from-saffron to-earth"></div>
                    <div className="p-6 flex-1">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{shg.name}</h3>
                             <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                <MapPin size={14} />
                                {shg.district}, {shg.state}
                             </div>
                          </div>
                          {shg.status === 'Verified' ? (
                             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                                <ShieldCheck size={12} /> Verified
                             </span>
                          ) : (
                             <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                                <Clock size={12} /> Pending
                             </span>
                          )}
                       </div>

                       <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm">
                             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                <Users size={16} />
                             </div>
                             <div>
                                <p className="text-xs text-gray-500">Group Leader</p>
                                <p className="font-medium text-gray-900">{shg.leaderName}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                <Briefcase size={16} />
                             </div>
                             <div>
                                <p className="text-xs text-gray-500">Activity</p>
                                <p className="font-medium text-gray-900">{shg.workCategory}</p>
                             </div>
                          </div>
                       </div>
                       
                       <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 mb-4">
                          {shg.members.length} Members • {shg.village}
                       </div>
                       
                       {/* Digital ID Placeholder */}
                        <div className="text-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-100 mb-2">
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                                SHG Digital ID Cards Coming Soon
                            </p>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                       <Link to={`/shg/${shg.id}`} className="w-full">
                          <Button variant="outline" size="sm" className="w-full justify-between group">
                             View Full Profile
                             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </Button>
                       </Link>
                    </div>
                 </div>
              ))
           ) : (
              <div className="col-span-full text-center py-12">
                 <Users size={48} className="mx-auto text-gray-300 mb-4" />
                 <h3 className="text-lg font-medium text-gray-900">No SHGs Found</h3>
                 <p className="text-gray-500">Try adjusting filters or search terms.</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SHGDirectory;