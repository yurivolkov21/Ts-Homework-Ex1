# Ts-Homework-Ex1

Ứng dụng API REST quản lý sản phẩm được xây dựng bằng Node.js, Express và TypeScript.

## 📋 Yêu cầu hệ thống

- Node.js (phiên bản 16.x trở lên)
- npm hoặc yarn

## 🚀 Cài đặt

1. **Clone repository về máy:**
   ```bash
   git clone https://github.com/yurivolkov21/Ts-Homework-Ex1.git
   cd Ts-Homework-Ex1
   ```

2. **Cài đặt các dependencies:**
   ```bash
   npm install
   ```

3. **Biên dịch TypeScript:**
   ```bash
   npx tsc
   ```

## 💻 Chạy ứng dụng

Chạy ứng dụng ở chế độ development (tự động reload khi có thay đổi):
```bash
npm run dev
```

## 📝 Yêu cầu đề bài

### Yêu cầu 1: Các chức năng cơ bản

Tạo một ứng dụng API REST sử dụng Node.js và Express để quản lý danh sách các sản phẩm (products) với các chức năng sau:

#### 1. Lấy danh sách tất cả sản phẩm (GET)
Trả về danh sách tất cả sản phẩm với các thuộc tính:
- **id**: số nguyên, tự động tăng
- **name**: chuỗi, ít nhất 3 ký tự
- **price**: số dương, bắt buộc
- **category**: chuỗi, tùy chọn

#### 2. Lấy thông tin chi tiết sản phẩm theo ID (GET)
- Nhận ID sản phẩm từ URL
- Trả về thông tin của sản phẩm tương ứng
- Nếu sản phẩm không tồn tại, trả về mã lỗi **404**

#### 3. Thêm mới một sản phẩm (POST)
- Người dùng gửi thông tin sản phẩm (bao gồm `name` và `price`)
- **Validate dữ liệu** trước khi thêm:
  - `name` là chuỗi có ít nhất 5 ký tự
  - `price` là số dương
- Nếu dữ liệu hợp lệ, thêm sản phẩm vào danh sách và trả về thông tin sản phẩm mới

#### 4. Cập nhật thông tin sản phẩm theo ID (PUT)
- Cập nhật tên hoặc giá của sản phẩm bằng cách gửi ID sản phẩm qua URL và dữ liệu cập nhật qua body
- **Validate dữ liệu** cập nhật trước khi xử lý
- Nếu ID không tồn tại, trả về mã lỗi **404**

#### 5. Xóa sản phẩm theo ID (DELETE)
- Nhận ID sản phẩm từ URL và xóa sản phẩm tương ứng khỏi danh sách
- Nếu sản phẩm không tồn tại, trả về mã lỗi **404**

### Yêu cầu 2: Các tính năng nâng cao

- ✨ Thêm chức năng **tìm kiếm sản phẩm theo tên** (name)
- 📄 Thêm chức năng **phân trang** cho danh sách sản phẩm (ví dụ: hiển thị 10 sản phẩm mỗi trang)

## 📁 Cấu trúc dự án

```
Ts-Homework-Ex1/
├── src/
│   ├── index.ts          # File chính của ứng dụng
│   └── models/
│       └── Product.ts    # Model sản phẩm
├── dist/                 # Thư mục chứa file JavaScript đã biên dịch
├── package.json          # Cấu hình npm và dependencies
├── tsconfig.json         # Cấu hình TypeScript
└── README.md             # Tài liệu hướng dẫn
```
