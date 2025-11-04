# LuanPortal Admin Panel

Hệ thống quản lý admin cho database LuanPortal sử dụng Express.js MVC và SQL Server.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Cấu hình database trong file `.env`:
```
DB_SERVER=DESKTOP-5FEJ6AV
DB_USER=sa
DB_PASSWORD=thinh123
DB_NAME=LuanPortal
DB_PORT=1433
PORT=3000
```

3. Chạy ứng dụng:
```bash
npm start
```

Hoặc chạy với nodemon (tự động restart khi có thay đổi):
```bash
npm run dev
```

4. Truy cập: http://localhost:3000/admin

## Cấu trúc dự án

```
├── app.js                 # Entry point
├── config/
│   └── db.js             # Cấu hình database
├── models/               # Models (Customer, Account, Order)
├── controllers/          # Controllers
├── routes/               # Routes
├── views/                # Views (EJS templates)
│   └── admin/
│       ├── customers/
│       ├── accounts/
│       └── orders/
└── package.json
```

## Tính năng

- Quản lý Customers (CRUD)
- Quản lý Accounts (CRUD)
- Quản lý Orders (CRUD)
- Giao diện admin hiện đại và responsive

