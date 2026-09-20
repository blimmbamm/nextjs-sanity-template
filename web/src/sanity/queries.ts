import { groq } from "next-sanity";

export const metadataQuery = groq`
  *[_type == "metadata" && language == $lang][0]
`;

export const pathsQuery = groq`
  *[_type == "page" && defined(language)]{
    language,
    path,
    isHome
  }
`;

export const allPagesQuery = groq`
  *[_type == "page" && language == $lang] | order(isHome desc, path asc) {
    _id,
    title,
    path,
    isHome,
    language
  }
`;

/** Portable Text in sections: expand shared image/video refs for rendering. */
const sectionContentProjection = groq`
  []{
    ...,
    _type == "imageRef" => {
      ...,
      image->{
        _id,
        title,
        image,
        alt,
        caption
      }
    },
    _type == "videoRef" => {
      ...,
      video->{
        _id,
        title,
        "videoUrl": file.asset->url,
        poster,
        caption,
        alt,
        autoplay,
        muted
      }
    }
  }
`;

export const pageByPathQuery = groq`
  *[
    _type == "page" &&
    language == $lang &&
    (
      ($path == "" && isHome == true) ||
      ($path != "" && path == $path && isHome != true)
    )
  ][0]{
    _id,
    title,
    seoTitle,
    description,
    path,
    isHome,
    language,
    sections[]{
      _key,
      _type,
      content${sectionContentProjection},
      attribution,
      title,
      left${sectionContentProjection},
      right${sectionContentProjection},
      images[]{
        _key,
        asset,
        hotspot,
        crop,
        alt,
        caption
      },
      gallery->{
        _id,
        title,
        images[]{
          _key,
          asset,
          hotspot,
          crop,
          alt,
          caption
        }
      },
      "videoUrl": file.asset->url,
      poster,
      caption,
      alt,
      autoplay,
      muted,
      video->{
        _id,
        title,
        "videoUrl": file.asset->url,
        poster,
        caption,
        alt,
        autoplay,
        muted
      }
    },
    "translations": *[_type == "translation.metadata" && references(^._id)][0]
      .translations[]{
        language,
        "page": value->{
          _id,
          title,
          path,
          isHome,
          language
        }
      }
  }
`;
