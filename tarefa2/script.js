var scene;
var camera;
var renderer;
var cube;
var velocity = {
	x: 1,
	y: 1,
	z: 1
};

function createCube() {
	var geometry = new THREE.BoxGeometry(10, 10, 10);
	red = new THREE.Color(1, 0, 0);
	green = new THREE.Color(0, 1, 0);
	blue = new THREE.Color(0, 0, 1);
	var colors = [red, green, blue];
	for (var i = 0; i < 3; i++) {
		geometry.faces[4 * i].color = colors[i];
		geometry.faces[4 * i + 1].color = colors[i];
		geometry.faces[4 * i + 2].color = colors[i];
		geometry.faces[4 * i + 3].color = colors[i];
	}
	var material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: true});
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

function onKeyDown(e) {
	console.log(e.keyCode);
	if (e.keyCode == 32) { // space
		cube.rotation.x += 0.05;
		cube.rotation.y += 0.05;
		cube.rotation.z += 0.05;
	}
	if (e.keyCode == 38) { // up
		console.log(cube.position.y)
		console.log(window.innerHeight)
		if (cube.position.y < 30) {
			cube.position.y += velocity.y;
		}
	}
	if (e.keyCode == 40) { // down
		if (cube.position.y > -30) {
			cube.position.y -= velocity.y;
		}
	}
	if (e.keyCode == 37) { // left
		if (cube.position.x > -30) {
			cube.position.x -= velocity.x;
		}
	}
	if (e.keyCode == 39) { // right
		if (cube.position.x < 30) {
			cube.position.x += velocity.x;
		}
	}
};

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 100;
	createCube();
	document.addEventListener('keydown', onKeyDown);
	render();
	window.addEventListener('resize', onWindowResize, false);
}

window.onload = this.init;
