import clsx from 'clsx'
import type {ReactNode} from 'react'
import styles from './SectionShell.module.css'

type Props = {
  children: ReactNode
  className?: string
  /** Wider content column — e.g. two-column layouts */
  wide?: boolean
}

export default function SectionShell({children, className, wide = false}: Props) {
  return (
    <section className={clsx(styles.section, className)}>
      <div className={clsx(styles.inner, wide && styles.innerWide)}>{children}</div>
    </section>
  )
}
