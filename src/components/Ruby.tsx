/**
 * Furigana annotation. Renders `reading` as small ruby text above `text`.
 * If `reading` is missing or identical to `text` (pure-kana/katakana terms
 * that need no reading aid), the ruby text is skipped and `text` renders
 * plain -- avoids redundant furigana over words like "ぬいぐるみ" or "ベッド".
 */
export default function Ruby({ text, reading }: { text: string; reading?: string }) {
  if (!reading || reading === text) return <>{text}</>;
  return (
    <ruby>
      {text}
      <rp>(</rp>
      <rt className="text-[0.55em] font-normal text-sand-500">{reading}</rt>
      <rp>)</rp>
    </ruby>
  );
}
