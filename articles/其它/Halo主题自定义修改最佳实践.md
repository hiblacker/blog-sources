# Halo 主题自定义修改最佳实践

本文记录 Halo 博客系统的主题自定义修改的最佳实践，本文以 Pinghsu 主题为例，记录如何修改主题，并通过 node 脚本优化。可能有些片面，如果有不恰当的地方，欢迎指正。

## 环境

-   macOS Catalina 10.15.5
-   Halo 1.3.1
-   数据库 H2 1.4.196 (2017-06-10)
-   主题：[Pinghsu Theme](https://github.com/chakhsu/pinghsu)

## 思路

本文最终目标，简单三步修改主题：本地修改 -> 部署到 Github -> 后台更新主题。具体：

1. 下载 Halo 安装包，本地运行，以查看主题修改效果。
2. 安装 Pinghsu 主题。
3. 修改主题，查看效果。
4. 打包部署。
5. 第一次修改后台需要安装自己修改的主题，后续可以直接更新。
6. 线上验证。

## 实践

我修改后的 [主题地址](https://github.com/hiblacker/halo-theme-pinghsu.git)。 截止目前 2020-7-20，我的修改：

-   添加日志页面
-   文章页底部分享删除
-   文章字体大小由 14px 改为 16px
-   首页文章 `hover` 时的样式优化
-   归档页去掉 `post-list-item` `hover` 时的放大效果，Windows 下会模糊
-   归档页将 `a` 标签的范围扩大到线框内可点
-   fix bug: 文章内部分 `a` 标签没有下划线，无法区分是否为可点链接。

## 具体实现

### 1. 本地运行 Halo

按照官方[安装指南](https://halo.run/archives/install-quick-start.html)在本地运行。

### 2. 主题安装

这里修改的主题是 Pinghsu，将主题 Fork，作为以后自定义主题的仓库。

修改 `theme.yaml` 的 `id` 和 `name`，避免和原主题冲突。

去本地后台安装主题，这里是 http://127.0.0.1:8090/admin/index.html#/interface/themes

点击右下角 `+` 选中远程拉取，地址是上面我们 Fork 后的 Git 仓库。耐心等待下载完成。

如果无法下载可以在命令行克隆，复制到 `~/.halo/templates/themes` 下。

用编辑器打开主题文件，修改样式，验证是否成功。

### 3. 更新

样式改完，本地调试通过后将代码 push 到 github。

首次更新需要安装主题，在线上后台的 `外观 / 主题` 页面，点击右下角 `+`，选中远程拉取，地址是上面我们 Fork 后的 Git 仓库。

后续的修改只需要点击 `更多` 进行在线更新即可。

改完后去博客验证修改是否成功，如果没看到效果，有可能是缓存导致，尝试清缓存刷新。

## 优化

### CSS 样式修改

最简单的方式就是在样式文件内最底部写新样式，覆盖之前的样式，或者重新创建 css 文件，放在最后加载，覆盖之前样式。改的少还好说，改的多必然会带来渲染性能问题，页面会‘闪动’，不是长久之计。

建议在原样式基础上修改，以 Pinghsu 为例，原作者不再维护，问了 Halo 作者（ruibaby），也表示没有 CSS 源码，所以这里只能对压缩后的文件格式化，改完后再打包压缩部署。

关于打包压缩，写了个 node 自动化，主要包括样式前缀补全、压缩代码，这样修改完代码后，只需执行 `yarn build` 即可，参考代码：

```js
const path = require("path");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const precss = require("precss");
const fs = require("fs");
const cssnano = require("cssnano");

const config = {
    input: "../source/css/style.css",
    output: "../source/css/style.min.css",
};

const outputDir = path.resolve(__dirname, config.output);
const inputDir = path.resolve(__dirname, config.input);

fs.readFile(inputDir, (err, css) => {
    postcss([precss, autoprefixer])
        .process(css, { from: inputDir, to: outputDir })
        .then((result) => {
            cssnano.process(result.css).then((res) => {
                fs.writeFileSync(outputDir, res.css);
            });
        });
});
```

[仓库地址](https://github.com/hiblacker/halo-theme-pinghsu)
