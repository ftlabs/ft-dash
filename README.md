## Warning

The jquery version has been bumped in package.json but not tested, to satisfy an automated security vulnerability check. The code is not live. Caveat Emptor.

## FT Dash 
An exploration of applying FT content to your car windscreen.

### Development

This prototype is based on the code from Big FT.

#### First run

First, clone this repo to your system and run `npm install`

which will grab all of the dependancies this app requires to run. 

Next you need to create a .env file with the following values

```
siteApiEndpoint=https://api.ft.com/site/v1/pages
frontPageId=[FRONT PAGE ID]
mainContentKey=main-content
apiKey=[FT cAPI KEY]
searchApiEndpoint=https://api.ft.com/content/search/v1
```

Next, build the client-side app with `npm run build:app`. Now, you're ready to fire up FT Dash, which you can do with `npm start`. You will now be able to access FT Dash at http://localhost:3000/

#### Calibration

The first view you'll see is the calibration screen. Before proceeding place your device displaying FT Dash (at as close to a 45 degree angle as possible) to the reflective surface you intend to view FT Dash on. You should now see the mirrored image of the calibration screen on the other side of the reflective surface (presumably a windscreen). 

![alt tag](https://github.com/ftlabs/ft-dash/blob/master/client/src/images/calibration.gif?raw=true)

Next place your finger on the slider and move it up and down until the rectangle on the screen resembles a rectangle without any skew from the windscreen. Then, tap the solid white circle. This will set the display angle for FT Dash, which should remove much of the skew caused by the screen being viewed at an angle greater or lesser than 45 degrees.

Once set, you can tap three fingers on the screen to display to calibration view again

#### Display

Once the screen has been calibrated, FT Dash will retrieve the top 3 UK news headlines and will display them on screen, which you should now be able to see on your windscreen. If some of the content is appearing off-screen, you can drag two fingers up and down the screen to scale the content to your desired size.

![alt tag](https://github.com/ftlabs/ft-dash/blob/master/client/src/images/display.gif?raw=true)

Depending on any film your reflective surface may or may not have, certain colors may be more viewable than others. White content generates a rather good effect, but green is also good. You're encouraged to experiment based on your needs.



