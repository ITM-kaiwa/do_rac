"use client";

import { useState } from "react";
import { GOMI_CATEGORIES } from "@/lib/gomiData";
import { CATEGORY_STYLES } from "@/lib/categoryStyles";

export default function CategoryGuide() {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <p className="mb-4 text-center text-sm text-sand-600">
        Bấm vào từng thẻ để xem chi tiết. Tên gọi và quy định cụ thể có thể khác nhau tùy thành
        phố/thị trấn bạn sinh sống — hãy kiểm tra lại với ban quản lý địa phương khi chuyển đến
        nơi ở mới.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GOMI_CATEGORIES.map((cat) => {
          const style = CATEGORY_STYLES[cat.id];
          const isFlipped = flipped.has(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggle(cat.id)}
              className="flip-perspective btn-press h-44 text-left"
              aria-label={`${cat.nameJa} — ${cat.nameVi}`}
            >
              <div className={`flip-inner ${isFlipped ? "is-flipped" : ""}`}>
                {/* Front */}
                <div
                  className={`flip-face flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-5 text-center shadow-card ${style.bg} ${style.border}`}
                >
                  <span className="text-4xl">{cat.emoji}</span>
                  <p className={`text-lg font-bold ${style.text}`}>{cat.nameJa}</p>
                  <p className="mt-1 text-sm font-medium text-sand-700">{cat.nameVi}</p>
                  <p className="mt-2 text-[11px] text-sand-500">(Bấm để xem chi tiết)</p>
                </div>

                {/* Back */}
                <div
                  className={`flip-face flip-face-back flex flex-col justify-start gap-2 overflow-y-auto rounded-2xl border-2 p-4 shadow-card ${style.bgStrong} ${style.border}`}
                >
                  <p className={`text-sm font-bold ${style.text}`}>
                    {cat.emoji} {cat.nameJa}
                  </p>
                  <p className="text-xs font-medium text-sand-600">{cat.nameVi}</p>
                  <p className="text-xs leading-relaxed text-sand-700">{cat.descriptionVi}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
