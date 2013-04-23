var five = require('johnny-five'),
		exec = require('child_process').exec,
		volume = -1;

function adjustVolume(newVolume, callback) {
	if (volume != newVolume) {
		callback = callback || function() {};

		exec('osascript -e "set Volume ' + newVolume + '"', function(err) {
			if (err) {
				return callback(err);
			}

			volume = newVolume;

			console.log('Adjusted volume to ' + newVolume);

			callback();
		});
	}
};

/* START IT UP */
adjustVolume(0, function(err) {
	console.log(err);

	var board = new five.Board();

	board.on('ready', function(err, data) {
		var ping = new five.Ping(3), lastDistance = 0;

		ping.on('read', function(err, data) {
			if (this.inches < 21) {
				adjustVolume(parseInt(this.inches / 2));
			}
		});
	});
});