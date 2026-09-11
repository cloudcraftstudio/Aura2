import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Heart, BookOpen, Music, Users, ArrowLeft, Pencil } from 'lucide-react';
import { BiblicalPrinciples } from './BiblicalPrinciples';
import { RecoveryAudioFeed } from './RecoveryAudioFeed';
import { RecoveryJournal } from './RecoveryJournal';
import { MeetingCountdownTimer } from './MeetingCountdownTimer';
import { RecoveryMeetingRoom } from './RecoveryMeetingRoom';
import { RecoveryMeeting } from '../../types/recovery';
import { useAuth } from '../../context/AuthContext';

export const RecoveryDashboard: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'principles' | 'audio' | 'journal' | 'meetings'>(() => {
    try {
      const saved = localStorage.getItem('aura_recovery_tab');
      return (saved as any) || 'principles';
    } catch {
      return 'principles';
    }
  });

  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDate, setTempDate] = useState('');
  
  // Calculate days clean
  const getDaysClean = () => {
    let dateStr = user?.cleanDate;
    if (!dateStr) {
      dateStr = localStorage.getItem('aura_clean_date') || undefined;
    }
    
    if (!dateStr) {
      // Fallback to legacy journal streak if no date set
      try {
        const journal = JSON.parse(localStorage.getItem('aura_recovery_journal') || '[]');
        if (journal.length > 0) return journal[0].streakDay;
      } catch {}
      return 0;
    }
    
    const cleanDate = new Date(dateStr);
    const today = new Date();
    // Reset times to midnight for accurate day calculation
    cleanDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(today.getTime() - cleanDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMilestoneChip = (days: number) => {
    if (days >= 365 * 2) return { name: `${Math.floor(days/365)} Years`, color: 'bg-yellow-700', text: 'text-yellow-100', border: 'border-yellow-600' };
    if (days >= 365) return { name: '1 Year', color: 'bg-yellow-600', text: 'text-black', border: 'border-yellow-400' };
    if (days >= 270) return { name: '9 Months', color: 'bg-purple-600', text: 'text-white', border: 'border-purple-400' };
    if (days >= 180) return { name: '6 Months', color: 'bg-blue-600', text: 'text-white', border: 'border-blue-400' };
    if (days >= 90) return { name: '90 Days', color: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-400' };
    if (days >= 60) return { name: '60 Days', color: 'bg-amber-500', text: 'text-black', border: 'border-amber-300' };
    if (days >= 30) return { name: '30 Days', color: 'bg-red-600', text: 'text-white', border: 'border-red-400' };
    if (days > 0) return { name: '24 Hours', color: 'bg-slate-200', text: 'text-black', border: 'border-white' };
    return { name: 'Just for Today', color: 'bg-slate-800', text: 'text-white', border: 'border-slate-600' };
  };

  const handleSaveDate = async () => {
    if (tempDate) {
      if (user) {
        await updateProfile({ cleanDate: tempDate });
      }
      localStorage.setItem('aura_clean_date', tempDate);
    }
    setIsEditingDate(false);
  };

  useEffect(() => {
    try {
      localStorage.setItem('aura_recovery_tab', activeTab);
    } catch {}
  }, [activeTab]);

  const [meetings, setMeetings] = useState<RecoveryMeeting[]>([]);
  const [activeMeeting, setActiveMeeting] = useState<RecoveryMeeting | null>(null);

  useEffect(() => {
    // Fetch upcoming and live meetings
    fetch('/api/recovery/meetings')
      .then(res => res.json())
      .then(data => {
        if (data.meetings) {
          setMeetings(data.meetings);
        }
      })
      .catch(console.error);
  }, []);

  const handleJoinMeeting = (meeting: RecoveryMeeting) => {
    setActiveMeeting(meeting);
  };

  const handleLeaveMeeting = () => {
    setActiveMeeting(null);
  };

  const handleMeetingStatusChange = (status: 'scheduled' | 'live' | 'completed') => {
    if (activeMeeting) {
      setMeetings(prev => prev.map(m => m.id === activeMeeting.id ? { ...m, status } : m));
    }
  };

  const toggleMeetingStatus = (meetingId: string, status: 'scheduled' | 'live' | 'completed') => {
    fetch(`/api/recovery/meetings/${meetingId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(() => {
      setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, status } : m));
    }).catch(console.error);
  };

  // If inside a live meeting room, render it in full screen mode
  if (activeMeeting) {
    return (
      <RecoveryMeetingRoom
        meeting={activeMeeting}
        onLeave={handleLeaveMeeting}
        onMeetingStatusChange={handleMeetingStatusChange}
      />
    );
  }

  const daysClean = getDaysClean();
  const chip = getMilestoneChip(daysClean);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500 pb-24">

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Shield className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Path to Freedom
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Christ-centered deliverance and recovery. Journey through biblical principles, fellowship in live rooms, listen to teachings, and track your victorious walk in the Spirit.
          </p>
        </div>

        {/* Dynamic Streak Widget */}
        <div className="flex flex-col gap-2 shrink-0">
          {isEditingDate ? (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/10 border border-amber-500/50">
              <input 
                type="date" 
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="bg-black/50 border border-white/20 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:border-amber-500"
              />
              <button 
                onClick={handleSaveDate}
                className="px-3 py-1 bg-amber-500 text-black font-bold text-sm rounded-lg hover:bg-amber-400"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <button 
                onClick={() => {
                  const savedDate = user?.cleanDate || localStorage.getItem('aura_clean_date') || new Date().toISOString().split('T')[0];
                  setTempDate(savedDate);
                  setIsEditingDate(true);
                }}
                className="text-left flex items-center gap-3 p-3 pr-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shrink-0 relative group w-full sm:w-auto"
              >
                <div className="absolute top-3 right-3">
                  <Pencil className="w-4 h-4 text-slate-400 opacity-60" />
                </div>
                <div className={`w-14 h-14 rounded-full ${chip.color} border-4 ${chip.border} flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0`}>
                  <span className={`text-xl font-black ${chip.text}`}>
                    {daysClean}
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-white uppercase tracking-wider">Days Clean</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${chip.color} ${chip.text} border border-white/20`}>
                      {chip.name}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>


      {/* Main Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <button
          onClick={() => setActiveTab('principles')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold whitespace-nowrap transition-all shadow-sm ${
            activeTab === 'principles'
              ? 'bg-amber-600 text-white shadow-amber-500/30'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Biblical Principles
        </button>

        <button
          onClick={() => setActiveTab('journal')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold whitespace-nowrap transition-all shadow-sm ${
            activeTab === 'journal'
              ? 'bg-emerald-600 text-white shadow-emerald-500/30'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          <Heart className="w-4 h-4" />
          Victory Journal
        </button>

        <button
          onClick={() => setActiveTab('audio')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold whitespace-nowrap transition-all shadow-sm ${
            activeTab === 'audio'
              ? 'bg-yellow-600 text-white shadow-yellow-500/30'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          <Music className="w-4 h-4" />
          Audio Teachings
        </button>

        <button
          onClick={() => setActiveTab('meetings')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold whitespace-nowrap transition-all shadow-sm ${
            activeTab === 'meetings'
              ? 'bg-amber-600 text-white shadow-amber-500/30'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          <Users className="w-4 h-4" />
          Live Meetings
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeTab === 'principles' && <BiblicalPrinciples />}
        {activeTab === 'journal' && <RecoveryJournal />}
        {activeTab === 'audio' && <RecoveryAudioFeed />}
        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <div className="mb-6 p-6 rounded-3xl bg-amber-950/20 border border-amber-500/30">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                Live Fellowship Rooms
              </h2>
              <p className="text-sm text-slate-400">
                Join scheduled and live recovery meetings. Share anonymously, pray together, and find support in a Christ-centered community.
              </p>
            </div>
            
            {meetings.length === 0 ? (
              <div className="text-center p-12 rounded-3xl bg-white/5 border border-white/10">
                <Shield className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white">No Scheduled Meetings</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Check back later for upcoming fellowship rooms.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {meetings.filter(m => m.status !== 'completed').map(meeting => (
                  <MeetingCountdownTimer
                    key={meeting.id}
                    meeting={meeting}
                    onJoinMeeting={handleJoinMeeting}
                    onToggleStatus={toggleMeetingStatus}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
