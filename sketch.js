var myCapture;
var myVida;
var imageType = 0;
var mySynt = [];

function setup() {
    createCanvas (640, 480);// typical camera resolution
    myCapture = createCapture (VIDEO);
    myCapture.size (320, 240)
    myCapture.hide();//hide to hide the preview from the camers
    myVida = new Vida();// create new object based on the vida library
    myVida.imageFilterFeedback = 0.95;
    myVida.imageFilterThreshold = 0.5;//lower values - more sensitive system to define the brightness of the pixel
    myVida.progressiveBackgroundFlag = true; // by defalt it is true, so we need to define the other condition
    myVida.mirror = myVida.MIRROR_HORIZONTAL; //to give natural image, not flipped
    myVida.handleActiveZonesFlag = true; //variable to define zones in the image that may be trigerred
    myVida.addActiveZone(
        "zone1",
        0.3, 0.3, 0.3, 0.3,
        trigger

    );
    myVida.addActiveZone(
        "zone2",
        0.7, 0.7, 0.7, 0.7,
        trigger

    );
    frameRate (30);
}


function draw() {
    background (0,0, 255);
    if (myCapture === null) return; //if there is no camera
    if (myCapture === undefined) return; // when camera is connected, but smth is not set yet
    if (!myCapture.width) return;// ! - is a sign that function does not exist, we use it in case we have no access to the camera for some reason
    myVida.update(myCapture)
    drawVidaImage();
    myVida.drawActiveZones (0, 0, width, height);
}

function mouseReleased(){ //we are not accessing the capture devise, so we don`t need to test if the camera is available or not
    imageType += 1; //+=1 means add 1 to the loop
    if (imageType > 3) imageType = 0;

}

function keyReleased() { // we will be acessing capture function directly, thats why further we need to add the conditions t check the camera
    if (myCapture === null) return; //if there is no camera
    if (myCapture === undefined) return; // when camera is connected, but smth is not set yet
    if (!myCapture.width) return;
    myVida.setBackgroundImage (myCapture);
}

function trigger (_zone) { // adding _ before the parameted will help us quickly get in the code it is a parameter, not a global or other value
    console.log(
        _zone.id + " " + _zone.isMovementDetectedFlag //_zone.isMovementDetectedFlag will be tru if the zone is triggered or false if not triggered
    );
}

function drawVidaImage () {
    switch(imageType) {// is similar to if ... as, but we need only 1 parameter for this instruction
        // but several cases to define the paraneters we want to test
            case 0:
            image(myVida.currentImage, 0, 0, width, height);
            break;
            case 1:
            image (myVida.backgroundImage, 0, 0, width, height);
            break;
            case 2:
            image (myVida.differenceImage, 0, 0, width, height);
            break;
            case 3:
            image (myVida.thresholdImage, 0, 0, width, height);
            break;
        }
}
