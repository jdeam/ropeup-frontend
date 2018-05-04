const users = require('./users.json');
const puppeteer = require('puppeteer');

const scrape = async (user) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.type('#email', user.email);
  await page.type('#password', 'test');
  await page.click('#login');
  await page.waitForNavigation();
  await page.waitFor(3000);
  await page.click('#logout');
  browser.close();
};

const loginAllUsers = async (users) => {
  let loggedInUsers = 0;
  for (let user of users) {
    await scrape(user);
    loggedInUsers++;
  }
  return loggedInUsers;
};

loginAllUsers(users).then(users => console.log(users));
