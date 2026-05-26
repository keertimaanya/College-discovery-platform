# CollegeDiscover 🎓

An advanced, premium College Discovery Platform built to help students explore, compare, and save top-tier engineering and technology institutions across India.

---

## 🚀 Live Demo & Screenshots

* **Live Demo**: [https://college-discovery-platform.vercel.app](https://college-discovery-platform.vercel.app) *(To be connected after Vercel deployment)*
* **Screenshot**: *(To be added after deployment)*

---

## 🛠️ Tech Stack

Our platform leverages a modern, premium frontend tech stack:

* ![Next.js](https://img.shields.gradient.is/badge/Next.js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) — Core React Framework (App Router & Dynamic Routing)
* ![TypeScript](https://img.shields.gradient.is/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) — Static Typing & Safety
* ![Tailwind CSS](https://img.shields.gradient.is/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) — High-Performance Utility-First Styling
* ![React Context](https://img.shields.gradient.is/badge/React%20Context-61DAFB?style=for-the-badge&logo=react&logoColor=black) — Global State Management
* ![Vercel](https://img.shields.gradient.is/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) — Production Cloud Deployment

---

## ✨ Features Built

Our dashboard is equipped with four core engineering features:

1. **Multi-Faceted Search & Filters**: A dynamic search panel featuring 300ms debouncing, live result counts, and detailed filters mapping states, type options (Government, Private, Deemed), yearly fees bounds, ratings range, and entrance exams.
2. **Side-by-Side Comparison Engine**: An interactive grid supporting up to 3 active slots, search autocomplete selections, and dynamic row highlights identifying the lowest tuition, highest ratings, and best placement averages.
3. **Persistent Bookmarks System**: An authorized favorites catalog syncing automatically with client-side storage (`localStorage`) so selections persist across browser sessions.
4. **Client-Side Authentication Protection**: Custom login and signup portals with full field confirmations, password checks, and smart redirection back to blocked routes.

---

## ⚙️ How to Run Locally

Get the project running on your local machine in under a minute:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/keertimaanya/College-discovery-platform.git
   cd College-discovery-platform
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the dashboard in action!

---

> 📝 **Note on Data Architecture**: This application uses mock JSON data situated inside `src/data/colleges.json` to simulate API responses. In a production environment, these local JSON structures would be seamlessly replaced by server-side database queries and secure REST/GraphQL API backend endpoints.
