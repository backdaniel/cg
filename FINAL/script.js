var scene;
var camera;
var renderer;
var ground;
var objLoader;
var textureLoader;
var spotLight;
var bounce = 0;
var bounceMult = 1;

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
	ground.rotation.x -= Math.PI / 2;
	scene.add(ground);
};

var loadObj = function() {
	objLoader = new THREE.OBJLoader();
	fbxLoader = new THREE.FBXLoader();
	textureLoader = new THREE.TextureLoader();
}

var init = function() {

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 140);
	camera.position.y = 5;
	camera.rotation.order = 'YXZ';

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
	render();
	document.addEventListener('keydown', onKeyDown);
};

var render = function() {
	requestAnimationFrame(render);
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
