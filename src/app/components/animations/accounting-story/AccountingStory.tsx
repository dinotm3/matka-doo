"use client";

import styles from "./accountingStory.module.css";
import Calculator from "./parts/Calculator";
import Document from "./parts/Document";
import Magnifier from "./parts/Magnifier";
import Check from "./parts/Check";

type Props = {
  className?: string;
};

export default function AccountingStory({ className = "" }: Props) {
  return (
    <div className={`${styles.story} ${className}`}>
      <div className={styles.tint} aria-hidden="true" />

      <Calculator />
      <Document />
      <Magnifier />
      <Check />
    </div>
  );
}
