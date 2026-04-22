import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Trash2, GraduationCap, UserCircle, Briefcase, Plus, Search } from 'lucide-react';
import { SchoolStaff } from '../types';

export default function SchoolDirectory() {
  const [staff, setStaff] = useState<SchoolStaff[]>(() => {
    const saved = localStorage.getItem('school_staff');
    return saved ? JSON.parse(saved) : [];
  });
  const [principal, setPrincipal] = useState(() => localStorage.getItem('school_principal') || '');
  const [showAdd, setShowAdd] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', subject: '' });

  useEffect(() => {
    localStorage.setItem('school_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('school_principal', principal);
  }, [principal]);

  const addStaff = () => {
    if (newStaff.name && newStaff.subject) {
      setStaff([...staff, { ...newStaff, id: Date.now().toString(), role: 'teacher' }]);
      setNewStaff({ name: '', subject: '' });
      setShowAdd(false);
    }
  };

  const removeStaff = (id: string) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Principal Section */}
      <section className="bg-[#0C0D11] border border-gray-800 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-3xl rounded-full"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-24 h-24 bg-gray-900 border border-gray-800 rounded-3xl flex items-center justify-center text-purple-400 cyan-glow">
            <UserCircle size={48} />
          </div>
          <div className="flex-1 text-center md:text-right w-full">
            <label className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2 block">مدير المدرسة / المنشأة</label>
            <input 
              type="text"
              value={principal}
              onChange={e => setPrincipal(e.target.value)}
              placeholder="اكتب اسم المدير هنا..."
              className="w-full bg-transparent border-none text-2xl md:text-3xl font-black text-white focus:outline-none placeholder:text-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Teachers List */}
      <section className="bg-[#0C0D11] border border-gray-800 rounded-[2.5rem] p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-[#00D1FF]">
                <GraduationCap size={24} />
              </div>
              قائمة المدرسين
            </h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">سجل أسماء مدرسينك والمواد الخاصة بيهم</p>
          </div>
          <button 
            onClick={() => setShowAdd(true)}
            className="p-3 bg-[#00D1FF] text-black rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {staff.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-gray-900/40 border border-gray-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-all shadow-inner"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-black text-white mb-1 group-hover:text-[#00D1FF] transition-colors">{s.name}</h4>
                    <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                       <Briefcase size={12} className="text-[#00D1FF]" /> {s.subject}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeStaff(s.id)}
                    className="p-2 text-gray-700 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {staff.length === 0 && !showAdd && (
            <div className="col-span-full py-12 text-center">
               <div className="w-16 h-16 bg-gray-900 rounded-3xl border border-gray-800 flex items-center justify-center mx-auto mb-4 text-gray-700">
                  <Search size={32} />
               </div>
               <p className="text-gray-600 font-bold">مفيش مدرسين مسجلين لسه. ابدأ ضيف مدرسينك!</p>
            </div>
          )}
        </div>
      </section>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[#0C0D11] border border-gray-800 rounded-[2.5rem] p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowAdd(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white"
              >
                <Plus className="rotate-45" size={24} />
              </button>
              
              <h3 className="text-xl font-black text-white mb-8">إضافة مدرس جديد</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">اسم المدرس</label>
                  <input 
                    type="text"
                    value={newStaff.name}
                    onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                    placeholder="مستر ..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#00D1FF]/50 text-white font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">المادة الدراسية</label>
                  <input 
                    type="text"
                    value={newStaff.subject}
                    onChange={e => setNewStaff({...newStaff, subject: e.target.value})}
                    placeholder="رياضيات، لغة عربية..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#00D1FF]/50 text-white font-bold"
                  />
                </div>
                <button 
                  onClick={addStaff}
                  className="w-full h-14 bg-[#00D1FF] text-black font-black rounded-2xl shadow-xl shadow-cyan-500/20 hover:scale-105 transition-transform"
                >
                  حفظ البيانات
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
