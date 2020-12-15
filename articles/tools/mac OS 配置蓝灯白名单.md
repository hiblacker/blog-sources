# mac OS 配置蓝灯白名单

## 问题
蓝灯配置页面没有白名单相关配置，导致访问公司内网时总是失败。

## 解决方案
通过配置苹果自带的代理实现：

1. 点击网络 Network
![b65f31ddd8fd22b5cc71d5685841436d1608014640.jpg](https://github.com/hiblacker/blog-sources/raw/master/images/b65f31ddd8fd22b5cc71d5685841436d1608014640.jpg)

2. 点击高级设置 Advanced...
![0c852d6eb62a707670e8188dda98ab241608014722.jpg](https://github.com/hiblacker/blog-sources/raw/master/images/0c852d6eb62a707670e8188dda98ab241608014722.jpg)

3. 点击代理 Proxy，填写白名单
![e111900be48abbdf8b587ae4eb0d98cd1608014945.jpg](https://github.com/hiblacker/blog-sources/raw/master/images/e111900be48abbdf8b587ae4eb0d98cd1608014945.jpg)

4. ok 保存、apply 应用


## 白名单语法
- 绕过单个域名: apple.com
- 要绕过域名上的所有网站，请在域名前加星号: *apple.com
- 若要绕过域的特定部分，请指定每个部分: store.apple.com

上面是苹果的说明，实际操作我想绕过主域名为 nion.com 的所有二级域名，比如 wiki.nion.com，需要配置成 *.nion.com