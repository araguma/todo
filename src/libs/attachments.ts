import config from '@/config';
import Sketch from '@/libs/sketch';
import { AttachmentBuilder } from 'discord.js';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export default class CircularProgress extends AttachmentBuilder {
    static readonly notStarted = readFileSync(join(config.assetsDir, 'not-started.png'));
    static readonly complete = readFileSync(join(config.assetsDir, 'complete.png'));
    constructor(percentage: number) {
        const size = 20 * config.resolution;
        const center = size / 2;
        const attachment =
            percentage === 0 ? CircularProgress.notStarted :
            percentage === 100 ? CircularProgress.complete :
            new Sketch(size, size)
                .circle(center, center, {
                    radius: 4 * config.resolution,
                    color: '#F1C40F',
                    fill: true,
                })
                .circle(center, center, {
                    radius: 7 * config.resolution,
                    color: '#F1C40F3F',
                    lineWidth: 2 * config.resolution,
                    stroke: true,
                })
                .circle(center, center, {
                    radius: 7 * config.resolution,
                    color: '#F1C40F',
                    lineWidth: 2 * config.resolution,
                    endAngle: 2 * Math.PI * (percentage / 100),
                    stroke: true,
                })
                .toBuffer();
        super(attachment, {
            name: `${randomUUID()}.png`,
        });
    }
}