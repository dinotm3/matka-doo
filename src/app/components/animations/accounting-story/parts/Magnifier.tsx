import styles from "../accountingStory.module.css";

export default function Magnifier() {
  return (
    <div className={styles.magWrap} aria-hidden="true">
      <div className={styles.magInner}>
        <div className={styles.lens} />
        <div className={styles.handle} />

        <div className={styles.beamClip}>
          <div className={styles.beamInner} />
        </div>
      </div>
    </div>
  );
}
