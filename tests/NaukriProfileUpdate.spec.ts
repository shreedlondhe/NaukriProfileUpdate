import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import { log } from '../utils/Logs';

let loginPage: LoginPage;
let profilePage: ProfilePage;

test.describe("Naukri Profile Update", async () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
     log(`${test.info().title} Test started.`);
       log(`${test.info().title} Test started. Navigating to login page.`);
      await loginPage.login('Shreedlondhe@gmail.com', 'Shree@6517');
    await profilePage.clickViewProfile();
 })
   
 

 test.afterEach(async({page})=>{
    log(`${test.info().title} Test completed. Closing the browser.`);


    
 })

  test("Resume Update", async ({ page }) => {

await profilePage.updateResume();

  });
  test("Profile Heading Update", async ({ page }) => {
await profilePage.updateProfileHeading();

  });
    test("Resume Heading Update", async ({ page }) => {
await profilePage.updateResumeHeading();

  });

 });