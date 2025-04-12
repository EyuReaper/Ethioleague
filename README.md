# ⚽ EthioLeague

EthioLeague is a modern web application that replicates the official Ethiopian Premier League website. It provides real-time updates on fixtures, results, news, standings, and more—all built with a fully responsive and animated UI.

---

## 🚀 Features

- 📰 Latest EPL News  
- 🏆 League Table Standings  
- 📆 Fixture Schedules  
- 📽️ Match Highlights  
- ⚙️ Animated transitions & loading states  
- 🌐 Fully responsive navigation with mobile support  
- 📶 Offline-aware loading & error UI with GIF backgrounds  

---

## 🛠️ Tech Stack

**Frontend**
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/v4)

**Backend**
- [Node.js + Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Supabase / Strapi](https://supabase.com/) for content & authentication (optional)

**Other**
- [Socket.IO](https://socket.io/) for real-time features  
- [Lucide Icons](https://lucide.dev/) for icons  

---

## 📁 Project Structure

```
src/
├── assets/            # Images, GIFs, icons
├── components/        # Shared UI components (e.g., Header, Footer)
├── pages/             # Main route pages (Home, Fixtures, News, etc.)
├── store/             # State management (if needed)
├── App.tsx            # Main app layout with routes
├── main.tsx           # React root entry
└── index.css          # Global Tailwind styles
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ethioleague.git
cd ethioleague
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

> Make sure your backend (Express/Supabase) is running at the expected API base URL.

---

## 🌐 Deployment

Frontend:
- **Recommended**: [Vercel](https://vercel.com/) (free, great with React + TypeScript)  
- Alternatives: Netlify, Firebase Hosting  

Backend:
- **Recommended**: [Render](https://render.com/) (free tier available)  
- Alternatives: Railway, Supabase (if using managed backend)  

---

## 📸 GIF Backgrounds

Loading and connection-lost animations are handled via fullscreen GIFs. To update:

- Place your custom GIFs in `/public`:
  - `/public/loading.gif`
  - `/public/error.gif`

---

## 📬 Feedback

Got a suggestion or want to contribute? Feel free to open issues or pull requests!

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

