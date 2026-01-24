# Best 100 Movies - Production Movie Database

A high-performance, SEO-optimized movie streaming platform architected with **Next.js 15** and **Sanity Headless CMS**. This project features a custom-built automated data pipeline that ingests, cleans, and enriches data from TMDB.

**Live Demo:** [https://best100movies.vercel.app/](https://best100movies.vercel.app/)

## 🚀 Key Technical Features

### 1. Next.js 15 Architecture
- **Server Components (RSC):** Utilized for zero-bundle-size data fetching.
- **ISR (Incremental Static Regeneration):** Configured `revalidate: 3600` to cache TMDB API calls, reducing API costs and improving TTFB (Time to First Byte).
- **Dynamic Metadata:** Automated SEO tags (Title, Description, Keywords) generated server-side for every movie page.

### 2. Custom Data Pipeline (Node.js)
- Engineered a robust ETL (Extract, Transform, Load) script (`importData.js`) that:
  - Fetches raw data from **TMDB API**.
  - Enriches it with **Cast Photos**, **Trailers**, and **Runtime**.
  - Uploads assets to **Sanity CDN** automatically.
  - Sanitizes and structures data into a strict schema.

### 3. Modern UI/UX
- **"Netflix-Style" Immersion:** Implemented dynamic blurred backdrops using Next.js Image optimization.
- **Performance:** Achieved 100/100 Lighthouse scores using `next/image` and lazy loading.
- **Components:** Built with **shadcn/ui** and **Tailwind CSS** for a consistent design system.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Sanity.io (Headless)
- **Styling:** Tailwind CSS, shadcn/ui
- **Language:** TypeScript
- **Data Source:** TMDB API
- **Deployment:** Vercel

## 💻 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone [https://github.com/your-username/best100movies.git](https://github.com/your-username/best100movies.git)