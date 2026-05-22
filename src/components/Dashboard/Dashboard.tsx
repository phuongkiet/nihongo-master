import React from 'react';
import type { UserProgress, Lesson } from '../../types';
import { Heatmap } from './Heatmap';
import { LearningRoadmap } from './LearningRoadmap';
import { BookOpen, Award, CheckCircle, Flame, Zap } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  lessons: Lesson[];
  onResumeLesson: (lessonId: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, lessons, onResumeLesson }) => {
  const totalLessons = lessons.length;
  const completedCount = progress.completedLessons.length;
  const completionPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Let's assume each completed lesson contributes around 3 kanji words and 20 vocabulary words
  const totalKanjiLearned = completedCount * 4 + (progress.completedReviewCount > 0 ? Math.floor(progress.completedReviewCount / 5) : 0);
  const totalVocabLearned = completedCount * 25 + progress.completedReviewCount;

  // Find next lesson to resume
  const nextLessonId = lessons.find(l => !progress.completedLessons.includes(l.id))?.id || 1;

  // Count active/ongoing lessons
  const activeLessons = lessons.filter(l => !progress.completedLessons.includes(l.id) && l.id < nextLessonId + 2).slice(0, 2);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative bg-gradient-to-r from-scholastic-navy to-indigo-900 rounded-3xl p-6 md:p-8 text-white overflow-hidden shadow-premium">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-10 -z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Minna no Nihongo Master
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              Chào mừng bạn trở lại!
            </h2>
            <p className="text-indigo-100 text-sm max-w-lg leading-relaxed">
              Hôm nay là một ngày tuyệt vời để học Tiếng Nhật. Hãy tiếp tục ôn tập từ vựng và hoàn thành các bài học nhé!
            </p>
          </div>

          <button
            onClick={() => onResumeLesson(nextLessonId)}
            className="px-6 py-3.5 rounded-xl bg-scholastic-sakura text-white font-bold hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 self-start md:self-auto shrink-0 shadow-lg"
          >
            <Zap className="w-5 h-5 fill-current" />
            Học Tiếp Bài {nextLessonId}
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Lessons completed */}
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Bài đã học</p>
            <h3 className="text-xl md:text-2xl font-bold text-scholastic-navy">
              {completedCount} <span className="text-xs font-medium text-slate-400">/ {totalLessons}</span>
            </h3>
          </div>
        </div>

        {/* Total Kanji Learned */}
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-pink-50 text-scholastic-sakura rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Kanji đã học</p>
            <h3 className="text-xl md:text-2xl font-bold text-scholastic-navy">
              {totalKanjiLearned} <span className="text-xs font-medium text-slate-400">chữ</span>
            </h3>
          </div>
        </div>

        {/* Total Vocab Learned */}
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-emerald-50 text-scholastic-matcha rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Từ vựng đã ôn</p>
            <h3 className="text-xl md:text-2xl font-bold text-scholastic-navy">
              {totalVocabLearned} <span className="text-xs font-medium text-slate-400">từ</span>
            </h3>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-50 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Chuỗi Streak</p>
            <h3 className="text-xl md:text-2xl font-bold text-scholastic-navy">
              {progress.streakDays} <span className="text-xs font-medium text-slate-400">ngày</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Heatmap and Streak progress */}
        <div className="lg:col-span-2 space-y-6">
          <Heatmap data={progress.heatmapData} />
          <LearningRoadmap
            progress={progress}
            lessons={lessons}
            onResumeLesson={onResumeLesson}
          />
        </div>

        {/* Right Column: Incomplete lessons / Recommended practice */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-soft border border-slate-100 space-y-6 h-fit">
            <div>
              <h4 className="text-lg font-bold text-scholastic-navy mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Bài đang học dang dở
              </h4>

              <div className="space-y-4">
                {activeLessons.map((lesson) => {
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onResumeLesson(lesson.id)}
                      className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all cursor-pointer group flex justify-between items-center"
                    >
                      <div className="flex-1 min-w-0 pr-3">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mb-1 inline-block">
                          Bài {lesson.id}
                        </span>
                        <h5 className="font-bold text-sm text-scholastic-navy group-hover:text-indigo-700 transition-colors truncate">
                          {lesson.title.split(': ')[1] || lesson.title}
                        </h5>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{lesson.titleVn}</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                        Học tiếp
                        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  );
                })}

                {activeLessons.length === 0 && (
                  <div className="text-center py-6 text-slate-400 text-sm italic">
                    Không có bài học dang dở nào.
                  </div>
                )}
              </div>
            </div>

            {/* Progress Circular visual widget */}
            <div className="border-t border-slate-100 pt-6 mt-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tổng tiến độ N5-N4</p>
                <p className="text-lg font-black text-scholastic-navy mt-0.5">{completionPercentage}% Hoàn thành</p>
              </div>

              {/* Minimal Circular Progress Bar */}
              <div className="relative w-14 h-14">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    stroke-width="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-scholastic-matcha"
                    stroke-width="3.5"
                    stroke-dasharray={`${completionPercentage}, 100`}
                    stroke-linecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {completedCount}/{totalLessons}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
