/**
 * 将两个数组合并成一个，并且根据提供的第三个属性进行数据去重。 即并集(注意：没有进行深度的判断， 即对象的属性依旧为对象则判断不出)
 * @param o Array
 * @param n Array
 * @param prototype String
 * @return Array;
 */
export const concatArr = (o, n, prototype) => {
  if (!Array.isArray(o) || !Array.isArray(n)) {
    throw new Error("前两参数请传入数组");
  }
  if (prototype) {
    const arr = [];
    n.forEach((i) => {
      if (i[prototype] && !o.find((j) => j[prototype] && j[prototype] === i[prototype])) {
        arr.push(i);
      }
    });
    return [...o, ...arr];
  } else {
    return [...o, ...n];
  }
};

/**
 * 两个数组根据属性进行删除(注意：没有进行深度的判断， 即对象的属性依旧为对象则判断不出)
 * @param {Array} data  原始数组
 * @param {Array} willRemove 将要移除的数组
 * @param {string} prototype  移除依据的属性。
 * @returns {Array}
 */
export const removeArr = (data, willRemove, prototype) => {
  if (!Array.isArray(data) || !Array.isArray(willRemove)) {
    throw new Error("前两参数请传入数组");
  }
  const newData = [];
  if (prototype) {
    data.forEach((i) => {
      if (i[prototype] && !willRemove.some((j) => j[prototype] && j[prototype] === i[prototype])) {
        newData.push(i);
      }
    });
  } else {
    data.forEach((i) => {
      if (willRemove.findIndex((j) => j === i) === -1) {
        newData.push(i);
      }
    });
  }
  return newData;
};

/**
 *
 * @param {Array} data 要聚合的数据
 * @param {String} type
 * @param {String | Number} virtualRoot
 * @returns Array
 */
export function getTreeStructure(data, type = "id", virtualRoot = 0) {
  if (!Array.isArray(data)) {
    throw new Error("data参数需要是一个数组");
  }
  const middleData = {};
  data
    .map((item) => ({ ...item, children: [] }))
    .forEach((item) => {
      middleData[item[type]] = item;
    });

  Object.values(middleData).forEach((item) => {
    if (item.pid && item.pid !== virtualRoot) {
      middleData[item.pid].children.push(item);
    }
  });

  return Object.values(middleData).filter((item) => item.pid === virtualRoot);
}

/**
 *
 * @param {Array} vueArr  清除数组中的数据（保留数组的地址）
 */
export function clearVueArr(vueArr) {
  if (!Array.isArray(vueArr)) {
    throw new Error("请传入一个数组");
  }
  vueArr.splice(0);
}

/**
 * @description 通过值对数组进行多层分组。
 * @param {array} arr
 * @param {array} keyList 分组值的key
 * @returns array
 */
export const groupByPrototype = (arr, keyList) => {
  keyList = [...new Set(keyList)];
  const key = keyList.shift();
  const groupValue = [...new Set(arr.map((item) => item[key]))];
  if (groupValue.length === 0) throw Error("keyList 中不包含数组对象的属性");
  const groupArr = groupValue.map((value) => arr.filter((item) => item[key] === value));
  if (keyList.length > 0) {
    return groupArr.map((item) => groupByPrototype(item, keyList));
  } else {
    return groupArr;
  }
};

/**
 * @description 根据数组对字符串进行拆分。
 * @param {string} str 要拆分的字符串
 * @param {Array} list 拆分的依据数组
 */
export const strSplitByList = (str, list) => {
  const willSplitStr = list.reduce((pre, cur) => {
    const reg = new RegExp(cur, "g");
    return pre.replace(reg, `$${cur}$`);
  }, str);
  return willSplitStr.split("$").filter((item) => item);
};

export const arrToObj = (arr, key = "id") =>
  arr.reduce((pre, cur) => {
    pre[cur[key]] = cur;
    return pre;
  }, {});
/**
 *
 * @param {Array} o 初始数组
 * @param {Array} n 更改后的数据
 * @param {String} flag 数据状态（status 由于比较常见，所以使用的名称为flag）
 * @param {Array} checks 要检测的数组
 * @param {String} key 数组的唯一表示
 * @returns {Array} 修改的数据
 *
 * 新增和筛选的操作是否可以放到外部， 可以少传递一个参数.
 */

export const getChangedArr = (o, n, flag, checks, key = "id") => {
  const oldObj = arrToObj(o);
  // 选择出不是新增和删除的数据
  const nArr = n.filter((item) => !item[flag]);
  const nKey = nArr.map((item) => item[key]);
  const newObj = arrToObj(nArr);
  return nKey.reduce((pre, cur) => {
    if (checks.some((check) => oldObj[cur][check] !== newObj[cur][check])) {
      pre.push(newObj[cur]);
    }
    return pre;
  }, []);
};
