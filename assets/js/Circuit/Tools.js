"use strict"

class Tool {
    constructor(board) {
        this.board = board;
    }

    onMouseMove(x, y) {}
    onClick(x, y) {}

    onDraw(ctx) {}

    isValidSpot(x, y) {}
}

class WireTool extends Tool {
    constructor(board) {
        super(board);

        this.activeWire = null;
    }

    onMouseMove(x, y) {
        if (this.activeWire) {
            this.activeWire.endX = x;
            this.activeWire.endY = y;
        }
    }

    onClick(x, y) {
        if (!this.isValidSpot(x, y)) {
            return;
        }
        if (this.activeWire) {
            this.board.addWire(this.activeWire);
            this.activeWire = null;
        } else {
            this.activeWire = new Wire(x, y);
            this.board.getHole(x - 2, y - 8).active = true;
        }
    }

    onDraw(ctx) {
        if (this.activeWire) {
            this.activeWire.draw(ctx, this.x, this.y);
        }
    }

    isValidSpot(x, y) {
        console.log(this.board.getHole(x, y));
        const hole = this.board.getHole(x - 2, y - 8);
        if (hole) {
            return !hole.active && hole.valid;
        }
        else {
            return false;
        }
    }
}