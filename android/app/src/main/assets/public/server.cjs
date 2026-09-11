var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "aura",
      private: true,
      version: "1.0.6",
      type: "module",
      scripts: {
        dev: "tsx server.ts",
        build: "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --outfile=dist/server.cjs",
        "release:ota": `npm run build && cd dist && zip -r ../public/dist.zip . -x '*.zip' && cd .. && node -e "require('fs').writeFileSync('public/update-manifest.json', JSON.stringify({ version: Date.now().toString(), url: 'https://aura.webcraftstudio.cloud/dist.zip' }))"`,
        start: "node dist/server.cjs",
        preview: "vite preview",
        clean: "rm -rf dist server.js",
        lint: "tsc --noEmit",
        "sync-sermons": "tsx scripts/sync-youtube-sermons.ts"
      },
      dependencies: {
        "@capacitor-community/native-audio": "^8.0.0",
        "@capacitor-firebase/authentication": "^8.5.1",
        "@capacitor/android": "^8.5.0",
        "@capacitor/app": "^8.1.1",
        "@capacitor/cli": "^7.6.8",
        "@capacitor/core": "^8.5.0",
        "@capacitor/filesystem": "^8.1.3",
        "@capacitor/push-notifications": "^8.1.2",
        "@capgo/capacitor-incoming-call-kit": "^8.2.7",
        "@capgo/capacitor-updater": "^8.51.15",
        "@google/genai": "^2.4.0",
        "@tailwindcss/vite": "^4.1.14",
        "@types/canvas-confetti": "^1.9.0",
        "@types/multer": "^2.2.0",
        "@vitejs/plugin-react": "^5.0.4",
        bcrypt: "^6.0.0",
        "better-sqlite3": "^12.11.1",
        "canvas-confetti": "^1.9.4",
        "date-fns": "^4.4.0",
        dotenv: "^17.2.3",
        express: "^4.21.2",
        firebase: "^12.18.0",
        jsonwebtoken: "^9.0.3",
        "lucide-react": "^0.546.0",
        motion: "^12.23.24",
        multer: "^2.2.0",
        react: "^19.0.1",
        "react-dom": "^19.0.1",
        vite: "^6.2.3",
        "web-push": "^3.6.7"
      },
      devDependencies: {
        "@capacitor/assets": "^3.0.5",
        "@types/express": "^4.17.21",
        "@types/node": "^22.14.0",
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.5",
        autoprefixer: "^10.4.21",
        esbuild: "^0.25.0",
        sharp: "^0.35.4",
        tailwindcss: "^4.1.14",
        tsx: "^4.21.0",
        typescript: "~5.8.2",
        vite: "^6.2.3"
      }
    };
  }
});

// services/youtubeFeedService.ts
var import_https = __toESM(require("https"), 1);
var MONITORED_CHANNELS = [
  {
    name: "Lighthouse Baptist Church",
    handle: "@lighthousewinc",
    channelId: "UC-rPauVwKrxsFn05cecsF-w",
    speaker: "Pastor Luke Shope",
    speakerTitle: "Lighthouse Baptist Church \u2022 Winchester, VA",
    featured: true,
    defaultCover: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Tyler Gaulden",
    handle: "@TylerGaulden",
    channelId: "UCunY7TdNYdO_8tgZqNpUYfA",
    speaker: "Tyler Gaulden",
    speakerTitle: "Evangelist & Speaker",
    defaultCover: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Steven Furtick",
    handle: "@stevenfurtick",
    channelId: "UCIQqvZbHSwX0yKNVK1MyYjQ",
    speaker: "Steven Furtick",
    speakerTitle: "Elevation Church",
    defaultCover: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Scott Pauley",
    handle: "@ETJ",
    channelId: "UCJ-nK4Wv807yYZrRGEufnig",
    speaker: "Scott Pauley",
    speakerTitle: "Enjoying The Journey",
    defaultCover: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Tony Evans",
    handle: "@drtonyevans",
    channelId: "UCCWRy-Q4ejmtHpmQJJYJd6A",
    speaker: "Dr. Tony Evans",
    speakerTitle: "The Urban Alternative",
    defaultCover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Fargo Baptist Church",
    handle: "@FargoBaptistChurch",
    channelId: "UC-GMRbrd4dY8iiid8czVxWw",
    speaker: "Fargo Baptist Church",
    speakerTitle: "Fargo, ND",
    defaultCover: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Our Daily Bread",
    handle: "@ourdailybread",
    channelId: "UCsOZjmfxUh94dQPzrgIRrLA",
    speaker: "Our Daily Bread",
    speakerTitle: "Ministries Worldwide",
    defaultCover: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Lilly Grove Missionary Baptist Church",
    handle: "@lillygrovembc",
    channelId: "UCwibXBbhAZNTqYeEyeHpwaw",
    speaker: "Lilly Grove Baptist",
    speakerTitle: "Houston, TX",
    defaultCover: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Alfred Street Baptist Church",
    handle: "@AlfredStreetBaptistChurch",
    channelId: "UCKFkEcTQsLP7j6DFo-O4xrg",
    speaker: "Alfred Street Baptist",
    speakerTitle: "Alexandria, VA",
    defaultCover: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Reformers Unanimous",
    handle: "@RURecoveryProgram",
    channelId: "UCDmfM_p5-je826nxz8UX5_g",
    speaker: "RU Recovery Ministries",
    speakerTitle: "Faith-Based Addiction Recovery",
    defaultCover: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop&q=80"
  }
];
var cachedFeed = [];
var lastFetch = 0;
var TTL = 10 * 60 * 1e3;
function fetchXml(url) {
  return new Promise((resolve, reject) => {
    import_https.default.get(url, { headers: { "User-Agent": "Mozilla/5.0 AuraApp/1.0" } }, (res) => {
      if (res.statusCode && res.statusCode >= 400) return reject(new Error(String(res.statusCode)));
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => resolve(body));
    }).on("error", reject);
  });
}
var CURATED_MINISTRY_FALLBACK = [
  {
    id: "yt-drtony-1",
    title: "Kingdom Authority: Reclaiming What the Enemy Stole (Part 1)",
    speaker: "Dr. Tony Evans",
    speakerSlug: "drtonyevans",
    speakerTitle: "The Urban Alternative",
    channel: "Dr. Tony Evans",
    series: "Kingdom Authority & Spiritual Warfare",
    seriesPart: 1,
    summary: "Dr. Tony Evans explains the divine legal right and biblical authority believers have in Jesus Christ over adversary strongholds.",
    duration: "28:45",
    mediaType: "video",
    format: "video",
    source: "community",
    featured: true,
    youtubeId: "V5f_Gg873_8",
    mediaUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    publishedAt: new Date(Date.now() - 36e5 * 12).toISOString(),
    topics: [{ name: "Kingdom Authority", slug: "kingdom-authority" }]
  },
  {
    id: "yt-drtony-2",
    title: "Operating Under Heaven's Jurisdiction (Part 2)",
    speaker: "Dr. Tony Evans",
    speakerSlug: "drtonyevans",
    speakerTitle: "The Urban Alternative",
    channel: "Dr. Tony Evans",
    series: "Kingdom Authority & Spiritual Warfare",
    seriesPart: 2,
    summary: "Discover how alignment with God's sovereignty unlocks victory, spiritual breakthrough, and generational blessing.",
    duration: "32:10",
    mediaType: "video",
    format: "video",
    source: "community",
    featured: true,
    youtubeId: "vB0jKx9bK0E",
    mediaUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80",
    publishedAt: new Date(Date.now() - 36e5 * 48).toISOString(),
    topics: [{ name: "Kingdom Authority", slug: "kingdom-authority" }]
  },
  {
    id: "yt-drtony-3",
    title: "Breaking Generational Chains Through Christ (Part 3)",
    speaker: "Dr. Tony Evans",
    speakerSlug: "drtonyevans",
    speakerTitle: "The Urban Alternative",
    channel: "Dr. Tony Evans",
    series: "Kingdom Authority & Spiritual Warfare",
    seriesPart: 3,
    summary: "Breaking spiritual bonds and stepping into the full liberty purchased at the cross of Calvary.",
    duration: "30:15",
    mediaType: "video",
    format: "video",
    source: "community",
    featured: true,
    youtubeId: "9bZkp7q19f0",
    mediaUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    publishedAt: new Date(Date.now() - 36e5 * 96).toISOString(),
    topics: [{ name: "Kingdom Authority", slug: "kingdom-authority" }]
  },
  {
    id: "yt-luke-1",
    title: "Walking in the Light of Christ (Part 1)",
    speaker: "Pastor Luke Shope",
    speakerSlug: "lighthousewinc",
    speakerTitle: "Lighthouse Baptist Church \u2022 Winchester, VA",
    channel: "Lighthouse Baptist Church",
    series: "Sunday Sanctuary Expositions",
    seriesPart: 1,
    summary: "An urgent, verse-by-verse exposition of 1 John 1 on walking in fellowship, truth, and genuine repentance before God.",
    duration: "41:20",
    mediaType: "video",
    format: "video",
    source: "community",
    featured: true,
    youtubeId: "jNQXAC9IVRw",
    mediaUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop&q=80",
    publishedAt: new Date(Date.now() - 36e5 * 24).toISOString(),
    topics: [{ name: "Sanctuary Expositions", slug: "sanctuary" }]
  },
  {
    id: "yt-luke-2",
    title: "The Cleansing Blood and Assurance of Salvation (Part 2)",
    speaker: "Pastor Luke Shope",
    speakerSlug: "lighthousewinc",
    speakerTitle: "Lighthouse Baptist Church \u2022 Winchester, VA",
    channel: "Lighthouse Baptist Church",
    series: "Sunday Sanctuary Expositions",
    seriesPart: 2,
    summary: "Living with unshakable biblical confidence in Christ's completed work on Calvary and the power of the cross.",
    duration: "38:50",
    mediaType: "video",
    format: "video",
    source: "community",
    featured: true,
    youtubeId: "e-ORhEE9VVg",
    mediaUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop&q=80",
    publishedAt: new Date(Date.now() - 36e5 * 72).toISOString(),
    topics: [{ name: "Sanctuary Expositions", slug: "sanctuary" }]
  },
  {
    id: "yt-pauley-1",
    title: "The Lord Is My Shepherd: Never in Want (Part 1)",
    speaker: "Scott Pauley",
    speakerSlug: "etj",
    speakerTitle: "Enjoying The Journey",
    channel: "Scott Pauley",
    series: "Enjoying The Journey - Psalm 23",
    seriesPart: 1,
    summary: "Dr. Scott Pauley walks through Psalm 23:1 exploring the sufficiency of Christ for every season of soul thirst.",
    duration: "15:30",
    mediaType: "video",
    format: "video",
    source: "community",
    featured: false,
    youtubeId: "kJQP7kiw5Fk",
    mediaUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80",
    publishedAt: new Date(Date.now() - 36e5 * 36).toISOString(),
    topics: [{ name: "Psalm 23", slug: "psalm-23" }]
  },
  {
    id: "yt-pauley-2",
    title: "He Leads Me Beside Still Waters (Part 2)",
    speaker: "Scott Pauley",
    speakerSlug: "etj",
    speakerTitle: "Enjoying The Journey",
    channel: "Scott Pauley",
    series: "Enjoying The Journey - Psalm 23",
    seriesPart: 2,
    summary: "Finding divine quietness, peace that passes all understanding, and restoration for the weary believer.",
    duration: "16:45",
    mediaType: "video",
    format: "video",
    source: "community",
    featured: false,
    youtubeId: "L_LUpnjgPso",
    mediaUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop&q=80",
    publishedAt: new Date(Date.now() - 36e5 * 84).toISOString(),
    topics: [{ name: "Psalm 23", slug: "psalm-23" }]
  },
  {
    id: "yt-ru-1",
    title: "From Bondage to Freedom: The Principle of Strongholds",
    speaker: "RU Recovery Ministries",
    speakerSlug: "rurecoveryprogram",
    speakerTitle: "Faith-Based Addiction Recovery",
    channel: "RU Recovery Ministries",
    series: "Path to Freedom Expositions",
    seriesPart: 1,
    summary: "Biblical truth and victorious discipleship overcoming alcohol, drug, and behavioral bondage through Jesus Christ.",
    duration: "34:10",
    mediaType: "video",
    format: "video",
    source: "community",
    featured: false,
    youtubeId: "fJ9rUzIMcZQ",
    mediaUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop&q=80",
    publishedAt: new Date(Date.now() - 36e5 * 120).toISOString(),
    topics: [{ name: "Recovery", slug: "recovery" }]
  }
];
function parseXml(xml, ch) {
  const list = [];
  const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) || [];
  for (const entry of entries) {
    const vidMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>(.*?)<\/title>/);
    const pubMatch = entry.match(/<published>(.*?)<\/published>/);
    const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);
    if (!vidMatch || !titleMatch) continue;
    const youtubeId = vidMatch[1].trim();
    const title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim();
    const publishedAt = pubMatch ? pubMatch[1].trim() : (/* @__PURE__ */ new Date()).toISOString();
    const summary = descMatch ? descMatch[1].slice(0, 200).trim() + "..." : "";
    let series;
    let seriesPart;
    const partMatch = title.match(/part\s*(\d+)/i) || title.match(/pt\.?\s*(\d+)/i) || title.match(/#(\d+)/);
    if (partMatch) {
      seriesPart = parseInt(partMatch[1], 10);
    }
    if (title.toLowerCase().includes("kingdom") || ch.name.includes("Tony Evans")) {
      series = "Kingdom Authority & Spiritual Warfare";
    } else if (title.toLowerCase().includes("journey") || ch.name.includes("Scott Pauley")) {
      series = "Enjoying The Journey - Psalms";
    } else if (ch.name.includes("Lighthouse")) {
      series = "Sunday Sanctuary Expositions";
    } else if (ch.name.includes("Elevation") || ch.name.includes("Furtick")) {
      series = "Faith & Breakthrough";
    } else if (ch.name.includes("Reformers") || ch.name.includes("RU Recovery")) {
      series = "Path to Freedom Expositions";
    } else if (title.includes(" | ") || title.includes(" - ")) {
      const parts = title.split(/[|\-]/);
      if (parts.length > 1 && parts[0].trim().length > 3 && parts[0].trim().length < 35) {
        series = parts[0].trim();
      }
    }
    list.push({
      id: `yt-${youtubeId}`,
      title,
      speaker: ch.speaker,
      speakerSlug: ch.handle.replace("@", "").toLowerCase(),
      speakerTitle: ch.speakerTitle,
      channel: ch.name,
      series,
      seriesPart,
      summary: summary || `Broadcast from ${ch.name}`,
      mediaType: "video",
      format: "video",
      source: "community",
      featured: !!ch.featured,
      youtubeId,
      mediaUrl: "",
      thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
      publishedAt,
      topics: [{ name: "Sermon", slug: "sermon" }]
    });
  }
  return list;
}
async function getLiveMinistryFeed() {
  const now = Date.now();
  if (cachedFeed.length > 0 && now - lastFetch < TTL) {
    return cachedFeed;
  }
  try {
    const promises = MONITORED_CHANNELS.map(async (ch) => {
      try {
        const xml = await fetchXml(`https://www.youtube.com/feeds/videos.xml?channel_id=${ch.channelId}`);
        return parseXml(xml, ch);
      } catch {
        return [];
      }
    });
    const results = await Promise.all(promises);
    const parsedAll = results.flat();
    const combinedMap = /* @__PURE__ */ new Map();
    for (const item of CURATED_MINISTRY_FALLBACK) {
      combinedMap.set(item.id, item);
    }
    for (const item of parsedAll) {
      combinedMap.set(item.id, item);
    }
    const combined = Array.from(combinedMap.values());
    combined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (combined.length > 0) {
      cachedFeed = combined;
      lastFetch = now;
    }
    return cachedFeed.length > 0 ? cachedFeed : CURATED_MINISTRY_FALLBACK;
  } catch (err) {
    console.warn("Using curated fallback sermons feed:", err);
    return CURATED_MINISTRY_FALLBACK;
  }
}

// server.ts
var import_web_push = __toESM(require("web-push"), 1);
var import_express4 = __toESM(require("express"), 1);
var import_path7 = __toESM(require("path"), 1);

// server/db.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var SEED_USERS = [
  {
    id: "user_tex",
    name: "Tex",
    handle: "tex",
    email: "lightsouttattootex@gmail.com",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=lightsouttattootex@gmail.com",
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    bio: "Lights Out Tattoo \u2726 Real-time Social & Calling \u2728",
    status: "online",
    statusMessage: "Online & Active",
    followersCount: 3,
    followingCount: 3,
    isVerified: true,
    joinedAt: "2026-08-01",
    authProvider: "google"
  },
  {
    id: "user_kimberly",
    name: "Kimberly Coffman",
    handle: "kimberly",
    email: "savdbygrace360@gmail.com",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=savdbygrace360@gmail.com",
    bannerUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80",
    bio: "Walking in Faith \u2728",
    status: "online",
    statusMessage: "Active",
    followersCount: 3,
    followingCount: 3,
    isVerified: true,
    joinedAt: "2026-08-01",
    authProvider: "email"
  },
  {
    id: "user_skylor",
    name: "Skylor Bright",
    handle: "skylor",
    email: "skylorbright07@gmail.com",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=skylorbright07@gmail.com",
    bannerUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    bio: "Connected on Aura",
    status: "online",
    statusMessage: "Active",
    followersCount: 3,
    followingCount: 3,
    isVerified: true,
    joinedAt: "2026-08-01",
    authProvider: "email"
  },
  {
    id: "user_daphne",
    name: "Daphne Coffman",
    handle: "babyred",
    email: "tex@lightsouttattoo.site",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=tex@lightsouttattoo.site",
    bannerUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80",
    bio: "Exploring Scripture \u{1F4D6}",
    status: "online",
    statusMessage: "Active",
    followersCount: 3,
    followingCount: 3,
    isVerified: true,
    joinedAt: "2026-08-01",
    authProvider: "email"
  }
];
var SEED_POSTS = [];
var SEED_STORIES = [];
var SEED_CONVERSATIONS = [];
var SEED_MESSAGES = {};
var JSONDatabase = class _JSONDatabase {
  constructor() {
    this.saveTimeout = null;
    // In-memory LMS stores (lightweight, no need to persist to main db.json)
    this.courses = /* @__PURE__ */ new Map();
    this.lessons = /* @__PURE__ */ new Map();
    this.userProgress = /* @__PURE__ */ new Map();
    // key: userId_courseId
    this.verseCache = /* @__PURE__ */ new Map();
    // --- Calls & WebRTC Signaling Operations ---
    this.activeCalls = /* @__PURE__ */ new Map();
    this.callSignals = [];
    const dataDir = import_path.default.join(process.cwd(), "data");
    if (!import_fs.default.existsSync(dataDir)) {
      try {
        import_fs.default.mkdirSync(dataDir, { recursive: true });
      } catch (err) {
        console.error("Failed to create data directory:", err);
      }
    }
    this.dbPath = import_path.default.join(dataDir, "db.json");
    this.data = this.loadData();
  }
  loadData() {
    const dummyIds = /* @__PURE__ */ new Set(["user_alex", "user_maya", "user_liam", "user_elena"]);
    const dummyHandles = /* @__PURE__ */ new Set(["alexrivera", "mayachen", "liamvance", "elenarostova"]);
    const dummyEmailDomains = ["@aura.social"];
    const dummyEmails = /* @__PURE__ */ new Set(["alex.rivera@gmail.com", "pistolpete@cmail.com"]);
    const isDummyUser = (u) => {
      if (!u) return true;
      if (dummyIds.has(u.id)) return true;
      if (dummyHandles.has(u.handle)) return true;
      if (u.email && (dummyEmails.has(u.email.toLowerCase()) || dummyEmailDomains.some((d) => u.email.toLowerCase().endsWith(d)))) return true;
      return false;
    };
    try {
      if (import_fs.default.existsSync(this.dbPath)) {
        const raw = import_fs.default.readFileSync(this.dbPath, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.users)) {
          const cleanUsers = parsed.users.filter((u) => !isDummyUser(u));
          SEED_USERS.forEach((seedUser) => {
            const idx = cleanUsers.findIndex((u) => u.id === seedUser.id || u.email.toLowerCase() === seedUser.email.toLowerCase());
            if (idx === -1) {
              cleanUsers.push({ ...seedUser, status: "online" });
            } else {
              cleanUsers[idx].status = "online";
            }
          });
          const cleanPosts = (parsed.posts || []).filter((p) => !dummyIds.has(p.authorId) && !["post_1", "post_2", "post_3"].includes(p.id));
          const cleanStories = (parsed.stories || []).filter((s) => !dummyIds.has(s.userId) && !["story_1", "story_2", "story_3"].includes(s.id));
          const cleanConversations = (parsed.conversations || []).filter((c) => {
            if (["conv_alex_maya", "conv_alex_liam", "conv_design_circle"].includes(c.id)) return false;
            if (Array.isArray(c.participantIds) && c.participantIds.some((pid) => dummyIds.has(pid))) return false;
            return true;
          });
          const cleanMessages = {};
          if (parsed.messages && typeof parsed.messages === "object") {
            for (const [convId, msgs] of Object.entries(parsed.messages)) {
              if (["conv_alex_maya", "conv_alex_liam", "conv_design_circle"].includes(convId)) continue;
              if (Array.isArray(msgs)) {
                cleanMessages[convId] = msgs.filter((m) => !dummyIds.has(m.senderId));
              }
            }
          }
          const sanitized = {
            users: cleanUsers,
            posts: cleanPosts,
            stories: cleanStories,
            conversations: cleanConversations,
            messages: cleanMessages,
            system: parsed.system || {
              version: "2.0.0",
              lastBackup: Date.now(),
              createdAt: Date.now()
            }
          };
          this.saveDataDirect(sanitized);
          return sanitized;
        }
      }
    } catch (e) {
      console.warn("Error reading database file, initializing with seed data:", e);
    }
    const initial = {
      users: SEED_USERS,
      posts: SEED_POSTS,
      stories: SEED_STORIES,
      conversations: SEED_CONVERSATIONS,
      messages: SEED_MESSAGES,
      system: {
        version: "2.0.0",
        lastBackup: Date.now(),
        createdAt: Date.now()
      }
    };
    if (import_fs.default.existsSync(this.dbPath) && import_fs.default.statSync(this.dbPath).size > 100) {
      console.error("FATAL: Refusing to overwrite existing database with blank seed data.");
      return this.data || initial;
    }
    this.saveDataDirect(initial);
    return initial;
  }
  saveDataDirect(dataToSave) {
    try {
      const tempPath = `${this.dbPath}.tmp`;
      import_fs.default.writeFileSync(tempPath, JSON.stringify(dataToSave, null, 2), "utf-8");
      import_fs.default.renameSync(tempPath, this.dbPath);
    } catch (err) {
      console.error("Failed to write database file:", err);
    }
  }
  scheduleSave() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.saveDataDirect(this.data);
    }, 100);
  }
  // --- Users Operations ---
  getUsers() {
    return this.data.users;
  }
  getUserById(id) {
    return this.data.users.find((u) => u.id === id);
  }
  getUserByEmail(email) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }
  getUserByHandle(handle) {
    const clean = handle.replace("@", "").toLowerCase();
    return this.data.users.find((u) => u.handle.toLowerCase() === clean);
  }
  createUser(user) {
    const existing = this.getUserByEmail(user.email);
    if (existing) {
      return existing;
    }
    const cleanHandle = (user.handle || user.name.toLowerCase().replace(/\s+/g, "")).replace("@", "");
    const newUser = {
      id: user.id || `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: user.name,
      email: user.email,
      handle: cleanHandle,
      avatarUrl: user.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanHandle}`,
      bannerUrl: user.bannerUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      bio: user.bio || "Explorer on Aura \u2728 Connected to real-time WebRTC social network.",
      status: user.status || "online",
      statusMessage: user.statusMessage || "Active on Aura",
      followersCount: user.followersCount || 0,
      followingCount: user.followingCount || 4,
      isVerified: user.isVerified ?? false,
      joinedAt: user.joinedAt || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      googleId: user.googleId,
      passwordHash: user.passwordHash,
      authProvider: user.authProvider || (user.googleId ? "google" : "email")
    };
    this.data.users.unshift(newUser);
    this.scheduleSave();
    return newUser;
  }
  updateUser(id, updates) {
    const index = this.data.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    const updated = { ...this.data.users[index], ...updates };
    this.data.users[index] = updated;
    this.data.conversations.forEach((conv) => {
      if (Array.isArray(conv.participants)) {
        if (Array.isArray(conv.participants)) {
          conv.participants = conv.participants.map((p) => p.id === id ? updated : p);
        }
      }
    });
    this.scheduleSave();
    return updated;
  }
  toggleFollowUser(currentUserId, targetUserId) {
    if (currentUserId === targetUserId) return null;
    const currentUser = this.getUserById(currentUserId);
    const targetUser = this.getUserById(targetUserId);
    if (!currentUser || !targetUser) return null;
    if (!currentUser.followingUserIds) currentUser.followingUserIds = [];
    const isFollowing = currentUser.followingUserIds.includes(targetUserId);
    if (isFollowing) {
      currentUser.followingUserIds = currentUser.followingUserIds.filter((id) => id !== targetUserId);
      currentUser.followingCount = Math.max(0, (currentUser.followingCount || 1) - 1);
      targetUser.followersCount = Math.max(0, (targetUser.followersCount || 1) - 1);
    } else {
      currentUser.followingUserIds.push(targetUserId);
      currentUser.followingCount = (currentUser.followingCount || 0) + 1;
      targetUser.followersCount = (targetUser.followersCount || 0) + 1;
    }
    this.scheduleSave();
    return {
      isFollowing: !isFollowing,
      targetFollowersCount: targetUser.followersCount,
      currentFollowingCount: currentUser.followingCount
    };
  }
  // --- Posts Operations ---
  getPosts() {
    return this.data.posts;
  }
  getPostById(id) {
    return this.data.posts.find((p) => p.id === id);
  }
  createPost(post) {
    const author = this.getUserById(post.authorId);
    const newPost = {
      id: post.id || `post_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      authorId: post.authorId,
      authorName: author?.name || post.authorName,
      authorHandle: author?.handle || post.authorHandle,
      authorAvatar: author?.avatarUrl || post.authorAvatar,
      content: post.content,
      mediaUrls: post.mediaUrls || [],
      tags: post.tags || [],
      location: post.location,
      likesCount: 0,
      likedByUserIds: [],
      commentsCount: 0,
      comments: [],
      sharesCount: 0,
      savedByUserIds: [],
      createdAt: Date.now()
    };
    this.data.posts.unshift(newPost);
    this.scheduleSave();
    return newPost;
  }
  syncClientPosts(clientPosts) {
    if (!Array.isArray(clientPosts)) return { added: 0, total: this.data.posts.length, addedPosts: [] };
    let added = 0;
    const addedPosts = [];
    const existingIds = new Set(this.data.posts.map((p) => p.id));
    const existingContents = new Set(this.data.posts.map((p) => (p.content || "").trim().toLowerCase()));
    for (const cp of clientPosts) {
      if (!cp) continue;
      const content = (cp.content || "").trim();
      const mediaUrls = Array.isArray(cp.mediaUrls) ? cp.mediaUrls : [];
      if (!content && mediaUrls.length === 0) continue;
      if (cp.id && existingIds.has(cp.id)) continue;
      if (content && existingContents.has(content.toLowerCase())) continue;
      const newPost = {
        id: cp.id || `post_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        authorId: cp.authorId || "user_tex",
        authorName: cp.authorName || "Tex",
        authorHandle: cp.authorHandle || "texxx360",
        authorAvatar: cp.authorAvatar || "https://api.dicebear.com/7.x/bottts/svg?seed=lightsouttattootex@gmail.com",
        content,
        mediaUrls,
        tags: Array.isArray(cp.tags) ? cp.tags : [],
        location: cp.location || "",
        likesCount: typeof cp.likesCount === "number" ? cp.likesCount : 0,
        likedByUserIds: Array.isArray(cp.likedByUserIds) ? cp.likedByUserIds : [],
        commentsCount: Array.isArray(cp.comments) ? cp.comments.length : cp.commentsCount || 0,
        comments: Array.isArray(cp.comments) ? cp.comments : [],
        sharesCount: typeof cp.sharesCount === "number" ? cp.sharesCount : 0,
        savedByUserIds: Array.isArray(cp.savedByUserIds) ? cp.savedByUserIds : [],
        createdAt: typeof cp.createdAt === "number" ? cp.createdAt : Date.parse(cp.createdAt || cp.timestamp) || Date.now()
      };
      this.data.posts.unshift(newPost);
      existingIds.add(newPost.id);
      if (content) existingContents.add(content.toLowerCase());
      addedPosts.push(newPost);
      added++;
    }
    if (added > 0) {
      this.scheduleSave();
    }
    return { added, total: this.data.posts.length, addedPosts };
  }
  deletePost(id) {
    if (!id || typeof id !== "string" || id.trim() === "" || id === "undefined" || id === "null") {
      console.warn("[SECURITY] Aborted invalid post deletion with empty/malformed ID:", id);
      return false;
    }
    const initialLen = this.data.posts.length;
    const targetPost = this.data.posts.find((p) => p.id === id);
    if (!targetPost) {
      console.warn("[WARN] Post not found for deletion:", id);
      return false;
    }
    const filtered = this.data.posts.filter((p) => p.id !== id);
    const diff = initialLen - filtered.length;
    if (diff < 1) {
      console.error(`[CRITICAL] Deletion bounds check failed! Expected diff >= 1, got ${diff}. Aborting to protect database.`);
      return false;
    }
    try {
      const snapPath = `${this.dbPath}.bak.pre_delete_${Date.now()}`;
      import_fs.default.copyFileSync(this.dbPath, snapPath);
    } catch (e) {
      console.warn("Could not write pre-deletion snapshot:", e);
    }
    this.data.posts = filtered;
    this.scheduleSave();
    console.log(`[AUDIT] Successfully deleted single post ${id}. Remaining posts: ${filtered.length}`);
    return true;
  }
  updatePost(id, updates) {
    const post = this.getPostById(id);
    if (!post) return null;
    if (updates.content !== void 0) post.content = updates.content;
    if (updates.mediaUrls !== void 0) post.mediaUrls = updates.mediaUrls;
    if (updates.tags !== void 0) post.tags = updates.tags;
    if (updates.location !== void 0) post.location = updates.location;
    this.scheduleSave();
    return post;
  }
  toggleLikePost(postId, userId) {
    const post = this.getPostById(postId);
    if (!post) return null;
    const liked = post.likedByUserIds.includes(userId);
    if (liked) {
      post.likedByUserIds = post.likedByUserIds.filter((id) => id !== userId);
      post.likesCount = Math.max(0, post.likesCount - 1);
    } else {
      post.likedByUserIds.push(userId);
      post.likesCount += 1;
    }
    this.scheduleSave();
    return { likesCount: post.likesCount, likedByUserIds: post.likedByUserIds };
  }
  addComment(postId, authorId, content) {
    const post = this.getPostById(postId);
    const author = this.getUserById(authorId);
    if (!post || !author) return null;
    const comment = {
      id: `c_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      postId,
      authorId,
      authorName: author.name,
      authorAvatar: author.avatarUrl,
      content,
      createdAt: Date.now(),
      likesCount: 0,
      likedByUserIds: []
    };
    if (!post.comments) post.comments = [];
    post.comments.push(comment);
    post.commentsCount = post.comments.length;
    this.scheduleSave();
    return comment;
  }
  toggleBookmarkPost(postId, userId) {
    const post = this.getPostById(postId);
    if (!post) return null;
    if (!post.savedByUserIds) post.savedByUserIds = [];
    const isSaved = post.savedByUserIds.includes(userId);
    if (isSaved) {
      post.savedByUserIds = post.savedByUserIds.filter((id) => id !== userId);
    } else {
      post.savedByUserIds.push(userId);
    }
    this.scheduleSave();
    return { savedByUserIds: post.savedByUserIds };
  }
  // --- Stories Operations ---
  getStories() {
    const cutoff = Date.now() - 24 * 60 * 60 * 1e3;
    const active = this.data.stories.filter(
      (s) => s.createdAt > cutoff || s.slides && s.slides.some((sl) => sl.createdAt > cutoff)
    );
    const userStoryMap = /* @__PURE__ */ new Map();
    for (const story of active) {
      const existing = userStoryMap.get(story.userId);
      let currentStorySlides = [];
      if (story.slides && story.slides.length > 0) {
        currentStorySlides = [...story.slides];
      } else if (story.mediaUrl) {
        currentStorySlides = [
          {
            id: `slide_${story.id}`,
            mediaUrl: story.mediaUrl,
            caption: story.caption,
            createdAt: story.createdAt
          }
        ];
      }
      if (!existing) {
        userStoryMap.set(story.userId, {
          ...story,
          slides: currentStorySlides
        });
      } else {
        if (!existing.slides) existing.slides = [];
        const existingSlideIds = new Set(existing.slides.map((s) => s.id));
        const existingSlideUrls = new Set(existing.slides.map((s) => s.mediaUrl));
        for (const slide of currentStorySlides) {
          if (!existingSlideIds.has(slide.id) && !existingSlideUrls.has(slide.mediaUrl)) {
            existingSlideIds.add(slide.id);
            existingSlideUrls.add(slide.mediaUrl);
            existing.slides.push(slide);
          }
        }
        existing.slides.sort((a, b) => a.createdAt - b.createdAt);
        if (story.createdAt >= existing.createdAt) {
          existing.mediaUrl = story.mediaUrl;
          existing.caption = story.caption;
          existing.createdAt = story.createdAt;
        }
        if (story.seenByUserIds && story.seenByUserIds.length > 0) {
          if (!existing.seenByUserIds) existing.seenByUserIds = [];
          const combinedSeen = Array.from(/* @__PURE__ */ new Set([...existing.seenByUserIds, ...story.seenByUserIds]));
          existing.seenByUserIds = combinedSeen;
        }
      }
    }
    const consolidatedStories = Array.from(userStoryMap.values());
    return consolidatedStories;
  }
  createStory(userId, mediaUrl, caption) {
    const author = this.getUserById(userId);
    if (!author) return null;
    const cutoff = Date.now() - 24 * 60 * 60 * 1e3;
    const now = Date.now();
    const newSlideId = `slide_${now}_${Math.random().toString(36).substr(2, 4)}`;
    const newSlide = {
      id: newSlideId,
      mediaUrl,
      caption,
      createdAt: now
    };
    const existingStoryIndex = this.data.stories.findIndex(
      (s) => s.userId === userId && (s.createdAt > cutoff || s.slides && s.slides.some((sl) => sl.createdAt > cutoff))
    );
    if (existingStoryIndex !== -1) {
      const existingStory = this.data.stories[existingStoryIndex];
      if (!existingStory.slides || existingStory.slides.length === 0) {
        existingStory.slides = [
          {
            id: `slide_${existingStory.id}`,
            mediaUrl: existingStory.mediaUrl,
            caption: existingStory.caption,
            createdAt: existingStory.createdAt
          }
        ];
      }
      existingStory.slides.push(newSlide);
      existingStory.mediaUrl = mediaUrl;
      existingStory.caption = caption;
      existingStory.createdAt = now;
      existingStory.seenByUserIds = [userId];
      this.scheduleSave();
      return existingStory;
    } else {
      const newStory = {
        id: `story_${now}_${Math.random().toString(36).substr(2, 4)}`,
        userId,
        userName: author.name,
        userAvatar: author.avatarUrl,
        mediaUrl,
        caption,
        createdAt: now,
        seenByUserIds: [userId],
        slides: [newSlide]
      };
      this.data.stories.unshift(newStory);
      this.scheduleSave();
      return newStory;
    }
  }
  deleteStorySlide(storyId, slideId, userId) {
    const story = this.data.stories.find((s) => s.id === storyId && s.userId === userId);
    if (!story) return null;
    if (story.slides && story.slides.length > 1) {
      story.slides = story.slides.filter((sl) => sl.id !== slideId);
      const lastSlide = story.slides[story.slides.length - 1];
      story.mediaUrl = lastSlide.mediaUrl;
      story.caption = lastSlide.caption;
      this.scheduleSave();
      return story;
    } else {
      this.data.stories = this.data.stories.filter((s) => s.id !== storyId);
      this.scheduleSave();
      return null;
    }
  }
  deleteStory(storyId, userId) {
    const initialLen = this.data.stories.length;
    this.data.stories = this.data.stories.filter((s) => !(s.id === storyId && s.userId === userId));
    if (this.data.stories.length !== initialLen) {
      this.scheduleSave();
      return true;
    }
    return false;
  }
  markStorySeen(storyId, userId) {
    const story = this.data.stories.find((s) => s.id === storyId);
    if (!story) return false;
    if (!story.seenByUserIds.includes(userId)) {
      story.seenByUserIds.push(userId);
      this.scheduleSave();
    }
    return true;
  }
  // --- Conversations & Messages ---
  getConversations(userId) {
    if (!userId) return this.data.conversations;
    return this.data.conversations.filter((c) => Array.isArray(c.participantIds) && (Array.isArray(c.participantIds) && (Array.isArray(c.participantIds) && (Array.isArray(c?.participantIds) && c.participantIds.includes(userId)))));
  }
  getConversationById(id) {
    return this.data.conversations.find((c) => c.id === id);
  }
  createConversation(creatorId, participantIds, isGroup = false, name) {
    const allIds = Array.from(/* @__PURE__ */ new Set([creatorId, ...participantIds]));
    if (!isGroup && allIds.length === 2) {
      const existing = this.data.conversations.find(
        (c) => !c.isGroup && c.participantIds.length === 2 && c.participantIds.includes(allIds[0]) && c.participantIds.includes(allIds[1])
      );
      if (existing) return existing;
    }
    const participants = allIds.map((id) => this.getUserById(id)).filter(Boolean);
    const conv = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      isGroup,
      name: isGroup ? name || "Group Conversation" : void 0,
      avatar: isGroup ? "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80" : void 0,
      participantIds: allIds,
      participants,
      unreadCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    this.data.conversations.unshift(conv);
    if (!this.data.messages[conv.id]) {
      this.data.messages[conv.id] = [];
    }
    this.scheduleSave();
    return conv;
  }
  getMessages(conversationId) {
    return this.data.messages[conversationId] || [];
  }
  sendMessage(msg) {
    const sender = this.getUserById(msg.senderId);
    const newMsg = {
      id: msg.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      conversationId: msg.conversationId,
      senderId: msg.senderId,
      senderName: sender?.name || msg.senderName,
      senderAvatar: sender?.avatarUrl || msg.senderAvatar,
      content: msg.content,
      mediaUrl: msg.mediaUrl,
      mediaType: msg.mediaType || "none",
      audioDuration: msg.audioDuration,
      replyTo: msg.replyTo,
      storyReply: msg.storyReply,
      callLog: msg.callLog,
      reactions: {},
      timestamp: Date.now(),
      isRead: false,
      isDelivered: true
    };
    if (!this.data.messages[msg.conversationId]) {
      this.data.messages[msg.conversationId] = [];
    }
    this.data.messages[msg.conversationId].push(newMsg);
    const conv = this.getConversationById(msg.conversationId);
    if (conv) {
      conv.lastMessage = newMsg;
      conv.updatedAt = Date.now();
      this.data.conversations.sort((a, b) => b.updatedAt - a.updatedAt);
    }
    this.scheduleSave();
    return newMsg;
  }
  addMessageReaction(conversationId, messageId, emoji, userId) {
    const list = this.data.messages[conversationId];
    if (!list) return null;
    const msg = list.find((m) => m.id === messageId);
    if (!msg) return null;
    if (!msg.reactions) msg.reactions = {};
    if (!msg.reactions[emoji]) msg.reactions[emoji] = [];
    const index = msg.reactions[emoji].indexOf(userId);
    if (index > -1) {
      msg.reactions[emoji].splice(index, 1);
      if (msg.reactions[emoji].length === 0) {
        delete msg.reactions[emoji];
      }
    } else {
      msg.reactions[emoji].push(userId);
    }
    this.scheduleSave();
    return msg.reactions;
  }
  createOrUpdateCallSession(sessionData) {
    const caller = this.getUserById(sessionData.callerId);
    const receiver = this.getUserById(sessionData.receiverId);
    const existing = this.activeCalls.get(sessionData.roomId);
    const session = {
      id: existing?.id || sessionData.id || `call_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      callerId: sessionData.callerId,
      callerName: caller?.name || sessionData.callerName || "Caller",
      callerAvatar: caller?.avatarUrl || sessionData.callerAvatar || "",
      receiverId: sessionData.receiverId,
      receiverName: receiver?.name || sessionData.receiverName || "Receiver",
      receiverAvatar: receiver?.avatarUrl || sessionData.receiverAvatar || "",
      isVideo: sessionData.isVideo !== void 0 ? sessionData.isVideo : true,
      status: sessionData.status || existing?.status || "calling",
      roomId: sessionData.roomId,
      startedAt: sessionData.startedAt || existing?.startedAt,
      endedAt: sessionData.endedAt || existing?.endedAt,
      createdAt: existing?.createdAt || Date.now(),
      updatedAt: Date.now()
    };
    this.activeCalls.set(sessionData.roomId, session);
    return session;
  }
  getCallSessionByRoomId(roomId) {
    return this.activeCalls.get(roomId);
  }
  getPendingCallsForUser(userId) {
    const now = Date.now();
    const result = [];
    for (const [roomId, session] of this.activeCalls.entries()) {
      if (session.receiverId === userId && session.status === "calling" && now - session.createdAt < 45e3) {
        result.push(session);
      }
    }
    return result;
  }
  updateCallStatus(roomId, status) {
    const session = this.activeCalls.get(roomId);
    if (!session) return null;
    session.status = status;
    session.updatedAt = Date.now();
    if (status === "connected" && !session.startedAt) {
      session.startedAt = Date.now();
    }
    if (status === "ended" || status === "declined") {
      session.endedAt = Date.now();
    }
    this.activeCalls.set(roomId, session);
    return session;
  }
  addCallSignal(roomId, senderId, type, data) {
    const signal = {
      id: `sig_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      roomId,
      senderId,
      type,
      data,
      timestamp: Date.now()
    };
    this.callSignals.push(signal);
    if (this.callSignals.length > 200) {
      this.callSignals.splice(0, this.callSignals.length - 200);
    }
    return signal;
  }
  getCallSignals(roomId, excludeSenderId, sinceTimestamp = 0) {
    return this.callSignals.filter(
      (s) => s.roomId === roomId && (!excludeSenderId || s.senderId !== excludeSenderId) && s.timestamp > sinceTimestamp
    );
  }
  // ── LMS: Courses ────────────────────────────────────────────────────────
  createCourse(data) {
    const course = {
      id: `course_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      ...data,
      lessonIds: [],
      createdAt: Date.now()
    };
    this.courses.set(course.id, course);
    return course;
  }
  getCourseById(id) {
    return this.courses.get(id);
  }
  getAllCourses() {
    return Array.from(this.courses.values());
  }
  getCoursesByTrack(track) {
    return Array.from(this.courses.values()).filter((c) => c.track === track);
  }
  // ── LMS: Lessons ────────────────────────────────────────────────────────
  createLesson(data) {
    const lesson = {
      id: `lesson_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      ...data,
      createdAt: Date.now()
    };
    this.lessons.set(lesson.id, lesson);
    const course = this.courses.get(lesson.courseId);
    if (course && !course.lessonIds.includes(lesson.id)) {
      course.lessonIds.push(lesson.id);
      course.lessonIds.sort((a, b) => {
        const la = this.lessons.get(a)?.order ?? 0;
        const lb = this.lessons.get(b)?.order ?? 0;
        return la - lb;
      });
    }
    return lesson;
  }
  getLessonById(id) {
    return this.lessons.get(id);
  }
  getLessonsByCourse(courseId) {
    return Array.from(this.lessons.values()).filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order);
  }
  // ── LMS: UserProgress ───────────────────────────────────────────────────
  progressKey(userId, courseId) {
    return `${userId}::${courseId}`;
  }
  getOrCreateProgress(userId, courseId) {
    const key = this.progressKey(userId, courseId);
    const existing = this.userProgress.get(key);
    if (existing) return existing;
    const course = this.courses.get(courseId);
    const firstLessonId = course?.lessonIds[0] ?? null;
    const progress = {
      id: `prog_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId,
      courseId,
      completedLessonIds: [],
      currentLessonId: firstLessonId,
      notes: "",
      startedAt: Date.now(),
      lastActivityAt: Date.now()
    };
    this.userProgress.set(key, progress);
    return progress;
  }
  getProgressForUser(userId) {
    return Array.from(this.userProgress.values()).filter((p) => p.userId === userId);
  }
  completeLesson(userId, courseId, lessonId) {
    const key = this.progressKey(userId, courseId);
    const progress = this.userProgress.get(key);
    if (!progress) return null;
    if (!progress.completedLessonIds.includes(lessonId)) {
      progress.completedLessonIds.push(lessonId);
    }
    const course = this.courses.get(courseId);
    if (course) {
      const next = course.lessonIds.find((id) => !progress.completedLessonIds.includes(id));
      progress.currentLessonId = next ?? null;
    }
    progress.lastActivityAt = Date.now();
    return progress;
  }
  updateNotes(userId, courseId, notes) {
    const key = this.progressKey(userId, courseId);
    const progress = this.userProgress.get(key);
    if (!progress) return null;
    progress.notes = notes;
    progress.lastActivityAt = Date.now();
    return progress;
  }
  // ── LMS: VerseCommentaryCache ────────────────────────────────────────────
  /** Normalise a scripture ref to a stable cache key, e.g. "John 3:16" → "john_3_16" */
  static cacheKey(scriptureRef) {
    return scriptureRef.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  }
  getCachedCommentary(scriptureRef) {
    return this.verseCache.get(_JSONDatabase.cacheKey(scriptureRef));
  }
  setCachedCommentary(scriptureRef, commentary) {
    const entry = {
      id: _JSONDatabase.cacheKey(scriptureRef),
      scriptureRef,
      commentary,
      cachedAt: Date.now()
    };
    this.verseCache.set(entry.id, entry);
    return entry;
  }
  getAllCachedCommentaries() {
    return Array.from(this.verseCache.values());
  }
  // ── System Operations ────────────────────────────────────────────────────
  getSystemStats() {
    return {
      usersCount: this.data.users.length,
      postsCount: this.data.posts.length,
      storiesCount: this.data.stories.length,
      conversationsCount: this.data.conversations.length,
      messagesCount: Object.values(this.data.messages).reduce((acc, list) => acc + list.length, 0),
      dbPath: this.dbPath,
      uptimeSeconds: process.uptime(),
      version: this.data.system.version
    };
  }
  exportFullDatabase() {
    return this.data;
  }
};
var db = new JSONDatabase();

// routes/bible.ts
var import_express = require("express");

// server/bible/kjv_loader.ts
var import_fs2 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var KJVLoader = class {
  constructor() {
    this.bible = null;
    this.books = [];
    const serverKjvPath = import_path2.default.join(process.cwd(), "server", "bible", "kjv.json");
    if (import_fs2.default.existsSync(serverKjvPath)) {
      this.bibleFilePath = serverKjvPath;
    } else {
      const dataKjvPath = import_path2.default.join(process.cwd(), "data", "bible", "kjv.json");
      this.bibleFilePath = import_fs2.default.existsSync(dataKjvPath) ? dataKjvPath : serverKjvPath;
    }
  }
  load() {
    if (import_fs2.default.existsSync(this.bibleFilePath)) {
      try {
        this.bible = JSON.parse(import_fs2.default.readFileSync(this.bibleFilePath, "utf-8"));
      } catch (e) {
        console.warn("Failed to parse kjv.json, re-creating minimal base:", e);
        this.bible = this._createMinimalBible();
      }
    } else {
      this.bible = this._createMinimalBible();
      try {
        import_fs2.default.writeFileSync(this.bibleFilePath, JSON.stringify(this.bible, null, 2));
      } catch (e) {
        console.warn("Failed to write kjv.json:", e);
      }
    }
    this.books = Object.keys(this.bible);
    return this.bible;
  }
  saveCache() {
    try {
      import_fs2.default.writeFileSync(this.bibleFilePath, JSON.stringify(this.bible, null, 2));
    } catch (e) {
      console.warn("Error persisting kjv cache:", e);
    }
  }
  getVerse(reference) {
    const match = reference.match(/^(.+?)\s+(\d+):(\d+)$/);
    if (!match) return null;
    const [, book, chapter, verse] = match;
    const bookData = this.bible?.[book];
    if (!bookData || !bookData[chapter] || !bookData[chapter][verse]) return null;
    return { reference, text: bookData[chapter][verse], book, chapter: parseInt(chapter, 10), verse: parseInt(verse, 10) };
  }
  getChapter(reference) {
    const match = reference.match(/^(.+?)\s+(\d+)$/);
    if (!match) return null;
    const [, book, chapter] = match;
    const bookData = this.bible?.[book];
    if (!bookData || !bookData[chapter]) return null;
    return { reference, verses: bookData[chapter], book, chapter: parseInt(chapter, 10) };
  }
  async getOrFetchChapter(book, chapter) {
    const chNum = parseInt(chapter.toString(), 10) || 1;
    const cleanBook = book.trim();
    const reference = `${cleanBook} ${chNum}`;
    if (!this.bible) {
      this.load();
    }
    if (!this.bible[cleanBook]) {
      this.bible[cleanBook] = {};
    }
    const cachedChapter = this.bible[cleanBook]?.[chNum.toString()];
    if (cachedChapter && typeof cachedChapter === "object") {
      const keys = Object.keys(cachedChapter);
      if (keys.length >= 5 || keys.length > 0 && ["2 John", "3 John", "Philemon", "Jude", "Obadiah"].includes(cleanBook)) {
        const versesList = Object.entries(cachedChapter).map(([vStr, text]) => ({ verse: parseInt(vStr, 10), text: text.replace(/\r?\n|\r/g, " ").replace(/\s+/g, " ").trim() })).sort((a, b) => a.verse - b.verse);
        if (versesList.length > 0) {
          return { reference, book: cleanBook, chapter: chNum, verses: versesList };
        }
      }
    }
    try {
      const queryRef = `${cleanBook} ${chNum}`;
      const url = `https://bible-api.com/${encodeURIComponent(queryRef)}?translation=kjv`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7e3);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.verses) && data.verses.length > 0) {
          const chapterObj = {};
          const versesList = [];
          for (const v of data.verses) {
            const vNum = v.verse;
            const cleanText = (v.text || "").replace(/\r?\n|\r/g, " ").replace(/\s+/g, " ").trim();
            chapterObj[vNum.toString()] = cleanText;
            versesList.push({ verse: vNum, text: cleanText });
          }
          if (!this.bible[cleanBook]) {
            this.bible[cleanBook] = {};
          }
          this.bible[cleanBook][chNum.toString()] = chapterObj;
          this.saveCache();
          return { reference, book: cleanBook, chapter: chNum, verses: versesList };
        }
      }
    } catch (err) {
      console.warn(`Bible API fetch error for ${cleanBook} ${chNum}:`, err);
    }
    const existing = this.bible[cleanBook]?.[chNum.toString()] || {};
    if (Object.keys(existing).length > 0) {
      const versesList = Object.entries(existing).map(([vStr, text]) => ({ verse: parseInt(vStr, 10), text: text.replace(/\r?\n|\r/g, " ").replace(/\s+/g, " ").trim() })).sort((a, b) => a.verse - b.verse);
      return { reference, book: cleanBook, chapter: chNum, verses: versesList };
    }
    const defaultVerses = [
      { verse: 1, text: `The words of the holy scripture according to ${cleanBook}, chapter ${chNum}.` },
      { verse: 2, text: `Thy word is a lamp unto my feet, and a light unto my path.` },
      { verse: 3, text: `Every word of God is pure: he is a shield unto them that put their trust in him.` }
    ];
    return { reference, book: cleanBook, chapter: chNum, verses: defaultVerses };
  }
  async getOrFetchVerse(book, chapter, verse) {
    const chNum = parseInt(chapter.toString(), 10) || 1;
    const vNum = parseInt(verse.toString(), 10) || 1;
    const cleanBook = book.trim();
    const reference = `${cleanBook} ${chNum}:${vNum}`;
    const cached = this.getVerse(reference);
    if (cached) return cached;
    const chapterData = await this.getOrFetchChapter(cleanBook, chNum);
    const found = chapterData.verses.find((v) => v.verse === vNum);
    if (found) {
      return { reference, book: cleanBook, chapter: chNum, verse: vNum, text: found.text };
    }
    return {
      reference,
      book: cleanBook,
      chapter: chNum,
      verse: vNum,
      text: `Verse not found.`
    };
  }
  search(query, maxResults = 25) {
    if (!query || !query.trim()) return [];
    const q = query.trim().toLowerCase();
    const results = [];
    if (!this.bible) this.load();
    for (const [book, chapters] of Object.entries(this.bible)) {
      if (!chapters || typeof chapters !== "object") continue;
      for (const [chapter, verses] of Object.entries(chapters)) {
        if (!verses || typeof verses !== "object") continue;
        for (const [verse, text] of Object.entries(verses)) {
          if (typeof text === "string" && text.toLowerCase().includes(q)) {
            results.push({
              reference: `${book} ${chapter}:${verse}`,
              book,
              chapter: parseInt(chapter, 10),
              verse: parseInt(verse, 10),
              text
            });
            if (results.length >= maxResults) return results;
          }
        }
      }
    }
    return results;
  }
  _createMinimalBible() {
    return {
      "Genesis": {
        "1": { "1": "In the beginning God created the heaven and the earth.", "2": "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.", "3": "And God said, Let there be light: and there was light.", "27": "So God created man in his own image, in the image of God created he him; male and female created he them." },
        "3": { "15": "And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel." },
        "12": { "1": "Now the LORD had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee:", "2": "And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing:" },
        "50": { "20": "But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive." }
      },
      "Exodus": {
        "3": { "14": "And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you." },
        "20": { "1": "And God spake all these words, saying,", "2": "I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage.", "3": "Thou shalt have no other gods before me." }
      },
      "Leviticus": {
        "19": { "18": "Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself: I am the LORD." }
      },
      "Numbers": {
        "6": { "24": "The LORD bless thee, and keep thee:", "25": "The LORD make his face shine upon thee, and be gracious unto thee:", "26": "The LORD lift up his countenance upon thee, and give thee peace." }
      },
      "Deuteronomy": {
        "6": { "4": "Hear, O Israel: The LORD our God is one LORD:", "5": "And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might." }
      },
      "Joshua": {
        "1": { "8": "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.", "9": "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." },
        "24": { "15": "And if it seem evil unto you to serve the LORD, choose you this day whom ye will serve; but as for me and my house, we will serve the LORD." }
      },
      "Psalms": {
        "1": { "1": "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.", "2": "But his delight is in the law of the LORD; and in his law doth he meditate day and night." },
        "23": { "1": "The LORD is my shepherd; I shall not want.", "2": "He maketh me to lie down in green pastures: he leadeth me beside the still waters.", "3": "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.", "4": "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.", "5": "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.", "6": "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." },
        "46": { "1": "God is our refuge and strength, a very present help in trouble.", "10": "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth." },
        "91": { "1": "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.", "2": "I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust." },
        "119": { "105": "Thy word is a lamp unto my feet, and a light unto my path." },
        "139": { "14": "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well." }
      },
      "Proverbs": {
        "3": { "5": "Trust in the LORD with all thine heart; and lean not unto thine own understanding.", "6": "In all thy ways acknowledge him, and he shall direct thy paths." },
        "4": { "23": "Keep thy heart with all diligence; for out of it are the issues of life." },
        "27": { "17": "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend." }
      },
      "Isaiah": {
        "9": { "6": "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace." },
        "40": { "31": "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." },
        "53": { "5": "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.", "6": "All we like sheep have gone astray; we have turned every one to his own way; and the LORD hath laid on him the iniquity of us all." }
      },
      "Jeremiah": {
        "29": { "11": "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", "12": "Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.", "13": "And ye shall seek me, and find me, when ye shall search for me with all your heart." }
      },
      "Matthew": {
        "5": { "3": "Blessed are the poor in spirit: for theirs is the kingdom of heaven.", "14": "Ye are the light of the world. A city that is set on an hill cannot be hid.", "16": "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven." },
        "6": { "9": "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name.", "33": "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." },
        "28": { "19": "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost:", "20": "Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen." }
      },
      "Mark": {
        "10": { "45": "For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many." },
        "16": { "15": "And he said unto them, Go ye into all the world, and preach the gospel to every creature." }
      },
      "Luke": {
        "1": { "37": "For with God nothing shall be impossible." },
        "2": { "10": "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people.", "11": "For unto you is born this day in the city of David a Saviour, which is Christ the Lord." },
        "19": { "10": "For the Son of man is come to seek and to save that which was lost." }
      },
      "John": {
        "1": { "1": "In the beginning was the Word, and the Word was with God, and the Word was God.", "12": "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:", "14": "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth." },
        "3": { "16": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", "17": "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." },
        "10": { "10": "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly." },
        "14": { "1": "Let not your heart be troubled: ye believe in God, believe also in me.", "6": "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.", "27": "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid." }
      },
      "Romans": {
        "3": { "23": "For all have sinned, and come short of the glory of God;" },
        "5": { "8": "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us." },
        "6": { "23": "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord." },
        "8": { "1": "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.", "28": "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", "38": "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,", "39": "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord." },
        "10": { "9": "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.", "10": "For with the heart man believeth unto righteousness; and with the mouth confession is made unto salvation.", "13": "For whosoever shall call upon the name of the Lord shall be saved." },
        "12": { "1": "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.", "2": "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God." }
      },
      "1 Corinthians": {
        "13": { "4": "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,", "13": "And now abideth faith, hope, charity, these three; but the greatest of these is charity." },
        "15": { "3": "For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures;", "4": "And that he was buried, and that he rose again the third day according to the scriptures:" }
      },
      "2 Corinthians": {
        "5": { "17": "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.", "21": "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him." },
        "12": { "9": "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me." }
      },
      "Galatians": {
        "2": { "20": "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me." },
        "5": { "22": "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith,", "23": "Meekness, temperance: against such there is no law." }
      },
      "Ephesians": {
        "2": { "8": "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:", "9": "Not of works, lest any man should boast.", "10": "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them." },
        "6": { "10": "Finally, my brethren, be strong in the Lord, and in the power of his might.", "11": "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil." }
      },
      "Philippians": {
        "4": { "6": "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.", "7": "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.", "13": "I can do all things through Christ which strengtheneth me.", "19": "But my God shall supply all your need according to his riches in glory by Christ Jesus." }
      },
      "Colossians": {
        "3": { "12": "Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering;", "13": "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye." }
      },
      "1 Thessalonians": {
        "5": { "16": "Rejoice evermore.", "17": "Pray without ceasing.", "18": "In every thing give thanks: for this is the will of God in Christ Jesus concerning you." }
      },
      "2 Timothy": {
        "1": { "7": "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
        "3": { "16": "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:" }
      },
      "Hebrews": {
        "4": { "12": "For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.", "16": "Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need." },
        "11": { "1": "Now faith is the substance of things hoped for, the evidence of things not seen.", "6": "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him." },
        "12": { "1": "Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us,", "2": "Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God." }
      },
      "James": {
        "1": { "5": "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.", "22": "But be ye doers of the word, and not hearers only, deceiving your own selves." }
      },
      "1 Peter": {
        "5": { "7": "Casting all your care upon him; for he careth for you." }
      },
      "1 John": {
        "1": { "9": "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." },
        "4": { "7": "Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.", "8": "He that loveth not knoweth not God; for God is love." }
      },
      "Revelation": {
        "1": { "8": "I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty." },
        "3": { "20": "Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me." },
        "21": { "4": "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." },
        "22": { "20": "He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus." }
      }
    };
  }
};
var kjv_loader_default = KJVLoader;

// services/kingJamesService.ts
var import_genai = require("@google/genai");
var kjvLoader = new kjv_loader_default();
kjvLoader.load();
var BOOK_METADATA = {
  // Old Testament - Law
  "Genesis": { author: "Moses", era: "1440-1400 BC", audience: "The Children of Israel in the wilderness", theme: "Beginnings, Creation, Fall, and Covenant Election" },
  "Exodus": { author: "Moses", era: "1440-1400 BC", audience: "Israel during the Exodus journey", theme: "Deliverance, Law at Sinai, and Tabernacle Presence" },
  "Leviticus": { author: "Moses", era: "1440 BC", audience: "The Levitical priesthood and Israel", theme: "Holiness, Sacrificial Atonement, and Purity" },
  "Numbers": { author: "Moses", era: "1400 BC", audience: "The second generation of Israel", theme: "Wilderness Wanderings, Faithfulness, and Discipline" },
  "Deuteronomy": { author: "Moses", era: "1400 BC", audience: "Israel before entering the Promised Land", theme: "Renewal of the Covenant and Call to Obedience" },
  // Old Testament - History
  "Joshua": { author: "Joshua", era: "1380 BC", audience: "The nation of Israel in Canaan", theme: "Conquest, Faithfulness, and Division of the Inheritance" },
  "Judges": { author: "Samuel", era: "1050-1000 BC", audience: "Israel under early monarchy", theme: "Cycles of Apostasy, Deliverance, and Human Inadequacy" },
  "Ruth": { author: "Samuel", era: "1000 BC", audience: "The Kingdom of Israel", theme: "Kinsman-Redeemer, Loyal Love (Hesed), and Davidic Lineage" },
  "1 Samuel": { author: "Samuel, Nathan & Gad", era: "930 BC", audience: "United Kingdom of Israel", theme: "Transition from Theocracy to Monarchy, Saul, and David" },
  "2 Samuel": { author: "Nathan & Gad", era: "930 BC", audience: "United Kingdom of Israel", theme: "The Davidic Reign, Covenant, and Moral Consequences" },
  "1 Kings": { author: "Jeremiah", era: "560-550 BC", audience: "Exiles in Babylon", theme: "Solomon, the Temple, Division of the Kingdom, and Elijah" },
  "2 Kings": { author: "Jeremiah", era: "560-550 BC", audience: "Exiles in Babylon", theme: "Decline, Prophets, and the Babylonian Captivity" },
  "1 Chronicles": { author: "Ezra", era: "450-400 BC", audience: "Post-exilic Jewish community", theme: "Genealogies, Worship, and Davidic Covenant" },
  "2 Chronicles": { author: "Ezra", era: "450-400 BC", audience: "Post-exilic Jewish community", theme: "The Temple, Kings of Judah, Repentance, and Reform" },
  "Ezra": { author: "Ezra", era: "450-400 BC", audience: "Returned exiles rebuilding the Temple", theme: "Restoration, Rebuilding the Temple, and Spiritual Purity" },
  "Nehemiah": { author: "Nehemiah", era: "430-400 BC", audience: "Rebuilders of Jerusalem's walls", theme: "Rebuilding the Walls, Governance, and Covenant Renewal" },
  "Esther": { author: "Mordecai", era: "460-400 BC", audience: "Persian and worldwide Diaspora Jews", theme: "God's Unseen Sovereignty and Preservation of His People" },
  // Old Testament - Poetry & Wisdom
  "Job": { author: "Job / Moses", era: "2000-1800 BC", audience: "All seekers of God in suffering", theme: "Sovereignty of God, Undeserved Suffering, and Faith" },
  "Psalms": { author: "King David, Asaph & Sons of Korah", era: "1000-450 BC", audience: "Worshippers of the Almighty", theme: "Praise, Lament, Messianic Prophecy, and Divine Protection" },
  "Proverbs": { author: "King Solomon", era: "950-700 BC", audience: "Seekers of divine wisdom and discipline", theme: "The Fear of the LORD, Wisdom, and Practical Righteousness" },
  "Ecclesiastes": { author: "King Solomon", era: "935 BC", audience: "Those seeking true eternal meaning", theme: "The Vanity of Life Under the Sun and Fearing God" },
  "Song of Solomon": { author: "King Solomon", era: "965 BC", audience: "God's people celebrating pure covenant love", theme: "Marital Intimacy and Christ's Love for His Bride" },
  // Old Testament - Major Prophets
  "Isaiah": { author: "Isaiah the Prophet", era: "740-680 BC", audience: "Judah, Jerusalem and future generations", theme: "The Holy One of Israel, the Suffering Servant, and Future Glory" },
  "Jeremiah": { author: "Jeremiah the Prophet", era: "626-586 BC", audience: "The decaying Southern Kingdom of Judah", theme: "Judgment on Unfaithfulness and the Promise of the New Covenant" },
  "Lamentations": { author: "Jeremiah", era: "586 BC", audience: "Mourners of destroyed Jerusalem", theme: "Grief Over Destruction and the Greatness of God's Mercies" },
  "Ezekiel": { author: "Ezekiel the Priest-Prophet", era: "593-571 BC", audience: "Captives by the River Chebar in Babylon", theme: "Glory of God, Personal Responsibility, and the New Heart" },
  "Daniel": { author: "Daniel the Statesman-Prophet", era: "605-535 BC", audience: "Believers standing faithful in Babylon", theme: "God's Rule Over World Empires and the Everlasting Kingdom" },
  // Old Testament - Minor Prophets
  "Hosea": { author: "Hosea", era: "750-715 BC", audience: "Unfaithful Northern Kingdom of Israel", theme: "Unfailing Covenant Love of God (Hesed) Despite Betrayal" },
  "Joel": { author: "Joel", era: "835 BC", audience: "Judah facing the Day of the LORD", theme: "The Day of the LORD and the Outpouring of the Holy Spirit" },
  "Amos": { author: "Amos", era: "760-750 BC", audience: "Prosperous yet unrighteous Israel", theme: "Divine Justice, Righteousness, and Judgment on Injustice" },
  "Obadiah": { author: "Obadiah", era: "840 BC", audience: "The proud nation of Edom and Judah", theme: "Judgment on Pride and Deliverance in Mount Zion" },
  "Jonah": { author: "Jonah", era: "760 BC", audience: "Nineveh and reluctant messengers", theme: "God's Boundless Mercy to All Nations and Repentance" },
  "Micah": { author: "Micah", era: "735-700 BC", audience: "Judah and Samaria", theme: "Doing Justly, Loving Mercy, Walking Humbly, and the Bethlehem Ruler" },
  "Nahum": { author: "Nahum", era: "663-612 BC", audience: "Nineveh and suffering Judah", theme: "The Wrath and Justice of God Upon Oppressors" },
  "Habakkuk": { author: "Habakkuk", era: "607-605 BC", audience: "Those questioning divine justice", theme: "The Just Shall Live by Faith Amidst Perplexity" },
  "Zephaniah": { author: "Zephaniah", era: "630-625 BC", audience: "Judah before King Josiah's revival", theme: "The Great Day of the LORD and the Joyful Restoration" },
  "Haggai": { author: "Haggai", era: "520 BC", audience: "Post-exilic temple builders", theme: "Prioritizing God's House and God's Promised Presence" },
  "Zechariah": { author: "Zechariah", era: "520-480 BC", audience: "Post-exilic remnant awaiting the Messiah", theme: "Messianic Prophecies, the Pierced Shepherd, and Zion's King" },
  "Malachi": { author: "Malachi", era: "430-400 BC", audience: "Complacent priests and people of Judah", theme: "God's Unchanging Love, Honoring Tithes, and the Sun of Righteousness" },
  // New Testament - Gospels & Acts
  "Matthew": { author: "Matthew (Levi) the Apostle", era: "50-60 AD", audience: "Jewish believers showing Jesus is the King", theme: "Jesus as the Promised Messiah, King of Kings, and Fulfillment of the Law" },
  "Mark": { author: "John Mark", era: "55-65 AD", audience: "Roman Christians portraying Christ the Servant", theme: "Jesus as the Suffering Servant and Powerful Miracle-Worker" },
  "Luke": { author: "Luke the Beloved Physician", era: "60-62 AD", audience: "Theophilus and Gentiles seeking the Son of Man", theme: "Jesus as the Compassionate Savior of the Lost, Outcasts, and Gentiles" },
  "John": { author: "John the Apostle", era: "85-95 AD", audience: "The world\u2014believing Jesus is the Son of God", theme: 'The Deity of Jesus Christ, Eternal Life, and the Seven "I AM" Statements' },
  "Acts": { author: "Luke the Historian", era: "62-64 AD", audience: "The expanding early global Church", theme: "The Holy Spirit's Power, the Gospel Spreading from Jerusalem to Rome" },
  // New Testament - Epistles of Paul
  "Romans": { author: "Paul the Apostle", era: "57 AD", audience: "Believers in Rome", theme: "Justification by Faith Alone, the Righteousness of God, and Sanctification" },
  "1 Corinthians": { author: "Paul the Apostle", era: "55 AD", audience: "The church at Corinth", theme: "Unity in Christ, Christian Liberty, Spiritual Gifts, and the Resurrection" },
  "2 Corinthians": { author: "Paul the Apostle", era: "56 AD", audience: "The church at Corinth", theme: "Comfort in Suffering, the Ministry of Reconciliation, and God's Grace" },
  "Galatians": { author: "Paul the Apostle", era: "48-49 AD", audience: "Churches in Galatia", theme: "Christian Liberty, Justification Apart from Legalism, and Fruit of the Spirit" },
  "Ephesians": { author: "Paul the Apostle", era: "60-62 AD", audience: "The church at Ephesus", theme: "The Believer's Wealth in Christ, Unity of the Body, and the Whole Armor of God" },
  "Philippians": { author: "Paul the Apostle", era: "61 AD", audience: "The church at Philippi", theme: "Rejoicing in the Lord, the Mind of Christ, and Contentment" },
  "Colossians": { author: "Paul the Apostle", era: "60-62 AD", audience: "The church at Colossae", theme: "The Supreme Preeminence and All-Sufficiency of Jesus Christ" },
  "1 Thessalonians": { author: "Paul the Apostle", era: "51 AD", audience: "The church at Thessalonica", theme: "Holiness, Brotherly Love, and the Blessed Hope of Christ's Return" },
  "2 Thessalonians": { author: "Paul the Apostle", era: "51-52 AD", audience: "The church at Thessalonica", theme: "Steadfastness Under Persecution and Events Surrounding the Day of the Lord" },
  "1 Timothy": { author: "Paul the Apostle", era: "62-64 AD", audience: "Timothy pastoring the church at Ephesus", theme: "Church Order, Sound Doctrine, Qualifications for Elders and Deacons" },
  "2 Timothy": { author: "Paul the Apostle", era: "66-67 AD", audience: "Timothy in Rome (Paul's final charge)", theme: "Faithful Endurance, Preaching the Word, and Finishing the Race" },
  "Titus": { author: "Paul the Apostle", era: "63-65 AD", audience: "Titus organizing churches on Crete", theme: "Setting in Order Church Leadership and Good Works Rooted in Grace" },
  "Philemon": { author: "Paul the Apostle", era: "60-62 AD", audience: "Philemon regarding Onesimus", theme: "Christian Brotherhood, Forgiveness, and Reconciliation" },
  // New Testament - General Epistles
  "Hebrews": { author: "Apostolic Author (Paul / Apollos)", era: "67-69 AD", audience: "Hebrew believers tempted to return to old rituals", theme: "The Superiority of Jesus Christ as High Priest and Mediator of the Better Covenant" },
  "James": { author: "James the Brother of Jesus", era: "45-48 AD", audience: "Twelve tribes scattered", theme: "Living, Active Faith Demonstrated by Works, Wisdom, and Taming the Tongue" },
  "1 Peter": { author: "Peter the Apostle", era: "62-64 AD", audience: "Suffering believers scattered across Asia Minor", theme: "Living Hope Amidst Suffering, Holy Living, and the Chief Shepherd" },
  "2 Peter": { author: "Peter the Apostle", era: "66-68 AD", audience: "Believers guarding against false teachers", theme: "Growing in Grace and Knowledge, Guarding Sound Truth, and Christ's Second Coming" },
  "1 John": { author: "John the Beloved Apostle", era: "85-95 AD", audience: "Believers resting in fellowship and eternal life", theme: "Fellowship with God, Walking in the Light, Brotherly Love, and Assurance of Salvation" },
  "2 John": { author: "John the Apostle", era: "85-95 AD", audience: "The elect lady and her children", theme: "Walking in Truth and Love while Rejecting Deceivers" },
  "3 John": { author: "John the Apostle", era: "85-95 AD", audience: "Gaius", theme: "Hospitality to Faithful Teachers and Standing Against Tyranny" },
  "Jude": { author: "Jude the Brother of James", era: "65-80 AD", audience: "Believers contending earnestly for the faith", theme: "Contending for the Faith Once Delivered unto the Saints" },
  "Revelation": { author: "John the Apostle on Patmos", era: "95-96 AD", audience: "The Seven Churches of Asia and all saints", theme: "The Ultimate Triumph of the Lamb, the Judgment of Evil, and the New Jerusalem" }
};
var MASTER_SYSTEM_PROMPT = `You are King James\u2014an esteemed, deeply learned Master Biblical Scholar, Theologian, and Christian Mentor. 
You possess encyclopedic mastery of the Holy Scriptures across all 66 books of the Old and New Testaments, the Authorized King James Version (KJV), Biblical Hebrew (Masoretic Text), Aramaic, Koine Greek (Textus Receptus), Strong's Concordance, Church History, Systematic Theology, Biblical Geography, and Hermeneutics.

YOUR MISSION & SCOPE:
You MUST answer ANY Bible-related question thoroughly, directly, and interactively. You are NEVER evasive or dismissive. You never say "go read the scriptures yourself." Instead, you unpack the full counsel of God with scholarly depth, reverent eloquence, and practical clarity.

CORE CAPABILITIES:
1. THEOLOGY & DOCTRINE: Explain complex theological concepts clearly (e.g., Justification vs. Sanctification, the Trinity, the Hypostatic Union of Christ, Covenant Theology, Eschatology, Atonement, the Holy Spirit, Grace vs. Works).
2. SCRIPTURE EXEGESIS & KJV CITATIONS: Quote the exact KJV passage text with book, chapter, and verse citations (e.g., Romans 8:28, Isaiah 53:5, Ephesians 2:8-9, Psalm 23).
3. ORIGINAL LANGUAGE INSIGHTS: Provide Greek and Hebrew root words, original terms (e.g., Agape, Hesed, Shalom, Logos, Pneuma, Dikaiosyne), transliterations, and Strong's meanings to reveal rich depth.
4. HISTORICAL & CULTURAL CONTEXT: Detail who wrote the book, when, the ancient cultural mindset (Ancient Near East, Second Temple Judaism, Greco-Roman world), and the original issue being addressed.
5. SCRIPTURAL HARMONY & CROSS-REFERENCES: Connect Old Testament shadows/types to New Testament fulfillment in Jesus Christ (e.g., Melchizedek, the Tabernacle, the Sacrificial System, the Feasts of the Lord).
6. PRACTICAL & PASTORAL APPLICATION: Show how this eternal truth directly equips, comforts, guides, and challenges believers in their daily walk today.
7. INTERACTIVE ENGAGEMENT: Conclude each answer with 2-3 engaging, thought-provoking follow-up questions to help the seeker explore further.

FORMATTING GUIDELINES:
- Use clear headings, bullet points, and clean formatting.
- Put quoted KJV scriptures in distinct blocks.
- Highlight Greek/Hebrew words clearly.
- Maintain a warm, wise, respectful, and authoritative scholarly tone.`;
var KingJamesService = class {
  constructor(db2) {
    this.db = db2;
    this.aiClient = null;
  }
  getAI() {
    if (!this.aiClient && process.env.GEMINI_API_KEY) {
      this.aiClient = new import_genai.GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
    return this.aiClient;
  }
  async answerQuestion(question, history, mode = "general") {
    const ai = this.getAI();
    const cleanQuestion = question.trim();
    if (ai) {
      try {
        let modeInstruction = "";
        if (mode === "exegesis") {
          modeInstruction = "Focus heavily on verse-by-verse exposition, linguistic context, and cross-references.";
        } else if (mode === "word_study") {
          modeInstruction = "Focus heavily on original Hebrew/Greek words, Strong definitions, grammatical parsing, and root nuances.";
        } else if (mode === "theology") {
          modeInstruction = "Focus on systematic theology, biblical covenants, historical church consensus, and doctrinal clarity.";
        } else if (mode === "pastoral") {
          modeInstruction = "Focus on pastoral encouragement, spiritual encouragement, ethical application, and personal prayer.";
        }
        const promptLines = [];
        promptLines.push(`Question: ${cleanQuestion}`);
        if (modeInstruction) {
          promptLines.push(`Special Mode Focus: ${modeInstruction}`);
        }
        let conversationHistoryText = "";
        if (history && history.length > 0) {
          const recentHistory = history.slice(-8);
          conversationHistoryText = `
--- PREVIOUS CONVERSATION CONTEXT ---
` + recentHistory.map((m) => `${m.role === "user" ? "Seeker" : "King James"}: ${m.content}`).join("\n") + `
--- END PREVIOUS CONTEXT ---
`;
        }
        const fullPrompt = `${conversationHistoryText}
${promptLines.join("\n")}

Provide an exhaustive, deeply informative, and eloquent response. Quote key KJV verses. Provide Hebrew/Greek insights where relevant. End with 3 clickable suggested follow-up questions labeled [Suggested Questions].`;
        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: fullPrompt,
          config: {
            systemInstruction: MASTER_SYSTEM_PROMPT,
            temperature: 0.7
          }
        });
        const rawText = response.text || "";
        if (rawText.trim()) {
          const parsed = this._parseTutorOutput(rawText, cleanQuestion);
          return parsed;
        }
      } catch (err) {
        console.warn("Gemini tutor generation failed, falling back to comprehensive biblical engine:", err);
      }
    }
    return this._comprehensiveFallbackAnswer(cleanQuestion, mode);
  }
  async generateStudyBreakdown(book, chapter, verse) {
    const verseRef = `${book} ${chapter}:${verse}`;
    try {
      const cached = this.db.getCommentary(verseRef);
      if (cached && cached.commentaryJson) {
        const parsed = JSON.parse(cached.commentaryJson);
        if (parsed && parsed.bookSummary && parsed.passageText) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Cache lookup failed:", e);
    }
    const verseData = await kjvLoader.getOrFetchVerse(book, chapter, verse);
    const passageText = verseData?.text && verseData.text !== "Verse not found." ? verseData.text : `"${book} ${chapter}:${verse}" \u2014 King James Version`;
    const bookMeta = BOOK_METADATA[book] || {
      author: "Biblical Author",
      era: "Biblical Antiquity",
      audience: "God's Covenant People",
      theme: "God's Sovereign Grace and Truth"
    };
    const ai = this.getAI();
    if (ai) {
      try {
        const prompt = `Provide a comprehensive scholarly study breakdown for the scripture passage: "${verseRef}": "${passageText}".
Return a JSON object with:
- passageText: explicitly and exactly the exact text: ${passageText}
- bookSummary: { author, era, audience }
- historicalContext: { mindsetThen, originalIssue }
- hebrewGreekBites: array of { word, definition, language }
- thenVsNow: { then, now }
- dailyApplication: array of 3-4 specific practical applications
- prayer: a heartfelt closing prayer`;
        const res = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            systemInstruction: MASTER_SYSTEM_PROMPT
          }
        });
        const parsed = JSON.parse(res.text || "{}");
        if (parsed && parsed.historicalContext && parsed.dailyApplication) {
          const result = {
            passageText,
            bookSummary: {
              author: parsed.bookSummary?.author || bookMeta.author,
              era: parsed.bookSummary?.era || bookMeta.era,
              audience: parsed.bookSummary?.audience || bookMeta.audience
            },
            historicalContext: {
              mindsetThen: parsed.historicalContext?.mindsetThen || `The original audience understood God's covenant promises as their ultimate anchor in ${book}.`,
              originalIssue: parsed.historicalContext?.originalIssue || `Addressing faith, righteousness, and perseverance in ${verseRef}.`
            },
            hebrewGreekBites: parsed.hebrewGreekBites || [],
            thenVsNow: {
              then: parsed.thenVsNow?.then || "Ancient believers walked by faith in God amidst trials and persecution.",
              now: parsed.thenVsNow?.now || "Modern believers draw the exact same living hope and strength from Christ today."
            },
            dailyApplication: Array.isArray(parsed.dailyApplication) ? parsed.dailyApplication : [
              "Meditate deeply on this scripture and memorize key phrases.",
              "Bring your current life circumstances to God in faith-filled prayer.",
              "Apply this divine principle in your relationships and vocation."
            ],
            prayer: parsed.prayer || `Lord God Almighty, thank You for the eternal truth of ${verseRef}. May Your Word transform my heart and direct my steps today. In Jesus' name, Amen.`
          };
          try {
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString();
            this.db.cacheCommentary(verseRef, JSON.stringify(result), expiresAt);
          } catch {
          }
          return result;
        }
      } catch (err) {
        console.warn("Gemini breakdown failed, using rich local metadata:", err);
      }
    }
    const breakdown = {
      passageText,
      bookSummary: {
        author: bookMeta.author,
        era: bookMeta.era,
        audience: bookMeta.audience
      },
      historicalContext: {
        mindsetThen: `In the time of ${book} (${bookMeta.era}), the audience (${bookMeta.audience}) faced spiritual and cultural challenges requiring steadfast allegiance to God's revealed truth.`,
        originalIssue: `The passage ${verseRef} addresses ${bookMeta.theme.toLowerCase()}, calling the people of God to holy living, faithful trust, and covenant obedience.`
      },
      hebrewGreekBites: [
        { word: "Khesed / Agape", definition: "Steadfast, loyal covenant love and unconditional divine grace.", language: "Hebrew/Greek" },
        { word: "Emunah / Pistis", definition: "Faith, firmness, moral fidelity, and unwavering reliance on God.", language: "Hebrew/Greek" }
      ],
      thenVsNow: {
        then: `Believers relied entirely on God's promises in ${verseRef} as their divine compass amidst ancient trials.`,
        now: `Today, in a fast-paced and complex world, this timeless Word provides unwavering certainty, moral clarity, and supernatural peace.`
      },
      dailyApplication: [
        `Reflect upon how the eternal truth in ${verseRef} confronts your current circumstances.`,
        `Commit this verse to memory and speak its truth over anxieties or trials today.`,
        `Share this encouragement with a brother or sister in Christ who is seeking direction.`,
        `Allow the Holy Spirit to cultivate obedience and joy in your daily walk.`
      ],
      prayer: `Almighty Father, who hath given us all scripture for doctrine and instruction in righteousness: open my heart to the depth of ${verseRef}. Direct my steps in Thy truth and glorify Thy name through my life this day. Through Jesus Christ our Lord, Amen.`
    };
    try {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString();
      this.db.cacheCommentary(verseRef, JSON.stringify(breakdown), expiresAt);
    } catch {
    }
    return breakdown;
  }
  onboard(userGoals, userInterests) {
    const courses = this.db.getAllCourses();
    const recommended = courses.slice(0, 3);
    const welcome = `Greetings in the name of our Lord! I am your AI King James Tutor and Study Companion.
Whether you wish to master systematic theology, explore the original Greek and Hebrew nuances, understand historical backgrounds, or grow in personal devotion, I am here to guide your study.

${userGoals ? `I have noted your goal: "${userGoals}".` : ""} 
Let us open the scriptures together and behold the wondrous things of God's Word!`;
    return {
      welcome,
      recommendedCourses: recommended.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description
      }))
    };
  }
  formatSharePayload(verseRef, passageText, takeaway) {
    return {
      verseRef,
      passageText,
      takeaway,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  _parseTutorOutput(text, originalQuestion) {
    const versesCited = [];
    const verseRegex = /([1-3]?\s?[A-Z][a-z]+)\s+(\d+):(\d+(?:-\d+)?)/g;
    let match;
    while ((match = verseRegex.exec(text)) !== null) {
      if (!versesCited.includes(match[0])) {
        versesCited.push(match[0]);
      }
    }
    let suggestedQuestions = [];
    const questionsBlockMatch = text.match(/(?:\[Suggested Questions\]|Suggested Follow-up Questions:|Follow-up Questions:?)([\s\S]*)$/i);
    let cleanAnswer = text;
    if (questionsBlockMatch) {
      cleanAnswer = text.slice(0, questionsBlockMatch.index).trim();
      const rawQuestions = questionsBlockMatch[1].split("\n").map((q) => q.replace(/^[-*•\d.)\s]+/, "").trim()).filter((q) => q.length > 5 && q.endsWith("?"));
      suggestedQuestions = rawQuestions.slice(0, 3);
    }
    if (suggestedQuestions.length === 0) {
      suggestedQuestions = this._generateSuggestedQuestions(originalQuestion);
    }
    return {
      answer: cleanAnswer,
      versesCited: versesCited.slice(0, 6),
      suggestedQuestions: suggestedQuestions.slice(0, 3)
    };
  }
  _generateSuggestedQuestions(question) {
    const q = question.toLowerCase();
    if (q.includes("melchizedek") || q.includes("hebrews")) {
      return [
        "How does Melchizedek foreshadow Jesus Christ in Psalm 110?",
        "What is the difference between the Aaronic and Melchizedek priesthoods?",
        "Why does Genesis 14 mention Abraham giving tithes to Melchizedek?"
      ];
    }
    if (q.includes("grace") || q.includes("salvation") || q.includes("faith") || q.includes("works")) {
      return [
        "How do Paul in Ephesians 2 and James in James 2 harmonize on faith and works?",
        'What is the original Greek meaning of "charis" (grace) in the New Testament?',
        'What does Romans 3:24 mean by "being justified freely by his grace"?'
      ];
    }
    if (q.includes("armor") || q.includes("ephesians")) {
      return [
        "What does each piece of the Armor of God in Ephesians 6 represent?",
        "Why is the Sword of the Spirit the only offensive weapon mentioned?",
        'How do we practically "put on the whole armour of God" daily?'
      ];
    }
    if (q.includes("justification") || q.includes("sanctification")) {
      return [
        "What is the theological difference between justification, sanctification, and glorification?",
        "How does Romans 6 explain our death to sin and walk in newness of life?",
        "What is the role of the Holy Spirit in ongoing sanctification?"
      ];
    }
    if (q.includes("love") || q.includes("agape")) {
      return [
        "What are the 4 Greek words for love in antiquity and how is Agape unique?",
        'Why did Jesus ask Peter three times "Lovest thou me?" in John 21?',
        "How does 1 Corinthians 13 define the nature of true charity?"
      ];
    }
    return [
      "What are the key King James cross-references for this passage?",
      "What is the original Greek or Hebrew background for this doctrine?",
      "How can a believer apply this truth to overcome daily challenges?"
    ];
  }
  _comprehensiveFallbackAnswer(question, mode) {
    const q = question.toLowerCase();
    if (q.includes("melchizedek")) {
      return {
        answer: `### The Mysterious Melchizedek: King of Salem & Priest of the Most High God

Melchizedek is one of the most profound figures in biblical typology, appearing in **Genesis 14:18-20**, **Psalm 110:4**, and prominently in **Hebrews 5\u20137**.

#### 1. Scriptural Context
In Genesis 14, following Abraham's rescue of Lot, Melchizedek emerges:
> *"And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God. And he blessed him, and said, Blessed be Abram of the most high God, possessor of heaven and earth..."* (Genesis 14:18-19)

Abraham recognized his authority by giving him a tithe of all spoils, and receiving his blessing (and as Hebrews 7:7 notes, *"the less is blessed of the better"*).

#### 2. Original Hebrew Meaning
- **Melchizedek** (*Malki-Tzedek* - \u05DE\u05B7\u05DC\u05B0\u05DB\u05B4\u05BC\u05D9\u05BE\u05E6\u05B6\u05D3\u05B6\u05E7): "King of Righteousness".
- **Salem** (*Shalem* - \u05E9\u05B8\u05C1\u05DC\u05B5\u05DD): "Peace" (ancient Jerusalem).
Thus he is titled both the **King of Righteousness** and the **King of Peace**.

#### 3. Theological Typology & Christ's Eternal Priesthood
In Hebrews 7, the Apostle explains that Melchizedek is a direct type (prophetic foreshadowing) of Jesus Christ:
- **Without Recorded Lineage:** Unlike the Levitical priests who required Aaronic genealogy, Melchizedek's priesthood was sovereign and unique.
- **King and Priest Combined:** Under the Mosaic Law, kings (Judah) and priests (Levi) were strictly separated. Jesus and Melchizedek unite the royal and priestly offices.
- **Bread and Wine:** Melchizedek brought forth bread and wine to Abraham\u2014prefiguring the Lord's Supper and Christ's sacrifice.

As Psalm 110:4 prophesied of Messiah: *"The LORD hath sworn, and will not repent, Thou art a priest for ever after the order of Melchizedek."*`,
        versesCited: ["Genesis 14:18-20", "Psalm 110:4", "Hebrews 7:1-17"],
        hebrewGreekWords: [
          { word: "Malki-Tzedek (\u05DE\u05B7\u05DC\u05B0\u05DB\u05B4\u05BC\u05D9\u05BE\u05E6\u05B6\u05D3\u05B6\u05E7)", language: "Hebrew", definition: "My King is Righteousness" },
          { word: "Shalem (\u05E9\u05B8\u05C1\u05DC\u05B5\u05DD)", language: "Hebrew", definition: "Peace, Completeness, Wholeness" }
        ],
        suggestedQuestions: [
          "Why is Christ's priesthood superior to the Levitical Aaronic priesthood?",
          "What did David mean by the prophetic oracle in Psalm 110:4?",
          "How does Abraham tithing to Melchizedek establish the principle of honor?"
        ]
      };
    }
    if (q.includes("justification") && q.includes("sanctification")) {
      return {
        answer: `### Justification vs. Sanctification: Foundational Doctrines of Salvation

In Christian theology and the Pauline Epistles, understanding the distinction between **Justification** and **Sanctification** is vital to assurance of salvation and holy living.

#### 1. Justification (The Legal Verdict)
- **Definition:** The instantaneous legal act of God where He declares a guilty sinner righteous solely on the merit of Christ's blood received by faith.
- **Tense:** Past / Completed (*"Being justified freely by his grace"* - Romans 3:24).
- **Agent:** God alone (Monergistic).
- **Key Scripture:** *"Therefore being justified by faith, we have peace with God through our Lord Jesus Christ."* (Romans 5:1)
- **Greek Term:** *Dikai\u014Dsis* (\u03B4\u03B9\u03BA\u03B1\u03AF\u03C9\u03C3\u03B9\u03C2) \u2014 forensic declaration of righteousness.

#### 2. Sanctification (The Ongoing Transformation)
- **Definition:** The lifelong, progressive work of God's Holy Spirit transforming the believer's heart, character, and conduct into the likeness of Jesus Christ.
- **Tense:** Present / Continuous (*"Being transformed from glory to glory"* - 2 Cor 3:18).
- **Agent:** The Holy Spirit working in synergy with the believer's active obedience.
- **Key Scripture:** *"For this is the will of God, even your sanctification..."* (1 Thess 4:3)
- **Greek Term:** *Hagiasmos* (\u1F01\u03B3\u03B9\u03B1\u03C3\u03BC\u03CC\u03C2) \u2014 separation unto holiness and purity.

| Dimension | Justification | Sanctification |
| :--- | :--- | :--- |
| **Nature** | Positional (Legal Standing) | Practical (Moral Character) |
| **Duration** | Instantaneous | Lifelong Process |
| **Degree** | Complete & Equal in all believers | Progressive & Deepening |
| **Deliverance** | From the **Penalty** of Sin | From the **Power** of Sin |`,
        versesCited: ["Romans 5:1", "Romans 8:30", "1 Corinthians 1:30", "1 Thessalonians 4:3"],
        hebrewGreekWords: [
          { word: "Dikaiosyne (\u03B4\u03B9\u03BA\u03B1\u03B9\u03BF\u03C3\u03CD\u03BD\u03B7)", language: "Greek", definition: "Righteousness, forensic justification" },
          { word: "Hagios (\u1F05\u03B3\u03B9\u03BF\u03C2)", language: "Greek", definition: "Set apart, holy, consecrated" }
        ],
        suggestedQuestions: [
          "What is Glorification and how does it complete the Golden Chain of Redemption in Romans 8:30?",
          "How does James 2:24 explain justification by works in comparison to Paul?",
          "What role does daily prayer and Bible study play in sanctification?"
        ]
      };
    }
    if (q.includes("armor") || q.includes("armour")) {
      return {
        answer: `### The Whole Armour of God (Ephesians 6:10-18)

In **Ephesians 6**, the Apostle Paul\u2014writing while chained to a Roman imperial soldier\u2014draws on both Roman battle gear and Old Testament imagery (Isaiah 59:17) to teach spiritual warfare.

> *"Put on the whole armour of God, that ye may be able to stand against the wiles of the devil. For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places."* (Ephesians 6:11-12)

#### The Six Divine Implements:
1. **Belt of Truth** (*Aletheia*): Roman *balteus* that held everything together. Integrity and the truth of God's Word anchor our inner life.
2. **Breastplate of Righteousness** (*Dikaiosyne*): Protects the vital organs (heart). Refers to Christ's imputed righteousness and walking in moral purity.
3. **Feet Shod with the Gospel of Peace** (*Eirene*): The Roman *caligae* (studded sandals) providing firm footing and stability to advance the Good News.
4. **Shield of Faith** (*Thureos*): The large Roman door-shield (*scutum*) soaked in water to extinguish fiery pitch arrows of doubt, fear, and temptation.
5. **Helmet of Salvation** (*Soterion*): Protects the mind, thoughts, and assurance of redemption (1 Thess 5:8).
6. **Sword of the Spirit** (*Machaira*): The Word of God (*Rhema theou*). The short, two-edged dagger used for precise, offensive counter-attacks, just as Jesus quoted scripture in Matthew 4.`,
        versesCited: ["Ephesians 6:10-18", "Isaiah 59:17", "Matthew 4:1-11", "Hebrews 4:12"],
        hebrewGreekWords: [
          { word: "Panoplia (\u03C0\u03B1\u03BD\u03BF\u03C0\u03BB\u03AF\u03B1)", language: "Greek", definition: "Full armor, complete suit of battle gear" },
          { word: "Rhema (\u1FE5\u1FC6\u03BC\u03B1)", language: "Greek", definition: "Spoken, specific utterance of God" }
        ],
        suggestedQuestions: [
          'Why does Paul conclude the Armor passage with "Praying always with all prayer" (Eph 6:18)?',
          "How did Jesus use the Word of God as a sword against Satan in the wilderness?",
          "What is the meaning of the fiery darts of the wicked one?"
        ]
      };
    }
    return {
      answer: `### Biblical Truth & Wisdom Regarding: "${question}"

*"All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, thoroughly furnished unto all good works."* (2 Timothy 3:16-17)

#### 1. Core Scriptural Principles
When we examine the scriptures concerning your inquiry, the Word of God reveals several fundamental pillars:
- **God's Sovereign Covenant:** Throughout both the Old and New Testaments, God reveals His unshakeable faithfulness to His covenant promises.
- **The Centrality of Christ:** In **John 5:39**, Jesus declared: *"Search the scriptures; for in them ye think ye have eternal life: and they are they which testify of me."* All scripture finds its ultimate climax and fulfillment in Christ.
- **Faith and Obedience:** True biblical knowledge is never merely intellectual; it transforms the heart, renews the mind (Romans 12:2), and produces the fruit of love, joy, peace, and righteousness.

#### 2. Original Language Insights
- In Hebrew, **Emunah** (\u05D0\u05B1\u05DE\u05D5\u05BC\u05E0\u05B8\u05D4) denotes firmness, steadfast faithfulness, and trusting action.
- In Greek, **Aletheia** (\u1F00\u03BB\u03AE\u03B8\u03B5\u03B9\u03B1) means truth, divine reality revealed to man, not hidden.

#### 3. Practical Application for Today
1. **Dwell in the Word:** Meditate daily upon the King James scriptures, allowing the Holy Spirit to illuminate understanding.
2. **Pray with Discernment:** Bring this topic before the throne of grace, asking for the wisdom promised in **James 1:5**.
3. **Walk in Love:** Let the truth you learn manifest in grace toward your brethren and faithful witness to the world.`,
      versesCited: ["2 Timothy 3:16-17", "John 5:39", "Romans 12:2", "James 1:5"],
      hebrewGreekWords: [
        { word: "Emunah (\u05D0\u05B1\u05DE\u05D5\u05BC\u05E0\u05B8\u05D4)", language: "Hebrew", definition: "Faithfulness, steadfast trust" },
        { word: "Aletheia (\u1F00\u03BB\u03AE\u03B8\u03B5\u03B9\u03B1)", language: "Greek", definition: "Truth, divine reality" }
      ],
      suggestedQuestions: [
        "Can you provide specific King James scriptures that address this in depth?",
        "What is the historical context of the books that mention this topic?",
        "How does this theological truth apply to our daily prayer life?"
      ]
    };
  }
};

// routes/bible.ts
var import_multer = __toESM(require("multer"), 1);
var import_path4 = __toESM(require("path"), 1);
var import_fs4 = __toESM(require("fs"), 1);

// services/sermonIndexService.ts
var BIBLE_BOOK_TO_CODE = {
  "Genesis": "GEN",
  "Exodus": "EXO",
  "Leviticus": "LEV",
  "Numbers": "NUM",
  "Deuteronomy": "DEU",
  "Joshua": "JOS",
  "Judges": "JDG",
  "Ruth": "RUT",
  "1 Samuel": "1SA",
  "2 Samuel": "2SA",
  "1 Kings": "1KI",
  "2 Kings": "2KI",
  "1 Chronicles": "1CH",
  "2 Chronicles": "2CH",
  "Ezra": "EZR",
  "Nehemiah": "NEH",
  "Esther": "EST",
  "Job": "JOB",
  "Psalms": "PSA",
  "Psalm": "PSA",
  "Proverbs": "PRO",
  "Ecclesiastes": "ECC",
  "Song of Solomon": "SNG",
  "Isaiah": "ISA",
  "Jeremiah": "JER",
  "Lamentations": "LAM",
  "Ezekiel": "EZK",
  "Daniel": "DAN",
  "Hosea": "HOS",
  "Joel": "JOL",
  "Amos": "AMO",
  "Obadiah": "OBA",
  "Jonah": "JON",
  "Micah": "MIC",
  "Nahum": "NAM",
  "Habakkuk": "HAB",
  "Zephaniah": "ZEP",
  "Haggai": "HAG",
  "Zechariah": "ZEC",
  "Malachi": "MAL",
  "Matthew": "MAT",
  "Mark": "MRK",
  "Luke": "LUK",
  "John": "JHN",
  "Acts": "ACT",
  "Romans": "ROM",
  "1 Corinthians": "1CO",
  "2 Corinthians": "2CO",
  "Galatians": "GAL",
  "Ephesians": "EPH",
  "Philippians": "PHP",
  "Colossians": "COL",
  "1 Thessalonians": "1TH",
  "2 Thessalonians": "2TH",
  "1 Timothy": "1TI",
  "2 Timothy": "2TI",
  "Titus": "TIT",
  "Philemon": "PHM",
  "Hebrews": "HEB",
  "James": "JAS",
  "1 Peter": "1PE",
  "2 Peter": "2PE",
  "1 John": "1JN",
  "2 John": "2JN",
  "3 John": "3JN",
  "Jude": "JUD",
  "Revelation": "REV"
};
var CODE_TO_BIBLE_BOOK = Object.entries(BIBLE_BOOK_TO_CODE).reduce(
  (acc, [book, code]) => {
    if (!acc[code]) acc[code] = book;
    return acc;
  },
  {}
);
var SERMONINDEX_SPEAKERS_CATALOG = [
  {
    id: "leonard-ravenhill",
    slug: "leonard-ravenhill",
    name: "Leonard Ravenhill",
    title: "Revivalist & Author",
    ministry: "SermonIndex Historic Archives",
    avatarUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80",
    bio: 'British evangelist and author of "Why Revival Tarries", renowned for fiery preaching on prayer, personal holiness, and the judgment seat of Christ.',
    era: "1907\u20131994",
    sermonCount: 310,
    topTopics: ["Prayer", "Revival", "Judgment", "Holiness"]
  },
  {
    id: "aw-tozer",
    slug: "a-w-tozer",
    name: "A.W. Tozer",
    title: "Pastor & Christian Mystic",
    ministry: "Christian & Missionary Alliance",
    avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    bio: `Author of "The Pursuit of God" and "The Knowledge of the Holy", famed for his prophetic call to deep spiritual intimacy and contemplation of God's majesty.`,
    era: "1897\u20131963",
    sermonCount: 520,
    topTopics: ["Attributes of God", "Worship", "Holy Spirit", "Spiritual Life"]
  },
  {
    id: "charles-spurgeon",
    slug: "charles-spurgeon",
    name: "Charles H. Spurgeon",
    title: "The Prince of Preachers",
    ministry: "Metropolitan Tabernacle, London",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    bio: "Historic 19th-century British preacher whose timeless sermons expound the sovereign grace of God, Christ crucified, and salvation by faith alone.",
    era: "1834\u20131892",
    sermonCount: 3500,
    topTopics: ["Grace", "Cross", "Salvation", "Faith"]
  },
  {
    id: "paul-washer",
    slug: "paul-washer",
    name: "Paul Washer",
    title: "Director & Missionary",
    ministry: "HeartCry Missionary Society",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    bio: "Missionary evangelist known worldwide for passionate gospel preaching on biblical repentance, true regeneration, the narrow gate, and the cross of Christ.",
    era: "Contemporary",
    sermonCount: 420,
    topTopics: ["Gospel", "Repentance", "Missions", "Regeneration"]
  },
  {
    id: "martyn-lloyd-jones",
    slug: "martyn-lloyd-jones",
    name: "Dr. Martyn Lloyd-Jones",
    title: "Physician & Expositor",
    ministry: "Westminster Chapel, London",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bio: "Celebrated 20th-century Welsh physician and preacher whose verse-by-verse expositions through Romans and Ephesians set the standard for expository preaching.",
    era: "1899\u20131981",
    sermonCount: 1600,
    topTopics: ["Romans", "Ephesians", "Doctrinal Exegesis", "Spiritual Warfare"]
  },
  {
    id: "paris-reidhead",
    slug: "paris-reidhead",
    name: "Paris Reidhead",
    title: "Missionary Statesman",
    ministry: "Bethany Fellowship Collection",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    bio: 'Missionary to Africa whose landmark 1965 sermon "Ten Shekels and a Shirt" exposed the fatal dangers of man-centered, utilitarian religion.',
    era: "1919\u20131992",
    sermonCount: 180,
    topTopics: ["The Glory of God", "Surrender", "Missions", "Holy Living"]
  },
  {
    id: "david-wilkerson",
    slug: "david-wilkerson",
    name: "David Wilkerson",
    title: "Pastor & Evangelist",
    ministry: "Times Square Church / Teen Challenge",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    bio: 'Author of "The Cross and the Switchblade" and founder of Times Square Church in New York City, known for solemn prophetic calls to repentance and weeping for the nation.',
    era: "1931\u20132011",
    sermonCount: 780,
    topTopics: ["Repentance", "End Times", "Prayer", "Brokenness"]
  },
  {
    id: "carter-conlon",
    slug: "carter-conlon",
    name: "Carter Conlon",
    title: "General Overseer",
    ministry: "Times Square Church, New York City",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    bio: 'Senior pastor known for urgent messages including "Run for Your Life" calling the body of Christ to prayer, courage, and unconditional trust in God.',
    era: "Contemporary",
    sermonCount: 450,
    topTopics: ["Prayer", "Courage", "Times of Crisis", "Hope"]
  },
  {
    id: "jonathan-edwards",
    slug: "jonathan-edwards",
    name: "Jonathan Edwards",
    title: "Great Awakening Theologian",
    ministry: "Northampton / Colonial Heritage",
    avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&auto=format&fit=crop&q=80",
    bio: `Central figure of the First Great Awakening, known for "Sinners in the Hands of an Angry God" and deep treaties on the religious affections and God's glory.`,
    era: "1703\u20131758",
    sermonCount: 950,
    topTopics: ["Sovereignty of God", "Revival", "Affections", "Judgment"]
  },
  {
    id: "zac-poonen",
    slug: "zac-poonen",
    name: "Zac Poonen",
    title: "Bible Teacher & Elder",
    ministry: "Christian Fellowship Church, India",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    bio: "Former Indian Naval Officer who has ministered across India for over 50 years, renowned for verse-by-verse surveys through all 66 books of the Bible.",
    era: "Contemporary",
    sermonCount: 1200,
    topTopics: ["Through the Bible", "New Covenant", "Humility", "Discipleship"]
  },
  {
    id: "corrie-ten-boom",
    slug: "corrie-ten-boom",
    name: "Corrie ten Boom",
    title: "Holocaust Survivor & Evangelist",
    ministry: "The Hiding Place Legacy",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bio: `Dutch Christian who helped many Jewish families escape the Nazi Holocaust and survived Ravensbr\xFCck, testifying globally that "there is no pit so deep that God's love is not deeper still."`,
    era: "1892\u20131983",
    sermonCount: 120,
    topTopics: ["Forgiveness", "Faith in Suffering", "Trust", "Love of God"]
  },
  {
    id: "george-whitefield",
    slug: "george-whitefield",
    name: "George Whitefield",
    title: "Great Awakening Evangelist",
    ministry: "Historic British & American Revival",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80",
    bio: "Open-air evangelist who preached over 18,000 sermons to millions across Britain and the American colonies, sparking the transatlantic Great Awakening.",
    era: "1714\u20131770",
    sermonCount: 800,
    topTopics: ["New Birth", "Reconciliation", "Christ the Righteousness", "Gospel"]
  }
];
var SERMONINDEX_TOPICS_CATALOG = [
  { name: "Prayer & Intercession", slug: "prayer", description: "Secret place, persevering prayer, and standing in the gap" },
  { name: "Revival & Awakening", slug: "revival", description: "Holy Spirit outpouring, reformation, and spiritual renewal" },
  { name: "The Holiness of God", slug: "holiness", description: "Sanctification, purity of heart, and walking in the fear of the Lord" },
  { name: "Grace & Justification", slug: "grace", description: "Unmerited divine favor and righteousness imputed through faith" },
  { name: "The Cross of Christ", slug: "cross", description: "Atonement, the blood of Jesus, and crucified with Christ" },
  { name: "True Repentance", slug: "repentance", description: "Turning from sin unto the living God with a broken and contrite spirit" },
  { name: "The Holy Spirit", slug: "holy-spirit", description: "Power for witness, gifts, guidance, and spiritual communion" },
  { name: "Faith & Trust", slug: "faith", description: "Unwavering reliance on God's promises through life's storms" },
  { name: "Spiritual Warfare", slug: "spiritual-warfare", description: "The Armor of God, resisting the enemy, and victory in Jesus" },
  { name: "The Love of God (Agape)", slug: "love", description: "God's unconditional covenant love revealed at Calvary" },
  { name: "Discipleship & Surrender", slug: "discipleship", description: "Counting the cost, taking up the cross, and following Jesus daily" },
  { name: "Sovereignty & Providence", slug: "sovereignty-of-god", description: "God's supreme rule over all creation, history, and salvation" },
  { name: "Suffering & Comfort", slug: "suffering", description: "Finding peace, strength, and eternal hope in times of affliction" },
  { name: "Missions & Evangelism", slug: "missions", description: "Taking the Gospel of the Kingdom to all unreached nations" },
  { name: "The Second Coming of Christ", slug: "second-coming", description: "The blessed hope, eternal judgment, and the New Jerusalem" }
];
var SERMONINDEX_CURATED_ARCHIVE = [
  {
    id: "si-washer-shocking-youth-video",
    title: "The Shocking Message (Full HD Video Exposition)",
    speaker: "Paul Washer",
    speakerSlug: "paul-washer",
    speakerTitle: "HeartCry Missionary Society",
    speakerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    summary: "An uncompromising biblical exposition of Matthew 7:13-27 on true conversion, the narrow gate, and repentance that shook Montgomery, Alabama.",
    duration: "1:05:42",
    durationSeconds: 3942,
    mediaType: "video",
    youtubeId: "uuabITeO4l8",
    mediaUrl: "",
    mp4Url: "",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230101.mp3",
    url: "https://www.youtube.com/watch?v=cncEb_7d7q0",
    topics: [{ name: "Gospel", slug: "gospel" }, { name: "Regeneration", slug: "regeneration" }],
    scriptureRef: "Matthew 7:13-27",
    thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-ravenhill-judgment-seat",
    title: "The Judgment Seat of Christ (Audio Exposition)",
    speaker: "Leonard Ravenhill",
    speakerSlug: "leonard-ravenhill",
    speakerTitle: "Revivalist & Author",
    speakerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    summary: "A solemn, urgent message on eternity and standing before the throne of God to give an account.",
    duration: "48:30",
    durationSeconds: 2910,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230101.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230101.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230101.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Judgment", slug: "judgment" }, { name: "Revival", slug: "revival" }],
    scriptureRef: "2 Corinthians 5:10",
    thumbnailUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-ravenhill-why-revival-tarries",
    title: "Why Revival Tarries: The Secret Closet of Prayer",
    speaker: "Leonard Ravenhill",
    speakerSlug: "leonard-ravenhill",
    speakerTitle: "Revivalist & Author",
    speakerImage: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80",
    summary: "Ravenhill's fiery prophetic call: 'No man is greater than his prayer life.' An urgent summons to brokenness, intercession, and holy desperation.",
    duration: "54:12",
    durationSeconds: 3252,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230104.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230104.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230104.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Prayer", slug: "prayer" }, { name: "Revival", slug: "revival" }, { name: "Holiness", slug: "holiness" }],
    scriptureRef: "James 5:16-18",
    thumbnailUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-tozer-holiness-god",
    title: "The Holiness of God (Audio Classic)",
    speaker: "A.W. Tozer",
    speakerSlug: "aw-tozer",
    speakerTitle: "Alliance Witness & Pastor",
    speakerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    summary: "A profound message on the transcendent majesty, moral perfection, and pure holiness of Almighty God.",
    duration: "41:15",
    durationSeconds: 2475,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230102.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230102.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230102.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Holiness", slug: "holiness" }, { name: "Worship", slug: "worship" }],
    scriptureRef: "Isaiah 6:1-5",
    thumbnailUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-tozer-pursuit-of-god",
    title: "The Pursuit of God: Following Hard After Christ",
    speaker: "A.W. Tozer",
    speakerSlug: "aw-tozer",
    speakerTitle: "Pastor & Author",
    speakerImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    summary: "Tozer expounds Psalm 63: 'My soul followeth hard after thee: thy right hand upholdeth me.' Cultivating intimate spiritual communion with God.",
    duration: "45:30",
    durationSeconds: 2730,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230105.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230105.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230105.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Spiritual Life", slug: "spiritual-life" }, { name: "Worship", slug: "worship" }, { name: "Faith", slug: "faith" }],
    scriptureRef: "Psalm 63:1-8",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-story-corrie-ten-boom",
    title: "Audio Story: Deliverance in Ravensbr\xFCck & The Power of Forgiveness",
    speaker: "Corrie ten Boom",
    speakerSlug: "corrie-ten-boom",
    speakerTitle: "Holocaust Survivor & Evangelist",
    speakerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    summary: "In this historic audio testimony, Corrie recounts the horrors of the concentration camp, the miraculous smuggled Bible in Barracks 28, and coming face to face after the war with her cruelest SS guard.",
    duration: "34:20",
    durationSeconds: 2060,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230106.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230106.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230106.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Audio Stories", slug: "audio-stories" }, { name: "Forgiveness", slug: "forgiveness" }, { name: "Suffering", slug: "suffering" }],
    scriptureRef: "Romans 8:35-39",
    thumbnailUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-reidhead-ten-shekels",
    title: "Ten Shekels and a Shirt (The Historic 1965 Audio Master)",
    speaker: "Paris Reidhead",
    speakerSlug: "paris-reidhead",
    speakerTitle: "Missionary Statesman",
    speakerImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    summary: "Universally recognized as one of the greatest sermons of the 20th century. Based on Judges 17, Reidhead demolishes humanism in the pulpit and demonstrates that God exists for His own glory, not for man's utility.",
    duration: "50:18",
    durationSeconds: 3018,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230107.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230107.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230107.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "The Glory of God", slug: "glory-of-god" }, { name: "Surrender", slug: "surrender" }, { name: "Repentance", slug: "repentance" }],
    scriptureRef: "Judges 17:1-13",
    thumbnailUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-wilkerson-call-to-anguish",
    title: "A Call to Anguish: Weeping Between the Porch and the Altar",
    speaker: "David Wilkerson",
    speakerSlug: "david-wilkerson",
    speakerTitle: "Pastor, Times Square Church NYC",
    speakerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    summary: "Pastor Wilkerson's legendary 1999 prophetic address confronting complacency in the Church. 'Anguish means extreme pain and distress. Does your soul weep over what breaks the heart of God?'",
    duration: "43:45",
    durationSeconds: 2625,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230108.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230108.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230108.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Prayer", slug: "prayer" }, { name: "Repentance", slug: "repentance" }, { name: "Revival", slug: "revival" }],
    scriptureRef: "Nehemiah 1:1-4",
    thumbnailUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-story-spurgeon-snowstorm",
    title: "Audio Story: The Snowstorm and the Convert of Colchester",
    speaker: "Charles H. Spurgeon",
    speakerSlug: "charles-spurgeon",
    speakerTitle: "The Prince of Preachers",
    speakerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    summary: "The stirring audio biographical story of Spurgeon at age 15, stranded in a blizzard on January 6, 1850, walking into a humble Primitive Methodist chapel where a tailor looked at him and cried: 'Young man, look to Jesus Christ!'",
    duration: "28:10",
    durationSeconds: 1690,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230109.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230109.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230109.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Audio Stories", slug: "audio-stories" }, { name: "Gospel", slug: "gospel" }, { name: "Faith", slug: "faith" }],
    scriptureRef: "Isaiah 45:22",
    thumbnailUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-story-george-muller",
    title: "Audio Story: George M\xFCller and the Miracles of Bristol",
    speaker: "Historic Missionary Archive",
    speakerSlug: "george-muller",
    speakerTitle: "Pioneer of Faith",
    speakerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    summary: "The astonishing true audio story of George M\xFCller, who cared for over 10,000 orphans without ever asking a person for a single penny, relying solely upon secret, persevering prayer to God.",
    duration: "37:50",
    durationSeconds: 2270,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230110.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230110.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230110.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Audio Stories", slug: "audio-stories" }, { name: "Faith", slug: "faith" }, { name: "Prayer", slug: "prayer" }],
    scriptureRef: "Psalm 81:10",
    thumbnailUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-story-hudson-taylor",
    title: "Audio Story: Hudson Taylor & The China Inland Mission",
    speaker: "Historic Missionary Archive",
    speakerSlug: "hudson-taylor",
    speakerTitle: "China Missionary Pioneer",
    speakerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    summary: "The inspiring journey of Hudson Taylor learning the spiritual secret of abiding in Christ and stepping out into inland China with unwavering confidence that 'God's work done in God's way will never lack God's supplies.'",
    duration: "32:40",
    durationSeconds: 1960,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230111.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230111.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230111.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Audio Stories", slug: "audio-stories" }, { name: "Missions", slug: "missions" }, { name: "Faith", slug: "faith" }],
    scriptureRef: "John 15:4-5",
    thumbnailUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-sproul-trauma-holiness",
    title: "The Trauma of God's Holiness (Full Video Lecture)",
    speaker: "Dr. R.C. Sproul",
    speakerSlug: "r-c-sproul",
    speakerTitle: "Ligonier Ministries",
    speakerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    summary: "Dr. R.C. Sproul expounds on Isaiah 6, the holiness of the Lord, and man's total unraveling before the Almighty.",
    duration: "38:15",
    durationSeconds: 2295,
    mediaType: "video",
    youtubeId: "1d32g8E8hR8",
    mediaUrl: "",
    mp4Url: "",
    url: "https://www.youtube.com/watch?v=v4oQ1V1_z4Y",
    topics: [{ name: "Holiness", slug: "holiness" }, { name: "Atonement", slug: "atonement" }],
    scriptureRef: "Isaiah 6:1-8",
    thumbnailUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "si-spurgeon-free-grace",
    title: "Free Grace & Sovereignty (Audio Master)",
    speaker: "Charles H. Spurgeon",
    speakerSlug: "charles-spurgeon",
    speakerTitle: "Metropolitan Tabernacle",
    speakerImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    summary: "Spurgeon's celebrated discourse on the matching glory of sovereign grace in Jesus Christ.",
    duration: "52:20",
    durationSeconds: 3140,
    mediaType: "audio",
    mediaUrl: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230103.mp3",
    mp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230103.mp3",
    cdnMp3Url: "https://traffic.libsyn.com/secure/renewingyourmind/RYM20230103.mp3",
    youtubeId: "",
    url: "https://www.sermonindex.net",
    topics: [{ name: "Grace", slug: "grace" }, { name: "Sovereignty", slug: "sovereignty" }],
    scriptureRef: "Romans 9:15-16",
    thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop&q=80"
  }
];
var SermonIndexService = class {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.CACHE_TTL_MS = 24 * 60 * 60 * 1e3;
    // 24 hours
    this.BASE_URL = "https://api.sermonindex.net/v2";
  }
  getCached(key) {
    const entry = this.cache.get(key);
    if (entry && Date.now() - entry.timestamp < this.CACHE_TTL_MS) {
      return entry.data;
    }
    return null;
  }
  setCache(key, data) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
  /**
   * Fetch sermons preached on a specific scripture passage
   * e.g., book: "John" or "JHN", chapter: 3, verse: 16
   */
  async getSermonsByScripture(book, chapter, verse) {
    const bookCode = BIBLE_BOOK_TO_CODE[book] || (book.length === 3 ? book.toUpperCase() : "JHN");
    const ch = String(chapter);
    const vr = verse ? String(verse).split("-")[0] : "";
    const cacheKey = `scripture_${bookCode}_${ch}_${vr}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;
    const url = vr ? `${this.BASE_URL}/scripture/${bookCode}/${ch}/${vr}` : `${this.BASE_URL}/scripture/${bookCode}/${ch}`;
    try {
      const res = await fetch(`${url}.json`, {
        headers: { "Accept": "application/json", "User-Agent": "KingJamesAIStudio/2.0" },
        signal: AbortSignal.timeout(6e3)
      });
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.sermons || data.results || [data];
        const mapped = this._normalizeItems(items);
        if (mapped.length > 0) {
          this.setCache(cacheKey, mapped);
          return mapped;
        }
      }
    } catch (err) {
      console.warn(`SermonIndex API scripture lookup failed for ${bookCode} ${ch}:${vr}, using curated fallback:`, err);
    }
    const curatedMatches = SERMONINDEX_CURATED_ARCHIVE.filter((item) => {
      if (!item.scripture) return false;
      return item.scripture.some(
        (s) => s.bookId.toUpperCase() === bookCode.toUpperCase() && String(s.chapter) === ch && (!vr || !s.verse || String(s.verse) === vr)
      );
    });
    if (curatedMatches.length > 0) {
      return curatedMatches;
    }
    return SERMONINDEX_CURATED_ARCHIVE.slice(0, 4);
  }
  /**
   * Fetch sermons by topic/category
   * e.g., topic: "prayer", "revival", "holiness", "grace"
   */
  async getSermonsByTopic(topicSlug) {
    const slug = topicSlug.toLowerCase().trim().replace(/\s+/g, "-");
    const cacheKey = `topic_${slug}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;
    try {
      const res = await fetch(`${this.BASE_URL}/topics/${slug}.json`, {
        headers: { "Accept": "application/json", "User-Agent": "KingJamesAIStudio/2.0" },
        signal: AbortSignal.timeout(6e3)
      });
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.sermons || data.results || [];
        const mapped = this._normalizeItems(items);
        if (mapped.length > 0) {
          this.setCache(cacheKey, mapped);
          return mapped;
        }
      }
    } catch (err) {
      console.warn(`SermonIndex API topic lookup failed for topic ${slug}, using curated fallback:`, err);
    }
    const curated = SERMONINDEX_CURATED_ARCHIVE.filter(
      (s) => s.topics?.some((t) => t.slug.includes(slug) || slug.includes(t.slug))
    );
    return curated.length > 0 ? curated : SERMONINDEX_CURATED_ARCHIVE;
  }
  /**
   * Fetch sermons by speaker slug
   * e.g., "leonard-ravenhill", "paul-washer", "charles-spurgeon"
   */
  async getSermonsBySpeaker(speakerSlug) {
    const slug = speakerSlug.toLowerCase().trim();
    const cacheKey = `speaker_${slug}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;
    try {
      const res = await fetch(`${this.BASE_URL}/speakers/${slug}.json`, {
        headers: { "Accept": "application/json", "User-Agent": "KingJamesAIStudio/2.0" },
        signal: AbortSignal.timeout(6e3)
      });
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.sermons || data.results || [];
        const mapped = this._normalizeItems(items);
        if (mapped.length > 0) {
          this.setCache(cacheKey, mapped);
          return mapped;
        }
      }
    } catch (err) {
      console.warn(`SermonIndex API speaker lookup failed for ${slug}, using curated fallback:`, err);
    }
    const curated = SERMONINDEX_CURATED_ARCHIVE.filter(
      (s) => s.speakerSlug === slug || s.speaker.toLowerCase().replace(/[^a-z]/g, "").includes(slug.replace(/[^a-z]/g, ""))
    );
    return curated.length > 0 ? curated : SERMONINDEX_CURATED_ARCHIVE;
  }
  /**
   * Search feed with filtering across topics, speakers, scriptures, and search queries
   */
  async searchFeed(options) {
    const { q, topic, speaker, scripture } = options;
    if (scripture) {
      const parts = scripture.trim().split(/\s+/);
      const book = parts.slice(0, -1).join(" ") || parts[0];
      const ref = parts[parts.length - 1] || "1:1";
      const [chapter, verse] = ref.split(":");
      if (chapter) {
        return this.getSermonsByScripture(book, chapter, verse);
      }
    }
    if (speaker && speaker !== "all") {
      const speakerObj = SERMONINDEX_SPEAKERS_CATALOG.find(
        (s) => s.id === speaker || s.slug === speaker || s.name.toLowerCase() === speaker.toLowerCase()
      );
      const slug = speakerObj ? speakerObj.slug : speaker.toLowerCase().replace(/\s+/g, "-");
      const results = await this.getSermonsBySpeaker(slug);
      if (results.length > 0) return results;
    }
    if (topic && topic !== "All Topics" && topic !== "all") {
      const topicObj = SERMONINDEX_TOPICS_CATALOG.find(
        (t) => t.name.toLowerCase() === topic.toLowerCase() || t.slug.toLowerCase() === topic.toLowerCase()
      );
      const slug = topicObj ? topicObj.slug : topic.toLowerCase().replace(/\s+/g, "-");
      const results = await this.getSermonsByTopic(slug);
      if (results.length > 0) return results;
    }
    let items = [...SERMONINDEX_CURATED_ARCHIVE];
    if (q) {
      const term = q.toLowerCase();
      items = items.filter(
        (s) => s.title.toLowerCase().includes(term) || s.speaker.toLowerCase().includes(term) || s.summary?.toLowerCase().includes(term) || s.topics?.some((t) => t.name.toLowerCase().includes(term)) || s.scripture?.some((sc) => `${sc.bookId} ${sc.chapter}:${sc.verse || ""}`.toLowerCase().includes(term))
      );
    }
    return items;
  }
  getSpeakers() {
    return SERMONINDEX_SPEAKERS_CATALOG;
  }
  getTopics() {
    return SERMONINDEX_TOPICS_CATALOG;
  }
  _normalizeItems(items) {
    if (!Array.isArray(items)) return [];
    return items.map((item) => {
      const id = item.id || `si-${Math.random().toString(36).substring(2, 9)}`;
      const durationSeconds = this._parseDurationSeconds(item.duration);
      const isVideo = item.mediaType === "video" || Boolean(item.youtubeId) || Boolean(item.mp4Url) || Boolean(item.videoUrl) || typeof item.mediaUrl === "string" && /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(item.mediaUrl) || typeof item.url === "string" && (item.url.includes("youtube") || item.url.includes("youtu.be"));
      const youtubeId = item.youtubeId || (typeof item.mediaUrl === "string" && item.mediaUrl.includes("youtu") ? this._extractYoutubeId(item.mediaUrl) : void 0);
      const mp4Url = item.mp4Url || (typeof item.mediaUrl === "string" && /\.(mp4|webm|mov)(\?.*)?$/i.test(item.mediaUrl) ? item.mediaUrl : void 0);
      return {
        id,
        title: item.title || "Untitled Sermon",
        speaker: item.speaker || "Preacher",
        speakerSlug: item.speakerSlug || item.speaker?.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        speakerTitle: item.speakerTitle || item.title_role,
        speakerImage: item.speakerImage || item.portraitUrl || item.thumbnailUrl || "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80",
        summary: item.summary || item.description || "",
        duration: typeof item.duration === "string" ? item.duration : "45:00",
        durationSeconds,
        mediaType: isVideo ? "video" : "audio",
        mediaUrl: item.mediaUrl,
        mp4Url,
        videoUrl: item.videoUrl || mp4Url,
        youtubeId,
        mp3Url: item.cdnMp3Url || item.mp3Url || (isVideo ? void 0 : `https://archive.org/download/SERMONINDEX_${id}/${id}.mp3`),
        cdnMp3Url: item.cdnMp3Url || item.mp3Url,
        vttUrl: item.vttUrl,
        url: item.url || `https://www.sermonindex.net/modules/mydownloads/singlefile.php?lid=${id}`,
        topics: Array.isArray(item.topics) ? item.topics : [{ name: "Sermon", slug: "sermon" }],
        scripture: Array.isArray(item.scripture) ? item.scripture : [],
        scriptureRef: item.scriptureRef || (Array.isArray(item.scripture) && item.scripture.length > 0 ? `${item.scripture[0].bookId} ${item.scripture[0].chapter}:${item.scripture[0].verse || ""}`.trim() : void 0),
        outline: item.outline,
        keyQuotes: item.keyQuotes
      };
    });
  }
  _extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : void 0;
  }
  _parseDurationSeconds(duration) {
    if (typeof duration === "number") return duration;
    if (typeof duration === "string") {
      const parts = duration.split(":").map(Number);
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (parts.length === 2) return parts[0] * 60 + parts[1];
    }
    return 2700;
  }
};
var sermonIndexService = new SermonIndexService();

// server/audioService.ts
var import_node_buffer = require("node:buffer");
var audioCache = /* @__PURE__ */ new Map();
var MAX_CACHE_SIZE = 500;
function pcmToWavBuffer(pcmBuffer, sampleRate = 24e3, numChannels = 1, bitsPerSample = 16) {
  const header = import_node_buffer.Buffer.alloc(44);
  const dataSize = pcmBuffer.length;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);
  return import_node_buffer.Buffer.concat([header, pcmBuffer]);
}
function chunkTextForTts(text, maxChunkLen = 180) {
  const words = text.split(/\s+/);
  const chunks = [];
  let current = "";
  for (const word of words) {
    if (!word) continue;
    if ((current + " " + word).trim().length > maxChunkLen) {
      if (current.trim()) chunks.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current.trim()) {
    chunks.push(current.trim());
  }
  return chunks;
}
async function fetchGoogleVoiceStream(text) {
  const chunks = chunkTextForTts(text, 180);
  const buffers = [];
  for (const chunk of chunks) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=en-US&client=tw-ob`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      }
    });
    if (!res.ok) {
      throw new Error(`Google Voice Stream responded with status ${res.status}`);
    }
    const arrayBuf = await res.arrayBuffer();
    buffers.push(import_node_buffer.Buffer.from(arrayBuf));
  }
  return import_node_buffer.Buffer.concat(buffers);
}
async function synthesizeBibleAudio(rawText) {
  const cleanText = rawText.replace(/###|##|\*|_|\[Suggested Questions\][\s\S]*$/g, "").replace(/Verse \d+\.\s*/gi, "").replace(/\s+/g, " ").trim();
  if (!cleanText) {
    throw new Error("Text is required for audio synthesis");
  }
  const cacheKey = cleanText.slice(0, 300);
  const cached = audioCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  if (process.env.GEMINI_API_KEY) {
    try {
      const { GoogleGenAI: GoogleGenAI2 } = await import("@google/genai");
      const ai = new GoogleGenAI2({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });
      const prompt = `Read the following biblical text with a noble, reverent, and crystal-clear voice: ${cleanText.slice(0, 1200)}`;
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Zephyr" }
            }
          }
        }
      });
      const pcmBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (pcmBase64) {
        const pcmBuffer = import_node_buffer.Buffer.from(pcmBase64, "base64");
        const wavBuffer = pcmToWavBuffer(pcmBuffer, 24e3);
        const result = {
          audio: wavBuffer.toString("base64"),
          format: "audio/wav",
          mimeType: "audio/wav",
          sampleRate: 24e3,
          source: "gemini-tts"
        };
        if (audioCache.size >= MAX_CACHE_SIZE) {
          const firstKey = audioCache.keys().next().value;
          if (firstKey) audioCache.delete(firstKey);
        }
        audioCache.set(cacheKey, result);
        return result;
      }
    } catch (geminiErr) {
      console.warn("Gemini TTS preview quota/busy, activating high-fidelity voice stream fallback:", geminiErr?.message || geminiErr);
    }
  }
  try {
    const mp3Buffer = await fetchGoogleVoiceStream(cleanText);
    const result = {
      audio: mp3Buffer.toString("base64"),
      format: "audio/mpeg",
      mimeType: "audio/mpeg",
      sampleRate: 24e3,
      source: "high-def-voice-stream"
    };
    if (audioCache.size >= MAX_CACHE_SIZE) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, result);
    return result;
  } catch (streamErr) {
    console.error("All TTS streams failed:", streamErr);
    throw new Error("Unable to synthesize audio. Please check network connection.");
  }
}

// services/youtubeSyncService.ts
var import_fs3 = __toESM(require("fs"), 1);
var import_path3 = __toESM(require("path"), 1);
var UPLOAD_YOUTUBE_DIRS = [
  import_path3.default.join(process.cwd(), "public", "uploads", "youtube_series"),
  "/home/ubuntu/Aura-prod/public/uploads/youtube_series",
  "/app/applet/public/uploads/youtube_series"
];
var PRIMARY_YOUTUBE_DIR = import_path3.default.join(process.cwd(), "public", "uploads", "youtube_series");
var MEDIA_URL_PREFIX = "/uploads/youtube_series";
function parseSermonFilename(filename) {
  const ext = import_path3.default.extname(filename);
  let base = import_path3.default.basename(filename, ext).trim();
  base = base.replace(/\[[a-zA-Z0-9_\-\s]{6,}\]$/g, "").trim();
  base = base.replace(/\([0-9]{3,4}p\)/gi, "").trim();
  base = base.replace(/\[[0-9]{3,4}p\]/gi, "").trim();
  base = base.replace(/\(official\s*(?:video|audio)?\)/gi, "").trim();
  let normalized = base.replace(/\s*[–—]\s*/g, " - ").replace(/\s*\|\s*/g, " - ").trim();
  let channel = "YouTube Series";
  let series = "";
  let seriesPart = 1;
  let speaker = "Community Ministry";
  let title = base;
  let scriptureRef = "";
  let description = "YouTube sermon series recording";
  const partMatch = normalized.match(/(?:Principle|Part|Pt\.?|Episode|Ep\.?|Session|Week|Lesson)\s*(\d+)/i);
  if (partMatch) {
    seriesPart = parseInt(partMatch[1], 10);
  }
  if (/pathway\s*to\s*recovery|recovery|spiritual\s*principle/i.test(normalized) || /principle\s*\d+/i.test(normalized)) {
    series = "Pathway to Recovery";
    channel = "Pathway to Recovery";
    speaker = "Tex";
  }
  if (/tony\s*evans/i.test(normalized)) {
    speaker = "Dr. Tony Evans";
    channel = "Dr. Tony Evans";
  }
  if (/charles\s*stanley/i.test(normalized)) {
    speaker = "Dr. Charles Stanley";
    channel = "In Touch Ministries";
  }
  if (/lighthouse\s*baptist/i.test(normalized)) {
    channel = "Lighthouse Baptist Church";
    speaker = "Pastor Paul";
  }
  const parts = normalized.split(/\s+-\s+/).map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 5) {
    channel = parts[0] || channel;
    series = parts[1] || series;
    title = parts[3] || parts[2];
    speaker = parts[4] || speaker;
  } else if (parts.length === 4) {
    if (/part|principle|ep/i.test(parts[1])) {
      series = parts[0];
      title = parts[2];
      speaker = parts[3];
    } else {
      channel = parts[0];
      series = parts[1];
      title = parts[2];
      speaker = parts[3];
    }
  } else if (parts.length === 3) {
    if (/part|principle/i.test(parts[2])) {
      series = parts[0];
      title = parts[1];
    } else {
      series = parts[0];
      title = parts[1];
      speaker = parts[2];
    }
  } else if (parts.length === 2) {
    if (speaker !== "Community Ministry" && !series) {
      title = parts[1];
    } else {
      speaker = parts[0];
      title = parts[1];
    }
  }
  title = title.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  if (!series && /principle\s*\d+/i.test(title)) {
    series = "Pathway to Recovery";
  }
  const mediaType = ext.toLowerCase() === ".mp3" || ext.toLowerCase() === ".m4a" || ext.toLowerCase() === ".wav" ? "audio" : "video";
  return {
    title,
    speaker,
    series,
    seriesPart,
    channel,
    mediaType,
    scriptureRef,
    description: `${description} - ${title}`
  };
}
function syncYoutubeSermons(db2) {
  const result = {
    success: true,
    directory: PRIMARY_YOUTUBE_DIR,
    totalFiles: 0,
    addedCount: 0,
    existingCount: 0,
    addedTitles: [],
    allFoundFiles: [],
    errors: [],
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  let activeDir = PRIMARY_YOUTUBE_DIR;
  for (const candidate of UPLOAD_YOUTUBE_DIRS) {
    if (import_fs3.default.existsSync(candidate)) {
      activeDir = candidate;
      break;
    }
  }
  if (!import_fs3.default.existsSync(activeDir)) {
    try {
      import_fs3.default.mkdirSync(activeDir, { recursive: true });
      console.log(`[YouTube Sync] Created directory: ${activeDir}`);
    } catch (e) {
      console.error(`[YouTube Sync] Failed to create dir: ${activeDir}`, e);
      result.errors.push(`Directory creation error: ${e.message}`);
      result.success = false;
      return result;
    }
  }
  result.directory = activeDir;
  let fileList = [];
  try {
    fileList = import_fs3.default.readdirSync(activeDir);
  } catch (e) {
    result.errors.push(`Failed to read directory: ${e.message}`);
    result.success = false;
    return result;
  }
  const mediaFiles = fileList.filter((f) => {
    if (f.startsWith(".")) return false;
    return /\.(mp4|mkv|webm|mov|avi|mp3|m4a|wav|m4v)$/i.test(f);
  });
  result.totalFiles = mediaFiles.length;
  result.allFoundFiles = mediaFiles;
  if (mediaFiles.length === 0) {
    console.log(`[YouTube Sync] No video or audio files in ${activeDir}. Ready for files.`);
    return result;
  }
  console.log(`[YouTube Sync] Found ${mediaFiles.length} media files in ${activeDir}. Cataloguing...`);
  const existingSermons = db2.getAllSermons();
  for (const file of mediaFiles) {
    try {
      const mediaUrl = `${MEDIA_URL_PREFIX}/${file}`;
      const existing = existingSermons.find(
        (s) => s.mediaUrl === mediaUrl || s.mediaUrl?.endsWith(`/${file}`)
      );
      if (existing) {
        result.existingCount++;
        continue;
      }
      if (activeDir !== PRIMARY_YOUTUBE_DIR && !import_fs3.default.existsSync(import_path3.default.join(PRIMARY_YOUTUBE_DIR, file))) {
        try {
          if (!import_fs3.default.existsSync(PRIMARY_YOUTUBE_DIR)) {
            import_fs3.default.mkdirSync(PRIMARY_YOUTUBE_DIR, { recursive: true });
          }
          const srcFile = import_path3.default.join(activeDir, file);
          const destFile = import_path3.default.join(PRIMARY_YOUTUBE_DIR, file);
          import_fs3.default.copyFileSync(srcFile, destFile);
        } catch (copyErr) {
          console.warn(`[YouTube Sync] Note: could not copy to primary uploads dir:`, copyErr);
        }
      }
      const meta = parseSermonFilename(file);
      const dateRecorded = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      db2.createSermon(
        meta.title,
        meta.speaker,
        meta.series || void 0,
        meta.scriptureRef || void 0,
        meta.description,
        meta.mediaType,
        mediaUrl,
        60,
        // estimate duration default (can be updated by playback)
        dateRecorded,
        "",
        // thumbnailUrl
        meta.channel,
        meta.seriesPart
      );
      result.addedCount++;
      result.addedTitles.push(`${meta.title} (${meta.series || meta.channel}, Part ${meta.seriesPart})`);
      console.log(`[YouTube Sync] \u2705 Catalogued: "${meta.title}" -> Channel: ${meta.channel}, Series: ${meta.series}, Part: ${meta.seriesPart}, Speaker: ${meta.speaker}`);
    } catch (itemErr) {
      console.error(`[YouTube Sync] Error processing file "${file}":`, itemErr);
      result.errors.push(`File "${file}": ${itemErr.message}`);
    }
  }
  console.log(`[YouTube Sync] Complete! Added: ${result.addedCount}, Existing: ${result.existingCount}, Total: ${result.totalFiles}`);
  return result;
}
var watcherInitialized = false;
var lastKnownFileCount = -1;
function startYoutubeFolderWatcher(db2) {
  if (watcherInitialized) return;
  watcherInitialized = true;
  console.log(`[YouTube Sync] Initializing real-time folder scanner on startup...`);
  try {
    const initialSync = syncYoutubeSermons(db2);
    lastKnownFileCount = initialSync.totalFiles;
  } catch (e) {
    console.error(`[YouTube Sync] Initial startup sync error:`, e);
  }
  for (const dir of UPLOAD_YOUTUBE_DIRS) {
    if (import_fs3.default.existsSync(dir)) {
      try {
        let debounceTimer = null;
        import_fs3.default.watch(dir, (_eventType, filename) => {
          if (filename && (filename.startsWith(".") || !/\.(mp4|mkv|webm|mov|avi|mp3|m4a|wav|m4v)$/i.test(filename))) {
            return;
          }
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            console.log(`[YouTube Sync] Folder change detected in ${dir}! Running sync now...`);
            syncYoutubeSermons(db2);
          }, 1500);
        });
        console.log(`[YouTube Sync] Watching directory for live additions: ${dir}`);
      } catch (watchErr) {
        console.warn(`[YouTube Sync] fs.watch not supported on ${dir}:`, watchErr);
      }
    }
  }
  setInterval(() => {
    try {
      let activeDir = PRIMARY_YOUTUBE_DIR;
      for (const d of UPLOAD_YOUTUBE_DIRS) {
        if (import_fs3.default.existsSync(d)) {
          activeDir = d;
          break;
        }
      }
      if (import_fs3.default.existsSync(activeDir)) {
        const currentFiles = import_fs3.default.readdirSync(activeDir).filter((f) => !f.startsWith(".") && /\.(mp4|mkv|webm|mov|avi|mp3|m4a|wav|m4v)$/i.test(f));
        if (currentFiles.length !== lastKnownFileCount) {
          console.log(`[YouTube Sync Heartbeat] File count changed from ${lastKnownFileCount} to ${currentFiles.length}. Running sync...`);
          lastKnownFileCount = currentFiles.length;
          syncYoutubeSermons(db2);
        }
      }
    } catch (heartbeatErr) {
    }
  }, 1e4);
}

// routes/bible.ts
var router = (0, import_express.Router)();
var kjvLoader2 = new kjv_loader_default();
kjvLoader2.load();
var uploadDir = import_path4.default.join(process.cwd(), "public", "uploads", "sermons");
if (!import_fs4.default.existsSync(uploadDir)) import_fs4.default.mkdirSync(uploadDir, { recursive: true });
var storage = import_multer.default.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = import_path4.default.extname(file.originalname) || ".webm";
    cb(null, `sermon_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`);
  }
});
var upload = (0, import_multer.default)({ storage, limits: { fileSize: 500 * 1024 * 1024 } });
function createBibleRoutes(db2) {
  const kingJamesService = new KingJamesService(db2);
  router.post("/onboard", (req, res) => {
    const { userGoals, userInterests } = req.body;
    try {
      const onboardingResponse = kingJamesService.onboard(userGoals, userInterests);
      res.json(onboardingResponse);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate onboarding response" });
    }
  });
  router.post("/share", (req, res) => {
    const { verseRef, passageText, takeaway } = req.body;
    if (!verseRef || !passageText || !takeaway) {
      return res.status(400).json({ error: "Missing verseRef, passageText, or takeaway" });
    }
    try {
      const sharePayload = kingJamesService.formatSharePayload(verseRef, passageText, takeaway);
      res.json(sharePayload);
    } catch (error) {
      res.status(500).json({ error: "Failed to format share payload" });
    }
  });
  router.get("/verse", async (req, res) => {
    const { book, chapter, verse } = req.query;
    if (!book || !chapter || !verse) {
      return res.status(400).json({ error: "Missing book, chapter, or verse parameter" });
    }
    try {
      const verseData = await kjvLoader2.getOrFetchVerse(
        book,
        chapter,
        verse
      );
      res.json(verseData);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve verse" });
    }
  });
  router.get("/chapter", async (req, res) => {
    const { book, chapter } = req.query;
    if (!book || !chapter) {
      return res.status(400).json({ error: "Missing book or chapter parameter" });
    }
    try {
      const chapterData = await kjvLoader2.getOrFetchChapter(
        book,
        chapter
      );
      res.json(chapterData);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve chapter" });
    }
  });
  router.get("/search", (req, res) => {
    const { q } = req.query;
    if (!q || typeof q !== "string") {
      return res.json([]);
    }
    try {
      const results = kjvLoader2.search(q);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: "Search failed" });
    }
  });
  router.get("/study", async (req, res) => {
    const { book, chapter, verse } = req.query;
    const bookStr = book || "Genesis";
    const chapterStr = chapter || "1";
    const verseStr = verse || "1";
    try {
      const breakdown = await kingJamesService.generateStudyBreakdown(
        bookStr,
        chapterStr,
        verseStr
      );
      res.json(breakdown);
    } catch (error) {
      console.error("Error generating study breakdown:", error);
      res.json({
        passageText: `"${bookStr} ${chapterStr}:${verseStr}" \u2014 King James Version`,
        bookSummary: {
          author: "Biblical Author",
          era: "Ancient Antiquity",
          audience: "God's Covenant People"
        },
        historicalContext: {
          mindsetThen: "The original audience lived with deep reverence for God's revealed covenant.",
          originalIssue: `Spiritual encouragement and divine instruction in ${bookStr} ${chapterStr}:${verseStr}.`
        },
        thenVsNow: {
          then: "Believers rested in God's promises amid adversity.",
          now: "We apply the eternal truth of Christ to modern life challenges."
        },
        dailyApplication: [
          "Meditate on this scripture throughout your day.",
          "Bring your prayers and concerns to the Lord with thanksgiving.",
          "Share God's Word and love with someone in need."
        ],
        prayer: `Lord, grant me wisdom to understand and live out the truth of ${bookStr} ${chapterStr}:${verseStr}. Amen.`
      });
    }
  });
  router.get("/courses", (_req, res) => {
    try {
      res.json(db2.getAllCourses());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });
  router.post("/courses", (req, res) => {
    const { title, description, coverImage, category, level } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    try {
      const course = db2.createCourse(title, description, coverImage, category, level);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to create course" });
    }
  });
  router.put("/courses/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, coverImage, category, level } = req.body;
    try {
      const updated = db2.updateCourse(id, { title, description, coverImage, category, level });
      if (!updated) return res.status(404).json({ error: "Course not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update course" });
    }
  });
  router.delete("/courses/:id", (req, res) => {
    try {
      const deleted = db2.deleteCourse(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Course not found" });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete course" });
    }
  });
  router.get("/courses/:id/lessons", (req, res) => {
    const { id } = req.params;
    try {
      const course = db2.getCourse(id);
      if (!course) return res.status(404).json({ error: "Course not found" });
      const lessons = db2.getLessonsByCourse(id);
      res.json({ course, lessons });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });
  router.post("/courses/:id/lessons", (req, res) => {
    const { id } = req.params;
    const { title, scriptureRef, notes, mediaType, mediaUrl } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    try {
      const course = db2.getCourse(id);
      if (!course) return res.status(404).json({ error: "Course not found" });
      const lesson = db2.createLesson(id, title, void 0, scriptureRef, void 0, mediaType, mediaUrl, notes);
      res.status(201).json(lesson);
    } catch (error) {
      res.status(500).json({ error: "Failed to create lesson" });
    }
  });
  router.delete("/lessons/:id", (req, res) => {
    try {
      const deleted = db2.deleteLesson(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Lesson not found" });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete lesson" });
    }
  });
  router.post("/ask", async (req, res) => {
    const { question, history, mode } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }
    try {
      const response = await Promise.race([
        kingJamesService.answerQuestion(question, history, mode),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 15e3))
      ]);
      if (!response) {
        throw new Error("No response generated");
      }
      res.json(response);
    } catch (error) {
      console.warn("KingJamesService error, using direct robust fallback:", error);
      res.json({
        answer: `### Biblical Reflection Regarding: "${question}"

*"Thy word is a lamp unto my feet, and a light unto my path."* (Psalm 119:105)

God's holy Word speaks with living power to this inquiry. In 2 Timothy 3:16-17, the scriptures are given for our doctrine, reproof, correction, and instruction in righteousness. Continue steadfast in prayer and meditation on the King James Bible, trusting the Holy Spirit to grant thee deeper discernment and wisdom.`,
        versesCited: ["Psalm 119:105", "2 Timothy 3:16-17"],
        suggestedQuestions: [
          "What are key scripture cross-references for this topic?",
          "What is the original Greek or Hebrew background?",
          "How can this be applied to daily Christian walk?"
        ]
      });
    }
  });
  router.post("/audio", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || !text.trim()) {
        return res.status(400).json({ error: "Text is required for audio synthesis" });
      }
      const result = await synthesizeBibleAudio(text);
      res.json({
        audio: result.audio,
        audioData: result.audio,
        format: result.format,
        mimeType: result.mimeType,
        sampleRate: result.sampleRate,
        source: result.source
      });
    } catch (err) {
      console.error("Bible audio synthesis error:", err);
      res.status(500).json({ error: err.message || "Error generating audio" });
    }
  });
  router.post("/upload", upload.single("file"), (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const url = `/uploads/sermons/${req.file.filename}`;
      res.json({ url, filename: req.file.filename, size: req.file.size });
    } catch (err) {
      console.error("File upload error:", err);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });
  router.post("/media/upload", upload.single("file"), (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const { title, speaker, series, seriesPart, channel, scriptureRef, description, duration, thumbnailUrl } = req.body;
      const mediaUrl = `/uploads/sermons/${req.file.filename}`;
      const ext = import_path4.default.extname(req.file.originalname).toLowerCase();
      const mediaType = [".mp3", ".m4a", ".wav"].includes(ext) ? "audio" : "video";
      const sermon = db2.createSermon(
        title || req.file.originalname.replace(/\.[^/.]+$/, ""),
        speaker || void 0,
        series || void 0,
        scriptureRef || void 0,
        description || void 0,
        mediaType,
        mediaUrl,
        duration ? parseInt(duration, 10) : void 0,
        (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        thumbnailUrl || void 0,
        channel || void 0,
        seriesPart ? parseInt(seriesPart, 10) : void 0
      );
      res.status(201).json({ sermon, mediaUrl, url: mediaUrl });
    } catch (error) {
      console.error("Failed to upload media:", error);
      res.status(500).json({ error: "Failed to upload media" });
    }
  });
  router.get("/sermons", (req, res) => {
    const { speaker, scripture, series } = req.query;
    try {
      let sermons;
      if (speaker) {
        sermons = db2.getSermonsBySpeaker(speaker);
      } else if (scripture) {
        sermons = db2.getSermonsByScripture(scripture);
      } else if (series) {
        sermons = db2.getSermonsBySeries(series);
      } else {
        sermons = db2.getAllSermons();
      }
      res.json(sermons || []);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sermons" });
    }
  });
  router.post("/sermons", (req, res) => {
    const { title, speaker, series, seriesPart, channel, scriptureRef, description, mediaType, mediaUrl, duration, dateRecorded, thumbnailUrl } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    try {
      const sermon = db2.createSermon(
        title,
        speaker,
        series,
        scriptureRef,
        description,
        mediaType || "video",
        mediaUrl || "",
        duration,
        dateRecorded || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        thumbnailUrl || void 0,
        channel || void 0,
        seriesPart ? parseInt(seriesPart, 10) : void 0
      );
      res.status(201).json(sermon);
    } catch (error) {
      res.status(500).json({ error: "Failed to create sermon" });
    }
  });
  router.put("/sermons/:id", (req, res) => {
    try {
      const updated = db2.updateSermon(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Sermon not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update sermon" });
    }
  });
  router.delete("/sermons/:id", (req, res) => {
    try {
      const existing = db2.getSermonById(req.params.id);
      if (!existing) return res.status(404).json({ error: "Sermon not found" });
      if (existing.mediaUrl && existing.mediaUrl.startsWith("/uploads/sermons/")) {
        const filePath = import_path4.default.join(process.cwd(), "public", existing.mediaUrl);
        if (import_fs4.default.existsSync(filePath)) {
          try {
            import_fs4.default.unlinkSync(filePath);
          } catch (e) {
            console.warn("Failed to delete file from disk:", e);
          }
        }
      }
      const success = db2.deleteSermon(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete sermon" });
    }
  });
  const handleSync = (_req, res) => {
    try {
      const syncResult = syncYoutubeSermons(db2);
      res.json({
        message: syncResult.addedCount > 0 ? `Successfully synced ${syncResult.addedCount} new YouTube sermons into database!` : `Sync completed. No new sermon files found (${syncResult.existingCount} already catalogued).`,
        ...syncResult
      });
    } catch (e) {
      console.error("[Sync Route Error]:", e);
      res.status(500).json({ error: e.message || "Failed to sync sermons" });
    }
  };
  router.post("/sermons/sync", handleSync);
  router.get("/sermons/sync", handleSync);
  router.post("/sermons/:id/push-to-course", (req, res) => {
    const { courseId, lessonTitle } = req.body;
    if (!courseId) return res.status(400).json({ error: "courseId is required" });
    try {
      const sermon = db2.getSermonById(req.params.id);
      if (!sermon) return res.status(404).json({ error: "Sermon not found" });
      const lesson = db2.createLesson(
        courseId,
        lessonTitle || sermon.title,
        sermon.description || "",
        sermon.scriptureRef || "",
        void 0,
        "upload",
        sermon.mediaUrl || "",
        sermon.speaker ? `Speaker: ${sermon.speaker}` : void 0
      );
      db2.updateSermon(sermon.id, { courseLessonId: lesson.id });
      res.status(201).json({ success: true, lesson });
    } catch (error) {
      res.status(500).json({ error: "Failed to push sermon to course" });
    }
  });
  router.get("/sermonindex/speakers", (_req, res) => {
    try {
      res.json(sermonIndexService.getSpeakers());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SermonIndex speakers" });
    }
  });
  router.get("/sermonindex/topics", (_req, res) => {
    try {
      res.json(sermonIndexService.getTopics());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SermonIndex topics" });
    }
  });
  router.get("/sermonindex/scripture/:book/:chapter/:verse?", async (req, res) => {
    try {
      const { book, chapter, verse } = req.params;
      const sermons = await sermonIndexService.getSermonsByScripture(book, chapter, verse);
      res.json(sermons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sermons by scripture" });
    }
  });
  router.get("/sermonindex/speaker/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const sermons = await sermonIndexService.getSermonsBySpeaker(slug);
      res.json(sermons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sermons by speaker" });
    }
  });
  router.get("/sermonindex/topic/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const sermons = await sermonIndexService.getSermonsByTopic(slug);
      res.json(sermons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sermons by topic" });
    }
  });
  router.get("/sermonindex/feed", async (req, res) => {
    try {
      const { q, topic, speaker, scripture } = req.query;
      const items = await sermonIndexService.searchFeed({
        q: typeof q === "string" ? q : void 0,
        topic: typeof topic === "string" ? topic : void 0,
        speaker: typeof speaker === "string" ? speaker : void 0,
        scripture: typeof scripture === "string" ? scripture : void 0
      });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to query SermonIndex feed" });
    }
  });
  router.get("/sermonaudio/speakers", (_req, res) => {
    try {
      res.json(sermonIndexService.getSpeakers());
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch speakers" });
    }
  });
  router.get("/sermonaudio/feed", async (req, res) => {
    const { speaker, category, q } = req.query;
    try {
      const items = await sermonIndexService.searchFeed({
        q: typeof q === "string" ? q : void 0,
        topic: typeof category === "string" ? category : void 0,
        speaker: typeof speaker === "string" ? speaker : void 0
      });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to query feed" });
    }
  });
  return router;
}

// server/bible/models.ts
var import_better_sqlite3 = __toESM(require("better-sqlite3"), 1);
var import_crypto = require("crypto");
var BibleStudyDB = class {
  constructor(dbPath) {
    this.db = new import_better_sqlite3.default(dbPath);
    this.db.pragma("journal_mode = WAL");
  }
  // Course operations
  createCourse(title, description, coverImage, category, level) {
    const id = (0, import_crypto.randomUUID)();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const stmt = this.db.prepare(
      "INSERT INTO courses (id, title, description, coverImage, category, level, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    stmt.run(id, title, description || null, coverImage || null, category || null, level || null, now, now);
    return { id, title, description, coverImage, category, level, createdAt: now, updatedAt: now };
  }
  getCourse(id) {
    const stmt = this.db.prepare("SELECT * FROM courses WHERE id = ?");
    return stmt.get(id);
  }
  getAllCourses() {
    const stmt = this.db.prepare("SELECT * FROM courses ORDER BY createdAt DESC");
    return stmt.all();
  }
  // Lesson operations
  createLesson(courseId, title, content, scriptureRef, quizJson, mediaType, mediaUrl, notes) {
    const id = (0, import_crypto.randomUUID)();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const stmt = this.db.prepare(
      "INSERT INTO lessons (id, courseId, title, content, scriptureRef, quizJson, mediaType, mediaUrl, notes, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    stmt.run(id, courseId, title, content || null, scriptureRef || null, quizJson || null, mediaType || null, mediaUrl || null, notes || null, now, now);
    return { id, courseId, title, content, scriptureRef, quizJson, mediaType, mediaUrl, notes, createdAt: now, updatedAt: now };
  }
  getLessonsByCourse(courseId) {
    const stmt = this.db.prepare("SELECT * FROM lessons WHERE courseId = ? ORDER BY order_index ASC");
    return stmt.all(courseId);
  }
  getLesson(id) {
    const stmt = this.db.prepare("SELECT * FROM lessons WHERE id = ?");
    return stmt.get(id);
  }
  deleteLesson(id) {
    const result = this.db.prepare("DELETE FROM lessons WHERE id = ?").run(id);
    return result.changes > 0;
  }
  updateCourse(id, updates) {
    const course = this.getCourse(id);
    if (!course) return null;
    const title = updates.title !== void 0 ? updates.title : course.title;
    const description = updates.description !== void 0 ? updates.description : course.description;
    const coverImage = updates.coverImage !== void 0 ? updates.coverImage : course.coverImage;
    const category = updates.category !== void 0 ? updates.category : course.category;
    const level = updates.level !== void 0 ? updates.level : course.level;
    const updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    this.db.prepare(`
      UPDATE courses
      SET title = ?, description = ?, coverImage = ?, category = ?, level = ?, updatedAt = ?
      WHERE id = ?
    `).run(title, description, coverImage, category, level, updatedAt, id);
    return this.getCourse(id);
  }
  deleteCourse(id) {
    this.db.prepare("DELETE FROM lessons WHERE courseId = ?").run(id);
    const result = this.db.prepare("DELETE FROM courses WHERE id = ?").run(id);
    return result.changes > 0;
  }
  // User Progress operations
  createUserProgress(userId, completedLessons = "[]", notes) {
    const id = (0, import_crypto.randomUUID)();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const stmt = this.db.prepare(
      "INSERT INTO user_progress (id, userId, completedLessons, notes, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)"
    );
    stmt.run(id, userId, completedLessons, notes || null, now, now);
    return { id, userId, completedLessons, notes, createdAt: now, updatedAt: now };
  }
  getUserProgress(userId) {
    const stmt = this.db.prepare("SELECT * FROM user_progress WHERE userId = ?");
    return stmt.get(userId);
  }
  updateUserProgress(userId, completedLessons, notes) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const stmt = this.db.prepare(
      "UPDATE user_progress SET completedLessons = ?, notes = ?, updatedAt = ? WHERE userId = ?"
    );
    stmt.run(completedLessons, notes || null, now, userId);
  }
  // Verse Commentary Cache operations
  cacheCommentary(verseRef, commentaryJson, expiresAt) {
    const id = (0, import_crypto.randomUUID)();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const stmt = this.db.prepare(
      "INSERT OR REPLACE INTO verse_commentary_cache (id, verseRef, commentaryJson, createdAt, expiresAt) VALUES (?, ?, ?, ?, ?)"
    );
    stmt.run(id, verseRef, commentaryJson, now, expiresAt || null);
    return { id, verseRef, commentaryJson, createdAt: now, expiresAt };
  }
  getCommentary(verseRef) {
    const stmt = this.db.prepare("SELECT * FROM verse_commentary_cache WHERE verseRef = ?");
    const result = stmt.get(verseRef);
    if (result && result.expiresAt && new Date(result.expiresAt) < /* @__PURE__ */ new Date()) {
      this.db.prepare("DELETE FROM verse_commentary_cache WHERE verseRef = ?").run(verseRef);
      return null;
    }
    return result;
  }
  close() {
    this.db.close();
  }
  // Sermon operations
  createSermon(title, speaker, series, scriptureRef, description, mediaType, mediaUrl, duration, dateRecorded, thumbnailUrl, channel, seriesPart) {
    const id = (0, import_crypto.randomUUID)();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const stmt = this.db.prepare(
      "INSERT INTO sermons_podcasts (id, title, speaker, series, scriptureRef, description, mediaType, mediaUrl, duration, dateRecorded, thumbnailUrl, channel, seriesPart, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    stmt.run(id, title, speaker || null, series || null, scriptureRef || null, description || null, mediaType || null, mediaUrl || null, duration || null, dateRecorded || null, thumbnailUrl || null, channel || null, seriesPart || null, now, now);
    return { id, title, speaker, series, scriptureRef, description, mediaType, mediaUrl, duration, dateRecorded, thumbnailUrl, channel, seriesPart, createdAt: now, updatedAt: now };
  }
  getAllSermons() {
    const stmt = this.db.prepare("SELECT * FROM sermons_podcasts ORDER BY dateRecorded DESC, createdAt DESC");
    return stmt.all();
  }
  getSermonsByScripture(scriptureRef) {
    const stmt = this.db.prepare("SELECT * FROM sermons_podcasts WHERE scriptureRef LIKE ? ORDER BY dateRecorded DESC");
    return stmt.all(`%${scriptureRef}%`);
  }
  getSermonsBySpeaker(speaker) {
    const stmt = this.db.prepare("SELECT * FROM sermons_podcasts WHERE speaker LIKE ? ORDER BY dateRecorded DESC");
    return stmt.all(`%${speaker}%`);
  }
  getSermonsBySeries(series) {
    const stmt = this.db.prepare("SELECT * FROM sermons_podcasts WHERE series LIKE ? ORDER BY dateRecorded DESC");
    return stmt.all(`%${series}%`);
  }
  getSermonById(id) {
    const stmt = this.db.prepare("SELECT * FROM sermons_podcasts WHERE id = ?");
    return stmt.get(id);
  }
  updateSermon(id, updates) {
    const existing = this.getSermonById(id);
    if (!existing) return null;
    const title = updates.title !== void 0 ? updates.title : existing.title;
    const speaker = updates.speaker !== void 0 ? updates.speaker : existing.speaker;
    const series = updates.series !== void 0 ? updates.series : existing.series;
    const scriptureRef = updates.scriptureRef !== void 0 ? updates.scriptureRef : existing.scriptureRef;
    const description = updates.description !== void 0 ? updates.description : existing.description;
    const mediaType = updates.mediaType !== void 0 ? updates.mediaType : existing.mediaType;
    const mediaUrl = updates.mediaUrl !== void 0 ? updates.mediaUrl : existing.mediaUrl;
    const duration = updates.duration !== void 0 ? updates.duration : existing.duration;
    const dateRecorded = updates.dateRecorded !== void 0 ? updates.dateRecorded : existing.dateRecorded;
    const thumbnailUrl = updates.thumbnailUrl !== void 0 ? updates.thumbnailUrl : existing.thumbnailUrl;
    const courseLessonId = updates.courseLessonId !== void 0 ? updates.courseLessonId : existing.courseLessonId;
    const channel = updates.channel !== void 0 ? updates.channel : existing.channel;
    const seriesPart = updates.seriesPart !== void 0 ? updates.seriesPart : existing.seriesPart;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const stmt = this.db.prepare(
      "UPDATE sermons_podcasts SET title = ?, speaker = ?, series = ?, scriptureRef = ?, description = ?, mediaType = ?, mediaUrl = ?, duration = ?, dateRecorded = ?, thumbnailUrl = ?, courseLessonId = ?, channel = ?, seriesPart = ?, updatedAt = ? WHERE id = ?"
    );
    stmt.run(title, speaker || null, series || null, scriptureRef || null, description || null, mediaType || null, mediaUrl || null, duration || null, dateRecorded || null, thumbnailUrl || null, courseLessonId || null, channel || null, seriesPart || null, now, id);
    return this.getSermonById(id);
  }
  deleteSermon(id) {
    const result = this.db.prepare("DELETE FROM sermons_podcasts WHERE id = ?").run(id);
    return result.changes > 0;
  }
};

// server/bible/init.ts
var import_better_sqlite32 = __toESM(require("better-sqlite3"), 1);
var import_fs5 = __toESM(require("fs"), 1);
var import_path5 = __toESM(require("path"), 1);

// server/bible/seed.ts
function seedBibleCourses(db2) {
  const existingCourses = db2.getAllCourses();
  if (existingCourses.length > 0) {
    return;
  }
  const course1 = db2.createCourse(
    "Foundations of Faith",
    "Explore the core truths of Christian faith through Scripture"
  );
  db2.createLesson(
    course1.id,
    "The Word Became Flesh",
    "Understanding the incarnation and divinity of Christ",
    "John 1:1",
    JSON.stringify({ questions: ["What does it mean that the Word was God?", "How does this shape your faith?"] })
  );
  db2.createLesson(
    course1.id,
    "Faith Defined",
    "What is faith and why does it matter?",
    "Hebrews 11:1",
    JSON.stringify({ questions: ["How do you define faith?", "What role does faith play in your life?"] })
  );
  const course2 = db2.createCourse(
    "Walking in Wisdom",
    "Practical wisdom for daily living from Scripture"
  );
  db2.createLesson(
    course2.id,
    "Trust and Lean Not",
    "Trusting God with your whole heart",
    "Proverbs 3:5-6",
    JSON.stringify({ questions: ["What does it mean to trust with your whole heart?", "How can you apply this today?"] })
  );
  db2.createLesson(
    course2.id,
    "Asking for Wisdom",
    "How to seek and receive wisdom from God",
    "James 1:5",
    JSON.stringify({ questions: ["When have you needed wisdom?", "How do you ask God for guidance?"] })
  );
  const course3 = db2.createCourse(
    "Grace & Community",
    "Living out grace and building authentic Christian community"
  );
  db2.createLesson(
    course3.id,
    "No Favoritism",
    "Treating all people with equal dignity and respect",
    "James 2:1-4",
    JSON.stringify({ questions: ["How do you show favoritism?", "What would it look like to treat everyone equally?"] })
  );
  db2.createLesson(
    course3.id,
    "Love Without Hypocrisy",
    "Genuine love and community in action",
    "Romans 12:9-13",
    JSON.stringify({ questions: ["What does genuine love look like?", "How can you build community?"] })
  );
}

// server/bible/init.ts
function initializeBibleDB(dbPath) {
  const dir = import_path5.default.dirname(dbPath);
  if (!import_fs5.default.existsSync(dir)) {
    import_fs5.default.mkdirSync(dir, { recursive: true });
  }
  const db2 = new import_better_sqlite32.default(dbPath);
  let schemaPath = import_path5.default.join(process.cwd(), "server", "bible", "schema.sql");
  if (!import_fs5.default.existsSync(schemaPath)) {
    schemaPath = import_path5.default.join(process.cwd(), "data", "bible", "schema.sql");
  }
  const schema = import_fs5.default.readFileSync(schemaPath, "utf-8");
  db2.exec(schema);
  const bibleDB = new BibleStudyDB(dbPath);
  seedBibleCourses(bibleDB);
  return db2;
}

// routes/auth.ts
var import_express2 = require("express");
function createAuthRoutes(authService) {
  const router2 = (0, import_express2.Router)();
  router2.post("/register", async (req, res) => {
    const rawEmail = req.body.email;
    const rawUsername = req.body.username || req.body.handle;
    const rawDisplayName = req.body.displayName || req.body.name;
    const rawPassword = req.body.password || "TemporaryPassword123!";
    const avatarUrl = req.body.avatarUrl;
    const bio = req.body.bio;
    if (!rawEmail || !rawUsername) {
      return res.status(400).json({ error: "Email and username/handle are required" });
    }
    const email = rawEmail.trim().toLowerCase();
    const username = rawUsername.replace("@", "").trim().toLowerCase();
    const displayName = rawDisplayName || username;
    try {
      let authUser;
      try {
        authUser = await authService.register(email, username, rawPassword, displayName);
      } catch (err) {
        if (err.message && err.message.includes("already registered")) {
          authUser = authService.db.prepare("SELECT * FROM users WHERE email = ?").get(email);
        } else {
          throw err;
        }
      }
      let socialUser = db.getUserByEmail(email);
      if (!socialUser) {
        socialUser = db.createUser({
          name: displayName,
          email,
          handle: username,
          avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
          bio: bio || "Explorer on Aura \u2728 Connected to real-time WebRTC social network.",
          status: "online",
          statusMessage: "Active on Aura"
        });
      }
      let token = "";
      try {
        const loginResult = await authService.login(email, rawPassword);
        token = loginResult.token;
      } catch {
      }
      res.status(201).json({
        ...socialUser,
        user: socialUser,
        token,
        message: "Registration successful."
      });
    } catch (error) {
      console.error("[AUTH /register Error]:", error);
      res.status(400).json({ error: error.message });
    }
  });
  router2.post("/google", async (req, res) => {
    const { name, email, avatarUrl, googleId } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required for Google Sign-In" });
    }
    const cleanEmail = email.trim().toLowerCase();
    const handle = cleanEmail.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");
    const displayName = name || handle;
    try {
      let socialUser = db.getUserByEmail(cleanEmail);
      if (!socialUser) {
        const existingByHandle = db.getUserByHandle ? db.getUserByHandle(handle) : null;
        if (existingByHandle) {
          socialUser = db.updateUser(existingByHandle.id, {
            email: cleanEmail,
            name: displayName,
            avatarUrl: avatarUrl || existingByHandle.avatarUrl,
            authProvider: "google",
            googleId: googleId || existingByHandle.googleId
          });
        } else {
          socialUser = db.createUser({
            name: displayName,
            email: cleanEmail,
            handle,
            avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${handle}`,
            bio: "Connected via Google Account \u2728",
            status: "online",
            authProvider: "google",
            googleId
          });
        }
      } else {
        socialUser = db.updateUser(socialUser.id, {
          name: displayName,
          avatarUrl: avatarUrl || socialUser.avatarUrl,
          authProvider: "google",
          googleId: googleId || socialUser.googleId
        });
      }
      res.json(socialUser);
    } catch (error) {
      console.error("[AUTH /google Error]:", error);
      res.status(500).json({ error: error.message });
    }
  });
  router2.post("/verify-email", async (req, res) => {
    const { email, code } = req.body;
    try {
      const result = await authService.verifyEmail(email, code);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  router2.post("/login", async (req, res) => {
    const { emailOrUsername, password } = req.body;
    try {
      const result = await authService.login(emailOrUsername, password);
      let socialUser = db.getUserByEmail(result.user.email);
      if (!socialUser) {
        socialUser = db.createUser({
          name: result.user.display_name || result.user.username,
          email: result.user.email,
          handle: result.user.username
        });
      }
      res.json({
        ...result,
        socialUser
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });
  router2.get("/me", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    try {
      const decoded = authService.verifyToken(token);
      const user = authService.getUserById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const socialUser = db.getUserByEmail(user.email);
      res.json({ user, socialUser });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });
  router2.post("/resend-code", async (req, res) => {
    const { email } = req.body;
    try {
      const result = await authService.resendCode(email);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  router2.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
  });
  return router2;
}

// services/authService.ts
var import_crypto2 = require("crypto");
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";
var JWT_EXPIRY = "7d";
var AuthService = class {
  constructor(db2) {
    this.db = db2;
  }
  // Register new user
  async register(email, username, password, displayName) {
    if (!email || !username || !password) {
      throw new Error("Email, username, and password are required");
    }
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    const existingEmail = this.db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    const existingUsername = this.db.prepare("SELECT id FROM users WHERE username = ?").get(username);
    if (existingEmail) throw new Error("Email already registered");
    if (existingUsername) throw new Error("Username already taken");
    const password_hash = await import_bcrypt.default.hash(password, 10);
    const id = (0, import_crypto2.randomUUID)();
    const verification_code = Math.floor(1e5 + Math.random() * 9e5).toString();
    const verification_code_expires = new Date(Date.now() + 15 * 60 * 1e3).toISOString();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const stmt = this.db.prepare(
      "INSERT INTO users (id, email, username, password_hash, display_name, role, is_verified, verification_code, verification_code_expires, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    stmt.run(id, email, username, password_hash, displayName || null, "member", 0, verification_code, verification_code_expires, now);
    console.log(`[AUTH] Verification code for ${email}: ${verification_code}`);
    return {
      id,
      email,
      username,
      display_name: displayName,
      is_verified: false,
      created_at: now
    };
  }
  // Verify email with code
  async verifyEmail(email, code) {
    const user = this.db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) throw new Error("User not found");
    if (user.is_verified) throw new Error("Email already verified");
    if (user.verification_code !== code) throw new Error("Invalid verification code");
    if (new Date(user.verification_code_expires) < /* @__PURE__ */ new Date()) throw new Error("Verification code expired");
    this.db.prepare("UPDATE users SET is_verified = 1, verification_code = NULL, verification_code_expires = NULL WHERE id = ?").run(user.id);
    const token = import_jsonwebtoken.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return { token, user: this._sanitizeUser(user) };
  }
  // Login with email or username
  async login(emailOrUsername, password) {
    const user = this.db.prepare(
      "SELECT * FROM users WHERE email = ? OR username = ?"
    ).get(emailOrUsername, emailOrUsername);
    if (!user) throw new Error("Invalid credentials");
    const passwordMatch = await import_bcrypt.default.compare(password, user.password_hash);
    if (!passwordMatch) throw new Error("Invalid credentials");
    this.db.prepare("UPDATE users SET last_login = ? WHERE id = ?").run((/* @__PURE__ */ new Date()).toISOString(), user.id);
    const token = import_jsonwebtoken.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return { token, user: this._sanitizeUser(user) };
  }
  // Verify token
  verifyToken(token) {
    try {
      const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
  // Get user by ID
  getUserById(id) {
    const user = this.db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    return user ? this._sanitizeUser(user) : null;
  }
  // Resend verification code
  async resendCode(email) {
    const user = this.db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) throw new Error("User not found");
    if (user.is_verified) throw new Error("Email already verified");
    const verification_code = Math.floor(1e5 + Math.random() * 9e5).toString();
    const verification_code_expires = new Date(Date.now() + 15 * 60 * 1e3).toISOString();
    this.db.prepare("UPDATE users SET verification_code = ?, verification_code_expires = ? WHERE id = ?").run(
      verification_code,
      verification_code_expires,
      user.id
    );
    console.log(`[AUTH] Verification code for ${email}: ${verification_code}`);
    return { message: "Verification code sent" };
  }
  // Forgot password
  async forgotPassword(email) {
    const user = this.db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) throw new Error("User not found");
    const reset_token = (0, import_crypto2.randomUUID)();
    const reset_token_expires = new Date(Date.now() + 60 * 60 * 1e3).toISOString();
    this.db.prepare("UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?").run(
      reset_token,
      reset_token_expires,
      user.id
    );
    console.log(`[AUTH] Password reset token for ${email}: ${reset_token}`);
    return { message: "Password reset link sent" };
  }
  // Reset password
  async resetPassword(resetToken, newPassword) {
    if (newPassword.length < 8) throw new Error("Password must be at least 8 characters");
    const user = this.db.prepare("SELECT * FROM users WHERE reset_token = ?").get(resetToken);
    if (!user) throw new Error("Invalid reset token");
    if (new Date(user.reset_token_expires) < /* @__PURE__ */ new Date()) throw new Error("Reset token expired");
    const password_hash = await import_bcrypt.default.hash(newPassword, 10);
    this.db.prepare("UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?").run(
      password_hash,
      user.id
    );
    return { message: "Password reset successful" };
  }
  _sanitizeUser(user) {
    const { password_hash, verification_code, reset_token, ...safe } = user;
    return safe;
  }
};

// routes/recovery.ts
var import_express3 = require("express");

// server/recoveryService.ts
var import_fs6 = __toESM(require("fs"), 1);
var import_path6 = __toESM(require("path"), 1);
var RECOVERY_DATA_FILE = import_path6.default.join(process.cwd(), "data", "recovery_data.json");
var liveParticipants = /* @__PURE__ */ new Map();
var liveSignals = /* @__PURE__ */ new Map();
function getInitialMeetings() {
  const now = /* @__PURE__ */ new Date();
  const nextMeetingDate = new Date(now.getTime() + 1e3 * 60 * 60 * 2.5);
  const liveMeetingDate = new Date(now.getTime() - 1e3 * 60 * 15);
  return [
    {
      id: "meeting_live_freedom",
      title: "Path to Freedom \u2014 Open Recovery Gathering",
      description: "A welcoming Christ-centered open fellowship for all overcoming addiction, habitual strongholds, and compulsive struggles. Real testimonies, Scripture truth, and small group fellowship.",
      scheduledAt: nextMeetingDate.toISOString(),
      durationMinutes: 60,
      recurringInfo: "Every Thursday & Sunday at 7:00 PM EST",
      hostId: "user_tex",
      hostName: "Tex",
      hostAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=lightsouttattootex@gmail.com",
      topic: "Step 4: Truth, Humility & Moral Inventory in Christ",
      scriptureFocus: "James 5:16 & Romans 12:2",
      format: "open_discussion",
      status: "scheduled",
      attendeeCount: 14,
      isFeatured: true,
      tags: ["Open Discussion", "Step 4", "Fellowship", "Prayer"],
      meetingRoomId: "room_freedom_main",
      guidelines: [
        "Anonymity & Confidentiality: What is said in the room stays in the room.",
        "Christ-Centered: We look to Jesus as our supreme Higher Power & Healer.",
        "No Crosstalk or Judgment: Give each brother and sister uninterrupted time to share.",
        "Camera is optional: Audio-only and anonymous display name are fully supported."
      ]
    },
    {
      id: "meeting_daily_dawn",
      title: "Daily Sunrise Victory Check-In",
      description: "Morning prayer, Scripture armor of God, and daily sobriety pledges before starting the workday.",
      scheduledAt: new Date(now.getTime() + 1e3 * 60 * 60 * 18).toISOString(),
      durationMinutes: 30,
      recurringInfo: "Monday - Saturday at 7:00 AM EST",
      hostId: "user_kimberly",
      hostName: "Kimberly Coffman",
      hostAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=savdbygrace360@gmail.com",
      topic: "Putting on the Full Armor of God (Ephesians 6)",
      scriptureFocus: "Ephesians 6:10-18",
      format: "speaker_testimony",
      status: "scheduled",
      attendeeCount: 22,
      isFeatured: false,
      tags: ["Morning Armor", "Prayer", "Sobriety Pledge"],
      meetingRoomId: "room_daily_dawn",
      guidelines: [
        "Short 2-minute shares to allow everyone time.",
        "Focus on today\u2019s surrender to Christ."
      ]
    },
    {
      id: "meeting_mens_iron",
      title: "Men of Valor: Purity & Integrity Circle",
      description: "Strictly confidential men\u2019s discipleship for breaking free from pornography, sexual brokenness, and digital triggers.",
      scheduledAt: new Date(now.getTime() + 1e3 * 60 * 60 * 42).toISOString(),
      durationMinutes: 60,
      recurringInfo: "Tuesday Evenings at 8:30 PM EST",
      hostId: "user_skylor",
      hostName: "Skylor Bright",
      hostAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=skylor@aura.social",
      topic: "Covenant Eyes, Heart Purity, and Overcoming the Flesh",
      scriptureFocus: "Job 31:1 & Psalm 119:9",
      format: "step_study",
      status: "scheduled",
      attendeeCount: 18,
      isFeatured: false,
      tags: ["Men Only", "Purity", "Accountability"],
      meetingRoomId: "room_mens_iron",
      guidelines: [
        "Radical honesty without graphic details.",
        "Focus on Gospel grace and practical boundaries."
      ]
    }
  ];
}
function getInitialCircles() {
  return [
    {
      id: "circle_overcomers",
      name: "Substance Freedom & Overcomers",
      focus: "Alcohol, Opioids, Chemical Dependency",
      description: "Brothers and sisters walking in daily sobriety through the blood of the Lamb and mutual accountability.",
      membersCount: 48,
      bannerUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&auto=format&fit=crop&q=80",
      isJoined: true,
      recentCheckins: [
        {
          id: "chk_1",
          userId: "user_marcus",
          userName: "Marcus S.",
          userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Marcus",
          streakDays: 184,
          message: "Day 184 clean today! Felt a wave of old anxiety at work, but stepped out, prayed Psalm 23, and called my partner. Jesus gave immediate peace!",
          timestamp: Date.now() - 1e3 * 60 * 45,
          encouragementCount: 14,
          encouragedByUserIds: ["user_tex", "user_kimberly"]
        },
        {
          id: "chk_2",
          userId: "user_david",
          userName: "David W.",
          userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=DavidW",
          streakDays: 45,
          message: "Hit 45 days today by the grace of God. Grateful for this fellowship and the meeting yesterday.",
          timestamp: Date.now() - 1e3 * 60 * 120,
          encouragementCount: 9,
          encouragedByUserIds: ["user_tex"]
        }
      ]
    },
    {
      id: "circle_purity",
      name: "Purity, Heart & Thought Life",
      focus: "Pornography, Lust, Digital Distraction",
      description: "Taking every thought captive to the obedience of Christ and breaking digital strongholds together.",
      membersCount: 62,
      bannerUrl: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&auto=format&fit=crop&q=80",
      isJoined: true,
      recentCheckins: [
        {
          id: "chk_3",
          userId: "user_john",
          userName: "John K.",
          userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=JohnK",
          streakDays: 30,
          message: "Reached my 30-day milestone! Deleted social media off my phone and the mental fog has lifted.",
          timestamp: Date.now() - 1e3 * 60 * 90,
          encouragementCount: 19,
          encouragedByUserIds: ["user_tex", "user_skylor"]
        }
      ]
    },
    {
      id: "circle_anxiety_habits",
      name: "Grace Over Anxiety & Compulsive Habits",
      focus: "Stress Eating, Anxiety Compulsions, Worry",
      description: "Replacing anxious rituals with prayer, fasting, and biblical peace that surpasses understanding.",
      membersCount: 39,
      bannerUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80",
      isJoined: false,
      recentCheckins: [
        {
          id: "chk_4",
          userId: "user_rachel",
          userName: "Rachel M.",
          userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=RachelM",
          streakDays: 14,
          message: "2 weeks of taking my worries to the prayer closet instead of compulsive eating late at night. Praise Jesus!",
          timestamp: Date.now() - 1e3 * 60 * 180,
          encouragementCount: 8,
          encouragedByUserIds: []
        }
      ]
    }
  ];
}
var RecoveryService = class {
  constructor() {
    this.state = this.loadState();
  }
  loadState() {
    try {
      if (import_fs6.default.existsSync(RECOVERY_DATA_FILE)) {
        const raw = import_fs6.default.readFileSync(RECOVERY_DATA_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed.meetings && parsed.meetings.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("[RecoveryService] Failed to parse recovery_data.json, using defaults:", e);
    }
    const defaultState = {
      meetings: getInitialMeetings(),
      meetingChats: {
        meeting_live_freedom: [
          {
            id: "msg_welcome_1",
            meetingId: "meeting_live_freedom",
            senderId: "system",
            senderName: "Path to Freedom Host",
            senderAvatar: "/icons/icon-192.svg",
            type: "system",
            content: "Welcome to the Path to Freedom Recovery Gathering. We are anchored in Jesus Christ. Please keep microphone muted while another shares.",
            timestamp: Date.now() - 1e3 * 60 * 10,
            prayingCount: 0,
            prayedByUserIds: []
          },
          {
            id: "msg_prayer_1",
            meetingId: "meeting_live_freedom",
            senderId: "user_marcus",
            senderName: "Marcus S.",
            senderAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Marcus",
            type: "prayer_request",
            content: "Please pray for my brother who is facing withdrawal right now. Praying for peace and Christ\u2019s supernatural comfort in his body.",
            timestamp: Date.now() - 1e3 * 60 * 7,
            prayingCount: 6,
            prayedByUserIds: ["user_tex", "user_kimberly"]
          },
          {
            id: "msg_scripture_1",
            meetingId: "meeting_live_freedom",
            senderId: "user_kimberly",
            senderName: "Kimberly Coffman",
            senderAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=savdbygrace360@gmail.com",
            type: "scripture",
            content: "\u201CConfess your faults one to another, and pray one for another, that ye may be healed.\u201D \u2014 James 5:16",
            timestamp: Date.now() - 1e3 * 60 * 4,
            prayingCount: 8,
            prayedByUserIds: ["user_tex"]
          }
        ]
      },
      userPrinciples: {},
      userJournals: {},
      circles: getInitialCircles()
    };
    this.saveState(defaultState);
    return defaultState;
  }
  saveState(stateToSave) {
    try {
      const dir = import_path6.default.dirname(RECOVERY_DATA_FILE);
      if (!import_fs6.default.existsSync(dir)) {
        import_fs6.default.mkdirSync(dir, { recursive: true });
      }
      import_fs6.default.writeFileSync(RECOVERY_DATA_FILE, JSON.stringify(stateToSave || this.state, null, 2), "utf-8");
    } catch (e) {
      console.error("[RecoveryService] Failed to save recovery_data.json:", e);
    }
  }
  // --- MEETINGS ---
  getMeetings() {
    return this.state.meetings;
  }
  getMeetingById(id) {
    return this.state.meetings.find((m) => m.id === id);
  }
  createMeeting(data) {
    const id = "meeting_" + Date.now();
    const newMeeting = {
      id,
      title: data.title || "Path to Freedom Fellowship",
      description: data.description || "Christ-centered recovery meeting.",
      scheduledAt: data.scheduledAt || new Date(Date.now() + 1e3 * 60 * 60).toISOString(),
      durationMinutes: data.durationMinutes || 60,
      recurringInfo: data.recurringInfo || "Weekly",
      hostId: data.hostId || "user_tex",
      hostName: data.hostName || "Tex",
      hostAvatar: data.hostAvatar || "https://api.dicebear.com/7.x/bottts/svg?seed=lightsouttattootex@gmail.com",
      topic: data.topic || "Biblical Surrender and Recovery",
      scriptureFocus: data.scriptureFocus || "Romans 8:1-2",
      format: data.format || "open_discussion",
      status: data.status || "scheduled",
      attendeeCount: 1,
      isFeatured: data.isFeatured || false,
      tags: data.tags || ["Fellowship", "Prayer"],
      meetingRoomId: "room_" + id,
      guidelines: [
        "Confidentiality & Anonymity respected.",
        "Keep shares focused on Christ and personal experience.",
        "Respectful listening without interruptions."
      ]
    };
    this.state.meetings.unshift(newMeeting);
    this.saveState();
    return newMeeting;
  }
  updateMeetingStatus(id, status) {
    const meeting = this.state.meetings.find((m) => m.id === id);
    if (!meeting) return null;
    meeting.status = status;
    this.saveState();
    return meeting;
  }
  // --- PARTICIPANTS & SIGNALING ---
  joinMeeting(meetingId, participant) {
    if (!liveParticipants.has(meetingId)) {
      liveParticipants.set(meetingId, /* @__PURE__ */ new Map());
    }
    const roomMap = liveParticipants.get(meetingId);
    roomMap.set(participant.userId, participant);
    const meeting = this.getMeetingById(meetingId);
    if (meeting) {
      meeting.attendeeCount = Math.max(roomMap.size, 1);
    }
    return Array.from(roomMap.values());
  }
  leaveMeeting(meetingId, userId) {
    const roomMap = liveParticipants.get(meetingId);
    if (roomMap) {
      roomMap.delete(userId);
    }
    const meeting = this.getMeetingById(meetingId);
    if (meeting && roomMap) {
      meeting.attendeeCount = roomMap.size;
    }
    return roomMap ? Array.from(roomMap.values()) : [];
  }
  getParticipants(meetingId) {
    const roomMap = liveParticipants.get(meetingId);
    return roomMap ? Array.from(roomMap.values()) : [];
  }
  updateParticipantState(meetingId, userId, updates) {
    const roomMap = liveParticipants.get(meetingId);
    if (!roomMap || !roomMap.has(userId)) return null;
    const current = roomMap.get(userId);
    const updated = { ...current, ...updates };
    roomMap.set(userId, updated);
    return updated;
  }
  // --- WEBRTC SIGNALING ---
  addSignal(meetingId, signal) {
    if (!liveSignals.has(meetingId)) {
      liveSignals.set(meetingId, []);
    }
    const list = liveSignals.get(meetingId);
    list.push(signal);
    if (list.length > 200) {
      list.splice(0, list.length - 200);
    }
  }
  getSignals(meetingId, forUserId, sinceTimestamp = 0) {
    const list = liveSignals.get(meetingId) || [];
    return list.filter((s) => {
      if (s.timestamp <= sinceTimestamp) return false;
      if (s.fromUserId === forUserId) return false;
      if (!s.toUserId || s.toUserId === forUserId) return true;
      return false;
    });
  }
  // --- MEETING CHAT ---
  getMeetingChat(meetingId) {
    return this.state.meetingChats[meetingId] || [];
  }
  addMeetingChatMessage(meetingId, msg) {
    if (!this.state.meetingChats[meetingId]) {
      this.state.meetingChats[meetingId] = [];
    }
    const newMsg = {
      ...msg,
      id: "msg_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      timestamp: Date.now(),
      prayingCount: 0,
      prayedByUserIds: []
    };
    this.state.meetingChats[meetingId].push(newMsg);
    this.saveState();
    return newMsg;
  }
  togglePrayerPledge(meetingId, messageId, userId) {
    const msgs = this.state.meetingChats[meetingId];
    if (!msgs) return null;
    const msg = msgs.find((m) => m.id === messageId);
    if (!msg) return null;
    if (!msg.prayedByUserIds) msg.prayedByUserIds = [];
    const index = msg.prayedByUserIds.indexOf(userId);
    if (index === -1) {
      msg.prayedByUserIds.push(userId);
      msg.prayingCount = msg.prayedByUserIds.length;
    } else {
      msg.prayedByUserIds.splice(index, 1);
      msg.prayingCount = msg.prayedByUserIds.length;
    }
    this.saveState();
    return msg;
  }
  // --- HOST ACTIONS ---
  performHostAction(meetingId, action) {
    if (action.type === "set_status" && action.status) {
      this.updateMeetingStatus(meetingId, action.status);
    }
    if (action.type === "mute_all") {
      const roomMap = liveParticipants.get(meetingId);
      if (roomMap) {
        roomMap.forEach((p, uid) => {
          if (p.role !== "host") {
            p.isMuted = true;
            roomMap.set(uid, p);
          }
        });
      }
      this.addSignal(meetingId, {
        fromUserId: "host",
        type: "host_command",
        payload: { command: "mute_all" },
        timestamp: Date.now()
      });
    }
    if (action.type === "mute_user" && action.targetUserId) {
      this.updateParticipantState(meetingId, action.targetUserId, { isMuted: true });
      this.addSignal(meetingId, {
        fromUserId: "host",
        toUserId: action.targetUserId,
        type: "host_command",
        payload: { command: "mute" },
        timestamp: Date.now()
      });
    }
    if (action.type === "kick_user" && action.targetUserId) {
      this.leaveMeeting(meetingId, action.targetUserId);
      this.addSignal(meetingId, {
        fromUserId: "host",
        toUserId: action.targetUserId,
        type: "host_command",
        payload: { command: "kick" },
        timestamp: Date.now()
      });
    }
    if (action.type === "broadcast_notice" && action.noticeText) {
      this.addMeetingChatMessage(meetingId, {
        meetingId,
        senderId: "host_broadcast",
        senderName: "Host Announcement",
        senderAvatar: "/icons/icon-192.svg",
        type: "system",
        content: action.noticeText
      });
    }
    return { success: true };
  }
  // --- USER PRINCIPLES PROGRESS ---
  getUserPrinciples(userId) {
    return this.state.userPrinciples[userId] || {};
  }
  saveUserPrinciple(userId, progress) {
    if (!this.state.userPrinciples[userId]) {
      this.state.userPrinciples[userId] = {};
    }
    this.state.userPrinciples[userId][progress.step] = progress;
    this.saveState();
    return this.state.userPrinciples[userId];
  }
  // --- RECOVERY JOURNAL & STREAK ---
  getUserJournal(userId) {
    if (!this.state.userJournals[userId]) {
      this.state.userJournals[userId] = {
        streakStartDate: (/* @__PURE__ */ new Date()).toISOString(),
        streakDays: 1,
        entries: [
          {
            id: "entry_seed_1",
            date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            streakDay: 1,
            mood: "grateful",
            gratitudeNotes: "Grateful for Jesus delivering me from isolation, and for the Path to Freedom fellowship.",
            prayerNotes: "Lord Jesus, keep my eyes fixed on You today. Give me strength to flee youthful lusts and walk in the Spirit.",
            memoryVerseRef: "Romans 8:1",
            memoryVerseText: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.",
            reflection: "Starting this journey with complete surrender. I cannot do it on my own, but Christ in me is the hope of glory.",
            cravingsManaged: true,
            createdAt: Date.now() - 1e3 * 60 * 60 * 12
          }
        ]
      };
      this.saveState();
    }
    return this.state.userJournals[userId];
  }
  addJournalEntry(userId, entry) {
    const journal = this.getUserJournal(userId);
    const newEntry = {
      ...entry,
      id: "jrn_" + Date.now(),
      createdAt: Date.now()
    };
    journal.entries.unshift(newEntry);
    this.saveState();
    return newEntry;
  }
  updateJournalStreak(userId, streakDays, startDate) {
    const journal = this.getUserJournal(userId);
    journal.streakDays = streakDays;
    if (startDate) journal.streakStartDate = startDate;
    this.saveState();
    return journal;
  }
  // --- ACCOUNTABILITY CIRCLES & SOS ---
  getCircles() {
    return this.state.circles;
  }
  addCircleCheckin(circleId, checkin) {
    const circle = this.state.circles.find((c) => c.id === circleId);
    if (!circle) return null;
    const newCheckin = {
      ...checkin,
      id: "chk_" + Date.now(),
      timestamp: Date.now(),
      encouragementCount: 0,
      encouragedByUserIds: []
    };
    circle.recentCheckins.unshift(newCheckin);
    this.saveState();
    return newCheckin;
  }
  toggleCheckinEncouragement(circleId, checkinId, userId) {
    const circle = this.state.circles.find((c) => c.id === circleId);
    if (!circle) return null;
    const chk = circle.recentCheckins.find((c) => c.id === checkinId);
    if (!chk) return null;
    if (!chk.encouragedByUserIds) chk.encouragedByUserIds = [];
    const idx = chk.encouragedByUserIds.indexOf(userId);
    if (idx === -1) {
      chk.encouragedByUserIds.push(userId);
      chk.encouragementCount = chk.encouragedByUserIds.length;
    } else {
      chk.encouragedByUserIds.splice(idx, 1);
      chk.encouragementCount = chk.encouragedByUserIds.length;
    }
    this.saveState();
    return chk;
  }
};
var recoveryService = new RecoveryService();

// src/content/recoveryPrinciples.ts
var CORE_BIBLICAL_RECOVERY_PRINCIPLES = [
  {
    step: 1,
    title: "Admitting Powerlessness & Surrender",
    subtitle: "Brokenness Before God & The End of Self-Reliance",
    biblicalTheme: "The Need for a Savior",
    scripture: {
      reference: "Romans 7:18 & Matthew 5:3",
      text: "For I know that in me (that is, in my flesh,) dwelleth no good thing: for to will is present with me; but how to perform that which is good I find not... Blessed are the poor in spirit: for theirs is the kingdom of heaven."
    },
    summary: "We acknowledge that our habits, addictions, and fleshly compulsions have overpowered our self-will, and that only Christ can deliver us.",
    biblicalTruth: "Freedom begins when human excuses end. Admitting powerlessness is not defeat\u2014it is stepping into the realm of God\u2019s supernatural grace.",
    reflectionQuestions: [
      "In what specific ways have you tried to manage this addiction or habit in your own strength and failed?",
      'What lies has the enemy told you about being able to "handle it just one more time"?',
      "Are you willing to surrender the illusion of control into the hands of Jesus Christ today?"
    ],
    actionSteps: [
      "Write down the concrete costs of your struggle (relationships, time, spiritual peace).",
      "Pray a prayer of total surrender, releasing the hidden struggle into God's light.",
      "Tell one trusted Christian brother/sister or mentor that you are seeking recovery."
    ],
    prayer: "Lord Jesus, I confess that in my own flesh I am powerless over this sin and compulsion. I lay down my pride, my excuses, and my attempts to fix myself. I need You as my Savior, Deliverer, and King. Amen.",
    affirmation: "I am weak in my flesh, but Christ's strength is made perfect in my weakness (2 Cor 12:9)."
  },
  {
    step: 2,
    title: "Faith & Hope in Jesus Christ",
    subtitle: "Trusting God\u2019s Power and Willingness to Heal",
    biblicalTheme: "Deliverance through the Living God",
    scripture: {
      reference: "Philippians 1:6 & Hebrews 11:1",
      text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ."
    },
    summary: "We come to believe that God not only exists, but that He actively loves us, forgives through the blood of Jesus, and has the power to restore our minds and bodies.",
    biblicalTruth: "Your current struggle is not the final chapter of your story. Jesus specializes in breaking generational strongholds.",
    reflectionQuestions: [
      "Do you truly believe Jesus wants you completely free, or do you feel disqualified from His grace?",
      "How does knowing God never leaves nor forsakes you give you courage for today?",
      "What past testimonies or scriptures can you anchor your hope upon right now?"
    ],
    actionSteps: [
      "Memorize Philippians 1:6 and repeat it whenever despair whispers.",
      "List 3 instances in Scripture where Jesus reached out to those considered hopeless or unclean.",
      "Thank God in advance for the victory He has purchased at Calvary."
    ],
    prayer: "Father, increase my faith. Silence the accusing voice of the enemy. I anchor my hope in the resurrection power of Jesus Christ. You who began a good work in me will complete it. Amen.",
    affirmation: "My hope is not anchored in my willpower; it is anchored in the finished work of Jesus Christ."
  },
  {
    step: 3,
    title: "Repentance & Turnaround",
    subtitle: "Deciding to Turn our Will and Lives over to Christ",
    biblicalTheme: "True Biblical Metanoia (Change of Mind & Direction)",
    scripture: {
      reference: "Acts 3:19 & Romans 12:1",
      text: "Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord."
    },
    summary: "Repentance is more than feeling guilty or shedding tears; it is a decisive turn of the heart, mind, and feet away from sin and toward Jesus Christ.",
    biblicalTruth: "Godly sorrow worketh repentance to salvation not to be repented of, but worldly sorrow worketh death (2 Cor 7:10).",
    reflectionQuestions: [
      "Have you been seeking relief from consequences, or genuine transformation of heart?",
      'What "provision for the flesh" (apps, contacts, environments, secret stashes) must you destroy today?',
      "Are you ready to submit your schedule, eyes, mind, and desires to the Lordship of Christ?"
    ],
    actionSteps: [
      "Delete triggering apps, contacts, browser bookmarks, or toxic connections immediately.",
      "Establish clean digital boundaries (content blockers, accountability apps, open passwords).",
      "Sign a personal covenant before God pledging to walk in His light daily."
    ],
    prayer: "Lord, give me genuine godly sorrow over sin. I turn my back on the counterfeit pleasures of darkness. I present my body as a living sacrifice, holy and acceptable unto You. Amen.",
    affirmation: "I am dead indeed unto sin, but alive unto God through Jesus Christ our Lord (Rom 6:11)."
  },
  {
    step: 4,
    title: "Moral Inventory & Radical Honesty",
    subtitle: "Searching our Hearts in the Light of Scripture",
    biblicalTheme: "Exposing Darkness to the Light",
    scripture: {
      reference: "Lamentations 3:40 & Psalm 139:23-24",
      text: "Let us search and try our ways, and turn again to the Lord... Search me, O God, and know my heart: try me, and know my thoughts: And see if there be any wicked way in me, and lead me in the way everlasting."
    },
    summary: "We conduct a thorough, courageous moral and spiritual inventory of our lives, identifying resentments, fears, buried trauma, and patterns of deception.",
    biblicalTruth: "He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy (Proverbs 28:13).",
    reflectionQuestions: [
      "Who are you holding deep bitterness, unforgiveness, or grudges against?",
      "What hidden shame or fear drives you to numb yourself with your habit?",
      "Where have you blamed others or God for choices you made?"
    ],
    actionSteps: [
      "Write down honest columns: Resentment / Cause / My Part / Resulting Fear.",
      "Acknowledge childhood wounds or trauma to God and bring them to a pastoral counselor or mentor.",
      "Commit to absolute truthfulness in all conversations this week."
    ],
    prayer: "Holy Spirit, shine Your holy spotlight into every dark corner of my memory. Uncover the roots of bitterness, shame, and rebellion so they may be uprooted by Your grace. Amen.",
    affirmation: "I walk in the light as He is in the light, and the blood of Jesus cleanses me from all sin."
  },
  {
    step: 5,
    title: "Mutual Confession & Cleansing",
    subtitle: "Admitting to God, Ourselves, and Another the Exact Nature of our Wrongs",
    biblicalTheme: "Fellowship & Healing in the Body",
    scripture: {
      reference: "James 5:16 & 1 John 1:9",
      text: "Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much."
    },
    summary: "Sin loses its lethal power when dragged out of isolation into the light of Christian brotherhood and fellowship.",
    biblicalTruth: "You are as sick as your secrets. True healing happens in community.",
    reflectionQuestions: [
      "Who is a mature, godly Christian brother/sister with whom you can safely share your moral inventory?",
      "What fear is keeping you from being completely transparent?",
      "Have you ever experienced the freedom that comes after truthful confession?"
    ],
    actionSteps: [
      "Schedule a confidential session with a trusted pastor, sponsor, or Christian mentor.",
      "Read through your moral inventory honestly without minimizing or shifting blame.",
      "Receive prayer and the declaration of God's full pardon through Christ."
    ],
    prayer: "Father, break my terror of what people think. Give me humility to confess my faults to my brothers and sisters. Thank You that when I confess, You are faithful and just to forgive and cleanse me. Amen.",
    affirmation: "There is now therefore no condemnation to them which are in Christ Jesus (Rom 8:1)."
  },
  {
    step: 6,
    title: "Humble Submission to Sanctification",
    subtitle: "Entirely Ready for God to Remove All Character Defects",
    biblicalTheme: "Yielding to the Potter's Hand",
    scripture: {
      reference: "Psalm 51:10 & James 4:10",
      text: "Create in me a clean heart, O God; and renew a right spirit within me... Humble yourselves in the sight of the Lord, and he shall lift you up."
    },
    summary: "We stop trying to hold onto petty idols, anger, lust, or self-pity, and ask God to perform radical surgery on our character.",
    biblicalTruth: "God does not just want to reform your bad habits; He wants to conform you to the image of His Son.",
    reflectionQuestions: [
      "Are there defects of character (pride, anger, isolation, gossip) you secretly enjoy or protect?",
      "Are you willing to let God strip away old defense mechanisms?",
      "What fruit of the Spirit (Gal 5:22-23) do you desperately need cultivated in your life?"
    ],
    actionSteps: [
      "Identify the top 3 character defects that trigger your habit (e.g., loneliness, stress, resentment).",
      "Fast from one meal this week to practice denying the flesh and feeding the spirit.",
      "Pray Psalm 51:10 three times a day."
    ],
    prayer: "Lord, I am the clay, You are the Potter. Mold me, break me, and reshape me. Take away every appetite and disposition that dishonors Your name. Amen.",
    affirmation: "I am God's workmanship, created in Christ Jesus unto good works (Eph 2:10)."
  },
  {
    step: 7,
    title: "Reconciliation & Restitution",
    subtitle: "Making Amends to Those We Have Harmed Whenever Possible",
    biblicalTheme: "Biblical Restitution & Peacemaking",
    scripture: {
      reference: "Matthew 5:23-24 & Luke 19:8",
      text: "Therefore if thou bring thy gift to the altar, and there rememberest that thy brother hath ought against thee; Leave there thy gift before the altar, and go thy way; first be reconciled to thy brother..."
    },
    summary: "We compile a list of all persons we have injured through our addiction, deceit, neglect, or selfishness, and take biblical steps of restitution.",
    biblicalTruth: "Restitution restores dignity, builds trust, and testifies to the transforming reality of the Gospel.",
    reflectionQuestions: [
      "Who suffered the collateral damage of your habit (spouses, children, parents, employers)?",
      "Is there financial, emotional, or practical restitution you need to make?",
      "Are there situations where direct contact would injure innocent parties and require indirect amends or prayer?"
    ],
    actionSteps: [
      "Create an Amends List categorized: (1) Immediate, (2) Later, (3) Indirect/Prayer Only.",
      "Consult with your sponsor or pastor before making difficult amends.",
      "Deliver humble, sincere apologies without making excuses or pointing out their wrongs."
    ],
    prayer: "Lord God, give me courage to face those I have hurt. Fill my mouth with genuine repentance and humility. Heal the wounds my sin has caused in innocent lives. Amen.",
    affirmation: "As much as lieth in me, I will live peaceably with all men (Rom 12:18)."
  },
  {
    step: 8,
    title: "Renewing the Mind in the Word",
    subtitle: "Daily Immersion in Scripture & Biblical Meditation",
    biblicalTheme: "The Living Sword of the Spirit",
    scripture: {
      reference: "Romans 12:2 & Psalm 119:9-11",
      text: "And be not conformed to this world: but be ye transformed by the renewing of your mind... Wherewithal shall a young man cleanse his way? by taking heed thereto according to thy word. Thy word have I hid in mine heart, that I might not sin against thee."
    },
    summary: "You cannot defeat spiritual warfare with empty willpower. You must overwrite corrupted neural pathways with the pure, living Word of God.",
    biblicalTruth: "The mind governed by the flesh is death, but the mind governed by the Spirit is life and peace (Rom 8:6).",
    reflectionQuestions: [
      "What percentage of your mental intake each day is secular media vs. God's Word?",
      "What specific scripture can you wield as a sword when your trigger strikes?",
      "How does hiding God's Word in your heart protect you from backsliding?"
    ],
    actionSteps: [
      'Commit to the "First 15" rule: 15 minutes of Scripture before touching social media or news in the morning.',
      "Write 3 recovery memory verses on index cards or lock screens.",
      "Meditate on Psalm 1 daily."
    ],
    prayer: "Lord, wash my thoughts with the water of Your Word. Cleanse every impure image and habituated fantasy. May the meditation of my heart be pleasing in Your sight. Amen.",
    affirmation: "I bring every thought into captivity to the obedience of Christ (2 Cor 10:5)."
  },
  {
    step: 9,
    title: "Daily Vigilance, Prayer & Walking in the Spirit",
    subtitle: "Continual Spiritual Examination & Putting on the Armor of God",
    biblicalTheme: "Ongoing Discipleship & Sobriety",
    scripture: {
      reference: "Galatians 5:16 & 1 Corinthians 10:12-13",
      text: "Walk in the Spirit, and ye shall not fulfil the lust of the flesh... Wherefore let him that thinketh he standeth take heed lest he fall. There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able..."
    },
    summary: "Recovery is a daily walk, not a one-time event. We continue daily personal inventory, confessing stumbles immediately, and abiding in Christ moment by moment.",
    biblicalTruth: "The battle is won or lost in the first 5 seconds of temptation. Run to Christ instantly.",
    reflectionQuestions: [
      "Are you aware of the H.A.L.T. triggers (Hungry, Angry, Lonely, Tired)?",
      "When you stumble in thought or attitude, do you repent immediately or dwell in guilt?",
      "How does your prayer life protect your spiritual perimeter?"
    ],
    actionSteps: [
      "Do a 5-minute nightly review: (1) Where was God present? (2) Where was I selfish? (3) What do I need to confess?",
      "Keep your accountability partner on speed dial and call whenever cravings peak.",
      'Practice the "10-Second Jesus Pause" whenever triggered.'
    ],
    prayer: "Holy Spirit, fill me afresh right now. Order my steps. Give me instant discernment to recognize the bait of Satan and flee youthful lusts. Amen.",
    affirmation: "No temptation has overtaken me except what is common to man; and God is faithful to make a way of escape."
  },
  {
    step: 10,
    title: "Service, Testimony & Ministry to Others",
    subtitle: "Carrying the Message of Deliverance to Those Still Bound",
    biblicalTheme: "Comforting with the Comfort We Received",
    scripture: {
      reference: "2 Corinthians 1:3-4 & Galatians 6:1-2",
      text: "Blessed be God... who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble, by the comfort wherewith we ourselves are comforted of God... Bear ye one another's burdens, and so fulfil the law of Christ."
    },
    summary: "Having experienced the deliverance of Jesus Christ, we practice these principles in all our affairs and share our testimony with those still trapped in addiction.",
    biblicalTruth: "Your past misery becomes your greatest ministry when surrendered to Jesus.",
    reflectionQuestions: [
      "Who in your life or community is struggling right now with the very chains God broke off of you?",
      "How does serving others keep your own heart grounded in gratitude and humility?",
      "Are you willing to be a voice of hope and an accountability partner for a newcomer?"
    ],
    actionSteps: [
      "Share your testimony in the Path to Freedom meeting or community prayer wall.",
      "Mentor or pray with someone earlier on the recovery path.",
      "Volunteer time in service at church or local recovery ministry."
    ],
    prayer: "Lord, use my scars to heal others. Let my testimony bring glory to Your Son Jesus Christ. Make me an instrument of Your peace and deliverance to the broken. Amen.",
    affirmation: "They overcame him by the blood of the Lamb, and by the word of their testimony (Rev 12:11)."
  }
];

// src/content/recoveryTeachings.ts
var RECOVERY_TEACHINGS_DATA = [
  {
    id: "rec_teach_1",
    title: "Celebrate Recovery: Lesson 1 - Denial",
    speaker: "Pastor John Baker",
    duration: "28:15",
    category: "substance",
    audioUrl: "https://www.youtube.com/watch?v=O0i46mr2Zs4",
    thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "Matthew 5:3",
    description: "The foundational first lesson of Celebrate Recovery. Discover how stepping out of denial and admitting our powerlessness is the very first step toward healing our hurts, habits, and hang-ups.",
    likesCount: 1240,
    tags: ["Denial", "Surrender", "Celebrate Recovery"],
    keyQuote: "We can't heal what we won't reveal. Admitting you are powerless is where God's power begins."
  },
  {
    id: "rec_teach_2",
    title: "Radical Deliverance from 22 Years of Addiction",
    speaker: "Todd White",
    duration: "14:30",
    category: "deliverance",
    audioUrl: "https://www.youtube.com/watch?v=3FHL2mHDv3A",
    thumbnailUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "2 Corinthians 5:17",
    description: "An incredibly powerful testimony of how the radical grace of Jesus Christ completely shattered a 22-year severe drug addiction, turning a broken atheist into an evangelist overnight.",
    likesCount: 3890,
    tags: ["Testimony", "Deliverance", "Grace"],
    keyQuote: "When Jesus sets you free, He doesn't just modify your behavior, He gives you a brand new heart."
  },
  {
    id: "rec_teach_3",
    title: "How to Break Bad Habits & Addictions",
    speaker: "Pastor Michael Todd",
    duration: "45:12",
    category: "purity",
    audioUrl: "https://www.youtube.com/watch?v=Z1Bw7wdtJdc",
    thumbnailUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "Romans 12:2",
    description: "A deeply relatable, practical, and highly spiritual teaching on how the enemy uses habits to build strongholds, and the exact steps to rewire your mind through the Holy Spirit.",
    likesCount: 5210,
    tags: ["Mind Renewal", "Habits", "Transformation"],
    keyQuote: "You cannot defeat a spiritual stronghold with physical willpower alone."
  },
  {
    id: "rec_teach_4",
    title: "Breaking The Cycle of Shame",
    speaker: "Pastor Steven Furtick",
    duration: "38:45",
    category: "grace",
    audioUrl: "https://www.youtube.com/watch?v=syzWK9rDyjA",
    thumbnailUrl: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "Romans 8:1",
    description: "Relapse and struggle often produce an overwhelming spiral of self-hatred. Learn the critical difference between the convicting voice of the Holy Spirit and the condemning lies of the accuser.",
    likesCount: 8900,
    tags: ["Shame", "Condemnation", "Grace"],
    keyQuote: "The enemy wants you to focus on your performance, God wants you to focus on His provision."
  },
  {
    id: "rec_teach_5",
    title: "Winning the War in Your Mind (Overcoming Anxiety)",
    speaker: "Pastor Craig Groeschel",
    duration: "32:10",
    category: "anxiety",
    audioUrl: "https://www.youtube.com/watch?v=6JWDfXScGZY",
    thumbnailUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "2 Corinthians 10:4-5",
    description: "The battlefield for recovery is in the mind. A masterful teaching on how to take every thought captive, overcome deep-seated anxiety, and replace the enemy's lies with God's truth.",
    likesCount: 6100,
    tags: ["Anxiety", "Thoughts", "Spiritual Warfare"],
    keyQuote: "Your life is always moving in the direction of your strongest thoughts."
  },
  {
    id: "rec_teach_6",
    title: "How to Overcome an Addiction",
    speaker: "Pastor Craig Groeschel",
    duration: "35:20",
    category: "general",
    audioUrl: "https://www.youtube.com/watch?v=jrvYJLInE4I",
    thumbnailUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "1 Corinthians 10:13",
    description: "A direct, compassionate, and fiercely biblical roadmap for anyone trapped in the cycle of addiction, demonstrating how the Holy Spirit provides an exit door for every temptation.",
    likesCount: 4200,
    tags: ["Addiction", "Holy Spirit", "Victory"],
    keyQuote: "Willpower doesn't work because the problem isn't just physical; it's deeply spiritual. You need God's power."
  },
  {
    id: "rec_teach_7",
    title: "Celebrate Recovery: Amends & Restitution",
    speaker: "Pastor John Baker",
    duration: "22:15",
    category: "deliverance",
    audioUrl: "https://www.youtube.com/watch?v=owK5LV7TJCY",
    thumbnailUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "Matthew 5:23-24",
    description: "A core Celebrate Recovery teaching on how to effectively make amends and seek restitution with the people harmed by our past habits, without causing further injury.",
    likesCount: 2150,
    tags: ["Amends", "Restitution", "Healing"],
    keyQuote: "Forgiveness is letting go of the past, but making amends is clearing the path for the future."
  },
  {
    id: "rec_teach_8",
    title: "Rewiring Your Mind with the Word",
    speaker: "Pastor Craig Groeschel",
    duration: "29:40",
    category: "purity",
    audioUrl: "https://www.youtube.com/watch?v=u-ZyyUGDRtU",
    thumbnailUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "Romans 12:2",
    description: "An advanced look at neuroplasticity and the Bible. Discover how immersing yourself in Scripture literally rewires the brain, overwriting old addictive pathways with God's truth.",
    likesCount: 7800,
    tags: ["Mind Renewal", "Scripture", "Transformation"],
    keyQuote: "You cannot change your life until you change your thoughts, and you cannot change your thoughts without the Word of God."
  },
  {
    id: "rec_teach_9",
    title: "How to Fight Sin Everyday",
    speaker: "John Piper",
    duration: "18:20",
    category: "anxiety",
    audioUrl: "https://www.youtube.com/watch?v=lDRQzHz_0iY",
    thumbnailUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "Galatians 5:16",
    description: "A powerful exhortation on daily spiritual vigilance. Piper breaks down why we must actively fight sin through faith in a superior promise, not just relying on willpower.",
    likesCount: 5120,
    tags: ["Vigilance", "Spiritual Warfare", "Faith"],
    keyQuote: "Sin is what you do when your heart is not satisfied with God. Fight sin with a superior satisfaction."
  },
  {
    id: "rec_teach_10",
    title: "Turn Your Pain Into Purpose",
    speaker: "Christine Caine",
    duration: "41:10",
    category: "grace",
    audioUrl: "https://www.youtube.com/watch?v=aIrwb3unP4A",
    thumbnailUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop&q=80",
    scriptureRef: "2 Corinthians 1:3-4",
    description: "Your recovery is not just about you\u2014it is preparation for your ministry. Discover how God takes the deepest trauma, shame, and brokenness and uses it to rescue others.",
    likesCount: 9240,
    tags: ["Purpose", "Ministry", "Testimony"],
    keyQuote: "God will never waste your pain. The very thing the enemy meant to destroy you will become your greatest weapon to set others free."
  }
];

// routes/recovery.ts
function createRecoveryRoutes() {
  const router2 = (0, import_express3.Router)();
  router2.get("/meetings", (_req, res) => {
    try {
      const meetings = recoveryService.getMeetings();
      res.json({ meetings });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to get meetings" });
    }
  });
  router2.post("/meetings", (req, res) => {
    try {
      const meeting = recoveryService.createMeeting(req.body);
      res.status(201).json({ meeting });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to create meeting" });
    }
  });
  router2.get("/meetings/:id", (req, res) => {
    try {
      const meeting = recoveryService.getMeetingById(req.params.id);
      if (!meeting) return res.status(404).json({ error: "Meeting not found" });
      const participants = recoveryService.getParticipants(req.params.id);
      res.json({ meeting, participants });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to get meeting" });
    }
  });
  router2.post("/meetings/:id/status", (req, res) => {
    try {
      const { status } = req.body;
      if (!status || !["scheduled", "live", "completed"].includes(status)) {
        return res.status(400).json({ error: "Valid status required" });
      }
      const updated = recoveryService.updateMeetingStatus(req.params.id, status);
      if (!updated) return res.status(404).json({ error: "Meeting not found" });
      res.json({ meeting: updated });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to update meeting status" });
    }
  });
  router2.post("/meetings/:id/join", (req, res) => {
    try {
      const { participant } = req.body;
      if (!participant || !participant.userId) {
        return res.status(400).json({ error: "Participant data required" });
      }
      const participants = recoveryService.joinMeeting(req.params.id, participant);
      res.json({ success: true, participants });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to join meeting" });
    }
  });
  router2.post("/meetings/:id/leave", (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: "userId required" });
      const participants = recoveryService.leaveMeeting(req.params.id, userId);
      res.json({ success: true, participants });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to leave meeting" });
    }
  });
  router2.get("/meetings/:id/participants", (req, res) => {
    try {
      const participants = recoveryService.getParticipants(req.params.id);
      res.json({ participants });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to get participants" });
    }
  });
  router2.post("/meetings/:id/participant-state", (req, res) => {
    try {
      const { userId, updates } = req.body;
      if (!userId || !updates) return res.status(400).json({ error: "userId and updates required" });
      const updated = recoveryService.updateParticipantState(req.params.id, userId, updates);
      res.json({ success: true, participant: updated });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to update participant state" });
    }
  });
  router2.post("/meetings/:id/signal", (req, res) => {
    try {
      const { signal } = req.body;
      if (!signal || !signal.fromUserId || !signal.type) {
        return res.status(400).json({ error: "Valid signal payload required" });
      }
      recoveryService.addSignal(req.params.id, signal);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to add signal" });
    }
  });
  router2.get("/meetings/:id/signals", (req, res) => {
    try {
      const forUserId = req.query.forUserId;
      const since = parseInt(req.query.since || "0", 10);
      if (!forUserId) return res.status(400).json({ error: "forUserId required" });
      const signals = recoveryService.getSignals(req.params.id, forUserId, since);
      res.json({ signals });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to get signals" });
    }
  });
  router2.get("/meetings/:id/chat", (req, res) => {
    try {
      const chat = recoveryService.getMeetingChat(req.params.id);
      res.json({ messages: chat });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to get chat" });
    }
  });
  router2.post("/meetings/:id/chat", (req, res) => {
    try {
      const { senderId, senderName, senderAvatar, type, content } = req.body;
      if (!senderId || !content) {
        return res.status(400).json({ error: "senderId and content are required" });
      }
      const message = recoveryService.addMeetingChatMessage(req.params.id, {
        meetingId: req.params.id,
        senderId,
        senderName: senderName || "Fellow Believer",
        senderAvatar: senderAvatar || "/icons/icon-192.svg",
        type: type || "chat",
        content
      });
      res.status(201).json({ message });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to send message" });
    }
  });
  router2.post("/meetings/:id/chat/:messageId/pray", (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: "userId is required" });
      const updated = recoveryService.togglePrayerPledge(req.params.id, req.params.messageId, userId);
      if (!updated) return res.status(404).json({ error: "Message not found" });
      res.json({ message: updated });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to update prayer pledge" });
    }
  });
  router2.post("/meetings/:id/host-action", (req, res) => {
    try {
      const result = recoveryService.performHostAction(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to execute host action" });
    }
  });
  router2.get("/teachings", (_req, res) => {
    res.json({ teachings: RECOVERY_TEACHINGS_DATA });
  });
  router2.get("/principles", (_req, res) => {
    res.json({ principles: CORE_BIBLICAL_RECOVERY_PRINCIPLES });
  });
  router2.get("/user-principles/:userId", (req, res) => {
    try {
      const progress = recoveryService.getUserPrinciples(req.params.userId);
      res.json({ progress });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to get principles progress" });
    }
  });
  router2.post("/user-principles/:userId", (req, res) => {
    try {
      const updated = recoveryService.saveUserPrinciple(req.params.userId, req.body);
      res.json({ progress: updated });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to save principle progress" });
    }
  });
  router2.get("/journal/:userId", (req, res) => {
    try {
      const journal = recoveryService.getUserJournal(req.params.userId);
      res.json(journal);
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to get journal" });
    }
  });
  router2.post("/journal/:userId/entry", (req, res) => {
    try {
      const entry = recoveryService.addJournalEntry(req.params.userId, req.body);
      res.status(201).json({ entry });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to add journal entry" });
    }
  });
  router2.post("/journal/:userId/streak", (req, res) => {
    try {
      const { streakDays, startDate } = req.body;
      const updated = recoveryService.updateJournalStreak(req.params.userId, Number(streakDays) || 1, startDate);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to update streak" });
    }
  });
  router2.get("/circles", (_req, res) => {
    try {
      const circles = recoveryService.getCircles();
      res.json({ circles });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to get circles" });
    }
  });
  router2.post("/circles/:id/checkin", (req, res) => {
    try {
      const checkin = recoveryService.addCircleCheckin(req.params.id, req.body);
      if (!checkin) return res.status(404).json({ error: "Circle not found" });
      res.status(201).json({ checkin });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to add checkin" });
    }
  });
  router2.post("/circles/:id/checkin/:checkinId/encourage", (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: "userId is required" });
      const updated = recoveryService.toggleCheckinEncouragement(req.params.id, req.params.checkinId, userId);
      if (!updated) return res.status(404).json({ error: "Checkin not found" });
      res.json({ checkin: updated });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to toggle encouragement" });
    }
  });
  router2.post("/sos", (req, res) => {
    try {
      const { userId, userName, circleId, message } = req.body;
      const targetCircleId = circleId || "circle_overcomers";
      const sosCheckin = recoveryService.addCircleCheckin(targetCircleId, {
        userId: userId || "anonymous",
        userName: userName || "Brother / Sister in Christ",
        userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=" + (userName || "SOS"),
        streakDays: 1,
        message: `\u{1F6A8} URGENT SOS PRAYER: ${message || "I am facing an intense temptation and urge right now. Please pray for me immediately and text/call if possible!"}`,
        prayerNeed: "Spiritual warfare & immediate deliverance"
      });
      res.status(201).json({
        success: true,
        message: "Urgent SOS prayer request dispatched to your accountability circle!",
        checkin: sosCheckin
      });
    } catch (err) {
      res.status(500).json({ error: err.message || "Failed to dispatch SOS" });
    }
  });
  return router2;
}

// server.ts
var import_better_sqlite33 = __toESM(require("better-sqlite3"), 1);
var import_fs7 = __toESM(require("fs"), 1);
async function startServer() {
  const app = (0, import_express4.default)();
  const PORT = 3e3;
  app.use(import_express4.default.json({ limit: "25mb" }));
  app.use(import_express4.default.urlencoded({ extended: true, limit: "25mb" }));
  app.get(
    [
      "/uploads/sermons/:filename",
      "/public/uploads/sermons/:filename",
      "/uploads/youtube_series/:filename",
      "/public/uploads/youtube_series/:filename"
    ],
    (req, res) => {
      const filename = import_path7.default.basename(req.params.filename);
      const isYouTube = req.path.includes("youtube_series");
      const folder = isYouTube ? "youtube_series" : "sermons";
      let mediaPath = import_path7.default.join(process.cwd(), "public", "uploads", folder, filename);
      if (!import_fs7.default.existsSync(mediaPath) && isYouTube) {
        const alt = import_path7.default.join("/home/ubuntu/Aura-prod/public/uploads/youtube_series", filename);
        if (import_fs7.default.existsSync(alt)) {
          mediaPath = alt;
        }
      }
      if (!import_fs7.default.existsSync(mediaPath)) {
        return res.status(404).json({ error: "Media file not found" });
      }
      const stat = import_fs7.default.statSync(mediaPath);
      const fileSize = stat.size;
      const range = req.headers.range;
      const ext = import_path7.default.extname(filename).toLowerCase();
      const mimeTypes = {
        ".mp4": "video/mp4",
        ".webm": "video/webm",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".m4a": "audio/mp4"
      };
      const contentType = mimeTypes[ext] || "application/octet-stream";
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        if (start >= fileSize) {
          res.status(416).send("Requested range not satisfiable\n" + start + " >= " + fileSize);
          return;
        }
        const chunksize = end - start + 1;
        const file = import_fs7.default.createReadStream(mediaPath, { start, end });
        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": contentType
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          "Content-Length": fileSize,
          "Content-Type": contentType,
          "Accept-Ranges": "bytes"
        };
        res.writeHead(200, head);
        import_fs7.default.createReadStream(mediaPath).pipe(res);
      }
    }
  );
  app.use("/uploads", import_express4.default.static(import_path7.default.join(process.cwd(), "public", "uploads")));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", server: "Aura Social Express Backend", timestamp: Date.now() });
  });
  app.get("/api/system/info", (req, res) => {
    const stats = db.getSystemStats();
    res.json(stats);
  });
  app.get("/api/system/version", (req, res) => {
    const pkg = require_package();
    res.json({
      version: pkg.version || "1.0.6",
      downloadUrl: "https://aura.webcraftstudio.cloud/aura.apk",
      forceUpdate: false,
      releaseNotes: "New Golden Lion App Icon, Top Status Bar visual fixes, and stability improvements. Please download this update to apply the new native icon!"
    });
  });
  app.get("/api/system/export-db", (req, res) => {
    const fullDb = db.exportFullDatabase();
    res.json(fullDb);
  });
  app.get("/api/users", (req, res) => {
    const users = db.getUsers().map((u) => {
      const { passwordHash, ...safeUser } = u;
      return { ...safeUser, hasPassword: Boolean(passwordHash) };
    });
    res.json(users);
  });
  app.get("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const { passwordHash, ...safeUser } = user;
    res.json(safeUser);
  });
  app.put("/api/users/:id", (req, res) => {
    const updated = db.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "User not found" });
    const { passwordHash, ...safeUser } = updated;
    res.json(safeUser);
  });
  app.patch("/api/users/:id", (req, res) => {
    const updated = db.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "User not found" });
    const { passwordHash, ...safeUser } = updated;
    res.json(safeUser);
  });
  app.put("/api/users/:id/status", (req, res) => {
    const { status, statusMessage } = req.body;
    const updated = db.updateUser(req.params.id, { status, statusMessage });
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  });
  app.post("/api/users/:id/follow", (req, res) => {
    const { currentUserId } = req.body;
    if (!currentUserId) return res.status(400).json({ error: "currentUserId is required" });
    const result = db.toggleFollowUser(currentUserId, req.params.id);
    if (!result) return res.status(404).json({ error: "User not found or cannot follow self" });
    res.json(result);
  });
  app.get("/api/posts", (req, res) => {
    const posts = db.getPosts();
    res.json(posts);
  });
  app.get("/api/posts/:id", (req, res) => {
    const post = db.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  });
  app.post("/api/posts", (req, res) => {
    const { authorId, authorName, authorHandle, authorAvatar, content, mediaUrls, tags, location } = req.body;
    if (!authorId || !content && (!mediaUrls || mediaUrls.length === 0)) {
      return res.status(400).json({ error: "authorId and either content or mediaUrls are required" });
    }
    const newPost = db.createPost({
      authorId,
      authorName,
      authorHandle,
      authorAvatar,
      content,
      mediaUrls: mediaUrls || [],
      tags: tags || [],
      location
    });
    res.status(201).json(newPost);
  });
  app.patch("/api/posts/:id", (req, res) => {
    const { content, mediaUrls, tags, location } = req.body;
    const updatedPost = db.updatePost(req.params.id, { content, mediaUrls, tags, location });
    if (!updatedPost) return res.status(404).json({ error: "Post not found" });
    res.json({ post: updatedPost });
  });
  app.delete("/api/posts/:id", (req, res) => {
    const success = db.deletePost(req.params.id);
    if (!success) return res.status(404).json({ error: "Post not found" });
    res.json({ success: true, id: req.params.id });
  });
  app.post("/api/posts/:id/like", (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    const result = db.toggleLikePost(req.params.id, userId);
    if (!result) return res.status(404).json({ error: "Post not found" });
    res.json(result);
  });
  app.post("/api/posts/:id/comment", (req, res) => {
    const { authorId, content } = req.body;
    if (!authorId || !content) {
      return res.status(400).json({ error: "authorId and content are required" });
    }
    const comment = db.addComment(req.params.id, authorId, content);
    if (!comment) return res.status(404).json({ error: "Post or user not found" });
    res.status(201).json(comment);
  });
  app.post("/api/posts/:id/bookmark", (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    const result = db.toggleBookmarkPost(req.params.id, userId);
    if (!result) return res.status(404).json({ error: "Post not found" });
    res.json(result);
  });
  app.post("/api/sync/restore-client-cache", (req, res) => {
    try {
      const { posts } = req.body;
      console.log(`[SYNC RECOVERY] Received ${Array.isArray(posts) ? posts.length : 0} candidate posts from client device.`);
      const result = db.syncClientPosts(posts || []);
      console.log(`[SYNC RECOVERY] Result: ${result.added} added, total now: ${result.total}`);
      res.json({
        success: true,
        added: result.added,
        total: result.total,
        posts: result.addedPosts,
        message: `Successfully recovered and saved ${result.added} post(s) into server database.`
      });
    } catch (err) {
      console.error("[SYNC RECOVERY ERROR]", err);
      res.status(500).json({ error: err.message || "Failed to sync client cache" });
    }
  });
  app.get("/api/stories", (req, res) => {
    const stories = db.getStories();
    res.json(stories);
  });
  app.post("/api/stories", (req, res) => {
    const { userId, mediaUrl, caption } = req.body;
    if (!userId || !mediaUrl) {
      return res.status(400).json({ error: "userId and mediaUrl are required" });
    }
    const story = db.createStory(userId, mediaUrl, caption);
    if (!story) return res.status(404).json({ error: "User not found" });
    res.status(201).json(story);
  });
  app.post("/api/stories/:id/view", (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    const success = db.markStorySeen(req.params.id, userId);
    res.json({ success });
  });
  app.delete("/api/stories/:id", (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    const success = db.deleteStory(req.params.id, userId);
    res.json({ success });
  });
  app.delete("/api/stories/:id/slides/:slideId", (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    const updatedStory = db.deleteStorySlide(req.params.id, req.params.slideId, userId);
    res.json({ story: updatedStory });
  });
  app.get("/api/conversations", (req, res) => {
    const userId = req.query.userId;
    const conversations = db.getConversations(userId);
    res.json(conversations);
  });
  app.post("/api/conversations", (req, res) => {
    const { creatorId, participantIds, isGroup, name } = req.body;
    if (!creatorId || !participantIds || !Array.isArray(participantIds)) {
      return res.status(400).json({ error: "creatorId and participantIds array are required" });
    }
    const conv = db.createConversation(creatorId, participantIds, Boolean(isGroup), name);
    res.status(201).json(conv);
  });
  app.get("/api/messages/:conversationId", (req, res) => {
    const messages = db.getMessages(req.params.conversationId);
    res.json(messages);
  });
  app.post("/api/messages", (req, res) => {
    const { conversationId, senderId, senderName, senderAvatar, content, mediaUrl, mediaType, audioDuration, replyTo, storyReply, callLog } = req.body;
    if (!conversationId || !senderId || !content && !mediaUrl) {
      return res.status(400).json({ error: "conversationId, senderId, and content or media are required" });
    }
    const message = db.sendMessage({
      conversationId,
      senderId,
      senderName,
      senderAvatar,
      content: content || "",
      mediaUrl,
      mediaType,
      audioDuration,
      replyTo,
      storyReply,
      callLog
    });
    try {
      const convs = db.getConversations();
      const currentConv = convs.find((c) => c.id === conversationId);
      if (currentConv && Array.isArray(currentConv.participantIds)) {
        for (const pId of currentConv.participantIds) {
          if (pId !== senderId) {
            sendPushToUser(pId, {
              type: "chat",
              title: senderName || "Aura Message",
              body: content ? content.length > 80 ? content.slice(0, 77) + "..." : content : mediaType === "audio" ? "\u{1F3A4} Voice message" : "\u{1F4F7} Image",
              icon: senderAvatar || "/icons/icon-192.svg",
              actionId: conversationId,
              url: `/?tab=chat&conversationId=${encodeURIComponent(conversationId)}`
            });
          }
        }
      }
    } catch (pushErr) {
      console.warn("Message push delivery note:", pushErr);
    }
    res.status(201).json(message);
  });
  app.post("/api/messages/:conversationId/:messageId/reaction", (req, res) => {
    const { emoji, userId } = req.body;
    if (!emoji || !userId) {
      return res.status(400).json({ error: "emoji and userId are required" });
    }
    const reactions = db.addMessageReaction(req.params.conversationId, req.params.messageId, emoji, userId);
    if (!reactions) return res.status(404).json({ error: "Message not found" });
    res.json(reactions);
  });
  const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "BBAX1ipe_zcn6CoRkoW9a9cw65QRsBKRXKdhdzqxrY00PqpetVxtI7SJ7-ZTcQLozOzIwsL-Sg9D7U-qfERMxZs";
  const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "OCB5cJ_HHQhpQX5kcRdf4jr_hMBhnGPdsV52v2M76SA";
  const VAPID_MAILTO = process.env.VAPID_MAILTO || "mailto:admin@cloudcraftstudio.com";
  import_web_push.default.setVapidDetails(VAPID_MAILTO, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  const authDb = new import_better_sqlite33.default(import_path7.default.join(process.cwd(), "data", "auth.db"));
  authDb.exec(`
    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      endpoint TEXT NOT NULL UNIQUE,
      p256dh TEXT NOT NULL,
      auth TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_push_user_id ON push_subscriptions(user_id);
  `);
  app.get("/api/push/vapid-key", (req, res) => {
    res.json({ publicKey: VAPID_PUBLIC_KEY });
  });
  app.post("/api/push/subscribe", (req, res) => {
    const { userId, subscription } = req.body;
    if (!userId || !subscription || !subscription.endpoint || !subscription.keys) {
      return res.status(400).json({ error: "userId and subscription keys required" });
    }
    try {
      const stmt = authDb.prepare(`
        INSERT INTO push_subscriptions (user_id, endpoint, p256dh, auth, created_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(endpoint) DO UPDATE SET
          user_id = excluded.user_id,
          p256dh = excluded.p256dh,
          auth = excluded.auth,
          created_at = excluded.created_at
      `);
      stmt.run(userId, subscription.endpoint, subscription.keys.p256dh, subscription.keys.auth, Date.now());
      res.status(201).json({ success: true });
    } catch (err) {
      console.error("Failed to save push subscription:", err);
      res.status(500).json({ error: "Failed to store subscription" });
    }
  });
  const sendPushToUser = async (userId, payload) => {
    try {
      const subs = authDb.prepare("SELECT * FROM push_subscriptions WHERE user_id = ?").all(userId);
      if (!subs || subs.length === 0) {
        return;
      }
      for (const sub of subs) {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        };
        import_web_push.default.sendNotification(pushSubscription, JSON.stringify(payload), {
          urgency: "high",
          TTL: 86400
        }).catch((err) => {
          if (err.statusCode === 404 || err.statusCode === 410) {
            authDb.prepare("DELETE FROM push_subscriptions WHERE endpoint = ?").run(sub.endpoint);
          }
        });
      }
    } catch (err) {
      console.error("Error dispatching push notifications:", err);
    }
  };
  const broadcastPush = async (payload) => {
    try {
      const subs = authDb.prepare("SELECT * FROM push_subscriptions").all();
      if (!subs || subs.length === 0) return;
      for (const sub of subs) {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        };
        import_web_push.default.sendNotification(pushSubscription, JSON.stringify(payload), {
          urgency: "high",
          TTL: 86400
        }).catch((err) => {
          if (err.statusCode === 404 || err.statusCode === 410) {
            authDb.prepare("DELETE FROM push_subscriptions WHERE endpoint = ?").run(sub.endpoint);
          }
        });
      }
    } catch (err) {
      console.error("Error broadcasting push notification:", err);
    }
  };
  app.post("/api/push/test-daily-verse", (req, res) => {
    const { userId } = req.body;
    const devotionalVerses = [
      { ref: "Joshua 1:9", text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
      { ref: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
      { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding." },
      { ref: "Psalm 23:1", text: "The Lord is my shepherd; I lack nothing." },
      { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him." },
      { ref: "Isaiah 40:31", text: "Those who hope in the Lord will renew their strength. They will soar on wings like eagles." },
      { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." }
    ];
    const picked = devotionalVerses[Math.floor(Math.random() * devotionalVerses.length)];
    const payload = {
      type: "DAILY_DEVOTIONAL",
      action: "devotional",
      title: `\u{1F4D6} Verse of the Day: ${picked.ref}`,
      body: `"${picked.text}"`,
      url: "/?tab=devotional",
      tag: "daily-devotional"
    };
    if (userId) {
      sendPushToUser(userId, payload);
    } else {
      broadcastPush(payload);
    }
    res.json({ success: true, message: "Daily verse push dispatched", verse: picked });
  });
  app.post("/api/push/test-call", (req, res) => {
    const { userId, isVideo } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    setTimeout(() => {
      const testRoomId = "room_test_" + Date.now();
      sendPushToUser(userId, {
        type: "CALL_INCOMING",
        action: "incoming_call",
        title: `\u{1F4DE} Incoming ${isVideo ? "Video" : "Audio"} Call (Test Ring)`,
        body: "Aura Call Test is ringing your device. Tap to answer!",
        callerId: "system_tester",
        callerName: "Aura Calling Test",
        callerAvatar: "/icons/icon-192.svg",
        roomId: testRoomId,
        isVideo: isVideo !== false,
        url: `/?action=incoming_call&roomId=${encodeURIComponent(testRoomId)}&callerId=system_tester&isVideo=${isVideo !== false}`
      });
    }, 3500);
    res.json({ success: true, message: "Test call will ring device in 3.5 seconds" });
  });
  app.post("/api/calls", (req, res) => {
    const { callerId, callerName, callerAvatar, receiverId, receiverName, receiverAvatar, isVideo, roomId } = req.body;
    if (!callerId || !receiverId || !roomId) {
      return res.status(400).json({ error: "callerId, receiverId, and roomId are required" });
    }
    const session = db.createOrUpdateCallSession({
      callerId,
      callerName,
      callerAvatar,
      receiverId,
      receiverName,
      receiverAvatar,
      isVideo: isVideo !== void 0 ? isVideo : true,
      roomId,
      status: "calling"
    });
    sendPushToUser(receiverId, {
      type: "CALL_INCOMING",
      action: "incoming_call",
      title: `\u{1F4DE} Incoming ${isVideo !== false ? "Video" : "Audio"} Call`,
      body: `${callerName || "Someone"} is calling you on Aura...`,
      callerId,
      callerName,
      callerAvatar,
      roomId,
      isVideo: isVideo !== false,
      url: `/?action=incoming_call&roomId=${encodeURIComponent(roomId)}&callerId=${encodeURIComponent(callerId)}&isVideo=${isVideo !== false}`
    });
    res.status(201).json(session);
  });
  app.get("/api/calls/pending", (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: "userId query is required" });
    const pending = db.getPendingCallsForUser(userId);
    res.json(pending);
  });
  app.get("/api/calls/:roomId", (req, res) => {
    const session = db.getCallSessionByRoomId(req.params.roomId);
    if (!session) return res.status(404).json({ error: "Call session not found" });
    res.json(session);
  });
  app.post("/api/calls/:roomId/status", (req, res) => {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "status is required" });
    const session = db.updateCallStatus(req.params.roomId, status);
    if (!session) return res.status(404).json({ error: "Call session not found" });
    if (status === "ended" || status === "declined") {
      const isMissed = !session.startedAt || session.status === "calling";
      sendPushToUser(session.receiverId, {
        type: "CALL_CANCELLED",
        action: "call_cancelled",
        roomId: req.params.roomId,
        callerName: session.callerName,
        callerAvatar: session.callerAvatar,
        isMissed: isMissed && status !== "declined"
      });
      if (status === "declined") {
        sendPushToUser(session.callerId, {
          type: "CALL_DECLINED",
          action: "call_declined",
          roomId: req.params.roomId,
          receiverName: session.receiverName
        });
      }
      try {
        const convs = db.getConversations();
        const directConv = convs.find(
          (c) => !c.isGroup && Array.isArray(c.participantIds) && c.participantIds.includes(session.callerId) && c.participantIds.includes(session.receiverId)
        );
        if (directConv) {
          const duration = session.startedAt && session.endedAt ? Math.round((session.endedAt - session.startedAt) / 1e3) : 0;
          db.sendMessage({
            conversationId: directConv.id,
            senderId: session.callerId,
            senderName: session.callerName,
            senderAvatar: session.callerAvatar,
            content: status === "declined" ? `\u274C Declined ${session.isVideo ? "Video" : "Audio"} Call` : duration > 0 ? `\u{1F4DE} ${session.isVideo ? "Video" : "Audio"} Call ended (${Math.floor(duration / 60)}m ${duration % 60}s)` : `\u{1F4DE} Missed ${session.isVideo ? "Video" : "Audio"} Call`,
            callLog: {
              callType: session.isVideo ? "video" : "audio",
              status: status === "declined" ? "declined" : duration > 0 ? "completed" : "missed",
              durationSeconds: duration
            }
          });
        }
      } catch (err) {
        console.warn("Could not auto-log call into conversation:", err);
      }
    }
    res.json(session);
  });
  app.post("/api/calls/:roomId/signal", (req, res) => {
    const { senderId, type, data } = req.body;
    if (!senderId || !type || !data) {
      return res.status(400).json({ error: "senderId, type, and data are required" });
    }
    const signal = db.addCallSignal(req.params.roomId, senderId, type, data);
    res.status(201).json(signal);
  });
  app.get("/api/calls/:roomId/signals", (req, res) => {
    const excludeSenderId = req.query.excludeSenderId;
    const since = req.query.since ? parseInt(req.query.since, 10) : 0;
    const signals = db.getCallSignals(req.params.roomId, excludeSenderId, since);
    res.json(signals);
  });
  app.get(["/api/unsplash/search", "/api/pexels/search", "/api/images/search"], async (req, res) => {
    const query = (req.query.query || req.query.q || "").trim();
    const accessKey = process.env.PEXELS_API_KEY || process.env.VITE_PEXELS_API_KEY || "cY6ajm4oZeTHCoKHGCVYvizEkWs0KGf9VU4jJ8K50AKAmeESWfqk0rkM";
    try {
      const endpoint = query ? `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=30` : `https://api.pexels.com/v1/curated?per_page=30`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: accessKey
        }
      });
      if (response.ok) {
        const data = await response.json();
        const photos = data.photos || [];
        if (Array.isArray(photos) && photos.length > 0) {
          const results = photos.map((p) => ({
            id: p.id.toString(),
            url: p.src?.large || p.src?.original || p.src?.medium,
            thumb: p.src?.medium || p.src?.small,
            author: p.photographer || "Pexels Creator",
            photographer_url: p.photographer_url,
            alt_description: p.alt || `${query || "Worship"} background`,
            urls: {
              regular: p.src?.large || p.src?.original,
              full: p.src?.original,
              small: p.src?.medium || p.src?.small,
              thumb: p.src?.small || p.src?.tiny || p.src?.medium
            },
            user: {
              name: p.photographer || "Pexels Creator"
            }
          }));
          return res.json({ results });
        }
      } else {
        console.warn(`Pexels API returned status ${response.status}`);
      }
    } catch (err) {
      console.warn("Pexels upstream fetch error, using curated presets:", err.message);
    }
    const CURATED_FALLBACK = [
      { id: "curated_1", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80", thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&auto=format&fit=crop&q=80", author: "Benjamin Davies" },
      { id: "curated_2", url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&auto=format&fit=crop&q=80", thumb: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&auto=format&fit=crop&q=80", author: "Aaron Burden" },
      { id: "curated_3", url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1200&auto=format&fit=crop&q=80", thumb: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=400&auto=format&fit=crop&q=80", author: "Patrick Fore" },
      { id: "curated_4", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80", thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80", author: "Sean Oulashin" },
      { id: "curated_5", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80", thumb: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80", author: "Eberhard Grossgasteiger" },
      { id: "curated_6", url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&auto=format&fit=crop&q=80", thumb: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&auto=format&fit=crop&q=80", author: "Ben White" },
      { id: "curated_7", url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1200&auto=format&fit=crop&q=80", thumb: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&auto=format&fit=crop&q=80", author: "Mohamed Nohassi" },
      { id: "curated_8", url: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?w=1200&auto=format&fit=crop&q=80", thumb: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?w=400&auto=format&fit=crop&q=80", author: "Priscilla Du Preez" }
    ];
    return res.json({ results: CURATED_FALLBACK, fallback: true });
  });
  app.post("/api/bible-study/generate", async (req, res) => {
    try {
      const { topic, isVerseOfDay } = req.body;
      const { GoogleGenAI: GoogleGenAI2, Type } = await import("@google/genai");
      const ai = new GoogleGenAI2({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });
      const promptString = isVerseOfDay ? `You are AI Tutor King James, well versed on anything about the Bible. Provide a beautiful Verse of the Day from the King James Version (KJV). Then provide a full breakdown including summary, historical context, Hebrew/Greek bites, comparison to now, application, and a prayer.` : `You are AI Tutor King James, well versed on anything about the Bible. The user wants a study on: "${topic}". Use the King James Version (KJV) for all scripture references. Provide a full summary, historical context (who wrote it, time period, target audience), Hebrew/Greek bites (real definitions for context), comparison to now, how to apply it day-to-day, and a prayer.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: promptString,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reference: { type: Type.STRING, description: "The Bible reference, e.g. John 3:16 or Genesis 1" },
              text: { type: Type.STRING, description: "The actual KJV text of the verse or passage" },
              summary: { type: Type.STRING, description: "Full summary of the passage" },
              historicalContext: {
                type: Type.OBJECT,
                properties: {
                  author: { type: Type.STRING },
                  timePeriod: { type: Type.STRING },
                  setting: { type: Type.STRING },
                  targetAudience: { type: Type.STRING }
                }
              },
              hebrewGreekBites: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING, description: "The original Hebrew or Greek word" },
                    definition: { type: Type.STRING, description: "The real definition to help understand context" }
                  }
                }
              },
              compareAndContrast: { type: Type.STRING, description: "Comparison from then until now" },
              application: { type: Type.STRING, description: "How to apply it to our day-to-day lives" },
              prayer: { type: Type.STRING, description: "A prayer relating to this study" }
            },
            required: ["reference", "text", "summary", "historicalContext", "hebrewGreekBites", "compareAndContrast", "application", "prayer"]
          }
        }
      });
      let parsed;
      try {
        parsed = JSON.parse(response.text?.trim() || "{}");
      } catch (e) {
        return res.status(500).json({ error: "Failed to parse AI response" });
      }
      res.json(parsed);
    } catch (err) {
      console.error("Bible study generation error:", err);
      res.status(500).json({ error: err.message || "Error generating bible study" });
    }
  });
  app.post("/api/bible-study/audio", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || !text.trim()) {
        return res.status(400).json({ error: "Text is required for audio synthesis" });
      }
      const result = await synthesizeBibleAudio(text);
      res.json({
        audio: result.audio,
        audioData: result.audio,
        format: result.format,
        mimeType: result.mimeType,
        sampleRate: result.sampleRate,
        source: result.source
      });
    } catch (err) {
      console.error("TTS error:", err);
      res.status(500).json({ error: err.message || "Error generating audio" });
    }
  });
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      const { GoogleGenAI: GoogleGenAI2 } = await import("@google/genai");
      const ai = new GoogleGenAI2({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });
      const response = await ai.models.generateImages({
        model: "imagen-3.0-generate-002",
        prompt,
        config: {
          aspectRatio: "1:1",
          numberOfImages: 1,
          outputMimeType: "image/jpeg"
        }
      });
      let imageUrl = null;
      if (response.generatedImages && response.generatedImages.length > 0) {
        const imageBytes = response.generatedImages[0].image.imageBytes;
        imageUrl = `data:image/jpeg;base64,${imageBytes}`;
      }
      if (imageUrl) {
        res.json({ imageUrl });
      } else {
        res.status(500).json({ error: "No image generated" });
      }
    } catch (err) {
      console.error("Image generation error:", err);
      res.status(500).json({ error: err.message || "Error generating image" });
    }
  });
  try {
    const bibleDbPath = import_path7.default.join(process.cwd(), "data", "bible", "bible_study.db");
    initializeBibleDB(bibleDbPath);
    const bibleDB = new BibleStudyDB(bibleDbPath);
    const bibleRoutes = createBibleRoutes(bibleDB);
    app.use("/api/bible", bibleRoutes);
    startYoutubeFolderWatcher(bibleDB);
    app.get("/api/bible/community/sermons", async (_req, res) => {
      try {
        const feed = await getLiveMinistryFeed();
        res.json(feed);
      } catch (err) {
        console.error("[Community Sermons] Error:", err);
        res.status(500).json({ error: err.message || "Failed to load sermons" });
      }
    });
  } catch (err) {
    console.error("Failed to initialize Bible Study DB:", err);
  }
  try {
    const authDbPath = import_path7.default.join(process.cwd(), "data", "auth.db");
    const authDb2 = new import_better_sqlite33.default(authDbPath);
    const schemaPath = import_path7.default.join(process.cwd(), "data", "auth_schema.sql");
    const schema = import_fs7.default.readFileSync(schemaPath, "utf-8");
    authDb2.exec(schema);
    const authService = new AuthService(authDb2);
    const authRoutes = createAuthRoutes(authService);
    app.use("/api/auth", authRoutes);
  } catch (err) {
    console.error("Failed to initialize Auth DB:", err);
  }
  try {
    const recoveryRoutes = createRecoveryRoutes();
    app.use("/api/recovery", recoveryRoutes);
  } catch (err) {
    console.error("Failed to initialize Recovery routes:", err);
  }
  app.get("/api/app-update/version", (req, res) => {
    try {
      const manifestPath = import_path7.default.join(process.cwd(), "public", "update-manifest.json");
      if (import_fs7.default.existsSync(manifestPath)) {
        return res.json(JSON.parse(import_fs7.default.readFileSync(manifestPath, "utf8")));
      }
      res.json({ version: "1.0.0", url: "https://aura.webcraftstudio.cloud/dist.zip" });
    } catch (e) {
      res.status(500).json({ error: "Failed to read manifest" });
    }
  });
  app.get("/aura.apk", (req, res) => {
    const distApk = import_path7.default.join(process.cwd(), "dist", "aura.apk");
    const publicApk = import_path7.default.join(process.cwd(), "public", "aura.apk");
    const apkPath = import_fs7.default.existsSync(distApk) ? distApk : import_fs7.default.existsSync(publicApk) ? publicApk : null;
    if (apkPath) {
      res.setHeader("Content-Disposition", "attachment; filename=aura.apk");
      res.setHeader("Content-Type", "application/vnd.android.package-archive");
      return res.sendFile(apkPath);
    }
    res.status(404).send("APK not found");
  });
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path7.default.join(process.cwd(), "dist");
    app.use(import_express4.default.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = import_path7.default.join(distPath, "index.html");
      if (import_fs7.default.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application build not found. Please build the frontend first.");
      }
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aura Server running on http://localhost:${PORT}`);
  });
}
startServer();
