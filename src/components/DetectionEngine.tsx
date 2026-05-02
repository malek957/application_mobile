import React, { useState, useEffect } from 'react';
import { Mic, Wifi, Smartphone, Zap, Clock, Activity, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SIGNALS_BASE, CHANNELS, SCORE_THRESHOLDS } from '../constants';
import { SignalType, DetectionResult } from '../types';

export default function DetectionEngine() {
  const [signals, setSignals] = useState(SIGNALS_BASE.map(s => ({ ...s, isActive: false })));
  const [currentDetection, setCurrentDetection] = useState<DetectionResult>({
    channelId: null,
    score: 0,
    status: 'NON_VIEWER',
    context: 'HOME'
  });

  // Simulation logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle random signals for simulation
      const newSignals = signals.map(s => {
        if (Math.random() > 0.7) return { ...s, isActive: !s.isActive };
        return s;
      });
      setSignals(newSignals);

      const totalScore = newSignals.reduce((acc, curr) => curr.isActive ? acc + curr.weight : acc, 0);
      
      let status: DetectionResult['status'] = 'NON_VIEWER';
      if (totalScore >= SCORE_THRESHOLDS.ENGAGED) status = 'ENGAGED';
      else if (totalScore >= SCORE_THRESHOLDS.CONFIRMED) status = 'CONFIRMED';
      else if (totalScore >= SCORE_THRESHOLDS.PROBABLE) status = 'PROBABLE';

      // Pick a random channel if score is high enough
      const pickedChannel = totalScore > 0.4 ? CHANNELS[Math.floor(Math.random() * 5)].id : null;

      setCurrentDetection({
        channelId: pickedChannel,
        score: Math.min(totalScore, 1.0),
        status,
        context: 'HOME'
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [signals]);

  const getStatusColor = (status: DetectionResult['status']) => {
    switch (status) {
      case 'ENGAGED': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'CONFIRMED': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'PROBABLE': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const getSignalIcon = (id: SignalType) => {
    switch (id) {
      case SignalType.AUDIO_FINGERPRINT: return <Mic className="w-4 h-4" />;
      case SignalType.WIFI_HOUSE: return <Wifi className="w-4 h-4" />;
      case SignalType.PHONE_STABLE: return <Smartphone className="w-4 h-4" />;
      case SignalType.CHARGING: return <Zap className="w-4 h-4" />;
      case SignalType.PRIME_TIME: return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const activeChannel = CHANNELS.find(c => c.id === currentDetection.channelId);

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6 backdrop-blur-sm overflow-hidden relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-1">Status du moteur</h2>
            <div className={cn(
              "inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-bold transition-all duration-500",
              getStatusColor(currentDetection.status)
            )}>
              <span className="relative flex h-2 w-2">
                <span className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  currentDetection.status === 'NON_VIEWER' ? "bg-zinc-500" : "bg-current"
                )}></span>
                <span className={cn("relative inline-flex rounded-full h-2 w-2", currentDetection.status === 'NON_VIEWER' ? "bg-zinc-500" : "bg-current")}></span>
              </span>
              <span>{currentDetection.status.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-1">Score de fusion</h2>
            <div className="text-2xl font-mono font-bold text-white tracking-tight">
              {(currentDetection.score * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="relative h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeChannel ? (
              <motion.div
                key={activeChannel.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                  <div className="text-2xl font-black text-white">
                    {activeChannel.name[0]}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{activeChannel.name}</h3>
                <p className="text-sm text-zinc-500">Détecté en direct</p>
              </motion.div>
            ) : (
              <motion.div 
                key="scanning"
                className="text-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex space-x-1 justify-center">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [12, 28, 12] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1.5 bg-zinc-700 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-sm font-mono text-zinc-600 uppercase tracking-wider">Moteur en veille - Recherche de signaux</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Technical Data Stream */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {signals.slice(0, 4).map((signal) => (
            <div 
              key={signal.id} 
              className={cn(
                "p-3 rounded-xl border transition-all duration-300 flex items-center space-x-3",
                signal.isActive 
                  ? "bg-blue-500/5 border-blue-500/30 text-blue-400 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]" 
                  : "bg-zinc-900 border-zinc-800 text-zinc-600"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                signal.isActive ? "bg-blue-500/20" : "bg-zinc-800/50"
              )}>
                {getSignalIcon(signal.id)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase font-bold tracking-wider truncate">{signal.label}</div>
                <div className="text-[9px] opacity-60 font-mono">+{(signal.weight).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-4 flex items-start space-x-4">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-500/80 leading-relaxed font-sans">
          <strong>Note de confidentialité:</strong> Aucun audio brut n'est envoyé. 
          Mesure effectuée via empreinte locale mathématique non-réversible.
        </div>
      </div>
    </div>
  );
}
