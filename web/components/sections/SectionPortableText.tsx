import {PortableText, PortableTextMarkComponentProps} from 'next-sanity'
import {Link, SectionContent} from '../../src/sanity/types'
import styles from './SectionPortableText.module.css'

type Props = {
  content: SectionContent | null | undefined
}

export default function SectionPortableText({content}: Props) {
  if (!content?.length) {
    return null
  }

  return (
    <PortableText
      value={content}
      components={{
        marks: {
          link: ({value, children}: PortableTextMarkComponentProps<Link>) => (
            <a className={styles.link} href={value?.href}>
              {children}
            </a>
          ),
        },
        block: {
          h2: ({children}) => <h2 className={styles.h2}>{children}</h2>,
          h3: ({children}) => <h3 className={styles.h3}>{children}</h3>,
          normal: ({children}) => <p className={styles.paragraph}>{children}</p>,
        },
      }}
    />
  )
}
