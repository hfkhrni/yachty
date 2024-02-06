const { crawlPage } = require("./crawl");
const { sortPages } = require("./report");
async function main() {
  if (process.argv.length < 3) {
    console.log("no url provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("too many argumments provided");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  const pages = await crawlPage(baseURL, baseURL, {});
  //   for (const page of Object.entries(pages)) {
  //     console.log(page);
  //   }

  console.log(sortPages(pages));
}
main();
