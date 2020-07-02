# Flutter windows 10 安装
官网：https://flutter.dev/docs/get-started/install/windows
## 配置环境变量
```
PUB_HOSTED_URL=https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```
## 获取Flutter SDK
如果官网地址不可用，可用git下载

```s
git clone https://github.com/flutter/flutter.git -b stable
```

如果两种方式太慢，可使用国内镜像下载，可参考 [flutter国内镜像和下载地址集合](https://www.awaimai.com/2835.html)
```
https://mirrors.tuna.tsinghua.edu.cn/flutter/flutter_infra/releases/stable/
```

下载好后，将 flutter 解压，为避免权限问题，这里将文件放入 `C:/src/flutter` 下。

## 设置环境变量

要在终端运行 `flutter` 命令，需要添加环境变量。

`控制面板\系统和安全\系统` 中点击高级系统设置 - 环境变量 - 系统变量中找到 path，添加 `flutter/bin` 全路径，这里是 `C:\src\flutter\bin`

重启Windows以应用此更改。

## 运行 flutter doctor
flutter 需要安装一些依赖，确认一些协议，可以运行 `flutter doctor` 按照提示操作。

同意协议，安装 android studio 及模拟器用于安卓开发。

### 安装 VS Code 及其插件
VS Code: 轻量级编辑器，支持Flutter运行和调试.

#### 安装 VS Code
[VS Code](https://code.visualstudio.com/), 安装1.20.1或更高版本.

#### 安装Flutter插件
1. 启动 VS Code
2. 调用 `View>Command Palette…` 或快捷键 `Ctrl + Shift + P`
3. 输入 ‘install’, 然后选择 `Extensions: Install Extension`
4. 在搜索框输入 `flutter` , 在搜索结果列表中选择 ‘Flutter’, 然后点击 `Install`
5. 选择 ‘OK’ 重新启动 VS Code

#### 通过Flutter Doctor验证您的设置
1. 调用 `View>Command Palette…`
2. 输入 ‘doctor’, 然后选择 `‘Flutter: Run Flutter Doctor’`
3. 查看“OUTPUT”窗口中的输出是否有问题

## 起步: 体验

### 创建新的应用
1. 启动 VS Code
2. 调用 `View>Command Palette…` 或快捷键 `Ctrl + Shift + P`
3. 输入 ‘flutter’, 然后选择 `‘Flutter: New Project’`
4. 输入 Project 名称 (如 `myapp` ), 然后按回车键
5. 指定放置项目的位置，然后按蓝色的确定按钮
6. 等待项目创建继续，并显示 `main.dart` 文件

上述命令创建一个 Flutter 项目，项目名为 `myapp`，其中包含一个使用 Material 组件的简单的演示应用程序。

在项目目录中，您的应用程序的代码位于 `lib/main.dart`.

### 运行应用程序
1. 确保在VS Code的右下角选择了目标设备
2. 按 F5 键或调用 `Debug>Start Debugging`
3. 等待应用程序启动
4. 如果一切正常，在应用程序建成功后，您应该在您的设备或模拟器上看到应用程序:

![Flutter Demo](https://cdn.superwen.cn/halo/10d30ecffc4d54071551e0e12da7ee8d.png)

## 练习
[编写您的第一个 Flutter App](https://flutterchina.club/get-started/codelab/)

## Q&A
遇到的问题记录
### 卡在 Flutter get
环境：windows10、flutter 1.17.4、VS Code 1.46.1

按照官网教程安装 english_words 结果一直卡在 packages get 的 loading 状态。

先说结论： english_words 单词拼错导致一直无法安装成功。

开始以为镜像的问题，官方地址太慢，或者被墙。网上搜到的也都是更换镜像源，于是换镜像，地址用的是[flutter国内镜像和下载地址集合](https://www.awaimai.com/2835.html)中的清华大学镜像。

```
PUB_HOSTED_URL=https://mirrors.tuna.tsinghua.edu.cn/dart-pub
FLUTTER_STORAGE_BASE_URL=https://mirrors.tuna.tsinghua.edu.cn/flutter
```

结果还是很慢。

使用编辑器自动更新的时候，看不到日志，想取消通过命令行来获取，结果出现：
```
Waiting for another flutter command to release the startup lock...
```

此时需要打开 flutter/bin/cache/lockfile，删除就行了

可能会出现被另一个程序占用，无法删除，打开任务管理器，删除 dart.exe 即可。

此时在命令行中运行 `flutter packages get`，显示：
```
Because startup_namer depends on englist_words any which doesn't exist (could not find package englist_words at https://mirrors.tuna.tsinghua.edu.cn/dart-pub), version solving failed.
pub get failed (server unavailable) -- attempting retry 1 in 1 second...
```

可以确认镜像更换成功了，一直没有安装成功是因为 englist_words 不存在。 单词拼错，改为 english_words 解决。。
