import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, UserCheck, Filter, RefreshCw, MessageCircle, Upload, CheckCircle, UserPlus, Users, BadgeCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import { Coordinator } from '../types';

// Extended Mock Data for Coordinators to demonstrate hierarchy
const mockCoordinators: Coordinator[] = [
  {
    id: '1',
    name: 'Sunita Devi',
    role: 'State',
    state: 'Rajasthan',
    district: 'Jaipur',
    pincode: '302001',
    mobile: '+91 98765 12345',
    whatsapp: '+91 98765 12345',
    address: 'Plot 45, Civil Lines',
    image: 'https://images.unsplash.com/photo-1623155234982-69674883e633?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Ramesh Gupta',
    role: 'District',
    state: 'Rajasthan',
    district: 'Jaipur',
    pincode: '302029',
    mobile: '+91 98765 67890',
    whatsapp: '+91 98765 67890',
    address: 'Shop 12, Main Market, Sanganer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    name: 'Anita Yadav',
    role: 'Block',
    state: 'Rajasthan',
    district: 'Jaipur',
    block: 'Sanganer',
    pincode: '302020',
    mobile: '+91 98765 11223',
    whatsapp: '+91 98765 11223',
    address: 'Near Govt School, Sanganer',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '4',
    name: 'Priya Sharma',
    role: 'Panchayat',
    state: 'Rajasthan',
    district: 'Jaipur',
    block: 'Sanganer',
    panchayat: 'Muhana',
    pincode: '302029',
    mobile: '+91 98765 44556',
    whatsapp: '+91 90000 44556',
    address: 'Village Muhana, Post Office Road',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    role: 'State',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    pincode: '226001',
    mobile: '+91 98765 99887',
    whatsapp: '+91 98765 99887',
    address: 'Hazratganj, Lucknow',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '6',
    name: 'Meera Bai',
    role: 'District',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    pincode: '226010',
    mobile: '+91 98765 55443',
    whatsapp: '+91 98765 55443',
    address: 'Gomti Nagar, Sector 4',
    image: 'https://images.unsplash.com/photo-1623039075598-8984990755d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '7',
    name: 'Rajesh Kumar',
    role: 'Block',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    block: 'Huzur',
    pincode: '462001',
    mobile: '+91 98765 33221',
    whatsapp: '+91 98765 33221',
    address: 'MP Nagar, Zone 1',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '8',
    name: 'Suresh Patel',
    role: 'District',
    state: 'Gujarat',
    district: 'Ahmedabad',
    pincode: '380001',
    mobile: '+91 98765 77889',
    whatsapp: '+91 98765 77889',
    address: 'Navrangpura, Ahmedabad',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '9',
    name: 'Kamla Devi',
    role: 'Panchayat',
    state: 'Rajasthan',
    district: 'Jaipur',
    block: 'Sanganer',
    panchayat: 'Bhankrota',
    pincode: '302026',
    mobile: '+91 98765 22334',
    whatsapp: '+91 98765 22334',
    address: 'Main Chowk, Bhankrota',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  }
];

const Coordinators: React.FC = () => {
  const [viewMode, setViewMode] = useState<'search' | 'register'>('search');
  const [searchType, setSearchType] = useState<'location' | 'pincode'>('location');
  
  // Search Filters
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [pincode, setPincode] = useState('');

  // Registration Form State
  const [regForm, setRegForm] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    state: '',
    district: '',
    block: '',
    panchayat: '',
    pincode: '',
    address: '',
    role: 'Panchayat',
    photo: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Derived Data for Dynamic Dropdowns
  const availableStates = useMemo(() => {
    return Array.from(new Set(mockCoordinators.map(c => c.state))).sort();
  }, []);

  const availableDistricts = useMemo(() => {
    return Array.from(new Set(mockCoordinators
      .filter(c => !selectedState || c.state === selectedState)
      .map(c => c.district)
    )).sort();
  }, [selectedState]);

  const availableBlocks = useMemo(() => {
    return Array.from(new Set(mockCoordinators
      .filter(c => 
        (!selectedState || c.state === selectedState) && 
        (!selectedDistrict || c.district === selectedDistrict)
      )
      .map(c => c.block)
      .filter(Boolean) as string[]
    )).sort();
  }, [selectedState, selectedDistrict]);

  const availablePanchayats = useMemo(() => {
    return Array.from(new Set(mockCoordinators
      .filter(c => 
        (!selectedState || c.state === selectedState) && 
        (!selectedDistrict || c.district === selectedDistrict) &&
        (!selectedBlock || c.block === selectedBlock)
      )
      .map(c => c.panchayat)
      .filter(Boolean) as string[]
    )).sort();
  }, [selectedState, selectedDistrict, selectedBlock]);

  // Handlers
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedDistrict('');
    setSelectedBlock('');
    setSelectedPanchayat('');
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedBlock('');
    setSelectedPanchayat('');
  };

  const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlock(e.target.value);
    setSelectedPanchayat('');
  };

  const resetFilters = () => {
    setSelectedRole('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedBlock('');
    setSelectedPanchayat('');
    setPincode('');
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Filter Logic
  const filteredCoordinators = mockCoordinators.filter(c => {
    if (searchType === 'pincode') {
      return pincode ? c.pincode.includes(pincode) : true;
    }

    const matchRole = !selectedRole || c.role === selectedRole;
    const matchState = !selectedState || c.state === selectedState;
    const matchDistrict = !selectedDistrict || c.district === selectedDistrict;
    const matchBlock = !selectedBlock || c.block === selectedBlock;
    const matchPanchayat = !selectedPanchayat || c.panchayat === selectedPanchayat;

    return matchRole && matchState && matchDistrict && matchBlock && matchPanchayat;
  });

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-earth text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Coordinator Network</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Connect with our network of District, Block, and Panchayat coordinators across India, or join us to empower your community.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => setViewMode('search')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${viewMode === 'search' ? 'bg-saffron text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Find Coordinator
            </button>
            <button 
              onClick={() => setViewMode('register')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${viewMode === 'register' ? 'bg-saffron text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Join Our Network
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {viewMode === 'search' ? (
          <>
            {/* Search Filters Panel */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-4">
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSearchType('location')}
                    className={`pb-2 px-2 font-medium transition-colors flex items-center gap-2 ${searchType === 'location' ? 'text-saffron border-b-2 border-saffron' : 'text-gray-500'}`}
                  >
                    <Filter size={16} /> Search by Filters
                  </button>
                  <button 
                    onClick={() => setSearchType('pincode')}
                    className={`pb-2 px-2 font-medium transition-colors flex items-center gap-2 ${searchType === 'pincode' ? 'text-saffron border-b-2 border-saffron' : 'text-gray-500'}`}
                  >
                    <Search size={16} /> Search by Pincode
                  </button>
                </div>
                
                <button 
                  onClick={resetFilters}
                  className="text-sm text-saffron hover:text-saffron-600 flex items-center gap-1"
                >
                  <RefreshCw size={14} /> Reset Filters
                </button>
              </div>

              {searchType === 'location' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Role</label>
                    <select 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none bg-white"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="">All Roles</option>
                      <option value="State">State Level</option>
                      <option value="District">District Level</option>
                      <option value="Block">Block Level</option>
                      <option value="Panchayat">Panchayat Level</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">State</label>
                    <select 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none bg-white"
                      value={selectedState}
                      onChange={handleStateChange}
                    >
                      <option value="">All States</option>
                      {availableStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">District</label>
                    <select 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none bg-white"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      disabled={!selectedState && availableDistricts.length === 0}
                    >
                      <option value="">All Districts</option>
                      {availableDistricts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Block</label>
                    <select 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none bg-white"
                      value={selectedBlock}
                      onChange={handleBlockChange}
                      disabled={!selectedDistrict && availableBlocks.length === 0}
                    >
                      <option value="">All Blocks</option>
                      {availableBlocks.map(block => (
                        <option key={block} value={block}>{block}</option>
                      ))}
                    </select>
                  </div>

                   <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Panchayat</label>
                    <select 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none bg-white"
                      value={selectedPanchayat}
                      onChange={(e) => setSelectedPanchayat(e.target.value)}
                      disabled={!selectedBlock && availablePanchayats.length === 0}
                    >
                      <option value="">All Panchayats</option>
                      {availablePanchayats.map(panchayat => (
                        <option key={panchayat} value={panchayat}>{panchayat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium text-gray-700">Enter Pincode</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 302001"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                  <Button variant="primary" className="h-[42px]">
                    <Search size={18} className="mr-2" /> Search
                  </Button>
                </div>
              )}
            </div>

            {/* Results Grid */}
            <div className="mb-6 text-gray-600 text-sm flex items-center gap-2">
              <Users size={16} />
              Showing {filteredCoordinators.length} coordinator{filteredCoordinators.length !== 1 ? 's' : ''}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoordinators.length > 0 ? (
                filteredCoordinators.map((coord) => (
                  <div key={coord.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 flex flex-col items-center text-center group relative overflow-hidden">
                    {/* Decorative background accent */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                        coord.role === 'State' ? 'from-red-400 to-red-600' :
                        coord.role === 'District' ? 'from-blue-400 to-blue-600' :
                        coord.role === 'Block' ? 'from-green-400 to-green-600' :
                        'from-purple-400 to-purple-600'
                    }`}></div>

                    <div className="relative mb-4 mt-2">
                        <div className="w-24 h-24 rounded-full p-1 bg-white shadow-md border border-gray-100">
                            <img 
                                src={coord.image || "https://via.placeholder.com/150?text=User"} 
                                alt={coord.name} 
                                className="w-full h-full rounded-full object-cover" 
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                            <BadgeCheck className="text-blue-500 fill-white" size={20} />
                        </div>
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{coord.name}</h3>
                    
                    <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide mb-4 border ${
                        coord.role === 'State' ? 'bg-red-50 text-red-700 border-red-100' :
                        coord.role === 'District' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        coord.role === 'Block' ? 'bg-green-50 text-green-700 border-green-100' :
                        'bg-purple-50 text-purple-700 border-purple-100'
                    }`}>
                        {coord.role} Coordinator
                    </span>
                    
                    <div className="w-full space-y-3 text-sm text-gray-600 mb-6 bg-gray-50/50 p-3 rounded-lg border border-gray-100/50">
                        <div className="flex items-center justify-center gap-2">
                            <Phone size={14} className="text-saffron" />
                            <span className="font-medium">{coord.mobile}</span>
                        </div>
                        {coord.whatsapp && (
                            <div className="flex items-center justify-center gap-2">
                                <MessageCircle size={14} className="text-green-600" />
                                <span className="font-medium text-green-700">{coord.whatsapp}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-200/50">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="text-xs line-clamp-1">
                                {coord.district}, {coord.state}
                            </span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                        <Button variant="primary" size="sm" className="w-full text-xs h-9">
                            Call
                        </Button>
                        <a href={`https://wa.me/${coord.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="w-full">
                            <Button variant="secondary" size="sm" className="w-full text-xs h-9 border-green-200 text-green-700 hover:bg-green-50">
                                WhatsApp
                            </Button>
                        </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                  <UserCheck size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No coordinators found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results</p>
                  <button 
                    onClick={resetFilters}
                    className="mt-4 text-saffron font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Registration Form Section */
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
             <div className="bg-saffron-50 p-8 border-b border-saffron-100">
                <div className="flex items-center gap-3 mb-2">
                   <UserPlus className="text-saffron" size={24} />
                   <h2 className="text-2xl font-heading font-bold text-earth">Registration Form</h2>
                </div>
                <p className="text-gray-600">Join Meri Didi - Meri Pehal as a coordinator and lead the change in your community.</p>
             </div>

             {isSubmitted ? (
               <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 animate-in zoom-in duration-300">
                     <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                  <p className="text-gray-600 mb-8">
                     Thank you for submitting your details. Our team will review your application and contact you on your WhatsApp number within 48 hours.
                  </p>
                  <Button onClick={() => { setIsSubmitted(false); setViewMode('search'); }} variant="primary">
                     Browse Coordinators
                  </Button>
               </div>
             ) : (
               <form onSubmit={handleRegSubmit} className="p-8 space-y-8">
                  {/* Personal Details */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-bold text-gray-900 border-l-4 border-saffron pl-3">Personal Details</h3>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">Full Name *</label>
                           <input 
                             required
                             type="text" 
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                             placeholder="Enter your full name"
                             value={regForm.name}
                             onChange={e => setRegForm({...regForm, name: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">Upload Photo</label>
                           <div className="relative">
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden" 
                                id="photo-upload"
                                onChange={e => setRegForm({...regForm, photo: e.target.files?.[0] || null})}
                              />
                              <label 
                                htmlFor="photo-upload" 
                                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
                              >
                                 <span className="text-gray-500 text-sm truncate">
                                    {regForm.photo ? regForm.photo.name : "Choose profile photo..."}
                                 </span>
                                 <Upload size={18} className="text-gray-400" />
                              </label>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">Mobile Number *</label>
                           <input 
                             required
                             type="tel" 
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                             placeholder="+91"
                             value={regForm.mobile}
                             onChange={e => setRegForm({...regForm, mobile: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">WhatsApp Number *</label>
                           <input 
                             required
                             type="tel" 
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                             placeholder="+91"
                             value={regForm.whatsapp}
                             onChange={e => setRegForm({...regForm, whatsapp: e.target.value})}
                           />
                        </div>
                     </div>
                  </div>

                  {/* Location / Territory */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-bold text-gray-900 border-l-4 border-saffron pl-3">Territory & Address</h3>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">Applying For Role *</label>
                           <select 
                             required
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none bg-white"
                             value={regForm.role}
                             onChange={e => setRegForm({...regForm, role: e.target.value})}
                           >
                              <option value="State">State Coordinator</option>
                              <option value="District">District Coordinator</option>
                              <option value="Block">Block Coordinator</option>
                              <option value="Panchayat">Panchayat Coordinator</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">Pincode *</label>
                           <input 
                             required
                             type="text" 
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                             placeholder="e.g. 302012"
                             value={regForm.pincode}
                             onChange={e => setRegForm({...regForm, pincode: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">State *</label>
                           <input 
                             required
                             type="text" 
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                             placeholder="State Name"
                             value={regForm.state}
                             onChange={e => setRegForm({...regForm, state: e.target.value})}
                           />
                        </div>
                         <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">District *</label>
                           <input 
                             required
                             type="text" 
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                             placeholder="District Name"
                             value={regForm.district}
                             onChange={e => setRegForm({...regForm, district: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">Block / Tehsil</label>
                           <input 
                             type="text" 
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                             placeholder="Block Name"
                             value={regForm.block}
                             onChange={e => setRegForm({...regForm, block: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700">Panchayat / Ward</label>
                           <input 
                             type="text" 
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none"
                             placeholder="Panchayat Name"
                             value={regForm.panchayat}
                             onChange={e => setRegForm({...regForm, panchayat: e.target.value})}
                           />
                        </div>
                        <div className="col-span-full space-y-2">
                           <label className="text-sm font-medium text-gray-700">Full Address</label>
                           <textarea 
                             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron outline-none resize-none"
                             rows={3}
                             placeholder="House No, Street, Landmark..."
                             value={regForm.address}
                             onChange={e => setRegForm({...regForm, address: e.target.value})}
                           ></textarea>
                        </div>
                     </div>
                  </div>

                  <div className="pt-4">
                     <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        className="w-full"
                        isLoading={isSubmitting}
                     >
                        Submit Application
                     </Button>
                     <p className="text-xs text-gray-500 text-center mt-4">
                        By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
                     </p>
                  </div>
               </form>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coordinators;