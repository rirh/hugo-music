#!/usr/bin/python
# -*- coding: UTF-8 -*-
from hashlib import md5
import os
import requests
from time import sleep, time
import json


bt_base_url = "http://api.fanyi.baidu.com/api/trans/vip/translate"
bt_appid = '20211208001022355'
bt_sc = 'JGJCiNhUTzdJj9h4shoL'

# 常见语种列表
# 名称	代码	名称	代码	名称	代码
# 自动检测	auto	中文	zh	英语	en
# 粤语	yue	文言文	wyw	日语	jp
# 韩语	kor	法语	fra	西班牙语	spa
# 泰语	th	阿拉伯语	ara	俄语	ru
# 葡萄牙语	pt	德语	de	意大利语	it
# 希腊语	el	荷兰语	nl	波兰语	pl
# 保加利亚语	bul	爱沙尼亚语	est	丹麦语	dan
# 芬兰语	fin	捷克语	cs	罗马尼亚语	rom
# 斯洛文尼亚语	slo	瑞典语	swe	匈牙利语	hu
# 繁体中文	cht	越南语	vie
# langs = ['yue','kor', 'th', 'pt', 'el', 'bul', 'fin', 'slo', 'cht', 'fra', 'ara', 'de',
#          'nl', 'est', 'cs', 'swe', 'vie', 'jp', 'spa', 'ru', 'it', 'pl', 'dan', 'rom', 'hu']

langs = ['yue', 'kor', 'th', 'pt', 'el', 'bul', 'fin', 'slo', 'cht', 'fra', 'ara', 'de',
         'nl', 'est', 'cs', 'swe', 'vie', 'jp', 'spa', 'ru', 'it', 'pl', 'dan', 'rom', 'hu','zh']


def do_translation(keyword, to, _from='auto'):
    m = md5()
    salt = time()
    sign = bt_appid + str(keyword) + str(salt) + bt_sc
    m.update(sign.encode("utf-8"))
    sign = (m.hexdigest()).lower()
    query_sting = {"q": keyword, "from": _from, "to": to,
                   "appid": bt_appid, "salt": salt, "sign": sign}
    response = requests.request(
        "GET", bt_base_url, headers={}, params=query_sting)
    return response.json()


def read_json(data, src, lang):
    for key in data:
        it = data[key]
        if (isinstance(it, dict)):
            if not key in src.keys():
                src[key] = {}
            read_json(it, src[key], lang)
        else:
            if(not key in src.keys()):
                sleep(0.1)
                response = do_translation(it, lang)
                if(response["trans_result"]):
                    result = response['trans_result'][0]['dst']
                    src[key] = result
                    print(lang, it, result)
        # if(data[key] isinstance dict)
        # read_json(data[key], key)


def load_json(data):
    try:
        return json.loads(data)
    except ValueError:
        return {}


def read_origin(dir):
    if not os.path.exists(dir):
        return {}
    with open(dir, 'a+') as f:
        f.seek(0)
        return load_json(f.read())


# result =  do_translation('一般的耳机可用不起这个音效', 'en')
# print(result)
result = read_origin('./translation.json')
for it in langs:
    data = read_origin('src/assets/locales/'+it+'.json')
    read_json(result, data, it)
    with open('src/assets/locales/'+it+'.json', 'w') as f:
        f.write(json.dumps(data, ensure_ascii=False))
# res = {}
# for it in langs:
#     sleep(0.1)
#     response = do_translation(it, 'zh')
#     if(response["trans_result"]):
#         result = response['trans_result'][0]['dst']
#         res[it] = it+'-'+result
# with open('list.json', 'w') as f:
#     f.write(json.dumps(res, ensure_ascii=False))
