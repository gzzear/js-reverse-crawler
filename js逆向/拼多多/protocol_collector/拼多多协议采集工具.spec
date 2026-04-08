# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

# PyQt6 plugins that need to be bundled
qt6_plugins = [
    ('platforms', 'PyQt6/Qt6/plugins/platforms'),
    ('styles', 'PyQt6/Qt6/plugins/styles'),
    ('imageformats', 'PyQt6/Qt6/plugins/imageformats'),
]

# Build data tuples for PyQt6 plugins
datas = []
for plugin_name, plugin_path in qt6_plugins:
    datas.append((f'{{site_packages}}/PyQt6/Qt6/plugins/{plugin_name}', f'PyQt6/Qt6/plugins/{plugin_name}'))

# Add UI resources
datas += [
    ('ui/styles.qss', 'ui'),
    ('signer/templates', 'signer/templates'),
]

a = Analysis(
    ['main.py'],
    pathex=[],
    binaries=[],
    datas=datas,
    hiddenimports=[
        'PyQt6',
        'PyQt6.QtCore',
        'PyQt6.QtGui',
        'PyQt6.QtWidgets',
        'httpx',
        'httpcore',
        'certifi',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='拼多多协议采集工具',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=None,  # Add icon.ico if you have one
)
