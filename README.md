# DSLN Calculator

> Modern Desktop Calculator for Ubuntu Linux with Fluent Design, inspired by Windows 11 Calculator.

Developed with **Tauri 2**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Math.js**.

---

## 🌟 Key Features

- **Fluent Design UI**: Acrylic-inspired surfaces, smooth micro-interactions, responsive layout tailored for Ubuntu GNOME (Wayland / X11).
- **Standard Calculator (P0)**:
  - Basic arithmetic (+, −, ×, ÷)
  - Operator precedence & parentheses
  - Repeated equals behavior
  - Windows 11 percentage calculation (`1,000,000 + 25% = 1,250,000`)
  - Reciprocal ($1/x$), Square ($x^2$), Square root ($\sqrt{x}$)
  - Live result preview & thousand separator formatting
  - Comprehensive error handling (*Cannot divide by zero*, overflow)
- **Scientific Calculator (P0)**:
  - Trigonometry: $\sin, \cos, \tan, \sin^{-1}, \cos^{-1}, \tan^{-1}$
  - Angle Modes: **DEG**, **RAD**, **GRAD**
  - Logarithms: $\log_{10}, \ln, \log_2$
  - Exponentials & Powers: $x^2, x^3, x^y, 10^x, e^x$
  - Factorial ($n!$), Absolute value ($|x|$), Modulo ($\text{mod}$), $\pi$, $e$
- **Memory Management (P0)**:
  - Full memory suite: **MC**, **MR**, **M+**, **M-**, **MS** with active stored memory indicator.
- **Persistent Calculation History (P0)**:
  - Local-first persistence
  - Live search and filtering
  - Star / Favorite calculations
  - One-click copy and reuse expression
- **Keyboard Shortcuts (P0)**:
  - Full numpad and keyboard operation (0–9, `+`, `-`, `*`, `/`, `Enter`, `=`, `Backspace`, `Esc`, `Del`, `Ctrl+C`, `Ctrl+V`, `Ctrl+H`, `Ctrl+,`)
- **Settings & Theming**:
  - Dark Mode, Light Mode, System Theme
  - Custom Accent Color picker
  - Configurable decimal precision & thousands separator
  - Offline-first architecture

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Rust & Cargo (for desktop packaging with Tauri)

### Development

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Run unit tests
npm test

# Build frontend production bundle
npm run build
```

---

## 🧪 Testing

Run automated unit and integration tests:

```bash
npm test
```

---

## 📦 Packaging (Ubuntu Linux)

```bash
# Build .deb and .AppImage packages
npm run tauri build
```
