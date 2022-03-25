"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    category: 'Testing',
    description: 'Replies with pong.',
    slash: "both",
    testOnly: false,
    ephemeral: true,
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, client = _a.client, user = _a.user;
        var serverInfoEmbed = new discord_js_1.MessageEmbed()
            .setTitle('Work in porgress');
        return serverInfoEmbed;
    }
};
