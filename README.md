# Esports Hub — Trang web giải đấu (Liên Quân Mobile, mở rộng được)

Trang web tĩnh (HTML/CSS/JS thuần, không cần Node/npm/build gì cả), lưu trữ **miễn phí** trên
GitHub Pages. Gồm 4 trang:

- `index.html` — Trang chủ: tổng quan, kết quả mới, trận sắp tới, bảng xếp hạng rút gọn
- `lich-thi-dau.html` — Lịch thi đấu theo tuần, nhánh playoff, bảng xếp hạng đầy đủ
- `du-doan.html` — Dự đoán kiểu pick'em: theo từng trận / vòng bảng / playoff
- `quan-tri.html` — Trang quản trị để thêm/sửa đội, trận đấu, thể thức, nhánh đấu

## 1. Đưa lên GitHub Pages (không cần cài phần mềm gì)

1. Vào [github.com](https://github.com) → tạo repository mới, đặt tên tùy ý (vd: `esports-hub`), để **Public**.
2. Trong repo, bấm **Add file → Upload files**, kéo-thả toàn bộ nội dung thư mục này vào
   (giữ nguyên cấu trúc thư mục `assets/`), rồi bấm **Commit changes**.
3. Vào tab **Settings → Pages**. Ở mục "Build and deployment", chọn **Source: Deploy from a branch**,
   nhánh **main**, thư mục **/ (root)** → **Save**.
4. Đợi 1-2 phút, GitHub sẽ cho bạn một đường link dạng
   `https://<ten-tai-khoan>.github.io/<ten-repo>/` — đó là trang web của bạn.
5. Muốn cập nhật sau này: sửa file trực tiếp trên GitHub (bấm biểu tượng bút chì khi xem file),
   hoặc upload đè file mới — không cần công cụ nào khác ngoài trình duyệt.

## 2. Cách cập nhật tỉ số / thêm trận đấu

Có 2 cách, dùng song song được:

**Cách A — Dùng trang Quản trị (khuyên dùng):**
Mở `quan-tri.html` trên trang đã deploy, nhập mật khẩu (mặc định `bqt2026`, đổi trong
`assets/js/admin.js` trước khi công khai repo), rồi thêm/sửa đội, trận đấu, tỉ số, thể thức, nhánh
playoff bằng form. Dữ liệu lưu ngay vào trình duyệt bạn đang dùng (localStorage).

Vì đây là trang **tĩnh**, dữ liệu bạn sửa trong Quản trị **chỉ hiện trên máy/trình duyệt của bạn**.
Để mọi người xem cùng thấy: vào tab **"Xuất / Nhập dữ liệu"** → bấm **"Xuất file data.js"** →
tải về file `data.js` mới → mở file đó trên GitHub (`assets/js/data.js`) → dán đè nội dung →
Commit. Sau ~1 phút trang public sẽ cập nhật cho tất cả người xem.

**Cách B — Sửa thẳng bằng tay:**
Nếu bạn nhờ người khác đọc ảnh kết quả rồi gửi số liệu, bạn có thể mở file `assets/js/data.js`
ngay trên GitHub và sửa trực tiếp mảng `matches` / `teams` theo cấu trúc có sẵn (có chú thích
tiếng Việt trong file).

## 3. Trò chơi dự đoán (pick'em)

- **Dự đoán theo tuần**: người xem bấm chọn đội thắng từng trận. Khi trận đó chuyển trạng thái
  `finished` (qua trang Quản trị), hệ thống tự chấm đúng/sai.
- **Dự đoán vòng bảng**: chọn Top 4 dự kiến.
- **Dự đoán Playoff**: bấm chọn đội thắng ở từng trận nhánh thắng/nhánh thua/chung kết tổng
  (chỉ chọn được khi hai đội đã được xác định trong nhánh đấu).

⚠️ **Giới hạn quan trọng**: vì không có máy chủ/database, dự đoán của mỗi người chỉ lưu trong
trình duyệt của chính họ — **không có bảng xếp hạng dùng chung** giữa nhiều người xem. Đây là
lựa chọn để giữ trang web miễn phí và không cần server. Nếu sau này muốn có bảng xếp hạng thật
sự dùng chung, xem mục "Nâng cấp" bên dưới.

## 4. Thêm bộ môn mới (ngoài Liên Quân)

Trang đã chừa sẵn không gian cho việc này:

- Trong `assets/js/data.js`, mảng `supportedEsports` liệt kê các bộ môn — chỉ cần đổi
  `active: true` cho bộ môn muốn bật, và tạo thêm một bản dữ liệu `teams`/`matches` riêng cho
  bộ môn đó (đơn giản nhất là copy toàn bộ file `data.js` thành `data-lienquan.js`,
  `data-lol.js`... rồi cho `quan-tri.html`/các trang khác chọn nạp file tương ứng theo bộ môn
  đang xem — nút chuyển bộ môn ở đầu trang chủ đã có sẵn giao diện, chỉ cần nối logic chọn file).

## 5. Nâng cấp lên "động" sau này (không bắt buộc)

Kiến trúc hiện tại tách riêng phần **lấy dữ liệu** (`store.js`, hàm `loadRemoteData()` trong
`data.js`) khỏi phần **hiển thị** (`render.js`, các trang `.html`), nên khi muốn nâng cấp bạn chỉ
cần sửa một chỗ:

- **Cập nhật tỉ số tự động**: nối `loadRemoteData()` tới một Google Sheet công khai (qua
  Google Sheets API hoặc dịch vụ như sheet.best — đều có gói miễn phí), hoặc một API thống kê
  giải đấu nếu có.
- **Bảng xếp hạng dự đoán dùng chung**: cần một nơi lưu trữ dùng chung. Lựa chọn miễn phí phổ
  biến: Firebase Realtime Database/Firestore (gói Spark miễn phí), Supabase (gói miễn phí), hoặc
  Google Apps Script + Google Sheet làm "API" đơn giản. Khi có, thay các hàm trong `predict.js`
  (`getState`, `save`) bằng lệnh gọi tới dịch vụ đó thay vì `localStorage`.

## 6. Cấu trúc file

```
index.html            Trang chủ
lich-thi-dau.html      Lịch thi đấu + kết quả + bảng xếp hạng
du-doan.html           Trang dự đoán
quan-tri.html          Trang quản trị
assets/css/style.css   Toàn bộ giao diện
assets/js/data.js      Dữ liệu mặc định (đội, trận đấu, thể thức, nhánh đấu)
assets/js/store.js     Lớp truy xuất dữ liệu (localStorage + tính bảng xếp hạng)
assets/js/render.js    Hàm dựng giao diện dùng chung (nav, thẻ trận đấu, huy hiệu đội)
assets/js/predict.js   Logic trò chơi dự đoán
assets/js/admin.js     Logic trang quản trị
```

Không có bước build/deploy nào khác ngoài upload — mở trực tiếp file `.html` bằng trình duyệt
cũng chạy được để xem thử trước khi đưa lên GitHub.
