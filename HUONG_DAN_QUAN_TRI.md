# Hướng dẫn quản trị Nghịch Tiên

## 1. Cập nhật quy tắc Firestore (bắt buộc, làm 1 lần)

1. Mở Firebase Console → dự án **nghich-tien** → **Firestore Database** → tab **Rules**.
2. Xoá hết nội dung cũ, dán toàn bộ nội dung file `firestore.rules` vào.
3. Bấm **Publish**.

> Phải làm bước này TRƯỚC khi đưa code mới lên web. Code mới gửi kèm `adminRev`
> và giờ máy chủ, quy tắc cũ vẫn nhận được, nhưng quy tắc mới mới chặn được gian lận.

## 2. Tự cấp quyền admin cho mình (làm 1 lần)

1. Đăng ký một tài khoản trong game như người chơi bình thường (ví dụ đạo hiệu `chuadmin`).
2. Mở `https://<trang-cua-ban>/admin.html`, đăng nhập bằng tài khoản đó.
   Trang sẽ báo "chưa có quyền quản trị" và hiện **UID** của bạn.
3. Firebase Console → Firestore Database → **Start collection**:
   - Collection ID: `admins`
   - Document ID: dán UID vừa chép
   - Thêm trường `role` (string) = `owner` → **Save**.
4. Tải lại `admin.html`.

Muốn thêm người phụ quản trị: làm lại bước 3 với UID của họ.

## 3. Dùng trang quản trị

| Việc | Cách làm |
|---|---|
| Xem ai đang chơi | Danh sách bên trái, nhãn **online** = có lưu trong 1 phút gần nhất |
| Sửa cảnh giới, tu vi, linh thạch | Sửa ô → **Lưu nhân vật** |
| Tặng / thu hồi vật phẩm | Mục **Túi đồ**: lọc tên → chọn → **Thêm vào túi**, hoặc **Xoá** |
| Đổi trang bị đang mặc | Mục **Trang bị đang mặc** |
| Khoá người gian lận | Nhập lý do → **Khoá tài khoản** (người chơi bị đăng xuất ngay lần lưu kế tiếp) |
| Khôi phục khi mất đồ | Mục **Bản sao lưu hằng ngày** → **Khôi phục** → **Lưu nhân vật** |
| Bạn bè quên mật khẩu | Họ đăng ký tài khoản mới + tạo nhân vật tạm → bạn mở nhân vật CŨ → **Chuyển nhân vật** → chọn tài khoản mới → **Chép sang** |

Khi bạn lưu lúc người chơi đang online, game của họ tự hiện thông báo và tải lại
để nhận dữ liệu mới, nên thay đổi của bạn không bị ghi đè.

Mọi lần sửa/khoá/chuyển được ghi vào collection `adminLog` trên Firestore.

## 4. Những gì đã thay đổi trong code

- `vendor/firebase-shim.js`: gửi kèm `adminRev`, dùng giờ máy chủ, tự sao lưu mỗi ngày
  vào `characters/{uid}/backups/{ngày}`, xử lý bị khoá và bị admin sửa.
- `firestore.rules`: người chơi chỉ ghi được nhân vật của mình, không tự gỡ khoá,
  không ghi đè được bản sao lưu cũ; admin đọc/sửa được tất cả.
- `admin.html`: trang quản trị mới.
- `index.html`: bỏ dòng gọi `audio_panel.js`; ẩn nút "Chơi ngay không cần tài khoản"
  (tài khoản khách chỉ nhớ trên một máy, xoá trình duyệt là mất).
- `src/`: toàn bộ code đã được in lại thành dạng dễ đọc (một lệnh một dòng),
  chạy y như bản cũ.

## 5. Giới hạn còn lại

- Quy tắc Firestore không đọc được bên trong dữ liệu túi đồ (lưu dạng chuỗi JSON),
  nên người rành kỹ thuật vẫn có thể tự sửa đồ của mình qua F12. Trang quản trị giúp
  bạn **phát hiện và sửa lại**. Muốn chặn hẳn cần máy chủ riêng tính phần thưởng.
- Không có "quên mật khẩu qua email" vì tài khoản dùng đạo hiệu; dùng cách
  **Chuyển nhân vật** ở trên.
