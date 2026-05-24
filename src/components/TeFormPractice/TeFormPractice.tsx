import React, { useState, useRef } from 'react';
import type { VocabItem, Lesson } from '../../types';
import { getTeForm } from '../../utils/teFormRules';
import { Play, Check, RotateCcw, CheckCircle2, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import * as wanakana from 'wanakana';

interface TeFormPracticeProps {
  lessons: Lesson[];
  onRecordActivity: (increment: number, affectStreak?: boolean) => void;
}

export const TeFormPractice: React.FC<TeFormPracticeProps> = ({ lessons, onRecordActivity }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'game-over'>('idle');
  const [gamePool, setGamePool] = useState<VocabItem[]>([]);
  const [activeWord, setActiveWord] = useState<VocabItem | null>(null);
  
  const [typedGuess, setTypedGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedbackEffect, setFeedbackEffect] = useState<'correct' | 'incorrect' | null>(null);
  const [currentTeForm, setCurrentTeForm] = useState<{ teForm: string; group: number; rule: string } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Filter all verbs ending with ます from all lessons
  const getVerbsPool = (): VocabItem[] => {
    let verbs: VocabItem[] = [];
    lessons.forEach(lesson => {
      const lessonVerbs = lesson.vocabulary.filter(v => {
        // Clean kana just in case there are brackets like [きっさてんに～]
        const cleanKana = v.kana.replace(/\[.*?\]/g, '').trim();
        return cleanKana.endsWith('ます');
      });
      verbs = [...verbs, ...lessonVerbs];
    });
    // Remove duplicates based on kana
    const uniqueVerbs = Array.from(new Map(verbs.map(v => [v.kana, v])).values());
    return uniqueVerbs;
  };

  const startGame = () => {
    const pool = getVerbsPool();
    if (pool.length === 0) return;
    
    // Shuffle
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    // Take a batch of 20 verbs to practice, otherwise it might be too long
    const practiceBatch = shuffled.slice(0, 20);
    
    setGamePool(practiceBatch);
    setActiveWord(practiceBatch[0]);
    prepareWord(practiceBatch[0]);
    setScore(0);
    setTypedGuess('');
    setGameState('playing');
    setFeedbackEffect(null);
  };

  const prepareWord = (word: VocabItem) => {
    const teData = getTeForm(word.jp);
    setCurrentTeForm(teData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedGuess(e.target.value);
  };

  const handleTypeGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'playing' || feedbackEffect !== null || !activeWord || !currentTeForm) return;

    // Convert romaji input to kana
    const inputKana = wanakana.toKana(typedGuess.trim().toLowerCase());
    
    // Expected te form (only the main part, no brackets)
    const expectedTeForm = currentTeForm.teForm;

    if (inputKana === expectedTeForm) {
      setFeedbackEffect('correct');
      setScore(prev => prev + 10);
      
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.7 }
      });

      // Record heatmap activity, but DON'T affect streak
      onRecordActivity(1, false);

      setTimeout(() => {
        setFeedbackEffect(null);
        moveToNextWord(true);
      }, 800);
    } else {
      setFeedbackEffect('incorrect');
    }
  };

  const handleContinueIncorrect = () => {
    setFeedbackEffect(null);
    moveToNextWord(false);
  };

  const moveToNextWord = (wasCorrect: boolean) => {
    setTypedGuess('');
    
    setGamePool(prev => {
      const newPool = [...prev];
      const current = newPool.shift(); // Remove from front
      
      if (!wasCorrect && current) {
        newPool.push(current); // Push to back to repeat later
      }

      if (newPool.length > 0) {
        setActiveWord(newPool[0]);
        prepareWord(newPool[0]);
      } else {
        setGameState('game-over');
        setActiveWord(null);
      }
      
      return newPool;
    });
    
    // Focus input again
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-black text-scholastic-navy">Luyện Tập Chia Động Từ (Thể Te)</h3>
          <p className="text-xs text-slate-400 font-medium">Luyện phản xạ chia thể Te với các động từ đã học.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto animate-scale-in">
        {gameState === 'idle' && (
          <div className="bg-white rounded-3xl p-8 border shadow-soft text-center space-y-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <RotateCcw className="w-8 h-8 fill-current" />
            </div>
            <div className="space-y-4">
              <h4 className="text-3xl font-bold text-scholastic-navy">Luyện Phản Xạ Thể Te</h4>
              <p className="text-md text-slate-400 max-w-sm mx-auto leading-relaxed">
                App sẽ đưa ra một động từ ở thể ます. Bạn cần gõ thể て tương ứng bằng Romaji hoặc Hiragana. Nếu sai, từ đó sẽ lặp lại cho đến khi bạn nhớ!
              </p>
            </div>

            <button
              onClick={startGame}
              className="px-8 py-3.5 rounded-xl bg-scholastic-navy text-white text-sm font-bold shadow-lg hover:bg-indigo-950 transition-all flex items-center gap-2 mx-auto active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              Bắt Đầu Luyện Tập
            </button>
          </div>
        )}

        {gameState === 'playing' && activeWord && currentTeForm && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border shadow-soft">
              <div className="text-xs font-bold text-slate-400">
                ĐIỂM: <span className="text-indigo-600 text-sm font-black">{score}</span>
              </div>
              <div className="text-xs font-bold text-slate-400">
                CÒN LẠI: <span className="text-slate-600 text-sm font-black">{gamePool.length} từ</span>
              </div>
            </div>

            {/* Word Display Panel */}
            <div className={`bg-white rounded-3xl p-8 border shadow-soft text-center space-y-4 transition-all duration-300 ${
              feedbackEffect === 'correct'
                ? 'bg-emerald-50/50 border-emerald-200'
                : feedbackEffect === 'incorrect'
                ? 'bg-red-50/50 border-red-200'
                : ''
            }`}>
              
              <div className="flex justify-center mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                  currentTeForm.group === 1 ? 'bg-amber-100 text-amber-700' :
                  currentTeForm.group === 2 ? 'bg-sky-100 text-sky-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  Nhóm {currentTeForm.group}
                </span>
              </div>

              <h2 className="japanese-text text-4xl leading-tight">{activeWord.jp}</h2>
              <p className="text-sm text-slate-400 font-medium font-sans">{activeWord.kana} ({activeWord.vn})</p>

              {/* Feedback UI */}
              {feedbackEffect === 'correct' && (
                <div className="pt-3 border-t border-emerald-100 text-emerald-700 font-bold text-sm animate-scale-in flex items-center justify-center gap-1">
                  <Check className="w-4 h-4" /> Chính xác! (+10đ)
                </div>
              )}
              
              {feedbackEffect === 'incorrect' && (
                <div className="pt-4 border-t border-red-100 animate-scale-in space-y-3">
                  <p className="text-red-500 font-bold text-sm">Chưa chính xác!</p>
                  <div className="bg-red-50 p-4 rounded-xl text-left border border-red-100">
                    <p className="text-xs text-red-400 font-bold uppercase mb-1 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> Gợi ý cách chia
                    </p>
                    <p className="text-sm text-slate-700 font-medium">{currentTeForm.rule}</p>
                    <div className="mt-3 text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Đáp án đúng</p>
                      <p className="japanese-text text-2xl text-red-600 mt-1">{currentTeForm.teForm}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleContinueIncorrect}
                    className="mt-2 w-full py-2.5 rounded-xl bg-white border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-all active:scale-95"
                  >
                    Đã hiểu, tiếp tục
                  </button>
                </div>
              )}
            </div>

            {/* Typing Form */}
            {feedbackEffect !== 'incorrect' && (
              <form onSubmit={handleTypeGuessSubmit} className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Gõ thể Te (Romaji hoặc Hiragana)..."
                  value={typedGuess}
                  disabled={feedbackEffect !== null}
                  onChange={handleInputChange}
                  className="flex-1 px-5 py-3.5 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium bg-white"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={feedbackEffect !== null || typedGuess.trim() === ''}
                  className="px-6 rounded-2xl bg-scholastic-navy text-white text-xs font-bold hover:bg-indigo-950 transition-all active:scale-95 disabled:opacity-40 shadow-md"
                >
                  Kiểm tra
                </button>
              </form>
            )}
          </div>
        )}

        {gameState === 'game-over' && (
          <div className="bg-white rounded-3xl p-8 border shadow-soft text-center space-y-6 animate-scale-in">
            <div className="w-16 h-16 bg-emerald-50 text-scholastic-matcha rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 fill-current" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-scholastic-navy">Hoàn thành bài tập! 🎉</h4>
              <p className="text-xs text-slate-400">Bạn đã chia đúng toàn bộ các động từ trong lượt này.</p>
              
              <div className="mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-xs mx-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Tổng Điểm</span>
                <p className="text-2xl font-black text-indigo-600">{score}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={startGame}
                className="px-5 py-3 rounded-xl bg-scholastic-navy text-white text-xs font-bold shadow-md hover:bg-indigo-950 transition-all flex items-center gap-1 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" /> Luyện thêm vòng nữa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
