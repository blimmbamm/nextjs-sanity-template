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
    content,
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
