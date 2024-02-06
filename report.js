function sortPages(pages) {
  pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    return b[1] - a[1];
  });
  return pagesArr;
}

function printPages(pages) {
  console.log("======================");
  console.log("REPORT");
  console.log("======================");
  const sortedPages = sortPages(pages).forEach((arr) => {
    const url = arr[0];
    const count = arr[1];
    console.log(`found ${count} links to ${url}`);
  });
  console.log("======================");
  console.log("END REPORT");
  console.log("======================");
}

module.exports = {
  printPages,
};
