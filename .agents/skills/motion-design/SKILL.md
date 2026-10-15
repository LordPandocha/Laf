---
name: motion-design
description: Plan and implement cinematic, accessible and performant web motion and interactive product/catalog transitions.
---

# Motion Design — ONELAF

Before coding, read the UI UX Pro Max skill and query its `gsap` and `ux` domains when the local Python search tool is available. Write a storyboard with trigger, starting state, intermediate stages, end state, duration/easing, reversal, mobile adaptation and reduced-motion fallback. Get user approval for the interaction story first.

## Timeline principles
- Use one GSAP timeline for a cohesive multi-step scene; label key moments and preserve a reversible close path.
- Preserve object continuity: if a product bottle flies into the catalog, reuse/morph the same object or a visual proxy rather than spawning an unrelated copy.
- Use SVG path motion or choreographed translate/rotate/scale for a flight path. Keep decorative movement separate from readable content.
- Stagger groups with a small range of delays; reserve the strongest motion for the primary action.
- Every control must work without hover and support keyboard/touch input.
- Don't animate every element. Motion should communicate hierarchy, continuity or feedback.
- Prefer transform/opacity; keep `will-change` temporary. Avoid large numbers of animated shadows/filters and expensive canvas/WebGL until measurement justifies them.
- Use verified and pinned GSAP sources. Do not silently add a build stack.
- Respect `prefers-reduced-motion`; essential content must remain available without motion.
- Keep mobile battery, low-end GPUs and network conditions in mind. Use simpler mobile choreography.
- No auto-playing sound, scroll-jacking or permanent high-frequency motion.

## Acceptance checks
- First-load choreography is clear and skippable.
- Catalog open, category selection, product open, close, browser Back/Escape and repeated taps do not leave stale overlays.
- 320px-wide layout has no horizontal overflow.
- Content remains useful if an animation CDN fails.
- Keyboard focus is visible and logical; reduced-motion mode removes or shortens nonessential travel.
- Do not claim 60fps or device testing without measurement.
