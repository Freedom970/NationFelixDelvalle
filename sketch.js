var nations;
var keyBox;

var inputRange = 0;
var inputMouse = 0;
var inputMouseScale = 0;

var colors = [];



function preload(){
   
  nations = loadJSON("nationData.json");
 
 keyBox = loadImage("keyBox.png"); 
}

function setup() {
 
 colors = [color(50,25,100),color(120,90,158),color(210,255,160),color(286,100,60),color(252,100,86)];
 createCanvas(1500,1000);
 angleMode(DEGREES);
  inputRange = width/2
    //this specifies the input of the range at 750




  
}





function draw() {
 

  
  
   background(20);
   //noStroke();
   
   
      textSize(60);
   textAlign(CENTER);
    text("Income Vs LifeExpectancy",750,50);
   
   
   
   textSize(20);
   fill('yellow');
   
   push();
   translate(80,500);
   rotate(-90);
   text("Life Expectancy",0,0);
   pop();
   

   
   text("Income",600,850);
   
  image(keyBox,1300,50);
   
    inputMouse = constrain(mouseX,width/2,width) - width/2;
   
   textSize(150);
   textAlign(CENTER);
   //noStroke();
  
 
   
   
   fill('yellow');
   text(floor(map(inputMouse,0,width/2,1800,2009)),width* 0.8,height* 0.8);
   
  fill('white');
   
   line(800,600,1500,600);
   
   fill('yellow');
   noStroke();
   ellipse(inputMouseScale, 600, 30, 30);
   inputMouseScale = constrain(mouseX,800,1500);
  
   noStroke();
  
  

  fill('white');
    
   textSize(20);
   //noStroke();
   
   textAlign(CENTER);
   fill('red');
 
      
   for(var i = 0;i < 162;i++){
      var tempY = dataReturn(i,"lifeExpectancy",height-20,0,inputMouse,inputRange);
      var tempX = dataReturn(i,"income",100,width-200,inputMouse,inputRange);
 
      dataEllipse(tempX,tempY,i,"population",15,25,inputMouse,inputRange);
     
   }
   stroke('white');
   
   fill('white');
   line(100,50,100,800);
   line(100,800,1000,800);
   
   for(var i = 150; i < 1000; i+=50){
     
      line(i,750,i,800);
      
      
      var incomeNumber = round(map(i,150,1000,0,100));
      push();
      translate(i-5,775);
      rotate(-90);
      text(incomeNumber + " K",0,0);
      pop();
   }
    for(var j = 0; j < 800; j+=50){
     
      line(100,j,150,j);
      
      
    var ageNumber = round(map(j,5,800,95,0));
      push();
      translate(135,j-5);
      rotate(0);
      text(ageNumber + " Yrs",0,0);
      pop();
   }
 
}

function dataEllipse(xpos,ypos,nationNumber,property,minSize,maxSize,inputPos,inputMax){
  
  var category = "nations[" + nationNumber + "]." + property;
   
  var inputPropLength = eval(category + ".length -1");
   
    
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
    inputProp = floor(inputProp);
    inputProp = constrain(inputProp,0,inputPropLength);
     
  
  var propName = "region";
  var region = eval("nations[" + nationNumber + "]." + propName);
  
  switch(region){
    case "America":
      fill(colors[0]);
    break;
      
    case "Europe & Central Asia":
      fill(colors[4]);
    break;
    
    case "Sub-Saharan Africa":
      fill(colors[1]);
    break;
    
    case "Middle East & North Africa":
      fill(colors[2]);
    break;
    
    case "East Asia & Pacific":
      fill(colors[3]);
    break;
    
    case "South Asia":
      fill(colors[3]);
    break;
    
    default:
      fill(0);
    break;
  }
 
  

  var visualizeProp = eval(category + "[inputProp][1]");
  
    visualizeProp = map(visualizeProp,0,140000000,minSize,maxSize);
    
      ellipse(xpos,ypos,visualizeProp,visualizeProp);
      
      fill(0);
   
}

function dataReturn(nationNumber,property,minRange,maxRange,inputPos,inputMax){
  
   
  var category = "nations[" + nationNumber + "]." + property;
   
    
  var inputPropLength = eval(category + ".length -1");
  
    
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
    inputProp = floor(inputProp);
    inputProp = constrain(inputProp,0,inputPropLength);
  

  var visualizeProp = eval(category + "[inputProp][1]");
  
  var propertyMax = 0;
  
    if(property == "lifeExpectancy"){
      propertyMax = 90; 
      visualizeProp = map(visualizeProp,0,propertyMax,minRange,maxRange);
    }
    
    if(property == "income"){
      propertyMax = 10000;
      
 
      var totalRange = maxRange - minRange;
      var lowerTwoThirds = minRange + (totalRange * .66);
      
   
      if(visualizeProp < 20000){
      
        visualizeProp = map(visualizeProp,0,20000,minRange,lowerTwoThirds);
      }
      if(visualizeProp > 20000){
      visualizeProp = map(visualizeProp,20000,propertyMax,lowerTwoThirds,maxRange);
      }
    }
  
    
    
        return visualizeProp;
}