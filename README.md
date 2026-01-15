# 📚 BookWorm - Your Ultimate Digital Library

BookWorm is a modern, high-performance web application designed for book enthusiasts to discover tutorials, manage categories, and read/write book reviews. Built with the Power of **Next.js 15**, **Tailwind CSS**, and **Material UI**.

## ✨ Key Features

- **Learning Hub:** Access handpicked video tutorials and educational content.
- **Review System:** Users can submit reviews, and authors can approve or delete them.
- **Category Management:** Organize your library by creating and managing book categories.
- **Full-Text Search:** Quickly find tutorials and reviews using the integrated search system.
- **Server-Side Pagination:** Smooth data handling for large libraries and review lists.
- **Modern UI:** A beautiful, responsive "Midnight & Gold" aesthetic using MUI and Tailwind.

---

### Live Site Link

- [https://mrirakib-ph-associate-instructor-task-web.vercel.app/](https://mrirakib-ph-associate-instructor-task-web.vercel.app/)

### Client Repository

- [https://github.com/mrirakib04/ph-associate-instructor-task-web](https://github.com/mrirakib04/ph-associate-instructor-task-web)

### Server Repository

- [https://github.com/mrirakib04/ph-associate-instructor-task-server](https://github.com/mrirakib04/ph-associate-instructor-task-server)

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), React, Tailwind CSS.
- **UI Components:** [Material UI (MUI)](https://mui.com/), React Icons.
- **Authentication:** [NextAuth.js](https://next-auth.js.org/).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **Notifications:** React-Toastify & SweetAlert2.

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18.x or later recommended).

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/your-username/bookworm-web.git](https://github.com/your-username/bookworm-web.git)
```

2. Install dependencies:

```bash
npm install
# or
yarn install

```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your credentials (NextAuth secrets, API URLs, etc.).

### Running the Development Server

```bash
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 📖 Project Structure

- `/app`: Contains the Next.js App Router pages and layouts.
- `/components`: Reusable UI components (Navbar, Footer, Loading states).
- `/public`: Static assets like images and icons.
- `/styles`: Global CSS and Tailwind configurations.

## 🌐 Deployment

The easiest way to deploy BookWorm is via the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Configure your Environment Variables in the Vercel dashboard.
4. Hit **Deploy**.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
