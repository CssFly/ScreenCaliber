# ScreenCaliber
Download: https://github.com/CssFly/ScreenCaliber/archive/master.zip

Screenshot demo: http://www.cssfly.net/screencaliber/demo/

Svg grid demo: http://www.cssfly.net/screencaliber/demo/example.html

SCREENCALIBER is a small tool for Frontend-Development.
It helps when developing HTML/CSS from a screenshot-reference and/or provides a flexible SVG grid for better orientation. I use ScreenCaliber in combination with Firebug.

Usage:

1. Include ScreenCaliber Snippet before your closing </body> tag.

		<!--ScreenCaliber/-->
		<link type="text/css" rel="stylesheet" media="all" href="ScreenCaliber.css" />
		<script type="text/javascript" src="ScreenCaliber.js"></script>
		<script>
			var init = new ScreenCaliber(
			{
				"isActive": true,
				"isVisible": true,
				"screenShotURL": "myScreenShot.png", /* replace with your own */
				"backgroundIdentifier": "body", /* tagname, classname or id */
				"screenShotLayerPosition": "bottom", /* top or bottom */
				"screenShotPosition": {"x":0, "y":0},
				"screenShotOpacity": 1
			});
		</script>
		<!--/ScreenCaliber/-->

2. You can now access and configure ScreenCaliber by clicking on the "C" button right top on your site.
3. As you can see above, you can configure initial setup of ScreenCaliber by passing options (e.g. ScreenShotURL) to the constructor.

License: M.I.T.
