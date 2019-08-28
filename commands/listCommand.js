const config = require('../config.json')
const datastore = require('../lib/datastore.js')

module.exports = function(args, message) {
    var events = datastore.getAllEvents(message.guild.id)

    events = events.filter((value, index, arr) => {
        var candidate = new Date(value.date)
        return candidate > Date.now()
    })

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
        messageString = 'There are no upcoming events.'
    } else {
        messageString = require('../lib/formatter.js').format(events)
    }

    message.channel.send(messageString)
}