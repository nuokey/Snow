const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const title = document.getElementById("title");

const score = document.getElementById("score");

let animationId;
let pastTime;

let wind = 0.5;
let gravity = 1;

let snow = []

let snowdrift = [];



for (let i = 0; i < 500; i++) {
    snow.push([getRandomInt(canvas.width), getRandomInt(canvas.height), getRandomArbitrary(3, 4)]);
}


window.onload = startAnimation;


function startAnimation() {
	frame();
	pastTime = 0;
}

function frame() {
	animationId = requestAnimationFrame(frame);

	let time = Date.now();
	let delta = time - pastTime;
	let fps = Math.floor(1000 / delta);

	if (fps <= 60) {
		draw();
		pastTime = Date.now();
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.strokeStyle = "white";
    ctx.strokeRect(canvas.width / 2 - 50, canvas.height - 100, 100, 100);
    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 50 - 25, canvas.height - 100);
    ctx.lineTo(canvas.width / 2, canvas.height - 165);
    ctx.lineTo(canvas.width / 2 + 75, canvas.height - 100);
    ctx.lineTo(canvas.width / 2 - 50 - 25, canvas.height - 100);
    ctx.stroke();
    ctx.fillRect(canvas.width / 2 - 10, canvas.height - 70, 20, 20);
    ctx.fillStyle = "black";
    ctx.fillRect(canvas.width / 2 - 1, canvas.height - 70, 2, 20);
    ctx.fillRect(canvas.width / 2 - 10, canvas.height - 61, 20, 2);

    if (getRandomInt(100) == 0) {
        // wind += getRandomArbitrary(-10, 10)
    }
 
    snow.forEach(e => {
        ctx.fillStyle = "white";
        ctx.fillRect(e[0], e[1], e[2], e[2]);
        e[1] += gravity;

        // e[0] += getRandomArbitrary(-0.5, 0.5);
        // e[1] += getRandomArbitrary(-0.5, 2);

        e[0] += wind;

        if (e[1] >= canvas.height) {
            e[0] = getRandomInt(canvas.width);
            e[1] = 0;
        }
        if (e[0] > canvas.width) {
            e[0] = 0;
            console.log('aaaa')
        }
        if (e[0] < 0) {
            e[0] = canvas.width;
        }
    });
}

canvas.addEventListener('mousemove', function (e) {
    y1 = e.pageY - e.target.offsetTop;
    // y2 = y1;
})

document.addEventListener('keydown', function (event) {
    if (event.key == "ArrowUp") {
        gravity -= 0.1;
    }
    if (event.key == "ArrowDown") {
        gravity += 0.1;
    }
    if (event.key == "ArrowRight") {
        wind += 0.1;
    }
    if (event.key == "ArrowLeft") {
        wind -= 0.1;
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  