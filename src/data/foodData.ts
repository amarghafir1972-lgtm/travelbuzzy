export type Dish = {
  name: string;
  emoji: string;
  description: string;
  mustTry?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
};

export type Drink = {
  name: string;
  emoji: string;
  description: string;
  alcoholic: boolean;
};

export type EatByBudget = {
  tier: "budget" | "mid" | "luxury";
  emoji: string;
  label: string;
  priceRange: string;
  where: string;
  tip: string;
};

export type DietaryNote = {
  diet: string;
  emoji: string;
  note: string;
  rating: "easy" | "manageable" | "difficult";
};

export type FoodData = {
  cuisine: string;
  summary: string;
  dishes: Dish[];
  drinks: Drink[];
  byBudget: EatByBudget[];
  dietary: DietaryNote[];
  foodTip: string;
  marketTip?: string;
};

const foodData: Record<string, FoodData> = {
  bali: {
    cuisine: "Balinese & Indonesian",
    summary: "Balinese food is aromatic, rich with spice, and built around rice, fresh vegetables, and grilled meats. The island's Hindu culture means pork appears far more than elsewhere in Indonesia — a key difference from mainland dishes.",
    dishes: [
      { name: "Babi Guling",       emoji: "🐷", description: "Slow-roasted suckling pig stuffed with spices, turmeric and lemongrass. The island's most iconic dish — best eaten at Ibu Oka in Ubud.", mustTry: true, spicy: false },
      { name: "Nasi Goreng",       emoji: "🍳", description: "Indonesian fried rice with egg, kecap manis (sweet soy), and your choice of protein. Available everywhere, any time of day.", mustTry: true },
      { name: "Satay (Sate)",      emoji: "🍢", description: "Skewered grilled meat — chicken, pork, or fish — served with peanut sauce. Best from a street warung.", mustTry: true },
      { name: "Gado-Gado",         emoji: "🥗", description: "Steamed vegetables, boiled egg, and tofu in a rich peanut sauce. One of the best vegetarian dishes on the island.", vegetarian: true },
      { name: "Lawar",             emoji: "🌿", description: "Minced meat (usually pork) mixed with grated coconut, vegetables and spices. Deeply Balinese — try the white lawar.", mustTry: true },
      { name: "Nasi Campur",       emoji: "🍱", description: "A plate of rice with small portions of several side dishes — the everyday meal of Bali. Brilliant variety for around $2.", mustTry: true },
      { name: "Bebek Betutu",      emoji: "🦆", description: "Whole duck slow-cooked for hours in a paste of spices wrapped in banana leaf. Rich, smoky and intensely flavoured." },
      { name: "Pisang Goreng",     emoji: "🍌", description: "Deep-fried banana fritters — crispy outside, sweet and soft inside. Perfect street snack.", vegetarian: true },
    ],
    drinks: [
      { name: "Bintang Beer",      emoji: "🍺", description: "The Indonesian lager that defines holiday Bali. Light and refreshing — perfect with satay.", alcoholic: true },
      { name: "Arak Attack",       emoji: "🥃", description: "Arak is a palm-distilled spirit. Mixed with Sprite or juice it's a local favourite — but only buy from reputable bars (fake arak poisoning is a real risk).", alcoholic: true },
      { name: "Es Kelapa Muda",    emoji: "🥥", description: "Fresh green coconut water served straight from the shell. The best natural rehydrator on the island.", alcoholic: false },
      { name: "Jamu",              emoji: "🌿", description: "A traditional health tonic made from turmeric, ginger, and tamarind. Bitter but revered for gut health.", alcoholic: false },
      { name: "Kopi Bali",         emoji: "☕", description: "Strong Balinese coffee — often served with grounds at the bottom. The local method is to let it settle before drinking.", alcoholic: false },
    ],
    byBudget: [
      { tier: "budget",  emoji: "🎒", label: "Warung",          priceRange: "$1–5/meal",   where: "Local family-run warungs on back streets. Avoid the tourist strip warungs.", tip: "Look for where locals are eating — long queues of scooters outside is always a good sign." },
      { tier: "mid",     emoji: "✈️", label: "Café / bistro",   priceRange: "$5–15/meal",  where: "Canggu and Ubud have great mid-range cafés — Shelter, Zibiru, Clear Café.", tip: "Ubud's organic cafés offer exceptional value for the quality. Try Locavore To Go for gourmet takeaway." },
      { tier: "luxury",  emoji: "🥂", label: "Fine dining",     priceRange: "$40–120/meal", where: "Locavore (Ubud), Metis (Seminyak), Mejekawi at KU DE TA.", tip: "Book Locavore weeks ahead — it's ranked among Asia's best restaurants." },
    ],
    dietary: [
      { diet: "Vegetarian", emoji: "🥦", note: "Very easy — Bali has a thriving vegetarian scene, especially in Ubud and Canggu. Gado-gado, tempeh, tofu dishes are everywhere.", rating: "easy" },
      { diet: "Vegan",      emoji: "🌱", note: "Well catered for. Most café areas in Canggu and Ubud have dedicated vegan menus. Watch out for hidden shrimp paste (terasi) in traditional dishes.", rating: "easy" },
      { diet: "Gluten-free", emoji: "🌾", note: "Rice is the staple so naturally many dishes are GF. Soy sauce (kecap) contains wheat — check with staff.", rating: "manageable" },
      { diet: "Halal",      emoji: "🕌", note: "Bali is Hindu so pork is prominent. Halal options exist but you need to seek out Muslim-owned warungs specifically — ask for 'warung Muslim'.", rating: "manageable" },
      { diet: "Nut allergy", emoji: "🥜", note: "Peanuts are in many sauces (satay, gado-gado). Inform staff clearly — 'Saya alergi kacang' (I am allergic to peanuts).", rating: "difficult" },
    ],
    foodTip: "The best meals in Bali cost under $3 and are found in tiny warungs down side streets. Eating where tourists don't go is always safer for your stomach too — high turnover means fresher ingredients.",
    marketTip: "Pasar Badung in Denpasar is Bali's largest traditional market — go before 8am for the freshest produce and a genuine local food experience.",
  },

  santorini: {
    cuisine: "Greek / Cycladic",
    summary: "Santorini's food is deeply rooted in the sea, the volcanic soil, and the Aegean sun. The island produces unique ingredients — cherry tomatoes, white aubergines, capers, and the famous Vinsanto wine — all shaped by the volcanic terrain.",
    dishes: [
      { name: "Tomatokeftedes",    emoji: "🍅", description: "Crispy Santorini tomato fritters made with the island's famous tiny, intensely sweet cherry tomatoes, mint and feta. Unmissable appetiser.", mustTry: true, vegetarian: true },
      { name: "Fava",              emoji: "🫘", description: "Yellow split pea purée drizzled with olive oil and lemon — a Santorini speciality that's been made here for 3,500 years.", mustTry: true, vegetarian: true },
      { name: "Fresh Grilled Fish", emoji: "🐟", description: "Octopus, sea bream, and sea bass grilled simply with olive oil and lemon. Best at a port-side taverna in Ammoudi Bay below Oia.", mustTry: true },
      { name: "Moussaka",          emoji: "🍆", description: "Layers of aubergine, minced lamb, and béchamel sauce baked until golden. A Greek classic done properly.", vegetarian: false },
      { name: "Souvlaki / Gyros",  emoji: "🥙", description: "Pork or chicken in pitta with tzatziki, tomato and onion. The best fast food in the world — find a local gyros spot rather than a tourist one.", mustTry: true },
      { name: "Santorini White Aubergine", emoji: "🍆", description: "A uniquely sweet, almost seedless aubergine grown only on Santorini's volcanic soil. Often served stuffed with cheese.", mustTry: true, vegetarian: true },
      { name: "Honey & Thyme Cheese (Chloro)", emoji: "🍯", description: "Soft fresh cheese drizzled with thyme honey — an extraordinary combination unique to the Cyclades.", vegetarian: true },
    ],
    drinks: [
      { name: "Assyrtiko Wine",    emoji: "🍷", description: "Santorini's signature white wine — crisp, mineral, and volcanic. Made from grapes grown in basket-shaped vines called kouloures. One of Greece's greatest wines.", alcoholic: true },
      { name: "Vinsanto",          emoji: "🍬", description: "A rich, amber dessert wine aged in oak. Made from sun-dried grapes. Pair with hard cheeses or baklava.", alcoholic: true },
      { name: "Ouzo",              emoji: "🥃", description: "Anise-flavoured Greek spirit, usually diluted with water (turns milky). Sipped slowly with meze — never drunk quickly.", alcoholic: true },
      { name: "Frappe",            emoji: "☕", description: "Cold instant coffee shaken with milk and ice — the Greek summer drink. Far better than it sounds.", alcoholic: false },
      { name: "Mountain Tea",      emoji: "🌿", description: "Herbal tea made from sideritis (ironwort) — drunk by locals for centuries. Warming and gently earthy.", alcoholic: false },
    ],
    byBudget: [
      { tier: "budget",  emoji: "🎒", label: "Gyros & bakery",  priceRange: "$3–9/meal",    where: "Local gyros stands and bakeries in Fira away from the caldera view. Avoid the caldera-side restaurants for every meal.", tip: "A gyros from a local place in Fira costs $3. The same meal with a caldera view costs $22. Walk 3 minutes and save $19." },
      { tier: "mid",     emoji: "✈️", label: "Taverna",         priceRange: "$16–38/meal",  where: "Family-run tavernas in Pyrgos, Megalochori, and inland villages away from the tourist trail.", tip: "Pyrgos village has some of the best food on the island at a fraction of Oia prices." },
      { tier: "luxury",  emoji: "🥂", label: "Caldera dining",  priceRange: "$65–165/meal", where: "Selene, Metaxi Mas, Lauda at Andronis Concept.", tip: "Book a caldera sunset dinner for the experience — but eat your main meals elsewhere for better value." },
    ],
    dietary: [
      { diet: "Vegetarian", emoji: "🥦", note: "Well catered for. Greek cuisine has many naturally vegetarian dishes — fava, tomatokeftedes, salads, spanakopita.", rating: "easy" },
      { diet: "Vegan",      emoji: "🌱", note: "More challenging. Feta and yoghurt appear in many dishes. Lenten dishes (nistisima) served during Orthodox fasting are often vegan — ask for these.", rating: "manageable" },
      { diet: "Gluten-free", emoji: "🌾", note: "Greek food is quite wheat-heavy (pitta, pastries). Rice dishes, grilled fish, and salads are safe. Inform staff carefully.", rating: "manageable" },
      { diet: "Nut allergy", emoji: "🥜", note: "Nuts appear in desserts (baklava, pastries). Main courses are generally safe — check with staff.", rating: "manageable" },
    ],
    foodTip: "The caldera-view restaurants in Oia charge 3–4x the price of identical food 5 minutes inland. Pay for the view once — but eat your everyday meals at inland tavernas for far better quality and value.",
    marketTip: "Fira's small market street sells local capers, cherry tomatoes, and Vinsanto wine. Buy them as gifts — they're unique to this island.",
  },

  tokyo: {
    cuisine: "Japanese",
    summary: "Tokyo has more Michelin-starred restaurants than any other city on earth — yet its best meals are often found in tiny 8-seat ramen bars, standing sushi counters, and basement izakayas. Every neighbourhood has its own food identity.",
    dishes: [
      { name: "Ramen",             emoji: "🍜", description: "Tokyo-style ramen is soy (shoyu) based with curly noodles and rich broth. Try Fuunji (tsukemen) or Ichiran for a solitary ramen experience.", mustTry: true },
      { name: "Sushi / Omakase",   emoji: "🍣", description: "For the real experience, go to a sushi counter (not a conveyor belt) and say 'omakase' — let the chef decide. Budget $80–300 but it's life-changing.", mustTry: true },
      { name: "Tempura",           emoji: "🦐", description: "Seafood and vegetables in a light, crispy batter. Brilliant at a specialist tempura restaurant like Kondo in Ginza.", mustTry: true },
      { name: "Tonkatsu",          emoji: "🥩", description: "Thick-cut pork cutlet breaded and deep-fried, served with cabbage and tonkatsu sauce. One of Japan's great comfort foods." },
      { name: "Gyoza",             emoji: "🥟", description: "Pan-fried pork and cabbage dumplings — crispy bottom, juicy inside. Eat with soy and rice vinegar. Best at a dedicated gyoza shop.", mustTry: true },
      { name: "Yakitori",          emoji: "🍡", description: "Chicken skewers grilled over charcoal. Every part is used — breast, thigh, liver, skin. Eaten at izakayas with cold beer.", mustTry: true },
      { name: "Kaiseki",           emoji: "🎋", description: "A multi-course Japanese feast of seasonal ingredients, beautifully presented. The apex of Japanese dining — allow 2–3 hours and $100–300 per person." },
      { name: "Matcha Wagashi",    emoji: "🍵", description: "Traditional Japanese sweets paired with matcha tea. Try Toraya in Aoyama — confectionery as an art form.", vegetarian: true },
    ],
    drinks: [
      { name: "Matcha",            emoji: "🍵", description: "Ceremonial-grade green tea whisked to a froth. Try both hot and cold versions — the quality in Tokyo's tea houses is exceptional.", alcoholic: false },
      { name: "Sake",              emoji: "🍶", description: "Rice wine ranging from dry and clean (junmai daiginjo) to rich and earthy. Visit a sake bar and let the sommelier guide you.", alcoholic: true },
      { name: "Highball (Whisky)", emoji: "🥃", description: "Japanese whisky highball — soda water + Japanese whisky over ice, prepared with obsessive precision. Suntory's Kakubin is the classic.", alcoholic: true },
      { name: "Canned Coffee",     emoji: "🥫", description: "Hot canned coffee from a vending machine — a uniquely Japanese experience. Georgia Max Coffee is the beloved classic.", alcoholic: false },
      { name: "Chu-Hi",            emoji: "🍋", description: "Shochu mixed with soda and fruit flavour — a light, cheap drink sold everywhere from izakayas to convenience stores.", alcoholic: true },
    ],
    byBudget: [
      { tier: "budget",  emoji: "🎒", label: "Convenience stores & ramen", priceRange: "$3–8/meal",    where: "7-Eleven, FamilyMart, ramen shops, standing sushi bars, gyudon (beef bowl) chains like Yoshinoya.", tip: "A 7-Eleven onigiri (~$1) and a hot coffee (~$0.70) is one of the best breakfasts in Japan. Don't underestimate convenience stores." },
      { tier: "mid",     emoji: "✈️", label: "Izakaya & specialist restaurants", priceRange: "$13–40/meal",   where: "Neighbourhood izakayas, dedicated ramen/tempura/soba restaurants, department store basement food halls.", tip: "Department store basement floors (depachika) have incredible prepared food at reasonable prices — brilliant for a quick high-quality dinner." },
      { tier: "luxury",  emoji: "🥂", label: "Omakase & Michelin",  priceRange: "$100–535/meal", where: "Sushi Saito, Sukiyabashi Jiro Honten, Den, Ryugin, Narisawa.", tip: "Book omakase restaurants 1–3 months ahead through Tableall or Omakase.jp. Many require a Japanese-speaking contact." },
    ],
    dietary: [
      { diet: "Vegetarian", emoji: "🥦", note: "Challenging — dashi (fish stock) appears in many seemingly vegetarian dishes. Buddhist shojin ryori restaurants offer authentic vegan Japanese cuisine.", rating: "difficult" },
      { diet: "Vegan",      emoji: "🌱", note: "Difficult but doable with research. Apps like HappyCow show vegan restaurants. Avoid miso soup (often contains dashi). T's Tantan ramen chain is fully vegan.", rating: "difficult" },
      { diet: "Gluten-free", emoji: "🌾", note: "Very difficult — soy sauce (shoyu) is on almost everything. Gluten-free soy sauce exists but staff may not understand the request. Tamago gohan (egg on rice) is safe.", rating: "difficult" },
      { diet: "Halal",      emoji: "🕌", note: "Growing availability. Halal certification is increasing in Tokyo. Naritaya and Gyukatsu Motomura have halal options. Look for 'halal' marked restaurants.", rating: "manageable" },
      { diet: "Nut allergy", emoji: "🥜", note: "Relatively safe — nuts are not a staple in Japanese cooking. Sesame is common (especially sesame oil). Peanuts appear in some Chinese-influenced dishes.", rating: "manageable" },
    ],
    foodTip: "Japan has strict rules about bringing food into restaurants from outside. Never eat walking down the street (except at festival stalls) — it's considered bad manners. In restaurants, the food comes to you — don't rush.",
    marketTip: "Tsukiji Outer Market (open daily) still has incredible fresh seafood, tamagoyaki (sweet omelette) and street food even after the inner market moved to Toyosu. Go early — best stalls close by 10am.",
  },

  maldives: {
    cuisine: "Maldivian",
    summary: "Maldivian cuisine is built on tuna, coconut, and chilli — the three pillars of island cooking. On resort islands, international cuisine dominates. On local islands, you'll find some of the most distinctive and underrated food in the Indian Ocean.",
    dishes: [
      { name: "Mas Huni",          emoji: "🐟", description: "Shredded smoked tuna with coconut, onion and chilli — the classic Maldivian breakfast served with roshi (flatbread). Try it on a local island.", mustTry: true },
      { name: "Garudhiya",         emoji: "🍲", description: "Clear tuna broth served with rice, lime, chilli and onion on the side — the national dish and the soul of Maldivian cooking.", mustTry: true },
      { name: "Bis Keemiya",       emoji: "🥟", description: "Short-eat pastries filled with tuna, egg and cabbage — a Maldivian take on a South Asian samosa. Sold at tea shops.", mustTry: true },
      { name: "Rihaakuru",         emoji: "🍯", description: "A thick, deeply savoury paste made from reduced tuna broth. Spread on roshi or stirred into rice — an acquired taste but deeply traditional.", mustTry: true },
      { name: "Resort Seafood BBQ", emoji: "🦞", description: "Most resorts run nightly beach BBQs with freshly caught lobster, reef fish, and prawns. The quality is exceptional — often the best meal of a trip.", mustTry: true },
      { name: "Dhon Riha",         emoji: "🍛", description: "A mild, golden tuna curry cooked with coconut milk and spices. Gentler than Sri Lankan curries — accessible and delicious.", vegetarian: false },
      { name: "Gulha",             emoji: "🟡", description: "Round fried dumplings stuffed with smoked tuna and coconut. Sold at tea shops alongside sweet tea.", mustTry: true },
    ],
    drinks: [
      { name: "Fresh Coconut Water", emoji: "🥥", description: "Served straight from the tree — some resorts will crack one open for you on the beach. Gloriously hydrating.", alcoholic: false },
      { name: "Sai (Maldivian Tea)", emoji: "🫖", description: "Strong black tea with lots of condensed milk, often served with short eats at tea shops on local islands.", alcoholic: false },
      { name: "Resort Cocktails",   emoji: "🍹", description: "On resort islands, cocktail bars are spectacular — often overwater or on the beach. Worth the splurge for a sunset drink.", alcoholic: true },
      { name: "Fresh Fruit Juices", emoji: "🍹", description: "Mango, watermelon, and passion fruit juices freshly made at resorts and local cafés. Excellent quality.", alcoholic: false },
    ],
    byBudget: [
      { tier: "budget",  emoji: "🎒", label: "Local island tea shops", priceRange: "$1–5/meal",  where: "Tea shops (sai hotels) on inhabited islands like Maafushi, Thulusdhoo, or Guraidhoo.", tip: "A plate of short eats (bis keemiya, gulha) and a tea on a local island costs under $2. The freshest, most authentic food in the Maldives." },
      { tier: "mid",     emoji: "✈️", label: "Resort half-board",      priceRange: "$40–80/meal", where: "Main resort restaurants — usually included in half-board packages.", tip: "Half-board (bed, breakfast, dinner) is usually better value than all-inclusive in the Maldives. Lunch is easy to keep cheap." },
      { tier: "luxury",  emoji: "🥂", label: "Overwater fine dining",  priceRange: "$120–300/meal", where: "Specialty restaurants at top resorts — Ithaa Undersea Restaurant (Conrad), Muraka (Conrad).", tip: "Book Ithaa — the world's first undersea restaurant — weeks in advance. Lunch is significantly cheaper than dinner." },
    ],
    dietary: [
      { diet: "Vegetarian", emoji: "🥦", note: "Challenging on local islands where tuna is in almost everything. Resorts have full vegetarian menus. Egg and coconut dishes are readily available.", rating: "manageable" },
      { diet: "Vegan",      emoji: "🌱", note: "Difficult on local islands. Resorts can accommodate with advance notice — inform them when booking.", rating: "manageable" },
      { diet: "Gluten-free", emoji: "🌾", note: "Rice and fish are the staples so many dishes are naturally GF. Roshi (flatbread) is wheat-based. Resorts can accommodate with notice.", rating: "manageable" },
      { diet: "Halal",      emoji: "🕌", note: "The Maldives is a Muslim country — all food on local islands is halal by default. Pork is only available on resort islands.", rating: "easy" },
    ],
    foodTip: "If you're staying at a resort, build at least one day trip to a local inhabited island into your trip. The food is better, cheaper, and more authentic than anything served poolside.",
    marketTip: "The Malé fish market (open from 5am) is one of the most spectacular in the world — tuna the size of torpedoes being unloaded and auctioned. Go early and don't miss it.",
  },

  paris: {
    cuisine: "French",
    summary: "Parisian food ranges from a perfect ham and butter baguette eaten on a bench by the Seine (a genuine contender for the world's best meal) to 20-course tasting menus at three-Michelin-star temples. Both are worth experiencing.",
    dishes: [
      { name: "Croissant au Beurre", emoji: "🥐", description: "The real thing — layered, buttery, and shattering. Only from a boulangerie, eaten in the morning. The best in Paris: Du Pain et des Idées, Liberté.", mustTry: true, vegetarian: true },
      { name: "Steak Frites",        emoji: "🥩", description: "Entrecôte with hand-cut frites — the quintessential Parisian bistro dish. Le Relais de l'Entrecôte serves nothing else and has queues around the block.", mustTry: true },
      { name: "French Onion Soup",   emoji: "🧅", description: "A deep, dark, sweet broth topped with gruyère-melted croutons. Best in winter — order it at any classic brasserie.", mustTry: true },
      { name: "Croque Monsieur",     emoji: "🥪", description: "Ham and béchamel toasted sandwich — the perfect Parisian café lunch with a glass of house white.", vegetarian: false },
      { name: "Coq au Vin",          emoji: "🍗", description: "Chicken slow-braised in red wine with lardons and mushrooms. The ultimate French bistro classic." },
      { name: "Escargots",           emoji: "🐌", description: "Snails baked in garlic and parsley butter. Try them at least once — the flavour is almost entirely the butter, not the snail.", mustTry: true },
      { name: "Crème Brûlée",       emoji: "🍮", description: "Vanilla custard with a crackling caramelised sugar top. Every brasserie makes one — quality varies wildly. The best are deeply wobbly.", mustTry: true, vegetarian: true },
      { name: "Jambon-Beurre",       emoji: "🥖", description: "Ham and salted butter in a fresh baguette — the most popular sandwich in France. Under $4.50 at any boulangerie and possibly the greatest sandwich in existence.", mustTry: true },
    ],
    drinks: [
      { name: "Café",                emoji: "☕", description: "A short, strong espresso. Order 'un café' — you'll get a perfect shot. 'Café allongé' for longer. Drink it standing at the bar for authentic experience.", alcoholic: false },
      { name: "Kir / Kir Royale",   emoji: "🥂", description: "White wine (or Champagne) with blackcurrant liqueur. The classic Parisian aperitif — order one before dinner.", alcoholic: true },
      { name: "Bordeaux / Burgundy", emoji: "🍷", description: "France's greatest red wines. Order by the glass (au verre) in any wine bar — Pour Pouvoir on Île Saint-Louis is excellent.", alcoholic: true },
      { name: "Pastis",              emoji: "🟡", description: "Anise-flavoured spirit diluted with water — turns beautifully cloudy. The drink of southern France, but loved in Paris too.", alcoholic: true },
      { name: "Citron Pressé",       emoji: "🍋", description: "Fresh-squeezed lemon juice served with a sugar bowl and water — you make it to your taste. The perfect terrace drink.", alcoholic: false },
    ],
    byBudget: [
      { tier: "budget",  emoji: "🎒", label: "Boulangerie & café", priceRange: "$3–13/meal",   where: "Any neighbourhood boulangerie for breakfast, street crêpe stands, brasserie lunch formule (set menu).", tip: "The midi 'formule' (set lunch: entrée + plat or plat + dessert) at a neighbourhood bistro costs $13–20 and is frequently better value than a $51 dinner back home." },
      { tier: "mid",     emoji: "✈️", label: "Bistro / brasserie", priceRange: "$22–49/meal",  where: "Le Comptoir du Relais, Bistrot Paul Bert, Café de Flore, Les Deux Magots.", tip: "Classic Parisian brasseries are mid-range but offer the full experience. Always order the plat du jour for the best value." },
      { tier: "luxury",  emoji: "🥂", label: "Gastronomique",      priceRange: "$110–435/meal", where: "Guy Savoy, Alain Ducasse, Le Grand Véfour, Septime, Frenchie.", tip: "Septime and Frenchie are genuinely world-class at a fraction of the price of 3-star restaurants. Book 6–8 weeks ahead." },
    ],
    dietary: [
      { diet: "Vegetarian", emoji: "🥦", note: "Getting much easier — Paris has embraced vegetarian dining in the last 5 years. Gentle Gourmet, VG Pâtisserie, and many modern bistros are fully vegetarian.", rating: "manageable" },
      { diet: "Vegan",      emoji: "🌱", note: "Well catered in central Paris now. Soul Kitchen, Hank Burger, and many others. Traditional French cooking is very animal-product heavy — seek out modern spots.", rating: "manageable" },
      { diet: "Gluten-free", emoji: "🌾", note: "More cafés now carry GF options. Helmut Newcake is a fully GF French pastry shop. Tell staff 'sans gluten' — awareness is improving.", rating: "manageable" },
      { diet: "Halal",      emoji: "🕌", note: "Excellent halal options, particularly in the 10th, 11th, 18th, and 19th arrondissements. Le Marais also has good options. Certification is widely displayed.", rating: "easy" },
      { diet: "Nut allergy", emoji: "🥜", note: "Nuts appear in many French pastries and desserts. Inform staff carefully — 'Je suis allergique aux noix/noisettes'. Kitchens take allergies seriously.", rating: "manageable" },
    ],
    foodTip: "The single best food experience in Paris costs under $4.50 — a jambon-beurre from a traditional boulangerie eaten on the banks of the Seine. Don't spend every meal in restaurants; the city is made for eating outside.",
    marketTip: "Marché d'Aligre (open Tue–Sun mornings) is Paris's best everyday market — cheap, excellent, and frequented only by locals. The covered hall has incredible cheese, charcuterie and wine.",
  },
};

export function getFoodData(slug: string): FoodData | null {
  return foodData[slug] ?? null;
}
