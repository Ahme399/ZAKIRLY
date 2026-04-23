import { ExternalLink, BookOpen, PlayCircle, FileSpreadsheet, ArrowRight, Sparkles, Tv } from 'lucide-react';
import { motion } from 'motion/react';

export default function ResourceLinks() {
  const ministryResources = [
    {
      title: 'التقييمات الأسبوعية',
      desc: 'بوابة التحقق من مستواك الدراسي أسبوعياً حسب المناهج الرسمية.',
      link: 'https://ellibrary.moe.gov.eg/cha/',
      icon: FileSpreadsheet,
      color: 'from-blue-600/10 to-blue-400/5',
      accent: 'bg-blue-500'
    },
    {
      title: 'الكتب والمناهج',
      desc: 'تحميل جميع الكتب الدراسية والملحقات لكل الصفوف والمواد.',
      link: 'https://ellibrary.moe.gov.eg/books/',
      icon: BookOpen,
      color: 'from-purple-600/10 to-purple-400/5',
      accent: 'bg-purple-500'
    },
    {
      title: 'فيديوهات الشرح',
      desc: 'قناة المنصات التعليمية الرسمية لمشاهدة شرح الدروس بالفيديو، تشمل جميع المراحل من الابتدائي للثانوي.',
      link: 'https://ellibrary.moe.gov.eg/video/',
      icon: PlayCircle,
      color: 'from-[#00D1FF]/10 to-cyan-500/5',
      accent: 'bg-[#00D1FF]'
    }
  ];

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto h-full">
      {/* Header Section */}
      <header className="relative p-10 rounded-[2.5rem] bg-[#0C0D11] border border-gray-800 shadow-2xl overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent"></div>
         <div className="relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-[10px] font-black text-[#00D1FF] uppercase tracking-widest mb-2">
              <ExternalLink size={12} />
              Educational Hub
            </div>
            <h1 className="text-4xl font-black text-white leading-tight">موارد الوزارة <span className="text-[#00D1FF]">Smart Links</span></h1>
            <p className="text-gray-400 max-w-xl mx-auto font-medium leading-relaxed">
               جمعنا لك أهم الروابط التعليمية الرسمية في مكان واحد عشان توصل لدروسك وكتبك بكل سهولة.
            </p>
         </div>
      </header>

      {/* Main Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ministryResources.map((res, i) => (
          <motion.a
            key={i}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -8, scale: 1.02 }}
            className={`flex flex-col p-8 rounded-[2rem] bg-[#0C0D11] border border-gray-800 shadow-xl transition-all group relative overflow-hidden`}
          >
             <div className={`absolute inset-0 bg-gradient-to-tr ${res.color} opacity-40 pointer-events-none`}></div>
             <div className={`w-16 h-16 rounded-[1.5rem] bg-gray-900 border border-gray-800 flex items-center justify-center mb-6 shadow-inner ${res.accent.replace('bg-', 'text-')} group-hover:cyan-glow transition-all`}>
               <res.icon size={32} />
             </div>
             <h3 className="text-xl font-black text-white mb-3 flex items-center justify-between">
               {res.title}
               <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -rotate-180 bg-gray-800 p-1 rounded-full text-[#00D1FF]" />
             </h3>
             <p className="text-gray-400 text-sm leading-relaxed font-bold">
               {res.desc}
             </p>
             <div className={`mt-6 h-1 w-12 ${res.accent} rounded-full`}></div>
          </motion.a>
        ))}
      </div>

      {/* Madrasetna Plus Special Section */}
      <section className="relative rounded-[2.5rem] bg-gradient-to-tr from-gray-950 to-gray-900 border border-gray-800 p-10 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden group">
         {/* Background Decor */}
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-right">
            <div className="flex-1">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full text-[10px] font-black text-rose-500 uppercase tracking-widest mb-6">
                 <Sparkles size={14} className="animate-pulse" />
                 Recommended Platform
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-none">مدرستنا <span className="text-[#00D1FF]">+ Plus</span></h2>
               <p className="text-gray-400 text-lg leading-relaxed font-bold mb-10 max-w-2xl mx-auto lg:mx-0">
                  مدرستنا بلس هي أكبر منصة تعليمية رقمية في مصر، بتحتوي على فيديوهات شرح تفاعلية ومراجعات لجميع الصفوف الدراسية بطريقة ممتعة وحديثة.
               </p>
               <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <a 
                    href="https://madrasetnaplus.eg/home" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-10 py-4 bg-[#00D1FF] text-black rounded-[1.2rem] font-black shadow-[0_15px_30px_-5px_rgba(0,209,255,0.3)] hover:scale-105 transition-all flex items-center gap-3 group"
                  >
                    ابدأ التعلم الآن
                    <ArrowRight size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <div className="flex items-center gap-3 px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-[1.2rem] text-gray-500 font-bold group-hover:text-cyan-400 transition-colors">
                     <Tv size={20} />
                     <span>متوفرة على الشاشات الذكية</span>
                  </div>
               </div>
            </div>
            <div className="shrink-0 relative hidden lg:block">
               <div className="w-80 h-80 bg-gray-900 border border-gray-800 rounded-[3rem] rotate-6 shadow-2xl flex items-center justify-center relative z-20 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                  <img 
                    src="https://madrasetnaplus.eg/assets/images/logo.png" 
                    alt="Madrasetna Plus" 
                    className="w-48 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] grayscale group-hover:grayscale-0 transition-all duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               </div>
               <div className="absolute inset-0 bg-[#00D1FF]/20 blur-3xl -z-10 rounded-full animate-pulse"></div>
            </div>
         </div>
      </section>
    </div>
  );
}
