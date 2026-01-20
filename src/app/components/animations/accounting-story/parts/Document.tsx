import styles from "../accountingStory.module.css";

export default function Document() {
  return (
    <div className={styles.docStage} aria-hidden="true">
      <div className={styles.doc}>
        <div className={styles.docCard}>
          <div className={styles.approvalGlow} />

          <div className={styles.docPad}>
            <div className={styles.docTitle} />

            <div className={styles.docLines}>
              <div className={styles.docLineFull} />
              <div className={styles.docLine92} />
              <div className={styles.docLine80} />
            </div>

            <div className={styles.docGrid}>
              <div className={styles.docCell} />
              <div className={styles.docCell} />
              <div className={styles.docCell} />
              <div className={styles.docCell} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
