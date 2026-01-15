require('../0as/anti_content_env')
require('./anti-content')

const anti_content = new (window.loader("eDaA"))({
    serverTime: new Date().getTime()
}).messagePack()

console.log(anti_content)