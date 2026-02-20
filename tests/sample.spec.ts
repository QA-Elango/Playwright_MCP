import {test,chromium, expect} from  '@playwright/test';
import { createPublicKey } from 'node:crypto';


test("open browser",async() =>{
    const browser = await chromium.launch({headless:true});
	const page = await browser.newPage();
  await page.goto("https://google.com");
})

test("Concept - promises", async({page})=>{
 await page.goto("https://demo.automationtesting.in/Windows.html");
 const btn =page.getByRole("button",{name:'click'});
 const parrent = page;
console.log(await page.title());
 await expect.soft(parrent).toHaveTitle('Frames & windows');

 const [popup] = await Promise.all([

  page.waitForEvent('popup'),
 btn.click()

 ]);
  await popup.waitForLoadState();
  console.log(await popup.title());
  await  popup.close();
   await parrent.bringToFront();

   console.log("parent page " + await parrent.url());

   await parrent.locator('#footer').scrollIntoViewIfNeeded();

});

test("Dialog box",async({page})=>{
 
 await page.goto("https://demo.automationtesting.in/Windows.html")

 const dialogbox = page.waitForEvent('dialog');
 
await page.click("#triggeralert");

const dialog = await dialogbox;

console.log("alert message",dialog.message());

await dialog.accept();


})


test("open new browswe",async({page},testInfo)=>{
    // const browser = await chromium.launch();
    // const page = await browser.newPage();
    await page.goto("https://google.com");

const ss = await page.screenshot({path:'screenshot.png'});
await testInfo.attach('Screenshot',{body:ss,contentType:'image/png'})

    
}
)
    


