"use strict"

class Tool {
    constructor(board) {
        this.board = board;
        this.activeComponent = null;
    }

    onMouseMove(x, y) {}
    onClick(x, y) {}

    onDraw(ctx) {
        if (this.activeComponent) {
            this.activeComponent.draw(ctx, this.x, this.y);
        }
    }

    isValidSpot(x, y) {}
}

class WireTool extends Tool {
    constructor(board) {
        super(board);
    }

    onMouseMove(x, y) {
        if (this.activeComponent) {
            this.activeComponent.endX = x;
            this.activeComponent.endY = y;
        }
    }

    onClick(x, y) {
        if (!this.isValidSpot(x, y)) {
            return;
        }
        if (this.activeComponent) {
            this.board.addWire(this.activeComponent);
            this.activeComponent = null;
        } else {
            this.activeComponent = new WireComponent(x, y);
            this.board.getHole(x - 2, y - 6).active = true;
        }
    }

    isValidSpot(x, y) {
        const hole = this.board.getHole(x - 2, y - 6);
        if (hole) {
            return !hole.active && hole.valid;
        } else {
            return false;
        }
    }

    componentSize() {
        return {
            w: 1,
            h: 1
        }
    }
}

class LEDTool extends Tool {
    constructor(board) {
        super(board);
        this.activeComponent = new LEDComponent(0, 0);
    }

    onMouseMove(x, y) {
        if (this.activeComponent) {
            this.activeComponent.x = x;
            this.activeComponent.y = y;
        }
    }

    onClick(x, y) {
        if (!this.isValidSpot(x, y)) {
            return;
        }
        this.board.addButton(new LEDComponent(this.activeComponent.x, this.activeComponent.y));
    }

    isValidSpot(mx, my) {
        const board = this.board;

        function valid(x, y) {
            const hole = board.getHole(x - 2, y - 6);
            if (hole) {
                return !hole.active && hole.valid;
            } else {
                return false;
            }
        }

        return valid(mx, my) && valid(mx + 2, my) && valid(mx, my + 2) && valid(mx + 2, my + 2);
    }

    componentSize() {
        return {
            w: 2,
            h: 1
        }
    }
}

class ButtonTool extends Tool {
    constructor(board) {
        super(board);
        this.activeComponent = new ButtonComponent(0, 0);
    }

    onMouseMove(x, y) {
        if (this.activeComponent) {
            this.activeComponent.x = x;
            this.activeComponent.y = y;
        }
    }

    onClick(x, y) {
        if (!this.isValidSpot(x, y)) {
            return;
        }
        this.board.addButton(new ButtonComponent(this.activeComponent.x, this.activeComponent.y));
    }

    isValidSpot(mx, my) {
        const board = this.board;

        function valid(x, y) {
            const hole = board.getHole(x - 2, y - 6);
            if (hole) {
                return !hole.active && hole.valid;
            } else {
                return false;
            }
        }

        return valid(mx, my) && valid(mx + 2, my) && valid(mx, my + 2) && valid(mx + 2, my + 2);
    }

    componentSize() {
        return {
            w: 5,
            h: 5
        }
    }
}

class EraseTool extends Tool {
    constructor(board) {
        super(board);
    }

    onMouseMove(x, y) {
        if (this.activeComponent) {
            this.activeComponent.x = x;
            this.activeComponent.y = y;
        }
    }

    onClick(x, y) {
        if (!this.isValidSpot(x, y)) {
            return;
        }

    }

    isValidSpot(x, y) {
        const hole = this.board.getHole(x - 2, y - 6);
        if (hole) {
            return !hole.active && hole.valid;
        } else {
            return false;
        }
    }

    componentSize() {
        return {
            w: 1,
            h: 1
        }
    }
}

class ResistorTool extends Tool {
    constructor(board) {
        super(board);

        this.virtualEndX = 0;
        this.virtualEndY = 0;
    }

    onMouseMove(x, y) {
        this.virtualEndX = x;
        this.virtualEndY = y;
        if (this.activeComponent) {
            if (Math.abs(this.activeComponent.startX - this.virtualEndX) > Math.abs(this.activeComponent.startY - this.virtualEndY)) {
                this.activeComponent.endX = this.virtualEndX;
                this.activeComponent.endY = this.activeComponent.startY;
            } else {
                console.log("ueet");
                this.activeComponent.endX = this.activeComponent.startX;
                this.activeComponent.endY = this.virtualEndY;
            }
        }
    }

    onClick(x, y) {
        if (!this.isValidSpot(x, y)) {
            return;
        }
        if (this.activeComponent) {
            this.board.addWire(this.activeComponent);
            this.activeComponent = null;
        } else {
            this.activeComponent = new ResistorComponent(x, y);
            this.board.getHole(x - 2, y - 6).active = true;
        }
    }

    isValidSpot(x, y) {
        const hole = this.board.getHole(x - 2, y - 6);
        if (hole) {
            return !hole.active && hole.valid;
        } else {
            return false;
        }
    }

    componentSize() {
        return {
            w: 1,
            h: 1
        }
    }
}