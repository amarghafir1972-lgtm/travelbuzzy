export type Phrase = {
  english: string;
  local: string;
  pronunciation: string;
  emoji: string;
  tip?: string;
};

export type PhrasesData = {
  language: string;
  script?: string;
  flag: string;
  phrases: Phrase[];
  culturalNote?: string;
};

const phrases: Record<string, PhrasesData> = {
  bali: {
    language: "Balinese / Indonesian",
    flag: "🇮🇩",
    phrases: [
      { emoji: "👋", english: "Hello / Good day",      local: "Om Swastiastu",   pronunciation: "ohm swah-stee-AH-stoo",  tip: "Traditional Balinese Hindu greeting — locals will be delighted" },
      { emoji: "🙏", english: "Thank you",             local: "Matur suksma",    pronunciation: "mah-TUR sook-smah",       tip: "Balinese thanks — more appreciated than the Indonesian 'terima kasih'" },
      { emoji: "💬", english: "How much?",             local: "Pira?",           pronunciation: "PEE-rah",                 tip: "Always bargain politely at markets" },
      { emoji: "😋", english: "Delicious!",            local: "Enak banget!",    pronunciation: "EH-nak BAHN-get",         tip: "Indonesian — use at warungs to make the owner's day" },
      { emoji: "🚗", english: "Where is…?",            local: "Di mana…?",       pronunciation: "dee MAH-nah",              },
      { emoji: "🔢", english: "Too expensive",         local: "Terlalu mahal",   pronunciation: "ter-LAH-loo mah-HAHL",    tip: "Essential for market bargaining" },
      { emoji: "✌️", english: "No thank you",          local: "Tidak, terima kasih", pronunciation: "tee-DAHK, ter-ee-mah KAH-see" },
      { emoji: "🍽️", english: "No chilli please",     local: "Jangan pedas",    pronunciation: "JAHN-gahn PEH-dahs",      tip: "Vital if you can't handle heat" },
      { emoji: "🚽", english: "Where's the toilet?",  local: "Di mana kamar kecil?", pronunciation: "dee MAH-nah KAH-mar KEH-cheel" },
      { emoji: "🤝", english: "Nice to meet you",     local: "Senang bertemu",   pronunciation: "seh-NAHNG ber-TEH-moo"    },
    ],
    culturalNote: "Always use your right hand to pass or receive items. Pointing with one finger is rude — use your whole hand or thumb.",
  },

  santorini: {
    language: "Greek",
    flag: "🇬🇷",
    phrases: [
      { emoji: "👋", english: "Hello",                local: "Γεια σας (formal) / Γεια σου", pronunciation: "YAH-sahs / YAH-soo",    tip: "Use 'Γεια σας' with older people or shopkeepers" },
      { emoji: "🙏", english: "Thank you",            local: "Ευχαριστώ",        pronunciation: "ef-hah-rees-TOH",         tip: "Greeks love it when visitors make an effort" },
      { emoji: "🍷", english: "Cheers!",              local: "Στην υγειά μας!",   pronunciation: "steen yee-AH mahs",       tip: "Always make eye contact when clinking glasses" },
      { emoji: "😋", english: "Very tasty!",          local: "Πολύ νόστιμο!",    pronunciation: "poh-LEE NOHS-tee-moh"     },
      { emoji: "💬", english: "How much?",            local: "Πόσο κάνει;",      pronunciation: "POH-soh KAH-nee"          },
      { emoji: "🗺️", english: "Where is…?",          local: "Πού είναι…;",      pronunciation: "poo EE-neh"               },
      { emoji: "✌️", english: "Yes / No",            local: "Ναι / Όχι",        pronunciation: "neh / OH-hee",            tip: "'Ναι' sounds like 'nay' in English — don't get confused!" },
      { emoji: "🍽️", english: "The bill please",     local: "Τον λογαριασμό παρακαλώ", pronunciation: "ton lo-gahr-YAHZ-moh pah-rah-kah-LOH" },
      { emoji: "🚽", english: "Where's the toilet?", local: "Πού είναι η τουαλέτα;", pronunciation: "poo EE-neh ee too-ah-LEH-tah" },
      { emoji: "🌅", english: "Beautiful!",           local: "Πανέμορφο!",        pronunciation: "pah-NEH-mor-foh"          },
    ],
    culturalNote: "The Greek 'yes' (Ναι) sounds like the English word 'nay' — remember this or you'll do the opposite of what you intend!",
  },

  tokyo: {
    language: "Japanese",
    flag: "🇯🇵",
    phrases: [
      { emoji: "👋", english: "Hello / Good day",     local: "こんにちは",        pronunciation: "kon-NEE-chee-wah",        tip: "Use for daytime; 'ohayou' in morning, 'konbanwa' in evening" },
      { emoji: "🙏", english: "Thank you",            local: "ありがとうございます", pronunciation: "ah-ree-GAH-toh goh-ZAI-mahs", tip: "The full form is polite — use it in shops and restaurants" },
      { emoji: "😔", english: "Sorry / Excuse me",   local: "すみません",         pronunciation: "soo-mee-mah-SEN",         tip: "Also used to get a waiter's attention — very versatile" },
      { emoji: "🍜", english: "This one please",      local: "これをください",      pronunciation: "koh-reh oh koo-dah-SAI",   tip: "Point at the menu item — perfect if you can't read the kanji" },
      { emoji: "💬", english: "How much?",            local: "いくらですか?",      pronunciation: "ee-KOO-rah des-kah"        },
      { emoji: "🗺️", english: "Where is…?",          local: "…はどこですか?",     pronunciation: "…wah DOH-koh des-kah"     },
      { emoji: "🚃", english: "Train station",        local: "駅",               pronunciation: "EH-kee"                   },
      { emoji: "🍱", english: "Delicious!",           local: "おいしい!",          pronunciation: "oh-ee-SHEE",              tip: "Say it after a meal and the chef will be thrilled" },
      { emoji: "🚽", english: "Where's the toilet?", local: "トイレはどこですか?", pronunciation: "TOH-ee-reh wah DOH-koh des-kah" },
      { emoji: "🥂", english: "Cheers!",              local: "乾杯!",             pronunciation: "KAN-pye",                 tip: "Wait for everyone to be served before drinking" },
    ],
    culturalNote: "Don't tip — it can be considered rude. Also, eat and walk at the same time only in theme parks or festivals; elsewhere it's considered bad manners.",
  },

  maldives: {
    language: "Dhivehi",
    flag: "🇲🇻",
    phrases: [
      { emoji: "👋", english: "Hello",               local: "Assalaam alaikum", pronunciation: "ah-sah-LAHM ah-LAY-koom",  tip: "Used widely across the Maldives; respond 'Wa alaikum assalaam'" },
      { emoji: "🙏", english: "Thank you",           local: "Shukuriyya",       pronunciation: "shoo-KOO-ree-ya"           },
      { emoji: "😊", english: "How are you?",        local: "Kihineh?",         pronunciation: "kee-HEE-neh",             tip: "Locals will be surprised and happy you know this one" },
      { emoji: "😋", english: "Tasty / Good",        local: "Reethi",           pronunciation: "REE-tee"                   },
      { emoji: "💬", english: "How much?",           local: "Varakee ithuru?",  pronunciation: "va-rah-KEE ee-too-ROO"     },
      { emoji: "🏝️", english: "Beautiful island",   local: "Reethi raa'je",    pronunciation: "REE-tee RAH-jeh"           },
      { emoji: "✌️", english: "Yes / No",           local: "Aan / Noon",       pronunciation: "ahn / noon"                },
      { emoji: "🚽", english: "Toilet",              local: "Baithulkhalaa",    pronunciation: "BAY-tool-kah-LAH"          },
      { emoji: "👋", english: "Goodbye",             local: "Dhanee baivaan",   pronunciation: "dah-NEE buy-VAHN"          },
      { emoji: "🐟", english: "Fish (it's everywhere!)", local: "Mas",         pronunciation: "mahs",                    tip: "The Maldivian diet revolves around mas (fish) — a handy word at local cafés" },
    ],
    culturalNote: "The Maldives is a Muslim country. Dress modestly on local islands (cover shoulders and knees). Alcohol is only permitted at resort islands.",
  },

  paris: {
    language: "French",
    flag: "🇫🇷",
    phrases: [
      { emoji: "👋", english: "Hello",               local: "Bonjour",          pronunciation: "bon-ZHOOR",               tip: "Always greet with Bonjour before asking anything — skipping it is considered rude" },
      { emoji: "🙏", english: "Thank you",           local: "Merci",            pronunciation: "mair-SEE"                  },
      { emoji: "😔", english: "Excuse me / Sorry",   local: "Excusez-moi",      pronunciation: "ex-koo-ZAY mwah",         tip: "Use this to get attention or navigate a crowded metro" },
      { emoji: "🍷", english: "A glass of wine",     local: "Un verre de vin",  pronunciation: "un VAIR deh van"           },
      { emoji: "☕", english: "A coffee please",     local: "Un café, s'il vous plaît", pronunciation: "un kah-FAY seel voo PLAY", tip: "'Un café' is a short espresso — ask for 'un café allongé' for a longer one" },
      { emoji: "💬", english: "How much is this?",   local: "C'est combien?",   pronunciation: "say kom-BYAN"              },
      { emoji: "🗺️", english: "Where is…?",         local: "Où est…?",         pronunciation: "oo ay"                    },
      { emoji: "🍽️", english: "The bill please",    local: "L'addition, s'il vous plaît", pronunciation: "lah-dee-SYON seel voo PLAY" },
      { emoji: "✌️", english: "Do you speak English?", local: "Parlez-vous anglais?", pronunciation: "par-LAY voo ahn-GLAY", tip: "Ask this in French and most Parisians will switch to English happily" },
      { emoji: "😊", english: "It's delicious!",     local: "C'est délicieux!",  pronunciation: "say day-lee-SYUH",        tip: "Say this about any food and you'll win over the chef or waiter instantly" },
    ],
    culturalNote: "Always say 'Bonjour' when entering any shop or café, and 'Au revoir' when leaving. It's not optional — it's considered basic politeness.",
  },
};

export function getPhrasesData(slug: string): PhrasesData | null {
  return phrases[slug] ?? null;
}
