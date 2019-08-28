const discord = require('discord.js')
const cron = require('node-cron')

const config = require('./config.json')
const cronTasks = require('./lib/cronTasks.js')

var client = new discord.Client()
client.login(config.token)

client.on('ready', function() {
    console.log('Chronos is now operational.')
})

client.on('message', message => {
    if(!message.content.startsWith(config.prefix)) {
        //ignore all messages that don't start with the prefix
        return
    }

    //Disallow direct messaging
    if (message.guild == null) {
        message.channel.send("Whoa! Don't slide into my DMs. I only work on servers.")
        return
    }

    var command = message.content.slice(config.prefix.length).trim().split(/ +/g)[0].toLowerCase()
    var args = []
    
    if(command == 'add') {
        args = message.content.slice(config.prefix.length + command.length).trim().split(/\n+/g)
    } else {
        args = message.content.slice(config.prefix.length + command.length).trim().split(/ +/g)
    }

    try {
        require(`./commands/${command}Command.js`)(args, message)
    } catch (ex) {
        console.log(ex)
        message.channel.send(`Unknown command "${command}". Try ${config.prefix}help to get started.`)
    }
})

cron.schedule('0 10 * * 0', () => {
    //weekly summary
    cronTasks.printSummary(client)
})

cron.schedule('1 10 * * *', () => {
    //daily reminder
})