# -*- coding: utf-8 -*-
# @Time    : 2026/3/16 17:31
# @FileName: 11.py
# @Software: PyCharm
import hashlib
import random
import time
from loguru import logger

def sm3_str(data:str):
    data2 = data.encode('utf-8')
    sm3 = hashlib.new('sm3',data2)
    bitarr = sm3.digest()
    res = list(bitarr)
    return res

def sm3_bytearr(bytearr):
    sm3 = hashlib.new('sm3',bytearr)
    bitarr = sm3.digest()
    res = list(bitarr)
    return res

def base64_encode_custom(data,charset: str) -> str:
    result = []
    for i in range(0,len(data),3):
        chunk = data[i:i + 3]
        b1 = chunk[0]
        b2 = chunk[1] if len(chunk) > 1 else 0
        b3 = chunk[2] if len(chunk) > 2 else 0
        # # print(b1,b2,b3)
        idx1 = (b1 >> 2) & 0x3F
        idx2 = ((b1 & 0x03) << 4) | ((b2 >> 4) & 0x0F)
        idx3 = ((b2 & 0x0F) << 2) | ((b3 >> 6) & 0x03)
        idx4 = b3 & 0x3F
        result.append(charset[idx1])
        result.append(charset[idx2])
        result.append(charset[idx3] if len(chunk) > 1 else '=')
        result.append(charset[idx4] if len(chunk) > 2 else '=')
    return ''.join(result)

def base64_encode_custom2(data,charset: str) -> str:
    result = []
    for i in range(0,len(data),3):
        chunk = data[i:i + 3]
        b1 = chunk[0]
        b2 = chunk[1] if len(chunk) > 1 else 0
        b3 = chunk[2] if len(chunk) > 2 else 0
        tmp = (((b1 & 255) << 16) | ((b2 & 255) << 8)) | (b3 & 255) # 10568280
        idx1 = (tmp & 16515072) >> 18
        idx2 = (tmp & 258048) >> 12
        idx3 = (tmp & 4032) >> 6
        idx4 = tmp & 63
        result.append(charset[idx1])
        result.append(charset[idx2])
        result.append(charset[idx3] if len(chunk) > 1 else '=')
        result.append(charset[idx4] if len(chunk) > 2 else '=')
    return ''.join(result)

def encode_user_agent_with_salt(user_agent,salt_chars):
    arr256 = arr_256(salt_chars)
    n4 = 0
    result = []
    result_ = []
    for i,char in enumerate(user_agent):
        n2 = (i + 1) % 256
        n3 = (n4 + arr256[n2]) % 256
        n4 = n3
        arr256[n2],arr256[n4] = arr256[n4],arr256[n2]
        char_code = ord(char)
        n6 = (arr256[n2] + arr256[n4]) % 256
        n7 = n6 % 256
        n8 = char_code ^ arr256[n7]
        result.append(chr(n8))
        result_.append(n8)
    return result_

def arr_256(salt_chars):
    shuffling_array = [255 - i for i in range(256)]
    swap_index = 0
    for i in range(len(shuffling_array)):
        product = swap_index * shuffling_array[i]
        swap_index = (product + swap_index + salt_chars[i % len(salt_chars)]) % 256
        shuffling_array[i],shuffling_array[swap_index] = shuffling_array[swap_index],shuffling_array[i]
    return shuffling_array

def toord(data):
    res = []
    for item in data:
        res.append(ord(item))
    return res

def generate_browser_mask(is_ie=False,is_webkit=True,is_chrome=True):
    """
    生成浏览器特征位掩码

    位布局:
    - 位0 (1):  基础标志，始终为1
    - 位1 (2):  is_ie      (var[8])
    - 位2 (4):  is_webkit  (var[9])
    - 位3 (8):  is_chrome  (var[10])

    默认对应 Chrome 浏览器: is_ie=False,is_webkit=True,is_chrome=True
    """
    mask = 1  # 基础位，始终存在

    # var[8]: is_ie → 位1
    if is_ie:
        mask |= (1 << 1)  # 左移1位 = 2

    # var[9]: is_webkit → 位2
    if is_webkit:
        mask |= (1 << 2)  # 左移2位 = 4

    # var[10]: is_chrome → 位3
    if is_chrome:
        mask |= (1 << 3)  # 左移3位 = 8

    return mask

def arr3(time1):
    time2 = time1 + 3
    str1 = str((time2 & 255)) + ","
    return toord(str1)

def arr_50(time1,time2,time3,UA_rc4_bars64_sm3,aid,pageId,ddrt,ic,parms_sm3_2,data_sm3_2,arr_41,arr_3):
    arr_50 = [0 for i in range(50)]
    var_17 = 12
    arr5 = [1,0,0,0,13]
    # var[34] = 1
    arr_50_1 = int(((((time1 / 256) / 256) / 256) / 256) / 256) & 255
    arr_50[0] = arr_50_1
        # var[44] = 12
    arr_50[1] = var_17 & 255  #  鼠标事件
        # var[56] = 236
    arr_50[2] = UA_rc4_bars64_sm3[11]
        # var[61] = 216
    arr_50[3] = (time2 >> 8) & 255
        # var[73] = 0
    arr_50[4] = (aid >> 16) & 255
        # var[29] = 62
    arr_50[5] = time1 & 255
        # var[70] = 0
    arr_50[6] = (pageId >> 24) & 255
        # var[45] = 0
    arr_50[7] =  (arr_50[1] >> 24) & 255
        # var[35] = 17
    arr_50[8] =  int(ddrt + ic) % 256 & 255
        # var[49] = 233
    arr_50[9] = parms_sm3_2[18]
        # var[38] = 13
        #     var[4] = 1
        #     var[5] = 0
        #     var[6] = 0
        #     var[7] = 0
        #     var[15] = 13
    arr_50[10] = arr5[4] & 255
        # var[66] = 3
    arr_50[11] = 3 # 待定
        # var[51] = 156
    arr_50[12] = parms_sm3_2[3]
        # var[68] = 24
    arr_50[13] = (pageId >> 8) & 255
        # var[28] = 4
    arr_50[14] = ((time1 - time2) + 3) & 255
        # var[48] = 228
    arr_50[15] = parms_sm3_2[9]
        # var[64] = 156
    arr_50[16] = int((((time2 / 256) / 256) / 256) / 256) & 255
        # var[47] = 0
    arr_50[17] = arr_50[7]
        # var[30] = 216
    arr_50[18] = (time1 >> 8) & 255
        # var[71] = 239
    arr_50[19] = aid & 255
        # var[26] = 42
    arr_50[20] = int((time3 - 1721836800000) / 1000 / 60 / 60 / 24 / 14) >> 0
        # var[55] = 8
    arr_50[21] = 8
        # var[31] = 4
    arr_50[22] = time1 >> 16 & 255
        # var[69] = 0
    arr_50[23] = pageId >> 16 & 255
        # var[59] = 12
    arr_50[24] = 12
        # var[40] = 1
    arr_50[25] = arr5[0]
        # var[62] = 4
    arr_50[26] = time2 >> 16 & 255
        # var[63] = 230
    arr_50[27] = time2 >> 24 & 255
        # var[27] = 6
    arr_50[28] = 6
        # var[72] = 24
    arr_50[29] = aid >> 8 & 255
        # var[41] = 0  [1,0,0,0,13][1]
    arr_50[30] = arr5[1]
        # var[74] = 0
    arr_50[31] = aid >> 24 & 255
        # var[57] = 242
    arr_50[32] = UA_rc4_bars64_sm3[21]
        # var[52] = 82
    arr_50[33] = data_sm3_2[10]
        # var[42] = 0  [1,0,0,0,13][2]
    arr_50[34] = arr5[2]
        # var[39] = 0
    arr_50[35] = arr5[4] >> 8 & 255
        # var[33] = 156
    arr_50[36] = int(time1 / 256 / 256 / 256 / 256) & 255
        # var[67] = 97
    arr_50[37] = pageId & 255
        # var[53] = 177
    arr_50[38] = data_sm3_2[19]
        # var[43] = 0  [1,0,0,0,13][3]
    arr_50[39] = arr5[3]
        # var[65] = 1
    arr_50[40] = int(time2 / 256 / 256 / 256 / 256 / 256) & 255
        # var[46] = 0
    arr_50[41] = var_17 >> 16 & 255
        # var[36] = 0
    arr_50[42] = int(var_17 / 256) & 255
        # var[24] = 41
    arr_50[43] = 41
        # var[60] = 61
    arr_50[44] = time2 & 255
        # var[32] = 230
    arr_50[45] = time1 >> 24 & 255
        # var[79] = 41
    arr_50[46] = len(arr_41) & 255
        # var[80] = 0
    arr_50[47] = len(arr_41) >> 8 & 255
        # var[84] = 3
    arr_50[48] = len(arr_3) & 255
        # var[85] = 0
    arr_50[49] = len(arr_3) >> 8 & 255
    return arr_50

def arr_8():
    arr_8 = []
    # 43,1,32,68
    # var[9] = 43
    random_number = random.random()
    # random_number = 0.3912899858760597
    # print("random_number",random_number)
    var_9 = ((int(random_number * 65535) & 255) & 170) | ([1,0][0] & 85)
    # var[10] = 1
    var_10 = (var_9 & 85) | ([1,0][0] &  170)
    _100 = int(random_number * 65535) >> 8 & 255
    # var[11] = 32
    var_11 = (_100 & 170) | ([1,0][1] & 85)
    # var[12] = 68
    var_68 = (_100 & 85) | ([1,0][0] & 170)
    arr_8.append(var_9)
    arr_8.append(var_10)
    arr_8.append(var_11)
    arr_8.append(var_68)
    # 169,21,170,17
    random_number2 = random.random()
    random_number2 = 0.783908646526515
    # print("random_number2",random_number2)
    _189 = 0
    if (int(random_number2 * 240) >> 0) > 109:
        _189 = int(random_number2 * 240) + (int(random_number2 * 240) % 2) + 1
    else:
        print("检查随机数")
    # var[9] = 169
    var_9 = ( _189 & 170 )|([1,0][0] & 85)
    # print("var_9",var_9)
    # var[10] = 21
    var_21 = ( _189 & 85 )|([1,0][0] & 170)
    random_number3 = random.random()
    # random_number3 = 0.22567391866869424
    # print("random_number3",random_number3)
    var_187 = (int(random_number3 * 255) >> 0 & 77  | (1 << 1)) | ( 1 << 4 ) | ( 1 << 5) | ( 1 << 7 )
    # var[11] = 170
    #   level=0,var[8] = 187
    #   level=0,var[4] = 170
    #   [CALC] 187 & 170 = 170
    #   level=0,var[2] = 1,0
    #    1,0.1 = 0
    #   level=0,var[5] = 85
    #   [CALC] 0 & 85 = 0
    #   [CALC] 170 | 0 = 170
    #    level=0,var[11] = 170
    var_11 = (var_187 & 170 ) | ([1,0][1] & 85)
    # var[12] = 17
    var_12 = (var_187 & 85 ) | ([1,0][1] & 170)
    arr_8.append(var_9)
    arr_8.append(var_21)
    arr_8.append(var_11)
    arr_8.append(var_12)
    return arr_8

def arrbigxor(data_):
    tmp1 = None
    for item in data_:
        if tmp1 is None:
            tmp1 = item
            continue
        else:
            # # print(tmp1 ,"^",item,tmp1 ^ item)
            tmp1 = tmp1 ^ item
    return tmp1

def enc_126(plaintext,arr_keys):
    # plaintext = [1,12,236,216,0,62,0,0,17,233,13,3,156,24,4,228,156,0,216,239,42,8,4,0,12,1,4,230,6,24,0,0,242,82,0,0,156,97,177,0,1,0,0,41,61,230,41,0,3,0,49,53,51,54,124,55,49,53,124,49,53,51,54,124,56,50,52,124,49,53,51,54,124,56,50,52,124,49,53,51,54,124,56,54,52,124,87,105,110,51,50,54,53,44,149]
    data_list = plaintext
    pad_len = (3 - len(plaintext) % 3) % 3
    data_list.extend([-1] * pad_len)
    result = []
    iii = 0
    for i in range(0,len(data_list),3):
        d0,d1,d2 = data_list[i],data_list[i + 1],data_list[i + 2]
        if d1 < 0:
            tmp = int(data_list[i]) & 0xFF
            result.append(tmp)
        if d2 < 0:
            result.append(int(data_list[i]) & 0xFF)
            result.append(int(data_list[i + 1]) & 0xFF)
        else:
            # int(random.random() * 1000) & 0xFF
            arrr = [0.4612715125863258,
                    0.05782857106088679,
                    0.9062307622056731,
                    0.7191208978972363,
                    0.4193859345873261,
                    0.6341614057830722,
                    0.3686596860145033,
                    0.035883302377940796,
                    0.010506073943274297,
                    0.03310966673375426,
                    0.11572791236036917,
                    0.08210682909207456,
                    0.9085057825859459,
                    0.5619937713664584,
                    0.11577170851161833,
                    0.7155770237107175,
                    0.37113546839434397,
                    0.7935300036734383,
                    0.6326577914076514,
                    0.6923817228213014,
                    0.23016407068315736,
                    0.1185625295797561,
                    0.41365817809770333,
                    0.5492774225473873,
                    0.43269354651695036,
                    0.4798928017303359,
                    0.9394920936861693,
                    0.14605172687729384,
                    0.7729533985275643,
                    0.6292143173480123,
                    0.8614898587090742]
            # m = int(arrr[iii] * 1000) & 0xFF
            m = int(random.random() * 1000) & 0xFF
            k1,k2,k3,k4,k5,k6 = arr_keys
            b1 = (m & k1) | (d0 & k2)
            b2 = (m & k3) | (d1 & k4)
            b3 = (m & k5) | (d2 & k6)
            b4 = (d0 & k1) | (d1 & k3) | (d2 & k5)
            result.extend([b1 & 0xFF,b2 & 0xFF,b3 & 0xFF,b4 & 0xFF])
            iii += 1
    return result

def arr_444():
    random_number = random.random()
    # random_number = 0.8706244451654921

    var_224 = int(random_number * 65535) & 255

    var_161 = (var_224 & 170)|([3,82][0] & 85)
    var_66 = (var_224 & 85)|([3,82][0] & 170)

    random_number2 = random.random()
    # random_number2 = 0.3062388493001629
    var_12 = int(random_number2 *  40) >> 0
    var_88 = (var_12 & 170)|([3,82][1] & 85)
    var_6 = (var_12 & 85)|([3,82][1] & 170)
    # [161,66,88,6]
    return [var_161,var_66,var_88,var_6]


def get_ab(parms,UA,data = ""):
    tttt = int(time.time() * 1000)
    time1 = tttt - 1 # 1773385603134
    time2 = tttt # 1773385603133
    time3 = time2 + 118
    aid = 6383
    pageId = 6241
    ddrt = 8.5
    ic = 8.5
    B64_CHARSET = "ckdp1h4ZKsUB80/Mfvw36XIgR25+WQAlEi7NLboqYTOPuzmFjJnryx9HVGDaStCe"
    B64_CHARSET2 = "Dkdpgh2ZmsQB80/MfvV36XI1R45-WUAlEixNLwoqYTOPuzKFjJnry79HbGcaStCe"
    # parms = "aid=6383&app_name=douyin_web&live_id=1&device_platform=web&language=zh-CN&enter_from=web_search&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=132.0.0.0&room_id=7616258349373475619&query_from=1&msToken="
    # data = ""
    # UA = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
    salt_chars = [0, 17, 12]
    env1 = "1536|715|1536|824|1536|824|1536|864|Win32"
    arr_keys = [145, 110, 66, 189, 44, 211]
    parms_sm3_2 = sm3_bytearr(bytearray(sm3_str(parms + "dhzx")))
    # print("parms_sm3_2 :", parms_sm3_2)
    data_sm3_2 = sm3_bytearr(bytearray(sm3_str(data + "dhzx")))
    # print("data_sm3_2 len:", len(data_sm3_2))
    # print("data_sm3_2 :", data_sm3_2)
    rc4_str = encode_user_agent_with_salt(UA,salt_chars)
    # print("rc4_str len", len(rc4_str))
    # print("rc4_str", rc4_str)
    UA_rc4_bars64 = base64_encode_custom(rc4_str, B64_CHARSET)
    # print("UA_rc4_bars64", UA_rc4_bars64)
    UA_rc4_bars64_sm3 = sm3_str(UA_rc4_bars64)
    # print("UA_rc4_bars64_sm3", UA_rc4_bars64_sm3)
    arr_41 = toord(env1)
    # print("arr_41", arr_41)
    arr_3 = arr3(time1)
    # print("arr_3", arr_3)
    arr50 = arr_50(time1,time2,time3,UA_rc4_bars64_sm3,aid,pageId,ddrt,ic,parms_sm3_2,data_sm3_2,arr_41,arr_3)
    # print("arr50 len", arr50.__len__())
    # print("arr50", arr50)
    arr8 = arr_8()
    # print("arr8", arr8)
    # 50位数组原始位置
    arr50_2 = [43, 20, 28, 14, 5, 18, 22, 45, 36, 0, 8, 42, 10, 35, 25, 30, 34, 39, 1, 7, 41, 17, 15, 9, 12, 33, 38, 21,2, 32, 24, 44, 3, 26, 27, 16, 40, 11, 37, 13, 23, 6, 19, 29, 4, 31, 46, 47, 48, 49]
    arr50_3 = [arr50[i] for i in arr50_2]
    # print("arr50_3", arr50_3)
    arrbig = arr8 + arr50_3
    # print("arrbig", arrbig)
    xorint = arrbigxor(arrbig)
    # print("xorint", xorint)
    arr95 = arr50 + arr_41 + arr_3 + [xorint]
    # print("arr95 len", len(arr95))
    # print("arr95", arr95)
    arr126 = enc_126(arr95, arr_keys)
    # print("arr126", arr126)
    arr134 = arr8 + arr126
    # print("arr134", arr134)
    arr134_str = ''.join(chr(c) for c in arr134)
    salt_chars = [211]
    arr134_str_rc4 = encode_user_agent_with_salt(arr134_str,salt_chars)
    # print("arr134_str_rc4", arr134_str_rc4)
    # print("arr134_str_rc4 len", len(arr134_str_rc4))  # func=> fromCharCode this=> [Function: String]
    # # print(base64_encode_custom(, B64_CHARSET2))
    # [161,66,88,6]
    arr444 = arr_444()
    # print("arr444", arr444)
    arrrr = arr444 + arr134_str_rc4
    # print("arrrr", arrrr)
    # print("arrrr", arrrr.__len__())
    a_bogus = base64_encode_custom2(arrrr, B64_CHARSET2)
    # print("a_bogus",a_bogus)
    return a_bogus


if __name__ == '__main__':
    # /* V 1.0.1.19-fix.01 */
    # 2026.3.17
    url = "https://www.douyin.com/aweme/v1/web/general/search/stream/?aid=6383&browser_language=zh-CN&browser_name=Chrome&browser_online=true&browser_platform=MacIntel&browser_version=146.0.0.0&channel=channel_pc_web&cookie_enabled=true&count=10&cpu_core_num=8&device_memory=8&device_platform=webapp&disable_rs=0&downlink=10&effective_type=4g&enable_history=1&engine_name=Blink&engine_version=146.0.0.0&from_group_id=&is_filter_search=0&keyword=%E6%AD%8C%E8%AF%8D%E5%85%A5%E5%BF%83%E7%9A%84%E6%96%87%E6%A1%88&list_type=single&need_filter_settings=1&offset=0&os_name=Mac+OS&os_version=10.15.7&pc_client_type=1&pc_libra_divert=Mac&pc_search_top_1_params=%7B%22enable_ai_search_top_1%22%3A1%7D&platform=PC&query_correct_type=1&round_trip_time=50&screen_height=900&screen_width=1440&search_channel=aweme_general&search_source=normal_search&support_dash=0&support_h265=1&uifid=e4c262a6b5e3b5badbd561631828ceb96cf9bda1502c8aff5f66458d92ccf6f38d2762055da7262b93ed261b3fe2e483179a2303cbb6922aadc6c7313ea226f56cc1edd0ec4cc20f43606347427a145f93850998a679f2d82b1b9c30fdb9f285994bd79cf3d6c49d7c687108f6c0f33489fe55d411decc9c3335aa5125353b25dfac3ce194bbf513ef7ffbb513416953eb2aff7bdbff4fec4f1681699ffd2d02&update_version_code=0&version_code=190600&version_name=19.6.0&webid=7605443157111522851&msToken=aBwJiq7yUYq48lXv1SzDHiqBW88esWJsymj5X0hjxeCNc2KTamMyTZhmAk1NqgO9wpZrYNV-Oo8Px4-na_kZVT-_OBpEqIX_6Cswh01UyQnnQfKKFlWy00SR45HUmD8jMUzNkRiCM8oTut3Vx7in11T6mhu7U-YY9VmsJKaU6lw-UA%3D%3D"
    parms = url.split("?")[1]
    # print("parms", parms)
    UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0"
    for i in range(1000):
        a_bogus = get_ab(parms, UA)
        # print("a_bogus ",len(a_bogus),a_bogus)
        logger.success(f"生成次数 {i + 1 } a_bogus 长度{len(a_bogus)} {a_bogus}")

