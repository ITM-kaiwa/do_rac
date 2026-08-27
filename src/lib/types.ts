/** The five learning modes exposed in the header tab strip. */
export type AppMode = "guide" | "sort" | "falling" | "truefalse" | "quiz";

/**
 * The nine trash categories taught in the source lesson
 * ("実践授業--ゴミの分別.pptx"). Exact bin names/rules vary by Japanese
 * municipality -- see the disclaimer shown in the guide -- but this set
 * covers the categories the lesson itself distinguishes.
 */
export type GomiCategoryId =
  | "moeru"
  | "moenai"
  | "shigen"
  | "plastic"
  | "pet"
  | "sodai"
  | "kaden"
  | "kiken"
  | "special";

export interface GomiCategory {
  id: GomiCategoryId;
  emoji: string;
  /** Kanji form, shown with furigana on content pages (e.g. the category guide). */
  nameJa: string;
  /** Hiragana/katakana reading of nameJa -- used alone (no kanji, no ruby) inside game cards, where ruby text is too small to read. */
  nameReading: string;
  nameVi: string;
  descriptionVi: string;
  /** Tailwind color stem, e.g. "red" -> bg-red-100, border-red-300, text-red-700. */
  color: string;
}

export interface GomiItem {
  id: string;
  emoji: string;
  /** Kanji form, shown with furigana on content pages. */
  nameJa: string;
  /** Hiragana/katakana reading of nameJa -- used alone inside game cards. Equal to nameJa when the term is already pure kana/katakana. */
  reading: string;
  nameVi: string;
  categoryId: GomiCategoryId;
  /** Short explanation shown after answering (why this category / caveats). */
  note: string;
}

export interface TrueFalseQuestion {
  id: string;
  statementVi: string;
  /** true = statement describes correct behavior, false = incorrect behavior. */
  correct: boolean;
  explanationVi: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  promptVi: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}
