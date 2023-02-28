const {By, Key, Builder, until, wait} = require("selenium-webdriver")
require("chromedriver")
require('dotenv').config()
const assert = require('assert');

const TEST_HOST="http://localhost:3000"
//mocha --timeout 10000 test/home.test.js
// var driver = new Builder().forBrowser("chrome").build();
describe("Login Testing", () => {

  describe("Test 1: Check the Login Button", () => {
    it("Home Page Title Checking", async function () {
      let driver = await new Builder().forBrowser("chrome").build()
      try {
        await driver.get(TEST_HOST)
        // await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);
        //Verify the page title and print it
        var title = await driver.getTitle();
        console.log('Title is:', title);
        assert.equal(title, "UWGoDutch");
      } finally {
        await driver.quit();
      }
    })

    it("Check if login button exist", async () =>{
      let driver = await new Builder().forBrowser("chrome").build()
      try {
        await driver.get(TEST_HOST)
        assert.ok(driver.findElement(By.xpath("//input[@type='submit']")))
      }finally{
        driver.quit();
      }

    })
  })

  describe("Test 2: Test login with credencials", ()=> {
    it("email with wrong password", async ()=>{
      let driver = await new Builder().forBrowser("chrome").build()
      try {
        await driver.get(TEST_HOST)
        var email_input = await driver.findElement(By.name("email"))
        email_input.sendKeys("xiaoshuaigeng@gmail.com")
        
        // driver.sleep(5000)
        var passwd_input = await driver.findElement(By.name("password"))
        passwd_input.sendKeys("123333")

        await driver.findElement(By.name('login')).click()
        await driver.wait(until.alertIsPresent());

        const result = await driver.switchTo().alert().getText()
        assert.equal(result, "Invalid credentials")
      } finally{
        await driver.quit()
      }
    })
  })
})