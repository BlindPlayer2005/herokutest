import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sets the bots status!',

    minArgs: 1,
    expectedArgs: '<status>',

    slash: true,

    ownerOnly: true,

    callback: ({ client, text }) => {
        client.user?.setPresence({
            activities: [
                {
                    name: text,
                },
            ],
            status: 'online'
        })
        return 'Status Updated'
    },
} as ICommand