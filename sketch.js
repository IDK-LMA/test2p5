// 引入相关的物理引擎及几何相关的类和行为类
const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { Vec2D, Rect } = toxi.geom;
const { GraviytBehavior } = toxi.physics2d.behaviors;

let physics;

let particles = [];
let springs = [];
let eyes = [];

let showSprings = false;

let w = 900;
let h = 600;

let bgColor = 255;
let num = 0;

function keyPressed() {
    if (key =='') {
        showSprings =!showSprings;
        num++;
        if (num % 2 == 0) {
            bgColor = 255;
        } else {
            bgColor = 0;
        }
    }
}

function setup() {
    createCanvas(w, h);

    physics = new VerletPhysics2D();
    physics.iterations = 10;
    let bounds = new Rect(0, 0, width, height);
    physics.setWorldBounds(bounds);

    // 创建多个粒子实例并添加到 particles 数组
    particles.push(new Particle(w / 2 - 100, 100));
    particles.push(new Particle(w / 2 - 50, 100));
    particles.push(new Particle(w / 2, 100));
    particles.push(new Particle(w / 2 + 50, 100));
    particles.push(new Particle(w / 2 + 100, 100));

    particles.push(new Particle(w / 2 + 50, 175));

    particles.push(new Particle(w / 2 + 100, 250));
    particles.push(new Particle(w / 2 + 25, 250));
    particles.push(new Particle(w / 2, 250));
    particles.push(new Particle(w / 2 - 25, 250));
    particles.push(new Particle(w / 2 - 100, 250));

    particles.push(new Particle(w / 2 - 50, 175));

    // 创建多个眼睛实例并添加到 eyes 数组
    eyes.push(new Eyes(w / 2 - 25, 150));
    eyes.push(new Eyes(w / 2 + 25, 150));

    eyes.push(new Eyes(w / 2 - 25, 275));
    eyes.push(new Eyes(w / 2 + 25, 275));

    // 创建弹簧连接粒子和眼睛实例，并添加到 springs 数组
    for (let particle of particles) {
        springs.push(new Spring(particle, eyes[0], 0.01));
        springs.push(new Spring(particle, eyes[1], 0.01));
    }

    springs.push(new Spring(eyes[2], particles[9], 0.01));
    springs.push(new Spring(eyes[3], particles[7], 0.01));
}

let isMousePressed = false;  // 新增一个变量用于记录鼠标是否按下的状态

function draw() {
    background(bgColor);

    physics.update();

    fill(0);
    if (showSprings) fill(255);
    strokeWeight(2);
    beginShape();
    for (let particle of particles) {
        vertex(particle.x, particle.y);
    }
    endShape(CLOSE);

    eyes[0].show();
    eyes[1].show();

    if (showSprings) {
        stroke(255);
        strokeWeight(4);
        line(particles[9].x, particles[9].y, eyes[2].x, eyes[2].y);
        line(particles[7].x, particles[7].y, eyes[3].x, eyes[3].y);
        strokeWeight(16);
        point(eyes[2].x, eyes[2].y);
        point(eyes[3].x, eyes[3].y);
    }

    if (showSprings) {
        for (let spring of springs) {
            spring.show();
        }
    }

    if (mouseIsPressed) {
        isMousePressed = true;  // 鼠标按下时更新状态为按下
        eyes[3].lock();
        eyes[3].x = mouseX;
        eyes[3].y = mouseY;
        eyes[3].unlock();
    } else if (isMousePressed) {  // 鼠标松开且之前是按下状态时，进行位置调整
        isMousePressed = false;  // 重置按下状态为 false

        // 以下是简单的位置调整示例，让眼睛元素朝着初始位置（这里假设初始位置是固定的）移动一定距离
        let targetX = eyes[3].initialX;  // 假设初始位置的 x 坐标保存在 initialX 属性中（需要在 Eyes 类里添加这个属性记录初始位置）
        let targetY = eyes[3].initialY;
        let moveSpeed = 5;  // 定义每次移动的速度，可以调整这个值来控制恢复快慢
        eyes[3].x = lerp(eyes[3].x, targetX, moveSpeed / 100);  // 使用 lerp 函数进行线性插值移动
        eyes[3].y = lerp(eyes[3].y, targetY, moveSpeed / 100);
    }
}