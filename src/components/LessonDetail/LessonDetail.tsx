import React, { useState, useEffect } from 'react';
import type { Lesson, UserProgress } from '../../types';
import { ChevronDown, ChevronUp, Check, AlertCircle, ArrowLeft, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonDetailProps {
  lesson: Lesson;
  progress: UserProgress;
  onBack: () => void;
  onMarkComplete: (lessonId: number) => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({
  lesson,
  progress,
  onBack,
  onMarkComplete
}) => {
  const [hideMeanings, setHideMeanings] = useState(false);
  const [revealedVocabs, setRevealedVocabs] = useState<Record<number, boolean>>({});
  const [vocabTyping, setVocabTyping] = useState<Record<number, string>>({});
  const [expandedGrammar, setExpandedGrammar] = useState<Record<string, boolean>>({});
  
  // Exercise states for grammar points
  const [grammarInputs, setGrammarInputs] = useState<Record<string, string>>({});
  const [grammarResults, setGrammarResults] = useState<Record<string, 'correct' | 'incorrect' | null>>({});

  // Scroll height calculation for progress bar
  const [scrollProgress, setScrollProgress] = useState(0);

  const isCompleted = progress.completedLessons.includes(lesson.id);

  // Monitor scrolling to update bottom bar progress
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(Math.min(scrolled, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleVocabReveal = (index: number) => {
    setRevealedVocabs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleVocabTypingChange = (index: number, val: string, correctKana: string, correctRomaji: string) => {
    setVocabTyping(prev => ({ ...prev, [index]: val }));
    
    // Automatically reveal if typed correctly
    const cleanVal = val.trim().toLowerCase();
    if (cleanVal === correctKana.toLowerCase() || cleanVal === correctRomaji.toLowerCase()) {
      setRevealedVocabs(prev => ({ ...prev, [index]: true }));
    }
  };

  const toggleGrammarExample = (id: string) => {
    setExpandedGrammar(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGrammarSubmit = (id: string, userAnswer: string, correctAnswer: string) => {
    const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    setGrammarResults(prev => ({ ...prev, [id]: isCorrect ? 'correct' : 'incorrect' }));
    
    if (isCorrect) {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.8 }
      });
    }
  };

  const handleComplete = () => {
    onMarkComplete(lesson.id);
    
    // Confetti celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Original background celebration flash from NihongoMaster.html
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#ecfdf5';
    setTimeout(() => {
      document.body.style.backgroundColor = originalBg;
    }, 1200);
  };

  return (
    <div className="max-w-[850px] mx-auto px-4 pb-32 animate-fade-in relative">
      
      {/* Navigation header */}
      <button 
        onClick={onBack}
        className="mb-6 px-4 py-2 rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800 transition-all active:scale-95 flex items-center gap-2 text-sm bg-white font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách
      </button>

      {/* Hero Header */}
      <header className="relative pt-6 pb-12 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs tracking-widest uppercase mb-4">
            Minna no Nihongo
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-scholastic-navy mb-3 font-extrabold tracking-tight">
            第 <span className="text-scholastic-sakura">{lesson.id.toString().padStart(2, '0')}</span> 課
          </h2>
          <h1 className="text-xl md:text-2xl font-bold text-slate-500 mb-6">
            {lesson.title.split(': ')[1] || lesson.title} <span className="block text-sm font-medium text-slate-400 mt-1">({lesson.titleVn})</span>
          </h1>
          <div className="flex justify-center gap-4">
            <a href="#vocabulary" className="px-5 py-2 rounded-xl bg-scholastic-navy text-white text-sm font-bold hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              Từ vựng
            </a>
            <a href="#grammar" className="px-5 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-bold hover:bg-slate-50 hover:border-scholastic-navy hover:text-scholastic-navy transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              Ngữ pháp
            </a>
          </div>
        </div>
      </header>

      {/* Vocabulary Section */}
      <section id="vocabulary" className="mb-16 scroll-mt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
            </div>
            <h3 className="text-xl font-display font-bold text-scholastic-navy">Vocabulary (語彙)</h3>
          </div>
          
          {/* Toggle Blur Meaning */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-soft border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ẩn Nghĩa Tiếng Việt</span>
            <label className="flex items-center cursor-pointer relative">
              <input 
                type="checkbox" 
                checked={hideMeanings} 
                onChange={() => setHideMeanings(!hideMeanings)} 
                className="sr-only" 
              />
              <div className={`w-10 h-6 rounded-full shadow-inner transition-colors ${hideMeanings ? 'bg-scholastic-matcha' : 'bg-slate-200'}`}></div>
              <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${hideMeanings ? 'transform translate-x-4' : ''}`}></div>
            </label>
          </div>
        </div>

        {/* Vocab cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.vocabulary.map((item, idx) => {
            const isRevealed = revealedVocabs[idx] || !hideMeanings;
            const typedText = vocabTyping[idx] || '';

            return (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl shadow-soft border border-slate-50 flex items-center justify-between hover:border-indigo-100 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="japanese-text text-lg">{item.jp}</span>
                    <span className="text-xs text-slate-400 font-medium">{item.kana}</span>
                  </div>
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-tight mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.romaji}
                  </span>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5 max-w-[55%] shrink-0">
                  <span 
                    onClick={() => hideMeanings && toggleVocabReveal(idx)}
                    className={`text-sm font-semibold text-slate-600 transition-all duration-300 ${
                      hideMeanings ? 'cursor-pointer' : ''
                    } ${!isRevealed ? 'hidden-answer' : 'hidden-answer revealed'}`}
                  >
                    {item.vn}
                  </span>

                  {/* Gamified typing to guess word */}
                  {hideMeanings && !isRevealed && (
                    <input
                      type="text"
                      placeholder="Gõ Kana/Romaji để đoán..."
                      value={typedText}
                      onChange={(e) => handleVocabTypingChange(idx, e.target.value, item.kana, item.romaji)}
                      className="text-xs px-2 py-1 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 w-36 text-center bg-slate-50/50"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grammar Section */}
      <section id="grammar" className="mb-16 scroll-mt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </div>
          <h3 className="text-xl font-display font-bold text-scholastic-navy">Grammar Explanations (文法)</h3>
        </div>

        <div className="space-y-6">
          {lesson.grammar.map((gp, gIdx) => {
            const isExpanded = expandedGrammar[gp.id] || false;
            const inputVal = grammarInputs[gp.id] || '';
            const result = grammarResults[gp.id] || null;

            return (
              <div 
                key={gp.id}
                className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100 hover:shadow-premium transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-lg tracking-wide uppercase ${
                    gIdx % 2 === 0 ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'
                  }`}>
                    Mẫu {gIdx + 1}
                  </span>
                  <h4 className="text-lg font-bold text-scholastic-navy japanese-text">{gp.point}</h4>
                </div>

                <div className="mb-4">
                  <div className="p-4 bg-slate-50 rounded-xl font-mono text-sm border-l-4 border-scholastic-navy mb-4 overflow-x-auto">
                    {gp.formula}
                  </div>
                  <div className="space-y-3 pl-1">
                    <p className="text-sm leading-relaxed"><span className="font-bold text-slate-600">JP:</span> {gp.jpExplain}</p>
                    <p className="text-sm italic text-scholastic-muted"><span className="font-bold not-italic text-slate-600">VN:</span> {gp.vnExplain}</p>
                  </div>
                </div>

                {/* Example accordions */}
                <button 
                  onClick={() => toggleGrammarExample(gp.id)} 
                  className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1 mt-2 mb-2"
                >
                  {isExpanded ? (
                    <>Ẩn Ví Dụ <ChevronUp className="w-3.5 h-3.5" /></>
                  ) : (
                    <>Xem Ví Dụ <ChevronDown className="w-3.5 h-3.5" /></>
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-3 p-4 bg-indigo-50/30 rounded-xl border border-indigo-50/50 animate-scale-in">
                    <p className="japanese-text text-base mb-1">{gp.exampleJp}</p>
                    <p className="vietnamese-text text-sm">{gp.exampleVn}</p>
                  </div>
                )}

                {/* Interactive Practice Question */}
                {gp.exerciseQuestion && gp.exerciseAnswer && (
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-scholastic-sakura" />
                      Thực hành nhanh: Điền trợ từ/từ phù hợp
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1">
                        <p className="japanese-text text-base text-slate-700 select-none">
                          {gp.exerciseQuestion.split('___')[0]}
                          <input
                            type="text"
                            value={inputVal}
                            disabled={result === 'correct'}
                            onChange={(e) => setGrammarInputs(prev => ({ ...prev, [gp.id]: e.target.value }))}
                            className={`w-16 mx-2 text-center py-0.5 border-b-2 font-bold font-sans text-base focus:outline-none ${
                              result === 'correct'
                                ? 'border-emerald-500 text-emerald-600 bg-emerald-50 rounded'
                                : result === 'incorrect'
                                ? 'border-red-400 text-red-500 bg-red-50 animate-shake'
                                : 'border-slate-300 focus:border-indigo-600'
                            }`}
                          />
                          {gp.exerciseQuestion.split('___')[1]}
                        </p>
                        {gp.exerciseHint && result !== 'correct' && (
                          <p className="text-[10px] text-slate-400 italic mt-1 pl-1">Gợi ý: {gp.exerciseHint}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {result === 'correct' ? (
                          <span className="text-xs font-bold text-scholastic-matcha flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                            <Check className="w-4 h-4" /> Chính xác
                          </span>
                        ) : (
                          <button
                            onClick={() => handleGrammarSubmit(gp.id, inputVal, gp.exerciseAnswer || '')}
                            className="px-4 py-1.5 rounded-xl bg-scholastic-navy text-white text-xs font-bold hover:shadow hover:bg-indigo-950 transition-all active:scale-95"
                          >
                            Kiểm Tra
                          </button>
                        )}

                        {result === 'incorrect' && (
                          <span className="text-xs font-bold text-red-500 flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                            <AlertCircle className="w-3.5 h-3.5" /> Sai rồi, thử lại nhé
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Practice Phrases Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-pink-50 text-pink-600 rounded-xl">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 className="text-xl font-display font-bold text-scholastic-navy">Practice Phrases (例文)</h3>
        </div>

        <div className="space-y-4">
          {lesson.phrases.map((phrase, idx) => (
            <div 
              key={phrase.id}
              className="group bg-white p-6 rounded-2xl shadow-soft border border-slate-100 hover:bg-slate-50/50 transition-all"
            >
              <div className="flex gap-4">
                <span className="text-slate-300 font-extrabold text-lg">{(idx + 1).toString().padStart(2, '0')}</span>
                <div>
                  <p className="japanese-text text-base md:text-lg mb-2">{phrase.jp}</p>
                  <p className="vietnamese-text text-sm md:text-base">{phrase.vn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Footer Component (Sticky bar) */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-6">
        <div className="glass-card px-6 py-4 rounded-3xl shadow-premium border border-white/60 flex items-center gap-6 max-w-lg w-full justify-between backdrop-blur-md">
          <div className="flex-1">
            <p className="text-[9px] uppercase tracking-widest font-black text-slate-400 mb-1">Tiến Độ Bài Học</p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-scholastic-matcha transition-all duration-300" 
                style={{ width: `${isCompleted ? 100 : scrollProgress}%` }}
              ></div>
            </div>
          </div>
          
          {isCompleted ? (
            <span className="px-5 py-2.5 rounded-xl bg-scholastic-matcha text-white text-xs font-bold shadow-md flex items-center gap-1">
              <Check className="w-4 h-4" /> Đã hoàn thành
            </span>
          ) : (
            <button 
              onClick={handleComplete}
              className="px-5 py-2.5 rounded-xl bg-scholastic-navy text-white text-xs font-bold shadow-md hover:bg-indigo-950 hover:shadow-lg transition-all active:scale-95 shrink-0"
            >
              Hoàn Thành Bài Học
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
