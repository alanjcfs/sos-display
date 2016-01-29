// constants
var KINECT_DATA_FILE = './dummy-data/skeletal-stress-test.json';
var LISTEN_PORT = '8008';

var io = require('socket.io')(LISTEN_PORT);
var json = require('json-file');
var term = require('terminal-kit').terminal;
var output = json.read(KINECT_DATA_FILE);
var array = output.get('bodiesData');
var frameCounter = 0;

term.nextLine();
term.bold.yellow("Dummy Kinect Server started.  Listening for connections on port: " + LISTEN_PORT).nextLine();

io.on('connection', function(socket){

	term.colorGrayscale(200)("Connection established, serving dummy data: '" + KINECT_DATA_FILE + "'").nextLine();
	var counter = 0;

	var intervalID = setInterval(function() {
		socket.emit("bodyFrame", array[counter]);

		counter++;
		if(counter >= array.length) {
			counter = 0;
		}

		frameCounter++;

		// arbitrarly large move back to hit start of line. (pending better way)
		term.eraseLine().blue("BodyFrame sent: " + frameCounter).move(-1000,0);

	}, 33);

	// disconnect event handler
	socket.on('disconnect', function() {
		// stop the interval timer
		clearInterval(intervalID);
		term.nextLine().bold.red("Disconnected from client.").nextLine();
	});
});

