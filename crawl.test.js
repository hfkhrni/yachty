const { normalizeURL } = require("./crawl");
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
