

import { test, expect } from '@playwright/test';

test.use({
  storageState: 'storageState/linkedin.json',
});


test('LinkedIn Home Page 1', async ({ page }) => {
    test.setTimeout(90000); // Set timeout to 60 seconds
  await page.goto('https://www.linkedin.com/');
  await expect(page).toHaveURL(/linkedin.com/);
  await page.waitForTimeout(5000)
  await page.locator("(//span[.='My Network'])[2]").click();
  await page.waitForTimeout(5000)
let people=await page.locator("//*[contains(@aria-label, 'to connect')]").all()
console.log("Total People to Connect : "+people.length)
for(let i = 1; i < people.length; i++){  
    try{
let person=await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]/../../../a/div/div[2]/div/p[@class='_8d59a5a1 _67dbe9ff acc6e906 a87ae09c _68cdf563 a5b50dc1 _2db943b8 dfa8563b ea9c4e7e']/span`).textContent();

await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]`).click();
await page.waitForTimeout(1000)
console.log( i+" : "+person+" Request Sent")
}
catch(e){
    console.log("Error in sending request to "+i+" : "+e)   
}
}
});

test('LinkedIn Home Page 2', async ({ page }) => {
    test.setTimeout(90000); // Set timeout to 60 seconds
  await page.goto('https://www.linkedin.com/');
  await expect(page).toHaveURL(/linkedin.com/);
  await page.waitForTimeout(5000)
  await page.locator("(//span[.='My Network'])[2]").click();
  await page.waitForTimeout(5000)
let people=await page.locator("//*[contains(@aria-label, 'to connect')]").all()
console.log("Total People to Connect : "+people.length)
for(let i = 1; i < people.length; i++){  
    try{
let person=await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]/../../../a/div/div[2]/div/p[@class='_8d59a5a1 _67dbe9ff acc6e906 a87ae09c _68cdf563 a5b50dc1 _2db943b8 dfa8563b ea9c4e7e']/span`).textContent();

await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]`).click();
await page.waitForTimeout(1000)
console.log( i+" : "+person+" Request Sent")
}
catch(e){
    console.log("Error in sending request to "+i+" : "+e)   
}
}
});

test('LinkedIn Home Page 3', async ({ page }) => {
    test.setTimeout(90000); // Set timeout to 60 seconds
  await page.goto('https://www.linkedin.com/');
  await expect(page).toHaveURL(/linkedin.com/);
  await page.waitForTimeout(5000)
  await page.locator("(//span[.='My Network'])[2]").click();
  await page.waitForTimeout(5000)
let people=await page.locator("//*[contains(@aria-label, 'to connect')]").all()
console.log("Total People to Connect : "+people.length)
for(let i = 1; i < people.length; i++){  
    try{
let person=await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]/../../../a/div/div[2]/div/p[@class='_8d59a5a1 _67dbe9ff acc6e906 a87ae09c _68cdf563 a5b50dc1 _2db943b8 dfa8563b ea9c4e7e']/span`).textContent();

await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]`).click();
await page.waitForTimeout(1000)
console.log( i+" : "+person+" Request Sent")
}
catch(e){
    console.log("Error in sending request to "+i+" : "+e)   
}
}
});

test('LinkedIn Home Page 4', async ({ page }) => {
    test.setTimeout(90000); // Set timeout to 60 seconds
  await page.goto('https://www.linkedin.com/');
  await expect(page).toHaveURL(/linkedin.com/);
  await page.waitForTimeout(5000)
  await page.locator("(//span[.='My Network'])[2]").click();
  await page.waitForTimeout(5000)
let people=await page.locator("//*[contains(@aria-label, 'to connect')]").all()
console.log("Total People to Connect : "+people.length)
for(let i = 1; i < people.length; i++){  
    try{
let person=await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]/../../../a/div/div[2]/div/p[@class='_8d59a5a1 _67dbe9ff acc6e906 a87ae09c _68cdf563 a5b50dc1 _2db943b8 dfa8563b ea9c4e7e']/span`).textContent();

await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]`).click();
await page.waitForTimeout(1000)
console.log( i+" : "+person+" Request Sent")
}
catch(e){
    console.log("Error in sending request to "+i+" : "+e)   
}
}
});

test('LinkedIn Home Page 5', async ({ page }) => {
    test.setTimeout(90000); // Set timeout to 60 seconds
  await page.goto('https://www.linkedin.com/');
  await expect(page).toHaveURL(/linkedin.com/);
  await page.waitForTimeout(5000)
  await page.locator("(//span[.='My Network'])[2]").click();
  await page.waitForTimeout(5000)
let people=await page.locator("//*[contains(@aria-label, 'to connect')]").all()
console.log("Total People to Connect : "+people.length)
for(let i = 1; i < people.length; i++){  
    try{
let person=await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]/../../../a/div/div[2]/div/p[@class='_8d59a5a1 _67dbe9ff acc6e906 a87ae09c _68cdf563 a5b50dc1 _2db943b8 dfa8563b ea9c4e7e']/span`).textContent();

await page.locator(`(//*[contains(@aria-label, 'to connect')])[${i}]`).click();
await page.waitForTimeout(1000)
console.log( i+" : "+person+" Request Sent")
}
catch(e){
    console.log("Error in sending request to "+i+" : "+e)   
}
}
});














// test('test', async ({ page }) => {
//   await page.goto('https://www.linkedin.com/login/');
//   await page.getByRole('textbox', { name: 'Email or phone' }).fill('shrnvslndh@gmail.com');
//   await page.getByRole('textbox', { name: 'Password' }).fill('-------');
//   await page.getByRole('button', { name: 'Sign in', exact: true }).click();
//   //await page.getByRole('link', { name: 'My Network, 1 new notification' }).click();
//   await page.waitForTimeout(5000)
//  await page.context().storageState({
//         path: 'storageState/linkedin.json'
//     });

// });