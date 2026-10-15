# ONELAF Website — Agent Working Agreement

## Non-negotiable workflow: Grill Me
- Before a major visual or interaction change, discover the desired outcome instead of guessing. Ask exactly **one focused question per turn**.
- After each answer, paraphrase the decision in one or two sentences and ask the next most useful question. Do not send a questionnaire.
- Make key choices explicit in a short creative brief before implementation: audience, art direction, colors, interaction story, motion intensity, product assets, target devices, stack, and definition of done.
- Research relevant official docs and strong design references before choosing an animation library. Separate verified facts from assumptions.
- Do not start another big redesign until the user approves the creative direction. Small, reversible experiments are okay when clearly labelled.

## Project facts
- Repository: `LordPandocha/Laf`.
- Current website is static HTML, CSS and vanilla JavaScript; no build system is currently required.
- Do not migrate to React, Vite, Next.js or Tailwind without a reason and user approval.
- Do not claim an external MCP server is active just because its instructions or a skill file are present.
- Never invent founder credentials, awards, clients, quotes or company history. Ask the user or mark a statement as unverified.
- Prefer original assets supplied by the user or owned by the brand. Do not present a social-media screenshot as a full-resolution original photo.

## Art direction to explore
The supplied Instagram reference is a nail-beauty brand world: black and graphite, chrome/silver, white, grey concrete, nude and product pinks, product close-ups, editorial founder imagery and event footage. Do **not** bring back acid-lime. Confirm the final palette in Grill Me before locking it.

## Motion art direction
The goal is deliberate, cinematic choreography — not generic fade-ins on every element.
- Think in connected scenes/timelines: hero object → catalog transition → product cards/detail overlay → return path.
- A catalog click should have a visible cause-and-effect, such as a bottle/product element travelling into the next scene and becoming part of the catalog, rather than a random unrelated animation.
- Use GSAP timelines when a multi-step sequence is justified; use native CSS/Web Animations for small state changes. Don't use 3D/WebGL by default.
- Animate transform and opacity where possible. Avoid animating layout-heavy properties such as width, height, top/left or large filters every frame.
- Mobile needs an intentional variant, not a shrunken desktop animation. Use shorter distances, fewer particles and simpler timelines on touch devices.
- Respect `prefers-reduced-motion`, keyboard operation, focus visibility, readable content and 44px target sizes. Motion must not hide content or trap navigation.
- Load heavy animation code only when needed; reserve image dimensions, use optimized local assets, and verify no horizontal overflow or layout shift.
- Never add auto-playing sound. Avoid scroll-jacking and permanent high-frequency motion.
- Test first load, quick repeated clicks, close/reversal, mobile viewport, no-JS content visibility and reduced-motion.

## Implementation and review
- Read the existing file and related navigation/assets before editing.
- Keep the smallest complete change, but never remove validation, accessibility or error handling to save lines.
- Check every changed page, internal links, script/style paths, responsive breakpoints, console errors if a browser runner is available, and the actual animation end state.
- If browser preview, tests, shell execution or an MCP capability is unavailable, say so instead of implying it passed.
- End code changes with a short implementation summary plus what was not tested and the remaining risk.

## Local skills
Project-scoped skills live under `.agents/skills/`. Read the relevant skill before design, discovery, or refactor work. The vendored `ui-ux-pro-max` search tool needs Python 3. 21st MCP and codebase-memory MCP must be separately installed/authenticated and must not be claimed active until their tools are present.
