export interface TeFormResult {
  masuForm: string;
  teForm: string;
  group: 1 | 2 | 3;
  rule: string;
}

// Danh sách các từ ngoại lệ Nhóm 2 (kết thúc bằng cột i nhưng thuộc nhóm 2)
const GROUP_2_EXCEPTIONS = [
  'みます', // 見ます
  'おきます', // 起きます
  'かします', // 借ります - wait 借ります is karimasu
  'かります', // 借ります
  'おります', // 降ります
  'あびます', // 浴びます
  'います', // います
  'できます', // できます
  'きます', // 着ます (to wear)
  'たります', // 足ります
  'おちます', // 落ちます
  'しんじます', // 信じます
];

// Danh sách các từ ngoại lệ Nhóm 3 (kết thúc bằng きます hoặc します nhưng không phải nhóm 1)
// Cụ thể, các danh từ + します là nhóm 3.
// きます (to come) là nhóm 3.
const isGroup3 = (word: string) => {
  if (word === 'します' || word === 'きます') return true;
  if (word.endsWith('します')) return true; // VD: べんきょうします, けっこんします
  if (word.endsWith('きます') && word !== 'いきます' && word.length >= 4) {
    // VD: もってきます, つれてきます là nhóm 3
    if (word.endsWith('てきます')) return true;
  }
  return false;
};

export const cleanToPureHiragana = (word: string): string => {
  // 1. Remove brackets like [いすに～] and spaces
  let s = word.replace(/\[.*?\]/g, '').replace(/\s+/g, '').trim();

  // 2. Clean Kanji + Furigana in parentheses, e.g. 鳴（な） => な
  const kanjiRegex = /([々〇\u4e00-\u9faf\u3400-\u4dbf\uf900-\ufaff]+)[（\(]([^）\)]+)[）\)]/g;
  s = s.replace(kanjiRegex, '$2');

  // 3. Clean Hiragana + Furigana in parentheses, e.g. な（な） => な
  const hiraganaRegex = /([あ-んア-ン]+)[（\(]([^）\)]+)[）\)]/g;
  s = s.replace(hiraganaRegex, (_, p1, p2) => {
    if (p1.endsWith(p2)) {
      return p1;
    }
    return p2;
  });

  return s;
};

export const getTeForm = (masuWord: string): TeFormResult => {
  // Loại bỏ các ký tự đặc biệt, lấy phần hiragana/kanji chính sạch sẽ
  let cleanWord = cleanToPureHiragana(masuWord);

  if (!cleanWord.endsWith('ます')) {
    return {
      masuForm: masuWord,
      teForm: cleanWord,
      group: 1,
      rule: 'Không phải thể masu'
    };
  }

  // Ngoại lệ đặc biệt của Nhóm 1
  if (cleanWord === 'いきます') { // 行きます
    return {
      masuForm: masuWord,
      teForm: 'いって',
      group: 1,
      rule: 'Ngoại lệ: いきます => いって'
    };
  }

  if (isGroup3(cleanWord)) {
    // Nhóm 3: します => して, きます => きて
    let te = cleanWord.replace('します', 'して').replace('きます', 'きて');
    return {
      masuForm: masuWord,
      teForm: te,
      group: 3,
      rule: 'Nhóm 3: します => して, きます => きて'
    };
  }

  if (GROUP_2_EXCEPTIONS.includes(cleanWord) || GROUP_2_EXCEPTIONS.some(ex => cleanWord.endsWith(ex))) {
    // Nhóm 2 ngoại lệ
    return {
      masuForm: masuWord,
      teForm: cleanWord.replace('ます', 'て'),
      group: 2,
      rule: 'Nhóm 2 (Đặc biệt): Bỏ ます thêm て'
    };
  }

  // Kiểm tra âm trước ます
  const preMasu = cleanWord.charAt(cleanWord.length - 3);

  // Nhóm 2: Âm e + ます
  const eColumn = ['え', 'け', 'せ', 'て', 'ね', 'へ', 'め', 'れ', 'げ', 'ぜ', 'で', 'べ', 'ぺ'];
  if (eColumn.includes(preMasu)) {
    return {
      masuForm: masuWord,
      teForm: cleanWord.replace('ます', 'て'),
      group: 2,
      rule: 'Nhóm 2 (Âm E): Bỏ ます thêm て'
    };
  }

  // Nhóm 1: Âm i + ます
  if (['い', 'ち', 'り'].includes(preMasu)) {
    return {
      masuForm: masuWord,
      teForm: cleanWord.slice(0, -3) + 'って',
      group: 1,
      rule: 'Nhóm 1: い、ち、り => って'
    };
  }
  if (['み', 'び', 'に'].includes(preMasu)) {
    return {
      masuForm: masuWord,
      teForm: cleanWord.slice(0, -3) + 'んで',
      group: 1,
      rule: 'Nhóm 1: み、び、に => んで'
    };
  }
  if (preMasu === 'き') {
    return {
      masuForm: masuWord,
      teForm: cleanWord.slice(0, -3) + 'いて',
      group: 1,
      rule: 'Nhóm 1: き => いて'
    };
  }
  if (preMasu === 'ぎ') {
    return {
      masuForm: masuWord,
      teForm: cleanWord.slice(0, -3) + 'いで',
      group: 1,
      rule: 'Nhóm 1: ぎ => いで'
    };
  }
  if (preMasu === 'し') {
    return {
      masuForm: masuWord,
      teForm: cleanWord.slice(0, -3) + 'して',
      group: 1,
      rule: 'Nhóm 1: し => して'
    };
  }

  // Fallback
  return {
    masuForm: masuWord,
    teForm: cleanWord.replace('ます', 'て'),
    group: 1,
    rule: 'Fallback: Bỏ ます thêm て'
  };
};
