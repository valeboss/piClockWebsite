var canvas;
var context;
var pixelList = [];

function processFiles(files) {
    var file = files[0];

    canvas = document.getElementById("canvas_picture");
    context = canvas.getContext("2d");
    var img = new Image();
    var reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
        context.drawImage(img,0,0,600,600);
        processImage(context);
        drawGrid(0.1, "black");
    };
    reader.readAsDataURL(file);
}

function drawGrid(lineWidth, color){
    context.lineWidth = lineWidth;
    context.strokeStyle=color;
    for(var y=0; y<=14; y++)
    {
        for(var x=0; x<=14; x++)
        {
            context.strokeRect(40 * x,40 * y, 40, 40);
        }
    }
}

function processImage(context){
    var imageData;
    for(var y=0; y<=14; y++)
    {
        for(var x=0; x<=14; x++)
        {
            imageData=context.getImageData(40 * x, 40 * y, 40, 40);
            processPixel(imageData, x, y);
        }
    }
}

function processPixel(imageData, x, y){
    var red = 0;
    var green = 0;
    var blue = 0;
    var pixels = imageData.data;
    for (var i = 0, n = pixels.length; i < n; i += 4) {
        red += pixels[i];
        green += pixels[i+1];
        blue += pixels[i+2];
    }

    red = Math.round(red/(pixels.length/4));
    blue = Math.round(blue/(pixels.length/4));
    green = Math.round(green/(pixels.length/4));

    rgbPixel = {r:red, b:blue, g:green};
    pixelList.push(rgbPixel);

    colorizePixel(red, green, blue, x, y);
}

function colorizePixel(r, g, b, x, y){
    var canvas_2 = document.getElementById("canvas_LED_Matrix");
    var context_2 = canvas_2.getContext("2d");
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    context_2.fillStyle = rgb;
    context_2.fillRect(x*40,y*40,40,40);
}

function sendData() {
    pixelList.unshift("set_rendered_picture");
    socket.send(JSON.stringify(pixelList));
}
