/**
 ** SCREENCALIBER is a tool for Frontend-Development.
 ** It helps when developing HTML/CSS from a screenshot and/or provides a flexible SVG grid for better orientation.
 **
 ** Author: (c) Philipp Hennermann, www.cssfly.net/screencaliber
 ** GitHub: https://github.com/CssFly/ScreenCaliber
 **
 ** Usage:
 **
 ** 1. Include ScreenCaliber.css and ScreenCaliber.js in your <head> section.
 ** 2. You can now access and configure ScreenCaliber by clicking on the "C" button right top on your site.
 ** 3. You may alter the SVG to get a GRID for your design or enter a URL of a screenshot
 **
 ** License M.I.T. License
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var ScreenCaliber = function(options)
{
    this.backgroundIdentifier    = options.backgroundIdentifier || 'body';
    this.screenShotURL           = options.screenShotURL ||
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><g stroke="black">'+
        '<line x1="0" y1="0" x2="10" y2="0" stroke-width="1" stroke-opacity="0.3" />'+
        '<line x1="0" y1="0" x2="0" y2="10" stroke-width="1" stroke-opacity="0.3" />'+
        '</g></svg>';
    this.screenShotPosition      = options.screenShotPosition || {'x': 0, 'y': 0};
    this.screenShotRepeat        = options.screenShotRepeat || 'no-repeat';
    this.screenShotOpacity       = options.screenShotOpacity || 0.5;
    this.screenShotLayerPosition = options.screenShotLayerPosition || 'top';
    this.isActive                = options.isActive || false;
    this.isVisible               = options.isVisible || false;

    this.sw = options.screenShotWidth || null;
    this.__initUI();
};

ScreenCaliber.prototype.__createUserInterface = function()
{
    var ischecked = this.isActive ? 'checked="checked"' : '',
        bgRepeatSelected_1 = this.screenShotRepeat === 'no-repeat' ? 'selected="selected" selected' : '',
        bgRepeatSelected_2 = this.screenShotRepeat === 'repeat' ? 'selected="selected" selected' : '',
        bgRepeatSelected_3 = this.screenShotRepeat === 'repeat-x' ? 'selected="selected" selected' : '',
        bgRepeatSelected_4 = this.screenShotRepeat === 'repeat-y' ? 'selected="selected" selected' : '',
        layerSelected_1 = this.screenShotLayerPosition === 'top' ? 'selected="selected" selected' : '',
        layerSelected_2 = this.screenShotLayerPosition === 'bottom' ? 'selected="selected" selected' : '',
        isvisible = this.isVisible === true ? 'cssfly-caliber--visible' : '';

    return '<div class="cssfly"><a title="Toggle Caliber Settings" class="cssfly__button-toggle" id="cssfly-toggle">C<span class="cssfly__button-toggle__extended">aliber</span></a>\n'+
        '<div class="cssfly-caliber '+isvisible+'" id="cssfly-caliber">\n'+
        ' <div class="cssfly-caliber__row cssfly-caliber__row--first">\n'+
        '   <label title="Background-Identifier (e.g. body, .someClass, #someId)" class="cssfly-caliber__label">'+
        'Root-Element: <input id="cssfly-backgroundIdentifier" class="cssfly-caliber__input cssfly-caliber__input--backgroundID" '+
        'type="text" placeholder="'+this.backgroundIdentifier+'" value="'+this.backgroundIdentifier+'" /></label></div><div class="cssfly-caliber__row">\n'+
        '   <label title="Screenshot-URL - the URL to your Screenshot. You may use data-URLs too." class="cssfly-caliber__label">Screenshot-URL: '+
        '<textarea id="cssfly-screenShotURL" class="cssfly-caliber__input cssfly-caliber__input--screenshotURL" '+
        'type="text" placeholder="'+this.screenShotURL.replace(/"/g, '')+'">'+this.screenShotURL.replace(/"/g, '&quot;')+
        '</textarea></label></div><div class="cssfly-caliber__row">\n'+
        '   <label title="Opacity (only if Layerposition is set to top)" class="cssfly-caliber__label">'+
        'Opacity: <input id="cssfly-opacity" maxlength="3" class="cssfly-caliber__input cssfly-caliber__input--opacity" '+
        'type="text" placeholder="'+this.screenShotOpacity+'" value="'+this.screenShotOpacity+'" /></label></div><div class="cssfly-caliber__row cssfly-caliber__row--position">\n'+
        '   <label title="X-Coordinate" class="cssfly-caliber__label">X-Position: <input id="cssfly-position-x" maxlength="8" '+
        'class="cssfly-caliber__input cssfly-caliber__input--position-x" '+
        'type="text" placeholder="'+this.screenShotPosition.x+'" value="'+this.screenShotPosition.x+'" /></label></div><div class="cssfly-caliber__row cssfly-caliber__row--position">\n'+
        '   <label title="Y-Coordinate" class="cssfly-caliber__label">Y-Position: <input id="cssfly-position-y" maxlength="8" '+
        'class="cssfly-caliber__input cssfly-caliber__input--position-y" '+
        'type="text" placeholder="'+this.screenShotPosition.y+'" value="'+this.screenShotPosition.y+'" /></label></div><div class="cssfly-caliber__row cssfly-caliber__row--select">\n'+
        ' <label class="cssfly-caliber__label">Layer:<select title="Send Screenshot to Top or Bottom Layer" size="1" class="cssfly-caliber__select" id="cssfly-layer-position">\n'+
        '<option value="top" '+layerSelected_1+'>Top</option><option value="bottom" '+layerSelected_2+'>Bottom</option></select></label>\n'+
        ' </div>\n<div class="cssfly-caliber__row cssfly-caliber__row--select">\n'+
        ' <label class="cssfly-caliber__label">Repeat:<select title="Backgound-repeat" size="1" class="cssfly-caliber__select" id="cssfly-bg-repeat">\n'+
        '<option value="no-repeat" '+bgRepeatSelected_1+'>No-Repeat</option><option value="repeat" '+bgRepeatSelected_2+'>Repeat</option><option value="repeat-x" '+bgRepeatSelected_3+'>Repeat-X</option>'+
        '<option value="repeat-y" '+bgRepeatSelected_4+'>Repeat-Y</option></select></label>\n'+
        ' </div><div class="cssfly-caliber__row cssfly-caliber__row--select"><div class="cssfly-picker"><span class="cssfly-picker__button" id="cssfly-picker__button"></span>'+
        '<input readonly="readonly" id="cssfly-picker__value" class="cssfly-picker__value" /></div>\n'+
        ' </div><div class="cssfly-caliber__row cssfly-caliber__row--select"><label class="cssfly-caliber__label"><input type="checkbox" '+
        'class="cssfly-caliber__checkbox" id="cssfly-active" value="active" '+ischecked+' /> Apply</label>'+
        '</div>\n'+
        '</div></div>';
};

ScreenCaliber.prototype.__initUI = function()
{
    var div, el, html = this.__createUserInterface(), scope = this;

    el = document.body;

    div = document.createElement('div');
    div.className = 'cssfly';
    div.innerHTML = html;

    while (div.children.length > 0)
    {
        el.appendChild(div.children[0]);
    }

    this.btnToggle = document.getElementById('cssfly-toggle');
    this.caliberBox = document.getElementById('cssfly-caliber');

    this.inputLayerPosition = document.getElementById('cssfly-layer-position');
    this.inputBackgroundRepeat = document.getElementById('cssfly-bg-repeat');
    this.inputBackgroundElement = document.getElementById('cssfly-backgroundIdentifier');
    this.inputScreenShotURL = document.getElementById('cssfly-screenShotURL');
    this.inputOpacity = document.getElementById('cssfly-opacity');
    this.inputPositionX = document.getElementById('cssfly-position-x');
    this.inputPositionY = document.getElementById('cssfly-position-y');
    this.inputActive = document.getElementById('cssfly-active');
    this.colorPicker = document.getElementById('cssfly-picker__button');

    this.__initEvents();
    this.__updateBackground();
};

ScreenCaliber.prototype.__toggle = function()
{
    this.caliberBox.classList.toggle('cssfly-caliber--visible');
};

ScreenCaliber.prototype.__updateBackground = function()
{
    var scope = this,
        bg = this.__getBackgroundElement(),
        rect = bg.getBoundingClientRect(),
        cid = 'cssfly-overlay',
        oldOverlay = document.getElementById(cid),
        container;

    function style(el)
    {
        var po = (scope.screenShotPosition.x) + 'px ' + (bg.offsetTop + scope.screenShotPosition.y) + 'px';
        el.style.backgroundImage = 'url(\'' + scope.__trim(scope.screenShotURL) + '\')';
        el.style.backgroundRepeat = scope.screenShotRepeat;
        el.style.backgroundPosition = po;
    }
    if(oldOverlay)
    {
        oldOverlay.parentNode.removeChild(oldOverlay);
    }
    bg.style = '';

    if(!scope.isActive)
    {
        return;
    }
    if(this.screenShotLayerPosition === 'top')
    {
        container = document.createElement('div');
        container.id = cid;
        container.style.position = 'absolute';
        container.style.left = (bg.offsetLeft + this.screenShotPosition.x) + 'px';
        container.style.top = (bg.offsetTop + this.screenShotPosition.y) + 'px';
        container.style.width = scope.sw || bg.offsetWidth + 'px';
        container.style.height = bg.offsetHeight + 'px';
        container.style.opacity = this.screenShotOpacity;
        container.style.zIndex = 1500;

        bg.appendChild(container);

        style(container);
        return;
    }
    style(bg);
};

ScreenCaliber.prototype.__pickColor = function()
{
    var oldPos, oldOpacity, scope = this;

    function endPicker()
    {
        if(oldPos)
        {
            scope.screenShotLayerPosition = oldPos;
        }
        scope.screenShotOpacity = oldOpacity;
        scope.__updateBackground();
    }
    if(scope.screenShotLayerPosition === 'bottom')
    {
        oldPos = scope.screenShotLayerPosition;
        scope.screenShotLayerPosition = 'top';
    }
    oldOpacity = this.screenShotOpacity;
    this.screenShotOpacity = 1.0;

    scope.__updateBackground();
    scope.__picker(endPicker);
};

ScreenCaliber.prototype.__picker = function(endPicker)
{
    var scope = this, canvas = document.createElement('canvas'),
        ctx, img = new window.Image(),
        bg = this.__getBackgroundElement(),
        overlay = document.getElementById('cssfly-overlay'),
        input = document.getElementById('cssfly-picker__value'), finish, onPick;

    function componentToHex(c)
    {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function rgbToHex(r, g, b)
    {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    function getMousePos(canvas, evt)
    {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    function onMove(e)
    {
        try {
            var pos = getMousePos(overlay, e),
                p = ctx.getImageData(pos.x, pos.y, 1, 1).data,
                color = '#' + ('000000' + rgbToHex(p[0], p[1], p[2])).slice(-6);

            scope.colorPicker.style.backgroundColor = color;
            input.value = color;
        } catch(err) {
            window.alert('SecurityError: The operation is insecure. Image data can not be retrieved across domains. The domain of your screenshot url must be the same as this script is located.');
            finish(e);
        }
    }
    function pickAColor()
    {
        scope.colorPicker.style.backgroundPosition = '-100px 0';
        overlay.className = 'cssfly-overlay--colorpicker';
        overlay.addEventListener('mousemove', onMove, false);
        overlay.addEventListener('click', onPick, false);
    }

    finish = function(e)
    {
        overlay.removeEventListener('mousemove', onMove, false);
        overlay.removeEventListener('click', onPick, false);
        overlay.className = '';
        scope.colorPicker.style.backgroundPosition = '0 0';
        scope.colorPicker.style.backgroundColor = 'transparent';
        endPicker();
    };

    onPick = function(e)
    {
        finish(e);
    };

    img.onload = function()
    {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0 , 0);
        pickAColor();
    };
    img.src = this.screenShotURL;
};

ScreenCaliber.prototype.__initEvents = function()
{
    var scope = this;

    this.inputLayerPosition.addEventListener('change', function(e){
        scope.screenShotLayerPosition = this.value;
        scope.__updateBackground();
    }, false);

    this.inputBackgroundRepeat.addEventListener('change', function(e){
        scope.screenShotRepeat = this.value;
        scope.__updateBackground();
    }, false);

    this.inputActive.addEventListener('change', function(e){
        scope.isActive = this.checked;
        scope.__updateBackground();
    }, false);

    this.inputBackgroundElement.addEventListener('keyup', function(e){
        scope.backgroundIdentifier = this.value;
        scope.__updateBackground();
    }, false);

    this.inputScreenShotURL.addEventListener('keyup', function(e){
        scope.screenShotURL = scope.__trim(this.value);
        scope.__updateBackground();
    }, false);

    this.inputScreenShotURL.addEventListener('focus', function(e){
        this.tagName = 'input';
        scope.screenShotURL = this.value;
        scope.__updateBackground();
    }, false);

    this.inputOpacity.addEventListener('keyup', function(e){
        scope.screenShotOpacity = parseFloat(this.value);
        scope.__updateBackground();
    }, false);

    this.inputPositionX.addEventListener('keyup', function(e){
        scope.screenShotPosition.x = parseFloat(this.value);
        scope.__updateBackground();
    }, false);

    this.inputPositionY.addEventListener('keyup', function(e){
        scope.screenShotPosition.y = parseFloat(this.value);
        scope.__updateBackground();
    }, false);

    this.btnToggle.addEventListener('click', function(e){
        scope.__toggle();
    }, false);

    this.colorPicker.addEventListener('click', function(e){
        scope.__pickColor();
    }, false);
};

ScreenCaliber.prototype.__trim = function(str)
{
  return str.replace(/\n/g, '');
};

ScreenCaliber.prototype.__getBackgroundElement = function()
{
    try
    {
        return document.querySelector(this.backgroundIdentifier);
    } catch (e) {
        var isId = this.backgroundIdentifier.substr(0,1) === '#',
            isClass = this.backgroundIdentifier.substr(0,1) === '.',
            isTag = !isId && !isClass;
        if(isId)
        {
            return document.getElementById(this.backgroundIdentifier.substr(1));
        }
        if(isClass)
        {
            return document.getElementsByClassName(this.backgroundIdentifier.substr(1))[0];
        }
        return document.getElementsByTagName(this.backgroundIdentifier)[0];
    }
};
