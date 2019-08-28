const config = require('../config.json')
const datastore = require('../lib/datastore.js')

module.exports = function(args, message) {
    if(args.length < 2) {
        message.channel.send(`Insufficient arguments supplied. Expected syntax is as follows:\`\`\`${config.prefix}config {KEY} {VALUE}}\`\`\``)
        return
    }

    datastore.updateConfig(message.guild.id, args[0], args[1])

    message.channel.send('Successfully updated configuration.')
}