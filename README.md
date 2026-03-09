<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# 📰 Newspaper Backend API

A professional backend system for a newspaper/news portal built with **NestJS**, supporting **role-based authentication**, **CRUD operations for news posts**, **file uploads to Cloudinary**, and **structured database management** using Prisma.



## 📖 Project Overview

This backend system serves as the foundation for a modern newspaper platform. It allows:

- Admins and Journalists to create, edit, and delete news articles.
- Readers to view published news.
- Secure authentication with JWT and role-based access control.
- Image uploads with Cloudinary integration.
- Robust validation using **Zod**.

---

## 🛠 Tech Stack

- **Backend Framework:** NestJS
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT, Role-Based Access Control
- **File Storage:** Cloudinary with Multer
- **Validation:** Zod
- **Language:** TypeScript

---

## ✨ Features

- **User Management**
  - Register and authenticate users.
  - Role-based access: `ADMIN`, `JOURNALIST`, `READER`.

- **News Management**
  - Create, read, update, delete news posts.
  - Tag and categorize news.
  - Upload images using Cloudinary.

- **Security**
  - JWT authentication.
  - Authorization via `@Auth()` decorator and roles guard.
  - Password hashing with bcrypt (or similar).

- **Validation**
  - Request body validation using Zod.
  - Auto-parse JSON in `multipart/form-data` requests.

- **Scalability**
  - Clean architecture.
  - Modular codebase for easy extension.

---

## ⚡ Setup & Installation

```bash
# Clone repository
git clone https://github.com/<your-username>/newspaper-backend.git
cd newspaper-backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Start development server
npm run start:dev
```


## ⚡ MVC Moduler Structure
```bash
newspaper-backend/
│
├── src/
│   ├── app.module.ts            # Root module
│   ├── main.ts                  # Application bootstrap
│
├── common/                     # Shared utilities & decorators
│   ├── decorators/
│   │   ├── user.decorator.ts    # @CurrentUser
│   │   └── roles.decorator.ts   # @Auth(Role.ADMIN, ...)
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── roles.guard.ts
│   ├── pipes/
│   │   └── zod_validation.pipe.ts
│   ├── interfaces/
│   │   └── jwt.interface.ts
│   ├── config/
│   │   ├── prisma.ts
│   │   ├── cloudinary.config.ts
│   │   └── env.ts
│   └── helpers/
│       └── verifyToken.ts
│
├── modules/                    # Feature modules (MVC)
│   ├── post/
│   │   ├── controllers/
│   │   │   └── post.controller.ts
│   │   ├── services/
│   │   │   └── post.service.ts
│   │   ├── dto/
│   │   │   ├── create.dto.ts
│   │   │   └── update.dto.ts
│   │   └── post.module.ts
│   │
│   ├── user/
│   │   ├── controllers/
│   │   │   └── user.controller.ts
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── user.module.ts
│   │
│   ├── auth/
│   │   ├── controllers/
│   │   │   └── auth.controller.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   └── auth.module.ts
│   │
│   └── comment/
│       ├── controllers/
│       │   └── comment.controller.ts
│       ├── services/
│       │   └── comment.service.ts
│       ├── dto/
│       │   └── create-comment.dto.ts
│       └── comment.module.ts
│
├── prisma/
│   ├── schema/
│   │   └── schema.prisma       # main Prisma schema
│   └── migrations/             # Prisma migrations will be generated here
│
├── test/                       # Unit & e2e tests
│
├── .env
├── package.json
└── README.md
```

## Stay in touch

- Author - [Prince Mahmud Piyas](https://www.linkedin.com/in/pmppiyas/)
- Website - [pmppiyas](https://pmppiyas.vercel.app/)
- Resume - [Video](https://drive.google.com/file/d/1UWCzXmcw1kbqbKNrBsVQ5hkuNDLiong2/view?usp=drive_link)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
