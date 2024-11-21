class Spring extends VerletSpring2D {
    constructor(a, b, length, strength) {
        let springLength = dist(a.x, a.y, b.x, b.y);
        if (!strength) strength = 0.01;  // 调整默认弹性系数为 0.01
        super(a, b, springLength * 1, strength);
        physics.addSpring(this);
    }
    show() {
        strokeWeight(1);
        stroke(0, 127);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}