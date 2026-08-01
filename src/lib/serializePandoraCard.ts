import { PandoraCard } from "@/models/pandoraCard";
import { fileOpen } from "browser-fs-access";
import saveAs from "file-saver";

interface JsonFormat {
  herocreator: "0.1";
  pandora: PandoraCard;
}

function parsePandoraCard(data: string): PandoraCard {
  const obj = JSON.parse(data);

  if (!obj.herocreator) {
    throw new Error("Invalid format!");
  }

  if (!obj.pandora) {
    throw new Error("This file is not a pandora's box card!");
  }

  return (obj as JsonFormat).pandora;
}

export function stringifyPandoraCard(pandora: PandoraCard): string {
  const data = { herocreator: "0.1", pandora };
  return JSON.stringify(data, null, 2);
}

export async function loadPandoraCard(): Promise<PandoraCard> {
  const blob = await fileOpen({
    mimeTypes: ["application/json"],
    // Chrome rejects accept extensions longer than 16 characters, and
    // ".homm3pandora.json" exceeds that. Filter on .json instead so
    // files saved with the long name still open.
    extensions: [".json"],
    description: "Pandora's box card",
  });
  const text = await blob.text();
  return parsePandoraCard(text);
}

export function savePandoraCard(pandora: PandoraCard) {
  saveAs(
    new Blob([stringifyPandoraCard(pandora)], {
      type: "application/json;charset=utf-8",
    }),
    `pandoras_box.homm3pandora.json`
  );
}
