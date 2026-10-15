// All personal content lives here. Source: Reza Habibi CV.
// Items marked PLACEHOLDER are not in the CV yet; replace them with real details.

export type Decision = { title: string; text: string; art: Art };
export type Art = "commerce" | "stream" | "film" | "ledger" | "api" | "deploy";

export type Project = {
  slug: string;
  company: string;
  title: string;
  period: string;
  role: string;
  blurb: string;
  stack: string[];
  bg: string;
  ink: string;
  art: Art;
  headline: string;
  overview: string;
  goals: string[];
  problem: string;
  solution: string;
  outcome: string;
  decisions: Decision[];
  closing: { title: string; text: string };
};

export const site = {
  name: "Reza Habibi",
  firstName: "Reza",
  monogram: "Rh.",
  role: "Backend Developer",
  location: "Herat, Afghanistan",
  year: 2026,
  email: "rezahabibi.tech@gmail.com",
  phone: "+93 79 614 6514",
  phoneHref: "+93796146514",
  url: "https://rezahabibi.dev", // PLACEHOLDER: production domain
  summary:
    "Backend developer with 6+ years building scalable APIs, real-time media servers and video pipelines with Node.js and NestJS.",
  intro:
    "I build the backend that keeps products fast and reliable: clean REST and GraphQL APIs, real-time media with Mediasoup, and video encoding pipelines. Currently at Hindukosh-Bridge. Computer Science graduate, Herat University.",
  socials: [
    { label: "LinkedIn", href: "#" }, // PLACEHOLDER
    { label: "GitHub", href: "#" }, // PLACEHOLDER
    { label: "Email", href: "mailto:rezahabibi.tech@gmail.com" },
  ],
  skills: [
    "Node.js · NestJS",
    "GraphQL & REST APIs",
    "TypeORM · Prisma · Mongoose",
    "SQL · NoSQL · Redis",
    "Linux · Nginx · Docker · PM2 · SSL",
    "Mediasoup · WebRTC",
  ],
  assistant: {
    name: "Byte",
    tagline: "Byte answers questions about my backend work",
  },
};

export const projects: Project[] = [
  {
    slug: "hindukosh-bridge-case-study",
    company: "Hindukosh-Bridge",
    title: "Movies, Live Streaming & Video Encoding",
    period: "2024 — Present",
    role: "Backend developer",
    blurb:
      "Backend services for a movie catalogue, live streaming and an encoding pipeline that keeps processing and delivery smooth.",
    stack: ["NestJS", "FFmpeg", "Redis", "Docker"],
    bg: "#f6e8cd",
    ink: "#5c4304",
    art: "film",
    headline:
      "A video platform where uploads, encodes and live streams share one backend.",
    overview:
      "Hindukosh-Bridge runs a movie catalogue and live streaming product. I work on the backend services behind it: the catalogue API, the live streaming services and the pipeline that turns uploaded files into stream-ready video.",
    goals: [
      "Keep playback smooth for viewers on very different connections.",
      "Process new uploads without blocking the rest of the platform.",
      "Give the content team a predictable path from upload to published title.",
    ],
    problem:
      "Video work is heavy and slow. Encoding a single title can take minutes, and doing that inside the request cycle ties up the API that viewers depend on.",
    solution:
      "Split the work. The API accepts an upload and records a job; background workers pick it up, encode it into several renditions and report progress. The catalogue only exposes a title when every rendition is ready.",
    outcome:
      "Uploads, encoding and playback now run as separate services, so a busy encode queue no longer slows down browsing or streaming. PLACEHOLDER: add real throughput or latency numbers if you have them.",
    decisions: [
      {
        title: "Queue the heavy work, keep the API light",
        text: "Encoding jobs go onto a Redis-backed queue. Workers scale on their own, and the API stays responsive while long jobs run.",
        art: "film",
      },
      {
        title: "Several renditions for every title",
        text: "Each upload produces multiple resolutions so the player can step down on a weak connection instead of stalling.",
        art: "stream",
      },
      {
        title: "Publish only when everything is ready",
        text: "A title moves to published only after every rendition passes. Viewers never see a half-processed movie.",
        art: "api",
      },
    ],
    closing: {
      title: "Still shipping",
      text: "This is my current role. The services keep growing with the catalogue and the live schedule.",
    },
  },
  {
    slug: "microcis-case-study",
    company: "Microcis Company",
    title: "Real-time Media Server",
    period: "2022 — 2024",
    role: "Backend developer",
    blurb:
      "A Mediasoup media server for live streaming with low latency and stable real-time delivery, plus the REST and GraphQL APIs around it.",
    stack: ["Mediasoup", "WebRTC", "GraphQL", "Node.js"],
    bg: "#def4f0",
    ink: "#1c601c",
    art: "stream",
    headline:
      "Live streams that stay live: a Mediasoup media server built for low latency.",
    overview:
      "At Microcis I built and maintained the media server behind the company's live streaming features, together with the REST and GraphQL APIs that rooms, users and sessions run on.",
    goals: [
      "Deliver audio and video with as little delay as possible.",
      "Stay stable when people join, leave and reconnect mid-stream.",
      "Expose clean APIs so the apps could manage rooms without knowing media internals.",
    ],
    problem:
      "Peer-to-peer video falls apart past a handful of participants, and every dropped connection is visible to everyone in the room.",
    solution:
      "A selective forwarding unit on Mediasoup. Each participant sends one stream to the server, and the server forwards it to everyone else. Signalling, room state and permissions live in a separate API layer.",
    outcome:
      "The apps got real-time rooms and broadcasts on infrastructure the team controlled end to end. PLACEHOLDER: add concurrency or latency figures if available.",
    decisions: [
      {
        title: "Forward, do not mix",
        text: "An SFU forwards streams instead of decoding and mixing them, which keeps CPU use low and latency short.",
        art: "stream",
      },
      {
        title: "Signalling separate from media",
        text: "Room state and auth run through the API layer; the media workers only move packets. Each side can restart without taking the other down.",
        art: "api",
      },
      {
        title: "Plan for reconnects",
        text: "Clients drop on mobile networks. The server keeps enough state to let them rejoin a room quickly without a full reset.",
        art: "deploy",
      },
    ],
    closing: {
      title: "What it led to",
      text: "The real-time experience from this role carried straight into the live streaming work at Hindukosh-Bridge.",
    },
  },
  {
    slug: "berang-case-study",
    company: "Berang Technology",
    title: "E-commerce & Accounting Backends",
    period: "2020 — 2022",
    role: "Backend developer",
    blurb:
      "Scalable services for carpet and retail online shops and a local accounting system, with secure APIs built for performance and clean architecture.",
    stack: ["REST", "GraphQL", "TypeORM", "SQL"],
    bg: "#e8edfd",
    ink: "#2a34c6",
    art: "commerce",
    headline:
      "Online shops and a local accounting system on one clean, secure API foundation.",
    overview:
      "Berang Technology built online stores for carpet sellers and retail shops, plus an accounting system for local businesses. I developed and maintained the backend services for these products.",
    goals: [
      "Give each shop a fast, reliable catalogue and checkout.",
      "Keep financial records accurate and secure.",
      "Reuse one architecture across several client products.",
    ],
    problem:
      "Each client needed something slightly different, but rebuilding the backend for every shop would have been slow and hard to maintain.",
    solution:
      "A shared, layered architecture: domain modules for products, orders and ledgers, exposed through REST and GraphQL, with per-client configuration on top.",
    outcome:
      "New shops launched on the same tested foundation, and the accounting system shared its data layer with the stores. PLACEHOLDER: add client counts or performance numbers if available.",
    decisions: [
      {
        title: "Carpets are not t-shirts",
        text: "Handmade carpets have unique sizes, origins and materials. The product model supports rich attributes instead of fixed variants.",
        art: "commerce",
      },
      {
        title: "Ledgers are append-only",
        text: "Accounting entries are never edited in place. Corrections are new entries, so the history always adds up.",
        art: "ledger",
      },
      {
        title: "REST and GraphQL from one core",
        text: "Both APIs call the same services, so business rules live in one place whichever API a client prefers.",
        art: "api",
      },
    ],
    closing: {
      title: "Where it started",
      text: "This was my first professional backend role, and the clean-architecture habits from it shaped everything after.",
    },
  },
];

// Home "systems" list, mirrors the reference's enterprise list.
export const systems = [
  {
    title: "Carpet marketplace API",
    text: "Catalogue, search and orders for handmade carpets with unique sizes, origins and materials.",
    company: "Berang",
  },
  {
    title: "Local accounting system",
    text: "Append-only ledgers, invoices and reports for small businesses, built on a SQL core.",
    company: "Berang",
  },
  {
    title: "Live room signalling",
    text: "The API layer that creates rooms, admits participants and hands them to the media server.",
    company: "Microcis",
  },
  {
    title: "Encoding job queue",
    text: "Redis-backed workers that turn uploads into stream-ready renditions without blocking the API.",
    company: "Hindukosh-Bridge",
  },
];

// Work page "fun time" section. PLACEHOLDER topics: replace with your own side projects.
export const playground = [
  {
    title: "Rate limits that forgive",
    text: "A Redis token-bucket limiter that lets short bursts through and still protects the API.",
    bg: "#e6ddfb",
  },
  {
    title: "Zero-downtime deploys",
    text: "Nginx, Docker and PM2 together so a release never drops a request.",
    bg: "#dcecd3",
  },
  {
    title: "Same schema, two ORMs",
    text: "One data model in TypeORM and Prisma, compared on migrations, typing and query output.",
    bg: "#dce7f8",
  },
  {
    title: "Load-testing a live room",
    text: "Simulated participants against a Mediasoup room to find where quality starts to drop.",
    bg: "#ffffff",
  },
];

export const about = [
  "I am a backend developer from Herat. I studied Computer Science at Herat University, in the Database department, and have been building production backends since 2020.",
  "My work has covered online shops, accounting, real-time media and video. The thread through all of it is the same: clear APIs, careful data models, and services that stay calm under load.",
];

export const experience = [
  {
    company: "Hindukosh-Bridge",
    role: "Backend developer",
    place: "Herat",
    period: "2024 — Present",
    text: "Backend services for movies, live streaming and video encoding, keeping processing and delivery smooth.",
  },
  {
    company: "Microcis Company",
    role: "Backend developer",
    place: "Herat",
    period: "2022 — 2024",
    text: "Built and maintained a Mediasoup media server for low-latency live streaming. Developed REST and GraphQL services and APIs.",
  },
  {
    company: "Berang Technology Company",
    role: "Backend developer",
    place: "Herat",
    period: "2020 — 2022",
    text: "Scalable backend services for carpet and retail e-commerce platforms and a local accounting system, with secure REST and GraphQL APIs.",
  },
];

export const education = {
  school: "Herat University — Computer Science Faculty",
  period: "2016 — 2021",
  text: "Database department: database design and data management.",
};

// Optional resume sections. Empty arrays are hidden.
export const certifications: { title: string; issuer: string; year: string }[] =
  [];
export const awards: { title: string; year: string }[] = [];

// Canned answers for the assistant (no external AI call).
export const faq = [
  {
    q: "What do you build?",
    a: "Backend services: REST and GraphQL APIs, real-time media servers and video encoding pipelines, mostly with Node.js and NestJS.",
    keys: ["build", "work", "make", "project", "experience"],
  },
  {
    q: "Real-time experience?",
    a: "At Microcis I built and maintained a Mediasoup media server for low-latency live streaming.",
    keys: ["real", "live", "stream", "mediasoup", "webrtc", "video"],
  },
  {
    q: "Which databases?",
    a: "SQL and NoSQL databases plus Redis, through TypeORM, Prisma and Mongoose.",
    keys: ["database", "sql", "redis", "mongo", "prisma", "typeorm", "data"],
  },
  {
    q: "Can you deploy too?",
    a: "Yes. Linux, Nginx, Docker, PM2 and SSL are part of my everyday toolkit.",
    keys: ["deploy", "devops", "docker", "nginx", "linux", "server"],
  },
  {
    q: "Where did you study?",
    a: "Computer Science at Herat University, 2016 to 2021, in the Database department.",
    keys: ["study", "university", "education", "degree"],
  },
  {
    q: "How do I contact you?",
    a: "Email rezahabibi.tech@gmail.com or call +93 79 614 6514.",
    keys: ["contact", "email", "hire", "phone", "reach"],
  },
];
