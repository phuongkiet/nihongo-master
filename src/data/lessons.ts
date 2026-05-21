import type { Lesson } from '../types';

export const lessonsData: Lesson[] = [
  {
    id: 1,
    title: "Lesson 01: Introduction & Greetings",
    titleVn: "Bài 1: Giới thiệu bản thân & Chào hỏi",
    vocabulary: [
      { jp: "私", kana: "わたし", romaji: "watashi", vn: "Tôi" },
      { jp: "あなた", kana: "あなた", romaji: "anata", vn: "Bạn, anh, chị (ngôi thứ 2)" },
      { jp: "あの人", kana: "あのひと", romaji: "ano hito", vn: "Người kia, người đó" },
      { jp: "あの方", kana: "あのかた", romaji: "ano kata", vn: "Vị kia (lịch sự của あの人)" },
      { jp: "～さん", kana: "～さん", romaji: "~san", vn: "Anh, chị, ông, bà (hậu tố lịch sự)" },
      { jp: "～ちゃん", kana: "～ちゃん", romaji: "~chan", vn: "Hậu tố cho trẻ em (thường là bé gái)" },
      { jp: "～くん", kana: "～くん", romaji: "~kun", vn: "Hậu tố cho bé trai/cấp dưới" },
      { jp: "～人", kana: "～じん", romaji: "~jin", vn: "Người (nước) ~" },
      { jp: "先生", kana: "せんせい", romaji: "sensei", vn: "Thầy, cô (không dùng tự xưng)" },
      { jp: "教師", kana: "きょうし", romaji: "kyoushi", vn: "Giáo viên (nghề nghiệp)" },
      { jp: "学生", kana: "がくせい", romaji: "gakusei", vn: "Học sinh, sinh viên" },
      { jp: "会社員", kana: "かいしゃいん", romaji: "kaishain", vn: "Nhân viên công ty" },
      { jp: "社員", kana: "しゃいん", romaji: "shain", vn: "Nhân viên của một công ty cụ thể" },
      { jp: "銀行員", kana: "ぎんこういん", romaji: "ginkouin", vn: "Nhân viên ngân hàng" },
      { jp: "医者", kana: "いしゃ", romaji: "isha", vn: "Bác sĩ" },
      { jp: "研究者", kana: "けんきゅうしゃ", romaji: "kenkyuusha", vn: "Nhân viên nghiên cứu" },
      { jp: "エンジニア", kana: "エンジニア", romaji: "enjinia", vn: "Kỹ sư" },
      { jp: "大学", kana: "だいがく", romaji: "daigaku", vn: "Trường đại học" },
      { jp: "病院", kana: "びょういん", romaji: "byouin", vn: "Bệnh viện" },
      { jp: "電気", kana: "でんき", romaji: "denki", vn: "Điện, đèn điện" },
      { jp: "だれ", kana: "だれ", romaji: "dare", vn: "Ai (Hỏi người)" },
      { jp: "どなた", kana: "どなた", romaji: "donata", vn: "Ai (Lịch sự)" },
      { jp: "～歳", kana: "～さい", romaji: "~sai", vn: "~ tuổi" },
      { jp: "何歳", kana: "なんさい", romaji: "nansai", vn: "Mấy tuổi (Hỏi tuổi)" },
      { jp: "はい", kana: "はい", romaji: "hai", vn: "Vâng, dạ" },
      { jp: "いいえ", kana: "いいえ", romaji: "iie", vn: "Không" }
    ],
    grammar: [
      {
        id: "1-1",
        point: "~ は ~ です",
        formula: "[Noun 1] は [Noun 2] です。",
        jpExplain: "「は」は提示の助詞で、文の主題を表します。「です」は断定や丁寧さを表します。",
        vnExplain: "[N1] là [N2]. 'wa' là trợ từ biểu thị chủ đề của câu. 'desu' đứng cuối câu khẳng định để thể hiện sự lịch sự.",
        exampleJp: "私は田中です。",
        exampleVn: "Tôi là Tanaka.",
        exerciseQuestion: "私はマイク・ミラー___です。",
        exerciseAnswer: "は",
        exerciseHint: "Trợ từ chỉ chủ ngữ (phát âm là 'wa')"
      },
      {
        id: "1-2",
        point: "~ は ~ じゃありません",
        formula: "[Noun 1] は [Noun 2] じゃありません。",
        jpExplain: "「です」の否定形です。日常会話では「じゃありません」を使い、フォーマルな場面では「ではありません」を使います。",
        vnExplain: "[N1] không phải là [N2]. Đây là dạng phủ định của 'desu'. Trong hội thoại hàng ngày dùng 'ja arimasen', trong văn viết hoặc trang trọng dùng 'de wa arimasen'.",
        exampleJp: "私は学生じゃありません。",
        exampleVn: "Tôi không phải là sinh viên.",
        exerciseQuestion: "サントスさんは会社員___ありません。",
        exerciseAnswer: "じゃ",
        exerciseHint: "Điền từ phủ định dạng ngắn trước 'arimasen'"
      },
      {
        id: "1-3",
        point: "~ ですか",
        formula: "[Noun 1] は [Noun 2] ですか。",
        jpExplain: "文末に「か」をつけることで、疑問文になります。",
        vnExplain: "[N1] có phải là [N2] không? Bằng cách thêm trợ từ 'ka' vào cuối câu khẳng định, câu sẽ trở thành câu hỏi.",
        exampleJp: "あなたは会社員ですか。",
        exampleVn: "Bạn là nhân viên công ty phải không?",
        exerciseQuestion: "あの方はどなたです___。",
        exerciseAnswer: "か",
        exerciseHint: "Trợ từ nghi vấn đặt ở cuối câu"
      },
      {
        id: "1-4",
        point: "~ も",
        formula: "[Noun] も",
        jpExplain: "すでに述べたことと同じ内容である場合に、助詞「は」の代わりに使います。",
        vnExplain: "[N] cũng... Dùng trợ từ 'mo' thay cho 'wa' khi danh từ đó có cùng đặc điểm hoặc tính chất với danh từ đã được đề cập trước đó.",
        exampleJp: "ミラーさんは会社員です。サントスさんも会社員です。",
        exampleVn: "Anh Miller là nhân viên công ty. Anh Santos cũng là nhân viên công ty.",
        exerciseQuestion: "ワンさんも先生___です。",
        exerciseAnswer: "も",
        exerciseHint: "Trợ từ mang ý nghĩa 'cũng'"
      },
      {
        id: "1-5",
        point: "~ の ~",
        formula: "[Noun 1] の [Noun 2]",
        jpExplain: "「の」は名詞と名詞をつなぎます。第1課では、[N1] が [N2] の所属であることを表します。",
        vnExplain: "[N2] của/thuộc về [N1]. Trợ từ 'no' dùng để nối hai danh từ. Trong bài 1, nó biểu thị N2 thuộc về tổ chức N1.",
        exampleJp: "私はＩＭＣの社員です。",
        exampleVn: "Tôi là nhân viên của công ty IMC.",
        exerciseQuestion: "私は大学___教師です。",
        exerciseAnswer: "の",
        exerciseHint: "Trợ từ sở hữu hoặc thuộc về tổ chức"
      }
    ],
    phrases: [
      { id: "1-p1", jp: "初めまして。私はマイです。ベトナムから来ました。", vn: "Rất vui được gặp bạn. Tôi là Mai. Tôi đến từ Việt Nam." },
      { id: "1-p2", jp: "山田さんはエンジニアじゃありません。医者です。", vn: "Anh Yamada không phải là kỹ sư. Anh ấy là bác sĩ." },
      { id: "1-p3", jp: "あの人はどなたですか。...ワットさんです。", vn: "Vị kia là ai vậy? ...Là ông Watt." }
    ]
  },
  {
    id: 2,
    title: "Lesson 02: Things, Possessions & Ownership",
    titleVn: "Bài 2: Đồ vật, Sở hữu & Thuộc sở hữu",
    vocabulary: [
      { jp: "これ", kana: "これ", romaji: "kore", vn: "Cái này, đây (gần người nói)" },
      { jp: "それ", kana: "それ", romaji: "sore", vn: "Cái đó, đó (gần người nghe)" },
      { jp: "あれ", kana: "あれ", romaji: "are", vn: "Cái kia, kia (xa cả hai người)" },
      { jp: "この～", kana: "この", romaji: "kono", vn: "~ này (đi kèm danh từ)" },
      { jp: "その～", kana: "その", romaji: "sono", vn: "~ đó (đi kèm danh từ)" },
      { jp: "あの～", kana: "あの", romaji: "ano", vn: "~ kia (đi kèm danh từ)" },
      { jp: "本", kana: "ほん", romaji: "hon", vn: "Sách" },
      { jp: "辞書", kana: "じしょ", romaji: "jisho", vn: "Từ điển" },
      { jp: "雑誌", kana: "ざっし", romaji: "zasshi", vn: "Tạp chí" },
      { jp: "新聞", kana: "しんぶん", romaji: "shinbun", vn: "Báo" },
      { jp: "ノート", kana: "ノート", romaji: "no-to", vn: "Vở, sổ tay" },
      { jp: "手帳", kana: "てちょう", romaji: "techou", vn: "Sổ tay cá nhân" },
      { jp: "名刺", kana: "めいし", romaji: "meishi", vn: "Danh thiếp" },
      { jp: "カード", kana: "カード", romaji: "ka-do", vn: "Thẻ, card" },
      { jp: "鉛筆", kana: "えんぴつ", romaji: "enpitsu", vn: "Bút chì" },
      { jp: "ボールペン", kana: "ボールペン", romaji: "bo-rupen", vn: "Bút bi" },
      { jp: "鍵", kana: "かぎ", romaji: "kagi", vn: "Chìa khóa" },
      { jp: "時計", kana: "とけい", romaji: "tokei", vn: "Đồng hồ" },
      { jp: "傘", kana: "かさ", romaji: "kasa", vn: "Ô, dù" },
      { jp: "鞄", kana: "かばん", romaji: "kaban", vn: "Cặp sách, túi xách" }
    ],
    grammar: [
      {
        id: "2-1",
        point: "これ / それ / あれ",
        formula: "これ / それ / あれ は [Noun] です。",
        jpExplain: "これ、それ、あれは指示代名詞です。話者と聞き手の距離によって使い分けます。",
        vnExplain: "Đây / Đó / Kia là [N]. 'Kore' (gần người nói), 'Sore' (gần người nghe), 'Are' (xa cả hai).",
        exampleJp: "これは辞書です。",
        exampleVn: "Đây là từ điển.",
        exerciseQuestion: "___は私のカバンです。(Chỉ vật gần người nghe)",
        exerciseAnswer: "それ",
        exerciseHint: "Đại từ chỉ vật gần người nghe"
      },
      {
        id: "2-2",
        point: "この / その / あの N",
        formula: "この / その / あの [Noun] は [Adjective/Noun] です。",
        jpExplain: "名詞を直接修飾する指示詞です。必ず名詞が後ろに来ます。",
        vnExplain: "Này / Đó / Kia [N]... Đi kèm trực tiếp với danh từ để chỉ rõ đồ vật đó.",
        exampleJp: "この本は私のです。",
        exampleVn: "Cuốn sách này là của tôi.",
        exerciseQuestion: "___ノートは英語のノートです。(Chỉ cuốn vở gần người nói)",
        exerciseAnswer: "この",
        exerciseHint: "Từ chỉ định đi kèm danh từ gần người nói"
      }
    ],
    phrases: [
      { id: "2-p1", jp: "これは何ですか。...ボールペンです。", vn: "Đây là cái gì vậy? ...Là bút bi." },
      { id: "2-p2", jp: "この手帳はあなたのですか。...いいえ、違います。", vn: "Sổ tay này có phải của bạn không? ...Không, không phải." }
    ]
  },
  {
    id: 3,
    title: "Lesson 03: Places, Directions & Locations",
    titleVn: "Bài 3: Địa điểm, Phương hướng & Vị trí",
    vocabulary: [
      { jp: "ここ", kana: "ここ", romaji: "koko", vn: "Chỗ này, đây (gần người nói)" },
      { jp: "そこ", kana: "そこ", romaji: "soko", vn: "Chỗ đó, đó (gần người nghe)" },
      { jp: "あそこ", kana: "あそこ", romaji: "asoko", vn: "Chỗ kia, kia (xa cả hai)" },
      { jp: "どこ", kana: "どこ", romaji: "doko", vn: "Chỗ nào, đâu" },
      { jp: "こちら", kana: "こちら", romaji: "kochira", vn: "Phía này (lịch sự của ここ)" },
      { jp: "そちら", kana: "そちら", romaji: "sochira", vn: "Phía đó (lịch sự của そこ)" },
      { jp: "あちら", kana: "あちら", romaji: "achira", vn: "Phía kia (lịch sự của あそこ)" },
      { jp: "どちら", kana: "どちら", romaji: "dochira", vn: "Phía nào, hướng nào (lịch sự của どこ)" },
      { jp: "教室", kana: "きょうしつ", romaji: "kyoushitsu", vn: "Lớp học" },
      { jp: "食堂", kana: "しょくどう", romaji: "shokudou", vn: "Nhà ăn, phòng ăn" },
      { jp: "事務所", kana: "じむしょ", romaji: "jimusho", vn: "Văn phòng" },
      { jp: "会議室", kana: "かいぎしつ", romaji: "kaigishitsu", vn: "Phòng họp" },
      { jp: "受付", kana: "うけつけ", romaji: "uketsuke", vn: "Bàn tiếp tân, thường trực" },
      { jp: "ロビー", kana: "ロビー", romaji: "robi-", vn: "Hành lang, đại sảnh" },
      { jp: "部屋", kana: "へや", romaji: "heya", vn: "Căn phòng" }
    ],
    grammar: [
      {
        id: "3-1",
        point: "ここ / そこ / あそこ は N です",
        formula: "ここ / そこ / あそこ は [Place] です。",
        jpExplain: "場所を表す指示代名詞です。話者と聞き手の位置関係で使い分けます。",
        vnExplain: "Đây / Đó / Kia là [Địa điểm]. Chỉ địa điểm dựa vào khoảng cách người nói/người nghe.",
        exampleJp: "ここは食堂です。",
        exampleVn: "Chỗ này là nhà ăn.",
        exerciseQuestion: "___は教室です。(Chỉ nơi xa cả hai người)",
        exerciseAnswer: "あそこ",
        exerciseHint: "Đại từ chỉ địa điểm ở xa cả người nói và nghe"
      }
    ],
    phrases: [
      { id: "3-p1", jp: "お手洗いはどこですか。...あそこです。", vn: "Nhà vệ sinh ở đâu vậy? ...Chỗ kia kìa." },
      { id: "3-p2", jp: "エレベーターはどちらですか。...こちらです。", vn: "Thang máy ở hướng nào ạ? ...Hướng này ạ." }
    ]
  },
  // Stubbing lessons 4 to 50
  ...Array.from({ length: 47 }, (_, i): Lesson => {
    const lessonNum = i + 4;
    const isN4 = lessonNum > 25;
    const levelStr = isN4 ? "N4" : "N5";
    
    // Standard Minna titles just for a nice realistic look
    const mockTitles: Record<number, {en: string, vn: string}> = {
      4: { en: "Time, Dates & Daily Routine", vn: "Giờ giấc, Ngày tháng & Hoạt động hàng ngày" },
      5: { en: "Movement, Transport & Companion", vn: "Sự di chuyển, Phương tiện & Bạn đồng hành" },
      6: { en: "Verbs, Actions & Objects", vn: "Động từ, Hành động & Tân ngữ" },
      7: { en: "Tools, Means, Giving & Receiving", vn: "Công cụ, Phương tiện, Cho & Nhận" },
      8: { en: "Adjectives (Qualities & States)", vn: "Tính từ (Tính chất & Trạng thái)" },
      9: { en: "Preferences, Abilities & Ownership", vn: "Sở thích, Khả năng & Sở hữu" },
      10: { en: "Existence of People, Animals & Things", vn: "Sự tồn tại của Người, Động vật & Đồ vật" },
      11: { en: "Counters, Quantifiers & Duration", vn: "Lượng từ, Số đếm & Thời gian học" },
      12: { en: "Past Tense of Adjectives & Nouns", vn: "Quá khứ của Tính từ & Danh từ" },
      13: { en: "Desires, Intentions & Purposes", vn: "Mong muốn, Ý định & Mục đích" },
      14: { en: "Requesting & Te-form Introduction", vn: "Yêu cầu & Giới thiệu thể Te" },
      15: { en: "Permissions, Prohibitions & Current States", vn: "Cho phép, Cấm đoán & Trạng thái hiện tại" },
      16: { en: "Combining Sentences & Sequences", vn: "Kết hợp câu & Trình tự hành động" },
      17: { en: "Negative Requesting & Nai-form", vn: "Yêu cầu phủ định & Thể Nai" },
      18: { en: "Abilities, Hobbies & Dictionary-form", vn: "Khả năng, Sở thích & Thể từ điển" },
      19: { en: "Experiences & Ta-form", vn: "Kinh nghiệm & Thể Ta" },
      20: { en: "Polite vs. Casual Style Speech", vn: "Thể lịch sự & Thể thông thường" },
      21: { en: "Opinions, Thoughts & Quotes", vn: "Ý kiến, Suy nghĩ & Trích dẫn" },
      22: { en: "Noun Modifying Clauses", vn: "Mệnh đề bổ nghĩa danh từ" },
      23: { en: "Conditions, Paths & Time Clauses", vn: "Điều kiện, Đường đi & Mệnh đề thời gian" },
      24: { en: "Giving & Receiving Favor Verbs", vn: "Động từ cho nhận hành động (Trợ giúp)" },
      25: { en: "Conditional Clauses (Tara-form)", vn: "Mệnh đề điều kiện (Thể Tara)" },
      // N4 Lessons 26 - 50
      26: { en: "Explaining Reasons & Asking for Advice", vn: "Giải thích lý do & Xin lời khuyên" },
      27: { en: "Ability & Potential Verbs", vn: "Khả năng & Động từ thể khả năng" },
      28: { en: "Simultaneous Actions & Habitation", vn: "Hành động song song & Thói quen" },
      29: { en: "Intransitive Verbs & State Description", vn: "Tự động từ & Mô tả trạng thái" },
      30: { en: "Transitive Verbs & Preparatory Actions", vn: "Tha động từ & Hành động chuẩn bị sẵn" },
      31: { en: "Volitional Form & Future Intentions", vn: "Thể ý chí & Ý định tương lai" },
      32: { en: "Suggestions, Predictions & Advice", vn: "Gợi ý, Dự đoán & Khuyên bảo" },
      33: { en: "Imperative & Prohibitive Forms", vn: "Thể mệnh lệnh & Thể cấm đoán" },
      34: { en: "Following Instructions & Sequences", vn: "Làm theo chỉ dẫn & Trình tự" },
      35: { en: "Conditional Forms (Ba-form)", vn: "Thể điều kiện (Thể Ba)" },
      36: { en: "Aims, Objectives & Habit Changes", vn: "Mục tiêu, Mục đích & Thay đổi thói quen" },
      37: { en: "Passive Voice Verbs", vn: "Động từ thể bị động" },
      38: { en: "Noun-ifying Clauses (No & Koto)", vn: "Danh từ hóa mệnh đề (No & Koto)" },
      39: { en: "Expressing Causes, Reasons & Emotions", vn: "Biểu đạt nguyên nhân, Lý do & Cảm xúc" },
      40: { en: "Embedded Questions & Uncertainty", vn: "Câu hỏi lồng & Sự không chắc chắn" },
      41: { en: "Giving & Receiving to Superiors/Inferiors", vn: "Cho và nhận kính ngữ/khiêm nhường ngữ" },
      42: { en: "Purpose, Usefulness & Preparation", vn: "Mục đích sử dụng & Chuẩn bị" },
      43: { en: "Appearances & Immediate Activities", vn: "Vẻ bề ngoài & Hoạt động sắp diễn ra" },
      44: { en: "Excessiveness & Ease/Difficulty", vn: "Sự quá mức & Dễ/Khó làm gì" },
      45: { en: "Hypothetical Scenarios (Baai/Nonido)", vn: "Tình huống giả định (Trường hợp)" },
      46: { en: "Aspects of Time & Completion Status", vn: "Các khía cạnh thời gian & Trạng thái hoàn thành" },
      47: { en: "Hearsay, Reports & Signs", vn: "Tin đồn, Báo cáo & Dấu hiệu" },
      48: { en: "Causative Voice Verbs", vn: "Động từ thể sai khiến" },
      49: { en: "Honorific Speech (Sonkeigo)", vn: "Kính ngữ (Sonkeigo)" },
      50: { en: "Humble Speech (Kenjougo)", vn: "Khiêm nhường ngữ (Kenjougo)" }
    };

    const titleEn = mockTitles[lessonNum]?.en || `Lesson ${lessonNum.toString().padStart(2, '0')} Content`;
    const titleVn = mockTitles[lessonNum]?.vn || `Bài ${lessonNum}: Nội dung bài học`;

    return {
      id: lessonNum,
      title: `Lesson ${lessonNum.toString().padStart(2, '0')}: ${titleEn} (${levelStr})`,
      titleVn: titleVn,
      vocabulary: [
        { jp: "本", kana: "ほん", romaji: "hon", vn: "Sách" },
        { jp: "車", kana: "くるま", romaji: "kuruma", vn: "Xe hơi, ô tô" },
        { jp: "水", kana: "みず", romaji: "mizu", vn: "Nước" }
      ],
      grammar: [
        {
          id: `${lessonNum}-1`,
          point: `Grammar Point Lesson ${lessonNum}`,
          formula: `Formula ${lessonNum}`,
          jpExplain: `Explanation in Japanese for lesson ${lessonNum}.`,
          vnExplain: `Giải thích ngữ pháp Tiếng Việt cho bài ${lessonNum}.`,
          exampleJp: "これは本です。",
          exampleVn: "Đây là cuốn sách."
        }
      ],
      phrases: [
        { id: `${lessonNum}-p1`, jp: "こんにちは。", vn: "Xin chào." }
      ]
    };
  })
];
