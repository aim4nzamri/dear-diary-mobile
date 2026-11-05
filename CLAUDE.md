# CLAUDE.md — Dear Diary Project Memory & Instructions 📖✨

> This file provides complete project context, design guidelines, and current progress for Claude (Claude Code, Claude Desktop, and Claude.ai).

---

## 🌟 1. Project Overview & Vision
- **App Name:** Dear Diary
- **Target Platforms:** iOS (Primary target, iPhone 16 Pro `402 × 874 pt`, Apple HIG compliant) & Android.
- **Repository:** `https://github.com/aim4nzamri/dear-diary-mobile`
- **Core Concept:** A *Tactile Digital Sanctuary* where users can freely pour out their unfiltered thoughts ("Raw Brain Dumps" in mixed languages, broken grammar, or typos) and watch them gently transform into heartwarming, poetic diary entries using AI without losing authentic emotion.
- **Dual-Soul Philosophy:** Always preserve both states (Raw Original vs AI Poetic Verse). Users can toggle between them at any time.

---

## 🛠️ 2. Technology Stack & Environment
- **Framework:** Expo SDK 58 (Latest) with React Native `0.88.1` & React `19.3.0`
- **Language:** TypeScript (`~6.0.3`)
- **Runtime:** Node.js `v26.x`
- **Design Intelligence:** RYUX v2.22.1 installed in `.agents/skills/ryux/`
- **Figma Integration:** `figma-console-mcp` configured in `claude_desktop_config.json` & `~/.gemini/config/mcp_config.json` using verified Figma Personal Access Token for Aiman Zamri (`aimanzamrie@gmail.com`).

---

## 🎨 3. Design System & Apple HIG Guidelines
- **System Spec File:** Read [`DESIGN.md`](./DESIGN.md) for full tokens.
- **Product & UX Research:** Read [`docs/UX_RESEARCH_BLUEPRINT.md`](./docs/UX_RESEARCH_BLUEPRINT.md) for the end-to-end user journey.
- **Base Canvas:** `#FAF7F2` (Warm Linen Parchment) with soft ambient diffuse glow.
- **Cards:** `#FFFFFF` (Corner radius 20–22pt, soft warm shadows).
- **Typography:**
  - Raw Mode: Humanist Sans (*Plus Jakarta Sans* / *Inter*).
  - Poetic Mode: Literary Editorial Serif (*Newsreader* / *Playfair Display* with Drop-Caps).
  - Metadata: Clean Mono (*JetBrains Mono* / *Outfit*).
- **Touch Targets:** Apple HIG minimum `44 × 44 pt` (buttons styled at `48 pt` height).
- **Safe Areas:** Strict clearance for Dynamic Island (`59 pt` top) and Home Bar (`34 pt` bottom).

---

## 📁 4. Project Structure
```text
02_Dear Diaries/
├── App.tsx                     # Live working prototype (Home timeline, modal, AI toggle)
├── app.json                    # Expo configuration
├── package.json                # Dependencies & scripts
├── DESIGN.md                   # RYUX design tokens & visual guardrails
├── README.md                   # Public project overview
├── CLAUDE.md                   # This handover context file
├── docs/
│   └── UX_RESEARCH_BLUEPRINT.md # End-to-end UX research & 5-phase journey
├── design/
│   └── DESIGN_SYSTEM.md        # Color palettes & motion physics specs
└── .agents/skills/ryux/        # RYUX design intelligence framework
```

---

## 🚀 5. Development Commands
- Start dev server: `npx expo start`
- Typecheck TypeScript: `npx tsc --noEmit`
- Git commit & push: `git add . && git commit -m "..." && git push`

---

## 🎯 6. Current Implementation State & Immediate Next Steps
### What is already built and working:
1. `App.tsx` has a working, touchable interactive prototype running on physical iPhone via Expo Go.
2. Timeline feed with sample entries, mood tags (`🌅 Syukur`, `🌧️ Gundah`), and AI badges.
3. Floating Vellum glass action bar (`[ ✍️ Tulis Luahan ]` & `[ 🎙️ ]`).
4. Full-screen sliding Composer Modal with mood selector, raw input field, simulated AI Poetic Alchemy transformation, and interactive Raw vs Poetic toggle comparison.

### Next Priorities to Build:
1. **Real AI Integration:** Connect actual LLM streaming API (e.g. Gemini / Claude API) for the Poetic Alchemy transformation.
2. **Native Icons:** Replace unicode symbols with official Apple SF Symbols or Lucide icons (`lucide-react-native`).
3. **Local Offline Database:** Implement local SQLite (`expo-sqlite`) so diary entries persist offline on the device.
4. **Biometric Security:** Integrate `expo-local-authentication` for Face ID / Touch ID lock.
