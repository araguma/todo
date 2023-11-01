import { Canvas } from 'canvas';

const defaultCircleOptions = {
    radius: 0,
    color: '#000000',
    fill: false,
    stroke: false,
    lineWidth: 0,
    startAngle: 0,
    endAngle: 2 * Math.PI,
}

export default class Sketch extends Canvas {
    ctx = this.getContext('2d');
    constructor(width: number, height: number) {
        super(width, height);
    }
    circle(x: number, y: number, options: Partial<typeof defaultCircleOptions>) {
        options = { ...defaultCircleOptions, ...options };
        this.ctx.beginPath();
        this.ctx.arc(
            x,
            y,
            options.radius!,
            options.startAngle! - Math.PI / 2,
            options.endAngle! - Math.PI / 2,
        );
        this.ctx.fillStyle = options.color!;
        this.ctx.lineWidth = options.lineWidth!;
        this.ctx.strokeStyle = options.color!;
        options.fill && this.ctx.fill();
        options.stroke && this.ctx.stroke();
        return this;
    }
}