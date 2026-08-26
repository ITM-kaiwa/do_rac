import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

// Be Vietnam Pro: a webfont with full Vietnamese diacritic coverage, used
// for the app's UI text (which is almost entirely Vietnamese).
const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-vietnamese-ui",
});

export const metadata: Metadata = {
  title: "ゴミの分別 — Phân loại rác",
  description:
    "Ứng dụng học phân loại rác ở Nhật Bản dành cho thực tập sinh kỹ năng người Việt Nam.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="min-h-screen bg-sand-100 text-sand-800 antialiased">{children}</body>
    </html>
  );
}
