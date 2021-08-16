const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    env: {
        contentApi: 'raydemo.cdn.content.amplience.net'
    },
    poweredByHeader: false
}