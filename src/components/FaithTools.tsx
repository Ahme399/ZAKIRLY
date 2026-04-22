import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Heart, 
  Fingerprint, 
  ExternalLink, 
  RefreshCcw, 
  Moon, 
  Sun,
  BookOpen,
  Clock,
  MapPin,
  CalendarDays
} from 'lucide-react';
import { PrayerStatus } from '../types';

// Simplified Prayer Times Data for Egypt Governorates (approximate)
const PRAYER_DATA: Record<string, any> = {
  'القاهرة': { fajr: '03:45', dhuhr: '11:53', asr: '15:29', maghrib: '18:27', isha: '19:51' },
  'الجيزة': { fajr: '03:46', dhuhr: '11:54', asr: '15:30', maghrib: '18:28', isha: '19:52' },
  'الإسكندرية': { fajr: '03:48', dhuhr: '11:58', asr: '15:36', maghrib: '18:34', isha: '20:00' },
  'الدقهلية': { fajr: '03:42', dhuhr: '11:52', asr: '15:29', maghrib: '18:26', isha: '19:50' },
  'البحر الأحمر': { fajr: '03:40', dhuhr: '11:43', asr: '15:13', maghrib: '18:11', isha: '19:31' },
  'البحيرة': { fajr: '03:46', dhuhr: '11:56', asr: '15:34', maghrib: '18:32', isha: '19:57' },
  'الفيوم': { fajr: '03:48', dhuhr: '11:55', asr: '15:30', maghrib: '18:29', isha: '19:53' },
  'الغربية': { fajr: '03:43', dhuhr: '11:53', asr: '15:31', maghrib: '18:28', isha: '19:53' },
  'الإسماعيلية': { fajr: '03:40', dhuhr: '11:49', asr: '15:25', maghrib: '18:23', isha: '19:46' },
  'المنوفية': { fajr: '03:44', dhuhr: '11:54', asr: '15:31', maghrib: '18:29', isha: '19:53' },
  'المنيا': { fajr: '03:52', dhuhr: '11:56', asr: '15:29', maghrib: '18:30', isha: '19:52' },
  'القليوبية': { fajr: '03:44', dhuhr: '11:53', asr: '15:29', maghrib: '18:27', isha: '19:51' },
  'الوادي الجديد': { fajr: '04:05', dhuhr: '12:08', asr: '15:38', maghrib: '18:41', isha: '20:02' },
  'السويس': { fajr: '03:40', dhuhr: '11:48', asr: '15:24', maghrib: '18:22', isha: '19:45' },
  'الشرقية': { fajr: '03:42', dhuhr: '11:51', asr: '15:27', maghrib: '18:25', isha: '19:49' },
  'دمياط': { fajr: '03:40', dhuhr: '11:51', asr: '15:30', maghrib: '18:26', isha: '19:52' },
  'بورسعيد': { fajr: '03:38', dhuhr: '11:49', asr: '15:27', maghrib: '18:24', isha: '19:48' },
  'جنوب سيناء': { fajr: '03:37', dhuhr: '11:41', asr: '15:13', maghrib: '18:13', isha: '19:35' },
  'كفر الشيخ': { fajr: '03:43', dhuhr: '11:54', asr: '15:33', maghrib: '18:30', isha: '19:56' },
  'مطروح': { fajr: '03:59', dhuhr: '12:09', asr: '15:47', maghrib: '18:45', isha: '20:11' },
  'الأقصر': { fajr: '03:51', dhuhr: '11:46', asr: '15:14', maghrib: '18:19', isha: '19:38' },
  'قنا': { fajr: '03:49', dhuhr: '11:46', asr: '15:15', maghrib: '18:19', isha: '19:37' },
  'شمال سيناء': { fajr: '03:32', dhuhr: '11:43', asr: '15:21', maghrib: '18:18', isha: '19:42' },
  'سوهاج': { fajr: '03:53', dhuhr: '11:50', asr: '15:20', maghrib: '18:24', isha: '19:43' },
  'بني سويف': { fajr: '03:48', dhuhr: '11:54', asr: '15:29', maghrib: '18:29', isha: '19:52' },
  'أسيوط': { fajr: '03:54', dhuhr: '11:53', asr: '15:23', maghrib: '18:25', isha: '19:46' },
  'أسوان': { fajr: '03:52', dhuhr: '11:44', asr: '15:09', maghrib: '18:16', isha: '19:34' }
};

export default function FaithTools({ governorate }: { governorate: string }) {
  const [tasbihCount, setTasbihCount] = useState(0);
  const [prayers, setPrayers] = useState<PrayerStatus>(() => {
    const saved = localStorage.getItem('prayers_status');
    const today = new Date().toLocaleDateString();
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) return parsed;
    }
    return { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false, date: today };
  });

  const cityTimes = PRAYER_DATA[governorate] || PRAYER_DATA['القاهرة'];

  useEffect(() => {
    localStorage.setItem('prayers_status', JSON.stringify(prayers));
  }, [prayers]);

  const togglePrayer = (key: keyof Omit<PrayerStatus, 'date'>) => {
    setPrayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const azkarMorning = [
    "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.",
    "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور.",
    "رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً."
  ];

  const azkarEvening = [
    "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له.",
    "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.",
    "اللهم إني أسألك خير هذه الليلة وفتحها ونصرها ونورها وبركتها."
  ];

  return (
    <div className="space-y-6 pb-10 transition-colors">
      {/* Prayer Times Dashboard */}
      <section className="bg-bg-panel border border-border-main rounded-[2.5rem] p-8 shadow-xl transition-colors">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-text-main flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-[#00D1FF]">
                <Clock size={24} />
              </div>
              مواقيت الأذان اليوم
            </h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-bg-base border border-border-main rounded-xl text-xs font-bold text-text-sub transition-colors">
               <MapPin size={14} className="text-rose-500" />
               {governorate}
            </div>
         </div>
         
         <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { id: 'fajr', label: 'الفجر', time: cityTimes.fajr, icon: Sun },
              { id: 'dhuhr', label: 'الظهر', time: cityTimes.dhuhr, icon: Sun },
              { id: 'asr', label: 'العصر', time: cityTimes.asr, icon: Sun },
              { id: 'maghrib', label: 'المغرب', time: cityTimes.maghrib, icon: Moon },
              { id: 'isha', label: 'العشاء', time: cityTimes.isha, icon: Moon },
            ].map((p) => (
              <div key={p.id} className="bg-bg-base/60 border border-border-main p-5 rounded-[2rem] text-center group hover:border-cyan-500/30 transition-all">
                 <p className="text-[10px] font-black text-text-sub uppercase mb-2">{p.label}</p>
                 <p className="text-2xl font-black text-text-main mb-1 group-hover:text-[#00D1FF] transition-colors">{p.time}</p>
                 <p className="text-[9px] text-text-sub/50 font-bold">ص - AM</p>
              </div>
            ))}
         </div>
      </section>

      {/* Prayer Status & Tasbih */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prayers Checklist */}
        <section className="bg-bg-panel border border-border-main rounded-[2.5rem] p-8 shadow-xl transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-text-main flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={24} />
              </div>
              حاسب نفسك (الصلوات)
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { id: 'fajr', label: 'الفجر' },
              { id: 'dhuhr', label: 'الظهر' },
              { id: 'asr', label: 'العصر' },
              { id: 'maghrib', label: 'المغرب' },
              { id: 'isha', label: 'العشاء' },
            ].map((p) => {
              const active = prayers[p.id as keyof PrayerStatus] === true;
              return (
                <button
                  key={p.id}
                  onClick={() => togglePrayer(p.id as any)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    active 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-text-main' 
                      : 'bg-bg-base border-border-main text-text-sub hover:border-gray-400'
                  }`}
                >
                  <span className="font-bold">{p.label}</span>
                  {active ? <CheckCircle2 className="text-emerald-500" size={24} /> : <Circle size={24} />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Tasbih & Quran */}
        <div className="space-y-6">
          <section className="bg-bg-panel border border-border-main rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden group transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D1FF]/5 blur-3xl rounded-full"></div>
            <Fingerprint size={48} className="text-[#00D1FF] mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-text-sub font-black text-sm uppercase tracking-widest mb-2">سبحة إلكترونية</h3>
            <div className="text-6xl font-black text-text-main mb-8 transition-transform group-active:scale-110">{tasbihCount}</div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setTasbihCount(v => v + 1)}
                className="w-24 h-24 bg-bg-base border border-border-main rounded-full flex items-center justify-center text-[#00D1FF] hover:bg-[#00D1FF] hover:text-white transition-all shadow-xl active:scale-90"
              >
                <Fingerprint size={32} />
              </button>
              <button 
                onClick={() => setTasbihCount(0)}
                className="w-12 h-12 mt-6 bg-bg-base/80 rounded-full flex items-center justify-center text-text-sub hover:text-rose-500 transition-all border border-border-main"
              >
                <RefreshCcw size={18} />
              </button>
            </div>
          </section>

          <a 
            href="https://quran.com/ar"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-28 bg-bg-panel border border-border-main rounded-[2rem] p-6 hover:border-emerald-500/50 transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="flex items-center justify-between h-full relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-text-main font-black text-lg">القرآن الكريم</h3>
                  <p className="text-text-sub text-xs font-bold font-sans">قراءة واستماع بجميع الأصوات</p>
                </div>
              </div>
              <ExternalLink className="text-text-sub/50 group-hover:text-emerald-400 transition-colors" size={24} />
            </div>
          </a>
        </div>
      </div>

      {/* Azkar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-bg-panel border border-border-main rounded-[2.5rem] p-8 shadow-xl transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <Sun className="text-amber-400" size={24} />
            <h3 className="text-lg font-black text-text-main">أذكار الصباح</h3>
          </div>
          <div className="space-y-4">
            {azkarMorning.map((zekr, i) => (
              <div key={i} className="p-5 bg-bg-base/50 border border-border-main rounded-2xl text-text-sub text-sm leading-relaxed font-medium transition-colors">
                {zekr}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-bg-panel border border-border-main rounded-[2.5rem] p-8 shadow-xl transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <Moon className="text-indigo-400" size={24} />
            <h3 className="text-lg font-black text-text-main">أذكار المساء</h3>
          </div>
          <div className="space-y-4">
            {azkarEvening.map((zekr, i) => (
              <div key={i} className="p-5 bg-bg-base/50 border border-border-main rounded-2xl text-text-sub text-sm leading-relaxed font-medium transition-colors">
                {zekr}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Placeholder for real API data message */}
      <div className="bg-bg-panel/40 border border-border-main p-6 rounded-3xl text-center transition-colors">
        <p className="text-text-sub text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3">
          <Clock size={16} /> مواقيت الصلاة تعتمد على محافظة: <span className="text-cyan-400">{governorate}</span>
        </p>
      </div>
    </div>
  );
}
