import os
import time
import re
import requests
from PyQt6 import QtCore, QtGui, QtWidgets


def sanitize_filename(name):
    return re.sub(r'[\\/*?:"<>|]', "_", name)


class SignalObject(QtCore.QObject):
    append_item = QtCore.pyqtSignal(str)
    update_status = QtCore.pyqtSignal(str)


class Ui_Dialog(object):
    def __init__(self):
        self.music_dict = {}
        self.thread_pool = QtCore.QThreadPool()
        self.signals = SignalObject()
        self.signals.append_item.connect(self.add_music_item)
        self.signals.update_status.connect(self.update_status_label)
        self.save_directory = ""  # 默认：当前程序目录

    def setupUi(self, Dialog):
        Dialog.setObjectName("音乐下载器")
        Dialog.setWindowTitle("音乐下载器")
        Dialog.resize(637, 460)

        # 歌曲列表
        self.listView = QtWidgets.QListView(parent=Dialog)
        self.listView.setGeometry(QtCore.QRect(110, 100, 400, 231))
        self.model = QtGui.QStandardItemModel()
        self.listView.setModel(self.model)

        # 清空按钮
        self.pushButton_2 = QtWidgets.QPushButton(parent=Dialog)
        self.pushButton_2.setGeometry(QtCore.QRect(360, 351, 81, 31))
        self.pushButton_2.setText("清空")
        self.pushButton_2.clicked.connect(self.clear_list)

        # 状态标签
        self.label_2 = QtWidgets.QLabel(parent=Dialog)
        self.label_2.setGeometry(QtCore.QRect(130, 350, 201, 20))
        self.label_2.setText("状态")

        # 搜索区
        self.widget = QtWidgets.QWidget(parent=Dialog)
        self.widget.setGeometry(QtCore.QRect(150, 40, 267, 33))
        self.horizontalLayout = QtWidgets.QHBoxLayout(self.widget)
        self.horizontalLayout.setContentsMargins(0, 0, 0, 0)

        self.label = QtWidgets.QLabel(parent=self.widget)
        self.label.setText("音乐下载器")
        self.horizontalLayout.addWidget(self.label)

        self.lineEdit = QtWidgets.QLineEdit(parent=self.widget)
        self.horizontalLayout.addWidget(self.lineEdit)

        self.pushButton = QtWidgets.QPushButton(parent=self.widget)
        self.pushButton.setText("搜索")
        self.pushButton.clicked.connect(self.start_search_thread)
        self.horizontalLayout.addWidget(self.pushButton)

        # 选择目录按钮
        self.dir_button = QtWidgets.QPushButton(Dialog)
        self.dir_button.setGeometry(QtCore.QRect(110, 10, 100, 25))
        self.dir_button.setText("选择目录")
        self.dir_button.clicked.connect(self.choose_directory)

        self.dir_label = QtWidgets.QLabel(Dialog)
        self.dir_label.setGeometry(QtCore.QRect(220, 10, 400, 25))
        self.dir_label.setText("当前目录: 程序所在目录")

        self.listView.doubleClicked.connect(self.start_download_thread)

    def add_music_item(self, text):
        self.model.appendRow(QtGui.QStandardItem(text))

    def update_status_label(self, text):
        self.label_2.setText(text)

    def clear_list(self):
        self.model.clear()
        self.label_2.setText("已清空")

    def choose_directory(self):
        directory = QtWidgets.QFileDialog.getExistingDirectory(None, "选择保存目录", "")
        if directory:
            self.save_directory = directory
            self.dir_label.setText(f"当前目录: {directory}")
        else:
            self.save_directory = ""
            self.dir_label.setText("当前目录: 程序所在目录")

    def start_search_thread(self):
        self.label_2.setText("正在搜索…")
        worker = Worker(self.search_musics)
        self.thread_pool.start(worker)

    def search_musics(self):
        self.music_dict.clear()
        music_name = self.lineEdit.text().strip()
        if not music_name:
            self.signals.update_status.emit("请输入歌曲名")
            return

        headers = {
            "accept": "*/*",
            "referer": "https://www.yinyue.pro/",
            "user-agent": "Mozilla/5.0"
        }
        url = "https://pro.cdn.fan/"
        params = {
            "types": "search",
            "count": "20",
            "source": "netease",
            "pages": "1",
            "name": music_name,
            "_": str(int(time.time() * 1000)),
        }

        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            if not data:
                self.signals.update_status.emit("未找到相关歌曲")
                return
            for item in data:
                id = item["id"]
                name = item.get('name', '未知歌曲')
                artist = " ".join(item.get('artist') or ['未知艺术家'])
                display_text = f"{name} - {artist}"
                self.music_dict[display_text] = id
                self.signals.append_item.emit(display_text)
            self.signals.update_status.emit("搜索完成")
        except Exception as e:
            print(e)
            self.signals.update_status.emit("搜索失败")

    def start_download_thread(self, index):
        item = self.model.itemFromIndex(index)
        if item:
            song_name = item.text()
            self.label_2.setText(f"正在下载: {song_name}")
            worker = Worker(self.download_music, song_name)
            self.thread_pool.start(worker)

    def download_music(self, song_name):
        headers = {
            "accept": "*/*",
            "referer": "https://www.yinyue.pro/",
            "user-agent": "Mozilla/5.0"
        }
        url = "https://pro.cdn.fan/"
        song_id = self.music_dict.get(song_name)
        if not song_id:
            self.signals.update_status.emit("歌曲 ID 不存在")
            return
        params = {
            "types": "url",
            "id": str(song_id),
            "source": "netease",
            "_": str(int(time.time() * 1000))
        }

        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            res_json = response.json()
            file_url = res_json.get("url")
            if not file_url:
                self.signals.update_status.emit("下载地址获取失败")
                return
            content = requests.get(file_url).content
            filename = sanitize_filename(song_name)
            save_path = os.path.join(self.save_directory or ".", f"{filename}.mp3")
            with open(save_path, "wb") as f:
                f.write(content)
            self.signals.update_status.emit(f"下载完成: {song_name}")
        except Exception as e:
            print("下载失败:", e)
            self.signals.update_status.emit(f"下载失败: {song_name}")


class Worker(QtCore.QRunnable):
    def __init__(self, fn, *args, **kwargs):
        super().__init__()
        self.fn = fn
        self.args = args
        self.kwargs = kwargs

    @QtCore.pyqtSlot()
    def run(self):
        self.fn(*self.args, **self.kwargs)


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    Dialog = QtWidgets.QDialog()
    ui = Ui_Dialog()
    ui.setupUi(Dialog)
    Dialog.show()
    sys.exit(app.exec())
