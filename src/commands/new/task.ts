import { parseDuration } from '@/libs/duration';
import MessageBuilder from '@/libs/messageBuilder';
import { Task } from '@/models/task.model';
import UserModel from '@/models/user.model';
import { Command } from '@/types';

export default {
    define: (builder) => builder
        .setDescription('Create a new task')
        .addStringOption((option) => option
            .setName('name')
            .setDescription('What the task is called')
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName('description')
            .setDescription('What the task is about')
        )
        .addStringOption((option) => option
            .setName('deadline')
            .setDescription('When the task is due')
        )
        .addNumberOption((option) => option
            .setName('progress')
            .setDescription('What percentage of the task is complete')
            .setMinValue(0)
            .setMaxValue(100)
        )
        .addStringOption((option) => option
            .setName('estimate')
            .setDescription('How long the task will take')
        )
        .addStringOption((option) => option
            .setName('reminder')
            .setDescription('How long before the deadline to remind you')
        )
        .addStringOption((option) => option
            .setName('link')
            .setDescription('Link to the task')
        )
        .addStringOption((option) => option
            .setName('tags')
            .setDescription('Tags for the task (space-separated)')
        ),
    handle: async (interaction) => {
        const deadline = interaction.options.getString('deadline');
        const estimate = interaction.options.getString('estimate');
        const reminder = interaction.options.getString('reminder');
        const task: Task = {
            name: interaction.options.getString('name')!,
            description: interaction.options.getString('description'),
            deadline: deadline ? new Date(deadline) : null,
            progress: interaction.options.getNumber('progress') ?? 0,
            estimate: estimate ? parseDuration(estimate) : null,
            reminder: reminder ? parseDuration(reminder) : null,
            link: interaction.options.getString('link'),
            tags: interaction.options.getString('tags')?.split(/\W+/) ?? [],
        };
        UserModel.addTask(interaction.user.id, task);
        await interaction.reply(new MessageBuilder()
            .addTask(task)
        );
    }
} satisfies Command;