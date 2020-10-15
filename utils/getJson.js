const puppeteer = require("puppeteer");
const fs = require("fs");

const getData = async () => {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  const page = await browser.newPage();
  await page.goto("https://isw.umac.mo/wp/faces/news.jspx");
  await page.evaluate(() => {
    document.querySelector(
      "select#_id18-nb__xc_c option[value='all']"
    ).selected = true;
    document.querySelector("select#_id18-nb__xc_c").onchange();
  });
  await page.waitFor(3500);

  const tar = await page.evaluate(() => {
    const targets = document.querySelectorAll("td.x2n.x62");
    let ret = [];
    for (let i = 0; i < targets.length; i += 8) {
      // ret.push(targets[i].innerText.trim());
      let temp = {};
      temp["date"] = targets[i].innerText.trim();
      temp["time"] = targets[i + 1].innerText.trim();
      temp["activity"] = targets[i + 2].innerText.trim();
      temp["organizer"] = targets[i + 3].innerText.trim();
      temp["venue"] = targets[i + 4].innerText.trim();
      temp["wpArea"] = targets[i + 5].innerText.trim();
      temp["CS"] = targets[i + 6].innerText.trim();
      temp["link"] = targets[i + 7].innerText.trim();
      ret.push(temp);
    }
    return ret;
  });

  let real_tar = { collection: tar };

  // fs.writeFile("test.json", , (err) => {
  //   if (err) throw err;
  //   console.log("done");
  // });
  await browser.close();
  return real_tar;
};

exports.getData = getData;
