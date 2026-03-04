[![Natalia aka kolonatalie — Creative Developer](src/assets/images/demo-developer-portfolio-kolonatalie.gif)](https://kolonatalie.vercel.app)


# Creative Developer Portfolio — [Live Demo](https://kolonatalie.vercel.app)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kolonatalie_portfolio&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kolonatalie_portfolio)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=kolonatalie_portfolio&metric=bugs)](https://sonarcloud.io/summary/new_code?id=kolonatalie_portfolio)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=kolonatalie_portfolio&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=kolonatalie_portfolio)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.dot.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Sass (SCSS)](https://img.shields.io/badge/Sass(SCSS)-hotpink?style=for-the-badge&logo=sass&logoColor=white)

A high-performance, motion-driven portfolio platform engineered with **React 18**, **TypeScript**, and **GSAP**. 97 Performance score on PageSpeed Insights.

> *Successfully migrated from a Vanilla JS implementation to a robust React + TypeScript architecture to improve scalability and maintainability.*  

## Key Highlights (2026 Update)

* Developed a custom `useScrollReveal` hook using **GSAP ScrollTrigger**, featuring a data-driven system for staggered reveals and complex motion paths.
* Custom-built "Magnetic" components, high-end "Back to Top" navigation with **Lenis Smooth Scroll**, and developed custom `useSound` hook
* Scalable **SASS Modules (7-1 pattern)** with a centralized design system using CSS Variables.
* **Strict TypeScript** implementation across all components, hooks, and GSAP animation targets for **maximum maintainability**.
* **GPU-Accelerated Motion.** Optimized animation layers using `will-change` and `contain` properties, ensuring a steady 60fps even with complex GSAP timelines.
* Optimized asset delivery achieving a **97 Performance score** on PageSpeed Insights. [Full report](https://pagespeed.web.dev/analysis/https-kolonatalie-vercel-app/3e0yb32bso?form_factor=mobile)

![PageSpeed Insights Score](/src/assets/images/pageSpeed-score.webp)

## Project Structure

```text
src/
├── assets/      # Optimized assets (WebP images, audio, fonts)
├── components/  # Atomic UI (Buttons, Icons) & Layout (Header, Footer)
├── data/        # Centralized project & experience metadata
├── hooks/       # Custom engines: useScrollReveal, useSound, useFormValidation
├── pages/       # Main page, blog page, links page, now page, 404.
├── styles/      # Global SCSS (Sass 7-1: variables, mixins, reset)
└── utils/       # Math helpers & animation constants
````
## Tech Stack

* Core:  **React 18 • TypeScript 5 • Vite**
* Motion: **GSAP 3 • @gsap/react • ScrollTrigger • Lenis (Smooth Scroll)**
* Styles: **SASS Modules • HSL • PostCSS**
* Quality:  **ESLint 9 • Stylelint • Husky**


## Installation
```Bash
# Clone the repository
git clone https://github.com/kolonatalie/portfolio

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```
> ***Note:** `--legacy-peer-deps` is required for ESLint 9 compatibility with some plugins.*


## Available Scripts
|  |  |
| :--- | :--- |
|`npm run dev`| Starts Vite dev server at `http://localhost:3000` |
|`npm run build`| Runs Type-check (`tsc`) and builds the project with Vendor Splitting (React, GSAP into separate chunks).|
|`npm run preview`| Locally previews the production build|
|`npm run lint`| Audits JS/TS and SCSS for errors.|
|`npm run lint:fix` | Automatically fixes linting and styling issues.|

---

## Connect with Me

I'm always open to discussing creative technology, motion design, or potential collaborations.

[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-563D6F?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kolonatalie/)
[![X Badge](https://img.shields.io/badge/X-8A62B3?style=for-the-badge&logo=x&logoColor=white)](https://x.com/dev_kolonatalie)
[![Bluesky Badge](https://img.shields.io/badge/Bluesky-A575D4?style=for-the-badge&logo=bluesky&logoColor=white)](https://bsky.app/profile/kolonatalie.bsky.social)
[![Mastodon Badge](https://img.shields.io/badge/Mastodon-704F91?style=for-the-badge&logo=mastodon&logoColor=white)](https://mastodon.social/@kolonatalie)
[![GitHub Badge](https://img.shields.io/badge/GitHub-3D2B4F?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kolonatalie)


## Note  
This portfolio is a living lab where I experiment with advanced GSAP techniques, Three.js, and shaders. It evolves as I push the boundaries of what's possible on the web.

![Natalia aka kolonatalie — Creative Developer and Front-End engineer](src/assets/images/kolonatalie-creative-developer-frontend-engineer.webp)
