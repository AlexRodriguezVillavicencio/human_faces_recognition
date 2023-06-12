  
const containtText = document.getElementById("containtText");
let parsedText;

async function load_model(img){
    button_detection.disabled = true;
    const imageTensor = tf.browser.fromPixels(img,1).expandDims();;
    const prediction = model.predict(imageTensor);
    const predictionArray = await prediction.array();
    tf.dispose([imageTensor, prediction]);
    model.dispose();
    return predictionArray
}

button_detection.addEventListener("click", async function() {
  var htmlContent = `
  <div class="text__group">
  <div class="text">
      <div id="insertText"></div>
  </div>
  </div>
    `;
  containtText.innerHTML = htmlContent
  const insertText = document.getElementById("insertText");
    const imageData = context.getImageData(0, 0, 300,300);
    const namePre = await load_model(imageData)
    button_detection.disabled = false;
    if (namePre >= 0.5){
      insertText.innerHTML = `Human:  ${parseFloat(namePre).toFixed(3)*100}%`;
    }else {
      insertText.innerHTML = `No Human: ${parseFloat(namePre).toFixed(3)*100}%`;
    }
});
