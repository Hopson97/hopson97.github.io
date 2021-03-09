"use strict"

class DrawRectCommand {
    constructor(x, y, w, h, fillColour, outlineColour) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fillColour = fillColour;
        this.outlineColour = outlineColour;
    }

    render(ctx) {
        ctx.strokeStyle = this.outlineColour;
        ctx.fillStyle = this.fillColour;ctx.lineWidth = 1;
        ctx.fillRect(
            Math.floor(this.x),
            Math.floor(this.y),
            Math.floor(this.w),
            Math.floor(this.h)
        );
        ctx.strokeRect(
            Math.floor(this.x + 1),
            Math.floor(this.y + 1),
            Math.floor(this.w - 2),
            Math.floor(this.h - 2)
        );
    }
}

class DrawLineCommand {
    constructor(x, y, xend, yend, colour, thickness) {
        this.x = x;
        this.y = y;
        this.xend = xend;
        this.yend = yend;
        this.colour = colour;
        this.thickness = thickness;
    }

    render(ctx) {
        ctx.strokeStyle = this.colour;
        ctx.lineWidth = this.thickness;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.xend, this.yend);
        ctx.stroke();

        ctx.lineWidth = 1;
    }
}

class DrawImageCommand {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(ctx) {
        ctx.drawImage(
            this.image,
            this.x, 
            this.y, 
            this.width,
            this.height
        );

    }
}

class Context {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cmds = [];
        new ResizeObserver(() => {
            const width = this.canvas.getBoundingClientRect().width;
            const height = this.canvas.getBoundingClientRect().height;
            this.canvas.width = width;
            this.canvas.height = height;
        }).observe(canvas);
    }

    drawCurve(sx, sy, ex, ey, cx, cy, colour, width)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy);
        this.ctx.quadraticCurveTo(cx, cy, ex, ey);
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = colour;
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
    }

    getHeight() {
        return this.canvas.height;
    }

    getWidth() {
        return this.canvas.width;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawLine(x, y, xend, yend, colour, thickness) {
        this.cmds.push(new DrawLineCommand(
            x, y, xend, yend, colour, thickness
        ));
    }

    drawRect(x, y, w, h, fillColour, outlineColour) {
        this.cmds.push(new DrawRectCommand(
            x, y, w, h, fillColour, outlineColour
        ));
    }

    drawImage(image, x, y, w, h) {
        this.cmds.push(new DrawImageCommand(
            image, x, y, w, h
        ));
    }

    render() {
        this.ctx.translate(0.5, 0.5);
            for (const cmd of this.cmds) {
                cmd.render(this.ctx);
        }
        this.ctx.translate(-0.5, -0.5);
        this.cmds.length = 0;

    }

}

