# 🚀 JobNest – Job Application Tracker (Mini CRM)

**JobNest** is a simple and powerful job application tracking system (Mini CRM) that allows applicants to manage their job hunt and enables admins to monitor applications. Built using the **MERN stack**, the project includes authentication, CRUD features, filtering, sorting, and a responsive dashboard.

## 🌐 Live Links

- **Frontend:** [https://jobnest-b.vercel.app](https://jobnest-b.vercel.app)
- **Backend:** `https://<your-backend-url>/` (Replace with actual deployment URL)

---

## 📸 Screenshots

### 🧑‍💼 Applicant Dashboard
![Applicant Dashboard](https://via.placeholder.com/800x400?text=Applicant+Dashboard)

### 📊 Admin Panel
![Admin Panel](https://via.placeholder.com/800x400?text=Admin+Dashboard)

### 📝 Job Application Form
![Add Job Form](https://via.placeholder.com/800x400?text=Add+Job+Form)

---

## 📚 Features

### ✅ User Authentication
- Register / Login using JWT
- Protected routes for users and admin
- Auth persistence via cookies

### 👨‍💼 Applicant Panel
- Add, edit, delete, view job applications
- Fields: `company`, `role`, `status`, `appliedDate`, `notes`
- Status options: `"Applied"`, `"Interview"`, `"Offer"`, `"Rejected"`, `"Accepted"`

### 🧑‍💻 Admin Panel
- View all user applications
- Filter by `status`
- Sort by `applied date`

---

## 🧱 Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, Vite
- **Backend:** Node.js, Express.js, JWT, MongoDB, Mongoose
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (Frontend), Render or Railway (Backend)

---

## 🛠️ Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/jobnest.git
cd jobnest
