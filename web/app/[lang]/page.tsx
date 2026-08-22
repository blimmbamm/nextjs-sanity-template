import { client } from "../../src/sanity/client";
import { HomepageQueryResult } from "../../src/sanity/types";
import { homepageQuery } from "../../src/sanity/queries";
import styles from "./page.module.css";
import PortableTextRenderer from "../../components/portable-text/renderer/PortableTextRenderer";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGS } from "../../i18n/i18n";

export const dynamic = "error";
export const revalidate = false;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const pageData = await client.fetch<HomepageQueryResult>(
    homepageQuery,
    { lang },
    { cache: "force-cache" },
  );

  if (!pageData) return notFound();

  return (
    <div className={styles.root}>
      {pageData.content && <PortableTextRenderer content={pageData.content} />}
    </div>
  );
}
