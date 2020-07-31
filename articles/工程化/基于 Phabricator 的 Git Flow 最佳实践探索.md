> Phabricator [官方文档](https://secure.phabricator.com/book/phabricator/)

## 简介

Phabricator : Facebook 出品的一个开发协作平台，可以方便的进行任务的指派、code review 等。
Git Flow: 基于 git，适用于客户端的开发，围绕着版本发布(release)为基础的一套工作流。
Arcanist: Phabricator 提供的 differential(code review)命令行工具。

Phabricator 本身使用的是 post-review 的工作流，对于 Git Flow 并没有很好的支持。想要在 Phabricator 上实现 Git Flow 需要做一些配置。另外，使用 `arc land` 合并代码时会将本地的分支直接删除，所以在实现 Git Flow 时我们会需要一些额外的 git 操作。

本文主要介绍基于 Phabricator 的 git 工作流。

## 安装

需要安装 Arcanist：

-   Windows 用户请参考 [Arcanist 环境的准备(for Windows)](https://secure.phabricator.com/book/phabricator/article/arcanist_windows/)
-   macOS 用户请参考 [Arcanist 环境的准备(for macOS)](https://github.com/hiblacker/blog-sources/blob/master/articles/%E5%B7%A5%E7%A8%8B%E5%8C%96/Arcanist%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%EF%BC%88for%20mac%EF%BC%89.md)

## 配置工程文件

> [官方配置文档](https://secure.phabricator.com/book/phabricator/article/arcanist_new_project/)

在工程的文件夹下创建文件 .arcconfig，添加配置

```json
{
    "phabricator.uri": "https://phabricator.example.com/",
    "base": "git:merge-base(origin/develop), arc:prompt",
    "arc.land.onto.default": "develop"
}
```

因为 Git Flow 的默认分支应该是 `develop`，所以我们需要调整 `arc diff` 和 `arc land` 的默认分支为 `develop`。

## Feature 开发

功能开发可以使用正常的 Git Flow 流程。

1. 基于 `develop` 检出 `feature` 分支
2. 完成开发之后使用 `arc diff` 提交 code review
3. code review 之后使用 `arc land` 合并代码至 `develop`

## Release 开发

Release 基于 `develop` ，但是最终必须合并到 `master` 分支上，所以除了在命令行里使用 `arc` 外还要手动操作 git。

1. 基于 `develop` 检出 `release` 分支
2. 开发完成之后使用 `arc diff` 提交 code review
3. code review 并且测试完成之后使用 `arc land` 合并代码至 `develop`
4. 使用 git 将 `develop` 分支合并到 `master`，基于合并的 `commit` 添加 Tag

## Hotfix 开发

Hotfix 是基于 `master` 分支的修复分支。

1. 基于 `master` (上一个发布版本)检出 `hotfix` 分支
2. 开发完成之后使用 `arc diff` 提交 code review (此时 `diff` 的内容为 `hotfix` 和 `master` 分支)
3. code review 并且测试完成之后使用 `arc land --onto master` 合并代码至 `master`
4. 在合并的 `commit` 上添加 Tag
5. 将 `master` 合并到 `develop` 分支

Phabricator 提供了完善的 code review 流程，我们只需要基于这一流程略加修改就可以在项目中实现 Git Flow 了。
