const video = document.querySelector("#video");
const contenitore = document.querySelector(".contenitore");
const span=document.querySelector("#umore");

function iniziaVideo() {
  
  navigator.getUserMedia({
     video: {} 
    },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(iniziaVideo)


let espressioni = "";
const emozioni = {
  angry: 0,
  disgusted: 0,
  fearful: 0,
  happy: 0,
  neutral: 0,
  sad: 0,
  surprised: 0
}



video.addEventListener('play', () => {
  
  const canvas = faceapi.createCanvasFromMedia(video)
  contenitore.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks().withFaceExpressions();

    if (detections.length >= 1) {
      const emozione = leggiEmozioni(detections);
      for (const [key, value] of Object.entries(emozione)) {
        if (value > 60) {
          switch (key) {
            case "angry":
             span.innerText="Arrabbiato";
              break;
            case "disgusted":
              span.innerText="Disgustato";
              break;
            case "fearful":
              span.innerText="Preoccupato";
              break;
            case "happy":
              span.innerText="Felice";
              break;
            case "neutral":
              span.innerText="Neutrale";
              break;
            case "sad":
              span.innerText="Triste";
              break;
            case "surprised":
              span.innerText="Sorpreso";
              break;

          }
        }
      }
    }
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }, 200)
})



function leggiEmozioni(detections) {
  espressioni = detections[0].expressions;
  for (const [key, value] of Object.entries(espressioni)) {
    emozioni[key] = value.toFixed(2) * 100;
  }
  return emozioni;

}