# Design System & Motion Specification: Dear Diary 📖✨

## 1. Aesthetic Direction: *Tactile Digital Sanctuary*
- **Base Canvas (Light):** `#FAF7F2` (Warm Cotton Parchment) with subtle organic micro-grain.
- **Base Canvas (Dark):** `#151419` (Velvety Obsidian) with gentle warm charcoal depth.
- **Surface Elevation:** Frosted Vellum Glass (`rgba(255, 255, 255, 0.65)` in light, `rgba(28, 27, 34, 0.7)` in dark with `backdrop-filter: blur(20px)`).

---

## 2. Dynamic Ambient Mood Palette
The background canvas radiates a soft, diffused radial glow based on the entry's emotional state:

| Emotion / Mood | Primary Tint | Ambient Glow | Hex Range | Vibe |
| :--- | :--- | :--- | :--- | :--- |
| 🌅 **Tenang / Syukur** | Honey Amber | Golden Peach | `#FFF8EC` $\to$ `#FDE68A` | Warm, safe, grateful |
| 🌧️ **Gundah / Melankolik** | Mist Gray | Deep Rain Indigo | `#F0F4F8` $\to$ `#94A3B8` | Cool, reflective, gentle |
| 🔥 **Kusut / Marah** | Soft Terracotta | Burnt Rose Glow | `#FFF0EE` $\to$ `#FCA5A5` | Cathartic, releasing tension |
| ✨ **Teruja / Inspirasi** | Morning Cream | Sage & Emerald Aura | `#F2F7F2` $\to$ `#A7F3D0` | Fresh, growth, hopeful |
| 🌙 **Reflektif / Sunyi** | Night Charcoal | Celestial Violet | `#181724` $\to$ `#DDD6FE` | Quiet midnight contemplation |

---

## 3. Typography Hierarchy: The Dual Soul
1. **Raw State (The Brain Dump):**
   - Font: *Plus Jakarta Sans* / *Inter* (Warm weights) or *Caveat*
   - Line Height: 1.6 - 1.7 (breathable, unrestrictive)
   - Feeling: Unfiltered, natural, conversational.
2. **AI Poetic State (The Polished Verse):**
   - Font: *Newsreader* or *Playfair Display* (Editorial Serif)
   - First Letter: Styled Drop-Cap
   - Line Height: 1.8 (generous stanza spacing)
   - Feeling: Literary, soothing, artistic.
3. **Metadata / System UI:**
   - Font: *JetBrains Mono* / *Outfit*
   - Style: Subdued micro-caps for dates, tags, and word counters.

---

## 4. Motion & Physics Specs
- **Page Flip:** 3D curl physics with dynamic gradient shadow underneath. Gesture-driven with release threshold at 40% swipe.
- **AI Alchemy Shimmer:**
  1. *Inhale:* Text softens & scales to 0.98 (300ms ease-out).
  2. *Aurora Sweep:* Ambient glow wave moves vertically across the canvas (600ms).
  3. *Ink Blooming:* Words morph line-by-line with 50ms stagger into serif format.
- **Comparison Interaction:** 3D Flip Card or Split Curtain slider with haptic ticks on snap points.
