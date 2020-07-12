/*
  * postCSS 配置文件
 */
module.exports = {
  plugins: {
    // autoprefixer 生成浏览器css 样式规则前缀
    // Vuecli 内部已经配置了一次,
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },

    // 把px转为rem
    'postcss-pxtorem': {
      // lib-flexible 的REM 适配方案,把一行分为了10份,
      // 设计稿是750, 所有1rem =75px
      // vant建议37.5 因为是基于375设计的
      // rootValue 有数值和 函数两种类型
      // rootValue: 75,
      rootValue ({ file }) {
        return file.indexOf('vant') === -1 ? 75 : 37.5
      },

      // 配置要转换的css属性, *表示所有
      propList: ['*']
    }
  }
}
