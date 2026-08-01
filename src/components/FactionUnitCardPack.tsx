"use client";

import { FactionUnit } from "@/models/factionUnit";
import { UnitTier } from "@/models/unit";
import { townColors } from "@/models/color";
import styles from "./FactionUnitCard.module.css";
import clsx from "clsx";
import { textToComponent } from "@/lib/textToComponent";
import { useBackground, useBorder } from "@/hooks/background";
import { TypeBadge } from "./FactionUnitCard";

import BronzeStar from "@/assets/glyphs/tier-stars/bronze.png";
import SilverStar from "@/assets/glyphs/tier-stars/silver.png";
import GoldenStar from "@/assets/glyphs/tier-stars/golden.png";
import AzureStar from "@/assets/glyphs/tier-stars/azure.png";

const tierStars: Record<UnitTier, { src: string }> = {
  [UnitTier.Bronze]: BronzeStar,
  [UnitTier.Silver]: SilverStar,
  [UnitTier.Golden]: GoldenStar,
  [UnitTier.Azure]: AzureStar,
};

export default function FactionUnitCardPack({ unit }: { unit: FactionUnit }) {
  const tierStar = tierStars[unit.tier];
  const borderUrl = useBorder(townColors[unit.town].color);
  const tintUrl = useBackground("#6c5e38");
  const tintDarkUrl = useBackground("#3c3321");

  return (
    <div
      className={styles.card}
      style={
        {
          "--border-image": borderUrl,
          "--tint-background": tintUrl,
          "--tint-background-dark": tintDarkUrl,
        } as React.CSSProperties
      }
    >
      <div className={clsx(styles.block, styles.tint, styles.title)}>
        <h3>{unit.name}</h3>
        <img
          src={tierStar.src}
          className={styles.tierStar}
          alt={`${unit.tier} tier`}
        />
      </div>

      <div className={clsx(styles.stats, styles.statsAloneRow)}>
        <div className={clsx(styles.block, styles.leather, styles.stat)}>
          <img src="images/attack.png" alt="Attack" />
          <span>{unit.pack.attack}</span>
        </div>
        <div className={clsx(styles.block, styles.leather, styles.stat)}>
          <img src="images/defense.png" alt="Defense" />
          <span>{unit.pack.defense}</span>
        </div>
        <div className={clsx(styles.block, styles.leather, styles.stat)}>
          <img src="images/hp.png" alt="Health" />
          <span>{unit.pack.health}</span>
        </div>
        <div className={clsx(styles.block, styles.leather, styles.stat)}>
          <img src="images/initiative.png" alt="Initiative" />
          <span>{unit.pack.initiative}</span>
        </div>
      </div>

      <div
        className={clsx(styles.block, styles.portrait)}
        style={{ backgroundImage: `url("${unit.portrait.path}")` }}
      >
        <TypeBadge type={unit.pack.type} />
      </div>

      <div className={clsx(styles.block, styles.tint, styles.packBand)}>
        <span># PACK</span>
      </div>

      <div className={clsx(styles.block, styles.tintDark, styles.specialty)}>
        <div>{textToComponent(unit.packSpecialty)}</div>
      </div>
    </div>
  );
}
