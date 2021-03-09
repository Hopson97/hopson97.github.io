"use strict"

const button = new Image();
button.src = "assets/img/circuit/button.png";

const led = new Image();
led.src = "assets/img/circuit/led.png";

class ButtonComponent {
    constructor(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
    }

    draw(ctx) {
        ctx.drawImage(button,
            HOLE_SIZE * this.x * 2, HOLE_SIZE * this.y * 2,
            HOLE_SIZE * 5, HOLE_SIZE * 5
        );
    }
}

class LEDComponent {
    constructor(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
        this.direction = 1;
    }

    draw(ctx) {
        ctx.drawImage(led,
            HOLE_SIZE * this.x * 2, HOLE_SIZE * this.y * 2 - HOLE_SIZE / 2,
            HOLE_SIZE * 3, HOLE_SIZE *2
        );
    }
}

class WireComponent {
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

class ResistorComponent {
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


        const xStart = Math.min(startX, endX);
        const yStart = Math.min(startY, endY);
        const xEnd = Math.max(startX, endX);
        const yEnd = Math.max(startY, endY);

        if (Math.floor(xStart) == Math.floor(xEnd)) {
            ctx.drawLine(
                xStart, yStart,
                xStart, yStart + HOLE_SIZE,
                this.colour, 3
            );
            ctx.drawLine(
                xStart, yStart + HOLE_SIZE,
                xStart + HOLE_SIZE, yStart + HOLE_SIZE + HOLE_SIZE / 2, this.colour, 3
            );

            for (let y = yStart + HOLE_SIZE + HOLE_SIZE / 2; y < yEnd - HOLE_SIZE; y += HOLE_SIZE * 2) {

                ctx.drawLine(
                    xStart + HOLE_SIZE, y,
                    xStart - HOLE_SIZE, y + HOLE_SIZE,
                    this.colour, 3
                );
                if (y < yEnd - HOLE_SIZE - HOLE_SIZE * 2) {
                    ctx.drawLine(
                        xStart - HOLE_SIZE, y + HOLE_SIZE,
                        xStart + HOLE_SIZE, y + HOLE_SIZE * 2,
                        this.colour, 3
                    );
                }
            }

            ctx.drawLine(
                xEnd, yEnd - HOLE_SIZE,
                xEnd - HOLE_SIZE, yEnd - HOLE_SIZE - HOLE_SIZE / 2, this.colour, 3
            );
            ctx.drawLine(
                xEnd, yEnd,
                xEnd, yEnd - HOLE_SIZE,
                this.colour, 3
            );
        } else {
            ctx.drawLine(
                xStart, yStart,
                xStart + HOLE_SIZE, yStart,
                this.colour, 3
            );
            ctx.drawLine(
                xStart + HOLE_SIZE, yStart,
                xStart + HOLE_SIZE + HOLE_SIZE / 2, yStart + HOLE_SIZE, this.colour, 3
            );

            for (let x = xStart + HOLE_SIZE + HOLE_SIZE / 2; x < xEnd - HOLE_SIZE; x += HOLE_SIZE * 2) {

                ctx.drawLine(
                    x, yStart + HOLE_SIZE,
                    x + HOLE_SIZE, yStart - HOLE_SIZE,
                    this.colour, 3
                );
                if (x < xEnd - HOLE_SIZE - HOLE_SIZE * 2) {

                    ctx.drawLine(
                        x + HOLE_SIZE, yStart - HOLE_SIZE,
                        x + HOLE_SIZE * 2, yStart + HOLE_SIZE,
                        this.colour, 3
                    );
                }
            }

            ctx.drawLine(
                xEnd - HOLE_SIZE, yEnd,
                xEnd - HOLE_SIZE - HOLE_SIZE / 2, yEnd - HOLE_SIZE, this.colour, 3
            );
            ctx.drawLine(
                xEnd, yEnd,
                xEnd - HOLE_SIZE, yEnd,
                this.colour, 3
            );
        }
    }
}