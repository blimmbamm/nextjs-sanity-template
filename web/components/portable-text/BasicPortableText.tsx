import { PortableText } from "next-sanity";

type Props = {
  content: Parameters<typeof PortableText>[0]["value"];
};

export default function BasicPortableText({ content }: Props) {
  if (!content) {
    return null;
  }

  return <PortableText value={content} />;
}
