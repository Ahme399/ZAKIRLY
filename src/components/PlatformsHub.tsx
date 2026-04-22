import { useState } from 'react';
import { ExternalLink, PlayCircle, Star, User, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';

interface Platform {
  name: string;
  subject: string;
  type: 'arabic' | 'languages';
  url: string;
  image?: string;
}

const PLATFORMS: Platform[] = [
  { name: 'محمد صلاح', subject: 'لغة عربية', type: 'arabic', url: 'https://bastalak.com' },
  { name: 'محمد العميد', subject: 'لغة عربية', type: 'arabic', url: 'https://elameededu.com' },
  { name: 'Kareem Tammam', subject: 'Math', type: 'languages', url: 'https://mrkarimtammam.com' },
  { name: 'أحمد فؤاد', subject: 'رياضة', type: 'arabic', url: 'https://arabmaths.com' },
  { name: 'إبراهيم عادل', subject: 'English', type: 'languages', url: 'https://zamericanenglish.net' },
  { name: 'أحمد عادل', subject: 'English', type: 'arabic', url: 'https://engwithahmedadel.com' },
  { name: 'أحمد مجدي', subject: 'فيزياء', type: 'arabic', url: 'https://physicsacademyedu.com' },
  { name: 'محمد عبدالرازق', subject: 'Physics', type: 'languages', url: 'https://physicsig.com' },
  { name: 'محمد عبد الجواد', subject: 'كيمياء', type: 'arabic', url: 'https://chemsimplified.com' },
  { name: 'أحمد حسن', subject: 'Chemistry', type: 'languages', url: 'https://chemig.com' },
  { name: 'أحمد الجوهري', subject: 'أحياء', type: 'arabic', url: 'https://bioacademyedu.com' },
  { name: 'سارة محمد', subject: 'Biology', type: 'languages', url: 'https://biologyig.com' },
];

export default function PlatformsHub({ profile }: { profile: UserProfile }) {
  const [filter, setFilter] = useState<'my' | 'all'>('my');
  const filteredPlatforms = filter === 'my' 
    ? PLATFORMS.filter(p => p.type === profile.language)
    : PLATFORMS;

  return (
    <div className="space-y-10 pb-20">
      <header className="relative flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 bg-[#0C0D11] border border-gray-800 rounded-[3rem] overflow-hidden group shadow-2xl transition-colors">
         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent"></div>
         <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-[10px] font-black text-[#00D1FF] uppercase tracking-widest mb-4">
              <Globe size={12} />
              Educational Platforms
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-2">منصات <span className="text-[#00D1FF]">المدرسين</span></h1>
            <p className="text-gray-400 font-medium max-w-lg leading-relaxed">
               أفضل المدرسين المصريين لمنهجك الدراسي ({profile.language === 'arabic' ? 'نظام عربي' : 'نظام لغات'}).
            </p>
         </div>
         
         <div className="relative z-10 flex flex-col gap-4">
            <div className="flex bg-gray-950 p-1.5 rounded-2xl border border-gray-800 shadow-inner">
               <button 
                onClick={() => setFilter('my')}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${filter === 'my' ? 'bg-[#00D1FF] text-black shadow-lg shadow-cyan-500/20' : 'text-gray-500 hover:text-white'}`}
               >
                  نظامي فقط
               </button>
               <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${filter === 'all' ? 'bg-[#00D1FF] text-black shadow-lg shadow-cyan-500/20' : 'text-gray-500 hover:text-white'}`}
               >
                  عرض الكل
               </button>
            </div>
            
            <div className="flex items-center gap-4 bg-gray-900 shadow-inner p-4 rounded-3xl border border-gray-800 transition-colors">
               <div className={`p-4 rounded-2xl ${profile.language === 'arabic' ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-[#00D1FF]/10 text-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.2)]'}`}>
                  <User size={32} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 leading-none mb-1">نظامك الحالي</p>
                  <p className="text-xl font-black text-white">{profile.language === 'arabic' ? 'عربي' : 'لغات'}</p>
               </div>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlatforms.map((platform, i) => (
          <motion.a
            key={i}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -8, scale: 1.02 }}
            className="group bg-[#0C0D11] border border-gray-800 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-between h-full transition-all"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
             
             <div>
                <div className="flex items-center justify-between mb-8">
                   <div className="w-14 h-14 bg-gray-950 border border-gray-800 rounded-2xl flex items-center justify-center text-[#00D1FF] group-hover:scale-110 transition-transform shadow-inner">
                      <PlayCircle size={28} />
                   </div>
                   <div className="flex bg-gray-900 border border-gray-800 p-2 rounded-xl text-amber-500 shadow-inner">
                      <Star size={14} fill="currentColor" />
                   </div>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#00D1FF] transition-colors">{platform.name}</h3>
                <p className="text-gray-400 font-bold text-sm tracking-wide mb-6">{platform.subject} <span className="mx-2 opacity-20">|</span> {platform.type === 'arabic' ? 'عربي' : 'لغات'}</p>
             </div>

             <div className="flex items-center justify-between pt-6 border-t border-gray-800 mt-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00D1FF] group-hover:underline">زيارة المنصة الآن</span>
                <div className="p-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-500 group-hover:text-white transition-colors">
                   <ExternalLink size={18} />
                </div>
             </div>
          </motion.a>
        ))}
      </div>

      <div className="bg-bg-panel/50 border border-border-main p-8 rounded-[2.5rem] text-center shadow-inner mt-10">
         <p className="text-text-sub font-bold leading-relaxed mb-6">
            تعرف مدرس شاطر تاني وعايز تضيفه؟ تواصل معنا لتحديث قائمة المدرسين الأفضل لك!
         </p>
         <button className="px-10 py-4 bg-gray-900 border border-gray-800 text-[#00D1FF] font-black rounded-2xl flex items-center gap-3 mx-auto hover:bg-[#0C0D11] transition-all group">
            اقتراح مدرس جديد
            <ArrowRight size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
    </div>
  );
}
