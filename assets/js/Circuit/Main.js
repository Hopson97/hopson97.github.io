"use strict"

const layout =
    `001111101111101111101111101111101111101111101111101111101111100\
001111101111101111101111101111101111101111101111101111101111100\
000000000000000000000000000000000000000000000000000000000000000\
111111111111111111111111111111111111111111111111111111111111111\
111111111111111111111111111111111111111111111111111111111111111\
111111111111111111111111111111111111111111111111111111111111111\
111111111111111111111111111111111111111111111111111111111111111\
111111111111111111111111111111111111111111111111111111111111111\
000000000000000000000000000000000000000000000000000000000000000\
111111111111111111111111111111111111111111111111111111111111111\
111111111111111111111111111111111111111111111111111111111111111\
111111111111111111111111111111111111111111111111111111111111111\
111111111111111111111111111111111111111111111111111111111111111\
111111111111111111111111111111111111111111111111111111111111111\
000000000000000000000000000000000000000000000000000000000000000\
001111101111101111101111101111101111101111101111101111101111100\
001111101111101111101111101111101111101111101111101111101111100`


const WIDTH = 1600;
const HEIGHT = 900;

const HOLE_SIZE = 12;
const BOARD_WIDTH = 63;
const BOARD_HEIGHT = 17;

function idx(x, y) {
    return y * BOARD_WIDTH + x;
}

class Wire {
    constructor(mx, my) {
        this.startX = mx;
        this.startY = my;

        this.endX = mx;
        this.endY = my;

        this.colour = document.getElementById("colour").value;
    }

    draw(ctx) {
        const startX = this.startX * HOLE_SIZE * 2 + HOLE_SIZE / 2;
        const startY = this.startY * HOLE_SIZE * 2 + HOLE_SIZE / 2;
        const endX = this.endX * HOLE_SIZE * 2 + HOLE_SIZE / 2;
        const endY = this.endY * HOLE_SIZE * 2 + HOLE_SIZE / 2;

        const controlX = (endX + startX) / 2;
        const controlY = (startY + startY) / 2;

        ctx.drawCurve(
            startX, startY,
            endX, endY,
            controlX, controlY,
            this.colour, 5);
    }
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
                    active: false
                };
                this.map.push(hole);
                if (layout[idx(x, y)] == 1) {
                    hole.active = true;
                }
            }
        }
    }

    render(ctx) {
        ctx.drawRect(this.x - 10, this.y - 10, 1520, 420, "white");
        ctx.drawRect(this.x, this.y + 400 / 2 - HOLE_SIZE / 2, 1500, HOLE_SIZE, "#DDD","#DDD");
        ctx.drawRect(this.x, this.y + HOLE_SIZE * 4, 1500, HOLE_SIZE / 2, "#DDD","#DDD");
        ctx.drawRect(this.x, this.y + HOLE_SIZE * 28, 1500, HOLE_SIZE / 2, "#DDD","#DDD");




        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (layout[idx(x, y)] == 1) {
                    ctx.drawRect(
                        x * HOLE_SIZE + HOLE_SIZE * x + this.x,
                        y * HOLE_SIZE + HOLE_SIZE * y + this.y,
                        HOLE_SIZE, HOLE_SIZE,
                        "#222", "#333");
                }
            }
        }
        ctx.drawImage(this.nodeMCUImage,
            HOLE_SIZE * 94 + this.x,
            HOLE_SIZE * 8 - 1 + this.y,
            414, 205
        );
        ctx.drawImage(this.button,
            HOLE_SIZE + this.x, HOLE_SIZE * 13.5 + this.y,
            36 * 2, 36 * 2
        );


        if (this.currentWire) {
            this.currentWire.draw(ctx, this.x, this.y);
            console.log(this.currentWire);
        }
        for (const wire of this.wires) {
            wire.draw(ctx, this.x, this.y);
        }
    }
}





window.addEventListener("load", () => {
    const canvas = document.getElementById("circuitcanvas");
    const ctx = new Context(canvas);


    this.board = new Board();

    let mx = 0;
    let my = 0

    canvas.addEventListener('mousemove', e => {
        const x = e.offsetX;
        const y = e.offsetY;
        mx = Math.floor(x / HOLE_SIZE / 2);
        my = Math.floor(y / HOLE_SIZE / 2);
        if (board.currentWire) {
            board.currentWire.endX = mx;
            board.currentWire.endY = my;
        }
    });

    canvas.addEventListener("mouseup", (e) => {
        if (board.currentWire) {
            board.wires.push(board.currentWire);
            board.currentWire = null;
        } else {
            const x = e.offsetX;
            const y = e.offsetY;
            mx = Math.floor(x / HOLE_SIZE / 2);
            my = Math.floor(y / HOLE_SIZE / 2);
            board.currentWire = new Wire(mx, my);
        }
    });
    // D0  D1  D2  D3  D4  3V3 GND D5  D6  D7  D8  RX  TX  GND 3V3

    // A0 RSV RSV SD3 SD2 SD1 CMD SD0 CLK GND 3V3  EN RST GND Vin 


    function loop() {
        // clear
        ctx.clear();

        board.render(ctx);



        ctx.drawRect(
            mx * HOLE_SIZE + HOLE_SIZE * mx,
            my * HOLE_SIZE + HOLE_SIZE * my,
            HOLE_SIZE, HOLE_SIZE,
            "#F00", "#FFF");




        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
});