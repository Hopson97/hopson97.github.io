window.addEventListener("load", _ => {
    const canvas = document.getElementById("rle");
    const ctx = canvas.getContext('2d');

    const CHUNK_SIZE = 6;
    const BLOCK_SIZE = 128;
    const chunk = [
        0, 0, 0, 0, 0, 1,
        1, 2, 2, 2, 2, 2,
        0, 0, 0, 0, 0, 0,
        0, 0, 2, 2, 2, 1,
        1, 1, 2, 2, 2, 2,
        2, 2, 1, 1, 1, 1,
    ];

    function image(name) {
        return document.getElementById(name);
    }

    function index(x, y) {
        return y * CHUNK_SIZE + x;
    }

    function getBlock(x, y) {
        return chunk[index(x, y)];
    }

    function renderBounds(x, y) {
        return [
            Math.floor(BLOCK_SIZE / 4 + x * BLOCK_SIZE + x * 9),
            Math.floor(BLOCK_SIZE / 4 + y * BLOCK_SIZE + y * 9),
            Math.floor(BLOCK_SIZE),
            Math.floor(BLOCK_SIZE)
        ];
    }

    let ids = 0;
    class Block {
        constructor(name) {
            this.name = name;
            this.id = ids++;
            this.image = image(name);
        }
    }

    const blocks = [
        new Block("grass"),
        new Block("stone"),
        new Block("wood")
    ];

    const STATE_STAY = 0;
    const STATE_SHIFT = 1;

    const blockCounts = [];

    class Pointer {
        constructor() {
            this.x = 0;
            this.y = 0;

            this.ticks = 1;

            this.state = STATE_STAY;

            this.current = this.renderBound();
            this.target = this.renderBound();

            this.block = this.getBlock();
            this.count = 1;
        }

        update() {
            if (this.state == STATE_STAY) {
                if (this.ticks++ % 50 == 0) {
                    this.state = STATE_SHIFT;
                }
            } else if (this.state == STATE_SHIFT) {
                const nextX = Math.floor((this.x + 1) % CHUNK_SIZE);
                let nextY = this.y;
                if (nextX == 0) {
                    nextY++;
                }

                this.target = renderBounds(nextX, nextY);

                let dx = this.current[0] - this.target[0];
                let dy = this.current[1] - this.target[1];
                const len = Math.sqrt(dx * dx + dy * dy);

                if (Math.floor(Math.abs(dx)) == 0 && Math.floor(Math.abs(dy)) == 0) {
                    this.x = nextX;
                    this.y = nextY;
                    this.current = this.renderBound();
                    this.state = STATE_STAY;

                    if (this.block == this.getBlock()) {
                        this.count++;
                    } else {
                        blockCounts.push({
                            block: this.block,
                            count: this.count
                        });
                        this.block = this.getBlock();
                        this.count = 1;
                    }
                } else {
                    if (dx > 0) {
                        dx *= 2;
                        dy *= 2;
                    }
                    this.current[0] -= dx / len;
                    this.current[1] -= dy / len;
                }
            }
        }

        getBlock() {
            return getBlock(this.x, this.y);
        }

        draw() {
            ctx.strokeRect(...this.current);
        }

        renderBound() {
            return renderBounds(this.x, this.y)
        }
    };

    const pointer = new Pointer();



    function loop() {
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, 1600, 900);
        

        pointer.update();

        for (let y = 0; y < CHUNK_SIZE; y++) {
            for (let x = 0; x < CHUNK_SIZE; x++) {
                const block = getBlock(x, y);
                const bounds = renderBounds(x, y);
                ctx.drawImage(blocks[block].image, ...bounds);


            }
        }
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white"
        ctx.fillStyle = "#222"
        ctx.fillRect(850, BLOCK_SIZE / 4, 350, 813);
        ctx.strokeRect(850, BLOCK_SIZE / 4, 350, 813);

        ctx.fillStyle = "white"
        ctx.font = "37px Monospace";
        ctx.fillText(`Block Counts`, 870, BLOCK_SIZE / 4 + 40);

        ctx.lineWidth = 5;

        function drawCountInfo(y, blockType, blockCount, txt) {
            ctx.drawImage(blockType.image, 865, y, 64, 64);
            ctx.fillText(`${txt}: ${blockType.name}`, 940, y + 20);
            ctx.fillText(`ID: ${blockType.id} Count: ${blockCount}`, 940, y + 50);
        }

        ctx.font = "22px Monospace";

        drawCountInfo(
            BLOCK_SIZE / 4 + 63,
            blocks[pointer.block],
            pointer.count,
            "Current Block"
        );

        for (const i in blockCounts) {
            const y = BLOCK_SIZE / 4 + 50 + (i) * 64 + ((i) * 5) + 120;
            const block = blockCounts[i];
            drawCountInfo(
                BLOCK_SIZE / 4 + 50 + (i) * 64 + ((i) * 5) + 120,
                blocks[block.block],
                block.count,
                "Block"
            );
        }

        ctx.fillStyle = "white"
        ctx.font = "28px Monospace";
        ctx.fillText(`Blocks Counted`, 900, BLOCK_SIZE / 4 + 150);


        ctx.strokeStyle = "red"
        ctx.lineWidth = 10;
        pointer.draw();

        ctx.stroke();
        window.requestAnimationFrame(loop);
    }
    loop();
});