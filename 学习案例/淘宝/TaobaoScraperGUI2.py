import json
import os
import pandas as pd
import threading
from tkinter import Tk, filedialog, Label, Button, messagebox, Entry, Text, Scrollbar, END, RIGHT, Y
from DrissionPage import ChromiumPage


class TaobaoScraperGUI2:
    def __init__(self, root):
        self.root = root
        self.root.title("淘宝接口数据采集工具")
        self.root.geometry("500x450")

        self.csv_path = None
        self.save_folder = None

        Label(root, text="淘宝接口数据采集工具", font=("Arial", 14, "bold")).pack(pady=10)

        # 选择CSV文件按钮
        Button(root, text="选择 CSV 文件", command=self.select_csv).pack(pady=5)

        # 保存文件夹名称输入
        Label(root, text="保存文件夹名称:").pack()
        self.folder_entry = Entry(root)
        self.folder_entry.insert(0, "详情数据")  # 默认值
        self.folder_entry.pack(pady=5)

        # 日志输出框
        Label(root, text="运行日志:").pack()
        self.log_box = Text(root, height=12, width=60)
        scrollbar = Scrollbar(root, command=self.log_box.yview)
        self.log_box.config(yscrollcommand=scrollbar.set)
        self.log_box.pack(pady=5)
        scrollbar.pack(side=RIGHT, fill=Y)

        # 控制按钮
        Button(root, text="开始采集", command=self.start_scraping).pack(pady=5)
        Button(root, text="退出", command=root.quit).pack(pady=5)

    def log(self, msg):
        """在日志框输出消息"""
        self.log_box.insert(END, msg + "\n")
        self.log_box.see(END)
        self.root.update()

    def select_csv(self):
        file_path = filedialog.askopenfilename(
            filetypes=[("CSV 文件", "*.csv")],
            title="选择包含商品链接的 CSV 文件"
        )
        if file_path:
            self.csv_path = file_path
            messagebox.showinfo("文件已选择", f"已选择文件：\n{self.csv_path}")
            self.log(f"已选择 CSV 文件: {self.csv_path}")

    def start_scraping(self):
        if not self.csv_path:
            messagebox.showerror("错误", "请先选择 CSV 文件！")
            return

        self.save_folder = self.folder_entry.get().strip()
        if not self.save_folder:
            messagebox.showerror("错误", "保存文件夹名称不能为空！")
            return

        threading.Thread(target=self.scrape_data, daemon=True).start()

    def scrape_data(self):
        try:
            data = pd.read_csv(self.csv_path)
            data = data[data['商品链接'].str.startswith(('http://', 'https://'), na=False)]
            total = len(data)

            dp = ChromiumPage()
            os.makedirs(self.save_folder, exist_ok=True)
            self.log(f"保存目录: {os.path.abspath(self.save_folder)}")

            for idx, row in enumerate(data.itertuples(), start=1):
                product_id = row.sku
                url = row.商品链接

                success = False
                retries = 2  # 最大重试次数

                for attempt in range(1, retries + 1):
                    try:
                        dp.listen.start(
                            '/h5/mtop.taobao.pcdetail.data.get/1.0/',
                            method='GET'
                        )

                        dp.get(url)
                        resp = dp.listen.wait(timeout=10)

                        if resp:
                            text = resp.response.body
                            file_path = os.path.join(self.save_folder, f"{product_id}.json")
                            with open(file_path, 'w', encoding='utf-8') as f:
                                json.dump(text, f, ensure_ascii=False)

                            success = True
                            self.log(f"✅ 商品 {product_id} 数据已保存 (尝试 {attempt}/{retries})")
                            break
                        else:
                            self.log(f"⚠️ 商品 {product_id} 第 {attempt} 次未监听到数据，重试中...")

                    except Exception as e:
                        self.log(f"❌ 商品 {product_id} 第 {attempt} 次出错：{e}")

                # 进度百分比
                progress = round((idx / total) * 100, 2)
                if success:
                    self.log(f"📊 进度: {progress}% ({idx}/{total})")
                else:
                    self.log(f"❌ 商品 {product_id} 采集失败 (进度: {progress}%)")

            messagebox.showinfo("完成", "所有商品数据采集完成！")
            self.log("🎉 所有商品数据采集完成！")

        except Exception as e:
            messagebox.showerror("错误", f"运行出错：{e}")
            self.log(f"运行出错: {e}")


if __name__ == "__main__":
    root = Tk()
    app = TaobaoScraperGUI(root)
    root.mainloop()
