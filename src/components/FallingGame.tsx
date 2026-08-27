"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GOMI_ITEMS, GOMI_CATEGORIES, getGomiCategory } from "@/lib/gomiData";
import { CATEGORY_STYLES } from "@/lib/categoryStyles";
import { shuffle } from "@/lib/shuffle";
import type { GomiCategoryId, GomiItem } from "@/lib/types";

const TOTAL_ROUNDS = 8;
const FALL_DURATION_MS = 6500;
const MAX_CANDIDATES = 6;

interface RoundData {
  item: GomiItem;
  candidates: GomiCategoryId[];
}

interface ResultInfo {
  success: boolean;
  timedOut: boolean;
}

function buildRound(pool: GomiItem[]): RoundData {
  const item = pool[Math.floor(Math.random() * pool.length)];
  const decoyPool = GOMI_CATEGORIES.map((c) => c.id).filter((id) => id !== item.categoryId);
  const decoys = shuffle(decoyPool).slice(0, MAX_CANDIDATES - 1);
  const candidates = shuffle([item.categoryId, ...decoys]);
  return { item, candidates };
}

export default function FallingGame() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [roundData, setRoundData] = useState<RoundData | null>(null);
  const [phase, setPhase] = useState<"falling" | "result" | "summary">("falling");
  const [result, setResult] = useState<ResultInfo | null>(null);
  const [fallTop, setFallTop] = useState(0);
  const [fallLeft, setFallLeft] = useState(0);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const settledRef = useRef(false);

  const startFall = useCallback(() => {
    settledRef.current = false;
    setFallTop(0);
    setFallLeft(0);
    startRef.current = performance.now();

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / FALL_DURATION_MS, 1);
      setFallTop(progress * 86);
      setFallLeft(Math.sin(progress * Math.PI * 3) * 22);

      if (progress >= 1) {
        if (!settledRef.current) {
          settledRef.current = true;
          setResult({ success: false, timedOut: true });
          setPhase("result");
        }
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const startRound = useCallback(
    (usedSoFar: Set<string>) => {
      const remaining = GOMI_ITEMS.filter((it) => !usedSoFar.has(it.id));
      const pool = remaining.length > 0 ? remaining : GOMI_ITEMS;
      const data = buildRound(pool);
      setRoundData(data);
      setResult(null);
      setPhase("falling");
      startFall();
    },
    [startFall]
  );

  useEffect(() => {
    setRound(1);
    setScore(0);
    setUsedIds(new Set());
    startRound(new Set());
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCatch(categoryId: GomiCategoryId) {
    if (phase !== "falling" || !roundData || settledRef.current) return;
    settledRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const success = categoryId === roundData.item.categoryId;
    if (success) setScore((s) => s + 1);
    setResult({ success, timedOut: false });
    setPhase("result");
  }

  function handleNext() {
    const nextUsed = new Set(usedIds);
    if (roundData) nextUsed.add(roundData.item.id);
    setUsedIds(nextUsed);

    if (round >= TOTAL_ROUNDS) {
      setPhase("summary");
      return;
    }
    setRound((r) => r + 1);
    startRound(nextUsed);
  }

  function handleRestart() {
    setRound(1);
    setScore(0);
    setUsedIds(new Set());
    startRound(new Set());
  }

  if (phase === "summary") {
    return (
      <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-sand-300 bg-sand-50 p-8 text-center shadow-card">
        <p className="text-lg font-semibold text-sand-700">Kết thúc phiên chơi!</p>
        <p className="text-sand-600">
          Bạn bắt đúng {score}/{TOTAL_ROUNDS} món đồ.
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="btn-press rounded-full bg-leaf-500 px-5 py-2 text-sm font-semibold text-white hover:brightness-95"
        >
          Chơi lại
        </button>
      </div>
    );
  }

  if (!roundData) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-sand-300 bg-sand-50 p-8 text-center text-sand-600 shadow-card">
        Đang chuẩn bị…
      </div>
    );
  }

  const { item, candidates } = roundData;
  const correctCategory = getGomiCategory(item.categoryId);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-3 flex items-center justify-between text-sm text-sand-600">
        <span>
          Vòng {round}/{TOTAL_ROUNDS}
        </span>
        <span>Điểm: {score}</span>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-lemon-300/70 bg-lemon-100 p-5 shadow-card sm:flex-row">
        {/* Falling zone */}
        <div className="relative mx-auto h-72 w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl border-2 border-dashed border-leaf-300 bg-lemon-200/60">
          <p className="absolute left-0 right-0 top-2 text-center text-[11px] font-medium text-sand-600">
            Đây là rác gì?
          </p>
          <div
            className="absolute flex w-28 -translate-x-1/2 flex-col items-center rounded-xl border border-sand-300 bg-white px-2 py-1.5 text-center shadow-card"
            style={{
              top: `${fallTop}%`,
              left: `calc(50% + ${fallLeft}px)`,
              transition: phase === "falling" ? "none" : "top 0.2s ease-out",
            }}
          >
            <span className="text-3xl">{item.emoji}</span>
            <span className="text-[11px] font-bold leading-tight text-sand-800">{item.nameVi}</span>
            <span className="text-[10px] leading-tight text-sand-500">{item.nameJa}</span>
          </div>
          {/* Catch line marker */}
          <div className="absolute bottom-6 left-2 right-2 border-t-2 border-dashed border-leaf-400/70" />
        </div>

        {/* Candidate bins (right side) */}
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-center text-[11px] font-medium text-sand-600 sm:text-left">
            Bấm đúng loại rác thật nhanh trước khi rơi hết!
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
            {candidates.map((categoryId) => {
              const cat = getGomiCategory(categoryId);
              if (!cat) return null;
              const style = CATEGORY_STYLES[categoryId];
              return (
                <button
                  key={categoryId}
                  type="button"
                  disabled={phase !== "falling"}
                  onClick={() => handleCatch(categoryId)}
                  className={`btn-press flex h-16 flex-col items-center justify-center gap-0.5 rounded-xl border p-1 text-center shadow disabled:opacity-60 ${style.bg} ${style.border}`}
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <span className={`text-[10px] font-semibold leading-tight ${style.text}`}>
                    {cat.nameJa}
                  </span>
                </button>
              );
            })}
          </div>

          {phase === "result" && result && (
            <div
              className={`mt-2 rounded-xl border p-3 text-center text-sm ${
                result.success
                  ? "border-green-400 bg-green-100 text-green-800"
                  : "border-red-300 bg-red-50 text-red-700"
              }`}
            >
              {result.timedOut && <p className="font-semibold">Hết giờ — đồ đã rơi mất!</p>}
              {!result.timedOut && result.success && <p className="font-semibold">Chính xác!</p>}
              {!result.timedOut && !result.success && <p className="font-semibold">Chưa đúng.</p>}
              {!result.success && (
                <p className="mt-1">
                  Đáp án đúng: &quot;{correctCategory?.nameVi} ({correctCategory?.nameJa})&quot;.
                </p>
              )}
              <p className="mt-1 text-sand-700">{item.note}</p>
              <button
                type="button"
                onClick={handleNext}
                className="btn-press mt-2 rounded-full bg-leaf-500 px-5 py-1.5 text-xs font-semibold text-white hover:brightness-95"
              >
                {round < TOTAL_ROUNDS ? "Đồ tiếp theo →" : "Xem kết quả"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
