"use client";

import type { AppMode } from "@/lib/types";

interface HeaderProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const TABS: Array<{ mode: AppMode; label: string }> = [
  { mode: "guide", label: "Phân loại rác" },
  { mode: "sort", label: "Trò chơi phân loại" },
  { mode: "falling", label: "Rác rơi" },
  { mode: "truefalse", label: "Đúng / Sai" },
  { mode: "quiz", label: "Trắc nghiệm" },
];

export default function Header({ mode, onModeChange }: HeaderProps) {
  return (
    <header className="flex flex-col gap-3 px-4 pt-6 sm:px-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-2xl">♻️</span>
        <div className="flex flex-col leading-tight">
          <span className="text-base font-bold tracking-wide text-sand-800">Phân loại rác</span>
          <span className="text-xs text-sand-500">ごみのぶんべつ</span>
        </div>
      </div>

      <div className="flex flex-wrap rounded-full bg-sand-200 p-1 shadow-inner">
        {TABS.map((tab) => (
          <button
            key={tab.mode}
            type="button"
            onClick={() => onModeChange(tab.mode)}
            className={`btn-press flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              mode === tab.mode
                ? "bg-leaf-500 text-white shadow"
                : "text-sand-600 hover:bg-sand-300/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
