"use strict"

function idx(x, y) {
    return y * BOARD_WIDTH + x;
}

class Board {
    constructor() {
        this.wires = [];
        this.currentWire = null;

        this.x = HOLE_SIZE * 4;
        this.y = HOLE_SIZE * 16;
        this.map = [];
        this.nodeMCUImage = new Image();
        this.button = new Image();
        this.nodeMCUImage.src = "assets/img/circuit/esp.png";
        this.button.src = "assets/img/circuit/button.png";

        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                const hole = {
                    active: false,
                    valid: true
                };
                this.map.push(hole);
                if (layout[idx(x, y)] == 0) {
                    hole.valid = false;
                }
            }
        }
    }

    render(ctx) {

        // = = = = = = = = = = = 
        // Render the breadboard
        ctx.drawRect(this.x - 10, this.y - 10, 1520, 420, "white");
        ctx.drawRect(this.x - 20, this.y + 410, 1530, 10, "#AAA", "#AAA");
        ctx.drawRect(this.x - 20, this.y -10, 10, 420, "#AAA", "#AAA");
        ctx.drawRect(this.x, this.y + 400 / 2 - HOLE_SIZE / 2, 1500, HOLE_SIZE, "#DDD","#DDD");
        ctx.drawRect(this.x, this.y + HOLE_SIZE * 4, 1500, HOLE_SIZE / 2, "#DDD","#DDD");
        ctx.drawRect(this.x, this.y + HOLE_SIZE * 28, 1500, HOLE_SIZE / 2, "#DDD","#DDD");
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (layout[idx(x, y)] == 1) {
                    const colour = this.map[idx(x, y)].active ? "#111" : "#AAA";
                    ctx.drawRect(
                        x * HOLE_SIZE + HOLE_SIZE * x + this.x,
                        y * HOLE_SIZE + HOLE_SIZE * y + this.y,
                        HOLE_SIZE, HOLE_SIZE,
                        colour, colour);
                }
            }
        }
        
        // = = = = = = = = = = = 
        // Render the node mcu
        ctx.drawImage(this.nodeMCUImage,
            HOLE_SIZE * 94 + this.x,
            HOLE_SIZE * 8 - 1 + this.y,
            414, 205
        );
        ctx.drawImage(this.button,
            HOLE_SIZE + this.x, HOLE_SIZE * 13.5 + this.y,
            36 * 2, 36 * 2
        );



        for (const wire of this.wires) {
            wire.draw(ctx, this.x, this.y);
        }
    }

    getHole(x, y) {
        return this.map[idx(x, y)];
    }

    addWire(wire) {
        this.wires.push(wire);
        this.getHole(wire.endX - 2, wire.endY - 8).active = true;
    }
}