var scene;
var camera;
var renderer;
var cube;
var velocidadeCuboX = 1;
var velocidadeCuboY = 1;

var criaCubo = function() {
	var geometry = new THREE.BoxGeometry(10, 10, 10);
	var material = new THREE.MeshBasicMaterial({color: "blue"});

	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
};

var render = function() {
	requestAnimationFrame(render);
	animaCubo();
	renderer.render(scene, camera);
};

var animaCubo = function() {
	if (this.cube.position.x >= 35 || this.cube.position.x <= -35) {
		volocidadeCubo = velocidadeCubo * -1;
	}
	this.cube.position.x += velocidadeCuboX;
	this.cube.position.y += velocidadeCuboY;
};

var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 100;

	criaCubo();

	render();
};

window.onload = this.init;
