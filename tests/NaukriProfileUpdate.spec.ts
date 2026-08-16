import { test, expect, chromium } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import { log } from '../utils/Logs';

let loginPage: LoginPage;
let profilePage: ProfilePage;


test.describe("Naukri Profile Update", async () => {


  test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ storageState: 'storageState/naukri.json'});
    const page = await context.newPage();
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
     log(`${test.info().title} Test started.`);
       log(`${test.info().title} Test started. Navigating to login page.`);
      await loginPage.login(process.env.LINK_USERNAME!, process.env.LINK_PASSWORD!);
    await profilePage.clickViewProfile();
 })
   
 

 test.afterAll(async({})=>{
    log(`${test.info().title} Test completed. Closing the browser.`);


    
 })

  test("Resume Update", async ({  }) => {

await profilePage.updateResume();

  });
  test("Profile Heading Update", async ({  }) => {
await profilePage.updateProfileHeading();

  });
    test("Resume Heading Update", async ({ }) => {
await profilePage.updateResumeHeading();

  });

 });
