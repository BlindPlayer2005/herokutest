"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: 'Replies with pong.',
    requireRoles: true,
    slash: "both",
    testOnly: true,
    ephemeral: true,
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction;
        interaction.reply("pong");
    },
};
