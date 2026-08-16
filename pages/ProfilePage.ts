import { Locator, Page, Response } from "@playwright/test";
import Utils from "../utils/utils";
import { log } from "../utils/Logs";

export default  class ProfilePage {
//filePath:string=`C:\\Users\\DELL\\Desktop\\resume\\SDET 6 yrs Immediate joiner.pdf`;
viewProfile:Locator;
Resumeheadline:Locator;
resumeHeadlineTxt:Locator;
saveButton:Locator; 
//ResumeText:string=`Dynamic Senior Test Engineer specializing in Selenium, Playwright, and API Testing, with proven expertise in automation frameworks, database validation, and CI/CD integration, committed to enhancing software quality and testing efficiency`
editProfileButton:Locator;
profileHeadlineTxt:Locator;
//profileText=`Results-driven Software Test Engineer with over 6.6+ years of comprehensive experience in Manual and Automation Testing, specializing in developing robust automation frameworks using Selenium and Playwright with AI. Currently serving as a Senior Test Engineer at Xoriant Solutions, I have demonstrated proficiency in executing complex testing scenarios, including API, UI, and database testing, while enhancing test efficiency through innovative script generation tools like Agentic AI. I possess a strong track record in optimizing regression suites, significantly reducing testing effort, and integrating automation into CI/CD pipelines with Jenkins in Agile environments. My technical acumen includes expertise in TypeScript, Postman, and AWS, coupled with a solid foundation in civil engineering, making me adept at maintaining high-quality standards in software delivery.`
crossIconAfterProfileUpdate:Locator;
constructor(private page: Page){ 
    this.viewProfile=page.locator(".view-profile-wrapper>a");
    this.Resumeheadline=page.locator("//span[.='Resume headline']/following-sibling::span");
    this.resumeHeadlineTxt=page.locator("#resumeHeadlineTxt");
    this.saveButton=page.locator("//button[.='Save']");
    this.editProfileButton=page.locator("//span[.='Profile summary']/following-sibling::span[@class='edit icon']");
    this.profileHeadlineTxt=page.locator("#profileSummaryTxt");
    this.crossIconAfterProfileUpdate=page.locator("//div[@class='profile-updated-container phase-3']/preceding-sibling::div/span");

    
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
     await fileChooser.setFiles(process.env.LINK_RESUME_PATH!);
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
     log("Updating resume heading...");
   
   for (let i = 0; i < 5; i++) {
    await this.page.keyboard.press('PageDown');
    await this.page.waitForTimeout(1000);
}
   await Utils.click(this.editProfileButton,"Clicked on Profile headline edit icon")
    await Utils.click(this.profileHeadlineTxt, "Clicked on view profile link");
    await Utils.fill(this.profileHeadlineTxt,process.env.LINK_PROFILE_TEXT+await this.getRandomDots(),"Fiiled profile text")
     await Utils.click(this.saveButton, "Clicked on save button");
    await Utils.click(this.crossIconAfterProfileUpdate, "Clicked on cross icon after profile update");
    log("Profile heading updated successfully "+ await this.timestamp());
}

async updateResumeHeading(){
    log("Updating resume heading...");
    await Utils.click(this.Resumeheadline, "Clicked on resume headline edit icon");
    await Utils.click(this.resumeHeadlineTxt, "Clicked on profile heading input field");
    await Utils.fill(this.resumeHeadlineTxt, process.env.LINK_RESUNE_TEXT+await this.getRandomDots(), "Filled Resume heading input field");
    await Utils.click(this.saveButton, "Clicked on save button");
 
    log("Resume heading updated successfully "+ await this.timestamp());
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
