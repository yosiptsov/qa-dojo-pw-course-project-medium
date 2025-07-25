# qa-dojo-pw-course-project-medium
Playwright + Typescript course project. Difficulty: medium

# Specifications
✌️ Easy: https://docs.google.com/document/d/1ahvP-Y9n6nMdMzMs-F0l0yunpTjYoXMpdEYb86F0638/edit?usp=sharing

🤝Medium: https://docs.google.com/document/d/139Wn6zI_ZoXyucKacznWs-ZiDtRJJA_XKRoDKZrgaDU/edit?usp=sharing

---
# Zara E-commerce Test Automation

This project contains automated tests for Zara's e-commerce website using Playwright with TypeScript.

## 🎯 Key Features

- Page Object Model (POM) implementation
- Component-based architecture 
- Stealth browser configuration to avoid bot detection
- Custom test fixtures
- Parallel test execution
- Configurable test environments
- GitHub Actions CI/CD integration

## 🛠️ Tech Stack

- Playwright
- TypeScript
- playwright-extra with stealth plugin
- Node.js

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yosiptsov/qa-dojo-pw-course-project-medium.git

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🧪 Running Tests

```bash
# Run all tests in headless mode
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests with trace
npx playwright test --trace on
```

## 📁 Project Structure

```
├── apps/
│   └── ui/
│       ├── components/    # Reusable UI components
│       └── pages/        # Page Object Models
├── tests/
│   ├── fixtures/        # Test fixtures
│   └── *.test.ts       # Test files
├── playwright.config.ts  # Playwright configuration
└── package.json
```

## 🔄 CI/CD

The project uses GitHub Actions for continuous integration. The workflow:
- Runs on Ubuntu latest
- Supports multiple browser configurations
- Generates and stores test reports as artifacts

## 📄 Test Specifications

- [Easy Level Specs](https://docs.google.com/document/d/1ahvP-Y9n6nMdMzMs-F0l0yunpTjYoXMpdEYb86F0638/edit?usp=sharing)
- [Medium Level Specs](https://docs.google.com/document/d/139Wn6zI_ZoXyucKacznWs-ZiDtRJJA_XKRoDKZrgaDU/edit?usp=sharing)

## 👤 Author

Yurii Osiptsov