import type {PageSection} from './SectionRenderer'
import SectionPortableText from './SectionPortableText'
import SectionShell from './SectionShell'
import styles from './TextSection.module.css'

type Props = {
  section: Extract<PageSection, {_type: 'textSection'}>
}

export default function TextSectionBlock({section}: Props) {
  return (
    <SectionShell>
      <div className={styles.prose}>
        <SectionPortableText content={section.content} />
      </div>
    </SectionShell>
  )
}
