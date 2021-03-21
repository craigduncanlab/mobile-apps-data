
# Junior Cricket Scorer - Some Data Applications

(c) Craig Duncan 2020-2021

# Cartoon Animation 
=======
# Cricket Data and Open Data Pipeline
for Junior Cricket Scorer App
(c) Craig Duncan 2020.   
Download and use of the software referred to here is under the terms of my [RepositoryLicence](../RepositoryLicense.md).

# Junior Cricket Scorer provides match data

The Junior Cricket Scorer app has been designed so that you can email match data to yourself or your team.

The data from Junior Cricket Scorer (and some other cricket match data) can be turned into a cricket cartoon, using the files in the 'animation' folder.

Just download the animator web page (cartooncricket.html) and open up in your browser.  It will also be able to be accessed from my web-page.

The cricket app (Junior Cricket Scorer) can send data files (.csv format) by email, and these can be saved on PC and then used with the cricket animator.  These csv files will have filenames like :

 - '3219_homeinn.csv' or
 - '3219_awayinn.csv'

NB: It does not work with the raw 'balldata' files (like '3219_H_balldata.csv').

# Data processing (statistics)

 The raw data files used for the app can be very useful for further processing.   For example:

- I wrote a [program in R](worm2(2018).r) that will take the match scores and use it for visualisation of progressive score (like a 'worm' graph).
- I wrote another program in R that will compile all of the player statistics from the year's results.
 
=======
# Post-game data - Match Animator 

The main programs and folders that need to be installed on your local PC are:

- loadgame.html
- media folder (containing image and sound files)
- scripts folder (containing loadgame.js and animator.js)
- matches folder (optional: to keep your match data files in a convenient location)

Put all these in the same folder, then open loadgame.html in your browser.

## Data files that can be animated

The cricket app (Junior Cricket Scorer) can email different types of email files.

The animator works with the composite match files that are generated when you email the data.  Make sure you load the correct file types when you have opened 'loadgame.html' in your browser.

These will have filenames like :
 - '3219_homeinn.csv' or
 - '3219_awayinn.csv'

NB: It does not work with the raw 'balldata' files (like '3219_H_balldata.csv').

# Post-game data processing (statistics)

The raw data files used for the app can also be very useful for further statistical processing.   see [stats](../stats)
 



