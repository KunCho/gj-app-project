(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{640:function(n,e){n.exports='\x3c!--\ntitle: 主题定制API\nsort: 3\n--\x3e\n\n## 全局变量\n\n全局变量 `__project_root__` 通常用于模板中懒加载 `markdown` 文件，例如：\n\n> 生成的缓存序列化文件，将被存放到当前目录下的 `.cache/md` 目录中。\n\n```js\n// 加载高亮库\nimport hljs from \'highlight.js\';\n\n// filename 处理很重要\n// Markdown文件被处理成 `doc___fed___react___component-and-props.md` 这样,\n// 路径以下划线间隔避免重复，所以 要获取路径得 通过 props.page.routeData 中获取 relative 路径来处理\nconst filename = \'\';\n// 加载 Markdown 文件，\nimport(`__project_root__/.cache/md/${filename}.md`).then((data) => {\n  this.setState({\n    markdown: data,\n  }, () => {\n    // 找到当前组件根节点，循环code, \n    // 对code里面的代码进行高亮\n    let code = ReactDOM.findDOMNode(this);\n    code = code.getElementsByTagName(\'code\');\n    for (let i = 0; i < code.length; i += 1) {\n      if (code[i].parentNode && code[i].parentNode.tagName === \'PRE\') {\n        hljs.highlightBlock(code[i]);\n      }\n    }\n  });\n});\n```\n\n## Markdown 文件索引\n\n那你需要建立一个 `替身` 文件 `rdoc.tree.data.json`，引用替身文件，就可以获取到目录索引内容，这个在编译的时候会自动返回文件索引的 `json`。\n\n> ⚠️ 替身文件名字，必须取名 `rdoc.tree.data.json`。   \n> ⚠️ 这个文件是必须建立，引用，这样可以渲染菜单。  \n> ⚠️ rdoc v1.3.0 以后版本不需要，如果你有同名文件会被替换成，Markdown 文件索引。  \n> ⚠️ Markdown 文件索引，会在入口函数传入。\n\n```js\nimport menuSource from \'./rdoc.tree.data.json\';\n```\n\n## 模板入口\n\n```js\nimport BaseLayout from \'./layout/BasicLayout\';\nimport Loading from \'./component/Loading\';\n\nexport default function (Lazyload, props) {\n  if (props.routeData && props.routeData.length > 0) {\n    props.routeData.map((item) => {\n      item.component = Lazyload({\n        component: () => import(\'./routes/Pages\'),\n        LoadingComponent: Loading,\n      });\n      return item;\n    });\n  }\n  return <BaseLayout {...props} />;\n}\n```\n\n## 两个入口参数\n\n`props` 提供路由索引，和 Markdown 文件索引信息。`Lazyload` 为懒加载方法。\n\n### Lazyload\n\n文档工具包 [react-dynamic-loadable](https://github.com/jaywcjlove/react-dynamic-loadable) 提供的，懒加载方法，下面方法为路由添加 `component` 并传入相应参数。\n\n```js\nprops.routeData.map((item) => {\n  item.component = Lazyload({\n    component: () => import(\'./routes/Pages\'),\n    LoadingComponent: Loading,\n  });\n  return item;\n});\n```\n\n### props\n\n```js\n{\n  history: {length: 50, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …},\n  location: {pathname: "/introduce/api/theme-api", search: "", hash: "", state: undefined},\n  match: {path: "/", url: "/", params: {…}, isExact: false},\n  menuSource: [{…}, {…}, {…}, {…}, {…}],\n  routeData: [{…}, {…}, {…}, {…}, {…}],\n  staticContext: undefined\n}\n```\n\n#### props.menuSource\n\n> path 你 Markdown 的全路径  \n> name 文件夹或者文件的名称  \n> type 当前节点是一个文件夹还是一个文件`file|directory`  \n> extension 类型为`file`的后缀  \n\n> **根据文件索引出来的参数**  \n> \n> relative 相对于你指定的路径  \n> routePath 路由路径  \n> isEmpty  \n> size 文件大小  \n> mdconf 是你在 Markdown中定义的参数  \n\n> **Markdown手动配置的参数**  \n> \n> sort 排序  \n> title 标题  \n> visible 是否隐藏菜单  \n\n```json\n[\n  {\n    "path": "/Users/mac/doc-example/index",\n    "name": "index",\n    "children": [\n      {\n        "path": "/Users/mac/doc-example/index/README.md",\n        "name": "README.md",\n        "relative": "/index/README.md",\n        "mdconf": {\n          "title": "首页",\n          "layout": "IndexLayout",\n          "visible": "true",\n          "logo": "/introduce/assets/react-logo.svg"\n        },\n        "isEmpty": false,\n        "size": 1821,\n        "extension": ".md",\n        "type": "file",\n        "title": "首页",\n        "sort": 0,\n        "routePath": "/index/README",\n        "article": "index"\n      }\n    ],\n    "size": 1821,\n    "type": "directory",\n    "mdconf": {\n      "title": "首页",\n      "layout": "IndexLayout",\n      "visible": "true",\n      "logo": "/introduce/assets/react-logo.svg"\n    },\n    "props": {\n      "path": "/Users/mac/doc-example/index/README.md",\n      "name": "README.md",\n      "relative": "/index/README.md",\n      "isEmpty": false,\n      "size": 1821,\n      "extension": ".md",\n      "type": "file"\n    },\n    "sort": 0,\n    "routePath": "/index",\n    "article": "index"\n  }\n]\n```\n\n#### props.routeData\n\n> props 文档配置及其信息  \n> path 路由信息，配合 `React Router` 使用  \n> relative 路径，从项目的，根目录开始，主要用于读取 Markdown 组合 Markdown 的文件名字  \n\n```json\n[\n  {\n    "path": "/introduce/api",\n    "mdconf": {\n      "title": "API",\n      "sort": "3"\n    },\n    "props": {\n      "path": "/Users/mac/doc-example/introduce/api/README.md",\n      "name": "README.md",\n      "relative": "/introduce/api/README.md",\n      "isEmpty": true,\n      "size": 27,\n      "extension": ".md",\n      "type": "file"\n    },\n    "article": "introduce",\n    "title": ""\n  },{\n    "path": "/index",\n    "mdconf": {\n      "title": "首页",\n      "layout": "IndexLayout",\n      "visible": "true",\n      "logo": "/introduce/assets/react-logo.svg"\n    },\n    "props": {\n      "path": "/Users/mac/doc-example/index/README.md",\n      "name": "README.md",\n      "relative": "/index/README.md",\n      "isEmpty": false,\n      "size": 1821,\n      "extension": ".md",\n      "type": "file"\n    },\n    "article": "index",\n    "title": ""\n  },\n]\n```\n\n## BaseLayout\n\n这个是定于的主框架模板，俗称通用布局，主要用于定制头部右边，不常变换的内容，你可以定义多个 `Layout`, 例如你定义 `Markdown` 参数，根据参数加载不用样式的通用布局。\n\n\n## 默认依赖包\n\n工具基础的前端包工具，制作主题需要安装依赖包，提供一个实例 [rdoc-theme-load-react](https://github.com/react-doc/rdoc-theme-load-react)。\n\n```bash\n{\n  "classnames": "2.2.5",\n  "highlight.js": "9.12.0",\n  "prop-types": "15.6.0",\n  "react": "16.2.0",\n  "react-dom": "16.2.0",\n  "react-markdown": "3.1.3",\n  "react-router-dom": "4.2.2",\n}\n```\n'}}]);