# Cách chạy web client iSnap trên PC

Chạy trên nền tảng hỗ trợ nhân Chromium như: Chrome, Firefox, Opera, Microsoft Edge. 

Ứng dụng được được setup và test trên trình duyệt [OperaGX](https://www.opera.com/gx) và [Chrome](https://www.google.com/chrome), nên khuyến khích sử dụng 2 trình duyệt này để chạy website với độ tương thích tốt nhất (không khuyến khích sử dụng Cốc cốc).

## 1. Yêu cầu/Hướng dẫn cài đặt phần mềm cần thiết

**1. [Node.js](https://nodejs.org/en/)**

Đây là ứng dụng giúp chúng ta chạy và đẩy web lên trình duyệt, đồng thời cũng giúp lấy, cài đặt phần mềm lên trên PC cá nhân

**--Hướng dẫn cài đặt--**

**Bước 1:** Vào link [này](https://nodejs.org/en/) để tải bản cài đặt, sau đó chọn option tải này để tải bản ổn định nhất (ít lỗi):

![image](https://user-images.githubusercontent.com/50539649/121594427-41d74000-ca67-11eb-93c6-669d47ce15f8.png)

**Bước 2:** Bấm next cho tới khi hoàn thành cài đặt (lưu ý tới bước dưới đây thì bỏ tick để tránh cài mấy phần mềm dư thừa)

![image](https://user-images.githubusercontent.com/50539649/121593720-6383f780-ca66-11eb-9e57-72bf89749de7.png)

**Bước 3:** Kiểm tra Node đã được cài bằng cách vào Start (nhấn nút Windows) gõ 'cmd' sau đó nhấn enter cho cửa sổ này hiện ra

![image](https://user-images.githubusercontent.com/50539649/121594027-bd84bd00-ca66-11eb-854b-d5a22c49333a.png)

sau đó nhập lệnh

### `node -v`

rồi enter để kiểm tra phiên bản được cài, nếu hiện được như ở dưới thì Node.js đã cài thành công, còn không tìm ra thì quay lại bước 1 ahihi

![image](https://user-images.githubusercontent.com/50539649/121594152-df7e3f80-ca66-11eb-8fda-d6593a933ff4.png)

**2. [Git - SCM](https://git-scm.com)**

Đây là bộ câu lệnh hỗ trợ việc update các chức năng sau khi tui cập nhật code mới lên hệ thống Github (Github nói sau)

**--Hướng dẫn cài đặt--**

**Bước 1:** Vào link [này](https://git-scm.com/downloads) rồi chọn hệ điều hành của máy tính rồi để nó tự down về

![image](https://user-images.githubusercontent.com/50539649/121594987-fa04e880-ca67-11eb-901a-4ec154ed3326.png)

**Bước 2:** Mở nó lên và bấm next như mùa hè trở nắng mùa xuân sắp về để cài vào hệ thống

**Bước 3:** Kiểm tra cũng mở CMD như bước 3 của Node.js và nhập lệnh

### `git --version`

nếu nó hiện phiên bản như ở dưới thì ok, không thì mọi người hiểu r đó ahihi

![image](https://user-images.githubusercontent.com/50539649/121595414-726ba980-ca68-11eb-9366-1f13a68d3679.png)

## 2. Cách sử dụng phần mềm

Gói ứng dụng sẽ được đăng lên Github (tui có nói ở trên) tại link [này](https://github.com/MinhCab/isnap-web-client/) nên cách mọi người mang nó về như sau

**Bước 1:** Chọn/Tạo 1 folder trong máy tính để lưu toàn bộ app về 

**Bước 2:** Chuột phải và chọn **Git Bash Here** để mở cửa sổ lệnh như dưới đây

![image](https://user-images.githubusercontent.com/50539649/121596194-59172d00-ca69-11eb-9649-58c85f87a5f0.png)

![image](https://user-images.githubusercontent.com/50539649/121596245-66341c00-ca69-11eb-9073-1695a95b83d0.png)

**Bước 3:** Vào link github mà mọi người đang coi cái hướng dẫn này nè, copy đường link theo hình dưới đây

![image](https://user-images.githubusercontent.com/50539649/121596528-bad79700-ca69-11eb-824c-9cf13e84bf94.png)

**Bước 4:** Quay lại cửa sổ lệnh và nhập lệnh này và enter để thực hiện

### `git clone 'bỏ đường link vô đây'` (đường link thì phải chuột phải paste vô chứ k Ctrl + V được đâu nhe)

![image](https://user-images.githubusercontent.com/50539649/121596776-1ace3d80-ca6a-11eb-8b76-57c1ad2a8025.png)

Sau đó đợi cho nó lôi về hết đến khi nó hiện nó vầy là xong:

![image](https://user-images.githubusercontent.com/50539649/121596900-418c7400-ca6a-11eb-890c-97275cd8934e.png)

**Bước 5:** Nhập lệnh này và enter để cửa sổ lệnh đi vào trong folder isnap-web-client

### `cd isnap-web-client`

**Bước 6:** Nhập vào đường lệnh này để cài những thư viện cần thiết để chạy trên local PC

### `npm i --save`

Đợi cho tới khi nó hiện như này là xong

![image](https://user-images.githubusercontent.com/50539649/121597685-36861380-ca6b-11eb-9d64-eb01b5ceaf91.png)

**Bước 7:** Bắt đầu khởi chạy bằng cách nhập lệnh

### `npm start`

Sau đó chúng ta đợi 1 tí cho web được khởi chạy lên trình duyệt 1 cách tự động sau đó xài bình thường (Nhớ k có tắt cái cửa sổ lệnh đi, tắt là cúp máy luôn á)

## 2. Cách update khi mà đã cài đặt rồi mà sử dụng về sau

**Bước 1:** Vào lại folder mà mình đã cài đặt, vào luôn folder isnap-web-client và tiếp tục chuột phải chọn 'Git Bash Here'

**Bước 2:** Nhập lệnh như sau

### `git pull` 

sau đó nó hiện như vầy là xong

![image](https://user-images.githubusercontent.com/50539649/121598372-f6736080-ca6b-11eb-8874-e68cd321c951.png)

rồi thực hiện lại từ bước 6 mục cài đặt để tiếp tục sử dụng.

## 4. Lưu ý

Nếu như đã cài và chưa có update nhưng muốn dùng thì cứ trực tiếp vào thẳng cái folder isnap-web-client, bật cái 'Git Bash Here' lên và gõ thẳng 

### `npm start` 
