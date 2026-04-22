import { Locator, Page } from "playwright-core";
import { log } from "./Logs";

export default class Utils {

 static async click(locator: Locator, logMsg: string): Promise<void> {
    await locator.waitFor({ state: "visible" });
    await locator.click();
    log(logMsg);
  }
static async fill(locator: Locator, value: string, logMsg: string): Promise<void> {
    await locator.fill(value);
    log(logMsg);
  }

}