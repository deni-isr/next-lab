# Next Labs 
linkki: https://next-lab-red.vercel.app/

## Features

* **Secure Authentication**: JWT-based login system using HTTP-only cookies and `bcryptjs` for password hashing.
* **Media Management**: 
    * Upload images and videos to the Metropolia media server.
    * Metadata storage in a local MariaDB/MySQL database.
    * Ability to delete your own posts.
* **Infinite Scroll**: Optimized home feed that loads content dynamically as the user scrolls, using `react-intersection-observer`.
* **Tagging System**: Add and display custom tags for media items.
* **Responsive Design**: Built with **Tailwind CSS v4** for a clean, modern look on all devices.
* **Optimized Performance**: Uses `next/image` for automatic image optimization and dynamic routing for single item pages.

---

## Tech Stack

* **Framework**: Next.js 15
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4
* **Database**: MySQL / MariaDB
* **Authentication**: JSON Web Tokens (JWT)
* **External API**: Metropolia Media Server

---

## Setup Instructions

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add your credentials (see `.env.example` for reference).

3.  **Run in Development Mode**:
    ```bash
    npm run dev
    ```

4.  **Build for Production**:
    ```bash
    npm run build
    npm run start
    ```
