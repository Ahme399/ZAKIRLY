import { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Clock, Save, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Period {
  id: string;
  name: string;
  teacher: string;
  startTime: string;
  endTime: string;
}

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

export default function SchoolTimetable() {
  const [timetable, setTimetable] = useState<Record<string, Period[]>>(() => {
    const saved = localStorage.getItem('zakirly_school_timetable');
    if (saved) return JSON.parse(saved);
    const initial: Record<string, Period[]> = {};
    DAYS.forEach(day => initial[day] = []);
    return initial;
  });

  const [activeDay, setActiveDay] = useState(DAYS[0]);
  const [showAdd, setShowAdd] = useState(false);
  const [newPeriod, setNewPeriod] = useState({
    name: '',
    teacher: '',
    startTime: '08:00',
    endTime: '08:45'
  });

  useEffect(() => {
    localStorage.setItem('zakirly_school_timetable', JSON.stringify(timetable));
  }, [timetable]);

  const addPeriod = () => {
    if (!newPeriod.name) return;
    const period: Period = {
      ...newPeriod,
      id: Date.now().toString()
    };
    setTimetable({
      ...timetable,
      [activeDay]: [...timetable[activeDay], period].sort((a, b) => a.startTime.localeCompare(b.startTime))
    });
    setNewPeriod({ name: '', teacher: '', startTime: '08:00', endTime: '08:45' });
    setShowAdd(false);
  };

  const deletePeriod = (day: string, id: string) => {
    setTimetable({
      ...timetable,
      [day]: timetable[day].filter(p => p.id !== id)
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32 min-h-[600px]">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
           <div className="p-4 bg-bg-panel border border-border-main text-purple-400 rounded-3xl shadow-xl transition-colors">
             <Calendar size={32} />
           </div>
           <div>
            <h1 className="text-3xl font-black text-text-main">TIMETABLE <span className="text-purple-400 font-display">الجدول المدرسي</span></h1>
            <p className="text-text-sub font-black uppercase tracking-widest text-[10px] mt-1">نظم حصصك المدرسية وتابع يومك الدراسي</p>
           </div>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-purple-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-purple-500/20 hover:bg-purple-400 hover:scale-105 transition-all flex items-center gap-3"
        >
          <Plus size={24} />
          إضافة حصة جديدة
        </button>
      </header>

      {/* Days Tabs */}
      <div className="flex bg-bg-panel p-2 rounded-3xl border border-border-main overflow-x-auto no-scrollbar gap-2 transition-colors">
         {DAYS.map(day => (
           <button
             key={day}
             onClick={() => setActiveDay(day)}
             className={`flex-1 min-w-[100px] py-4 rounded-2xl font-black text-sm transition-all ${
               activeDay === day 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-text-sub hover:bg-bg-base'
             }`}
           >
             {day}
           </button>
         ))}
      </div>

      {/* Periods List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {timetable[activeDay].length === 0 ? (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-20 bg-bg-panel/50 rounded-[3rem] border-2 border-dashed border-border-main transition-colors"
            >
               <Clock size={48} className="mx-auto text-border-main mb-4 opacity-50" />
               <p className="text-text-sub font-bold text-lg">لا توجد حصص مسجلة يوم {activeDay}</p>
            </motion.div>
          ) : (
            timetable[activeDay].map((period, idx) => (
              <motion.div
                key={period.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-bg-panel border border-border-main p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 group hover:border-purple-500/30 transition-all shadow-sm"
              >
                <div className="w-14 h-14 bg-bg-base border border-border-main rounded-2xl flex flex-col items-center justify-center text-text-sub font-black text-xs shadow-inner">
                   <span className="text-purple-400">حصة</span>
                   <span>{idx + 1}</span>
                </div>
                
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-xl font-black text-text-main mb-1">{period.name}</h3>
                  <p className="text-sm font-bold text-text-sub">مع {period.teacher || 'مدرس المادة'}</p>
                </div>

                <div className="flex items-center gap-4 bg-bg-base px-6 py-3 rounded-2xl border border-border-main shadow-inner text-text-main font-bold">
                   <Clock size={16} className="text-purple-400" />
                   <span>{period.startTime}</span>
                   <span className="text-text-sub">-</span>
                   <span>{period.endTime}</span>
                </div>

                <button 
                  onClick={() => deletePeriod(activeDay, period.id)}
                  className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-50 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash size={18} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[101] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-bg-panel w-full max-w-lg rounded-[3rem] p-10 border border-border-main shadow-2xl space-y-8"
            >
               <h3 className="text-2xl font-black text-text-main">إضافة حصة ليوم {activeDay}</h3>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-text-sub uppercase tracking-widest px-1">اسم المادة</label>
                    <input 
                      value={newPeriod.name}
                      onChange={e => setNewPeriod({...newPeriod, name: e.target.value})}
                      placeholder="مثال: لغة عربية"
                      className="w-full bg-bg-base border border-border-main rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500/50 font-bold text-text-main transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-text-sub uppercase tracking-widest px-1">اسم المدرس</label>
                    <input 
                      value={newPeriod.teacher}
                      onChange={e => setNewPeriod({...newPeriod, teacher: e.target.value})}
                      placeholder="اختياري: مستر/ميس..."
                      className="w-full bg-bg-base border border-border-main rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-500/50 font-bold text-text-main transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-text-sub uppercase tracking-widest px-1">وقت البدء</label>
                      <input type="time" value={newPeriod.startTime} onChange={e => setNewPeriod({...newPeriod, startTime: e.target.value})} className="w-full bg-bg-base border border-border-main rounded-2xl px-6 py-4 font-bold text-text-main focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-text-sub uppercase tracking-widest px-1">وقت الانتهاء</label>
                      <input type="time" value={newPeriod.endTime} onChange={e => setNewPeriod({...newPeriod, endTime: e.target.value})} className="w-full bg-bg-base border border-border-main rounded-2xl px-6 py-4 font-bold text-text-main focus:outline-none" />
                    </div>
                  </div>
               </div>

               <div className="flex gap-4">
                  <button onClick={() => setShowAdd(false)} className="flex-1 px-8 py-4 bg-bg-base border border-border-main text-text-sub rounded-2xl font-black hover:bg-bg-panel transition-all">إلغاء</button>
                  <button onClick={addPeriod} className="flex-1 px-8 py-4 bg-purple-500 text-white rounded-2xl font-black shadow-lg shadow-purple-500/20 hover:bg-purple-400 transition-all">إضافة الحصة</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
