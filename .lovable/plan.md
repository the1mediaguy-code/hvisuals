# H-Visuals cinematic visual overhaul

## Goal
Turn the existing studio site into a more visual, film-led experience without replacing real portfolio work, portraits, logos, or videos. Keep all training content and functionality intact while bringing `/training` into the same editorial system.

## What will change

1. **Cinematic studio hero**
   - Create an 18-second H-Visuals brand reel with the requested wordmark, design-process split screen, decisive typography, real portfolio collage, and closing mark.
   - Use it as a full-bleed, muted, looping desktop background with a strong readability overlay.
   - Keep mobile lightweight by showing a static Nigerian editorial frame instead of autoplaying video.

2. **Strategy and services imagery**
   - Add a four-image editorial process grid beside “From strategy to execution,” covering planning, design, filming, and finished output.
   - Rework service previews into full-bleed image cards with dark overlays, bottom-aligned text, and a sunshine border interaction.
   - Preserve and continue using the real portfolio images in Work and the media grid.

3. **Portrait and global art direction**
   - Keep Emmanuel Haruna’s existing portrait and add restrained grain, low-opacity sunshine glow, hover lift, and the requested “Visual Director · Lagos” badge.
   - Add a subtle fixed grain texture across the site and reusable editorial image treatments.

4. **Motion system**
   - Update scroll reveals to the requested cinematic easing and timing.
   - Give image reveals a slower scale-and-fade treatment with staggered entry.
   - Preserve reduced-motion behavior.

5. **Training completion**
   - Connect the five already-generated Nigerian editorial images to the training hero, track cards, and self-paced cards.
   - Apply matching grain, overlays, hover treatment, spacing, and responsive behavior without changing prices, curricula, enrolment, payments, or portal behavior.
   - Add the missing social metadata to Training, Pricing, and FAQ.

6. **Verification**
   - Check all public pages at desktop and 375px mobile.
   - Verify no horizontal overflow, missing media, hydration/runtime errors, or broken scroll animations.
   - Check navigation, work filtering, training interactions, forms, and protected account entry points.

## Technical details
- Generate the brand reel as a video asset and store it through the project asset flow; no runtime AI generation is added to the app.
- Generate a cohesive Nigerian editorial image set rather than hotlinking third-party stock, so the imagery remains art-directed and reliable.
- Reuse existing semantic forest, cream, sunshine, tomato, carrot, and kiwi tokens; add only reusable texture/motion utilities.
- The desktop hero video is hidden below the mobile breakpoint; the fallback frame remains the only hero media loaded for small screens where practical.
- Existing real assets remain untouched and are never recoloured or replaced.

## Assumptions
- The current positioning, written copy, routes, and business behavior stay unchanged unless this brief explicitly changes presentation.
- “Visual Director · Lagos” is approved wording because it is explicitly supplied in this request.
