# Dashboard Documentation

Dashboard สำหรับ Admin ต้อง login ก่อนถึงจะสามารถใช้งานได้
สร้างโดยใช้ framework react


## Setup & Running

    แก้ไขไฟล์ .env.example เป็น .env (default port = 3002)
    หากมีการแก้ไขเลข port ของ backend ให้แก้ไขในไฟล์ .env ของ dashboard ด้วย

    ```bash
    npm install
    npm run dev
    ```
เมื่อรันจะอยู่ที่ localhost:3002

## Feature

- Kanban Board
- Login
- History

## Usage

ส่วนการใช้งานสำหรับ Admin
1.  เปิดหน้าเว็บ
2.  Login ด้วย username/password (เช่น em01/password)
3.  หน้า Dashboard จะแสดงรายการตั๋วแบบ Kanban Board
4.  สามารถคลิกที่การ์ดเพื่อดูรายละเอียดและเปลี่ยนสถานะ (Pending -> Accepted -> Resolved/Rejected)
5.  สามารถดูประวัติการกระทำได้ที่ปุ่ม History
6.  หากเกิดปัญหาของตั๋วไม่แสดงให้กดปุ่ม refresh
