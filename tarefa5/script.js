var scene;
var camera;
var renderer;
var ground;
var objLoader;
var textureLoader;
var spotLight;
var obj; //objeto dinamico.

var vaca = [];
var vaca2 = [];
var vaca3 = [];
var ptero1 = [];
var ptero2 = [];

var guiFunction = function(){
	const gui = new dat.GUI();
	var parametroQualquer;
	param = {
		animal: ""
	};    
	var chAnimal = gui.add(param, 'animal', ['vaca', 'vaca2', 'vaca3', 'ptero1', 'ptero2']).name("Animal");
	chAnimal.onChange(function(parametroQualquer){
		if (parametroQualquer == 'vaca'){
			console.log(vaca.position);
			camera.lookAt(vaca.position);
		} else if (parametroQualquer == 'vaca2'){
			console.log(vaca2.position);
			camera.lookAt(vaca2.position);
		} else if (parametroQualquer == 'vaca3'){
			console.log(vaca3.position);
			camera.lookAt(vaca3.position);
		} else if (parametroQualquer == 'ptero1'){
			console.log(ptero1.position);
			camera.lookAt(ptero1.position);
		} else if (parametroQualquer == 'ptero2'){
			console.log(ptero2.position);
			camera.lookAt(ptero2.position);
		}
	});
	gui.open();
};

var criaGround = function (){
	textureLoader = new THREE.TextureLoader();
	groundTexture = textureLoader.load('assets/grass.jpg');
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set(20, 20);
	groundTexture.anisotropy = 16;
	groundTexture.encoding = THREE.sRGBEncoding;
	ground = new  THREE.Mesh(
		new THREE.PlaneGeometry(1050, 1050, 25,25),
		new THREE.MeshBasicMaterial({map : groundTexture})
	);
	ground.rotation.x -= Math.PI / 2;
	ground.position.y=-2;
	scene.add(ground);
};

var loadObj = function(){
	objLoader = new THREE.OBJLoader();
	objLoader.load('assets/Cow.obj', function(object) {
		vaca = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0x003484");
			}
		});
		vaca.position.z = 20;
		vaca.position.x = 20;
		vaca.position.y = 0;
		vaca.castShadow = true;
		scene.add(vaca);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	objLoader.load('assets/Cow.obj', function(object) {
		vaca2 = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0xde4c84");
			}
		});
		vaca2.position.z = 10;
		vaca2.position.x = 20;
		vaca2.position.y = 0;
		vaca2.castShadow = true;
		scene.add(vaca2);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	objLoader.load('assets/Cow.obj', function(object) {
		vaca3 = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0x4cc01e");
			}
		});
		vaca3.position.z = -20;
		vaca3.position.x = -20;
		vaca3.position.y = 0;
		vaca3.castShadow = true;
		scene.add(vaca3);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	objLoader.load('assets/Pterodactyl.obj', function(object) {
		ptero1 = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0xba812d");
			}
		});
		ptero1.position.z = 20;
		ptero1.position.x = 20;
		ptero1.position.y = 20;
		ptero1.castShadow = true;
		scene.add(ptero1);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	objLoader.load('assets/Pterodactyl.obj', function(object) {
		ptero2 = object;
		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.color.setHex("0x69456a");
			}
		});
		ptero2.position.z = -20;
		ptero2.position.x = -20;
		ptero2.position.y = 20;
		ptero2.castShadow = true;
		scene.add(ptero2);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
}

var init = function() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xcce0ff);
	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 140);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	loadObj();

	spotLight = new THREE.SpotLight(0xffffff);
	scene.add(spotLight);
	spotLight.position.set(100, 100, 100);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 100;
	spotLight.shadow.mapSize.height = 100;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 99;
	spotLight.shadow.camera.fov = 40;

	renderer.shadowMap.enable = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	scene.add(new THREE.AmbientLight(0xffffff));

	criaGround();
	guiFunction();
	render();
};

var render = function() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}
