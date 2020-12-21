var scene;
var camera;
var renderer;
var mixer;
var ground;
var objLoader;
var textureLoader;
var spotLight;
var bounce = 0;
var bounceMult = 1;
var loadFinished = false;
var clock = new THREE.Clock();

var criaGround = function (){
	textureLoader = new THREE.TextureLoader();
	groundTexture = textureLoader.load('../assets/mars.jpg');
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set(20, 20);
	groundTexture.anisotropy = 16;
	groundTexture.encoding = THREE.sRGBEncoding;
	ground = new  THREE.Mesh(
		new THREE.PlaneGeometry(1050, 1050, 25,25),
		new THREE.MeshBasicMaterial({map : groundTexture})
	);
	ground.receiveShadow = true;
	ground.rotation.x -= Math.PI / 2;
	scene.add(ground);
};

var loadObj = function() {
	objLoader = new THREE.OBJLoader();
	fbxLoader = new THREE.FBXLoader();
	textureLoader = new THREE.TextureLoader();
	for (var i = 0; i < 90; i++) {
		objLoader.load('../assets/Skull.obj', function(object) {
			object.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					child.material.color.setHex("0x"+Math.floor(Math.random()*16777215).toString(16));
				}
			});
			object.scale.x = 1;
			object.scale.y = 1;
			object.scale.z = 1;
			object.position.z = Math.floor(Math.random() * (600 - -600 + 1) + -600);
			object.position.x = Math.floor(Math.random() * (600 - -600 + 1) + -600);
			object.position.y = Math.floor(Math.random() * (60 - 0 + 1) + 0);
			object.rotation.z += Math.floor(Math.random() * (360 - 0 + 1) + 0);
			object.rotation.x += Math.floor(Math.random() * (360 - 0 + 1) + 0);
			object.rotation.y += Math.floor(Math.random() * (360 - 0 + 1) + 0);
			object.castShadow = true;
			scene.add(object);    
		}, function(andamento) {
			console.log((andamento.loaded / andamento.total *100) + "% pronto!");
		}, function (error) { console.log(error); });
	}
	fbxLoader.load('../assets/Earth.fbx', function(object) {
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = textureLoader.load("../assets/earth.jpg");
				child.material.shininess = 0;
			}
		});
		object.scale.x = 1;
		object.scale.y = 1;
		object.scale.z = 1;
		object.position.z = 20;
		object.position.x = 20;
		object.position.y = 300;
		object.castShadow = true;
		scene.add(object);    
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
	fbxLoader.load('../assets/Wolf.fbx', function(object) {
		mixer = new THREE.AnimationMixer(object);
		mixer.clipAction(object.animations[3]).play()
		object.traverse(function(child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = textureLoader.load("../assets/Wolf_Body.jpg");
				child.material.shininess = 0;
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
		object.scale.x = 2;
		object.scale.y = 2;
		object.scale.z = 2;
		object.position.z = Math.floor(Math.random() * (60 - -60 + 1) + -60);
		object.position.x = Math.floor(Math.random() * (60 - -60 + 1) + -60);
		object.position.y = 0;
		object.rotation.y += Math.floor(Math.random() * (360 - 0 + 1) + 0);
		object.castShadow = true;
		scene.add(object);    
		loadFinished = true;
	}, function(andamento) {
		console.log((andamento.loaded / andamento.total *100) + "% pronto!");
	}, function (error) { console.log(error); });
}

var init = function() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);
	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.y = 5;
	camera.rotation.order = 'YXZ';
	spotLight = new THREE.SpotLight(0xffffff);
	scene.add(spotLight);
	spotLight.position.set(0, 0, 0);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 100;
	spotLight.shadow.mapSize.height = 100;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 99;
	spotLight.shadow.camera.fov = 40;
	renderer.shadowMap.enable = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	scene.fog = new THREE.Fog( 0x000000, 200, 500 );
	scene.add(new THREE.AmbientLight(0xff0000));
	criaGround();
	loadObj();
	render();
	document.addEventListener('keydown', onKeyDown);
};

var render = function() {
	requestAnimationFrame(render);
	let delta = clock.getDelta();
	if (loadFinished == true) {
		mixer.update(delta);
	}
	if (bounce > 1) {
		bounceMult = -1;
	} else if (bounce < 0) {
		bounceMult = 1;
	}
	renderer.render(scene, camera);
};


var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 65){ // a
			camera.translateX(-0.5);
			if (bounceMult == 1) {
				bounce += 0.1;
			} else if (bounceMult == -1) {
				bounce -= 0.1;
			}
			camera.position.y = 5 + bounce;
    }
    if(e.keyCode == 68){ // d
			camera.translateX(0.5);
			if (bounceMult == 1) {
				bounce += 0.1;
			} else if (bounceMult == -1) {
				bounce -= 0.1;
			}
			camera.position.y = 5 + bounce;
    }
    if(e.keyCode == 87){ // w
			camera.translateZ(-1);
			if (bounceMult == 1) {
				bounce += 0.1;
			} else if (bounceMult == -1) {
				bounce -= 0.1;
			}
			camera.position.y = 5 + bounce;
    }
    if(e.keyCode == 83){ // s
			camera.translateZ(1);
			if (bounceMult == 1) {
				bounce += 0.1;
			} else if (bounceMult == -1) {
				bounce -= 0.1;
			}
			camera.position.y = 5 + bounce;
    }
    if(e.keyCode == 38){ // up
			camera.rotation.x+=0.02;
    }
    if(e.keyCode == 40){ // down
			camera.rotation.x-=0.02;
    }
    if(e.keyCode == 37){ // left
			camera.rotation.y+=0.04;
    }
    if(e.keyCode == 39){ // right
			camera.rotation.y-=0.04;
    }
}

window.onload = this.init;
