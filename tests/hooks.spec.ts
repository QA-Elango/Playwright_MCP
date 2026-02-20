import {test,chromium,expect, Locator} from '@playwright/test';
import { after, afterEach } from 'node:test';
import { parseEnv } from 'node:util';

test.beforeAll("Seting up the browser", async()=>{
    console.log("Testing setting up")
})
test.beforeEach("opening browser", async({page})=>{
     await page.goto("https://demo.automationtesting.in/Windows.html");
     console.log("page opened")
})

test("Getting the title and click event", async({page})=>{

 const title = await page.title();

  console.log(title);


} )

test("handling the multiple page", async({page})=>{

    const btn:Locator =  page.getByRole("button",{name:'Click'})
    
    const [popup]= await Promise.all([
        page.waitForEvent('popup'),
        btn.click()

    ]);

    console.log(await page.title());

})

test.afterEach("closing the popup window" , async()=>{

    console.log("TEst finished")
})

test.afterAll("clean up the data",async()=>{
    console.log("Completed")
})