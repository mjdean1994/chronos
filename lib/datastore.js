const fs = require('fs')
const config = require('../config.json')

var addEvent = function(guildId, eventObject) {
    var datastore = getDatastore()

    if(!datastore[guildId]) {
        datastore[guildId] = {config: {}, events: []}
    }

    datastore[guildId].events.push(eventObject)

    setDatastore(datastore)
}

var getAllEvents = function(guildId) {
    var datastore = getDatastore()

    if(!datastore[guildId]) {
        return []
    }

    return datastore[guildId].events
}

var getDatastore = function() {
    var datastoreString = ''

    if(!fs.existsSync(config.dataFile)) {
        fs.writeFileSync(config.dataFile, '{}')
        datastoreString = '{}'
    } else {
        datastoreString = fs.readFileSync(config.dataFile)
    }

    return JSON.parse(datastoreString)
}

var removeEvent = function(guildId, eventTitle) {
    var datastore = getDatastore()
    
    if(!datastore[guildId]) {
        return false
    }

    datastore[guildId].events = datastore[guildId].events.filter((value, index, arr) => {
        return value.title.toLowerCase() != eventTitle.toLowerCase()
    })

    setDatastore(datastore)
    return true
}

var setDatastore = function(newDatastore) {
    fs.writeFileSync(config.dataFile, JSON.stringify(newDatastore))

    return
}

var updateConfig = function(guildId, key, value) {
    var datastore = getDatastore()

    if(!datastore[guildId]) {
        datastore[guildId] = {config: {}, events: []}
    }

    if(value == "true") {
        value = true
    }

    if(value == "false") {
        value = false
    }

    datastore[guildId].config[key] = value

    setDatastore(datastore)
}

module.exports.addEvent = addEvent
module.exports.getAllEvents = getAllEvents
module.exports.getDatastore = getDatastore
module.exports.removeEvent = removeEvent
module.exports.updateConfig = updateConfig