

const video = document.querySelector('.webcam');

const videoCanvas = document.querySelector('.video');
const videoCanvasCtx = videoCanvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCanvasCtx = faceCanvas.getContext('2d');

const faceDetector = new FaceDetector();


const SIZE = 10;
const SCALE = 1.5;


// function populate(){
//     navigator.mediaDevices.getUserMedia({
//         video: {
//            width: 1280,
//            height: 720
//         }
//     }).then(stream => {
//         console.log(stream);
//         video.srcObject = stream;
//         video.play();
//     })
// }

// Либо можем переписать эту функцию 

// console.log(faceDetector);

async function populate(){
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
           width: 1280,
           height: 720
        }
    });

    videoCanvas.width = 1280;
    videoCanvas.height = 720;

    faceCanvas.width = 1280;
    faceCanvas.height = 720;

    video.srcObject = stream;
    await video.play();
}

function censor(boundingBox) {
    faceCanvasCtx.imageSmoothingEnabled = false;

    faceCanvasCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height)

    // draw the small face
    faceCanvasCtx.drawImage(
        // 5 source args
        video, // where does the source come from?
        0, // where do we start the source pull from?
        0,
        video.width, video.height,
        // 4 draw args
        0, // where should we start drawing the x and y?
        0,
        SIZE,
        SIZE
    )
    // take that face back out and draw it back normal size
    // draw the small face back on, but scaled up
    const width = boundingBox.width * SCALE;
    const height = boundingBox.height * SCALE;
    faceCanvasCtx.drawImage(
        videoCanvas, // source
        0, // where do we start the source pull from?
        0,
        SIZE,
        SIZE,
        //drawing args
        0,
        0,
        width,
        height
    );
}

function draw({boundingBox}){
    const {left, top, width, height} = boundingBox;
    videoCanvasCtx.lineWidth = 2;
    videoCanvasCtx.strokeStyle = '#ffc600'

    videoCanvasCtx.clearRect(0,0, videoCanvas.width, videoCanvas.height);
    censor(boundingBox);
    videoCanvasCtx.strokeRect(left, top, width, height);


}

async function detect(){
    const faces = await faceDetector.detect(video);
    faces.forEach(draw);
    requestAnimationFrame(detect);
}



populate().then(detect);