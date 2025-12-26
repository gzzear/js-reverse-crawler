import hashlib
import json
import os
import requests
from bs4 import BeautifulSoup
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

# https://kkmzt.com/

class mzt_spider():
    def __init__(self):
        self.headers = {
            "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        }
        self.enc_data = ''
        self.image_names = []
        self.base_url = ''  # 用于存储类似于 https://f.meizitu.net/image/2022/07/ 的基准路径
        self.title = ''  # 用于文件夹命名

    # 1.【新增】请求HTML页面，获取图片基准路径
    def get_base_info(self, id):
        url = f"https://kkmzt.com/photo/{id}"
        print(f"[*] 正在分析页面结构: {url}")
        try:
            # 动态更新 Referer
            self.headers['referer'] = url
            response = requests.get(url, headers=self.headers)

            if response.status_code != 200:
                print(f"[!] 页面请求失败: {response.status_code}")
                return False

            soup = BeautifulSoup(response.text, 'html.parser')

            # 获取标题
            h1 = soup.select_one('h1.uk-article-title')
            self.title = h1.text.strip() if h1 else str(id)

            # 获取第一张图片 URL 来提取 Base Path
            # 逻辑：找到页面显示的那张大图，它的 src 包含了日期路径
            first_img = soup.select_one('.uk-article figure img')
            if first_img:
                full_src = first_img.get('src')
                # 例如: https://f.meizitu.net/image/2022/07/21y01wsz.jpg
                # 我们需要截取掉文件名，保留目录: https://f.meizitu.net/image/2022/07/
                self.base_url = full_src.rsplit('/', 1)[0] + '/'
                print(f"[*] 成功提取基准路径: {self.base_url}")
                return True
            else:
                print("[!] 未找到示例图片，无法提取路径")
                return False

        except Exception as e:
            print(f"[!] 页面解析出错: {e}")
            return False

    # 2. 获取加密的图片名称数据
    def get_encrypted_data(self, id):
        try:
            url = f"https://kkmzt.com/app/post/p?id={id}"
            response = requests.get(url, headers=self.headers)
            res_json = response.json()
            if res_json.get('data'):
                self.enc_data = res_json.get('data')
                return True
            else:
                print("[!] API 返回错误")
                return False
        except Exception as e:
            print(f'[!] API 请求异常: {e}')
            return False

    # 3. 解密图片名称数据
    def decrypt_image_names(self, id):
        print("[*] 正在解密图片列表...")
        try:
            content_id = int(id)
            encrypted_response = self.enc_data

            # --- 算法逻辑 (完全复刻 JS) ---
            # 1. 计算 IV
            iv_str = "".join([str(content_id % i % 10) for i in range(2, 18)])

            # 2. 计算 Key
            salt = "aeghiePh9ahx"
            hash1 = hashlib.md5(f"{content_id}{salt}".encode('utf-8')).hexdigest()

            key_src = f"{iv_str}{hash1}"
            key_full = hashlib.md5(key_src.encode('utf-8')).hexdigest()
            key_str = key_full[8:24]  # 截取中间16位

            # 3. 提取密文部分
            if hash1 not in encrypted_response:
                print("[!] 解密失败: Hash 分隔符未找到")
                return

            ciphertext_hex = encrypted_response.split(hash1)[1]

            # 4. AES 解密
            cipher = AES.new(key_str.encode('utf-8'), AES.MODE_CBC, iv_str.encode('utf-8'))
            decrypted_bytes = unpad(cipher.decrypt(bytes.fromhex(ciphertext_hex)), AES.block_size)

            # 5. 解析结果
            self.image_names = json.loads(decrypted_bytes.decode('utf-8'))
            print(f"[*] 解密成功，共 {len(self.image_names)} 张图片")

        except Exception as e:
            print(f'[!] 解密异常: {e}')

    # 4. 下载图片
    def download_images(self, id):
        # 创建文件夹
        dir_name = f"./{self.title}_{id}"
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)

        print(f"[*] 开始下载到: {dir_name}")

        for i, image_name in enumerate(self.image_names):
            # 【关键】拼接 URL：基准路径 + 解密出来的文件名
            url = f"{self.base_url}{image_name}"

            # 打印进度
            print(f"\r正在下载 [{i + 1}/{len(self.image_names)}]: {image_name}", end='')

            try:
                img_resp = requests.get(url, headers=self.headers)
                file_path = f'{dir_name}/{image_name}'
                with open(file_path, 'wb') as f:
                    f.write(img_resp.content)
            except Exception as e:
                print(f"\n[!] 下载 {image_name} 失败: {e}")

        print("\n[*] 下载完成!")

    # 主程序
    def run(self, id):
        # 1. 先去 HTML页 拿路径
        if not self.get_base_info(id):
            return

        # 2. 去 API 拿加密数据
        if not self.get_encrypted_data(id):
            return

        # 3. 解密文件名
        self.decrypt_image_names(id)

        # 4. 拼接下载
        if self.image_names:
            self.download_images(id)


if __name__ == '__main__':
    spider = mzt_spider()
    # 你可以换成任意 ID 测试，例如: 71749 或 130262
    spider.run(87789)