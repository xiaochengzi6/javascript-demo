/**
 * commit 组成: <type>(<scope>): <short summary>
 * build: 响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）
 * 
 * type: 
 *  ci: 更改我们的 CI 配置文件和脚本（例如：CircleCi、SauceLabs）
 *  docs: 仅文档更改
 *  feat: 一个新功能
 *  fix: 错误修复
 *  perf: 提高性能的代码更改
 *  refactor: 既不修复错误也不添加功能的代码更改
 *  test: 添加缺失的测试或纠正现有的测试
 * 
 * Scope:范围应该是受影响的 npm 包的名称 或者是文件
 * 
 * summary: 使用摘要字段提供更改的简洁描述
 */