document.addEventListener("deviceready", watchForShake, false);

function watchForShake() {
	var currentx;
	var currenty;
	var currentz;
	var watchID2;
	var watchID3;
	var shake1 = false;
	var shake2 = false;

	navigator.accelerometer.getCurrentAcceleration(onLoad, onErrorLoad);

	function getAcceleration() {
		navigator.accelerometer.getCurrentAcceleration(
			accelerometerSuccess, accelerometerError);

		function accelerometerSuccess(acceleration) {
			alert('Acceleration X: ' + acceleration.x + '\n' +
				'Acceleration Y: ' + acceleration.y + '\n' +
				'Acceleration Z: ' + acceleration.z + '\n' +
				'Timestamp: ' + acceleration.timestamp + '\n');
		};

		function accelerometerError() {
			alert('onError!');
		};
	}

	var accelerometerOptions2 = {
		frequency: 200
	}

	var accelerometerOptions = {
		frequency: 500
	}
	var watchID = navigator.accelerometer.watchAcceleration(
		accelerometerSuccess, accelerometerError, accelerometerOptions);

	var previousAcceleration = {
		x: currentx,
		y: currenty,
		z: currentz
	};

	/*function accelerometerSuccess(acceleration)
		{
			var accelerationChange = {};
			if (previousAcceleration.x !== null) {
				accelerationChange.x = Math.abs(previousAcceleration.x - acceleration.x);
				accelerationChange.y = Math.abs(previousAcceleration.y - acceleration.y);
				accelerationChange.z = Math.abs(previousAcceleration.z - acceleration.z);
			}

			previousAcceleration = {
				x: acceleration.x,
				y: acceleration.y,
				z: acceleration.z
			};

			if (accelerationChange.x + accelerationChange.y + accelerationChange.z > 10) {
				$(".row").empty();
				displayStartingHand(viewdeckcards);
			}
		}*/ // Another method for shaking if first one doesn't work


	function accelerometerSuccess(acceleration) {
		if (Math.abs(acceleration.x) >= 6 || Math.abs(acceleration.y) >= 6) {
			currentx = acceleration.x;
			currenty = acceleration.y;

			shake1 = true;

			watchID2 = navigator.accelerometer.watchAcceleration(
				accelerometerSuccess2, accelerometerError, accelerometerOptions2);
		}
	};

	function accelerometerSuccess2(acceleration) {
		if ((Math.abs(acceleration.x) >= 6 || Math.abs(acceleration.y) >= 6) && shake1) {
			if (acceleration.x < currentx || acceleration.y < currenty) {
				currentx = acceleration.x;
				currenty = acceleration.y;

				shake2 = true;

				watchID3 = navigator.accelerometer.watchAcceleration(
					accelerometerSuccess3, accelerometerError, accelerometerOptions2);
			}
		}

		setTimeout(function () {
			navigator.accelerometer.clearWatch(watchID2);
		}, 1000);
	};

	function accelerometerSuccess3(acceleration) {
		if ((Math.abs(acceleration.x) >= 6 || Math.abs(acceleration.y) >= 6) && shake1 && shake2) {
			if (acceleration.x > currentx || acceleration.y > currenty) {
				currentx = acceleration.x;
				currenty = acceleration.y;

				$(".row").empty();
				displayStartingHand(viewdeckcards);

				shake1 = false;
				shake2 = false;
			}
		}

		setTimeout(function () {
			navigator.accelerometer.clearWatch(watchID3);
		}, 1000);
	};

	function accelerometerError() {
		alert('onError!');
	};

	function onLoad(acceleration) {
		currentx = acceleration.x;
		currenty = acceleration.y;
		currentz = acceleration.z;
	}

	function onErrorLoad() {
		alert("error");
		currentx = 0;
		currenty = 0;
	}
}