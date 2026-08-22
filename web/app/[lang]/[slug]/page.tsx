import { notFound } from "next/navigation";
import { client } from "../../../src/sanity/client";
import { pageBySlugQuery, slugsQuery } from "../../../src/sanity/queries";
import {
  PageBySlugQueryResult,
  SlugsQueryResult,
} from "../../../src/sanity/types";
import styles from "./page.module.css";
import PreviousNextNavigation from "../../../components/navigation/sub-navigation/PreviousNextNavigation";
import TableOfContents from "../../../components/navigation/sub-navigation/TableOfContents";
import PortableTextRenderer from "../../../components/portable-text/renderer/PortableTextRenderer";
import { Metadata } from "next";
import { SITE_URL } from "../../../src/environment";

export const dynamic = "error";
export const revalidate = false;

export async function generateStaticParams() {
  const pages = await client.fetch<SlugsQueryResult>(slugsQuery);

  return pages.map((p) => ({
    lang: p.language,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  const pageData = await client.fetch<PageBySlugQueryResult>(
    pageBySlugQuery,
    {
      lang,
      slug,
    },
    { cache: "force-cache" },
  );

  if (!pageData.page) notFound();

  return {
    title: pageData.page.seoTitle,
    description: pageData.page.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${pageData.page.slug}`,
      languages: {
        de: `${SITE_URL}/de/${pageData.page.slug}`,
        en: `${SITE_URL}/en/${pageData.page.slug}`,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  const pageData = await client.fetch<PageBySlugQueryResult>(
    pageBySlugQuery,
    {
      lang,
      slug,
    },
    { cache: "force-cache" },
  );

  if (!pageData.page) {
    notFound();
  }

  const { content } = pageData.page;

  return (
    <div>
      {pageData.page.showPrevNextNav && (
        <PreviousNextNavigation pageData={pageData} />
      )}

      <div className={styles.container}>
        {content && <PortableTextRenderer content={content} />}
        <TableOfContents pageData={pageData} lang={lang} />
      </div>
    </div>
  );
}
