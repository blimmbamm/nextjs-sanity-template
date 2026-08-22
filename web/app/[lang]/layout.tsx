import type { Metadata } from "next";
import Link from "next/link";
import { assertSupportedLang } from "../../src/routing/validateLang";
import { resolvePageUrl } from "../../src/routing/resolvePageUrl";
import { client } from "../../src/sanity/client";
import { allPagesQuery, metadataQuery } from "../../src/sanity/queries";
import { AllPagesQueryResult, MetadataQueryResult } from "../../src/sanity/types";
import { SITE_URL } from "../../src/environment";

export const dynamic = "error";
export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  assertSupportedLang(lang);

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
  assertSupportedLang(lang);

  const pages = await client.fetch<AllPagesQueryResult>(
    allPagesQuery,
    { lang },
    { cache: "force-cache" },
  );

  return (
    <html lang={lang}>
      <body>
        <nav>
          <ul>
            {pages.map((page) => (
              <li key={page._id}>
                <Link href={resolvePageUrl(page)}>
                  {page.title ?? (page.isHome ? "Home" : page.path)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
