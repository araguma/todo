import { Command } from '@/types';

export default {
    define: (builder) => builder
        .setDescription('Delete tasks')
        .addStringOption((option) => option
            .setName('name')
            .setDescription('What the task is called')
        ),
    handle: async (interaction) => {
        await interaction.reply('Not implemented');
    }
} satisfies Command;