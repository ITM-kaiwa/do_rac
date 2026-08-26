# ゴミの分別 (do_rac)

Ứng dụng học phân loại rác ở Nhật Bản, dành cho thực tập sinh kỹ năng người
Việt Nam. Nội dung được biên soạn dựa trên tài liệu giảng dạy nội bộ:

- `実践授業--ゴミの分別.pptx` — quy tắc phân loại, cách đổ rác, câu hỏi
  đúng/sai và trắc nghiệm.
- `実践授業--ゴミの分別--ゴミ分別カード.pptx` — 58 thẻ hình ảnh vật dụng
  dùng để hỏi "đây là rác gì?".

Ứng dụng chị em cùng tổ chức (ITM-kaiwa): [KANJI](https://github.com/ITM-kaiwa/KANJI)
(flashcard học Kanji/Kana/từ vựng) — `do_rac` là một ứng dụng độc lập, không
dùng chung mã nguồn hay cơ sở dữ liệu với KANJI, nhưng theo cùng phong cách
giao diện (Next.js + Tailwind, tông màu sand/leaf).

## Các chế độ học

| Tab | Nội dung |
|---|---|
| **Phân loại rác** | Thẻ lật giới thiệu 9 loại rác (もえるゴミ, もえないゴミ, 資源ゴミ, プラスチックゴミ, PETボトル, 粗大ゴミ, 大型家電, 危険ゴミ, thu gom đặc biệt) kèm ví dụ và lưu ý. |
| **Trò chơi phân loại** | Hiện một vật dụng (~57 món), người học chọn đúng loại rác trong 9 lựa chọn, có phản hồi và giải thích ngay. |
| **Đúng / Sai** | 15 tình huống thực tế (đổ rác ban đêm, bình xịt, dao kéo, v.v.) — trả lời Đúng/Sai rồi xem giải thích. |
| **Trắc nghiệm** | 4 câu hỏi trắc nghiệm về quy tắc đổ rác (giờ giấc, máy tính, lý do khác biệt theo khu vực, phân loại nhựa). |

Toàn bộ nội dung (danh mục, vật dụng, câu hỏi) là dữ liệu tĩnh trong
`src/lib/gomiData.ts` — không cần cơ sở dữ liệu hay đăng nhập. Tên gọi và quy
định cụ thể có thể khác nhau tùy thành phố/thị trấn tại Nhật — điều này được
ghi chú ngay trong ứng dụng.

## Chạy thử

```bash
npm install
npm run dev
```

Mở http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Cấu trúc thư mục

```
src/
├── app/            layout.tsx, page.tsx, globals.css
├── components/     Header, Footer, CategoryGuide, SortGame, TrueFalseQuiz, MultipleChoiceQuiz
└── lib/            types.ts, gomiData.ts (nội dung), categoryStyles.ts, shuffle.ts
```
