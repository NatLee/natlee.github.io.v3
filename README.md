# Nat Lee Portfolio | Financial Terminal

> natlee.github.io.v3

A high-performance, **Financial Terminal-themed** personal portfolio website. Built with **Next.js 14**, **React 18**, and **TypeScript**, this project simulates a professional trading interface, featuring real-time market simulations, interactive charts, and a "Bloomberg Terminal" aesthetic.

> "Investing in the future, one commit at a time."

## 📈 Market Features

- **💹 Simulated Trading Platform**: A fully interactive trading interface featuring dynamic candlestick charts, live price simulation (`NAT/USD`), and buy/sell functionality.
- **📊 Real-time Analytics**: "Market" statistics representing career growth, skills proficiency, and project metrics displayed as financial data.
- **🏢 Portfolio Dashboard**: Projects and experience presented as asset holdings and market movements.
- **⚡ High-Frequency UI**: Optimized performance with smooth transitions, glassmorphism effects, and responsive financial data visualizations.
- **🛠️ Modern Tech Stack**: Powered by the latest Next.js App Router for server-side rendering and static optimization.

## 🛠️ Technical Fundamentals

| Component | Specification |
|-----------|---------------|
| **Core** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion (animations) |
| **Icons** | Lucide React, React Icons |
| **Data Viz** | Recharts (Charts & Graphs) |
| **Deployment** | GitHub Pages (Static Export) |

## 🚀 IPO Sequence (Quick Start)

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/natlee/NatLee.github.io.git
    cd NatLee.github.io
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the trading desk (local server):**
    ```bash
    npm run dev
    ```

4.  **Access Terminal:**
    Open `http://localhost:3000` to view the dashboard.

## 📂 Market Structure

```
/
├── app/                  # Next.js App Router (Market Routes)
├── components/           # UI Components
│   ├── stock/            # Financial Terminal Specific Components
│   │   ├── SimulatedTradingSection.tsx
│   │   ├── MarketSummary.tsx
│   │   └── ...
│   └── ...
├── data/                 # Market Data (JSON files for content)
├── public/               # Assets
└── tailwind.config.js    # Styling Config
```

## 📜 Trading Scripts

```bash
# Development Mode
npm run dev          # Start local development server

# Production IPO
npm run build        # Compile application

# Static Export
npm run build:pages  # Export static site for GitHub Pages

# Deployment
npm run deploy       # Deploy to remote (GitHub Pages)

# Auditing
npm run lint         # Run code analysis
```

## 🔧 Deployment

This system is configured for automatic deployment via **GitHub Actions**.
Pushes to the `main` branch trigger a workflow that builds and deploys the static site to the `gh-pages` branch.

## 👤 Trader Profile

**Nat Lee**
b. Software Engineer // Full Stack Developer

Edit `assets/data/personal.json` to update user variables such as bio, contact info, and social links.

---
*Market data delayed by 15ms. Built with <3 and caffeine by Nat Lee*
