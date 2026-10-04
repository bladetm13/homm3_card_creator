export enum UnitType {
  Melee = "melee",
  Flying = "flying",
  Ranged = "ranged",
}

export enum UnitTier {
  Bronze = "bronze",
  Silver = "silver",
  Golden = "golden",
  Azure = "azure",
}

export interface UnitPortrait {
  name: string;
  path: string;
}

export interface UnitStatistics {
  attack: number;
  defense: number;
  health: number;
  initiative: number;
  price: number;
}

export interface Unit {
  name: string;
  type: UnitType;
  tier: UnitTier;
  statistics: UnitStatistics;
  portrait: UnitPortrait;
  specialty: string;
}

// prettier-ignore
export const unitPortraits: UnitPortrait[] = [
  { name: "Halberdiers", path: "monsters/halberdiers.png" },
  { name: "Marksmen", path: "monsters/marksmen.png" },
  { name: "Griffins", path: "monsters/griffins.png" },
  { name: "Crusaders", path: "monsters/crusaders.png" },

  { name: "Wraiths", path: "monsters/wraiths.png" },
  { name: "Vampires", path: "monsters/vampires.png" },
  { name: "Liches", path: "monsters/liches.png" },
  { name: "Ghost Dragons", path: "monsters/ghost-dragons.png" },

  { name: "Troglodytes", path: "monsters/troglodytes.png" },
  { name: "Harpies", path: "monsters/harpies.png" },
  { name: "Evil Eyes", path: "monsters/evil_eyes.png" },

  { name: "Pegasi", path: "monsters/pegasi.png" },
  { name: 'Unicorns', path: "monsters/unicorns.png" },

  { name: "Dragon Flies", path: "monsters/dragon_flies.png" },

  { name: 'Cerberi', path: "monsters/cerberi.png" },
  { name: 'Efreet', path: "monsters/efreet.png" },
  { name: "Arch Devils", path: "monsters/arch_devils.png" },

  { name: 'Sprites', path: "monsters/sprites.png" },
  { name: 'Storm Elementals', path: "monsters/storm_elementals.png" },
  { name: 'Ice Elementals', path: "monsters/ice_elementals.png" },
  { name: 'Energy Elementals', path: "monsters/energy_elementals.png" },
  { name: 'Magma Elementals', path: "monsters/magma_elementals.png" },
  { name: 'Magic Elementals', path: "monsters/magic_elementals.png" },

  { name: "Nagas", path: "monsters/nagas.png" },

  { name: "Boars", path: "monsters/boars.png" },
];

// Boars (Neutral, Core Game) is used as the default template: it's the
// simplest real unit card (bronze tier, no specialty text).
export const initialUnit: Unit = {
  name: "Boars",
  type: UnitType.Melee,
  tier: UnitTier.Bronze,
  statistics: {
    attack: 2,
    defense: 0,
    health: 4,
    initiative: 6,
    price: 4,
  },
  portrait: unitPortraits[0],
  specialty: "",
};
