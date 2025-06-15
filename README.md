# Skill Academy Technical round

A complete Django backend project that demonstrates:

- 🔐 User registration, login with JWT authentication and custom profile
- 📝 CRUD blog post system
- ✅ RESTful Todo API (with user-based ownership)
- 📬 Password reset via email (console backend)
- 🔄 PostgreSQL integration
- 🔐 JWT-based authentication
- 🌍 CORS support for frontend (e.g., React)

---

## 🚀 Tech Stack

- Python 3.x
- Django 4.x
- Django REST Framework
- PostgreSQL
- Simple JWT
- CORS Headers

---

## 🧪 Features

### ✅ Task 1: CRUD Blog App

- Post model (title, content, author, published date)
- View list of blog posts
- View details of a single post
- Authenticated create/update/delete
- Only post owner can update/delete

### ✅ Task 2: Todo API

- REST API using DRF
- Authenticated users can manage their own todos
- Filter by completion
- Pagination
- Token protected via JWT

### ✅ Task 3: User Auth & Profile

- Register, Login, Logout with JWT
- Profile model extended with bio and profile picture
- View & edit profile
- Password reset via console

---

## ⚙️ Project Setup

### 🖥️ Clone the Repository

```bash
git clone https://github.com/SankalpaGit/SkillAcademy_Technical_Round.git
cd SkillAcademy_Technical_Round

```

### Setup & Activate Python Virtual Environment
```bash
python3 -m venv .venv
source .venv/bin/activate   # macOS/Linux
# .venv\Scripts\activate    # Windows PowerShell
```

## Install Python Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## Configure Database (PostgreSQL) and SMTP
create .env file inside backend

```bash
# SMTP Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=yourgmail
EMAIL_HOST_PASSWORD=apppasswordhere

# Database Configuration
DB_NAME=Skill
DB_USER=databae name
DB_PASSWORD=pass
DB_HOST=localhost
DB_PORT=5432
```

## Django Settings & Migrations and server
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

```

## stup frontend
```bash
cd frontend
npm install
npm run dev
```