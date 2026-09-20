import type {PageSection} from './SectionRenderer'
import SectionPortableText from './SectionPortableText'
import SectionShell from './SectionShell'
import styles from './TwoColumnSection.module.css'

type Props = {
  section: Extract<PageSection, {_type: 'twoColumnSection'}>
  lang: string
}

export default function TwoColumnSectionBlock({section, lang}: Props) {
  return (
    <SectionShell className={styles.root} wide>
      <div className={styles.columns}>
        <div className={styles.column}>
          <SectionPortableText content={section.left} lang={lang} />
        </div>
        <div className={styles.column}>
          <SectionPortableText content={section.right} lang={lang} />
        </div>
      </div>
    </SectionShell>
  )
}
