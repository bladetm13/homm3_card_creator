import styles from "./AdventureCardBack.module.css";

export default function AdventureCardBack() {
  return (
    <div
      className={styles.cardBack}
      style={{ backgroundImage: `url("adventure_back.png")` }}
    />
  );
}
