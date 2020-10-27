var scene;
var camera;
var renderer;
var sphere;
var sphereVelocity = {
	x: 1,
	y: 1
};

function spawnSphere() {
	var geometry = new THREE.SphereGeometry(10, 10, 10);
	var material = new THREE.MeshBasicMaterial({color: "blue"});

	sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
}

function render() {
	requestAnimationFrame(render);
	animateSphere();
	renderer.render(scene, camera);
}

function animateSphere() {
	if (this.sphere.position.x > 30 || this.sphere.position.x < -30) {
		sphereVelocity.x = -sphereVelocity.x;
	}
	if (this.sphere.position.y > 20 || this.sphere.position.y < -20) {
		sphereVelocity.y = -sphereVelocity.y;
	}
	this.sphere.position.x += sphereVelocity.x;
	this.sphere.position.y += sphereVelocity.y;
}

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
	spawnSphere();
	render();
	window.addEventListener('resize', onWindowResize, false);
}

window.onload = this.init;
