import { CreatureBankUnit } from "@/models/creatureBankUnit";
import { fileOpen } from "browser-fs-access";
import saveAs from "file-saver";
import { normalizeString } from "./normalizeString";

interface JsonFormat {
  herocreator: "0.1";
  creatureBankUnit: CreatureBankUnit;
}

function parseCreatureBankUnit(data: string): CreatureBankUnit {
  const obj = JSON.parse(data);

  if (!obj.herocreator) {
    throw new Error("Invalid format!");
  }

  if (!obj.creatureBankUnit) {
    throw new Error("This file is not a creature bank unit card!");
  }

  return (obj as JsonFormat).creatureBankUnit;
}

export function stringifyCreatureBankUnit(unit: CreatureBankUnit): string {
  const data = { herocreator: "0.1", creatureBankUnit: unit };
  return JSON.stringify(data, null, 2);
}

export async function loadCreatureBankUnit(): Promise<CreatureBankUnit> {
  const blob = await fileOpen({
    mimeTypes: ["application/json"],
    // Chrome rejects accept extensions longer than 16 characters, and
    // ".homm3creaturebankunit.json" exceeds that. Filter on .json instead so
    // files saved with the long name still open.
    extensions: [".json"],
    description: "Creature bank unit card",
  });
  const text = await blob.text();
  return parseCreatureBankUnit(text);
}

export function saveCreatureBankUnit(unit: CreatureBankUnit) {
  saveAs(
    new Blob([stringifyCreatureBankUnit(unit)], {
      type: "application/json;charset=utf-8",
    }),
    `${normalizeString(unit.name)}.homm3creaturebankunit.json`
  );
}
