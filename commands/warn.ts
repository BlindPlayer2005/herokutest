import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import warnSchema from "../models/warn-schema";

export default {
    category: 'Moderation',
    description: 'warns Users and shows amount of warns',

    requireRoles: true,

    slash: true,
    testOnly: true,

    guildOnly: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'add',
            description: 'Adds a warning to <user>',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'the user to add a warning to',
                    required: true,
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'the reason for the warning',
                    required: true,
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'remove',
            description: 'the user the warning to remove from',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'the user to add a warning to',
                    required: true,
                },
                {
                    name: 'id',
                    type: 'STRING',
                    description: 'The id of the warning to remove',
                    required: true,
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'list',
            description: 'shows warning list',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'the user to the warnings off',
                    required: true,
                }
            ]
        }
    ],

    callback: async ({ guild, member: staff, interaction }) => {
        const subCommand = interaction.options.getSubcommand()
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        const id = interaction.options.getString('id')

        if (subCommand === 'add') {
            const warning = await warnSchema.create({
                userId: user?.id,
                guildId: guild?.id,
                reason, 
                staffId: staff.id, 
            })

            return {
                custom: true,
                content: `Added warning ${warning.id} to <@${user?.id}>`,
                allowedMentions: {
                    users: [],
                }
            }
        } else if (subCommand === 'remove') {
            const warning = await warnSchema.findByIdAndDelete(id)

            return {
                custom: true,
                content: `removed warning ${warning.id} from <@${user?.id}>`,
                allowedMentions: {
                    users: [],
                }
            }
        } else if (subCommand === 'list') {
            const warnings = await warnSchema.find({
                userId: user?.id,
                guildId: guild?.id,
            })

            let description = `warnings for <@${user?.id}>:\n\n`

            if (warnings.length > 0) {
                for (const warn of warnings) {
                    description += `**ID:** ${warn._id}\n`
                    description += `**Date:** ${warn.createdAt.toLocaleString()}\n`
                    description += `**Staff:** <@${warn.staffId}>\n`
                    description += `**Reason:** ${warn.reason}\n\n`
                }
            } else {
                description = `No warnings found for user: <@${user?.id}>`
            }
            

            const embed = new MessageEmbed().setDescription(description)

            return embed
        }
    }
} as ICommand