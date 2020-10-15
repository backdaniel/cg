var scene;
var camera;
var renderer;
var sphere;
var velocidadeEsferaX = 1;
var velocidadeEsferaY = 1;

var criaEsfera = function() {
	var geometry = new THREE.SphereGeometry(10, 10, 10);
	var material = new THREE.MeshBasicMaterial({color: "blue"});

	sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
};

var render = function() {
	requestAnimationFrame(render);
	animaEsfera();
	renderer.render(scene, camera);
};

var animaEsfera = function() {
	if (this.sphere.position.x > 20 || this.sphere.position.x < -20) {
		velocidadeEsferaX = -velocidadeEsferaX;
	}
	if (this.sphere.position.y > 20 || this.sphere.position.y < -20) {
		velocidadeEsferaY = -velocidadeEsferaY;
	}
	this.sphere.position.x += velocidadeEsferaX;
	this.sphere.position.y += velocidadeEsferaY;
};

var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 100;

	criaEsfera();

	render();
};

window.onload = this.init;
