import { CacheType, ChatInputCommandInteraction, ClientEvents, SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';

export type Listener<K extends keyof ClientEvents> = {
    handle(...args: ClientEvents[K]): Promise<any>;
}

export type Command = {
    define(builder: SlashCommandBuilder | SlashCommandSubcommandBuilder): void;
    handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<any>;
}