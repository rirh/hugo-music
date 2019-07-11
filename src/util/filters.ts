
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


export const leftpad = (str: any, len: number, ch: any) => {
  str = String(str);
  let i = -1;
  if (!ch && ch !== 0) { ch = ' '; }
  len -= str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
};


export const transformatDate = (time: any, accurate: any) => {
  if (!time || time === '-') {
    return '-';
  }
  const date = new Date(time);
  const y = leftpad(date.getFullYear(), 2, 0);
  const m = leftpad(date.getMonth() + 1, 2, 0);
  const d = leftpad(date.getDate(), 2, 0);
  const isAcc = () => {
    const h = leftpad(date.getHours(), 2, 0);
    const minute = leftpad(date.getMinutes(), 2, 0);
    const second = leftpad(date.getSeconds(), 2, 0);
    return `${y}年${m}月${d}日 ${h}:${minute}:${second}`;
  };
  return accurate ? isAcc() : `${y}年${m}月${d}日`;
};

export const transformTimer = (duration: any) => {
  let result: any = 0;
  if (duration) {
    const min: any = `${Math.floor(duration / 60)}`;
    const sco: any = `${Math.floor(duration % 60)}`;
    result = `${min.padStart(2, '0')}:${sco.padStart(2, '0')}`;
  }
  return result;
};

export const scliceValue = (str: any, len: any) => {
  let result = '';
  result = str.length > len ? `${str.substring(0, len)}...` : str;
  return result;
};
