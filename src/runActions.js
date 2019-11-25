// import {extractProperties} from './extractProperties';
export async function runActions(url, actions, params, browser) {
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 1000000 });
  for (let action of actions) {
    console.log(action);
    switch (action.type) {
      case "click": {
        await page.waitForSelector(action.selector);
        await page.click(action.selector);
        break;
      }
      case "type": {
        let value = action.value;
        if (typeof (action.value) === "function") {
          value = action.value(params);
        }
        await page.type(action.selector, value);
        break;
      }
      case "press": {
        await page.keyboard.press(action.value);
        break;
      }
      case "waitForSelector": {
        await page.waitForSelector(action.selector);
        break;
      }
      case "waitFor": {
        await page.waitFor(action.value);
        break;
      }
    }
  }
  return page;
}
