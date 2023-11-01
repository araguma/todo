import { Listener } from '@/types';

export default {
    async handle(client) {
        console.log(`${client.user.username} is online`);
    },
} satisfies Listener<'ready'>;