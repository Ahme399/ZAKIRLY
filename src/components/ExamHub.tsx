import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Target, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Timer, 
  AlertCircle, 
  BrainCircuit,
  Loader2,
  Sparkles,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { askAI } from '../lib/gemini';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

export default function ExamHub({ stage, language }: { stage: string, language: string }) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    { id: 'arabic', label: 'اللغة العربية', icon: '📝' },
    { id: 'english', label: 'اللغة الإنجليزية', icon: '🇬🇧' },
    { id: 'math', label: 'الرياضيات / Math', icon: '🔢' },
    { id: 'science', label: 'العلوم / Science', icon: '🧪' },
    { id: 'social', label: 'الدراسات الاجتماعية', icon: '🌍' },
    { id: 'history', label: 'التاريخ', icon: '🏛️' },
    { id: 'geography', label: 'الجغرافيا', icon: '🗺️' },
    { id: 'physics', label: 'الفيزياء / Physics', icon: '⚡' },
    { id: 'chemistry', label: 'الكيمياء / Chemistry', icon: '⚗️' },
    { id: 'biology', label: 'الأحياء / Biology', icon: '🧬' },
  ];

  const saveResult = (finalScore: number, totalQuestions: number, timeTaken: number) => {
    const results = JSON.parse(localStorage.getItem('zakirly_exam_results') || '[]');
    const newResult = {
      id: Date.now(),
      score: finalScore,
      total: totalQuestions,
      time: timeTaken,
      date: new Date().toISOString(),
      stage: stage,
      subject: subjects.find(s => s.id === selectedSubject)?.label || selectedSubject
    };
    localStorage.setItem('zakirly_exam_results', JSON.stringify([...results, newResult]));
    
    // Update focus level based on exam performance
    const sessionFocus = Math.min(100, Math.floor((finalScore / totalQuestions) * 100));
    const currentFocus = parseInt(localStorage.getItem('zakirly_focus_level') || '100');
    const newFocus = Math.floor((currentFocus + sessionFocus) / 2);
    localStorage.setItem('zakirly_focus_level', newFocus.toString());
  };

  const startExam = async () => {
    if (!selectedSubject) return;
    setLoading(true);
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setStartTime(Date.now());

    try {
      const subjectLabel = subjects.find(s => s.id === selectedSubject)?.label;
      const prompt = `أريد اختباراً ذكياً وقوياً مكوناً من 5 أسئلة اختيار من متعدد للمرحلة الدراسية: ${stage}. 
      المادة المطلوبة هي: ${subjectLabel}.
      نظام الدراسة هو: ${language === 'languages' ? 'اللغات (Math/Science)' : 'العربي (رياضيات/علوم)'}.
      يجب أن تكون الأسئلة باللغة ${language === 'languages' ? 'الإنجليزية لمواد الـ Math و Science والعربية لبقية المواد' : 'العربية لجميع المواد'}.
      يجب أن تكون الأسئلة من صميم المناهج المصرية الحالية لهذه المادة بالتحديد.
      لكل سؤال قدم تلميحاً (Hint) يساعد الطالب.
      أريد النتيجة بتنسيق JSON حصرياً بالمواصفات التالية:
      [ { "question": "نص السؤال", "options": ["اختار 1", "اختار 2", "اختار 3", "اختار 4"], "correctAnswer": index_of_correct_option, "hint": "نص التلميح" } ]`;

      const response = await askAI(prompt, []); // Using askAI helper
      // Try to parse JSON from AI response
      const match = response.match(/\[.*\]/s);
      if (match) {
        const data = JSON.parse(match[0]);
        setQuestions(data.map((q: any, i: number) => ({ ...q, id: i.toString() })));
      } else {
        throw new Error('Invalid format');
      }
    } catch (err) {
      console.error(err);
      alert('عذراً، فشل توليد الأسئلة. حاول مرة أخرى!');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === questions[currentIdx].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedAnswer(null);
      setShowHint(false);
    } else {
      const finalScore = selectedAnswer === questions[currentIdx].correctAnswer ? score + 1 : score;
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      saveResult(finalScore, questions.length, timeTaken);
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 text-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center mb-8 relative"
        >
          <div className="absolute inset-0 bg-cyan-500/10 blur-3xl animate-pulse"></div>
          <BrainCircuit size={60} className="text-[#00D1FF]" />
        </motion.div>
        <h2 className="text-2xl font-black text-white mb-4">ذاكرلي بيجهزلك امتحان جبار...</h2>
        <p className="text-gray-500 font-bold max-w-sm">جاري تحليل المنهج الخاص بمرحلتك: {stage}</p>
        <Loader2 className="mt-8 animate-spin text-cyan-400" size={32} />
      </div>
    );
  }

  if (showResult) {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-10 text-[#00D1FF]">
           <Trophy size={100} />
        </motion.div>
        <h2 className="text-4xl font-black text-white mb-4">عاش يا بطل! 🏆</h2>
        <div className="text-6xl font-black text-cyan-400 mb-8">{score} / {questions.length}</div>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-10">
           <div className="bg-gray-900/60 p-6 rounded-3xl border border-gray-800">
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">الوقت المستغرق</p>
              <p className="text-white text-xl font-bold">{timeTaken} ثانية</p>
           </div>
           <div className="bg-gray-900/60 p-6 rounded-3xl border border-gray-800">
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">التقييم العام</p>
              <p className="text-white text-xl font-bold">
                {score === questions.length ? 'أسطوري!' : score >= questions.length / 2 ? 'ممتاز' : 'محتاج تركز أكتر'}
              </p>
           </div>
        </div>

        <button 
          onClick={startExam}
          className="bg-[#00D1FF] text-black px-12 py-4 rounded-2xl font-black shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all"
        >
          جرب امتحان جديد
        </button>
      </div>
    );
  }

  if (questions.length > 0) {
    const q = questions[currentIdx];
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(0,209,255,0.4)]"
          />
        </div>

        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center text-cyan-400 font-black">
                {currentIdx + 1}
              </div>
              <div>
                <h3 className="text-white font-black text-lg">سؤال رقم {currentIdx + 1}</h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">المرحلة: {stage}</p>
              </div>
           </div>
           <div className="flex items-center gap-3 px-4 py-2 bg-gray-900 border border-gray-800 rounded-2xl text-[#00D1FF] font-black text-sm">
              <Target size={18} /> {score} النقاط
           </div>
        </div>

        {/* Question Panel */}
        <section className="bg-[#0C0D11] border border-gray-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 p-10 opacity-5">
             <BrainCircuit size={160} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white leading-relaxed mb-10 relative z-10 text-right">
            {q.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
             {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`p-6 rounded-3xl border text-right transition-all font-bold text-lg flex items-center justify-between ${
                    selectedAnswer === i 
                      ? i === q.correctAnswer 
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-white' 
                        : 'bg-rose-500/20 border-rose-500/50 text-white'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedAnswer !== null && i === q.correctAnswer && <CheckCircle2 className="text-emerald-500" size={24} />}
                  {selectedAnswer === i && i !== q.correctAnswer && <XCircle className="text-rose-500" size={24} />}
                </button>
             ))}
          </div>
        </section>

        {/* Hint & Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
           <button 
             onClick={() => setShowHint(true)}
             disabled={showHint || selectedAnswer !== null}
             className={`flex-1 p-6 rounded-3xl border flex items-center gap-4 transition-all ${
               showHint 
                 ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
                 : 'bg-gray-900/40 border-gray-800 text-gray-500 hover:text-amber-400'
             }`}
           >
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                 <HelpCircle size={20} />
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">محتاج مساعدة؟</p>
                 <p className="font-bold text-sm">{showHint ? q.hint : 'اضغط لإظهار تلميح ذكي'}</p>
              </div>
           </button>

           <button 
             onClick={nextQuestion}
             disabled={selectedAnswer === null}
             className="px-10 py-6 bg-white text-black rounded-3xl font-black flex items-center gap-3 hover:scale-105 transition-all disabled:opacity-20 disabled:grayscale"
           >
              {currentIdx === questions.length - 1 ? 'إنهاء الامتحان' : 'السؤال التالي'}
              <ChevronLeft size={20} />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[400px] py-20 flex flex-col items-center justify-center p-10 text-center">
      <div className="w-24 h-24 bg-[#0C0D11] border border-gray-800 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl relative">
         <div className="absolute inset-0 bg-cyan-500/10 blur-2xl"></div>
         <Trophy size={48} className="text-[#00D1FF]" />
      </div>
      <h1 className="text-4xl font-black text-white mb-6">جاهز لاختبار معلوماتك؟</h1>
      <p className="text-gray-400 font-medium max-w-md mb-10 leading-relaxed text-lg">
        اختار المادة اللي حابب تختبر نفسك فيها في مرحلة <span className="text-cyan-400 font-black">{stage}</span>. هنولدلك امتحان ذكي مخصص ليك!
      </p>

      {/* Subject Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12 w-full max-w-4xl px-4">
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubject(sub.id)}
            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 group relative overflow-hidden ${
              selectedSubject === sub.id 
                ? 'bg-[#00D1FF]/10 border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.2)]' 
                : 'bg-bg-panel border-border-main hover:border-gray-700'
            }`}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{sub.icon}</span>
            <span className={`text-[11px] font-black uppercase tracking-tight ${selectedSubject === sub.id ? 'text-white' : 'text-text-sub'}`}>
              {sub.label}
            </span>
            {selectedSubject === sub.id && (
              <motion.div layoutId="selection-ring" className="absolute inset-0 border-2 border-[#00D1FF] rounded-[2rem]"></motion.div>
            )}
          </button>
        ))}
      </div>

      <button 
        onClick={startExam}
        disabled={!selectedSubject}
        className="bg-[#00D1FF] text-black px-12 py-5 rounded-2xl font-black text-xl shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-4 disabled:opacity-20 disabled:grayscale disabled:scale-95"
      >
        <Sparkles size={24} />
        توليد امتحان {selectedSubject ? subjects.find(s => s.id === selectedSubject)?.label : ''}
      </button>

      {/* Stats History */}
      <div className="mt-20 w-full max-w-2xl px-6">
        <h3 className="text-text-sub font-black text-[10px] uppercase tracking-[0.2em] mb-6 text-center">سجل الاختبارات السابقة</h3>
        <div className="space-y-3">
          {(() => {
            const results = JSON.parse(localStorage.getItem('zakirly_exam_results') || '[]');
            if (results.length === 0) return <p className="text-text-sub font-medium opacity-40">لا توجد اختبارات مسجلة بعد</p>;
            return results.slice(-5).reverse().map((res: any, i: number) => (
              <div key={res.id} className="bg-bg-panel/40 border border-border-main p-4 rounded-2xl flex items-center justify-between transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${res.score >= res.total / 2 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                    {res.score}/{res.total}
                  </div>
                  <div className="text-right">
                    <p className="text-text-main font-bold text-sm">اختبار {res.subject || res.stage}</p>
                    <p className="text-[10px] text-text-sub">{new Date(res.date).toLocaleDateString()} - {res.time}ث</p>
                  </div>
                </div>
                {res.score === res.total && <Sparkles className="text-amber-400" size={18} />}
              </div>
            ));
          })()}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-40">
         <div className="flex items-center gap-2"><Timer size={16} /> سرعة بديهة</div>
         <div className="flex items-center gap-2"><Target size={16} /> منهج مصري أصيل</div>
         <div className="flex items-center gap-2"><AlertCircle size={16} /> مراجعة ذكية</div>
      </div>
    </div>
  );
}
