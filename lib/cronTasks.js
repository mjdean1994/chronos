const datastore = require('./datastore.js')

var printDailyReminder = function(client) {
    var ds = datastore.getDatastore()

    Object.keys(ds).forEach((key) => {
        var value = ds[key]
        var guild = client.guilds.get(key)

        if(!guild) {
            return
        }

        if(value.config.reminder == false) {
            return
        }

        var targetChannel = value.config.reminder_channel || 'general' 

        var events = value.events

        events = events.filter((value, index, arr) => {
            var candidate = new Date(value.date)
            
            var today = new Date()
            today.setDate(today.getDate() + 1)

            return candidate > Date.now() && candidate <= today
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
            messageString = 'There are no events today.'
        } else {
            messageString = require('../lib/formatter.js').format(events)
        }

        guild.channels.forEach((chanValue, chanKey) => {
            if(chanValue.name == targetChannel) {
                chanValue.send('Here are today\'s events:\n\n' + messageString)
            }
        })
    })
}

var printSummary = function(client) {
    var ds = datastore.getDatastore()

    Object.keys(ds).forEach((key) => {
        var value = ds[key]
        var guild = client.guilds.get(key)

        if(!guild) {
            return
        }

        if(value.config.summary == false) {
            return
        }

        var targetChannel = value.config.summary_channel || 'general' 

        var events = value.events

        events = events.filter((value, index, arr) => {
            var candidate = new Date(value.date)
            
            var nextWeek = new Date()
            nextWeek.setDate(nextWeek.getDate() + 7)

            return candidate > Date.now() && candidate <= nextWeek
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
            messageString = 'There are no events this week.'
        } else {
            messageString = require('../lib/formatter.js').format(events)
        }

        guild.channels.forEach((chanValue, chanKey) => {
            if(chanValue.name == targetChannel) {
                chanValue.send('Here are this week\'s events:\n\n' + messageString)
            }
        })
    })
}

module.exports.printDailyReminder = printDailyReminder
module.exports.printSummary = printSummary