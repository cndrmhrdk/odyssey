# 🎮 Code Odyssey

## 1. Project Overview

### Project Name
**Code Odyssey**

### Project Description
Code Odyssey adalah aplikasi pembelajaran backend berbasis gamifikasi (RPG) yang dirancang untuk membuat proses belajar pemrograman menjadi lebih menarik dan interaktif. Pengguna akan berperan sebagai seorang petualang yang harus menyelesaikan berbagai quest untuk memperoleh Experience (XP), meningkatkan level karakter, membuka region baru, serta mendapatkan achievement.

Aplikasi ini dibangun sebagai implementasi dari seluruh materi yang dipelajari pada Learning Path Code124, meliputi Express.js, PostgreSQL, Prisma ORM, REST API, Zod Validation, JWT Authentication, Multer, Cloudinary, dan Docker.

---

## 2. Project Objectives

Project ini dibuat dengan tujuan untuk:

- Mengimplementasikan seluruh materi yang telah dipelajari pada Learning Path Code124.
- Membangun REST API menggunakan Express.js.
- Mengelola database menggunakan PostgreSQL dan Prisma ORM.
- Mengimplementasikan sistem autentikasi menggunakan JWT dan bcrypt.
- Melakukan validasi data menggunakan Zod.
- Mengunggah file menggunakan Multer dan Cloudinary.
- Membangun aplikasi yang menerapkan konsep CRUD, Authentication, Middleware, serta Third Party Integration.
- Menghasilkan project portfolio yang menarik dan memiliki nilai lebih dibandingkan aplikasi CRUD sederhana.

---

## 3. Tech Stack

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JWT (JSON Web Token)
- bcrypt

### Validation
- Zod

### File Upload
- Multer
- Cloudinary

### Containerization
- Docker

### Version Control
- Git
- GitHub

---

## 4. Core Features

### Authentication
- Register
- Login
- Logout
- JWT Authentication
- Password Hashing (bcrypt)

### Character
- Character Profile
- Avatar
- Level
- XP
- Gold
- Title

### World Map
- Region List
- Locked & Unlocked Region
- Region Progress

### Quest
- Quest List
- Quest Detail
- Complete Quest
- Reward XP
- Reward Gold

### Achievement
- Achievement List
- Unlock Achievement

### Leaderboard
- Ranking berdasarkan Level
- Ranking berdasarkan XP

### Admin
- CRUD Region
- CRUD Quest
- CRUD Achievement

### Upload
- Upload Avatar
- Cloudinary Integration

---

## 5. Target Users

- Mahasiswa yang sedang mempelajari Backend Development.
- Mentor atau evaluator capstone project.
- Recruiter yang ingin melihat portfolio backend developer.

---

## 6. Functional Requirements

### Authentication
- FR-001: User dapat membuat akun baru (register).
- FR-002: User dapat login menggunakan email dan password.
- FR-003: User dapat logout dari aplikasi.
- FR-004: Sistem melakukan autentikasi menggunakan JWT.
- FR-005: Password pengguna disimpan dalam bentuk hash menggunakan bcrypt.

### Character
- FR-006: User dapat melihat informasi karakter.
- FR-007: User dapat mengubah avatar karakter.
- FR-008: Sistem menampilkan level, XP, gold, dan title karakter.

### Region
- FR-009: User dapat melihat daftar region.
- FR-010: Sistem mengunci region yang belum memenuhi syarat.
- FR-011: Sistem membuka region baru setelah syarat terpenuhi.

### Quest
- FR-012: User dapat melihat daftar quest pada setiap region.
- FR-013: User dapat melihat detail quest.
- FR-014: User dapat menyelesaikan quest.
- FR-015: Sistem menyimpan progress quest.
- FR-016: Sistem memberikan reward berupa XP dan gold setelah quest selesai.

### Achievement
- FR-017: User dapat melihat daftar achievement.
- FR-018: Sistem memberikan achievement secara otomatis ketika syarat terpenuhi.

### Leaderboard
- FR-019: User dapat melihat leaderboard berdasarkan level.
- FR-020: User dapat melihat leaderboard berdasarkan XP.

### Admin
- FR-021: Admin dapat mengelola data region.
- FR-022: Admin dapat mengelola data quest.
- FR-023: Admin dapat mengelola data achievement.

### Upload
- FR-024: User dapat mengunggah avatar menggunakan Multer.
- FR-025: Sistem menyimpan avatar pada Cloudinary.

## 7. User Flow

### User Flow

1. User membuka aplikasi Code Odyssey.
2. User melakukan registrasi akun jika belum memiliki akun.
3. User login menggunakan email dan password.
4. Sistem melakukan autentikasi menggunakan JWT.
5. User masuk ke Dashboard.
6. User melihat informasi karakter (Level, XP, Gold, Title, Avatar).
7. User memilih region yang telah terbuka.
8. User melihat daftar quest pada region tersebut.
9. User memilih dan menyelesaikan quest.
10. Sistem menyimpan progress quest.
11. Sistem memberikan reward berupa XP dan Gold.
12. Jika XP memenuhi syarat, karakter akan naik level.
13. Jika syarat region berikutnya terpenuhi, region baru akan terbuka.
14. Jika syarat achievement terpenuhi, sistem memberikan achievement secara otomatis.
15. User dapat melihat leaderboard.
16. User dapat logout dari aplikasi.

## 8. Development Plan

### Sprint 1
- Project Setup
- PostgreSQL
- Prisma ORM
- Database Design

### Sprint 2
- Express.js
- REST API
- CRUD Region
- CRUD Quest

### Sprint 3
- Zod Validation
- Middleware

### Sprint 4
- Authentication
- JWT
- bcrypt
- Authorization

### Sprint 5
- Multer
- Cloudinary
- Upload Avatar

### Sprint 6
- Frontend Integration
- Testing
- Docker
- Deployment