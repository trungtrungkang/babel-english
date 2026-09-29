# Nhật ký quyết định

Các quyết định do triển khai đề xuất, chưa thay thế phê duyệt sản phẩm của Vic/Châu.

| ID | Ngày | Quyết định | Lý do | Khi xem lại |
|---|---|---|---|---|
| ADR-001 | 2026-09-29 | Demo cục bộ trước, pilot sau | Kiểm chứng ý tưởng trước chi phí auth/backend/media | Sau buổi demo |
| ADR-002 | 2026-09-29 | Nhóm 8–11, 1 bài mua kem | Tình huống ngắn thể hiện nghe–bắt chước–tự đáp | Khi Babel chọn nhóm thật |
| ADR-003 | 2026-09-29 | Vanilla JS modules, Node static server | Không cài dependencies, khởi chạy nhanh, chi phí bằng 0 cho API | Trước P1 hoặc khi UI nhiều bài |
| ADR-004 | 2026-09-29 | Audio thật, đánh giá giáo viên | Cho thấy vòng học thật mà không giả chấm AI | Sau benchmark giọng trẻ được phép |
| ADR-005 | 2026-09-29 | Tách completion và mastery | Tránh coi xem hết/nộp bài là đã biết nói | Giữ như nguyên tắc |
| ADR-006 | 2026-09-29 | Snapshot version theo attempt/submission | Sửa bài không làm sai lịch sử | Khi có backend/schema thật |
| ADR-007 | 2026-09-29 | UI VI/EN, tiếng Anh cho nội dung luyện | Thử khả năng phụ huynh/trẻ tiếp cận | Khi quan sát người dùng |
| ADR-008 | 2026-09-29 | Chưa có video Babel: hội thoại + giọng máy có nhãn | Không dùng media không rõ quyền hay giả giọng giáo viên | Khi nhận học liệu |
| ADR-009 | 2026-09-29 | Không triển khai công khai trong D0 | Dữ liệu và chuyển vai trò chỉ dành cho demo cùng thiết bị | Khi yêu cầu link chia sẻ và chốt phạm vi |

## Mẫu quyết định mới

```text
ID / ngày:
Bối cảnh và bằng chứng:
Các lựa chọn:
Quyết định:
Ảnh hưởng sản phẩm / kỹ thuật / dữ liệu:
Điều còn chưa biết:
Người phụ trách xác nhận:
Mốc xem lại:
```

ADR-010: Tích hợp thư viện tài liệu Việt–Anh trong demo theo yêu cầu người dùng. Markdown tại docs/ và docs/en/ là nguồn; scripts/build-docs.mjs đóng gói danh sách cố định vào module public. Không mở quyền đọc tùy ý toàn bộ thư mục dự án. Khi sửa phạm vi, cập nhật cả hai ngôn ngữ và chạy npm run docs:build.
