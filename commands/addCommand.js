const config = require('../config.json')
const datastore = require('../lib/datastore.js')

module.exports = function(args, message) {
    if(args.length < 3) {
        message.channel.send(`Insufficient arguments supplied. Expected syntax is as follows:\`\`\`${config.prefix}add {EVENT TITLE}\n{DATE i.e. January 01, 2019 14:00:00}\n{DESCRIPTION}\`\`\``)
        return
    }

    var title = args[0]
    var date = new Date(args[1])
    var description = args[2]
    
    if(!date) {
        message.channel.send('Invalid date format provided. Date must be in form {MMMM DD, YYYY hh:mm:ss}')
        return
    }

    datastore.addEvent(message.guild.id, {title: title, date: date, description: description})

    message.channel.send(`Successfully added event **${title}**`)
}