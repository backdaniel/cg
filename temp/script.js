var scene;
var camera;
var renderer;
var cube;
var velocityX = 1;
var velocityY = 1;
var velocityZ = 1;

var createCube = function() {
	var geometry = new THREE.CubeGeometry(10, 10, 10);
	var material = new THREE.MeshBasicMaterial({color: 'teal'});
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
};

var animateCube = function() {
	if (this.cube.position.x > 30 || this.cube.position.x < -30) {
		velocityX = -velocityX;
	}
	if (this.cube.position.y > 20 || this.cube.position.y < -20) {
		velocityY = -velocityY;
	}
	if (this.cube.position.z > 20 || this.cube.position.z < -20) {
		velocityZ = -velocityZ;
	}
	this.cube.position.x += velocityX;
	this.cube.position.y += velocityY;
	this.cube.position.z += velocityZ;
};

var rotateCube = function() {
	var rotacaoQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.05, 0.05, 0, 'XYZ'));
	cube.quaternion.multiplyQuaternions(rotacaoQuaternion, cube.quaternion);
};

var render = function() {
	requestAnimationFrame(render);
	//animateCube();
	renderer.render(scene, camera);
};

var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 100;
	createCube();
	document.addEventListener('keydown', leDoTeclado);
	render();
};

var leDoTeclado = function(e) {
	console.log(e.keyCode);
	if (e.keyCode == 32) { // space
		cube.rotation.x += 0.05;
		cube.rotation.y += 0.01;
		cube.rotation.z += 0.01;
	}
	if (e.keyCode == 40) { // space
		cube.position.x += velocityX;
	}
};

window.onload = this.init;
