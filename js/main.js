let boatImg = document.querySelector(".boat");
let farmerImg = document.querySelector(".farmer");
let sheepImg = document.querySelector(".sheep");
let wolfImg = document.querySelector(".wolf");
let varzaImg = document.querySelector(".varza");

let imgsArr = [boatImg, farmerImg, sheepImg, wolfImg, varzaImg];
let gameContainer = document.querySelector(".game");

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext('2d');

let GAME_WIDTH = canvas.offsetWidth; // 1100
let GAME_HEIGHT = canvas.offsetHeight; // 775
let CONTAINER_WIDTH = gameContainer.clientWidth; // 1903
let CONTAINER_HEIGTH = gameContainer.clientHeight; //1202

let gamePozXMin = (CONTAINER_WIDTH - GAME_WIDTH)/2; // 400.5
let gamePozYMin = 121; 

let gamePozXMax = gamePozXMin + GAME_WIDTH; // 1502.5
let gamePozYMax = gamePozYMin + GAME_HEIGHT; // 898

let ELEMENTS = [];

let initalValues = [
    {
        name: 'Farmer',
        x:30,
        y:30
    },
    {
        name: 'Boat',
        x:180,
        y:(GAME_HEIGHT/2)-300
    },
    {
        name: 'Sheep',
        x:40,
        y:230
    },
    {
        name: 'Wolf',
        x:10,
        y: 380
    },
    {
        name: 'Varza',
        x: 60,
        y: 610
    }
]

let farmer = {
    id: 0,
    pozX: 30,
    pozY: 30,
    w: 150,
    h: 150,
    name: 'Farmer',
    img: farmerImg,
    inBoat: false,
    onBoatPoz:{
        x: 280,
        y: 275
    },
    pozRight: 560
}

let boat = {
    id: 1,
    //180
    pozX: 180,
    pozY: (GAME_HEIGHT/2)-300,
    w:400,
    h:400,
    name: "Boat",
    img: boatImg,
    elements:[],
    rightPoz:460,
    isRight: false
}

let sheep = {
    id: 2,
    pozX: 40,
    pozY: 230,
    w:150,
    h:150,
    name: 'Sheep',
    img: sheepImg,
    inBoat: false,
    onBoatPoz:{
        x: 390,
        y: 300
    },
    pozRight: 670
}

let wolf = {
    id: 3,
    pozX: 10,
    pozY: 380,
    w: 200,
    h: 200,
    name: 'Wolf',
    img: wolfImg,
    inBoat: false,
    onBoatPoz:{
        x: 365,
        y: 235
    },
    pozRight: 640
}

let varza = {
    id: 4,
    pozX: 60,
    pozY: 610,
    w: 80,
    h: 80,
    name: 'Varza',
    img: varzaImg,
    inBoat: false,
    onBoatPoz:{
        x: 400,
        y: 340
    },
    pozRight: 685
}

let text = {
    tx:'GO',
    //400
    pozX: 400,
    pozY:530,
    rightX:662,
    rightText: "BACK"
}

let rectText = {
    // 60
    w:60,
    wRight: 105,
    h:40,
    //390
    pozX:390,
    pozY:500,
    rightX:650
}

ELEMENTS = [farmer, sheep, wolf, varza];

let START = ()=>{
    context.clearRect(0 ,0, GAME_HEIGHT, GAME_WIDTH);
    context.drawImage(boat.img ,boat.pozX , boat.pozY, boat.w, boat.h);
    context.drawImage(farmer.img ,farmer.pozX , farmer.pozY, farmer.w, farmer.h);
    context.drawImage(sheep.img ,sheep.pozX , sheep.pozY, sheep.w, sheep.h);
    context.drawImage(wolf.img ,wolf.pozX , wolf.pozY, wolf.w, wolf.h);
    context.drawImage(varza.img ,varza.pozX , varza.pozY, varza.w, varza.h);
    context.fillStyle  = "white";
    context.fillRect(rectText.pozX,rectText.pozY,rectText.w,rectText.h);
    context.font = "30px serif";
    context.fillStyle  = "red";
    context.fillText(text.tx,text.pozX,text.pozY);
}

START();

let detectElement = (element,e)=>{
    if( 
        (e.pageX >= gamePozXMin + element.pozX) 
        && (e.pageX <= gamePozXMin + element.pozX + element.w)
        && (e.pageY >= gamePozYMin + element.pozY) 
        && (e.pageY <= gamePozYMin + element.pozY + element.h)
        ){
            return true;

    }else{
        return false;
    }
}

let RESET = ()=>{
    context.clearRect(0 ,0, GAME_HEIGHT, GAME_WIDTH);
    context.drawImage(boat.img ,initalValues[1].x ,initalValues[1].y, boat.w, boat.h);
    context.drawImage(farmer.img ,initalValues[0].x ,initalValues[0].y,farmer.w, farmer.h);
    context.drawImage(sheep.img ,initalValues[2].x ,initalValues[2].y, sheep.w, sheep.h);
    context.drawImage(wolf.img ,initalValues[3].x ,initalValues[3].y, wolf.w, wolf.h);
    context.drawImage(varza.img ,initalValues[4].x ,initalValues[4].y, varza.w, varza.h);    
}

canvas.addEventListener("click",(e)=>{

    let textStatus = detectElement(rectText, e);
    if(textStatus == true && boat.elements.length == 2){
        boat.pozX = boat.rightPoz;
        boat.isRight = true;
        text.pozX = text.rightX;
        text.tx = text.rightText;
        rectText.pozX = rectText.rightX;
        rectText.w = rectText.wRight;

        boat.elements.forEach(element=>{
            element.pozX = element.pozRight;
        });
        START();
    }

    if(boat.isRight ==false){
        ELEMENTS.forEach((element)=>{
            if(detectElement(element,e)){
    
                if(element.inBoat == false && boat.elements.length<=1){
                    if(element.name == 'Farmer'){
                        boat.elements.push(element);
                        element.inBoat = true;
                        element.pozX = element.onBoatPoz.x;
                        element.pozY = element.onBoatPoz.y;
    
                        START();
                    }else{
                        if(boat.elements.length == 0){
                            boat.elements.push(element);
                            element.inBoat = true;
                            element.pozX = element.onBoatPoz.x;
                            element.pozY = element.onBoatPoz.y; 
                            START();
                        }
                        else{
                            if(farmer.inBoat == true){
                                boat.elements.push(element);
                                element.inBoat = true;
                                element.pozX = element.onBoatPoz.x;
                                element.pozY = element.onBoatPoz.y; 
                                START();
                            }
                        }
                    }
    
                }else{
                    initalValues.forEach((initial)=>{
                        if(initial.name == element.name){
                            element.inBoat = false;
                            let nou = boat.elements.filter(e=> e.name != element.name);
                            boat.elements = nou;
                            element.pozX = initial.x;
                            element.pozY = initial.y;
                            
                        }
                    });
                    START();
                }
    
    
            }
        })


    }
    
});

let boatAnimationHandle =()=>{

}