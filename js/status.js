var socket;


window.onload = function() {
    connect();
};

function connect() {
    //socket = new WebSocket("ws://localhost:8889/WebSocket");
    socket = new WebSocket("ws://raspberrypi.fritz.box:8889/WebSocket");
	// "ws://raspberrypi:8889/WebSocket"
    // Listen to all the web socket events.
    socket.onopen = connectionOpen;
    socket.onmessage = messageHandler;
    socket.onerror = errorOccurred;
}

/*function disconnect() {
    socket.close();
}*/

function connectionOpen() {
    document.getElementById('status_tornado').textContent = "online";
    document.getElementById('status_raspberrypi').textContent = "online";
    getStatus();
}

function getStatus() {
    socket.send("get_status");
}

function messageHandler(e) {
    var received_message = (e.data).split(" ");
    if (received_message[0] === "status_clock") {
        document.getElementById('status_clock').textContent = received_message[1];
    }
    else {

    }

}

function errorOccurred() {
    //alert("Keine Uhr gefunden.")
}
