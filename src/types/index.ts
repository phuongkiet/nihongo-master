export interface VocabItem {
  jp: string;
  kana: string;
  romaji: string;
  vn: string;
}

export interface GrammarPoint {
  id: string;
  point: string;
  formula: string;
  jpExplain: string;
  vnExplain: string;
  exampleJp: string;
  exampleVn: string;
  // Fill-in-the-blank exercise for grammar
  exerciseQuestion?: string; // e.g. "私は田中___です。"
  exerciseAnswer?: string; // e.g. "は"
  exerciseHint?: string; // e.g. "Chủ ngữ trợ từ"
}

export interface PracticePhrase {
  id: string;
  jp: string;
  vn: string;
}

export interface Lesson {
  id: number;
  title: string;
  titleVn: string;
  vocabulary: VocabItem[];
  grammar: GrammarPoint[];
  phrases: PracticePhrase[];
}

export interface Question {
  id: string;
  text: string;
  options?: string[]; // Multiple choice
  correctAnswer: string; // "A", "B", "C", "D" or direct word string
  explanation: string;
  category: 'vocabulary' | 'grammar' | 'reading';
  passage?: string; // For reading questions
}

export interface Exam {
  id: string;
  name: string;
  level: 'N5' | 'N4';
  durationMinutes: number;
  questions: Question[];
}

export interface UserProgress {
  completedLessons: number[]; // Array of lesson IDs e.g. [1, 2]
  completedExams: Record<string, number>; // Exam ID -> Score
  completedReviewCount: number; // Flashcards completed count
  streakDays: number;
  heatmapData: Record<string, number>; // "YYYY-MM-DD" -> Completed events count
}
