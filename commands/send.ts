import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'sends a message with drop down menu',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],

    slash: true,

    guildOnly: true,
    testOnly: false,

    callback: ({ message, interaction, args }) => {
        const channel = (
            message
            ? message.mentions.channels.first()
            : interaction.options.getChannel('channel')
        ) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'please tag a text channel'
        }

        args.shift()
        const text = args.join(' ')

        channel.send(text)

        if (interaction) {
            interaction.reply({
                content: 'send message!',
                ephemeral: true,
            })
        }
    }
} as ICommand