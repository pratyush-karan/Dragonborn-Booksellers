export const format = (arr) => {
  if (!arr) return "";
  if (arr.length === 1) return arr[0];
  else {
    return arr.join(",");
  }
};

export const sanitizeHtml = (html) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(html, "text/html");

  // Remove script tags (or other potentially risky elements if needed)
  const scripts = doc.querySelectorAll("script");
  scripts.forEach((script) => script.remove());

  return doc.body.innerHTML.replace(/^_*|_*$/g, "");
};
