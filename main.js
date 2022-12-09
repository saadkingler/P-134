status = "";
objects = [];
function preload()
{
    img = loadImage('background.jpg');
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function play()
{
    Object_detector = ml5.objectDetector('cocossd',model_loaded);
    document.getElementById("status").innerHTML = "status: Detecting Objects"; 
    play()
}    

function model_loaded()
{
    console.log("model loaded");
    status = true;
}

function draw()
{
    image(video,0,0,380,380);
    if(status!="")
    {
       
        r = random(255);
        g = random(255);
        b = random(255);

        Object_detector.detect(video,got_results);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: Detecting Objects";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are: "+objects.length;
            fill(r,g,b);
            persent = floor(objects[i].confidence *100);
            text(objects[i].label+""+persent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
   
}

function got_results(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}