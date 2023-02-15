const {By, Key, Builder} = require("selenium-webdriver")
require("chromedriver")

async function test_case1() {
  var driver = await new Builder().forBrowser('chrome').build()

  // await driver.get("https://www.google.com")
  await driver.navigate().to('http://localhost:3000')

  // await driver.findElement(By.name("q")).sendKeys('Hello World', Key.RETURN)

}

test_case1()