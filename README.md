# Babel Online

Bản MVP demo 0.1 cho sản phẩm luyện tiếng Anh bổ trợ chương trình trực tiếp của Babel. Giai đoạn đầu tập trung Speaking; sản phẩm sẽ được điều chỉnh qua quan sát học sinh, giáo viên và phụ huynh.

**Trạng thái:** prototype tương tác chạy cục bộ, chưa phải hệ thống dùng với học sinh thật. Ngày khởi tạo: 29/09/2026.

## Chạy demo

Cần Node.js 22 trở lên. Không cần npm install, API key hoặc cơ sở dữ liệu.

```sh
npm run dev
```

Mở http://localhost:4173. Dừng bằng Ctrl+C. Nếu cổng bận: `PORT=4174 npm run dev`.

```sh
npm run check
npm test
```

Máy chủ chỉ lắng nghe trên localhost và chỉ phục vụ các tài nguyên ứng dụng cho phép. Không đưa thư mục tài liệu, mã test hay file môi trường lên web. Không có bước build: mã ES modules được trình duyệt tải trực tiếp.

## Xem gì trong demo?

1. **Góc học tập:** một học sinh minh họa, sáu bài thuộc hai chủ đề.
2. **Bài học:** Xem → Nghe → Nói theo → Luyện tập → Tự trả lời → Kiểm tra → Hoàn thành.
3. **Thu âm thật:** thu, nghe lại, thu lại; nộp bản thu cuối bài vào kho trình duyệt.
4. **Giáo viên:** xem tiến độ, nghe bài đã nộp, ghi nhận đạt mục tiêu/cần luyện và nhận xét.
5. **Phụ huynh:** xem cùng bài, bản thu và nhận xét đã lưu.
6. **Nội dung:** sửa bài mẫu, lưu nháp, xuất bản phiên bản mới, thêm URL video trực tiếp.
7. **VI/EN:** chuyển ngôn ngữ giao diện; nội dung luyện nói vẫn bằng tiếng Anh.

Nút “Xem thử màn hoàn thành” không nộp bài và không tạo kết quả học. Cả sáu bài trên trang chủ đều tương tác; bài 3 và bài 6 là bài tổng hợp.

## Giới hạn quan trọng

- Chuyển góc nhìn là công cụ demo, không phải đăng nhập hoặc phân quyền.
- Chưa có video/giọng mẫu Babel. Hội thoại mẫu và speech synthesis giúp xem thử; chất lượng/khả dụng giọng đọc tùy trình duyệt và hệ điều hành.
- Không chấm AI, không tự suy ra kỹ năng từ độ dài bản thu. Mức đạt mục tiêu do người dùng ở vai trò giáo viên chọn.
- Tiến độ/nội dung/nhận xét lưu trong localStorage, bản thu đã nộp lưu trong IndexedDB, chỉ trên trình duyệt và origin hiện tại. Không đồng bộ sang điện thoại hoặc trình duyệt khác.
- Bản thu luyện tập chưa nộp chỉ nằm trong bộ nhớ; chuyển bước/màn hình sẽ bỏ bản thu đó. Chỉ bản nộp cuối được giữ qua tải lại trang. Demo giữ một kết quả hiện hành cho mỗi bài, chưa có lịch sử nhiều lượt trong UI.
- Cho phép đi tiếp mà không thu ở bước luyện; cần bản thu cuối bài để nộp thật. Không phát hiện bản thu im lặng trong v0.1.
- Thu âm cần quyền micro và localhost/HTTPS. Máy chủ mặc định không mở trong mạng LAN. Khi triển khai bản chia sẻ phải dùng HTTPS và xác định phương án dữ liệu trước.
- Công cụ nội dung sửa riêng từng bài trong sáu bài có sẵn; chưa tạo dạng hoạt động tùy ý. Lựa chọn luyện tập và thử thách được thiết kế theo từng bài.
- Google Fonts là tài nguyên ngoại mạng duy nhất mặc định; khi không tải được dùng font hệ thống. Video do người quản lý thêm có thể gọi máy chủ bên ngoài. Giọng máy có thể do hệ điều hành cung cấp; không cam kết speech synthesis luôn offline.
- Không dùng dữ liệu hoặc giọng thật của trẻ trong buổi demo kỹ thuật. Dùng người lớn tự thử.

## Tài liệu dự án

| Tài liệu | Mục đích |
|---|---|
| [Product brief](docs/01-product-brief.md) | Tầm nhìn, người dùng, giả định và câu hỏi cần quyết định |
| [MVP scope](docs/02-mvp-scope.md) | Demo khác gì pilot; phạm vi và tiêu chí nghiệm thu |
| [Learning & content](docs/03-learning-content.md) | Thiết kế bài học và cách chuẩn hóa học liệu |
| [Architecture](docs/04-architecture.md) | Hiện trạng, mô hình đích và đường mở rộng |
| [Roadmap & backlog](docs/05-roadmap-backlog.md) | Thứ tự triển khai và điều kiện chuyển giai đoạn |
| [Experiments](docs/06-experiments.md) | Giả thuyết, thước đo và mẫu ghi nhận phản hồi |
| [Demo guide](docs/07-demo-guide.md) | Kịch bản 10–15 phút cho Vic và Châu |
| [Decision log](docs/08-decisions.md) | Quyết định ban đầu, phương án xem lại |
| [QA](docs/09-qa.md) | Kiểm tra đã chạy, phần cần kiểm chứng trên thiết bị thật |

## Cấu trúc

```text
index.html              điểm vào
src/app.js              các màn hình, hành vi UI, thu âm
src/domain.js           dữ liệu bài mẫu và quy tắc tiến độ/nộp bài
src/storage.js          localStorage và IndexedDB
src/styles.css          thiết kế responsive
scripts/server.mjs      máy chủ demo, không phải backend sản phẩm
 tests/                 kiểm tra quy tắc nghiệp vụ
 docs/                  tài liệu sống, cập nhật theo thử nghiệm
```

Mỗi vòng: chọn một giả thuyết → sửa một nhóm thay đổi nhỏ → demo/quan sát → ghi bằng chứng → quyết định giữ, sửa hay bỏ. Chưa chốt công nghệ production từ bản demo này.

## Tài liệu trong ứng dụng

Mở mục **Tài liệu dự án / Project docs** trong menu demo. Có đủ 10 tài liệu bằng Việt/Anh; nút VI/EN đổi nội dung tài liệu đang đọc. Có thể chia sẻ đường dẫn tài liệu trên cùng máy, ví dụ `http://localhost:4173/?doc=07-demo-guide#docs`.

Nguồn tiếng Việt ở `docs/`, bản English ở `docs/en/`. Sau khi sửa chạy `npm run docs:build` rồi tải lại trình duyệt. `npm run dev` và `npm start` tự đóng gói tài liệu trước khi chạy. Module `src/project-docs.js` là file sinh tự động, không sửa trực tiếp. Cả hai ngôn ngữ cần được cập nhật khi thay đổi quyết định hoặc phạm vi.


## Vòng góp ý Châu/Vic

Mở trang chủ → Dành cho Châu & Vic · Bắt đầu tại đây. Ba bài mua sắm có đóng vai, danh sách và thẻ kể chuyện; chuyển mức hỗ trợ từ mẫu sang từ khóa hoặc tự nói. Bài 4–6 chỉ là ví dụ mở rộng. Giáo viên đánh giá ba tiêu chí thủ công, không có AI nhận dạng/chấm. Thẻ hình dùng emoji/nhãn. Kịch bản hoạt động hiện ở mã nguồn, không chỉnh được trong CMS cơ bản. Dữ liệu hoạt động luyện theo từng bài được lưu và đính kèm bản nộp, nhưng không tự chứng minh học sinh đã nói đúng.
