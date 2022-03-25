import { Channel, Client, Guild, GuildChannel, Message } from "discord.js";
import { config } from "dotenv";
import { ICommand } from "wokcommands";
import DiscordJS from 'discord.js'

export default {
    testOnly: true,

    category: 'Whitelisting',
    description: 'adds users to the minecraft whitelist',

    callback: async ({ message, channel, args }) => {
        message.reply('enter your username:')

        const filter = (m: Message) => {
            return m.author.id === message.author.id
        }

        const collector = channel.createMessageCollector({
            filter,
            max: 1,
            time: 1000 * 15
        })

        collector.on('collect', message => {
            console.log(message.content)
        })

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.reply('Please fill in your username!')
                return
            }

            let text = `Collected:\n\n`

            collected.forEach((message) => {
                text += `${message.content}\n`
            })


            message.reply(text)
            console.log(module)
        })
    }
} as ICommand
