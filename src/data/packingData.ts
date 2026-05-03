export type PackingItem = {
  id: string;
  label: string;
  essential?: boolean;
  note?: string;
};

export type PackingCategory = {
  id: string;
  label: string;
  emoji: string;
  items: PackingItem[];
};

// Items that vary by weather score (1=bad, 5=great sunny)
export function getWeatherItems(weatherScore: number): PackingItem[] {
  if (weatherScore >= 4) {
    // Hot / sunny
    return [
      { id: "w-sunscreen",  label: "High-SPF sunscreen",         essential: true  },
      { id: "w-sunhat",     label: "Sun hat / cap",              essential: true  },
      { id: "w-sunglasses", label: "Sunglasses (polarised)",     essential: true  },
      { id: "w-swimwear",   label: "Swimwear (2 sets)",          essential: true  },
      { id: "w-light",      label: "Light breathable clothing"                    },
      { id: "w-flip",       label: "Flip flops / sandals"                         },
      { id: "w-hydration",  label: "Reusable water bottle"                        },
      { id: "w-repellent",  label: "Insect repellent"                             },
    ];
  } else if (weatherScore === 3) {
    // Mixed / shoulder season
    return [
      { id: "w-layers",     label: "Light layers / cardigan"     },
      { id: "w-sunscreen",  label: "SPF 30+ sunscreen"           },
      { id: "w-umbrella",   label: "Compact umbrella"            },
      { id: "w-light",      label: "Light breathable clothing"   },
      { id: "w-repellent",  label: "Insect repellent"            },
    ];
  } else {
    // Rainy / cold / off-season
    return [
      { id: "w-rainjacket", label: "Waterproof rain jacket",  essential: true  },
      { id: "w-umbrella",   label: "Sturdy umbrella",         essential: true  },
      { id: "w-layers",     label: "Warm layers / fleece"                       },
      { id: "w-waterproof", label: "Waterproof bag/dry sack"                    },
      { id: "w-boots",      label: "Waterproof shoes/boots"                     },
    ];
  }
}

// Destination-specific items
const destinationItems: Record<string, PackingItem[]> = {
  bali: [
    { id: "b-scarf",     label: "Temple sash/sarong (required for temples)", essential: true },
    { id: "b-cash",      label: "Cash in IDR (many places are cash-only)",   essential: true },
    { id: "b-mosquito",  label: "Mosquito repellent (DEET recommended)"                      },
    { id: "b-adapter",   label: "Type C/F plug adapter"                                      },
    { id: "b-stomach",   label: "Gut health tablets / probiotics"                             },
    { id: "b-modest",    label: "Modest clothing for local towns"                             },
    { id: "b-reefs",     label: "Reef-safe sunscreen"                                         },
    { id: "b-grab",      label: "Download Grab & Gojek apps before you leave"                },
  ],
  santorini: [
    { id: "s-shoes",     label: "Comfortable walking shoes (cobblestones)",  essential: true },
    { id: "s-cash",      label: "Local cash — some small places are cash-only"               },
    { id: "s-smart",     label: "Smart casual outfit for caldera restaurants"                 },
    { id: "s-adapter",   label: "Type C plug adapter"                                         },
    { id: "s-reefs",     label: "Reef-safe sunscreen"                                         },
    { id: "s-camera",    label: "Camera (views are photogenic — don't rely on phone only)"   },
    { id: "s-swimwear",  label: "Swimwear — many hotels have pools"                           },
  ],
  tokyo: [
    { id: "t-cash",      label: "Cash in JPY — Japan is still very cash-dependent", essential: true },
    { id: "t-ic",        label: "Plan to get Suica/Pasmo IC card at airport",        essential: true },
    { id: "t-walkshoess",label: "Very comfortable walking shoes",                    essential: true },
    { id: "t-adapter",   label: "Type A plug adapter (US-style, 2 flat pins)"                        },
    { id: "t-modest",    label: "Modest clothing for temples and shrines"                             },
    { id: "t-phrase",    label: "Download Google Translate (Japanese OCR mode)"                       },
    { id: "t-pocket",    label: "Small day pack for walks"                                            },
    { id: "t-handkerch", label: "Handkerchief (many public toilets have no hand dryers)"             },
    { id: "t-pocket-wifi", label: "Pocket WiFi or Japan eSIM booked in advance"                      },
  ],
  maldives: [
    { id: "m-reef",      label: "Reef-safe sunscreen (reef protection laws)", essential: true },
    { id: "m-underwater",label: "Underwater camera / GoPro",                  essential: true },
    { id: "m-snorkel",   label: "Personal snorkel set (resorts charge a lot)"               },
    { id: "m-rashguard", label: "Rash guard (strong UV in open water)"                       },
    { id: "m-cash",      label: "USD cash — widely accepted at resorts"                      },
    { id: "m-modest",    label: "Modest beachwear for local island public areas"             },
    { id: "m-dramamine", label: "Sea sickness tablets for speedboat transfers"               },
    { id: "m-dry",       label: "Waterproof dry bag for boat days"                           },
  ],
  paris: [
    { id: "p-shoes",     label: "Very comfortable walking shoes (10–15km/day)", essential: true },
    { id: "p-smart",     label: "Smart casual clothes — Parisians dress well"                },
    { id: "p-navigo",    label: "Plan to buy Navigo weekly metro pass"                        },
    { id: "p-lock",      label: "Small padlock (for hostel lockers)"                          },
    { id: "p-phrase",    label: "Know 5 French phrases — it goes a long way"                 },
    { id: "p-cash",      label: "Some Euros cash — boulangeries are cash-only"               },
    { id: "p-plug",      label: "Type C/E plug adapter"                                       },
    { id: "p-bag",       label: "Crossbody anti-theft bag (pickpocket risk)"                  },
  ],
};

const universalCategories: PackingCategory[] = [
  {
    id: "documents",
    label: "Documents & Money",
    emoji: "📄",
    items: [
      { id: "d-passport",  label: "Passport (6+ months validity)",           essential: true  },
      { id: "d-insurance", label: "Travel insurance documents",              essential: true  },
      { id: "d-bookings",  label: "Booking confirmations (hotels, flights)", essential: true  },
      { id: "d-card",      label: "Credit/debit card (notify bank first)",   essential: true  },
      { id: "d-copy",      label: "Passport photocopy (stored separately)"                    },
      { id: "d-emergency", label: "Emergency contact numbers written down"                    },
      { id: "d-visa",      label: "Visa / e-Visa documents if required"                       },
    ],
  },
  {
    id: "electronics",
    label: "Electronics",
    emoji: "🔌",
    items: [
      { id: "e-phone",     label: "Phone + charger",                         essential: true  },
      { id: "e-powerbank", label: "Power bank (10,000+ mAh)",                essential: true  },
      { id: "e-headphones",label: "Headphones / earbuds"                                      },
      { id: "e-camera",    label: "Camera + extra batteries"                                   },
      { id: "e-esim",      label: "eSIM or local SIM plan"                                     },
      { id: "e-cables",    label: "Charging cables (carry-on bag)"                             },
    ],
  },
  {
    id: "clothing",
    label: "Clothing",
    emoji: "👕",
    items: [
      { id: "c-shirts",    label: "T-shirts / tops (1 per day + 1 spare)"   },
      { id: "c-bottoms",   label: "Trousers / shorts / skirts"               },
      { id: "c-underwear", label: "Underwear (1 per day + 2 spare)"          },
      { id: "c-socks",     label: "Socks"                                    },
      { id: "c-shoes",     label: "Comfortable walking shoes",               essential: true  },
      { id: "c-light-jkt", label: "Light jacket / packable layer"            },
      { id: "c-pj",        label: "Sleepwear"                                },
    ],
  },
  {
    id: "toiletries",
    label: "Health & Toiletries",
    emoji: "🧴",
    items: [
      { id: "h-meds",      label: "Personal medications (enough + spare)",   essential: true  },
      { id: "h-first",     label: "Mini first aid kit"                                         },
      { id: "h-stomach",   label: "Antidiarrheal + antacids"                                   },
      { id: "h-toothbrush",label: "Toothbrush + toothpaste"                                    },
      { id: "h-deodorant", label: "Deodorant"                                                  },
      { id: "h-shampoo",   label: "Travel shampoo / soap"                                      },
      { id: "h-lip",       label: "Lip balm (SPF)"                                             },
      { id: "h-sanitizer", label: "Hand sanitizer"                                             },
    ],
  },
  {
    id: "comfort",
    label: "Travel Comfort",
    emoji: "🛫",
    items: [
      { id: "cm-pillow",   label: "Neck pillow (for long flights)"           },
      { id: "cm-mask",     label: "Sleep eye mask"                           },
      { id: "cm-earplugs", label: "Earplugs"                                 },
      { id: "cm-backpack", label: "Daypack / small backpack"                 },
      { id: "cm-lock",     label: "TSA-approved luggage lock"                },
      { id: "cm-bag",      label: "Reusable tote bag (for day trips)"        },
    ],
  },
];

export function buildPackingList(
  slug: string,
  weatherScore: number,
  nights: number
): PackingCategory[] {
  const categories: PackingCategory[] = universalCategories.map((cat) => ({
    ...cat,
    items: [...cat.items],
  }));

  // Add weather-appropriate clothing items to the clothing category
  const weatherItems = getWeatherItems(weatherScore);
  const clothingCat = categories.find((c) => c.id === "clothing");
  if (clothingCat) {
    clothingCat.items = [...clothingCat.items, ...weatherItems];
  }

  // Destination-specific
  const destItems = destinationItems[slug];
  if (destItems && destItems.length > 0) {
    categories.push({
      id: "destination",
      label: "Destination Essentials",
      emoji: "📍",
      items: destItems,
    });
  }

  // Long trip extras
  if (nights >= 10) {
    const extra: PackingItem[] = [
      { id: "lt-laundry",  label: "Travel laundry detergent / sheets"        },
      { id: "lt-sewing",   label: "Small sewing kit"                         },
    ];
    const comfortCat = categories.find((c) => c.id === "comfort");
    if (comfortCat) comfortCat.items.push(...extra);
  }

  return categories;
}
