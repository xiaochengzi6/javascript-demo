/**
 * 版本号由三部分组成：major.minor.patch，主版本号.次版本号.修补版本号(补丁)。
 * 比如：1.2.1
 * 
 * 主要版本的更改代表了一个破坏兼容性的大变化
 * 
 * 次要版本的更改表示不会破坏任何内容的新功能。
 * 
 * 补丁中的更改表示不会破坏任何内容的错误修复。
 * 
 * 
 * 其实还有一个预版本号
 *  1.0.0-0
 *  主版本号(major).次版本号(minor).修订号(patch)-预发布号(release)
 * 
 * npm version major 
 * npm version minor 
 * npm version patch 
 * 
 * npm version prerelease 
 * 
 * npm version pre + major/minor/path 为发布xx版本但保留预版本号
 * 
 * 
 * ~ 会匹配最近的小版本依赖包，比如 ~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0
 * 
 * ^ 会匹配最新的大版本依赖包，比如 ^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0
 * 
 * * 安装最新版本的依赖包，比如 *1.2.3 会匹配 x.x.x
 * 
 */



/**
 * 使用 only-allow 就是再强制使用特定的包管理器
 * 
 * 强制使用 npm
 * preinstall: "npx only-allow npm"
 * 
 * 强制使用 pnpm 
 * preinstall: "npx only-allow pnpm"
 */

