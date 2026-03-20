import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Shield, Target, ArrowRight, Brain, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-brand/30">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-screen -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-brand/10 blur-[150px] rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-400/5 blur-[180px] rounded-full"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-50 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 bg-brand rounded-2xl flex items-center justify-center shadow-lg neon-glow rotate-2 transition-transform hover:rotate-6">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">FoundersFuel</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-brand transition-colors">Lab</a>
            <a href="#" className="hover:text-brand transition-colors">Nodes</a>
            <a href="#" className="hover:text-brand transition-colors">Manifesto</a>
          </div>
          <Link to="/chat" className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 glass-morphism">
            Authenticate
          </Link>
        </motion.div>
      </nav>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-48 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-black uppercase tracking-widest text-brand mb-10 neon-glow"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Foundry Engine v4.2 Active</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] text-white"
          >
            Fueling the <br/>
            <span className="gradient-text italic">Next Exit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-xl mx-auto text-lg text-zinc-400 mb-14 leading-relaxed font-medium"
          >
            Not another assistant. FoundersFuel is a specialized high-frequecy mentor 
            designed to simulate real market pressure, stress-test your GTM, and 
            refine your vision into a venture-worthy asset.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/chat" className="group relative px-10 py-5 bg-brand text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl neon-glow transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
              <span className="relative z-10 flex items-center gap-3">
                Begin Simulation <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <button className="px-10 py-5 bg-zinc-900 border border-white/5 text-zinc-100 font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 glass-morphism">
              Explore Nodes
            </button>
          </motion.div>
        </div>

        {/* Floating Icons for depth */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 w-full h-full pointer-events-none hidden lg:block">
           <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-10 top-0 p-8 glass-morphism rounded-3xl border border-brand/20 shadow-2xl">
              <Brain className="w-8 h-8 text-brand" />
           </motion.div>
           <motion.div animate={{ y: [0, 40, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute -right-10 top-20 p-8 glass-morphism rounded-3xl border-indigo-500/20 shadow-2xl">
              <Globe className="w-8 h-8 text-indigo-400" />
           </motion.div>
        </div>
      </main>

      {/* Footer / Stats */}
      <footer className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
         {[
           { label: 'Latency', val: '12ms', desc: 'Real-time strategic response' },
           { label: 'Validation', val: '98.4%', desc: 'Market synthesis accuracy' },
           { label: 'Exits', val: '$2.4B', desc: 'Combined mentored valuation' }
         ].map((s, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className="text-center md:text-left"
           >
              <h4 className="text-[10px] uppercase tracking-widest font-black text-zinc-500 mb-2">{s.label}</h4>
              <p className="text-3xl font-black text-white mb-1 uppercase tracking-tighter">{s.val}</p>
              <p className="text-xs text-zinc-600 font-medium">{s.desc}</p>
           </motion.div>
         ))}
      </footer>
    </div>
  );
};

const ChevronRight = ({ className }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;

export default LandingPage;
