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

// export const deepCompare = (obj1, obj2) => {
//   if (typeof obj1 === "object" && typeof obj2 === "object") {
//     let keys1 = Object.keys(obj1);
//     let keys2 = Object.keys(obj2);

//     if (keys1.length !== keys2.length) return false;

//     for (let key of keys1) {
//       if (obj2.hasOwnProperty(key)) {
//         if (!deepCompare(obj1[key], obj2[key])) return false;
//       }
//     }
//     return true;
//   } else return obj1 == obj2;
// };
