import { Globe, Map, ExternalLink, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function WorldMap() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 h-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-10 bg-bg-panel border border-border-main rounded-[3rem] relative overflow-hidden group shadow-2xl transition-colors">
         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent"></div>
         <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-base border border-border-main rounded-full text-[10px] font-black text-[#00D1FF] uppercase tracking-widest mb-4">
              <Compass size={12} />
              Geography Tools
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-2">خريطة <span className="text-[#00D1FF]">العالم</span></h1>
            <p className="text-text-sub font-medium max-w-lg leading-relaxed">
               استكشف خرائط العالم، القارات، والدول لدعم مذكرات الجغرافيا الخاصة بك.
            </p>
         </div>
         <div className="p-6 bg-bg-base border border-border-main rounded-[2rem] text-[#00D1FF] shadow-inner cyan-glow transition-colors">
            <Globe size={48} />
         </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* External Map Link Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-bg-panel border border-border-main p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group transition-colors"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="w-16 h-16 bg-bg-base border border-border-main rounded-2xl flex items-center justify-center text-[#00D1FF] mb-6 shadow-inner">
              <Map size={32} />
           </div>
           <h3 className="text-2xl font-black text-text-main mb-4">عرض خرائط العالم التفصيلية</h3>
           <p className="text-text-sub font-bold text-sm leading-relaxed mb-8">
              انتقل الآن إلى أكبر مكتبة خرائط عربية لمشاهدة خرائط القارات (أفريقيا، أوروبا، آسيا) وخرائط الطبيعة والسياسة.
           </p>
           <a 
             href="https://arabic.mapsofworld.com/"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-3 px-8 py-4 bg-[#00D1FF] text-black font-black rounded-2xl shadow-xl shadow-cyan-500/20 hover:bg-cyan-400 hover:scale-105 transition-all"
           >
             فتح الخرائط الآن
             <ExternalLink size={18} />
           </a>
        </motion.div>

        {/* Info Card */}
        <div className="bg-bg-panel border border-border-main p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-center transition-colors">
           <h4 className="text-[#00D1FF] font-black text-xs uppercase tracking-widest mb-4">Pro Tip for Geographers 🌍</h4>
           <ul className="space-y-4">
              {[
                'استخدم الخرائط الصماء للتدريب على أماكن التضاريس.',
                'ركز على مفتاح الخريطة لفهم الرموز والألوان.',
                'اربط بين الخريطة السياسية والطبيعية لفهم علاقة المناخ بالحدود.'
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                   <div className="w-5 h-5 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <ArrowRight size={12} className="rotate-180" />
                   </div>
                   <p className="text-text-sub font-bold text-sm">{tip}</p>
                </li>
              ))}
           </ul>
        </div>
      </div>

      <div className="aspect-video w-full rounded-[3rem] border border-border-main overflow-hidden bg-bg-panel shadow-2xl relative transition-colors">
         <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
            <div className="p-6 bg-bg-base border border-border-main rounded-3xl text-text-sub mb-6 animate-pulse transition-colors">
               <Globe size={64} />
            </div>
            <h3 className="text-2xl font-black text-text-main mb-4">نافذة الخرائط التفاعلية</h3>
            <p className="text-text-sub max-w-md mx-auto font-bold mb-8">
               يمكنك تصفح الخرائط الكبرى من هنا أو عبر الموقع الرسمي للخرائط.
            </p>
            <a 
              href="https://arabic.mapsofworld.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border border-border-main rounded-2xl text-text-sub font-black hover:border-cyan-500/50 hover:text-[#00D1FF] transition-all"
            >
              دخول الموقع الرسمي
            </a>
         </div>
         {/* Simple visualization / Placeholder for map if keys existed - for now a pretty glassmorphism overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
      </div>
    </div>
  );
}
