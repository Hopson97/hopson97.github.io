"use strict"

class Wire {
    constructor(mouseX, mouseY) {
        this.startX = mouseX;
        this.startY = mouseY;

        this.endX = mouseX;
        this.endY = mouseY;

        this.colour = document.getElementById("colour").value;
    }

    draw(ctx) {
        const startX = this.startX * HOLE_SIZE * 2 + HOLE_SIZE / 2;
        const startY = this.startY * HOLE_SIZE * 2 + HOLE_SIZE / 2;
        const endX = this.endX * HOLE_SIZE * 2 + HOLE_SIZE / 2;
        const endY = this.endY * HOLE_SIZE * 2 + HOLE_SIZE / 2;

        const controlX = (endX + startX) / 2;
        const controlY = Math.min(startY, endY) - 100;

        ctx.drawCurve(
            startX, startY,
            endX, endY,
            controlX, controlY,
            this.colour, 5);
    }
}
