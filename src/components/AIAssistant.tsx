import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Trash2, BrainCircuit, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { askAI } from '../lib/gemini';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function AIAssistant({ stage, language }: { stage: string, language: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: `أهلاً بك يا بطل! أنا ذاكرلي AI، مساعدك الدراسي الذكي. أنا متدرب على المناهج المصرية كلها (${language === 'languages' ? 'نظام اللغات' : 'النظام العربي'}) وخاصة مرحلتك: ${stage}. كيف يمكنني مساعدتك اليوم؟`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const response = await askAI(input, history, stage, language);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: response || 'عذراً، لم أستطع فهم ذلك.',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const clearChat = () => {
    if (confirm('هل تريد مسح المحادثة؟')) {
      setMessages([{
        id: '1',
        role: 'bot',
        content: 'تم مسح المحادثة. أنا هنا لأي أسئلة جديدة!',
        timestamp: new Date()
      }]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-bg-panel rounded-[2rem] border border-border-main shadow-2xl overflow-hidden transition-colors">
      {/* Header */}
      <header className="px-6 py-5 border-b border-border-main flex items-center justify-between bg-bg-base/30 backdrop-blur-md transition-colors">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-bg-base border border-border-main rounded-2xl text-[#00D1FF] transition-colors">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h3 className="font-black font-display text-text-main tracking-widest uppercase text-sm">المعلم الذكي</h3>
            <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1.5 uppercase tracking-tighter">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
              Online & Ready
            </span>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2.5 text-text-sub hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
          title="مسح المحادثة"
        >
          <Trash2 size={20} />
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-bg-base/20 to-transparent no-scrollbar transition-colors">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
                  message.role === 'user' ? 'bg-[#00D1FF] text-black' : 'bg-bg-base text-[#00D1FF] border border-border-main'
                }`}>
                  {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`p-4 rounded-[1.5rem] shadow-xl ${
                  message.role === 'user' 
                    ? 'bg-bg-base border border-border-main text-text-main rounded-tr-none' 
                    : 'bg-cyan-500/10 border border-cyan-500/20 text-text-main rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {message.content}
                  </p>
                  <span className={`text-[9px] mt-3 block font-bold uppercase tracking-widest opacity-40 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="flex gap-4 items-center">
               <div className="shrink-0 w-10 h-10 bg-bg-base border border-border-main rounded-2xl flex items-center justify-center text-[#00D1FF]">
                 <Bot size={20} />
               </div>
               <div className="bg-bg-panel/50 backdrop-blur-sm px-5 py-3.5 rounded-[1.5rem] border border-border-main flex items-center gap-3 transition-colors">
                 <Loader2 size={16} className="animate-spin text-cyan-400" />
                 <span className="text-[11px] text-text-sub font-black uppercase tracking-widest">ذاكرلي بيفكر جاري معالجة طلبك...</span>
               </div>
             </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <footer className="p-5 bg-bg-base/30 border-t border-border-main backdrop-blur-md transition-colors">
        <div className="max-w-4xl mx-auto flex gap-4 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل المعلم الذكي أي سؤال..."
            className="flex-1 bg-bg-base border border-border-main rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-500/50 text-text-main font-bold transition-all text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-4 bg-[#00D1FF] text-black rounded-2xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10 disabled:opacity-20 disabled:grayscale disabled:scale-95"
          >
            <Send size={24} className="rotate-180" />
          </button>
          
          <div className="absolute -top-14 left-0 flex gap-2 overflow-x-auto pb-3 no-scrollbar px-2 max-w-full">
            {[
              "شرح قاعدة Present Simple",
              "حل مسألة رياضية عن الكسور",
              "أسئلة للصف الثالث الإعدادي",
              "نصيحة لتنظيم الوقت"
            ].map((hint, i) => (
              <button 
                key={i} 
                onClick={() => setInput(hint)}
                className="whitespace-nowrap px-4 py-2 bg-bg-base border border-border-main rounded-xl text-[10px] font-black text-text-sub hover:text-[#00D1FF] hover:border-cyan-500/50 transition-all uppercase tracking-widest"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
