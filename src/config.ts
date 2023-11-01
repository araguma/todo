import { join } from 'node:path';

const config = {
    assetsDir: join(__dirname, 'assets/'),
    commandsDir: join(__dirname, 'commands/'),
    listenersDir: join(__dirname, 'listeners/'),
    resolution: 4,
}

export default config;