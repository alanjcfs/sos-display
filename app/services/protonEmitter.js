var services = angular.module('sos.services');
services.service('protonEmitterService', function($log) {
	
	this.createProton3 = function(canvas) {
		
		var hcolor = 0;
		
		proton = new Proton;
		emitter = new Proton.Emitter();
		//setRate
		emitter.rate = new Proton.Rate(new Proton.Span(2, 8), new Proton.Span(.01));
		//addInitialize
		emitter.addInitialize(new Proton.Position(new Proton.PointZone(0, 0)));
		emitter.addInitialize(new Proton.Mass(1));
		emitter.addInitialize(new Proton.Radius(6, 12));
		emitter.addInitialize(new Proton.Life(2));
		emitter.addInitialize(new Proton.V(new Proton.Span(0.3), new Proton.Span(0, 360), 'polar'));
		//addBehaviour
		emitter.addBehaviour(new Proton.Alpha(1, 0));
		emitter.addBehaviour(new Proton.Scale(.1, 1.3));
		var color1 = Color.parse("hsl(" + (hcolor % 360) + ", 100%, 50%)").hexTriplet();
		var color2 = Color.parse("hsl(" + ((hcolor + 50) % 360) + ", 100%, 50%)").hexTriplet();
		colorBehaviour = new Proton.Color(color1, color2);
		emitter.addBehaviour(colorBehaviour);
		
		emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), 'collision'));
		emitter.p.x = canvas.width / 2;
		emitter.p.y = canvas.height / 2;
		emitter.emit();
		//add emitter
		proton.addEmitter(emitter);

		return proton;
	}	
});

/* 
		mode.createProton1 = function(image) {

		proton = new Proton;
		emitter = new Proton.Emitter();
		emitter.rate = new Proton.Rate(new Proton.Span(1, 5));
		emitter.addInitialize(new Proton.Mass(1));
		emitter.addInitialize(new Proton.Radius(3, 40));
		emitter.addInitialize(new Proton.Life(1, 3));
		emitter.addInitialize(new Proton.Velocity(new Proton.Span(-1, 1), new Proton.Span(-3, 0), 'vector'));
		emitter.addBehaviour(new Proton.Gravity(9.8));
		emitter.addBehaviour(new Proton.Color('random'));
		emitter.addBehaviour(new Proton.RandomDrift(30, 0, .035));
		emitter.emit();
		proton.addEmitter(emitter);

		renderer = new Proton.Renderer('easel', proton, mode.stage);
		renderer.start();
		renderer.blendFunc("SRC_ALPHA", "ONE");
	}

	mode.createProton2 = function(image) {

		proton = new Proton;
		emitter = new Proton.Emitter();

		// sets rate of particles from emitter
		emitter.rate = new Proton.Rate(new Proton.Span(10, 50), new Proton.Span(.05, .1));
		emitter.addInitialize(new Proton.ImageTarget(image));

		// sets the 'mass' of the particle, affects how it interacts with the gravity
		emitter.addInitialize(new Proton.Mass(1.0));

		// sets lifespan of the particle
		emitter.addInitialize(new Proton.Life(1, 3));
		emitter.addInitialize(new Proton.Position(new Proton.CircleZone(0, 0, 10)));
		emitter.addInitialize(new Proton.Velocity(new Proton.Span(5, 8), new Proton.Span(-15, 15), 'polar'));
		emitter.addBehaviour(new Proton.RandomDrift(5, 5, .05));
		emitter.addBehaviour(new Proton.Alpha(0.75, 0));

		// sets range of size of particle objects
		emitter.addBehaviour(new Proton.Scale(new Proton.Span(1, 0.1), 1));
		emitter.addBehaviour(new Proton.G(12));
		emitter.addBehaviour(new Proton.Color("random"));
		emitter.p.x = 50;
		emitter.p.y = 50;
		emitter.emit();
		proton.addEmitter(emitter);

		renderer = new Proton.Renderer('easel', proton, mode.stage);
		renderer.start();
		renderer.blendFunc("SRC_ALPHA", "ONE");
		console.log("done creating emitter");
	}

	mode.createProton4 = function(stage) {
		
		var bitmap = new createjs.Bitmap("media/particle.png");
		var texture = new createjs.Shape(new createjs.Graphics().beginBitmapFill(bitmap).drawRect(0, 0, 80, 80));
		console.log("texture:", texture);
		mode.createProton2(texture);
	}
	*/