# Thiết kế học và nội dung

## Bài mẫu

ID: speaking-shop-01. Nhóm tuổi giả định: 8–11. Chủ đề: mua kem. Mục tiêu quan sát: trẻ tự gọi món lịch sự, người nghe hiểu ý chính.

| Bước | Nhiệm vụ | Gợi ý | Bằng chứng |
|---|---|---|---|
| Xem | Hiểu tình huống mua kem | Video hoặc hội thoại minh họa | Chưa đánh giá kỹ năng |
| Nghe | Nghe từng lượt | Toàn bộ câu và giọng mẫu | Chưa đánh giá kỹ năng |
| Nói theo | Nhắc câu yêu cầu | Toàn bộ mẫu | Bản thu luyện tạm |
| Luyện tập | Thay vị kem | Mẫu câu với từ thay thế | Vận dụng có gợi ý |
| Tự trả lời | Trả lời câu hỏi của Bo | Gợi ý chỉ hiện khi yêu cầu | Ghi nhận có dùng gợi ý |
| Kiểm tra | Tự gọi món | Không hiện câu đáp | Bản thu cuối nộp giáo viên |
| Hoàn thành | Ghi nhận đã nộp | Nhận xét sau khi giáo viên duyệt | Completion tách mastery |

Giọng máy chỉ dùng thử chức năng. Chưa thể đánh giá giọng mẫu tự nhiên, trọng âm/ngữ điệu đúng ý đồ bài học khi thiếu học liệu Babel.

## Rubric đề xuất cho pilot (chưa chốt)

Giáo viên đánh giá riêng từng tiêu chí theo 3 mức: cần hỗ trợ / đang tiến bộ / độc lập.

1. **Đủ ý:** gọi được món mong muốn; hiểu câu hỏi.
2. **Dễ hiểu:** người nghe hiểu mà không cần đoán quá nhiều; không đòi giọng bản ngữ.
3. **Trôi chảy:** nói được cụm từ/câu với ngắt nghỉ phù hợp cấp độ.
4. **Trọng âm và ngữ điệu:** xét các điểm đã được dạy ở bài đó, không chấm mọi đặc điểm cùng lúc.
5. **Độc lập:** làm được khi giảm gợi ý và đổi tình huống/chi tiết.

v0.1 chỉ dùng kết luận đạt/cần luyện và nhận xét tự do để thử luồng. Rubric nhiều tiêu chí thuộc P1.

## Chuẩn bị học liệu Babel

Mỗi bài cần: mã ổn định, tên, tuổi phù hợp, trình độ, mục tiêu, kỹ năng, từ/cấu trúc trọng tâm, video/âm thanh, transcript, câu mẫu, prompt, câu trả lời chấp nhận được, gợi ý, rubric, điều kiện hoàn thành, tác giả/người duyệt, quyền sử dụng media và phiên bản.

Không gộp tuổi và trình độ vào một trường. Không dùng tiêu đề làm định danh bài.

## Mô hình nội dung đích

Programme → Level → Unit → Lesson → Activity.

Activity có `type`, `skillTags`, `objectiveIds`, `instructions.vi/en`, `assetRefs`, `prompt`, `responseType`, `scaffolding`, `assessmentPolicy`. Các loại đầu: video, listen-repeat, substitution, prompted-response, speaking-assessment. Mở rộng: listening-choice, vocabulary-recall, reading-response, writing-response.

Một tài nguyên video có thể phục vụ nhiều hoạt động; kết quả đánh giá gắn với mục tiêu kỹ năng, không chỉ bài học.

Ví dụ dữ liệu đích, không phải schema đã triển khai:

```json
{
  "id": "shop-order-independent",
  "type": "prompted-response",
  "skillTags": ["speaking"],
  "objectiveIds": ["order-food-politely"],
  "instructions": {"vi": "Gọi món con muốn.", "en": "Order what you would like."},
  "responseType": "audio",
  "assessmentPolicy": {"reviewer": "teacher", "rubricId": "speaking-beginner-v1"}
}
```

## Quy trình biên soạn

Chọn mục tiêu → chọn mẫu hoạt động → nhập học liệu → xem thử như học sinh → duyệt chuyên môn → xuất bản phiên bản → theo dõi nơi học sinh gặp khó → sửa trong bản nháp mới.

Bài đã giao/bài nộp phải giữ được phiên bản nội dung và rubric tương ứng. Không sửa kết quả cũ theo bài mới.


## Chương trình demo mở rộng — 6 bài

| Chủ đề | Bài | Mục tiêu |
|---|---|---|
| Đi mua sắm | 1. At the ice cream shop | Yêu cầu lịch sự |
| Đi mua sắm | 2. At the fruit market | Yêu cầu kèm số lượng |
| Đi mua sắm | 3. My little shopping trip | Tổng hợp thành 3–4 câu |
| Thế giới của con | 4. Meet my family | Giới thiệu người thân và sở thích |
| Thế giới của con | 5. After school | Hoạt động và hỏi lại |
| Thế giới của con | 6. My favourite day | Tổng hợp 4–5 câu có nối ý |

Mọi bài mở để xem thử, không khóa theo điểm. Mỗi bài có tiến độ, bản thu cuối và nhận xét riêng. Giáo viên, phụ huynh và người sửa nội dung chọn bài bằng danh sách phía trên. Nội dung này do demo đề xuất, chưa được Babel duyệt. Video Babel và đánh giá tự động chưa có.
