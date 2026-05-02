/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import DetectionEngine from './components/DetectionEngine';
import Gamification from './components/Gamification';
import ClientDashboard from './components/ClientDashboard';
import Navigation, { Tab } from './components/Navigation';
import { User, ShieldCheck } from 'lucide-react';

export default function App() {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [userStats, setUserStats] = useState({ points: 1250, streak: 3 });

  useEffect(() => {
    const consent = localStorage.getItem('audience_engine_consent');
    setHasConsented(!!consent);
  }, []);

  const handleConsent = () => {
    localStorage.setItem('audience_engine_consent', 'true');
    setHasConsented(true);
  };

  if (hasConsented === null) return null;

  if (!hasConsented) {
    return <Onboarding onConsent={handleConsent} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col max-w-md mx-auto relative overflow-x-hidden">
      {/* Header */}
      <header className="px-6 py-8 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white leading-none">Audience Engine</h1>
            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mt-1">v1.0 Tunisia Hackathon</p>
          </div>
        </div>
        
        <button className="bg-zinc-900 w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800 text-zinc-400">
          <User className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-6 overflow-y-auto custom-scrollbar">
        {activeTab === 'home' && <DetectionEngine />}
        {activeTab === 'rewards' && <Gamification userPoints={userStats.points} streak={userStats.streak} />}
        {activeTab === 'dashboard' && <ClientDashboard />}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white px-2">Paramètres</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-white">Collecte de données</div>
                  <div className="text-xs text-zinc-500">Moteur de détection actif</div>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              
              <div className="h-px bg-zinc-800" />
              
              <button 
                onClick={() => {
                  localStorage.removeItem('audience_engine_consent');
                  window.location.reload();
                }}
                className="text-red-500 text-sm font-bold"
              >
                Réinitialiser le consentement et quitter
              </button>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">À propos de la sécurité</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Ce prototype implémente scrupuleusement les contraintes de privacy du cahier des charges : transformation locale du son, aucune donnée nominative envoyée au serveur, et suppression immédiate du buffer audio après extraction de l'empreinte de 32 octets.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Background Glows */}
      <div className="fixed top-0 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-40 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
