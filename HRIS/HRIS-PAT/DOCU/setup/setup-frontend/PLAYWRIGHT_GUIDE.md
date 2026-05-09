# Playwright E2E Testing Guide

## Overview
This guide covers how to run the automated end-to-end tests for the HRIS Accomplishment Report (AR) workflow.

## Prerequisites
1. **Node.js**: Ensure Node.js is installed.
2. **Dependencies**: Install Playwright in the root or `hris` directory.
   ```bash
   npm install -D @playwright/test
   npx playwright install chromium
   ```
3. **Services**: 
   - Backend must be running on `http://localhost:5107`.
   - Frontend must be running on `http://localhost:5173`.

## Running the Tests

### Main E2E Lifecycle
The primary test script is located at `C:\Users\User\.gemini\tmp\hris\playwright-test-e2e-v10.js`. This script validates:
- Employee login.
- AR creation with valid DTO mapping (`taskName`, `client`).
- TimePicker interaction (state sync).
- Admin approval via Shadcn dialogs.

**Command:**
```bash
node C:\Users\User\.gemini\tmp\hris\playwright-test-e2e-v10.js
```

## Troubleshooting
- **Timeouts**: If the test fails on `TimePicker`, ensure the script is clicking the `ChevronUp` icons to trigger the UI state change, as raw text input does not update the parent React state.
- **Dialogs**: Admin approval uses `[role="dialog"]`. Ensure locators target buttons inside this scope.
- **Data Integrity**: Verify `particulars` is mapped if backend schema requires it.
