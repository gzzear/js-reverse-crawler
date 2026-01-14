# selenium4

### 引入

```python
pip install selenium
```

```python
chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option('useAutomationExtension', False)
chrome_options.add_experimental_option("excludeSwitches", ['enable-automation'])
service = Service('/Users/gaozhe/Desktop/chromedriver-mac-arm64/chromedriver')
driver = webdriver.Chrome(service=service, options=chrome_options)
```

国内镜像下载

https://registry.npmmirror.com/binary.html?path=chrome-for-testing/



### 配置项相关

```python
import time

from selenium import webdriver
from selenium.webdriver.chrome.service import Service

# 配置相关
chrome_options = webdriver.ChromeOptions()
# 无头模式: 可以在后台运行
chrome_options.add_argument('--headless')
# 设置代理
chrome_options.add_argument('--proxy-server=http://123.33.251.23:8080')
# 设置浏览器大小
chrome_options.add_argument('--window-size=1920x1080')
# 禁用浏览器通知
chrome_options.add_argument('--disable-notifications')
# 设置浏览器user-agent
chrome_options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36')
# 禁用拓展程序
chrome_options.add_argument('--disable-extensions')
# 禁止自动化提示
chrome_options.add_experimental_option('useAutomationExtension', False)
chrome_options.add_experimental_option("excludeSwitches", ['enable-automation'])
# 禁止自动化控制接口实现防止被检测
chrome_options.add_argument('--disable-blink-features=AutomationControlled')

service = Service('/Users/gaozhe/Desktop/chromedriver-mac-arm64/chromedriver')
driver = webdriver.Chrome(service=service, options=chrome_options)
driver.get('https://www.89ip.cn/')
time.sleep(5)
driver.close()
```





### 访问网站

get方法

```python
import time

from selenium import webdriver
from selenium.webdriver.chrome.service import Service

service = Service('/Users/gaozhe/Desktop/chromedriver-mac-arm64/chromedriver')
driver = webdriver.Chrome(service=service)
driver.get('https://baidu.com')
time.sleep(3)
driver.close()
```



### 获取网页源代码

```python
driver.get('https://baidu.com')
time.sleep(5)
sel = Selector(text=driver.page_source)
print(sel.xpath("//meta[@name='description']/@content").extract_first())
```



### 执行js

```python
js_code = 'var a = navigator.webdriver;alert(a)'
driver.execute_script(js_code)
```









 

### 查找元素

在selenium4中，一系列的`findElement`方法如`findElementByClassName`、`findElementById`等都被整合成为了一个方法——`findElement`。并且通过`By.method`来选择你的查找元素方法，例如下。

如果你想根据类名查找元素，你可以使用以下方法，

```python
driver.findElement(By.className("className"));
```

如果你想通过[css选择器](https://so.csdn.net/so/search?q=css选择器&spm=1001.2101.3001.7020)来查找元素，你可以使用以下方法，

```python
driver.findElement(By.cssSelector(".className"));
```

这里贴出与以往对应的所有查找元素方法，更新前:

```python
driver.findElementByClassName("className");
driver.findElementByCssSelector(".className");
driver.findElementById("elementId");
driver.findElementByLinkText("linkText");
driver.findElementByName("elementName");
driver.findElementByPartialLinkText("partialText");
driver.findElementByTagName("elementTagName");
driver.findElementByXPath("xPath");
```

更新后:

```python
driver.find_element(By.XPATH,'XPATH')
driver.find_element(By.CLASS_NAME,'CLASS_NAME')
driver.find_element(By.CSS_SELECTOR,'CSS_SELECTOR')
driver.find_element(By.ID,'ID')
driver.find_element(By.LINK_TEXT,'LINK_TEXT')
driver.find_element(By.PARTIAL_LINK_TEXT,'PARTIAL_LINK_TEXT')
driver.find_element(By.TAG_NAME,'TAG_NAME')
```

如果你查找的是`多个元素`，只需要将其中的`find_element`替换成`find_elements`即可。



### 查询iframe中的元素

需要切换为iframe查询模式

```python
iframe = driver.find_element(by=By.XPATH, value="//iframe[@src='//accounts.douban.com/passport/login_popup?login_source=anony']")
driver.switch_to.frame(iframe)
```

切换回来:

```python
driver.switch_to.default_content()
```



### 获取属性、文本值

>  获取文本值

```python
driver.get('https://www.89ip.cn/')
time.sleep(5)
ip_items = driver.find_elements(By.XPATH, '//tr/td[1]')
for ip_item in ip_items:
    print(ip_item.text)
driver.close()
```



> 获取属性

```python
driver.get('https://www.89ip.cn/')
time.sleep(5)
ip_ele = driver.find_element(By.XPATH, "//table[@class='layui-table']")
print(ip_ele.get_attribute('class'))
driver.close()
```







### 等待元素出现

有时候某个元素不是直接出现的，如果不做判断则会导致程序崩溃，因此一般可以做异常处理，这里还有等待元素出现的方法。

首先，需要导入等待的包:

```python
from selenium.webdriver.support.ui import WebDriverWait
```

然后使用以下方法等待元素出现，`driver`就是浏览器驱动，`timeout`就是等待的时长，`until`后是判断元素是否出现的，

```python
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, 10)
element = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[@id='username']")))
```





### 动作API

动作API分为四个部分，分别是`键盘`、`鼠标`、`笔`、`滚轮`。这里先说明以下公共部分的。

#### 鼠标移动到元素上

```python
hoverable = driver.find_element(By.ID, "hover")
ActionChains(driver)\
        .move_to_element(hoverable)\
        .perform()
```



#### 暂停

光标移动，滚轮滚动期间，会有一些时间空隙，这里可以使用暂停来实现，这里是支持链式调用的，这里贴出官方给出的例子，

```python
clickable = driver.find_element(By.ID, "clickable")
ActionChains(driver)\
        .move_to_element(clickable)\
        .pause(1)\
        .click_and_hold()\
        .pause(1)\
        .send_keys("abc")\
        .perform()
```





#### 指定元素输入字符串

```python
text_input = driver.find_element(By.ID, "textInput")
ActionChains(driver)\
        .send_keys_to_element(text_input, "abc")\
        .perform()
```



#### 鼠标点击保持

```python
clickable = driver.find_element(By.ID, "clickable")
ActionChains(driver)\
        .click_and_hold(clickable)\
        .perform()
```





#### 鼠标位移

就是通过像素点来进行位移操作。

```python
ActionChains(driver).move_by_offset(10, 0).release().perform()
```





#### 截屏

```python
captcha_elem = driver.find_element(By.XPATH, '//*[@id="captcha"]')
captcha_elem.screenshot('captcha.png')
```





### 页面滚动

```js
window.scrollBy(x, y)	
window.scrollBy(0, 300)		# 运行一次就往y轴向下滚动300px
window.scrollTo(0, 300)		# 运行一次就往y轴向下滚动300px (一次到位)
```

```python
driver.get('https://www.89ip.cn/')
time.sleep(5)
# driver.execute_script("window.scrollTo(0, 300);")
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")    #滚动到底部
time.sleep(5)
driver.close()
```





### cookies操作

#### 获取cookies

```python
cookies = driver.get_cookies() 		#返回字典列表
driver.get_cookie('name')
cookie_dict = {cookie["name"]: cookie["value"] for cookie in cookies}
```





#### 设置cookies

```python
driver.get('https://baidu.com')
driver.add_cookie({'name': 'gaozhe', 'value': '1'})
print(driver.get_cookies())
driver.close()
```



