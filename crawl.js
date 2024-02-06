const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currURLObj = new URL(currURL);
  if (baseURLObj.hostname !== currURLObj.hostname) {
    console.log(`not same host: ${baseURLObj.hostname} vs ${currURLObj.hostname}`);
    return pages;
  }

  const normalizedCurrURL = normalizeURL(currURL);
  if (pages[normalizedCurrURL] > 0) {
    pages[normalizedCurrURL]++;
    return pages;
  }

  pages[normalizedCurrURL] = 1;

  console.log(`crawling ${currURL}`);

  try {
    const res = await fetch(currURL);
    if (!res.ok) {
      console.log(`err with fetch with status: ${res.status} on url: ${currURL}`);
      return pages;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`non html, content-type: ${contentType} on url: ${currURL}`);
      return pages;
    }
    const htmlBody = await res.text();

    const nextURLs = getURLSfromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`err with fetch: ${err.message}`);
  }

  return pages;
}

function getURLSfromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a").forEach((a) => {
    if (a.href.startsWith("/")) {
      try {
        const urlObj = new URL(`${baseURL}${a.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`err with relative: ${err.message}, link href: ${a.href}`);
      }
    } else {
      try {
        const urlObj = new URL(a.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`err with absolute: ${err.message}, link href: ${a.href}`);
      }
    }
  });
  return urls;
}

function normalizeURL(urlString) {
  if (typeof urlString !== "string") {
    throw new Error("url must be a string");
  }
  if (urlString === "") {
    throw new Error("enter a valid url");
  }
  const urlobj = new URL(urlString);
  const hostPath = `${urlobj.hostname}${urlobj.pathname}`;
  if (hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  }
  return `${urlobj.hostname}${urlobj.pathname}`;
}

module.exports = {
  normalizeURL,
  getURLSfromHTML,
  crawlPage,
};
