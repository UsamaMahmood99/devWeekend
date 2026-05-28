# Tip Calculator & Bill Splitter

A modern and responsive React web application that calculates tips and splits bills between multiple people in real time.

Built using **React**, **TypeScript**, and **Vite** with automatic deployment using **GitHub Actions** and **GitHub Pages**.

---

## Live Demo

https://usamamahmood99.github.io/devWeekend/

---

# Features

* Real-time bill calculation
* Tip percentage preset buttons
* Custom tip percentage input
* Split bill among multiple people
* Instant UI updates without a calculate button
* Responsive design for mobile and desktop
* Clean and modern interface

---

# Tech Stack

* React
* TypeScript
* Vite
* CSS3
* GitHub Actions
* GitHub Pages

---

# Project Structure

```bash
tip-calculator/
├── public/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── assets/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
├── vite.config.ts
└── README.md
```

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/UsamaMahmood99/devWeekend.git
```

## Navigate to Project

```bash
cd devWeekend
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

---

# Build Project

```bash
npm run build
```

---

# Preview Production Build

```bash
npm run preview
```

---

# Deployment

This project uses GitHub Actions for automatic deployment to GitHub Pages.

Every push to the `main` branch automatically:

1. Installs dependencies
2. Builds the Vite project
3. Deploys the app to GitHub Pages

---

# GitHub Actions Workflow

Workflow file location:

```bash
.github/workflows/deploy.yml
```

---

# Vite Configuration for GitHub Pages

GitHub Pages requires a proper `base` configuration.

```ts
export default defineConfig({
  plugins: [react()],
  base: '/devWeekend/',
})
```

---

# Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| npm run dev     | Start development server |
| npm run build   | Build production app     |
| npm run preview | Preview production build |
| npm run deploy  | Deploy using gh-pages    |



# Author

Usama Mahmood

GitHub: https://github.com/UsamaMahmood99
