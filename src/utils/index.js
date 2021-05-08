/**
 * @description 通过值对数组进行多层分组。
 * @param {array} arr
 * @param {array} keyList
 * @returns array
 */
export const groupByPrototype = (arr, keyList) => {
  keyList = [...new Set(keyList)];
  const key = keyList.shift();
  const groupValue = [...new Set(arr.map((item) => item[key]))];
  if (groupValue.length === 0) throw Error("keyList 中不包含数组对象的属性");
  const groupArr = groupValue.map((value) =>
    arr.filter((item) => item[key] === value)
  );
  if (keyList.length > 0) {
    return groupArr.map((item) => groupByPrototype(item, keyList));
  } else {
    return groupArr;
  }
};
