export default function extractPlainTextFromBlocks(blocks: any[]): string {
  return blocks
    .filter((b) => b._type === 'block' && Array.isArray(b.children))
    .map((block) => block.children.map((child: any) => child.text).join(''))
    .join('\n')
    .trim()
}
