"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
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
    init: function (client) {
        client.on('interactionCreate', function (interaction) {
            if (!interaction.isSelectMenu()) {
                return;
            }
            var customId = interaction.customId, values = interaction.values, member = interaction.member;
            if (customId === 'auto_roles' && member instanceof discord_js_1.GuildMember) {
                var component = interaction.component;
                var removed = component.options.filter(function (option) {
                    return !values.includes(option.value);
                });
                for (var _i = 0, removed_1 = removed; _i < removed_1.length; _i++) {
                    var id = removed_1[_i];
                    member.roles.remove(id.value);
                }
                for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                    var id = values_1[_a];
                    member.roles.add(id);
                }
                interaction.reply({
                    ephemeral: true,
                    content: 'Roles updated!'
                });
            }
        });
    },
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args, client = _a.client;
        return __awaiter(void 0, void 0, void 0, function () {
            var channel, messageId, role, targetMessage, row, option, menu, _i, _b, o;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        channel = (message
                            ? message.mentions.channels.first()
                            : interaction.options.getChannel('channel'));
                        if (!channel || channel.type !== 'GUILD_TEXT') {
                            return [2 /*return*/, 'Enter in a text channel, you cunt!'];
                        }
                        messageId = args[1];
                        role = (message ? message.mentions.roles.first() : interaction.options.getRole('role'));
                        console.log(role);
                        if (!role) {
                            return [2 /*return*/, 'Unknown role dumbass!'];
                        }
                        return [4 /*yield*/, channel.messages.fetch(messageId, {
                                cache: true,
                                force: true
                            })];
                    case 1:
                        targetMessage = _e.sent();
                        if (!targetMessage) {
                            return [2 /*return*/, 'unknown message Identification!'];
                        }
                        if (targetMessage.author.id !== ((_c = client.user) === null || _c === void 0 ? void 0 : _c.id)) {
                            return [2 /*return*/, "Please provide a message ID that was send from <@" + ((_d = client.user) === null || _d === void 0 ? void 0 : _d.id) + ">"];
                        }
                        row = targetMessage.components[0];
                        if (!row) {
                            row = new discord_js_1.MessageActionRow;
                        }
                        option = [{
                                label: role.name,
                                value: role.id
                            }];
                        menu = row.components[0];
                        if (menu) {
                            for (_i = 0, _b = menu.options; _i < _b.length; _i++) {
                                o = _b[_i];
                                if (o.value === option[0].value) {
                                    return [2 /*return*/, {
                                            custom: true,
                                            content: "<@" + o.value + "> is already part of this menu",
                                            allowedMentions: {
                                                roles: [],
                                            },
                                        }];
                                }
                            }
                            menu.addOptions(option);
                            menu.setMaxValues(menu.options.length);
                        }
                        else {
                            row.addComponents(new discord_js_1.MessageSelectMenu()
                                .setCustomId('auto_roles')
                                .setMinValues(0)
                                .setMaxValues(1)
                                .setPlaceholder('select your roles...')
                                .addOptions(option));
                        }
                        targetMessage.edit({
                            components: [row]
                        });
                        return [2 /*return*/, {
                                custom: true,
                                content: "Oega Boega, You added <@" + role.id + "> to the roles menu",
                                allowedmentions: {
                                    roles: []
                                },
                                ephemeral: true,
                            }];
                }
            });
        });
    },
};
