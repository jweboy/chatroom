module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": ["react", "jsx-a11y", "import"],
    "rules": {
        "semi": 2, // 句尾逗号
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],// 文件后缀支持 .js .jsx
        "react/destructuring-assignment": [0], // 关闭强制state解构
        "react/no-unused-state": [0], // 关闭state无引用提示
    }
};