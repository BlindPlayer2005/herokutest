"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'sends a message with drop down menu',
    permissions: ['ADMINISTRATOR'],
    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    slash: true,
    guildOnly: true,
    testOnly: false,
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        var channel = (message
            ? message.mentions.channels.first()
            : interaction.options.getChannel('channel'));
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'please tag a text channel';
        }
        args.shift();
        var text = args.join(' ');
        channel.send(text);
        if (interaction) {
            interaction.reply({
                content: 'send message!',
                ephemeral: true,
            });
        }
    }
};
