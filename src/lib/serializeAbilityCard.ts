import { AbilityCard } from "@/models/abilityCard";
import { fileOpen } from "browser-fs-access";
import saveAs from "file-saver";
import { normalizeString } from "./normalizeString";

interface JsonFormat {
  herocreator: "0.1";
  ability: AbilityCard;
}

function parseAbilityCard(data: string): AbilityCard {
  const obj = JSON.parse(data);

  if (!obj.herocreator) {
    throw new Error("Invalid format!");
  }

  if (!obj.ability) {
    throw new Error("This file is not a ability card!");
  }

  return (obj as JsonFormat).ability;
}

export function stringifyAbilityCard(ability: AbilityCard): string {
  const data = { herocreator: "0.1", ability };
  return JSON.stringify(data, null, 2);
}

export async function loadAbilityCard(): Promise<AbilityCard> {
  const blob = await fileOpen({
    mimeTypes: ["application/json"],
    // Chrome rejects accept extensions longer than 16 characters, and
    // ".homm3ability.json" exceeds that. Filter on .json instead so
    // files saved with the long name still open.
    extensions: [".json"],
    description: "Ability card",
  });
  const text = await blob.text();
  return parseAbilityCard(text);
}

export function saveAbilityCard(ability: AbilityCard) {
  saveAs(
    new Blob([stringifyAbilityCard(ability)], {
      type: "application/json;charset=utf-8",
    }),
    `${normalizeString(ability.name)}.homm3ability.json`
  );
}
