import { Guild, GuildMember, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans members',
    permissions: ['BAN_MEMBERS'],
    requireRoles: true,
    slash: 'both',
    ephemeral: true,
    testOnly: false,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, interaction, args }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            return 'please tagg someone to ban!'
        }

        if(!target.bannable) {
            return {
                custom: true,
                content: 'cannot ban that User!',
                ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.ban({
            reason,
            days: 7
        })

        return {
            custom: true,
            content: `You banned <@${target.id}>`,
            ephemeral: false
        }
    }
} as ICommand