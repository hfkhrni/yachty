const { JSDOM } = require("jsdom");

async function crawlPage(currURL) {
  console.log(`crawling ${currURL}`);
  try {
    const res = await fetch(currURL);
    if (!res.ok) {
      console.log(`err with fetch with status: ${res.status} on url: ${currURL}`);
      return;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`non html, content-type: ${contentType} on url: ${currURL}`);
      return;
    }
    console.log(await res.text());
  } catch (err) {
    console.log(`err with fetch: ${err.message}`);
  }
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
        console.log("err with relative:", err.message);
      }
    } else {
      try {
        const urlObj = new URL(a.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log("err with absolute:", err.message);
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
