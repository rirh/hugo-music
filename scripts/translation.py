#!/usr/bin/python
# -*- coding: UTF-8 -*-
from hashlib import md5
import requests
from time import time
import json


bt_base_url = "http://api.fanyi.baidu.com/api/trans/vip/translate"
bt_appid = '20211208001022355'
bt_sc = 'JGJCiNhUTzdJj9h4shoL'

#


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
    return response

fo = open("foo.txt", "w")

