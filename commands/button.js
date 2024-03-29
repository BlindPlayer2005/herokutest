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
    category: 'Testing',
    description: 'Send an embed.',
    slash: true,
    testOnly: true,
    ownerOnly: true,
    callback: function (_a) {
        var msgInt = _a.interaction, channel = _a.channel;
        return __awaiter(void 0, void 0, void 0, function () {
            var row, linkRow, filter, collector;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        row = new discord_js_1.MessageActionRow()
                            .addComponents(new discord_js_1.MessageButton()
                            .setCustomId('ban_yes')
                            .setEmoji('🔨')
                            .setLabel('Confirm')
                            .setStyle('DANGER'))
                            .addComponents(new discord_js_1.MessageButton()
                            .setCustomId('ban_no')
                            .setLabel('Cancel')
                            .setStyle('SECONDARY'));
                        linkRow = new discord_js_1.MessageActionRow()
                            .addComponents(new discord_js_1.MessageButton()
                            .setURL('https://youtu.be/dQw4w9WgXcQ')
                            .setLabel('O')
                            .setStyle('LINK'));
                        return [4 /*yield*/, msgInt.reply({
                                content: 'Are you sure?',
                                components: [row, linkRow],
                                ephemeral: false,
                            })];
                    case 1:
                        _b.sent();
                        filter = function (btnInt) {
                            return msgInt.user.id === btnInt.user.id;
                        };
                        collector = channel.createMessageComponentCollector({
                            filter: filter,
                            componentType: 'BUTTON',
                            max: 1,
                            time: 1000 * 15,
                        });
                        // collector.on('collect', (i: ButtonInteraction) => {
                        //     i.reply({
                        //         content: 'You clicked a button',
                        //         ephemeral: true,
                        //     })
                        // })
                        collector.on('end', function (collected) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (collected.size === 0) {
                                            msgInt.editReply({
                                                content: '⛔ You did not respond in time.',
                                                components: [],
                                            });
                                            return [2 /*return*/];
                                        }
                                        collected.forEach(function (click) { return console.log(click.user.id, click.customId); });
                                        if (!(((_a = collected.first()) === null || _a === void 0 ? void 0 : _a.customId) === 'ban_yes')) return [3 /*break*/, 2];
                                        // Ban the target user
                                        return [4 /*yield*/, msgInt.editReply({
                                                content: 'An action has already been taken.',
                                                components: [],
                                            })];
                                    case 1:
                                        // Ban the target user
                                        _c.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        if (!(((_b = collected.first()) === null || _b === void 0 ? void 0 : _b.customId) === 'ban_no')) return [3 /*break*/, 4];
                                        return [4 /*yield*/, msgInt.editReply({
                                                content: "Interaction has been cancelled.",
                                                components: [],
                                            })];
                                    case 3:
                                        _c.sent();
                                        _c.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    },
};
