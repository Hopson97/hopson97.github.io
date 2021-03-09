"use strict"

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

    }
}


class Context {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
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
        this.ctx.strokeStyle = colour;
        this.ctx.lineWidth = thickness;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(xend, yend);
        this.ctx.stroke();

        this.ctx.lineWidth = 1;
    }

    drawRect(x, y, w, h, fillColour, outlineColour) {
        this.ctx.strokeStyle = outlineColour;
        this.ctx.fillStyle = fillColour;
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(
            Math.floor(x),
            Math.floor(y),
            Math.floor(w),
            Math.floor(h)
        );
        this.ctx.strokeRect(
            Math.floor(x + 1),
            Math.floor(y + 1),
            Math.floor(w - 2),
            Math.floor(h - 2)
        );
    }

    drawImage(image, x, y, width, height) {
        this.ctx.drawImage(
            image,
            x, 
            y, 
            width,
            height
        );
    }
}

