/* Match Animator (c) 2019-21 Craig Duncan

Note: this file loads AFTER loadgame.js so any globals defined there persist for this file.
Includes thisBall, the array holding ball results.

*/
//
var masterflag=0;
var numballs = 0;
  var elem = document.getElementById("txt");
  //var value = parseInt(elem.innerHTML, 10);
  var value=0;
  var interval;
  //global array to hold our text to be output to screen
  var messages;
  var text ="starting value - file msg";
  var reset=false; //primitive boolean not wrapper
  var begincycle=false;
  var ids = ['test','these','words'];
  //match data
  var matchdate=" ";
  //var Innings1 = new Innings();
  //var Innings2 = new Innings();
  //var maxballs = 120;
  var ballcount=0;
  //on-screen display
  var commentarytext="default";
  
   // On-field markers/references.
    var crease1=60;
    var crease2=crease1+300;
    var bouncepoint=crease1+50;
    var shotpoint=crease1+20;
  //canvas variables
  var batter_sprite = [];
  var helmet_sprite = [];
  //width should be 700 as per html?
  var canvas, ctx,
    canv_width = 600,
    canv_height = 200,
    batbuffer = 118;
    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    keymessage="",

    //base position srX was 10 but now 0; batter_sprite_x was (canv_width / 2) - 25
     sprite_y=[]
     batter_sprite_x=[]
     batter_sprite_x[1] = crease1, batter_sprite_x[2]=crease2,
     sprite_y[1] = canv_height - batbuffer, sprite_y[2] = canv_height - batbuffer,sprite_w = 65, sprite_h = 85,
     bwl_srcX=0,
     bwl_srcY=0,
     bwl_sprite_x=canv_width*0.9; //make this 90% of width
     bwl_sprite_y=sprite_y[1],
     ump_sprite_x=crease2+30,
     ump_sprite_y=sprite_y[1], //umpire starting xy position
     ump_srcX=0,
     ump_srcY=0,
     /*
     srcX=1120, 
     srcY=0; //batter frame starting position - NOT NEEDED?
     */
     srcX=[];
     srcY=[];
     ball_sprite_x=crease2; //this should be near runend/bwlend
     ball_sprite_y=200-100;//canvas height-100
     base_ball_y=100; //the ballheight for post-hit on ground
    //----define individual variables from here
    //var bowler_framelist=[560,630,700,770,840,910,980,1050];
    
    var batter_frame=[];
    var bowler_frame=0;
    var umpire_frame=0;
    //sound
    var ball_hit;
    var bwl_ft;
    var bat_tap;
    //set some default conditions
    var canv_ballcount=1;
    var canv_innings=1;
    var bwl_start=0; //counter for sine function
    //AI goals
    var bowler_goal="none";
    var batter_goal="none";
    var umpire_goal="none";
    //
    var batter_mode=[];
    var bowler_mode="run";
    var umpire_mode="watch";
    var batterhead_mode=[];
    var bwl_mode=0;
    var lap=0; //lap counter;
    var inningscount=1;
    var currentruns=0;
    var wicketresult=0;
    var byeruns = 0;
    var legbyeruns = 0;
    var wideruns = 0;
    var noballruns = 0;
    var umpirecode="default";
    var canv_out_text=" ";
    var bowlername="default";
    //lap counter globals
    var allruns=0;
    var laps=0;
    //
    var ball_mode="invisible";
    var ball_goal="idle";
    var bowlerball=0;
    var signalcode="default";
    var myTimeout;
    //var myDate = new Date();
    var startTime=0; 
    //
    var srcX_helmet=[];
    var helmet_w=39;
    var helmet_h=35;
    
    var battername=[];
    //
    var bat_helm_lt=[];
    var bat_helm_rt=[];
    var bat_helm_col=[];
    var bowlerhead_w=39;
    var bowlerhead_h=35;
   
    //
    var strikehelmet;
    var strikebowler;
    var boygirl;
    //
    var myfile=""; //TO DO: default value
    //
    var restartcheck=0;
    var datasize;

//var gameArray = new Array(); //not typed but we want a large array here.  240 balls.
mainLoader(); 
  function increment() {
      return value += 1;
  }

  //function to add arguments to string for cumulative match commentary
  function updateDisplay(value,text,innings) {
    //matchball display: elem.innerHTML = value;
    /*
    document.getElementById('msg').innerHTML = textoutput(value);
    //value of text changes because it is in an event handler
    if (text!="") {
      document.getElementById('ballbyball').innerHTML=text;
    }
    */
    if (innings==1) {
      //document.getElementById('ballbyball').innerHTML=text;
      var cty = document.getElementById('comments_inn1');
      cty.innerHTML=cty.innerHTML+text+"\n\r";
    }
    if (innings==2) {
      //document.getElementById('ballbyball').innerHTML=text;
      var cty = document.getElementById('comments_inn2');
      cty.innerHTML=cty.innerHTML+text+"\n\r";
    }
    //match statistics
  }


//function to execute animation sequence
function animationLoop() {
    //startcanvas();
    //var matchball=1; 
    //var maxballs;
   
    setupFirstBall();
    //if (restartcheck==1) {

    //}
}

function cleanUpGame() {
    
    ball_goal="achieved";
    batter_goal="achieved";
    bowler_goal="achieved";
    umpire_goal="achieved";

      //ctx.clearRect(0,0,canv_width,canv_height);
  
}

function doDrawing() {
      if(inningscount<3) {
        //doLaps();
        //displayTextLoop();  //DISABLED 
        clearCanvas();
        //keymessage updates here (20ms)
        var wrt=" ";
        if (wicketresult>0) {
          wrt=" (out)";
        }
        innball=canv_ballcount+1;
        //balldescription is not global?    
        balldescription="Ball: ("+innball+"/"+datasize+") This ball result:"+currentruns+" runs "+" wides: "+wideruns+" nb: "+noballruns+" b: "+byeruns+" lb: "+legbyeruns+wrt+"  ";
        drawSprite();
        }
}

  //javascript just accepts any number, type of argumentW!
  function textoutput(ballnum){
    //make ids global now
    //numballs = ids.length;  //this should equal array size
    var output = "default value";
    if (ballnum<numballs) {
      var output = ids[ballnum];
  }
    return output; // <-- to be printed to the div
}

//get details for first ball before animation starts
function setupFirstBall() {
     canv_ballcount=0; //first index value
     datasize=thisBall.length;
     setBallResult();
     setBatterHelmet(1);
     setBatterHelmet(2); 
     resetMainStates();
  }

function setBallResult() {
    
    battername[1]=thisBall[canv_ballcount][0];
    battername[2]=thisBall[canv_ballcount][1];
    bowlername=thisBall[canv_ballcount][2];
    currentruns=thisBall[canv_ballcount][3];
    wicketresult=thisBall[canv_ballcount][4];
    wideruns=thisBall[canv_ballcount][5];
    byeruns=thisBall[canv_ballcount][6];
    legbyeruns=thisBall[canv_ballcount][7];
    noballruns=thisBall[canv_ballcount][8];
    wr=0;
    nbr=0;
    if (noballruns>1) {
      nbr=noballruns-1;
    }
    if (wideruns>1) {
        wr=wideruns-1;
    }
    allruns=0;
    allruns=parseInt(currentruns)+parseInt(byeruns)+parseInt(legbyeruns)+wr+nbr;
    }

function startCanvas() {
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp, false);
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  setdefaultHelmets();
  startImages();
  startAnimation();
}

function startImages() {
  bgnd = new Image();
  batter_sprite[1] = new Image();
  batter_sprite[2] = new Image();
  umpire_sprite = new Image();
  bowler_sprite = new Image();
  helmet_sprite[1] = new Image();
  helmet_sprite[2] = new Image();
  ball_sprite = new Image();
  bowlerhead = new Image();
  mf='media/'
  ball_hit = new Audio(mf+"hit.wav");
  bwl_ft = new Audio(mf+"bwl_ft.wav");
  bat_tap = new Audio(mf+"bat_tap.wav");
  ctx.font = "10px Arial";
  bgnd.src = mf+'background5.png';
  ball_sprite.src=mf+'ballimg.png';
  umpire_sprite.src = mf+'umpire2.png';
  bowlerhead.src=mf+'boyheads.png';
  //colour options
  
  batter_sprite[1].src = mf+'batter3.png';
  batter_sprite[2].src = mf+'batter3.png';
  bowler_sprite.src = mf+'bowler_run3.png';
  helmet_sprite[1].src = mf+'helmets.png';
  helmet_sprite[2].src = mf+'helmets.png';  
  //setuniformcolour_bat(bat_tm1);
  //setInterval(loop, 1000/2); //delay was 1000/30 so 33 ms = 30 Hz
  }

function clearCanvas() {
  ctx.clearRect(0,0,canv_width,canv_height);
}

//UNIFORMS
/*
function setupSprites2(batteam,bowlteam) {
  //ctx2 = c.getContext("2d"); 
  console.log("Setup sprites 2. Batteam, bowlteam:",batteam,bowlteam);
  canvas.width=1700; //to allow for sprite maps size
  //batter_sprite[1]=setuniformcolour(batteam);
  setuniformcolour(batteam);
  console.log(batter_sprite[1],batter_sprite[1].width,batter_sprite[1].height);
  batter_sprite[2]=batter_sprite[1];
  helmet_sprite[1]=setteamhelmetcolour(batteam);
  helmet_sprite[2]=helmet_sprite[1];
  bowler_sprite=setbowlercolour(bowlteam);
  console.log("Finished setup");
  //ctx2.clearRect(0,0,1700,200);
  //use the canvas to draw image once at origin, change the colours, then get image data.
  //Then in animation, don't use draw, use 'put'.
  ctx.drawImage(batter_sprite[1],srcX[1],srcY[1],sprite_w,sprite_h,batter_sprite[1],sprite_y[1],sprite_w,sprite_h);
  
  canvas.width=700; //reset and will clear too

  //TO DO: clear canvas
}
*/

//return updated image data for batter sprites
function setuniformcolour_bat(myteam) {
  var uniformcolour = teamcolourRGB(myteam);
  console.log("uniform colour:",uniformcolour);
  var newBody=paintuniform(batter_sprite[1],uniformcolour);
  return newBody;
  //ctx.putImageData(newBody,0,0);
}

//return updated image data for batter helmet sprites
function setteamhelmetcolour(myteam) {
  //myimage = new Image();
  //myimage.src = "media/onehelmet_strawberry_l.tiff"; //no loading required
  var helmimage = new Image();
  helmimage.src = "media/helmets.png"; 
  var uniformcolour = teamcolourRGB(myteam);
  var newHelmet=paintuniform(helmimage,uniformcolour);
  return newHelmet;
  //ctx.putImageData(newHelmet,0,0); 
}

//return updated image data for bowler sprites
function setbowlercolour(myteam) {
  var bowlerBody = new Image();
  bowlerBody.src="media/bowler_run3.png";
  var uniformcolour = teamcolourRGB(myteam);
  var newBowler=paintuniform(bowlerBody,uniformcolour);
  return newBowler;
  //ctx.putImageData(newBowler,0,0);
}

//function to return an RGB array for chosen colour in suite
function teamcolourRGB(myteam){
  var white=[255,255,255];
  var green=[0,255,102]; // define array values as set.  Green screen.
  var pink=[255,127,169];
  var teal=[0,211,213]; 
  var black=[0,0,0];
  var ltgreen=[114,250,120];
  var orange=[255,155,0];
  var darkblue=[0,72,169];
  var heatcol=[0,190,194]; //teal
  var lightblue=[117,213,255];
  var darkgreen=[60,165,0];
  var windiesred=[171,21,0];
  var gadesred=[215,53,6];
  var black=[0,0,0];
  var sixerspink=[253,87,127]; //sixerspink
  var purple = [145,83,222];
  var banggreen=[7,192,132];
  var pocskin=[137,96,84]; //windies skin
  var ltskin=[255,204,153]; //default skin white
  var coloursuite=[darkgreen,banggreen,darkgreen,darkgreen,darkblue,black,windiesred,lightblue,ltgreen,darkgreen,orange,sixerspink,heatcol,gadesred,purple,lightblue];
  var teams=["Pakistan","Bangladesh","South Africa","Australia","England","New Zealand","West Indies","India","Sydney Thunder","Melbourne Stars","Perth Scorchers","Sydney Sixers","Brisbane Heat","Melbourne Renegades","Hobart Hurricanes","Adelaide Strikers"];
  var flip=white;
  //match colour to team name
  for (i=0;i<coloursuite.length;i++){
    if (teams[i]==myteam) {
      flip=coloursuite[i];
    }
  }
  return flip;
}

//choose appropriate skin tones
function teamskintone(myteam){
  var poc=[137,96,84]; //windies skin
  var lt=[255,204,153]; //default skin white
  var coloursuite=[poc,poc,poc,lt,lt,lt,poc,poc,lt,lt,lt,lt,lt,lt,lt,lt,lt]; 
  var teams=["Pakistan","Bangladesh","South Africa","Australia","England","New Zealand","West Indies","India","Sydney Thunder","Melbourne Stars","Perth Scorchers","Sydney Sixers","Brisbane Heat","Melbourne Renegades","Hobart Hurricanes","Adelaide Strikers"];
  var flip=lt;
  //match colour to team name
  for (i=0;i<coloursuite.length;i++){
    if (teams[i]==myteam) {
      flip=coloursuite[i];
    }
  }
  return flip;
}

//function to flip pixels that are white screen colour and transform to selected RGB
//if the canvas is not big enough it will not 'drawImage'
function paintuniform(img,mycolour) {
  //var c = document.getElementById("canvas"); // must be an html element <canvas id ="canvas"> inside <body>
  var flip=mycolour;
  console.log("img is ...",img);
  canvas.width=2000; //expand - does this clear canvas?
  ctx = canvas.getContext('2d');
  console.log("paintuniform...");
  // are we copying an already loaded image or drawing it fresh?
    if (img instanceof HTMLCanvasElement) {
        var canvasData = img.getContext('2d').getImageData(0, 0, img.width, img.height);
        ctx.putImageData(canvasData, 0, 0);
         console.log("image already defined by html");
    }
    else {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        console.log("Drew new image width, height", img.width,img.height);
    }
    //check there is an image to get from canvas
    var imgData = ctx.getImageData(0, 0, img.width, img.height);
    var i;
    //tolerance for 'white' is 244-255
  for (i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i]>=244 && imgData.data[i+1]>=244 && imgData.data[i+2]>=244 ) {
        imgData.data[i] = flip[0];
        imgData.data[i + 1] = flip[1];
        imgData.data[i + 2] = flip[2];
        imgData.data[i + 3] = 255; //alpha channel 255-0 = 255
    }
  }
  //ctx.clearRect(0,0,c.width, c.height); //if canvas is not 'refreshed' by page updates you may get cross-origin errors when posting images to same area
  ctx.putImageData(imgData,0,0); 
  canvas.width=700;
  return imgData;
  //ctx.putImageData(imgData,0,0); 
}

//uses an in-memory canvas to draw and preserve transparency
//replaces white with chosen team colour
//replaces skin tone with chosen team colour
function paint_the_white(myteam,img,sx,sy,w,h) {
  var inMemoryCanvas = document.createElement('canvas');
  var context=inMemoryCanvas.getContext('2d');
  context.drawImage(img,sx,sy,w,h,0,0,w,h); //draw correct 'subrectangle' at 0,0 on this canvas
  var flipwhite = teamcolourRGB(myteam);
  var flipskin=teamskintone(myteam);
  var defskin=[255,204,153];
  var pochair=[15,15,17];
  var lthair=[127,110,82];
  var hairdef=[255,243,182];
  var haircol;
  if (flipskin[1]==204) {
      haircol=pochair;
  }
  else {
    haircol=lthair;
  }
  var pochair=[15,15,17];
    //always drawn at origin so use 0,0
    //read from canvas, using the width data given (or use image)

    var imgData = context.getImageData(0,0,w,h);
      var i;
    //tolerance for 'white' is 244-255
  for (i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i]>=244 && imgData.data[i+1]>=244 && imgData.data[i+2]>=244 ) {
        imgData.data[i] = flipwhite[0];
        imgData.data[i + 1] = flipwhite[1];
        imgData.data[i + 2] = flipwhite[2];
        imgData.data[i + 3] = 255; //alpha channel 255-0 = 255
    }
    //skintones var poc=[137,96,84]; //windies skin. var lt=[255,204,153];
    if (flipskin[2]<100 && imgData.data[i]>=defskin[0]-5 && imgData.data[i+1]>=defskin[1]-5 && imgData.data[i+1]<=defskin[1]+5 && imgData.data[i+2]>=defskin[2]-5 && imgData.data[i+2]<=defskin[2]+5) {
        imgData.data[i] = flipskin[0];
        imgData.data[i + 1] = flipskin[1];
        imgData.data[i + 2] = flipskin[2];
        imgData.data[i + 3] = 255; //alpha 

    }
    //chainge hair if needed
    if (flipskin[2]<100 && imgData.data[i]<=hairdef[0] && imgData.data[i+1]==hairdef[1] && imgData.data[i+2]==hairdef[2]) {
        imgData.data[i] = pochair[0];
        imgData.data[i + 1] = pochair[1];
        imgData.data[i + 2] = pochair[2];
        imgData.data[i + 3] = 255; //alpha 

    }
  }
  //ctx.clearRect(0,0,c.width, c.height); //if canvas is not 'refreshed' by page updates you may get cross-origin errors when posting images to same area
  context.putImageData(imgData,0,0);  //or do draw?
  //canvas.width=700;
  return inMemoryCanvas;//imgData;
  //ctx.putImageData(imgData,0,0); 
}

//function to set some default names and helmet colour sequences so that pairs have different colours
//based on 4 colour array index values [0,3]
function setdefaultHelmets() {
  if (matchdatatype==0) {
    JCShelmets();
  }
  if (matchdatatype==1){
    CricSheetHelmets();
    //setupSprites2(bat_tm1,bat_tm2); 
  }
}

function JCShelmets() {
  basecol=0;
  for (b=0;b<thisBall.length;b++) {
    nextname=thisBall[b][0];
    if (playernames.includes(nextname)==false) {
        playernames.push(nextname);
        defcolours.push(basecol%4);
        basecol++;
      }
    }
}

function CricSheetHelmets() {
  teams=["West Indies","Bangladesh","England","Australia","Sri Lanka","South Africa","New Zealand","India","Perth Scorchers","Brisbane Heat","Sydney Sixers"];
  tcol=[1,0,2,3,0,3,1,2,1,2,2]; //these are the colours we have in helmet image file
  console.log("Team 1:",bat_tm1);
  console.log("Team 2:",bat_tm2);
  console.log("Stadium:",stadium);
  basecol1=0;
  basecol2=1;
  for (t=0;t<teams.length;t++) {
        if (teams[t]==bat_tm1) {
          basecol1=tcol[t];
        }
        if (teams[t]==bat_tm2) {
          basecol2=tcol[t];
        }
  }
  //Goes through whole match data, for the abbreviated entries (thisBall DNE lines)
  console.log("data entries:",thisBall.length);
  for (b=0;b<thisBall.length;b++) {
      nextname=thisBall[b][0];
      bat_teamname=thisBall[b][9];
      if (playernames.includes(nextname)==false) {
        playernames.push(nextname);
        //console.log("Player:",playernames[playernames.length-1]);
        if (bat_teamname==bat_tm1) {
          defcolours.push(basecol1);
          flag=1;
        }
        if (bat_teamname==bat_tm2) {
          defcolours.push(basecol2);
          flag=1;
        }
        //console.log("Colour:",defcolours[defcolours.length-1]);
      }
    }
}

//ANIMATION LOOP FUNCTIONS


function resetMainStates() {
     //sequencing
      ball_goal="idle";
      batter_goal="idle";
      bowler_goal="idle";
      umpire_goal="idle";
      //printGoals();
      //modes
      ball_mode="invisible";
      batter_mode[1]="wait"; //resting bat
      batter_mode[2]="wait";
      batterhead_mode[1]="right";
      batterhead_mode[2]="left";
      bowler_mode="run";
      umpire_mode="watch";
      batter_frame[1]=0;
      batter_frame[2]=0;
      tapwait=0;

      //random start to runup
      //bwl_sprite_x=Math.min(crease2+200+Math.floor((Math.random() * 100) + 1),2*crease2); //(crease1+300)*2=
      //positions
      bowler_frame=0;
      ball_sprite_y=base_ball_y;
      ball_sprite_x=crease2-40;
      bwl_sprite_x=crease2*2;
      batter_sprite_x[1]=crease1;
      batter_sprite_x[2]=crease2;
      srcX[1]=1120, 
      srcX[2]=1120, 
      srcY[1]=0;
      srcY[2]=0; //batter frame starting position - NOT NEEDED?
      //ball
      shotpoint=crease1+20;
      bouncepoint=crease1+50;
      //clearTimeout(pauseForEffect);
      //clearTimeout(myTimeout);
}


/*
function to obtain next ball data.  At moment, innings are handled separately to ensure separate data objects
TO DO: clarify when previous ball is 'dead ball', or goals achieved by all AI agents

*/
function nextBall() {
  
    if (batter_goal==="achieved" && bowler_goal==="achieved" && ball_goal==="achieved" && canv_ballcount<datasize) {
      canv_ballcount++;
      scoreupdate=0;

      //update the current runs
      setBallResult();
      resetMainStates();
      setBatterHelmet(1);
      setBatterHelmet(2); 
   
  }
  //if innings balls completed. REDUNDANT?
  if (canv_ballcount>datasize && inningscount==1) { //Innings1.getMaxBalls()
    //canv_ballcount=0;
    inningscount++;
  }
  }
  
//frame sets for Bowler modes
function advanceBowlerFrames() {
  //var bowler_runup=[0,70,140,210,280,350,420,490];
  //var bowler_run=[0,60,60,130,200,200];
  var bowler_run2=[70,140,210,280,350,420];
  var bowler_jump=[630,630,700,770,770,840,910,980,1050]; //630,700,770,770,840,910,980,1050
  var bowler_end=[1050]; // add an appealing bowler frame somewhere
  
  //what 'mode' is bowler in?
   
  //runup
  if (bowler_mode==="run") {
      bowler_sprite.src = mf+'bowler_run2.png';
      bowler_frame = bowler_frame % bowler_run2.length; //mod for array length
      bwl_srcX=bowler_run2[bowler_frame];
      bowler_frame++;
  }
  if (bowler_mode==="jump") {
      bowler_sprite.src = mf+'bowlersprites.png';
      bowler_frame = bowler_frame % bowler_jump.length;
      bwl_srcX=bowler_jump[bowler_frame];
      bowler_frame++;
      }
      //just do one cycle through frames
  if (bowler_mode==="standing") {
      bowler_sprite.src = mf+'bowlersprites.png';
      bwl_srcX=bowler_end[0];
    }
}

//choose/advance frameCount for Batsman depending on mode
//modes are a display state (separate to goal achieved states/position etc)
//single bat positions for manual interaction extended to multi-frames for game-play strokes

function chooseBatterModeFrames(batter) {
  //frame list cycles - single bat positions (direct; no intermediate position states yet)
  var bat_ground=[1120]; //bat down
  var bat_up=[1185]; //bat up
  var bat_high=[1255];
  var bat_block=[1395];
  var bat_drive=[1479];
  //simulation actions
  var runright=[0,70,140,210,280,350,420,490];
  var runleft=[560,630,700,770,840,910,980,1050];
  var leave=[1255,1255,1255,1255];
  var hit=[1395,1395,1395,1395,1325,1325,1325,1325];
  var block=[1395,1395,1395,1395,1395,1395];
  var drive=[1479,1479,1479,1479,1479,1479,1479,1479,1479,1479,1479,1479];
  var duck=[1550];
  var framerefs=["wait_tap","wait_high","leave","hit","block","drive","duck"];
  var frameoptions=[bat_up,bat_high,leave,hit,block,drive,duck];
      
 if (batter!=1 && batter!=2) {
      batter=1;
  }

   //waiting for bowler
  if (batter_mode[batter]==="wait") {
      batter_frame[batter]=batter_frame[batter] % bat_ground.length;
      srcX[batter]=bat_ground[batter_frame[batter]];
      batter_frame[batter]++;
  }
  //load in relevant frameoption array when the batter mode is matched.
  if (batter==1) {
     myIndex=framerefs.indexOf(batter_mode[1]);
     if(myIndex!=-1) {
      myArray=frameoptions[myIndex];
      batter_frame[1] = batter_frame[1] % myArray.length; //cycle the batter frame through the current array 
      srcX[1]=myArray[batter_frame[1]];
      batter_frame[1]++;
    }
}

    //moving right
  if (batter_mode[batter]==="lap_right") {
      batterhead_mode[batter]="right";
      getBatterHelmet(batter);
      batter_frame[batter]=batter_frame[batter] % runright.length;
      srcX[batter]=runright[batter_frame[batter]];
      batter_frame[batter]++;
  }
  //moving left
   if (batter_mode[batter]==="lap_left") {
      batterhead_mode[batter]="left";
      getBatterHelmet(batter);
      batter_frame[batter]=batter_frame[batter] % runleft.length;
      srcX[batter]=runleft[batter_frame[batter]];
      batter_frame[batter]++;
  }
  //finished - nothing else to do.  Could just do something else here.
   if (batter_mode[batter]==="end_lap") {
      srcX[batter]=bat_ground[0]; //TO DO: make this a bat grounding
   }
   getBatterHelmet[batter];
 //update srcX_helmet[1] and [2]
}

//function to select head for bowler
function getBowlerHead() {
  var girlnames=["Talia","Tahlia","Matilda","Mathilda","Charlie","Laila","Layla","Keira","Ava"];
  bowlerhead.src=mf+"boyheads.png";
   for (x=0;x<girlnames.length;x++) {
    if (bowlername===girlnames[x]);
      bowlerhead.src=mf+"girlheads.png";
   }
  
  var headsright=[0,42,85,127]; //same frame numbers for helmetright and left.
  var headsleft=[170,215,253,298];   //blond, black, ltbrn, brown = hair colour
  
  //
  var names=["Oscar","Matthew","James","Harry","Harri","Nicholas","Riley","Kyle","James","Rhagav","Matilda","Isak","Alex","Zach","Zane","Connor"];
  var colours=[1,3,3,2,1,1,2,2,0,0,2,2,1,1,1,1,3];
  
  var f = 0;
  for (x=0;x<names.length;x++) {
    if (bowlername===names[x]);
      f=colours[x];     
   }

  //default
  bwl_srcX=headsleft[f]; 
  //future
  if (bowler_mode==="walk_right") {
      bwl_srcX=headsright[f];
  }
}


//TO DO: store left, right helmet frame for each batter
//So they can be looked up, not recalculated every frame
//
//input batter is '1' or '2' depending on batter of interest
//set this to the first helmet (the 'white' helmet by default);
function getBatterHelmet(batter) {
  if (batterhead_mode[batter]==="left") {
    srcX_helmet[batter]=bat_helm_lt[batter];
  }
  else if(batterhead_mode[batter]==="right"){
    srcX_helmet[batter]=bat_helm_rt[batter];
    }
  }

//function to store the helmet colour for batter facing each ball

function setBatterHelmet(batnum) {
  var names=["Oscar","Matthew","James","Harry","Harri","Nicholas","Riley","Kyle","James","Rhagav","Matilda","Isak","Alex","Zach","Zane","Connor","Default1","Default2"]
  var colours=[1,3,3,2,1,1,2,2,0,0,2,2,1,1,1,1,3,0,2];
  //helmet and haircolours match the index number in the sprite frames
  var headsright=[0,42,85,127]; //same frame numbers for helmetright and left.
  var headsleft=[170,215,253,298]; 
  var helmcols=["white","orange","blue","green"]; //just for testing
  var f = 0;  //default is 0 (white)
  for (x=0;x<names.length;x++) {
    if (battername[batnum]===names[x]) {
        f=colours[x];     
      }
      else {
        f=getDefaultHelmet(battername[batnum]);
      }
    }
  //set f to the index of the helmet colour required (from array)
  f=0; //set it to 0 in all cases
  bat_helm_lt[batnum]=headsleft[f];
  bat_helm_rt[batnum]=headsright[f];
  bat_helm_col[batnum]=helmcols[f];
}

//function to get helmet colour from prepared playernames and colours array
function getDefaultHelmet(battername) {
  idx=playernames.indexOf(battername);
  if (idx==-1) {
    idx=0;
  }
  return defcolours[idx];
}

//Bowler AI.  TO DO: have bowler walk back to mark or do fielding etc before next ball

function doBowl() {

  //CHOOSE SUITABLE BOWLER SPRITE FRAME (DEPENDS ON MODE)
  advanceBowlerFrames();
  //bowler has goal at start of ball...

  //put bowler in jump mode if it is in a certain part of canvas
  var jumpstart=crease2+20;
  var jumpend=crease2-40;
  var standpoint=Math.round((crease1+crease2)/2);

  if (bwl_sprite_x<crease1) {
    console.log("Missed.");
    console.log(bwl_sprite_x);
  debugger;
  }

  
  //GOAL AND MODE TRANSITIONS BASED ON X-POSITION
  //go straight into runup
  if (bwl_sprite_x>jumpstart && bowler_goal==="idle") {
      bowler_mode="run";
      bowler_goal="runup";
  }
  //start the jump
  if (bwl_sprite_x<=jumpstart && bwl_sprite_x>jumpend && bowler_goal==="runup" && bowler_mode==="run") {
          bowler_mode="jump";
          bowler_frame=0;
          bwl_ft.play();
        }

  //change goal after jump
  if (bwl_sprite_x<jumpend && bwl_sprite_x>standpoint && bowler_goal==="runup") {
      bowler_mode="run";
      bowler_goal="delivery";
      
   }
   else {
      /*
      console.log("No transition: back to run");  
      console.log(bwl_sprite_x,bowler_mode);
      console.log(jumpend,"Jumpend");
      console.log(bouncepoint,"BOUNCEPT");
      */
   }

  //transition to standing
  if (bwl_sprite_x<standpoint && bowler_goal==="delivery") {
      bowler_goal="pause"; //or standing
      bowler_mode="standing";
      setTimeout(pauseForEffect,400);
  }
  //In case (last resort)
  if (bwl_sprite_x<crease1) {
      
      bowler_goal="achieved";
      bowler_mode="standing";
  }
  
      //MOVEMENT IN MODES
  if (bowler_goal==="runup" || bowler_goal==="delivery") {    
      var bwlstep=8;
      bwl_sprite_x -= bwlstep; 
    }
  doUmpire();
}


//wait before concluding bowler's 'goal'.  Pauses if short e.g. no runs.
function pauseForEffect() {
  bowler_goal="achieved";
}

function doUmpire() {

     //do umpire
   if (bowler_goal==="achieved" && umpire_goal=="idle") {
      umpire_goal="active";
    }
  //do the goal
    if (umpire_goal==="active") {
        setUmpireState();
        setTimeout(umpireGoal,400); //hold signal before return to 'stand' mode
    }
    
    //achieved the goal
    if (umpire_goal==="achieved") {
        umpire_mode="stand";
    }
    setUmpireFrame();

    }

//umpire's goal, for now, is simply to wait with a signal 
function umpireGoal() {
  umpire_goal="achieved";
}

function setUmpireState(){
  if (wicketresult>0) {
      umpire_mode="wicket";
     }
  else if (wideruns>0) {
     umpire_mode="wide";
     }
  else if (noballruns>0) {
      umpire_mode="noball";
     }
}

function setUmpireFrame() {
  var umpframes=[35,105,175,248,315]; //normal, wide
  var modes=["watch","stand","wide","wicket","noball"];
  //these are single actions, so can tie them directly to index values in frame list
  ump_srcX=0; //default mode = watch
  for (x=0;x<modes.length;x++) {
    if (modes[x]===umpire_mode) {
      ump_srcX=umpframes[x];
    }
  }
  //TO DO: if sequenced actions, modes will encoce lookup list of frame sets.
}



//Functions to change batter positions/modes, after manual keypress

//press .
function liftBat() {
  batter_mode[1]="wait_tap";
}

//press ,
function highBat() {
  batter_mode[1]="wait_high";
}

//press d
function duckBat() {
  batter_mode[1]="duck";
}

//release key
function dropBat() {
  batter_mode[1]="wait";
}



/* 
Function to trigger batter movements based on game data file
(User interaction through key presses is handled separately) 
Running/ lap mode is conditional on bowler runup 
Lap counter is updated by the movement function as needed
*/

function doBatter() {

    //BATTER MODE AND DISPLAY
     //console.log(batter_mode);
     chooseBatterModeFrames(1);
     chooseBatterModeFrames(2);
     //var shotpoint=crease1+100; //ball_sprite_x<(crease1+50)
     
     var keeper_x=crease1-20;

    //HANDLE RUNS/GOAL ACHIEVEMENT
    if (allruns>6 || allruns<0) {
      console.log("Total runs error:",currentruns,byeruns,legbyeruns,wideruns,noballruns);
      debugger;
    }

    //sequential.  More complex transitions need graph
    batter_goallist=["idle","engage","striking","runlaps","achieved"];
    batter_idlemodelist=["wait","wait_tap","duck","leave","block"];
    batter_shotmodelist=["block","drive","hit"];
    batter_lapmodelist=["lap_left","lap_right"];
    batter_waitmode=0;

    //BATTER MODES AND GOALS.  TO DO.  Convert to array to hold mode/state
    //conditions relate to object's own position, and maybe state/pos of other objects
    //prepare for delivery, before ball released
    // && (ball_goal=="invisible" || ball_goal==="none")
    if (bowler_goal==="runup") {
      var tap = Math.floor((Math.random() * 100) + 1);
          batter_goal=="idle";
          if (tap>85) {
            batter_mode[1]="wait_tap";
          }
      }

      //bit like markov chain: probabilistic dropping of bap to ground from high position
     if (batter_goal==="idle") {
          var drop = Math.floor((Math.random() * 100) + 1);
          if (drop>75) {
            batter_mode[1]="wait";
            bat_tap.play();
          }
      }
    
    //BALL CONDITIONS
    var bouncer=false;
    //ball_mode==="delivery" && 
    if (ball_sprite_x<bouncepoint && ball_sprite_y<(base_ball_y-5) && batter_goal==="idle") {
      bouncer=true;
    }

    //duck bouncers
    if (bouncer==true && currentruns==0) {
      batter_mode[1]="duck";
      batter_goal="achieved";
    }

    var playable=false;

    //CHANGE TO 'ENGAGE' GOAL - SHOTS + RUNNING
    //
    var shotpoint=bouncepoint; //+100 
    var hitzone=false;
    if (ball_sprite_x<=shotpoint && ball_sprite_x>=crease1) {
      hitzone=true;
    }
    if (hitzone==true && batter_goal==="idle") {
      //console.log("shotpoint:",shotpoint);
      playable=true;
      batter_goal="engage";
    }

    //BATTER2 HABITS
    if (batter_sprite_x[2]<bwl_sprite_x && batter_mode[2]=="wait") {
      batterhead_mode[2]="right";
    }
    if (batter_sprite_x[2]>=bwl_sprite_x && batter_mode[2]=="wait") {
     batterhead_mode[2]="left";
    }
   
    //NO RUNS + ENGAGE GOAL + SHOT MODES
    if (batter_goal==="engage") {
      doBatterPlayShot();
    }
   
    //ACHIEVING GOAL: RUNS
    if (batter_goal==="runlaps") {
      doBatterRunLaps();
    }
   
    //if ball achieves its goals first, then batter is finished too
    if (batter_goal==="idle" && ball_goal==="achieved") {
      batter_goal="achieved";
    }
    /*
    else if (batter_goal==="engage" && ball_goal==="achieved") {
      printGoals();
      debugger;
    }
    */
}


function doBatterRunLaps(target) {
   //start running
    var startrun=false;
    var target=Math.max(bouncepoint+80,crease1+80);
    if (currentruns>0 && ball_sprite_x>target) {
      startrun=true;
    } 
    else if (currentruns==0) {
      startrun=true;
    }
    //if lap goal exists, shift into lap mode temporarily, move batter and frames
    if (laps>0 && startrun==true)
      { 
          doLaps();
          //chooseBatterModeFrames();
      }

    //if goal achieved, make batter_goal 'achieved'
    if (laps<=0) {
      batter_mode[1]="wait";  //for display
      batter_goal="achieved";
    }

}

function doBatterPlayShot() {

   //shot selection
    var playshot="leave";
    var shot = Math.floor((Math.random() * 100) + 1);
          if (shot>30) {
            playshot="block";
    }

    //play or leave
    if (allruns==0) {
          if (batter_mode==="wait") {
            batter_mode[1]=playshot;
            batter_goal="achieved";
        }
        else {
            batter_goal="achieved";
        }
      }

    //BOUNDARY
    
    if (currentruns==4) {
        batter_goal="achieved";
        batter_mode[1]="drive"; //or hit
        ball_hit.play();
        //move forward of crease;
        batter_sprite_x[1] = batter_sprite_x[1]+20;
     }

    //IF RUNS OFF BAT

    var batruns=false;
    if (currentruns>0 && currentruns<4) {
      batruns=true;
      }

    //play a shot
    if (batruns==true) {
        batter_mode[1]="hit";
        batter_goal="striking"; //or postpone running
        ball_hit.play();
    }

    if (batruns==true && batter_goal=="striking") {
      laps=allruns;
      batter_goal="runlaps";
    }

    //sundry runs in excess of runs
    if(allruns>0 && currentruns<allruns){
       laps=allruns;
       batter_goal="runlaps";
    }
  }


//Batter has goal of running laps 
//Move batter right or left until laps are completed.
function doLaps() { 
    var lapmodes=["lap_right","lap_left"];
    var lapmodes2=["lap_left","lap_right"]; //used for frame animation
    //batter1
    batter_mode[1]=lapmodes[((allruns-laps)%2)]; //cycle index 0 and 1 for laps done
    batter_mode[2]=lapmodes2[((allruns-laps)%2)]; //TO DO: make this 
    var step=15; //default move to right (mode="lap_right")
    var ns_step=-15;
    //moving left (strike batter)
    if (batter_mode[1]==="lap_left") {
      step=-15;
      ns_step=+15;
    }
    //move
    batter_sprite_x[1] = batter_sprite_x[1]+step;
    batter_sprite_x[2] = batter_sprite_x[2]+ns_step;
    //check if laps completed by comparison to x position
    if (batter_sprite_x[1]>crease2-10 || batter_sprite_x[1]<crease1) {
          batter_mode[1]="end_lap"; //does nothing but prevents multiple conditions
          batter_mode[2]="end_lap";
          laps=laps-1; 
    }
  }

/* function to handle ball mode, w.r.t visibility */
function doBall() {
    //ball becomes visible when bowler is finished runup.  TO DO: 'ball_release" trigger'
    

    //unused for now
    ball_modelist=["invisible","visible"];
    ball_goallist=["idle","delivery","boundary"];
  
    //VISIBILITY MODES
    if (ball_goal==="idle" || ball_goal==="achieved") {
        ball_mode="invisible";
    }
    else {
      ball_mode="visible";
    }

    //GOALS
    //position ball for delivery, calculate bouncepoint
    if (bowler_goal==="delivery" && ball_goal==="idle") {
        ball_goal="delivery";
        console.log("Delivery transition", ball_sprite_x);

        ball_sprite_x=crease2-40; //same as jump end?
        ball_sprite_y=base_ball_y;

    //pre-calculate bouncer trajectory
        //short balls if no runs or wicket resulted.  random 150 is a lot of bouncers.
        if (currentruns==0 && wicketresult==0) {
            bouncepoint = crease1+50+Math.floor((Math.random() * 100) + 1); 
          }
        else if (currentruns>0) {
          bouncepoint=crease1+50+Math.floor((Math.random() * 25) + 1);
        }

        else if (wicketresult>0) {
          bouncepoint=crease1-10; //wickets are crease1-40
        }
   }

   var playzone=false;
   if (ball_goal==="delivery" && ball_sprite_x<=(crease1+bouncepoint)/2) {
        playzone=true;
        //console.log("Playzone transition", ball_sprite_x);
        //printGoals();
   }
  
   //ZONE
 
   //transition to ball being hit
   if (playzone==true && currentruns>0 && ball_goal==="delivery") {
       ball_goal="boundary";
    }   

   //MOVEMENT BASED ON GOALS
   if (ball_goal==="boundary") {
       moveBall_shots();
   }

   if (ball_goal==="delivery") {
        moveBall_xpos(bouncepoint);
    }
     
    
    //GOAL ACHIEVEMENT

     //limit behind stumps
     var keeper_x=0; //crease1-20;
    //outer limit for ball movement - depends on runs
     var outerlimit =crease2+(60*currentruns);

    //if not boundary - limit is keeper
    if (ball_sprite_x>=outerlimit && ball_goal=="boundary") {
       ball_goal="achieved";
     }

  //goal achieved:  change ball_mode if x position goes out of bounds (whether visible or not)
  //doesn't matter what goal state ball was in
  if (ball_sprite_x <= keeper_x) {
      ball_goal="achieved";
      //console.log("ball goal achieved");
      //printGoals();
      //console.log("ball path finished");
      }
}

function printGoals() {
  console.log("Bowler_goal:",bowler_goal);
  console.log("Ball goal:",ball_goal);
  console.log("Batter goal:",batter_goal);
}

//
//ball hit on ground with small wobble
function moveBall_shots() {
    range=60;
    bobble = 0+Math.floor((Math.random() * 3) + 1); 
    ball_sprite_y= base_ball_y+range-bobble; //was 130;
    step=8;
    ball_sprite_x+=step;
    }

/* Ball trajectory - only if "visible" - no realistic physics here */
//TO DO: parabola to a bounce point in front of crease1
function moveBall_xpos(bouncex) {
   //horizontal - stops when reaches crease1.  This function not called if that happens!
   ball_release=base_ball_y; //was 70
   range=60;
   bouncelimit=base_ball_y+range;// base_ball_y+80; //was 150
   var yrange=bouncelimit-ball_release; 
   var xstep=12; //xrange is about 200 pixels.  12 steps & 30ms per step = 0.3 seconds.
   var xrange=crease2-20-bouncex;
   var xframes=Math.round(xrange/xstep); //linear not parabolic
   var ystep=Math.round(yrange/xframes);
   //console.log(xstep,xrange,xframes,ystep);
   //var ystep=12;
   //correction if bounce plane between frame-steps
   if (ball_sprite_y+ystep>bouncelimit) {
    bouncex=ball_sprite_x+1;
    ball_sprite_y=bouncelimit-10;
   }
   if (ball_sprite_x<bouncex) {
    //ystep=-8;
    ystep=-ystep;
   }
    //bwl_sprite_x = bwlamplitude * Math.sin( bwl_start ) + bwlcentre;
     ball_sprite_x-= xstep; 
     ball_sprite_y += ystep;
    }

//canvas drawImage method parameters
//first 4 arguments are clipping
//last 4 are image placement and size (relative to clipping)
//The setTransform will only affect drawings made after the setTransform method is called.
//So reset it after you have done it for an element

function drawSprite() {
  //obtain an in-memory canvas with the colour replacements completed
  var imgMod1=paint_the_white(bat_tm1,batter_sprite[1],srcX[1],srcY[1],sprite_w,sprite_h); //just pass the rectangle width
  var imgMod2=paint_the_white(bat_tm1,batter_sprite[2],srcX[2],srcY[2],sprite_w,sprite_h);
  var bowlerMod=paint_the_white(bat_tm2,bowler_sprite,bwl_srcX,bwl_srcY,sprite_w,sprite_h);
  //get helmets, then modify
  getBatterHelmet(1); //get batter helmet for batter 1.  
  getBatterHelmet(2); //get batter helmet for batter 2
  var helmetMod1=paint_the_white(bat_tm1,helmet_sprite[1],srcX_helmet[1],0,helmet_w,helmet_h); //just pass the rectangle width
  var helmetMod2=paint_the_white(bat_tm1,helmet_sprite[2],srcX_helmet[2],0,helmet_w,helmet_h); //just pass the rectangle width
  
  //Proceed with drawing
  ctx.drawImage(bgnd,0,0); //offset.  no scaling yet.
  
  //UMPIRE
  ctx.drawImage(umpire_sprite,ump_srcX,ump_srcY,sprite_w,sprite_h,ump_sprite_x,ump_sprite_y,sprite_w,sprite_h);
  
  //WICKETS

  //BALL
  if (ball_mode==="visible") {
    ctx.drawImage(ball_sprite,ball_sprite_x,ball_sprite_y);
  }
  
  //BOWLER BODY & HEAD
  //ctx.drawImage(bowler_sprite,bwl_srcX,bwl_srcY,sprite_w,sprite_h,bwl_sprite_x,bwl_sprite_y,sprite_w,sprite_h);  
  ctx.drawImage(bowlerMod,0,0,sprite_w,sprite_h,bwl_sprite_x,bwl_sprite_y,sprite_w,sprite_h);  
  //BATTERS & HELMET
  //ctx.drawImage(batter_sprite[1],srcX[1],srcY[1],sprite_w,sprite_h,batter_sprite_x[1],sprite_y[1],sprite_w,sprite_h);
  ctx.drawImage(imgMod1,0,0,sprite_w,sprite_h,batter_sprite_x[1],sprite_y[1],sprite_w,sprite_h);
  //ctx.drawImage(batter_sprite[2],srcX[2],srcY[2],sprite_w,sprite_h,batter_sprite_x[2],sprite_y[2],sprite_w,sprite_h);
  ctx.drawImage(imgMod2,0,0,sprite_w,sprite_h,batter_sprite_x[2],sprite_y[2],sprite_w,sprite_h);
  //srcX_helmet value (left or right).  TO DO: set when mode changes?
  //non-striker (no ducking etc)
  var helmet_pos_x=[]
  var helmet_pos_y=[]
  helmet_pos_x[1]=batter_sprite_x[1]+15;
  helmet_pos_x[2]=batter_sprite_x[2]+15;
  //
  helmet_pos_y[1]=sprite_y[1]+13;
  helmet_pos_y[2]=sprite_y[2]+13;
  if (batter_mode[1]==="drive") {
       helmet_pos_x[1]=helmet_pos_x[1]-10;
  }
  if (batter_mode[1]==="duck") {
       helmet_pos_x[1]=helmet_pos_x[1]+10;
       helmet_pos_y[1]=helmet_pos_y[1]+10;
  }
  if (batter_mode[1]==="block") {
       helmet_pos_x[1]=helmet_pos_x[1]+5;
  }
  
  //ctx.drawImage(helmet_sprite[1],srcX_helmet[1],0,helmet_w,helmet_h,helmet_pos_x[1],helmet_pos_y[1],helmet_w,helmet_h);
  ctx.drawImage(helmetMod1,0,0,helmet_w,helmet_h,helmet_pos_x[1],helmet_pos_y[1],helmet_w,helmet_h);
  ctx.drawImage(helmetMod2,0,0,helmet_w,helmet_h,helmet_pos_x[2],helmet_pos_y[2],helmet_w,helmet_h);
  //ctx.drawImage(helmet_sprite[1],srcX_helmet[1],0,helmet_w,helmet_h,helmet_pos_x[1],helmet_pos_y[1],helmet_w,helmet_h);
  //ctx.drawImage(helmet_sprite[2],srcX_helmet[2],0,helmet_w,helmet_h,helmet_pos_x[2],helmet_pos_y[2],helmet_w,helmet_h);
  //ctx.drawImage(bowler_sprite,bwl_srcX,bwl_srcY,sprite_w,sprite_h,550,bwl_sprite_y,sprite_w,sprite_h);

  //PLAYER NAMES TEXT
  var txt_y_score=canv_height-5;
  var txt_y=canv_height-15;
  var txt_bwl_y=canv_height-15;
  ctx.fillText(battername[1],30,txt_y);
  ctx.fillText(battername[2],crease2+10,txt_y); //was 100
  //
   var overstring="";
   var overball=(canv_ballcount+1) % 6;
        if (overball==0) {
          overball=6;
        }
        for (x=1; x<7;x++) {
          if (x==overball) {
            overstring=overstring+"o";
          }
        else {
             overstring=overstring+".";
         }
        }

  var bowlerdata=bowlername;//+"  "+overstring;
  ctx.fillText(bowlerdata,canv_width-40,txt_bwl_y);
  ctx.fillText(overstring,canv_width-40,txt_y_score);

  // BALL RESULT TEXT
  ctx.fillText(balldescription,crease1+60,txt_y_score);
  //TEAM NAMES TEXT
  teamslabel=bat_tm1+" v. "+bat_tm2+ " (at "+stadium+")";
  ctx.fillText(teamslabel,10,10);
  //GAME DATE TEXT
  ctx.fillText(gamedate,crease2,10)


}

//keycheck loop - not used.  Currently updates globals (bat_mode) that are checked during draw loops etc.
function loop() {
 //no functions for now
}

function keyUp(e) {
  if (e.keyCode == 38) {
    upKey = true;
    keymessage="key release";
  }
  else if (e.keyCode == 190) {
         keymessage="period .";
         dropBat();  
    }

    else if (e.keyCode == 188) {
         keymessage="comma ,";
         dropBat();  
    }

     else if (e.keyCode == 68) {
         keymessage="duck d";
         dropBat();  
    }
}


//space bar change default for webpage
function keypressCheck(e) { 
    var e = window.event||e; // Handle browser compatibility
    var keyID = e.keyCode;
    //space pressed
    if (keyID == 32) {
        e.preventDefault(); // Prevent the default action
        anotherFunction();
    }
}

function keyDown(e) {

  if (e.keyCode == 40) {
    keymessage="key down";
    //canv_ballcount=238; //maxballs-1
    canv_ballcount=canv_ballcount+5; //6 balls = 1 over in juniors
    if (canv_ballcount>(datasize-1)) {
          canv_ballcount=0;
         }
    cleanUpGame();
    nextBall();   
  }
  else if (e.keyCode == 38) {
         keymessage="up key";
          canv_ballcount=canv_ballcount-7;
          if (canv_ballcount<-1) {
            canv_ballcount=datasize-1;
          }
          cleanUpGame();
          nextBall();  //advances to next ball
    }
   else if (e.keyCode == 37) {
         keymessage="left arrow";
         canv_ballcount=canv_ballcount-2; //to allow for next ball increment by 1
         canv_ballcount=canv_ballcount%datasize;
         if (canv_ballcount<-1) {
          canv_ballcount=datasize-1;
         }
         cleanUpGame();
         nextBall();      
    }

    else if (e.keyCode == 190) {
         keymessage="period .";
         liftBat();  
    }

    else if (e.keyCode == 188) {
         keymessage="comma ,";
         highBat();  
    }

     else if (e.keyCode == 68) {
         keymessage="duck d";
         duckBat();  
    }

   else if (e.keyCode == 39) {
         keymessage="right arrow";
         canv_ballcount=canv_ballcount%datasize;
         if (canv_ballcount>datasize-1) {
          canv_ballcount=0;
         }
         cleanUpGame();
         nextBall(); //advances ball by one     
         
    }
    //console.log("key press detected:"+e.key);
}

//produce results.  Canvas functions inside.
//var match = new Results();
function startAnimation() {
  //if listener is set to 'false' it is bubbling 'up' to highest node.  true it is down (capture)
  console.log(gameArray[2]); //test we have array 
  intvl1=setInterval(nextBall, 1000);  // cf requestAnimationFrame() 
  intvl2=setInterval(doBatter, 80); //make this character specific, not event
  intvl3=setInterval(doBowl, 80);
  intvl4=setInterval(doBall, 30); //smaller delay = higher speed/frames possible
  intvl5=setInterval(doDrawing, 20);
  animationLoop();
  console.log("Done");
}