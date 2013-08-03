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
	var scale = 0.0004;
	var difx = 0;
	var dify = 0;
	var prevx = 0;
	var prevy = 0;
	var velx, vely;
	var started = false;
	
	window.addEventListener("mousemove", function (event) {
		if (!started) {
			prevx = event.clientX;
			prevy = event.clientY;
			started = true;
		}
		x = event.clientX;
		y = event.clientY;
		velx = x - prevx;
		vely = y - prevy;
		difx += (velx * scale);
		dify += (vely * scale);

		prevx = x;
		prevy = y;
	}, false);
	
	function render() {
		cube0.rotation.y += difx;
		cube0.rotation.x += dify;
		difx *= 0.97;
		dify *= 0.97;
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