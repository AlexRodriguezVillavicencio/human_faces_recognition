const insertText = document.getElementById("insertText");
let isActive = false;

async function load_model(){
  if (isActive) {
    const imageData = context.getImageData(0, 0, 300,300);
    const imageTensor = tf.browser.fromPixels(imageData,1).expandDims();;
    const prediction = model.predict(imageTensor);
    const predictionArray = await prediction.array();
    tf.dispose([imageTensor, prediction]);
    if (predictionArray >= 0.5){
      insertText.innerHTML = `Human:  ${parseFloat(predictionArray).toFixed(2)*100}%`;
    }else {
      insertText.innerHTML = `Non Human: ${parseFloat(predictionArray).toFixed(2)*100}%`;
    }

    setTimeout(load_model, 150); 
  }
}

button_detection.addEventListener("click", function() {
  button_detection.disabled = true;
  isActive = true;
  load_model()
});
