# Particle Tilt Playground (Next.js + TypeScript)

This project has been fully migrated to **Next.js (App Router) with TypeScript**. All previous vanilla JS modules have been converted to typed `.ts` / `.tsx` files while preserving identical visuals and behavior: thousands of particles with gravity, turbulence modes, collisions, device tilt, pointer tools, presets, and a rich control panel + HUD.

## Key Changes in the Migration

| Before | After |
| ------ | ----- |
| `index.html` static page | `app/page.tsx` + React client component |
| Plain JS modules in `/js` | Typed modules in `src/sim/` |
| Global script tag | `useEffect` bootstrap calling `startSimulation()` |
| `styles.css` | `app/globals.css` (imported globally) |

All DOM ids and structure were replicated in JSX so existing logic (binding by id) works with minimal refactor, but the code now uses TypeScript types for particles, state, and settings.

## Features (unchanged)

- Real-time particle physics (gravity, drag, wind, multiple turbulence modes)
- Collision modes (elastic, soft, inelastic, none) with spatial hashing grid
- Boundary types: screen bounce/wrap, circle & square containers
- Device tilt (mobile) & mouse gravity (desktop)
- Pointer interaction tools (attract, repel, push, spin)
- Visual customization (shapes, color modes, palettes, blend modes, opacity, trails, wireframe)
- Presets + randomizer + adaptive performance options

## Getting Started

```powershell
git clone <this-repo>
cd particleslt
npm install
npm run dev
```

Then open: http://localhost:3000

## Build & Deploy

```powershell
npm run build
npm start
```

Deploy easily on Vercel (recommended).

## Controls

Desktop:
- Click anywhere to set gravity direction (if mouse gravity enabled)
- Space: Pause / Resume
- C: Toggle control panel
- G: Toggle mouse gravity
- R: Reset particles
- F: Toggle HUD

Mobile:
- Tap Enable Tilt, grant motion permission, then roll device

## Project Structure

```
app/
  compact.css
  globals.css         # Styles (migrated from original styles.css)
  layout.tsx          # Root layout (imports globals.css)
  page.tsx            # Main simulation page (client component)
src/
  components/         # UI components
    controls.ts
    hud.ts
    init.ts
    tabs.ts
    ui.ts
  sim/                # Converted TypeScript simulation modules
    config/
      defaults.ts
      index.ts
      presets.ts
      types.ts
    main/
      dom.ts
      index.ts
      init.ts
      loop-performance.ts
      loop-physics.ts
      loop-rendering.ts
      loop.ts
      resize.ts
    physics/
      boundaries.ts
      collisions.ts
      forces.ts
      grid.ts
      noise.ts
      turbulence.ts
      utils.ts
      wells.ts
      worker.ts
    grid.ts
    input.ts
    particles.ts
    renderer.ts
    state.ts
  types/
    types.ts
  utils/
    utils.ts
package.json
tsconfig.json
next.config.mjs
README.md
```

## Customization

Edit defaults & presets in `src/sim/config.ts`. Add new turbulence modes or UI controls by extending the respective modules. Because everything is typed, your editor will guide valid settings & particle properties.

## License

MIT. See [LICENSE](LICENSE) if present.

---
Created by [takeourcarsnow](https://github.com/takeourcarsnow) — migrated to Next.js + TypeScript.
