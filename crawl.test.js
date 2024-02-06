const { normalizeURL, getURLSfromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip", () => {
  const input = "https://www.youtube.com/watch";
  const actual = normalizeURL(input);
  const expected = "www.youtube.com/watch";
  expect(actual).toEqual(expected);
});

test("normalizeURL trailing slash", () => {
  const input = "https://www.youtube.com/watch/";
  const actual = normalizeURL(input);
  const expected = "www.youtube.com/watch";
  expect(actual).toEqual(expected);
});

test("normalizeURL capital", () => {
  const input = "https://www.YOUTUBE.com/watch/";
  const actual = normalizeURL(input);
  const expected = "www.youtube.com/watch";
  expect(actual).toEqual(expected);
});

test("getURLSfromHTML absolute", () => {
  const inputHTML = `
<html>
    <body>
        <a href="https://www.youtube.com/watch/">yt</a>
    </body>
<html>`;
  const inputBaseURL = "https://www.youtube.com/watch";
  const actual = getURLSfromHTML(inputHTML, inputBaseURL);
  const expected = ["https://www.youtube.com/watch/"];
  expect(actual).toEqual(expected);
});

test("getURLSfromHTML relative", () => {
  const inputHTML = `
  <html>
      <body>
          <a href="/path">yt</a>
      </body>
  <html>`;
  const inputBaseURL = "https://www.youtube.com/watch";
  const actual = getURLSfromHTML(inputHTML, inputBaseURL);
  const expected = ["https://www.youtube.com/watch/path"];
  expect(actual).toEqual(expected);
});

test("getURLSfromHTML both", () => {
  const inputHTML = `
    <html>
        <body>
            <a href="/path/1">yt</a>
            <a href="https://www.youtube.com/watch/path/2">yt</a>
        </body>
    <html>`;
  const inputBaseURL = "https://www.youtube.com/watch";
  const actual = getURLSfromHTML(inputHTML, inputBaseURL);
  const expected = ["https://www.youtube.com/watch/path/1", "https://www.youtube.com/watch/path/2"];
  expect(actual).toEqual(expected);
});

test("getURLSfromHTML invalid", () => {
  const inputHTML = `
      <html>
          <body>
              <a href="invalid">yt</a>
          </body>
      <html>`;
  const inputBaseURL = "https://www.youtube.com/watch";
  const actual = getURLSfromHTML(inputHTML, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
