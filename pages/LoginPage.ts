import { Page,Locator } from "@playwright/test";
import Utils from "../utils/utils";

export default  

class LoginPage {

    username:Locator;
    password:Locator;
    loginButton: Locator;
    charBotCrossIcon:Locator;
    viewProfile:Locator;
    
    constructor(private page: Page){
       this.viewProfile=page.locator(".view-profile-wrapper>a");
       this.username=page.locator('#usernameField');
       this.password=page.locator('#passwordField');
       this.loginButton=page.locator("//button[.='Login']");
       this.charBotCrossIcon=page.locator(".crossIcon chatBot chatBot-ic-cross");

    }

    async login(username: string, password: string){
      
        await this.page.goto(process.env.LINK_BASE_URL!);
            await this.page.waitForTimeout(9000);

        if(await this.viewProfile.isVisible({ timeout: 10000 })){
       console.log("Already logged in, skipping login step");
        }

      else{

        await Utils.fill(this.username, username, "Filled username field");
        await Utils.fill(this.password, password, "Filled password field");
        await Utils.click(this.loginButton, "Clicked on login button");
        await this.page.waitForNavigation({ waitUntil: 'networkidle' });
         await this.page.context().storageState({
        path: 'storageState/naukri.json'
    });
      }

        
          if(await this.charBotCrossIcon.isVisible()){
            await Utils.click(this.charBotCrossIcon, " ************ Found Cross Icon - Clicked on chatbot cross icon ************");
          }
        

    }

}