"""PyQt6 main window for the PDD protocol collector."""
from __future__ import annotations

from datetime import datetime
from pathlib import Path

from PyQt6.QtCore import Qt, QTimer
from PyQt6.QtGui import QColor, QStandardItem, QStandardItemModel, QTextCharFormat, QTextCursor
from PyQt6.QtWidgets import (
    QApplication, QCheckBox, QDoubleSpinBox, QFileDialog, QGroupBox, QHBoxLayout,
    QHeaderView, QLabel, QLineEdit, QMainWindow, QMessageBox, QPlainTextEdit,
    QProgressBar, QPushButton, QSpinBox, QSplitter, QTableView, QVBoxLayout, QWidget,
)

from core.collector import CollectorConfig, CollectorController
from core.cookie_pool import CookiePool
from core.pdd_client import DEFAULT_UA
from core.proxy_manager import parse_proxy, verify_proxy
from core.url_parser import extract_goods_ids

PROJECT_ROOT = Path(__file__).resolve().parent.parent


class MainWindow(QMainWindow):
    LOG_COLORS = {
        "INFO": "#2f6feb",
        "OK":   "#1aa260",
        "WARN": "#c78800",
        "ERR":  "#c53f38",
    }

    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("拼多多 H5 商详协议采集工具")
        self.resize(1100, 820)

        self.cookie_pool = CookiePool()
        self.controller = CollectorController()

        self._build_ui()
        self._load_styles()

    # ------------------------------------------------------------------ UI
    def _build_ui(self) -> None:
        central = QWidget()
        self.setCentralWidget(central)
        root = QVBoxLayout(central)
        root.setContentsMargins(16, 14, 16, 14)
        root.setSpacing(12)

        splitter = QSplitter(Qt.Orientation.Vertical)
        splitter.addWidget(self._build_url_group())
        splitter.addWidget(self._build_cookie_group())
        splitter.setStretchFactor(0, 1)
        splitter.setStretchFactor(1, 1)
        root.addWidget(splitter, stretch=3)

        root.addWidget(self._build_settings_group())
        root.addWidget(self._build_control_bar())
        root.addWidget(self._build_log_group(), stretch=2)

    def _build_url_group(self) -> QGroupBox:
        box = QGroupBox("链接列表（每行一个 URL 或 goods_id）")
        lay = QHBoxLayout(box)
        self.url_edit = QPlainTextEdit()
        self.url_edit.setPlaceholderText(
            "https://mobile.yangkeduo.com/goods.html?goods_id=878497893729\n"
            "878497893729"
        )
        self.url_edit.textChanged.connect(self._refresh_url_count)
        lay.addWidget(self.url_edit, stretch=4)

        side = QVBoxLayout()
        self.url_count_label = QLabel("剩余: 0")
        self.url_count_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        btn_clear = QPushButton("清空")
        btn_clear.clicked.connect(lambda: self.url_edit.setPlainText(""))
        btn_import = QPushButton("从文件导入")
        btn_import.clicked.connect(self._import_urls_from_file)
        side.addWidget(self.url_count_label)
        side.addWidget(btn_import)
        side.addWidget(btn_clear)
        side.addStretch()
        lay.addLayout(side, stretch=1)
        return box

    def _build_cookie_group(self) -> QGroupBox:
        box = QGroupBox("Cookie 列表（每行一条完整 cookie, 必含 PDDAccessToken）")
        lay = QVBoxLayout(box)

        self.cookie_model = QStandardItemModel(0, 4)
        self.cookie_model.setHorizontalHeaderLabels(["#", "pdd_user_id", "成功", "Cookie"])
        self.cookie_table = QTableView()
        self.cookie_table.setModel(self.cookie_model)
        self.cookie_table.setAlternatingRowColors(True)
        self.cookie_table.setSelectionBehavior(QTableView.SelectionBehavior.SelectRows)
        self.cookie_table.verticalHeader().setVisible(False)
        header = self.cookie_table.horizontalHeader()
        header.setSectionResizeMode(0, QHeaderView.ResizeMode.ResizeToContents)
        header.setSectionResizeMode(1, QHeaderView.ResizeMode.ResizeToContents)
        header.setSectionResizeMode(2, QHeaderView.ResizeMode.ResizeToContents)
        header.setSectionResizeMode(3, QHeaderView.ResizeMode.Stretch)
        lay.addWidget(self.cookie_table, stretch=3)

        self.cookie_edit = QPlainTextEdit()
        self.cookie_edit.setPlaceholderText(
            "PDDAccessToken=...; pdd_user_id=...; api_uid=...; _nano_fp=...; ..."
        )
        self.cookie_edit.setFixedHeight(90)
        lay.addWidget(self.cookie_edit, stretch=1)

        bar = QHBoxLayout()
        btn_load = QPushButton("载入到 Cookie 池")
        btn_load.clicked.connect(self._load_cookies)
        btn_clear = QPushButton("清空")
        btn_clear.clicked.connect(self._clear_cookies)
        btn_copy_alive = QPushButton("复制成功>0")
        btn_copy_alive.clicked.connect(lambda: self._copy_cookies(alive=True))
        btn_copy_dead = QPushButton("复制成功=0")
        btn_copy_dead.clicked.connect(lambda: self._copy_cookies(alive=False))
        bar.addWidget(btn_load)
        bar.addWidget(btn_clear)
        bar.addStretch()
        bar.addWidget(btn_copy_alive)
        bar.addWidget(btn_copy_dead)
        lay.addLayout(bar)
        return box

    def _build_settings_group(self) -> QGroupBox:
        box = QGroupBox("采集设置")
        outer = QVBoxLayout(box)
        lay = QHBoxLayout()
        outer.addLayout(lay)

        lay.addWidget(QLabel("请求间隔:"))
        self.interval_spin = QDoubleSpinBox()
        self.interval_spin.setRange(0.0, 30.0)
        self.interval_spin.setSingleStep(0.5)
        self.interval_spin.setValue(1.0)
        self.interval_spin.setSuffix(" s")
        lay.addWidget(self.interval_spin)

        lay.addSpacing(12)
        lay.addWidget(QLabel("并发线程:"))
        self.thread_spin = QSpinBox()
        self.thread_spin.setRange(1, 16)
        self.thread_spin.setValue(3)
        lay.addWidget(self.thread_spin)

        lay.addSpacing(12)
        lay.addWidget(QLabel("每 cookie 请求数:"))
        self.reuse_spin = QSpinBox()
        self.reuse_spin.setRange(1, 999)
        self.reuse_spin.setValue(1)
        lay.addWidget(self.reuse_spin)

        lay.addSpacing(12)
        lay.addWidget(QLabel("最大重试:"))
        self.retry_spin = QSpinBox()
        self.retry_spin.setRange(1, 20)
        self.retry_spin.setValue(3)
        lay.addWidget(self.retry_spin)

        lay.addSpacing(12)
        lay.addWidget(QLabel("Cookie 死亡阈值:"))
        self.death_spin = QSpinBox()
        self.death_spin.setRange(1, 50)
        self.death_spin.setValue(5)
        lay.addWidget(self.death_spin)

        lay.addSpacing(12)
        self.proxy_check = QCheckBox("使用代理")
        lay.addWidget(self.proxy_check)
        self.proxy_edit = QLineEdit()
        self.proxy_edit.setPlaceholderText("host:port 或 host:port:user:pass")
        lay.addWidget(self.proxy_edit, stretch=1)
        btn_verify = QPushButton("验证代理")
        btn_verify.clicked.connect(self._verify_proxy)
        lay.addWidget(btn_verify)

        row2 = QHBoxLayout()
        row2.addWidget(QLabel("User-Agent:"))
        self.ua_edit = QLineEdit(DEFAULT_UA)
        row2.addWidget(self.ua_edit, stretch=1)
        outer.addLayout(row2)
        return box

    def _build_control_bar(self) -> QWidget:
        w = QWidget()
        lay = QHBoxLayout(w)
        lay.setContentsMargins(0, 0, 0, 0)

        self.start_btn = QPushButton("开始采集")
        self.start_btn.setObjectName("primaryBtn")
        self.start_btn.clicked.connect(self._start)
        self.stop_btn = QPushButton("停止")
        self.stop_btn.setObjectName("dangerBtn")
        self.stop_btn.clicked.connect(self._stop)
        self.stop_btn.setEnabled(False)

        self.progress = QProgressBar()
        self.progress.setRange(0, 1)
        self.progress.setValue(0)
        self.progress.setFormat("%v / %m")

        self.export_failed_btn = QPushButton("导出失败链接")
        self.export_failed_btn.clicked.connect(self._export_failed)
        self.export_failed_btn.setEnabled(False)

        lay.addWidget(self.start_btn)
        lay.addWidget(self.stop_btn)
        lay.addWidget(self.export_failed_btn)
        lay.addWidget(self.progress, stretch=1)
        return w

    def _export_failed(self) -> None:
        failed = self.controller.failed_gids()
        if not failed:
            QMessageBox.information(self, "导出失败链接", "没有失败的链接")
            return
        path, _ = QFileDialog.getSaveFileName(
            self, "导出失败链接", "failed_goods.txt", "Text (*.txt)"
        )
        if not path:
            return
        lines = [
            f"https://mobile.yangkeduo.com/goods.html?goods_id={gid}"
            for gid in failed
        ]
        Path(path).write_text("\n".join(lines) + "\n", encoding="utf-8")
        self._log("OK", f"已导出 {len(failed)} 条失败链接 → {path}")

    def _build_log_group(self) -> QGroupBox:
        box = QGroupBox("运行日志")
        lay = QVBoxLayout(box)
        self.log_view = QPlainTextEdit()
        self.log_view.setReadOnly(True)
        self.log_view.setMaximumBlockCount(5000)
        lay.addWidget(self.log_view)
        return box

    def _load_styles(self) -> None:
        qss_path = PROJECT_ROOT / "ui" / "styles.qss"
        if qss_path.exists():
            self.setStyleSheet(qss_path.read_text(encoding="utf-8"))

    # ------------------------------------------------------------------ slots
    def _refresh_url_count(self) -> None:
        n = len(extract_goods_ids(self.url_edit.toPlainText()))
        self.url_count_label.setText(f"剩余: {n}")

    def _import_urls_from_file(self) -> None:
        path, _ = QFileDialog.getOpenFileName(self, "选择文件", "", "Text (*.txt *.csv);;All (*)")
        if not path:
            return
        try:
            text = Path(path).read_text(encoding="utf-8")
        except Exception as e:
            QMessageBox.warning(self, "错误", f"无法读取: {e}")
            return
        existing = self.url_edit.toPlainText()
        sep = "" if (not existing or existing.endswith("\n")) else "\n"
        self.url_edit.setPlainText(existing + sep + text)

    def _load_cookies(self) -> None:
        text = self.cookie_edit.toPlainText().strip()
        if not text:
            QMessageBox.information(self, "提示", "请先在文本框中粘贴 cookie")
            return
        entries = self.cookie_pool.load_from_text(text)
        invalid = [i for i, e in enumerate(entries, start=1) if not e.valid]
        self._refresh_cookie_table()
        msg = f"已载入 {len(entries)} 条"
        if invalid:
            msg += f"；第 {invalid} 条缺 PDDAccessToken (无效)"
        self._log("INFO", msg)

    def _clear_cookies(self) -> None:
        self.cookie_pool.load_from_text("")
        self._refresh_cookie_table()

    def _copy_cookies(self, alive: bool) -> None:
        items = self.cookie_pool.filter_alive() if alive else self.cookie_pool.filter_dead()
        QApplication.clipboard().setText("\n".join(items))
        self._log("INFO", f"已复制 {len(items)} 条{'有效' if alive else '失效'} cookie")

    def _refresh_cookie_table(self) -> None:
        self.cookie_model.setRowCount(0)
        for i, e in enumerate(self.cookie_pool.entries(), start=1):
            row = [
                QStandardItem(str(i)),
                QStandardItem(e.pdd_user_id or "(缺)"),
                QStandardItem(str(e.success_count)),
                QStandardItem(e.raw),
            ]
            for item in row:
                item.setEditable(False)
            if not e.valid:
                row[1].setForeground(QColor("#c53f38"))
            self.cookie_model.appendRow(row)

    def _on_cookie_updated(self, row: int) -> None:
        if 0 <= row < self.cookie_model.rowCount():
            entries = self.cookie_pool.entries()
            if row < len(entries):
                self.cookie_model.item(row, 2).setText(str(entries[row].success_count))
                if entries[row].dead:
                    self.cookie_model.item(row, 1).setForeground(QColor("#c53f38"))

    def _verify_proxy(self) -> None:
        try:
            p = parse_proxy(self.proxy_edit.text())
        except ValueError as e:
            QMessageBox.warning(self, "错误", str(e)); return
        if p is None:
            QMessageBox.information(self, "提示", "请输入代理"); return
        self._log("INFO", f"验证代理 {p.url} ...")
        QApplication.processEvents()
        ok, msg = verify_proxy(p)
        level = "OK" if ok else "ERR"
        self._log(level, f"代理 {p.url}: {msg}")

    # ------------------------------------------------------------------ run
    def _start(self) -> None:
        urls = extract_goods_ids(self.url_edit.toPlainText())
        if not urls:
            QMessageBox.warning(self, "错误", "请先添加至少一个有效的商品链接或 goods_id")
            return
        if len(self.cookie_pool) == 0:
            QMessageBox.warning(self, "错误", "请先载入 cookie 到池")
            return
        try:
            proxy = parse_proxy(self.proxy_edit.text()) if self.proxy_check.isChecked() else None
        except ValueError as e:
            QMessageBox.warning(self, "错误", str(e)); return

        cfg = CollectorConfig(
            urls=urls,
            ua=self.ua_edit.text() or DEFAULT_UA,
            interval_sec=self.interval_spin.value(),
            threads=self.thread_spin.value(),
            per_cookie_reuse=self.reuse_spin.value(),
            proxy=proxy,
            death_threshold=self.death_spin.value(),
            max_retries=self.retry_spin.value(),
        )
        self.progress.setRange(0, len(urls))
        self.progress.setValue(0)
        self.start_btn.setEnabled(False)
        self.stop_btn.setEnabled(True)
        self.export_failed_btn.setEnabled(False)
        self.controller.start(
            cfg, self.cookie_pool,
            on_log=self._log,
            on_progress=self._on_progress,
            on_cookie_updated=self._on_cookie_updated,
            on_finished=self._on_finished,
        )

    def _stop(self) -> None:
        self.controller.stop()
        self.stop_btn.setEnabled(False)
        self._log("INFO", "请求停止...")

    def _on_progress(self, done: int, total: int) -> None:
        self.progress.setRange(0, total)
        self.progress.setValue(done)

    def _on_finished(self) -> None:
        self.start_btn.setEnabled(True)
        self.stop_btn.setEnabled(False)
        self.export_failed_btn.setEnabled(bool(self.controller.failed_gids()))

    # ------------------------------------------------------------------ log
    def _log(self, level: str, text: str) -> None:
        color = self.LOG_COLORS.get(level, "#1f2328")
        ts = datetime.now().strftime("%H:%M:%S")
        fmt = QTextCharFormat()
        fmt.setForeground(QColor(color))
        cursor = self.log_view.textCursor()
        cursor.movePosition(QTextCursor.MoveOperation.End)
        cursor.insertText(f"[{level:4}] {ts} ", fmt)
        cursor.insertText(text + "\n", QTextCharFormat())
        self.log_view.setTextCursor(cursor)
        self.log_view.ensureCursorVisible()

    def closeEvent(self, event):
        self.controller.stop_blocking()
        super().closeEvent(event)
