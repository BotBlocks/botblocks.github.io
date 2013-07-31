function init( webglFlag ) {
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, 250/220, 0.1, 500);
	scene.add( camera );
	
	var geo0 = new THREE.CubeGeometry( 12, 12, 12 );
	var mat = new THREE.MeshBasicMaterial( { wireframe: true } );
	var cube0 = new THREE.Mesh( geo0, mat );
	cube0.position.z = -16;
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
	var scale = 0.005;
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
		cube0.rotation.y = - x;

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