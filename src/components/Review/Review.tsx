import React, { useState, useEffect, useRef } from 'react';
import type { VocabItem, UserProgress, Lesson } from '../../types';
import { BookOpen, Check, X, Keyboard, Zap, Play, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewProps {
  lessons: Lesson[];
  progress: UserProgress;
  onRecordPractice: () => void;
}

export const Review: React.FC<ReviewProps> = ({ lessons, progress, onRecordPractice }) => {
  const [activeMode, setActiveMode] = useState<'flashcards' | 'speed-typing'>('flashcards');

  // Gather vocabulary from completed lessons. If none are completed, collect from first lesson to make it playable!
  const getVocabPool = (): VocabItem[] => {
    let pool: VocabItem[] = [];

    // Get completed lessons
    const completedLessonObjects = lessons.filter(l => progress.completedLessons.includes(l.id));

    if (completedLessonObjects.length > 0) {
      completedLessonObjects.forEach((lesson) => {
        pool = [...pool, ...lesson.vocabulary];
      });
    } else {
      // Fallback pool to ensure it's playable immediately
      pool = lessons[0].vocabulary;
    }
    return pool;
  };

  const vocabPool = getVocabPool();

  // --- FLASHCARDS MODE STATES ---
  const [shuffledCards, setShuffledCards] = useState<VocabItem[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rememberedCount, setRememberedCount] = useState(0);
  const [forgotCount, setForgotCount] = useState(0);

  // Initialize flashcards
  useEffect(() => {
    if (vocabPool.length > 0) {
      // Shuffle
      const shuffled = [...vocabPool].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
      setCardIndex(0);
      setIsFlipped(false);
      setRememberedCount(0);
      setForgotCount(0);
    }
  }, [lessons, progress.completedLessons]);

  // Keyboard shortcut listener for Flashcards
  useEffect(() => {
    if (activeMode !== 'flashcards' || shuffledCards.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleCardFeedback(true);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleCardFeedback(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMode, cardIndex, isFlipped, shuffledCards]);

  const handleCardFeedback = (remembered: boolean) => {
    if (shuffledCards.length === 0) return;

    if (remembered) {
      setRememberedCount(prev => prev + 1);
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.8 }
      });
    } else {
      setForgotCount(prev => prev + 1);
    }

    onRecordPractice(); // Log learning session in heatmap!

    setIsFlipped(false);
    setTimeout(() => {
      if (cardIndex < shuffledCards.length - 1) {
        setCardIndex(prev => prev + 1);
      } else {
        // Shuffled again on completing all
        const reshuflled = [...vocabPool].sort(() => Math.random() - 0.5);
        setShuffledCards(reshuflled);
        setCardIndex(0);
        setRememberedCount(0);
        setForgotCount(0);
      }
    }, 150);
  };

  // --- SPEED TYPING GAME STATES ---
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'game-over'>('idle');
  const [gamePool, setGamePool] = useState<VocabItem[]>([]);
  const [gameWordIndex, setGameWordIndex] = useState(0);
  const [typedGuess, setTypedGuess] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(6); // 6 seconds per word
  const [feedbackEffect, setFeedbackEffect] = useState<'correct' | 'incorrect' | null>(null);

  const gameTimerRef = useRef<any>(null);

  const startGame = () => {
    if (vocabPool.length === 0) return;
    const shuffled = [...vocabPool].sort(() => Math.random() - 0.5);
    setGamePool(shuffled);
    setGameWordIndex(0);
    setScore(0);
    setTypedGuess('');
    setGameState('playing');
    setGameTimeLeft(6);
    setFeedbackEffect(null);
  };

  useEffect(() => {
    if (gameState !== 'playing' || gamePool.length === 0) {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      return;
    }

    gameTimerRef.current = setInterval(() => {
      setGameTimeLeft((prev) => {
        if (prev <= 1) {
          // Timeout = incorrect
          triggerWordIncorrect();
          return 6;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [gameState, gameWordIndex, gamePool]);

  const triggerWordIncorrect = () => {
    setFeedbackEffect('incorrect');
    setTimeout(() => {
      setFeedbackEffect(null);
      moveToNextWord();
    }, 1200);
  };

  const handleTypeGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'playing' || feedbackEffect !== null) return;

    const currentWord = gamePool[gameWordIndex];
    const answerClean = typedGuess.trim().toLowerCase();

    const correctRomaji = currentWord.romaji.toLowerCase();
    const correctKana = currentWord.kana.toLowerCase();
    const correctVn = currentWord.vn.toLowerCase();

    // Check if guess matches Romanji, Kana or Vietnamese meaning
    const isCorrect =
      answerClean === correctRomaji ||
      answerClean === correctKana ||
      answerClean === correctVn ||
      correctVn.includes(answerClean) && answerClean.length >= 2;

    if (isCorrect) {
      setFeedbackEffect('correct');
      setScore(prev => {
        const newScore = prev + 10;
        if (newScore > highScore) setHighScore(newScore);
        return newScore;
      });
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.7 }
      });

      onRecordPractice(); // Log to heatmap!

      setTimeout(() => {
        setFeedbackEffect(null);
        moveToNextWord();
      }, 800);
    } else {
      triggerWordIncorrect();
    }
  };

  const moveToNextWord = () => {
    setTypedGuess('');
    setGameTimeLeft(6);

    if (gameWordIndex < gamePool.length - 1) {
      setGameWordIndex(prev => prev + 1);
    } else {
      // Completed pool! Finish game.
      setGameState('game-over');
    }
  };

  const activeWord = gamePool[gameWordIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">

      {/* Mode Switches header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-black text-scholastic-navy">Bộ Công Cụ Ôn Tập (Review Suite)</h3>
          <p className="text-xs text-slate-400 font-medium">Ôn tập từ vựng ngẫu nhiên từ kho từ của bài học.</p>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-xl">
          <button
            onClick={() => {
              setActiveMode('flashcards');
              if (gameTimerRef.current) clearInterval(gameTimerRef.current);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMode === 'flashcards'
              ? 'bg-white text-scholastic-navy shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <BookOpen className="w-4 h-4" />
            Thẻ Flashcards
          </button>
          <button
            onClick={() => setActiveMode('speed-typing')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeMode === 'speed-typing'
              ? 'bg-white text-scholastic-navy shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <Zap className="w-4 h-4" />
            Đuổi Hình Gõ Từ
          </button>
        </div>
      </div>

      {/* --- FLASHCARDS RENDERING --- */}
      {activeMode === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-scale-in">

          {/* Card Wrapper */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`aspect-[3/2] w-full bg-white rounded-3xl border shadow-soft hover:shadow-premium hover:border-indigo-200 transition-all duration-500 cursor-pointer flex flex-col justify-center items-center p-6 relative overflow-hidden select-none ${isFlipped ? 'border-indigo-100 bg-indigo-50/5' : ''
              }`}
          >
            {/* Top right card hint */}
            <span className="absolute top-4 right-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {isFlipped ? 'Mặt sau (Lật lại)' : 'Mặt trước (Bấm để lật)'}
            </span>

            {/* Back representation */}
            {isFlipped ? (
              <div className="text-center space-y-4 animate-scale-in">
                <span className="text-[15px] font-bold text-slate-400 uppercase tracking-widest">Nghĩa Tiếng Việt</span>
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">{shuffledCards[cardIndex]?.vn}</h2>
                <p className="text-md text-slate-400 font-mono italic">Cách đọc Romaji: {shuffledCards[cardIndex]?.romaji}</p>
              </div>
            ) : (
              /* Front representation */
              <div className="text-center space-y-4 animate-scale-in">
                <span className="text-[15px] font-bold text-slate-400 uppercase tracking-widest">Tiếng Nhật</span>
                <h2 className="japanese-text text-3xl md:text-4xl">{shuffledCards[cardIndex]?.jp}</h2>
                <p className="text-md text-slate-400 font-medium font-sans mt-1">{shuffledCards[cardIndex]?.kana}</p>
              </div>
            )}
          </div>

          {/* Quick keyboard instruction bar */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium shadow-sm">
            <Keyboard className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Phím tắt: <strong>Space</strong> (Lật) | <strong>← Mũi tên trái</strong> (Quên) | <strong>→ Mũi tên phải</strong> (Thuộc)</span>
          </div>

          {/* Actions button group */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleCardFeedback(false)}
              className="py-3.5 rounded-2xl border-2 border-red-100 text-red-500 font-bold text-sm bg-white hover:bg-red-50/50 hover:border-red-200 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              <X className="w-4 h-4" />
              Chưa thuộc (Quên)
            </button>

            <button
              onClick={() => handleCardFeedback(true)}
              className="py-3.5 rounded-2xl border-2 border-emerald-100 bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 hover:border-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-emerald-100"
            >
              <Check className="w-4 h-4" />
              Đã thuộc
            </button>
          </div>

          {/* Progress bar info */}
          <div className="border-t border-slate-100 pt-6 mt-6 flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Từ thứ {cardIndex + 1} / {shuffledCards.length}</span>
            <div className="flex gap-4">
              <span className="text-emerald-500">Đã nhớ: {rememberedCount}</span>
              <span className="text-red-400">Chưa nhớ: {forgotCount}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- SPEED TYPING QUIZ GAME RENDERING --- */}
      {activeMode === 'speed-typing' && (
        <div className="max-w-2xl mx-auto animate-scale-in">
          {gameState === 'idle' && (
            <div className="bg-white rounded-3xl p-8 border shadow-soft text-center space-y-6">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 fill-current" />
              </div>
              <div className="space-y-4">
                <h4 className="text-3xl font-bold text-scholastic-navy">Trò chơi: Gõ Từ Tốc Độ</h4>
                <p className="text-md text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Các từ vựng tiếng Nhật sẽ xuất hiện ngẫu nhiên. Bạn có 10 giây để nhập Romaji, Hiragana hoặc nghĩa tiếng Việt tương ứng. Mỗi câu trả lời đúng được cộng 10 điểm!
                </p>
              </div>

              <button
                onClick={startGame}
                className="px-8 py-3.5 rounded-xl bg-scholastic-navy text-white text-sm font-bold shadow-lg hover:bg-indigo-950 transition-all flex items-center gap-2 mx-auto active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                Bắt Đầu Ngay
              </button>
            </div>
          )}

          {gameState === 'playing' && activeWord && (
            <div className="space-y-6">
              {/* Stats and timers */}
              <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border shadow-soft">
                <div className="text-xs font-bold text-slate-400">
                  ĐIỂM: <span className="text-indigo-600 text-sm font-black">{score}</span>
                </div>

                <div className="text-xs font-bold text-slate-400">
                  LỚN NHẤT: <span className="text-slate-600 text-sm font-black">{highScore}</span>
                </div>

                {/* Ticking countdown text */}
                <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  THỜI GIAN:
                  <span className={`font-black font-mono text-sm px-2 py-0.5 rounded ${gameTimeLeft < 3 ? 'bg-red-50 text-red-500 animate-pulse' : 'bg-slate-50 text-slate-600'
                    }`}>
                    {gameTimeLeft}s
                  </span>
                </div>
              </div>

              {/* Progress time indicator bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${gameTimeLeft < 3 ? 'bg-red-500' : 'bg-indigo-500'
                    }`}
                  style={{ width: `${(gameTimeLeft / 10) * 100}%` }}
                ></div>
              </div>

              {/* Word Display Panel */}
              <div className={`bg-white rounded-3xl p-8 border shadow-soft text-center space-y-4 transition-all duration-300 ${feedbackEffect === 'correct'
                ? 'bg-emerald-50/50 border-emerald-200'
                : feedbackEffect === 'incorrect'
                  ? 'bg-red-50/50 border-red-200'
                  : ''
                }`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Từ thứ {gameWordIndex + 1}</span>

                <h2 className="japanese-text text-4xl leading-tight">{activeWord.jp}</h2>
                <p className="text-sm text-slate-400 font-medium font-sans">{activeWord.kana}</p>

                {/* incorrect solution reveal banner */}
                {feedbackEffect === 'incorrect' && (
                  <div className="pt-3 border-t border-red-100 text-red-700 animate-scale-in">
                    <p className="text-[10px] uppercase font-black opacity-60">Đáp án đúng</p>
                    <p className="text-sm font-bold">{activeWord.vn} ({activeWord.romaji})</p>
                  </div>
                )}

                {feedbackEffect === 'correct' && (
                  <div className="pt-3 border-t border-emerald-100 text-emerald-700 font-bold text-sm animate-scale-in flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> Tuyệt vời! (+10đ)
                  </div>
                )}
              </div>

              {/* Submission typing form */}
              <form onSubmit={handleTypeGuessSubmit} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Gõ Romaji hoặc tiếng Việt..."
                  value={typedGuess}
                  disabled={feedbackEffect !== null}
                  onChange={(e) => setTypedGuess(e.target.value)}
                  className="flex-1 px-5 py-3.5 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium bg-white"
                  autoFocus
                />

                <button
                  type="submit"
                  disabled={feedbackEffect !== null}
                  className="px-6 rounded-2xl bg-scholastic-navy text-white text-xs font-bold hover:bg-indigo-950 transition-all active:scale-95 disabled:opacity-40 shadow-md"
                >
                  Gửi
                </button>
              </form>
            </div>
          )}

          {gameState === 'game-over' && (
            <div className="bg-white rounded-3xl p-8 border shadow-soft text-center space-y-6 animate-scale-in">
              <div className="w-16 h-16 bg-emerald-50 text-scholastic-matcha rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 fill-current" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-scholastic-navy">Kết thúc trò chơi! 🎉</h4>
                <p className="text-xs text-slate-400">Bạn đã đi hết kho từ ôn tập của lượt này.</p>

                <div className="grid grid-cols-2 gap-4 mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-xs mx-auto">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Điểm số</span>
                    <p className="text-lg font-black text-indigo-600">{score}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Lớn nhất</span>
                    <p className="text-lg font-black text-slate-700">{highScore}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={startGame}
                  className="px-5 py-3 rounded-xl bg-scholastic-navy text-white text-xs font-bold shadow-md hover:bg-indigo-950 transition-all flex items-center gap-1 active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" /> Chơi Lại
                </button>
                <button
                  onClick={() => setGameState('idle')}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all active:scale-95"
                >
                  Màn Hình Chính
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
