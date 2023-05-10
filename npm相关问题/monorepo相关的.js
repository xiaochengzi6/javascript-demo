/**
 * monorepo 是什么
 *   是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，
 *     并提供更好的可重用性和协作性
 * 
 * 存在的问题：
 *   1. 多个项目再一个仓库中，其中一个项目出现问题，依赖它的项目都要去修改
 *   2. 项目的体积增大
 * 
 * 使用 npm 或 yarn 管理 monorepo 
 *  npm or yarn 下载依赖 由于为了解决文件较深层次引用的问题，它会将其打平，也就是说
 *  node_modules 文件夹会存放依赖文件以及间接依赖文件(依赖文件的依赖文件)
 *  这也就是所谓的 依赖提升 当删除依赖文件时，间接依赖文件并不会删除
 *  随着项目增大时间增长 node_modules 也会越来越大 
 * 
 *  这个问题可以使用 pnpm 去解决
 * 
 * 所以现在 monorepo 基于 pnpm 构建的  
 */

/**
 * pnpm 的优势有那些？
 * 
 * 
 */

/**
 * 构建 monorepo 
 * 
 * 1. 使用 pnpm init 
 * 2. 创建 pnpm-workspace.yaml 文件 
 * 3. 使用 changesets 去管理
 * 4. pnpm changesets init 
 * 5. pnpm changesets 去添加变动
 * 6. pnpm changesets version 消费 变动
 * 7. pnpm changesets publish 发布
 */

/**
 * 使用 monorepo 发布预版本号
 * 
 * 常见的 tag 有三种 alpha/beta/rc 
 *  1. alpha 是内部测试版，不发布
 *  2. beta 是测试版在 alpha 版本后发布
 *  3. rc 是发行的候选版本，不会发布新的功能，着重于修改 bug 
 * 
 * 
 * 1. 使用 pnpm changesets pre enter tag 进入预版本的发布
 * 
 * 2. changeset version 升级版本号
 * 
 * 3. changeset pre exit 退出预发布模式
 * 
 * 可参考：
 * 1. https://github.com/changesets/changesets/blob/main/docs/prereleases.md
 * 2. https://blog.csdn.net/astonishqft/article/details/124823381
 */


/**
 * 参考： 
 * 1. Changesets: 流行的 monorepo 场景发包工具 https://juejin.cn/post/7024827345059971080#heading-3
 * 2. 如果使用 Changesets: https://juejin.cn/post/7054144427622826020
 * 3. 易师傅 https://juejin.cn/post/7168277813223981063#heading-8
 */