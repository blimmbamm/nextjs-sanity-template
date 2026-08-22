import type { Metadata } from "next";
import { client } from "../../src/sanity/client";
import { metadataQuery, navigationQuery } from "../../src/sanity/queries";
import {
  MetadataQueryResult,
  NavigationQueryResult,
} from "../../src/sanity/types";
import Footer from "../../components/footer/Footer";
import DesktopNav from "../../components/navigation/desktop/DesktopNav";
import MobileNav from "../../components/navigation/mobile/MobileNav";
import { greatVibesFont, nunitoFont } from "../../styles/font";

import "../globals.css";

import styles from "./layout.module.css";
import { SITE_URL } from "../../src/environment";

export const dynamic = "error";
export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const metadata = await client.fetch<MetadataQueryResult>(
    metadataQuery,
    { lang },
    { cache: "force-cache" },
  );

  return {
    title: metadata?.seoTitle,
    description: metadata?.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        de: `${SITE_URL}/de`,
        en: `${SITE_URL}/en`,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  const navigationQueryResult = await client.fetch<NavigationQueryResult>(
    navigationQuery,
    { lang },
    { cache: "force-cache" },
  );

  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body
        className={`${greatVibesFont.variable} ${nunitoFont.className} ${styles.body}`}
      >
        <div className={styles.background} />
        <header className={styles.header}>
          <nav className={styles.navbar}>
            <DesktopNav navQueryResult={navigationQueryResult} lang={lang} />
            <MobileNav navQueryResult={navigationQueryResult} lang={lang} />
          </nav>
        </header>
        <div className={styles.border} />
        <main className={styles.main}>
          <div className={styles["page-content"]}>{children}</div>
          <Footer lang={lang} />
        </main>
      </body>
    </html>
  );
}
