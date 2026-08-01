import { MoraleType } from "@/models/moraleCard";
import styles from "./MoraleCardBack.module.css";

const moraleBacks: Record<MoraleType, string> = {
  [MoraleType.Positive]: "morale_positive_back.png",
  [MoraleType.Negative]: "morale_negative_back.png",
};

export default function MoraleCardBack({ type }: { type: MoraleType }) {
  return (
    <div
      className={styles.cardBack}
      style={{ backgroundImage: `url("${moraleBacks[type]}")` }}
    />
  );
}
