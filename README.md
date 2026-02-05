# Ts-Homework-Ex1

Ex1

Yêu cầu 1:

Tạo một ứng dụng API REST sử dụng Node.js và Express để quản lý danh sách các sản phẩm
(products) với các chức năng sau:
1. Lấy danh sách tất cả sản phẩm (GET): Trả về danh sách tất cả sản phẩm với các thuộc
tính:
o id (số nguyên, tự động tăng)
o name (chuỗi, ít nhất 3 ký tự)
o price (số dương, bắt buộc)
o category (chuỗi, tùy chọn)
2. Lấy thông tin chi tiết sản phẩm theo ID (GET): Nhận ID sản phẩm từ URL, trả về thông
tin của sản phẩm tương ứng. Nếu sản phẩm không tồn tại, trả về mã lỗi 404.
3. Thêm mới một sản phẩm (POST):
o Người dùng gửi thông tin sản phẩm (bao gồm name và price).
o Validate dữ liệu trước khi thêm:
▪ name là chuỗi có ít nhất 5 ký tự.
▪ price là số dương.
o Nếu dữ liệu hợp lệ, thêm sản phẩm vào danh sách và trả về thông tin sản phẩm
mới.

4. Cập nhật thông tin sản phẩm theo ID (PUT):
o Cập nhật tên hoặc giá của sản phẩm bằng cách gửi ID sản phẩm qua URL và dữ
liệu cập nhật qua body.
o Validate dữ liệu cập nhật trước khi xử lý.
o Nếu ID không tồn tại, trả về mã lỗi 404.

5. Xóa sản phẩm theo ID (DELETE):
o Nhận ID sản phẩm từ URL và xóa sản phẩm tương ứng khỏi danh sách.
o Nếu sản phẩm không tồn tại, trả về mã lỗi 404.

Yêu cầu 2:
• Thêm chức năng tìm kiếm sản phẩm theo tên (name).
• Thêm chức năng phân trang cho danh sách sản phẩm (ví dụ: hiển thị 10 sản phẩm mỗi
trang).
