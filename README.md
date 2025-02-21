# Playwright Page Object Model (POM) Framework

A test automation framework using Playwright with TypeScript, implementing the Page Object Model design pattern. This framework demonstrates automated end-to-end testing of a web application with login, search, cart, and checkout functionalities.

## Features

- Page Object Model implementation for better maintainability
- Data-driven testing using JSON test data
- Automated test steps for:
  - User login
  - Product search and view
  - Cart management 
  - Checkout process
  - Order confirmation

## Installation

```bash
# Install project dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Test Execution

```bash
# Run all tests in headless mode
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project chromium

# Run specific test file
npx playwright test example.spec.ts

# Debug mode
npx playwright test --debug

# View test report
npx playwright show-report

# Run tests in parallel
npx playwright test --workers 4
```

## Tools & Technologies
- Playwright
- TypeScript
- Node.js
