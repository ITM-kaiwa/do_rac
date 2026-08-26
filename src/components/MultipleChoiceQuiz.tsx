"use client";

import { useCallback, useEffect, useState } from "react";
import { MULTIPLE_CHOICE_QUESTIONS } from "@/lib/gomiData";
import { shuffle } from "@/lib/shuffle";

export default function MultipleChoiceQuiz() {
  const [session, setSession] = useState(MULTIPLE_CHOICE_QUESTIONS);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<"playing" | "summary">("playing");

  const startSession = useCallback(() => {
    setSession(shuffle(MULTIPLE_CHOICE_QUESTIONS));
    setRound(0);
    setScore(0);
    setSelected(null);
    setPhase("playing");
  }, []);

  useEffect(() => {
    startSession();
  }, [startSession]);

  const current = session[round];

  function handleAnswer(index: number) {
    if (!current || selected !== null) return;
    setSelected(index);
    if (index === current.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (round + 1 >= session.length) {
      setPhase("summary");
      return;
    }
    setRound((r) => r + 1);
    setSelected(null);
  }

  if (phase === "summary") {
    return (
      <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-sand-300 bg-sand-50 p-8 text-center shadow-card">
        <p className="text-lg font-semibold text-sand-700">Kết thúc phiên chơi!</p>
        <p className="text-sand-600">
          Bạn trả lời đúng {score}/{session.length} câu.
        </p>
        <button
          type="button"
          onClick={startSession}
          className="btn-press rounded-full bg-leaf-500 px-5 py-2 text-sm font-semibold text-white hover:brightness-95"
        >
          Chơi lại
        </button>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-sand-300 bg-sand-50 p-8 text-center text-sand-600 shadow-card">
        Đang chuẩn bị…
      </div>
    );
  }

  const isAnswered = selected !== null;
  const isCorrect = selected === current.correctIndex;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-3 flex items-center justify-between text-sm text-sand-600">
        <span>
          Câu {round + 1}/{session.length}
        </span>
        <span>Điểm: {score}</span>
      </div>

      <div className="rounded-3xl border border-sand-300 bg-sand-50 p-6 shadow-card">
        <p className="mb-5 text-base font-medium leading-relaxed text-sand-800">
          {current.promptVi}
        </p>

        <div className="flex flex-col gap-2">
          {current.options.map((option, i) => {
            let extra = "border-sand-300 bg-white hover:bg-sand-100";
            if (isAnswered) {
              if (i === current.correctIndex) extra = "border-green-500 bg-green-100 text-green-800";
              else if (i === selected) extra = "border-red-400 bg-red-50 text-red-700 opacity-80";
              else extra = "border-sand-200 bg-white opacity-50";
            }
            return (
              <button
                key={i}
                type="button"
                disabled={isAnswered}
                onClick={() => handleAnswer(i)}
                className={`btn-press rounded-xl border-2 px-4 py-3 text-left text-sm font-medium shadow disabled:cursor-default ${extra}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div
            className={`mt-4 rounded-xl border p-3 text-sm ${
              isCorrect ? "border-green-400 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-700"
            }`}
          >
            <p className="font-semibold">{isCorrect ? "Chính xác!" : "Chưa đúng."}</p>
            <p className="mt-1 text-sand-700">{current.explanationVi}</p>
            <button
              type="button"
              onClick={handleNext}
              className="btn-press mt-3 rounded-full bg-leaf-500 px-5 py-1.5 text-xs font-semibold text-white hover:brightness-95"
            >
              {round + 1 < session.length ? "Câu tiếp theo →" : "Xem kết quả"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
