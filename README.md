# 🎬 Movie Finder App

A sleek and responsive movie discovery app built using **React**, **Vite**, the **OMDb API**, and **Appwrite**. Instantly search for movies, see trending picks based on popular searches, and explore movie details with a clean UI.

---

## 🌟 Features

- 🔍 Instant Search with Debounce (500ms)
- 🔥 Trending Movies Section powered by Appwrite
- 📊 Search Count Tracking with Appwrite Database
- 🎥 Live Movie Data from [OMDb API](https://www.omdbapi.com/)
- 🌀 Default Random Suggestions on Load
- 📱 Fully Responsive Design
- 🧠 Built using modern React stack (Vite, Hooks)

---

## 🚀 Tech Stack

| Tech                   | Purpose                           |
|------------------------|-----------------------------------|
| **React + Vite**       | Frontend UI and performance       |
| **OMDb API**           | Movie data (title, poster, year)  |
| **Appwrite**           | Backend as a Service (database)   |
| **Tailwind CSS / CSS** | Styling                           |
| **react-use**          | Debouncing and useful hooks       |

---

## 🧪 Demo

👉 [Live Demo](https://your-netlify-app-link.netlify.app)  
(Replace with your actual Netlify URL after deployment)

---

## ⚙️ Environment Setup

### 📁 `.env` (Vite)

```env
VITE_OMDB_API_KEY=your_omdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
