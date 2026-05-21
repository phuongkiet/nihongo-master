import React, { useState, useEffect, useRef } from 'react';
import type { Exam, UserProgress } from '../../types';
import { Timer, Bookmark, ChevronLeft, ChevronRight, AlertCircle, CheckCircle, ArrowLeft, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamDetailProps {
  exam: Exam;
  progress: UserProgress;
  onBack: () => void;
  onSubmitScore: (examId: string, score: number) => void;
}

export const ExamDetail: React.FC<ExamDetailProps> = ({
  exam,
  onBack,
  onSubmitScore
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  
  const timerRef = useRef<any>(null);

  // Countdown timer logic
  useEffect(() => {
    if (isSubmitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    
    // Standard option indexing "A", "B", "C", "D"
    const options = ["A", "B", "C", "D"];
    const selectedLetter = options[optionIndex];
    setAnswers(prev => ({ ...prev, [questionId]: selectedLetter }));
  };

  const toggleMarkReview = (questionId: string) => {
    if (isSubmitted) return;
    setMarkedForReview(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleAutoSubmit = () => {
    submitExam();
  };

  const submitExam = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate score
    let score = 0;
    exam.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    onSubmitScore(exam.id, score);

    const passingScore = Math.ceil(exam.questions.length * 0.6);
    if (score >= passingScore) {
      // Confetti celebration
      confetti({
        particleCount: 120,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  
  // Calculate results on submit
  const correctAnswersCount = exam.questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const scorePercentage = Math.round((correctAnswersCount / exam.questions.length) * 100);
  const isPassed = correctAnswersCount >= Math.ceil(exam.questions.length * 0.6);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 animate-fade-in">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800 transition-all active:scale-95 flex items-center gap-2 text-sm bg-white font-semibold shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Rời khỏi phòng thi
        </button>

        <h2 className="font-display font-extrabold text-2xl text-scholastic-navy">
          {exam.name}
        </h2>
      </div>

      {/* Main Grid: Left Side (Question Engine) | Right Side (Dashboard / Nav Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Exam Question Body */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Post-Submit Result Banner */}
          {isSubmitted && (
            <div className={`p-6 rounded-3xl border flex items-center justify-between flex-wrap gap-4 shadow-soft animate-scale-in ${
              isPassed 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                : 'bg-red-50 border-red-100 text-red-800'
            }`}>
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {isPassed ? (
                    <CheckCircle className="w-6 h-6 text-scholastic-matcha fill-emerald-100" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-500 fill-red-100" />
                  )}
                  Kết quả thi: {isPassed ? 'ĐẠT (PASS)' : 'KHÔNG ĐẠT (FAILED)'}
                </h3>
                <p className="text-sm opacity-90 mt-1">
                  Bạn trả lời đúng <strong>{correctAnswersCount} / {exam.questions.length}</strong> câu hỏi ({scorePercentage}%). Điểm đạt yêu cầu: 60%.
                </p>
              </div>
              <span className={`px-4 py-2.5 rounded-2xl text-lg font-black ${
                isPassed ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {scorePercentage}%
              </span>
            </div>
          )}

          {/* Reading passage container if applicable */}
          {currentQuestion?.passage && (
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Đoạn Văn Đọc Hiểu (Reading Passage)</h4>
              <div className="p-4 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed font-jp text-base select-none whitespace-pre-line border border-slate-100">
                {currentQuestion.passage}
              </div>
            </div>
          )}

          {/* Main Question Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft border border-slate-100 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
                <span className="text-xs font-bold text-slate-400">
                  CÂU HỎI {currentQuestionIndex + 1} / {exam.questions.length} 
                  <span className="ml-2 uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px]">
                    {currentQuestion?.category}
                  </span>
                </span>

                {!isSubmitted && (
                  <button
                    onClick={() => toggleMarkReview(currentQuestion.id)}
                    className={`flex items-center gap-1 text-xs font-bold transition-all px-2.5 py-1.5 rounded-lg border ${
                      markedForReview[currentQuestion.id]
                        ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm'
                        : 'text-slate-400 border-slate-200 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${markedForReview[currentQuestion.id] ? 'fill-current' : ''}`} />
                    Xem lại sau
                  </button>
                )}
              </div>

              {/* Question Text */}
              <h3 className="japanese-text text-lg md:text-xl font-bold text-scholastic-navy leading-relaxed mb-6 select-none whitespace-pre-line">
                {currentQuestion?.text}
              </h3>

              {/* Multiple Choice Options */}
              {currentQuestion?.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const optionLetter = ["A", "B", "C", "D"][idx];
                    const isSelected = answers[currentQuestion.id] === optionLetter;
                    const isCorrectOption = currentQuestion.correctAnswer === optionLetter;
                    
                    let cardStyle = "border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50";
                    let prefixStyle = "bg-slate-100 text-slate-500";

                    if (isSubmitted) {
                      if (isCorrectOption) {
                        // Correct option is always green
                        cardStyle = "border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold";
                        prefixStyle = "bg-emerald-500 text-white";
                      } else if (isSelected && !isCorrectOption) {
                        // User selected wrong option
                        cardStyle = "border-red-200 bg-red-50 text-red-800";
                        prefixStyle = "bg-red-500 text-white";
                      } else {
                        // Other choices
                        cardStyle = "border-slate-100 opacity-60";
                        prefixStyle = "bg-slate-100 text-slate-400";
                      }
                    } else {
                      if (isSelected) {
                        cardStyle = "border-indigo-500 bg-indigo-50/40 text-indigo-900 font-semibold";
                        prefixStyle = "bg-scholastic-navy text-white";
                      }
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectOption(currentQuestion.id, idx)}
                        className={`p-4 rounded-xl border flex items-center gap-3 transition-all duration-200 ${
                          !isSubmitted ? 'cursor-pointer' : ''
                        } ${cardStyle}`}
                      >
                        <span className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center shrink-0 text-sm ${prefixStyle}`}>
                          {optionLetter}
                        </span>
                        <span className="text-sm font-medium font-jp select-none">{option}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Explanation box after submission */}
            {isSubmitted && (
              <div className="mt-6 p-5 bg-indigo-50/20 rounded-2xl border border-indigo-50 flex items-start gap-3 animate-scale-in">
                <AlertCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-1">Giải thích chi tiết</h5>
                  <p className="text-xs text-indigo-950 font-medium leading-relaxed">{currentQuestion.explanation}</p>
                </div>
              </div>
            )}

            {/* Pagination Controls inside Question Panel */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-50">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-slate-500 text-xs font-bold hover:bg-slate-100 hover:text-slate-800 disabled:opacity-40 flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Câu trước
              </button>

              <button
                disabled={currentQuestionIndex === exam.questions.length - 1}
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-4 py-2 rounded-xl text-slate-500 text-xs font-bold hover:bg-slate-100 hover:text-slate-800 disabled:opacity-40 flex items-center gap-1 transition-all"
              >
                Câu sau
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Sidebar Navigation Grid */}
        <div className="space-y-6">
          
          {/* Sticky Timer and Submission control card */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 space-y-4">
            
            {/* Timer visual */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thời gian còn lại</span>
              <div className="flex items-center gap-1.5 text-lg font-black text-scholastic-navy font-mono bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100">
                <Timer className={`w-4 h-4 ${timeLeft < 120 ? 'text-red-500 animate-pulse' : 'text-scholastic-navy'}`} />
                <span className={timeLeft < 120 ? 'text-red-500' : ''}>
                  {isSubmitted ? "Đã nộp bài" : formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Submission button */}
            {!isSubmitted ? (
              <button
                onClick={submitExam}
                className="w-full py-3.5 rounded-xl bg-scholastic-navy text-white text-sm font-bold shadow-lg hover:shadow-indigo-100 hover:bg-indigo-950 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Nộp Bài Thi
              </button>
            ) : (
              <button
                onClick={onBack}
                className="w-full py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Quay lại danh sách
              </button>
            )}
          </div>

          {/* Question Status Grid Matrix */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              {isSubmitted ? 'Bản Đồ Kết Quả' : 'Mạng Câu Hỏi'}
            </h4>

            {/* Matrix Items */}
            <div className="grid grid-cols-5 gap-2.5">
              {exam.questions.map((q, idx) => {
                const isSelected = answers[q.id] !== undefined;
                const isMarked = markedForReview[q.id] === true;
                const isActive = currentQuestionIndex === idx;
                
                let btnStyle = "bg-slate-50 border-slate-200 text-slate-400"; // grey / unanswered

                if (isSubmitted) {
                  const isCorrect = answers[q.id] === q.correctAnswer;
                  if (isCorrect) {
                    btnStyle = "bg-emerald-500 border-emerald-600 text-white"; // Correct = Green
                  } else {
                    btnStyle = "bg-red-500 border-red-600 text-white"; // Incorrect = Red
                  }
                } else {
                  if (isMarked) {
                    btnStyle = "bg-blue-50 text-blue-600 border-blue-300 fill-current"; // marked to review = blue
                  } else if (isSelected) {
                    btnStyle = "bg-emerald-500 border-emerald-600 text-white"; // answered = green
                  }
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-11 rounded-xl border-2 font-bold font-display text-sm flex items-center justify-center relative transition-all active:scale-90 ${
                      isActive ? 'ring-2 ring-indigo-500 ring-offset-2 scale-105' : ''
                    } ${btnStyle}`}
                  >
                    {idx + 1}
                    {isMarked && !isSubmitted && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Grid legend labels */}
            <div className="mt-5 border-t border-slate-50 pt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <div className="w-4 h-4 rounded bg-slate-50 border border-slate-200 shrink-0"></div>
                <span>Chưa làm câu này (Xám)</span>
              </div>
              {!isSubmitted ? (
                <>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <div className="w-4 h-4 rounded bg-emerald-500 shrink-0"></div>
                    <span>Đã làm câu này (Xanh lá)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <div className="w-4 h-4 rounded bg-blue-50 border border-blue-300 shrink-0"></div>
                    <span>Đánh dấu xem lại sau (Xanh dương)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <div className="w-4 h-4 rounded bg-emerald-500 shrink-0"></div>
                    <span>Trả lời chính xác (Xanh lá)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <div className="w-4 h-4 rounded bg-red-500 shrink-0"></div>
                    <span>Trả lời sai (Đỏ)</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
