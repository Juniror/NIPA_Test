# Support Ticket System

ระบบจัดการ ticket

## Project Structure

หลักๆจะมี 3 ส่วน โดยทุกส่วนรันผ่าน docker

1.  **Backend**
    *   **Technology**: Node.js, Express, MySQL.
    *   **Port**: 3000 (API), 3306 (Database).
    *   **Description**: จัดการ API, authentication, และ database operations.

2.  **Frontend**
    *   **Technology**: React, Vite.
    *   **Port**: 3001 (UI).
    *   **Description**: หน้าเว็บสำหรับให้ลูกค้ากรอกข้อมูล

3.  **Dashboard**
    *   **Technology**: React, Vite.
    *   **Port**: 3002 (UI).
    *   **Description**: หน้าเว็บสำหรับให้แอดมินจัดการข้อมูล

## Quick Start

### 1. Setup 

เปลี่ยนชื่อจาก .env.example เป็น .env
- ./backend/.env.example → ./backend/.env
- ./frontend/.env.example → ./frontend/.env
- ./dashboard/.env.example → ./dashboard/.env

### 2. Run

```bash
docker compose up -d
```
รอประมาณ 30 วิ ถึง 1 นาที

### 2. Access

*   **Frontend (Customer)**: [http://localhost:3001](http://localhost:3001)
*   **Dashboard (Admin)**: [http://localhost:3002](http://localhost:3002)
*   **Backend API**: [http://localhost:3000](http://localhost:3000)

## Documentation
-   [Backend Documentation](./backend/README.md)
-   [Frontend Documentation](./frontend/README.md)
-   [Dashboard Documentation](./dashboard/README.md)
