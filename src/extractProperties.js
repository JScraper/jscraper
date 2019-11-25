export async function extractProperties(selector, properties, page) {
  const results = await page.evaluate((selector, properties) => {
    const elements = Array.from(document.querySelectorAll(selector));
    return elements.map(element => {
      const result = {};
      for (let propertyKey in properties) {
        const propertyValue = properties[propertyKey];
        switch (propertyValue.type) {
          case "title": {
            result[propertyKey] = element.querySelector(propertyValue.selector).title;
            break;
          }
          case "href": {
            result[propertyKey] = element.querySelector(propertyValue.selector).href;
            break;
          }
          case "text": {
            result[propertyKey] = element.querySelector(propertyValue.selector).textContent;
            break;
          }
          case "src": {
            result[propertyKey] = element.querySelector(propertyValue.selector).src;
            break;
          }
          case "background-image": {
            result[propertyKey] = element.querySelector(propertyValue.selector)
              .style["background-image"].match(/url\("(.*?)"\)/)[1];
          }
        }
      }
      return result;
      //   return {
      //     name: ,
      //     url: ,
      //     user: element.querySelector(itemUser).textContent,
      //     img: element.querySelector(itemImage).src,
      //     // tags: element.querySelector(itemTags).textContent,
      //   };
    });
  }, selector, properties); // pass here any variables you need to access in the evaluate function
  return results;
}
