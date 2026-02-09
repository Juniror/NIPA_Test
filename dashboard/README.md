# Dashboard Documentation

Dashboard สำหรับ Admin ต้อง login ก่อนถึงจะสามารถใช้งานได้
ในการเพิ่ม employee ต้องเพิ่มแบบ manual ผ่าน docker

## Feature

- Login จำเป็นต้อง login ก่อนถึงจะสามารถใช้งานได้ และจะแสดงผู้ใช้อยู่ซ้ายบน
- History เช๋คดูประวัติว่าใครทำอะไรบ้าง ตั๋วไหนถูกเปลี่ยนสถานะ
- Ticket แสดงรายการตั๋วแบบ Kanban Board
- Memo เชฟปัญหาหากว่ายังไม่สามารถจบปัญหาได้ จำเป็นต้องกดเชฟถึงจะเชฟข้อมูล

## Usage

ส่วนการใช้งานสำหรับ Admin

1.  เปิดหน้าเว็บ
2.  Login ด้วย username/password (เช่น em01/password)
3.  หน้า Dashboard จะแสดงรายการตั๋วแบบ Kanban Board
4.  สามารถคลิกที่การ์ดเพื่อดูรายละเอียดและเปลี่ยนสถานะ (Pending -> Accepted -> Resolved/Rejected)
5.  สามารถดูประวัติการกระทำได้ที่ปุ่ม History
6.  หากเกิดปัญหาของตั๋วไม่แสดงให้กดปุ่ม refresh
