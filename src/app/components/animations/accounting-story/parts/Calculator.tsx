import styles from "../accountingStory.module.css";

export default function Calculator() {
  return (
    <div className={styles.calcWrap} aria-hidden="true">
      <div className={styles.calcInner}>
        <div className={styles.calcBody}>
          <div className={styles.calcTopPad}>
            <div className={styles.display}>
              <span className={styles.typed}>12,345.67</span>
              <span className={styles.cursor}>▍</span>
            </div>
          </div>

          <div className={styles.calcGrid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.calcKey} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
