"""
PDD Anti-Content API 测试脚本
用于测试 Express API 接口
"""
import requests
import json
import time


class AntiContentAPI:
    """Anti-Content API 客户端"""
    
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url
        self.session = requests.Session()
    
    def health_check(self):
        """健康检查"""
        try:
            response = self.session.get(f"{self.base_url}/health")
            return response.json()
        except Exception as e:
            print(f"❌ 健康检查失败: {e}")
            return None
    
    def get_anti_content(self):
        """
        使用 GET 方法获取 anti_content
        
        Returns:
            dict: API 响应数据
        """
        try:
            url = f"{self.base_url}/api/anti_content"
            response = self.session.get(url)
            return response.json()
        except Exception as e:
            print(f"❌ GET 请求失败: {e}")
            return None


def main():
    """测试主函数"""
    print("=" * 60)
    print("🧪 PDD Anti-Content API 测试")
    print("=" * 60)
    
    # 创建 API 客户端
    api = AntiContentAPI()
    
    # 1. 健康检查
    print("\n1️⃣  测试健康检查...")
    health = api.health_check()
    if health:
        print("✅ 健康检查成功:")
        print(json.dumps(health, indent=2, ensure_ascii=False))
    else:
        print("❌ 健康检查失败，请确保服务器已启动！")
        print("💡 启动命令: cd js逆向/pdd/anti_content/0as && node server.js")
        return
    
    # 2. 测试 GET 请求
    print("\n2️⃣  测试 GET 请求...")
    result1 = api.get_anti_content()
    if result1 and result1.get('code') == 200:
        print("✅ GET 请求成功:")
        print(f"   anti_content: {result1['data']['anti_content']}")
    else:
        print("❌ GET 请求失败")
        print(json.dumps(result1, indent=2, ensure_ascii=False))
    
    # 3. 再次测试确保每次生成的结果不同
    print("\n3️⃣  再次测试 GET 请求（验证动态生成）...")
    time.sleep(0.1)  # 稍微等待确保时间戳不同
    result2 = api.get_anti_content()
    if result2 and result2.get('code') == 200:
        print("✅ GET 请求成功:")
        print(f"   anti_content: {result2['data']['anti_content']}")
        if result1['data']['anti_content'] != result2['data']['anti_content']:
            print("   ✓ 每次生成的内容不同（正常）")
    else:
        print("❌ GET 请求失败")
    
    # 4. 第三次测试
    print("\n4️⃣  第三次测试 GET 请求...")
    result3 = api.get_anti_content()
    if result3 and result3.get('code') == 200:
        print("✅ GET 请求成功:")
        print(f"   anti_content: {result3['data']['anti_content'][:60]}...")
    else:
        print("❌ GET 请求失败")
    
    print("\n" + "=" * 60)
    print("✨ 测试完成！")
    print("=" * 60)


if __name__ == "__main__":
    main()
