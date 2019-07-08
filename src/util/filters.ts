
/**
 * 转化为万做单位函数
 */
export const transformW = (args: any) => {
  let result: any = 0;
  const batter = 10000;
  const cursor = Number(args);
  if (!isNaN(cursor)) {
    if (cursor > batter) {
      const value = Math.floor(cursor / batter);
      result = `${value}万`;
    } else {
      result = cursor;
    }
  }
  return result;
};


export const transformatDate = (time: any, accurate: any) => {
  if (!time || time === '-') {
    return '-';
  }
  const leftpad = (str: any, len: number, ch: any) => {
    str = String(str);
    let i = -1;
    if (!ch && ch !== 0) { ch = ' '; }
    len -= str.length;
    while (++i < len) {
      str = ch + str;
    }
    return str;
  };
  const date = new Date(time);
  const y = leftpad(date.getFullYear(), 2, 0);
  const m = leftpad(date.getMonth() + 1, 2, 0);
  const d = leftpad(date.getDate(), 2, 0);
  const isAcc = () => {
    const h = leftpad(date.getHours(), 2, 0);
    const minute = leftpad(date.getMinutes(), 2, 0);
    const second = leftpad(date.getSeconds(), 2, 0);
    return `${y}-${m}-${d} ${h}:${minute}:${second}`;
  };
  return accurate ? isAcc() : `${y}-${m}-${d}`;
};
/**
 * 转化为万做单位函数
 */
export const transformW2 = (args: any) => {
  let result: any = 0;
  const batter = 10000;
  const cursor = Number(args);
  if (!isNaN(cursor)) {
    if (cursor > batter) {
      const value = Math.floor(cursor / batter);
      result = `${value}万`;
    } else {
      result = cursor;
    }
  }
  return result;
};
