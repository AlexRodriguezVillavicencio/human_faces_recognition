const modelURL = '../model_recognition/model.json'; 

async function load_model(img){
    const model = await tf.loadLayersModel(modelURL);
    const imageTensor = tf.browser.fromPixels(img,1).expandDims();;
    const prediction = model.predict(imageTensor);
    const predictionArray = await prediction.array();
    tf.dispose([imageTensor, prediction]);
    model.dispose();

    return predictionArray
}