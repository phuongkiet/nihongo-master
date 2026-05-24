import React, { useState, useEffect } from 'react';
import { kanjiData } from '../../data/kanjiData';
import type { KanjiItem } from '../../data/kanjiData';
import { RefreshCw, ChevronRight, BookOpen, Layers, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KanjiPracticeProps {
  onRecordActivity: (increment: number, affectStreak?: boolean) => void;
}

export const KanjiPractice: React.FC<KanjiPracticeProps> = ({ onRecordActivity }) => {
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'N5' | 'N4' | 'N3'>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Track cards in the active session (shuffled batch)
  const [sessionCards, setSessionCards] = useState<KanjiItem[]>([]);
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  // Initialize session whenever level changes
  useEffect(() => {
    startNewSession();
  }, [selectedLevel]);

  const startNewSession = () => {
    let filtered = kanjiData;
    if (selectedLevel !== 'All') {
      filtered = kanjiData.filter(k => k.level === selectedLevel);
    }

    // Shuffle the filtered cards
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    setSessionCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
    setMasteredIds(new Set());
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastered = () => {
    if (sessionCards.length === 0 || isSessionFinished) return;

    const currentCard = sessionCards[currentIndex];

    // Play confetti
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.75 }
    });

    // Record heatmap activity
    onRecordActivity(1, false);

    const newMastered = new Set(masteredIds);
    newMastered.add(currentCard.id);
    setMasteredIds(newMastered);

    nextCard();
  };

  const handleNeedReview = () => {
    if (sessionCards.length === 0 || isSessionFinished) return;

    // Push the current card to the end of the sessionCards array so it repeats
    setSessionCards(prev => {
      const updated = [...prev];
      const current = updated[currentIndex];
      // Only push back if it's not already at the end
      if (updated.length > 1) {
        updated.push(current);
      }
      return updated;
    });

    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);

    // Delay transition slightly to allow flip animation to reset
    setTimeout(() => {
      setSessionCards(prev => {
        if (currentIndex + 1 < prev.length) {
          setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
          // If we reached the end of the list, check if there are unmastered cards remaining
          setIsSessionFinished(true);
        }
        return prev;
      });
    }, 150);
  };

  const activeCard = sessionCards[currentIndex];
  const progressPercent = sessionCards.length > 0
    ? Math.round((masteredIds.size / sessionCards.length) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in font-sans">
      {/* CSS styling for 3D flip card effect */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .flip-transition {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Header section */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-black text-scholastic-navy flex items-center gap-2">
            <Layers className="w-5 h-5 text-scholastic-sakura" />
            Ôn Tập Hán Tự (Kanji Flashcards)
          </h3>
          <p className="text-xs text-slate-400 font-medium">Học Hán tự N5 - N3 với phương pháp lật thẻ thông minh và ví dụ trực quan.</p>
        </div>

        {/* Level Filters */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
          {(['All', 'N5', 'N4', 'N3'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${selectedLevel === lvl
                ? 'bg-white text-scholastic-navy shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              {lvl === 'All' ? 'Tất cả' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Session finished congratulations view */}
      {isSessionFinished ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border shadow-soft text-center space-y-6 animate-scale-in">
          <div className="w-16 h-16 bg-emerald-50 text-scholastic-matcha rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 fill-current" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xl font-bold text-scholastic-navy">Tuyệt vời! Hoàn thành mục tiêu! 🎉</h4>
            <p className="text-xs text-slate-400">Bạn đã ôn tập và thuộc tất cả các chữ Hán trong cấp độ này.</p>

            <div className="mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-xs mx-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Trình độ</span>
              <p className="text-lg font-black text-indigo-600">{selectedLevel === 'All' ? 'Tất cả N5 - N3' : selectedLevel}</p>
            </div>
          </div>

          <button
            onClick={startNewSession}
            className="px-6 py-3 w-full rounded-xl bg-scholastic-navy text-white text-xs font-bold shadow-md hover:bg-indigo-950 transition-all flex items-center justify-center gap-1.5 active:scale-95 animate-pulse"
          >
            <RefreshCw className="w-4 h-4" /> Luyện tập lượt mới
          </button>
        </div>
      ) : activeCard ? (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Progress Indicator */}
          <div className="bg-white rounded-2xl border shadow-soft px-5 py-3.5 space-y-2">
            <div className="flex justify-between items-center text-xs font-black text-slate-400">
              <span>TIẾN TRÌNH HỌC</span>
              <span className="text-indigo-600">{masteredIds.size} / {sessionCards.length} chữ</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 3D Flashcard Container */}
          <div
            onClick={handleFlip}
            className="w-full h-96 perspective-1000 cursor-pointer"
          >
            <div className={`w-full h-full preserve-3d flip-transition relative ${isFlipped ? 'rotate-y-180' : ''}`}>

              {/* FRONT OF THE CARD */}
              <div className="absolute inset-0 bg-white rounded-3xl border border-slate-150 shadow-soft p-8 flex flex-col justify-between backface-hidden">
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${activeCard.level === 'N5' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    activeCard.level === 'N4' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      'bg-purple-50 text-purple-700 border border-purple-100'
                    }`}>
                    {activeCard.level}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Mặt trước
                  </span>
                </div>

                <div className="text-center space-y-4 my-auto">
                  <h1 className="text-8xl font-black text-scholastic-navy select-none tracking-tight">{activeCard.kanji}</h1>
                  <div className="space-y-1">
                    <p className="text-lg font-black text-indigo-600 uppercase tracking-widest">{activeCard.hanViet}</p>
                    <p className="text-sm font-semibold text-slate-500">{activeCard.meaning}</p>
                  </div>
                </div>

                <div className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest animate-pulse flex items-center justify-center gap-1">
                  Nhấp vào thẻ để lật xem cách đọc <ChevronRight className="w-3 h-3" />
                </div>
              </div>

              {/* BACK OF THE CARD */}
              <div className="absolute inset-0 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-soft p-6 flex flex-col justify-between rotate-y-180 backface-hidden">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h2 className="text-2xl font-black text-scholastic-sakura select-none">{activeCard.kanji}</h2>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Mặt sau
                  </span>
                </div>

                {/* Readings & Examples Container */}
                <div className="flex-1 overflow-y-auto py-3 space-y-4 scrollbar-thin">

                  {/* Onyomi Section */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[18px] font-bold rounded">Âm On</span>
                      <span className="text-lg font-bold text-slate-200">{activeCard.onyomi.reading}</span>
                    </div>
                    {activeCard.onyomi.examples.length > 0 ? (
                      <ul className="space-y-1 pl-2 border-l border-indigo-500/20">
                        {activeCard.onyomi.examples.map((ex, i) => (
                          <li key={i} className="text-md text-slate-400 font-medium">
                            <strong className="text-white text-lg mr-1 font-sans">{ex.word}</strong>
                            <span className="text-indigo-300">({ex.reading})</span>: {ex.meaning}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-500 italic pl-2">N/A</p>
                    )}
                  </div>

                  {/* Kunyomi Section */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[18px] font-bold rounded">Âm Kun</span>
                      <span className="text-lg font-bold text-slate-200">{activeCard.kunyomi.reading}</span>
                    </div>
                    {activeCard.kunyomi.examples.length > 0 ? (
                      <ul className="space-y-1 pl-2 border-l border-amber-500/20">
                        {activeCard.kunyomi.examples.map((ex, i) => (
                          <li key={i} className="text-md text-slate-400 font-medium">
                            <strong className="text-white text-lg mr-1 font-sans">{ex.word}</strong>
                            <span className="text-amber-300">({ex.reading})</span>: {ex.meaning}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-500 italic pl-2">N/A</p>
                    )}
                  </div>
                </div>

                <div className="text-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  Nhấp vào thẻ để quay lại mặt trước
                </div>
              </div>

            </div>
          </div>

          {/* Action buttons (Need review / Mastered) */}
          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNeedReview();
              }}
              className="flex-1 py-3.5 rounded-2xl bg-white border border-red-200 text-red-500 text-xs font-extrabold shadow-sm hover:bg-red-50 transition-all flex items-center justify-center gap-1 active:scale-95"
            >
              Cần ôn lại
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMastered();
              }}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-500 text-white text-xs font-extrabold shadow-md hover:bg-emerald-600 transition-all flex items-center justify-center gap-1 active:scale-95"
            >
              Đã thuộc
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 font-medium">Không có dữ liệu chữ Hán.</div>
      )}
    </div>
  );
};
