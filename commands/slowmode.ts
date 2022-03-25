import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default{
    description: 'sets slowdown for 10 seconds',
    requireRoles: true,
    testOnly: true,
    category: 'moderation',

    callback:({interaction})=>{
            var num = 10
            let channel = interaction.channel as TextChannel
            channel.setRateLimitPerUser(num).then(() => {
                interaction.reply(`Slowmode Setted to ${num}s. :thumbsup:`);
            })
        }
}as ICommand