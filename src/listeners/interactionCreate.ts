import config from '@/config';
import { Command, Listener } from '@/types';
import { join } from 'node:path';

export default {
    async handle(interaction) {
        if(!interaction.isChatInputCommand()) return;
        try {
            let path = join(config.commandsDir, interaction.commandName);
            path = join(path, interaction.options.getSubcommandGroup(false) ?? '');
            path = join(path, interaction.options.getSubcommand(false) ?? '');
            const command = require(path).default as Command;
            command.handle(interaction);
        } catch(error) {
            console.error(error);
            interaction.reply({
                content: 'An error occurred while executing this command',
                ephemeral: true,
            });
        }
    },
} satisfies Listener<'interactionCreate'>;