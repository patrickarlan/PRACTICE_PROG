const { chromium, expect } = require('playwright');
const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000/login';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('🚀 Starting Employee Flow E2E Test');
    
    // TC-EMP-01: Successful Login
    await page.goto(TARGET_URL);
    await page.getByPlaceholder('Email').fill('employee@hris.test');
    await page.getByPlaceholder('Password').fill('Password123!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Wait for navigation to dashboard
    await page.waitForURL(url => url.pathname.includes('/dashboard') || url.pathname.includes('/ar-dashboard'), { timeout: 15000 });
    console.log('✅ Login successful');

    // TC-EMP-03: Create & Submit AR
    await page.getByRole('link', { name: 'New AR' }).click();
    await page.waitForURL('**/ar-create', { timeout: 15000 });
    
    await page.getByPlaceholder('e.g. Daily Accomplishment Report').fill('E2E Test Report');
    
    // Fill first task row
    await page.getByPlaceholder('Project name...').first().fill('Test Project');
    await page.getByPlaceholder('What did you work on?').first().fill('Automating E2E tests with Playwright');
    
    // Set Start Time (9:00 AM)
    console.log('Setting Start Time...');
    await page.getByText('Select time').first().click();
    await page.locator('input').nth(34).fill('09'); 
    await page.locator('input').nth(37).fill('00');
    await page.getByRole('button', { name: 'AM' }).click();
    
    await page.getByPlaceholder('e.g. Daily Accomplishment Report').click();

    // Set End Time (5:00 PM)
    console.log('Setting End Time...');
    await page.getByText('Select time').first().click();
    await page.locator('input').nth(34).fill('05'); 
    await page.locator('input').nth(37).fill('00');
    await page.getByRole('button', { name: 'PM' }).click();
    
    await page.getByPlaceholder('e.g. Daily Accomplishment Report').click();

    console.log('Submitting Report...');
    await page.getByRole('button', { name: 'Submit Report' }).click();
    
    // Verify redirection to dashboard and presence of report
    await page.waitForURL('**/ar-dashboard', { timeout: 15000 });
    await expect(page.getByText('E2E Test Report')).toBeVisible();
    await expect(page.getByText('Pending')).toBeVisible();
    console.log('✅ Create & Submit AR successful');

    // TC-EMP-04: Edit Pending AR
    console.log('Editing Report...');
    await page.getByText('E2E Test Report').click(); 
    await page.waitForURL('**/ar-edit/**', { timeout: 15000 });
    await page.getByPlaceholder('e.g. Daily Accomplishment Report').fill('E2E Test Report - Updated');
    await page.getByRole('button', { name: 'Submit Report' }).click();
    
    await page.waitForURL('**/ar-dashboard', { timeout: 15000 });
    await expect(page.getByText('E2E Test Report - Updated')).toBeVisible();
    console.log('✅ Edit Pending AR successful');

    // TC-EMP-02: Logout
    console.log('Logging out...');
    await page.getByRole('button').filter({ hasText: /^e$/i }).click(); 
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForURL('**/login', { timeout: 15000 });
    console.log('✅ Logout successful');

  } catch (error) {
    console.error('❌ Test failed:', error);
    const timestamp = new Date().getTime();
    await page.screenshot({ path: 'employee_flow_error_' + timestamp + '.png' });
  } finally {
    await browser.close();
  }
})();
