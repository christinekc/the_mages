// App JS functions

// Server side code

// Speeding

/* Speeding warning */
function speedingWarning(speed) {
    var textMom = false;
    console.log("Current speed: " + speed);
    console.log("You are going too fast! I'm scared.");
    var id = gm.voice.startTTS(success, "You are going too fast! I'm scared.");
    if (id == 1){
        // error; raise it somehow
    }
    function success() {
        // let it roll
    }
    gm.voice.stopTTS(id);

    textMom = true;
    sendSpeedingText(speed);
}

/* Send speeding data to mom */
function sendSpeedingText(speed) {

}

// Location data
/* Send location data */
function sendLocation() {

}

/* Set the destination of the car to home */
function setDestination() {
	console.log("Set destination to home");
	// var dest
	//gm.nav.setDestination(goHomeSuccess, goHomeFailure, dest, true);
}

function goHomeSuccess(list) {
  console.log("Destination has been set");
}

function goHomeFailure(err) {
  console.log("Having trouble setting destination");
}
