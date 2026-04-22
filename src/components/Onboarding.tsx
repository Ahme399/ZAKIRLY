import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import { Sparkles, Terminal, GraduationCap, MapPin, Calendar, Heart } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: '',
    stage: '',
    governorate: '',
    language: 'arabic'
  });

  const stages = [
    'الأول الابتدائي', 'الثاني الابتدائي', 'الثالث الابتدائي', 'الرابع الابتدائي', 'الخامس الابتدائي', 'السادس الابتدائي',
    'الأول الإعدادي', 'الثاني الإعدادي', 'الثالث الإعدادي',
    'الأول الثانوي', 'الثاني الثانوي', 'الثالث الثانوي'
  ];

  const governorates = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر', 'البحيرة', 'الفيوم', 'الغربية', 'الإسماعيلية', 'المنوفية', 'المنيا', 'القليوبية', 'الوادي الجديد', 'السويس', 'الشرقية', 'دمياط', 'بورسعيد', 'جنوب سيناء', 'كفر الشيخ', 'مطروح', 'الأقصر', 'قنا', 'شمال سيناء', 'سوهاج', 'بني سويف', 'أسيوط', 'أسوان'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.name && profile.stage && profile.governorate) {
      onComplete(profile);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050608] overflow-y-auto pt-10 pb-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="min-h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-xl bg-[#0C0D11] border border-gray-800 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <header className="text-center mb-10 relative z-10">
          <div className="w-16 h-16 bg-gray-900 border border-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#00D1FF] cyan-glow">
             <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-black text-white mb-3 font-display">مرحباً بك في ذاكرلي!</h1>
          <p className="text-gray-400 font-medium leading-relaxed">
            علشان أقدر أساعدك بشكل صح، محتاج أعرف شوية معلومات عنك يا بطل.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10 font-sans rtl">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-[#00D1FF] font-black flex items-center gap-2">
              <Terminal size={12} /> اسمك يا بطل
            </label>
            <input 
              required
              type="text"
              value={profile.name}
              onChange={e => setProfile({...profile, name: e.target.value})}
              placeholder="اكتب اسمك هنا..."
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-cyan-500/50 transition-all text-white font-bold text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Stage */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-emerald-400 font-black flex items-center gap-2">
                <GraduationCap size={12} /> المرحلة التعليمية
              </label>
              <select 
                required
                value={profile.stage}
                onChange={e => setProfile({...profile, stage: e.target.value})}
                className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all text-white font-bold text-sm appearance-none cursor-pointer"
              >
                <option value="" disabled>اختار مرحلتك</option>
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Governorate */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-rose-400 font-black flex items-center gap-2">
                <MapPin size={12} /> المحافظة (لمواقيت الصلاة)
              </label>
              <select 
                required
                value={profile.governorate}
                onChange={e => setProfile({...profile, governorate: e.target.value})}
                className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-rose-500/50 transition-all text-white font-bold text-sm appearance-none cursor-pointer"
              >
                <option value="" disabled>اختار محافظتك</option>
                {governorates.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-4 pt-2">
            <label className="text-[10px] uppercase tracking-widest text-purple-400 font-black flex items-center gap-2">
              <Sparkles size={12} /> نظام الدراسة الخاص بك
            </label>
            <div className="grid grid-cols-2 gap-4">
               <button
                type="button"
                onClick={() => setProfile({...profile, language: 'arabic'})}
                className={`py-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${profile.language === 'arabic' ? 'bg-[#00D1FF]/10 border-[#00D1FF] text-white' : 'bg-gray-900 border-gray-800 text-gray-500'}`}
               >
                 <span className="text-2xl">🇪🇬</span>
                 <span className="font-black text-sm">عربي</span>
               </button>
               <button
                type="button"
                onClick={() => setProfile({...profile, language: 'languages'})}
                className={`py-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${profile.language === 'languages' ? 'bg-[#00D1FF]/10 border-[#00D1FF] text-white' : 'bg-gray-900 border-gray-800 text-gray-500'}`}
               >
                 <span className="text-2xl">🇬🇧</span>
                 <span className="font-black text-sm">لغات / International</span>
               </button>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#00D1FF] text-black h-16 rounded-2xl font-black text-lg shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3 mt-4"
          >
            يلا نبدأ الرحلة <Heart size={20} fill="currentColor" />
          </motion.button>
        </form>
      </motion.div>
      </div>
    </div>
  );
}
