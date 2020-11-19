var scene;
var camera;
var renderer;

var velocity = 0.1;

var createACube = function() {
    var geometry = new THREE.BoxGeometry( 20, 20, 20 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
    cubo = new THREE.Mesh( geometry, material );
    var geometry = new THREE.ConeGeometry( 7, 20, 10 );
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff} );
    cone = new THREE.Mesh( geometry, material );
    var geometry = new THREE.CylinderGeometry( 7, 7, 20, 12 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ffff} );
    cilindro = new THREE.Mesh( geometry, material );
    var geometry = new THREE.DodecahedronGeometry( 10 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff00ff} );
    dodecaedro = new THREE.Mesh( geometry, material );
    var geometry2 = new THREE.SphereGeometry(6, 32,32);
    var material2 = new THREE.MeshBasicMaterial( { color: 0xff0000} );
    esfera = new THREE.Mesh(geometry2, material2);

    cubo.position.set(30,30,40);
    cone.position.set(-30,20,10);
    cilindro.position.set(0,20,00);
    dodecaedro.position.set(0,10,30);
    esfera.position.set(30,10,-40);

    scene.add(cubo);
    scene.add(cone);
    scene.add(cilindro);
    scene.add(dodecaedro);
    scene.add(esfera);
};

var init = function() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 
                                60                                          // angulo
                                ,window.innerWidth / window.innerHeight     //aspect
                                ,0.1                                       // Near
                                ,1000                                      // Far
                            );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    this.createACube();
	camera.position.set( 0, 20, 100 );

   const ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 100, 100, 10 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff})
    ); //Cria a forma plana

    ground.rotation.x = - Math.PI / 2; // rotaciona para que ela fique paralela ao eixo X
    ground.position.y-=6; // Posiciona o ground abaixo da nossa figura.
    scene.add( ground );
    render();
    document.addEventListener('keydown', onKeyDown ); 
};

var render = function() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
};

var onKeyDown = function(e){
    console.log(e.keyCode);
    if(e.keyCode == 65){ // a
				camera.position.z-=1;
    }
    if(e.keyCode == 81){ // q
				camera.position.z+=1;
    }
    if(e.keyCode == 38){ // up
				camera.position.y+=1;
    }
    if(e.keyCode == 40){ // down
				camera.position.y-=1;
    }
    if(e.keyCode == 37){ // left
				camera.position.x-=1;
    }
    if(e.keyCode == 39){ // right
				camera.position.x+=1;
    }
    if (e.keyCode == 32){ // espaco
				camera.rotation.y+=0.05;
    }
}

window.onload = this.init;
