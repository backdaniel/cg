var scene;
var camera;
var renderer;
var cube;
var velocityX = 1;
var velocityY = 1;
var velocityZ = 1;
var velocityRotation = 0.1;
var mouseDown = false;
var mousePosition = {
	x: 0,
	y: 0
}

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

var createCube = function() {
	var geometry = new THREE.BoxGeometry(2, 10, 2);
	red = new THREE.Color(1, 0, 0);
	green = new THREE.Color(0, 1, 0);
	blue = new THREE.Color(0, 0, 1);
	var colors = [red, green, blue]
	for (var i = 0; i < 3; i++) {
		geometry.faces[4 * i].color = colors[i];
		geometry.faces[4 * i + 1].color = colors[i];
		geometry.faces[4 * i + 2].color = colors[i];
		geometry.faces[4 * i + 3].color = colors[i];
	}
	var material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: true});
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	var geometry2 = new THREE.SphereGeometry(2, 32, 32);
	var material2 = new THREE.MeshBasicMaterial({color: 0xffffff});
	sphere = new THREE.Mesh(geometry2, material2);
	sphere.position.y -= 5;
	cube.add(sphere);

	pivot = new THREE.Group();
	pivot.position.set(0, 0, 0);
	pivot.add(cube);

	scene.add(pivot);
	cube.position.y += pivot.position.x + 5;
};

var render = function() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};

var onKeyDown = function(e) {
	console.log(e.keyCode);
	if (e.keyCode == 32) { // space
		if (pivot.rotation.z > 2 || pivot.rotation.z < 0) {
			velocityRotation *= -1
		}
		pivot.rotation.z += velocityRotation;
	}
	if (e.keyCode == 38 || e.keyCode == 87) { // up
		cube.position.y += velocityY;
	}
	if (e.keyCode == 40 || e.keyCode == 83) { // down
		cube.position.y -= velocityY;
	}
	if (e.keyCode == 39 || e.keyCode == 68) { // right
		cube.position.x += velocityX;
	}
	if (e.keyCode == 37 || e.keyCode == 65) { // left
		cube.position.x -= velocityX;
	}
	if (e.keyCode == 61) { // plus
		cube.scale.x += 0.1;
		cube.scale.y += 0.1;
		cube.scale.z += 0.1;
	}
	if (e.keyCode == 173) { // minus
		cube.scale.x -= 0.1;
		cube.scale.y -= 0.1;
		cube.scale.z -= 0.1;
	}
};

var onMouseDown = function(e) {
	mouseDown = true;
};

var onMouseUp = function(e) {
	mouseDown = false;
};

var onMouseMove = function(e) {
	if (mouseDown) {
		var deltaMovement = {
			x: e.offsetX - mousePosition.x,
			y: e.offsetY - mousePosition.y,
		}
		//cube.position.x += deltaMovement.x*0.1;
		//cube.position.y += deltaMovement.y*-0.1;
		cube.rotation.x += toRadians(deltaMovement.y*1)*0.5;
		cube.rotation.y += toRadians(deltaMovement.x*1)*0.5;
	}
	mousePosition = {
		x: e.offsetX,
		y: e.offsetY,
	}
};

var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 100;
	createCube();
	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('mousedown', onMouseDown);
	document.addEventListener('mouseup', onMouseUp);
	document.addEventListener('mousemove', onMouseMove);
	render();
};

window.onload = this.init;
