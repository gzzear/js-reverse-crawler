# ddddocr

### 引入

```python
pip install ddddocr -i https://pypi.tuna.tsinghua.edu.cn/simple
```



### 参数配置

```python
DdddOcr 类在实例化时可以接受一些参数来调整其行为，例如：

det: 是否启用检测功能，默认为 True。对于某些类型的验证码（如滑块验证码），你可能不需要启用检测功能。
ocr: 是否启用识别功能，默认为 True。
show_ad: 是否显示广告，默认为 True。在开发环境中，你可以通过将此参数设置为 False 来关闭广告。
```





### 识别验证码

```python
import ddddocr

# 实例化 DdddOcr
ocr = ddddocr.DdddOcr(show_ad=False)

# 读取图片文件
with open('code.png', 'rb') as f:
    img_bytes = f.read()

# 识别验证码
res = ocr.classification(img_bytes)

# 打印识别结果
print('识别的验证码是:', res)
```







### 识别滑块验证码

```python
ocr = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
with open('slider_image.png', 'rb') as f:
     target_bytes = f.read()
with open('bg_image.png', 'rb') as f:
     bg_image_bytes = f.read()

# slider_image.png表示小滑块的图片
# bg_image.png表示背景图片
res = ocr.slide_match(target_bytes, bg_image_bytes, simple_target=True)
print(f"OCR result: {res}")
print(f'滑块需要滑动的距离: {res["target"][0]}')
```

