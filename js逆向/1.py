import anthropic

# 1. 填入你的 MiniMax 信息
# 注意：即便这里是 MiniMax 的 Key，SDK 也会把它当做身份凭证
MY_MINIMAX_KEY = "sk-cp-u2Gyn_kmJGXg37Wy6H2xJjkta9SzJfrRRNw3zdWXrQIgA1HNeiLHg2Lu3K6DKDYz-CsMXyTCgZkuRev_Lkp2-QPIoLj9glhoKX2R5RDSE7dpRCO4PLp-wWs"
MY_GROUP_ID = "2017421807203651981"

client = anthropic.Anthropic(
    api_key=MY_MINIMAX_KEY,  # 必须显式传入，解决 TypeError
    base_url="https://api.minimaxi.io/anthropic/", # 指向 MiniMax 代理地址
    default_headers={
        "x-minimax-group-id": MY_GROUP_ID  # MiniMax 必须的 Header
    }
)

try:
    message = client.messages.create(
        model="MiniMax-M2.1",
        max_tokens=1000,
        messages=[
            {
                "role": "user",
                "content": "Hi, how are you?"
            }
        ]
    )

    for block in message.content:
        # MiniMax 返回的 block 对象可能只有 text 属性
        if hasattr(block, 'text'):
            print(f"Assistant: {block.text}")

except anthropic.AuthenticationError:
    print("认证失败 (401)：请确认你的 MiniMax Key 是否有效，且账户是否有余额。")
except Exception as e:
    print(f"发生错误：{e}")