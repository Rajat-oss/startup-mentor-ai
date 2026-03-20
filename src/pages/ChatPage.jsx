import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Trash2, 
  PanelLeftClose, 
  PanelLeftOpen,
  Zap,
  Layout,
  Target,
  Rocket,
  Search,
  Settings,
  MoreVertical,
  LogOut,
  ChevronRight,
  Sparkles,
  Command,
  Brain,
  History,
  Terminal,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activePersona, setActivePersona] = useState('Standard Mentor');
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Seed round pitch review', date: '2 hours ago' },
    { id: 2, title: 'Go-to-Market strategy', date: 'Yesterday' }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const personas = {
    'Standard Mentor': {
      icon: <Brain className="w-5 h-5 text-white" />,
      tagline: 'Strategic Simulation Active',
      color: 'bg-brand shadow-brand/40',
      border: 'border-brand/30',
      glow: 'neon-glow'
    },
    'Brutal Scrubber': {
      icon: <Terminal className="w-5 h-5 text-white" />,
      tagline: 'Stress-Testing Unit Economics',
      color: 'bg-orange-600 shadow-orange-600/40',
      border: 'border-orange-500/30',
      glow: 'shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)]'
    },
    'GTM Architect': {
      icon: <Cpu className="w-5 h-5 text-white" />,
      tagline: 'Growth Loop Synthesis',
      color: 'bg-blue-600 shadow-blue-600/40',
      border: 'border-blue-500/30',
      glow: 'shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]'
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsThinking(true);

    setTimeout(() => {
      const responses = {
        'Standard Mentor': `### Analysis: Market Readiness\n\nYour vision is compelling, but the **Value Proposition** needs more friction-testing. \n\n**Strategic Levers:**\n1. **User Retention**: How do you shift from "utility" to "daily habit"?\n2. **Distribution**: Is your CAC sustainable without venture subsidy?\n3. **Product-Market Fit**: Which specific 1% of users will pay for this *today*?\n\n*Ready to simulate your next 3 moves?*`,
        'Brutal Scrubber': `### Critical Logic Error Identified\n\nI've run the numbers. Your **TAM looks inflated** because you're including incumbents whose switching costs are 10x higher than your entry value. \n\n**Reality Check:**\n- Your unit economics fail if churn exceeds 4%.\n- Your "AI Moat" is currently just an API wrapper.\n\nTell me why you're not just building a feature for Google to ship in 6 months.`,
        'GTM Architect': `### Go-To-Market Blueprint v2\n\nWe need to deploy a **Inverted Funnel** approach. \n\n**The Stack:**\n1. **Beachhead**: Hyper-niche (e.g., solo-GP emerging funds).\n2. **Viral Loop**: Shared strategy dashboards with one-click export.\n3. **Retention**: Weekly "Engine Insights" delivered via encrypted digest.\n\n*Should I generate the tactical 90-day execution sprints?*`
      };

      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: responses[activePersona] || responses['Standard Mentor'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-heading selection:bg-brand/30">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-r border-white/5 bg-zinc-900/40 backdrop-blur-3xl flex flex-col h-full overflow-hidden"
          >
            <div className="p-6 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 font-black text-xs uppercase tracking-tighter italic">
                <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center shadow-lg neon-glow rotate-2">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                FoundersFuel
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-all">
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 mb-6">
              <button onClick={() => setMessages([])} className="w-full py-4 bg-brand/10 hover:bg-brand/20 border border-brand/20 rounded-2xl flex items-center justify-center gap-2 transition-all font-black text-[10px] uppercase tracking-widest text-brand active:scale-95 group neon-glow">
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                New Simulation
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 space-y-3 custom-scrollbar">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-1 mb-4">Historical Nodes</p>
              {conversations.map(conv => (
                <div 
                   key={conv.id} 
                   className="group relative p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/5 flex items-start gap-3"
                >
                  <History className="w-4 h-4 text-zinc-700 shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-300 truncate group-hover:text-white transition-colors uppercase tracking-tight">{conv.title}</p>
                    <p className="text-[10px] text-zinc-700 font-bold mt-1 tracking-wider uppercase">{conv.date}</p>
                  </div>
                  <button className="p-1 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/5 bg-zinc-950/40">
               <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand via-brand-light to-brand flex items-center justify-center font-black text-white shadow-xl italic rotate-3">FD</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-white uppercase tracking-tight">Founder Mode</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Authenticated</p>
                  </div>
                  <Settings className="w-4 h-4 text-zinc-700" />
               </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-zinc-950">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-950/20 backdrop-blur-md z-40">
          <div className="flex items-center gap-6">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500">
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-4">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-2xl ${personas[activePersona].color} ${personas[activePersona].glow}`}>
                 {personas[activePersona].icon}
               </div>
               <div>
                  <h2 className="text-xs font-black flex items-center gap-3 uppercase tracking-widest">
                    {activePersona}
                    <span className="text-[9px] bg-brand text-white px-2 py-0.5 rounded-full font-black animate-pulse">Live</span>
                  </h2>
                  <p className="text-[11px] text-zinc-500 font-medium tracking-tight mt-1">{personas[activePersona].tagline}</p>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1.5 bg-zinc-900/50 border border-white/5 rounded-2xl glass-morphism">
             {Object.keys(personas).map(p => (
               <button 
                 key={p}
                 onClick={() => setActivePersona(p)}
                 className={`px-4 py-2 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all ${activePersona === p ? 'bg-zinc-800 text-white shadow-xl shadow-black/40 border-t border-white/10' : 'text-zinc-600 hover:text-zinc-400 hover:bg-white/5'}`}
               >
                 {p}
               </button>
             ))}
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12 scroll-smooth custom-scrollbar relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/5 blur-[150px] -z-10 rounded-full"></div>
          
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 bg-brand/5 rounded-[2.5rem] flex items-center justify-center mb-10 border border-brand/10 shadow-3xl neon-glow rotate-12 transition-transform hover:rotate-0 duration-500"
              >
                <Zap className="w-12 h-12 text-brand" />
              </motion.div>
              <h3 className="text-5xl font-black italic tracking-tighter mb-6 text-white leading-none">Initialize <br/> Market Simulation?</h3>
              <p className="text-lg text-zinc-500 mb-14 font-medium max-w-lg mx-auto">FoundersFuel nodes are warmed up. Input your vision for a deep-synthesis critique.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {[
                  { q: "Stress-test my B2B SaaS pricing", color: "border-brand/20 hover:border-brand/50 bg-brand/5" },
                  { q: "Analyze Series A signals in this deck", color: "border-blue-500/20 hover:border-blue-500/50 bg-blue-500/5" },
                  { q: "Critique my viral growth mechanism", color: "border-orange-500/20 hover:border-orange-500/50 bg-orange-500/5" },
                  { q: "Draft a GTM for niche designers", color: "border-zinc-800 hover:border-zinc-500 bg-zinc-900/50" }
                ].map((s, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setInputValue(s.q); handleSendMessage(); }}
                    className={`p-6 text-left glass-morphism rounded-3xl border ${s.color} transition-all hover:scale-[1.02] active:scale-95 text-[11px] font-black uppercase tracking-widest text-zinc-300`}
                  >
                    "{s.q}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto w-full space-y-12 pb-10">
              {messages.map((msg, idx) => (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.98, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   key={msg.id} 
                   className={`flex gap-8 ${msg.role === 'user' ? 'justify-end pl-24' : 'pr-24'}`}
                >
                  {msg.role === 'ai' && (
                    <div className={`w-12 h-12 shrink-0 rounded-[1.2rem] flex items-center justify-center shadow-xl ${personas[activePersona].color} ${personas[activePersona].glow} relative z-10`}>
                      {personas[activePersona].icon}
                    </div>
                  )}
                  <div className={`space-y-3 max-w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-7 rounded-[2rem] border transition-all ${msg.role === 'user' ? 'bg-brand text-white border-transparent shadow-2xl rounded-tr-none neon-glow' : 'bg-zinc-900/60 backdrop-blur-3xl border-white/10 rounded-tl-none shadow-3xl'}`}>
                      <div className="markdown-content text-[16px] leading-relaxed">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                    <p className={`text-[9px] font-black text-zinc-700 uppercase tracking-widest ${msg.role === 'user' ? 'text-right mr-4' : 'ml-4'}`}>{msg.timestamp} / Simulation Cycle 01</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-12 h-12 shrink-0 rounded-[1.2rem] bg-zinc-800 flex items-center justify-center font-black text-xs text-zinc-400 border border-white/5 rotate-3 shadow-xl">UD</div>
                  )}
                </motion.div>
              ))}
              
              {isThinking && (
                <div className="flex gap-8 pr-24">
                  <div className={`w-12 h-12 shrink-0 rounded-[1.2rem] flex items-center justify-center animate-pulse ${personas[activePersona].color} ${personas[activePersona].glow}`}>
                    {personas[activePersona].icon}
                  </div>
                  <div className="p-7 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] rounded-tl-none shadow-2xl">
                     <div className="flex gap-2">
                       <div className="w-2 h-2 bg-brand rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_10px_rgba(var(--brand),0.5)]"></div>
                       <div className="w-2 h-2 bg-brand rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_10px_rgba(var(--brand),0.5)]"></div>
                       <div className="w-2 h-2 bg-brand rounded-full animate-bounce shadow-[0_0_10px_rgba(var(--brand),0.5)]"></div>
                     </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent relative z-50">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-[2px] bg-gradient-to-r from-brand via-transparent to-brand opacity-0 group-focus-within:opacity-40 blur-lg rounded-[2.5rem] transition-all duration-700"></div>
            <div className="relative glass-morphism rounded-[2.5rem] p-3 flex items-end gap-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all group-focus-within:border-brand/40 group-focus-within:bg-zinc-900/60 overflow-hidden">
              <button className="p-4 hover:bg-white/5 rounded-2xl text-zinc-600 transition-all active:scale-90">
                 <Command className="w-5 h-5" />
              </button>
              <textarea 
                rows="1"
                placeholder={`Ask ${activePersona}...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isThinking}
                className="flex-1 bg-transparent border-none focus:ring-0 text-[16px] leading-relaxed py-4 text-white placeholder-zinc-700 resize-none max-h-60 custom-scrollbar outline-none font-medium"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isThinking}
                className="p-4 bg-brand text-white rounded-[1.4rem] shadow-2xl transition-all hover:scale-105 active:scale-90 disabled:opacity-30 disabled:grayscale disabled:scale-100 neon-glow"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between px-6">
              <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.2em]">Matrix Output: 99.8% Synthesis</p>
              <div className="flex items-center gap-6 text-[9px] text-zinc-700 font-black tracking-widest uppercase">
                 <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-brand" /> Kernel Online</span>
                 <span>S + Enter for Line</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .markdown-content h3 { font-weight: 900; font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #fff; letter-spacing: -0.025em; font-style: italic; }
        .markdown-content p { margin-bottom: 1rem; color: rgba(255, 255, 255, 0.7); }
        .markdown-content strong { color: #fff; font-weight: 800; border-bottom: 2px solid oklch(0.65 0.25 285 / 0.3); }
        .markdown-content ul { list-style: square; margin-left: 1.5rem; margin-bottom: 1.25rem; color: oklch(0.65 0.25 285); }
        .markdown-content li { margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.7); }
        .markdown-content li::marker { color: oklch(0.65 0.25 285); }
        
        .shadow-3xl {
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.8), 0 0 1px 1px rgba(255,255,255,0.05);
        }
      `}} />
    </div>
  );
};

export default ChatPage;
