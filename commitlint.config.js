module.exports = {
  extents: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',  // 打包
        'chore',  // 构建过程或辅助工具的变动
        'docs', // 文档变更
        'feat', // 新功能
        'fix',  // 修复
        'improvement',
        'perf', // 性能优化
        'refactor', // 重构(既不是增加feature，也不是修复bug)
        'revert', // 回退
        'style',  // 代码格式(不影响代码运行的变动)
        'test'  // 增加测试
      ]
    ]
  }
}