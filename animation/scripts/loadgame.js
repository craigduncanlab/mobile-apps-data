//Match animator script loadgame.js
//(c) Craig Duncan 2019-2021

//globals
var gameArray= new Array();
var thisBall = new Array();
var reader;
var globaltext;
var playernames=[];
var defcolours=[];
var firstlinedata;
var matchdatatype; //This is to distinguish JCS, cricsheet
var bat_tm1;
var bat_tm2;
var stadium;
var gamedate;
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
  var demobutton = document.getElementById("demoButton");
	var selector = document.getElementById('fileInput');
  demobutton.disabled=false; //default is disabled so reset here
  //load button
	selector.addEventListener('change', function( event ){ 
    event.preventDefault();
    readFile(event);
    submitbutton.disabled=false;
    demobutton.disabled=false;
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
  //call function when submit is called
	onLoadPress(text,submitbutton,resetbutton,demobutton);  //this is in this loadgame.js
	},false);

  //function on press of reset button
  resetbutton.addEventListener("click", function( event ){ 
  event.preventDefault();
  
  //reload and button states
  selector.disabled=false;
  submitbutton.disabled=true;
  resetbutton.disabled=true;
  demobutton.disabled=false;
  location.reload();


  },false);

  //demo button event - server side loader?
  demobutton.addEventListener("click", function( event ){ 
  //
  demoPress();
  //reload and button states
  selector.disabled=false;
  submitbutton.disabled=true;
  resetbutton.disabled=false;
  demobutton.disabled=true;

     },false);

}

//function called when Demo press event is detected
function demoPress() {
  //load data
  try {
  let globaltext=fetch("matches/demogame.csv") //default is a GET of file.  Needs to be running on webserver
  parseGameFile(globaltext)
  setdefaultHelmets();
  startAnimation();
 }
 catch {
   console.log("Caught Demo fetch error.  Probably not running on server.")
   return;
 }

}

//post-loading function.  Here, does conversion of files
function onLoadPress(globaltext,submitbutton,resetbutton,demobutton) {
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
  if (matchdatatype==0) {
    JCShelmets();
  }
  if (matchdatatype==1){
    CricSheetHelmets();
  }
}

function JCShelmets() {
  bat_tm1=thisBall[1][9];
  bat_tm2=thisBall[1][10];
  gamedate=thisBall[1][11];
  stadium=thisBall[1][12];
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
  bat_tm1=thisBall[1][9];
  bat_tm2=thisBall[1][10];
  gamedate=thisBall[1][11];
  stadium=thisBall[1][12];
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
        console.log("Player:",playernames[playernames.length-1]);
        if (bat_teamname==bat_tm1) {
          defcolours.push(basecol1);
          flag=1;
        }
        if (bat_teamname==bat_tm2) {
          defcolours.push(basecol2);
          flag=1;
        }
        console.log("Colour:",defcolours[defcolours.length-1]);
      }
    }
}

//convert CSV file to ball by ball array
//Critical: check your line endings in CSV
//If line end is 0A (hex) only, use \n for split
//CricSheet data uses double quotes for entries that have commas in the field (like Excel).
//Need to parse for these. Reg Exp?

function parseGameFile(myText) {

	//var lines = new Array();
    lines = myText.split('\n'); //my CSV has CR not LF .'0A' in hex = 10 = 
    
    var rows = lines.length; //this is a count e.g. 7
    console.log("Lines in file, length:",rows);
    matchdate = lines[0];
      // team 1 bat - details
    var headings = lines[1];  //IF there are headings (2017 - yes)
    var balls;
    //2017 format: var skiprow=2;   //first two lines in file are not game ball data
    var skiprow=1; //2019 (Junior Cricket Scorer)
    firstlinedata=lines[0];
    for (x=0;x<(rows-skiprow-1);x++) {
		  gameArray[x]=lines[x+skiprow];
    }
    console.log("Game array size:",gameArray.length);
    matchdatatype=checkFileType();
    firstData=prepareGameArray();
    if (matchdatatype==0) {
        console.log("FileType: Junior Cricket Scorer");
        filterGameFileJCS(firstData);
    }
    if (matchdatatype==1) {
        console.log("FileType: CricSheet");
        // to do: for any quoted sections, do not split on enclosed commas
        myrow=lines[1].split(','); 
        console.log("Row 2:",myrow);
        bat_tm1=myrow[6].trim(); //initial batting team
        bat_tm2=myrow[7].trim(); //initial bowling team
        filterGameFileCricSheet(firstData);
    }
}

function checkFileType(){
  cricsh2="match_id,season,start_date,venue,innings,ball,batting_team,bowling_team,striker,non_striker,bowler,runs_off_bat,extras,wides,noballs,byes,legbyes,penalty,wicket_type,player_dismissed,other_wicket_type,other_player_dismissed"
  jcs="GameCode,GameName,GameDate,BallTime,Ball,BowlingTeamCode,BowlingTeam,BattingTeamCode,BattingTeam,BowlerID,BowlerCode,Bowler, StrikerID,StrikerCode,Striker,NonstrikerID,NonstrikerCode,Nonstriker,Runs,Wides,Wickets,Legbyes, Byes,Noballs,Runouts,whoRO,Bowled,Caught,c&b,ct(wk),Stumped,Hit-wkt,AssistID,AssistCode,AssistName"
  console.log("Firstline:",firstlinedata);
  if (firstlinedata==cricsh2) {
    return 1; //code for cricksheet
  }
  if (firstlinedata==jcs) {
    return 0; //code for junior cricket scorer
  }
  else {
    return 0;
  }
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
  return firstData;
}

//filter  wide array to abridged array.  These are the current 8 data columns used by the animator
//Creates a filtered array called "thisBall" that is used by animator.js
//we need this to be battername, nonstriker,bowlername, currentruns,wicketresult,wideruns,byeruns,legbyeruns,bnoballruns

function filterGameFileJCS(firstData) {
//columns=[3,6,7,8,9,10,11,12]; //2017 format
columns=[14,17,11,18,20,19,22,21,23,8,6,2]; //2019 format (game as exported)
 //columns=[6,7,8,10,9,12,22,21,23]; //7.1.2019 raw format

   max=firstData.length;
   console.log("length of array to filter:",max);
   for (var y=0;y<max;y++) {
      thisBall[y] = new Array();
      rowentry=firstData[y];
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

//CricSheetCSV2 (new) as at 19 Feb 2021
function filterGameFileCricSheet(firstData) {

columns=[8,9,10,11,18,13,15,16,14,6,7,2,3]; 
//2021format (these are index numbers starting at 0 for first column)

   max=firstData.length;
   console.log("length of array to filter:",max);
   for (var y=0;y<max;y++) {
      thisBall[y] = new Array();
      rowentry=firstData[y];
      //if the venue column has been split by a comma, adjust accordingly
      if (rowentry.length==22) {
        columns=[8,9,10,11,18,13,15,16,14,6,7,2,3]; 
      }
      else {
        columns=[9,10,11,12,19,14,16,17,15,7,8,2,3]; 
      }
      //console.log(y,rowentry);
    for (data=0;data<columns.length;data++) {
      oldcol=columns[data];
      myolddata=rowentry[oldcol].trim(); //trims leading or end whitespace
      
      if (myolddata.length>0) {
      //each array entry is a row of 'observations'

      //convert to a numeric 1=wicket, 0=nowicket for original column index 18
        if (data==4 && myolddata.length>2) {
            myolddata==1;
        }
        if (data==4 && myolddata.length==0) {
            myolddata==0;
        }
      // for stadiums in split files
        if (data==12 && rowentry.length>22) {
          myolddata=myolddata+","+rowentry[oldcol+1];
          myolddata=myolddata.replace(/"/g,"");  //g for replace all of quotes
        }
      } //end if for old data
      else {
        myolddata=0; //generic
      }
      thisBall[y][data]=myolddata;
      }
    } //end for loop for data file
  }