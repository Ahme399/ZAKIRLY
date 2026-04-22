import { useState } from 'react';
import { BookOpen, Send, Trash2, User, Bot, Loader2, Sparkles, Plus, CheckCircle2, Circle, Clock, FileSpreadsheet, PlayCircle, ExternalLink, Tv, ArrowRight, Home, Menu, X, ChevronLeft, BrainCircuit, Calendar, CheckSquare, Notebook, Calculator as CalcIcon, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdvancedCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (n: string) => {
    if (display === '0') setDisplay(n);
    else setDisplay(display + n);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      // Basic parser for simple safety
      const finalEq = equation + display;
      // In a real app, use a math library instead of eval
      const result = eval(finalEq.replace('×', '*').replace('÷', '/'));
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleSci = (func: string) => {
    try {
      const val = parseFloat(display);
      let res = 0;
      switch (func) {
        case 'sin': res = Math.sin(val); break;
        case 'cos': res = Math.cos(val); break;
        case 'tan': res = Math.tan(val); break;
        case 'sqrt': res = Math.sqrt(val); break;
        case 'log': res = Math.log10(val); break;
        case 'ln': res = Math.log(val); break;
        case 'pow2': res = Math.pow(val, 2); break;
        case 'pow3': res = Math.pow(val, 3); break;
        case 'exp': res = Math.exp(val); break;
        case 'abs': res = Math.abs(val); break;
        case 'pi': res = Math.PI; break;
        case 'e': res = Math.E; break;
      }
      setDisplay(String(Number(res.toFixed(8))));
    } catch {
      setDisplay('Error');
    }
  };

  const keypad = [
    'C', 'DEL', '%', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '(', ')',
    '='
  ];

  const sciButtons = [
    { id: 'sin', label: 'sin' }, { id: 'cos', label: 'cos' }, { id: 'tan', label: 'tan' },
    { id: 'sqrt', label: '√' }, { id: 'log', label: 'log' }, { id: 'ln', label: 'ln' },
    { id: 'pow2', label: 'x²' }, { id: 'pow3', label: 'x³' }, { id: 'abs', label: '|x|' },
    { id: 'pi', label: 'π' }, { id: 'e', label: 'e' }, { id: 'exp', label: 'exp' }
  ];

  return (
    <div className="max-w-xl mx-auto h-full flex flex-col items-center justify-center py-6">
      <div className="w-full bg-bg-panel rounded-[3rem] p-8 md:p-10 border border-border-main shadow-2xl relative overflow-hidden group transition-colors">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D1FF]/5 blur-3xl rounded-full"></div>
        
        {/* Screen */}
        <div className="mb-8 bg-bg-base border border-border-main rounded-3xl p-6 text-left relative overflow-hidden shadow-inner group-hover:border-cyan-500/20 transition-colors">
          <p className="text-text-sub text-xs font-black h-4 uppercase tracking-[0.2em] mb-1">{equation}</p>
          <h2 className="text-4xl font-black text-text-main truncate font-mono tracking-tighter">
            {display}
          </h2>
        </div>

        {/* Scientific Row */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {sciButtons.map((s) => (
            <button 
              key={s.id} 
              onClick={() => handleSci(s.id)}
              className="p-3 bg-bg-base border border-border-main text-text-sub rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-[#00D1FF] hover:border-[#00D1FF]/30 transition-all shadow-sm"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Main Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {keypad.map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === 'C') { setDisplay('0'); setEquation(''); }
                else if (btn === 'DEL') setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
                else if (['+', '-', '×', '÷', '%'].includes(btn)) handleOperator(btn);
                else if (btn === '=') calculate();
                else handleNumber(btn);
              }}
              className={`p-5 rounded-2xl text-lg font-black transition-all active:scale-95 flex items-center justify-center ${
                btn === '=' 
                  ? 'col-span-2 bg-[#00D1FF] text-black shadow-lg shadow-cyan-500/20 hover:bg-cyan-400' 
                  : ['C', 'DEL', '%'].includes(btn)
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-sm'
                    : ['+', '-', '×', '÷'].includes(btn)
                      ? 'bg-bg-base border border-border-main text-[#00D1FF] hover:border-[#00D1FF]/40'
                      : 'bg-bg-base border border-border-main text-text-main hover:bg-bg-panel'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center gap-4 px-6 py-3 bg-[#0C0D11] border border-gray-800 rounded-2xl shadow-xl">
        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
          <BookOpen size={18} />
        </div>
        <p className="text-gray-400 text-xs font-bold leading-relaxed">
          <span className="text-[#00D1FF] font-black uppercase tracking-widest mr-2">Pro Tip:</span>
          استخدم الآلة الحاسبة لتبسيط مسائل الرياضيات وتأكد دائماً من خطواتك.
        </p>
      </div>
    </div>
  );
}
