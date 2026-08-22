import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>This page does not exist.</h2>
      <Link href="/">Back to home.</Link>
    </div>
  );
}
