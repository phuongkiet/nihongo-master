import React, { useEffect, useRef, useState } from 'react';
import type { Lesson, UserProgress } from '../../types';
import { BookOpen, Check, Lock, Play } from 'lucide-react';

interface LearningRoadmapProps {
  progress: UserProgress;
  lessons: Lesson[];
  onResumeLesson: (lessonId: number) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({
  progress,
  lessons,
  onResumeLesson
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeNodeRef = useRef<HTMLButtonElement>(null);
  const [hoveredLessonId, setHoveredLessonId] = useState<number | null>(null);
  const [clickedLessonId, setClickedLessonId] = useState<number | null>(null);
  const [tooltipDirection, setTooltipDirection] = useState<'above' | 'below'>('above');

  // Find next lesson to resume (the first incomplete lesson)
  const nextLessonId = lessons.find(l => !progress.completedLessons.includes(l.id))?.id || 1;

  const rowHeight = 96; // Vertical distance between two nodes in px
  const totalLessons = lessons.length;

  // Auto-scroll to active lesson on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeNodeRef.current && containerRef.current) {
        const container = containerRef.current;
        const activeNode = activeNodeRef.current;

        const containerHeight = container.clientHeight;
        const nodeOffsetTop = activeNode.offsetTop;
        const nodeHeight = activeNode.clientHeight;

        const targetScrollTop = nodeOffsetTop - containerHeight / 2 + nodeHeight / 2;

        container.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth'
        });
      }
    }, 300); // Small timeout to ensure rendering is complete and dimensions are set

    return () => clearTimeout(timer);
  }, [nextLessonId]);

  // Formula to calculate zig-zag positions for each lesson
  // Cycle of 4: Left -> Center -> Right -> Center -> Left ...
  const getCoordinates = (index: number) => {
    const cycle = index % 4;
    let x = 50; // Center (in percentage coordinate)
    if (cycle === 0) x = 30; // Left offset
    else if (cycle === 2) x = 70; // Right offset

    const y = index * rowHeight + 64; // Center Y of the row in px (added top padding)
    return { x, y };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, lessonId: number, y: number) => {
    setHoveredLessonId(lessonId);
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const nodeRect = e.currentTarget.getBoundingClientRect();
      const spaceAbove = nodeRect.top - containerRect.top;
      
      // Flip below if we have less than 160px from the visible top edge of the scroll container
      if (spaceAbove < 160) {
        setTooltipDirection('below');
      } else {
        setTooltipDirection('above');
      }
    } else {
      setTooltipDirection(y < 120 ? 'below' : 'above');
    }
  };

  const handleNodeClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    lessonId: number,
    isLocked: boolean,
    y: number
  ) => {
    if (isLocked) {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const nodeRect = e.currentTarget.getBoundingClientRect();
        const spaceAbove = nodeRect.top - containerRect.top;
        if (spaceAbove < 160) {
          setTooltipDirection('below');
        } else {
          setTooltipDirection('above');
        }
      } else {
        setTooltipDirection(y < 120 ? 'below' : 'above');
      }

      // Toggle locked alert tooltip
      setClickedLessonId(clickedLessonId === lessonId ? null : lessonId);
      setTimeout(() => {
        setClickedLessonId(null);
      }, 3000); // Auto hide locked warning
      return;
    }
    onResumeLesson(lessonId);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 flex flex-col transition-all">
      {/* Roadmap Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h4 className="text-lg font-bold text-scholastic-navy flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            Lộ trình Bài học (Minna no Nihongo)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Hoàn thành các bài để mở khóa bài học tiếp theo theo sơ đồ dưới đây
          </p>
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/20"></span>
            <span>Đã học</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-100 border border-sky-400 animate-pulse"></span>
            <span>Đang học</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300"></span>
            <span>Chưa học</span>
          </div>
        </div>
      </div>

      {/* Roadmap Path Container */}
      <div
        ref={containerRef}
        className="relative h-[500px] overflow-y-auto overflow-x-hidden pr-1 border border-slate-100 rounded-2xl bg-slate-50/50"
      >
        <div
          className="relative w-full mx-auto max-w-md"
          style={{ height: `${totalLessons * rowHeight + 64}px` }}
        >
          {/* SVG Connecting Lines behind nodes */}
          <svg
            className="absolute inset-0 w-full h-full -z-10"
            style={{ pointerEvents: 'none' }}
            viewBox={`0 0 100 ${totalLessons * rowHeight + 64}`}
            preserveAspectRatio="none"
          >
            {lessons.map((_, index) => {
              if (index === totalLessons - 1) return null;

              const start = getCoordinates(index);
              const end = getCoordinates(index + 1);
              const nextLesson = lessons[index + 1];
              const isNextCompleted = progress.completedLessons.includes(nextLesson.id);
              const isNextActive = nextLesson.id === nextLessonId;

              // Color based on the state of the target (end) node
              let strokeColor = '#E2E8F0'; // Locked / Uncompleted = gray
              let strokeDash = '0';
              let strokeWidth = '4';

              if (isNextCompleted) {
                strokeColor = '#10B981'; // Completed = green
                strokeWidth = '5';
              } else if (isNextActive) {
                strokeColor = '#38BDF8'; // Active / In-progress = pastel blue
                strokeDash = '6,6';
                strokeWidth = '5';
              }

              return (
                <line
                  key={`line-${index}`}
                  x1={`${start.x}%`}
                  y1={start.y}
                  x2={`${end.x}%`}
                  y2={end.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Interactive Lesson Nodes */}
          {lessons.map((lesson, index) => {
            const coords = getCoordinates(index);
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isActive = lesson.id === nextLessonId;
            const isLocked = !isCompleted && !isActive;

            // Define node styles based on status
            let btnClass = '';
            let iconElement = null;

            if (isCompleted) {
              // Completed: Green / Emerald
              btnClass = 'bg-emerald-500 border-4 border-emerald-100 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 active:scale-95';
              iconElement = <Check className="w-5 h-5 stroke-[3px]" />;
            } else if (isActive) {
              // In-progress: Pastel Blue
              btnClass = 'bg-sky-100 border-4 border-sky-400 hover:bg-sky-200 text-sky-700 shadow-lg shadow-sky-400/40 active:scale-95 animate-[pulse_2s_infinite]';
              iconElement = <Play className="w-5 h-5 fill-current stroke-[2px] ml-0.5" />;
            } else {
              // Uncompleted / Locked: Gray
              btnClass = 'bg-slate-100 border-2 border-slate-200 text-slate-400 hover:bg-slate-200 hover:border-slate-300 cursor-not-allowed';
              iconElement = <Lock className="w-4 h-4 stroke-[2px]" />;
            }

            const isHovered = hoveredLessonId === lesson.id;
            const isWarningActive = clickedLessonId === lesson.id;
            
            // To prevent tooltip from being cut off at the top boundary of the container
            const isTooltipBelow = tooltipDirection === 'below';

            return (
              <div
                key={lesson.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  isHovered || isWarningActive ? 'z-50' : 'z-10 hover:z-20'
                }`}
                style={{
                  left: `${coords.x}%`,
                  top: `${coords.y}px`
                }}
                onMouseEnter={(e) => handleMouseEnter(e, lesson.id, coords.y)}
                onMouseLeave={() => setHoveredLessonId(null)}
              >
                {/* Outer decorative ring for Active lesson */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-sky-400/20 scale-150 animate-ping -z-10"></div>
                )}

                {/* Main Interactive Circle Node */}
                <button
                  ref={isActive ? activeNodeRef : null}
                  onClick={(e) => handleNodeClick(e, lesson.id, isLocked, coords.y)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-base tracking-tight transition-all duration-200 focus:outline-none ${btnClass}`}
                >
                  {isActive ? (
                    iconElement
                  ) : isCompleted ? (
                    hoveredLessonId === lesson.id ? iconElement : lesson.id
                  ) : (
                    lesson.id
                  )}
                </button>

                {/* Locked warning alert bubble */}
                {isWarningActive && (
                  <div className={`absolute ${isTooltipBelow ? 'top-full mt-3' : 'bottom-full mb-3'} left-1/2 transform -translate-x-1/2 z-40`}>
                    <div className="w-44 p-2 bg-red-500 text-white rounded-lg shadow-lg text-[11px] font-bold text-center animate-bounce relative">
                      <span className="block mb-0.5">🔒 Bài học đang khóa</span>
                      Hãy hoàn thành Bài {nextLessonId} trước!
                      <div className={`absolute ${isTooltipBelow ? 'bottom-full border-b-red-500' : 'top-full border-t-red-500'} left-1/2 transform -translate-x-1/2 border-[6px] border-transparent`}></div>
                    </div>
                  </div>
                )}

                {/* Lesson Info Tooltip */}
                {isHovered && !isWarningActive && (
                  <div className={`absolute ${isTooltipBelow ? 'top-full mt-3.5' : 'bottom-full mb-3.5'} left-1/2 transform -translate-x-1/2 z-30`}>
                    <div className="w-56 p-3 bg-slate-900 text-white rounded-xl shadow-xl animate-scale-in text-center relative">
                      <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                        Bài học {lesson.id}
                      </span>
                      <h5 className="font-extrabold text-sm text-white mt-0.5 leading-snug line-clamp-2">
                        {lesson.title.split(': ')[1] || lesson.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 italic block mt-0.5 truncate">
                        {lesson.titleVn}
                      </p>
                      
                      <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800">
                        <span>{lesson.vocabulary.length} từ vựng</span>
                        <span>•</span>
                        <span>{lesson.grammar.length} cấu trúc</span>
                      </div>

                      <div className="text-[10px] font-bold mt-2 text-indigo-400">
                        {isCompleted && '✨ Đã học - Nhấp để ôn lại'}
                        {isActive && '🚀 Đang học - Nhấp để bắt đầu'}
                        {isLocked && '🔒 Đang khóa - Cần mở khóa bài trước'}
                      </div>

                      {/* Small triangle arrow */}
                      <div className={`absolute ${isTooltipBelow ? 'bottom-full border-b-slate-900' : 'top-full border-t-slate-900'} left-1/2 transform -translate-x-1/2 border-[6px] border-transparent`}></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
