# Cricket Data and Open Data Pipeline
for Junior Cricket Scorer App
(c) Craig Duncan 2020.   
Download and use of the software referred to here is under the terms of my [RepositoryLicence](../RepositoryLicense.md).

## Junior Cricket Scorer provides match data

The Junior Cricket Scorer app has been designed so that you can email match data to yourself or your team.

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
 
By sharing these data-processing programs, we can increase the number of ways parents, players or clubs can use the data.
