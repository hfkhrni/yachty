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
};
