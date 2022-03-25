import { Client, GuildMember, Interaction, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel, User } from "discord.js";
import { DefaultMessageNotificationLevels } from "discord.js/typings/enums";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'adds a message with drop down menu',

    permissions: ['SEND_MESSAGES'],

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: true,
    guildOnly: true,
    testOnly: false,
    requireRoles: true,

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = interaction

            if (customId === 'auto_roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    ephemeral: true,
                    content: 'Roles updated!'
                })
            }
        })
    },

    callback: async ({ message, interaction, args, client }) => {
        const channel = (
            message
            ? message.mentions.channels.first()
            : interaction.options.getChannel('channel')
        ) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Enter in a text channel, you cunt!'
        }

        const messageId = args[1]

        const role = (message ? message.mentions.roles.first() : interaction.options.getRole('role')) as Role
        console.log(role);
        
        if (!role) {
            return 'Unknown role dumbass!'
        }

        const targetMessage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true
        })

        if (!targetMessage) {
            return 'unknown message Identification!'
        }

        if (targetMessage.author.id !== client.user?.id) {
            return `Please provide a message ID that was send from <@${client.user?.id}>`
        }

        let row = targetMessage.components[0] as MessageActionRow
        if (!row) {
            row = new MessageActionRow
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@${o.value}> is already part of this menu`,
                        allowedMentions: {
                            roles: [],
                        },
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)

        }else {
            row.addComponents(
                new MessageSelectMenu()
                .setCustomId('auto_roles')
                .setMinValues(0)
                .setMaxValues(1)
                .setPlaceholder('select your roles...')
                .addOptions(option)
            )
        }
        targetMessage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Oega Boega, You added <@${role.id}> to the roles menu`,
            allowedmentions: {
                roles: []
            },
            ephemeral: true,
        }
    },
} as ICommand