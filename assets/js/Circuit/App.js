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

class App {
    constructor() {
        this.canvas = document.getElementById("circuitcanvas");
        this.ctx = new Context(this.canvas);
    
        this.board = new Board();

        this.mouseX = 0;
        this.mouseY = 0;

        this.currentTool = new WireTool(this.board);
    }

    initEvents() {
        const updateMousePosition = e => {
            this.mouseX = Math.floor(e.offsetX / HOLE_SIZE / 2);
            this.mouseY = Math.floor(e.offsetY / HOLE_SIZE / 2);
        }

        this.canvas.addEventListener('mousemove', e => {
            updateMousePosition(e);
            this.currentTool.onMouseMove(this.mouseX, this.mouseY);

        });

        this.canvas.addEventListener("mouseup", (e) => {
            updateMousePosition(e);
            this.currentTool.onClick(this.mouseX, this.mouseY);
        });
    }

    run() {
        function loop() {
            // clear
            this.ctx.clear();
    
            this.board.render(this.ctx);
    
    
            // Render the selected thing
    
            this._drawSelected();
    

            this.currentTool.onDraw(this.ctx);
            requestAnimationFrame(loop.bind(this));
        }
        requestAnimationFrame(loop.bind(this));
    }

    _drawSelected() {
        const colour = this.currentTool.isValidSpot(this.mouseX, this.mouseY) ? "green" : "red";
        this.ctx.drawRect(
            this.mouseX * HOLE_SIZE * 2, 
            this.mouseY * HOLE_SIZE * 2, 
            HOLE_SIZE, HOLE_SIZE, 
            colour, "#FFF");

    }
}



window.addEventListener("load", () => {

    const app = new App();
    app.initEvents();
    app.run();

    // D0  D1  D2  D3  D4  3V3 GND D5  D6  D7  D8  RX  TX  GND 3V3

    // A0 RSV RSV SD3 SD2 SD1 CMD SD0 CLK GND 3V3  EN RST GND Vin 



});