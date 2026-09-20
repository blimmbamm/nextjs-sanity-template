import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextTypeComponentProps,
} from 'next-sanity'
import {ImageRef, Link, SectionContent, VideoRef} from '../../src/sanity/types'
import {urlFor} from '../../src/sanity/sanityImageUrl'
import {resolveLocaleString} from '../../src/sanity/resolveLocaleString'
import VideoPlayer from './VideoPlayer'
import styles from './SectionPortableText.module.css'

type Props = {
  content: SectionContent | null | undefined
  lang: string
}

export default function SectionPortableText({content, lang}: Props) {
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
        types: {
          imageRef: ({value}: PortableTextTypeComponentProps<ImageRef>) => {
            const image = value.image?.image
            if (!image?.asset) {
              return null
            }

            const alt = resolveLocaleString(value.image?.alt, lang)
            const caption = resolveLocaleString(value.image?.caption, lang)

            return (
              <figure className={styles.figure}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.image}
                  src={urlFor(image).width(1200).url()}
                  alt={alt || ''}
                />
                {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
              </figure>
            )
          },
          videoRef: ({value}: PortableTextTypeComponentProps<VideoRef>) => {
            const video = value.video
            if (!video?.videoUrl) {
              return null
            }

            return (
              <div className={styles.mediaBlock}>
                <VideoPlayer
                  url={video.videoUrl}
                  poster={video.poster}
                  caption={resolveLocaleString(video.caption, lang)}
                  alt={resolveLocaleString(video.alt, lang)}
                  autoplay={video.autoplay}
                  muted={video.muted}
                />
              </div>
            )
          },
        },
      }}
    />
  )
}
