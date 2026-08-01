"use client";

import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./CardInstances.module.css";

/** "Magic Arrow" -> "MA", "Boars" -> "BO". Falls back to a number. */
export function initialsOf(label: string, index: number): string {
  const words = label.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return String(index + 1);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function CardInstances({
  labels,
  selected,
  onSelect,
  onAdd,
}: {
  labels: string[];
  selected: number;
  onSelect: (index: number) => void;
  onAdd: () => void;
}) {
  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={clsx(styles.circle, styles.add)}
        onClick={onAdd}
        title="Add a copy of the selected card"
        aria-label="Add a copy of the selected card"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>

      {labels.map((label, index) => (
        <button
          type="button"
          key={index}
          className={clsx(styles.circle, index === selected && styles.selected)}
          onClick={() => onSelect(index)}
          title={label || `Card ${index + 1}`}
          aria-label={label || `Card ${index + 1}`}
          aria-pressed={index === selected}
        >
          {initialsOf(label, index)}
        </button>
      ))}
    </div>
  );
}
