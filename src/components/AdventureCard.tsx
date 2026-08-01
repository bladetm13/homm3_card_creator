"use client";

import {
  AdventureCard as AdventureCardModel,
  adventureCardColors,
} from "@/models/adventureCard";
import styles from "./AdventureCard.module.css";
import { textToComponent, TextToComponentProps } from "@/lib/textToComponent";
import SpellEffect from "./SpellEffect";
import { useBorder } from "@/hooks/background";

const textToComponentProps: TextToComponentProps = {
  renderSpell: (props) => <SpellEffect {...props} />,
};

export default function AdventureCard({
  adventure,
}: {
  adventure: AdventureCardModel;
}) {
  const borderUrl = useBorder(adventureCardColors[adventure.type]);

  return (
    <div
      className={styles.card}
      style={{ "--border-image": borderUrl } as React.CSSProperties}
    >
      <div className={styles.inner}>
        <div className={styles.title}>
          <h3>{adventure.name}</h3>
        </div>

        <div
          className={styles.icon}
          style={{ backgroundImage: `url("${adventure.portrait.path}")` }}
        />

        <div className={styles.typeLabel}>
          <span>{adventure.type}</span>
        </div>

        <div className={styles.effect}>
          <div>{textToComponent(adventure.effect, textToComponentProps)}</div>
        </div>
      </div>
    </div>
  );
}
