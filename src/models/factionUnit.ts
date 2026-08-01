import { TownType } from "./town";
import { UnitPortrait, UnitTier, UnitType, unitPortraits } from "./unit";

export interface FactionUnitStats {
  attack: number;
  defense: number;
  health: number;
  initiative: number;
  type: UnitType;
}

export interface ResourceCost {
  gold: number;
  valuables: number;
}

export interface FactionUnit {
  name: string;
  town: TownType;
  tier: UnitTier;
  few: FactionUnitStats;
  pack: FactionUnitStats;
  recruitCost: ResourceCost;
  reinforceCost: ResourceCost;
  portrait: UnitPortrait;
  fewSpecialty: string;
  packSpecialty: string;
}

// Arch Devils (Inferno, Golden tier) is used as the default template.
export const initialFactionUnit: FactionUnit = {
  name: "Arch Devils",
  town: TownType.Inferno,
  tier: UnitTier.Golden,
  few: { attack: 6, defense: 3, health: 8, initiative: 11, type: UnitType.Flying },
  pack: { attack: 7, defense: 3, health: 9, initiative: 15, type: UnitType.Flying },
  recruitCost: { gold: 22, valuables: 1 },
  reinforceCost: { gold: 30, valuables: 2 },
  portrait: unitPortraits[1],
  fewSpecialty: ":unit_attack: Ignores Retaliation Attacks.",
  packSpecialty:
    ":unit_attack: Ignores Retaliation Attacks.\n:unit_special: As a regular movement, the Arch Devils can move to any empty space.",
};
