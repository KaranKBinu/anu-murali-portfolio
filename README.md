# Anu Murali — Portfolio Website

A professional, animated portfolio website for **Anu Murali** — Data Science & AI/ML Engineer.

🌐 **Live:** [View on Vercel](#) *(update after deployment)*

---

## ✨ Features

- **Three.js** neural network background with 180 animated particles
- **3D rotating data globe** in the About section
- **Framer Motion** scroll-triggered animations throughout
- **Glassmorphism** design with dark navy/cyan/violet palette
- **Tabbed skills** section with animated progress bars
- **3D tilt** effect on project cards
- Fully **responsive** for all screen sizes

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework (App Router) |
| Three.js + @react-three/fiber | 3D scenes and animations |
| @react-three/drei | Three.js helpers |
| Framer Motion | Scroll & UI animations |
| Lucide React | Icons |
| CSS Modules | Scoped styling |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # Design system (tokens, glassmorphism)
│   ├── layout.tsx        # Root layout + SEO metadata
│   └── page.tsx          # Main single-page entry
└── components/
    ├── ThreeBackground   # Neural network Three.js canvas
    ├── Navbar            # Sticky glassmorphism nav
    ├── HeroSection       # Full-screen hero with animations
    ├── AboutSection      # 3D globe + bio + traits
    ├── EducationSection  # Animated timeline
    ├── SkillsSection     # Tabbed skills + progress bars
    ├── ProjectsSection   # Tilt glass project cards
    └── ContactSection    # Contact form + socials
```

## 🌐 Deploying to Vercel

This project is pre-configured for Vercel via `vercel.json`.

**Via Vercel Dashboard (recommended):**
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import the GitHub repo
4. Click Deploy — Vercel auto-detects Next.js

**Via Vercel CLI:**
```bash
npm i -g vercel
vercel
```

---

Built with ❤️ by Anu Murali
