"use client";

import React from "react";
import clsx from "clsx";
import styles from "./SpellEffect.module.css";

import SpellOptionsIcon from "@/assets/spell_options.svg";
import ArrowIcon from "@/assets/arrow.svg";
import EmpowerIcon from "@/assets/glyphs/empower.svg";

export interface SpellEffectProps {
  power: [number, number, number];
  effect: [React.ReactNode, React.ReactNode, React.ReactNode];
  effectIcon?: React.ReactNode;
  /** Left-hand icon. Defaults to the spell power book when omitted. */
  powerIcon?: React.ReactNode;
}

export default function SpellEffect({
  power,
  effect,
  effectIcon,
  powerIcon,
}: SpellEffectProps) {
  return (
    <div className={styles.spellContainer}>
      <div className={clsx(styles.spellOptions, styles.flip)}>
        <SpellOptionsIcon className={styles.spellOptionsIcon} />
        <span className={styles.spellPowerIcon}>
          {powerIcon ?? <EmpowerIcon />}
        </span>
        <div className={styles.powerCount}>
          <span>{power[0]}</span>
          <span>{power[1]}</span>
          <span>{power[2]}</span>
        </div>
      </div>
      {effectIcon ? (
        <>
          <div className={styles.arrow}>
            <ArrowIcon />
          </div>
          <div className={styles.spellOptions}>
            <SpellOptionsIcon className={styles.spellOptionsIcon} />
            <span className={styles.spellPowerIcon}>{effectIcon}</span>
            <div className={styles.powerCount}>
              <span>{effect[0]}</span>
              <span>{effect[1]}</span>
              <span>{effect[2]}</span>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.spellOptionsText}>
          <span>{effect[0]}</span>
          <span>{effect[1]}</span>
          <span>{effect[2]}</span>
        </div>
      )}
    </div>
  );
}
