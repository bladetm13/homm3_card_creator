import { CardKey } from "./detectCardFile";

export interface QueuedCard {
  id: number;
  key: CardKey;
  name: string;
  payload: unknown;
}

type Listener = (card: QueuedCard) => void;

const listeners = new Set<Listener>();
let nextId = 1_000_000; // Kept clear of the ids PdfEditor hands out on import.

/** Subscribe to cards sent from an editor. Returns an unsubscribe function. */
export function onPdfCard(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Hands the card an editor is currently showing to the PDF tab. A snapshot is
 * taken so later edits in the editor do not mutate what was sent.
 */
export function sendToPdf(key: CardKey, name: string, payload: unknown) {
  const card: QueuedCard = {
    id: nextId++,
    key,
    name,
    payload: JSON.parse(JSON.stringify(payload)),
  };
  listeners.forEach((listener) => listener(card));
}
