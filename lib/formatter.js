const dateformat = require('dateformat')

module.exports.format = function(events) {
    var messageString = ''

    events.forEach((element) => {
        messageString += `**${element.title}** - ${dateformat(element.date, 'mmmm dd, yyyy hh:MMtt')}\n${element.description}\n\n`
    })

    return messageString
}