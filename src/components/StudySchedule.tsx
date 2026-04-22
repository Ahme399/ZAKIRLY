import { useState, useEffect } from 'react';
import { Plus, Clock, Trash2, Calendar as CalendarIcon, X, Sparkles, BrainCircuit, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScheduleItem {
  id: string;
  day: string;
  subject: string;
  startTime: string;
  endTime: string;
  color: string;
}

const DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
const COLORS = [
  'from-blue-600/40 to-blue-400/20 text-blue-200 border-blue-500/30',
  'from-purple-600/40 to-purple-400/20 text-purple-200 border-purple-500/30',
  'from-emerald-600/40 to-emerald-400/20 text-emerald-200 border-emerald-500/30',
  'from-amber-600/40 to-amber-400/20 text-amber-200 border-amber-500/30',
  'from-rose-600/40 to-rose-400/20 text-rose-200 border-rose-500/30',
  'from-indigo-600/40 to-indigo-400/20 text-indigo-200 border-indigo-500/30'
];

export default function StudySchedule() {
  const [items, setItems] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('zakery_schedule');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ScheduleItem>>({
    day: 'السبت',
    subject: '',
    startTime: '09:00',
    endTime: '11:00',
    color: COLORS[0]
  });

  useEffect(() => {
    localStorage.setItem('zakery_schedule', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!newItem.subject) return;
    const item: ScheduleItem = {
      ...newItem as ScheduleItem,
      id: Date.now().toString()
    };
    setItems([...items, item]);
    setShowAdd(false);
    setNewItem({ ...newItem, subject: '' });
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-10 pb-20 h-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
           <div className="p-4 bg-gray-900 border border-gray-800 text-[#00D1FF] rounded-2xl shadow-xl cyan-glow">
             <CalendarIcon size={32} />
           </div>
           <div>
            <h1 className="text-3xl font-black text-white">PLANNER <span className="text-[#00D1FF] font-display">جدول المذاكرة</span></h1>
            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mt-1">نظم وقتك، نظم مستقبلك الدراسي</p>
           </div>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-[#00D1FF] text-black px-8 py-4 rounded-2xl font-black shadow-xl shadow-cyan-500/10 hover:scale-105 transition-all flex items-center gap-3"
        >
          <Plus size={24} />
          إضافة حصة مذاكرة
        </button>
      </header>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {DAYS.map((day) => {
          const dayItems = items.filter(i => i.day === day).sort((a,b) => a.startTime.localeCompare(b.startTime));
          return (
            <div key={day} className="flex flex-col gap-4 min-h-[400px] group">
               <div className="bg-[#0C0D11] p-4 rounded-2xl border border-gray-800 shadow-xl text-center font-black text-gray-400 group-hover:text-white group-hover:border-cyan-500/30 transition-all uppercase tracking-widest text-sm">
                 {day}
               </div>
               <div className="flex-1 space-y-4 pr-1 no-scrollbar overflow-y-auto">
                 <AnimatePresence initial={false}>
                   {dayItems.map((item) => (
                     <motion.div
                       key={item.id}
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       className={`p-5 rounded-[1.5rem] bg-gradient-to-tr border ${item.color} shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] relative group/item overflow-hidden`}
                     >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-xl rounded-full"></div>
                        <button 
                          onClick={() => deleteItem(item.id)}
                          className="absolute top-3 left-3 p-1.5 bg-black/40 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity text-rose-400 hover:bg-rose-500 hover:text-white"
                        >
                          <Trash2 size={12} />
                        </button>
                        <h4 className="font-black text-sm mb-3 line-clamp-2">{item.subject}</h4>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-70">
                          <Clock size={12} className="shrink-0" />
                          {item.startTime} - {item.endTime}
                        </div>
                        <div className="mt-4 h-1 w-8 bg-current opacity-30 rounded-full"></div>
                     </motion.div>
                   ))}
                   {dayItems.length === 0 && (
                     <div className="flex-1 rounded-[1.5rem] border-2 border-dashed border-gray-800/50 flex flex-col items-center justify-center p-6 text-center group-hover:border-gray-700/50 transition-colors">
                        <div className="p-3 bg-gray-900/50 rounded-2xl mb-4 text-gray-800 group-hover:text-gray-700">
                          <Sparkles size={20} />
                        </div>
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest">يوم راحة</p>
                     </div>
                   )}
                 </AnimatePresence>
               </div>
            </div>
          );
        })}
      </div>

      {/* Stats Summary Bento Piece */}
      <section className="bg-[#0C0D11] border border-gray-800 rounded-[2.5rem] p-10 mt-10 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-gray-900 border border-gray-800 rounded-3xl flex items-center justify-center text-cyan-400 cyan-glow">
                  <BrainCircuit size={32} />
               </div>
               <div>
                  <h3 className="text-xl font-black text-white mb-1">تحليل الجدول الذكي</h3>
                  <p className="text-gray-500 font-bold text-sm">أنت تذاكر بمعدل <span className="text-[#00D1FF]">12 ساعة</span> أسبوعياً حالياً.</p>
               </div>
            </div>
            <button className="px-8 py-4 bg-gray-900 border border-gray-800 rounded-2xl text-[10px] font-black text-[#00D1FF] uppercase tracking-widest hover:border-cyan-500/50 transition-all">
               تحسين الخطة بالذكاء الاصطناعي
            </button>
         </div>
      </section>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="bg-[#0C0D11] w-full max-w-lg rounded-[3rem] p-10 border border-gray-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
              <div className="flex items-center justify-between relative z-10">
                <h3 className="text-3xl font-black text-white">NEW SESSION <span className="text-[#00D1FF] font-display">إضافة حصة</span></h3>
                <button onClick={() => setShowAdd(false)} className="p-2 text-gray-500 hover:text-white transition-colors">
                  <X size={28} />
                </button>
              </div>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <label className="text-[10px] font-black text-gray-500 block mb-3 px-1 uppercase tracking-widest">المادة الدراسية</label>
                  <input 
                    value={newItem.subject}
                    onChange={(e) => setNewItem({...newItem, subject: e.target.value})}
                    placeholder="مثال: رياضيات - الوحدة الأولى"
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-500/30 font-bold text-gray-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div>
                    <label className="text-[10px] font-black text-gray-500 block mb-3 px-1 uppercase tracking-widest">اليوم</label>
                    <div className="relative">
                      <select 
                        value={newItem.day}
                        onChange={(e) => setNewItem({...newItem, day: e.target.value})}
                        className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-cyan-500/30 font-bold text-gray-200 appearance-none cursor-pointer"
                      >
                        {DAYS.map(d => <option key={d} value={d} className="bg-gray-900">{d}</option>)}
                      </select>
                      <ChevronLeft size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none -rotate-90" />
                    </div>
                   </div>
                   <div>
                    <label className="text-[10px] font-black text-gray-500 block mb-3 px-1 uppercase tracking-widest">اللون المميز</label>
                    <div className="flex gap-2 h-14 items-center justify-center bg-gray-950 rounded-2xl border border-gray-800 px-4">
                       {COLORS.map((c, idx) => (
                         <button 
                           key={idx}
                           onClick={() => setNewItem({...newItem, color: c})}
                           className={`w-6 h-6 rounded-full bg-gradient-to-tr ${c} ${newItem.color === c ? 'ring-2 ring-cyan-500 scale-110' : 'opacity-40 hover:opacity-100'}`}
                         />
                       ))}
                    </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 block mb-3 px-1 uppercase tracking-widest">وقت البدء</label>
                    <input type="time" value={newItem.startTime} onChange={(e) => setNewItem({...newItem, startTime: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 font-bold text-gray-200 focus:outline-none focus:border-cyan-500/30" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 block mb-3 px-1 uppercase tracking-widest">وقت الانتهاء</label>
                    <input type="time" value={newItem.endTime} onChange={(e) => setNewItem({...newItem, endTime: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 font-bold text-gray-200 focus:outline-none focus:border-cyan-500/30" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 relative z-10">
                <button 
                  onClick={addItem}
                  className="flex-1 bg-[#00D1FF] text-black py-5 rounded-[1.5rem] font-black shadow-xl shadow-cyan-500/10 hover:scale-105 transition-all"
                >
                  إضافة للجدول بذكاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
