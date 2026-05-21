import React from 'react';

interface HeatmapProps {
  data: Record<string, number>; // "YYYY-MM-DD" -> count
}

export const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  // Generate the last 365 days of dates
  const generateDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    // Start from 364 days ago to have exactly 365 days (52 weeks + 1 day)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    // Align start date to the beginning of that week (Sunday = 0)
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const currentDate = new Date(startDate);
    const endDate = new Date(today);
    // Align end date to the end of the current week (Saturday)
    const endDayOfWeek = endDate.getDay();
    endDate.setDate(endDate.getDate() + (6 - endDayOfWeek));

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dates = generateDates();

  // Format Date to YYYY-MM-DD in local time
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Group dates by week (arrays of 7 days)
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  dates.forEach((date) => {
    currentWeek.push(date);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Get color depending on value
  const getColorClass = (count: number) => {
    if (!count || count === 0) return 'bg-slate-100 hover:bg-slate-200';
    if (count === 1) return 'bg-emerald-200 text-emerald-800 hover:bg-emerald-300';
    if (count === 2) return 'bg-emerald-300 text-emerald-900 hover:bg-emerald-400';
    if (count === 3) return 'bg-emerald-400 text-emerald-950 hover:bg-emerald-500';
    return 'bg-emerald-600 text-white hover:bg-emerald-700'; // high intensity
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Find where months start to render month labels above the columns
  const getMonthLabels = () => {
    const labels: { text: string; index: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, index) => {
      const firstDayOfWeek = week[0];
      const month = firstDayOfWeek.getMonth();
      if (month !== lastMonth && index % 4 === 0) { // Render label every ~4 weeks if month changed
        labels.push({ text: monthNames[month], index });
        lastMonth = month;
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 w-full animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-scholastic-navy flex items-center gap-2">
          <svg className="w-5 h-5 text-scholastic-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Study History (Học tập hằng ngày)
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Less</span>
          <div className="w-3.5 h-3.5 rounded bg-slate-100"></div>
          <div className="w-3.5 h-3.5 rounded bg-emerald-200"></div>
          <div className="w-3.5 h-3.5 rounded bg-emerald-300"></div>
          <div className="w-3.5 h-3.5 rounded bg-emerald-400"></div>
          <div className="w-3.5 h-3.5 rounded bg-emerald-600"></div>
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="min-w-[720px] flex flex-col">
          {/* Month Labels */}
          <div className="flex text-[10px] text-slate-400 font-medium mb-1.5 h-4 relative">
            <div className="w-8 shrink-0"></div> {/* Placeholder for day labels spacer */}
            <div className="flex flex-1 relative">
              {monthLabels.map((label, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={{ left: `${(label.index / weeks.length) * 100}%` }}
                >
                  {label.text}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-1.5">
            {/* Day Labels */}
            <div className="flex flex-col justify-between text-[10px] text-slate-400 font-medium w-8 py-0.5 pr-1.5 shrink-0 text-right">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Grid Columns (Weeks) */}
            <div className="flex flex-1 gap-1.5 justify-between">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5 flex-1">
                  {week.map((date, dIdx) => {
                    const dateStr = formatDate(date);
                    const count = data[dateStr] || 0;
                    return (
                      <div
                        key={dIdx}
                        title={`${date.toLocaleDateString()}: Completed ${count} activities`}
                        className={`aspect-square w-full min-w-[12px] rounded-sm transition-all duration-200 cursor-pointer ${getColorClass(count)}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
