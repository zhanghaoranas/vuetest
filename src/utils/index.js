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

/**
 * @description 根据数组对字符串进行拆分。
 */
// const wordList = ['阶梯','每满', '件',, '可再送']
// const unitList = [ 'M元', 'M件', 'M折','N元', 'N折','N件']
// list = ['阶梯','每满', 'M元', 'M件', 'M折', '件', '可再送', 'N元', 'N折','N件']
export const strSplitByList = (str, list) => {
  const hasKey = [];
  const willSplitStr = list.reduce((pre, cur) => {
    const str = pre.replace(cur, "$");
    if (str !== pre) {
      hasKey.push(cur);
    }
    return str;
  }, str);
  const keyWordInHead = willSplitStr.indexOf("$") === 0;
  const valArr = willSplitStr.split("$");
  const maxLength = Math.max(hasKey.length, valArr.length);
  const endData = [];
  for (let i = 0; i < maxLength - 1; i++) {
    if (keyWordInHead) {
      hasKey[i] && endData.push(hasKey[i]);
      valArr[i] && endData.push(valArr[i]);
    }
  }
  return endData;
};
