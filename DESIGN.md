# DESIGN.md — Dear Diary Design System & Product Context 📖✨

> Governed by **RYUX Design Intelligence** & **Apple Human Interface Guidelines (HIG)**.

---

## 1. Product Context & Target Audience

- **Product Name:** Dear Diary
- **Platforms:** iOS (Primary target, iPhone 16 Pro 402 × 874 pt) & Android
- **Core Value Proposition:** A tactile digital sanctuary where users can freely perform unfiltered "raw brain dumps" in broken grammar or mixed languages, and gently transform them into deeply moving, poetic diary entries using AI without losing authentic emotion.
- **Primary Audience:** Individuals dealing with end-of-day mental fatigue, stress, overthinking, or scattered ideas who want a safe, judgement-free catharsis without the friction of polished writing.
- **Emotional Signature:** Intimate, comforting, grounded, poetic, serene (*"Digital Wabi-Sabi Paper"*).

---

## 2. Visual Building Blocks & Tokens

### Base Surfaces
- `color.surface.canvas.light`: `#FAF7F2` (Warm Linen Cotton Parchment)
- `color.surface.card.light`: `#FFFFFF` (Pure Soft White Card)
- `color.surface.vellum.light`: `rgba(250, 247, 242, 0.85)` (Frosted Vellum Glass with 20px blur)
- `color.border.subtle`: `#F0ECE4`
- `color.border.active`: `#E2D9CC`

### Core Typography
- **Heading / Poetic Verse (Editorial):** *Newsreader* / *Playfair Display* / *Libre Baskerville* (Serif, `line-height: 1.8`, styled drop-cap)
- **Raw Dump / Conversational Body:** *Plus Jakarta Sans* / *Inter* (Humanist Sans, `line-height: 1.6`)
- **Metadata / Timestamps / Tags:** *JetBrains Mono* / *Outfit* (`letter-spacing: 1.2px`, uppercase)

### Dynamic Mood Ambient Palette
- 🌅 **Syukur / Tenang:** `#FFF8EC` $\to$ `#FDE68A` (Golden Honey Glow)
- 🌧️ **Gundah / Melankolik:** `#F0F4F8` $\to$ `#94A3B8` (Rain Mist Cyan)
- 🔥 **Kusut / Marah:** `#FFF0EE` $\to$ `#FCA5A5` (Soft Terracotta Ember)
- ✨ **Teruja / Harapan:** `#F2F7F2` $\to$ `#A7F3D0` (Sage & Emerald Aura)
- 🌙 **Reflektif / Hening:** `#181724` $\to$ `#DDD6FE` (Celestial Twilight)

---

## 3. Interaction & Motion Rules (Anti-Slop Guardrails)

1. **No Generic Generic AI Slop:**
   - No generic purple gradient cards with overused robotic sparkles.
   - Every animation must feel organic: smooth spring physics, subtle page curl (3D), soft light breathing rather than abrupt flashing.
2. **Apple HIG Touch & Spatial Continuity:**
   - Minimum tap target: **44 × 44 pt** (Buttons styled at 48 pt height).
   - Safe Area Respect: Dynamic Island clearance (59 pt top), Home Bar clearance (34 pt bottom).
   - Real Taptic Feedback on micro-interactions.
3. **Dual-State Preservation:**
   - Never overwrite the user's raw text. Both versions (Raw & Poetic) must coexist and be effortlessly toggleable at any time.
