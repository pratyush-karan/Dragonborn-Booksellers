export const format = (arr) => {
  if (!arr) return "";
  if (arr.length === 1) return arr[0];
  else {
    return arr.join(",");
  }
};
