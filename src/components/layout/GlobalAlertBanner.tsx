import React, { useState, useEffect } from 'react';
import { Sparkles, Megaphone, Heart, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getCurrentDevotional } from '../../content/devotionals';

export const GlobalAlertBanner: React.FC = () => {
  const [devotional, setDevotional] = useState<any>(null);
  
  const navigateTo = (tab: string, subtab?: string) => {
    window.dispatchEvent(new CustomEvent('navigate_tab', { detail: { tab, subtab } }));
  };

  useEffect(() => {
    const dev = getCurrentDevotional();
    setDevotional(dev);
  }, []);

  // Determine which verse to show based on time of day
  const getVerseOfTheDay = () => {
    if (!devotional) return null;
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return {
        label: "Morning Manna",
        ref: devotional.morning.reference,
        text: devotional.morning.text,
        subtab: 'morning'
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        label: "Midday Scripture",
        ref: devotional.midday.reference,
        text: devotional.midday.text,
        subtab: 'midday'
      };
    } else {
      return {
        label: "Evening Watch",
        ref: devotional.evening.reference,
        text: devotional.evening.text,
        subtab: 'evening'
      };
    }
  };

  const currentVerse = getVerseOfTheDay();

  // Rotating idle alerts
  const idleAlerts = [
    ...(currentVerse ? [{ 
      icon: <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />, 
      text: `${currentVerse.label} (${currentVerse.ref}): "${currentVerse.text}"`,
      action: () => navigateTo('devotional', currentVerse.subtab)
    }] : []),
    { 
      icon: <Megaphone className="w-5 h-5 text-amber-400 shrink-0" />, 
      text: "New Sermon Series Available! Watch the latest message in the Studio.",
      action: () => navigateTo('bible', 'pulpit')
    },
    { 
      icon: <Heart className="w-5 h-5 text-amber-400 shrink-0" />, 
      text: "Join the 'Walking in Faith' Group and connect with believers today.",
      action: () => navigateTo('recovery', 'groups')
    },
    { 
      icon: <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />, 
      text: "Course Alert: Foundations of Faith is now open. Start your journey!",
      action: () => navigateTo('bible', 'courses')
    }
  ];
  
  const [idleIndex, setIdleIndex] = useState(0);

  const nextAlert = () => {
    if (idleAlerts.length > 0) {
      setIdleIndex((prev) => (prev + 1) % idleAlerts.length);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-600/20 via-amber-500/20 to-amber-600/20 border-b border-amber-500/30 overflow-hidden relative z-50">
       <div className="absolute inset-0 bg-[#05060f]/80 backdrop-blur-md" />
       
       <div className="relative pt-[max(env(safe-area-inset-top),3.25rem)] sm:pt-[max(env(safe-area-inset-top),3.25rem)] pb-2 px-4 flex items-center justify-center min-h-[55px] overflow-hidden">
          {idleAlerts.length > 0 && (
            <div 
              className="absolute inset-0 pt-[max(env(safe-area-inset-top),3.25rem)] sm:pt-[max(env(safe-area-inset-top),3.25rem)] pb-2 flex items-center overflow-hidden cursor-pointer"
              onClick={idleAlerts[idleIndex].action}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={idleIndex}
                  initial={{ x: "100vw" }}
                  animate={{ x: "-100%" }}
                  transition={{ 
                    duration: 30, // Slower ticker speed for larger text
                    ease: "linear"
                  }}
                  onAnimationComplete={nextAlert}
                  className="flex items-center gap-3 whitespace-nowrap px-4 hover:opacity-80 transition-opacity"
                >
                  {idleAlerts[idleIndex].icon}
                  <span className="text-base sm:text-lg font-bold text-amber-200 tracking-wide drop-shadow-md">
                    {idleAlerts[idleIndex].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
       </div>
    </div>
  );
};
