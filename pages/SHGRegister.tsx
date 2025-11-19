import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, User, MapPin, Briefcase, CheckCircle, ArrowRight, ArrowLeft, 
  Upload, Plus, Trash2, Info 
} from 'lucide-react';
import Button from '../components/ui/Button';
import { SHGGroup, SHGMember } from '../types';

// Initial empty member
const emptyMember: SHGMember = {
  id: '',
  name: '',
  fatherHusbandName: '',
  age: '',
  role: 'Member',
  city: '',
  skill: '',
  photo: null
};

const SHGRegister: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [groupDetails, setGroupDetails] = useState({
    name: '',
    state: '',
    district: '',
    block: '',
    village: '',
    category: 'Women Empowerment'
  });

  const [leaderDetails, setLeaderDetails] = useState({
    name: '',
    fatherHusbandName: '',
    phone: '',
    whatsapp: '',
    aadhar: '',
    email: '',
    photo: null as File | null
  });

  // Initialize with 10 empty members as per requirement
  const [members, setMembers] = useState<SHGMember[]>([
    { ...emptyMember, id: '1', role: 'President/Leader' },
    { ...emptyMember, id: '2', role: 'Secretary' },
    { ...emptyMember, id: '3', role: 'Treasurer' },
    ...Array.from({ length: 7 }).map((_, i) => ({ ...emptyMember, id: String(i + 4) }))
  ]);

  const [workDetails, setWorkDetails] = useState({
    category: 'Local products',
    description: ''
  });

  // Handlers
  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setGroupDetails({ ...groupDetails, [e.target.name]: e.target.value });
  };

  const handleLeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeaderDetails({ ...leaderDetails, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index: number, field: keyof SHGMember, value: any) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    const newSHG: SHGGroup = {
      id: Date.now().toString(),
      ...groupDetails,
      leaderName: leaderDetails.name,
      leaderFatherHusbandName: leaderDetails.fatherHusbandName,
      leaderPhone: leaderDetails.phone,
      leaderWhatsapp: leaderDetails.whatsapp,
      leaderAadhar: leaderDetails.aadhar,
      leaderEmail: leaderDetails.email,
      leaderPhoto: leaderDetails.photo ? URL.createObjectURL(leaderDetails.photo) : undefined,
      members: members.map(m => ({
        ...m,
        photo: m.photo instanceof File ? URL.createObjectURL(m.photo) : undefined
      })),
      workCategory: workDetails.category,
      workDescription: workDetails.description,
      category: groupDetails.category as any,
      status: 'Pending',
      verificationBadge: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Store in localStorage for demo purposes
    const existing = localStorage.getItem('shg_directory');
    const shgList = existing ? JSON.parse(existing) : [];
    localStorage.setItem('shg_directory', JSON.stringify([...shgList, newSHG]));

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/shg-directory');
      alert("SHG Registration Successful! Your group is now pending verification.");
    }, 2000);
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-earth text-white p-8 text-center">
          <h1 className="text-3xl font-heading font-bold mb-2">SHG Registration Form</h1>
          <p className="text-white/80">Meri Pahal Fast Help Artist Welfare Association (Trust)</p>
          
          {/* Stepper */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${step >= i ? 'bg-saffron border-saffron text-white' : 'bg-transparent border-white/30 text-white/50'}`}>
                  {step > i ? <CheckCircle size={20} /> : i}
                </div>
                {i < 4 && <div className={`w-12 h-1 bg-white/20 ${step > i ? 'bg-saffron' : ''}`}></div>}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-14 mt-2 text-xs font-medium text-white/70 uppercase tracking-wider pl-2">
             <span>Details</span>
             <span>Leader</span>
             <span>Members</span>
             <span>Work</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12">
          
          {/* STEP 1: Group Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-earth border-b pb-2 mb-6 flex items-center gap-2">
                 <Users className="text-saffron" /> Section A: Group Details
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">SHG Group Name *</label>
                  <input required name="name" value={groupDetails.name} onChange={handleGroupChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" placeholder="e.g. Jagriti Mahila SHG" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Category *</label>
                  <select name="category" value={groupDetails.category} onChange={handleGroupChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none bg-white">
                    <option>Women Empowerment</option>
                    <option>Handicrafts</option>
                    <option>Rural Products</option>
                    <option>Herbal/Organic</option>
                    <option>Self-Employment</option>
                    <option>Financial/Bank Linkage</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">State *</label>
                  <input required name="state" value={groupDetails.state} onChange={handleGroupChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" placeholder="State" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">District *</label>
                  <input required name="district" value={groupDetails.district} onChange={handleGroupChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" placeholder="District" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Block / Tehsil</label>
                  <input required name="block" value={groupDetails.block} onChange={handleGroupChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" placeholder="Block" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Village / Area</label>
                  <input required name="village" value={groupDetails.village} onChange={handleGroupChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" placeholder="Village" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Leader Details */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-earth border-b pb-2 mb-6 flex items-center gap-2">
                 <User className="text-saffron" /> Section B: Group Leader Details
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6 text-sm text-yellow-800 flex items-start gap-3">
                 <Info className="shrink-0 mt-0.5" size={18} />
                 <p><strong>Privacy Note:</strong> Your Phone & WhatsApp numbers will <u>only</u> be visible to the Admin. Public users cannot see these details.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="col-span-full flex justify-center mb-4">
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
                       {leaderDetails.photo ? (
                          <img src={URL.createObjectURL(leaderDetails.photo)} className="w-full h-full object-cover" alt="Leader" />
                       ) : (
                          <>
                             <Upload size={24} className="text-gray-400 mb-1" />
                             <span className="text-xs text-gray-500">Upload Photo</span>
                          </>
                       )}
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setLeaderDetails({...leaderDetails, photo: e.target.files?.[0] || null})} />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Leader Full Name *</label>
                    <input required name="name" value={leaderDetails.name} onChange={handleLeaderChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Father/Husband Name *</label>
                    <input required name="fatherHusbandName" value={leaderDetails.fatherHusbandName} onChange={handleLeaderChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Mobile Number (Admin Only) *</label>
                    <input required type="tel" name="phone" value={leaderDetails.phone} onChange={handleLeaderChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" placeholder="+91" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">WhatsApp Number (Admin Only) *</label>
                    <input required type="tel" name="whatsapp" value={leaderDetails.whatsapp} onChange={handleLeaderChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" placeholder="+91" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Aadhar No. (Optional - Admin Only)</label>
                    <input type="text" name="aadhar" value={leaderDetails.aadhar} onChange={handleLeaderChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email ID (Optional)</label>
                    <input type="email" name="email" value={leaderDetails.email} onChange={handleLeaderChange} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none" />
                 </div>
              </div>
            </div>
          )}

          {/* STEP 3: Members */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
               <h2 className="text-xl font-bold text-earth border-b pb-2 mb-6 flex items-center gap-2">
                 <Users className="text-saffron" /> Section C: Group Members (10 Required)
               </h2>
               <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 text-sm text-blue-800 flex items-start gap-3">
                 <Info className="shrink-0 mt-0.5" size={18} />
                 <p>Please enter details for all 10 members. Phone numbers are <strong>NOT</strong> required for members to protect privacy.</p>
              </div>

               <div className="grid gap-6">
                  {members.map((member, idx) => (
                     <div key={member.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="font-bold text-gray-900">Member #{idx + 1}</h3>
                           <span className="text-xs font-bold uppercase bg-gray-200 px-2 py-1 rounded text-gray-600">{member.role}</span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-6">
                           <div className="shrink-0 flex justify-center">
                              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-white relative overflow-hidden hover:border-saffron cursor-pointer">
                                 {member.photo ? (
                                    <img src={member.photo instanceof File ? URL.createObjectURL(member.photo) : ''} className="w-full h-full object-cover" alt="" />
                                 ) : (
                                    <>
                                       <Upload size={20} className="text-gray-400 mb-1" />
                                       <span className="text-[10px] text-gray-500">Photo</span>
                                    </>
                                 )}
                                 <input type="file" className="absolute inset-0 opacity-0" onChange={(e) => handleMemberChange(idx, 'photo', e.target.files?.[0] || null)} />
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                              <input 
                                 placeholder="Full Name *" 
                                 className="px-3 py-2 border rounded outline-none focus:border-saffron" 
                                 value={member.name}
                                 onChange={e => handleMemberChange(idx, 'name', e.target.value)}
                              />
                              <input 
                                 placeholder="Father/Husband Name *" 
                                 className="px-3 py-2 border rounded outline-none focus:border-saffron" 
                                 value={member.fatherHusbandName}
                                 onChange={e => handleMemberChange(idx, 'fatherHusbandName', e.target.value)}
                              />
                              <input 
                                 placeholder="Age *" 
                                 type="number"
                                 className="px-3 py-2 border rounded outline-none focus:border-saffron" 
                                 value={member.age}
                                 onChange={e => handleMemberChange(idx, 'age', e.target.value)}
                              />
                              <input 
                                 placeholder="City / Village *" 
                                 className="px-3 py-2 border rounded outline-none focus:border-saffron" 
                                 value={member.city}
                                 onChange={e => handleMemberChange(idx, 'city', e.target.value)}
                              />
                              <input 
                                 placeholder="Role (e.g. Member) *" 
                                 className="px-3 py-2 border rounded outline-none focus:border-saffron" 
                                 value={member.role}
                                 onChange={e => handleMemberChange(idx, 'role', e.target.value)}
                              />
                              <input 
                                 placeholder="Skill (Optional)" 
                                 className="px-3 py-2 border rounded outline-none focus:border-saffron" 
                                 value={member.skill}
                                 onChange={e => handleMemberChange(idx, 'skill', e.target.value)}
                              />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          )}

          {/* STEP 4: Work & Submit */}
          {step === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
               <h2 className="text-xl font-bold text-earth border-b pb-2 mb-6 flex items-center gap-2">
                 <Briefcase className="text-saffron" /> Section D: Group Work / Activities
               </h2>
               
               <div className="space-y-4 max-w-2xl mx-auto">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Group wants to work in</label>
                     <select 
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none bg-white"
                        value={workDetails.category}
                        onChange={e => setWorkDetails({...workDetails, category: e.target.value})}
                     >
                        <option>Local products</option>
                        <option>Handmade goods</option>
                        <option>Stitching/Tailoring</option>
                        <option>Herbal products</option>
                        <option>Food/Packaging</option>
                        <option>Financial self-help</option>
                        <option>NGO partnerships</option>
                     </select>
                  </div>
                  
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Describe your SHG work in detail</label>
                     <textarea 
                        rows={6}
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-saffron outline-none resize-none"
                        placeholder="Tell us about the products you make, your experience, and what support you need..."
                        value={workDetails.description}
                        onChange={e => setWorkDetails({...workDetails, description: e.target.value})}
                     ></textarea>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8">
                     <h4 className="font-bold text-green-800 mb-1 flex items-center gap-2">
                        <CheckCircle size={18} /> Note from Administration
                     </h4>
                     <p className="text-green-700 text-sm">
                        "Your SHG Members Will Receive Online ID Cards in the Future (Coming Soon)."
                     </p>
                  </div>
               </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-12 flex justify-between pt-6 border-t border-gray-100">
            {step > 1 ? (
               <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft size={18} className="mr-2" /> Previous
               </Button>
            ) : (
               <div></div>
            )}

            {step < 4 ? (
               <Button type="button" variant="primary" onClick={nextStep}>
                  Next Step <ArrowRight size={18} className="ml-2" />
               </Button>
            ) : (
               <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                  Submit Registration
               </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SHGRegister;