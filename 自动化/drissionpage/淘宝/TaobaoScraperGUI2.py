import csv
import json
import os
import threading
from tkinter import (
    Tk, filedialog, Label, Button,
    messagebox, Entry, Text, Scrollbar,
    END, RIGHT, Y
)

from DrissionPage import ChromiumPage


class TaobaoScraperGUI2:
    def __init__(self, root):
        self.root = root
        self.root.title("淘宝接口数据采集工具")
        self.root.geometry("520x480")

        self.csv_path = None
        self.save_folder = None

        Label(root, text="淘宝接口数据采集工具", font=("Arial", 14, "bold")).pack(pady=10)

        Button(root, text="选择 CSV 文件", command=self.select_csv).pack(pady=5)

        Label(root, text="保存文件夹名称:").pack()
        self.folder_entry = Entry(root, width=30)
        self.folder_entry.insert(0, "详情数据")
        self.folder_entry.pack(pady=5)

        Label(root, text="运行日志:").pack()
        self.log_box = Text(root, height=14, width=65)
        scrollbar = Scrollbar(root, command=self.log_box.yview)
        self.log_box.config(yscrollcommand=scrollbar.set)
        self.log_box.pack(pady=5)
        scrollbar.pack(side=RIGHT, fill=Y)

        Button(root, text="开始采集", command=self.start_scraping).pack(pady=5)
        Button(root, text="退出", command=root.quit).pack(pady=5)

    # ================= 工具函数 =================

    def log(self, msg):
        self.log_box.insert(END, msg + "\n")
        self.log_box.see(END)
        self.root.update()

    def select_csv(self):
        path = filedialog.askopenfilename(
            title="选择包含商品链接的 CSV 文件",
            filetypes=[("CSV 文件", "*.csv")]
        )
        if path:
            self.csv_path = path
            self.log(f"已选择 CSV 文件: {path}")
            messagebox.showinfo("提示", "CSV 文件选择成功")

    def start_scraping(self):
        if not self.csv_path:
            messagebox.showerror("错误", "请先选择 CSV 文件")
            return

        self.save_folder = self.folder_entry.get().strip()
        if not self.save_folder:
            messagebox.showerror("错误", "保存文件夹名称不能为空")
            return

        threading.Thread(target=self.scrape_data, daemon=True).start()

    # ================= CSV 读取 =================

    def read_csv_data(self, path):
        rows = []
        with open(path, 'r', encoding='utf-8-sig', newline='') as f:
            reader = csv.DictReader(f)
            for row in reader:
                url = (row.get('商品链接') or row.get('url') or '').strip()
                if url.startswith(('http://', 'https://')):
                    rows.append(row)
        return rows

    # ================= 核心逻辑 =================

    def scrape_data(self):
        try:
            rows = self.read_csv_data(self.csv_path)
            total = len(rows)

            if total == 0:
                messagebox.showerror("错误", "CSV 中未找到有效商品链接")
                return

            os.makedirs(self.save_folder, exist_ok=True)
            self.log(f"保存目录: {os.path.abspath(self.save_folder)}")

            dp = ChromiumPage()

            for idx, row in enumerate(rows, start=1):
                product_id = (
                    row.get('sku')
                    or row.get('SKU')
                    or row.get('商品ID')
                    or str(idx)
                )
                url = row.get('商品链接') or row.get('url')

                success = False
                retries = 2

                for attempt in range(1, retries + 1):
                    try:
                        dp.listen.start(
                            '/h5/mtop.taobao.pcdetail.data.get/1.0/',
                            method='GET'
                        )

                        dp.get(url)
                        resp = dp.listen.wait(timeout=10)

                        if resp:
                            data = resp.response.body
                            file_path = os.path.join(self.save_folder, f"{product_id}.json")

                            with open(file_path, 'w', encoding='utf-8') as f:
                                json.dump(data, f, ensure_ascii=False, indent=2)

                            self.log(f"✅ 商品 {product_id} 保存成功 ({attempt}/{retries})")
                            success = True
                            break
                        else:
                            self.log(f"⚠️ 商品 {product_id} 未监听到数据，重试 {attempt}/{retries}")

                    except Exception as e:
                        self.log(f"❌ 商品 {product_id} 出错 ({attempt}/{retries}): {e}")

                progress = round(idx / total * 100, 2)
                if success:
                    self.log(f"📊 进度 {progress}% ({idx}/{total})")
                else:
                    self.log(f"❌ 商品 {product_id} 采集失败 (进度 {progress}%)")

            messagebox.showinfo("完成", "所有商品采集完成")
            self.log("🎉 所有商品采集完成")

        except Exception as e:
            messagebox.showerror("错误", str(e))
            self.log(f"程序异常: {e}")


if __name__ == "__main__":
    root = Tk()
    app = TaobaoScraperGUI2(root)
    root.mainloop()
