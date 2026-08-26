"use client";

import { useCallback, useEffect, useState } from "react";
import { TRUE_FALSE_QUESTIONS } from "@/lib/gomiData";
import { shuffle } from "@/lib/shuffle";

export default function TrueFalseQuiz() {
  const [session, setSession] = useState(TRUE_FALSE_QUESTIONS);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<"playing" | "summary">("playing");

  const startSession = useCallback(() => {
    setSession(shuffle(TRUE_FALSE_QUESTIONS));
    setRound(0);
    setScore(0);
    setAnswer(null);
    setPhase("playing");
  }, []);

  useEffect(() => {
    startSession();
  }, [startSession]);

  const current = session[round];

  function handleAnswer(value: boolean) {
    if (!current || answer !== null) return;
    setAnswer(value);
    if (value === current.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (round + 1 >= session.length) {
      setPhase("summary");
      return;
    }
    setRound((r) => r + 1);
    setAnswer(null);
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

  const isAnswered = answer !== null;
  const isCorrect = answer === current.correct;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-3 flex items-center justify-between text-sm text-sand-600">
        <span>
          Câu {round + 1}/{session.length}
        </span>
        <span>Điểm: {score}</span>
      </div>

      <div className="rounded-3xl border border-sand-300 bg-sand-50 p-6 shadow-card">
        <p className="mb-1 text-xs font-medium text-sand-500">Tình huống này đúng hay sai?</p>
        <p className="mb-5 text-base font-medium leading-relaxed text-sand-800">
          {current.statementVi}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isAnswered}
            onClick={() => handleAnswer(true)}
            className={`btn-press rounded-xl border-2 py-4 text-lg font-bold shadow disabled:cursor-default ${
              isAnswered && current.correct === true
                ? "border-green-500 bg-green-100 text-green-800"
                : isAnswered && answer === true
                  ? "border-red-400 bg-red-50 text-red-700 opacity-70"
                  : "border-leaf-300 bg-leaf-100 text-leaf-600 hover:bg-leaf-200"
            } ${isAnswered ? "disabled:opacity-50" : ""}`}
          >
            ⭕ Đúng
          </button>
          <button
            type="button"
            disabled={isAnswered}
            onClick={() => handleAnswer(false)}
            className={`btn-press rounded-xl border-2 py-4 text-lg font-bold shadow disabled:cursor-default ${
              isAnswered && current.correct === false
                ? "border-green-500 bg-green-100 text-green-800"
                : isAnswered && answer === false
                  ? "border-red-400 bg-red-50 text-red-700 opacity-70"
                  : "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
            } ${isAnswered ? "disabled:opacity-50" : ""}`}
          >
            ❌ Sai
          </button>
        </div>

        {isAnswered && (
          <div
            className={`mt-4 rounded-xl border p-3 text-sm ${
              isCorrect ? "border-green-400 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-700"
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? "Chính xác!" : `Chưa đúng — đáp án đúng là "${current.correct ? "Đúng" : "Sai"}".`}
            </p>
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
