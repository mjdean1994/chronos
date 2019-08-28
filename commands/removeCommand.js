const datastore = require('../lib/datastore.js')
const config = require('../config.json')

module.exports = function(args, message) {
    if(args.length == 0 || args[0] == '') {
        message.channel.send(`Insufficient arguments supplied. Expected syntax is as follows:\`\`\`${config.prefix}remove {TITLE}\`\`\``)
        return
    }

    var eventTitle = args.join(' ')

    var result = datastore.removeEvent(message.guild.id, eventTitle)
    if(result) {
        message.channel.send(`Successfully removed event **${eventTitle}**`)
    } else {
        message.channel.send(`Could not remove event **${eventTitle}**`)
    }
}