# Phạm vi demo và MVP dùng thử

## Hai mốc khác nhau

**D0 — MVP demo:** kiểm chứng ý tưởng, luồng học và phản ứng ban đầu. Một thiết bị, một học sinh minh họa, sáu bài mẫu. Đây là phiên bản hiện tại.

**P1 — MVP pilot:** dùng được với một nhóm học sinh thật có kiểm soát. Cần backend, đăng nhập, phân quyền, lưu trữ riêng tư, học liệu Babel và vận hành giáo viên. Chưa hoàn thành.

## D0 — Đã triển khai

| Nhóm | Khả năng |
|---|---|
| Học sinh | Trang chủ, vào đúng bài mẫu, tiếp tục bước đang học |
| Speaking | 6 bước học/kiểm tra và màn hoàn thành; hội thoại mẫu, chọn vị kem, gợi ý |
| Audio | Thu thật bằng MediaRecorder, nghe lại, thu lại, nộp cuối bài vào IndexedDB |
| Tiến độ | Lưu bước đã đi qua; không coi số bước là điểm năng lực |
| Giáo viên | Một học sinh minh họa, nghe bản nộp, ghi nhận xét và mức đạt mục tiêu |
| Phụ huynh | Xem bài, trạng thái, nghe bản nộp và nhận xét |
| Nội dung | Sửa mẫu, lưu nháp, xuất bản phiên bản mới; URL video trực tiếp tùy chọn |
| Ngôn ngữ | Giao diện Việt/Anh |
| Demo | Xem thử hoàn thành không làm giả bài nộp; khôi phục dữ liệu có xác nhận |

## D0 — Chưa triển khai

Đăng nhập thật, phân quyền, đồng bộ thiết bị, giáo viên giao bài, nhiều học sinh/lớp, lịch sử nhiều lượt, sản xuất video/hoạt hình, chấm AI, ôn tự động, nội dung tùy ý, tải file media lên server, thanh toán, lớp video trực tuyến, thông báo phụ huynh.

Không dùng demo để kết luận hiệu quả sư phạm hoặc khả năng chịu tải production.

## Tiêu chí nghiệm thu D0

- Vào bài từ trang chủ và đi được toàn bộ luồng bằng chuột/bàn phím.
- Tải lại vẫn tiếp tục được bước hiện tại và ngôn ngữ đã chọn.
- Không nộp được khi chưa có bản thu cuối; xem thử không tạo submission.
- Khi trình duyệt hỗ trợ/quyền micro cho phép: thu, nghe lại, nộp và nghe từ vai trò giáo viên/phụ huynh trên cùng origin.
- Lỗi micro/lưu trữ/video không bị trình bày thành học sinh nói sai.
- Nhận xét giáo viên hiển thị ở phụ huynh; trạng thái hoàn thành tách khỏi đạt mục tiêu.
- Lưu nháp không thay đổi bài xuất bản; xuất bản không sửa snapshot bài đang học.
- Không có dữ liệu nhận diện trẻ thật hoặc API key trong project.
- Kiểm tra màn hình điện thoại và desktop, kèm giới hạn thiết bị chưa thử trong QA.

## Phạm vi tối thiểu P1

- Tài khoản và liên kết phụ huynh–con; quyền trên server theo lớp và đối tượng.
- Một nhóm trình độ, khoảng 10–15 bài đã duyệt; quy mô pilot chốt sau khảo sát.
- Giao bài theo lớp/cá nhân, hạn nộp, xem hàng đợi cần nhận xét.
- Audio riêng tư, URL truy cập có thời hạn; retry upload và trạng thái xử lý rõ ràng.
- Phản hồi giáo viên theo rubric; bằng chứng năng lực và lịch sử nhiều lượt.
- CMS mẫu hoạt động, nháp/xem thử/duyệt/xuất bản; quản lý phiên bản.
- Thiết bị thực tế đã được kiểm chứng; sao lưu/khôi phục và quy trình hỗ trợ.
- Đồng thuận, thời hạn lưu, xóa dữ liệu và chính sách nhà cung cấp được xác định trước.

AI không phải điều kiện bắt buộc để chạy pilot. Có thể đánh giá AI riêng trước khi đưa phản hồi cho trẻ.
