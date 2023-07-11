module.exports = {
    publicPath: '/belgian-merit-program/',
    devServer: {
        proxy: 'https://www.dropbox.com/',
        },
    configureWebpack: {
        devServer: {
          headers: { "Access-Control-Allow-Origin": "*" }
        }
    }
}
