"use client";

import { useCallback, useEffect, useState } from "react";
import { GOMI_ITEMS, GOMI_CATEGORIES, getGomiCategory } from "@/lib/gomiData";
import { CATEGORY_STYLES } from "@/lib/categoryStyles";
import { shuffle } from "@/lib/shuffle";
import type { GomiItem } from "@/lib/types";

const ROUNDS = 12;

export default function SortGame() {
  const [session, setSession] = useState<GomiItem[]>([]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<"playing" | "summary">("playing");

  const startSession = useCallback(() => {
    setSession(shuffle(GOMI_ITEMS).slice(0, ROUNDS));
    setRound(0);
    setScore(0);
    setSelectedId(null);
    setPhase("playing");
  }, []);

  useEffect(() => {
    startSession();
  }, [startSession]);

  const current = session[round];

  function handlePick(categoryId: string) {
    if (!current || selectedId !== null) return;
    setSelectedId(categoryId);
    if (categoryId === current.categoryId) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (round + 1 >= session.length) {
      setPhase("summary");
      return;
    }
    setRound((r) => r + 1);
    setSelectedId(null);
  }

  if (phase === "summary") {
    return (
      <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-sand-300 bg-sand-50 p-8 text-center shadow-card">
        <p className="text-lg font-semibold text-sand-700">Kết thúc phiên chơi!</p>
        <p className="text-sand-600">
          Bạn phân loại đúng {score}/{session.length} món đồ.
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

  const isAnswered = selectedId !== null;
  const isCorrect = selectedId === current.categoryId;
  const correctCategory = getGomiCategory(current.categoryId);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-3 flex items-center justify-between text-sm text-sand-600">
        <span>
          Câu {round + 1}/{session.length}
        </span>
        <span>Điểm: {score}</span>
      </div>

      <div className="rounded-3xl border border-sand-300 bg-sand-50 p-6 shadow-card">
        <p className="mb-1 text-center text-xs font-medium text-sand-500">
          Đây là rác gì? Hãy chọn đúng loại phân loại.
        </p>
        <div className="mb-5 flex flex-col items-center gap-1 py-4">
          <span className="text-6xl">{current.emoji}</span>
          <p className="text-xl font-bold text-sand-800">{current.nameVi}</p>
          <p className="text-sm text-sand-600">{current.reading}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
          {GOMI_CATEGORIES.map((cat) => {
            const style = CATEGORY_STYLES[cat.id];
            const isThisCorrect = cat.id === current.categoryId;
            const isThisSelected = cat.id === selectedId;
            let extra = "";
            if (isAnswered) {
              if (isThisCorrect) extra = "ring-2 ring-offset-1 ring-green-500";
              else if (isThisSelected) extra = "ring-2 ring-offset-1 ring-red-400 opacity-70";
              else extra = "opacity-50";
            }
            return (
              <button
                key={cat.id}
                type="button"
                disabled={isAnswered}
                onClick={() => handlePick(cat.id)}
                className={`btn-press flex flex-col items-center justify-center gap-0.5 rounded-xl border p-2 text-center shadow disabled:cursor-default ${style.bg} ${style.border} ${extra}`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span className={`text-[11px] font-semibold leading-tight ${style.text}`}>
                  {cat.nameReading}
                </span>
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
            <p className="font-semibold">
              {isCorrect
                ? "Chính xác!"
                : `Chưa đúng — đáp án là "${correctCategory?.nameVi} (${correctCategory?.nameReading})".`}
            </p>
            <p className="mt-1 text-sand-700">{current.note}</p>
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
