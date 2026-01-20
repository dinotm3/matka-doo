import styles from "../accountingStory.module.css";

export default function Check() {
  return (
    <div className={styles.checkWrap} aria-hidden="true">
      <div className={styles.checkCard}>
        <div className={styles.checkIcon}>✓</div>
      </div>
    </div>
  );
}
