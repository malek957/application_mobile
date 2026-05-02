import React, { useState } from 'react';
import { Shield, Lock, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface OnboardingProps {
  onConsent: () => void;
}

export default function Onboarding({ onConsent }: OnboardingProps) {
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "Respect de la vie privée",
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      content: "Audience Engine mesure votre comportement, pas votre identité. Nous écoutons des modèles, pas des personnes.",
      details: [
        "Aucun nom, email ou numéro stocké",
        "Le son est transformé localement",
        "Suppression immédiate du son brut",
        "Anonymat mathématique garanti"
      ]
    },
    {
      title: "Transparence totale",
      icon: <Lock className="w-12 h-12 text-green-500" />,
      content: "Seules des empreintes numériques non réversibles de 32 octets sont envoyées à nos serveurs.",
      details: [
        "Pas de suivi GPS précis",
        "Pas de lecture de vos SMS ou appels",
        "Pas d'identifiant publicitaire (IDFA/AAID)",
        "Désactivation possible à tout moment"
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-zinc-950 text-white z-50 flex flex-col p-6 font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
        >
          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-2xl">
            {steps[step - 1].icon}
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight">
            {steps[step - 1].title}
          </h1>
          
          <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
            {steps[step - 1].content}
          </p>

          <ul className="space-y-4 text-left w-full max-w-xs">
            {steps[step - 1].details.map((detail, idx) => (
              <li key={idx} className="flex items-center space-x-3 text-sm text-zinc-300">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto space-y-4">
        <div className="flex justify-center space-x-2 pb-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                step === i + 1 ? "w-8 bg-blue-500" : "w-2 bg-zinc-700"
              )} 
            />
          ))}
        </div>
        
        <button
          onClick={() => {
            if (step < steps.length) setStep(step + 1);
            else onConsent();
          }}
          className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white font-semibold py-4 rounded-2xl shadow-lg shadow-blue-900/20"
        >
          {step === steps.length ? "Accepter et continuer" : "Suivant"}
        </button>
        
        <p className="text-xs text-zinc-500 text-center uppercase tracking-widest font-medium opacity-50">
          Inspiré du cahier des charges - Mai 2025
        </p>
      </div>
    </div>
  );
}
