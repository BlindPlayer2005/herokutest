"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    category: 'Testing',
    description: 'shows info of bot',
    slash: "both",
    testOnly: false,
    ephemeral: true,
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, client = _a.client, user = _a.user;
        var serverInfoEmbed = new discord_js_1.MessageEmbed()
            .setColor("#000000")
            .setTitle("Bot's Info")
            .setThumbnail('https://cdn.discordapp.com/attachments/940305144757768263/940703695476232212/fc68f86873c9c661e84ad442cf8fb6cf.gif');
        return serverInfoEmbed;
    }
};
