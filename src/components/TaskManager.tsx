import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('zakirly_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    localStorage.setItem('zakirly_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: input,
      completed: false,
      priority,
      createdAt: Date.now()
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
    
    // Update focus value
    const done = updatedTasks.filter(t => t.completed).length;
    const totalValue = updatedTasks.length;
    const taskRatio = totalValue > 0 ? (done / totalValue) : 1;
    
    const examFocus = parseInt(localStorage.getItem('zakirly_focus_level') || '100');
    const taskFocus = Math.floor(taskRatio * 100);
    const combinedFocus = Math.floor((examFocus + taskFocus) / 2);
    
    localStorage.setItem('zakirly_focus_level', combinedFocus.toString());
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  const clearCompleted = () => {
    if (confirm('هل تريد مسح المهام المكتملة؟')) {
      setTasks(tasks.filter(t => !t.completed));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 min-h-[600px] transition-colors pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-text-main">TASKS <span className="text-[#00D1FF] font-display">قائمة المهام</span></h1>
          <p className="text-text-sub font-bold uppercase tracking-widest text-[10px] mt-1">لديك {tasks.length - completedCount} مهمة بانتظارك</p>
        </div>
        <div className="flex items-center gap-4">
          {completedCount > 0 && (
            <button 
              onClick={clearCompleted}
              className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
            >
               مسح المكتمل
            </button>
          )}
          <div className="flex bg-bg-panel p-1.5 rounded-2xl border border-border-main shadow-xl transition-colors">
             <div className="px-5 py-2.5 text-center border-l border-border-main">
               <p className="text-[9px] uppercase font-black text-text-sub tracking-tighter mb-0.5">Total</p>
               <p className="font-black text-text-main text-xl">{tasks.length}</p>
             </div>
             <div className="px-5 py-2.5 text-center">
               <p className="text-[9px] uppercase font-black text-cyan-400 tracking-tighter mb-0.5">Done</p>
               <p className="font-black text-[#00D1FF] text-xl">{completedCount}</p>
             </div>
          </div>
        </div>
      </header>

      {/* Input Section */}
      <div className="bg-bg-panel p-8 rounded-[2.5rem] border border-border-main shadow-2xl space-y-6 relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
        <div className="flex gap-4 relative z-10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="عايز تذاكر إيه النهاردة؟"
            className="flex-1 bg-bg-base border border-border-main rounded-2xl px-6 py-4 focus:outline-none focus:border-[#00D1FF]/30 font-bold text-text-main transition-all"
          />
          <button 
            onClick={addTask}
            className="bg-[#00D1FF] text-black p-4 rounded-2xl shadow-xl shadow-cyan-500/10 hover:scale-105 transition-all"
          >
            <Plus size={28} />
          </button>
        </div>
        <div className="flex items-center gap-6 relative z-10">
          <span className="text-[10px] font-black text-text-sub uppercase tracking-widest">الأولوية:</span>
          <div className="flex gap-2">
            {[
              { id: 'low', label: 'عادية', active: 'bg-bg-base text-text-main border-border-main' },
              { id: 'medium', label: 'مهمة', active: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
              { id: 'high', label: 'عاجلة', active: 'bg-rose-500/10 text-rose-500 border-rose-500/20' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPriority(p.id as any)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all border ${
                  priority === p.id ? p.active + ' cyan-glow' : 'bg-bg-base border-transparent text-text-sub opacity-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4 pb-10">
        <AnimatePresence initial={false}>
          {tasks.length === 0 ? (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-24 bg-bg-panel/50 rounded-[2.5rem] border-2 border-dashed border-border-main transition-colors"
            >
              <CheckCircle2 size={56} className="mx-auto text-border-main mb-6" />
              <p className="text-text-sub font-bold italic text-lg">مبروك! مفيش مهام حالياً. وقت الراحة مستحق!</p>
            </motion.div>
          ) : (
            tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group bg-bg-panel p-6 rounded-2xl border border-border-main flex items-center gap-5 transition-all hover:border-[#00D1FF]/20 hover:bg-bg-base/40 ${task.completed ? 'opacity-40 grayscale' : 'shadow-lg'}`}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`shrink-0 transition-all ${task.completed ? 'text-[#00D1FF]' : 'text-text-sub hover:text-cyan-400'}`}
                >
                  {task.completed ? <CheckCircle2 size={32} /> : <Circle size={32} strokeWidth={1} />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-black text-lg text-text-main truncate ${task.completed ? 'line-through' : ''}`}>
                    {task.text}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-tighter border ${
                      task.priority === 'high' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      task.priority === 'medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-bg-base text-text-sub border-border-main'
                    }`}>
                      {task.priority === 'high' ? 'High Priority' : task.priority === 'medium' ? 'Medium' : 'Low'}
                    </span>
                    <span className="text-[9px] text-text-sub font-black flex items-center gap-1.5 uppercase tracking-widest">
                      <Clock size={12} />
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-3 text-text-sub hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
