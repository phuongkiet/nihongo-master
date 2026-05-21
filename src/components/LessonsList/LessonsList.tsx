import React, { useState } from 'react';
import type { Lesson, Exam, UserProgress } from '../../types';
import { Search, Book, GraduationCap, CheckCircle2, Circle, Clock } from 'lucide-react';

interface LessonsListProps {
  lessons: Lesson[];
  exams: Exam[];
  progress: UserProgress;
  onSelectLesson: (lessonId: number) => void;
  onSelectExam: (examId: string) => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({
  lessons,
  exams,
  progress,
  onSelectLesson,
  onSelectExam
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'lessons' | 'exams'>('lessons');
  const [levelFilter, setLevelFilter] = useState<'all' | 'n5' | 'n4'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering lessons
  const filteredLessons = lessons.filter((lesson) => {
    const isN4 = lesson.id > 25;
    const matchLevel = 
      levelFilter === 'all' || 
      (levelFilter === 'n5' && !isN4) || 
      (levelFilter === 'n4' && isN4);

    const text = `${lesson.title} ${lesson.titleVn}`.toLowerCase();
    const matchSearch = text.includes(searchQuery.toLowerCase());

    return matchLevel && matchSearch;
  });

  // Filtering exams
  const filteredExams = exams.filter((exam) => {
    const matchLevel = 
      levelFilter === 'all' || 
      (levelFilter === 'n5' && exam.level === 'N5') || 
      (levelFilter === 'n4' && exam.level === 'N4');

    const text = `${exam.name} ${exam.level}`.toLowerCase();
    const matchSearch = text.includes(searchQuery.toLowerCase());

    return matchLevel && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Filter Control bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-soft border border-slate-100">
        {/* Hub Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl self-start">
          <button
            onClick={() => setActiveSubTab('lessons')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'lessons'
                ? 'bg-white text-scholastic-navy shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Book className="w-4 h-4" />
            Minna no Nihongo (1-50)
          </button>
          <button
            onClick={() => setActiveSubTab('exams')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'exams'
                ? 'bg-white text-scholastic-navy shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Đề Thi Thử JLPT
          </button>
        </div>

        {/* Search, Level and Actions */}
        <div className="flex flex-1 md:justify-end gap-3 flex-wrap">
          {/* Level Filter Dropdown */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['all', 'n5', 'n4'].map((level) => (
              <button
                key={level}
                onClick={() => setLevelFilter(level as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  levelFilter === level
                    ? 'bg-white text-scholastic-navy shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {level === 'all' ? 'Tất cả N' : level}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-xs min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder={activeSubTab === 'lessons' ? "Tìm kiếm bài học..." : "Tìm kiếm đề thi..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-scholastic-navy/20 focus:border-scholastic-navy transition-all"
            />
          </div>
        </div>
      </div>

      {/* Render Lessons Grid */}
      {activeSubTab === 'lessons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isN4 = lesson.id > 25;
            
            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`bg-white rounded-2xl p-5 border shadow-soft hover:shadow-premium hover:border-indigo-100 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Visual indicator side banner */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  isCompleted ? 'bg-scholastic-matcha' : 'bg-slate-200 group-hover:bg-indigo-300'
                }`}></div>

                <div>
                  <div className="flex items-center justify-between mb-3 pl-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                      isN4 ? 'bg-pink-50 text-scholastic-sakura' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {isN4 ? 'JLPT N4' : 'JLPT N5'}
                    </span>

                    {isCompleted ? (
                      <span className="text-xs font-bold text-scholastic-matcha flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 fill-emerald-50" />
                        Đã học xong
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 group-hover:text-indigo-600">
                        <Circle className="w-4 h-4 text-slate-200" />
                        Chưa học
                      </span>
                    )}
                  </div>

                  <div className="pl-2 mb-4">
                    <h4 className="font-display font-extrabold text-lg text-scholastic-navy group-hover:text-indigo-800 transition-colors mb-1">
                      Bài {lesson.id}: {lesson.title.split(': ')[1] || lesson.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium italic">{lesson.titleVn}</p>
                  </div>
                </div>

                <div className="pl-2 border-t border-slate-50 pt-4 flex items-center justify-between">
                  <div className="flex gap-4 text-slate-400 text-xs font-medium">
                    <span>{lesson.vocabulary.length} Từ vựng</span>
                    <span>{lesson.grammar.length} Cấu trúc</span>
                  </div>
                  
                  <span className="text-xs font-bold text-scholastic-navy bg-slate-50 px-3 py-1.5 rounded-lg group-hover:bg-scholastic-navy group-hover:text-white transition-all">
                    Vào Học
                  </span>
                </div>
              </div>
            );
          })}

          {filteredLessons.length === 0 && (
            <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-slate-100 shadow-soft text-slate-400 italic">
              Không tìm thấy bài học nào phù hợp.
            </div>
          )}
        </div>
      )}

      {/* Render Exams Grid */}
      {activeSubTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam) => {
            const highScore = progress.completedExams[exam.id];
            const hasTaken = highScore !== undefined;
            const passingScore = Math.ceil(exam.questions.length * 0.6); // 60% standard pass
            const passed = hasTaken && highScore >= passingScore;

            return (
              <div
                key={exam.id}
                onClick={() => onSelectExam(exam.id)}
                className="bg-white rounded-2xl p-5 border shadow-soft hover:shadow-premium hover:border-emerald-100 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Border line indicator */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  passed ? 'bg-scholastic-matcha' : hasTaken ? 'bg-red-400' : 'bg-slate-200 group-hover:bg-indigo-300'
                }`}></div>

                <div>
                  <div className="flex items-center justify-between mb-3 pl-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                      exam.level === 'N4' ? 'bg-pink-50 text-scholastic-sakura' : 'bg-blue-50 text-blue-600'
                    }`}>
                      JLPT {exam.level}
                    </span>

                    {hasTaken ? (
                      <span className={`text-xs font-bold flex items-center gap-1 ${
                        passed ? 'text-scholastic-matcha' : 'text-red-500'
                      }`}>
                        {passed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        {passed ? 'Đạt' : 'Không đạt'} ({highScore}/{exam.questions.length} câu)
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 group-hover:text-indigo-600">
                        Chưa làm
                      </span>
                    )}
                  </div>

                  <div className="pl-2 mb-4">
                    <h4 className="font-display font-extrabold text-lg text-scholastic-navy group-hover:text-emerald-800 transition-colors mb-2">
                      {exam.name}
                    </h4>
                    <div className="flex items-center gap-3 text-slate-400 text-xs">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.durationMinutes} phút</span>
                      <span>•</span>
                      <span>{exam.questions.length} câu hỏi</span>
                    </div>
                  </div>
                </div>

                <div className="pl-2 border-t border-slate-50 pt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    Điểm đạt yêu cầu: <span className="font-bold text-slate-600">{passingScore}/{exam.questions.length} câu</span>
                  </span>
                  
                  <span className="text-xs font-bold text-scholastic-navy bg-slate-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    Bắt đầu làm bài
                  </span>
                </div>
              </div>
            );
          })}

          {filteredExams.length === 0 && (
            <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-slate-100 shadow-soft text-slate-400 italic">
              Không tìm thấy đề thi thử nào phù hợp.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
