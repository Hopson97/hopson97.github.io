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

class Board {
    constructor() {
        this.map = [];
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
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (layout[idx(x, y)] == 1) {
                    ctx.drawRect(
                        x * HOLE_SIZE + HOLE_SIZE * x,
                        y * HOLE_SIZE + HOLE_SIZE * y,
                        HOLE_SIZE, HOLE_SIZE,
                        "#DDD", "#FFF");
                }
            }
        }
    }
}

const fpsInterval = 1000 / 30;
let then = Date.now();
let start = then;
let now = 0;
let elapsed = 0;

let drawwire = false;

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
        const controlY = endY - 50;

        ctx.drawCurve(
            startX, startY,
            endX, endY,
            controlX, controlY,
            this.colour, 5);
    }
}

let currentWire = null;


window.addEventListener("load", () => {
    const canvas = document.getElementById("circuitcanvas");
    const ctx = new Context(canvas);
    const nodeMCUImage = new Image();
    nodeMCUImage.src = "assets/img/circuit/esp.png";

    const wires = [];

    let mx = 0;
    let my = 0

    canvas.addEventListener('mousemove', e => {
        const x = e.offsetX;
        const y = e.offsetY;
        mx = Math.floor(x / HOLE_SIZE / 2);
        my = Math.floor(y / HOLE_SIZE / 2);
        if (currentWire) {
            currentWire.endX = mx;
            currentWire.endY = my;
        }
    });

    canvas.addEventListener("mouseup", (e) => {
        if (currentWire) {
            wires.push(currentWire);
            currentWire = null;
        }
        else {
            const x = e.offsetX;
            const y = e.offsetY;
            mx = Math.floor(x / HOLE_SIZE / 2);
            my = Math.floor(y / HOLE_SIZE / 2);
            currentWire = new Wire(mx, my);
        }
    });
    // D0  D1  D2  D3  D4  3V3 GND D5  D6  D7  D8  RX  TX  GND 3V3

    // A0 RSV RSV SD3 SD2 SD1 CMD SD0 CLK GND 3V3  EN RST GND Vin 

    this.board = new Board();
    ctx.font = "30px Verdana";

    function loop() {
        ctx.drawRect(
            0, 0,
            WIDTH, HEIGHT,
            "#000", "#000");
        board.render(ctx);

        ctx.drawImage(nodeMCUImage,
            HOLE_SIZE * 94,
            HOLE_SIZE * 8 - 1,
            414, 205);

        ctx.drawRect(
            mx * HOLE_SIZE + HOLE_SIZE * mx,
            my * HOLE_SIZE + HOLE_SIZE * my,
            HOLE_SIZE, HOLE_SIZE,
            "#F00", "#FFF");
        ctx.render();


        if (currentWire) {
            currentWire.draw(ctx);
        }
        for (const wire of wires) {
            wire.draw(ctx);
        }


        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
});