# JuleNews – News Platform 📰⚡

## Description

JuleNews is a simple news platform built as part of the **Development Platforms** course assignment at **Noroff – School of Technology and Digital Media**.

The purpose of this project is to demonstrate understanding of modern web development practices, user authentication, and data management using a backend-as-a-service platform.

Anyone can browse submitted news articles, while authenticated users can log in, submit new articles, and delete their own articles.  
Articles are linked to the submitting user, and access rules are enforced using Supabase **Row Level Security (RLS)**.

---

## Built With 🛠️

- HTML
- CSS (mobile-first, responsive)
- JavaScript (Vanilla, ES Modules)
- Supabase (Authentication, Database, RLS)
- Vite

---

## Live Demo 🚀

👉 Hosted on Netlify  
https://julenews.netlify.app/

---

## Features ✨

- 📰 **Public Article Feed** – Browse articles without logging in
- 🔐 **User Authentication** – Register, log in, and log out
- ✍️ **Create Articles** – Authenticated users can submit articles
- 🧾 **Submitter Tracking** – Articles are linked to the logged-in user
- 🗑️ **Owner-only Delete** – Users can delete their own articles only
- 📱 **Responsive Design** – Mobile-first layout

---

## Installation 💻

To run the project locally:

1. Clone the repository from GitHub
2. Navigate into the project folder
3. Install dependencies using `npm install`
4. Start the development server using `npm run dev`

The project will then be available locally in your browser.

---

## Supabase Setup 🔧

This project uses Supabase for authentication and database storage.

The Supabase project includes:

- Email and password authentication
- An `articles` table with the following fields:
  - `id`
  - `title`
  - `body`
  - `category`
  - `submitted_by`
  - `created_at`

Row Level Security (RLS) is enabled to allow:

- Public read access (`SELECT`)
- Authenticated article creation (`INSERT`)
- Deletion only by the article owner (`DELETE`)

---

## Usage 📖

- Browse articles on the home page as a public user
- Register and log in to access article creation
- Create articles with title, category, and body
- Delete your own articles
- Navigation updates automatically based on login state

---

## Motivation 💡

I chose **Option 2 (Supabase)** because I wanted hands-on experience with a backend-as-a-service platform and how it simplifies full-stack development.

**What I liked:**

- Fast setup for authentication and database access
- A clear path to building a working full-stack solution without writing a custom API

**What I found difficult:**

- **Row Level Security (RLS)** was the most challenging part, but also the most valuable learning outcome, as it required understanding how user-based permissions work in practice

**Supabase vs custom API:**

- Supabase reduces boilerplate and significantly speeds up development
- A custom API offers more control and flexibility, but requires more setup, maintenance, and security work

---

## Requirements & Links 📌

- GitHub Repository: https://github.com/RaddishAI/development-platforms-ca
- Hosted Demo (Netlify): https://julenews.netlify.app/

---

## Contact Me 📬

- [LinkedIn](https://www.linkedin.com/in/petter-r%C3%B8nning-80602613a/)
- [Email](mailto:petter.arbeid@gmail.com)
- [Portfolio](https://your-portfolio-link.com/)

---

## Credits 🎉

This project was built as part of the Development Platforms course assignment at Noroff.
Built by me, with the help of **ChatGPT**,  
which assisted with debugging, explanations, and learning support throughout the process.
