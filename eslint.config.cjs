module.exports = {
  // 继承基础配置（可选 airbnb / standard 等）
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // 如果使用 TypeScript
    "prettier", // 确保 Prettier 配置覆盖 ESLint 冲突规则
  ],
  parser:"@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect", // 自动检测 React 版本
    },
  },
  plugins: ["prettier"], // 添加 Prettier 插件
  rules: {
    // 自定义规则（覆盖默认配置）
    "prettier/prettier": "error", // 强制执行 Prettier 规则
    "react/react-in-jsx-scope": "off", // 如果使用 React 18+ 可关闭此规则
    // 其他规则（如禁用 console）
    "no-console": "warn",
  },
};