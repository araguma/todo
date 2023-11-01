import { BaseMessageOptions, EmbedBuilder } from 'discord.js';
import { humanizeDuration } from '@/libs/duration';
import CircularProgress from './attachments';
import { Task } from '@/types';

export default class MessageBuilder implements BaseMessageOptions {
    content?: string;
    embeds: NonNullable<BaseMessageOptions['embeds']> = [];
    files: NonNullable<BaseMessageOptions['files']> = [];
    components: NonNullable<BaseMessageOptions['components']> = [];
    addTask(task: Task) {
        const footerIcon = new CircularProgress(task.progress);
        const embed = new EmbedBuilder()
            .setTitle(task.name)
            .setURL(task.link)
            .setColor('#000000')
            .setTimestamp(task.deadline)
            .setFooter({
                text: `${task.progress}%`,
                iconURL: `attachment://${footerIcon.name}`,
            });
        if(task.description || task.tags.length > 0) {
            let description = `${task.description ?? ''}\n\n`;
            description += task.tags.map(tag => `\`${tag}\``).join(' ');
            embed.setDescription(description);
        }
        if(task.estimate)
            embed.setAuthor({
                name: `${humanizeDuration(task.estimate)}`,
            });
        this.embeds.push(embed);
        this.files.push(footerIcon);
        return this;
    }
    isEmpty() {
        return (
            this.content === undefined &&
            this.embeds.length === 0 &&
            this.files.length === 0 &&
            this.components.length === 0
        )
    }
}