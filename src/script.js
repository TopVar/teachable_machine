//https://editor.p5js.org

//video
let video;
//label para mostrar la palabra esperando
let label = "Esperando...";
//el clasificador
let classifier;
//ulr del modelo de teachable machine
let modelURL = 'https://teachablemachine.withgoogle.com/models/N8cOlxUtD/';

//se carga el modelo
function preload(){
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

//setup del canvas para visualizar el video de la camara
function setup(){
  createCanvas(640, 520);
  //crea el video
  video = createCapture(VIDEO);
  video.hide();

  //empieza la clasifiacion llamado a la función
  classifyVideo();
}

//clasificar el video
function classifyVideo(){
    classifier.classify(video, gotResults);
}

function draw(){
    background(0);

    //dibujar el video
    image(video, 0, 0);

    //dibujar el label correspondiente
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(label, width / 2, height - 16);

    let emoji = "😁";
    let mensaje = "";
    if(label == "Bonbon"){
        emoji = "🍭";
        mensaje = "Comestible";
    } else if(label == "Lentes"){
        emoji = "👓";
        mensaje = "Objeto";
    }else if(label == "Destronillador"){
        emoji = "🪛";
        mensaje = "Herramienta";
    }

    //dibuja el emoji
    textSize(256);
    text(emoji, width / 2, height / 2);
    textSize(32);
    text(mensaje, width / 2, height / 2);
}

//Obtine los resultados de la clasificación
function gotResults(error, results){
    //captura el error por si algo sale mal
    if(error){
        console.error(error);
        return;
    }

    // muestra en consula los resultados de la clasificación
    console.log(results);

    //asigna al label el valor mayor de la calsificación y seguir clasificando
    label = results[0].label;
    classifyVideo();
}