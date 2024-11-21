class Eyes extends VerletParticle2D {
    constructor(x, y) {
        super(x, y);
        this.r = 2;
        this.initialX = x;  // 记录初始 x 坐标
        this.initialY = y;  // 记录初始 y 坐标
        physics.addParticle(this);
    }

    show() {
        push();
        fill(255);
        strokeWeight(1);
        translate(this.x, this.y);
        scale(1, (frameCount % 80 < 10)? 0.1 : 1);
        circle(0, 0, this.r * 12);
        strokeWeight(this.r * 4);
        circle(0, 0, this.r * 2);

        fill(255);
        noStroke();
        circle(2, 2, this.r * 1.5);
        pop();
    }
}