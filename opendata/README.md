# Cricket Data and Open Data Pipeline
for Match Mate, Cricket Scorer App
(c) Craig Duncan 2020.   
Download and use of the software referred to here is under the terms of my OpenDataLicence.

## Match Mate provides match data

The Match Mate app has been designed so that you can email match data to yourself or your team.

Unlike other apps which might lock the data up so that it is only useful for the app, the app sends you:

 - human readable summary scores (in a convenient table-based format);

 - the raw data files used for the app; and
 
 - some custom data files which insert player and team names into the data columns.

## Post-game data processing (statistics)

 The raw data files used for the app can be very useful for further processing.   For example:

- I wrote a [program in R](worm2(2018).r) that will take the match scores and use it for visualisation of progressive score (like a 'worm' graph).
- I wrote another program in R that will compile all of the player statistics from the year's results.

The latest version of the app contains a player database with player numbers, which makes it easier to cross-reference the individual player statistics for these full-season purposes.

By keeping the data open, it enables anyone who uses the app to write further programs in R or another data langauge (e.g. python) to visualise the data, or make it more useful.  
 
By sharing these data-processing programs, we can increase the number of ways parents, players pr clubs can use the data.
 
## Post-game data - animation app

### Match Animator 

The main programs and folders that need to be installed on your local PC are:

- loadgame.html
- media folder (containing image and sound files)
- scripts folder (containing loadgame.js and animator.js)
- matches folder (optional: to keep your match data files in a convenient location)

Put all these in the same folder, then open loadgame.html in your browser.

### Data files that can be animated

The cricket app (Junior Cricket Scorer or 'Match Mate') can email different types of email files.

The animator works with the composite match files that are generated when you email the data.  Make sure you load the correct file types when you have opened 'loadgame.html' in your browser.

These will have filenames like :
 - '3219_homeinn.csv' or
 - '3219_awayinn.csv'

NB: It does not work with the raw 'balldata' files (like '3219_H_balldata.csv').


