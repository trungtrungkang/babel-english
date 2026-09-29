# Kiến trúc và đường mở rộng

## Hiện trạng D0

Ứng dụng web tĩnh ES modules, CSS responsive; máy chủ Node chỉ phục vụ file. Không dependencies runtime bên ngoài npm. Chọn cấu trúc nhỏ để kiểm chứng luồng trước khi chốt stack production.

- `domain.js`: seed content, tạo lượt học có snapshot, tiến độ, validation, quy tắc nộp.
- `storage.js`: adapter localStorage cho metadata; IndexedDB cho Blob âm thanh.
- `app.js`: màn hình và controller UI, speech synthesis, MediaRecorder.
- `server.mjs`: allowlist file public, localhost only, GET/HEAD only.

Đây không phải backend hay kiến trúc chịu tải. UI hiện render lại theo state; dự kiến tách component/controller khi scope tăng. Không hứa giữ nguyên toàn bộ UI code khi chuyển sang framework.

## Phần cần giữ ổn định

Mã định danh, phân biệt completion/mastery, version bài học, dạng hoạt động, rubric và hợp đồng dữ liệu là nền tảng dùng lại. Giữ lưu trữ sau adapter để thay local storage bằng API mà không trộn truy vấn vào quy tắc học.

## Kiến trúc P1 đề xuất (chưa triển khai)

Web responsive → API ứng dụng chia module → cơ sở dữ liệu quan hệ.

Audio/video → object storage riêng tư → CDN/URL có thời hạn.

Upload hoàn tất → hàng đợi xử lý → tác vụ âm thanh (nếu cần) → kết quả đánh giá/giáo viên duyệt.

Bắt đầu với một backend có ranh giới module rõ: identity/enrolment, curriculum/content, assignment/attempt, assessment, reporting. Chưa cần microservices. Chọn dịch vụ cụ thể sau khi biết ngân sách, quy mô và yêu cầu dữ liệu.

## Các thực thể đích

| Thực thể | Ý nghĩa |
|---|---|
| User, Role, GuardianLink | Người dùng, quyền, phụ huynh gắn với con |
| Class, Enrolment | Lớp, giáo viên, học sinh |
| Programme, Level, Unit | Cấu trúc giáo trình |
| Lesson, LessonVersion, Activity | Nội dung và phiên bản bất biến |
| Asset | Video, audio, hình ảnh, transcript, quyền sử dụng |
| Assignment | Bài giao, người/lớp nhận, thời hạn, version |
| Attempt, Response | Lượt học, câu trả lời, thời gian, mức gợi ý |
| Rubric, Assessment, Feedback | Tiêu chí, kết luận, người chấm, nhận xét |
| SkillObjective, MasteryEvidence | Mục tiêu và bằng chứng năng lực |

## Trạng thái

Learning: not_started → in_progress → submitted → reviewed.

Mastery: unknown/pending → achieved hoặc needs_practice. Không suy ra achieved từ submitted.

Upload: local → uploading → stored hoặc failed; chỉ hiện nộp thành công sau khi server xác nhận. API nộp bài dùng idempotency key để retry không tạo trùng.

## Phân quyền P1

- Học sinh: chỉ bài được phép và dữ liệu bản thân.
- Phụ huynh: chỉ con được liên kết và thông tin phù hợp.
- Giáo viên: chỉ lớp/học sinh được phân công.
- Quản trị học liệu: quyền nháp/xuất bản riêng; thao tác quan trọng có audit.

Kiểm tra quyền tại API và tài nguyên audio. Nút ẩn trên giao diện không tạo bảo mật. Thử quyền chéo trước pilot.

## Audio và vận hành

- Kiểm tra codec/thiết bị, giới hạn thời lượng/dung lượng; retry mạng yếu.
- Đường dẫn tải riêng tư có thời hạn, không dùng bucket public cho giọng trẻ.
- Không gửi âm thanh sang AI mặc định. Đánh giá nhà cung cấp, lưu trữ, xóa và chất lượng theo tập dữ liệu được phép trước.
- Định nghĩa retention metadata/audio, quy trình xóa và backup/restore; không tự đặt thời hạn khi Babel chưa quyết định.
- Theo dõi lỗi thu/nộp, độ trễ video và phút xử lý; đo chi phí/phút audio và giáo viên/phút bài nộp.
- Không đặt chỉ tiêu concurrency khi chưa có quy mô; load test theo số lớp/khung giờ dự kiến.

## Mở rộng kỹ năng

Thêm Activity type và evaluator tương ứng, dùng lại danh tính, enrollment, asset, assignment, attempt, reporting. Testing là cách tổ chức và chính sách đánh giá, có thể gồm nhiều kỹ năng. Online-only thêm tuyển sinh, placement, hỗ trợ, thanh toán sau khi core learning vận hành ổn.

## Chuyển từ D0 sang P1

1. Chốt schema nội dung và rubric bằng 3–5 bài thật.
2. Chọn framework/backend cùng đội triển khai; ghi ADR.
3. Thay storage adapter bằng API, thêm server auth và kiểm tra quyền.
4. Di chuyển học liệu được duyệt; không tự di chuyển bản thu demo sang production.
5. Chuẩn bị staging và test browser/device/security/recovery.
6. Chạy pilot nhỏ, xác định điểm nghẽn trước khi tăng số lớp.
