module.exports = {
  devServer: {
    proxy: {
      // 匹配 "/api" 开头的请求路径
      '/api': {
        target: 'http://8.137.82.104:8080', // 目标服务器地址
        pathRewrite: { '^/api': '' },
        changeOrigin: true,             // 是否修改请求的源头，设置为 true 时代理服务器会修改请求头的 Host
        secure: false,                  // 如果是 https 接口，需要配置为 false
        logLevel: 'debug', // 启用调试日志
      },
    },
  },
};
