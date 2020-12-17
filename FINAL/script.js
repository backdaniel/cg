var scene;
var camera;
var renderer;
var ground;
var objLoader;
var textureLoader;
var spotLight;

var vaca1 = [];
var vaca2 = [];
var vaca3 = [];
var vaca4 = [];
var vaca5 = [];
var eagle1 = [];
var sheep1 = [];

var guiFunction = function(){
	const gui = new dat.GUI();
	var parametroQualquer;
	param = {
		animal: ""
	};    
	var chAnimal = gui.add(param, 'animal', ['vaca1', 'vaca2', 'vaca3', 'vaca4', 'vaca5', 'eagle1', 'sheep1']).name("Animal");
	chAnimal.onChange(function(parametroQualquer){
		if (parametroQualquer == 'vaca1'){
			console.log(vaca1.position);
			camera.lookAt(vaca1.position);
		} else if (parametroQualquer == 'vaca2'){
			console.log(vaca2.position);
			camera.lookAt(vaca2.position);
		} else if (parametroQualquer == 'vaca3'){
			console.log(vaca3.position);
			camera.lookAt(vaca3.position);
		} else if (parametroQualquer == 'vaca4'){
			console.log(vaca4.position);
			camera.lookAt(vaca4.position);
		} else if (parametroQualquer == 'vaca5'){
			console.log(vaca5.position);
			camera.lookAt(vaca5.position);
		} else if (parametroQualquer == 'eagle1'){
			console.log(eagle1.position);
			camera.lookAt(eagle1.position);
		} else if (parametroQualquer == 'sheep1'){
			console.log(sheep1.position);
			camera.lookAt(sheep1.position);
		}
	});
	gui.open();
};

var criaGround = function (){
	textureLoader = new THREE.TextureLoader();
	groundTexture = textureLoader.load('../assets/grass.jpg');
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
	fbxLoader = new THREE.FBXLoader();
	textureLoader = new THREE.TextureLoader();
	fbxLoader.load('../assets/Cow.fbx', function(object) {
		vaca1 = object;
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = textureLoader.load("../assets/UVCow.png");
				child.material.shininess = 0;
			}
		});
		object.scale.x = 0.01;
		object.scale.y = 0.01;
		object.scale.z = 0.01;
		object.position.z = 20;
		object.position.x = 20;
		object.position.y = -1;
		object.castShadow = true;
		scene.add(object);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	fbxLoader.load('../assets/Cow.fbx', function(object) {
		vaca2 = object;
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = textureLoader.load("../assets/UVCow.png");
				child.material.shininess = 0;
			}
		});
		object.scale.x = 0.01;
		object.scale.y = 0.01;
		object.scale.z = 0.01;
		object.position.z = 20;
		object.position.x = 10;
		object.position.y = -1;
		object.castShadow = true;
		scene.add(object);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	fbxLoader.load('../assets/Cow.fbx', function(object) {
		vaca3 = object;
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = textureLoader.load("../assets/UVCow.png");
				child.material.shininess = 0;
			}
		});
		object.scale.x = 0.01;
		object.scale.y = 0.01;
		object.scale.z = 0.01;
		object.position.z = -20;
		object.position.x = -20;
		object.position.y = -1;
		object.castShadow = true;
		scene.add(object);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	fbxLoader.load('../assets/Cow.fbx', function(object) {
		vaca4 = object;
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = textureLoader.load("../assets/UVCow.png");
				child.material.shininess = 0;
			}
		});
		object.scale.x = 0.01;
		object.scale.y = 0.01;
		object.scale.z = 0.01;
		object.position.z = -20;
		object.position.x = -10;
		object.position.y = -1;
		object.castShadow = true;
		scene.add(object);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	fbxLoader.load('../assets/Cow.fbx', function(object) {
		vaca5 = object;
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = textureLoader.load("../assets/UVCow.png");
				child.material.shininess = 0;
			}
		});
		object.scale.x = 0.01;
		object.scale.y = 0.01;
		object.scale.z = 0.01;
		object.position.z = 20;
		object.position.x = -10;
		object.position.y = -1;
		object.castShadow = true;
		scene.add(object);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	fbxLoader.load('../assets/Eagle.fbx', function(object) {
		eagle1 = object;
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = textureLoader.load("../assets/UVEagle.png");
				child.material.shininess = 0;
			}
		});
		object.position.z = -20;
		object.position.x = 10;
		object.position.y = 10;
		object.castShadow = true;
		scene.add(object);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	fbxLoader.load('../assets/Sheep.fbx', function(object) {
		sheep1 = object;
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = textureLoader.load("../assets/UVSheep.png");
				child.material.shininess = 0;
			}
		});
		object.scale.x = 0.01;
		object.scale.y = 0.01;
		object.scale.z = 0.01;
		object.position.z = -30;
		object.position.x = 5;
		object.position.y = -2;
		object.castShadow = true;
		scene.add(object);    
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
