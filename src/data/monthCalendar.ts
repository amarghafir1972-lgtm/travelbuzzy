export type MonthRating = {
  weather: 1 | 2 | 3 | 4 | 5;
  crowds: 1 | 2 | 3 | 4 | 5;
  price: 1 | 2 | 3 | 4 | 5;
};

export type MonthCalendar = MonthRating[];

const calendar: Record<string, MonthCalendar> = {
  bali: [
    { weather: 2, crowds: 5, price: 5 }, // Jan
    { weather: 2, crowds: 5, price: 5 }, // Feb
    { weather: 3, crowds: 4, price: 4 }, // Mar
    { weather: 5, crowds: 4, price: 4 }, // Apr ★
    { weather: 5, crowds: 4, price: 4 }, // May ★
    { weather: 5, crowds: 4, price: 4 }, // Jun ★
    { weather: 5, crowds: 2, price: 2 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 4, price: 4 }, // Sep ★
    { weather: 5, crowds: 4, price: 4 }, // Oct ★
    { weather: 3, crowds: 4, price: 4 }, // Nov
    { weather: 2, crowds: 5, price: 5 }, // Dec
  ],
  santorini: [
    { weather: 1, crowds: 5, price: 5 }, // Jan
    { weather: 1, crowds: 5, price: 5 }, // Feb
    { weather: 2, crowds: 5, price: 5 }, // Mar
    { weather: 3, crowds: 4, price: 4 }, // Apr
    { weather: 5, crowds: 4, price: 4 }, // May ★
    { weather: 5, crowds: 3, price: 3 }, // Jun ★
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 4, crowds: 3, price: 3 }, // Sep ★
    { weather: 4, crowds: 4, price: 4 }, // Oct ★
    { weather: 2, crowds: 5, price: 5 }, // Nov
    { weather: 1, crowds: 5, price: 5 }, // Dec
  ],
  tokyo: [
    { weather: 2, crowds: 5, price: 5 }, // Jan
    { weather: 2, crowds: 5, price: 5 }, // Feb
    { weather: 4, crowds: 3, price: 3 }, // Mar ★ (cherry blossom)
    { weather: 5, crowds: 2, price: 3 }, // Apr ★ (cherry blossom peak)
    { weather: 4, crowds: 3, price: 3 }, // May
    { weather: 3, crowds: 4, price: 3 }, // Jun (rainy)
    { weather: 2, crowds: 3, price: 3 }, // Jul (hot/humid)
    { weather: 2, crowds: 2, price: 3 }, // Aug (hot + domestic tourists)
    { weather: 4, crowds: 4, price: 3 }, // Sep
    { weather: 5, crowds: 4, price: 4 }, // Oct ★ (autumn)
    { weather: 5, crowds: 4, price: 4 }, // Nov ★ (autumn foliage)
    { weather: 3, crowds: 5, price: 5 }, // Dec
  ],
  maldives: [
    { weather: 5, crowds: 2, price: 2 }, // Jan ★
    { weather: 5, crowds: 3, price: 3 }, // Feb ★
    { weather: 5, crowds: 3, price: 3 }, // Mar ★
    { weather: 4, crowds: 4, price: 3 }, // Apr ★
    { weather: 2, crowds: 5, price: 5 }, // May
    { weather: 2, crowds: 5, price: 5 }, // Jun
    { weather: 2, crowds: 5, price: 5 }, // Jul
    { weather: 2, crowds: 5, price: 5 }, // Aug
    { weather: 2, crowds: 5, price: 5 }, // Sep
    { weather: 3, crowds: 5, price: 5 }, // Oct
    { weather: 5, crowds: 3, price: 3 }, // Nov ★
    { weather: 5, crowds: 1, price: 1 }, // Dec peak
  ],
  paris: [
    { weather: 1, crowds: 5, price: 5 }, // Jan
    { weather: 1, crowds: 5, price: 5 }, // Feb
    { weather: 3, crowds: 4, price: 4 }, // Mar
    { weather: 4, crowds: 4, price: 4 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 3, price: 3 }, // Jun ★
    { weather: 5, crowds: 2, price: 2 }, // Jul peak
    { weather: 5, crowds: 2, price: 2 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 3, crowds: 4, price: 4 }, // Oct
    { weather: 2, crowds: 5, price: 5 }, // Nov
    { weather: 2, crowds: 4, price: 4 }, // Dec
  ],
  bangkok: [
    { weather: 5, crowds: 3, price: 3 }, // Jan ★
    { weather: 5, crowds: 3, price: 3 }, // Feb ★
    { weather: 4, crowds: 3, price: 3 }, // Mar
    { weather: 2, crowds: 3, price: 3 }, // Apr (Songkran/hot)
    { weather: 2, crowds: 4, price: 4 }, // May (wet starts)
    { weather: 2, crowds: 5, price: 5 }, // Jun (wet)
    { weather: 2, crowds: 5, price: 5 }, // Jul (wet)
    { weather: 2, crowds: 5, price: 5 }, // Aug (wet)
    { weather: 3, crowds: 4, price: 4 }, // Sep
    { weather: 4, crowds: 3, price: 3 }, // Oct ★
    { weather: 5, crowds: 2, price: 2 }, // Nov ★ peak
    { weather: 5, crowds: 2, price: 2 }, // Dec ★ peak
  ],
  barcelona: [
    { weather: 2, crowds: 5, price: 5 }, // Jan
    { weather: 2, crowds: 5, price: 5 }, // Feb
    { weather: 3, crowds: 4, price: 4 }, // Mar
    { weather: 4, crowds: 4, price: 4 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 3, price: 3 }, // Jun ★
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 4, crowds: 4, price: 4 }, // Oct ★
    { weather: 3, crowds: 5, price: 5 }, // Nov
    { weather: 2, crowds: 4, price: 4 }, // Dec
  ],
  dubai: [
    { weather: 5, crowds: 2, price: 2 }, // Jan ★
    { weather: 5, crowds: 2, price: 2 }, // Feb ★
    { weather: 5, crowds: 3, price: 3 }, // Mar ★
    { weather: 4, crowds: 3, price: 3 }, // Apr
    { weather: 2, crowds: 5, price: 5 }, // May (hot)
    { weather: 1, crowds: 5, price: 5 }, // Jun (extreme)
    { weather: 1, crowds: 5, price: 5 }, // Jul (extreme)
    { weather: 1, crowds: 5, price: 5 }, // Aug (extreme)
    { weather: 2, crowds: 4, price: 4 }, // Sep (still hot)
    { weather: 4, crowds: 3, price: 3 }, // Oct ★
    { weather: 5, crowds: 2, price: 2 }, // Nov ★
    { weather: 5, crowds: 1, price: 1 }, // Dec peak
  ],
  rome: [
    { weather: 2, crowds: 5, price: 5 }, // Jan
    { weather: 2, crowds: 5, price: 5 }, // Feb
    { weather: 3, crowds: 4, price: 4 }, // Mar
    { weather: 4, crowds: 3, price: 3 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 2, price: 2 }, // Jun
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 4, crowds: 4, price: 4 }, // Oct ★
    { weather: 3, crowds: 5, price: 5 }, // Nov
    { weather: 2, crowds: 4, price: 4 }, // Dec
  ],
  kyoto: [
    { weather: 2, crowds: 4, price: 4 }, // Jan
    { weather: 2, crowds: 4, price: 4 }, // Feb
    { weather: 4, crowds: 2, price: 2 }, // Mar ★ (cherry blossom)
    { weather: 5, crowds: 1, price: 1 }, // Apr peak (cherry blossom)
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 3, crowds: 4, price: 4 }, // Jun (rainy)
    { weather: 2, crowds: 3, price: 3 }, // Jul (hot)
    { weather: 2, crowds: 3, price: 3 }, // Aug (hot)
    { weather: 4, crowds: 3, price: 3 }, // Sep ★
    { weather: 5, crowds: 2, price: 2 }, // Oct ★ (autumn)
    { weather: 4, crowds: 2, price: 2 }, // Nov ★ (autumn peak)
    { weather: 2, crowds: 4, price: 4 }, // Dec
  ],
  phuket: [
    { weather: 5, crowds: 2, price: 2 }, // Jan ★
    { weather: 5, crowds: 2, price: 2 }, // Feb ★
    { weather: 5, crowds: 3, price: 3 }, // Mar ★
    { weather: 4, crowds: 3, price: 3 }, // Apr
    { weather: 3, crowds: 4, price: 4 }, // May (wet starts)
    { weather: 2, crowds: 5, price: 5 }, // Jun (wet)
    { weather: 2, crowds: 5, price: 5 }, // Jul (wet)
    { weather: 2, crowds: 5, price: 5 }, // Aug (wet)
    { weather: 2, crowds: 5, price: 5 }, // Sep (wet)
    { weather: 3, crowds: 4, price: 4 }, // Oct (transition)
    { weather: 4, crowds: 3, price: 3 }, // Nov ★
    { weather: 5, crowds: 1, price: 1 }, // Dec peak
  ],
  amsterdam: [
    { weather: 1, crowds: 5, price: 5 }, // Jan
    { weather: 1, crowds: 5, price: 5 }, // Feb
    { weather: 3, crowds: 4, price: 4 }, // Mar
    { weather: 4, crowds: 3, price: 3 }, // Apr ★ (tulips/Koningsdag)
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 2, price: 2 }, // Jun ★
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 4, crowds: 3, price: 3 }, // Sep ★
    { weather: 3, crowds: 4, price: 4 }, // Oct
    { weather: 2, crowds: 5, price: 5 }, // Nov
    { weather: 2, crowds: 4, price: 4 }, // Dec
  ],
  "cape-town": [
    { weather: 5, crowds: 2, price: 2 }, // Jan (summer peak)
    { weather: 5, crowds: 2, price: 2 }, // Feb (summer)
    { weather: 5, crowds: 3, price: 3 }, // Mar ★ (harvest)
    { weather: 4, crowds: 4, price: 4 }, // Apr ★
    { weather: 3, crowds: 4, price: 4 }, // May
    { weather: 2, crowds: 5, price: 5 }, // Jun (winter)
    { weather: 2, crowds: 5, price: 5 }, // Jul (winter)
    { weather: 2, crowds: 5, price: 5 }, // Aug (winter)
    { weather: 3, crowds: 4, price: 4 }, // Sep (spring)
    { weather: 4, crowds: 3, price: 3 }, // Oct ★ (whales)
    { weather: 5, crowds: 2, price: 2 }, // Nov ★
    { weather: 5, crowds: 1, price: 1 }, // Dec peak
  ],
  "new-york": [
    { weather: 1, crowds: 4, price: 5 }, // Jan
    { weather: 1, crowds: 5, price: 5 }, // Feb
    { weather: 3, crowds: 4, price: 4 }, // Mar
    { weather: 4, crowds: 3, price: 3 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 2, price: 2 }, // Jun
    { weather: 4, crowds: 2, price: 1 }, // Jul (hot, peak)
    { weather: 4, crowds: 2, price: 1 }, // Aug (hot, peak)
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 5, crowds: 3, price: 3 }, // Oct ★
    { weather: 3, crowds: 4, price: 4 }, // Nov
    { weather: 2, crowds: 3, price: 2 }, // Dec (Xmas peak)
  ],
  lisbon: [
    { weather: 2, crowds: 5, price: 5 }, // Jan
    { weather: 2, crowds: 5, price: 5 }, // Feb
    { weather: 3, crowds: 4, price: 4 }, // Mar ★
    { weather: 4, crowds: 4, price: 4 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 2, price: 2 }, // Jun ★ (Santo António)
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 4, crowds: 4, price: 4 }, // Oct ★
    { weather: 3, crowds: 5, price: 5 }, // Nov
    { weather: 2, crowds: 4, price: 4 }, // Dec
  ],
  "amalfi-coast": [
    { weather: 2, crowds: 5, price: 5 }, // Jan (closed)
    { weather: 2, crowds: 5, price: 5 }, // Feb (closed)
    { weather: 3, crowds: 5, price: 5 }, // Mar (reopening)
    { weather: 4, crowds: 4, price: 4 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 2, price: 2 }, // Jun ★
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 4, crowds: 4, price: 4 }, // Oct ★
    { weather: 3, crowds: 5, price: 5 }, // Nov (closing)
    { weather: 2, crowds: 5, price: 5 }, // Dec (closed)
  ],
  marrakech: [
    { weather: 3, crowds: 4, price: 4 }, // Jan
    { weather: 3, crowds: 4, price: 4 }, // Feb
    { weather: 4, crowds: 3, price: 3 }, // Mar ★
    { weather: 5, crowds: 3, price: 3 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 4, crowds: 4, price: 4 }, // Jun (warming)
    { weather: 1, crowds: 5, price: 5 }, // Jul (extreme heat)
    { weather: 1, crowds: 5, price: 5 }, // Aug (extreme heat)
    { weather: 3, crowds: 3, price: 3 }, // Sep (cooling)
    { weather: 5, crowds: 3, price: 3 }, // Oct ★
    { weather: 5, crowds: 3, price: 3 }, // Nov ★
    { weather: 3, crowds: 3, price: 3 }, // Dec
  ],
  singapore: [
    { weather: 3, crowds: 3, price: 3 }, // Jan (CNY)
    { weather: 4, crowds: 3, price: 3 }, // Feb ★
    { weather: 4, crowds: 3, price: 3 }, // Mar ★
    { weather: 4, crowds: 3, price: 3 }, // Apr ★
    { weather: 3, crowds: 3, price: 3 }, // May (wetter)
    { weather: 3, crowds: 4, price: 4 }, // Jun
    { weather: 4, crowds: 3, price: 3 }, // Jul ★
    { weather: 4, crowds: 3, price: 3 }, // Aug ★ (National Day)
    { weather: 3, crowds: 2, price: 2 }, // Sep (F1)
    { weather: 3, crowds: 3, price: 3 }, // Oct
    { weather: 3, crowds: 3, price: 3 }, // Nov (NE monsoon)
    { weather: 3, crowds: 3, price: 3 }, // Dec (NE monsoon)
  ],
  prague: [
    { weather: 1, crowds: 5, price: 5 }, // Jan
    { weather: 1, crowds: 5, price: 5 }, // Feb
    { weather: 2, crowds: 4, price: 4 }, // Mar
    { weather: 4, crowds: 3, price: 3 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 2, price: 2 }, // Jun ★
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 4, crowds: 4, price: 4 }, // Oct ★
    { weather: 2, crowds: 5, price: 5 }, // Nov
    { weather: 2, crowds: 3, price: 4 }, // Dec (Xmas markets)
  ],
  ibiza: [
    { weather: 2, crowds: 5, price: 5 }, // Jan (closed)
    { weather: 2, crowds: 5, price: 5 }, // Feb (closed)
    { weather: 3, crowds: 5, price: 5 }, // Mar (quiet)
    { weather: 4, crowds: 4, price: 4 }, // Apr (reopening)
    { weather: 5, crowds: 4, price: 4 }, // May ★
    { weather: 5, crowds: 3, price: 3 }, // Jun ★ (clubs opening)
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 2, price: 2 }, // Sep ★
    { weather: 4, crowds: 4, price: 4 }, // Oct (closing)
    { weather: 3, crowds: 5, price: 5 }, // Nov (closed)
    { weather: 2, crowds: 5, price: 5 }, // Dec (closed)
  ],
  "bora-bora": [
    { weather: 3, crowds: 3, price: 2 }, // Jan (wet)
    { weather: 3, crowds: 3, price: 2 }, // Feb (wet)
    { weather: 3, crowds: 4, price: 3 }, // Mar
    { weather: 4, crowds: 4, price: 4 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 3, price: 3 }, // Jun ★
    { weather: 5, crowds: 2, price: 2 }, // Jul peak (school hols)
    { weather: 5, crowds: 2, price: 2 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 5, crowds: 3, price: 3 }, // Oct ★
    { weather: 4, crowds: 4, price: 4 }, // Nov
    { weather: 3, crowds: 3, price: 3 }, // Dec (wet starts)
  ],
  istanbul: [
    { weather: 2, crowds: 5, price: 5 }, // Jan
    { weather: 2, crowds: 5, price: 5 }, // Feb
    { weather: 3, crowds: 4, price: 4 }, // Mar
    { weather: 4, crowds: 3, price: 3 }, // Apr ★ (tulips)
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 2, price: 2 }, // Jun ★
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 4, crowds: 3, price: 3 }, // Oct ★
    { weather: 3, crowds: 4, price: 4 }, // Nov
    { weather: 2, crowds: 4, price: 4 }, // Dec
  ],
  queenstown: [
    { weather: 5, crowds: 2, price: 2 }, // Jan ★ (summer peak)
    { weather: 5, crowds: 2, price: 2 }, // Feb ★ (summer)
    { weather: 4, crowds: 3, price: 3 }, // Mar ★ (autumn)
    { weather: 3, crowds: 4, price: 4 }, // Apr ★ (autumn colours)
    { weather: 2, crowds: 5, price: 5 }, // May (ski prep)
    { weather: 3, crowds: 3, price: 3 }, // Jun ★ (ski starts)
    { weather: 4, crowds: 2, price: 2 }, // Jul ★ (peak ski)
    { weather: 4, crowds: 2, price: 2 }, // Aug ★ (peak ski)
    { weather: 3, crowds: 4, price: 4 }, // Sep (spring)
    { weather: 4, crowds: 4, price: 4 }, // Oct ★
    { weather: 5, crowds: 3, price: 3 }, // Nov ★
    { weather: 5, crowds: 2, price: 2 }, // Dec ★ (summer)
  ],
  hawaii: [
    { weather: 4, crowds: 3, price: 3 }, // Jan ★ (whales)
    { weather: 4, crowds: 3, price: 3 }, // Feb ★ (whale peak)
    { weather: 4, crowds: 3, price: 3 }, // Mar ★ (whales)
    { weather: 5, crowds: 2, price: 2 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 3, price: 3 }, // Jun (summer starts)
    { weather: 5, crowds: 1, price: 1 }, // Jul peak
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 5, crowds: 3, price: 3 }, // Oct ★
    { weather: 4, crowds: 4, price: 4 }, // Nov ★ (whale starts)
    { weather: 4, crowds: 2, price: 2 }, // Dec (Xmas peak)
  ],
  hanoi: [
    { weather: 2, crowds: 4, price: 4 }, // Jan
    { weather: 3, crowds: 4, price: 4 }, // Feb (Tết)
    { weather: 3, crowds: 3, price: 3 }, // Mar
    { weather: 4, crowds: 3, price: 3 }, // Apr ★
    { weather: 4, crowds: 3, price: 3 }, // May
    { weather: 3, crowds: 4, price: 4 }, // Jun (wet)
    { weather: 2, crowds: 4, price: 4 }, // Jul (wet, hot)
    { weather: 2, crowds: 4, price: 4 }, // Aug (wet, hottest)
    { weather: 3, crowds: 3, price: 3 }, // Sep
    { weather: 5, crowds: 3, price: 3 }, // Oct ★
    { weather: 5, crowds: 3, price: 3 }, // Nov ★
    { weather: 4, crowds: 3, price: 3 }, // Dec ★
  ],
  reykjavik: [
    { weather: 1, crowds: 5, price: 5 }, // Jan (Northern Lights best)
    { weather: 1, crowds: 5, price: 5 }, // Feb (Northern Lights)
    { weather: 2, crowds: 5, price: 5 }, // Mar (Northern Lights)
    { weather: 3, crowds: 4, price: 4 }, // Apr ★
    { weather: 4, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 2, price: 2 }, // Jun ★ (midnight sun)
    { weather: 5, crowds: 2, price: 2 }, // Jul ★ (peak summer)
    { weather: 5, crowds: 2, price: 2 }, // Aug ★ (midnight sun)
    { weather: 3, crowds: 3, price: 3 }, // Sep (Northern Lights start)
    { weather: 2, crowds: 4, price: 4 }, // Oct (Northern Lights)
    { weather: 1, crowds: 5, price: 5 }, // Nov (Northern Lights)
    { weather: 1, crowds: 4, price: 4 }, // Dec (Northern Lights)
  ],
  "mexico-city": [
    { weather: 3, crowds: 4, price: 4 }, // Jan
    { weather: 4, crowds: 4, price: 4 }, // Feb ★
    { weather: 5, crowds: 3, price: 3 }, // Mar ★
    { weather: 5, crowds: 3, price: 3 }, // Apr ★
    { weather: 4, crowds: 3, price: 3 }, // May (warm, some rain)
    { weather: 3, crowds: 4, price: 4 }, // Jun (rainy season)
    { weather: 3, crowds: 4, price: 4 }, // Jul (wet)
    { weather: 3, crowds: 4, price: 4 }, // Aug (wet)
    { weather: 3, crowds: 3, price: 3 }, // Sep
    { weather: 4, crowds: 3, price: 3 }, // Oct ★
    { weather: 5, crowds: 3, price: 3 }, // Nov ★ (Día de Muertos)
    { weather: 5, crowds: 3, price: 3 }, // Dec ★
  ],
  "rio-de-janeiro": [
    { weather: 3, crowds: 3, price: 2 }, // Jan (hot, wet)
    { weather: 3, crowds: 1, price: 1 }, // Feb (Carnaval peak)
    { weather: 4, crowds: 3, price: 3 }, // Mar
    { weather: 4, crowds: 4, price: 4 }, // Apr ★
    { weather: 5, crowds: 4, price: 4 }, // May ★
    { weather: 5, crowds: 4, price: 4 }, // Jun ★
    { weather: 5, crowds: 3, price: 3 }, // Jul ★ (cool, dry)
    { weather: 5, crowds: 3, price: 3 }, // Aug ★ (dry)
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 4, crowds: 3, price: 3 }, // Oct ★
    { weather: 3, crowds: 3, price: 3 }, // Nov (rains start)
    { weather: 3, crowds: 2, price: 2 }, // Dec (NYE surge)
  ],
  dubrovnik: [
    { weather: 2, crowds: 5, price: 5 }, // Jan
    { weather: 2, crowds: 5, price: 5 }, // Feb
    { weather: 3, crowds: 5, price: 5 }, // Mar
    { weather: 4, crowds: 4, price: 4 }, // Apr ★
    { weather: 5, crowds: 3, price: 3 }, // May ★
    { weather: 5, crowds: 2, price: 2 }, // Jun ★
    { weather: 5, crowds: 1, price: 1 }, // Jul peak (cruises)
    { weather: 5, crowds: 1, price: 1 }, // Aug peak
    { weather: 5, crowds: 3, price: 3 }, // Sep ★
    { weather: 4, crowds: 4, price: 4 }, // Oct ★
    { weather: 3, crowds: 5, price: 5 }, // Nov
    { weather: 2, crowds: 5, price: 5 }, // Dec
  ],
  miami: [
    { weather: 5, crowds: 2, price: 2 }, // Jan ★
    { weather: 5, crowds: 3, price: 3 }, // Feb ★
    { weather: 5, crowds: 2, price: 2 }, // Mar ★
    { weather: 5, crowds: 3, price: 3 }, // Apr ★
    { weather: 4, crowds: 4, price: 4 }, // May (warming)
    { weather: 3, crowds: 5, price: 5 }, // Jun (hot, wet)
    { weather: 3, crowds: 5, price: 5 }, // Jul (hot, wet)
    { weather: 3, crowds: 5, price: 5 }, // Aug (hurricane)
    { weather: 4, crowds: 5, price: 5 }, // Sep (hurricane)
    { weather: 5, crowds: 3, price: 3 }, // Oct ★
    { weather: 5, crowds: 3, price: 3 }, // Nov ★
    { weather: 5, crowds: 1, price: 1 }, // Dec (Art Basel/Xmas)
  ],
};

export function getMonthCalendar(slug: string): MonthCalendar | null {
  return calendar[slug] ?? null;
}

export function overallScore(m: MonthRating): number {
  return Math.round((m.weather + m.crowds + m.price) / 3);
}
