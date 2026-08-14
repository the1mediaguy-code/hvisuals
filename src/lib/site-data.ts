export type Level = "Beginner" | "Intermediate" | "Advanced";
export type TrackId = "design" | "video";

export interface LevelPlan {
  level: Level;
  price: number;
  deposit: number;
  upgradeFrom?: { level: Level; price: number };
  note: string;
  curriculum: string[];
  includes: string[];
}

export interface Track {
  id: TrackId;
  emoji: string;
  name: string;
  blurb: string;
  levels: LevelPlan[];
}

export const NAIRA = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const tracks: Track[] = [
  {
    id: "design",
    emoji: "🎨",
    name: "Graphic Design",
    blurb:
      "From design thinking to full brand identity systems. Learn to make work that clients pay for.",
    levels: [
      {
        level: "Beginner",
        price: 50000,
        deposit: 25000,
        note: "For fresh starters: no experience needed",
        curriculum: [
          "Design thinking & visual communication",
          "The 5 principles: alignment, contrast, repetition, proximity, hierarchy",
          "Canva mastery: tools, templates, building from scratch",
          "Color theory & brand palette building",
          "Social media graphics for all platforms",
        ],
        includes: [
          "12 live sessions (3/week, 60–90 mins)",
          "Weekly assignment + written feedback",
          "Week 1–4 class notes (PDF download)",
          "Design thinking framework guide",
          "Color theory workbook",
          "Canva mastery reference sheet",
          "Social media size guide (all platforms)",
          "WhatsApp instructor access (weekdays)",
          "Monthly progress report",
          "Student portal access",
          "Certificate of Completion: Beginner",
        ],
      },
      {
        level: "Intermediate",
        price: 75000,
        deposit: 37500,
        upgradeFrom: { level: "Beginner", price: 25000 },
        note: "Fresh start · OR ₦25,000 upgrade from Beginner",
        curriculum: [
          "Adobe Photoshop: layers, masks, smart objects",
          "Brand identity fundamentals & logo design",
          "Building a complete brand identity kit",
          "Interpreting real client creative briefs",
          "Mockup presentation & delivery",
        ],
        includes: [
          "Everything in Beginner PLUS:",
          "Adobe Photoshop quick-start guide",
          "Brand identity checklist template",
          "2 real client brief simulations",
          "Mockup presentation template pack",
          "Peer review session (group feedback)",
          "Intermediate resource library access",
          "Certificate of Completion: Intermediate",
        ],
      },
      {
        level: "Advanced",
        price: 100000,
        deposit: 50000,
        upgradeFrom: { level: "Intermediate", price: 25000 },
        note: "Fresh start · OR ₦25,000 upgrade from Intermediate",
        curriculum: [
          "Advanced Photoshop: compositing, manipulation & effects",
          "Complete brand identity systems & brand guidelines",
          "Event branding & campaign design",
          "Portfolio curation & case study writing",
          "Capstone: real client brand pitch",
        ],
        includes: [
          "Everything in Intermediate PLUS:",
          "Full brand guidelines template",
          "Event branding asset pack",
          "Campaign design framework",
          "1 live portfolio review with Emmanuel",
          "Case study writing template",
          "Capstone project (real brief)",
          "LinkedIn & portfolio strategy session",
          "Priority WhatsApp (4-hour response)",
          "Featured on H-Visuals showcase",
          "Certificate of Completion: Advanced",
        ],
      },
    ],
  },
  {
    id: "video",
    emoji: "🎬",
    name: "Video Editing",
    blurb:
      "Story-first editing in CapCut and Align Motion. Reels, event films, brand films, delivered client-ready.",
    levels: [
      {
        level: "Beginner",
        price: 80000,
        deposit: 40000,
        note: "For fresh starters: no experience needed",
        curriculum: [
          "Video storytelling fundamentals",
          "CapCut mastery: timeline and tools",
          "Editing reels & short-form to beat",
          "Colour correction & sound mixing",
          "Export settings for every platform",
        ],
        includes: [
          "12 live sessions (3/week, 60–90 mins)",
          "Weekly assignment + written feedback",
          "Week 1–4 class notes (PDF download)",
          "Video storytelling framework guide",
          "CapCut shortcut reference sheet",
          "Export settings guide (all platforms)",
          "Free audio/music resource list",
          "WhatsApp instructor access (weekdays)",
          "Monthly progress report",
          "Student portal access",
          "Certificate of Completion: Beginner",
        ],
      },
      {
        level: "Intermediate",
        price: 100000,
        deposit: 50000,
        upgradeFrom: { level: "Beginner", price: 20000 },
        note: "Fresh start · OR ₦20,000 upgrade from Beginner",
        curriculum: [
          "Advanced CapCut: multi-layer editing",
          "Long-form editing structure",
          "Colour grading techniques",
          "Audio design: music, voiceover, sound effects",
          "Event highlight reel production",
        ],
        includes: [
          "Everything in Beginner PLUS:",
          "Advanced CapCut workflow guide",
          "Colour grading LUT pack (5 free LUTs)",
          "B-roll shooting checklist",
          "Event coverage shot list template",
          "2 real brief simulations",
          "Peer review session",
          "Certificate of Completion: Intermediate",
        ],
      },
      {
        level: "Advanced",
        price: 150000,
        deposit: 75000,
        upgradeFrom: { level: "Intermediate", price: 50000 },
        note: "Fresh start · OR ₦50,000 upgrade from Intermediate",
        curriculum: [
          "Align Motion: text animations, logo reveals, lower thirds",
          "Brand films & corporate video",
          "Music video editing",
          "Client-grade file delivery",
          "Capstone: real brand film brief",
        ],
        includes: [
          "Everything in Intermediate PLUS:",
          "Align Motion starter animation pack",
          "Brand film scriptwriting template",
          "Music video edit framework",
          "1 live portfolio review with Emmanuel",
          "Client delivery checklist & file pack",
          "Capstone project (real brief)",
          "Priority WhatsApp (4-hour response)",
          "Featured on H-Visuals showcase",
          "Certificate of Completion: Advanced",
        ],
      },
    ],
  },
];

export const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

export const faqs = [
  {
    q: "Do I need experience to join?",
    a: "No experience needed for Beginner. Just bring curiosity and commitment. If you have existing skills, we assess you and place you at the right level, no time wasted.",
  },
  {
    q: "What tools do I need?",
    a: "For Design: Canva (free). For Video: CapCut (free, on your phone). Both are free to start. Advanced tools like Photoshop are introduced at Intermediate level.",
  },
  {
    q: "How long is the programme?",
    a: "Minimum 1 month per level. Each level is 12 sessions over 4 weeks. Most students do all 3 levels (3 months total) to go from Beginner to Advanced.",
  },
  {
    q: "Is it online or in-person?",
    a: "Primarily online via video call: join from anywhere in Nigeria. In-person sessions available for Lagos-based students on request.",
  },
  {
    q: "What do I get at the end?",
    a: "A Certificate of Completion for each level, a portfolio of real creative work, and the practical skills to charge clients. These are earned, not given.",
  },
  {
    q: "How do upgrade prices work?",
    a: "If you complete Beginner and want to move to Intermediate, you pay only a top-up fee, not the full price. Graphic Design: ₦25,000 top-up per level. Video Editing: ₦20,000 to Intermediate, ₦50,000 to Advanced. New students starting at a higher level pay the full price for that level.",
  },
  {
    q: "How do payments work?",
    a: "Bank transfer to Access Bank (1491527289) or card via Paystack. 50% deposit confirms your spot. Balance due before your final session. Payment plans available.",
  },
];

export const testimonials = [
  {
    name: "Ajikhe Essentials",
    role: "Broadcast Production",
    quote:
      "I met Emmanuel while studying Mass Communication at Yabatech. He delivered clean pictures and smooth transitions, the final video was the best. Working with him, I never regretted it.",
  },
  {
    name: "Willie",
    role: "Design & Video Student",
    quote:
      "You made graphic design and video editing easy for me. You're thoughtful and I love how you share your knowledge. I admire how hardworking you are.",
  },
  {
    name: "Hosanna",
    role: "Creative Student",
    quote:
      "You are indeed a creative and I look forward to more of your works. The way you approach design is something else.",
  },
  {
    name: "Ayo",
    role: "Design & Video Student",
    quote:
      "You made me fall in love with graphic design and video editing. One of the best decisions I have made, learning from you.",
  },
];

export const CONTACT = {
  email: "Emmanuelharuna675@gmail.com",
  phone: "08160695213",
  whatsapp: "https://wa.me/2348160695213",
};

export const selfPacedPrices = [
  { level: "Beginner" as Level, price: 15000, discount: 10500 },
  { level: "Intermediate" as Level, price: 30000, discount: 21000 },
  { level: "Advanced" as Level, price: 45000, discount: 31500 },
];

export const SOCIALS = {
  instagram: "https://www.instagram.com/harunavisuals",
  tiktok: "https://www.tiktok.com/@harunavisuals",
  linkedin: "https://www.linkedin.com/in/emmanuelharuna",
  twitter: "https://x.com/harunavisuals",
};
