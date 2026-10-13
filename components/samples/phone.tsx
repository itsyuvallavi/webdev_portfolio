import type { ReactNode } from "react"
import styles from "./plates.module.css"

/** A phone frame with a status bar, used by the pictures that show a phone screen. */
export function Phone({ time, children }: { time: string; children: ReactNode }) {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <div className={styles.statusBar}>
          <span>{time}</span>
          <span className={styles.notch} />
          <span>5G</span>
        </div>
        {children}
      </div>
    </div>
  )
}
