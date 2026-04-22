/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Home, 
  BrainCircuit, 
  CheckSquare, 
  Notebook, 
  Calculator as CalcIcon, 
  ExternalLink, 
  Lightbulb,
  Menu,
  X,
  ChevronLeft,
  Calendar,
  BookOpen,
  Video,
  GraduationCap,
  Heart,
  School,
  FileText,
  User,
  MapPin,
  Sun,
  Moon,
  Trophy,
  Globe,
  Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from './types';

// Components
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';
import TaskManager from './components/TaskManager';
import NoteEditor from './components/NoteEditor';
import AdvancedCalculator from './components/AdvancedCalculator';
import ResourceLinks from './components/ResourceLinks';
import StudySchedule from './components/StudySchedule';
import Onboarding from './components/Onboarding';
import FaithTools from './components/FaithTools';
import SchoolDirectory from './components/SchoolDirectory';
import ExamHub from './components/ExamHub';
import SchoolTimetable from './components/SchoolTimetable';
import PlatformsHub from './components/PlatformsHub';
import WorldMap from './components/WorldMap';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('zakirly_theme');
    return saved ? saved === 'dark' : true;
  });
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('zakirly_profile');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem('zakirly_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    localStorage.setItem('zakirly_profile', JSON.stringify(newProfile));
    setProfile(newProfile);
  };

  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: Home },
    { id: 'platforms', label: 'المنصات التعليمية', icon: Globe },
    { id: 'map', label: 'خريطة العالم', icon: Map },
    { id: 'timetable', label: 'الجدول المدرسي', icon: Calendar },
    { id: 'ai', label: 'المساعد الذكي', icon: BrainCircuit },
    { id: 'exams', label: 'نظام الامتحانات', icon: Trophy },
    { id: 'faith', label: 'الجانب الإيماني', icon: Heart },
    { id: 'school', label: 'دليل المدرسة', icon: School },
    { id: 'tasks', label: 'المهام الدراسية', icon: CheckSquare },
    { id: 'schedule', label: 'جدول المذاكرة', icon: Notebook },
    { id: 'notes', label: 'النوتس', icon: Notebook },
    { id: 'calculator', label: 'الآلة الحاسبة', icon: CalcIcon },
    { id: 'resources', label: 'روابط هامة', icon: ExternalLink },
  ];

  if (!profile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex h-screen bg-bg-base text-text-main font-sans rtl overflow-hidden p-3 md:p-4 gap-3 md:gap-4 transition-colors duration-300 relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D1FF]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Sidebar - Desktop */}
      {!isMobile && (
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 260 : 80 }}
          className="h-full bg-bg-panel border border-border-main rounded-3xl relative z-30 flex flex-col transition-all duration-300"
        >
          <div className="p-6 flex items-center justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.h1 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="text-xl font-black tracking-tight text-text-main whitespace-nowrap"
                >
                  ZAKIRLY <span className="text-[#00D1FF]">ذاكرلي</span>
                </motion.h1>
              )}
              {!isSidebarOpen && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[#00D1FF] font-black text-2xl mx-auto"
                >
                  Z
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="flex-1 px-4 space-y-1 py-4 overflow-y-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3 rounded-2xl transition-all duration-300 group ${
                  activeTab === item.id 
                    ? 'bg-gray-800 text-[#00D1FF] shadow-lg shadow-cyan-500/10' 
                    : 'text-text-sub hover:bg-gray-800/50 hover:text-text-main'
                }`}
              >
                <item.icon className="shrink-0" size={20} />
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mr-3 font-bold text-[12px] whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            ))}
          </nav>

          <div className="p-4 mt-auto">
             <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full h-10 flex items-center justify-center hover:bg-bg-base/50 rounded-2xl transition-colors text-text-sub mb-4"
            >
              {isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
            </button>
            <div className={`bg-gradient-to-tr from-cyan-500/10 to-blue-600/10 rounded-2xl p-4 border border-cyan-500/20 ${!isSidebarOpen && 'hidden'}`}>
              <h3 className="text-[#00D1FF] font-black text-[9px] mb-1 uppercase tracking-widest leading-tight">{profile.stage}</h3>
              <p className="text-text-sub text-[10px] leading-relaxed font-bold">
                أنا المساعد الذكي الخاص بيك في رحلتك الدراسية.
              </p>
            </div>
          </div>
        </motion.aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative gap-3 md:gap-4">
        {/* Top Header */}
        <header className="h-16 bg-bg-panel border border-border-main rounded-3xl flex items-center justify-between px-6 shrink-0 shadow-lg shadow-black/20 transition-colors">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 bg-bg-base border border-border-main rounded-xl text-text-main hover:border-[#00D1FF]/50 transition-all shadow-sm"
              title={isDarkMode ? 'الوضع المضيء' : 'الوضع الليلي'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {isMobile && (
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-text-sub"
              >
                <Menu size={24} />
              </button>
            )}
            <h2 className="text-sm font-black text-text-sub uppercase tracking-widest font-display">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex gap-2">
                <span className="px-4 py-2 bg-bg-base border border-border-main rounded-xl text-[10px] font-bold text-cyan-400 flex items-center gap-2 transition-colors">
                  <MapPin size={12} /> {profile.governorate}
                </span>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="px-5 py-2 bg-[#00D1FF] text-black font-black rounded-xl text-[11px] shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
                >
                  نصائح اليوم ✨
                </button>
             </div>
             <div className="flex items-center gap-3 bg-bg-base/60 p-1 padding-left-4 border border-border-main rounded-2xl transition-colors">
               <div className="w-9 h-9 bg-bg-panel border border-border-main rounded-xl flex items-center justify-center text-[#00D1FF] font-black text-xs shadow-inner">
                 {profile.name.substring(0, 2).toUpperCase()}
               </div>
               <span className="text-xs font-black text-text-main ml-4 hidden sm:inline">{profile.name}</span>
             </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="min-h-0"
            >
              {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} profile={profile} />}
              {activeTab === 'platforms' && <PlatformsHub profile={profile} />}
              {activeTab === 'map' && <WorldMap />}
              {activeTab === 'timetable' && <SchoolTimetable />}
              {activeTab === 'ai' && <AIAssistant stage={profile.stage} language={profile.language} />}
              {activeTab === 'exams' && <ExamHub stage={profile.stage} language={profile.language} />}
              {activeTab === 'faith' && <FaithTools governorate={profile.governorate} />}
              {activeTab === 'school' && <SchoolDirectory />}
              {activeTab === 'tasks' && <TaskManager />}
              {activeTab === 'schedule' && <StudySchedule />}
              {activeTab === 'notes' && <NoteEditor />}
              {activeTab === 'calculator' && <AdvancedCalculator />}
              {activeTab === 'resources' && <ResourceLinks />}
            </motion.div>
          </AnimatePresence>

          {/* Footer Attribution - Always at the bottom of the scrollable content */}
          <footer className="py-16 px-10 border-t border-border-main/40 transition-colors mt-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
              <p className="text-text-sub text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Designed & Developed by</p>
              <div className="flex items-center gap-10">
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-black text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Mariam Osama</span>
                    <div className="w-8 h-0.5 bg-purple-500 rounded-full opacity-30"></div>
                 </div>
                 <span className="text-text-sub font-black text-xs opacity-20">&</span>
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-black text-[#00D1FF] drop-shadow-[0_0_15px_rgba(0,209,255,0.4)]">Farah Nasr</span>
                    <div className="w-8 h-0.5 bg-[#00D1FF] rounded-full opacity-30"></div>
                 </div>
              </div>
              <p className="mt-8 text-[8px] font-black text-text-sub opacity-30 uppercase tracking-widest">ZAKIRLY Platform © 2026 • All Rights Reserved</p>
            </div>
          </footer>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 overflow-hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-[280px] bg-[#0C0D11] border-r border-gray-800 shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 flex items-center justify-between border-b border-gray-800">
              <h1 className="text-xl font-black text-white">ذاكرلي <span className="text-[#00D1FF]">Z</span></h1>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center p-4 rounded-2xl transition-all ${
                    activeTab === item.id 
                      ? 'bg-gray-800 text-[#00D1FF]' 
                      : 'text-gray-500 hover:bg-gray-900/50'
                  }`}
                >
                  <item.icon className="shrink-0" size={20} />
                  <span className="mr-4 font-black text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.aside>
        </div>
      )}
    </div>
  );
}

