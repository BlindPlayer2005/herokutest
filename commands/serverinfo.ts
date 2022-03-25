import { Guild, MessageEmbed, Client, ClientUser } from "discord.js";
import { ICommand } from "wokcommands"

export default {
    category: 'Testing',
    description: 'Replies with pong.',
    slash: "both",
    testOnly: false,

    ephemeral: true,

    callback: ({ message, interaction, client, user }) => {
        const serverInfoEmbed = new MessageEmbed()
        .setTitle('Work in porgress')
        return serverInfoEmbed
    }
} as ICommand