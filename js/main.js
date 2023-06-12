  
const containtText = document.getElementById("containtText");
let parsedText;

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
    console.log(parseFloat(namePre).toFixed(3))
    if (namePre >= 0.5){
      insertText.innerHTML = `Human:  ${parseFloat(namePre).toFixed(3)*100}%`;
    }else {
      insertText.innerHTML = `No Human: ${parseFloat(namePre).toFixed(3)*100}%`;
    }
});