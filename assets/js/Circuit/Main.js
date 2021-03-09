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

const NODE_MCU_FILE = "assets/img/circuit/nodemcu.jpg";
const BREADBOARD_FILE = "assets/img/circuit/breadboard.jpg";

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
                const hole = {active: false};
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

window.addEventListener("load", () => {
    const canvas = document.getElementById("circuitcanvas");
    const ctx = new Context(canvas);
    const nodeMCUImage = new Image();
    const breadboardImage = new Image();
    nodeMCUImage.src = NODE_MCU_FILE;
    breadboardImage.src = BREADBOARD_FILE;

    let mx = 0;
    let my = 0

    canvas.addEventListener('mousemove', e => {
        const x = e.offsetX;
        const y = e.offsetY;
        mx = Math.floor(x / HOLE_SIZE / 2);
        my = Math.floor(y / HOLE_SIZE / 2);
        console.log(mx, my);

    });


    this.board = new Board();
    ctx.font = "30px Verdana";
    function loop() {
        ctx.drawRect(
            0, 0,
            WIDTH, HEIGHT,
            "#000", "#000");
        board.render(ctx);
        

        ctx.drawRect(
            mx * HOLE_SIZE + HOLE_SIZE * mx,
            my * HOLE_SIZE + HOLE_SIZE * my,
            HOLE_SIZE, HOLE_SIZE,
            "#F00", "#FFF");

        ctx.render();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
});