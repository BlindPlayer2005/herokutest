import { Guild, MessageEmbed, Client, ClientUser } from "discord.js";
import { ICommand } from "wokcommands"

export default {
    category: 'Testing',
    description: 'shows info of bot',
    slash: "both",
    testOnly: false,

    ephemeral: true,

    callback: ({ message, interaction, client, user }) => {
        const serverInfoEmbed = new MessageEmbed()
        .setColor(`#000000`)
        .setTitle(`Bot's Info`)
        .setThumbnail('https://cdn.discordapp.com/attachments/940305144757768263/940703695476232212/fc68f86873c9c661e84ad442cf8fb6cf.gif')
        return serverInfoEmbed
    }
} as ICommand