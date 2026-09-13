"use client";
import styles from "./reports.module.css";
export default function PrintReport() {
  return (
    <button
      type="button"
      className={styles.darkButton}
      onClick={() => window.print()}
    >
      Print / save PDF
    </button>
  );
}
