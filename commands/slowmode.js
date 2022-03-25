"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    description: 'sets slowdown for 10 seconds',
    requireRoles: true,
    testOnly: true,
    category: 'moderation',
    callback: function (_a) {
        var interaction = _a.interaction;
        var num = 10;
        var channel = interaction.channel;
        channel.setRateLimitPerUser(num).then(function () {
            interaction.reply("Slowmode Setted to " + num + "s. :thumbsup:");
        });
    }
};
