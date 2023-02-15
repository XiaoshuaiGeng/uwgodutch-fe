const {By, Key, Builder} = require("selenium-webdriver")
require("chromedriver")
const assert = require('assert');

// async function test_case1() {
//   var driver = await new Builder().forBrowser('chrome').build()

//   // await driver.get("https://www.google.com")
//   await driver.navigate().to('http://localhost:3000')

//   // await driver.findElement(By.name("q")).sendKeys('Hello World', Key.RETURN)

// }

// test_case1()

//https://www.geeksforgeeks.org/unit-testing-of-node-js-application/

describe("Home Page Testing ", () => {
  beforeAll(() => {
    console.log("Home Page Testing Started:");
  });

  afterAll(() => {
    console.log("Home Page Testing Started Finished");
  });

  describe("Test1 Check the Hompage Button", () => {
    beforeEach(() => {
      console.log("Checking the Hompage Button");
    });

    it("Home Page Title Checking", async function () {
      let driver = await new Builder().forBrowser("chrome").build();
      try {
        await driver.get("http://localhost:3000/");

        // await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

        //Verify the page title and print it
        var title = await driver.getTitle();
        console.log('Title is:', title);

        //It is always a safe practice to quit the browser after execution

        assert.equal(title, "UWGoDutch");
        await driver.findElement(By.id("link")).click();
        // var browserTabs = driver.getAllWindowHandles;            
        // driver.switchTo().window(browserTabs[1]);
        // title = await driver.getTitle();
        // assert.equal(title, "UWGoDutch2");
      } finally {
        await driver.quit();
      }
    });
  });
});