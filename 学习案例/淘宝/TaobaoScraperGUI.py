import time
import re
import json
import csv
import threading
import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
from DrissionPage import ChromiumPage


class TaobaoScraperGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("淘宝商品爬虫")
        self.root.geometry("800x600")
        self.root.resizable(True, True)

        # 设置中文字体
        self.font = ('SimHei', 10)

        # 爬取状态
        self.scraping = False

        # 创建界面组件
        self.create_widgets()

    def create_widgets(self):
        # 创建主框架
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.pack(fill=tk.BOTH, expand=True)

        # 链接输入区域
        url_frame = ttk.LabelFrame(main_frame, text="商品链接", padding="5")
        url_frame.pack(fill=tk.X, pady=5)

        ttk.Label(url_frame, text="淘宝商品链接:", font=self.font).pack(side=tk.LEFT, padx=5)
        self.url_entry = ttk.Entry(url_frame)
        self.url_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5, pady=5)

        # 设置输入区域
        settings_frame = ttk.LabelFrame(main_frame, text="保存设置", padding="5")
        settings_frame.pack(fill=tk.X, pady=5)

        ttk.Label(settings_frame, text="保存文件名:", font=self.font).pack(side=tk.LEFT, padx=5)
        self.filename_entry = ttk.Entry(settings_frame, width=20)
        self.filename_entry.pack(side=tk.LEFT, padx=5, pady=5)

        ttk.Label(settings_frame, text="爬取页数:", font=self.font).pack(side=tk.LEFT, padx=5)
        self.pages_entry = ttk.Entry(settings_frame, width=10)
        self.pages_entry.insert(0, "100")  # 默认值
        self.pages_entry.pack(side=tk.LEFT, padx=5, pady=5)

        # 按钮区域
        button_frame = ttk.Frame(main_frame, padding="5")
        button_frame.pack(fill=tk.X, pady=5)

        self.start_btn = ttk.Button(button_frame, text="开始爬取", command=self.start_scraping)
        self.start_btn.pack(side=tk.LEFT, padx=5)

        self.stop_btn = ttk.Button(button_frame, text="停止爬取", command=self.stop_scraping, state=tk.DISABLED)
        self.stop_btn.pack(side=tk.LEFT, padx=5)

        # 日志显示区域
        log_frame = ttk.LabelFrame(main_frame, text="爬取日志", padding="5")
        log_frame.pack(fill=tk.BOTH, expand=True, pady=5)

        self.log_text = scrolledtext.ScrolledText(log_frame, wrap=tk.WORD, font=self.font)
        self.log_text.pack(fill=tk.BOTH, expand=True)
        self.log_text.config(state=tk.DISABLED)

        # 状态栏
        self.status_var = tk.StringVar()
        self.status_var.set("就绪")
        status_bar = ttk.Label(self.root, textvariable=self.status_var, relief=tk.SUNKEN, anchor=tk.W)
        status_bar.pack(side=tk.BOTTOM, fill=tk.X)

    def log(self, message):
        """在日志区域显示消息"""
        self.log_text.config(state=tk.NORMAL)
        self.log_text.insert(tk.END, message + "\n")
        self.log_text.see(tk.END)  # 滚动到最后
        self.log_text.config(state=tk.DISABLED)
        self.status_var.set(message)

    def start_scraping(self):
        """开始爬取数据"""
        url = self.url_entry.get().strip()
        filename = self.filename_entry.get().strip()
        pages_text = self.pages_entry.get().strip()

        # 验证输入
        if not url:
            messagebox.showerror("错误", "请输入淘宝商品链接")
            return

        if not filename:
            messagebox.showerror("错误", "请输入保存文件名")
            return

        try:
            num_pages = int(pages_text)
            if num_pages <= 0:
                raise ValueError
        except ValueError:
            messagebox.showerror("错误", "请输入有效的爬取页数")
            return

        # 禁用输入和开始按钮，启用停止按钮
        self.url_entry.config(state=tk.DISABLED)
        self.filename_entry.config(state=tk.DISABLED)
        self.pages_entry.config(state=tk.DISABLED)
        self.start_btn.config(state=tk.DISABLED)
        self.stop_btn.config(state=tk.NORMAL)

        # 设置爬取状态
        self.scraping = True

        # 在新线程中开始爬取，避免界面冻结
        threading.Thread(target=self.scrape_taobao, args=(url, filename, num_pages), daemon=True).start()

    def stop_scraping(self):
        """停止爬取数据"""
        self.scraping = False
        self.log("正在停止爬取...")
        self.stop_btn.config(state=tk.DISABLED)

    def scrape_taobao(self, url, csv_name, num_pages=130):
        """爬取淘宝商品数据的核心函数"""
        try:
            # 初始化浏览器页面
            self.log("初始化浏览器...")
            dp = ChromiumPage()
            # 监听数据包
            self.log("开始监听数据...")
            dp.listen.start('https://h5api.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/', method='GET')
            dp.get(url)
            self.log(f"已打开链接: {url}")
            # 定义CSV字段
            # fieldnames = ['sku', '商品链接', '标题', '价格', '图片链接', '省份', '城市', '销量', '店铺']
            fieldnames = ['sku', '商品链接']
            # 打开CSV文件准备写入
            with open(f'{csv_name}.csv', mode='a+', newline='', encoding='utf-8') as file:
                csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
                csv_writer.writeheader()  # 写入表头
                self.log(f"已创建CSV文件: {csv_name}.csv")

            # 开始爬取各页数据
            for page in range(1, num_pages + 1):
                # 检查是否需要停止
                if not self.scraping:
                    self.log("用户终止了爬取")
                    break

                self.log(f'正在采集第{page}页的数据内容...')
                time.sleep(3)

                try:
                    # 等待并获取响应数据包
                    resp = dp.listen.wait(timeout=10)
                    text = resp.response.body
                    dp.scroll.to_bottom()

                    # 确保text是字符串类型
                    if isinstance(text, bytes):
                        text = text.decode('utf-8', errors='ignore')
                    if not isinstance(text, str):
                        self.log("响应内容不是字符串，跳过当前页面")
                        continue

                    # 解析数据
                    match = re.findall(r'mtopjsonp\d+\((.*)', text)
                    if not match:
                        self.log("未匹配到数据，跳过当前页面")
                        continue

                    # 处理JSON数据
                    info = match[0].rstrip(')')
                    try:
                        json_data = json.loads(info)
                    except json.JSONDecodeError as e:
                        self.log(f"JSON解析错误: {e}")
                        self.log(f"有问题的数据: {info[:100]}...")
                        continue

                    with open(f'{csv_name}.txt', 'a', encoding='utf-8') as f:
                        f.write(json.dumps(json_data, ensure_ascii=False) + '\n')
                    # 提取商品列表
                    items = json_data.get('data', {}).get('itemsArray', [])


                    # 写入CSV
                    with open(f'{csv_name}.csv', mode='a+', newline='', encoding='utf-8') as file:
                        csv_writer = csv.DictWriter(file, fieldnames=fieldnames)

                        for item in items:
                            # 处理地区信息
                            area_info = item.get('procity', '').split(' ')
                            province = area_info[0] if len(area_info) > 0 else '未知'
                            city = area_info[1] if len(area_info) > 1 else '未知'

                            # 处理价格信息
                            price_show = item.get('priceShow', {})
                            price = price_show.get('price', '未知价格')

                            # 处理商品链接
                            auction_url = item.get('auctionURL', '')
                            full_url = f"https:{auction_url}" if auction_url else '未知链接'

                            # 构建数据字典
                            item_data = {
                                'sku': item.get('item_id', ''),
                                '商品链接': full_url,
                                # '标题': item.get('title', '').replace('<span class=H>', '').replace('</span>', ''),
                                # '价格': price,
                                # '图片链接': item.get('pic_path', ''),
                                # '省份': province,
                                # '城市': city,
                                # '销量': item.get('realSales', '').replace('人付款', '').replace('+', ''),
                                # '店铺': item.get('nick', '')
                            }

                            # 写入CSV
                            csv_writer.writerow(item_data)

                except (KeyError, TypeError) as e:
                    self.log(f"解析数据时出错: {e}")
                    continue

                # 点击下一页
                try:
                    time.sleep(5)  # 等待页面加载
                    next_buttons = dp.eles('css:.next-btn-helper')
                    if len(next_buttons) >= 2:
                        next_buttons[1].click()
                    else:
                        self.log("未找到下一页按钮，可能已到最后一页")
                        break
                except Exception as e:
                    self.log(f'无法点击下一页按钮: {e}')
                    break

            # 关闭浏览器
            dp.close()
            self.log("浏览器已关闭")

        except Exception as e:
            self.log(f"爬取过程中发生错误: {str(e)}")

        finally:
            # 恢复界面状态
            self.root.after(0, lambda: self.url_entry.config(state=tk.NORMAL))
            self.root.after(0, lambda: self.filename_entry.config(state=tk.NORMAL))
            self.root.after(0, lambda: self.pages_entry.config(state=tk.NORMAL))
            self.root.after(0, lambda: self.start_btn.config(state=tk.NORMAL))
            self.root.after(0, lambda: self.stop_btn.config(state=tk.DISABLED))

            self.scraping = False
            self.log("数据爬取完成！")

if __name__ == "__main__":
    root = tk.Tk()
    app = TaobaoScraperGUI(root)
    root.mainloop()

