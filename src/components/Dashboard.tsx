import { useState, useEffect } from 'react';
import { Lightbulb, ArrowRight, BrainCircuit, CheckSquare, Calendar, Sparkles, Trophy, Heart, School, ExternalLink, Timer, Target, AlertCircle, HelpCircle, BookOpen, Globe, Map, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { getStudyAdvice } from '../lib/gemini';

import { UserProfile } from '../types';

export default function Dashboard({ setActiveTab, profile }: { setActiveTab: (tab: string) => void, profile: UserProfile }) {
  const [advice, setAdvice] = useState('جاري تجهيز نصيحة ذكية لك...');
  const [loading, setLoading] = useState(true);
  const [taskStats, setTaskStats] = useState({ total: 0, done: 0 });
  const [focusLevel, setFocusLevel] = useState(100);

  useEffect(() => {
    const fetchAdvice = async () => {
      const text = await getStudyAdvice();
      setAdvice(text || 'ذاكر باجتهاد، مستقبلك يناديك!');
      setLoading(false);
    };
    fetchAdvice();

    // Fetch real stats from local storage
    const savedTasks = localStorage.getItem('zakirly_tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      setTaskStats({
        total: tasks.length,
        done: tasks.filter((t: any) => t.completed).length
      });
    }

    const savedFocus = localStorage.getItem('zakirly_focus_level');
    if (savedFocus) {
      setFocusLevel(parseInt(savedFocus));
    }
  }, []);

  const stats = [
    { label: 'المهام الدراسية', value: `${taskStats.done}/${taskStats.total}`, color: 'from-blue-600/20 to-cyan-500/10', icon: CheckSquare, iconColor: 'text-[#00D1FF]' },
    { label: 'ساعات المذاكرة', value: '0.0h', color: 'from-purple-600/20 to-indigo-500/10', icon: Calendar, iconColor: 'text-purple-400' },
    { label: 'مستوى التركيز', value: `${focusLevel}%`, color: 'from-emerald-600/20 to-teal-500/10', icon: BrainCircuit, iconColor: 'text-emerald-400' },
  ];

  const encouragements = [
    "أنت مبدع! استمر في التقدم 🌟",
    "كل خطوة صغيرة تقربك من حلمك الكبير 🚀",
    "النجاح يليق بك يا بطل 🎓",
    "ركز على أهدافك والقمة في انتظارك 🏔️"
  ];
  const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

  return (
    <div className="space-y-12 pb-20 h-full">
      {/* Hero Welcome */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-bg-panel border border-border-main p-8 md:p-10 text-text-main shadow-2xl transition-colors">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl text-center md:text-right">
            <span className="text-[10px] font-black text-[#00D1FF] uppercase tracking-[0.2em] mb-4 block">Welcome to ZAKIRLY</span>
            <h1 className="text-3xl md:text-5xl font-black font-display mb-6 leading-tight flex flex-col md:flex-row gap-4 items-center">
              <span>أهلاً بك يا</span>
              <span className="text-[#00D1FF] underline decoration-cyan-500/30 underline-offset-[12px]">{profile.name.split(' ')[0]}</span>
              <span>! 🎓</span>
            </h1>
            <p className="text-text-sub text-lg leading-relaxed mb-4 font-medium">
               أنا معاك يا بطل في رحلة <span className="text-cyan-400 font-black">{profile.stage}</span>. هنشرح أي درس، وننظم الوقت، ونوصل لأحلامك. 🚀
            </p>
            <p className="text-emerald-400 font-black text-sm mb-8 animate-pulse">
               {randomEncouragement}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button 
                onClick={() => setActiveTab('ai')}
                className="bg-[#00D1FF] text-black px-8 py-4 rounded-2xl font-black shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-3"
              >
                <BrainCircuit size={20} />
                اسأل المساعد الذكي
              </button>
            </div>
          </div>
          <div className="hidden md:block">
             <motion.div 
               animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative"
             >
                <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full"></div>
                <div className="bg-bg-panel shadow-2xl p-10 rounded-full border border-border-main relative z-10 transition-colors">
                   <BrainCircuit size={100} className="text-[#00D1FF]" />
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Bar */}
      <div className="sticky top-0 z-30 -mx-4 px-4 py-3 bg-bg-base/80 backdrop-blur-xl border-b border-border-main/50 flex gap-3 overflow-x-auto no-scrollbar transition-colors">
        {[
          { id: 'platforms-preview', label: 'المنصات التعليمية', icon: Globe, color: 'text-purple-400' },
          { id: 'map-preview', label: 'خريطة العالم', icon: Map, color: 'text-indigo-400' },
          { id: 'ministry-hub', label: 'روابط الوزارة', icon: ExternalLink, color: 'text-blue-400' },
          { id: 'exams-preview', label: 'الامتحانات', icon: Trophy, color: 'text-amber-400' },
          { id: 'faith-preview', label: 'الإيمانيات', icon: Heart, color: 'text-emerald-400' },
          { id: 'study-preview', label: 'المذاكرة', icon: BookOpen, color: 'text-cyan-400' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              const el = document.getElementById(item.id);
              if (el) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = el.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="flex-none flex items-center gap-2.5 px-6 py-2.5 bg-bg-panel border border-border-main rounded-2xl text-[11px] font-black text-text-sub hover:text-text-main hover:border-[#00D1FF]/40 transition-all shadow-sm"
          >
            <item.icon size={14} className={item.color} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-6 rounded-[2rem] border border-border-main bg-bg-panel flex items-center gap-5 group relative overflow-hidden transition-colors`}
          >
            <div className={`absolute inset-0 bg-gradient-to-tr ${stat.color} opacity-40`}></div>
            <div className={`relative z-10 p-4 rounded-2xl bg-bg-base border border-border-main ${stat.iconColor} shadow-inner transition-colors`}>
              <stat.icon size={26} />
            </div>
            <div className="relative z-10">
              <p className="text-text-sub text-[10px] font-black uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-text-main">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Smaller Advice Section */}
      <section className="bg-bg-panel/60 border border-border-main rounded-3xl p-4 md:p-5 relative overflow-hidden group shadow-inner transition-colors mx-auto max-w-2xl">
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-2 bg-bg-base border border-border-main text-[#00D1FF] rounded-xl shadow-xl transition-colors">
            <Lightbulb size={18} />
          </div>
          <div className="flex-1">
            <p className="text-text-main text-xs leading-relaxed font-black opacity-90 truncate max-w-md">
              {loading ? "..." : advice.split('.')[0] + '.'}
            </p>
          </div>
          <button 
            onClick={async () => {
               setLoading(true);
               const text = await getStudyAdvice();
               setAdvice(text || advice);
               setLoading(false);
            }}
            className="text-[#00D1FF] font-black text-[9px] bg-bg-base px-3 py-1.5 rounded-lg border border-border-main hover:bg-[#00D1FF] hover:text-black transition-all uppercase"
          >
            جديد
          </button>
        </div>
      </section>

      {/* Single Page Sections - Scrollable Previews */}
      <div className="space-y-24">
        {/* Platforms Hub Preview */}
        <section id="platforms-preview" className="scroll-mt-20">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-text-main flex items-center gap-3">
                 <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                    <Globe size={20} />
                 </div>
                 المنصات التعليمية الموصى بها ⭐
              </h2>
           </div>
           
           <div className="bg-bg-panel border border-border-main p-8 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full pointer-events-none"></div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-right">
                 <div className="flex-1">
                    <h3 className="text-xl font-black text-text-main mb-3">ترشيحات خاصة بنظام {profile.language === 'arabic' ? 'العربي' : 'اللغات'}</h3>
                    <p className="text-text-sub font-bold text-sm leading-relaxed max-w-xl">
                       جمعنا لك أفضل المدرسين والمنصات التعليمية اللي هتحتاجها في {profile.stage} بناءً على نظام دراستك.
                    </p>
                 </div>
                 <button 
                  onClick={() => setActiveTab('platforms')}
                  className="px-10 py-5 bg-purple-500 text-white font-black rounded-2xl shadow-xl shadow-purple-500/20 hover:bg-purple-400 hover:scale-105 transition-all flex items-center gap-4"
                 >
                    استعراض المنصات
                    <ArrowRight size={20} className="rotate-180" />
                 </button>
              </div>
           </div>
        </section>

        {/* Ministry Hub - NEW SECTION */}
        <section id="map-preview" className="scroll-mt-20">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-text-main flex items-center gap-3">
                 <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                    <Map size={20} />
                 </div>
                 الجغرافيا وخرائط العالم 🌍
              </h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-bg-panel border border-border-main p-8 rounded-[2.5rem] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none"></div>
                 <h3 className="text-xl font-black text-text-main mb-3 relative z-10">اكتشف العالم</h3>
                 <p className="text-text-sub font-bold text-sm leading-relaxed mb-6 relative z-10">
                    خرائط تفاعلية وسياسية لدعم منهج الدراسات الاجتماعية والجغرافيا.
                 </p>
                 <button 
                  onClick={() => setActiveTab('map')}
                  className="px-8 py-4 bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-400 transition-all flex items-center gap-3"
                 >
                    فتح قسم الخرائط
                    <ArrowRight size={18} className="rotate-180" />
                 </button>
              </div>
              <div className="bg-bg-panel/40 border border-border-main p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                 <div className="p-4 bg-bg-base border border-border-main rounded-2xl text-text-sub mb-4">
                    <ExternalLink size={24} />
                 </div>
                 <a 
                   href="https://arabic.mapsofworld.com/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-sm font-black text-text-main hover:text-[#00D1FF] transition-colors"
                 >
                   زيارة مكتبة الخرائط العربية ↗️
                 </a>
              </div>
           </div>
        </section>

        {/* Ministry Hub - NEW SECTION */}
        <section id="ministry-hub" className="scroll-mt-20">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-text-main flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                    <ExternalLink size={20} />
                 </div>
                 روابط الوزارة والمناهج 📚
              </h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'التقييمات الذكية', icon: Target, link: 'https://ellibrary.moe.gov.eg/cha/', color: 'text-rose-400', bg: 'bg-rose-500/10' },
                { title: 'بنك الأسئلة', icon: School, link: 'https://ellibrary.moe.gov.eg/books/', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { title: 'شرح الدروس', icon: PlayCircle, link: 'https://ellibrary.moe.gov.eg/video/', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { title: 'مدرستنا Plus', icon: Sparkles, link: 'https://madrasetnaplus.eg/', color: 'text-amber-400', bg: 'bg-amber-500/10' },
              ].map((res, i) => (
                <motion.a 
                  key={i}
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-bg-panel border border-border-main p-6 rounded-[2rem] flex flex-col items-center justify-center text-center gap-4 hover:border-[#00D1FF] hover:shadow-xl hover:shadow-cyan-500/10 transition-all group"
                >
                   <div className={`w-14 h-14 ${res.bg} rounded-2xl flex items-center justify-center ${res.color} group-hover:scale-110 transition-transform shadow-inner`}>
                      <res.icon size={28} />
                   </div>
                   <div className="space-y-1">
                      <span className="font-black text-sm text-text-main block">{res.title}</span>
                      <span className="text-[9px] text-text-sub font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">اضغط للزيارة</span>
                   </div>
                </motion.a>
              ))}
           </div>
        </section>

        {/* Exams Section Preview */}
        <section id="exams-preview" className="scroll-mt-20">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-text-main flex items-center gap-3">
                 <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                    <Trophy size={20} />
                 </div>
                 اختبر قدراتك 🏆
              </h2>
           </div>
           <div className="bg-bg-panel border border-border-main rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl overflow-hidden relative transition-colors">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              <div className="flex-1 text-center md:text-right">
                 <h3 className="text-xl font-black text-white mb-4">نظام الامتحانات الذكي</h3>
                 <p className="text-text-sub font-medium mb-8 leading-relaxed max-w-md mx-auto md:mr-0">تمارين مخصصة لمرحلتك {profile.stage} تم إنشاؤها خصيصاً لك بمساعدة الذكاء الاصطناعي.</p>
                 <button 
                    onClick={() => setActiveTab('exams')}
                    className="px-10 py-4 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 transition-all flex items-center gap-3 mx-auto md:mr-0 group shadow-lg shadow-amber-500/20"
                 >
                    ابدأ التحدي الآن
                    <ArrowRight size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
              <div className="w-48 h-48 bg-bg-base border border-border-main rounded-[3rem] flex items-center justify-center relative z-10 shadow-inner">
                 <Sparkles size={64} className="text-amber-400 animate-pulse" />
              </div>
           </div>
        </section>

        {/* Faith Module Preview */}
        <section id="faith-preview" className="scroll-mt-20">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-text-main flex items-center gap-3">
                 <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                    <Heart size={20} />
                 </div>
                 الجانب الإيماني 🕋
              </h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-bg-panel border border-border-main rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden transition-colors">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                       <Calendar size={24} />
                    </div>
                    <h3 className="font-black text-text-main text-lg">متابعة الصلوات والأذكار</h3>
                 </div>
                 <p className="text-text-sub font-bold text-sm leading-relaxed mb-8">لا تنسَ حظك من الطاعات، فهي مفتاح النجاح والتركيز الحقيقي.</p>
                 <button onClick={() => setActiveTab('faith')} className="px-8 py-3 bg-bg-base border border-border-main text-emerald-400 font-black rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-sm">
                    افتح القائمة الإيمانية
                 </button>
              </div>
              <div className="bg-bg-panel border border-border-main rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden transition-colors flex flex-col items-center justify-center text-center">
                 <BrainCircuit size={48} className="text-cyan-400 mb-4 opacity-40" />
                 <h3 className="font-black text-text-main text-xl mb-2">تسجيل إنجازاتك</h3>
                 <p className="text-text-sub text-sm font-bold mb-6">كل صلاة مسجلة تزيد من نقاط روحانيتك وتركيزك.</p>
                 <button onClick={() => setActiveTab('faith')} className="text-cyan-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    عرض الإحصائيات <ArrowRight size={14} className="rotate-180" />
                 </button>
              </div>
           </div>
        </section>

        {/* Study Management */}
        <section id="study-preview" className="scroll-mt-20">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-text-main flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                    <CheckSquare size={20} />
                 </div>
                 إدارة المذاكرة 📝
              </h2>
           </div>
           <div className="bg-bg-panel border border-border-main p-8 rounded-[3rem] shadow-xl relative overflow-hidden transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {[
                   { label: 'المهام', icon: CheckSquare, tab: 'tasks', desc: 'نظم يومك بذكاء' },
                   { label: 'الجدول', icon: Calendar, tab: 'schedule', desc: 'خطة دراسية محكمة' },
                   { label: 'نوتس', icon: School, tab: 'notes', desc: 'سجل أهم الملاحظات' },
                   { label: 'المدرسة', icon: BrainCircuit, tab: 'school', desc: 'بيانات المدرسين' },
                 ].map((mod, i) => (
                   <button 
                    key={i}
                    onClick={() => setActiveTab(mod.tab)}
                    className="p-6 bg-bg-base border border-border-main rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-cyan-500 hover:bg-bg-panel transition-all group shadow-inner"
                   >
                      <mod.icon size={28} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                      <div className="text-center">
                        <p className="font-black text-text-main group-hover:text-cyan-400 transition-colors">{mod.label}</p>
                        <p className="text-[10px] text-text-sub font-bold">{mod.desc}</p>
                      </div>
                   </button>
                 ))}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
