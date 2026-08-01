# TODO: Expanding the editor beyond Heroes

The app now has a tab per card type (see [src/app/page.tsx](src/app/page.tsx)):
Heroes (fully working), Neutral Units, Faction Units, Abilities, Spells,
Artifacts, Events, Astrologers, Pandora's Box (all placeholders, see
[src/components/ComingSoonTab.tsx](src/components/ComingSoonTab.tsx)).

This file tracks what's needed to turn each placeholder into a real editor,
modeled on how Heroes already works: a data model
([src/models/hero.ts](src/models/hero.ts)), a form
([src/components/HeroForm.tsx](src/components/HeroForm.tsx)), a card preview
([src/components/HeroCard.tsx](src/components/HeroCard.tsx)), and print
support ([src/lib/features/printSlice.ts](src/lib/features/printSlice.ts),
[src/components/PrintView.tsx](src/components/PrintView.tsx)).

## The big picture: what already exists vs. what's missing

The `external/Homm3BG` submodule (the official rulebook source) and the
mirrored folders under `src/assets/` already ship the **card frame art** for
almost every type: `cards/neutral-front.png` / `neutral-back.png`,
`cards/unit-few.png` / `unit-pack.png`, `cards/ability-*.png`,
`cards/spell.png`, `cards/artifact-front.png` / `minor_artifact.png` /
`relic_artifact.png`, `cards/event.png` / `event-back.png`,
`cards/astrolog.png` / `astrolog-back.png`, `cards/pandora.png`. So the
"blank card" part of the work is mostly done.

What's **not** in this repo anywhere, for any of these types, is the actual
**game content** — the specific numbers and rules text for each individual
unit/spell/artifact/event/astrologer/Pandora card. `external/Homm3BG/sections/units.tex`
only documents the generic card anatomy (which icon means what), not a
per-creature stat table. That data lives in the physical game / official PDF,
which I don't have access to, so it has to come from you (or from a
community database — see "Resources to get" below).

## Resources I need from you (can't find or produce myself)

1. **Per-unit stats** for Neutral Units and Faction Units: Attack, Defense,
   HP, Initiative for both the "Few" and "Pack" side, plus any special
   ability text, for each unit you want to add. Ideally as a spreadsheet or
   list I can convert into `src/models/unit.ts`.
2. **Artifact icon art.** None of the existing asset folders contain artifact
   icons (only the card frames). If you want artifact art beyond what's in
   the base game, that needs sourcing or commissioning.
3. **Spell/ability icons for anything custom.** `src/assets/spells` only
   covers ~19 official spells and `src/assets/skills` only the ~19 official
   secondary skills — any new spell/ability needs its own icon.
4. **Rules text samples** for Events, Astrologer cards, and Pandora's Box
   cards — I haven't found any example text for these in the repo, so I
   don't know the expected length/tone/formatting to replicate. A photo or
   transcription of a couple of real cards of each type would let me match
   the style.
5. **A decision on scope**: do you want these tabs to support importing
   creatures/spells/artifacts from the PC game (like Heroes currently does),
   or only the tabletop game's existing roster, or both? This changes how
   big the data model needs to be.
6. Optionally: point me at the community
   [Game Wiki/Database](https://github.com/Mirzipan/Homm3_BG_Database) linked
   in the README — if it has structured (not just prose) unit/spell/artifact
   data, that could seed most of the above instead of manual transcription.

## Engineering work (I can do this once the above is available)

Common pattern per card type, following the Hero example:

- [ ] Add `src/models/<type>.ts` with the data interface + any static lookup
      tables (town/level/school-of-magic enums etc., reusing `town.ts` where
      it already applies).
- [ ] Add `<Type>Form.tsx` for editing fields, reusing patterns from
      [HeroForm.tsx](src/components/HeroForm.tsx) (portrait/icon picker,
      text-with-icon editor via [textToComponent.tsx](src/lib/textToComponent.tsx)).
- [ ] Add `<Type>Card.tsx` + CSS module for the printable card face(s),
      reusing the relevant `cards/*.png` frame(s) as background, following
      [HeroCard.tsx](src/components/HeroCard.tsx)'s layout approach.
- [ ] Wire the tab's `ComingSoonTab` placeholder out and the real editor in,
      in [src/app/page.tsx](src/app/page.tsx).
- [ ] Extend printing: today [printModel.ts](src/lib/features/printModel.ts)
      and [printSlice.ts](src/lib/features/printSlice.ts) only know about
      `heroes: Hero[]`. This needs generalizing (e.g. a per-type array, or a
      union "deck" of printable entities) so every tab can add its cards to
      the same print queue/PrintModal instead of duplicating that whole flow
      per type.
- [ ] Extend save/load ([serializeHero.ts](src/lib/serializeHero.ts)) to
      cover the new types, or add sibling `serialize<Type>.ts` files.

## Per-tab notes

- **Neutral Units** — needs unit data model (shared with Faction Units) +
  double-sided Few/Pack card component. Some creature portraits already exist
  in `src/assets/art` (spot-check coverage against the full roster you want).
- **Faction Units** — same as above, additionally keyed by Town, reusing the
  existing `TownType` enum from [town.ts](src/models/town.ts).
- **Abilities** — data model for Basic/Advanced/Expert tiers, similar in
  shape to [specialtyContent.ts](src/models/specialtyContent.ts). Both
  `ability.png` and `empowered-ability.png` frames exist, so the empowered
  variant is possible once rules are clarified.
- **Spells** — data model for school/level/power-cost-per-tier, reusing the
  `renderSpell` layout already built in [HeroCard.tsx](src/components/HeroCard.tsx).
- **Artifacts** — data model with a rarity tier (minor/major/relic, matching
  the three existing frame images) + effect text; icon art is the main gap.
- **Events** — simplest card (single-sided-looking content, frame + text);
  mainly blocked on example text to match tone/length.
- **Astrologers** — blocked on example text.
- **Pandora's Box** — blocked on example text.

## Suggested order

Faction Units and Neutral Units share almost all the engineering work, so
tackle those together first once unit stat data is available. Abilities and
Spells are next-easiest since their card layout patterns already exist in
`HeroCard.tsx`. Artifacts/Events/Astrologers/Pandora are all simpler single
cards but are blocked on getting example content/text from you.
