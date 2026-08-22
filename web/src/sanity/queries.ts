import { groq } from "next-sanity";

export const metadataQuery = groq`
  *[_type == "metadata" && language == $lang][0]
`;

export const slugsQuery = groq`
  *[
    _type == "page" &&
    defined(slug.current) &&
    isHome != true
  ]{
    "slug": slug.current,
    language
  }
`;

export const homepageQuery = groq`
  *[_type == "page" && isHome == true && language == $lang][0]{
    _id,
    title,
    showPrevNextNav,
    content[]{
      ...,
      _type == "videoRef" => {
        ...,
        video->{
          caption,
          title,
          muted,
          autoplay,
          "url": file.asset->url,
          "poster": poster.asset->url
        }
      },
      _type == "imagesRef" => {
        ...,
        images->{
          ...
        }
      }
    }
  }
`;

export const pageBySlugQuery = groq`
  {
    "page": *[
      _type == "page" &&
      slug.current == $slug && 
      isHome != true &&
      language == $lang
    ][0]{
      _id,
      title,
      seoTitle,
      description,
      slug,      
      showPrevNextNav,
      content[]{
        ...,
        _type == "videoRef" => {
          ...,
          video->{
            caption,
            title,
            muted,
            autoplay,
            "url": file.asset->url,
            "poster": poster.asset->url
          }
        },
        _type == "imagesRef" => {
          ...,
          "images": images->
        }
      },
      "slug": slug.current,
      "navContext": *[_type == "navigation" && language == $lang][0]{
        "dropdown": items[
          _type == "navDropdown" && 
          (count(items[page._ref == ^.^.^._id]) > 0)
        ][0] {
          ...,
          items[]{
            ...,
            "slug": page->slug.current
          }
        }
      }
    }
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation" && language == $lang][0]{
    items[]{
      _type,
      _key,
      label,
      _type == "navLink" => {
        "slug": page->slug.current
      },
      _type == "navDropdown" => {
        items[]{
          label,
          _key,
          "slug": page->slug.current
        }
      }
    }
  }
`;
