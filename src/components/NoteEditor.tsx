import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Edit3, Save, Share2, NotebookPen, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  updatedAt: number;
}

const COLORS = [
  'bg-slate-800', 
  'bg-blue-900/40', 
  'bg-purple-900/40', 
  'bg-rose-900/40', 
  'bg-emerald-900/40', 
  'bg-amber-900/40'
];

const ACCENTS = {
  'bg-slate-800': 'border-gray-700',
  'bg-blue-900/40': 'border-blue-500/30',
  'bg-purple-900/40': 'border-purple-500/30',
  'bg-rose-900/40': 'border-rose-500/30',
  'bg-emerald-900/40': 'border-emerald-500/30',
  'bg-amber-900/40': 'border-amber-500/30'
};

export default function NoteEditor() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('zakirly_notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('zakirly_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'نوت جديد',
      content: '',
      color: COLORS[0],
      updatedAt: Date.now()
    };
    setNotes([newNote, ...notes]);
    setEditingId(newNote.id);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n));
  };

  const deleteNote = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا النوت؟')) {
      setNotes(notes.filter(n => n.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeNote = notes.find(n => n.id === editingId);

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
           <div className="p-4 bg-gray-900 border border-gray-800 text-[#00D1FF] rounded-2xl shadow-xl cyan-glow">
             <NotebookPen size={32} />
           </div>
           <div>
            <h1 className="text-3xl font-black text-white">NOTES <span className="text-[#00D1FF] font-display">مذكراتي</span></h1>
            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mt-1">اكتب أفكارك وملاحظاتك الدراسية بذكاء</p>
           </div>
        </div>
        <button 
          onClick={addNote}
          className="bg-[#00D1FF] text-black px-8 py-4 rounded-2xl font-black shadow-xl shadow-cyan-500/10 hover:scale-105 transition-all flex items-center gap-3"
        >
          <Plus size={24} />
          إضافة نوت جديد
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Sidebar List */}
        <aside className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          <div className="relative group">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00D1FF] transition-colors" size={20} />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث في مذكراتك..."
              className="w-full bg-[#0C0D11] border border-gray-800 rounded-2xl px-14 py-4 focus:outline-none focus:border-cyan-500/30 font-bold text-gray-200 shadow-xl transition-all"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
            <AnimatePresence initial={false}>
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setEditingId(note.id)}
                  className={`p-6 rounded-[2rem] border transition-all cursor-pointer relative overflow-hidden group ${
                    editingId === note.id 
                      ? 'bg-gray-800 border-[#00D1FF]/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]' 
                      : 'bg-[#0C0D11] border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D1FF]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <h3 className={`font-black text-lg truncate pr-2 ${editingId === note.id ? 'text-[#00D1FF]' : 'text-gray-200'}`}>
                      {note.title || 'بدون عنوان'}
                    </h3>
                    <div className={`w-3 h-3 rounded-full shadow-lg ${note.color.replace('/40', '')}`}></div>
                  </div>
                  <p className="text-gray-500 text-xs font-bold line-clamp-2 h-10 leading-relaxed overflow-hidden relative z-10">
                    {note.content || 'ابدأ بكتابة أفكارك هنا...'}
                  </p>
                  <div className="mt-4 flex items-center justify-between relative z-10">
                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                    {editingId === note.id && (
                       <motion.div layoutId="active-note-indicator" className="w-6 h-1 bg-[#00D1FF] rounded-full shadow-[0_0_8px_rgba(0,209,255,0.5)]"></motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredNotes.length === 0 && (
              <div className="text-center py-20 opacity-30">
                <NotebookPen size={48} className="mx-auto mb-4" />
                <p className="font-bold">لا يوجد نوتس مطابقة</p>
              </div>
            )}
          </div>
        </aside>

        {/* Editor Area */}
        <main className="lg:col-span-8 bg-[#0C0D11] rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden flex flex-col relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full"></div>
          {activeNote ? (
            <div className={`flex-1 flex flex-col p-8 md:p-12 space-y-8 relative z-10 ${activeNote.color}`}>
              <div className="flex items-center justify-between border-b border-gray-800 pb-6">
                <input 
                   value={activeNote.title}
                   onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                   className="text-3xl font-black text-white bg-transparent focus:outline-none flex-1 placeholder:text-gray-700"
                   placeholder="عنوان مذكرتك الذكية..."
                />
                <div className="flex gap-3">
                   <button 
                     onClick={() => deleteNote(editingId!)} 
                     className="p-3 text-gray-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all"
                     title="حذف المذكرة"
                   >
                     <Trash2 size={24} />
                   </button>
                   <button 
                     onClick={() => setEditingId(null)} 
                     className="p-3 text-[#00D1FF] hover:bg-cyan-500/10 rounded-2xl transition-all flex items-center gap-2"
                     title="إنهاء التحرير"
                   >
                     <Save size={24} />
                     <span className="hidden md:inline font-bold text-xs uppercase tracking-widest">إغلاق</span>
                   </button>
                </div>
              </div>
              <textarea 
                value={activeNote.content}
                onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                className="flex-1 w-full text-gray-300 leading-relaxed focus:outline-none resize-none font-bold text-xl bg-transparent placeholder:text-gray-800 no-scrollbar"
                placeholder="الغوص في التفاصيل... اكتب كل اللي في بالك هنا..."
              />
              <div className="flex flex-col md:flex-row md:items-center justify-between pt-8 border-t border-gray-800 gap-6">
                 <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                   <Clock size={14} />
                   <span>آخر تعديل: {new Date(activeNote.updatedAt).toLocaleString()}</span>
                 </div>
                 <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-[#00D1FF] font-black text-[10px] uppercase tracking-widest bg-gray-900 px-5 py-2.5 rounded-xl border border-gray-800 hover:cyan-glow transition-all">
                      <Share2 size={16} /> تصدير الملحوظة
                    </button>
                    <div className="flex gap-2">
                      {COLORS.map(c => (
                        <button 
                          key={c}
                          onClick={() => updateNote(activeNote.id, { color: c })}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${activeNote.color === c ? 'border-[#00D1FF] scale-125 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'} ${c.replace('/40', '')}`}
                        />
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gradient-to-b from-gray-900/20 to-transparent">
              <motion.div 
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-32 h-32 bg-gray-900 border border-gray-800 rounded-[3rem] flex items-center justify-center text-gray-700 mb-8 shadow-inner"
              >
                <Edit3 size={56} />
              </motion.div>
              <h2 className="text-3xl font-black text-gray-400 mb-4">انغمس في أفكارك</h2>
              <p className="text-gray-500 font-bold max-w-sm text-lg leading-relaxed mb-10">
                مذكراتك هي السجل اللي بيحفظ مجهودك وتعبك. ابدأ دلوقتي بتدوين أهم النقاط.
              </p>
              <button 
                onClick={addNote}
                className="bg-gray-800 text-[#00D1FF] px-10 py-4 rounded-2xl font-black hover:bg-gray-700 transition-all border border-gray-700 shadow-xl"
              >
                بدء مذكرة جديدة الآن
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
