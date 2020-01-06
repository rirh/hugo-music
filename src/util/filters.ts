
import { get_likelist } from '@/actions';
import store from '@/store';



export const os = () => {
  let result;
  const height = window.document.documentElement.clientHeight;
  const width = window.document.documentElement.clientWidth;
  result = {
    height, width,
  };
  return result;
};

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


const uzStorage = () => {
  let ls: any;
  // let isAndroid = /android/gi.test(navigator.appVersion);
  ls = localStorage;
  return ls;
};

export const setStorage = (key: any, value: any) => {
  let v = value;
  if (typeof v === 'object') {
    v = JSON.stringify(v);
    v = 'obj-' + v;
  } else {
    v = 'str-' + v;
  }
  let ls = uzStorage();
  if (ls) {
    ls.setItem(key, v);
    ls = null;
  }
};

export const getStorage = (key: any) => {
  let ls = uzStorage();
  if (ls) {
    let v = ls.getItem(key);
    ls = null;
    if (!v) { return; }
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4);
      return JSON.parse(v);
    } else if (v.indexOf('str-') === 0) {
      return v.slice(4);
    }
  }
};

export const rmStorage = (key: any) => {
  const ls = uzStorage();
  if (ls && key) {
    ls.removeItem(key);
  }
};

export const clearStorage = () => {
  const ls = uzStorage();
  ls.clear();
};

export const mergeLike = async (id: any) => {
  let result = false;
  await get_likelist();
  const list = (store as any).state.user.likelist.ids;
  id = id || (store as any).state.music.data.id;
  if (list) {
    result = list.some((e: any) => e === id);
  }
  return result;
};


export const download = (patch: any, downloadFile: any, callback: any) => {
  const request = require('request');

  let receivedBytes = 0;
  let totalBytes = 0;

  const req = request({
    method: 'GET',
    uri: patch,
  });
  const fs = require('fs');
  const path = require('path');

  const out = fs.createWriteStream(path.join('/Users/tigerzh/Desktop/', downloadFile));
  req.pipe(out);

  req.on('response', (data: any) => {
    // 更新总文件字节大小
    totalBytes = parseInt(data.headers['content-length'], 10);
  });

  req.on('data', (chunk: any) => {
    // 更新下载的文件块字节大小
    receivedBytes += chunk.length;
    callback('progress', receivedBytes, totalBytes);
  });

  req.on('end', () => {
    callback('finished');
    // TODO: 检查文件，部署文件，删除文件
  });

};

// tslint:disable-next-line:no-var-requires
const Config: any = require('electron-config');
export const config = new Config();




export const transformSongTime = (str: any) => {
  let result = '';
  if (str) {
    // tslint:disable-next-line:radix
    const m = leftpad(parseInt(`${str / 60}`), 2, 0);
    // tslint:disable-next-line:radix
    const s = leftpad(parseInt(`${str % 60}`) + 1, 2, 0);
    result = `${m}:${s}`;
  }
  return result;
};

// 处理歌词方法
export const parseLyric = (lyric: any) => {
  let result: any = [];
  if (lyric) {
    const ly = lyric.split('\n');
    const splitLyric = (e: any) => {
      const crr = e.split(']');
      const [tit, contant] = crr;
      const timer = tit.split('[')[1];
      let timerArr: any = `${timer}`.split('.');
      const [h, s] = timerArr;
      timerArr = h.split(':');
      const [a, b] = timerArr;
      let time: any = `${Number(a) * 60 + Number(b)}.${s}`;
      if (isNaN(time)) {
        time = '';
      }
      // if (!contant) { contant = ''; }
      return { time, contant };
    };
    result = ly.map(splitLyric);
    return result;
  }
};
