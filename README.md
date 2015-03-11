# ScreenCaliber
Download: https://github.com/CssFly/ScreenCaliber/archive/master.zip

Screenshot demo: http://www.cssfly.net/screencaliber/demo/

Svg grid demo: http://www.cssfly.net/screencaliber/demo/example.html

SCREENCALIBER is a small tool for Frontend-Development.
It helps when developing HTML/CSS from a screenshot-reference.
I use ScreenCaliber in combination with Firebug.

Usage:
1. Include ScreenCaliber Snippet before your closing &lt;/body&gt; tag.

&lt;!--ScreenCaliber/--&gt;

&lt;link type="text/css" rel="stylesheet" media="all" href="ScreenCaliber.css" /&gt;

&lt;script type="text/javascript" src="ScreenCaliber.js">&lt;/script&gt;

&lt;script&gt;
  var init = new ScreenCaliber(\n
  {\n
    "isActive": true,\n
    "isVisible": true,\n
    "screenShotURL": "myScreenShot.png", 	/* replace with your own */
    "backgroundIdentifier": "body", 	/* tagname, classname or id */ 
    "screenShotLayerPosition": "bottom", 	/* top or bottom */
    "screenShotPosition": {"x":0, "y":0},
    "screenShotOpacity": 1
});
&lt;/script&gt;
&lt;!--/ScreenCaliber/--&gt;

2. You can now access and configure ScreenCaliber by clicking on the "C" button right top on your site.
3. As you can see above, you can configure initial setup of ScreenCaliber by passing options (e.g. ScreenShotURL) to the constructor.

License: M.I.T.
