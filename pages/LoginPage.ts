import { Page,Locator } from "@playwright/test";
import Utils from "../utils/utils";

export default  

class LoginPage {

    username:Locator;
    password:Locator;
    loginButton: Locator;
    
    constructor(private page: Page){
       this.username=page.locator('#usernameField');
       this.password=page.locator('#passwordField');
       this.loginButton=page.locator("//button[.='Login']");

    }

    async login(username: string, password: string){
        await this.page.goto(process.env.LINK_BASE_URL!);
        await Utils.fill(this.username, username, "Filled username field");
        await Utils.fill(this.password, password, "Filled password field");
        await Utils.click(this.loginButton, "Clicked on login button");

    }

}