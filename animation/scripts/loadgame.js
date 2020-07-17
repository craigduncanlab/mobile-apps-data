//localfiles.js
//function to read a local file and convert it to new format; display in broswer
// 13-14 August 2019
// Dependencies: 


//globals
var gameArray= new Array();
var thisBall = new Array();
var reader;
var globaltext;
var playernames=[];
var defcolours=[];
var maxindex=0; // to hold the match balls index size for animator.js
//in localfiles.js (not a class).  Creates event listeners for buttons.
//need to pause for async;

//From HTML5 you can use this, in conjunction with an event handler
function readFile (evt) {
       var files = evt.target.files;
       var file = files[0];           
       reader = new FileReader();
       reader.onload = function(event) {
         //console.log(event.target.result);
         globaltext = reader.result;  //event handler for completion of loading       
       }
       reader.readAsText(file);
       
    }


//When this is called, it sets up the event listeners
//The event listeners call the onLoaded function processed after the async loading
function mainLoader() {
	 //forces reload from server prior to submit button being active.
	//reader.readAsText(file);
	var submitbutton = document.getElementById("submitButton");
  var resetbutton = document.getElementById("resetButton");
	var selector = document.getElementById('fileInput');

	selector.addEventListener('change', function( event ){ 
    event.preventDefault();
    readFile(event);
    submitbutton.disabled=false;
  //set focus to window to handle keyboard events
   },false);

	//The event listener on the button will read the value of file specified as 'fileInput' from HTML
	submitbutton.addEventListener("click", function( event ){ 
	event.preventDefault();
  selector.disabled=true;
	console.log("Submit Button press, now data:");
	var text = reader.result
	console.log(text); //check we have file result stored
	//return false;
	onLoadPress(text,submitbutton,resetbutton);  // initiates animation start
	},false);

  resetbutton.addEventListener("click", function( event ){ 
  event.preventDefault();
  
  //reload and button states
  selector.disabled=false;
  submitbutton.disabled=true;
  resetbutton.disabled=true;
  location.reload();


  },false);

}

//post-loading function.  Here, does conversion of files
function onLoadPress(globaltext,submitbutton,resetbutton) {
	if (globaltext==null) {
		console.log("Error with loading");
	}
	else {
		console.log("Pressed");
		
		submitbutton.disabled="disabled"; //disable further submits without reload
    resetbutton.disabled=false;  //changes focus to this button
    document.activeElement.blur(); //lose focus on disabled element - goes to body.
    // (this helps with keystroke detection before mouse click)
    parseGameFile(globaltext); //get the data ready
    setdefaultHelmets();
    startAnimation(); //this is in animator.js
	}
}

//function to set some default names and helmet colour sequences so that pairs have different colours
//based on 4 colour array index values [0,3]
function setdefaultHelmets() {
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

//convert CSV file to ball by ball array
//Critical: check your line endings in CSV
//If line end is 0A (hex) only, use \n for split
function parseGameFile(myText) {

	var lines = new Array();
    lines = myText.split('\n'); //my CSV has CR not LF .'0A' in hex = 10 = 
    
    var rows = lines.length; //this is a count e.g. 7
    console.log("Lines in file, length:",rows);
    matchdate = lines[0];
      // team 1 bat - details
    var headings = lines[1];  //IF there are headings (2017 - yes)
    var balls;
    //2017 format: var skiprow=2;   //first two lines in file are not game ball data
    var skiprow=1; //2019 (Junior Cricket Scorer)
    for (x=0;x<(rows-skiprow-1);x++) {
		gameArray[x]=lines[x+skiprow];
    }
    console.log("Game array size:",gameArray.length);
    maxindex=parseInt(gameArray.length+1); //for animator.js
    console.log("maxindex:",maxindex);
    prepareGameArray();
}

//read in csv file and split columns into new array
function prepareGameArray() {
  var firstData=new Array();
  max=gameArray.length;
   for (var y=0;y<max;y++) {
    for (var y=0;y<max;y++) {
      // This function creates an array of strings, not int's
      firstData[y] = gameArray[y].split(',');  //split the game data into an array of entries.
      }
  }
  filterGameFile(firstData);
}

//filter  wide array to abridged array.  These are the current 8 data columns used by the animator
//Creates a filtered array called "thisBall" that is used by animator.js
//we need this to be battername, bowlername, currentruns,wicketresult,wideruns,byeruns,legbyeruns,bnoballruns

function filterGameFile(firstData) {
//columns=[3,6,7,8,9,10,11,12]; //2017 format
columns=[14,17,11,18,20,19,22,21,23]; //2019 format (game as exported)
 //columns=[6,7,8,10,9,12,22,21,23]; //7.1.2019 raw format

   max=firstData.length;
   console.log("length of array to filter:",max);
   for (var y=0;y<max;y++) {
      rowentry=firstData[y];
      thisBall[y] = new Array();
      console.log(y,rowentry);
    for (data=0;data<columns.length;data++) {
      oldcol=columns[data];
      //each array entry is a row of 'observations'
      thisBall[y][data]=rowentry[oldcol].trim(); //trims leading or end whitespace
      }
    }
  }

//This is junior cricket scorer email report output headings from March 2019:
//GameCode,GameName,GameDate,BallTime,Ball,
//BowlingTeamCode,BowlingTeam,BattingTeamCode,BattingTeam,
//BowlerID,BowlerCode,Bowler, StrikerID,StrikerCode,Striker,
//NonstrikerID,NonstrikerCode,Nonstriker,
//Runs,Wides,Wickets,Legbyes, Byes,Noballs,Runouts,whoRO,Bowled,Caught,c&b,ct(wk),Stumped,Hit-wkt,AssistID,AssistCode,AssistName 