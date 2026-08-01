"use client";

import React from "react";
import { CardKey } from "@/lib/detectCardFile";

import HeroCard from "./HeroCard";
import HeroBoard from "./HeroBoard";
import UnitCard from "./UnitCard";
import UnitCardBack from "./UnitCardBack";
import FactionUnitCard from "./FactionUnitCard";
import FactionUnitCardPack from "./FactionUnitCardPack";
import CreatureBankUnitCard from "./CreatureBankUnitCard";
import CreatureBankUnitCardBack from "./CreatureBankUnitCardBack";
import AbilityCard from "./AbilityCard";
import AbilityCardBack from "./AbilityCardBack";
import SpellCard from "./SpellCard";
import SpellCardBack from "./SpellCardBack";
import ArtifactCard from "./ArtifactCard";
import ArtifactCardBack from "./ArtifactCardBack";
import AstrologerCard from "./AstrologerCard";
import AstrologerCardBack from "./AstrologerCardBack";
import EventCard from "./EventCard";
import EventCardBack from "./EventCardBack";
import PandoraCard from "./PandoraCard";
import PandoraCardBack from "./PandoraCardBack";
import AdventureCard from "./AdventureCard";
import AdventureCardBack from "./AdventureCardBack";
import MoraleCard from "./MoraleCard";
import MoraleCardBack from "./MoraleCardBack";

import { Hero } from "@/models/hero";
import { SpecialtyLevel } from "@/models/specialty";
import { Unit } from "@/models/unit";
import { FactionUnit } from "@/models/factionUnit";
import { CreatureBankUnit } from "@/models/creatureBankUnit";
import { AbilityCard as AbilityCardModel } from "@/models/abilityCard";
import { SpellCard as SpellCardModel } from "@/models/spellCard";
import { ArtifactCard as ArtifactCardModel } from "@/models/artifactCard";
import { AstrologerCard as AstrologerCardModel } from "@/models/astrologerCard";
import { EventCard as EventCardModel } from "@/models/eventCard";
import { PandoraCard as PandoraCardModel } from "@/models/pandoraCard";
import { AdventureCard as AdventureCardModel } from "@/models/adventureCard";
import { MoraleCard as MoraleCardModel } from "@/models/moraleCard";

export interface LoadedCard {
  id: number;
  key: CardKey;
  name: string;
  payload: unknown;
}

type Shape = "portrait" | "landscape";

/**
 * A front and its back, printed side by side. Cut the pair out as one piece
 * and fold along the line between them: the back panel turns to face the other
 * way, giving a double-sided card.
 *
 * Folding about a vertical line does not mirror the back — the rear viewer's
 * left/right reverses along with the panel, and the two cancel. (The hero
 * print sheet folds about a *horizontal* line instead, which is why it has to
 * rotate its backs 180 degrees.)
 */
interface Pair {
  shape: Shape;
  front: React.ReactNode;
  back: React.ReactNode;
}

/** Fold-pairs per landscape A4 sheet (273mm x 186mm printable). */
const PER_SHEET: Record<Shape, { cols: number; rows: number }> = {
  // A pair is 125mm x 87.9mm.
  portrait: { cols: 2, rows: 2 },
  // A pair is 175.8mm x 62.5mm, so only one fits across.
  landscape: { cols: 1, rows: 2 },
};

/** Heroes have no dedicated back component; they use the shared card back. */
const GenericBack = AbilityCardBack;

export function pairsFor(card: LoadedCard): Pair[] {
  const p = card.payload;
  switch (card.key) {
    case "hero":
      return [SpecialtyLevel.One, SpecialtyLevel.Four, SpecialtyLevel.Six].map(
        (specialtyLevel) => ({
          shape: "portrait" as Shape,
          front: <HeroCard hero={p as Hero} specialtyLevel={specialtyLevel} />,
          back: <GenericBack />,
        }),
      );
    case "factionUnit":
      // The pack side is the card's back, so it needs no generic backing.
      return [
        {
          shape: "portrait",
          front: <FactionUnitCard unit={p as FactionUnit} />,
          back: <FactionUnitCardPack unit={p as FactionUnit} />,
        },
      ];
    case "unit":
      return [
        {
          shape: "portrait",
          front: <UnitCard unit={p as Unit} />,
          back: <UnitCardBack unit={p as Unit} />,
        },
      ];
    case "creatureBankUnit":
      return [
        {
          shape: "portrait",
          front: <CreatureBankUnitCard unit={p as CreatureBankUnit} />,
          back: <CreatureBankUnitCardBack />,
        },
      ];
    case "ability":
      return [
        {
          shape: "portrait",
          front: <AbilityCard ability={p as AbilityCardModel} />,
          back: <AbilityCardBack />,
        },
      ];
    case "spell":
      return [
        {
          shape: "portrait",
          front: <SpellCard spell={p as SpellCardModel} />,
          back: <SpellCardBack />,
        },
      ];
    case "artifact":
      return [
        {
          shape: "portrait",
          front: <ArtifactCard artifact={p as ArtifactCardModel} />,
          back: <ArtifactCardBack />,
        },
      ];
    case "pandora":
      return [
        {
          shape: "portrait",
          front: <PandoraCard pandora={p as PandoraCardModel} />,
          back: <PandoraCardBack />,
        },
      ];
    case "adventure":
      return [
        {
          shape: "portrait",
          front: <AdventureCard adventure={p as AdventureCardModel} />,
          back: <AdventureCardBack />,
        },
      ];
    case "morale":
      return [
        {
          shape: "portrait",
          front: <MoraleCard morale={p as MoraleCardModel} />,
          back: <MoraleCardBack type={(p as MoraleCardModel).type} />,
        },
      ];
    case "astrologer":
      return [
        {
          shape: "landscape",
          front: <AstrologerCard astrologer={p as AstrologerCardModel} />,
          back: <AstrologerCardBack />,
        },
      ];
    case "event":
      return [
        {
          shape: "landscape",
          front: <EventCard event={p as EventCardModel} />,
          back: <EventCardBack />,
        },
      ];
  }
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size)
    out.push(items.slice(i, i + size));
  return out;
}

/** Hero boards are 134mm x 96mm, so two sit side by side on a landscape sheet. */
const BOARDS_PER_SHEET = 2;

function heroesIn(cards: LoadedCard[]): Hero[] {
  return cards
    .filter((card) => card.key === "hero")
    .map((card) => card.payload as Hero);
}

function boardSheetsFor(cards: LoadedCard[]): Hero[][] {
  return chunk(heroesIn(cards), BOARDS_PER_SHEET);
}

function sheetsFor(cards: LoadedCard[]) {
  const pairs = cards.flatMap(pairsFor);
  return (["portrait", "landscape"] as Shape[]).flatMap((shape) => {
    const of = pairs.filter((pair) => pair.shape === shape);
    const { cols, rows } = PER_SHEET[shape];
    return chunk(of, cols * rows).map((page) => chunk(page, cols));
  });
}

export default function PdfSheets({ cards }: { cards: LoadedCard[] }) {
  const cardSheets = sheetsFor(cards);
  return (
    <div style={{ ["--adjust-scale" as string]: "1" }}>
      {cardSheets.map((sheet, si) => (
        <div className="landscape page" key={si}>
          <div>
            {sheet.map((row, ri) => (
              <div style={{ display: "flex", flexDirection: "row" }} key={ri}>
                {row.map((pair, pi) => (
                  // Front and back butt together; the join is the fold line.
                  <div style={{ display: "flex" }} key={pi}>
                    {pair.front}
                    {pair.back}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Boards last, after every card sheet. */}
      {boardSheetsFor(cards).map((boards, si) => (
        <div className="landscape page" key={`board-${si}`}>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {boards.map((hero, bi) => (
                <HeroBoard hero={hero} key={bi} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function sheetCount(cards: LoadedCard[]): number {
  return sheetsFor(cards).length + boardSheetsFor(cards).length;
}

export function boardCount(cards: LoadedCard[]): number {
  return heroesIn(cards).length;
}
