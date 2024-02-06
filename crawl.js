const { JSDOM } = require("jsdom");

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
};
