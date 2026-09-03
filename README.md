# 圣经之声：GitHub Pages 部署版

这是一个不需要服务器、不需要安装软件的静态音频网站。播放器、手机适配和 GitHub Pages 自动部署已经配置完成。

## 一、加入图片

把 5 张图片放入 `assets/images/`。

| 文件名 | 显示位置 |
| --- | --- |
| `1.png` | 首页大背景图 |
| `2.png` | “阅读”图片区 |
| `3.png` | “聆听”图片区 |
| `4.png` | “默想”图片区 |
| `5.png` | 五个章节播放按钮的封面图 |

如果图片不是这些名称，只需要打开根目录的 `config.js`，修改 `images` 里的文件名。

## 二、加入音频

把 5 个 MP3 放入 `assets/audio/`。

然后打开根目录的 `config.js`，在 `chapters` 中修改每一章的音频路径：

```js
audio: "assets/audio/你的音频文件名.mp3"
```

章节显示名称在同一个位置修改：

```js
title: "第1章 · 神的创造"
```

文件名可以使用中文和空格，但必须和真实文件名完全一致，包括括号和 `.mp3`。

## 三、部署到 GitHub Pages

1. 在 GitHub 新建一个空白仓库。
2. 解压本项目，把文件夹里面的全部内容上传到仓库的 `main` 分支。不要只上传最外层文件夹。
3. 打开仓库的 `Settings` → `Pages`。
4. 在 `Build and deployment` 的 `Source` 中选择 `GitHub Actions`。
5. 打开仓库的 `Actions` 页面，等待 `Deploy website to GitHub Pages` 变成绿色。
6. 回到 `Settings` → `Pages`，即可看到网站网址。

以后修改图片、音频或 `config.js` 并上传到 `main` 分支，网站会自动更新。

## 本地预览

直接双击 `index.html` 即可预览页面。部分浏览器对本地音频有限制；部署到 GitHub Pages 后即可正常播放。
