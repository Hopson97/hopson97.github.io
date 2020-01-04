const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const EDGE = 10;
const WIDTH = 400;
const HEIGHT = 880;
const RBX = 1190 - WIDTH + 50;
const RBW = WIDTH / 4 * 3;

let packets = []

class Box {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(fill = false) {
        ctx.strokeRect(this.x, this.y, this.w, this.h)
        if (fill) {
            ctx.fillRect(this.x, this.y, this.w, this.h)
        }
    }
}

const STATE_SEND = 0;
const STATE_DEAD = 1;

const STATE_BUFF = 2;
const STATE_FIN = 3;
const STATE_PREBUFF = 4;
const STATE_DROPPED = 5;

const serverBox = new Box(EDGE, EDGE, WIDTH, HEIGHT);
const clientBox = new Box(1190, EDGE, WIDTH, HEIGHT);
const recbuffBox = new Box(RBX, EDGE, WIDTH / 4 * 3, HEIGHT);

let count = 0;
let y = 100;
class Packet {
    constructor() {

        this.box = new Box(50, y, 200, 90);

        y += 95;
        if (y > 9 * 95) {
            y = 100;
        }

        this.vel = {
            x: Math.random() * 1.5 + 0.5,
            y: 0
        };

        this.state = STATE_SEND;

        this.buffCount = 0;
    }

    draw() {
        ctx.lineWidth = 2;
        ctx.fillStyle = "#222"
        this.box.draw(true);
        ctx.fillStyle = "#FFF"
        ctx.fillText("32KB Chunk", this.box.x + 5, this.box.y + 55);
    }

    update() {
        if (this.state == STATE_SEND || this.state == STATE_FIN || this.state == STATE_PREBUFF) {
            this.box.x += this.vel.x;
        } else if (this.state == STATE_DROPPED) {
            this.box.y += this.vel.y;
            this.vel.y += 0.1;
        }

        if (this.state == STATE_SEND && this.box.x + this.box.w > RBX) {
            if (count <= 5) {
                this.state = STATE_PREBUFF;
                count++;
            } else {
                this.state = STATE_DROPPED;
            }
        }

        if (this.state == STATE_PREBUFF) {
            if (this.box.x + this.box.w / 2 > RBX + RBW / 2) {
                this.state = STATE_BUFF;
            }
        } else if (this.state == STATE_BUFF) {
            this.buffCount++;
            if (this.buffCount > 300) {
                count--;
                this.state = STATE_FIN;
            }
        }

        if (this.box.x > clientBox.x + 100 || this.box.y > 900) {
            this.state = STATE_DEAD;
        }
    }
}

function drawbg() {
    ctx.fillStyle =
        ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    serverBox.draw();
    clientBox.draw();
    recbuffBox.draw();

    ctx.lineWidth = 1;
    ctx.font = "37px Monospace";
    ctx.fillText("Open Builder Server", 15, 50);
    ctx.fillText("Open Builder Client", 1195, 50);
    ctx.fillText("Receive Buffer", RBX + 10, 50);

    ctx.font = "30px Monospace";
    ctx.fillText(`Filled: ${count * 32}/${32 * 6}KB`, RBX + 10, 90);
    ctx.stroke();
    ctx.fill();
}

let tick = 0;

function loop() {
    if (tick++ % 60 == 0) {
        packets.push(new Packet());
    }

    ctx.clearRect(0, 0, 1600, 900);

    drawbg();


    ctx.font = "34px Monospace";
    for (const packet of packets) {
        packet.update();
        packet.draw();
    }

    packets = packets.filter((v, i) => {
        return v.state != STATE_DEAD;
    })

    window.requestAnimationFrame(loop);
}
loop();