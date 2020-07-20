## 需要的工具

-   Git
-   PHP
-   Arcanist

## Git

### 安装

首先安装 `brew`，如果已安装 `brew`，这步跳过。

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

然后使用 `brew` 来安装 git

```bash
brew install git
```

检查确认
安装完成后，执行 `git --version`,观察到如下输出即证明安装成功：
![git](https://cdn.superwen.cn/halo/07efbaf194ab66bdb82cda37f5a514e3.png)

## PHP

macOS 默认安装有 PHP，执行 `php -v` 检查确认。
![php](https://cdn.superwen.cn/halo/bb2e188358cf09a1978b23ae407cab99.png)
如果没有安装，同样可以使用 brew 进行安装 `brew install php`。

## Arcanist

### 1.安装

终端执行：

```bash
cd ~ && mkdir arc && cd arc # cd到想保存arc文件的目录
git clone https://github.com/phacility/libphutil.git #克隆工具库
git clone https://github.com/phacility/arcanist.git #克隆Arcanist
```

### 2. 配置环境变量

终端执行：

```bash
echo 'export PATH=$PATH:~/arc/arcanist/bin' >> ~/.zshrc # 设置环境变量默认自启
source ~/.zshrc # 重启 .zshrc
```

注意文件路径为 arc 目录。

### 3. 检查确认

接着执行 `arc version` 观察到如下输出即证明 Arcanist 安装成功。

```
arcanist 65cda1596f25bb9daea1d78c46402ab61df073d5 (9 Jul 2020)
```

## 配置文本编辑器

在提交代码审查的过程中，需要输入或编辑大块的文本。默认的编辑器为 vim，不是特别友好。Arcanist 支持配置图形化的文本编辑器，如 VS Code。

配置编辑器为 VS Code:

```
arc set-config editor "code"
```

但是经过实测，因为我的编辑器就是 VS Code，而 arc 需要完全退出编辑器才可以，所以这里编辑器应该配置成其它，如 vim、Sublime Text、Notepad 等。