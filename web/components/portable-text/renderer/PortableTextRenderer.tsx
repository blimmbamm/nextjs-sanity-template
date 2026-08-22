import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextTypeComponentProps,
} from "next-sanity";
import { ImagesType, PageContent, VideoBlock } from "../../../src/types";
import {
  Anchor,
  Banner as BannerType,
  ColumnText,
  HeadlineWithDate as HeadlineWithDateType,
  ImageGallery as ImageGalleryType,
  Link,
  Table as TableType,
} from "../../../src/sanity/types";
import ImageGallery from "../block-components/image-gallery/ImageGallery";
import Table from "../block-components/table/Table";
import Video from "../block-components/video/Video";
import HeadlineWithDate from "../block-components/headline-with-date/HeadlineWithDate";
import styles from "./PortableTextRenderer.module.css";
import Banner from "../block-components/banner/Banner";

type Props = {
  content: PageContent;
};

export default function PortableTextRenderer({ content }: Props) {
  return (
    <div className={styles.root}>
      <PortableText
        value={content}
        components={{
          marks: {
            anchor: ({
              value,
              children,
            }: PortableTextMarkComponentProps<Anchor>) => (
              <span id={value?.slug?.current}>
                {!value?.hidden && children}
              </span>
            ),
            link: ({
              value,
              children,
            }: PortableTextMarkComponentProps<Link>) => (
              <a className={styles.link} href={value?.href}>
                {children}
              </a>
            ),
          },
          block: {
            h1Centered: ({ children }) => (
              <h1 className={styles.centered}>{children}</h1>
            ),
            h2Centered: ({ children }) => (
              <h2 className={styles.centered}>{children}</h2>
            ),
            h3Centered: ({ children }) => (
              <h3 className={styles.centered}>{children}</h3>
            ),
            h4Centered: ({ children }) => (
              <h4 className={styles.centered}>{children}</h4>
            ),
            centered: ({ children }) => (
              <p className={styles.centered}>{children}</p>
            ),
          },
          types: {
            columnText: ({
              value,
            }: PortableTextTypeComponentProps<ColumnText>) => (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>{value.col1 && <PortableText value={value.col1} />}</div>
                <div>{value.col2 && <PortableText value={value.col2} />}</div>
              </div>
            ),
            imageGallery: (
              props: PortableTextTypeComponentProps<ImageGalleryType>,
            ) =>
              props.value.images && (
                <ImageGallery images={props.value.images} />
              ),
            table: (props: PortableTextTypeComponentProps<TableType>) => (
              <Table data={props.value} />
            ),
            videoRef: (props: PortableTextTypeComponentProps<VideoBlock>) => (
              <Video data={props.value} />
            ),
            headlineWithDate: (
              props: PortableTextTypeComponentProps<HeadlineWithDateType>,
            ) => <HeadlineWithDate data={props.value} />,
            imagesRef: (props: PortableTextTypeComponentProps<ImagesType>) =>
              props.value.images && (
                <ImageGallery images={props.value.images.images} />
              ),
            banner: (props: PortableTextTypeComponentProps<BannerType>) =>
              props.value && <Banner data={props.value} />,
          },
        }}
      />
    </div>
  );
}
