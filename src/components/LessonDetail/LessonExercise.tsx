import React, { useState, useEffect, useMemo } from 'react';
import type { Lesson, VocabItem } from '../../types';
import { Check, X, Award, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Token {
  text: string;
  isVocab: boolean;
  vocabItem?: VocabItem;
}

export function tokenizeText(text: string, vocabList: VocabItem[], isJapanese: boolean): Token[] {
  if (!text) return [];
  
  // Sort vocabulary descending by length to avoid partial matches
  const sortedVocab = [...vocabList]
    .filter(v => isJapanese ? v.jp : v.vn)
    .sort((a, b) => {
      const lenA = isJapanese ? a.jp.length : a.vn.length;
      const lenB = isJapanese ? b.jp.length : b.vn.length;
      return lenB - lenA;
    });

  let tokens: Token[] = [{ text, isVocab: false }];

  for (const vocab of sortedVocab) {
    const searchStr = isJapanese ? vocab.jp : vocab.vn;
    if (!searchStr) continue;

    const nextTokens: Token[] = [];
    for (const token of tokens) {
      if (token.isVocab) {
        nextTokens.push(token);
        continue;
      }

      const parts = token.text.split(searchStr);
      if (parts.length > 1) {
        parts.forEach((part, idx) => {
          if (part) {
            nextTokens.push({ text: part, isVocab: false });
          }
          if (idx < parts.length - 1) {
            nextTokens.push({
              text: searchStr,
              isVocab: true,
              vocabItem: vocab
            });
          }
        });
      } else {
        nextTokens.push(token);
      }
    }
    tokens = nextTokens;
  }

  return tokens;
}

interface InteractiveTextProps {
  text: string;
  vocabList: VocabItem[];
  isJapanese: boolean;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({ text, vocabList, isJapanese }) => {
  const tokens = useMemo(() => tokenizeText(text, vocabList, isJapanese), [text, vocabList, isJapanese]);

  return (
    <>
      {tokens.map((token, idx) => {
        if (!token.isVocab || !token.vocabItem) {
          return <span key={idx} className="inline">{token.text}</span>;
        }

        const v = token.vocabItem;
        let hint = '';
        if (isJapanese) {
          hint = v.kana !== v.jp ? `${v.kana}: ${v.vn}` : v.vn;
        } else {
          hint = v.kana !== v.jp ? `${v.jp} (${v.kana})` : v.jp;
        }

        return (
          <span
            key={idx}
            className="inline-block relative group border-b-2 border-dotted border-indigo-400 hover:border-indigo-600 hover:text-indigo-600 cursor-help transition-all duration-200"
          >
            {token.text}
            {/* Centered Positioning Wrapper */}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
              {/* Animated Tooltip Bubble */}
              <span className="relative block bg-slate-900 text-white text-xs font-sans rounded-xl py-2 px-3 shadow-xl whitespace-nowrap animate-scale-in">
                {hint}
              </span>
              {/* Centered Indicator Arrow */}
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
            </span>
          </span>
        );
      })}
    </>
  );
};

export interface ExerciseQuestion {
  id: string;
  type: 'vocab_jp_vn' | 'vocab_vn_jp' | 'vocab_matching' | 'grammar_translate' | 'grammar_fill';
  prompt: string;
  correctAnswer: string;
  options?: string[];
  hint?: string;
  matchingPairs?: { jp: string; vn: string }[];
}

interface LessonExerciseProps {
  lesson: Lesson;
  allLessons: Lesson[];
  onCompletePractice: (score: number) => void;
  onBack: () => void;
}

// Normalize Japanese text for comparison
export function normalizeJapanese(text: string): string {
  return text
    .replace(/[\u3000-\u303F\uFF00-\uFFEF\s.,\/#!$%\^&\*;:{}=\-_`~()?"'。、・？！]/g, '')
    .trim()
    .toLowerCase();
}

// Convert Kanji example sentence to Hiragana using lesson vocabulary
export function convertToHiragana(text: string, vocabList: VocabItem[]): string {
  let result = text;
  
  // Sort vocab descending by length to replace longer words first and avoid partial matches
  const sortedVocab = [...vocabList].sort((a, b) => b.jp.length - a.jp.length);
  for (const vocab of sortedVocab) {
    if (vocab.jp && vocab.kana && vocab.jp !== vocab.kana) {
      result = result.replaceAll(vocab.jp, vocab.kana);
    }
  }

  // Common basic mappings for Minna no Nihongo Lesson 1 & 2
  const commonMappings: Record<string, string> = {
    '私': 'わたし',
    '学生': 'がくせい',
    '先生': 'せんせい',
    '教師': 'きょうし',
    '会社員': 'かいしゃいん',
    '社員': 'しゃいん',
    '銀行員': 'ぎんこういん',
    '研究者': 'けんきゅうしゃ',
    '医者': 'いしゃ',
    '大学': 'だいがく',
    '病院': 'びょういん',
    '電気': 'でんき',
    '何歳': 'なんさい',
    '車': 'くるま',
    '本': 'ほん',
    '辞書': 'じしょ',
    '雑誌': 'ざっし',
    '新聞': 'しんぶん',
    '手帳': 'てちょう',
    '名刺': 'めいし',
    '鉛筆': 'えんぴつ',
    '時計': 'とけい',
    '傘': 'かさ',
    '鞄': 'かばん',
    '机': 'つくえ',
    '椅子': 'いす',
    '日本語': 'にほんご',
    '英語': 'えいご',
    'お土産': 'おみやげ',
    'お名前': 'おなまえ',
    '初めまして': 'はじめまして',
    '来ました': 'きました',
    'お願いします': 'おねがいします',
    '違います': 'ちがいます'
  };

  for (const [kanji, kana] of Object.entries(commonMappings)) {
    result = result.replaceAll(kanji, kana);
  }

  return result;
}

export const LessonExercise: React.FC<LessonExerciseProps> = ({
  lesson,
  allLessons,
  onCompletePractice,
  onBack
}) => {
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'summary'>('welcome');
  const [questions, setQuestions] = useState<ExerciseQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Scoring & Stats
  const [score, setScore] = useState(0);
  
  // Answering states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  
  // Feedback states
  const [checkState, setCheckState] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Matching game sub-states
  const [shuffledPairs, setShuffledPairs] = useState<{ jp: string[]; vn: string[] }>({ jp: [], vn: [] });
  const [selectedJp, setSelectedJp] = useState<string | null>(null);
  const [selectedVn, setSelectedVn] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [wrongJp, setWrongJp] = useState<string | null>(null);
  const [wrongVn, setWrongVn] = useState<string | null>(null);

  // Generate mixed questions round
  const startPractice = () => {
    const generated = generateChallengeQuestions(lesson, allLessons);
    setQuestions(generated);
    setCurrentIdx(0);
    setScore(0);
    setCheckState('idle');
    setSelectedOption(null);
    setTextInput('');
    setGameState('playing');
  };

  // Compile mixed questions
  const generateChallengeQuestions = (les: Lesson, lessons: Lesson[]): ExerciseQuestion[] => {
    const list: ExerciseQuestion[] = [];
    const vocab = les.vocabulary;
    const grammar = les.grammar;

    // Distractor puller
    const getDistractors = (item: VocabItem, isJp: boolean, count: number): string[] => {
      const sameLesson = vocab.filter(v => v.jp !== item.jp);
      const candidates: string[] = sameLesson.map(v => isJp ? v.jp : v.vn);

      if (candidates.length < count) {
        lessons.forEach(l => {
          l.vocabulary.forEach(v => {
            const val = isJp ? v.jp : v.vn;
            if (val && val !== (isJp ? item.jp : item.vn) && !candidates.includes(val)) {
              candidates.push(val);
            }
          });
        });
      }

      return candidates.sort(() => Math.random() - 0.5).slice(0, count);
    };

    // 1. Easy Tier: Vocabulary MCQs (12 questions)
    // 6x JP -> VN MCQs
    if (vocab.length > 0) {
      const shuffledJpVn = [...vocab].sort(() => Math.random() - 0.5);
      for (let i = 0; i < 6; i++) {
        const v = shuffledJpVn[i % shuffledJpVn.length];
        const correct = v.vn;
        const distractors = getDistractors(v, false, 3);
        const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
        list.push({
          id: `vocab_jp_vn_${i}_${Date.now()}`,
          type: 'vocab_jp_vn',
          prompt: v.jp,
          correctAnswer: correct,
          options,
          hint: v.kana !== v.jp ? `${v.kana} (${v.romaji})` : v.romaji
        });
      }

      // 6x VN -> JP MCQs
      const shuffledVnJp = [...vocab].sort(() => Math.random() - 0.5);
      for (let i = 0; i < 6; i++) {
        const v = shuffledVnJp[i % shuffledVnJp.length];
        const correct = v.jp;
        const distractors = getDistractors(v, true, 3);
        const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
        list.push({
          id: `vocab_vn_jp_${i}_${Date.now()}`,
          type: 'vocab_vn_jp',
          prompt: v.vn,
          correctAnswer: correct,
          options,
          hint: v.kana !== v.jp ? `${v.kana} (${v.romaji})` : v.romaji
        });
      }
    }

    // 2. Medium Tier: 2x Matching and 4x Fill-in-the-blank (6 questions total)
    // 2x Matching Games
    if (vocab.length > 0) {
      for (let m = 0; m < 2; m++) {
        let matchedItems = [...vocab].sort(() => Math.random() - 0.5).slice(0, 4);
        if (matchedItems.length < 4) {
          lessons.forEach(l => {
            l.vocabulary.forEach(v => {
              if (matchedItems.length < 4 && !matchedItems.some(mi => mi.jp === v.jp)) {
                matchedItems.push(v);
              }
            });
          });
        }
        list.push({
          id: `matching_vocab_${m}_${Date.now()}`,
          type: 'vocab_matching',
          prompt: 'Nối từ tiếng Nhật với nghĩa tiếng Việt tương ứng:',
          correctAnswer: '',
          matchingPairs: matchedItems.map(v => ({ jp: v.jp, vn: v.vn }))
        });
      }
    }

    // 4x Grammar Fill-in-the-blank
    const fillQuestions: ExerciseQuestion[] = [];
    const exerciseGPoints = grammar.filter(g => g.exerciseQuestion && g.exerciseAnswer);
    const shuffledPredefined = [...exerciseGPoints].sort(() => Math.random() - 0.5);
    shuffledPredefined.forEach((g, i) => {
      fillQuestions.push({
        id: `grammar_fill_pre_${i}_${Date.now()}`,
        type: 'grammar_fill',
        prompt: g.exerciseQuestion || '',
        correctAnswer: g.exerciseAnswer || '',
        hint: g.exerciseHint
      });
    });

    if (fillQuestions.length < 4 && grammar.length > 0) {
      const particles = ['は', 'の', 'も', 'に', 'で', 'を', 'が', 'か'];
      const shuffledGrammar = [...grammar].sort(() => Math.random() - 0.5);
      let fallbackIdx = 0;

      for (const g of shuffledGrammar) {
        if (fillQuestions.length >= 4) break;
        const sentence = g.exampleJp;
        for (const p of particles) {
          if (sentence.includes(p) && sentence.indexOf(p) > 0 && sentence.indexOf(p) < sentence.length - 2) {
            const prompt = sentence.replace(p, '___');
            if (!fillQuestions.some(q => q.prompt === prompt)) {
              fillQuestions.push({
                id: `grammar_fill_dyn_${fallbackIdx}_${Date.now()}`,
                type: 'grammar_fill',
                prompt,
                correctAnswer: p,
                hint: `Trợ từ biểu diễn trong câu: ${g.point.split(' (')[0]}`
              });
              fallbackIdx++;
              break;
            }
          }
        }
      }
    }

    if (fillQuestions.length < 4) {
      let fallbackIdx = 0;
      lessons.forEach(l => {
        if (fillQuestions.length >= 4) return;
        l.grammar.forEach(g => {
          if (fillQuestions.length >= 4) return;
          if (g.exerciseQuestion && g.exerciseAnswer) {
            fillQuestions.push({
              id: `grammar_fill_fallback_${l.id}_${fallbackIdx}_${Date.now()}`,
              type: 'grammar_fill',
              prompt: g.exerciseQuestion,
              correctAnswer: g.exerciseAnswer,
              hint: g.exerciseHint
            });
            fallbackIdx++;
          }
        });
      });
    }

    list.push(...fillQuestions.slice(0, 4));

    // 3. Hard Tier: VN -> JP Sentence Translation (2 questions)
    const translationQuestions: ExerciseQuestion[] = [];
    if (grammar.length > 0) {
      const shuffledGrammarForTrans = [...grammar].sort(() => Math.random() - 0.5);
      shuffledGrammarForTrans.forEach((g, i) => {
        if (translationQuestions.length < 2 && g.exampleVn && g.exampleJp) {
          translationQuestions.push({
            id: `grammar_trans_${i}_${Date.now()}`,
            type: 'grammar_translate',
            prompt: g.exampleVn,
            correctAnswer: g.exampleJp,
            hint: `Mẫu ngữ pháp: ${g.point.split(' (')[0]}`
          });
        }
      });
    }

    if (translationQuestions.length < 2) {
      let fallbackIdx = 0;
      lessons.forEach(l => {
        if (translationQuestions.length >= 2) return;
        l.grammar.forEach(g => {
          if (translationQuestions.length >= 2) return;
          if (g.exampleVn && g.exampleJp) {
            translationQuestions.push({
              id: `grammar_trans_fallback_${fallbackIdx}_${Date.now()}`,
              type: 'grammar_translate',
              prompt: g.exampleVn,
              correctAnswer: g.exampleJp,
              hint: `Mẫu ngữ pháp: ${g.point.split(' (')[0]}`
            });
            fallbackIdx++;
          }
        });
      });
    }

    list.push(...translationQuestions.slice(0, 2));

    // Final shuffle to mix Easy, Medium, and Hard questions in random order
    return list.sort(() => Math.random() - 0.5);
  };

  const currentQuestion = questions[currentIdx];

  // Set up matching shuffle when question loads
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'vocab_matching' && currentQuestion.matchingPairs) {
      const jps = currentQuestion.matchingPairs.map(p => p.jp).sort(() => Math.random() - 0.5);
      const vns = currentQuestion.matchingPairs.map(p => p.vn).sort(() => Math.random() - 0.5);
      setShuffledPairs({ jp: jps, vn: vns });
      setMatchedPairs([]);
      setSelectedJp(null);
      setSelectedVn(null);
      setWrongJp(null);
      setWrongVn(null);
    }
  }, [currentIdx, currentQuestion]);

  const handleJpClick = (word: string) => {
    if (checkState !== 'idle' || matchedPairs.includes(word)) return;
    setWrongJp(null);
    setWrongVn(null);
    setSelectedJp(word);

    if (selectedVn) {
      checkMatch(word, selectedVn);
    }
  };

  const handleVnClick = (meaning: string) => {
    if (checkState !== 'idle') return;
    const correspondingJp = currentQuestion.matchingPairs?.find(p => p.vn === meaning)?.jp || '';
    if (matchedPairs.includes(correspondingJp)) return;
    
    setWrongJp(null);
    setWrongVn(null);
    setSelectedVn(meaning);

    if (selectedJp) {
      checkMatch(selectedJp, meaning);
    }
  };

  const checkMatch = (jpWord: string, vnMeaning: string) => {
    const isCorrect = currentQuestion.matchingPairs?.some(p => p.jp === jpWord && p.vn === vnMeaning);

    if (isCorrect) {
      const nextMatched = [...matchedPairs, jpWord];
      setMatchedPairs(nextMatched);
      setSelectedJp(null);
      setSelectedVn(null);

      // Play minor confetti on matching success
      confetti({
        particleCount: 8,
        spread: 20,
        origin: { y: 0.8 }
      });

      if (nextMatched.length === (currentQuestion.matchingPairs?.length || 0)) {
        setCheckState('correct');
        setScore(prev => prev + 1);
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.85 }
        });
      }
    } else {
      setWrongJp(jpWord);
      setWrongVn(vnMeaning);
      setSelectedJp(null);
      setSelectedVn(null);
    }
  };

  // Submit assessment handler
  const handleCheck = () => {
    if (checkState !== 'idle') return;

    if (currentQuestion.type === 'vocab_jp_vn' || currentQuestion.type === 'vocab_vn_jp') {
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      if (isCorrect) {
        setCheckState('correct');
        setScore(prev => prev + 1);
        confetti({
          particleCount: 15,
          spread: 30,
          origin: { y: 0.8 }
        });
      } else {
        setCheckState('incorrect');
      }
    } else if (currentQuestion.type === 'grammar_fill') {
      const isCorrect = textInput.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
      if (isCorrect) {
        setCheckState('correct');
        setScore(prev => prev + 1);
        confetti({
          particleCount: 15,
          spread: 30,
          origin: { y: 0.8 }
        });
      } else {
        setCheckState('incorrect');
      }
    } else if (currentQuestion.type === 'grammar_translate') {
      const cleanUser = normalizeJapanese(textInput);
      const cleanCorrect = normalizeJapanese(currentQuestion.correctAnswer);
      
      // Dynamic Hiragana Conversion using unique vocabulary items from all lessons
      const uniqueVocabMap = new Map<string, VocabItem>();
      allLessons.forEach(l => {
        l.vocabulary.forEach(v => {
          if (v.jp) {
            uniqueVocabMap.set(v.jp, v);
          }
        });
      });
      const allVocabList = Array.from(uniqueVocabMap.values());
      const correctHiragana = convertToHiragana(currentQuestion.correctAnswer, allVocabList);
      const cleanHiragana = normalizeJapanese(correctHiragana);

      const isCorrect = cleanUser === cleanCorrect || cleanUser === cleanHiragana;
      
      if (isCorrect) {
        setCheckState('correct');
        setScore(prev => prev + 1);
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.8 }
        });
      } else {
        setCheckState('incorrect');
      }
    }
  };

  const handleContinue = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setCheckState('idle');
      setSelectedOption(null);
      setTextInput('');
    } else {
      // Completed! Show summary
      setGameState('summary');
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Register heatmap practice completed!
      onCompletePractice(score);
    }
  };

  // Determine if check is clickable
  const isCheckDisabled = useMemo(() => {
    if (checkState !== 'idle') return true;
    if (currentQuestion?.type === 'vocab_jp_vn' || currentQuestion?.type === 'vocab_vn_jp') {
      return selectedOption === null;
    }
    if (currentQuestion?.type === 'grammar_fill' || currentQuestion?.type === 'grammar_translate') {
      return textInput.trim() === '';
    }
    if (currentQuestion?.type === 'vocab_matching') {
      return matchedPairs.length < (currentQuestion.matchingPairs?.length || 0);
    }
    return true;
  }, [checkState, currentQuestion, selectedOption, textInput, matchedPairs]);

  return (
    <div className="max-w-[700px] mx-auto min-h-[500px] flex flex-col justify-between py-6">
      
      {/* 1. WELCOME SCREEN */}
      {gameState === 'welcome' && (
        <div className="bg-white rounded-3xl p-8 shadow-soft border border-slate-100 text-center flex flex-col items-center justify-center my-auto animate-scale-in">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-scholastic-sakura mb-6 shadow-sm shadow-pink-100">
            <Sparkles className="w-8 h-8 fill-current" />
          </div>
          
          <h2 className="text-2xl font-display font-extrabold text-scholastic-navy mb-2">
            Luyện tập Bài {lesson.id}
          </h2>
          <p className="text-slate-500 font-medium text-sm max-w-sm mb-8 leading-relaxed">
            Thử thách bản thân với 8 câu hỏi ngẫu nhiên bao gồm trắc nghiệm từ vựng, ghép đôi và dịch câu ngữ pháp!
          </p>

          {/* Quick breakdown list */}
          <div className="bg-slate-50 rounded-2xl p-5 w-full max-w-md text-left mb-8 space-y-3.5 border border-slate-100">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Mục tiêu bài tập</h4>
            
            <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
              <span className="w-5 h-5 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">A</span>
              Nhận diện Từ vựng 4 đáp án (Nhật - Việt & Việt - Nhật)
            </div>
            <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
              <span className="w-5 h-5 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-xs">B</span>
              Game Matching ghép đôi từ nhanh
            </div>
            <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
              <span className="w-5 h-5 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-xs">C</span>
              Điền khuyết trợ từ ngữ pháp
            </div>
            <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
              <span className="w-5 h-5 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-xs">D</span>
              Viết câu dịch Việt - Nhật (Nhận cả Kanji & Hiragana!)
            </div>
          </div>

          <div className="flex gap-4 w-full max-w-md justify-center">
            <button
              onClick={onBack}
              className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-500 hover:border-slate-300 font-bold text-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              Hủy bỏ
            </button>
            <button
              onClick={startPractice}
              className="flex-[2] py-3.5 rounded-2xl bg-scholastic-sakura text-white hover:bg-pink-500 font-extrabold text-sm transition-all shadow-md shadow-pink-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              Bắt đầu học <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. PLAYING PANEL */}
      {gameState === 'playing' && currentQuestion && (
        <div className="flex-1 flex flex-col justify-between">
          
          {/* Top progress bar */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Câu {currentIdx + 1} / {questions.length}
              </span>
              <span className="text-xs font-bold text-indigo-500">
                Đúng {score} câu
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
              <div 
                className="h-full bg-scholastic-matcha rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question View */}
          <div className="flex-1 flex flex-col justify-center py-4 animate-scale-in">
            
            {/* TYPE 1: JP TO VN MCQ */}
            {currentQuestion.type === 'vocab_jp_vn' && (
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-wider mb-4">
                  Chọn nghĩa phù hợp cho từ:
                </span>
                
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-8 max-w-sm mx-auto shadow-inner">
                  <h3 className="japanese-text text-4xl mb-2">
                    <InteractiveText text={currentQuestion.prompt} vocabList={lesson.vocabulary} isJapanese={true} />
                  </h3>
                  {currentQuestion.hint && (
                    <span className="text-xs text-slate-400 font-bold block">{currentQuestion.hint}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {currentQuestion.options?.map((option, oIdx) => {
                    const isSelected = selectedOption === option;
                    return (
                      <button
                        key={oIdx}
                        disabled={checkState !== 'idle'}
                        onClick={() => setSelectedOption(option)}
                        className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all text-center flex items-center justify-center gap-3 active:scale-[0.98] ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-800 shadow-md'
                            : 'border-slate-200 hover:border-indigo-300 text-slate-700 bg-white hover:bg-slate-5/50'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 font-black text-xs flex items-center justify-center shrink-0">
                          {oIdx + 1}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TYPE 2: VN TO JP MCQ */}
            {currentQuestion.type === 'vocab_vn_jp' && (
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 rounded-xl text-[10px] font-black uppercase tracking-wider mb-4">
                  Chọn từ tiếng Nhật tương ứng:
                </span>
                
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-8 max-w-md mx-auto shadow-inner">
                  <h3 className="text-xl font-bold text-slate-700 leading-snug">
                    <InteractiveText text={currentQuestion.prompt} vocabList={lesson.vocabulary} isJapanese={false} />
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  {currentQuestion.options?.map((option, oIdx) => {
                    const isSelected = selectedOption === option;
                    return (
                      <button
                        key={oIdx}
                        disabled={checkState !== 'idle'}
                        onClick={() => setSelectedOption(option)}
                        className={`p-4 rounded-2xl border-2 text-base font-bold transition-all text-center flex items-center justify-center gap-3 active:scale-[0.98] ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-800 shadow-md'
                            : 'border-slate-200 hover:border-indigo-300 text-slate-700 bg-white hover:bg-slate-5/50'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 font-black text-xs flex items-center justify-center shrink-0">
                          {oIdx + 1}
                        </span>
                        <span className="japanese-text font-bold text-lg">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TYPE 3: MATCHING GIRD */}
            {currentQuestion.type === 'vocab_matching' && (
              <div>
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 rounded-xl text-[10px] font-black uppercase tracking-wider mb-2">
                    Luyện tập phản xạ ghép từ:
                  </span>
                  <h3 className="text-base font-bold text-slate-600">{currentQuestion.prompt}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mt-2">
                  
                  {/* Left Japanese List */}
                  <div className="space-y-3">
                    {shuffledPairs.jp.map((word) => {
                      const isMatched = matchedPairs.includes(word);
                      const isSelected = selectedJp === word;
                      const isWrong = wrongJp === word;

                      return (
                        <button
                          key={word}
                          disabled={isMatched || checkState !== 'idle'}
                          onClick={() => handleJpClick(word)}
                          className={`w-full p-4 rounded-2xl border-2 text-center text-lg font-bold transition-all select-none ${
                            isMatched
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-600 cursor-not-allowed opacity-50 flex items-center justify-center gap-2'
                              : isSelected
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md scale-[1.02]'
                              : isWrong
                              ? 'border-red-400 bg-red-50 text-red-600 animate-shake'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                          }`}
                        >
                          {isMatched && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                          <span className="japanese-text">{word}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Vietnamese List */}
                  <div className="space-y-3">
                    {shuffledPairs.vn.map((meaning) => {
                      const corrJp = currentQuestion.matchingPairs?.find(p => p.vn === meaning)?.jp || '';
                      const isMatched = matchedPairs.includes(corrJp);
                      const isSelected = selectedVn === meaning;
                      const isWrong = wrongVn === meaning;

                      return (
                        <button
                          key={meaning}
                          disabled={isMatched || checkState !== 'idle'}
                          onClick={() => handleVnClick(meaning)}
                          className={`w-full p-4 rounded-2xl border-2 text-center text-sm font-bold transition-all select-none min-h-[58px] flex items-center justify-center gap-2 ${
                            isMatched
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-600 cursor-not-allowed opacity-50'
                              : isSelected
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md scale-[1.02]'
                              : isWrong
                              ? 'border-red-400 bg-red-50 text-red-600 animate-shake'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                          }`}
                        >
                          {isMatched && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                          <span>{meaning}</span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              </div>
            )}

            {/* TYPE 4: GRAMMAR TRANSLATION */}
            {currentQuestion.type === 'grammar_translate' && (
              <div className="text-center max-w-lg mx-auto w-full">
                <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 rounded-xl text-[10px] font-black uppercase tracking-wider mb-4">
                  Dịch câu tiếng Việt này sang tiếng Nhật:
                </span>

                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-6 shadow-inner text-center">
                  <h3 className="text-lg font-bold text-slate-700">
                    <InteractiveText text={currentQuestion.prompt} vocabList={lesson.vocabulary} isJapanese={false} />
                  </h3>
                </div>

                <div className="relative mb-3">
                  <textarea
                    rows={2}
                    value={textInput}
                    disabled={checkState !== 'idle'}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Viết câu tiếng Nhật bằng Kanji hoặc Hiragana..."
                    className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-600 text-center font-semibold text-lg font-jp resize-none bg-white transition-all shadow-soft"
                  />
                </div>
                {currentQuestion.hint && (
                  <p className="text-xs text-slate-400 italic font-medium">{currentQuestion.hint}</p>
                )}
                <p className="text-[10px] text-indigo-400/80 font-bold uppercase mt-2 tracking-wider">
                  * Hệ thống chấp nhận cả cách viết Kanji, Hiragana và Katakana tương ứng!
                </p>
              </div>
            )}

            {/* TYPE 5: GRAMMAR FILL IN BLANK */}
            {currentQuestion.type === 'grammar_fill' && (
              <div className="text-center max-w-lg mx-auto w-full">
                <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-wider mb-4">
                  Điền từ/trợ từ còn thiếu vào ô trống:
                </span>

                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-6 shadow-inner text-center">
                  <h3 className="japanese-text text-2xl tracking-wide select-none leading-relaxed flex items-center justify-center flex-wrap gap-2">
                    <InteractiveText text={currentQuestion.prompt.split('___')[0]} vocabList={lesson.vocabulary} isJapanese={true} />
                    <input
                      type="text"
                      value={textInput}
                      disabled={checkState !== 'idle'}
                      onChange={(e) => setTextInput(e.target.value)}
                      className={`w-20 text-center py-1 border-b-4 font-bold font-jp text-2xl focus:outline-none ${
                        checkState === 'correct'
                          ? 'border-emerald-500 text-emerald-600 bg-emerald-50 rounded-lg animate-scale-in'
                          : checkState === 'incorrect'
                          ? 'border-red-400 text-red-500 bg-red-50 rounded-lg animate-shake'
                          : 'border-slate-300 focus:border-indigo-600 bg-white/70'
                      }`}
                    />
                    <InteractiveText text={currentQuestion.prompt.split('___')[1]} vocabList={lesson.vocabulary} isJapanese={true} />
                  </h3>
                </div>
                {currentQuestion.hint && (
                  <p className="text-xs text-slate-400 italic font-bold">Gợi ý: {currentQuestion.hint}</p>
                )}
              </div>
            )}

          </div>

          {/* BOTTOM CHECKING BAR */}
          <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300">
            {checkState === 'idle' ? (
              <div className="bg-white border-t border-slate-200 px-6 py-5 flex justify-center">
                <div className="max-w-[700px] w-full flex items-center justify-between gap-6">
                  <span className="hidden sm:inline-block text-xs font-bold text-slate-400">
                    Chọn đáp án của bạn để tiếp tục
                  </span>
                  
                  {currentQuestion.type === 'vocab_matching' ? (
                    <button
                      onClick={handleContinue}
                      disabled={isCheckDisabled}
                      className="px-8 py-3.5 rounded-2xl bg-scholastic-matcha text-white hover:bg-emerald-600 font-extrabold text-sm shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none transition-all active:scale-95 w-full sm:w-auto"
                    >
                      Xác nhận ghép đôi
                    </button>
                  ) : (
                    <button
                      onClick={handleCheck}
                      disabled={isCheckDisabled}
                      className="px-8 py-3.5 rounded-2xl bg-scholastic-navy text-white hover:bg-indigo-950 font-extrabold text-sm shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none transition-all active:scale-95 w-full sm:w-auto"
                    >
                      Kiểm Tra Đáp Án
                    </button>
                  )}
                </div>
              </div>
            ) : checkState === 'correct' ? (
              <div className="bg-emerald-50 border-t-2 border-emerald-100 px-6 py-5 flex justify-center animate-scale-in">
                <div className="max-w-[700px] w-full flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="w-5 h-5 stroke-[3px]" />
                    </div>
                    <div>
                      <h4 className="text-emerald-800 font-black text-base">Chính xác! Xuất sắc quá!</h4>
                      <p className="text-emerald-600 text-xs font-bold">Hãy tiếp tục phát huy nhé!</p>
                    </div>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="px-8 py-3.5 rounded-2xl bg-scholastic-matcha text-white hover:bg-emerald-600 font-extrabold text-sm shadow-md shadow-emerald-500/10 transition-all active:scale-95 w-full sm:w-auto"
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border-t-2 border-red-100 px-6 py-5 flex justify-center animate-scale-in">
                <div className="max-w-[700px] w-full flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-sm mt-0.5 shrink-0">
                      <X className="w-5 h-5 stroke-[3px]" />
                    </div>
                    <div>
                      <h4 className="text-red-800 font-black text-base">Chưa chính xác rồi...</h4>
                      <div className="text-red-600 text-xs font-bold mt-0.5">
                        <span>Đáp án đúng là: </span>
                        <strong className="font-jp underline text-sm ml-1 select-all">{currentQuestion.correctAnswer}</strong>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="px-8 py-3.5 rounded-2xl bg-red-500 text-white hover:bg-red-600 font-extrabold text-sm shadow-md transition-all active:scale-95 w-full sm:w-auto"
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dummy element to make sure sticky bar doesn't overlap questions */}
          <div className="h-28"></div>

        </div>
      )}

      {/* 3. SUMMARY RESULT */}
      {gameState === 'summary' && (
        <div className="bg-white rounded-3xl p-8 shadow-premium border border-slate-100 text-center flex flex-col items-center justify-center my-auto max-w-md mx-auto animate-scale-in">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-6 shadow-md shadow-amber-100/50">
            <Award className="w-10 h-10 fill-current" />
          </div>

          <h2 className="text-2xl font-display font-extrabold text-scholastic-navy mb-2">
            Hoàn thành Luyện tập!
          </h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">
            Bài học số {lesson.id}
          </p>

          {/* Metric list */}
          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            <div className="bg-emerald-50/50 border border-emerald-50 rounded-2xl p-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Số câu chính xác</span>
              <span className="text-emerald-700 font-extrabold text-2xl">{score} / {questions.length}</span>
            </div>
            <div className="bg-blue-50/50 border border-blue-50 rounded-2xl p-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Điểm nhận được</span>
              <span className="text-indigo-700 font-extrabold text-2xl">+5 XP</span>
            </div>
          </div>

          {/* Performance quote */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-500 mb-8 max-w-sm">
            {score === questions.length ? (
              <span className="text-emerald-600 font-black">🌟 Thật hoàn hảo! Bạn đã xuất sắc làm đúng 100% các câu hỏi!</span>
            ) : score >= questions.length * 0.7 ? (
              <span className="text-indigo-600">👏 Tuyệt vời! Bạn nắm vững từ vựng và ngữ pháp bài học này rất tốt!</span>
            ) : (
              <span>📚 Khá lắm! Hãy ôn lại và thử luyện tập thêm để làm tốt hơn nhé!</span>
            )}
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={startPractice}
              className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4 text-slate-400" /> Học lại
            </button>
            <button
              onClick={onBack}
              className="flex-[2] py-3.5 rounded-2xl bg-scholastic-navy text-white hover:bg-indigo-950 font-extrabold text-sm transition-all shadow-md active:scale-95"
            >
              Đóng và tiếp tục
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
