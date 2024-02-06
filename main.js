const { crawlPage } = require("./crawl");
function main() {
  if (process.argv.length < 3) {
    console.log("no url provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("too many argumments provided");
    process.exit(1);
  }
  console.log(crawlPage(process.argv[2]));
}
main();
