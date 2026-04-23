import { useState } from 'react';
import { Globe, User, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';

interface Platform {
  name: string;
  subject: string;
  type: 'arabic' | 'languages';
  url: string;
}

const PLATFORMS: Platform[] = [
  { name: 'محمد صلاح', subject: 'لغة عربية', type: 'arabic', url: 'https://bastalak.com' },
  { name: 'محمد العميد', subject: 'لغة عربية', type: 'arabic', url: 'https://elameededu.com' },
  { name: 'Kareem Tammam', subject: 'Math', type: 'languages', url: 'https://mrkarimtammam.com' },
  { name: 'كيرلس وليم', subject: 'Math', type: 'languages', url: 'https://mrkirolloswilliam.com' },
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
  // Directly show all platforms as requested
  const filteredPlatforms = PLATFORMS;

  return (
    <div className="space-y-10 pb-20">
      <header className="relative flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 bg-[#0C0D11] border border-gray-800 rounded-[3rem] overflow-hidden group shadow-2xl transition-colors">
         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent"></div>
         <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-[10px] font-black text-[#00D1FF] uppercase tracking-widest mb-4">
              <Globe size={12} />
              Educational Platforms Hub
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-2">المنصات التعليمية <span className="text-[#00D1FF]">الشاملة</span></h1>
            <p className="text-gray-400 font-medium max-w-lg leading-relaxed">
               جمعنا لك أفضل المدرسين والمنصات التعليمية المتاحة لجميع الأنظمة (عربي ولغات) في صفحة واحدة.
            </p>
         </div>
         
         <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-gray-900 shadow-inner p-4 rounded-3xl border border-gray-800 transition-colors">
               <div className={`p-4 rounded-2xl ${profile.language === 'arabic' ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-[#00D1FF]/10 text-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.2)]'}`}>
                  <User size={32} />
               </div>
               <div>
                  <h4 className="font-black text-text-main text-sm">بروفايل {profile.name.split(' ')[0]}</h4>
                  <p className="text-[10px] text-text-sub flex items-center gap-1.5 font-bold animate-pulse">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    نظام {profile.language === 'arabic' ? 'العربي' : 'اللغات'}
                  </p>
               </div>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlatforms.map((platform, i) => (
          <motion.a
            key={i}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -8, scale: 1.02 }}
            className="group bg-[#0C0D11] border border-gray-800 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-between h-full transition-all"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
             
             <div>
                <div className="flex items-center justify-between mb-8">
                   <div className="w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-[#00D1FF] shadow-inner group-hover:rotate-12 transition-transform">
                      <Globe size={28} />
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-[#00D1FF] uppercase tracking-widest">{platform.subject}</span>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black mt-2 ${
                        platform.type === 'arabic' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {platform.type === 'arabic' ? 'نظام عربي' : 'نظام لغات'}
                      </span>
                   </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-[#00D1FF] transition-colors">{platform.name}</h3>
                <p className="text-gray-400 text-sm font-bold leading-relaxed mb-6">
                   أقوى شرح لـ {platform.subject} متاح الآن على منصة {platform.name}. اتبع الرابط للبدء.
                </p>
             </div>

             <div className="flex items-center justify-between pt-6 border-t border-gray-900">
                <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover:text-[#00D1FF] transition-colors">زيارة المنصة</span>
                <div className="p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 group-hover:bg-[#00D1FF] group-hover:text-black group-hover:border-[#00D1FF] transition-all">
                   <ArrowRight size={20} className="rotate-180" />
                </div>
             </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
