"use strict"

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

        const wireToolButton = document.getElementById("wire");
        const eraseToolButton = document.getElementById("erase");
        const buttonToolButton = document.getElementById("button");
        const resistorToolButton = document.getElementById("resistor");

        wireToolButton.addEventListener("click", e => {
            this.currentTool = new WireTool(this.board);
        });

        eraseToolButton.addEventListener("click", e => {
           // this.currentTool = new WireTool();
            
        });

        buttonToolButton.addEventListener("click", e => {
            this.currentTool = new ButtonTool(this.board);
            
        });

        resistorToolButton.addEventListener("click", e => {
            this.currentTool = new ResistorTool(this.board);
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
        const width = this.currentTool.componentSize().w * HOLE_SIZE;
        const height = this.currentTool.componentSize().h * HOLE_SIZE;
        this.ctx.drawRect(
            this.mouseX * HOLE_SIZE * 2, 
            this.mouseY * HOLE_SIZE * 2, 
            width, height, 
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