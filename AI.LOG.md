- **Họ và tên sinh viên:** Trần Minh Quang
- **Mã sinh viên:** 1923050043
- **Dự án:** Internship Pipeline Tracker


### Entry 1: Thiết lập cấu trúc thư mục và định tuyến Expo Router
- **Prompt:** "Làm thế nào để cấu hình Expo Router với các màn hình chính gồm: Trang chủ (index), Chi tiết động ([id]), và Trang thêm mới (create) sao cho điều hướng không bị lỗi đường dẫn?"
- **AI Phản hồi:** Đề xuất cấu trúc thư mục chuẩn `src/app/` bao gồm file `_layout.tsx`, `index.tsx`, `create.tsx` và `[id].tsx`. Sử dụng `<Link href="/create" asChild>` và `useLocalSearchParams()` để bắt tham số động.
- **Quyết định (Accepted/Rejected):** Chấp nhận hoàn toàn cấu trúc này vì giúp phân tách rõ ràng List view và Detail view theo đúng tiêu chuẩn đề bài.

### Entry 2: Tối ưu hóa hệ thống Design Tokens (Light/Dark Theme)
- **Prompt:** "Làm thế nào để gom toàn bộ mã màu hex vào một file token duy nhất và bắt buộc không được dùng mã hex trực tiếp trong StyleSheet của các màn hình?"
- **AI Phản hồi:** Tạo file `src/theme/colors.ts` chứa bảng màu `lightTheme` và `darkTheme`, tạo custom hook `useTheme.ts` dựa trên `useColorScheme()`, sau đó áp dụng truyền màu trực tiếp qua inline style mảng `[styles.container, { backgroundColor: theme.bg }]`.
- **Quyết định (Accepted/Rejected):** Chấp nhận và áp dụng triệt để trên toàn bộ các file giao diện để thỏa mãn tiêu chuẩn kỹ thuật khắt khe nhất của giảng viên.

### Entry 3: Xử lý bộ lọc tìm kiếm và thống kê trạng thái ứng tuyển
- **Prompt:** "Viết logic tính toán số lượng đơn ứng tuyển theo từng giai đoạn (Applied, Interviewing, Offered, Rejected) dưới dạng tính toán thời gian thực (computed counts) thay vì lưu cứng vào database."
- **AI Phản hồi:** Sử dụng hàm `.filter().length` trực tiếp trên mảng state của Zustand kết hợp với điều kiện kiểm tra chuỗi `.toLowerCase().includes()` để làm bộ lọc tìm kiếm linh hoạt.