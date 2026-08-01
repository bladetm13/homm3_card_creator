import { useState } from "react";

export interface CardInstances<T> {
  instances: T[];
  selected: number;
  current: T;
  select: (index: number) => void;
  /** Appends a copy of the selected card and switches to it. */
  add: () => void;
  /** Replaces the selected card. */
  setCurrent: (value: T) => void;
  /** Replaces the whole list, e.g. after opening a file. */
  replaceCurrent: (value: T) => void;
}

/**
 * Lets an editor hold several cards at once while every existing control keeps
 * working on just one of them. Open, Save and Send to PDF all act on `current`.
 */
export function useCardInstances<T>(initial: T): CardInstances<T> {
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

  return {
    instances,
    selected,
    current,
    select: setSelected,
    add,
    setCurrent,
    replaceCurrent: setCurrent,
  };
}
