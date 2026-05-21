import type { Exam } from '../types';

export const examsData: Exam[] = [
  {
    id: "n5-mock-1",
    name: "JLPT N5 Standard Mock Exam 01",
    level: "N5",
    durationMinutes: 25,
    questions: [
      {
        id: "n5-1-1",
        text: "あの【人】はどなたですか。Chọn cách đọc Kanji trong ngoặc 【 】.",
        options: ["ひと (hito)", "かた (kata)", "ともだち (tomodachi)", "こども (kodomo)"],
        correctAnswer: "A",
        explanation: "【人】 đọc là ひと (hito), nghĩa là 'người'. あの人はどなたですか có nghĩa là 'Vị kia/Người kia là ai vậy?'.",
        category: "vocabulary"
      },
      {
        id: "n5-1-2",
        text: "Chọn chữ Kanji đúng cho từ: 【いしゃ】(bác sĩ).",
        options: ["医者", "教師", "社員", "研究者"],
        correctAnswer: "A",
        explanation: "【医者】 đọc là いしゃ (isha) nghĩa là bác sĩ. 教師 (kyoushi) là giáo viên, 社員 (shain) là nhân viên công ty, 研究者 (kenkyuusha) là nhà nghiên cứu.",
        category: "vocabulary"
      },
      {
        id: "n5-1-3",
        text: "ミラーさんは IMC ___ 社員です。Điền trợ từ thích hợp vào chỗ trống.",
        options: ["は (wa)", "の (no)", "が (ga)", "も (mo)"],
        correctAnswer: "B",
        explanation: "Dùng trợ từ 'の' để chỉ thuộc tính sở hữu hoặc thuộc về tổ chức. 'IMC の社員' là nhân viên của công ty IMC.",
        category: "grammar"
      },
      {
        id: "n5-1-4",
        text: "ワンさんは学生ですか。...いいえ、学生___。",
        options: ["です", "じゃありません", "ですか", "ではありませんでした"],
        correctAnswer: "B",
        explanation: "Câu phủ định ở hiện tại dùng 'じゃありません' hoặc 'ではありません'. Phù hợp với câu trả lời bác bỏ 'いいえ'.",
        category: "grammar"
      },
      {
        id: "n5-1-5",
        text: "サントスさんはブラジルから___。Điền từ phù hợp để hoàn thành câu chào hỏi.",
        options: ["きました (kimashita)", "いきます (ikimasu)", "かえります (kaerimasu)", "きましたか (kimashitaka)"],
        correctAnswer: "A",
        explanation: "Cấu trúc '[Địa điểm] から 来ました (kimashita)' có nghĩa là 'Đến từ [địa điểm]'.",
        category: "grammar"
      },
      {
        id: "n5-1-6",
        text: "Đọc đoạn văn sau và trả lời câu hỏi:\n\n「はじめまして。私はタワポンです。タイから来ました。バンコク大学の学生です。専攻はコンピュータです。よろしくお願いします。」\n\nQ: タワポンさんは何ですか。",
        options: [
          "バンコク大学の先生 (Giáo viên đại học Bangkok)",
          "タイの会社員 (Nhân viên công ty Thái Lan)",
          "コンピュータの学生 (Sinh viên ngành máy tính)",
          "日本語の教師 (Giáo viên tiếng Nhật)"
        ],
        correctAnswer: "C",
        explanation: "Đoạn văn viết: 'バンコク大学の学生です。専攻はコンピュータです' (Tôi là sinh viên đại học Bangkok. Chuyên ngành là máy tính). Do đó Tawapon là sinh viên máy tính.",
        category: "reading",
        passage: "はじめまして。私はタワポンです。タイから来ました。バンコク大学의学生です。専攻はコンピュータです。よろしくお願いします。"
      },
      {
        id: "n5-1-7",
        text: "Chọn Kanji đúng cho: 【せんせい】.",
        options: ["学生", "先生", "教師", "医者"],
        correctAnswer: "B",
        explanation: "【先生】 đọc là せんせい (sensei) nghĩa là thầy cô giáo.",
        category: "vocabulary"
      },
      {
        id: "n5-1-8",
        text: "あなた___何歳ですか。Điền trợ từ thích hợp.",
        options: ["の (no)", "が (ga)", "は (wa)", "も (mo)"],
        correctAnswer: "C",
        explanation: "Trợ từ 'は' chỉ chủ đề câu hỏi. 'あなたは何歳ですか' (Bạn bao nhiêu tuổi?).",
        category: "grammar"
      }
    ]
  },
  {
    id: "n4-mock-1",
    name: "JLPT N4 Standard Mock Exam 01",
    level: "N4",
    durationMinutes: 30,
    questions: [
      {
        id: "n4-1-1",
        text: "このカメラは【使いやすい】です。Chọn ý nghĩa đúng của cụm trong ngoặc.",
        options: ["Khó sử dụng", "Dễ sử dụng", "Không thể sử dụng", "Muốn sử dụng"],
        correctAnswer: "B",
        explanation: "Động từ bỏ ます + やすい có nghĩa là 'dễ làm gì đó'. 使いやすい là 'dễ sử dụng'.",
        category: "vocabulary"
      },
      {
        id: "n4-1-2",
        text: "雨が___そうですから、傘を持っていきます。",
        options: ["ふり (furi)", "ふる (furu)", "ふって (futte)", "ふら (fura)"],
        correctAnswer: "A",
        explanation: "Động từ thể ます (bỏ ます) + そうです biểu thị điềm báo, dự đoán có vẻ sắp xảy ra. 雨が降りそうです (Trông có vẻ sắp mưa).",
        category: "grammar"
      },
      {
        id: "n4-1-3",
        text: "日本語の新聞が【読める】ようになりたいです。Chọn thể của động từ trong ngoặc.",
        options: ["Bị động (Passive)", "Sai khiến (Causative)", "Khả năng (Potential)", "Ý chí (Volitional)"],
        correctAnswer: "C",
        explanation: "読める là thể khả năng (Potential Form) của động từ 読む (đọc), có nghĩa là 'có thể đọc'.",
        category: "grammar"
      },
      {
        id: "n4-1-4",
        text: "Đọc đoạn văn sau và trả lời câu hỏi:\n\n「日本は今、桜の季節です。たくさんの人が公園で花見をしながら、お弁当を食べたりお酒を飲んだりしています。私は昨日友達と一緒に行きました。とても綺麗でした。」\n\nQ: 私は昨日何をしましたか。",
        options: [
          "Một mình đi ngắm hoa anh đào.",
          "Đi ngắm hoa anh đào cùng bạn bè và ăn uống.",
          "Mua ô dù ở cửa hàng.",
          "Ở nhà học tiếng Nhật."
        ],
        correctAnswer: "B",
        explanation: "Đoạn văn viết: '私は昨日友達と一緒に行きました' (Hôm qua tôi đã đi cùng bạn bè). Hoa anh đào rất đẹp và mọi người ăn uống cùng nhau.",
        category: "reading",
        passage: "日本は今、桜の季節です。たくさんの人が公園で花見をしながら、お弁当を食べたりお酒を飲んだりしています。私は昨日友達と一緒に行きました。とても綺麗でした。"
      }
    ]
  }
];
