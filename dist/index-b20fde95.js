// src/normalizeLocale/normalizeLocale.ts
function normalizeLocale(name) {
  name = name.replace(/_/g, "-");
  name = name.replace(/[.:][\w-]*$/, "");
  try {
    return new Intl.Locale(name).baseName;
  } catch (e) {
    return "en-US";
  }
}

// src/data/defaultLocale.ts
var detectedLocale;
if (typeof navigator !== "undefined") {
  const nav = navigator;
  detectedLocale = Array.isArray(nav.languages) ? nav.languages[0] : nav.language;
} else if (typeof process !== "undefined") {
  const env = process.env;
  detectedLocale = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}
var defaultLocale = normalizeLocale(detectedLocale || "en-US");
var defaultLocale_default = defaultLocale;

// src/MaybeValidDate/MaybeValidDate.ts
var MaybeValidDate = class extends Date {
  invalid = null;
  isValid() {
    return !Number.isNaN(this.valueOf());
  }
};

// src/data/twoDigitYears.ts
var twoDigitYears = {};
for (let i = 1; i < 100; i++) {
  const key = (i <= 9 ? "0" : "") + i;
  twoDigitYears[key] = i + (i > 51 ? 1900 : 2e3);
}
var twoDigitYears_default = twoDigitYears;

// src/data/numberingSystems.ts
var startCodes = {
  arab: 1632,
  arabext: 1776,
  bali: 6992,
  beng: 2534,
  deva: 2406,
  fullwide: 65296,
  gujr: 2790,
  khmr: 6112,
  knda: 3302,
  laoo: 3792,
  limb: 6470,
  mlym: 3430,
  mong: 6160,
  mymr: 4160,
  orya: 2918,
  tamldec: 3046,
  telu: 3174,
  thai: 3664,
  tibt: 3872
};
var chineseGroup = "[\uFF11\uFF12\uFF13\uFF14\uFF15\uFF16\uFF17\uFF18\uFF19\uFF10\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u3007\\d]";
var defaultLookup = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  "\uFF10": 0,
  "\uFF11": 1,
  "\uFF12": 2,
  "\uFF13": 3,
  "\uFF14": 4,
  "\uFF15": 5,
  "\uFF16": 6,
  "\uFF17": 7,
  "\uFF18": 8,
  "\uFF19": 9,
  "\u3007": 0,
  \u4E00: 1,
  \u4E8C: 2,
  \u4E09: 3,
  \u56DB: 4,
  \u4E94: 5,
  \u516D: 6,
  \u4E03: 7,
  \u516B: 8,
  \u4E5D: 9
};

// src/buildDigits/buildDigits.ts
var cache = {};
function buildDigits(nsName) {
  if (cache[nsName]) {
    return cache[nsName];
  }
  if (nsName === "fullwide" || nsName === "hanidec") {
    return { group: chineseGroup, lookup: { ...defaultLookup } };
  }
  const startCode = startCodes[nsName];
  if (!startCode) {
    return { group: "\\d", lookup: { ...defaultLookup } };
  }
  const start = String.fromCharCode(startCode);
  const end = String.fromCharCode(startCode + 9);
  const lookup = {};
  for (let i = 0; i < 10; i++) {
    lookup[String.fromCharCode(startCode + i)] = i;
  }
  cache[nsName] = {
    group: `[${start}-${end}]`,
    lookup
  };
  return cache[nsName];
}

// src/data/timezoneNames.ts
var timezoneNames = {
  "Eastern Daylight Time": -240,
  "Eastern Standard Time": -300,
  "Central Daylight Time": -300,
  "Central Standard Time": -360,
  "Mountain Daylight Time": -360,
  "Mountain Standard Time": -420,
  "Pacific Daylight Time": -420,
  "Pacific Standard Time": -480,
  "Coordinated Universal Time": 0,
  ACDT: 630,
  // Australian Central Daylight Savings Time
  ACST: 570,
  // Australian Central Standard Time
  ACT: 480,
  // ASEAN Common Time
  ADT: -180,
  // Atlantic Daylight Time
  AEDT: 660,
  // Australian Eastern Daylight Savings Time
  AEST: 600,
  // Australian Eastern Standard Time
  AFT: 270,
  // Afghanistan Time
  AKDT: -480,
  // Alaska Daylight Time
  AKST: -540,
  // Alaska Standard Time
  AMST: -180,
  // Amazon Summer Time (Brazil)
  AMT: -240,
  // Amazon Time (Brazil)
  ART: -180,
  // Argentina Time
  AST: 180,
  // Arabia Standard Time
  AWDT: 540,
  // Australian Western Daylight Time
  AWST: 480,
  // Australian Western Standard Time
  AZOST: -60,
  // Azores Standard Time
  AZT: 240,
  // Azerbaijan Time
  BDT: 360,
  // Bangladesh Daylight Time (Bangladesh Daylight saving time keeps UTC+06 offset)
  BIOT: 360,
  // British Indian Ocean Time
  BIT: -720,
  // Baker Island Time
  BOT: -240,
  // Bolivia Time
  BRST: -120,
  // Brasilia Summer Time
  BRT: -180,
  // Brasilia Time
  BTT: 360,
  // Bhutan Time
  CAT: 120,
  // Central Africa Time
  CCT: 390,
  // Cocos Islands Time
  CDT: -300,
  // Central Daylight Time (North America)
  CEDT: 120,
  // Central European Daylight Time
  CEST: 120,
  // Central European Summer Time (Cf. HAEC)
  CET: 60,
  // Central European Time
  CHADT: 825,
  // Chatham Daylight Time
  CHAST: 765,
  // Chatham Standard Time
  CHOT: 480,
  // Choibalsan
  ChST: 600,
  // Chamorro Standard Time
  CHUT: 600,
  // Chuuk Time
  CIST: -480,
  // Clipperton Island Standard Time
  CIT: 480,
  // Central Indonesia Time
  CKT: -600,
  // Cook Island Time
  CLST: -180,
  // Chile Summer Time
  CLT: -240,
  // Chile Standard Time
  COST: -240,
  // Colombia Summer Time
  COT: -300,
  // Colombia Time
  CST: -360,
  // Central Standard Time (North America)
  CT: 480,
  // China time
  CVT: -60,
  // Cape Verde Time
  CXT: 420,
  // Christmas Island Time
  DAVT: 420,
  // Davis Time
  DDUT: 600,
  // Dumont d'Urville Time
  DFT: 60,
  // AIX specific equivalent of Central European Time
  EASST: -300,
  // Easter Island Standard Summer Time
  EAST: -360,
  // Easter Island Standard Time
  EAT: 180,
  // East Africa Time
  ECT: -300,
  // Ecuador Time
  EDT: -240,
  // Eastern Daylight Time (North America)
  EEDT: 180,
  // Eastern European Daylight Time
  EEST: 180,
  // Eastern European Summer Time
  EET: 120,
  // Eastern European Time
  EGST: 0,
  // Eastern Greenland Summer Time
  EGT: -60,
  // Eastern Greenland Time
  EIT: 540,
  // Eastern Indonesian Time
  EST: -300,
  // Eastern Standard Time (North America)
  FET: 180,
  // Further-eastern European Time
  FJT: 720,
  // Fiji Time
  FKST: -180,
  // Falkland Islands Standard Time
  FKT: -240,
  // Falkland Islands Time
  FNT: -120,
  // Fernando de Noronha Time
  GALT: -360,
  // Galapagos Time
  GAMT: -540,
  // Gambier Islands
  GET: 240,
  // Georgia Standard Time
  GFT: -180,
  // French Guiana Time
  GILT: 720,
  // Gilbert Island Time
  GIT: -540,
  // Gambier Island Time
  GMT: 0,
  // Greenwich Mean Time
  GST: -120,
  // South Georgia and the South Sandwich Islands
  GYT: -240,
  // Guyana Time
  HADT: -540,
  // Hawaii-Aleutian Daylight Time
  HAEC: 120,
  // Heure Avancée d'Europe Centrale francised name for CEST
  HAST: -600,
  // Hawaii-Aleutian Standard Time
  HKT: 480,
  // Hong Kong Time
  HMT: 300,
  // Heard and McDonald Islands Time
  HOVT: 420,
  // Khovd Time
  HST: -600,
  // Hawaii Standard Time
  IBST: 0,
  // International Business Standard Time
  ICT: 420,
  // Indochina Time
  IDT: 180,
  // Israel Daylight Time
  IOT: 180,
  // Indian Ocean Time
  IRDT: 270,
  // Iran Daylight Time
  IRKT: 480,
  // Irkutsk Time
  IRST: 210,
  // Iran Standard Time
  IST: 120,
  // Israel Standard Time
  JST: 540,
  // Japan Standard Time
  KGT: 360,
  // Kyrgyzstan time
  KOST: 660,
  // Kosrae Time
  KRAT: 420,
  // Krasnoyarsk Time
  KST: 540,
  // Korea Standard Time
  LHST: 630,
  // Lord Howe Standard Time
  LINT: 840,
  // Line Islands Time
  MAGT: 720,
  // Magadan Time
  MART: -510,
  // Marquesas Islands Time
  MAWT: 300,
  // Mawson Station Time
  MDT: -360,
  // Mountain Daylight Time (North America)
  MET: 60,
  // Middle European Time Same zone as CET
  MEST: 120,
  // Middle European Summer Time Same zone as CEST
  MHT: 720,
  // Marshall Islands
  MIST: 660,
  // Macquarie Island Station Time
  MIT: -510,
  // Marquesas Islands Time
  MMT: 390,
  // Myanmar Time
  MSK: 180,
  // Moscow Time
  MST: -420,
  // Mountain Standard Time (North America)
  MUT: 240,
  // Mauritius Time
  MVT: 300,
  // Maldives Time
  MYT: 480,
  // Malaysia Time
  NCT: 660,
  // New Caledonia Time
  NDT: -90,
  // Newfoundland Daylight Time
  NFT: 660,
  // Norfolk Time
  NPT: 345,
  // Nepal Time
  NST: -150,
  // Newfoundland Standard Time
  NT: -150,
  // Newfoundland Time
  NUT: -660,
  // Niue Time
  NZDT: 780,
  // New Zealand Daylight Time
  NZST: 720,
  // New Zealand Standard Time
  OMST: 360,
  // Omsk Time
  ORAT: 300,
  // Oral Time
  PDT: -420,
  // Pacific Daylight Time (North America)
  PET: -300,
  // Peru Time
  PETT: 720,
  // Kamchatka Time
  PGT: 600,
  // Papua New Guinea Time
  PHOT: 780,
  // Phoenix Island Time
  PKT: 300,
  // Pakistan Standard Time
  PMDT: -120,
  // Saint Pierre and Miquelon Daylight time
  PMST: -180,
  // Saint Pierre and Miquelon Standard Time
  PONT: 660,
  // Pohnpei Standard Time
  PST: -480,
  // Pacific Standard Time (North America)
  PYST: -180,
  // Paraguay Summer Time (South America)
  PYT: -240,
  // Paraguay Time (South America)
  RET: 240,
  // Réunion Time
  ROTT: -180,
  // Rothera Research Station Time
  SAKT: 660,
  // Sakhalin Island time
  SAMT: 240,
  // Samara Time
  SAST: 120,
  // South African Standard Time
  SBT: 660,
  // Solomon Islands Time
  SCT: 240,
  // Seychelles Time
  SGT: 480,
  // Singapore Time
  SLST: 330,
  // Sri Lanka Standard Time
  SRET: 660,
  // Srednekolymsk Time
  SRT: -180,
  // Suriname Time
  SST: 480,
  // Singapore Standard Time
  SYOT: 180,
  // Showa Station Time
  TAHT: -600,
  // Tahiti Time
  THA: 420,
  // Thailand Standard Time
  TFT: 300,
  // Indian/Kerguelen
  TJT: 300,
  // Tajikistan Time
  TKT: 780,
  // Tokelau Time
  TLT: 540,
  // Timor Leste Time
  TMT: 300,
  // Turkmenistan Time
  TOT: 780,
  // Tonga Time
  TVT: 720,
  // Tuvalu Time
  UCT: 0,
  // Coordinated Universal Time
  ULAT: 480,
  // Ulaanbaatar Time
  USZ1: 120,
  // Kaliningrad Time
  UTC: 0,
  // Coordinated Universal Time
  UYST: -120,
  // Uruguay Summer Time
  UYT: -180,
  // Uruguay Standard Time
  UZT: 300,
  // Uzbekistan Time
  VET: -240,
  // Venezuelan Standard Time
  VLAT: 600,
  // Vladivostok Time
  VOLT: 240,
  // Volgograd Time
  VOST: 360,
  // Vostok Station Time
  VUT: 660,
  // Vanuatu Time
  WAKT: 720,
  // Wake Island Time
  WAST: 120,
  // West Africa Summer Time
  WAT: 60,
  // West Africa Time
  WEDT: 60,
  // Western European Daylight Time
  WEST: 60,
  // Western European Summer Time
  WET: 0,
  // Western European Time
  WIT: 420,
  // Western Indonesian Time
  WST: 480,
  // Western Standard Time
  YAKT: 540,
  // Yakutsk Time
  YEKT: 300
  // Yekaterinburg Time
};
var timezoneNames_default = timezoneNames;

// src/data/baseLookups.ts
var baseLookups = {
  zone: timezoneNames_default,
  year: twoDigitYears_default,
  meridiem: { am: 0, pm: 12, "a.m.": 0, "p.m.": 12 },
  month: {
    january: 1,
    jan: 1,
    february: 2,
    feb: 2,
    march: 3,
    mar: 3,
    april: 4,
    apr: 4,
    may: 5,
    june: 6,
    jun: 6,
    july: 7,
    jul: 7,
    august: 8,
    aug: 8,
    september: 9,
    sep: 9,
    october: 10,
    oct: 10,
    november: 11,
    nov: 11,
    december: 12,
    dec: 12
  },
  dayname: {
    sunday: 0,
    sun: 0,
    monday: 1,
    mon: 1,
    tuesday: 2,
    tue: 2,
    wednesday: 3,
    wed: 3,
    thursday: 4,
    thu: 4,
    friday: 5,
    fri: 5,
    saturday: 6,
    sat: 6
  },
  digit: {}
};
var baseLookups_default = baseLookups;

// src/data/templates.ts
var latn = {
  MONTHNAME: "january|february|march|april|may|june|july|august|september|october|november|december|jan\\.?|feb\\.?|mar\\.?|apr\\.?|may\\.?|jun\\.?|jul\\.?|aug\\.?|sep\\.?|oct\\.?|nov\\.?|dec\\.?",
  DAYNAME: "sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun\\.?|mon\\.?|tue\\.?|wed\\.?|thu\\.?|fri\\.?|sat\\.?",
  ZONE: "\\(?(?:" + Object.keys(timezoneNames_default).join("|") + ")\\)?",
  MERIDIEM: "am|pm|a.m.|p.m.",
  ORDINAL: "st|nd|rd|th|\\.",
  YEAR: "\\d{4}|\\d{2}",
  YEAR2: "\\d{2}",
  YEAR4: "\\d{4}",
  YEAR6: "-\\d{6}|\\+?\\d{5,6}",
  MONTH: "1[0-2]|0?[1-9]",
  MONTH2: "1[0-2]|0[1-9]",
  DAY: "3[01]|[12]\\d|0?[1-9]",
  DAY2: "3[01]|[12]\\d|0[1-9]",
  OFFSET: "(?:GMT)?[\xB1\u2212+-](?:[01]\\d[0-5]\\d|[01]\\d:[0-5]\\d|[01]?\\d)",
  H24: "[01]\\d|2[0-3]",
  H12: "0?[1-9]|1[012]",
  MIN: "[0-5]\\d",
  // Although JavaScript dates can't account for leap seconds,
  // we can parse "60" and JavaScript will roll over to the next day
  SEC: "[0-5]\\d|60",
  MS: "\\d{9}|\\d{6}|\\d{1,3}",
  GAP: "[\\s/.,-]{1,}"
};
var other = {
  ...latn,
  YEAR: "*{4}|*{2}",
  YEAR4: "*{4}",
  YEAR6: "-*{6}|\\+?*{5,6}",
  MONTH: "*{1,2}",
  MONTH2: "*{2}",
  DAY: "*{1,2}",
  DAY2: "*{2}",
  OFFSET: "(?:GMT)?[\xB1\u2212+-](?:*{4}|*{2}:*{2}|*{1,2})",
  H24: "*{2}",
  H12: "*{1,2}",
  MIN: "*{2}",
  SEC: "*{2}",
  MS: "*{9}|*{6}|*{3}"
};

// src/LocaleHelper/LocaleHelper.ts
var cache2 = {};
var LocaleHelper = class _LocaleHelper {
  /**
   * The locale string
   */
  locale;
  /**
   * Lookups for zone, year, meridiem, month, dayname, digit
   */
  lookups;
  /**
   * Template variables including MONTHNAME, MONTH, ZONE, etc.
   */
  vars;
  /**
   * The numbering system to use (latn=standard arabic digits)
   */
  numberingSystem;
  /**
   * The base name of the locale (e.g. en-US)
   */
  baseName;
  /**
   * Date options for the locale
   * @property locale: string;
   * @property calendar: string;
   * @property numberingSystem: string;
   * @property timeZone: string;
   * @property hour12?: boolean;
   * @property weekday?: string;
   * @property era?: string;
   * @property year?: string;
   * @property month?: string;
   * @property day?: string;
   * @property hour?: string;
   * @property minute?: string;
   * @property second?: string;
   * @property timeZoneName?: string;
   */
  dateOptions;
  /**
   * Get a singleton instance with the given locale
   * @param locale such as en, en-US, es, fr-FR, etc.
   * @returns
   */
  static factory(locale = defaultLocale_default) {
    if (!cache2[locale.toLowerCase()]) {
      cache2[locale.toLowerCase()] = new _LocaleHelper(locale);
    }
    return cache2[locale.toLowerCase()];
  }
  /**
   * Create a new instance with the given locale
   * @param locale such as en, en-US, es, fr-FR, etc.
   */
  constructor(locale = defaultLocale_default) {
    this.locale = locale;
    this.lookups = { ...baseLookups_default };
    this.vars = { ...latn };
    const fmt = new Intl.NumberFormat(this.locale);
    this.numberingSystem = fmt.resolvedOptions().numberingSystem;
    this.dateOptions = new Intl.DateTimeFormat(this.locale).resolvedOptions();
    this.baseName = new Intl.Locale(this.locale).baseName;
    this.build();
  }
  /**
   * Cast a string to an integer, minding numbering system
   * @param digitString  Such as "2020" or "二〇二〇"
   * @returns
   */
  toInt(digitString) {
    if (typeof digitString === "number") {
      return digitString;
    }
    if (typeof digitString !== "string") {
      return void 0;
    }
    if (this.numberingSystem === "latn" && !this.baseName.startsWith("zh")) {
      const num = parseInt(digitString, 10);
      if (!isNaN(num)) {
        return num;
      }
    }
    let latnDigitString = "";
    for (let i = 0; i < digitString.length; i++) {
      latnDigitString += String(this.lookups.digit[digitString[i]]);
    }
    return parseInt(latnDigitString, 10);
  }
  millisecondToInt(msString) {
    if (typeof msString === "number") {
      return msString;
    }
    if (typeof msString !== "string") {
      return void 0;
    }
    const digits = msString.slice(0, 3);
    if (digits.length === 1) {
      return this.toInt(digits) * 100;
    } else if (digits.length === 2) {
      return this.toInt(digits) * 10;
    }
    return this.toInt(digits);
  }
  monthNameToInt(monthName) {
    if (typeof monthName !== "string") {
      return void 0;
    }
    const lower = monthName.toLocaleLowerCase(this.locale).replace(/\.$/, "");
    return this.lookups.month[lower] || 12;
  }
  h12ToInt(digitString, ampm) {
    if (typeof digitString !== "string") {
      return void 0;
    }
    const meridiemOffset = this.lookups.meridiem[ampm?.toLowerCase()] || 0;
    let hourInt = this.toInt(digitString);
    if (hourInt < 12 && meridiemOffset === 12) {
      hourInt += 12;
    }
    if (hourInt === 12 && meridiemOffset === 0) {
      hourInt = 0;
    }
    return hourInt;
  }
  zoneToOffset(zoneName) {
    if (typeof zoneName !== "string") {
      return void 0;
    }
    zoneName = zoneName.replace(/[^a-z\s]/gi, "");
    return this.lookups.zone[zoneName];
  }
  /**
   * Convert an offset string to Numeric minutes (e.g. "-0500", "+5", "+03:30")
   * @param offsetString
   */
  offsetToMinutes(offsetString) {
    if (typeof offsetString !== "string") {
      return void 0;
    }
    const captured = offsetString.match(/^(?:GMT)?([±−+-])(..?):?(..)?$/);
    if (captured) {
      const [, sign, hours, minutes] = captured;
      return (sign === "-" || sign === "\u2212" ? -1 : 1) * (this.toInt(hours) * 60 + this.toInt(minutes || 0));
    }
    return 0;
  }
  /**
   * Build lookups for digits, month names, day names, and meridiems based on the locale
   */
  build() {
    if (this.dateOptions.numberingSystem === "latn") {
      this.lookups.digit = defaultLookup;
    } else {
      this.buildNumbers();
    }
    if (!/^en/i.test(this.locale)) {
      this.buildMonthNames();
      this.buildDaynames();
      if (!/zh/i.test(this.locale)) {
        this.buildMeridiems();
      }
    }
  }
  /**
   * Build lookups for non-arabic digits
   */
  buildNumbers() {
    const { group, lookup } = buildDigits(this.numberingSystem);
    this.lookups.digit = lookup;
    for (const name in other) {
      if (!other.hasOwnProperty(name)) {
        continue;
      }
      this.vars[name] = other[name].replace(/\*/g, group);
    }
  }
  /**
   * Build lookup for month names
   */
  buildMonthNames() {
    const vars = {};
    const lookup = {};
    if (/^fi/i.test(this.locale)) {
      const months = "tammi|helmi|maalis|huhti|touko|kes\xE4|hein\xE4|elo|syys|loka|marras|joulu";
      months.split("|").forEach((month, idx) => {
        ["", "k", "kuu", "kuuta"].forEach((suffix, i) => {
          const maybePeriod = i < 2 ? "\\.?" : "";
          vars[month + suffix + maybePeriod] = true;
          lookup[month + suffix] = idx + 1;
        });
      });
    } else {
      const dates = [];
      const findMonth = (item) => item.type === "month";
      for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
        dates.push(new Date(2017, monthIdx, 1));
      }
      const dateStyles = ["full", "long", "medium"];
      for (const dateStyle of dateStyles) {
        const format2 = Intl.DateTimeFormat(this.locale, { dateStyle });
        for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
          const parts = format2.formatToParts(dates[monthIdx]);
          let text = parts.find(findMonth).value.toLocaleLowerCase(this.locale);
          if (/^\d+$/.test(text)) {
            continue;
          }
          if (/^ko/i.test(this.locale)) {
            text += "\uC6D4";
          }
          if (dateStyle === "medium") {
            text = text.replace(/\.$/, "");
            vars[`${text}\\.?`] = true;
          } else {
            vars[text] = true;
          }
          lookup[text] = monthIdx + 1;
        }
      }
      const format = Intl.DateTimeFormat(this.locale, { month: "short" });
      for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
        const parts = format.formatToParts(dates[monthIdx]);
        let text = parts.find(findMonth).value.toLocaleLowerCase(this.locale);
        text = text.replace(/\.$/, "");
        vars[`${text}\\.?`] = true;
        lookup[text] = monthIdx + 1;
      }
    }
    this.vars.MONTHNAME = Object.keys(vars).join("|");
    this.lookups.month = lookup;
  }
  /**
   * Build lookup for day name
   */
  buildDaynames() {
    const dates = [];
    const findDay = (item) => item.type === "weekday";
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      dates.push(new Date(2017, 0, dayIndex + 1));
    }
    const weekdays = ["long", "short"];
    const list = [];
    const lookup = {};
    for (const weekday of weekdays) {
      const format = Intl.DateTimeFormat(this.locale, { weekday });
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const parts = format.formatToParts(dates[dayIndex]);
        let text = parts.find(findDay).value.toLocaleLowerCase(this.locale);
        if (weekday === "short") {
          text = text.replace(/\.$/, "");
          list.push(`${text}\\.?`);
        } else {
          list.push(text);
        }
        lookup[text] = dayIndex;
      }
    }
    this.vars.DAYNAME = list.join("|");
    this.lookups.dayname = lookup;
  }
  /**
   * Build lookup for am/pm
   */
  buildMeridiems() {
    const dates = [new Date(2017, 0, 1), new Date(2017, 0, 1, 23, 0, 0)];
    const findDayPeriod = (item) => item.type === "dayPeriod";
    const list = [];
    const lookup = {};
    const format = Intl.DateTimeFormat(this.locale, { timeStyle: "long" });
    for (let i = 0; i < 2; i++) {
      const parts = format.formatToParts(dates[i]);
      const dayPeriod = parts.find(findDayPeriod);
      if (!dayPeriod) {
        return;
      }
      const text = dayPeriod.value.toLocaleLowerCase(this.locale);
      list.push(text);
      lookup[text] = i * 12;
    }
    this.vars.MERIDIEM = list.join("|");
    this.lookups.meridiem = lookup;
  }
  /**
   * Compile template into a RegExp and return it
   * @param template  The template string such as (_YEAR_)-(_MONTH_)-(_DAY_)
   */
  compile(template) {
    const regexString = template.replace(/_([A-Z0-9]+)_/g, ($0, $1) => {
      if (!this.vars[$1]) {
        throw new Error(`Template string contains invalid variable _${$1}_`);
      }
      return this.vars[$1];
    });
    return new RegExp(regexString, "i");
  }
};

// src/data/mdyLocales.ts
var mdyLocales = [
  "ee-TG",
  // Togo (Ewe)
  "en-AS",
  // American Samoa
  "en-CA",
  // Canada
  "en-FM",
  // Federated States of Micronesia
  "en-GH",
  // Ghana
  "en-GU",
  // Guam
  "en-KE",
  // Kenya
  "en-KY",
  // Cayman Islands
  "en-MH",
  // Marshall Islands
  "en-MP",
  // Northern Mariana Islands
  "en-US",
  // United States
  "en-VI",
  // US Virgin Islands
  "en-WS",
  // Western Samoa
  "jp-JP",
  // Japan
  "sm-AS",
  // American Samoa (Samoan)
  "sm-SM"
  // Samoa
];

// src/data/unitShortcuts.ts
var unitShortcuts = {
  y: "year",
  M: "month",
  d: "day",
  w: "week",
  h: "hour",
  m: "minute",
  s: "second",
  ms: "millisecond"
};
var unitShortcuts_default = unitShortcuts;

// src/patterns/patterns.ts
var nowGetter = {
  now: () => /* @__PURE__ */ new Date()
};
function handlerWith(units) {
  return function handler(matches) {
    const result = {};
    for (let i = 0, len = units.length; i < len; i++) {
      const unit = units[i];
      if (unit) {
        result[unit] = matches[i];
      }
    }
    return result;
  };
}
function compile(helper) {
  const patterns = [
    {
      name: "timestampWithOffset",
      regex: helper.compile(
        "^(_YEAR4_)-(_MONTH_)-(_DAY_)[T ](_H24_):(_MIN_):(_SEC_)(?:.(_MS_))? ?(_OFFSET_|Z)?$"
      ),
      handler: handlerWith([
        "",
        "year",
        "month",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond",
        "offset"
      ])
    },
    {
      name: "timestampWithZone",
      regex: helper.compile(
        "^(_YEAR4_)-(_MONTH_)-(_DAY_)[T ](_H24_):(_MIN_):(_SEC_)(?:.(_MS_))?\\s*(_ZONE_)$"
      ),
      handler: handlerWith([
        "",
        "year",
        "month",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond",
        "zone"
      ])
    },
    {
      name: "timestampWithOffsetAndZone",
      regex: helper.compile(
        "^(_YEAR4_)-(_MONTH_)-(_DAY_)[T ](_H24_):(_MIN_):(_SEC_)(?:.(_MS_))? (_OFFSET_|Z)\\s*(_ZONE_)$"
      ),
      handler: handlerWith([
        "",
        "year",
        "month",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond",
        "offset"
      ])
    },
    {
      name: "chinese",
      regex: helper.compile(
        `^(${chineseGroup}{2,4})\\s*\u5E74\\s*(${chineseGroup}{1,2})\\s*\u6708\\s*(${chineseGroup}{1,2})\\s*\u65E5$`
      ),
      handler: handlerWith(["", "year", "month", "day"])
    },
    {
      name: "korean",
      regex: helper.compile("^(_YEAR_)\uB144\\s*(_MONTH_)\uC6D4\\s*(_DAY_)\uC77C$"),
      handler: handlerWith(["", "year", "month", "day"])
    },
    {
      name: "twitter",
      regex: /^(?:sun|mon|tue|wed|thu|fri|sat) (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec) (\d{2}) (\d{2}):(\d{2}):(\d{2}) ([+-]\d{4}) (\d{4})$/i,
      handler: handlerWith([
        "",
        "monthname",
        "day",
        "hour",
        "minute",
        "second",
        "offset",
        "year"
      ])
    },
    {
      name: "today",
      regex: /^(now|today|tomorrow|yesterday)$/i,
      handler: function(match) {
        const now = nowGetter.now();
        const aDay = 24 * 60 * 60 * 1e3;
        const keyword = match[0].toLowerCase();
        const toAdd = {
          now: 0,
          today: 0,
          tomorrow: aDay,
          yesterday: -1 * aDay
        }[keyword];
        if (toAdd !== 0) {
          now.setTime(now.getTime() + toAdd);
        }
        const result = {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate()
        };
        if (keyword === "now") {
          return {
            ...result,
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds(),
            millisecond: now.getMilliseconds()
          };
        }
        return result;
      }
    },
    {
      name: "ago",
      regex: /^(\+|-|in|) ?([\d.]+) ?(years?|months?|weeks?|days?|hours?|minutes?|seconds?|milliseconds?|ms|s|m|h|w|d|M|y)( ago)?$/i,
      handler: function([, sign, amount, unit, isAgo]) {
        amount = parseFloat(amount);
        if (unit.length <= 2) {
          unit = unitShortcuts_default[unit];
        } else {
          unit = unit.replace(/s$/, "");
          unit = unit.toLowerCase();
        }
        if (unit === "week") {
          unit = "day";
          amount *= 7;
        }
        if (sign === "-" || isAgo) {
          amount *= -1;
        }
        const now = nowGetter.now();
        if (unit === "millisecond") {
          now.setUTCMilliseconds(now.getUTCMilliseconds() + amount);
        } else if (unit === "second") {
          now.setUTCSeconds(now.getUTCSeconds() + amount);
        } else if (unit === "minute") {
          now.setUTCMinutes(now.getUTCMinutes() + amount);
        } else if (unit === "hour") {
          now.setUTCHours(now.getUTCHours() + amount);
        } else if (unit === "day") {
          now.setUTCDate(now.getUTCDate() + amount);
        } else if (unit === "month") {
          now.setUTCMonth(now.getUTCMonth() + amount);
        } else if (unit === "year") {
          now.setUTCFullYear(now.getUTCFullYear() + amount);
        }
        return {
          year: now.getUTCFullYear(),
          month: now.getUTCMonth() + 1,
          day: now.getUTCDate(),
          hour: now.getUTCHours(),
          minute: now.getUTCMinutes(),
          second: now.getUTCSeconds(),
          millisecond: now.getUTCMilliseconds()
        };
      }
    },
    {
      name: "atSeconds",
      regex: /^@(\d+)$/,
      handler: function(matches) {
        const seconds = parseInt(matches[1], 10);
        const date = new Date(seconds * 1e3);
        return {
          year: date.getUTCFullYear(),
          month: date.getUTCMonth() + 1,
          day: date.getUTCDate(),
          hour: date.getUTCHours(),
          minute: date.getUTCMinutes(),
          second: date.getUTCSeconds()
        };
      }
    },
    {
      name: "microsoftJson",
      regex: /^\/Date\((\d+)([+-]\d{4})?\)\/$/,
      handler: function(matches) {
        const milliseconds = parseInt(matches[1], 10);
        const date = new Date(milliseconds);
        return {
          year: date.getUTCFullYear(),
          month: date.getUTCMonth() + 1,
          day: date.getUTCDate(),
          hour: date.getUTCHours(),
          minute: date.getUTCMinutes(),
          second: date.getUTCSeconds(),
          millisecond: date.getUTCMilliseconds(),
          offset: matches[2]
        };
      }
    },
    //
    // partial-matching formats
    //
    {
      name: "full24",
      regex: helper.compile(
        "(?:^|[\\sT])(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?(Z)?$"
      ),
      handler: handlerWith([
        "",
        "hour",
        "minute",
        "second",
        "millisecond",
        "zone"
      ])
    },
    {
      name: "zone24",
      regex: helper.compile(
        "(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?[\\s\\[(]*(_ZONE_)?[\\s\\])]*$"
      ),
      handler: handlerWith([
        "",
        "hour",
        "minute",
        "second",
        "millisecond",
        "zone"
      ])
    },
    {
      name: "hms12WithOffset",
      regex: helper.compile(
        "(_H12_):(_MIN_):(_SEC_)\\s*(_MERIDIEM_)\\s*(_OFFSET_)"
      ),
      handler: handlerWith([
        "",
        "hour",
        "minute",
        "second",
        "meridiem",
        "offset"
      ])
    },
    {
      name: "hms12",
      regex: helper.compile("(_H12_):(_MIN_):(_SEC_)\\s*(_MERIDIEM_)"),
      handler: handlerWith(["", "hour", "minute", "second", "meridiem"])
    },
    {
      name: "hms24",
      regex: helper.compile("(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?"),
      handler: handlerWith(["", "hour", "minute", "second", "millisecond"])
    },
    {
      name: "hm12",
      regex: helper.compile("(_H12_):(_MIN_)\\s*(_MERIDIEM_)"),
      handler: handlerWith(["", "hour", "minute", "meridiem"])
    },
    {
      name: "hm24",
      regex: helper.compile("(_H24_):(_MIN_)"),
      handler: handlerWith(["", "hour", "minute"])
    },
    {
      name: "h12",
      regex: helper.compile("(_H12_)\\s*(_MERIDIEM_)"),
      handler: handlerWith(["", "hour", "meridiem"])
    },
    {
      name: "8digit",
      regex: /^((?:19|20)\d{2})(\d{2})(\d{2})$/,
      handler: handlerWith(["", "year", "month", "day"])
    },
    {
      name: "yearMonthnameDay",
      regex: helper.compile(
        "(_YEAR4_)[\\s.-]+(_MONTHNAME_)[\\s,.-]+(_DAY_)(_ORDINAL_)?"
      ),
      handler: handlerWith(["", "year", "monthname", "day"])
    },
    {
      name: "dayMonthnameYear",
      regex: helper.compile(
        "(_DAY_)(_ORDINAL_)?[\\s.-]*(_MONTHNAME_)[\\s,.-]+(_YEAR_)"
      ),
      handler: handlerWith(["", "day", "", "monthname", "year"])
    },
    {
      name: "monthnameDayYear",
      regex: helper.compile(
        "(_MONTHNAME_)[\\s.-]*(_DAY_)(_ORDINAL_)?[\\s,.-]+(_YEAR_)"
      ),
      handler: handlerWith(["", "monthname", "day", "", "year"])
    },
    {
      name: "dayMonthname",
      regex: helper.compile("\\b(_DAY_)(_ORDINAL_)?[\\s.-]*(_MONTHNAME_)\\b"),
      handler: handlerWith(["", "day", "", "monthname"])
    },
    {
      name: "monthnameDay",
      regex: helper.compile("\\b(_MONTHNAME_)[\\s.-]*(_DAY_)(_ORDINAL_)?\\b"),
      handler: handlerWith(["", "monthname", "day"])
    },
    {
      name: "hmsNoMeridiem",
      regex: helper.compile("\\b(_H12_|_H24_):(_MIN_):(_SEC_)\\b"),
      handler: handlerWith(["", "hour", "minute", "second"])
    },
    {
      name: "hmNoMeridiem",
      regex: helper.compile("\\b(_H12_|_H24_):(_MIN_)\\b"),
      handler: handlerWith(["", "hour", "minute"])
    },
    {
      name: "ymd",
      regex: helper.compile("(_YEAR4_)([./-])(_MONTH_)\\2+(_DAY_)"),
      handler: handlerWith(["", "year", "", "month", "day"])
    },
    {
      name: "mdy",
      regex: helper.compile("(_MONTH_)([/-])(_DAY_)\\2(_YEAR_)"),
      handler: handlerWith(["", "month", "", "day", "year"])
    },
    {
      name: "dmy",
      regex: helper.compile(
        "(_DAY_)(?:_ORDINAL_)?[./\\s-]+(_MONTH_)[./\\s-]+(_YEAR_)"
      ),
      handler: handlerWith(["", "day", "month", "year"])
    },
    {
      name: "yearLoose",
      regex: helper.compile("_YEAR4_"),
      handler: handlerWith(["year"])
    },
    {
      name: "dayMonthnameLoose",
      regex: helper.compile("(_DAY_)[\\s.]*(_MONTHNAME_)"),
      handler: handlerWith(["", "day", "monthname"])
    },
    {
      name: "monthnameDayLoose",
      regex: helper.compile("(_MONTHNAME_)[\\s.]*(_DAY_)"),
      handler: handlerWith(["", "monthname", "day"])
    },
    {
      name: "monthname",
      regex: helper.compile("_MONTHNAME_"),
      handler: handlerWith(["monthname"])
    },
    {
      name: "year4",
      regex: helper.compile("_YEAR4_"),
      handler: handlerWith(["year"])
    },
    {
      name: "md",
      regex: helper.compile("(_MONTH_)[/-](_DAY_)"),
      handler: handlerWith(["", "month", "day"])
    },
    {
      name: "dm",
      regex: helper.compile("(_DAY_)(?:_ORDINAL_)?[./\\s-]+(_MONTH_)"),
      handler: handlerWith(["", "day", "month"])
    },
    {
      name: "day",
      regex: helper.compile("_DAY_"),
      handler: handlerWith(["day"])
    },
    {
      name: "year2",
      regex: helper.compile("_YEAR2_"),
      handler: handlerWith(["year"])
    },
    {
      name: "onlyZone",
      regex: helper.compile("_ZONE_"),
      handler: handlerWith(["zone"])
    },
    {
      name: "onlyOffset",
      regex: helper.compile("_OFFSET_"),
      handler: handlerWith(["offset"])
    }
  ];
  const twoLetterLocale = helper.baseName.slice(0, 5);
  if (mdyLocales.includes(twoLetterLocale)) {
    return patterns;
  }
  return patterns.filter((p) => !["mdy", "md"].includes(p.name));
}

// src/PatternMatcher/PatternMatcher.ts
var PatternMatcher = class {
  doneChecker;
  fallback;
  patterns;
  formatter;
  constructor({
    doneChecker: doneChecker2,
    fallback,
    patterns,
    formatter
  }) {
    this.doneChecker = doneChecker2;
    this.fallback = fallback;
    this.patterns = patterns;
    this.formatter = formatter;
  }
  attempt(input) {
    if (typeof input !== "string") {
      return this.fallback(input);
    }
    let workingString = input.trim();
    const rawResult = {};
    let hadMatch = false;
    for (const pattern of this.patterns) {
      const matches = workingString.match(pattern.regex);
      if (!matches) {
        continue;
      }
      hadMatch = true;
      const result = pattern.handler(matches);
      if (result) {
        for (const [key, value] of Object.entries(result)) {
          if (!(key in rawResult) && value !== void 0) {
            rawResult[key] = value;
          }
        }
        workingString = workingString.slice(0, matches.index) + workingString.slice(matches.index + matches[0].length + 1);
        workingString = workingString.trim();
        if (this.doneChecker(rawResult, workingString)) {
          break;
        }
      }
    }
    return hadMatch ? this.formatter(rawResult) : this.fallback(input);
  }
};

// src/PatternMatcher/getMatcher.ts
var finalFields = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond",
  "offset"
];
var matcherByLocale = {};
function getMatcher(locale) {
  if (!matcherByLocale[locale]) {
    const helper = LocaleHelper.factory(locale);
    matcherByLocale[locale] = new PatternMatcher({
      doneChecker,
      fallback: getFallback(locale),
      patterns: compile(helper),
      formatter: getFormatter(helper)
    });
  }
  return matcherByLocale[locale];
}
function doneChecker(res, input) {
  return input === "" || /^\s+$/.test(input) || "year" in res && ("month" in res || "monthname" in res) && "day" in res && "hour" in res && "minute" in res && "second" in res && "millisecond" in res && ("zone" in res || "offset" in res);
}
function getFallback(locale) {
  return function handleInvalid(input) {
    let string = String(input).slice(0, 50);
    if (string === "") {
      string = "(empty string)";
    }
    return { invalid: `Unable to parse "${string}" with locale "${locale}"` };
  };
}
function getFormatter(helper) {
  return function format(extracted) {
    const result = {};
    for (const [name, value] of Object.entries(extracted)) {
      if (name === "monthname") {
        if (value) {
          const month = helper.monthNameToInt(value);
          if (month !== void 0) {
            result.month = month;
          }
        }
      } else if (name === "hour" && extracted.meridiem) {
        const hour = helper.h12ToInt(value, extracted.meridiem);
        if (hour !== void 0) {
          result.hour = hour;
        }
      } else if (name === "zone") {
        if (value) {
          const offset = helper.zoneToOffset(value);
          if (offset !== void 0) {
            result.offset = offset;
          }
        }
      } else if (name === "offset") {
        const offset = helper.offsetToMinutes(value);
        if (offset !== void 0) {
          result.offset = offset;
        }
      } else if (name === "millisecond") {
        const casted = helper.millisecondToInt(value);
        if (typeof casted === "number") {
          result.millisecond = casted;
        }
      } else if (finalFields.includes(name)) {
        const casted = helper.toInt(value);
        if (typeof casted === "number") {
          result[name] = casted;
        }
      }
    }
    if (result.year < 100) {
      result.year = twoDigitYears_default[result.year];
    }
    if (result.year && helper.dateOptions.calendar === "buddhist") {
      result.year -= 543;
    }
    return result;
  };
}

// src/data/preprocessors.ts
var periodsInsteadOfColons = [
  [/([^\d.]+)(\d{1,2})\.(\d{2})\.(\d{2})(\D|$)/, "$1$2:$3:$4$5"],
  [/([^\d.]+)(\d{1,2})\.(\d{2})(\D|$)/, "$1$2:$3$4"]
];
var preprocessors = {
  ar: [[/ /g, " "]],
  // Some built-in formats contain non-breaking space
  bn: [[/,/g, ""]],
  zh: [
    // in Chinese, am/pm comes before the digits
    [/早上\s*([\d:]+)/, "$1am"],
    [/凌晨\s*([\d:]+)/, "$1am"],
    [/上午\s*([\d:]+)/, "$1am"],
    [/下午\s*([\d:]+)/, "$1pm"],
    [/晚上\s*([\d:]+)/, "$1pm"]
    // Chinese "time"
    // [/\[.+?時間]/, ''],
  ],
  he: [[/ב/gi, ""]],
  // "of" in various languages
  de: [[/ um /g, " "]],
  pt: [[/\sde /gi, " "]],
  es: [[/\sde /gi, " "]],
  da: [[/\sden /gi, " "], ...periodsInsteadOfColons],
  // Russian symbol after years
  ru: [[/ г\./g, ""]],
  th: [
    // Thai "at/on"
    // [/ที่/gi, ''],
    [/\s*นาฬิกา\s*/i, ":"],
    // "hour"
    [/\s*นาที\s*/i, ":"],
    // "minute"
    [/\s*วินาที\s*/i, " "]
    // "second"
  ],
  ko: [
    [/\s*시\s*/, ":"],
    // "hour"
    [/\s*분\s*/, ":"],
    // "minute"
    [/\s*초\s*/, ""],
    // "second"
    [/(오전|오후)\s*([\d:]+)/, "$2$1"],
    // move AM/PM to the end
    [/(\d{4})\. (\d{1,2})\. (\d{1,2})\./, "$1-$2-$3"]
  ],
  fi: periodsInsteadOfColons,
  id: periodsInsteadOfColons,
  fr: [
    [/(\d{2}) h /, "$1:"],
    [/(\d{2}) min /, "$1:"],
    [/(\d{2}) s /, "$1"]
  ]
};
var preprocessors_default = preprocessors;

// src/runPreprocessors/runPreprocessors.ts
function runPreprocessors(dateString, locale) {
  const twoLetterLocale = locale.slice(0, 2).toLowerCase();
  const replacers = preprocessors_default[twoLetterLocale];
  if (!replacers) {
    return dateString;
  }
  for (const [find, replace] of replacers) {
    dateString = dateString.replace(find, replace);
  }
  return dateString;
}

// src/main.ts
function attempt(dateStr, locale = defaultLocale_default) {
  const matcher = getMatcher(locale);
  const processed = runPreprocessors(dateStr, locale);
  return matcher.attempt(processed);
}
function fromObject(parsed) {
  if (parsed.month && parsed.day && parsed.year === void 0) {
    parsed.year = (/* @__PURE__ */ new Date()).getFullYear();
  }
  if (parsed.second === 60) {
    parsed.second = 59;
  }
  const date = new MaybeValidDate(
    parsed.year,
    parsed.month - 1,
    parsed.day,
    parsed.hour || 0,
    parsed.minute || 0,
    parsed.second || 0,
    parsed.millisecond || 0
  );
  if (typeof parsed.offset === "number") {
    return new MaybeValidDate(date.valueOf() - parsed.offset * 60 * 1e3);
  }
  return date;
}
function fromString(dateStr, locale = defaultLocale_default) {
  const result = attempt(dateStr, locale);
  const date = result.invalid ? new MaybeValidDate(NaN) : fromObject(result);
  if (!date.isValid()) {
    date.invalid = `Unable to parse date "${dateStr}"`;
  }
  return date;
}
function fromAny(any, locale = defaultLocale_default) {
  if (any instanceof Date) {
    return new MaybeValidDate(any.valueOf());
  }
  if (typeof any === "number") {
    return new MaybeValidDate(any);
  }
  return fromString(any, locale);
}
Date.fromString = MaybeValidDate.fromString = fromString;
Date.fromAny = MaybeValidDate.fromAny = fromAny;
var parser = {
  fromString,
  fromAny,
  fromObject,
  attempt
};
if (typeof window !== "undefined") {
  window.anyDateParser = parser;
}
var main_default = parser;

export { attempt, main_default as default, fromAny, fromObject, fromString };
//# sourceMappingURL=index-b20fde95.js.map
