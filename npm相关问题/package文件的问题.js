// ==================================================================
// ==                           依赖配置                           ==
// ==================================================================

/**
 * dependencies
 * 运行依赖，也就是项目生产环境下需要用到的依赖
 *  
 * npm install xxx 
 * yarn add xxx
 * pnpm add 
 */

/**
 * devDependencies
 * 
 * 开发依赖，项目开发环境需要用到而运行时不需要的依赖，用于辅助开发，
 *   通常包括项目工程化工具比如 webpack，vite，eslint 等。
 * npm install xxx --save-dev
 * yarn add xxx -dev
 * pnpm add -D  xxx
 */

/**
 * peerDependencies
 * 
 * 同伴依赖，一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者。
 * 
 * 简单点说：用于表示与另外一个包的依赖关系
 * 
 * npm install xxx --save-peer
 * yarn add xxx --peer
 * pnpm 没有找到
 */

/**
 * optionalDependencies
 * 
 * 可选依赖，顾名思义，表示依赖是可选的，
 * 它不会阻塞主功能的使用，安装或者引入失败也无妨。这类依赖如果安装失败，那么 npm 的整个安装过程也是成功的。
 * 
 * npm install xxx --save-optional
 * yarn 没找到
 * pnpm add xxx -O
 */

/**
 * bundleDependencies
 * 
 * 打包依赖。它的值是一个数组，在发布包时，bundleDependencies 里面的依赖都会被一起打包。
 * 
 * 在执行 npm pack 打包生成 tgz 压缩包中，将出现 node_modules 并包含 react 和 react-dom。
 *  需要注意的是，这个bundleDependencies数组中的值必须是在 dependencies，devDependencies 两个里面声明过的依赖才行。
 */



/**
 * package-lock.json 它会在 npm 更改 node_modules 目录树 或者 package.json 时自动生成的 
 *   它准确的描述了当前项目npm包的依赖树，
 *   并且在随后的安装中会根据 package-lock.json 来安装，保证是相同的一个依赖树
 *   使用 npm install时候，会自动生成一个package-lock.json文件
 * 
 * 
 * main：它定义了项目的入口点，通常是用于启动项目的文件。
 *  require 返回的 main 字段中所列出的文件的 module.exports 属性。
 *  如果不设置 main 字段，那么入口文件就是根目录下的 index.js。
 * 
 * 
 * type: module/commonjs  
 *   在 node 支持 ES 模块后，要求 ES 模块采用 .mjs 后缀文件名。只要遇到 .mjs 文件，就认为它是 ES 模块。
 *   如果不想修改文件后缀，就可以在 package.json文件中，指定 type 字段为 module。
 * 
 * types: 或者 typings 
 *   指定 TypeScript 的类型定义的入口文件
 *   
 * 
 * browser
 *  main 字段里指定的入口文件在 browser 和 Node 环境中都可以使用。
 *  如果只想在 web 端使用，不允许在 server 端使用，可以通过 browser 字段指定入口
 * 
 * module
 *   项目指定 ES 模块的入口文件
 * 
 * publishConfig
 *   publishConfig 就是 npm 包发布时使用的配置。
 *  比如在安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry。
"publishConfig": {
  "registry": "https://registry.npmjs.org/"
}
 * 
 * 这样的好处就是不用来回切换源了
 * 
 * exports
 *   node v14版本
 *   exports 字段可以配置不同环境对应的模块入口文件，并且当它存在时，它的优先级最高。
 *   exports 还限制了使用者不可以访问未在 "exports" 中定义的任何其他路径。
 * 
 *   下面使用 require 和 import 字段根据模块规范分别定义入口：
*/

{
  "exports": {
    "require": './index.js',
      "import": './dist/index.js'
  }
}

// 还可以这样
"exports": {
  ".": {
    "require": "./index.js",
      "import": "./index.mjs"
  }
}
// 为什么要加一个层级，把 require 和 import 放在 "." 下面呢？
// 因为 exports 除了支持配置包的默认导出，还支持配置包的子路径。

// 例如
{
  ".": {
    "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
        "require": "./dist/index.cjs"
  },
  "./helpers": {
    "types": "./dist/helpers.d.ts",
      "import": "./dist/helpers.mjs",
        "require": "./dist/helpers.cjs"
  }
}

// 使用
// import './helpers'  or require('./helpers')

/**
 * workspaces： 
 *   用于在本地的根目录下管理多个子项目。
 * 
 * workspaces: [
 *   "workdspace-a"
 * ]
 * 表示在 workspace-a 目录下还有一个项目，它也有自己的 package.json。
 * 
 * 
 * 通常子项目都会平铺管理在 packages 目录下,所以根目录下 workspaces 通常配置为：
 * workspaces: [
 *  "packages/*"
 * ]
 * 
 * 
 * config 用于设置 scripts 里的脚本在运行时的参数
 * 
 * {
 *   config: {
 *     port: "3031" 
 *   }
 * }
 * 
 * 以通过 npm_package_config_port 这个变量访问到 3001。
 * 
 * overrides 
 *   overrides 可以重写项目依赖的依赖
 * 
 * browserslist
 *   设置项目的浏览器兼容情况。
 *   当然也可以使用 .browserslistrc 单文件配置。
 * 
 * unpkg
 *   可以让 npm 上所有的文件都开启 CDN 服务。
 *
 * engines
 *   一些项目由于兼容性问题会对 node 或者包管理器有特定的版本号要求，
"engines": {
  "node": ">=14 <16",
  "pnpm": ">7"
}
 * 
 * 参考：https://juejin.cn/post/7145759868010364959#heading-16
 */