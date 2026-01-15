import base64
import gzip
import json

from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad


# ==========================================
# 1. 核心 AES 解密函数
# ==========================================
def decrypt_aes_ecb(ciphertext_b64, key_string, return_bytes=False):
    try:
        # 密钥处理
        if isinstance(key_string, str):
            key = key_string.encode('utf-8')
        else:
            key = key_string

        if len(key) > 16:
            key = key[:16]

        # 密文处理
        if isinstance(ciphertext_b64, bytes):
            encrypted_bytes = ciphertext_b64
        else:
            ciphertext_b64 = ciphertext_b64.strip()
            encrypted_bytes = base64.b64decode(ciphertext_b64)

        # AES 解密
        cipher = AES.new(key, AES.MODE_ECB)
        decrypted_bytes = cipher.decrypt(encrypted_bytes)

        # 去除 Pkcs7 填充
        try:
            decrypted_bytes = unpad(decrypted_bytes, AES.block_size)
        except ValueError:
            print("[!] Padding 错误，密钥可能错误")
            return None

        if return_bytes:
            return decrypted_bytes

        # 尝试解码为字符串
        decrypted_text = decrypted_bytes.decode('utf-8')

        # 去除首尾多余引号
        if decrypted_text.startswith('"'):
            decrypted_text = decrypted_text[1:]
        if decrypted_text.endswith('"'):
            decrypted_text = decrypted_text[:-1]

        return decrypted_text

    except UnicodeDecodeError:
        return decrypted_bytes
    except Exception as e:
        print(f"解密异常: {e}")
        return None


# ==========================================
# 2. URL 路径提取逻辑
# ==========================================
def get_url_path(full_url):
    keyword = "/api"
    if keyword in full_url:
        start_index = full_url.find(keyword)
        if "?" in full_url:
            end_index = full_url.find("?")
            return full_url[start_index:end_index]
        else:
            return full_url[start_index:]
    return full_url


# ==========================================
# 3. 主逻辑 (修复版：增加最终数据解压)
# ==========================================
def solve(response_data, response_headers, request_url):
    version = str(response_headers.get('v', ''))
    print(f"[*] 版本 v = {version}")

    # 1. 生成种子
    seed = ""
    if version == "0":
        seed = response_headers.get('cache-ts-v2', '')
    elif version == "2":
        seed = response_headers.get('time', '')
    else:
        seed = get_url_path(request_url)

    if not seed:
        print("[!] 未找到种子")
        return None

    # 2. 生成 Key1
    seed_b64 = base64.b64encode(seed.encode('utf-8')).decode('utf-8')
    key1 = seed_b64[:16]
    print(f"[*] Key1: {key1}")

    # 3. 解密 Key2
    encrypted_user = response_headers.get('user', '')
    real_key = key1

    if encrypted_user:
        # 强制返回 bytes 以处理 Gzip
        decrypted_user = decrypt_aes_ecb(encrypted_user, key1, return_bytes=True)

        if decrypted_user:
            # 检查是否为 Gzip
            if decrypted_user.startswith(b'\x1f\x8b'):
                try:
                    real_key = gzip.decompress(decrypted_user)
                    # 这里的 real_key 已经是 bytes 了，直接用即可
                    print(f"[*] Key2 解压成功: {real_key.decode('utf-8', 'ignore')}")
                except Exception as e:
                    print(f"[!] Key2 解压失败: {e}")
            else:
                real_key = decrypted_user
        else:
            print("[!] User Header 解密失败")

    # 4. 解密最终数据
    print("[*] 开始解密响应数据...")

    if len(real_key) > 16:
        real_key = real_key[:16]

    # 【重要】强制返回 bytes，因为这里极大概率也是 Gzip
    final_bytes = decrypt_aes_ecb(response_data, real_key, return_bytes=True)

    if final_bytes:
        # 【新增】再次检查最终数据是否为 Gzip
        if final_bytes.startswith(b'\x1f\x8b'):
            print("[*] 最终数据也是 GZIP 压缩的，正在解压...")
            try:
                plaintext = gzip.decompress(final_bytes).decode('utf-8')
                return plaintext
            except Exception as e:
                print(f"[!] 最终数据解压失败: {e}")
                return None
        else:
            # 不是 Gzip，尝试直接解码
            try:
                return final_bytes.decode('utf-8')
            except:
                return str(final_bytes)

    return None


if __name__ == "__main__":
    target_url = "https://capi.coinglass.com/api/home/v2/coinMarkets?sort=h4OiChangePercent&order=desc&pageNum=1&pageSize=5&ex=all"

    headers = {
        "v": "0",
        "encryption": "true",
        "user": "8zLy7qA1O4jJMW5md1IjC7toblvkYQYXhS7XgQ6ExLeEGuQPO6Ul1xcmmoYtMXU0",
        "cache-ts-v2": "1767591020939"
    }

    # 填入你那串很长的加密数据
    encrypted_response = "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"
    if len(encrypted_response) > 50:
        result = solve(encrypted_response, headers, target_url)
        print("\n-------- 最终结果 (前500字符) --------")
        print(str(result)[:500] + "...")

        # 尝试解析 JSON
        try:
            if result:
                obj = json.loads(result)
                print("\n[√] JSON 解析成功！")
        except:
            pass
    else:
        print("\n[!] 请填入真实的 encrypted_response 数据！")