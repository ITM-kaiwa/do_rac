"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryGuide from "@/components/CategoryGuide";
import SortGame from "@/components/SortGame";
import FallingGame from "@/components/FallingGame";
import TrueFalseQuiz from "@/components/TrueFalseQuiz";
import MultipleChoiceQuiz from "@/components/MultipleChoiceQuiz";
import type { AppMode } from "@/lib/types";

export default function HomePage() {
  const [mode, setMode] = useState<AppMode>("guide");

  return (
    <div className="flex min-h-screen flex-col">
      <Header mode={mode} onModeChange={setMode} />

      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-8">
        {mode === "guide" && <CategoryGuide />}
        {mode === "sort" && <SortGame />}
        {mode === "falling" && <FallingGame />}
        {mode === "truefalse" && <TrueFalseQuiz />}
        {mode === "quiz" && <MultipleChoiceQuiz />}
      </main>

      <Footer />
    </div>
  );
}
