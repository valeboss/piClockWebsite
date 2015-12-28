function updateInfo_on(color) {
    document.getElementById('r_on').value = color.rgb[0]*255;
    document.getElementById('g_on').value = color.rgb[1]*255;
    document.getElementById('b_on').value = color.rgb[2]*255;
    color.rgb.unshift("on_colour_rgb");
    var on_jsonColor = JSON.stringify(color.rgb);
    socket.send(on_jsonColor);
}

function updateInfo_off(color) {
    document.getElementById('r_off').value = color.rgb[0]*255;
    document.getElementById('g_off').value = color.rgb[1]*255;
    document.getElementById('b_off').value = color.rgb[2]*255;
    color.rgb.unshift("off_colour_rgb");
    var off_jsonColor = JSON.stringify(color.rgb);
    socket.send(off_jsonColor);
}

function updateClockMode(radio) {
    var stringToSend = ["set_mode", radio.value];
    //stringToSend.unshift("set_mode");
    socket.send(JSON.stringify(stringToSend));
}
