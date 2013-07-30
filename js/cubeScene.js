function init( webglFlag ) {
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, 250/220, 0.1, 500);
	scene.add( camera );
	
	var geo0 = new THREE.CubeGeometry( 1.5, 1.5, 1.5 );
	var geo1 = new THREE.CubeGeometry( 1.0, 1.0, 1.0 );
	var geo2 = new THREE.CubeGeometry( 0.5, 0.5, 0.5 );
	var mat = new THREE.MeshBasicMaterial( { wireframe: true } );
	var cube0 = new THREE.Mesh( geo0, mat );
	var cube1 = new THREE.Mesh( geo1, mat );
	var cube2 = new THREE.Mesh( geo2, mat );
	cube0.add(cube1);
	cube1.add(cube2);
	cube0.position.z = -2;
	scene.add(cube0);

	//  RENDERER
	var renderer;
	if (webglFlag) {
		renderer = new THREE.WebGLRenderer();
	} else {
		renderer = new THREE.CanvasRenderer();
	}
	
	renderer.setSize( 250, 220 );
	document.getElementById("cube").appendChild( renderer.domElement );
	renderer.setClearColor (new THREE.Color (0x333333), 1);
	
	var x = 0;
	var y = 0;
	var scale = 0.003;
	window.addEventListener("click", function (event) {
		x = event.clientX * scale;
		y = event.clientY * scale;
	}, false);
	
	window.addEventListener("mousemove", function (event) {
		x = event.clientX * scale;
		y = event.clientY * scale;
	}, false);
	
	function render() {
		
		cube0.rotation.x = - y + Math.PI / 2;
		cube0.rotation.y = x;
		cube1.rotation.x = - y;
		cube1.rotation.y = x;
		cube2.rotation.x = - y;
		cube2.rotation.y = x;
		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	
	render();
	
}

if (Detector.webgl) {
	init( true );
} else {
	init( false );
}  