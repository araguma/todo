import parse from 'parse-duration'
import { default as humanize } from 'humanize-duration';

export function parseDuration(duration: string) {
    return parse(duration) ?? (() => {
        throw new Error('Invalid duration');
    })();
}

export function humanizeDuration(duration: number) {
    return humanize(duration);
}