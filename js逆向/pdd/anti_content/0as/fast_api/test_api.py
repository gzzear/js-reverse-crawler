"""
PDD Anti-Content FastAPI 测试脚本
"""
import requests
import json
import time


class AntiContentAPI:
    """Anti-Content API 客户端"""
    
    def __init__(self, base_url="http://localhost:8000"):
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
        """获取 anti_content"""
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
    print("🧪 PDD Anti-Content FastAPI 测试")
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
        print("💡 启动命令: ./start.sh")
        return
    
    # 2. 测试 GET 请求
    print("\n2️⃣  测试 GET 请求...")
    result1 = api.get_anti_content()
    if result1 and result1.get('code') == 200:
        print("✅ GET 请求成功:")
        print(f"   anti_content: {result1['data']['anti_content'][:60]}...")
        print(f"   完整长度: {len(result1['data']['anti_content'])} 字符")
    else:
        print("❌ GET 请求失败")
        if result1:
            print(json.dumps(result1, indent=2, ensure_ascii=False))
    
    # 3. 再次测试
    print("\n3️⃣  再次测试 GET 请求（验证动态生成）...")
    time.sleep(0.1)
    result2 = api.get_anti_content()
    if result2 and result2.get('code') == 200:
        print("✅ GET 请求成功:")
        print(f"   anti_content: {result2['data']['anti_content'][:60]}...")
        if result1 and result1['data']['anti_content'] != result2['data']['anti_content']:
            print("   ✓ 每次生成的内容不同（正常）")
    else:
        print("❌ GET 请求失败")
    
    # 4. 性能测试
    print("\n4️⃣  性能测试（10次请求）...")
    start_time = time.time()
    success_count = 0
    for i in range(10):
        result = api.get_anti_content()
        if result and result.get('code') == 200:
            success_count += 1
    end_time = time.time()
    
    print(f"✅ 完成 10 次请求:")
    print(f"   成功: {success_count}/10")
    print(f"   总耗时: {end_time - start_time:.2f} 秒")
    print(f"   平均耗时: {(end_time - start_time) / 10:.3f} 秒/次")
    
    print("\n" + "=" * 60)
    print("✨ 测试完成！")
    print("=" * 60)
    print("\n💡 提示:")
    print("   - API 文档: http://localhost:8000/docs")
    print("   - ReDoc: http://localhost:8000/redoc")
    print("   - 健康检查: http://localhost:8000/health")


if __name__ == "__main__":
    main()
