
## 1. Automation framework using Playwright + TypeScript for testing Automation Exercise website.
# Technologies Used
Playwright
TypeScript
Node.js

## 2. Folder Structure
# Project Structure
tests/
pages/
utils/
node_modules/
playwright.config.ts

## 3. Running Tests
# Run test:
npx playwright test

# Run test in headed mode:
npx playwright test --headed

# Run only one file for functional tests - headed (remove --headed for headless execution):
npx playwright test tests/homepage.spec.ts --headed

# Run only one file for functional tests
npx playwright test tests-api/productsList.spec.ts