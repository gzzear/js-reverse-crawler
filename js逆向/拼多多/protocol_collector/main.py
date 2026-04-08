"""Entry point for the PDD H5 protocol collector GUI."""
from __future__ import annotations

import sys
from pathlib import Path

# Put this project directory on sys.path so `core.*` / `signer.*` / `ui.*`
# absolute imports work regardless of where `python main.py` is invoked.
HERE = Path(__file__).resolve().parent
if str(HERE) not in sys.path:
    sys.path.insert(0, str(HERE))

from PyQt6.QtWidgets import QApplication

from signer.updater import ensure_anti_co
from ui.main_window import MainWindow


def main() -> int:
    # Best-effort: refresh anti_co.js on launch. Don't crash the GUI if it fails;
    # a cached copy from the previous run is still usable.
    try:
        ensure_anti_co()
    except Exception as e:
        print(f"[main] anti_co.js update skipped: {e}", file=sys.stderr)

    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    return app.exec()


if __name__ == "__main__":
    raise SystemExit(main())
