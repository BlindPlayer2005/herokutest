import { Guild, GuildMember, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks members',
    permissions: ['KICK_MEMBERS'],
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
            return {
                custom: true,
                content: 'Please tagg someone to ban!',
                ephemeral: true
            }
        }

        if(!target.kickable) {
            return {
                custom: true,
                content: 'cannot kick that User!',
                ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.kick(reason)

        return {
            custom: true,
            content: `You kicked <@${target.id}>`,
            ephemeral: true
        }
    }
} as ICommand