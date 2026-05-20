import { Locator, Page, Response } from "@playwright/test";
import Utils from "../utils/utils";
import { log } from "../utils/Logs";

export default  class ProfilePage {
filePath:string=`C:\\Users\\DELL\\Desktop\\resume\\SDET 6 yrs Immediate joiner.pdf`;
viewProfile:Locator;
Resumeheadline:Locator;
resumeHeadlineTxt:Locator;
saveButton:Locator; 
prfofileText:string=`Software Test Engineer with 6+ years of experience in Manual and Automation Testing. Expertise in building and maintaining automation frameworks using Selenium (Java/Python) and Playwright (JavaScript). Strong experience in API Automation Testing`

constructor(private page: Page){ 
    this.viewProfile=page.locator(".view-profile-wrapper>a");
    this.Resumeheadline=page.locator("//span[.='Resume headline']/following-sibling::span");
    this.resumeHeadlineTxt=page.locator("#resumeHeadlineTxt");
    this.saveButton=page.locator("//button[.='Save']");
}
async getRandomDots(): Promise<string> {
  const dots = [".", "..", "...","....", "....."];
  const randomIndex = Math.floor(Math.random() * dots.length);
  return dots[randomIndex];
}


async clickViewProfile(){
    await Utils.click(this.viewProfile, "Clicked on view profile link");
}
createAdvResumeListener() {
    return new Promise<{ status: number; body: any; url: string }>((resolve) => {

        const listener = async (response: Response) => {
            const responseUrl = Array.isArray(response.url()) ? response.url()[0] : response.url();
            if (
                responseUrl.includes('/resman-aggregator-services/') &&
                responseUrl.includes('/advResume') &&
                response.request().method() === 'POST' // or PUT (check actual)
            ) {
                const status = response.status();
                let body;

                try {
                    body = await response.json();
                } catch {
                    body = await response.text();
                }

                // Remove listener after capturing
                this.page.removeListener('response', listener);

                resolve({
                    status,
                    body,
                    url: responseUrl
                });
            }
        };

        this.page.on('response', listener);
    });
}

async updateResume(){
    log("Updating resume...");
     const apiPromise = this.createAdvResumeListener();
     const [fileChooser] = await Promise.all([
     this.page.waitForEvent('filechooser'),
        
     this.page.getByRole('button', { name: 'Update resume' }).click()
]);
     await fileChooser.setFiles(this.filePath);
     await this.page.waitForTimeout(10000);

      const { status, body, url } = await apiPromise;

   
    log("API Status: " + status);
    log("API Response: " + JSON.stringify(body));

    if (status === 200) {
        log("Adv Resume API success " );
    } else {
        log("Adv Resume API failed");
    }

    log("Resume updated successfully at time " + await this.timestamp());
}

async updateProfileHeading(){
    log("Updating profile heading...");
    await Utils.click(this.Resumeheadline, "Clicked on resume headline edit icon");
    await Utils.click(this.resumeHeadlineTxt, "Clicked on profile heading input field");
    await Utils.fill(this.resumeHeadlineTxt, this.prfofileText+await this.getRandomDots(), "Filled profile heading input field");
    await Utils.click(this.saveButton, "Clicked on save button");
    log("Profile heading updated successfully");
}
async timestamp(): Promise<string> {
    const now = new Date();

const formatted =
  now.getDate().toString().padStart(2, '0') + '-' +
  (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
  now.getFullYear() + ' ' +
  now.getHours().toString().padStart(2, '0') + ':' +
  now.getMinutes().toString().padStart(2, '0') + ':' +
  now.getSeconds().toString().padStart(2, '0');

return formatted;
}

}
