import { CardKey } from "./detectCardFile";

type Listener = (payloads: unknown[]) => void;

const listeners = new Map<CardKey, Set<Listener>>();

/**
 * Subscribe an editor to cards imported for its own card type. Returns an
 * unsubscribe function. This is the mirror of `sendToPdf`: the PDF tab can
 * take a mixed pile of files and hand each one to the tab that edits it.
 */
export function onEditorImport(key: CardKey, listener: Listener): () => void {
  let forKey = listeners.get(key);
  if (!forKey) {
    forKey = new Set();
    listeners.set(key, forKey);
  }
  forKey.add(listener);
  return () => {
    forKey.delete(listener);
    if (!forKey.size) listeners.delete(key);
  };
}

/**
 * Hands parsed card files to the editors that can hold them, grouped so each
 * editor is updated once. Payloads are copied so the caller's objects stay
 * separate from what the editors now own. Returns how many cards were taken;
 * anything for a card type with no editor listening is left out of the count.
 */
export function importToEditors(
  cards: { key: CardKey; payload: unknown }[],
): number {
  const byKey = new Map<CardKey, unknown[]>();
  for (const { key, payload } of cards) {
    const group = byKey.get(key);
    if (group) group.push(payload);
    else byKey.set(key, [payload]);
  }

  let imported = 0;
  for (const [key, payloads] of byKey) {
    const forKey = listeners.get(key);
    if (!forKey?.size) continue;
    imported += payloads.length;
    forKey.forEach((listener) =>
      listener(JSON.parse(JSON.stringify(payloads))),
    );
  }
  return imported;
}
