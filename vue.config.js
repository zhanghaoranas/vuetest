module.exports = {
  configureWebpack: {
    // 使用老版本的avue
    externals: {
      '@smallwei/avue': 'AVUE',
      vue: 'Vue',
    },
  },
};
