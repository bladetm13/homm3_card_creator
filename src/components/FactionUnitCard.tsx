"use client";

import { FactionUnit } from "@/models/factionUnit";
import { UnitTier, UnitType } from "@/models/unit";
import { townColors } from "@/models/color";
import styles from "./FactionUnitCard.module.css";
import clsx from "clsx";
import { textToComponent } from "@/lib/textToComponent";
import { useBackground, useBorder } from "@/hooks/background";

import GoldIcon from "@/assets/glyphsInternal/price-icons/gold.png";
import ValuableIcon from "@/assets/glyphsInternal/price-icons/valuables.png";
import RecruitIcon from "@/assets/glyphsInternal/recruit.svg";
import ReinforceIcon from "@/assets/glyphs/reinforce.svg";

import BronzeStar from "@/assets/glyphsInternal/tier-stars/bronze.png";
import SilverStar from "@/assets/glyphsInternal/tier-stars/silver.png";
import GoldenStar from "@/assets/glyphsInternal/tier-stars/golden.png";
import AzureStar from "@/assets/glyphsInternal/tier-stars/azure.png";

import UnitGroundIcon from "@/assets/glyphsInternal/unit_ground.svg";
import UnitFlyingIcon from "@/assets/glyphsInternal/unit_flying.svg";
import UnitRangedIcon from "@/assets/glyphs/unit_ranged.svg";

const tierStars: Record<UnitTier, { src: string }> = {
  [UnitTier.Bronze]: BronzeStar,
  [UnitTier.Silver]: SilverStar,
  [UnitTier.Golden]: GoldenStar,
  [UnitTier.Azure]: AzureStar,
};

export function TypeBadge({ type }: { type: UnitType }) {
  switch (type) {
    case UnitType.Melee:
      return (
        <UnitGroundIcon
          viewBox="0 0 76 76"
          aria-label="Melee unit"
          className={styles.typeBadge}
        >
          <path fill="currentColor" />
        </UnitGroundIcon>
      );
    case UnitType.Flying:
      return (
        <UnitFlyingIcon aria-label="Flying unit" className={styles.typeBadge} />
      );
    case UnitType.Ranged:
      return (
        <UnitRangedIcon aria-label="Ranged unit" className={styles.typeBadge} />
      );
  }
}

export default function FactionUnitCard({ unit }: { unit: FactionUnit }) {
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
          <span>{unit.few.attack}</span>
        </div>
        <div className={clsx(styles.block, styles.leather, styles.stat)}>
          <img src="images/defense.png" alt="Defense" />
          <span>{unit.few.defense}</span>
        </div>
        <div className={clsx(styles.block, styles.leather, styles.stat)}>
          <img src="images/hp.png" alt="Health" />
          <span>{unit.few.health}</span>
        </div>
        <div className={clsx(styles.block, styles.leather, styles.stat)}>
          <img src="images/initiative.png" alt="Initiative" />
          <span>{unit.few.initiative}</span>
        </div>
      </div>

      <div
        className={clsx(styles.block, styles.portrait)}
        style={{ backgroundImage: `url("${unit.portrait.path}")` }}
      >
        <TypeBadge type={unit.few.type} />
      </div>

      <div className={clsx(styles.block, styles.tint, styles.costRow)}>
        <div className={styles.costBox}>
          <RecruitIcon aria-label="Recruitment cost" />
          <img src={GoldIcon.src} alt="Gold" />
          <span>{unit.recruitCost.gold}</span>
          {unit.recruitCost.valuables > 0 ? (
            <>
              <img src={ValuableIcon.src} alt="Valuables" />
              <span>{unit.recruitCost.valuables}</span>
            </>
          ) : null}
        </div>
        <div className={styles.costDivider} />
        <div className={styles.costBox}>
          <ReinforceIcon aria-label="Reinforcement cost" />
          <img src={GoldIcon.src} alt="Gold" />
          <span>{unit.reinforceCost.gold}</span>
          {unit.reinforceCost.valuables > 0 ? (
            <>
              <img src={ValuableIcon.src} alt="Valuables" />
              <span>{unit.reinforceCost.valuables}</span>
            </>
          ) : null}
        </div>
      </div>

      <div className={clsx(styles.block, styles.tintDark, styles.specialty)}>
        <div>{textToComponent(unit.fewSpecialty)}</div>
      </div>
    </div>
  );
}
