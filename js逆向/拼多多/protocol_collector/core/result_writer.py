"""Atomic JSON writer: one file per goods_id under data/goods/."""
from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUT_DIR = PROJECT_ROOT / "data" / "goods"


class ResultWriter:
    def __init__(self, out_dir: Path | str = DEFAULT_OUT_DIR) -> None:
        self.out_dir = Path(out_dir)
        self.out_dir.mkdir(parents=True, exist_ok=True)

    def path_for(self, goods_id: str) -> Path:
        return self.out_dir / f"{goods_id}.json"

    def exists(self, goods_id: str) -> bool:
        return self.path_for(goods_id).exists()

    def dump(self, goods_id: str, data: Any) -> Path:
        target = self.path_for(goods_id)
        tmp = target.with_suffix(".json.tmp")
        with tmp.open("w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(tmp, target)
        return target
