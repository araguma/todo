import MessageBuilder from '@/libs/messageBuilder';
import UserModel from '@/models/user.model';
import { Command } from '@/types';

export default {
    define: (builder) => builder
        .setDescription('Search for tasks')
        .addStringOption((option) => option
            .setName('name')
            .setDescription('What the task is called')
        )
        .addStringOption((option) => option
            .setName('before')
            .setDescription('Tasks before this date')
        )
        .addStringOption((option) => option
            .setName('after')
            .setDescription('Tasks after this date')
        )
        .addBooleanOption((option) => option
            .setName('unscheduled')
            .setDescription('Tasks without a deadline')
        )
        .addStringOption((option) => option
            .setName('progress')
            .setDescription('Tasks with this progress')
            .addChoices(
                { name: 'Not started', value: 'not-started' },
                { name: 'In progress', value: 'in-progress' },
                { name: 'Complete', value: 'complete' },
            ),
        )
        .addStringOption((option) => option
            .setName('shorter-than')
            .setDescription('Tasks shorter than this duration')
        )
        .addStringOption((option) => option
            .setName('longer-than')
            .setDescription('Tasks longer than this duration')
        )
        .addStringOption((option) => option
            .setName('tags')
            .setDescription('Tasks with these tags (space-separated)')
        ),
    handle: async (interaction) => {
        const tasks = await UserModel.getTasks(interaction.user.id);
        const message = new MessageBuilder();
        tasks.forEach((task) => {
            message.addTask(task);
        });
        await interaction.reply(message);
    }
} satisfies Command;