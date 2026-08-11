import { useCallback, useEffect, useState } from "react";

import { CardKey } from "@/lib/detectCardFile";
import { onEditorImport } from "@/lib/editorQueue";

export interface CardInstances<T> {
  instances: T[];
  selected: number;
  current: T;
  select: (index: number) => void;
  /** Appends a copy of the selected card and switches to it. */
  add: () => void;
  /** Replaces the selected card. */
  setCurrent: (value: T) => void;
  /**
   * Appends cards and switches to the first of them. Opening files never
   * overwrites what the editor is already holding.
   */
  append: (values: T[]) => void;
}

/**
 * Lets an editor hold several cards at once while every existing control keeps
 * working on just one of them. Save and Send to PDF act on `current`; opening
 * files adds to the list instead.
 *
 * Passing the editor's `cardKey` subscribes it to the PDF tab's bulk import, so
 * files of that type land here as extra instances.
 */
export function useCardInstances<T>(
  initial: T,
  cardKey?: CardKey,
): CardInstances<T> {
  const [instances, setInstances] = useState<T[]>([initial]);
  const [selected, setSelected] = useState(0);

  const current = instances[selected] ?? instances[0];

  const setCurrent = (value: T) =>
    setInstances((list) =>
      list.map((item, index) => (index === selected ? value : item)),
    );

  const add = () =>
    setInstances((list) => {
      // Deep copy: these models nest (stats, costs), and the cards are already
      // required to be JSON-serialisable because that is how they are saved.
      const copy = JSON.parse(JSON.stringify(list[selected])) as T;
      setSelected(list.length);
      return [...list, copy];
    });

  const append = useCallback((values: T[]) => {
    if (!values.length) return;
    setInstances((list) => {
      setSelected(list.length);
      return [...list, ...values];
    });
  }, []);

  useEffect(() => {
    if (!cardKey) return;
    return onEditorImport(cardKey, (payloads) => append(payloads as T[]));
  }, [cardKey, append]);

  return {
    instances,
    selected,
    current,
    select: setSelected,
    add,
    setCurrent,
    append,
  };
}
