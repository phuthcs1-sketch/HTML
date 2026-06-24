# Key2hand 🗝️

A demo website for **Key2hand** — a Da Nang City organization selling second-hand keychains.

This is a front-end only project with no backend or build step required. All data is mocked and stored in the browser's `localStorage`.

---

## How to Open the Website

### Cách 1 — Mở trực tiếp bằng trình duyệt (Đơn giản nhất)
Tải về hoặc sao chép (clone) thư mục này về máy tính của bạn.

Mở thư mục Phu_2Hand.

Nhấp đúp chuột vào file index.html.

Trang web sẽ được mở ngay lập tức trên trình duyệt mặc định của bạn mà không cần cài đặt bất kỳ công cụ nào.

Lưu ý: Một số trình duyệt có thể hạn chế một vài tính năng (như localStorage) khi mở tệp tin cục bộ trực tiếp qua giao thức file://. Nếu giao diện hoặc tính năng bị lỗi, hãy sử dụng Cách 2 bên dưới.

---

### Cách 2 — Sử dụng Live Server trong VS Code (Khuyên dùng)
Mở thư mục Phu_2Hand bằng phần mềm Visual Studio Code.

Cài đặt tiện ích mở rộng Live Server (tìm kiếm mã ritwickdey.liveserver trong mục Extensions).

Nhấp chuột phải vào file index.html → Chọn Open with Live Server.

Trang web sẽ tự động chạy tại địa chỉ cục bộ http://127.0.0.1:5500.
---

### Cách 3 — Sử dụng máy chủ tích hợp của Python
Mở cửa sổ dòng lệnh (terminal) ngay tại thư mục Phu_2Hand và chạy lệnh sau:

Bash
# Đối với Python 3
python3 -m http.server 8080
Sau đó, mở trình duyệt và truy cập vào địa chỉ: http://localhost:8080.

---

### OCách 4 — Sử dụng gói serve của Node.js
Bash
npx serve .
```

Sau đó, truy cập vào đường dẫn được hiển thị trong terminal (thường là http://localhost:3000).

---

## Các trang trong hệ thống

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Phần mở đầu (Hero), sản phẩm nổi bật, danh mục sản phẩm |
| Shop | `shop.html` | Toàn bộ danh sách sản phẩm tích hợp bộ lọc và tìm kiếm |
| Product | `product.html?id=1` | Xem chi tiết từng sản phẩm (thay đổi số id để xem sản phẩm khác) |
| Cart | `cart.html` | Quản lý giỏ hàng và tiến hành thanh toán |
| About | `about.html` | Câu chuyện thương hiệu, giá trị cốt lõi và câu hỏi thường gặp (FAQ) |
| Login | `login.html` |Đăng nhập vào tài khoản |
| Register | `register.html` | Tạo tài khoản mới |

---

## Demo Account

A built-in test account is ready to use:

| Field | Value |
|-------|-------|
| Email | `demo@key2hand.com` |
| Password | `demo123` |

Or register a new account on the Register page — it is saved locally in your browser.

---

## Lưu ý quan trọng
Tất cả dữ liệu trên web đều là giả lập — không có sản phẩm thật, không xử lý thanh toán hay giao dịch thực tế.

Giỏ hàng, danh sách yêu thích và tài khoản người dùng được lưu trữ bằng localStorage, do đó các dữ liệu này sẽ bị xóa nếu bạn xóa lịch sử/dữ liệu duyệt web.

Bạn có thể dùng thử các mã giảm giá sau khi tiến hành thanh toán trong giỏ hàng: KEY10, WELCOME, STUDENT.

Giao diện trang web được thiết kế tương thích hoàn toàn (Fully Responsive) — hiển thị và hoạt động mượt mà trên cả máy tính, máy tính bảng và điện thoại di động.

---

## Project Structure

```
DIY Keychain/
├── index.html          # Trang chủ
├── shop.html           # Trang cửa hàng / danh sách sản phẩm
├── product.html        # Trang chi tiết sản phẩm
├── cart.html           # Trang giỏ hàng
├── about.html          # Trang giới thiệu Key2hand
├── login.html          # Trang đăng nhập
├── register.html       # Trang đăng ký
├── css/
│   ├── style.css       # CSS toàn cục và định nghĩa các biến màu sắc/giao diện
│   ├── components.css  # CSS cho nút, thẻ sản phẩm, modal popup, thông báo (toast)
│   └── animations.css  # CSS cho các hiệu ứng chuyển động mờ dần và hiển thị
└── js/
    ├── config.js       # Cấu hình toàn trang (tên website, tiền tệ, phí vận chuyển...)
    ├── data.js         # Dữ liệu giả lập của danh sách sản phẩm
    ├── auth.js         # Xử lý đăng nhập / đăng xuất / phiên làm việc của user
    ├── cart.js         # Logic xử lý giỏ hàng và danh sách sản phẩm yêu thích
    ├── main.js         # Xử lý thanh điều hướng (navbar), thông báo và bộ render thẻ sản phẩm
    ├── shop.js         # Logic tìm kiếm, lọc và sắp xếp sản phẩm ở trang Shop
    └── product.js      # Logic xử lý và hiển thị trang chi tiết sản phẩm
```

---

© 2025 Key2hand — Da Nang City, Vietnam
