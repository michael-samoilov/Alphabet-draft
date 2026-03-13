export interface AlphabetChar {
  char: string;
  name: string;
  script: string;
  sound: string;
}

export interface SoundGroup {
  id: string;
  label: string;
  ipa: string;
  category: "vowel" | "consonant";
  characters: AlphabetChar[];
}

// Helper to build characters quickly
function c(char: string, name: string, script: string, sound: string): AlphabetChar {
  return { char, name, script, sound };
}

export const soundGroups: SoundGroup[] = [
  // ═══════════════════════════════════════════════════════
  // VOWELS
  // ═══════════════════════════════════════════════════════
  {
    id: "a", label: "A sound", ipa: "/a/", category: "vowel",
    characters: [
      c("A", "A", "Latin", "a"),
      c("Α", "Alpha", "Greek", "a"),
      c("А", "A", "Cyrillic", "a"),
      c("א", "Aleph", "Hebrew", "ʔ/a"),
      c("ا", "Alif", "Arabic", "aː"),
      c("अ", "A", "Devanagari", "a"),
      c("आ", "Aa", "Devanagari", "aː"),
      c("あ", "A", "Hiragana", "a"),
      c("ア", "A", "Katakana", "a"),
      c("ㅏ", "A", "Korean", "a"),
      c("ㅑ", "Ya", "Korean", "ja"),
      c("Ⲁ", "Alpha", "Coptic", "a"),
      c("Ꭰ", "A", "Cherokee", "a"),
      c("Ꭶ", "Ga", "Cherokee", "ga"),
      c("Ꭷ", "Ka", "Cherokee", "ka"),
      c("ა", "Ani", "Georgian", "a"),
      c("អ", "A", "Khmer", "ʔa"),
      c("ឰ", "Ai", "Khmer", "ai"),
      c("ឳ", "Au", "Khmer", "au"),
      c("อ", "O Ang", "Thai", "ʔ"),
      c("ᠠ", "A", "Mongolian", "a"),
      c("Ա", "Ayb", "Armenian", "a"),
      c("ⴰ", "Ya", "Tifinagh", "a"),
      c("ሀ", "Ha", "Ethiopic", "ha"),
      c("ᚨ", "Ansuz", "Elder Futhark", "a"),
      c("ꦄ", "A", "Javanese", "a"),
      c("ᬅ", "A", "Balinese", "a"),
      c("ᬆ", "Aa", "Balinese", "aː"),
      c("Ⰰ", "Az", "Glagolitic", "a"),
      c("Ä", "A-umlaut", "Latin Extended", "ɛ"),
      c("Å", "A-ring", "Latin Extended", "oː"),
      c("Æ", "Ash", "Latin Extended", "æ"),
      c("Ă", "A-breve", "Latin Extended", "ə"),
      c("Ⱎ", "Yer", "Glagolitic", "ŭ"),
      c("Æ", "Ae", "Icelandic", "ai"),
      c("Á", "A-acute", "Icelandic", "au"),
      c("Ą", "A-ogonek", "Latin Extended", "ɔ̃"),

      c("Ꭵ", "V", "Cherokee", "ə̃"),
      c("Ъ", "Hard Sign", "Cyrillic", "–"),
      c("አ", "A", "Ethiopic", "ʔ"),
      c("ዐ", "Ayin", "Ethiopic", "ʕ"),
      c("ⵄ", "Yaa", "Tifinagh", "ʕ"),

      // Tamil
      c("அ", "A", "Tamil", "a"),
      c("ஆ", "Aa", "Tamil", "aː"),
      c("ஐ", "Ai", "Tamil", "ai"),
      c("ஔ", "Au", "Tamil", "au"),
      // Myanmar
      c("အ", "A", "Myanmar", "a"),
      // Tibetan
      c("འ", "A", "Tibetan", "a"),
      c("ཨ", "A", "Tibetan", "a"),
      // Syriac
      c("ܐ", "Alaph", "Syriac", "ʔ"),
      // Lao
      c("ອ", "O", "Lao", "ʔ"),
      // Sinhala
      c("අ", "A", "Sinhala", "a"),
      c("ආ", "Aa", "Sinhala", "aː"),
      c("ඇ", "Ae", "Sinhala", "æ"),
      c("ඈ", "Aee", "Sinhala", "æː"),
      // N'Ko
      c("ߊ", "A", "N'Ko", "a"),
      // Tengwar (Elvish)
      c("\uE040", "Three Dots", "Tengwar (Elvish)", "a")
    ],
  },
  {
    id: "e", label: "E sound", ipa: "/e/", category: "vowel",
    characters: [
      c("E", "E", "Latin", "e"),
      c("Ε", "Epsilon", "Greek", "e"),
      c("Е", "Ye", "Cyrillic", "je"),
      c("Э", "E", "Cyrillic", "e"),
      c("ע", "Ayin", "Hebrew", "ʕ"),
      c("ए", "E", "Devanagari", "eː"),
      c("ऐ", "Ai", "Devanagari", "əi"),
      c("え", "E", "Hiragana", "e"),
      c("エ", "E", "Katakana", "e"),
      c("ㅔ", "E", "Korean", "e"),
      c("ㅐ", "Ae", "Korean", "ɛ"),
      c("ㅖ", "Ye", "Korean", "je"),
      c("ㅒ", "Yae", "Korean", "jɛ"),
      c("Ⲉ", "Ei", "Coptic", "e"),
      c("Ꭱ", "E", "Cherokee", "e"),
      c("Ꭸ", "Ge", "Cherokee", "ge"),
      c("Ꭹ", "Gi", "Cherokee", "gi"),
      c("ე", "Eni", "Georgian", "e"),
      c("Ե", "Yech", "Armenian", "e"),
      c("เ", "Sara E", "Thai", "eː"),
      c("แ", "Sara Ae", "Thai", "ɛː"),
      c("ᠡ", "E", "Mongolian", "e"),
      c("ᬏ", "E", "Balinese", "e"),
      c("ᬐ", "Ai", "Balinese", "ai"),
      c("ꦌ", "E", "Javanese", "e"),
      c("Ⰵ", "Yest", "Glagolitic", "e"),
      c("É", "E-acute", "Latin Extended", "e"),
      c("È", "E-grave", "Latin Extended", "ɛ"),
      c("Ê", "E-circumflex", "Latin Extended", "ɛ"),
      c("Ë", "E-diaeresis", "Latin Extended", "e"),
      c("Ę", "E-ogonek", "Latin Extended", "ɛ̃"),

      c("Ᏸ", "Ye", "Cherokee", "je"),
      c("ᛖ", "Ehwaz", "Elder Futhark", "e"),
      c("ⴻ", "Yey", "Tifinagh", "e"),
      c("ᠧ", "Ee", "Mongolian", "eː"),

      // Tamil
      c("எ", "E", "Tamil", "e"),
      c("ஏ", "Ee", "Tamil", "eː"),
      // Sinhala
      c("එ", "E", "Sinhala", "e"),
      c("ඒ", "Ee", "Sinhala", "eː"),
      // N'Ko
      c("ߋ", "E", "N'Ko", "e"),
      c("ߍ", "Ee", "N'Ko", "eː"),
      // Syriac
      c("ܥ", "E", "Syriac", "ʕ"),
      // Khmer
      c("ឯ", "E", "Khmer", "e"),
      // Icelandic
      c("É", "E-acute", "Icelandic", "jɛ"),
      // Tengwar (Elvish)
      c("\uE044", "Acute", "Tengwar (Elvish)", "e"),
    ],
  },
  {
    id: "i", label: "I sound", ipa: "/i/", category: "vowel",
    characters: [
      c("I", "I", "Latin", "i"),
      c("Ι", "Iota", "Greek", "i"),
      c("И", "I", "Cyrillic", "i"),
      c("Ы", "Yeru", "Cyrillic", "ɨ"),
      c("י", "Yod", "Hebrew", "j"),
      c("ي", "Ya", "Arabic", "iː/j"),
      c("इ", "I", "Devanagari", "i"),
      c("ई", "Ii", "Devanagari", "iː"),
      c("い", "I", "Hiragana", "i"),
      c("イ", "I", "Katakana", "i"),
      c("ㅣ", "I", "Korean", "i"),
      c("Ⲓ", "Iota", "Coptic", "i"),
      c("Ꭲ", "I", "Cherokee", "i"),
      c("Ꭺ", "Go", "Cherokee", "go"),
      c("ი", "Ini", "Georgian", "i"),
      c("Ի", "Ini", "Armenian", "i"),
      c("ᠢ", "I", "Mongolian", "i"),
      c("ᬇ", "I", "Balinese", "i"),
      c("ᬈ", "Ii", "Balinese", "iː"),
      c("ꦆ", "I", "Javanese", "i"),
      c("Ⰻ", "Izhe", "Glagolitic", "i"),
      c("Ⰹ", "Izhe (alt)", "Glagolitic", "i"),
      c("Ⰺ", "I", "Glagolitic", "i"),
      c("Ⱏ", "Yeri", "Glagolitic", "ɨ"),
      c("Ⱐ", "Yerj", "Glagolitic", "ĭ"),
      c("Í", "I-acute", "Latin Extended", "i"),
      c("Î", "I-circumflex", "Latin Extended", "i"),
      c("Ï", "I-diaeresis", "Latin Extended", "i"),

      c("Ь", "Soft Sign", "Cyrillic", "ʲ"),
      c("ᛁ", "Isaz", "Elder Futhark", "i"),
      c("ᛇ", "Eihwaz", "Elder Futhark", "iː"),
      c("Ⲏ", "Hori", "Coptic", "iː"),
      c("ⵉ", "Yi", "Tifinagh", "i"),

      // Tamil
      c("இ", "I", "Tamil", "i"),
      c("ஈ", "Ii", "Tamil", "iː"),
      // Sinhala
      c("ඉ", "I", "Sinhala", "i"),
      c("ඊ", "Ii", "Sinhala", "iː"),
      // N'Ko
      c("ߌ", "I", "N'Ko", "i"),
      // Khmer
      c("ឥ", "I", "Khmer", "i"),
      c("ឦ", "Ii", "Khmer", "iː"),
      // Icelandic
      c("Í", "I-acute", "Icelandic", "i"),
      c("Ý", "Y-acute", "Icelandic", "i"),
      // Tengwar (Elvish)
      c("\uE048", "Dot", "Tengwar (Elvish)", "i"),
    ],
  },
  {
    id: "o", label: "O sound", ipa: "/o/", category: "vowel",
    characters: [
      c("O", "O", "Latin", "o"),
      c("Ο", "Omicron", "Greek", "o"),
      c("Ω", "Omega", "Greek", "ɔː"),
      c("О", "O", "Cyrillic", "o"),
      c("ו", "Vav", "Hebrew", "o/v"),
      c("و", "Waw", "Arabic", "uː/w"),
      c("ओ", "O", "Devanagari", "oː"),
      c("औ", "Au", "Devanagari", "əu"),
      c("お", "O", "Hiragana", "o"),
      c("オ", "O", "Katakana", "o"),
      c("ㅗ", "O", "Korean", "o"),
      c("ㅛ", "Yo", "Korean", "jo"),
      c("Ꭳ", "O", "Cherokee", "o"),
      c("Ꭻ", "Gu", "Cherokee", "gu"),
      c("ო", "Oni", "Georgian", "o"),
      c("Ո", "Vo", "Armenian", "vo"),
      c("โ", "Sara O", "Thai", "oː"),
      c("ᠣ", "O", "Mongolian", "o"),
      c("ᬑ", "O", "Balinese", "o"),
      c("ᬒ", "Au", "Balinese", "au"),
      c("ꦎ", "O", "Javanese", "o"),
      c("Ⱁ", "On", "Glagolitic", "o"),
      c("Ⱉ", "Otu", "Glagolitic", "ɔ"),
      c("Ö", "O-umlaut", "Latin Extended", "ø"),
      c("Ø", "O-slash", "Latin Extended", "ø"),
      c("Ô", "O-circumflex", "Latin Extended", "o"),
      c("Ő", "O-double-acute", "Latin Extended", "øː"),
      c("Ö", "O-umlaut", "Icelandic", "œ"),

      c("ᛟ", "Othala", "Elder Futhark", "o"),
      c("Ⲟ", "O", "Coptic", "o"),
      c("Ⲱ", "Oou", "Coptic", "oː"),
      c("ᠥ", "Oe", "Mongolian", "ø"),

      // Tamil
      c("ஒ", "O", "Tamil", "o"),
      c("ஓ", "Oo", "Tamil", "oː"),
      // Sinhala
      c("ඔ", "O", "Sinhala", "o"),
      c("ඕ", "Oo", "Sinhala", "oː"),
      // N'Ko
      c("ߏ", "O", "N'Ko", "o"),
      c("ߐ", "O (long)", "N'Ko", "oː"),
      // Khmer
      c("ឱ", "O", "Khmer", "o"),
      // Icelandic
      c("Ó", "O-acute", "Icelandic", "ou"),
      // Tengwar (Elvish)
      c("\uE04C", "Right Curl", "Tengwar (Elvish)", "o"),
    ],
  },
  {
    id: "u", label: "U sound", ipa: "/u/", category: "vowel",
    characters: [
      c("U", "U", "Latin", "u"),
      c("Υ", "Upsilon", "Greek", "y"),
      c("У", "U", "Cyrillic", "u"),
      c("Ю", "Yu", "Cyrillic", "ju"),
      c("उ", "U", "Devanagari", "u"),
      c("ऊ", "Uu", "Devanagari", "uː"),
      c("う", "U", "Hiragana", "ɯ"),
      c("ウ", "U", "Katakana", "ɯ"),
      c("ㅜ", "U", "Korean", "u"),
      c("ㅠ", "Yu", "Korean", "ju"),
      c("ㅡ", "Eu", "Korean", "ɯ"),
      c("Ꭴ", "U", "Cherokee", "u"),
      c("უ", "Uni", "Georgian", "u"),
      c("Ու", "U", "Armenian", "u"),
      c("ᠤ", "U", "Mongolian", "u"),
      c("ᠦ", "Ue", "Mongolian", "y"),
      c("ᬉ", "U", "Balinese", "u"),
      c("ᬊ", "Uu", "Balinese", "uː"),
      c("ꦈ", "U", "Javanese", "u"),
      c("Ⱆ", "Uk", "Glagolitic", "u"),
      c("Ü", "U-umlaut", "Latin Extended", "y"),
      c("Ù", "U-grave", "Latin Extended", "u"),
      c("Û", "U-circumflex", "Latin Extended", "u"),
      c("Ű", "U-double-acute", "Latin Extended", "yː"),

      c("ᚢ", "Uruz", "Elder Futhark", "u"),
      c("Ⲩ", "He", "Coptic", "w/u"),

      // Tamil
      c("உ", "U", "Tamil", "u"),
      c("ஊ", "Uu", "Tamil", "uː"),
      // Sinhala
      c("උ", "U", "Sinhala", "u"),
      c("ඌ", "Uu", "Sinhala", "uː"),
      // N'Ko
      c("ߎ", "U", "N'Ko", "u"),
      // Khmer
      c("ឧ", "U", "Khmer", "u"),
      c("ឩ", "Uu", "Khmer", "uː"),
      // Icelandic
      c("Ú", "U-acute", "Icelandic", "u"),
      // Tengwar (Elvish)
      c("\uE050", "Left Curl", "Tengwar (Elvish)", "u"),
    ],
  },
  // ═══════════════════════════════════════════════════════
  // CONSONANTS
  // ═══════════════════════════════════════════════════════
  {
    id: "b", label: "B sound", ipa: "/b/", category: "consonant",
    characters: [
      c("B", "B", "Latin", "b"),
      c("Β", "Beta", "Greek", "v"),
      c("Б", "Be", "Cyrillic", "b"),
      c("ב", "Bet", "Hebrew", "b/v"),
      c("ب", "Ba", "Arabic", "b"),
      c("ब", "Ba", "Devanagari", "b"),
      c("भ", "Bha", "Devanagari", "bʱ"),
      c("Ⲃ", "Vida", "Coptic", "v"),
      c("ბ", "Bani", "Georgian", "b"),
      c("Բ", "Ben", "Armenian", "b"),
      c("บ", "Bo Baimai", "Thai", "b"),
      c("ᠪ", "Ba", "Mongolian", "b"),
      c("ⴱ", "Yab", "Tifinagh", "b"),
      c("በ", "Be", "Ethiopic", "b"),
      c("ᛒ", "Berkanan", "Elder Futhark", "b"),
      c("ᬩ", "Ba", "Balinese", "b"),
      c("ᬪ", "Bha", "Balinese", "bʱ"),
      c("ꦧ", "Ba", "Javanese", "b"),
      c("ꦨ", "Bha", "Javanese", "bʱ"),
      c("Ⰱ", "Buky", "Glagolitic", "b"),


      // Myanmar
      c("ဗ", "Ba", "Myanmar", "b"),
      c("ဘ", "Bha", "Myanmar", "bʱ"),
      // Tibetan
      c("བ", "Ba", "Tibetan", "b"),
      // Syriac
      c("ܒ", "Beth", "Syriac", "b"),
      // Lao
      c("ບ", "Bo", "Lao", "b"),
      // Sinhala
      c("බ", "Ba", "Sinhala", "b"),
      c("භ", "Bha", "Sinhala", "bʱ"),
      // N'Ko
      c("ߓ", "Ba", "N'Ko", "b"),
      // Tengwar (Elvish)
      c("\uE005", "Umbar", "Tengwar (Elvish)", "b")
    ],
  },
  {
    id: "g", label: "G sound", ipa: "/ɡ/", category: "consonant",
    characters: [
      c("G", "G", "Latin", "ɡ"),
      c("Γ", "Gamma", "Greek", "ɣ"),
      c("Г", "Ge", "Cyrillic", "ɡ"),
      c("ג", "Gimel", "Hebrew", "ɡ"),
      c("غ", "Ghayn", "Arabic", "ɣ"),
      c("ग", "Ga", "Devanagari", "ɡ"),
      c("घ", "Gha", "Devanagari", "ɡʱ"),
      c("Ⲅ", "Gamma", "Coptic", "ɡ"),
      c("გ", "Gani", "Georgian", "ɡ"),
      c("Գ", "Gim", "Armenian", "ɡ"),
      c("ก", "Ko Kai", "Thai", "k"),
      c("ᠭ", "Ga", "Mongolian", "ɡ"),
      c("ⴳ", "Yag", "Tifinagh", "ɡ"),
      c("ገ", "Ge", "Ethiopic", "ɡ"),
      c("ᚷ", "Gebo", "Elder Futhark", "ɡ"),
      c("ᬕ", "Ga", "Balinese", "ɡ"),
      c("ᬖ", "Gha", "Balinese", "ɡʱ"),
      c("ꦒ", "Ga", "Javanese", "ɡ"),
      c("ꦓ", "Gha", "Javanese", "ɡʱ"),
      c("Ⰳ", "Glagoli", "Glagolitic", "ɡ"),

      c("Ꭶ", "Ga", "Cherokee", "ga"),
      c("Ꭸ", "Ge", "Cherokee", "ge"),
      c("Ꭹ", "Gi", "Cherokee", "gi"),
      c("Ꭺ", "Go", "Cherokee", "go"),
      c("Ꭻ", "Gu", "Cherokee", "gu"),
      c("Ꭼ", "Gv", "Cherokee", "gə̃"),
      c("ღ", "Ghani", "Georgian", "ɣ"),
      c("Ղ", "Ghat", "Armenian", "ɣ"),
      c("ⵖ", "Yagh", "Tifinagh", "ɣ"),

      // Myanmar
      c("ဂ", "Ga", "Myanmar", "ɡ"),
      c("ဃ", "Gha", "Myanmar", "ɡʱ"),
      // Tibetan
      c("ག", "Ga", "Tibetan", "ɡ"),
      // Syriac
      c("ܓ", "Gamal", "Syriac", "ɡ"),
      // Sinhala
      c("ග", "Ga", "Sinhala", "ɡ"),
      c("ඝ", "Gha", "Sinhala", "ɡʱ"),
      // N'Ko
      c("ߜ", "Gba", "N'Ko", "ɡb"),
      // Tengwar (Elvish)
      c("\uE006", "Anga", "Tengwar (Elvish)", "g")
    ],
  },
  {
    id: "d", label: "D sound", ipa: "/d/", category: "consonant",
    characters: [
      c("D", "D", "Latin", "d"),
      c("Δ", "Delta", "Greek", "ð"),
      c("Д", "De", "Cyrillic", "d"),
      c("ד", "Dalet", "Hebrew", "d"),
      c("د", "Dal", "Arabic", "d"),
      c("ذ", "Dhal", "Arabic", "ð"),
      c("द", "Da", "Devanagari", "d"),
      c("ध", "Dha", "Devanagari", "dʱ"),
      c("Ⲇ", "Dalda", "Coptic", "d"),
      c("დ", "Doni", "Georgian", "d"),
      c("Դ", "Da", "Armenian", "d"),
      c("ด", "Do Chada", "Thai", "d"),
      c("ᠳ", "Da", "Mongolian", "d"),
      c("ⴷ", "Yad", "Tifinagh", "d"),
      c("ደ", "De", "Ethiopic", "d"),
      c("ᛞ", "Dagaz", "Elder Futhark", "d"),
      c("ᬤ", "Da", "Balinese", "d"),
      c("ᬥ", "Dha", "Balinese", "dʱ"),
      c("ᬟ", "Da (retroflex)", "Balinese", "ɖ"),
      c("ᬠ", "Dha (retroflex)", "Balinese", "ɖʱ"),
      c("ꦢ", "Da", "Javanese", "d"),
      c("ꦣ", "Dha", "Javanese", "dʱ"),
      c("ꦝ", "Da (retroflex)", "Javanese", "ɖ"),
      c("ꦞ", "Dha (retroflex)", "Javanese", "ɖʱ"),
      c("Ⰴ", "Dobro", "Glagolitic", "d"),

      c("Ꮣ", "Da", "Cherokee", "da"),
      c("Ꮥ", "De", "Cherokee", "de"),
      c("Ꮧ", "Di", "Cherokee", "di"),
      c("Ꮩ", "Do", "Cherokee", "do"),
      c("Ꮪ", "Du", "Cherokee", "du"),
      c("Ꮫ", "Dv", "Cherokee", "də̃"),
      c("ฎ", "Do Chada", "Thai", "d"),
      c("ⴹ", "Yadd", "Tifinagh", "dˤ"),

      // Myanmar
      c("ဍ", "Da", "Myanmar", "d"),
      c("ဎ", "Dha", "Myanmar", "dʱ"),
      c("ဒ", "Da", "Myanmar", "d"),
      c("ဓ", "Dha", "Myanmar", "dʱ"),
      // Tibetan
      c("ད", "Da", "Tibetan", "d"),
      // Syriac
      c("ܕ", "Dalath", "Syriac", "d"),
      // Lao
      c("ດ", "Do", "Lao", "d"),
      // Sinhala
      c("ඩ", "Da", "Sinhala", "d"),
      c("ඪ", "Dha", "Sinhala", "dʱ"),
      c("ද", "Da", "Sinhala", "d"),
      c("ධ", "Dha", "Sinhala", "dʱ"),
      // N'Ko
      c("ߘ", "Da", "N'Ko", "d"),
      // Khmer
      c("ដ", "Da", "Khmer", "d"),
      c("ឌ", "Do", "Khmer", "d"),
      c("ឍ", "Dho", "Khmer", "dʱ"),
      // Tengwar (Elvish)
      c("\uE004", "Ando", "Tengwar (Elvish)", "d"),
    ],
  },
  {
    id: "k", label: "K sound", ipa: "/k/", category: "consonant",
    characters: [
      c("K", "K", "Latin", "k"),
      c("Κ", "Kappa", "Greek", "k"),
      c("К", "Ka", "Cyrillic", "k"),
      c("כ", "Kaf", "Hebrew", "k/x"),
      c("ك", "Kaf", "Arabic", "k"),
      c("क", "Ka", "Devanagari", "k"),
      c("ख", "Kha", "Devanagari", "kʰ"),
      c("か", "Ka", "Hiragana", "ka"),
      c("カ", "Ka", "Katakana", "ka"),
      c("ㄱ", "Giyeok", "Korean", "k/ɡ"),
      c("ㅋ", "Kieuk", "Korean", "kʰ"),
      c("კ", "Kani", "Georgian", "k"),
      c("ქ", "Qari", "Georgian", "kʰ"),
      c("Կ", "Ken", "Armenian", "k"),
      c("ค", "Kho Khwai", "Thai", "kʰ"),
      c("ᠬ", "Ka", "Mongolian", "k"),
      c("ⴽ", "Yak", "Tifinagh", "k"),
      c("ከ", "Ka", "Ethiopic", "k"),
      c("ᬓ", "Ka", "Balinese", "k"),
      c("ᬔ", "Kha", "Balinese", "kʰ"),
      c("ꦏ", "Ka", "Javanese", "k"),
      c("ꦐ", "Ka (Kawi)", "Javanese", "k"),
      c("ꦑ", "Kha", "Javanese", "kʰ"),
      c("Ⰽ", "Kako", "Glagolitic", "k"),
      c("ᚲ", "Kaunan", "Elder Futhark", "k"),

      c("Ꮖ", "Qua", "Cherokee", "kʷa"),
      c("Ꮗ", "Que", "Cherokee", "kʷe"),
      c("Ꮘ", "Qui", "Cherokee", "kʷi"),
      c("Ꮙ", "Quo", "Cherokee", "kʷo"),
      c("Ꮚ", "Quu", "Cherokee", "kʷu"),
      c("Ꮛ", "Quv", "Cherokee", "kʷə̃"),
      c("ก", "Ko Kai", "Thai", "k"),
      c("Ⲕ", "Kapa", "Coptic", "k"),
      c("ቀ", "Qe", "Ethiopic", "kʼ"),
      c("C", "C", "Latin", "k/s"),

      // Tamil
      c("க", "Ka", "Tamil", "k"),
      // Myanmar
      c("က", "Ka", "Myanmar", "k"),
      // Tibetan
      c("ཀ", "Ka", "Tibetan", "k"),
      // Syriac
      c("ܟ", "Kaph", "Syriac", "k"),
      // Lao
      c("ກ", "Ko", "Lao", "k"),
      // Sinhala
      c("ක", "Ka", "Sinhala", "k"),
      // N'Ko
      c("ߞ", "Ka", "N'Ko", "k"),
      // Khmer
      c("ក", "Ka", "Khmer", "k"),
      c("គ", "Ko", "Khmer", "k"),
      // Tengwar (Elvish)
      c("\uE002", "Calma", "Tengwar (Elvish)", "k"),
    ],
  },
  {
    id: "l", label: "L sound", ipa: "/l/", category: "consonant",
    characters: [
      c("L", "L", "Latin", "l"),
      c("Λ", "Lambda", "Greek", "l"),
      c("Л", "El", "Cyrillic", "l"),
      c("ל", "Lamed", "Hebrew", "l"),
      c("ل", "Lam", "Arabic", "l"),
      c("ल", "La", "Devanagari", "l"),
      c("ळ", "Lla", "Devanagari", "ɭ"),
      c("Ⲗ", "Laula", "Coptic", "l"),
      c("ლ", "Lasi", "Georgian", "l"),
      c("Լ", "Liwn", "Armenian", "l"),
      c("ล", "Lo Ling", "Thai", "l"),
      c("ᠯ", "La", "Mongolian", "l"),
      c("ⵍ", "Yal", "Tifinagh", "l"),
      c("ለ", "Le", "Ethiopic", "l"),
      c("ᛚ", "Laguz", "Elder Futhark", "l"),
      c("ᬮ", "La", "Balinese", "l"),
      c("ᬍ", "La lenga", "Balinese", "l̩"),
      c("ᬎ", "La lenga long", "Balinese", "l̩ː"),
      c("ꦭ", "La", "Javanese", "l"),
      c("Ⰾ", "Ljudi", "Glagolitic", "l"),

      c("Ꮃ", "La", "Cherokee", "la"),
      c("Ꮄ", "Le", "Cherokee", "le"),
      c("Ꮅ", "Li", "Cherokee", "li"),
      c("Ꮆ", "Lo", "Cherokee", "lo"),
      c("Ꮇ", "Lu", "Cherokee", "lu"),
      c("Ꮈ", "Lv", "Cherokee", "lə̃"),
      c("Ꮬ", "Dla", "Cherokee", "d͡la"),
      c("Ꮭ", "Tla", "Cherokee", "t͡la"),
      c("Ꮮ", "Tle", "Cherokee", "t͡le"),
      c("Ꮯ", "Tli", "Cherokee", "t͡li"),
      c("Ꮰ", "Tlo", "Cherokee", "t͡lo"),
      c("Ꮱ", "Tlu", "Cherokee", "t͡lu"),
      c("Ꮲ", "Tlv", "Cherokee", "t͡lə̃"),
      c("ฬ", "Lo Chula", "Thai", "l"),

      // Tamil
      c("ல", "La", "Tamil", "l"),
      c("ள", "Lla", "Tamil", "ɭ"),
      // Myanmar
      c("လ", "La", "Myanmar", "l"),
      c("ဠ", "Lla", "Myanmar", "l"),
      // Tibetan
      c("ལ", "La", "Tibetan", "l"),
      // Syriac
      c("ܠ", "Lamadh", "Syriac", "l"),
      // Lao
      c("ລ", "Lo", "Lao", "l"),
      // Sinhala
      c("ල", "La", "Sinhala", "l"),
      // N'Ko
      c("ߟ", "La", "N'Ko", "l"),
      // Khmer
      c("ល", "Lo", "Khmer", "l"),
      c("ឡ", "La", "Khmer", "l"),
      // Tengwar (Elvish)
      c("\uE01A", "Lambe", "Tengwar (Elvish)", "l"),
    ],
  },
  {
    id: "m", label: "M sound", ipa: "/m/", category: "consonant",
    characters: [
      c("M", "M", "Latin", "m"),
      c("Μ", "Mu", "Greek", "m"),
      c("М", "Em", "Cyrillic", "m"),
      c("מ", "Mem", "Hebrew", "m"),
      c("م", "Meem", "Arabic", "m"),
      c("म", "Ma", "Devanagari", "m"),
      c("ま", "Ma", "Hiragana", "ma"),
      c("マ", "Ma", "Katakana", "ma"),
      c("ㅁ", "Mieum", "Korean", "m"),
      c("Ⲙ", "Mi", "Coptic", "m"),
      c("მ", "Mani", "Georgian", "m"),
      c("Մ", "Men", "Armenian", "m"),
      c("ม", "Mo Ma", "Thai", "m"),
      c("ᠮ", "Ma", "Mongolian", "m"),
      c("ⵎ", "Yam", "Tifinagh", "m"),
      c("መ", "Me", "Ethiopic", "m"),
      c("ᛗ", "Mannaz", "Elder Futhark", "m"),
      c("ᬫ", "Ma", "Balinese", "m"),
      c("ꦩ", "Ma", "Javanese", "m"),
      c("Ⰿ", "Myslite", "Glagolitic", "m"),

      c("Ꮉ", "Ma", "Cherokee", "ma"),
      c("Ꮊ", "Me", "Cherokee", "me"),
      c("Ꮋ", "Mi", "Cherokee", "mi"),
      c("Ꮌ", "Mo", "Cherokee", "mo"),
      c("Ꮍ", "Mu", "Cherokee", "mu"),

      // Tamil
      c("ம", "Ma", "Tamil", "m"),
      // Myanmar
      c("မ", "Ma", "Myanmar", "m"),
      // Tibetan
      c("མ", "Ma", "Tibetan", "m"),
      // Syriac
      c("ܡ", "Mim", "Syriac", "m"),
      // Lao
      c("ມ", "Mo", "Lao", "m"),
      // Sinhala
      c("ම", "Ma", "Sinhala", "m"),
      // N'Ko
      c("ߡ", "Ma", "N'Ko", "m"),
      // Khmer
      c("ម", "Mo", "Khmer", "m"),
      // Tengwar (Elvish)
      c("\uE011", "Malta", "Tengwar (Elvish)", "m"),
    ],
  },
  {
    id: "n", label: "N sound", ipa: "/n/", category: "consonant",
    characters: [
      c("N", "N", "Latin", "n"),
      c("Ν", "Nu", "Greek", "n"),
      c("Н", "En", "Cyrillic", "n"),
      c("נ", "Nun", "Hebrew", "n"),
      c("ن", "Noon", "Arabic", "n"),
      c("न", "Na", "Devanagari", "n"),
      c("ण", "Nna", "Devanagari", "ɳ"),
      c("ञ", "Nya", "Devanagari", "ɲ"),
      c("ङ", "Nga", "Devanagari", "ŋ"),
      c("な", "Na", "Hiragana", "na"),
      c("ナ", "Na", "Katakana", "na"),
      c("ㄴ", "Nieun", "Korean", "n"),
      c("Ⲛ", "Ni", "Coptic", "n"),
      c("ნ", "Nari", "Georgian", "n"),
      c("Ն", "Nu", "Armenian", "n"),
      c("น", "No Nu", "Thai", "n"),
      c("ᠨ", "Na", "Mongolian", "n"),
      c("ⵏ", "Yan", "Tifinagh", "n"),
      c("ነ", "Ne", "Ethiopic", "n"),
      c("ᚾ", "Naudiz", "Elder Futhark", "n"),
      c("ᬦ", "Na", "Balinese", "n"),
      c("ᬡ", "Na (retroflex)", "Balinese", "ɳ"),
      c("ᬜ", "Nya", "Balinese", "ɲ"),
      c("ꦤ", "Na", "Javanese", "n"),
      c("ꦟ", "Na (retroflex)", "Javanese", "ɳ"),
      c("ꦘ", "Nya", "Javanese", "ɲ"),
      c("ꦚ", "Nya (alt)", "Javanese", "ɲ"),
      c("Ⱀ", "Nash", "Glagolitic", "n"),
      c("Ñ", "Enye", "Latin Extended", "ɲ"),

      c("Ꮎ", "Na", "Cherokee", "na"),
      c("Ꮏ", "Hna", "Cherokee", "hna"),
      c("Ꮐ", "Nah", "Cherokee", "naʔ"),
      c("Ꮑ", "Ne", "Cherokee", "ne"),
      c("Ꮒ", "Ni", "Cherokee", "ni"),
      c("Ꮓ", "No", "Cherokee", "no"),
      c("Ꮔ", "Nu", "Cherokee", "nu"),
      c("Ꮕ", "Nv", "Cherokee", "nə̃"),
      c("ณ", "No Nen", "Thai", "n"),
      c("ኘ", "Nye", "Ethiopic", "ɲ"),

      // Tamil
      c("ண", "Na", "Tamil", "ɳ"),
      c("ந", "Na", "Tamil", "n"),
      c("ன", "Na", "Tamil", "n"),
      c("ஞ", "Nya", "Tamil", "ɲ"),
      // Myanmar
      c("ဉ", "Nya", "Myanmar", "ɲ"),
      c("ည", "Nya", "Myanmar", "ɲ"),
      c("ဏ", "Na", "Myanmar", "ɳ"),
      c("န", "Na", "Myanmar", "n"),
      // Tibetan
      c("ན", "Na", "Tibetan", "n"),
      c("ཉ", "Nya", "Tibetan", "ɲ"),
      // Syriac
      c("ܢ", "Nun", "Syriac", "n"),
      // Lao
      c("ນ", "No", "Lao", "n"),
      // Sinhala
      c("ණ", "Na", "Sinhala", "ɳ"),
      c("න", "Na", "Sinhala", "n"),
      c("ඤ", "Nya", "Sinhala", "ɲ"),
      // N'Ko
      c("ߠ", "Na (palatal)", "N'Ko", "ɲ"),
      c("ߣ", "Na", "N'Ko", "n"),
      c("ߢ", "Nya", "N'Ko", "ɲ"),
      c("ߧ", "Nya (alt)", "N'Ko", "ɲ"),
      // Khmer
      c("ញ", "Nyo", "Khmer", "ɲ"),
      c("ណ", "Na", "Khmer", "n"),
      c("ន", "No", "Khmer", "n"),
      // Tengwar (Elvish)
      c("\uE010", "Númen", "Tengwar (Elvish)", "n"),
    ],
  },
  {
    id: "p", label: "P sound", ipa: "/p/", category: "consonant",
    characters: [
      c("P", "P", "Latin", "p"),
      c("Π", "Pi", "Greek", "p"),
      c("П", "Pe", "Cyrillic", "p"),
      c("פ", "Pe", "Hebrew", "p/f"),
      c("प", "Pa", "Devanagari", "p"),
      c("फ", "Pha", "Devanagari", "pʰ"),
      c("ㅂ", "Bieup", "Korean", "p/b"),
      c("ㅍ", "Pieup", "Korean", "pʰ"),
      c("Ⲡ", "Pi", "Coptic", "p"),
      c("პ", "Pari", "Georgian", "p"),
      c("Պ", "Pe", "Armenian", "p"),
      c("ป", "Po Pla", "Thai", "p"),
      c("พ", "Pho Phan", "Thai", "pʰ"),
      c("ᠫ", "Pa", "Mongolian", "p"),
      c("ⵒ", "Yap", "Tifinagh", "p"),
      c("ᛈ", "Pertho", "Elder Futhark", "p"),
      c("ᬧ", "Pa", "Balinese", "p"),
      c("ᬨ", "Pha", "Balinese", "pʰ"),
      c("ꦥ", "Pa", "Javanese", "p"),
      c("ꦦ", "Pha", "Javanese", "pʰ"),
      c("Ⱂ", "Pokoji", "Glagolitic", "p"),
      c("ፐ", "Pe", "Ethiopic", "p"),

      c("ფ", "Pari", "Georgian", "pʰ"),
      c("ผ", "Pho Phueng", "Thai", "pʰ"),
      c("ภ", "Pho Samphao", "Thai", "pʰ"),
      c("Ⲫ", "Phi", "Coptic", "pʰ"),
      c("ጰ", "Phe", "Ethiopic", "pʼ"),

      // Tamil
      c("ப", "Pa", "Tamil", "p"),
      // Myanmar
      c("ပ", "Pa", "Myanmar", "p"),
      c("ဖ", "Pha", "Myanmar", "pʰ"),
      // Tibetan
      c("པ", "Pa", "Tibetan", "p"),
      c("ཕ", "Pha", "Tibetan", "pʰ"),
      // Syriac
      c("ܦ", "Pe", "Syriac", "p"),
      // Lao
      c("ປ", "Po", "Lao", "p"),
      // Sinhala
      c("ප", "Pa", "Sinhala", "p"),
      c("ඵ", "Pha", "Sinhala", "pʰ"),
      // N'Ko
      c("ߔ", "Pa", "N'Ko", "p"),
      // Lao (aspirated)
      c("ຜ", "Pho", "Lao", "pʰ"),
      c("ພ", "Pho", "Lao", "pʰ"),
      // Khmer
      c("ប", "Pa", "Khmer", "p"),
      c("ផ", "Pha", "Khmer", "pʰ"),
      c("ព", "Po", "Khmer", "p"),
      c("ភ", "Pho", "Khmer", "pʰ"),
      // Tengwar (Elvish)
      c("\uE001", "Parma", "Tengwar (Elvish)", "p"),
    ],
  },
  {
    id: "r", label: "R sound", ipa: "/r/", category: "consonant",
    characters: [
      c("R", "R", "Latin", "r"),
      c("Ρ", "Rho", "Greek", "r"),
      c("Р", "Er", "Cyrillic", "r"),
      c("ר", "Resh", "Hebrew", "ʁ"),
      c("ر", "Ra", "Arabic", "r"),
      c("र", "Ra", "Devanagari", "r"),
      c("ら", "Ra", "Hiragana", "ɾa"),
      c("ラ", "Ra", "Katakana", "ɾa"),
      c("ㄹ", "Rieul", "Korean", "ɾ/l"),
      c("Ⲣ", "Ro", "Coptic", "r"),
      c("რ", "Rae", "Georgian", "r"),
      c("Ր", "Re", "Armenian", "r"),
      c("ร", "Ro Ruea", "Thai", "r"),
      c("ᠷ", "Ra", "Mongolian", "r"),
      c("ⵔ", "Yar", "Tifinagh", "r"),
      c("ረ", "Re", "Ethiopic", "r"),
      c("ᚱ", "Raido", "Elder Futhark", "r"),
      c("ᬭ", "Ra", "Balinese", "r"),
      c("ᬋ", "Ra repa", "Balinese", "r̩"),
      c("ᬌ", "Ra repa long", "Balinese", "r̩ː"),
      c("ꦫ", "Ra", "Javanese", "r"),
      c("ꦬ", "Ra (alt)", "Javanese", "r"),
      c("Ⱃ", "Ritsi", "Glagolitic", "r"),
      c("Ř", "R-hacek", "Latin Extended", "r̝"),

      c("Ռ", "Rra", "Armenian", "r"),
      c("ⵕ", "Yarr", "Tifinagh", "rˤ"),

      // Tamil
      c("ர", "Ra", "Tamil", "r"),
      c("ற", "Rra", "Tamil", "r"),
      // Myanmar
      c("ရ", "Ra", "Myanmar", "r"),
      // Tibetan
      c("ར", "Ra", "Tibetan", "r"),
      // Syriac
      c("ܪ", "Resh", "Syriac", "r"),
      // Lao
      c("ຣ", "Ro", "Lao", "r"),
      // Sinhala
      c("ර", "Ra", "Sinhala", "r"),
      // N'Ko
      c("ߙ", "Ra", "N'Ko", "r"),
      c("ߚ", "Rra", "N'Ko", "r"),
      // Khmer
      c("រ", "Ro", "Khmer", "r"),
      // Tengwar (Elvish)
      c("\uE018", "Rómen", "Tengwar (Elvish)", "r"),
    ],
  },
  {
    id: "s", label: "S sound", ipa: "/s/", category: "consonant",
    characters: [
      c("S", "S", "Latin", "s"),
      c("Σ", "Sigma", "Greek", "s"),
      c("С", "Es", "Cyrillic", "s"),
      c("ס", "Samekh", "Hebrew", "s"),
      c("س", "Seen", "Arabic", "s"),
      c("ص", "Sad", "Arabic", "sˤ"),
      c("स", "Sa", "Devanagari", "s"),
      c("さ", "Sa", "Hiragana", "sa"),
      c("サ", "Sa", "Katakana", "sa"),
      c("ㅅ", "Siot", "Korean", "s"),
      c("ㅆ", "Ssang Siot", "Korean", "s*"),
      c("Ⲥ", "Sima", "Coptic", "s"),
      c("ს", "Sani", "Georgian", "s"),
      c("Ս", "Se", "Armenian", "s"),
      c("ส", "So Suea", "Thai", "s"),
      c("ᠰ", "Sa", "Mongolian", "s"),
      c("ⵙ", "Yas", "Tifinagh", "s"),
      c("ሰ", "Se", "Ethiopic", "s"),
      c("ᛊ", "Sowilo", "Elder Futhark", "s"),
      c("ᬲ", "Sa", "Balinese", "s"),
      c("ꦱ", "Sa", "Javanese", "s"),
      c("Ⱄ", "Slovo", "Glagolitic", "s"),
      c("ß", "Eszett", "Latin Extended", "s"),
      c("Ç", "C-cedilla", "Latin Extended", "s"),
      c("Ś", "S-acute", "Latin Extended", "ɕ"),

      c("Ꮜ", "Sa", "Cherokee", "sa"),
      c("Ꮝ", "S", "Cherokee", "s"),
      c("Ꮞ", "Se", "Cherokee", "se"),
      c("Ꮟ", "Si", "Cherokee", "si"),
      c("Ꮠ", "So", "Cherokee", "so"),
      c("Ꮡ", "Su", "Cherokee", "su"),
      c("Ꮢ", "Sv", "Cherokee", "sə̃"),
      c("ซ", "So So", "Thai", "s"),
      c("ศ", "So Sala", "Thai", "s"),
      c("ษ", "So Ruesi", "Thai", "s"),
      c("Ⲋ", "Sou", "Coptic", "s"),
      c("ሠ", "Sze", "Ethiopic", "s"),
      c("ⵚ", "Yass", "Tifinagh", "sˤ"),

      // Tamil
      c("ச", "Ca", "Tamil", "s"),
      c("ஸ", "Sa", "Tamil", "s"),
      // Myanmar
      c("စ", "Sa", "Myanmar", "s"),
      c("ဆ", "Hsa", "Myanmar", "sʰ"),
      // Tibetan
      c("ས", "Sa", "Tibetan", "s"),
      // Syriac
      c("ܣ", "Semkath", "Syriac", "s"),
      c("ܨ", "Sadhe", "Syriac", "sˤ"),
      // Lao
      c("ຊ", "So", "Lao", "s"),
      // Sinhala
      c("ස", "Sa", "Sinhala", "s"),
      // N'Ko
      c("ߛ", "Sa", "N'Ko", "s"),
      // Khmer
      c("ស", "So", "Khmer", "s"),
      // Tengwar (Elvish)
      c("\uE01C", "Silme", "Tengwar (Elvish)", "s"),
    ],
  },
  {
    id: "t", label: "T sound", ipa: "/t/", category: "consonant",
    characters: [
      c("T", "T", "Latin", "t"),
      c("Τ", "Tau", "Greek", "t"),
      c("Т", "Te", "Cyrillic", "t"),
      c("ת", "Tav", "Hebrew", "t"),
      c("ט", "Tet", "Hebrew", "t"),
      c("ت", "Ta", "Arabic", "t"),
      c("ط", "Tta", "Arabic", "tˤ"),
      c("त", "Ta", "Devanagari", "t"),
      c("थ", "Tha", "Devanagari", "tʰ"),
      c("ट", "Tta", "Devanagari", "ʈ"),
      c("ठ", "Ttha", "Devanagari", "ʈʰ"),
      c("た", "Ta", "Hiragana", "ta"),
      c("タ", "Ta", "Katakana", "ta"),
      c("ㄷ", "Digeut", "Korean", "t/d"),
      c("ㅌ", "Tieut", "Korean", "tʰ"),
      c("Ⲧ", "Tau", "Coptic", "t"),
      c("თ", "Tani", "Georgian", "tʰ"),
      c("ტ", "Tari", "Georgian", "tʼ"),
      c("Տ", "Tiwn", "Armenian", "t"),
      c("ต", "To Tao", "Thai", "t"),
      c("ถ", "Tho Thung", "Thai", "tʰ"),
      c("ᠲ", "Ta", "Mongolian", "t"),
      c("ⵜ", "Yat", "Tifinagh", "t"),
      c("ተ", "Te", "Ethiopic", "t"),
      c("ᛏ", "Tiwaz", "Elder Futhark", "t"),
      c("ᬢ", "Ta", "Balinese", "t"),
      c("ᬣ", "Tha", "Balinese", "tʰ"),
      c("ᬝ", "Ta (retroflex)", "Balinese", "ʈ"),
      c("ᬞ", "Tha (retroflex)", "Balinese", "ʈʰ"),
      c("ꦠ", "Ta", "Javanese", "t"),
      c("ꦡ", "Tha", "Javanese", "tʰ"),
      c("ꦛ", "Ta (retroflex)", "Javanese", "ʈ"),
      c("ꦜ", "Tha (retroflex)", "Javanese", "ʈʰ"),
      c("Ⱅ", "Tvrido", "Glagolitic", "t"),

      c("Ꮤ", "Ta", "Cherokee", "ta"),
      c("Ꮦ", "Te", "Cherokee", "te"),
      c("Ꮨ", "Ti", "Cherokee", "ti"),
      c("ฏ", "To Patak", "Thai", "t"),
      c("ฐ", "Tho Than", "Thai", "tʰ"),
      c("ฑ", "Tho Nangmon", "Thai", "tʰ"),
      c("ฒ", "Tho Phuthao", "Thai", "tʰ"),
      c("ท", "Tho Thahan", "Thai", "tʰ"),
      c("ธ", "Tho Thong", "Thai", "tʰ"),
      c("Ⲑ", "Thetha", "Coptic", "tʰ"),
      c("Ϯ", "Ti", "Coptic", "ti"),
      c("ጠ", "The", "Ethiopic", "tʼ"),
      c("ⵟ", "Yatt", "Tifinagh", "tˤ"),

      // Tamil
      c("ட", "Ta", "Tamil", "ʈ"),
      c("த", "Tha", "Tamil", "t"),
      c("သ", "Tha", "Myanmar", "tʰ"),
      // Myanmar
      c("ဋ", "Ta", "Myanmar", "t"),
      c("ဌ", "Hta", "Myanmar", "tʰ"),
      c("တ", "Ta", "Myanmar", "t"),
      c("ထ", "Hta", "Myanmar", "tʰ"),
      // Tibetan
      c("ཏ", "Ta", "Tibetan", "t"),
      c("ཐ", "Tha", "Tibetan", "tʰ"),
      // Syriac
      c("ܛ", "Teth", "Syriac", "tˤ"),
      c("ܬ", "Taw", "Syriac", "t"),
      // Lao
      c("ຕ", "To", "Lao", "t"),
      c("ຖ", "Tho", "Lao", "tʰ"),
      c("ທ", "Tho", "Lao", "tʰ"),
      // Sinhala
      c("ට", "Ta", "Sinhala", "ʈ"),
      c("ඨ", "Tha", "Sinhala", "ʈʰ"),
      c("ත", "Ta", "Sinhala", "t"),
      c("ථ", "Tha", "Sinhala", "tʰ"),
      // N'Ko
      c("ߕ", "Ta", "N'Ko", "t"),
      // Khmer
      c("ឋ", "Tho", "Khmer", "tʰ"),
      c("ត", "Ta", "Khmer", "t"),
      c("ថ", "Tha", "Khmer", "tʰ"),
      c("ទ", "To", "Khmer", "t"),
      c("ធ", "Tho", "Khmer", "tʰ"),
      // Tengwar (Elvish)
      c("\uE000", "Tinco", "Tengwar (Elvish)", "t"),
    ],
  },
  {
    id: "f", label: "F sound", ipa: "/f/", category: "consonant",
    characters: [
      c("F", "F", "Latin", "f"),
      c("Φ", "Phi", "Greek", "f"),
      c("Ф", "Ef", "Cyrillic", "f"),
      c("ف", "Fa", "Arabic", "f"),
      c("פ", "Fe (soft)", "Hebrew", "f"),
      c("Ⲫ", "Phi", "Coptic", "pʰ"),
      c("ფ", "Pari", "Georgian", "pʰ"),
      c("Փ", "Piwr", "Armenian", "pʰ"),
      c("ฟ", "Fo Fan", "Thai", "f"),
      c("ᚠ", "Fehu", "Elder Futhark", "f"),
      c("Ⱇ", "Frt", "Glagolitic", "f"),
      c("ⴼ", "Yaf", "Tifinagh", "f"),
      c("ፈ", "Fe", "Ethiopic", "f"),

      c("Ֆ", "Fe", "Armenian", "f"),
      c("ฝ", "Fo Fa", "Thai", "f"),
      c("Ϥ", "Fai", "Coptic", "f"),

      // Lao
      c("ຝ", "Fo", "Lao", "f"),
      c("ຟ", "Fo", "Lao", "f"),
      // N'Ko
      c("ߝ", "Fa", "N'Ko", "f"),
      // Tengwar (Elvish)
      c("\uE009", "Formen", "Tengwar (Elvish)", "f")
    ],
  },
  {
    id: "h", label: "H sound", ipa: "/h/", category: "consonant",
    characters: [
      c("H", "H", "Latin", "h"),
      c("Η", "Eta", "Greek", "iː"),
      c("ה", "He", "Hebrew", "h"),
      c("ح", "Haa", "Arabic", "ħ"),
      c("ه", "Ha", "Arabic", "h"),
      c("ह", "Ha", "Devanagari", "ɦ"),
      c("は", "Ha", "Hiragana", "ha"),
      c("ハ", "Ha", "Katakana", "ha"),
      c("ㅎ", "Hieut", "Korean", "h"),
      c("Ⲏ", "Hori", "Coptic", "h"),
      c("ჰ", "Hae", "Georgian", "h"),
      c("Հ", "Ho", "Armenian", "h"),
      c("ห", "Ho Hip", "Thai", "h"),
      c("ᬳ", "Ha", "Balinese", "h"),
      c("ꦲ", "Ha", "Javanese", "h"),
      c("ᚺ", "Hagalaz", "Elder Futhark", "h"),
      c("Ⱈ", "Heru", "Glagolitic", "x"),
      c("ⵀ", "Yah", "Tifinagh", "h"),
      c("ኀ", "Hha", "Ethiopic", "h"),

      c("Ꭽ", "Ha", "Cherokee", "ha"),
      c("Ꭾ", "He", "Cherokee", "he"),
      c("Ꭿ", "Hi", "Cherokee", "hi"),
      c("Ꮀ", "Ho", "Cherokee", "ho"),
      c("Ꮁ", "Hu", "Cherokee", "hu"),
      c("Ꮂ", "Hv", "Cherokee", "hə̃"),
      c("ฮ", "Ho Nokhuk", "Thai", "h"),
      c("Ϩ", "Hori", "Coptic", "h"),
      c("ሀ", "Ha", "Ethiopic", "h"),
      c("ሐ", "Hha", "Ethiopic", "ħ"),
      c("ⵃ", "Yahh", "Tifinagh", "ħ"),

      // Tamil
      c("ஹ", "Ha", "Tamil", "h"),
      // Myanmar
      c("ဟ", "Ha", "Myanmar", "h"),
      // Tibetan
      c("ཧ", "Ha", "Tibetan", "h"),
      // Syriac
      c("ܗ", "He", "Syriac", "h"),
      c("ܚ", "Heth", "Syriac", "ħ"),
      // Lao
      c("ຫ", "Ho", "Lao", "h"),
      c("ຮ", "Ho", "Lao", "h"),
      // Sinhala
      c("හ", "Ha", "Sinhala", "h"),
      // N'Ko
      c("ߤ", "Ha", "N'Ko", "h"),
      // Khmer
      c("ហ", "Ho", "Khmer", "h"),
      // Tengwar (Elvish)
      c("\uE00A", "Harma", "Tengwar (Elvish)", "h"),
      c("\uE020", "Hyarmen", "Tengwar (Elvish)", "h"),
    ],
  },
  {
    id: "v", label: "V sound", ipa: "/v/", category: "consonant",
    characters: [
      c("V", "V", "Latin", "v"),
      c("В", "Ve", "Cyrillic", "v"),
      c("ו", "Vav", "Hebrew", "v"),
      c("ვ", "Vini", "Georgian", "v"),
      c("Վ", "Vew", "Armenian", "v"),
      c("Ⲃ", "Vida", "Coptic", "v"),
      c("Ⰲ", "Vede", "Glagolitic", "v"),

      c("ቨ", "Ve", "Ethiopic", "v"),

      // Tamil
      c("வ", "Va", "Tamil", "v"),
      // Sinhala
      c("ව", "Va", "Sinhala", "v"),
      // Khmer
      c("វ", "Vo", "Khmer", "v"),
      // Tengwar (Elvish)
      c("\uE00D", "Ampa", "Tengwar (Elvish)", "v"),
      c("\uE017", "Vilya", "Tengwar (Elvish)", "v"),
    ],
  },
  {
    id: "w", label: "W sound", ipa: "/w/", category: "consonant",
    characters: [
      c("W", "W", "Latin", "w"),
      c("わ", "Wa", "Hiragana", "wa"),
      c("ワ", "Wa", "Katakana", "wa"),
      c("व", "Va", "Devanagari", "ʋ"),
      c("ว", "Wo Waen", "Thai", "w"),
      c("ወ", "We", "Ethiopic", "w"),
      c("ⵡ", "Yaw", "Tifinagh", "w"),
      c("ᬯ", "Wa", "Balinese", "w"),
      c("ꦮ", "Wa", "Javanese", "w"),
      c("ᚹ", "Wunjo", "Elder Futhark", "w"),
      c("Ł", "L-stroke", "Latin Extended", "w"),

      c("Ꮹ", "Wa", "Cherokee", "wa"),
      c("Ꮺ", "We", "Cherokee", "we"),
      c("Ꮻ", "Wi", "Cherokee", "wi"),
      c("Ꮼ", "Wo", "Cherokee", "wo"),
      c("Ꮽ", "Wu", "Cherokee", "wu"),
      c("Ꮾ", "Wv", "Cherokee", "wə̃"),
      c("ᠸ", "Wa", "Mongolian", "w"),

      // Syriac
      c("ܘ", "Waw", "Syriac", "w"),
      // Myanmar
      c("ဝ", "Wa", "Myanmar", "w"),
      // Tibetan
      c("ཝ", "Wa", "Tibetan", "w"),
      // Lao
      c("ວ", "Wo", "Lao", "w"),
      // N'Ko
      c("ߥ", "Wa", "N'Ko", "w"),
      // Tengwar (Elvish)
      c("\uE015", "Vala", "Tengwar (Elvish)", "w")
    ],
  },
  {
    id: "j", label: "J/Y sound", ipa: "/j/", category: "consonant",
    characters: [
      c("J", "J", "Latin", "dʒ"),
      c("Y", "Y", "Latin", "j"),
      c("Й", "Short I", "Cyrillic", "j"),
      c("Я", "Ya", "Cyrillic", "ja"),
      c("や", "Ya", "Hiragana", "ja"),
      c("ヤ", "Ya", "Katakana", "ja"),
      c("ゆ", "Yu", "Hiragana", "jɯ"),
      c("ユ", "Yu", "Katakana", "jɯ"),
      c("よ", "Yo", "Hiragana", "jo"),
      c("ヨ", "Yo", "Katakana", "jo"),
      c("ㅈ", "Jieut", "Korean", "tɕ"),
      c("ㅉ", "Ssang Jieut", "Korean", "tɕ*"),
      c("य", "Ya", "Devanagari", "j"),
      c("ᬚ", "Ja", "Balinese", "dʒ"),
      c("ᬛ", "Jha", "Balinese", "dʒʱ"),
      c("ꦗ", "Ja", "Javanese", "dʒ"),
      c("ꦙ", "Jha", "Javanese", "dʒʱ"),
      c("ᬬ", "Ya", "Balinese", "j"),
      c("ꦪ", "Ya", "Javanese", "j"),
      c("ย", "Yo Yak", "Thai", "j"),
      c("የ", "Ye", "Ethiopic", "j"),
      c("Ⰼ", "Djerv", "Glagolitic", "dʒ"),
      c("ᛃ", "Jera", "Elder Futhark", "j"),

      c("Ꮿ", "Ya", "Cherokee", "ja"),
      c("Ᏹ", "Yi", "Cherokee", "ji"),
      c("Ᏺ", "Yo", "Cherokee", "jo"),
      c("Ᏻ", "Yu", "Cherokee", "ju"),
      c("Ᏼ", "Yv", "Cherokee", "jə̃"),
      c("ჯ", "Jani", "Georgian", "dʒ"),
      c("Ջ", "Jheh", "Armenian", "dʒ"),
      c("ญ", "Yo Ying", "Thai", "j"),
      c("Ϫ", "Gangia", "Coptic", "dʒ"),
      c("ጀ", "Je", "Ethiopic", "dʒ"),
      c("ⵢ", "Yay", "Tifinagh", "j"),
      c("ᠵ", "Ja", "Mongolian", "dʒ"),
      c("ᠶ", "Ya", "Mongolian", "j"),

      // Tamil
      c("ய", "Ya", "Tamil", "j"),
      // Myanmar
      c("ယ", "Ya", "Myanmar", "j"),
      // Tibetan
      c("ཡ", "Ya", "Tibetan", "j"),
      c("ཇ", "Ja", "Tibetan", "dʒ"),
      // Syriac
      c("ܝ", "Yodh", "Syriac", "j"),
      // Lao
      c("ຍ", "Nyo", "Lao", "j"),
      c("ຢ", "Yo", "Lao", "j"),
      // Sinhala
      c("ය", "Ya", "Sinhala", "j"),
      c("ජ", "Ja", "Sinhala", "dʒ"),
      c("ඣ", "Jha", "Sinhala", "dʒʱ"),
      // N'Ko
      c("ߖ", "Ja", "N'Ko", "dʒ"),
      c("ߦ", "Ya", "N'Ko", "j"),
      // Khmer
      c("យ", "Yo", "Khmer", "j"),
      // Tengwar (Elvish)
      c("\uE016", "Anna", "Tengwar (Elvish)", "j"),
      c("\uE021", "Yanta", "Tengwar (Elvish)", "j"),
    ],
  },
  {
    id: "z", label: "Z sound", ipa: "/z/", category: "consonant",
    characters: [
      c("Z", "Z", "Latin", "z"),
      c("Ζ", "Zeta", "Greek", "z"),
      c("З", "Ze", "Cyrillic", "z"),
      c("Ж", "Zhe", "Cyrillic", "ʒ"),
      c("ז", "Zayin", "Hebrew", "z"),
      c("ز", "Zayn", "Arabic", "z"),
      c("ظ", "Dha", "Arabic", "ðˤ"),
      c("ज", "Ja", "Devanagari", "dʒ"),
      c("झ", "Jha", "Devanagari", "dʒʱ"),
      c("ზ", "Zeni", "Georgian", "z"),
      c("ჟ", "Zhani", "Georgian", "ʒ"),
      c("Զ", "Za", "Armenian", "z"),
      c("Ժ", "Zhe", "Armenian", "ʒ"),
      c("ⵣ", "Yaz", "Tifinagh", "z"),
      c("ⵥ", "Yazh", "Tifinagh", "ʒ"),
      c("ᛉ", "Algiz", "Elder Futhark", "z"),
      c("ዘ", "Ze", "Ethiopic", "z"),
      c("Ⰶ", "Zhivete", "Glagolitic", "ʒ"),
      c("Ⰸ", "Zemlja", "Glagolitic", "z"),
      c("Ż", "Z-dot", "Latin Extended", "ʐ"),
      c("Ź", "Z-acute", "Latin Extended", "ʑ"),
      c("Ž", "Z-caron", "Latin Extended", "ʒ"),

      c("Ⲍ", "Zata", "Coptic", "z"),
      c("ዠ", "Zhe", "Ethiopic", "ʒ"),
      c("ⵊ", "Yazh", "Tifinagh", "ʒ"),

      // Myanmar
      c("ဇ", "Za", "Myanmar", "z"),
      c("ဈ", "Za", "Myanmar", "z"),
      // Tibetan
      c("ཟ", "Za", "Tibetan", "z"),
      // Syriac
      c("ܙ", "Zayn", "Syriac", "z"),
      // Tengwar (Elvish)
      c("\uE01E", "Áre", "Tengwar (Elvish)", "z")
    ],
  },
  {
    id: "sh", label: "SH sound", ipa: "/ʃ/", category: "consonant",
    characters: [
      c("Ш", "Sha", "Cyrillic", "ʃ"),
      c("Щ", "Shcha", "Cyrillic", "ɕː"),
      c("ש", "Shin", "Hebrew", "ʃ"),
      c("ش", "Sheen", "Arabic", "ʃ"),
      c("श", "Sha", "Devanagari", "ʃ"),
      c("ष", "Ssa", "Devanagari", "ʂ"),
      c("し", "Shi", "Hiragana", "ɕi"),
      c("シ", "Shi", "Katakana", "ɕi"),
      c("შ", "Shini", "Georgian", "ʃ"),
      c("Շ", "Sha", "Armenian", "ʃ"),
      c("ซ", "So So", "Thai", "s"),
      c("ᬰ", "Sa (palatal)", "Balinese", "ɕ"),
      c("ᬱ", "Sa (retroflex)", "Balinese", "ʂ"),
      c("ꦯ", "Sa (palatal)", "Javanese", "ɕ"),
      c("ꦰ", "Sa (retroflex)", "Javanese", "ʂ"),
      c("Ⱍ", "Sha", "Glagolitic", "ʃ"),
      c("Ⱊ", "Shta", "Glagolitic", "ʃt"),
      c("Š", "S-caron", "Latin Extended", "ʃ"),
      c("ሸ", "She", "Ethiopic", "ʃ"),
      c("ⵛ", "Yash", "Tifinagh", "ʃ"),

      c("Ϣ", "Shai", "Coptic", "ʃ"),
      c("ᠱ", "Sha", "Mongolian", "ʃ"),

      // Tamil
      c("ஷ", "Sha", "Tamil", "ʃ"),
      // Tibetan
      c("ཤ", "Sha", "Tibetan", "ʃ"),
      c("ཞ", "Zha", "Tibetan", "ʒ"),
      // Syriac
      c("ܫ", "Shin", "Syriac", "ʃ"),
      // Tamil (zha - retroflex)
      c("ழ", "Zha", "Tamil", "ɻ"),
      // Sinhala
      c("ශ", "Sha", "Sinhala", "ʃ"),
      c("ෂ", "Sha", "Sinhala", "ʂ")
    ],
  },
  {
    id: "ch", label: "CH sound", ipa: "/tʃ/", category: "consonant",
    characters: [
      c("Ч", "Che", "Cyrillic", "tʃ"),
      c("ח", "Chet", "Hebrew", "x/ħ"),
      c("چ", "Che", "Arabic", "tʃ"),
      c("च", "Cha", "Devanagari", "tʃ"),
      c("छ", "Chha", "Devanagari", "tʃʰ"),
      c("ち", "Chi", "Hiragana", "tɕi"),
      c("チ", "Chi", "Katakana", "tɕi"),
      c("ㅊ", "Chieut", "Korean", "tɕʰ"),
      c("ჩ", "Chini", "Georgian", "tʃ"),
      c("ჭ", "Chari", "Georgian", "tʃʼ"),
      c("Չ", "Cha", "Armenian", "tʃ"),
      c("ช", "Cho Chang", "Thai", "tɕʰ"),
      c("ᬘ", "Ca", "Balinese", "tʃ"),
      c("ᬙ", "Cha", "Balinese", "tʃʰ"),
      c("ꦕ", "Ca", "Javanese", "tʃ"),
      c("ꦖ", "Cha", "Javanese", "tʃʰ"),
      c("Ⱌ", "Chrvi", "Glagolitic", "tʃ"),
      c("Č", "C-caron", "Latin Extended", "tʃ"),
      c("ᠴ", "Cha", "Mongolian", "tʃ"),
      c("ⵞ", "Yach", "Tifinagh", "tʃ"),
      c("ቸ", "Che", "Ethiopic", "tʃ"),

      c("Ճ", "Cheh", "Armenian", "tʃ"),
      c("จ", "Cho Chan", "Thai", "tɕ"),
      c("ฉ", "Cho Ching", "Thai", "tɕʰ"),
      c("ฌ", "Cho Choe", "Thai", "tɕʰ"),
      c("Ϭ", "Shima", "Coptic", "tʃ"),
      c("ጨ", "Che", "Ethiopic", "tʃʼ"),

      // Tibetan
      c("ཅ", "Ca", "Tibetan", "tʃ"),
      c("ཆ", "Cha", "Tibetan", "tʃʰ"),
      // Sinhala
      c("ච", "Ca", "Sinhala", "tʃ"),
      c("ඡ", "Cha", "Sinhala", "tʃʰ"),
      // Lao
      c("ຈ", "Cho", "Lao", "tɕ"),
      // N'Ko
      c("ߗ", "Cha", "N'Ko", "tʃ"),
      // Khmer
      c("ច", "Cha", "Khmer", "tʃ"),
      c("ឆ", "Chha", "Khmer", "tʃʰ"),
      c("ជ", "Cho", "Khmer", "tʃ"),
      c("ឈ", "Chho", "Khmer", "tʃʰ"),
    ],
  },
  {
    id: "th", label: "TH sound", ipa: "/θ/", category: "consonant",
    characters: [
      c("Θ", "Theta", "Greek", "θ"),
      c("ث", "Tha", "Arabic", "θ"),
      c("Ð", "Eth (upper)", "Icelandic", "ð"),
      c("ð", "Eth", "Icelandic", "ð"),
      c("Þ", "Thorn", "Icelandic", "θ"),
      c("Ð", "Eth", "Latin Extended", "ð"),
      c("Þ", "Thorn", "Latin Extended", "θ"),
      c("Ⲑ", "Thetha", "Coptic", "tʰ"),
      c("ᚦ", "Thurisaz", "Elder Futhark", "θ"),
      // Tengwar (Elvish)
      c("\uE008", "Thúle", "Tengwar (Elvish)", "θ"),
    ],
  },
  {
    id: "ng", label: "NG sound", ipa: "/ŋ/", category: "consonant",
    characters: [
      c("Ŋ", "Eng", "Latin Extended", "ŋ"),
      c("ᬗ", "Nga", "Balinese", "ŋ"),
      c("ꦔ", "Nga", "Javanese", "ŋ"),
      c("ㅇ", "Ieung", "Korean", "ŋ"),
      c("ง", "Ngo Ngu", "Thai", "ŋ"),
      c("ᛜ", "Ingwaz", "Elder Futhark", "ŋ"),
      c("ŋ", "Eng (lower)", "Latin Extended", "ŋ"),

      c("ᠩ", "Ang", "Mongolian", "ŋ"),

      // Tamil
      c("ங", "Nga", "Tamil", "ŋ"),
      // Myanmar
      c("င", "Nga", "Myanmar", "ŋ"),
      // Tibetan
      c("ང", "Nga", "Tibetan", "ŋ"),
      // Lao
      c("ງ", "Ngo", "Lao", "ŋ"),
      // Sinhala
      c("ඞ", "Nga", "Sinhala", "ŋ"),
      // Khmer
      c("ង", "Ngo", "Khmer", "ŋ"),
      // Tengwar (Elvish)
      c("\uE012", "Noldo", "Tengwar (Elvish)", "ŋ"),
    ],
  },
  {
    id: "ts", label: "TS sound", ipa: "/ts/", category: "consonant",
    characters: [
      c("Ц", "Tse", "Cyrillic", "ts"),
      c("צ", "Tsade", "Hebrew", "ts"),
      c("つ", "Tsu", "Hiragana", "tsɯ"),
      c("ツ", "Tsu", "Katakana", "tsɯ"),
      c("ც", "Tsani", "Georgian", "ts"),
      c("წ", "Tsili", "Georgian", "tsʼ"),
      c("Ծ", "Tsa", "Armenian", "ts"),
      c("Ց", "Tso", "Armenian", "tsʰ"),
      c("Ⰷ", "Dzelo", "Glagolitic", "dz"),
      c("Ⱋ", "Tsi", "Glagolitic", "ts"),
      c("ጸ", "Tse", "Ethiopic", "tsʼ"),

      c("Ꮳ", "Tsa", "Cherokee", "tsa"),
      c("Ꮴ", "Tse", "Cherokee", "tse"),
      c("Ꮵ", "Tsi", "Cherokee", "tsi"),
      c("Ꮶ", "Tso", "Cherokee", "tso"),
      c("Ꮷ", "Tsu", "Cherokee", "tsu"),
      c("Ꮸ", "Tsv", "Cherokee", "tsə̃"),
      c("ძ", "Dzi", "Georgian", "dz"),
      c("Ձ", "Ja", "Armenian", "dz"),
      c("ፀ", "Tze", "Ethiopic", "tsʼ"),

      // Tibetan
      c("ཙ", "Tsa", "Tibetan", "ts"),
      c("ཚ", "Tsha", "Tibetan", "tsʰ"),
      c("ཛ", "Dza", "Tibetan", "dz")
    ],
  },
  {
    id: "kh", label: "KH sound", ipa: "/x/", category: "consonant",
    characters: [
      c("Χ", "Chi", "Greek", "x"),
      c("Х", "Kha", "Cyrillic", "x"),
      c("خ", "Kha", "Arabic", "x"),
      c("ख", "Kha", "Devanagari", "kʰ"),
      c("ხ", "Khani", "Georgian", "x"),
      c("Խ", "Khe", "Armenian", "x"),
      c("ข", "Kho Khai", "Thai", "kʰ"),
      c("ᠬ", "Kha", "Mongolian", "x"),
      c("ⵅ", "Yakh", "Tifinagh", "x"),

      c("ฃ", "Kho Khuat", "Thai", "kʰ"),
      c("ค", "Kho Khwai", "Thai", "kʰ"),
      c("ฅ", "Kho Khon", "Thai", "kʰ"),
      c("ฆ", "Kho Rakhang", "Thai", "kʰ"),
      c("Ⲭ", "Khi", "Coptic", "kʰ"),
      c("Ϧ", "Khai", "Coptic", "x"),
      c("ኸ", "Kha", "Ethiopic", "x"),

      // Myanmar
      c("ခ", "Kha", "Myanmar", "kʰ"),
      // Tibetan
      c("ཁ", "Kha", "Tibetan", "kʰ"),
      // Lao
      c("ຂ", "Kho", "Lao", "kʰ"),
      c("ຄ", "Kho", "Lao", "kʰ"),
      // Sinhala
      c("ඛ", "Kha", "Sinhala", "kʰ"),
      // Khmer
      c("ខ", "Kha", "Khmer", "kʰ"),
      c("ឃ", "Kho", "Khmer", "kʰ"),
    ],
  },
  {
    id: "q", label: "Q sound", ipa: "/q/", category: "consonant",
    characters: [
      c("Q", "Q", "Latin", "kw"),
      c("ق", "Qaf", "Arabic", "q"),
      c("ק", "Qof", "Hebrew", "q"),
      c("ყ", "Qari", "Georgian", "qʼ"),
      c("ቀ", "Qe", "Ethiopic", "kʼ"),
      c("ⵇ", "Yaq", "Tifinagh", "q"),


      // Syriac
      c("ܩ", "Qoph", "Syriac", "q")
    ],
  },
  {
    id: "x", label: "X sound", ipa: "/ks/", category: "consonant",
    characters: [
      c("X", "X", "Latin", "ks"),
      c("Ξ", "Xi", "Greek", "ks"),
      c("Ⲝ", "Ksi", "Coptic", "ks"),

      c("Ψ", "Psi", "Greek", "ps"),
      c("Ⲯ", "Psi", "Coptic", "ps"),
    ],
  },
  // ── Additional Hiragana/Katakana rows ──
  {
    id: "na-row", label: "NA row", ipa: "/na/", category: "consonant",
    characters: [
      c("に", "Ni", "Hiragana", "ɲi"),
      c("ニ", "Ni", "Katakana", "ɲi"),
      c("ぬ", "Nu", "Hiragana", "nɯ"),
      c("ヌ", "Nu", "Katakana", "nɯ"),
      c("ね", "Ne", "Hiragana", "ne"),
      c("ネ", "Ne", "Katakana", "ne"),
      c("の", "No", "Hiragana", "no"),
      c("ノ", "No", "Katakana", "no")
    ],
  },
  {
    id: "ha-row", label: "HA row", ipa: "/ha/", category: "consonant",
    characters: [
      c("ひ", "Hi", "Hiragana", "çi"),
      c("ヒ", "Hi", "Katakana", "çi"),
      c("ふ", "Fu", "Hiragana", "ɸɯ"),
      c("フ", "Fu", "Katakana", "ɸɯ"),
      c("へ", "He", "Hiragana", "he"),
      c("ヘ", "He", "Katakana", "he"),
      c("ほ", "Ho", "Hiragana", "ho"),
      c("ホ", "Ho", "Katakana", "ho")
    ],
  },
  {
    id: "ka-row", label: "KA row", ipa: "/ka/", category: "consonant",
    characters: [
      c("き", "Ki", "Hiragana", "ki"),
      c("キ", "Ki", "Katakana", "ki"),
      c("く", "Ku", "Hiragana", "kɯ"),
      c("ク", "Ku", "Katakana", "kɯ"),
      c("け", "Ke", "Hiragana", "ke"),
      c("ケ", "Ke", "Katakana", "ke"),
      c("こ", "Ko", "Hiragana", "ko"),
      c("コ", "Ko", "Katakana", "ko")
    ],
  },
  {
    id: "sa-row", label: "SA row", ipa: "/sa/", category: "consonant",
    characters: [
      c("す", "Su", "Hiragana", "sɯ"),
      c("ス", "Su", "Katakana", "sɯ"),
      c("せ", "Se", "Hiragana", "se"),
      c("セ", "Se", "Katakana", "se"),
      c("そ", "So", "Hiragana", "so"),
      c("ソ", "So", "Katakana", "so")
    ],
  },
  {
    id: "ta-row", label: "TA row", ipa: "/ta/", category: "consonant",
    characters: [
      c("て", "Te", "Hiragana", "te"),
      c("テ", "Te", "Katakana", "te"),
      c("と", "To", "Hiragana", "to"),
      c("ト", "To", "Katakana", "to")
    ],
  },
  {
    id: "ma-row", label: "MA row", ipa: "/ma/", category: "consonant",
    characters: [
      c("み", "Mi", "Hiragana", "mi"),
      c("ミ", "Mi", "Katakana", "mi"),
      c("む", "Mu", "Hiragana", "mɯ"),
      c("ム", "Mu", "Katakana", "mɯ"),
      c("め", "Me", "Hiragana", "me"),
      c("メ", "Me", "Katakana", "me"),
      c("も", "Mo", "Hiragana", "mo"),
      c("モ", "Mo", "Katakana", "mo")
    ],
  },
  {
    id: "ra-row", label: "RA row", ipa: "/ɾa/", category: "consonant",
    characters: [
      c("り", "Ri", "Hiragana", "ɾi"),
      c("リ", "Ri", "Katakana", "ɾi"),
      c("る", "Ru", "Hiragana", "ɾɯ"),
      c("ル", "Ru", "Katakana", "ɾɯ"),
      c("れ", "Re", "Hiragana", "ɾe"),
      c("レ", "Re", "Katakana", "ɾe"),
      c("ろ", "Ro", "Hiragana", "ɾo"),
      c("ロ", "Ro", "Katakana", "ɾo")
    ],
  },
  {
    id: "special-jp", label: "Special (JP)", ipa: "/n/", category: "consonant",
    characters: [
      c("ん", "N", "Hiragana", "n"),
      c("ン", "N", "Katakana", "n"),
      c("を", "Wo", "Hiragana", "o"),
      c("ヲ", "Wo", "Katakana", "o")
    ],
  }
];

/** All unique script names in the dataset */
export const allScripts = Array.from(
  new Set(soundGroups.flatMap((g) => g.characters.map((c) => c.script)))
).sort();

/** Get all characters for a given script, deduped by char */
export function getCharactersByScript(script: string): {
  character: AlphabetChar;
  soundGroup: SoundGroup;
}[] {
  const seen = new Set<string>();
  const results: { character: AlphabetChar; soundGroup: SoundGroup }[] = [];
  for (const group of soundGroups) {
    for (const char of group.characters) {
      if (char.script === script && !seen.has(char.char)) {
        seen.add(char.char);
        results.push({ character: char, soundGroup: group });
      }
    }
  }
  return results;
}
