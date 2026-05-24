import { useState, useEffect } from 'react';
import type { UserProgress } from './types';
import { lessonsData } from './data/lessons';
import { examsData } from './data/exams';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LessonsList } from './components/LessonsList/LessonsList';
import { LessonDetail } from './components/LessonDetail/LessonDetail';
import { ExamDetail } from './components/ExamDetail/ExamDetail';
import { Review } from './components/Review/Review';
import { TeFormPractice } from './components/TeFormPractice/TeFormPractice';
import { KanjiPractice } from './components/KanjiPractice/KanjiPractice';
import { LayoutDashboard, BookOpen, GraduationCap, Flame, Menu, X, Landmark, Repeat, Layers } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'nihongo_app_user_progress';

const defaultProgress: UserProgress = {
  completedLessons: [],
  completedExams: {},
  completedReviewCount: 0,
  streakDays: 0,
  heatmapData: {}
};

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'lessons' | 'review' | 'te-form' | 'kanji'>('dashboard');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load progress from Local Storage
  const [progress, setProgress] = useState<UserProgress>(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return { ...defaultProgress, ...parsed };
      } catch (e) {
        return defaultProgress;
      }
    }
    return defaultProgress;
  });

  // Save progress changes to Local Storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Streak verification logic on mount
  useEffect(() => {
    verifyStreak();
  }, []);

  const verifyStreak = () => {
    const todayStr = getTodayString();
    const yesterdayStr = getYesterdayString();
    
    setProgress((prev) => {
      const dates = Object.keys(prev.heatmapData);
      if (dates.length === 0) return prev;

      const hasActivityToday = prev.heatmapData[todayStr] > 0;
      const hasActivityYesterday = prev.heatmapData[yesterdayStr] > 0;

      if (!hasActivityToday && !hasActivityYesterday) {
        // Streak broken
        return { ...prev, streakDays: 0 };
      } else if (hasActivityToday && prev.streakDays === 0) {
        // Streak restarted
        return { ...prev, streakDays: 1 };
      }
      return prev;
    });
  };

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getYesterdayString = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Record a learning activity in the heatmap
  const recordActivity = (increment: number = 1, affectStreak: boolean = true) => {
    const todayStr = getTodayString();
    setProgress((prev) => {
      const currentHeatmap = { ...prev.heatmapData };
      const currentCount = currentHeatmap[todayStr] || 0;
      
      // Update heatmap count
      currentHeatmap[todayStr] = currentCount + increment;

      // Update streak count
      let newStreak = prev.streakDays;
      if (affectStreak) {
        const hasActivityYesterday = prev.heatmapData[getYesterdayString()] > 0;

        if (currentCount === 0) {
          // First activity of today
          if (hasActivityYesterday || datesCountTodayAndYesterday(prev.heatmapData)) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        }
      }

      return {
        ...prev,
        heatmapData: currentHeatmap,
        streakDays: newStreak
      };
    });
  };

  const datesCountTodayAndYesterday = (heatmap: Record<string, number>) => {
    const yesterday = getYesterdayString();
    return heatmap[yesterday] > 0;
  };

  // Mark lesson as complete
  const handleMarkLessonComplete = (lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      };
    });
    recordActivity(3); // Completing a lesson grants 3 contribution points on heatmap!
  };

  // Submit Exam Score
  const handleSubmitExamScore = (examId: string, score: number) => {
    setProgress((prev) => {
      const previousHigh = prev.completedExams[examId] || 0;
      return {
        ...prev,
        completedExams: {
          ...prev.completedExams,
          [examId]: Math.max(previousHigh, score)
        }
      };
    });
    recordActivity(4); // Taking an exam grants 4 points!
  };

  // Vocab review success logger
  const handleRecordPractice = () => {
    setProgress(prev => ({
      ...prev,
      completedReviewCount: prev.completedReviewCount + 1
    }));
    recordActivity(1); // Practicing a card gives 1 point!
  };

  const handleResumeLesson = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setSelectedExamId(null);
    setActiveTab('lessons');
  };

  // Active view router
  const renderContent = () => {
    if (selectedLessonId !== null) {
      const lesson = lessonsData.find(l => l.id === selectedLessonId);
      if (lesson) {
        return (
          <LessonDetail
            lesson={lesson}
            progress={progress}
            onBack={() => setSelectedLessonId(null)}
            onMarkComplete={handleMarkLessonComplete}
          />
        );
      }
    }

    if (selectedExamId !== null) {
      const exam = examsData.find(e => e.id === selectedExamId);
      if (exam) {
        return (
          <ExamDetail
            exam={exam}
            progress={progress}
            onBack={() => setSelectedExamId(null)}
            onSubmitScore={handleSubmitExamScore}
          />
        );
      }
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            progress={progress}
            lessons={lessonsData}
            onResumeLesson={handleResumeLesson}
          />
        );
      case 'lessons':
        return (
          <LessonsList
            lessons={lessonsData}
            exams={examsData}
            progress={progress}
            onSelectLesson={(id) => {
              setSelectedLessonId(id);
              setSelectedExamId(null);
            }}
            onSelectExam={(id) => {
              setSelectedExamId(id);
              setSelectedLessonId(null);
            }}
          />
        );
      case 'review':
        return (
          <Review
            lessons={lessonsData}
            progress={progress}
            onRecordPractice={handleRecordPractice}
          />
        );
      case 'te-form':
        return (
          <TeFormPractice
            lessons={lessonsData}
            onRecordActivity={recordActivity}
          />
        );
      case 'kanji':
        return (
          <KanjiPractice
            onRecordActivity={recordActivity}
          />
        );
      default:
        return <div>Trang không tồn tại.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-scholastic-bg flex flex-col md:flex-row antialiased">
      
      {/* SIDEBAR FOR DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 p-5 justify-between sticky top-0 h-screen z-40">
        <div className="space-y-8">
          {/* Logo Brand with Outfit font */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="p-2 bg-scholastic-sakura rounded-xl text-white shadow-lg shadow-pink-500/25">
              <Landmark className="w-5 h-5 fill-current" />
            </div>
            <h1 className="font-display font-extrabold text-lg text-white leading-none tracking-tight">
              NIHONGO<span className="text-scholastic-sakura block text-xs font-black uppercase mt-0.5 tracking-widest">Master</span>
            </h1>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setSelectedLessonId(null);
                setSelectedExamId(null);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                activeTab === 'dashboard' && selectedLessonId === null && selectedExamId === null
                  ? 'bg-scholastic-sakura text-white shadow-md shadow-pink-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Bảng điều khiển
            </button>

            <button
              onClick={() => {
                setActiveTab('lessons');
                setSelectedLessonId(null);
                setSelectedExamId(null);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                activeTab === 'lessons' || selectedLessonId !== null || selectedExamId !== null
                  ? 'bg-scholastic-sakura text-white shadow-md shadow-pink-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Bài học & Đề thi
            </button>

            <button
              onClick={() => {
                setActiveTab('review');
                setSelectedLessonId(null);
                setSelectedExamId(null);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                activeTab === 'review'
                  ? 'bg-scholastic-sakura text-white shadow-md shadow-pink-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Ôn tập & Luyện tập
            </button>

            <button
              onClick={() => {
                setActiveTab('te-form');
                setSelectedLessonId(null);
                setSelectedExamId(null);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                activeTab === 'te-form'
                  ? 'bg-scholastic-sakura text-white shadow-md shadow-pink-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <Repeat className="w-4 h-4" />
              Luyện tập chia từ
            </button>

            <button
              onClick={() => {
                setActiveTab('kanji');
                setSelectedLessonId(null);
                setSelectedExamId(null);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                activeTab === 'kanji'
                  ? 'bg-scholastic-sakura text-white shadow-md shadow-pink-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              Ôn tập Hán tự
            </button>
          </nav>
        </div>

        {/* Footer info in desktop sidebar */}
        <div className="border-t border-slate-800/60 pt-4 px-2 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Chuỗi ngày:</span>
          <span className="flex items-center gap-1 font-bold text-amber-500">
            <Flame className="w-3.5 h-3.5 fill-current" />
            {progress.streakDays} ngày
          </span>
        </div>
      </aside>

      {/* MOBILE BAR TOP NAVIGATION */}
      <header className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 text-white px-5 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-scholastic-sakura rounded-lg text-white">
            <Landmark className="w-4 h-4 fill-current" />
          </div>
          <span className="font-display font-extrabold text-sm tracking-wide">
            NIHONGO<span className="text-scholastic-sakura font-black text-[10px] ml-1 uppercase">Master</span>
          </span>
        </div>

        {/* Quick streak display in header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
            <Flame className="w-4 h-4 fill-current" />
            {progress.streakDays}d
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-slate-300 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE EXPANDED DROPDOWN NAVIGATION MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[53px] bg-slate-950/95 backdrop-blur-sm z-30 flex flex-col p-6 space-y-4 animate-scale-in">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setSelectedLessonId(null);
              setSelectedExamId(null);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full py-4 px-5 rounded-2xl text-left font-bold text-base flex items-center gap-3 transition-all ${
              activeTab === 'dashboard' && selectedLessonId === null && selectedExamId === null
                ? 'bg-scholastic-sakura text-white shadow-lg shadow-pink-500/20'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Bảng điều khiển (Dashboard)
          </button>

          <button
            onClick={() => {
              setActiveTab('lessons');
              setSelectedLessonId(null);
              setSelectedExamId(null);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full py-4 px-5 rounded-2xl text-left font-bold text-base flex items-center gap-3 transition-all ${
              activeTab === 'lessons' || selectedLessonId !== null || selectedExamId !== null
                ? 'bg-scholastic-sakura text-white shadow-lg shadow-pink-500/20'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Bài học & Đề thi
          </button>

          <button
            onClick={() => {
              setActiveTab('review');
              setSelectedLessonId(null);
              setSelectedExamId(null);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full py-4 px-5 rounded-2xl text-left font-bold text-base flex items-center gap-3 transition-all ${
              activeTab === 'review'
                ? 'bg-scholastic-sakura text-white shadow-lg shadow-pink-500/20'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Ôn tập từ vựng
          </button>

          <button
            onClick={() => {
              setActiveTab('te-form');
              setSelectedLessonId(null);
              setSelectedExamId(null);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full py-4 px-5 rounded-2xl text-left font-bold text-base flex items-center gap-3 transition-all ${
              activeTab === 'te-form'
                ? 'bg-scholastic-sakura text-white shadow-lg shadow-pink-500/20'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Repeat className="w-5 h-5" />
            Luyện tập chia từ
          </button>

          <button
            onClick={() => {
              setActiveTab('kanji');
              setSelectedLessonId(null);
              setSelectedExamId(null);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full py-4 px-5 rounded-2xl text-left font-bold text-base flex items-center gap-3 transition-all ${
              activeTab === 'kanji'
                ? 'bg-scholastic-sakura text-white shadow-lg shadow-pink-500/20'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-5 h-5" />
            Ôn tập Hán tự
          </button>
        </div>
      )}

      {/* CORE WORKSPACE CONTENT PORT CONTAINER */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:p-8">
        {renderContent()}
      </main>

    </div>
  );
}

export default App;
