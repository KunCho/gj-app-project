(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{643:function(n,e){n.exports='\x3c!--\ntitle: 发布网站 \nsort: 5\n--\x3e\n\n文档网站搞好之后，可以发布到 Github 中，可以部署到自己的服务器上面，Github 仓库提供一个 `gh-pages` 分支，用于静态资源托管，意味着你将静态页面生成`push` 到这个分支直接可以预览。下面简单的介绍发布到 GitHub 中预览的步骤。\n\n\n## 生成静态资源\n\n添加配置一条 `npm scripts`，通过命令运行生成静态资源\n\n```diff\n{\n  "name": "doc-example",\n  "description": "Describe doc-example here",\n  "scripts": {\n+    "build": "rdoc -d home,introduce,faq,example,about,github --build"\n    "start": "rdoc -d home,introduce,faq,example,about,github --clean"\n  },\n  "dependencies": {\n    "rdoc": "1.2.x"\n  },\n  "license": "MIT"\n}\n```\n\n运行命令生成静态资源，默认静态资源生成到，当前工程根目录下的 `.rdoc-dist` 目录\n\n⚠️  `.rdoc-dist` 目录为默认生成静态资源目录，建立文档目录的时候需要注意\n\n```shell\n$ npm run build\n```\n\n## 部署网站\n\n添加配置一条 `npm scripts`, 通过命令部署到对应的 `Github` 仓库中。\n\n```diff\n{\n  "name": "doc-example",\n  "description": "Describe doc-example here",\n  "scripts": {\n+    "deploy": "rdoc --publish <your repo url>",\n    "build": "rdoc -d home,introduce,faq,example,about,github --build"\n    "start": "rdoc -d home,introduce,faq,example,about,github --clean"\n  },\n  "dependencies": {\n    "rdoc": "1.2.x"\n  },\n  "license": "MIT"\n}\n```\n\n同时可以指定分支，默认推送到 `gh-pages`分支，配置实例如下：\n\n```shell\n$ rdoc --publish https://github.com/react-doc/react-doc.github.io.git --branch master\n```\n\n如果全局安装了 `rdoc` 工具，直接可以将上面命令放到命令行运行，记得在项目的根目录下运行哦。\n'}}]);