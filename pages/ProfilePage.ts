import { Locator, Page } from "@playwright/test";
import Utils from "../utils/utils";
import { log } from "../utils/Logs";

export default  class ProfilePage {

viewProfile:Locator;
Resumeheadline:Locator;
resumeHeadlineTxt:Locator;
saveButton:Locator; 
prfofileText:string=`Software Test Engineer having 6+ years of experience in Manual Testing, Automation Testing 
Selenium with Java/Python-TestNG/Robot/Pytest, Cucumber Database SQL/MongoDBTesting,API/Automation Testing.`

constructor(private page: Page){ 
    this.viewProfile=page.locator(".view-profile-wrapper>a");
    this.Resumeheadline=page.locator("//span[.='Resume headline']/following-sibling::span");
    this.resumeHeadlineTxt=page.locator("#resumeHeadlineTxt");
    this.saveButton=page.locator("//button[.='Save']");
}

async clickViewProfile(){
    await Utils.click(this.viewProfile, "Clicked on view profile link");
}

async updateResume(){
    log("Updating resume...");
     const [fileChooser] = await Promise.all([
     this.page.waitForEvent('filechooser'),
        
     this.page.getByRole('button', { name: 'Update resume' }).click()
]);
     await fileChooser.setFiles(`C:\\Users\\DELL\\Desktop\\resume\\SDET 6 yrs Immediate joiner.pdf`);
    log("Resume updated successfully");
}

async updateProfileHeading(){
    log("Updating profile heading...");
    await Utils.click(this.Resumeheadline, "Clicked on resume headline edit icon");
    await Utils.click(this.resumeHeadlineTxt, "Clicked on profile heading input field");
    await Utils.fill(this.resumeHeadlineTxt, this.prfofileText, "Filled profile heading input field");
    await Utils.click(this.saveButton, "Clicked on save button");
    log("Profile heading updated successfully");
}
}