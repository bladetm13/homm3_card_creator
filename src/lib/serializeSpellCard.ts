import { SpellCard } from "@/models/spellCard";
import { fileOpen } from "browser-fs-access";
import saveAs from "file-saver";
import { normalizeString } from "./normalizeString";

interface JsonFormat {
  herocreator: "0.1";
  spell: SpellCard;
}

function parseSpellCard(data: string): SpellCard {
  const obj = JSON.parse(data);

  if (!obj.herocreator) {
    throw new Error("Invalid format!");
  }

  if (!obj.spell) {
    throw new Error("This file is not a spell card!");
  }

  return (obj as JsonFormat).spell;
}

export function stringifySpellCard(spell: SpellCard): string {
  const data = { herocreator: "0.1", spell };
  return JSON.stringify(data, null, 2);
}

export async function loadSpellCard(): Promise<SpellCard> {
  const blob = await fileOpen({
    mimeTypes: ["application/json"],
    extensions: [".homm3spell.json"],
  });
  const text = await blob.text();
  return parseSpellCard(text);
}

export function saveSpellCard(spell: SpellCard) {
  saveAs(
    new Blob([stringifySpellCard(spell)], {
      type: "application/json;charset=utf-8",
    }),
    `${normalizeString(spell.name)}.homm3spell.json`
  );
}
