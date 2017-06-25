// App JS functions

// User functions

function createUser() {
    var form = document.getElementById('myForm');
    var name = form.elements['name'].value;
    var address = form.elements['address'].value;
    var phone = form.elements['phone'].value;
    if (!address || !phone) {
        return;
    }
    users.push({
        name: name,
        address: address,
        phone: phone,
        accessibility: true,
        learner: true,
        locationMonitoring: true,
        preferences: {},
        speedWarning: true,
        speedLimit: 100
    });

    var newDiv = document.createElement('div');

    var newIcon = document.createElement('img');
    newIcon.src = "images/user.png";
    newIcon.alt = name;
    newIcon.onclick = function() {
        changePageFocus('tabs', name);
    };
    // var newBreak = document.createElement('br');
    var newTitle = document.createElement('p');
    newTitle.innerHTML = name;

    newDiv.appendChild(newIcon);
    // newDiv.appendChild(newBreak);
    newDiv.appendChild(newTitle);
    newDiv.classList.add("user");

    var parent = document.getElementById('welcome').children[2];
    parent.insertBefore(newDiv, parent.firstChild);
    changePageFocus('welcome', null);
    userCreated = true;
}

// Speeding
var strike = 0;
var speedingLock = false;
var textingLock = false;
var ttsId = 0;


/* Speeding warning */
function speedingWarning(speed) {
    // delay
    if (speedingLock) return;
    speedingLock = true;
    setTimeout(function() {
        speedingLock = false;
    }, 3000);

    strike += 1;
    console.log("Current speed: " + speed + " Strike: " + strike);

    switch (strike) {
        // case 0:
        //     say("You are going too fast.");
        //     break;
        case 1:
            say("You are going too fast!");
            break;
        case 2:
            say("I'm scared!!!");
            break;
        case 3:
            say("Slow down or I'll text mom.");
            break;
        case 4:
            say("I'm not kidding.");
            break;
        case 5:
            say("That's it - I'm texting mom.");
            if (textingLock) return;
            textingLock = true;
            setTimeout(function() {
                textingLock = false;
            }, 6000);
            //sendSpeedingText(speed);
            console.log("Texting mom");
            strike = 0;
            break;
    }
}

function resetWarning(speed) {
    if (strike != 0) {
        strike = 0;
        say("That's much better.");
    }
}

/* Helper function for tts */
function say(text) {
    // gm.voice.stopTTS(ttsId);
    ttsId = gm.voice.startTTS(function() {}, text);
    console.log("TTS: " + ttsId + " " + typeof ttsId);
}


/* Send speeding data to mom */
function sendSpeedingText(speed) {
    console.log("Sending speeding text");
    var username = "Andrey";

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://32891a36.ngrok.io", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("speed=" + speed + "&" + "user=" + username + "&" + "From=" + "GM Car");
}

// Location data
/* Send location data */
function sendLocation(lon, lat) {
    console.log("Location has changed!");
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://32891a36.ngrok.io", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("lon=" + lon + "&" + "lat=" + lat);
}

// My Maps

/* Find locations around me */
function findLocations(radius) {

}

function modifyWeight() {

}

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function checkSpeed(){
    console.log("Running checkSpeed");
    var speedLimit = 80;
    var id = gm.info.watchVehicleData(getSpeedSuccess, ['average_speed']);

    function getSpeedSuccess(data) {
        if (data.average_speed > (speedLimit + 20)) {
            speedingWarning(data.average_speed);
        } else if (data.average_speed < speedLimit) {
            resetWarning(data.average_speed);
        }
    }
}

function checkLocation(){
    var id = gm.info.watchPosition(processPosition, true);
    var thres = 10;

    function processPosition(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        console.log("lat: " + lat + "lon: " + lon);

        var currTime = Date.now();

        if(currTime - prevTime > 10000){
            console.log("Wow we've moved a lot");
            prevTime = currTime;
            sendLocation(lon, lat);
        }
    }

}
