# SolveJet - Sophisticated Engineering

SolveJet is a Next.js-based web application that showcases sophisticated engineering and cutting-edge technology, with a focus on security, PWA support, and modern UI/UX design.

## 🚀 Features

- **Progressive Web App (PWA) Support**: Offline functionality, installable on devices
- **Dark/Light Theme**: Sophisticated color palettes with automatic theme switching
- **Responsive Design**: Optimized for all device sizes
- **Strong Security**: Advanced middleware, JWT authentication, and encryption
- **SEO Optimized**: Dynamic sitemap generation and robots.txt
- **TypeScript**: Type-safe code with strict linting

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Jose](https://github.com/panva/jose) - JavaScript implementation of JSON Web Tokens
- [Joi](https://joi.dev/) - Schema validation
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [next-pwa](https://github.com/shadowwalker/next-pwa) - PWA plugin for Next.js

## 🏗️ Project Structure

```
solvejet/
├── public/               # Static assets
│   ├── icons/            # PWA icons
│   ├── images/           # Static images
│   ├── fonts/            # Web fonts
│   ├── screenshots/      # PWA screenshots
│   ├── manifest.json     # PWA manifest
│   └── sw.js             # Service worker
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── offline/      # Offline fallback page
│   │   ├── sitemap/      # User-facing sitemap
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   ├── sitemap.ts    # XML sitemap generator
│   │   └── robots.ts     # Robots.txt generator
│   ├── components/       # UI components
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand store
│   ├── utils/            # Utility functions
│   │   ├── apiSecurity.ts   # API security utilities
│   │   ├── auth.ts          # Authentication utilities
│   │   ├── encryption.ts    # Encryption utilities
│   │   └── validationSchemas.ts # Joi schemas
│   └── middleware.ts     # Next.js middleware
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8+
- pnpm 7+ (recommended)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/solvejet.git
   cd solvejet
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Create necessary folders

   ```bash
   # Run the script to create required folders
   bash create-folders.sh
   ```

4. Start the development server

   ```bash
   pnpm dev
   ```

5. Build for production

   ```bash
   pnpm build
   ```

6. Start production server
   ```bash
   pnpm start
   ```

## 🔐 Security Features

- **Secure Headers**: CSP, HSTS, and other security headers
- **JWT Authentication**: Secure token-based authentication
- **CSRF Protection**: Protection against cross-site request forgery
- **Encryption**: Data encryption using Jose
- **Rate Limiting**: Protection against brute force attacks
- **Role-Based Access Control**: Fine-grained access control

## 🎨 Color Palettes

### Dark Theme (Premium & Focused)

- **Primary Accent/Highlight:** `#3C86FF` (SolveJet Blue)
- **Primary Background:** `#2C2E35` (SolveJet Dark Grey)
- **Secondary Background/Surface:** `#343A40` (Slightly Lighter Dark Grey)
- **Primary Text:** `#F8F9FA` (Very Light Grey/Off-White)
- **Secondary Text/Subtle Elements:** `#ADB5BD` (Medium Grey)

### Light Theme (Complementary & Bright)

- **Primary Accent/Highlight:** `#0056FF` (SolveJet Blue)
- **Primary Background:** `#FFFFFF` (Pure White)
- **Secondary Background/Surface:** `#F8F9FA` (Very Light Grey/Off-White)
- **Primary Text:** `#212529` (Very Dark Grey/Near Black)
- **Secondary Text/Subtle Elements:** `#6C757D` (Medium Dark Grey)

## 📋 Sitemap Structure

- **Company**: About, Team, Careers, Press, Contact
- **Solutions**: Enterprise, Small Business, Startups, Custom Development, Integration
- **Products**: Analytics, Secure, Cloud, AI, Pricing
- **Resources**: Blog, Case Studies, Documentation, Knowledge Base, FAQ
- **Support**: Technical, Customer Service, Training, Status, Bug Reports
- **Legal**: Terms, Privacy, Cookies, Accessibility, Data Processing

## 📄 License

Copyright © 2025 SolveJet. All rights reserved.
