"use client";

import { AbilityCard as AbilityCardModel } from "@/models/abilityCard";
import styles from "./AbilityCard.module.css";
import { textToComponent } from "@/lib/textToComponent";
import { useBorder } from "@/hooks/background";
import clsx from "clsx";

import ExpertIcon from "@/assets/glyphs/expert.svg";

export default function AbilityCard({
  ability,
}: {
  ability: AbilityCardModel;
}) {
  const borderUrl = useBorder("#334d73");

  return (
    <div
      className={styles.card}
      style={{ "--border-image": borderUrl } as React.CSSProperties}
    >
      <div className={styles.inner}>
        {ability.empowered ? (
          <>
            <div className={clsx(styles.title, styles.titleEmpowered)}>
              <h3>{ability.name}</h3>
              <div className={styles.empoweredLabel}>Empowered</div>
            </div>

            <div className={styles.icon} style={{ backgroundImage: `url("${ability.icon.path}")` }} />

            <div className={styles.effect}>
              <div>{textToComponent(ability.expertEffect)}</div>
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.icon}
              style={{ backgroundImage: `url("${ability.icon.path}")` }}
            />

            <div className={styles.title}>
              <h3>{ability.name}</h3>
            </div>

            <div className={styles.effect}>
              <div>{textToComponent(ability.regularEffect)}</div>
            </div>

            <div className={styles.divider}>
              <div className={styles.dividerBadge}>
                <ExpertIcon aria-label="Expert effect" />
              </div>
            </div>

            <div className={styles.effect}>
              <div>{textToComponent(ability.expertEffect)}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
