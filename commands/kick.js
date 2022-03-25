"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
    callback: function (_a) {
        var _b;
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        var target = message ? (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first() : interaction.options.getMember('user');
        if (!target) {
            return {
                custom: true,
                content: 'Please tagg someone to ban!',
                ephemeral: true
            };
        }
        if (!target.kickable) {
            return {
                custom: true,
                content: 'cannot kick that User!',
                ephemeral: true
            };
        }
        args.shift();
        var reason = args.join(' ');
        target.kick(reason);
        return {
            custom: true,
            content: "You kicked <@" + target.id + ">",
            ephemeral: true
        };
    }
};
