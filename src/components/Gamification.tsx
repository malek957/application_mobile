import React, { useState } from 'react';
import { Trophy, Flame, Target, Star, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { GAMIFICATION_RULES } from '../constants';

interface GamificationProps {
  userPoints: number;
  streak: number;
}

export default function Gamification({ userPoints, streak }: GamificationProps) {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="space-y-6 pb-24">
      {/* HUD Bar */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 flex items-center space-x-4">
          <div className="bg-amber-500/10 p-3 rounded-2xl">
            <Star className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{userPoints.toLocaleString()}</div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Points Totaux</div>
          </div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 flex items-center space-x-4">
          <div className="bg-orange-500/10 p-3 rounded-2xl">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{streak} Jours</div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Streak Actif</div>
          </div>
        </div>
      </div>

      {/* Quests / Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white px-2">Défis en cours</h2>
        
        <div 
          onClick={() => setShowQuiz(true)}
          className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="relative z-10">
            <div className="bg-white/20 inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4 backdrop-blur-md">
              <Zap className="w-3 h-3 fill-current" />
              <span>En direct sur Nessma</span>
            </div>
            <h3 className="text-xl font-black text-white mb-2 leading-tight">Quiz Express:<br />Publicité Ooredoo</h3>
            <p className="text-indigo-100 text-sm mb-6 max-w-[200px]">Répondez en moins de 15 sec pour doubler vos points !</p>
            
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <span>Participer</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          
          <Target className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10 -rotate-12" />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 flex items-center justify-between group cursor-pointer active:bg-zinc-800 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="bg-zinc-800 p-3 rounded-2xl group-hover:bg-zinc-700 transition-colors">
              <Trophy className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Check-in Manuel</div>
              <div className="text-xs text-zinc-500">Confirmez votre présence (+50 pts)</div>
            </div>
          </div>
          <button className="bg-zinc-800 px-4 py-2 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-colors">
            Vérifier
          </button>
        </div>
      </div>

      {/* Rewards Preview */}
      <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6">
        <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">Prochains Paliers</h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-zinc-800 flex items-center justify-center bg-zinc-950 overflow-hidden">
                <div className="w-full h-1/2 bg-zinc-800 self-end" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-500">3/7</div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-white">Badge Bronze</span>
                <span className="text-xs font-mono text-blue-500">+200 pts</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[42%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal Overlay */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950 flex flex-col p-6 items-center justify-center text-center"
          >
            <div className="bg-indigo-600 w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-indigo-900 animate-pulse">
              <Zap className="w-12 h-12 text-white fill-current" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Quiz en Direct !</h2>
            <p className="text-zinc-400 mb-12 max-w-xs">Quel était le slogan à la fin du spot Ooredoo ?</p>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
              {["Le monde est à vous", "Connectez vos rêves", "Plus proche de vous"].map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => setShowQuiz(false)}
                  className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500 text-zinc-300 py-4 rounded-2xl font-bold transition-all active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowQuiz(false)}
              className="mt-8 text-zinc-600 font-bold uppercase tracking-widest text-xs"
            >
              Passer pour cette fois
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
