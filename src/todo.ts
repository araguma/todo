import config from '@/config';
import FullMap from '@/libs/fullMap';
import { Command, Listener } from '@/types';
import { Client, GatewayIntentBits, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes, SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from 'discord.js';
import { globSync } from 'glob';
import { join, parse, relative } from 'node:path';

(async () => {
    if(!process.env.TOKEN) throw new Error('TOKEN not found in environment variables');

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
        ],
    });

    globSync(join(config.listenersDir, '*.{js,ts}')).forEach((file) => {
        const listener = require(file).default as Listener<any>;
        client.on(parse(file).name, listener.handle);
    });

    await client.login(process.env.TOKEN);

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
    const builders = new FullMap(SlashCommandBuilder);
    const groupBuilders = new FullMap(SlashCommandSubcommandGroupBuilder);
    globSync(join(config.commandsDir, '**/*.{js,ts}')).forEach((file) => {
        const command = require(file).default as Command;
        const ancestors = relative(config.commandsDir, file).split('/');
        const name = parse(ancestors.pop()!).name;
        switch(ancestors.length) {
            case 0: {
                const builder = builders.get(name).setName(name);
                command.define(builder);
                break;
            }
            case 1: {
                const builder = builders.get(ancestors[0]).setName(ancestors[0]).setDescription('unreachable');
                const subBuilder = new SlashCommandSubcommandBuilder().setName(name);
                command.define(subBuilder);
                builder.addSubcommand(subBuilder);
                break;
            }
            case 2: {
                const builder = builders.get(ancestors[0]).setName(ancestors[0]).setDescription('unreachable');
                const groupBuilder = groupBuilders.get(ancestors[1]).setName(ancestors[1]).setDescription('unreachable');
                const subBuilder = new SlashCommandSubcommandBuilder().setName(name);
                command.define(subBuilder);
                builder.addSubcommandGroup(groupBuilder);
                groupBuilder.addSubcommand(subBuilder);
                break;
            }
            default: {
                throw new Error('Invalid command path');
            }
        }
    });
    builders.forEach(command => body.push(command.toJSON()));
    rest.put(Routes.applicationCommands(client.user!.id), { body });
})();