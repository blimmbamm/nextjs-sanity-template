import type {PageSection} from './SectionRenderer'
import SectionPortableText from './SectionPortableText'
import SectionShell from './SectionShell'
import styles from './QuoteSection.module.css'

type Props = {
  section: Extract<PageSection, {_type: 'quoteSection'}>
}

export default function QuoteSectionBlock({section}: Props) {
  return (
    <SectionShell className={styles.root}>
      <blockquote className={styles.quote}>
        <SectionPortableText content={section.content} />
        {section.attribution && (
          <footer className={styles.attribution}>{section.attribution}</footer>
        )}
      </blockquote>
    </SectionShell>
  )
}
