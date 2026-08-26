/** The four learning modes exposed in the header tab strip. */
export type AppMode = "guide" | "sort" | "truefalse" | "quiz";

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
  nameJa: string;
  nameReading: string;
  nameVi: string;
  descriptionVi: string;
  /** Tailwind color stem, e.g. "red" -> bg-red-100, border-red-300, text-red-700. */
  color: string;
}

export interface GomiItem {
  id: string;
  emoji: string;
  nameJa: string;
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
