# 🎓 SmartUDE – Your Onboarding Assistant at University of Duisburg-Essen (UDE)

**SmartUDE** is a mobile-first web app built to support new international students at the University of Duisburg-Essen (UDE). Whether it's registering your address, finding housing, navigating campus, or preparing your visa application — SmartUDE simplifies every step of your onboarding journey.

🧭 Think of it as your digital guide, personalized checklist, and UDE buddy — all in one.

---

## 🚀 Live Preview

[🔗 Visit App on Vercel](https://smartude.vercel.app) *(Coming Soon)*

---

## 📦 Features Overview

| Feature                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| ✅ **Checklist System**        | Step-by-step onboarding tasks with persistent progress (localStorage)       |
| 🗺️ **Campus & City Map**       | Map view or list of important locations for students                        |
| 📄 **Visa & Anmeldung Guide** | Clear instructions with required documents and useful links                 |
| 🏠 **Housing Info**           | How to find a dorm or WG, do Anmeldung, and deal with rental contracts      |
| 👥 **Student Life Page**      | Meetups, clubs, and how to connect with others at UDE                       |
| 🔐 **Authentication (Supabase)** | Email/password sign-up and login for saving checklist progress              |
| 🎨 **Beautiful UI**           | Clean, responsive layout using TailwindCSS and bottom tab navigation        |

---

## 🧠 Use Case

- First-week checklist after arriving in Duisburg/Essen
- Avoid missing key deadlines (e.g., residence registration)
- Access campus information even without a local guide
- Join student communities with ease

---

## 🧱 Tech Stack

### 💻 Frontend
- **React.js** – Component-based architecture
- **Vite** – Lightning-fast dev experience
- **Tailwind CSS** – For styling and responsiveness
- **React Router DOM** – SPA routing
- **Heroicons** – Clean icon set
- **localStorage** – For persistent checklist state (MVP)

### ☁️ Backend
- **Supabase**
  - Auth: Email/password login
  - Optional: Store user checklist in database

### 🚀 Deployment
- **Vercel**
  - CI/CD integration with GitHub
  - Optimized for frontend hosting

---

## 📁 Folder Structure

```
smartude/
├── public/
│   └── index.html
├── src/
│   ├── assets/                 # Logo, icons, illustrations
│   ├── components/             # BottomNav, NavBar, Cards
│   │   └── BottomNav.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Checklist.jsx
│   │   ├── Guide.jsx
│   │   ├── Map.jsx
│   │   ├── Housing.jsx
│   │   └── Profile.jsx
│   ├── utils/
│   │   └── checklistData.js    # Checklist logic & localStorage
│   ├── supabaseClient.js       # Supabase init
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── .env                        # Environment variables
└── package.json
```

---

## 🔐 Supabase Auth Setup

1. Go to [supabase.com](https://supabase.com)
2. Create a new project and get:
   - **Supabase URL**
   - **Anon key**
3. Enable **Email/Password** under Auth → Providers
4. Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

---

## 🛠️ Getting Started Locally

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/smartude.git
cd smartude

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Then edit .env with your Supabase credentials

# 4. Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com), import your GitHub project
3. During setup:
   - Set **Build Command**: `npm run build`
   - Set **Output Directory**: `dist`
   - Add **Environment Variables** from `.env`
4. Deploy and you're live!

---

## 🧩 Pages Overview

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home.jsx | Welcome, quick links to all sections |
| `/checklist` | Checklist.jsx | Interactive, persistent onboarding list |
| `/guide` | Guide.jsx | Aufenthaltstitel and visa flow |
| `/map` | Map.jsx | Key campus locations with map or listing |
| `/housing` | Housing.jsx | Housing resources and Anmeldung tips |
| `/profile` | Profile.jsx | Login/Signup via Supabase |

---

## 🧪 Future Features

- 🔄 Sync checklist to Supabase DB per user
- 🌐 Multilingual support (DE / TR / EN)
- 📅 Event calendar integration
- 🔔 Push/email reminders (via Supabase Functions)
- 📱 Convert to React Native mobile app

---

## 👨‍👩‍👧‍👦 Team

Built in 4 hours during development by:

- **[Your Name]** – Fullstack Development
- **[Teammate]** – UI/UX Design  
- **[Teammate]** – Content & Research

---

## 📃 License

Licensed under the MIT License – Free to use, share and build upon.

---

**SmartUDE – Start Smart. Start Confident. Start UDE.**
