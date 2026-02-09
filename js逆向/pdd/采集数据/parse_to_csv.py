#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
拼多多商品数据解析工具 - CSV批量版本
将JSON数据包批量解析成CSV表格

作者: AI助手
日期: 2026-02-06
版本: 2.0

功能说明:
- 从拼多多数据包JSON文件中提取商品信息
- 解析商品属性、规格、图片、视频等完整数据
- 支持单文件和批量目录解析
- 所有商品数据合并到一个CSV文件

使用方法:
    python parse_to_csv.py <输入路径> <输出CSV文件>
    
示例:
    # 单个文件
    python parse_to_csv.py 80490760.txt output.csv
    
    # 批量处理目录
    python parse_to_csv.py /path/to/json_files/ output.csv
"""

import json
import csv
import sys
import os
import glob


def parse_goods_property(properties):
    """解析商品属性为HTML格式"""
    if not properties:
        return ""
    
    html_parts = []
    for prop in properties:
        key = prop.get('key', '')
        values = prop.get('values', [])
        if values:
            value = values[0] if isinstance(values, list) else values
            html_parts.append(f"{key}：{value}<br/>")
    
    return ''.join(html_parts).rstrip('<br/>')


def extract_detail_images(goods):
    """从商品数据中提取详情图片URL"""
    images = []
    
    # 从detailGallery中提取图片
    detail_gallery = goods.get('detailGallery', [])
    for item in detail_gallery:
        if item.get('url'):
            images.append(item['url'])
    
    return images


def format_image_urls(images):
    """格式化图片URL列表为说明字段格式"""
    if not images:
        return ""
    
    html_parts = []
    for img_url in images:
        html_parts.append(f'<img src="{img_url}"/><br/>/n')
    
    return ''.join(html_parts).rstrip('<br/>/n')


def format_specs(skus):
    """格式化规格数据为JSON格式"""
    if not skus:
        return "[]"
    
    # 收集所有规格类型
    spec_keys = {}
    for sku in skus:
        specs = sku.get('specs', [])
        for spec in specs:
            spec_key = spec.get('spec_key', '')
            spec_key_id = spec.get('spec_key_id', '')
            if spec_key and spec_key not in spec_keys:
                spec_keys[spec_key] = {'name': spec_key, 'specValue': []}
    
    # 收集所有规格值
    spec_values = {}
    for spec_key in spec_keys.keys():
        spec_values[spec_key] = set()
    
    for sku in skus:
        specs = sku.get('specs', [])
        for spec in specs:
            spec_key = spec.get('spec_key', '')
            spec_value = spec.get('spec_value', '')
            if spec_key in spec_values and spec_value:
                spec_values[spec_key].add(spec_value)
    
    # 构建规格数据结构
    data_rows = []
    for spec_key, values in spec_values.items():
        row = {
            'name': spec_key,
            'specValue': [{'name': v, 'icon': ''} for v in sorted(values)]
        }
        data_rows.append(row)
    
    # 构建价格库存映射
    sku_map = {}
    for sku in skus:
        specs = sku.get('specs', [])
        spec_path = '/'.join([s.get('spec_value', '') for s in specs])
        
        sku_map[spec_path] = {
            'originalQty': str(sku.get('quantity', 0)),
            'barCode': '',
            'price': str(sku.get('groupPrice', '0'))
        }
    
    result = [
        {'dataRows': data_rows},
        sku_map
    ]
    
    return json.dumps(result, ensure_ascii=False)


def parse_single_json(json_file):
    """解析单个JSON文件，返回数据行"""
    try:
        # 读取JSON数据
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 提取商品数据
        goods = data.get('store', {}).get('initDataObj', {}).get('goods', {})
        mall_info = data.get('store', {}).get('initDataObj', {}).get('mall', {})
        
        if not goods:
            print(f"  ⚠ 跳过: {json_file} (未找到商品数据)")
            return None
        
        # 提取字段
        goods_name = goods.get('goodsName', '')
        min_price = goods.get('minGroupPrice', 0)
        quantity = goods.get('quantity', 0)
        goods_id = goods.get('goodsID', '')
        mall_id = goods.get('mallID', '')
        cat_id = goods.get('catID', '')
        
        # 商品属性（只有属性文本）
        goods_property = goods.get('goodsProperty', [])
        property_html = parse_goods_property(goods_property)
        
        # 详情图片
        detail_images = extract_detail_images(goods)
        
        # 说明字段 = 商品属性 + 详情图片
        description = property_html
        if detail_images:
            if description:
                description += '<br/>'
            description += format_image_urls(detail_images)
        
        # 主图（用|分隔，从viewImageData获取）
        view_images = goods.get('viewImageData', [])
        if view_images:
            image_paths = '|'.join(view_images)
        else:
            # 如果没有viewImageData，使用thumbUrl
            image_paths = goods.get('thumbUrl', '')
        
        # 规格
        skus = goods.get('skus', [])
        specs_json = format_specs(skus)
        
        # 商品网址
        goods_url = f"https://mobile.yangkeduo.com/goods.html?goods_id={goods_id}"
        
        # 已拼数量（销量）
        sales_tip = goods.get('sideSalesTip', '')
        
        # 店铺商品数量
        mall_goods_num = mall_info.get('goodsNum', 0)
        
        # 视频网址
        video_url = ''
        video_gallery = goods.get('videoGallery', [])
        if video_gallery and len(video_gallery) > 0:
            video_url = video_gallery[0].get('videoUrl', '') or video_gallery[0].get('url', '')
        
        # 准备数据行
        row_data = [
            goods_name,         # 名称
            float(min_price),   # 价格
            quantity,           # 数量
            description,        # 说明
            image_paths,        # 图片
            specs_json,         # 规格
            goods_url,          # 商品网址
            str(goods_id),      # 商品编号
            mall_id,            # 商店编号
            cat_id,             # 分类
            property_html,      # 商品属性
            sales_tip,          # 已拼数量
            mall_goods_num,     # 店铺商品数量
            video_url if video_url else ''  # 视频网址
        ]
        
        return row_data
        
    except json.JSONDecodeError as e:
        print(f"  ✗ 跳过: {json_file} (JSON格式错误)")
        return None
    except Exception as e:
        print(f"  ✗ 跳过: {json_file} (解析错误: {e})")
        return None


def find_json_files(path):
    """查找JSON文件"""
    json_files = []
    
    if os.path.isfile(path):
        # 单个文件
        json_files.append(path)
    elif os.path.isdir(path):
        # 目录，查找所有.txt和.json文件
        patterns = ['*.txt', '*.json']
        for pattern in patterns:
            json_files.extend(glob.glob(os.path.join(path, pattern)))
        
        # 如果没有找到，尝试递归查找
        if not json_files:
            for pattern in patterns:
                json_files.extend(glob.glob(os.path.join(path, '**', pattern), recursive=True))
    
    return sorted(json_files)


def parse_to_csv(input_path, csv_file):
    """解析JSON文件（单个或批量）并生成CSV"""
    print(f"正在扫描: {input_path}")
    
    # 查找所有JSON文件
    json_files = find_json_files(input_path)
    
    if not json_files:
        print("✗ 错误: 未找到任何JSON/TXT文件")
        return
    
    print(f"找到 {len(json_files)} 个文件")
    print("=" * 60)
    
    # 定义列名（与Excel版本保持一致）
    headers = [
        '名称', '价格', '数量', '说明', '图片', '规格', 
        '商品网址', '商品编号', '商店编号', '分类', 
        '商品屬性', '已拼数量', '店鋪商品數量', '視頻網址'
    ]
    
    # 解析所有文件
    all_rows = []
    success_count = 0
    skip_count = 0
    
    for i, json_file in enumerate(json_files, 1):
        print(f"[{i}/{len(json_files)}] 解析: {os.path.basename(json_file)}")
        row_data = parse_single_json(json_file)
        
        if row_data:
            all_rows.append(row_data)
            success_count += 1
            print(f"  ✓ 成功: {row_data[0][:30]}...")
        else:
            skip_count += 1
    
    # 写入CSV文件
    if all_rows:
        print()
        print("=" * 60)
        print(f"正在写入CSV文件: {csv_file}")
        
        with open(csv_file, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            
            # 写入表头
            writer.writerow(headers)
            
            # 写入所有数据
            writer.writerows(all_rows)
        
        print(f"✓ CSV文件生成成功!")
        print(f"  文件位置: {csv_file}")
        print(f"  成功解析: {success_count} 个商品")
        if skip_count > 0:
            print(f"  跳过失败: {skip_count} 个文件")
        print(f"  总计行数: {len(all_rows) + 1} 行（含表头）")
    else:
        print()
        print("✗ 错误: 没有成功解析任何商品数据")


def main():
    """主函数"""
    print("=" * 60)
    print("拼多多商品数据批量解析工具 v2.0")
    print("=" * 60)
    print()
    
    if len(sys.argv) < 3:
        print("用法: python parse_to_csv.py <输入路径> <输出CSV文件>")
        print("\n输入路径可以是:")
        print("  - 单个JSON文件: 80490760.txt")
        print("  - 目录路径: /path/to/json_files/")
        print("\n示例:")
        print("  # 单个文件")
        print("  python parse_to_csv.py 80490760.txt output.csv")
        print()
        print("  # 批量处理目录")
        print("  python parse_to_csv.py /path/to/data/ all_products.csv")
        print()
        print("  # 当前目录下所有文件")
        print("  python parse_to_csv.py . products.csv")
        print()
        sys.exit(1)
    
    input_path = sys.argv[1]
    csv_file = sys.argv[2]
    
    # 检查输入路径是否存在
    if not os.path.exists(input_path):
        print(f"✗ 错误: 输入路径不存在: {input_path}")
        sys.exit(1)
    
    try:
        parse_to_csv(input_path, csv_file)
        print()
        print("=" * 60)
        print("✓ 批量解析完成!")
        print("=" * 60)
    except Exception as e:
        print(f"✗ 错误: {e}")
        import traceback
        print("\n详细错误信息:")
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
