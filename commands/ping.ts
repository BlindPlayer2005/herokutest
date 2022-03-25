import { ICommand } from "wokcommands"

export default {
    category: 'Testing',
    description: 'Replies with pong.',

    requireRoles: true,

    slash: "both",
    testOnly: true,

    ephemeral: true,

    callback: ({ message, interaction }) => {
        interaction.reply(`pong`)
    },
} as ICommand