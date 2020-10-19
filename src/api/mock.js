var web = require('./web/index.js')
var admin = require('./admin/index.js')
var mix = {};
mix = Object.assign(mix,web);
mix = Object.assign(mix,admin)
module.exports = mix;