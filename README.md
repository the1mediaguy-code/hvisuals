# Haruna Connect

# Haruna Visuals Creative Training — Full Build Prompt (Single Consolidated)

Build a premium coaching platform website for **Haruna Visuals Creative Training** — a Lagos-based graphic design and video editing training programme run by Emmanuel Haruna. The platform covers two tracks (Graphic Design and Video Editing) at three levels each (Beginner, Intermediate, Advanced), a student portal for enrolled students, a self-paced video course section (coming soon / pre-order), and an admin dashboard.

---

## DESIGN SYSTEM

### Colours

| Token | Value | Usage |
|---|---|---|
| Page background | `#FFFFFF` | Main site background |
| Section alternate | `#F8F8F8` | Every other section |
| Dark bg | `#0C0C0C` | Hero, footer, student portal |
| Surface / Cards | `#FFFFFF` with border `#E8E8E8` | Light-mode cards |
| Dark surface | `#141414` | Cards inside dark sections |
| Raised (dark) | `#1C1C1C` | Tabs, raised elements in dark zones |
| Border (light) | `#E8E8E8` | |
| Border (dark) | `#252525` | |
| Accent — Lime | `#C8F135` | CTAs, active tabs, hover glows, stat numbers, small marks — **never** a large section background |
| Lime glow | `rgba(200,241,53,0.06)` | Subtle backgrounds |
| Lime highlight | `rgba(200,241,53,0.12)` | Upgrade box backgrounds |
| Headline (light) | `#0C0C0C` | |
| Headline (dark) | `#F2F2EE` | Inside dark sections |
| Body (light) | `#444444` | |
| Body (dark) | `#888888` | Inside dark sections |

Register all values as design tokens — no hardcoded colour utilities in components.

### Typography

Import from Google Fonts:
```
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap
```

| Role | Font | Weight |
|---|---|---|
| Hero / display headlines | Plus Jakarta Sans | 800 ExtraBold |
| Section headings | Plus Jakarta Sans | 700 Bold |
| Body text | Plus Jakarta Sans | 400 / 500 |
| Labels, tags, mono | DM Mono | 400 |

**Sizes:**
- Hero headline: `clamp(52px, 8vw, 96px)`
- Section titles: `clamp(36px, 5vw, 64px)`
- Body text: `18px`, `line-height: 1.75`
- Card body: `16px`, `line-height: 1.7`
- Labels / eyebrows: `13px`, `letter-spacing: 0.1em`, uppercase
- Footer text: minimum `14px`

**Letter spacing:**
- Headlines: `-0.02em`
- Body: `0`
- Labels: `0.1em`

---

## SITE-WIDE ANIMATIONS

All animations respect `prefers-reduced-motion` — reduced users get instant static content.

1. **Scroll reveal (both directions):** Every element fades + `translateY(40px → 0)` on enter; reverses on exit. Nothing is static while scrolling.
2. **Stagger:** Cards and list items animate in sequence — `0.12s` delay between each.
3. **Animated lime underline:** The word `"Creators"` in the hero headline gets a lime underline that draws in left→right after the text appears.
4. **Custom cursor (desktop only):** Small lime dot + larger lime ring follows mouse. Ring expands on hover over clickable elements. `pointer-events: none` so it never blocks clicks.
5. **Counter animation:** Stats count up from `0` when scrolled into view. Append `+` after target.
6. **Card hover:** `translateY(-8px)`, border transitions to `#C8F135`, subtle lime `box-shadow` glow.
7. **CTA button:** Lime glow pulse on page load (draws attention). Arrow slides right on hover.
8. **Nav scroll behaviour:** Starts fully transparent. On scroll down → `rgba(12,12,12,0.95)` background + `backdrop-filter: blur(20px)`. Smooth `0.4s` transition.
9. **Marquee strips:** Two continuous scrolling strips — top scrolls LEFT, bottom scrolls RIGHT. Both pause on hover. Gradient fade on left and right edges.
10. **Image hover:** `grayscale(30%)` at rest → `grayscale(0%)` on hover. `scale(1.03)` on card hover.
11. **Rotating image ring:** Portfolio images arranged in a draggable rotating circle. Rotates slowly clockwise and continuously. Speeds up on scroll. Individual cards lift and brighten on hover.
12. **Page load:** Subtle fade-in of entire page over `0.6s` on first load.

---

## NAVIGATION

Fixed top nav, `68px` height, dark background (`#0C0C0C`):

- **Left:** "Haruna Visuals" text logo + small lime dot (8px circle)
- **Center (desktop 768px+):** `Courses · Pricing · About · Portal · FAQ` — inline, **not** hidden behind a hamburger. Lime underline draws in left→right on hover.
- **Right:** `Enrol Now` button — lime background (`#C8F135`), `#0C0C0C` text, bold, `8px` radius, `14px` font, slightly reduced padding.
- **Mobile:** Hamburger icon → full-screen overlay menu.

---

## PAGE 1: HOMEPAGE (LONG SCROLL)

### HERO

Full viewport height. Dark background (`#0C0C0C`).

**Background:** Auto-rotating image carousel — 3 high-quality placeholder images:
1. Black creative professional working at a desk with design tools visible
2. Black videographer shooting content with a phone/camera
3. Group of young creatives in a learning/workshop setting

Images crossfade every 5 seconds. Dark gradient overlay:
```
linear-gradient(to right, rgba(12,12,12,0.93) 40%, rgba(12,12,12,0.4) 100%)
```

**Content** (left-aligned, max-width `640px`, vertically centered):

Eyebrow — DM Mono, 11px, lime, uppercase, `letter-spacing: 0.16em`:
> `— Haruna Visuals Creative Training`

Headline — Plus Jakarta Sans ExtraBold, `clamp(52px, 8vw, 96px)`, line-height `0.98`. Each line in an overflow-hidden container so text slides up:
- Line 1: **"Training"** — slides up, delay `0.3s`
- Line 2: **"Creators"** — slides up, delay `0.45s` — style this word distinctively: italic OR in lime (`#C8F135`) text OR with a lime brush/highlight effect behind it
- Line 3: **"to BUILD."** — slides up, delay `0.6s`

Apply animated lime underline to `"Creators"` that draws in after text appears.

Subheadline — Plus Jakarta Sans, 18px, `#888888`, max-width `500px`, fade in delay `0.9s`:
> "Graphic design and video editing training that starts with hands-on experience. Two tracks, three levels."

Buttons — fade in delay `1.05s`:
- `Enrol Now →` — lime bg, black text, bold
- `See Courses` — transparent, warm white text, `#252525` border

Footnote — DM Mono, 12px, ash, fade in delay `1.2s`:
> "3 sessions/week · Personal feedback · Certificate included"

Carousel dots: bottom left; active dot = lime + wider pill shape.

---

### STATS BAR

Full-width bar, bg `#141414`, border top + bottom `#252525`, padding `40px`.

4 stats separated by vertical `#252525` lines — all numbers count up from 0 on scroll:

| Number | Label |
|---|---|
| 30+ | Students Trained |
| 3+ | Years Experience |
| 2 | Tracks Available |
| 6 | Certificates Issued |

Numbers: Plus Jakarta Sans ExtraBold, 52px, lime. Labels: DM Mono, 11px, ash, uppercase.

---

### ROTATING IMAGE RING

Section header (centered):
- Eyebrow: `— Student Work & Projects`
- Title: **"Real work. Real results."**

The ring:
- 6–8 placeholder images in a circular/orbital layout — slightly rotated cards, `16px` rounded corners
- Rotates slowly clockwise and continuously
- Speeds up when user scrolls through section
- Draggable — user can drag to spin
- Individual card: lifts, brightens, slight scale-up on hover
- Image subjects: design work, video thumbnails, creative projects

*Placeholders only — Emmanuel will replace with actual work.*

---

### TOOL MARQUEE STRIPS

Label above: **"Tools We Use"**

**Strip 1 (scrolls LEFT):**
```
🎨 Canva  ·  📸 Adobe Photoshop  ·  🎬 CapCut  ·  🎞 Align Motion  ·  [repeat]
```

**Strip 2 (scrolls RIGHT):**
```
✦ 30+ Creators Trained  ·  ✦ Lagos & UK Clients  ·  ✦ Certificate Included  ·  ✦ 3+ Years Experience  ·  [repeat]
```

Both strips: lime accent on dots/icons, ash text, bg `#141414`, gradient fade on edges, pause on hover.

---

### TWO TRACK CARDS

Section header:
- Eyebrow: *(none)*
- Title: **"Pick Your Craft."**
- Subtitle (ash): "Choose your path. Enter at your level. Build skills that put you to work."

Two cards side by side (`1fr 1fr`, gap `24px`). Each card: bg `#141414`, border `#252525`, `border-radius: 20px`, overflow hidden.

**Card structure:**
- Top: High-quality placeholder image (height `240px`, `object-fit: cover`)
  - Design card: Professional Black designer working on branding/logo work
  - Video card: Black videographer or content creator shooting/editing
- Body padding `36px`:
  - Track title with emoji (Plus Jakarta Sans Bold, 26px)
  - Short description (16px, ash)
- **Level tabs** — 3 pill buttons: `Beginner · Intermediate · Advanced`
  - Inactive: bg `#1C1C1C`, border `#252525`, ash text, DM Mono 11px
  - Active: bg `#C8F135`, black text
  - Hover: border becomes `#C8F135`
  - Clicking each tab shows that level's content with fade+slide animation

**BEGINNER TAB:**

*Graphic Design — ₦50,000/month* (For fresh starters — no experience needed)

Curriculum:
- Design thinking & visual communication
- The 5 principles: alignment, contrast, repetition, proximity, hierarchy
- Canva mastery — tools, templates, building from scratch
- Color theory & brand palette building
- Social media graphics for all platforms

What you get:
- ✓ 12 live sessions (3/week, 60–90 mins)
- ✓ Weekly assignment + written feedback
- ✓ Week 1–4 class notes (PDF download)
- ✓ Design thinking framework guide
- ✓ Color theory workbook
- ✓ Canva mastery reference sheet
- ✓ Social media size guide (all platforms)
- ✓ WhatsApp instructor access (weekdays)
- ✓ Monthly progress report
- ✓ Student portal access
- ✓ Certificate of Completion — Beginner

`Enrol Now →` button (lime, animated)

*Video Editing — ₦80,000/month* (For fresh starters — no experience needed)

Curriculum:
- Video storytelling fundamentals
- CapCut mastery — timeline and tools
- Editing reels & short-form to beat
- Colour correction & sound mixing
- Export settings for every platform

What you get:
- ✓ 12 live sessions (3/week, 60–90 mins)
- ✓ Weekly assignment + written feedback
- ✓ Week 1–4 class notes (PDF download)
- ✓ Video storytelling framework guide
- ✓ CapCut shortcut reference sheet
- ✓ Export settings guide (all platforms)
- ✓ Free audio/music resource list
- ✓ WhatsApp instructor access (weekdays)
- ✓ Monthly progress report
- ✓ Student portal access
- ✓ Certificate of Completion — Beginner

`Enrol Now →` button (lime, animated)

---

**INTERMEDIATE TAB:**

*Graphic Design — ₦75,000/month* (Fresh start · OR ₦25,000 upgrade from Beginner)

Curriculum:
- Adobe Photoshop — layers, masks, smart objects
- Brand identity fundamentals & logo design
- Building a complete brand identity kit
- Interpreting real client creative briefs
- Mockup presentation & delivery

What you get:
- ✓ Everything in Beginner PLUS:
- ✓ Adobe Photoshop quick-start guide
- ✓ Brand identity checklist template
- ✓ 2 real client brief simulations
- ✓ Mockup presentation template pack
- ✓ Peer review session (group feedback)
- ✓ Intermediate resource library access
- ✓ Certificate of Completion — Intermediate

`Enrol Now →` button (lime, animated)

*Video Editing — ₦100,000/month* (Fresh start · OR ₦20,000 upgrade from Beginner)

Curriculum:
- Advanced CapCut — multi-layer editing
- Long-form editing structure
- Colour grading techniques
- Audio design — music, voiceover, sound effects
- Event highlight reel production

What you get:
- ✓ Everything in Beginner PLUS:
- ✓ Advanced CapCut workflow guide
- ✓ Colour grading LUT pack (5 free LUTs)
- ✓ B-roll shooting checklist
- ✓ Event coverage shot list template
- ✓ 2 real brief simulations
- ✓ Peer review session
- ✓ Certificate of Completion — Intermediate

`Enrol Now →` button (lime, animated)

---

**ADVANCED TAB:**

*Graphic Design — ₦100,000/month* (Fresh start · OR ₦25,000 upgrade from Intermediate)

Curriculum:
- Advanced Photoshop — compositing, manipulation & effects
- Complete brand identity systems & brand guidelines
- Event branding & campaign design
- Portfolio curation & case study writing
- Capstone: real client brand pitch

What you get:
- ✓ Everything in Intermediate PLUS:
- ✓ Full brand guidelines template
- ✓ Event branding asset pack
- ✓ Campaign design framework
- ✓ 1 live portfolio review with Emmanuel
- ✓ Case study writing template
- ✓ Capstone project (real brief)
- ✓ LinkedIn & portfolio strategy session
- ✓ Priority WhatsApp (4-hour response)
- ✓ Featured on Haruna Visuals showcase
- ✓ Certificate of Completion — Advanced

`Enrol Now →` button (lime, animated)

*Video Editing — ₦150,000/month* (Fresh start · OR ₦50,000 upgrade from Intermediate)

Curriculum:
- Align Motion — text animations, logo reveals, lower thirds
- Brand films & corporate video
- Music video editing
- Client-grade file delivery
- Capstone: real brand film brief

What you get:
- ✓ Everything in Intermediate PLUS:
- ✓ Align Motion starter animation pack
- ✓ Brand film scriptwriting template
- ✓ Music video edit framework
- ✓ 1 live portfolio review with Emmanuel
- ✓ Client delivery checklist & file pack
- ✓ Capstone project (real brief)
- ✓ Priority WhatsApp (4-hour response)
- ✓ Featured on Haruna Visuals showcase
- ✓ Certificate of Completion — Advanced

`Enrol Now →` button (lime, animated)

Card hover: `translateY(-10px)`, border glows lime, image zooms slightly (`scale 1.04`).

---

### HOW IT WORKS

Section header:
- Eyebrow: `— The process`
- Title: **"Simple. Clear. Effective."**

3 steps in a horizontal row, separated by vertical lines:

**01 — Choose Your Track**
Pick Graphic Design or Video Editing. Tell us your level. We place you at the right starting point — no wasted time, no repeating what you know.

**02 — Show Up & Build**
3 sessions per week. Weekly assignments. Personal feedback on every submission. Show up consistently and progress is inevitable.

**03 — Leave With Proof**
A portfolio of real work. A Certificate. The confidence to charge for your craft. Month 1 is just the beginning.

Step numbers: Plus Jakarta Sans ExtraBold, 60px, lime at 20% opacity (decorative). Stagger animation on scroll.

---

### ABOUT THE INSTRUCTOR

Two-column layout (`1fr 1.5fr`, gap `72px`, vertically centered):

**Left:** Portrait photo placeholder
- Tall portrait, 4:5 ratio
- High-quality placeholder of a professional Black male creative
- `border-radius: 20px`
- `grayscale(20%)` at rest → full colour on hover (`0.4s` smooth)
- "Your Instructor" badge overlay (bottom left, semi-transparent dark bg)

*Emmanuel will replace with his actual professional photo.*

**Right column:**
- Eyebrow: `— Meet your instructor`
- Name: **"Emmanuel Haruna"** (Plus Jakarta Sans ExtraBold, 52px)
- Bio (18px, `#444444`, line-height `1.85`):

> "Lagos-based graphic designer, video editor, content creator, and media personality with 3+ years of hands-on experience. I've delivered for international brands in Manchester UK, hosted bootcamps for young creators here in Lagos, won the YABATECH Interdepartmental Oratory Competition, and built two creative brands from the ground up. This programme is everything I wish I had when I was starting out — honest, practical, and built to get you real results."

Brand buttons (DM Mono, 11px, ash, border `#252525`, hover → lime border):
`[Haruna Visuals ↗]` `[The Media Guy ↗]` `[The Outlook Podcast ↗]`

Portfolio link (lime, animated arrow): `View my portfolio →`

---

### TESTIMONIALS

**Part A — 2×2 card grid:**

Cards: bg `#141414`, border `#252525`, `border-radius: 16px`, padding `28px`. Stars in lime. Stagger animation on scroll.

**Card 1 — Ajikhe Essentials** ★★★★★
> "I met Emmanuel while studying Mass Communication at Yabatech. He delivered clean pictures and smooth transitions — the final video was the best. Working with him, I never regretted it."
> — Ajikhe Essentials, Broadcast Production

**Card 2 — Willie** ★★★★★
> "You made graphic design and video editing easy for me. You're thoughtful and I love how you share your knowledge. I admire how hardworking you are."
> — Willie, Design & Video Student

**Card 3 — Hosanna** ★★★★★
> "You are indeed a creative and I look forward to more of your works. The way you approach design is something else."
> — Hosanna, Creative Student

**Card 4 — Ayo** ★★★★★
> "You made me fall in love with graphic design and video editing. One of the best decisions I have made — learning from you."
> — Ayo, Design & Video Student

Eyebrow for this section: `— What students and clients say`

**Part B — Ticker strip** (continuous scroll left, pauses on hover):
```
⭐ "He's the best at what he does" — Ajikhe Essentials  ·  ⭐ "You made design easy for me" — Willie  ·  ⭐ "One of the best decisions I've made" — Ayo  ·  ⭐ "You are indeed a creative" — Hosanna  ·  [repeat]
```

---

### PRICING

Section header:
- Eyebrow: `— Pricing`
- Title: **"Invest in your craft."**
- Subtitle: "Start at the level that's right for you. Continuing students pay only a top-up to advance."

Two tabs: `[Graphic Design]` `[Video Editing]` — active tab highlighted in lime.

Under each tab: 3 level cards in a clean 3-column layout.

**Each pricing card structure:**

```
┌─────────────────────────────────┐
│  [LEVEL BADGE]   [TRACK BADGE]  │
│                                 │
│  ₦XX,000                        │
│  per month                      │
│                                 │
│  ─────────────────────────────  │
│                                 │
│  ✓ Feature 1                    │
│  ✓ Feature 2                    │
│  ... (full list from above)     │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Already completed        │    │
│  │ [previous level]?        │    │
│  │ Upgrade for ₦XX,000      │    │
│  └─────────────────────────┘    │
│                                 │
│  [ENROL NOW BUTTON]             │
└─────────────────────────────────┘
```

Upgrade boxes styling: `rgba(200,241,53,0.12)` background, `1px` lime border, bold price, regular description, properly spaced.

**Graphic Design upgrade prices:**
- Intermediate: upgrade for ₦25,000 (from Beginner)
- Advanced: upgrade for ₦25,000 (from Intermediate)

**Video Editing upgrade prices:**
- Intermediate: upgrade for ₦20,000 (from Beginner)
- Advanced: upgrade for ₦50,000 (from Intermediate)

Featured card (Intermediate): lime top border `3px`. Card hover: lift + lime border glow.

---

### STUDENT SPECIAL

Separate box below pricing cards.

"Student Special" badge (lime bg, black text, DM Mono).

**Headline:** "You're a student. We see you."

**Body:** "Currently enrolled in school? You qualify for our student pricing — ₦30,000 for 2 months + 1 month free coaching. Same materials, same feedback, same certificate. Just a rate built for your pocket."

3 perk cards:
- Beginner to Pro — full 3-level journey at student pricing
- ₦30,000 for 2 months + 1 month free
- Same access — full materials, feedback, and certificate

Upload button: `📎 Upload Student ID to Unlock Student Pricing` (outlined button, lime hover)

---

### PAYMENT PLANS

Two cards side by side:

**Card 1: Full Payment** (bold, 22px)
Pay your full monthly fee upfront. Full unrestricted portal access from day one. No interruptions.
- ✓ Full portal access · No restrictions

**Card 2: Split Payment (50% now)** (bold, 22px)
Pay 50% to start. Balance by Week 2. Portal access is full from the start but automatically pauses if balance is overdue.
- ⚠ Portal pauses if balance is overdue

Each card: `border-radius: 12px`, padding `32px`, clean border, subtle shadow.

Note (DM Mono, ash, small): "Payment methods: Bank transfer (Access Bank · 1491527289) · Card via Paystack"

---

### COMPARISON TABLE

Section header:
- Eyebrow: `— Compare your options`
- Title: **"Which path is right for you?"**

Clean comparison table:

| Feature | Live Training | Self-Paced Course |
|---|---|---|
| Format | Live sessions (3×/week) | Pre-recorded videos |
| Feedback | Personal written feedback | None |
| Certificate | ✓ Included | ✗ Not included |
| Pace | Structured schedule | Learn anytime |
| Access | Monthly | Lifetime |
| Instructor | Direct WhatsApp access | None |
| Price | From ₦50,000/month | From ₦15,000 |
| Best for | Serious skill building | Self-motivated learners |

Table styling:
- Alternating row backgrounds: `#F8F8F8` / `#FFFFFF`
- Live Training column header: lime bg, black text
- Self-Paced column header: dark bg, white text
- Checkmarks in lime (✓), X marks in grey (✗)
- Table text: 16px, properly spaced
- Mobile: horizontal scroll on table

Below table, two CTA buttons:
- `Enrol in Live Training →` (lime bg)
- `Pre-Order Self-Paced →` (outlined)

---

### SELF-PACED VIDEO COURSES (Coming Soon)

Section header:
- Eyebrow: `— Self-Paced Courses`
- Title: **"Learn at your own pace."**
- Subtitle: "Pre-recorded courses for graphic design and video editing. Watch. Practice. Build."
- "Coming Soon" badge (pulsing lime animation)

Two course track cards side by side:

**🎨 Graphic Design Self-Paced Course**
- Beginner: ₦15,000 | Intermediate: ₦30,000 | Advanced: ₦45,000
- ✓ Lifetime access
- ✓ Watch at your own pace
- ✓ Downloadable resources
- ✗ No certificate included
- ✗ No live sessions
- ✗ No personal feedback
- Button: `Pre-Order Now — 30% OFF` + Coming Soon badge
- Placeholder image: designer working

**🎬 Video Editing Self-Paced Course**
- Beginner: ₦15,000 | Intermediate: ₦30,000 | Advanced: ₦45,000
- ✓ Lifetime access
- ✓ Watch at your own pace
- ✓ Downloadable resources
- ✗ No certificate included
- ✗ No live sessions
- ✗ No personal feedback
- Button: `Pre-Order Now — 30% OFF` + Coming Soon badge
- Placeholder image: video editor working

**Pre-order flow** (triggered by Pre-Order button → modal):
- Which course? (Design / Video)
- Which level? (Beginner / Intermediate / Advanced)
- Full Name, Email, WhatsApp
- Payment method (Bank Transfer or Card)
- Apply 30% discount automatically:
  - Beginner: ₦15,000 → ₦10,500
  - Intermediate: ₦30,000 → ₦21,000
  - Advanced: ₦45,000 → ₦31,500
- After payment: save to Supabase `preorders` table
- Success: "You're on the list! You'll get immediate access the moment this course goes live. Emmanuel will confirm your pre-order via WhatsApp."

Supabase `preorders` table fields:
```
name, email, phone, course_type (design/video), level,
original_price, discount_price, payment_reference,
payment_status, created_at
```

---

### VIDEO SHOWCASE

Section header:
- Eyebrow: `— See it in action`
- Title: **"Watch our students grow."**

2–3 video thumbnail cards in a horizontal scroll or grid. Each card:
- Placeholder thumbnail (high-quality image of creative work)
- Play button overlay (lime circle, white triangle)
- Caption below

On click: open video in a modal lightbox.

*All videos are placeholders — Emmanuel will swap in real content.*

---

### STUDENT PORTAL PREVIEW

Section: **"Inside your student portal"**

Visual mockup of the portal UI:
- Dark sidebar (navigation items)
- Welcome message card
- Materials list with locked/unlocked states
- Progress bar
- Certificate card

Section animates in from the right on scroll. "Join to get access" CTA button overlaid.

---

### COMING SOON EMAIL CAPTURE

Dark section (`#141414`):

Pulsing lime badge: "Coming Soon"

**Headline:** "Self-Paced Video Courses"

**Body:** "Structured graphic design and video editing courses at your own pace are in production. Be first to know when they drop."

Email capture:
- `[your@email.com input]` → `[Notify Me button]`
- Input: focus → lime border glow
- Saves to Supabase `notify_signups` table: `email, created_at`

---

### FAQ

Two-column layout:

**Left:**
- Eyebrow + Title: **"Answered honestly."**
- Body: "Still have questions? Reach out directly on WhatsApp."
- WhatsApp link (lime)

**Right:** 7 FAQ accordion items (smooth max-height animation). Question text: 18px. Answer text: 16px. Proper padding top and bottom each item.

1. **Do I need experience to join?**
No experience needed for Beginner. Just bring curiosity and commitment. If you have existing skills, we assess you and place you at the right level — no time wasted.

2. **What tools do I need?**
For Design: Canva (free). For Video: CapCut (free, on your phone). Both are free to start. Advanced tools like Photoshop are introduced at Intermediate level.

3. **How long is the programme?**
Minimum 1 month per level. Each level is 12 sessions over 4 weeks. Most students do all 3 levels (3 months total) to go from Beginner to Advanced.

4. **Is it online or in-person?**
Primarily online via video call — join from anywhere in Nigeria. In-person sessions available for Lagos-based students on request.

5. **What do I get at the end?**
A Certificate of Completion for each level, a portfolio of real creative work, and the practical skills to charge clients. These are earned, not given.

6. **How do upgrade prices work?**
If you complete Beginner and want to move to Intermediate, you pay only a top-up fee — not the full price. Graphic Design: ₦25,000 top-up per level. Video Editing: ₦20,000 to Intermediate, ₦50,000 to Advanced. New students starting at a higher level pay the full price for that level.

7. **How do payments work?**
Bank transfer to Access Bank (1491527289) or card via Paystack. 50% deposit confirms your spot. Balance due before your final session. Payment plans available.

---

### ENROLMENT FORM

Two-column layout:

**Left: Form**
- Full Name
- WhatsApp Number
- Email Address
- Which Track? (dropdown: Graphic Design / Video Editing / Both)
- Your Level (dropdown: Beginner / Intermediate / Advanced)
- Are you a continuing student? (Yes — I want to upgrade / No — I'm starting fresh)
- How did you hear about us? (dropdown)
- Anything else? (textarea)
- `Submit Enrolment →` button (lime, animated success state on submit)

Note: This form is a lighter "request a callback / questions" enquiry. Actual enrolment funnels through the payment modal.

Form field style:
- bg `#141414`, border `#252525`
- Labels: 13px DM Mono uppercase
- Input height: 48px, border-radius: 8px, 16px text
- Spacing between fields: 20px
- Focus: border `#C8F135`, lime glow `box-shadow`

**Right: What happens next**
4 numbered steps with lime circles, then contact box:
- 📧 Emmanuelharuna675@gmail.com
- 📞 08160695213
- 💬 WhatsApp link

---

### FOOTER

3-column, bg `#0C0C0C`, border-top `#252525`:

**Col 1:** Logo + tagline + social icons
Tagline: "Helping Brands Stand Out. Training Creators to Build."
Social icons: Instagram, TikTok, LinkedIn (icon hover → lime, `translateY(-3px)`)

**Col 2:** Programme links (Courses · Pricing · Student Portal · FAQ)

**Col 3:** Connect links (Email · WhatsApp · Instagram · LinkedIn)

Column headings: "Programme" and "Connect" — properly spaced.

Bottom bar:
> "© 2026 Haruna Visuals. All rights reserved."

Subtle animated noise/grain texture overlay (opacity 3–4%). Footer text minimum `14px`.

---

## PAYMENT MODAL

Triggered by any `Enrol Now` or `Start Learning` button. Smooth scale-in animation. Background: `rgba(0,0,0,0.88)` with backdrop blur.

Modal card: bg `#141414`, border `#252525`, `border-radius: 20px`, padding `40px`, max-width `540px`.

### Step 1 — Student Details

Pre-filled from which button/level was clicked:
- Track: [Graphic Design / Video Editing]
- Level: [Beginner / Intermediate / Advanced]
- Price: [correct price]

Toggle: "Are you upgrading from a previous level?"
- YES → show reduced upgrade price + verification field: "Enter your previous level completion reference (starts with HV-)"
  - Check Supabase `students` table for that reference
  - Verify `payment_status = 'confirmed'` and track matches
  - Valid: ✓ green checkmark "Previous level verified. Upgrade price applied."
  - Invalid/not found: "Reference not found. Please check your enrolment confirmation or contact Emmanuel on WhatsApp."
  - Not confirmed: "Your previous level payment has not been confirmed yet. Contact Emmanuel to confirm before upgrading."
  - Only apply upgrade pricing after successful verification. Revert to full price if verification fails.
- NO → full price

Form fields: Full Name · Email Address · WhatsApp Number

### Step 2 — Payment Method

Two selectable cards:
- 🏦 Bank Transfer — Direct transfer to Access Bank
- 💳 Card Payment — Secure payment via Paystack

**If Bank Transfer selected, show:**
```
Bank: Access Bank
Account Name: Emmanuel Haruna
Account Number: 1491527289
Amount: [50% of selected level price]
Reference: HV-[auto-generated 6 digits]
```

**If Card selected:** Trigger Paystack inline payment popup.
Paystack public key: `pk_test_e6646046e1c66af9fdd31962558e0175c30b4702`

**IMPORTANT:** Payment status is only written after a server-side verify call to Paystack. Nothing client-supplied can mark a student paid.

### Pricing Reference

**Graphic Design:**
- Beginner: ₦50,000 (deposit ₦25,000)
- Intermediate fresh: ₦75,000 (deposit ₦37,500) | Upgrade: ₦25,000
- Advanced fresh: ₦100,000 (deposit ₦50,000) | Upgrade: ₦25,000

**Video Editing:**
- Beginner: ₦80,000 (deposit ₦40,000)
- Intermediate fresh: ₦100,000 (deposit ₦50,000) | Upgrade: ₦20,000
- Advanced fresh: ₦150,000 (deposit ₦75,000) | Upgrade: ₦50,000

### Payment Success State

After successful payment or bank transfer submission:
- Green checkmark animation
- Message: "Enrolment Submitted! Emmanuel will confirm your payment within 24 hours and send your student portal login via WhatsApp to [their number]."
- Button: `Complete Your Profile →` → https://tally.so/r/jaE991

Save to Supabase on payment:
```
name, email, phone, track, level, is_upgrade (boolean),
payment_reference, payment_status ('pending_confirmation'),
amount_paid, created_at
```

---

## STUDENT VERIFICATION MODAL

Triggered by "Upload Student ID" button.

Fields:
- Full Name
- School / Institution
- Email Address
- File upload (drag & drop): JPG, PNG, PDF — max 5MB. Show filename on select.
- Submit button

Success state: "✓ Submitted! Emmanuel will review and approve within 24 hours."

---

## BACKEND (Supabase)

**Connection:**
- URL: `https://qiedqlgjszlskjjbaxgc.supabase.co`
- Anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZWRxbGdqc3psc2tqamJheGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNzAwMTAsImV4cCI6MjA5Njk0NjAxMH0.EcwEMmu6fBdbaDcJniHPVlIwtr_Ors8bdQkei_3iqr0`

**Tables with row-level security:**

`students`:
```
name, email, phone, track, level, is_upgrade (boolean),
payment_reference, payment_status, amount_paid, balance_due,
portal_active, created_at
```
Student reads only their own row.

`materials`:
```
title, track, level, type, storage_path, sort_order
```
Readable only by students whose paid track/level covers it.

`student_progress`: per-material completion.

`student_verifications`: student-ID applications and review status.

`notify_signups`: `email, created_at`

`preorders`:
```
name, email, phone, course_type (design/video), level,
original_price, discount_price, payment_reference,
payment_status, created_at
```

`user_roles`: separate roles table with a `has_role` function so Emmanuel can administer without privilege-escalation risk.

**Storage:**
- Private buckets for course materials, certificates, uploaded student IDs
- Signed-URL access through server functions
- `course-videos` bucket for self-paced video content

---

## PAGES

### /courses
Full curricula and deliverables for all six track/level combinations. Per-track and per-level course detail pages with clear module lists and deep links into the student portal.

### /pricing
Full pricing tables, upgrade top-ups, student special, payment plans. Same format as homepage pricing section.

### /about
Emmanuel's story, brands, portfolio links. No mention of "Brand Films" or "Built in Lagos. Delivered Nationwide." Clean layout: name large and bold, bio properly spaced, brand buttons aligned, portfolio link clear.

### /faq
The 7 questions from above, plus WhatsApp contact link.

### /auth (Login Page)

Simple centered card:
- "Haruna Visuals" logo at top
- Headline: "Student Login"
- Email input
- Password input
- `Log In` button (lime)
- Forgot password link
- "Not enrolled yet? Enrol Now →" link

Use Supabase Auth. Email/password + Google sign-in enabled.

### /portal (Protected — Student Area)

Requires authentication. If not logged in, redirect to /auth.

After login: detect student's track from Supabase `students` table.
- If live training student → show live training portal
- If self-paced student → show self-paced portal
- If both → show tabs to switch

**Layout:**

Left sidebar (260px, bg `#141414`, border-right `#252525`):
- Student avatar (initials circle, lime background)
- Student name
- Track + Level badge (lime text)
- Navigation: 📚 Class Materials · 📝 Assignments · 📊 My Progress · 🎓 Certificate · 💬 Contact Instructor
- Log Out button at bottom

Main content area (bg `#0C0C0C`, padding `40px`):

**Welcome Card (lime-tinted bg):**

Design track: "Hey — you made it. Your class notes, assignments, and progress all live here. Show up for every session, submit your assignments, and the growth will follow. — Emmanuel"

Video track: "You're here. That's already more than most people do. Every edit you submit compounds. Let's get to work. — Emmanuel"

**Materials List:**

Each item: card with icon, title, meta info (week number, due date), action button OR lock badge.

*Graphic Design materials:*
- Week 1 — Introduction to Design Thinking → `Download PDF`
- Week 2 — Canva Fundamentals → 🔒 "Releases after Week 1 session"
- Assignment 01 — The Reverse Engineer (Due before Week 2 · 10 points) → locked
- Certificate — Beginner Level → 🔒 "Complete course to unlock"

*Video Editing materials:*
- Week 1 — Video Storytelling Fundamentals → `Download PDF`
- Week 2 — CapCut Fundamentals → 🔒 "Releases after Week 1 session"
- Assignment 01 — B-Roll Collection (Due before Week 2 · 10 points) → locked
- Certificate — Beginner Level → 🔒 "Complete course to unlock"

**Payment Overdue State:**

If `payment_status = 'payment_overdue'` in Supabase:
- Full-width red/amber banner: "⚠ Your portal access is paused. Your balance payment is overdue. Transfer to Access Bank 1491527289 and send proof to 08160695213 on WhatsApp to restore access."
- Blur all materials below the banner
- Auto-reactivate after payment is confirmed

**Portal features:**
- PDF viewer with resume progress
- "Mark complete" for each module
- Progress bar (videos watched / total)
- Certificate generation and downloadable certificate page once student completes each level
- Automated emails and WhatsApp notifications for payment success/failure and enrolment activation

**Self-Paced Portal View:**

Shows purchased course(s). Each course:
- Progress bar (videos watched / total)
- Module list: thumbnail, title, duration, watched indicator (✓), click to play
- Full-width video player; progress tracked in Supabase; Mark Complete button; Next Video button
- Lifetime access note at top: "You have lifetime access to this course."

If course still "Coming Soon":
- "Your pre-order is confirmed"
- Estimated launch notice
- Videos shown as locked with preview thumbnails

---

## /admin — ADMIN DASHBOARD

Simple password-protected page. Hardcode password: `HVAdmin2026`

### Top Stats Row
- Total Students enrolled
- Total Revenue (sum of `amount_paid`)
- Pending confirmations (`payment_status = 'pending_confirmation'`)
- Active students (`payment_status = 'confirmed'`)

### Students Table

Columns: Name · Email · Track · Level · Payment Status · Amount Paid · Date · Actions

Actions per row:
- "Confirm Payment" → changes status to `'confirmed'`, enables portal
- "Pause Access" → changes status to `'payment_overdue'`
- "View" → shows full student details

Filter buttons: All · Pending · Confirmed · Overdue

### Pre-Orders Tab

Table: Name · Email · Course · Level · Amount Paid · Status · Date
Filter: All / Pending / Confirmed / Active

### Self-Paced Courses Tab

Two sections (Design / Video), each with 3 level cards (Beginner / Intermediate / Advanced).

Each level card:
- Course title
- Number of videos uploaded
- Total enrolled/pre-ordered students
- Status toggle: HIDDEN (default) / LIVE
- "Upload Video" button
- "Edit Course Details" button
- "Preview Course" button

**Video Upload form:**
- Title, Description
- Video file upload (mp4, max 500MB)
- Thumbnail upload (jpg/png)
- Module/week number
- Order within module
- Save as Draft or Publish

Videos stored in Supabase Storage `course-videos` bucket.

**When status toggled to LIVE:**
- All pre-order students for that level get access automatically
- Update `preorders` status to `'active'` in Supabase
- Site shows actual course content instead of "Coming Soon"

All admin data fetched live from Supabase. Same dark theme as rest of site.

---

## IMAGES — SITE-WIDE (ALL PLACEHOLDERS)

All images are placeholders. Emmanuel will replace with his actual work and photos. Use high-quality Unsplash images:

- **Hero carousel (3 images):** Black creative professionals (designers and videographers) in professional settings
- **Track cards — Design:** Professional designer at work, design tools visible
- **Track cards — Video:** Content creator with phone/camera shooting
- **Instructor section:** Confident professional Black male instructor
- **Testimonial cards:** Abstract or pattern backgrounds (no faces)
- **Self-paced course cards:** One showing design work, one showing video work
- **Selected works / portfolio:** Design mockups, creative work placeholders
- **Rotating image ring:** Design work, video thumbnails, creative projects

Unsplash search terms: "graphic designer black" · "content creator phone" · "creative studio workspace" · "video editing" · "branding design"

All images: `loading="lazy"`, `object-fit: cover`.

---

## MOBILE RESPONSIVENESS

All sections must work on 375px width (iPhone SE). Lagos students primarily use phones.

- All text readable (min `15px`)
- All buttons tappable (min `44px` tall)
- Cards stack vertically on mobile
- Tables scroll horizontally
- Modal fits within screen
- No horizontal overflow anywhere
- Hero headline clamps from ~40px on mobile to ~96px on desktop — never breaks on small screens

---

## GENERAL FORMATTING

- Minimum `80px` padding top/bottom per section on desktop
- Minimum `48px` padding top/bottom per section on mobile
- Maximum content width: `1200px`, centered with auto margins
- All body text: minimum `16px`
- All section titles: minimum `36px`
- Consistent `24px` gap between cards
- Consistent `16px` gap between form fields

---

## PERFORMANCE & ACCESSIBILITY

- All images use lazy loading
- Animations respect `prefers-reduced-motion`
- No layout shift on page load
- No horizontal overflow anywhere

---

## IMPORTANT NOTES

1. **Site name throughout:** "Haruna Visuals Creative Training" — no other name.
2. **Primary video tool:** CapCut for ALL levels. KineMaster is NOT used in this programme.
3. **Nav (desktop):** Full links inline at 768px+. Hamburger only on mobile.
4. **Paystack secret key:** Store server-side only. Never expose on client.
5. **Enrolment form:** Lighter enquiry form only. Actual enrolment funnels through payment modal.
6. **Upgrade pricing:** Only applied after successful HV- reference verification in Supabase.
7. **Bank details:** Rendered in a way that is not trivially scrapable. WhatsApp links use click-to-chat URL format.
8. **All forms:** Supabase saves must work on every submission. Paystack must trigger correctly on card payment.
9. **Broken links, misaligned elements, overflow issues:** Fix all before delivery.

---

## BUILD ORDER

1. Design tokens, fonts, motion primitives, cursor, nav, footer
2. Homepage — all sections with placeholder images
3. /courses, /pricing, /about, /faq pages
4. Supabase: tables, row-level security policies, storage buckets, roles
5. Payment modal (Paystack server-side verify), student ID verification modal, pre-order modal
6. /auth login page, /portal student area (live training + self-paced views)
7. /admin dashboard — students, pre-orders, self-paced course management tabs
8. Automated email + WhatsApp notifications (payment success/failure, enrolment activation)
9. Certificate generation + downloadable certificate pages
10. Final: mobile check, performance, fix all bugs

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hvisuals.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6d69659e-696e-4e53-a430-a41a895a14f9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
