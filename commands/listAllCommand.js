const config = require('../config.json')
const datastore = require('../lib/datastore.js')
const dateformat = require('dateformat')

module.exports = function(args, message) {
    var events = datastore.getAllEvents(message.guild.id)

    events = events.sort((a, b) => {
        var aDate = new Date(a.date)
        var bDate = new Date(b.date)
        if(aDate < bDate) {
            return -1
        }

        if(aDate > bDate) {
            return 1
        }

        return 0
    })

    var messageString = ''

    if(events.length == 0) {
        messageString = 'There are no events.'
    } else {
        messageString = require('../lib/formatter.js').format(events)
    }

    message.channel.send(messageString)
}