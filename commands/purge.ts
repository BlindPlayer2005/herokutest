import { MessageSelectMenu } from "discord.js";
import { parse } from "dotenv";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Purges <amount> chat messages',

    permissions: ['MANAGE_MESSAGES'],
    requireRoles: true,
    testOnly: false,

    maxArgs: 1,
    expectedArgs: '[AMOUNT]',

    slash: true,

    callback: async ({ message, interaction, channel, args }) => {
        const amount = args.length ? parseInt(args.shift()!) : 10
        if (message) {
            await message.delete()
        }
        //const { size } = await channel.bulkDelete(amount, true)

        const messages = await channel.messages.fetch({ limit: amount })
        const { size } = messages 
        messages.forEach((message) => message.delete)

        const reply = `Deleted ${size} message(s).`

        if (interaction) {
            return reply
        }
        channel.send(reply)
    }

} as ICommand