function groupByPrototype(arr, key, nameKey) {
  const groupKey = [...new Set(arr.map((item) => item[key]))];
  return groupKey.map((value) => {
    arr.filter((item) => item[key] === value);
  });
}
