import React from 'react';
import { Home, Trophy, Settings, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

export type Tab = 'home' | 'rewards' | 'dashboard' | 'settings';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'home', icon: <Home className="w-6 h-6" />, label: 'Engine' },
    { id: 'rewards', icon: <Trophy className="w-6 h-6" />, label: 'Rewards' },
    { id: 'dashboard', icon: <BarChart3 className="w-6 h-6" />, label: 'Metrics' },
    { id: 'settings', icon: <Settings className="w-6 h-6" />, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 px-6 py-4 z-40">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={cn(
              "flex flex-col items-center space-y-1 transition-all duration-300",
              activeTab === tab.id ? "text-blue-500 scale-110" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {tab.icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
