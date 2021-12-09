from hashlib import md5
import requests
from time import time
import json


baidu_base_url = "http://api.fanyi.baidu.com/api/trans/vip/translate"
baidu_appid = '20211208001022355'
baidu_sc = 'JGJCiNhUTzdJj9h4shoL'

#


def do_translation(keyword, to, _from='auto'):
    m = md5()
    salt = time()
    sign = baidu_appid + str(keyword) + str(salt) + baidu_sc
    m.update(sign.encode("utf-8"))
    sign = (m.hexdigest()).lower()
    query_sting = {"q": keyword, "from": _from, "to": to,
                   "appid": baidu_appid, "salt": salt, "sign": sign}
    response = requests.request(
        "GET", baidu_base_url, headers={}, params=query_sting)
    return response


res = do_translation('apple', 'zh')
print(res.text)

# with open("test.json", mode='a', encoding='utf-8') as f:
#     json.dumps(json.loads(res.text))
#     print('写入完成')
