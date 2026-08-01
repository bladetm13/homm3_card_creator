import { MoraleCard } from "@/models/moraleCard";
import { fileOpen } from "browser-fs-access";
import saveAs from "file-saver";
import { normalizeString } from "./normalizeString";

interface JsonFormat {
  herocreator: "0.1";
  morale: MoraleCard;
}

function parseMoraleCard(data: string): MoraleCard {
  const obj = JSON.parse(data);

  if (!obj.herocreator) {
    throw new Error("Invalid format!");
  }

  if (!obj.morale) {
    throw new Error("This file is not a morale card!");
  }

  return (obj as JsonFormat).morale;
}

export function stringifyMoraleCard(morale: MoraleCard): string {
  const data = { herocreator: "0.1", morale };
  return JSON.stringify(data, null, 2);
}

export async function loadMoraleCard(): Promise<MoraleCard> {
  const blob = await fileOpen({
    mimeTypes: ["application/json"],
    // Chrome rejects accept extensions longer than 16 characters, and
    // ".homm3morale.json" exceeds that. Filter on .json instead so
    // files saved with the long name still open.
    extensions: [".json"],
    description: "Morale card",
  });
  const text = await blob.text();
  return parseMoraleCard(text);
}

export function saveMoraleCard(morale: MoraleCard) {
  saveAs(
    new Blob([stringifyMoraleCard(morale)], {
      type: "application/json;charset=utf-8",
    }),
    `${normalizeString(morale.type)}_morale.homm3morale.json`
  );
}
