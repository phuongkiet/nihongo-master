export interface KanjiExample {
  word: string;
  reading: string;
  meaning: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  level: 'N5' | 'N4' | 'N3';
  hanViet: string;
  meaning: string;
  onyomi: {
    reading: string;
    examples: KanjiExample[];
  };
  kunyomi: {
    reading: string;
    examples: KanjiExample[];
  };
}

export const kanjiData: KanjiItem[] = [
  // ==================== NHÓM 1: SỐ ĐẾM & SỐ LƯỢNG (15 CHỮ) ====================
  {
    id: 'n5_1',
    kanji: '一',
    level: 'N5',
    hanViet: 'NHẤT',
    meaning: 'Số một, thứ nhất',
    onyomi: {
      reading: 'イチ, イツ',
      examples: [
        { word: '一日', reading: 'いちにち', meaning: 'Một ngày' },
        { word: '一番', reading: 'いちばん', meaning: 'Số một, tốt nhất' },
        { word: '一般', reading: 'いっぱん', meaning: 'Thông thường' }
      ]
    },
    kunyomi: {
      reading: 'ひと.つ',
      examples: [
        { word: '一つ', reading: 'ひとつ', meaning: 'Một cái' },
        { word: '一人', reading: 'ひとり', meaning: 'Một người' },
        { word: '一言', reading: 'ひとこと', meaning: 'Một lời' }
      ]
    }
  },
  {
    id: 'n5_2',
    kanji: '二',
    level: 'N5',
    hanViet: 'NHỊ',
    meaning: 'Số hai',
    onyomi: {
      reading: 'ニ',
      examples: [
        { word: '二月', reading: 'にがつ', meaning: 'Tháng hai' },
        { word: '二番', reading: 'にばん', meaning: 'Thứ hai' },
        { word: '二倍', reading: 'にばい', meaning: 'Gấp hai lần' }
      ]
    },
    kunyomi: {
      reading: 'ふた.つ',
      examples: [
        { word: '二つ', reading: 'ふたつ', meaning: 'Hai cái' },
        { word: '二人', reading: 'ふたり', meaning: 'Hai người' },
        { word: '二日', reading: 'ふつか', meaning: 'Ngày mùng 2, hai ngày' }
      ]
    }
  },
  {
    id: 'n5_3',
    kanji: '三',
    level: 'N5',
    hanViet: 'TAM',
    meaning: 'Số ba',
    onyomi: {
      reading: 'サン',
      examples: [
        { word: '三角', reading: 'さんかく', meaning: 'Tam giác' },
        { word: '三分', reading: 'さんぷん', meaning: 'Ba phút' },
        { word: '三流', reading: 'さんりゅう', meaning: 'Hạng ba' }
      ]
    },
    kunyomi: {
      reading: 'みっ.つ',
      examples: [
        { word: '三つ', reading: 'みっつ', meaning: 'Ba cái' },
        { word: '三人', reading: 'さんにん', meaning: 'Ba người' },
        { word: '三日', reading: 'みっか', meaning: 'Ngày mùng 3, ba ngày' }
      ]
    }
  },
  {
    id: 'n5_4',
    kanji: '四',
    level: 'N5',
    hanViet: 'TỨ',
    meaning: 'Số bốn',
    onyomi: {
      reading: 'シ',
      examples: [
        { word: '四月', reading: 'しがつ', meaning: 'Tháng tư' },
        { word: '四季', reading: 'しき', meaning: 'Bốn mùa' },
        { word: '四角', reading: 'しかく', meaning: 'Tứ giác, hình vuông' }
      ]
    },
    kunyomi: {
      reading: 'よっ.つ, よん',
      examples: [
        { word: '四つ', reading: 'よつ', meaning: 'Bốn cái' },
        { word: '四年', reading: 'よねん', meaning: 'Bốn năm' },
        { word: '四日', reading: 'よっか', meaning: 'Ngày mùng 4, bốn ngày' }
      ]
    }
  },
  {
    id: 'n5_5',
    kanji: '五',
    level: 'N5',
    hanViet: 'NGŨ',
    meaning: 'Số năm',
    onyomi: {
      reading: 'ゴ',
      examples: [
        { word: '五大湖', reading: 'ごだいこ', meaning: 'Ngũ Đại Hồ' },
        { word: '五感', reading: 'ごかん', meaning: 'Ngũ quan' },
        { word: '五輪', reading: 'ごりん', meaning: 'Thế vận hội Olympic' }
      ]
    },
    kunyomi: {
      reading: 'いつ.つ',
      examples: [
        { word: '五つ', reading: 'いつつつ', meaning: 'Năm cái' },
        { word: '五人', reading: 'ごにん', meaning: 'Năm người' },
        { word: '五日', reading: 'いつか', meaning: 'Ngày mùng 5, năm ngày' }
      ]
    }
  },
  {
    id: 'n5_6',
    kanji: '六',
    level: 'N5',
    hanViet: 'LỤC',
    meaning: 'Số sáu',
    onyomi: {
      reading: 'ロク',
      examples: [
        { word: '六月', reading: 'ろくがつ', meaning: 'Tháng sáu' },
        { word: '六角形', reading: 'ろっかくけい', meaning: 'Hình lục giác' },
        { word: '六等', reading: 'ろくとう', meaning: 'Hạng sáu' }
      ]
    },
    kunyomi: {
      reading: 'むっ.つ',
      examples: [
        { word: '六つ', reading: 'むつ', meaning: 'Sáu cái' },
        { word: '六日', reading: 'むいか', meaning: 'Ngày mùng 6, sáu ngày' }
      ]
    }
  },
  {
    id: 'n5_7',
    kanji: '七',
    level: 'N5',
    hanViet: 'THẤT',
    meaning: 'Số bảy',
    onyomi: {
      reading: 'シチ',
      examples: [
        { word: '七月', reading: 'しちがつ', meaning: 'Tháng bảy' },
        { word: '七重奏', reading: 'しちじゅうそう', meaning: 'Bản thất tấu' }
      ]
    },
    kunyomi: {
      reading: 'なな.つ',
      examples: [
        { word: '七つ', reading: 'ななつ', meaning: 'Bảy cái' },
        { word: '七人', reading: 'ななにん', meaning: 'Bảy người' },
        { word: '七日', reading: 'なのか', meaning: 'Ngày mùng 7, bảy ngày' }
      ]
    }
  },
  {
    id: 'n5_8',
    kanji: '八',
    level: 'N5',
    hanViet: 'BÁT',
    meaning: 'Số tám',
    onyomi: {
      reading: 'ハチ',
      examples: [
        { word: '八月', reading: 'はちがつ', meaning: 'Tháng tám' },
        { word: '八方', reading: 'はっぽう', meaning: 'Tám hướng, muôn ngả' }
      ]
    },
    kunyomi: {
      reading: 'やっ.つ',
      examples: [
        { word: '八つ', reading: 'やつ', meaning: 'Tám cái' },
        { word: '八人', reading: 'はちにん', meaning: 'Tám người' },
        { word: '八日', reading: 'ようか', meaning: 'Ngày mùng 8, tám ngày' }
      ]
    }
  },
  {
    id: 'n5_9',
    kanji: '九',
    level: 'N5',
    hanViet: 'CỬU',
    meaning: 'Số chín',
    onyomi: {
      reading: 'キュウ, ク',
      examples: [
        { word: '九月', reading: 'くがつ', meaning: 'Tháng chín' },
        { word: '九州', reading: 'きゅうしゅう', meaning: 'Đảo Kyūshū' },
        { word: '九割', reading: 'きゅうわり', meaning: 'Chín phần mười' }
      ]
    },
    kunyomi: {
      reading: 'ここの.つ',
      examples: [
        { word: '九つ', reading: 'ここのつ', meaning: 'Chín cái' },
        { word: '九日', reading: 'ここのか', meaning: 'Ngày mùng 9, chín ngày' }
      ]
    }
  },
  {
    id: 'n5_10',
    kanji: '十',
    level: 'N5',
    hanViet: 'THẬP',
    meaning: 'Số mười',
    onyomi: {
      reading: 'ジュウ',
      examples: [
        { word: '十分', reading: 'じゅうぶん', meaning: 'Đầy đủ, mười phút' },
        { word: '十月', reading: 'じゅうがつ', meaning: 'Tháng mười' },
        { word: '十字路', reading: 'じゅうじろ', meaning: 'Ngã tư đường' }
      ]
    },
    kunyomi: {
      reading: 'とお',
      examples: [
        { word: '十日', reading: 'とおか', meaning: 'Ngày mùng 10, mười ngày' }
      ]
    }
  },
  {
    id: 'n5_11',
    kanji: '百',
    level: 'N5',
    hanViet: 'BÁCH',
    meaning: 'Một trăm',
    onyomi: {
      reading: 'ヒャク',
      examples: [
        { word: '三百', reading: 'さんびゃく', meaning: 'Ba trăm' },
        { word: '百科事典', reading: 'ひゃっかじてん', meaning: 'Bách khoa toàn thư' },
        { word: '百円', reading: 'ひゃくえn', meaning: 'Một trăm Yên' }
      ]
    },
    kunyomi: {
      reading: 'N/A',
      examples: []
    }
  },
  {
    id: 'n5_12',
    kanji: '千',
    level: 'N5',
    hanViet: 'THIÊN',
    meaning: 'Một nghìn',
    onyomi: {
      reading: 'セン',
      examples: [
        { word: '三千', reading: 'さんぜん', meaning: 'Ba nghìn' },
        { word: '千葉県', reading: 'ちばけん', meaning: 'Tỉnh Chiba' },
        { word: '千人', reading: 'せんにん', meaning: 'Một nghìn người' }
      ]
    },
    kunyomi: {
      reading: 'ち',
      examples: [
        { word: '千代紙', reading: 'ちよがみ', meaning: 'Giấy thủ công Chiyogami' }
      ]
    }
  },
  {
    id: 'n5_13',
    kanji: '万',
    level: 'N5',
    hanViet: 'VẠN',
    meaning: 'Mười nghìn, vạn',
    onyomi: {
      reading: 'マン, バン',
      examples: [
        { word: '一万', reading: 'いちまん', meaning: 'Mười nghìn' },
        { word: '万歳', reading: 'ばんざい', meaning: 'Vạn tuế' },
        { word: '万国', reading: 'ばんこく', meaning: 'Vạn quốc, toàn thế giới' }
      ]
    },
    kunyomi: {
      reading: 'N/A',
      examples: []
    }
  },
  {
    id: 'n5_14',
    kanji: '円',
    level: 'N5',
    hanViet: 'VIÊN',
    meaning: 'Tiền Yên Nhật, hình tròn',
    onyomi: {
      reading: 'エン',
      examples: [
        { word: '円', reading: 'えん', meaning: 'Yên Nhật' },
        { word: '円滑', reading: 'えんかつ', meaning: 'Trôi chảy, êm thấm' },
        { word: '一万円', reading: 'いちまんえん', meaning: 'Mười nghìn Yên' }
      ]
    },
    kunyomi: {
      reading: 'まる.い',
      examples: [
        { word: '丸い', reading: 'まるい', meaning: 'Tròn, hình tròn' }
      ]
    }
  },
  {
    id: 'n5_15',
    kanji: '半',
    level: 'N5',
    hanViet: 'BÁN',
    meaning: 'Nửa, một nửa, rưỡi',
    onyomi: {
      reading: 'ハン',
      examples: [
        { word: '半分', reading: 'はんぶん', meaning: 'Một nửa' },
        { word: '半日', reading: 'はんにち', meaning: 'Nửa ngày' },
        { word: '二時半', reading: 'にじはん', meaning: 'Hai giờ rưỡi' }
      ]
    },
    kunyomi: {
      reading: 'なか.ば',
      examples: [
        { word: '半ば', reading: 'なかば', meaning: 'Giữa, giữa chừng' }
      ]
    }
  },

  // ==================== NHÓM 2: TỰ NHIÊN, THỜI GIAN & THỨ (25 CHỮ) ====================
  {
    id: 'n5_16',
    kanji: '日',
    level: 'N5',
    hanViet: 'NHẬT',
    meaning: 'Mặt trời, ngày, Chủ nhật',
    onyomi: {
      reading: 'ニチ, ジツ',
      examples: [
        { word: '日本', reading: 'にほん', meaning: 'Nhật Bản' },
        { word: '毎日', reading: 'まいにち', meaning: 'Mỗi ngày' },
        { word: '祝日', reading: 'しゅくじつ', meaning: 'Ngày lễ' }
      ]
    },
    kunyomi: {
      reading: 'ひ, び, か',
      examples: [
        { word: '日曜日', reading: 'にちようび', meaning: 'Chủ nhật' },
        { word: '日の出', reading: 'ひので', meaning: 'Bình minh' },
        { word: '三日', reading: 'みっか', meaning: 'Ngày mùng 3' }
      ]
    }
  },
  {
    id: 'n5_17',
    kanji: '月',
    level: 'N5',
    hanViet: 'NGUYỆT',
    meaning: 'Mặt trăng, tháng, thứ hai',
    onyomi: {
      reading: 'ゲツ, ガツ',
      examples: [
        { word: '一月', reading: 'いちがつ', meaning: 'Tháng một' },
        { word: '月曜日', reading: 'げつようび', meaning: 'Thứ hai' },
        { word: '毎月', reading: 'まいげつ', meaning: 'Hàng tháng' }
      ]
    },
    kunyomi: {
      reading: 'つき',
      examples: [
        { word: '月', reading: 'つき', meaning: 'Mặt trăng, trăng' },
        { word: '月見', reading: 'つきみ', meaning: 'Ngắm trăng' }
      ]
    }
  },
  {
    id: 'n5_18',
    kanji: '火',
    level: 'N5',
    hanViet: 'HỎA',
    meaning: 'Lửa, thứ ba',
    onyomi: {
      reading: 'カ',
      examples: [
        { word: '火曜日', reading: 'かようび', meaning: 'Thứ ba' },
        { word: '火山', reading: 'かざん', meaning: 'Núi lửa' },
        { word: '火事', reading: 'かじ', meaning: 'Hỏa hoạn, đám cháy' }
      ]
    },
    kunyomi: {
      reading: 'ひ, び',
      examples: [
        { word: '火', reading: 'ひ', meaning: 'Ngọn lửa, lửa' },
        { word: '花火', reading: 'はなび', meaning: 'Pháo hoa' }
      ]
    }
  },
  {
    id: 'n5_19',
    kanji: '水',
    level: 'N5',
    hanViet: 'THỦY',
    meaning: 'Nước, thứ tư',
    onyomi: {
      reading: 'スイ',
      examples: [
        { word: '水曜日', reading: 'すいようび', meaning: 'Thứ tư' },
        { word: '水泳', reading: 'すいえい', meaning: 'Bơi lội' },
        { word: '水道', reading: 'すいdo', meaning: 'Đường nước máy' }
      ]
    },
    kunyomi: {
      reading: 'みず',
      examples: [
        { word: '水', reading: 'みず', meaning: 'Nước' },
        { word: '泥水', reading: 'どろみず', meaning: 'Nước bùn' }
      ]
    }
  },
  {
    id: 'n5_20',
    kanji: '木',
    level: 'N5',
    hanViet: 'MỘC',
    meaning: 'Cây, gỗ, thứ năm',
    onyomi: {
      reading: 'モク, ボク',
      examples: [
        { word: '木曜日', reading: 'もくようび', meaning: 'Thứ năm' },
        { word: '大木', reading: 'たいぼく', meaning: 'Cây đại thụ' },
        { word: '木刀', reading: 'ぼくとう', meaning: 'Kiếm gỗ' }
      ]
    },
    kunyomi: {
      reading: 'き',
      examples: [
        { word: '木', reading: 'き', meaning: 'Cây' },
        { word: '木登り', reading: 'きのぼり', meaning: 'Sự leo cây' }
      ]
    }
  },
  {
    id: 'n5_21',
    kanji: '金',
    level: 'N5',
    hanViet: 'KIM',
    meaning: 'Vàng, tiền, thứ sáu',
    onyomi: {
      reading: 'キン, コン',
      examples: [
        { word: '金曜日', reading: 'きんようび', meaning: 'Thứ sáu' },
        { word: '黄金', reading: 'おうごん', meaning: 'Vàng ròng' },
        { word: '貯金', reading: 'ちょきん', meaning: 'Tiền tiết kiệm' }
      ]
    },
    kunyomi: {
      reading: 'かね',
      examples: [
        { word: 'お金', reading: 'おかね', meaning: 'Tiền bạc' },
        { word: '金持ち', reading: 'かねもち', meaning: 'Giàu có' }
      ]
    }
  },
  {
    id: 'n5_22',
    kanji: '土',
    level: 'N5',
    hanViet: 'THỔ',
    meaning: 'Đất, thứ bảy',
    onyomi: {
      reading: 'ド, ト',
      examples: [
        { word: '土曜日', reading: 'どようび', meaning: 'Thứ bảy' },
        { word: '土地', reading: 'とち', meaning: 'Đất đai' },
        { word: '土木', reading: 'どぼく', meaning: 'Công trình dân dụng' }
      ]
    },
    kunyomi: {
      reading: 'つち',
      examples: [
        { word: '土', reading: 'つち', meaning: 'Đất, cát' }
      ]
    }
  },
  {
    id: 'n5_23',
    kanji: '年',
    level: 'N5',
    hanViet: 'NIÊN',
    meaning: 'Năm',
    onyomi: {
      reading: 'ネン',
      examples: [
        { word: '今年', reading: 'ことし', meaning: 'Năm nay' },
        { word: '来年', reading: 'らいねん', meaning: 'Năm sau' },
        { word: '毎年', reading: 'まいねん', meaning: 'Hàng năm' }
      ]
    },
    kunyomi: {
      reading: 'とし',
      examples: [
        { word: '年', reading: 'とし', meaning: 'Năm, tuổi' },
        { word: '年上', reading: 'としうえ', meaning: 'Lớn tuổi hơn' }
      ]
    }
  },
  {
    id: 'n5_24',
    kanji: '時',
    level: 'N5',
    hanViet: 'THỜI',
    meaning: 'Thời gian, giờ',
    onyomi: {
      reading: 'ジ',
      examples: [
        { word: '時間', reading: 'じかん', meaning: 'Thời gian' },
        { word: '一時', reading: 'いちじ', meaning: 'Một giờ' },
        { word: '同時', reading: 'どうじ', meaning: 'Đồng thời' }
      ]
    },
    kunyomi: {
      reading: 'とき',
      examples: [
        { word: '時', reading: 'とき', meaning: 'Khi, thời điểm' },
        { word: '時々', reading: 'ときどき', meaning: 'Thỉnh thoảng' }
      ]
    }
  },
  {
    id: 'n5_25',
    kanji: '分',
    level: 'N5',
    hanViet: 'PHÂN',
    meaning: 'Phút, phân chia, hiểu',
    onyomi: {
      reading: 'ブン, プン',
      examples: [
        { word: '五分', reading: 'ごふん', meaning: 'Năm phút' },
        { word: '十分', reading: 'じゅうぶん/じゅっぷん', meaning: 'Đầy đủ/Mười phút' },
        { word: '半分', reading: 'はんぶん', meaning: 'Một nửa' }
      ]
    },
    kunyomi: {
      reading: 'わ.かる',
      examples: [
        { word: '分かる', reading: 'わかる', meaning: 'Hiểu' }
      ]
    }
  },
  {
    id: 'n5_26',
    kanji: '間',
    level: 'N5',
    hanViet: 'GIAN',
    meaning: 'Khoảng thời gian, ở giữa',
    onyomi: {
      reading: 'カン, ケン',
      examples: [
        { word: '時間', reading: 'じかん', meaning: 'Thời gian' },
        { word: '居間', reading: 'いま', meaning: 'Phòng khách' },
        { word: '人間', reading: 'にんげん', meaning: 'Con người' }
      ]
    },
    kunyomi: {
      reading: 'あいだ, ま',
      examples: [
        { word: '間', reading: 'あいだ', meaning: 'Ở giữa, khoảng' }
      ]
    }
  },
  {
    id: 'n5_27',
    kanji: '今',
    level: 'N5',
    hanViet: 'KIM',
    meaning: 'Bây giờ, hiện tại',
    onyomi: {
      reading: 'コン, キン',
      examples: [
        { word: '今月', reading: 'こんげつ', meaning: 'Tháng này' },
        { word: '今年', reading: 'ことし', meaning: 'Năm nay' },
        { word: '今夜', reading: 'こんや', meaning: 'Tối nay' }
      ]
    },
    kunyomi: {
      reading: 'いま',
      examples: [
        { word: '今', reading: 'いま', meaning: 'Bây giờ' },
        { word: '今頃', reading: 'いまごろ', meaning: 'Tầm này, giờ này' }
      ]
    }
  },
  {
    id: 'n5_28',
    kanji: '毎',
    level: 'N5',
    hanViet: 'MỖI',
    meaning: 'Mỗi, mọi',
    onyomi: {
      reading: 'マイ',
      examples: [
        { word: '毎日', reading: 'まいにち', meaning: 'Mỗi ngày' },
        { word: '毎月', reading: 'まいげつ', meaning: 'Mỗi tháng' },
        { word: '毎年', reading: 'まいねん', meaning: 'Mỗi năm' }
      ]
    },
    kunyomi: {
      reading: 'ごと.に',
      examples: [
        { word: '日ごとに', reading: 'ひごとに', meaning: 'Mỗi ngày qua đi' }
      ]
    }
  },
  {
    id: 'n5_29',
    kanji: '先',
    level: 'N5',
    hanViet: 'TIÊN',
    meaning: 'Trước, tương lai, điểm đầu',
    onyomi: {
      reading: 'セン',
      examples: [
        { word: '先生', reading: 'せんせい', meaning: 'Thầy cô giáo' },
        { word: '先月', reading: 'せんげつ', meaning: 'Tháng trước' },
        { word: '先週', reading: 'せんしゅう', meaning: 'Tuần trước' }
      ]
    },
    kunyomi: {
      reading: 'さき',
      examples: [
        { word: '先', reading: 'さき', meaning: 'Điểm đầu, trước tiên' },
        { word: '指先', reading: 'ゆびさき', meaning: 'Đầu ngón tay' }
      ]
    }
  },
  {
    id: 'n5_30',
    kanji: '週',
    level: 'N5',
    hanViet: 'CHU',
    meaning: 'Tuần',
    onyomi: {
      reading: 'シュウ',
      examples: [
        { word: '一週間', reading: 'いっしゅうかん', meaning: 'Một tuần' },
        { word: '今週', reading: 'こんしゅう', meaning: 'Tuần này' },
        { word: '週末', reading: 'しゅうまつ', meaning: 'Cuối tuần' }
      ]
    },
    kunyomi: {
      reading: 'N/A',
      examples: []
    }
  },
  {
    id: 'n5_31',
    kanji: '午',
    level: 'N5',
    hanViet: 'NGỌ',
    meaning: 'Buổi trưa, ngọ',
    onyomi: {
      reading: 'ゴ',
      examples: [
        { word: '午前', reading: 'ごぜん', meaning: 'Buổi sáng (AM)' },
        { word: '午後', reading: 'ごご', meaning: 'Buổi chiều (PM)' },
        { word: '正午', reading: 'しょうご', meaning: 'Đúng giữa trưa' }
      ]
    },
    kunyomi: {
      reading: 'N/A',
      examples: []
    }
  },
  {
    id: 'n5_32',
    kanji: '朝',
    level: 'N5',
    hanViet: 'TRIỀU',
    meaning: 'Buổi sáng',
    onyomi: {
      reading: 'チョウ',
      examples: [
        { word: '朝食', reading: 'ちょうしょく', meaning: 'Bữa sáng' },
        { word: '早朝', reading: 'そうちょう', meaning: 'Sáng sớm' },
        { word: '朝刊', reading: 'ちょうかん', meaning: 'Báo sáng' }
      ]
    },
    kunyomi: {
      reading: 'あさ',
      examples: [
        { word: '朝', reading: 'あさ', meaning: 'Buổi sáng' },
        { word: '毎朝', reading: 'まいあさ', meaning: 'Mỗi sáng' }
      ]
    }
  },
  {
    id: 'n5_33',
    kanji: '昼',
    level: 'N5',
    hanViet: 'TRÚ',
    meaning: 'Buổi trưa, ban ngày',
    onyomi: {
      reading: 'チュウ',
      examples: [
        { word: '昼食', reading: 'ちゅうしょく', meaning: 'Bữa trưa' },
        { word: '昼夜', reading: 'ちゅうや', meaning: 'Ngày và đêm' }
      ]
    },
    kunyomi: {
      reading: 'ひる',
      examples: [
        { word: '昼', reading: 'ひる', meaning: 'Buổi trưa, ban ngày' },
        { word: '昼寝', reading: 'ひるね', meaning: 'Ngủ trưa' },
        { word: '昼ご飯', reading: 'ひるごはん', meaning: 'Bữa ăn trưa' }
      ]
    }
  },
  {
    id: 'n5_34',
    kanji: '夜',
    level: 'N5',
    hanViet: 'DẠ',
    meaning: 'Đêm, tối',
    onyomi: {
      reading: 'ヤ',
      examples: [
        { word: '夜間', reading: 'やかん', meaning: 'Ban đêm' },
        { word: '深夜', reading: 'しんや', meaning: 'Đêm khuya' },
        { word: '夜行', reading: 'やこう', meaning: 'Đi đêm, tàu chạy đêm' }
      ]
    },
    kunyomi: {
      reading: 'よ, よる',
      examples: [
        { word: '夜', reading: 'よる', meaning: 'Ban đêm' },
        { word: '夜中', reading: 'よなか', meaning: 'Nửa đêm' }
      ]
    }
  },
  {
    id: 'n5_35',
    kanji: '夕',
    level: 'N5',
    hanViet: 'TỊCH',
    meaning: 'Chiều tối',
    onyomi: {
      reading: 'セキ',
      examples: [
        { word: '一夕', reading: 'いっせき', meaning: 'Một buổi tối' }
      ]
    },
    kunyomi: {
      reading: 'ゆう',
      examples: [
        { word: '夕方', reading: 'ゆうがた', meaning: 'Chiều tối' },
        { word: '夕日', reading: 'ゆうひ', meaning: 'Mặt trời lặn, hoàng hôn' },
        { word: '夕食', reading: 'ゆうしょく', meaning: 'Bữa tối' }
      ]
    }
  },
  {
    id: 'n5_36',
    kanji: '天',
    level: 'N5',
    hanViet: 'THIÊN',
    meaning: 'Trời, thiên nhiên',
    onyomi: {
      reading: 'テン',
      examples: [
        { word: '天気', reading: 'てんき', meaning: 'Thời tiết' },
        { word: '天国', reading: 'てんこく', meaning: 'Thiên đường' },
        { word: '天才', reading: 'てんさい', meaning: 'Thiên tài' }
      ]
    },
    kunyomi: {
      reading: 'あま',
      examples: [
        { word: '天の川', reading: 'あまのがわ', meaning: 'Dải Ngân Hà' }
      ]
    }
  },
  {
    id: 'n5_37',
    kanji: '気',
    level: 'N5',
    hanViet: 'KHÍ',
    meaning: 'Khí chất, tinh thần, khí trời',
    onyomi: {
      reading: 'キ, ケ',
      examples: [
        { word: '電気', reading: 'でんき', meaning: 'Điện' },
        { word: '元気', reading: 'げんき', meaning: 'Khỏe mạnh' },
        { word: '病気', reading: 'びょうき', meaning: 'Bệnh tật' }
      ]
    },
    kunyomi: {
      reading: 'N/A',
      examples: []
    }
  },
  {
    id: 'n5_38',
    kanji: '雨',
    level: 'N5',
    hanViet: 'VŨ',
    meaning: 'Mưa',
    onyomi: {
      reading: 'ウ',
      examples: [
        { word: '雨天', reading: 'うてん', meaning: 'Trời mưa' },
        { word: '豪雨', reading: 'ごうう', meaning: 'Mưa lớn' }
      ]
    },
    kunyomi: {
      reading: 'あめ, あま',
      examples: [
        { word: '雨', reading: 'あめ', meaning: 'Cơn mưa' },
        { word: '大雨', reading: 'おおあめ', meaning: 'Mưa to' },
        { word: '雨傘', reading: 'あまがさ', meaning: 'Dù che mưa' }
      ]
    }
  },
  {
    id: 'n5_39',
    kanji: '雪',
    level: 'N5',
    hanViet: 'TUYẾT',
    meaning: 'Tuyết',
    onyomi: {
      reading: 'セツ',
      examples: [
        { word: '新雪', reading: 'しんせつ', meaning: 'Tuyết mới rơi' },
        { word: '豪雪', reading: 'ごうせつ', meaning: 'Tuyết rơi cực dày' }
      ]
    },
    kunyomi: {
      reading: 'ゆき',
      examples: [
        { word: '雪', reading: 'ゆき', meaning: 'Tuyết' },
        { word: '大雪', reading: 'おおゆき', meaning: 'Tuyết rơi dày' },
        { word: '雪祭り', reading: 'ゆきまつり', meaning: 'Lễ hội tuyết' }
      ]
    }
  },
  {
    id: 'n5_40',
    kanji: '風',
    level: 'N5',
    hanViet: 'PHONG',
    meaning: 'Gió, phong cách',
    onyomi: {
      reading: 'フウ',
      examples: [
        { word: '台風', reading: 'たいふう', meaning: 'Bão lớn' },
        { word: 'お風呂', reading: 'おふろ', meaning: 'Bồn tắm' },
        { word: '和風', reading: 'わふう', meaning: 'Phong cách Nhật Bản' }
      ]
    },
    kunyomi: {
      reading: 'かぜ',
      examples: [
        { word: '風', reading: 'かぜ', meaning: 'Cơn gió' },
        { word: '風邪', reading: 'かぜ', meaning: 'Cảm lạnh' }
      ]
    }
  },

  // ==================== NHÓM 3: VỊ TRÍ, PHƯƠNG HƯỚNG & KÍCH THƯỚC (25 CHỮ) ====================
  {
    id: 'n5_41',
    kanji: '上',
    level: 'N5',
    hanViet: 'THƯỢNG',
    meaning: 'Ở trên, đi lên',
    onyomi: {
      reading: 'ジョウ',
      examples: [
        { word: '上手', reading: 'じょうず', meaning: 'Giỏi giang' },
        { word: '屋上', reading: 'おくじょう', meaning: 'Sân thượng' },
        { word: '上昇', reading: 'じょうしょう', meaning: 'Sự tăng lên' }
      ]
    },
    kunyomi: {
      reading: 'うえ, あ.がる',
      examples: [
        { word: '上', reading: 'うえ', meaning: 'Phía trên' },
        { word: '上がる', reading: 'あがる', meaning: 'Đi lên, nâng lên' }
      ]
    }
  },
  {
    id: 'n5_42',
    kanji: '下',
    level: 'N5',
    hanViet: 'HẠ',
    meaning: 'Ở dưới, đi xuống',
    onyomi: {
      reading: 'カ, ゲ',
      examples: [
        { word: '下手', reading: 'へた', meaning: 'Kém, dở' },
        { word: '地下鉄', reading: 'ちかてつ', meaning: 'Tàu điện ngầm' },
        { word: '下車', reading: 'げしゃ', meaning: 'Xuống xe' }
      ]
    },
    kunyomi: {
      reading: 'した, くだ.る, さ.げる',
      examples: [
        { word: '下', reading: 'した', meaning: 'Phía dưới' },
        { word: '下がる', reading: 'さがる', meaning: 'Hạ xuống, giảm đi' }
      ]
    }
  },
  {
    id: 'n5_43',
    kanji: '左',
    level: 'N5',
    hanViet: 'TẢ',
    meaning: 'Bên trái',
    onyomi: {
      reading: 'サ',
      examples: [
        { word: '左右', reading: 'さゆう', meaning: 'Tả hữu, trái phải' },
        { word: '左折', reading: 'させつ', meaning: 'Rẽ trái' }
      ]
    },
    kunyomi: {
      reading: 'ひだり',
      examples: [
        { word: '左', reading: 'ひだり', meaning: 'Bên trái' },
        { word: '左側', reading: 'ひだりがわ', meaning: 'Phía bên trái' }
      ]
    }
  },
  {
    id: 'n5_44',
    kanji: '右',
    level: 'N5',
    hanViet: 'HỮU',
    meaning: 'Bên phải',
    onyomi: {
      reading: 'ウ, ユウ',
      examples: [
        { word: '右折', reading: 'うせつ', meaning: 'Rẽ phải' },
        { word: '右翼', reading: 'うよく', meaning: 'Cánh hữu, phe cánh hữu' }
      ]
    },
    kunyomi: {
      reading: 'みぎ',
      examples: [
        { word: '右', reading: 'みぎ', meaning: 'Bên phải' },
        { word: '右側', reading: 'みぎがわ', meaning: 'Phía bên phải' }
      ]
    }
  },
  {
    id: 'n5_45',
    kanji: '前',
    level: 'N5',
    hanViet: 'TIỀN',
    meaning: 'Trước, phía trước',
    onyomi: {
      reading: 'ゼン',
      examples: [
        { word: '午前', reading: 'ごぜん', meaning: 'Buổi sáng (AM)' },
        { word: '前半', reading: 'ぜんはん', meaning: 'Hiệp một, nửa trước' }
      ]
    },
    kunyomi: {
      reading: 'まえ',
      examples: [
        { word: '前', reading: 'まえ', meaning: 'Trước, phía trước' },
        { word: '駅前', reading: 'えきまえ', meaning: 'Trước ga' }
      ]
    }
  },
  {
    id: 'n5_46',
    kanji: '後',
    level: 'N5',
    hanViet: 'HẬU',
    meaning: 'Sau, phía sau',
    onyomi: {
      reading: 'ゴ, コウ',
      examples: [
        { word: '午後', reading: 'ごご', meaning: 'Buổi chiều (PM)' },
        { word: '後半', reading: 'こうはん', meaning: 'Hiệp hai, nửa sau' },
        { word: '後輩', reading: 'こうはい', meaning: 'Đàn em, hậu bối' }
      ]
    },
    kunyomi: {
      reading: 'うし.ろ, あと, のち',
      examples: [
        { word: '後ろ', reading: 'うしろ', meaning: 'Phía sau' },
        { word: '後で', reading: 'あとで', meaning: 'Lát nữa, sau đó' }
      ]
    }
  },
  {
    id: 'n5_47',
    kanji: '中',
    level: 'N5',
    hanViet: 'TRUNG',
    meaning: 'Ở giữa, bên trong, Trung Quốc',
    onyomi: {
      reading: 'チュウ',
      examples: [
        { word: '中国', reading: 'ちゅうごく', meaning: 'Trung Quốc' },
        { word: '中心', reading: 'ちゅうしん', meaning: 'Trung tâm' },
        { word: '中学校', reading: 'ちゅうがっこう', meaning: 'Trường THCS' }
      ]
    },
    kunyomi: {
      reading: 'なか',
      examples: [
        { word: '中', reading: 'なか', meaning: 'Bên trong' },
        { word: '中身', reading: 'なかみ', meaning: 'Nội dung, ruột bên trong' }
      ]
    }
  },
  {
    id: 'n5_48',
    kanji: '外',
    level: 'N5',
    hanViet: 'NGOẠI',
    meaning: 'Bên ngoài, nước ngoài',
    onyomi: {
      reading: 'ガイ, ゲ',
      examples: [
        { word: '外国', reading: 'がいこく', meaning: 'Nước ngoài' },
        { word: '外科', reading: 'げか', meaning: 'Khoa ngoại' },
        { word: '外出', reading: 'がいしゅつ', meaning: 'Đi ra ngoài' }
      ]
    },
    kunyomi: {
      reading: 'そと, ほか',
      examples: [
        { word: '外', reading: 'そと', meaning: 'Bên ngoài' },
        { word: '外れる', reading: 'はずれる', meaning: 'Tuột ra, lệch đi' }
      ]
    }
  },
  {
    id: 'n5_49',
    kanji: '東',
    level: 'N5',
    hanViet: 'ĐÔNG',
    meaning: 'Hướng Đông',
    onyomi: {
      reading: 'トウ',
      examples: [
        { word: '東京', reading: 'とうきょう', meaning: 'Tokyo' },
        { word: '東洋', reading: 'とうよう', meaning: 'Đông Dương, phương Đông' },
        { word: '関東', reading: 'かんとう', meaning: 'Vùng Kanto' }
      ]
    },
    kunyomi: {
      reading: 'ひがし',
      examples: [
        { word: '東', reading: 'ひがし', meaning: 'Hướng Đông' },
        { word: '東口', reading: 'ひがしぐち', meaning: 'Cổng Đông' }
      ]
    }
  },
  {
    id: 'n5_50',
    kanji: '西',
    level: 'N5',
    hanViet: 'TÂY',
    meaning: 'Hướng Tây',
    onyomi: {
      reading: 'セイ, サイ',
      examples: [
        { word: '西洋', reading: 'せいよう', meaning: 'Phương Tây' },
        { word: '関西', reading: 'かんさい', meaning: 'Vùng Kansai' }
      ]
    },
    kunyomi: {
      reading: 'にし',
      examples: [
        { word: '西', reading: 'にし', meaning: 'Hướng Tây' },
        { word: '西口', reading: 'にしぐち', meaning: 'Cổng Tây' }
      ]
    }
  },
  {
    id: 'n5_51',
    kanji: '南',
    level: 'N5',
    hanViet: 'NAM',
    meaning: 'Hướng Nam',
    onyomi: {
      reading: 'ナン',
      examples: [
        { word: '南極', reading: 'なんきょく', meaning: 'Nam Cực' },
        { word: '東南アジア', reading: 'とうなんあじあ', meaning: 'Đông Nam Á' }
      ]
    },
    kunyomi: {
      reading: 'みなみ',
      examples: [
        { word: '南', reading: 'みなみ', meaning: 'Hướng Nam' },
        { word: '南口', reading: 'みなみぐち', meaning: 'Cổng Nam' }
      ]
    }
  },
  {
    id: 'n5_52',
    kanji: '北',
    level: 'N5',
    hanViet: 'BẮC',
    meaning: 'Hướng Bắc',
    onyomi: {
      reading: 'ホク',
      examples: [
        { word: '北海道', reading: 'ほっかいどう', meaning: 'Hokkaido' },
        { word: '北極', reading: 'ほっきょく', meaning: 'Bắc Cực' }
      ]
    },
    kunyomi: {
      reading: 'きた',
      examples: [
        { word: '北', reading: 'きた', meaning: 'Hướng Bắc' },
        { word: '北口', reading: 'きたぐち', meaning: 'Cổng Bắc' }
      ]
    }
  },
  {
    id: 'n5_53',
    kanji: '大',
    level: 'N5',
    hanViet: 'ĐẠI',
    meaning: 'Lớn, to lớn, đại học',
    onyomi: {
      reading: 'ダイ, タイ',
      examples: [
        { word: '大学', reading: 'だいがく', meaning: 'Trường Đại học' },
        { word: '大切', reading: 'たいせつ', meaning: 'Quan trọng' },
        { word: '大会', reading: 'たいかい', meaning: 'Đại hội' }
      ]
    },
    kunyomi: {
      reading: 'おお.きい',
      examples: [
        { word: '大きい', reading: 'おおきい', meaning: 'Lớn, to' },
        { word: '大人', reading: 'おとな', meaning: 'Người lớn' }
      ]
    }
  },
  {
    id: 'n5_54',
    kanji: '小',
    level: 'N5',
    hanViet: 'TIỂU',
    meaning: 'Nhỏ, bé',
    onyomi: {
      reading: 'ショウ',
      examples: [
        { word: '小学校', reading: 'しょうがっこう', meaning: 'Trường tiểu học' },
        { word: '小説', reading: 'しょうせつ', meaning: 'Tiểu thuyết' },
        { word: '小規模', reading: 'しょうきぼ', meaning: 'Quy mô nhỏ' }
      ]
    },
    kunyomi: {
      reading: 'ちい.さい, こ, お',
      examples: [
        { word: '小さい', reading: 'ちいさい', meaning: 'Nhỏ, bé' },
        { word: '小川', reading: 'おがわ', meaning: 'Rạch nước, sông nhỏ' }
      ]
    }
  },
  {
    id: 'n5_55',
    kanji: '高',
    level: 'N5',
    hanViet: 'CAO',
    meaning: 'Cao, đắt tiền, trung học phổ thông',
    onyomi: {
      reading: 'コウ',
      examples: [
        { word: '高校', reading: 'こうこう', meaning: 'Trường THPT' },
        { word: '高級', reading: 'こうきゅう', meaning: 'Cao cấp' },
        { word: '高度', reading: 'こうど', meaning: 'Độ cao, trình độ cao' }
      ]
    },
    kunyomi: {
      reading: 'たか.い',
      examples: [
        { word: '高い', reading: 'たかい', meaning: 'Cao, đắt' }
      ]
    }
  },
  {
    id: 'n5_56',
    kanji: '安',
    level: 'N5',
    hanViet: 'AN',
    meaning: 'Rẻ, an toàn, yên tâm',
    onyomi: {
      reading: 'アン',
      examples: [
        { word: '安全', reading: 'あんぜん', meaning: 'An toàn' },
        { word: '安心', reading: 'あんしん', meaning: 'Yên tâm' },
        { word: '安定', reading: 'あんてい', meaning: 'Ổn định' }
      ]
    },
    kunyomi: {
      reading: 'やす.い',
      examples: [
        { word: '安い', reading: 'やすい', meaning: 'Rẻ' }
      ]
    }
  },
  {
    id: 'n5_57',
    kanji: '新',
    level: 'N5',
    hanViet: 'TÂN',
    meaning: 'Mới',
    onyomi: {
      reading: 'シン',
      examples: [
        { word: '新聞', reading: 'しんぶん', meaning: 'Tờ báo' },
        { word: '新年', reading: 'しんねん', meaning: 'Năm mới' },
        { word: '新幹線', reading: 'しんかんせん', meaning: 'Tàu cao tốc Shinkansen' }
      ]
    },
    kunyomi: {
      reading: 'あたら.しい',
      examples: [
        { word: '新しい', reading: 'あたらしい', meaning: 'Mới' }
      ]
    }
  },
  {
    id: 'n5_58',
    kanji: '古',
    level: 'N5',
    hanViet: 'CỔ',
    meaning: 'Cũ, cổ kính',
    onyomi: {
      reading: 'コ',
      examples: [
        { word: '古本', reading: 'ふるほん', meaning: 'Sách cũ' },
        { word: '古代', reading: 'こだい', meaning: 'Cổ đại' }
      ]
    },
    kunyomi: {
      reading: 'ふる.い',
      examples: [
        { word: '古い', reading: 'ふるい', meaning: 'Cũ' }
      ]
    }
  },
  {
    id: 'n5_59',
    kanji: '多',
    level: 'N5',
    hanViet: 'ĐA',
    meaning: 'Nhiều',
    onyomi: {
      reading: 'タ',
      examples: [
        { word: '多少', reading: 'たしょう', meaning: 'Ít nhiều' },
        { word: '多数', reading: 'たすう', meaning: 'Đa số, số đông' }
      ]
    },
    kunyomi: {
      reading: 'おお.い',
      examples: [
        { word: '多い', reading: 'おおい', meaning: 'Nhiều' }
      ]
    }
  },
  {
    id: 'n5_60',
    kanji: '少',
    level: 'N5',
    hanViet: 'THIỂU',
    meaning: 'Ít, một chút',
    onyomi: {
      reading: 'ショウ',
      examples: [
        { word: '少年', reading: 'しょうねん', meaning: 'Thiếu niên' },
        { word: '少女', reading: 'しょうじょ', meaning: 'Thiếu nữ' },
        { word: '少量', reading: 'しょうりょう', meaning: 'Lượng nhỏ' }
      ]
    },
    kunyomi: {
      reading: 'すく.ない, すこ.し',
      examples: [
        { word: '少ない', reading: 'すくない', meaning: 'Ít' },
        { word: '少し', reading: 'すこし', meaning: 'Một chút' }
      ]
    }
  },
  {
    id: 'n5_61',
    kanji: '長',
    level: 'N5',
    hanViet: 'TRƯỜNG',
    meaning: 'Dài, trưởng (chức vụ)',
    onyomi: {
      reading: 'チョウ',
      examples: [
        { word: '社長', reading: 'しゃちょう', meaning: 'Giám đốc' },
        { word: '校長', reading: 'こうちょう', meaning: 'Hiệu trưởng' },
        { word: '長男', reading: 'ちょうなん', meaning: 'Con trai trưởng' }
      ]
    },
    kunyomi: {
      reading: 'なが.い',
      examples: [
        { word: '長い', reading: 'ながい', meaning: 'Dài' }
      ]
    }
  },
  {
    id: 'n5_62',
    kanji: '白',
    level: 'N5',
    hanViet: 'BẠCH',
    meaning: 'Màu trắng',
    onyomi: {
      reading: 'ハク, ビャク',
      examples: [
        { word: '白髪', reading: 'しらが', meaning: 'Tóc bạc' },
        { word: '白夜', reading: 'びゃくや', meaning: 'Đêm trắng' }
      ]
    },
    kunyomi: {
      reading: 'しろ.い',
      examples: [
        { word: '白い', reading: 'しろい', meaning: 'Màu trắng' }
      ]
    }
  },
  {
    id: 'n5_63',
    kanji: '黒',
    level: 'N5',
    hanViet: 'HẮC',
    meaning: 'Màu đen',
    onyomi: {
      reading: 'コク',
      examples: [
        { word: '黒板', reading: 'こくばん', meaning: 'Bảng đen' },
        { word: '黒海', reading: 'こっかい', meaning: 'Biển Đen' }
      ]
    },
    kunyomi: {
      reading: 'くろ.い',
      examples: [
        { word: '黒い', reading: 'くろい', meaning: 'Màu đen' }
      ]
    }
  },
  {
    id: 'n5_64',
    kanji: '赤',
    level: 'N5',
    hanViet: 'XÍCH',
    meaning: 'Màu đỏ, xích đạo',
    onyomi: {
      reading: 'セキ, シャク',
      examples: [
        { word: '赤道', reading: 'せきどう', meaning: 'Đường xích đạo' },
        { word: '赤十字', reading: 'せきじゅうじ', meaning: 'Hội chữ thập đỏ' }
      ]
    },
    kunyomi: {
      reading: 'あか.い',
      examples: [
        { word: '赤い', reading: 'akai', meaning: 'Màu đỏ' }
      ]
    }
  },
  {
    id: 'n5_65',
    kanji: '青',
    level: 'N5',
    hanViet: 'THANH',
    meaning: 'Xanh da trời, xanh lá, thanh niên',
    onyomi: {
      reading: 'セイ, ショウ',
      examples: [
        { word: '青年', reading: 'せいねん', meaning: 'Thanh niên' },
        { word: '青春', reading: 'せいしゅん', meaning: 'Tuổi thanh xuân' }
      ]
    },
    kunyomi: {
      reading: 'あお.い',
      examples: [
        { word: '青い', reading: 'あおい', meaning: 'Màu xanh da trời/xanh lá' }
      ]
    }
  },

  // ==================== NHÓM 4: CON NGƯỜI, CƠ THỂ & GIA ĐÌNH (15 CHỮ) ====================
  {
    id: 'n5_66',
    kanji: '人',
    level: 'N5',
    hanViet: 'NHÂN',
    meaning: 'Người',
    onyomi: {
      reading: 'ジン, ニン',
      examples: [
        { word: '日本人', reading: 'にほんじん', meaning: 'Người Nhật' },
        { word: '三人', reading: 'さんにん', meaning: 'Ba người' },
        { word: '人間', reading: 'にんげん', meaning: 'Con người' }
      ]
    },
    kunyomi: {
      reading: 'ひと',
      examples: [
        { word: 'この人', reading: 'このひと', meaning: 'Người này' }
      ]
    }
  },
  {
    id: 'n5_67',
    kanji: '子',
    level: 'N5',
    hanViet: 'TỬ',
    meaning: 'Con, trẻ em',
    onyomi: {
      reading: 'シ, ス',
      examples: [
        { word: '電子', reading: 'でんし', meaning: 'Điện tử' },
        { word: '様子', reading: 'ようす', meaning: 'Tình trạng, trạng thái' }
      ]
    },
    kunyomi: {
      reading: 'こ',
      examples: [
        { word: '子供', reading: 'こども', meaning: 'Trẻ em, con cái' },
        { word: '迷子', reading: 'まいご', meaning: 'Trẻ lạc' }
      ]
    }
  },
  {
    id: 'n5_68',
    kanji: '男',
    level: 'N5',
    hanViet: 'NAM',
    meaning: 'Đàn ông, nam giới',
    onyomi: {
      reading: 'ダン, ナン',
      examples: [
        { word: '男性', reading: 'だんせい', meaning: 'Nam giới, đàn ông' },
        { word: '長男', reading: 'ちょうnan', meaning: 'Con trai cả' }
      ]
    },
    kunyomi: {
      reading: 'おとこ',
      examples: [
        { word: '男の子', reading: 'おとconoko', meaning: 'Bé trai' }
      ]
    }
  },
  {
    id: 'n5_69',
    kanji: '女',
    level: 'N5',
    hanViet: 'NỮ',
    meaning: 'Phụ nữ, nữ giới',
    onyomi: {
      reading: 'ジョ',
      examples: [
        { word: '女性', reading: 'じょせい', meaning: 'Nữ giới, phụ nữ' },
        { word: '長女', reading: 'ちょうじょ', meaning: 'Con gái cả' }
      ]
    },
    kunyomi: {
      reading: 'おんな',
      examples: [
        { word: '女の子', reading: 'おんなのこ', meaning: 'Bé gái' }
      ]
    }
  },
  {
    id: 'n5_70',
    kanji: '父',
    level: 'N5',
    hanViet: 'PHỤ',
    meaning: 'Bố, cha',
    onyomi: {
      reading: 'フ',
      examples: [
        { word: '父母', reading: 'ふぼ', meaning: 'Bố mẹ, phụ mẫu' },
        { word: '祖父', reading: 'そふ', meaning: 'Ông (nội, ngoại)' }
      ]
    },
    kunyomi: {
      reading: 'ちち, とう',
      examples: [
        { word: '父', reading: 'ちち', meaning: 'Bố (khi kể về bố mình)' },
        { word: 'お父さん', reading: 'おとうさん', meaning: 'Bố (khi gọi hoặc nói về bố người khác)' }
      ]
    }
  },
  {
    id: 'n5_71',
    kanji: '母',
    level: 'N5',
    hanViet: 'MẪU',
    meaning: 'Mẹ',
    onyomi: {
      reading: 'ボ',
      examples: [
        { word: '母国', reading: 'ぼこく', meaning: 'Mẫu quốc, nước mẹ đẻ' },
        { word: '祖母', reading: 'そぼ', meaning: 'Bà (nội, ngoại)' }
      ]
    },
    kunyomi: {
      reading: 'はは, かあ',
      examples: [
        { word: '母', reading: 'はは', meaning: 'Mẹ (khi kể về mẹ mình)' },
        { word: 'お母さん', reading: 'おかあさん', meaning: 'Mẹ (khi gọi hoặc nói về mẹ người khác)' }
      ]
    }
  },
  {
    id: 'n5_72',
    kanji: '目',
    level: 'N5',
    hanViet: 'MỤC',
    meaning: 'Mắt, mục lục',
    onyomi: {
      reading: 'モク',
      examples: [
        { word: '目的', reading: 'もくてき', meaning: 'Mục đích' },
        { word: '目次', reading: 'もくじ', meaning: 'Mục lục' }
      ]
    },
    kunyomi: {
      reading: 'め',
      examples: [
        { word: '目', reading: 'め', meaning: 'Mắt' },
        { word: '目立ち', reading: 'めだち', meaning: 'Nổi bật' }
      ]
    }
  },
  {
    id: 'n5_73',
    kanji: '耳',
    level: 'N5',
    hanViet: 'NHĨ',
    meaning: 'Tai (bộ phận cơ thể)',
    onyomi: {
      reading: 'ジ',
      examples: [
        { word: '耳鼻科', reading: 'じびか', meaning: 'Khoa tai mũi họng' }
      ]
    },
    kunyomi: {
      reading: 'みみ',
      examples: [
        { word: '耳', reading: 'みみ', meaning: 'Tai' }
      ]
    }
  },
  {
    id: 'n5_74',
    kanji: '口',
    level: 'N5',
    hanViet: 'KHẨU',
    meaning: 'Miệng, lối ra vào',
    onyomi: {
      reading: 'コウ',
      examples: [
        { word: '人口', reading: 'じんこう', meaning: 'Dân số' },
        { word: '窓口', reading: 'まどぐち', meaning: 'Quầy làm thủ tục, bán vé' }
      ]
    },
    kunyomi: {
      reading: 'くち, ぐち',
      examples: [
        { word: '出口', reading: 'でぐち', meaning: 'Lối ra' },
        { word: '入り口', reading: 'いりぐち', meaning: 'Lối vào' }
      ]
    }
  },
  {
    id: 'n5_75',
    kanji: '手',
    level: 'N5',
    hanViet: 'THỦ',
    meaning: 'Tay, bàn tay, ca sĩ/tài xế',
    onyomi: {
      reading: 'シュ',
      examples: [
        { word: '歌手', reading: 'かしゅ', meaning: 'Ca sĩ' },
        { word: '運転手', reading: 'うんてんしゅ', meaning: 'Tài xế' }
      ]
    },
    kunyomi: {
      reading: 'て',
      examples: [
        { word: '手紙', reading: 'てがみ', meaning: 'Lá thư, bức thư' },
        { word: '切手', reading: 'きって', meaning: 'Con tem' }
      ]
    }
  },
  {
    id: 'n5_76',
    kanji: '足',
    level: 'N5',
    hanViet: 'TÚC',
    meaning: 'Chân, đầy đủ',
    onyomi: {
      reading: 'ソク',
      examples: [
        { word: '遠足', reading: 'えんそく', meaning: 'Chuyến dã ngoại' },
        { word: '一足', reading: 'いっそく', meaning: 'Một đôi (giày/vớ)' }
      ]
    },
    kunyomi: {
      reading: 'あし, た.る',
      examples: [
        { word: '足', reading: 'あし', meaning: 'Chân, bàn chân' },
        { word: '足りer', reading: 'たりる', meaning: 'Đầy đủ, đủ' }
      ]
    }
  },
  {
    id: 'n5_77',
    kanji: '名',
    level: 'N5',
    hanViet: 'DANH',
    meaning: 'Tên, nổi tiếng, danh từ',
    onyomi: {
      reading: 'メイ, ミョウ',
      examples: [
        { word: '有名', reading: 'ゆうめい', meaning: 'Nổi tiếng' },
        { word: '名刺', reading: 'めいし', meaning: 'Danh thiếp' },
        { word: '名字', reading: 'みょうじ', meaning: 'Họ (trong họ tên)' }
      ]
    },
    kunyomi: {
      reading: 'な',
      examples: [
        { word: '名前', reading: 'なまえ', meaning: 'Tên, họ tên' }
      ]
    }
  },
  {
    id: 'n5_78',
    kanji: '友',
    level: 'N5',
    hanViet: 'HỮU',
    meaning: 'Bạn bè',
    onyomi: {
      reading: 'ユウ',
      examples: [
        { word: '友人', reading: 'ゆうじん', meaning: 'Bạn bè, chiến hữu' },
        { word: '友情', reading: 'ゆうじょう', meaning: 'Tình bạn' }
      ]
    },
    kunyomi: {
      reading: 'とも',
      examples: [
        { word: '友達', reading: 'ともだち', meaning: 'Bạn bè' }
      ]
    }
  },
  {
    id: 'n5_79',
    kanji: '私',
    level: 'N5',
    hanViet: 'TƯ',
    meaning: 'Tôi, cá nhân',
    onyomi: {
      reading: 'シ',
      examples: [
        { word: '私立', reading: 'しりつ', meaning: 'Tư lập, dân lập' },
        { word: '私鉄', reading: 'してつ', meaning: 'Đường sắt tư doanh' }
      ]
    },
    kunyomi: {
      reading: 'わたし, わたくし',
      examples: [
        { word: '私', reading: 'わたし', meaning: 'Tôi' }
      ]
    }
  },
  {
    id: 'n5_80',
    kanji: '体',
    level: 'N5',
    hanViet: 'THỂ',
    meaning: 'Thân thể, cơ thể, thể dục',
    onyomi: {
      reading: 'タイ, テイ',
      examples: [
        { word: '体温', reading: 'たいおん', meaning: 'Thân nhiệt, nhiệt độ cơ thể' },
        { word: '体育', reading: 'たいいく', meaning: 'Thể dục' },
        { word: '全体', reading: 'ぜんたい', meaning: 'Toàn bộ, toàn thể' }
      ]
    },
    kunyomi: {
      reading: 'からだ',
      examples: [
        { word: '体', reading: 'からだ', meaning: 'Cơ thể, thân thể' }
      ]
    }
  },

  // ==================== NHÓM 5: ĐỘNG TỪ, ĐỜI SỐNG & ĐỊA ĐIỂM (20 CHỮ) ====================
  {
    id: 'n5_81',
    kanji: '行',
    level: 'N5',
    hanViet: 'HÀNH, HÀNG',
    meaning: 'Đi, tiến hành, dòng',
    onyomi: {
      reading: 'コウ, ギョウ',
      examples: [
        { word: '旅行', reading: 'りょこう', meaning: 'Du lịch' },
        { word: '行動', reading: 'こうどう', meaning: 'Hành động' },
        { word: '一行', reading: 'いちぎょう', meaning: 'Một dòng' }
      ]
    },
    kunyomi: {
      reading: 'い.く, おこな.う',
      examples: [
        { word: '行く', reading: 'いく', meaning: 'Đi' },
        { word: 'を行う', reading: 'おこなう', meaning: 'Tiến hành, tổ chức' }
      ]
    }
  },
  {
    id: 'n5_82',
    kanji: '来',
    level: 'N5',
    hanViet: 'LAI',
    meaning: 'Đến, tuần sau, tương lai',
    onyomi: {
      reading: 'ライ',
      examples: [
        { word: '来週', reading: 'らいしゅう', meaning: 'Tuần sau' },
        { word: '来日', reading: 'らいにち', meaning: 'Đến Nhật Bản' },
        { word: '未来', reading: 'みらい', meaning: 'Tương lai' }
      ]
    },
    kunyomi: {
      reading: 'く.る, こ.ない',
      examples: [
        { word: '来る', reading: 'くる', meaning: 'Đến' },
        { word: '来ない', reading: 'こない', meaning: 'Không đến' }
      ]
    }
  },
  {
    id: 'n5_83',
    kanji: '帰',
    level: 'N5',
    hanViet: 'QUY',
    meaning: 'Trở về, về nhà',
    onyomi: {
      reading: 'キ',
      examples: [
        { word: '帰国', reading: 'きこく', meaning: 'Về nước' },
        { word: '帰宅', reading: 'きたく', meaning: 'Về nhà' }
      ]
    },
    kunyomi: {
      reading: 'かえ.る',
      examples: [
        { word: '帰る', reading: 'かえる', meaning: 'Trở về' }
      ]
    }
  },
  {
    id: 'n5_84',
    kanji: '食',
    level: 'N5',
    hanViet: 'THỰC',
    meaning: 'Ăn, bữa ăn, thực phẩm',
    onyomi: {
      reading: 'ショク',
      examples: [
        { word: '食事', reading: 'しょくじ', meaning: 'Bữa ăn' },
        { word: '食堂', reading: 'しょくどう', meaning: 'Nhà ăn, căng tin' },
        { word: '食料品', reading: 'しょくりょうひん', meaning: 'Thực phẩm' }
      ]
    },
    kunyomi: {
      reading: 'た.べる',
      examples: [
        { word: '食べる', reading: 'たべる', meaning: 'Ăn' }
      ]
    }
  },
  {
    id: 'n5_85',
    kanji: '飲',
    level: 'N5',
    hanViet: 'ẨM',
    meaning: 'Uống, đồ uống',
    onyomi: {
      reading: 'イン',
      examples: [
        { word: '飲料水', reading: 'いんryousui', meaning: 'Nước uống đóng chai' }
      ]
    },
    kunyomi: {
      reading: 'の.む',
      examples: [
        { word: '飲む', reading: 'のむ', meaning: 'Uống' },
        { word: '飲み物', reading: 'のみもの', meaning: 'Đồ uống' }
      ]
    }
  },
  {
    id: 'n5_86',
    kanji: '見',
    level: 'N5',
    hanViet: 'KIẾN',
    meaning: 'Nhìn, xem, ý kiến',
    onyomi: {
      reading: 'ケン',
      examples: [
        { word: '見学', reading: 'けんがく', meaning: 'Kiến tập, đi thực tế' },
        { word: '意見', reading: 'いけん', meaning: 'Ý kiến' }
      ]
    },
    kunyomi: {
      reading: 'み.る, み.せる',
      examples: [
        { word: '見る', reading: 'みる', meaning: 'Xem, nhìn' },
        { word: '見せる', reading: 'みせる', meaning: 'Cho xem' }
      ]
    }
  },
  {
    id: 'n5_87',
    kanji: '聞',
    level: 'N5',
    hanViet: 'VĂN',
    meaning: 'Nghe, hỏi, báo chí',
    onyomi: {
      reading: 'ブン, モン',
      examples: [
        { word: '新聞', reading: 'しんぶん', meaning: 'Tờ báo' },
        { word: '前代未聞', reading: 'ぜんだいみもん', meaning: 'Chưa từng có tiền lệ' }
      ]
    },
    kunyomi: {
      reading: 'き.く, き.こえる',
      examples: [
        { word: '聞く', reading: 'きく', meaning: 'Nghe, hỏi' },
        { word: '聞こえる', reading: 'きこえる', meaning: 'Nghe thấy được' }
      ]
    }
  },
  {
    id: 'n5_88',
    kanji: '話',
    level: 'N5',
    hanViet: 'THOẠI',
    meaning: 'Nói chuyện, câu chuyện',
    onyomi: {
      reading: 'ワ',
      examples: [
        { word: '電話', reading: 'でんわ', meaning: 'Điện thoại' },
        { word: '世話', reading: 'せわ', meaning: 'Chăm sóc, hỗ trợ' },
        { word: '話題', reading: 'わだい', meaning: 'Chủ đề thảo luận' }
      ]
    },
    kunyomi: {
      reading: 'はな.す, はなし',
      examples: [
        { word: '話す', reading: 'はなす', meaning: 'Nói chuyện' },
        { word: '話し', reading: 'はなし', meaning: 'Câu chuyện' }
      ]
    }
  },
  {
    id: 'n5_89',
    kanji: '読',
    level: 'N5',
    hanViet: 'ĐỘC',
    meaning: 'Đọc',
    onyomi: {
      reading: 'ドク',
      examples: [
        { word: '読書', reading: 'どくしょ', meaning: 'Đọc sách' },
        { word: '読 giả', reading: 'どくしゃ', meaning: 'Độc giả, người đọc' }
      ]
    },
    kunyomi: {
      reading: 'よ.む',
      examples: [
        { word: '読む', reading: 'よむ', meaning: 'Đọc' }
      ]
    }
  },
  {
    id: 'n5_90',
    kanji: '書',
    level: 'N5',
    hanViet: 'THƯ',
    meaning: 'Viết, cuốn sách, thư viện',
    onyomi: {
      reading: 'ショ',
      examples: [
        { word: '図書館', reading: 'としょかん', meaning: 'Thư viện' },
        { word: '辞書', reading: 'じしょ', meaning: 'Từ điển' },
        { word: '書類', reading: 'しょるい', meaning: 'Tài liệu, hồ sơ' }
      ]
    },
    kunyomi: {
      reading: 'か.く',
      examples: [
        { word: '書く', reading: 'かく', meaning: 'Viết' }
      ]
    }
  },
  {
    id: 'n5_91',
    kanji: '会',
    level: 'N5',
    hanViet: 'HỘI',
    meaning: 'Gặp gỡ, hội thoại, công ty',
    onyomi: {
      reading: 'カイ, エ',
      examples: [
        { word: '会社', reading: 'かいしゃ', meaning: 'Công ty' },
        { word: '会話', reading: 'かいわ', meaning: 'Hội thoại' },
        { word: '国会', reading: 'こっかい', meaning: 'Quốc hội' }
      ]
    },
    kunyomi: {
      reading: 'あ.う',
      examples: [
        { word: '会う', reading: 'あう', meaning: 'Gặp gỡ' },
        { word: '出会い', reading: 'であい', meaning: 'Sự gặp mặt tình cờ' }
      ]
    }
  },
  {
    id: 'n5_92',
    kanji: '買',
    level: 'N5',
    hanViet: 'MÃI',
    meaning: 'Mua',
    onyomi: {
      reading: 'バイ',
      examples: [
        { word: '売買', reading: 'ばいばい', meaning: 'Mua bán' }
      ]
    },
    kunyomi: {
      reading: 'か.う',
      examples: [
        { word: '買う', reading: 'かう', meaning: 'Mua' },
        { word: '買い物', reading: 'かいもの', meaning: 'Mua sắm' }
      ]
    }
  },
  {
    id: 'n5_93',
    kanji: '出',
    level: 'N5',
    hanViet: 'XUẤT',
    meaning: 'Đi ra, nộp, gửi đi',
    onyomi: {
      reading: 'シュツ',
      examples: [
        { word: '外出', reading: 'がいしゅつ', meaning: 'Đi ra ngoài' },
        { word: '出発', reading: 'しゅっぱつ', meaning: 'Xuất phát' },
        { word: '出席', reading: 'しゅっせき', meaning: 'Tham dự, có mặt' }
      ]
    },
    kunyomi: {
      reading: 'で.る, だ.す',
      examples: [
        { word: '出る', reading: 'でる', meaning: 'Đi ra, xuất hiện' },
        { word: '出す', reading: 'だす', meaning: 'Gửi đi, nộp' }
      ]
    }
  },
  {
    id: 'n5_94',
    kanji: '入',
    level: 'N5',
    hanViet: 'NHẬP',
    meaning: 'Đi vào, bỏ vào, nhập khẩu',
    onyomi: {
      reading: 'ニュウ',
      examples: [
        { word: '入学', reading: 'にゅうがく', meaning: 'Nhập học' },
        { word: '輸入', reading: 'ゆにゅう', meaning: 'Nhập khẩu' },
        { word: '入院', reading: 'にゅういん', meaning: 'Nhập viện' }
      ]
    },
    kunyomi: {
      reading: 'はい.る, い.れる',
      examples: [
        { word: '入る', reading: 'はいる', meaning: 'Đi vào' },
        { word: '入れる', reading: 'いれる', meaning: 'Bỏ vào' }
      ]
    }
  },
  {
    id: 'n5_95',
    kanji: '立',
    level: 'N5',
    hanViet: 'LẬP',
    meaning: 'Đứng, đứng lên, thành lập',
    onyomi: {
      reading: 'リツ',
      examples: [
        { word: '私立', reading: 'しりつ', meaning: 'Tư lập, dân lập' },
        { word: '起立', reading: 'きりつ', meaning: 'Đứng lên, đứng dậy' },
        { word: '独立', reading: 'どくりつ', meaning: 'Độc lập' }
      ]
    },
    kunyomi: {
      reading: 'た.つ, た.てる',
      examples: [
        { word: '立つ', reading: 'たつ', meaning: 'Đứng' },
        { word: '目立つ', reading: 'めだち', meaning: 'Nổi bật' }
      ]
    }
  },
  {
    id: 'n5_96',
    kanji: '休',
    level: 'N5',
    hanViet: 'HƯU',
    meaning: 'Nghỉ ngơi, ngày nghỉ',
    onyomi: {
      reading: 'キュウ',
      examples: [
        { word: '休日', reading: 'きゅうじつ', meaning: 'Ngày nghỉ' },
        { word: '連休', reading: 'れんきゅう', meaning: 'Kỳ nghỉ dài ngày' },
        { word: '休学', reading: 'きゅうがく', meaning: 'Nghỉ học tạm thời' }
      ]
    },
    kunyomi: {
      reading: 'やす.む',
      examples: [
        { word: '休む', reading: 'やすむ', meaning: 'Nghỉ ngơi, vắng mặt' },
        { word: '休み', reading: 'やすみ', meaning: 'Ngày nghỉ, giờ giải lao' }
      ]
    }
  },
  {
    id: 'n5_97',
    kanji: '言',
    level: 'N5',
    hanViet: 'NGÔN',
    meaning: 'Nói, lời nói, ngôn ngữ',
    onyomi: {
      reading: 'ゲン, ゴン',
      examples: [
        { word: '言語', reading: 'げんご', meaning: 'Ngôn ngữ' },
        { word: '伝言', reading: 'でんごん', meaning: 'Lời nhắn, tin báo' }
      ]
    },
    kunyomi: {
      reading: 'い.う, こと',
      examples: [
        { word: '言う', reading: 'いう', meaning: 'Nói' },
        { word: '言葉', reading: 'ことば', meaning: 'Từ vựng, lời nói' }
      ]
    }
  },
  {
    id: 'n5_98',
    kanji: '学',
    level: 'N5',
    hanViet: 'HỌC',
    meaning: 'Học tập, trường học, sinh viên',
    onyomi: {
      reading: 'ガク',
      examples: [
        { word: '学生', reading: 'がくせい', meaning: 'Học sinh, sinh viên' },
        { word: '大学', reading: 'だいがく', meaning: 'Trường Đại học' },
        { word: '学校', reading: 'がっこう', meaning: 'Trường học' }
      ]
    },
    kunyomi: {
      reading: 'まな.ぶ',
      examples: [
        { word: '学ぶ', reading: 'まなぶ', meaning: 'Học tập, nghiên cứu' }
      ]
    }
  },
  {
    id: 'n5_99',
    kanji: '校',
    level: 'N5',
    hanViet: 'HIỆU',
    meaning: 'Trường học, hiệu đính',
    onyomi: {
      reading: 'コウ',
      examples: [
        { word: '学校', reading: 'がっこう', meaning: 'Trường học' },
        { word: '校長', reading: 'こうちょう', meaning: 'Hiệu trưởng' },
        { word: '校門', reading: 'こうもん', meaning: 'Cổng trường' }
      ]
    },
    kunyomi: {
      reading: 'N/A',
      examples: []
    }
  },
  {
    id: 'n5_100',
    kanji: '車',
    level: 'N5',
    hanViet: 'XA',
    meaning: 'Xe, xe cộ, xe hơi',
    onyomi: {
      reading: 'シャ',
      examples: [
        { word: '電車', reading: 'でんしゃ', meaning: 'Tàu điện' },
        { word: '自動車', reading: 'じどうしゃ', meaning: 'Xe hơi' },
        { word: '自転車', reading: 'じてんしゃ', meaning: 'Xe đạp' }
      ]
    },
    kunyomi: {
      reading: 'くるま',
      examples: [
        { word: '車', reading: 'くるま', meaning: 'Xe hơi, xe' }
      ]
    }
  },

  // LEVEL N4 (5 items)
  {
    id: 'n4_2',
    kanji: '社',
    level: 'N4',
    hanViet: 'XÃ',
    meaning: 'Đền thờ, công ty, xã hội',
    onyomi: {
      reading: 'シャ',
      examples: [
        { word: '神社', reading: 'じんじゃ', meaning: 'Đền thờ thần đạo' },
        { word: '社会', reading: 'しゃかい', meaning: 'Xã hội' },
        { word: '社長', reading: 'しゃちょう', meaning: 'Giám đốc' }
      ]
    },
    kunyomi: {
      reading: 'やしろ',
      examples: [
        { word: '社', reading: 'やしろ', meaning: 'Ngôi đền thờ nhỏ' }
      ]
    }
  },
  {
    id: 'n4_5',
    kanji: '国',
    level: 'N4',
    hanViet: 'QUỐC',
    meaning: 'Đất nước, quốc gia',
    onyomi: {
      reading: 'コク',
      examples: [
        { word: '外国', reading: 'がいこく', meaning: 'Nước ngoài' },
        { word: '帰国', reading: 'きこく', meaning: 'Về nước' },
        { word: '国籍', reading: 'こくせき', meaning: 'Quốc tịch' }
      ]
    },
    kunyomi: {
      reading: 'くに',
      examples: [
        { word: '国', reading: 'くに', meaning: 'Đất nước' }
      ]
    }
  },

  // LEVEL N3 (5 items)
  {
    id: 'n3_1',
    kanji: '政',
    level: 'N3',
    hanViet: 'CHÍNH',
    meaning: 'Chính trị, chính sách, cai trị',
    onyomi: {
      reading: 'セイ, ショウ',
      examples: [
        { word: '政治', reading: 'せいじ', meaning: 'Chính trị' },
        { word: '政府', reading: 'せいふ', meaning: 'Chính phủ' },
        { word: '政党', reading: 'せいとう', meaning: 'Đảng phái chính trị' }
      ]
    },
    kunyomi: {
      reading: 'まつりごと',
      examples: [
        { word: '政', reading: 'まつりごと', meaning: 'Việc triều chính, chính trị' }
      ]
    }
  },
  {
    id: 'n3_2',
    kanji: '治',
    level: 'N3',
    hanViet: 'TRỊ',
    meaning: 'Cai trị, chữa bệnh, yên ổn',
    onyomi: {
      reading: 'ジ, チ',
      examples: [
        { word: '治療', reading: 'ちりょう', meaning: 'Điều trị bệnh' },
        { word: '自治', reading: 'じち', meaning: 'Tự trị' },
        { word: '治安', reading: 'ちあん', meaning: 'Trật tự an ninh' }
      ]
    },
    kunyomi: {
      reading: 'おさ.める, なお.る',
      examples: [
        { word: '治る', reading: 'なおる', meaning: 'Khỏi bệnh' },
        { word: '治める', reading: 'おさめる', meaning: 'Cai trị, trị vì' }
      ]
    }
  },
  {
    id: 'n3_4',
    kanji: '感',
    level: 'N3',
    hanViet: 'CẢM',
    meaning: 'Cảm giác, cảm động, cảm xúc',
    onyomi: {
      reading: 'カン',
      examples: [
        { word: '感情', reading: 'かんじょう', meaning: 'Cảm xúc' },
        { word: '感謝', reading: 'かんしゃ', meaning: 'Cảm ơn, cảm tạ' },
        { word: '感度', reading: 'かんど', meaning: 'Độ nhạy' }
      ]
    },
    kunyomi: {
      reading: 'N/A',
      examples: []
    }
  }
];
