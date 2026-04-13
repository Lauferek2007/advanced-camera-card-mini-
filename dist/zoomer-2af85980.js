import { eu as throttle, Z as isHoverableDevice, w as fireAdvancedCameraCardEvent, fh as ZOOM_DEFAULT_PAN_X, fi as ZOOM_DEFAULT_PAN_Y, fj as ZOOM_DEFAULT_SCALE, fk as arefloatsApproximatelyEqual, fl as isZoomEmpty, fm as round, fn as ZOOM_PRECISION, u as s, I as setOrRemoveAttribute, C as x, fo as i, _ as __decorate, y as n, x as r, t } from './card-edc26888.js';

/**
* Panzoom 4.5.1 for panning and zooming elements using CSS transforms
* Copyright Timmy Willison and other contributors
* https://github.com/timmywil/panzoom/blob/main/MIT-License.txt
*/
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* eslint-disable no-var */
if (typeof window !== 'undefined') {
  // Support: IE11 only
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  // Support: IE11 only
  // CustomEvent is an object instead of a constructor
  if (typeof window.CustomEvent !== 'function') {
    window.CustomEvent = function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt
    };
  }
}

/**
 * Utilites for working with multiple pointer events
 */
function findEventIndex(pointers, event) {
    var i = pointers.length;
    while (i--) {
        if (pointers[i].pointerId === event.pointerId) {
            return i;
        }
    }
    return -1;
}
function addPointer(pointers, event) {
    var i;
    // Add touches if applicable
    if (event.touches) {
        i = 0;
        for (var _i = 0, _a = event.touches; _i < _a.length; _i++) {
            var touch = _a[_i];
            touch.pointerId = i++;
            addPointer(pointers, touch);
        }
        return;
    }
    i = findEventIndex(pointers, event);
    // Update if already present
    if (i > -1) {
        pointers.splice(i, 1);
    }
    pointers.push(event);
}
function removePointer(pointers, event) {
    // Add touches if applicable
    if (event.touches) {
        // Remove all touches
        while (pointers.length) {
            pointers.pop();
        }
        return;
    }
    var i = findEventIndex(pointers, event);
    if (i > -1) {
        pointers.splice(i, 1);
    }
}
/**
 * Calculates a center point between
 * the given pointer events, for panning
 * with multiple pointers.
 */
function getMiddle(pointers) {
    // Copy to avoid changing by reference
    pointers = pointers.slice(0);
    var event1 = pointers.pop();
    var event2;
    while ((event2 = pointers.pop())) {
        event1 = {
            clientX: (event2.clientX - event1.clientX) / 2 + event1.clientX,
            clientY: (event2.clientY - event1.clientY) / 2 + event1.clientY
        };
    }
    return event1;
}
/**
 * Calculates the distance between two points
 * for pinch zooming.
 * Limits to the first 2
 */
function getDistance(pointers) {
    if (pointers.length < 2) {
        return 0;
    }
    var event1 = pointers[0];
    var event2 = pointers[1];
    return Math.sqrt(Math.pow(Math.abs(event2.clientX - event1.clientX), 2) +
        Math.pow(Math.abs(event2.clientY - event1.clientY), 2));
}

var events = {
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup mouseleave'
};
if (typeof window !== 'undefined') {
    if (typeof window.PointerEvent === 'function') {
        events = {
            down: 'pointerdown',
            move: 'pointermove',
            up: 'pointerup pointerleave pointercancel'
        };
    }
    else if (typeof window.TouchEvent === 'function') {
        events = {
            down: 'touchstart',
            move: 'touchmove',
            up: 'touchend touchcancel'
        };
    }
}
function onPointer(event, elem, handler, eventOpts) {
    events[event].split(' ').forEach(function (name) {
        elem.addEventListener(name, handler, eventOpts);
    });
}
function destroyPointer(event, elem, handler) {
    events[event].split(' ').forEach(function (name) {
        elem.removeEventListener(name, handler);
    });
}

function getParentElement(element) {
    if (element.parentElement) {
        return element.parentElement;
    }
    var node = element.getRootNode();
    if (node instanceof ShadowRoot && node.host instanceof HTMLElement) {
        return node.host;
    }
}

var isIE = typeof document !== 'undefined' && !!document.documentMode;
/**
 * Lazy creation of a CSS style declaration
 */
var divStyle;
function createStyle() {
    if (divStyle) {
        return divStyle;
    }
    return (divStyle = document.createElement('div').style);
}
/**
 * Proper prefixing for cross-browser compatibility
 */
var prefixes = ['webkit', 'moz', 'ms'];
var prefixCache = {};
function getPrefixedName(name) {
    if (prefixCache[name]) {
        return prefixCache[name];
    }
    var divStyle = createStyle();
    if (name in divStyle) {
        return (prefixCache[name] = name);
    }
    var capName = name[0].toUpperCase() + name.slice(1);
    var i = prefixes.length;
    while (i--) {
        var prefixedName = "".concat(prefixes[i]).concat(capName);
        if (prefixedName in divStyle) {
            return (prefixCache[name] = prefixedName);
        }
    }
}
/**
 * Gets a style value expected to be a number
 */
function getCSSNum(name, style) {
    return parseFloat(style[getPrefixedName(name)]) || 0;
}
function getBoxStyle(elem, name, style) {
    if (style === void 0) { style = window.getComputedStyle(elem); }
    // Support: FF 68+
    // Firefox requires specificity for border
    var suffix = name === 'border' ? 'Width' : '';
    return {
        left: getCSSNum("".concat(name, "Left").concat(suffix), style),
        right: getCSSNum("".concat(name, "Right").concat(suffix), style),
        top: getCSSNum("".concat(name, "Top").concat(suffix), style),
        bottom: getCSSNum("".concat(name, "Bottom").concat(suffix), style)
    };
}
/**
 * Set a style using the properly prefixed name
 */
function setStyle(elem, name, value) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elem.style[getPrefixedName(name)] = value;
}
/**
 * Constructs the transition from panzoom options
 * and takes care of prefixing the transition and transform
 */
function setTransition(elem, options) {
    var transform = getPrefixedName('transform');
    setStyle(elem, 'transition', "".concat(transform, " ").concat(options.duration, "ms ").concat(options.easing));
}
/**
 * Set the transform using the proper prefix
 *
 * Override the transform setter.
 * This is exposed mostly so the user could
 * set other parts of a transform
 * aside from scale and translate.
 * Default is defined in src/css.ts.
 *
 * ```js
 * // This example always sets a rotation
 * // when setting the scale and translation
 * const panzoom = Panzoom(elem, {
 *   setTransform: (elem, { scale, x, y }) => {
 *     panzoom.setStyle('transform', `rotate(0.5turn) scale(${scale}) translate(${x}px, ${y}px)`)
 *   }
 * })
 * ```
 */
function setTransform(elem, _a, _options) {
    var x = _a.x, y = _a.y, scale = _a.scale, isSVG = _a.isSVG;
    setStyle(elem, 'transform', "scale(".concat(scale, ") translate(").concat(x, "px, ").concat(y, "px)"));
    if (isSVG && isIE) {
        var matrixValue = window.getComputedStyle(elem).getPropertyValue('transform');
        elem.setAttribute('transform', matrixValue);
    }
}
/**
 * Dimensions used in containment and focal point zooming
 */
function getDimensions(elem) {
    var parent = getParentElement(elem);
    var style = window.getComputedStyle(elem);
    var parentStyle = window.getComputedStyle(parent);
    var rectElem = elem.getBoundingClientRect();
    var rectParent = parent.getBoundingClientRect();
    return {
        elem: {
            style: style,
            width: rectElem.width,
            height: rectElem.height,
            top: rectElem.top,
            bottom: rectElem.bottom,
            left: rectElem.left,
            right: rectElem.right,
            margin: getBoxStyle(elem, 'margin', style),
            border: getBoxStyle(elem, 'border', style)
        },
        parent: {
            style: parentStyle,
            width: rectParent.width,
            height: rectParent.height,
            top: rectParent.top,
            bottom: rectParent.bottom,
            left: rectParent.left,
            right: rectParent.right,
            padding: getBoxStyle(parent, 'padding', parentStyle),
            border: getBoxStyle(parent, 'border', parentStyle)
        }
    };
}

/**
 * Determine if an element is attached to the DOM
 * Panzoom requires this so events work properly
 */
function isAttached(node) {
    var currentNode = node;
    while (currentNode && currentNode.parentNode) {
        if (currentNode.parentNode === document)
            return true;
        currentNode =
            currentNode.parentNode instanceof ShadowRoot
                ? currentNode.parentNode.host
                : currentNode.parentNode;
    }
    return false;
}

function getClass(elem) {
    return (elem.getAttribute('class') || '').trim();
}
function hasClass(elem, className) {
    return elem.nodeType === 1 && " ".concat(getClass(elem), " ").indexOf(" ".concat(className, " ")) > -1;
}
function isExcluded(elem, options) {
    for (var cur = elem; cur; cur = getParentElement(cur)) {
        if (hasClass(cur, options.excludeClass) || options.exclude.indexOf(cur) > -1) {
            return true;
        }
    }
    return false;
}

/**
 * Determine if an element is SVG by checking the namespace
 * Exception: the <svg> element itself should be treated like HTML
 */
var rsvg = /^http:[\w\.\/]+svg$/;
function isSVGElement(elem) {
    return rsvg.test(elem.namespaceURI) && elem.nodeName.toLowerCase() !== 'svg';
}

function shallowClone(obj) {
    var clone = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = obj[key];
        }
    }
    return clone;
}

var defaultOptions = {
    animate: false,
    canvas: false,
    cursor: 'move',
    disablePan: false,
    disableZoom: false,
    disableXAxis: false,
    disableYAxis: false,
    duration: 200,
    easing: 'ease-in-out',
    exclude: [],
    excludeClass: 'panzoom-exclude',
    handleStartEvent: function (e) {
        e.preventDefault();
        e.stopPropagation();
    },
    maxScale: 4,
    minScale: 0.125,
    overflow: 'hidden',
    panOnlyWhenZoomed: false,
    pinchAndPan: false,
    relative: false,
    setTransform: setTransform,
    startX: 0,
    startY: 0,
    startScale: 1,
    step: 0.3,
    touchAction: 'none'
};
function Panzoom(elem, options) {
    if (!elem) {
        throw new Error('Panzoom requires an element as an argument');
    }
    if (elem.nodeType !== 1) {
        throw new Error('Panzoom requires an element with a nodeType of 1');
    }
    if (!isAttached(elem)) {
        throw new Error('Panzoom should be called on elements that have been attached to the DOM');
    }
    options = __assign(__assign({}, defaultOptions), options);
    var isSVG = isSVGElement(elem);
    var parent = getParentElement(elem);
    // Set parent styles
    parent.style.overflow = options.overflow;
    parent.style.userSelect = 'none';
    // This is important for mobile to
    // prevent scrolling while panning
    parent.style.touchAction = options.touchAction;
    (options.canvas ? parent : elem).style.cursor = options.cursor;
    // Set element styles
    elem.style.userSelect = 'none';
    elem.style.touchAction = options.touchAction;
    // The default for HTML is '50% 50%'
    // The default for SVG is '0 0'
    // SVG can't be changed in IE
    setStyle(elem, 'transformOrigin', typeof options.origin === 'string' ? options.origin : isSVG ? '0 0' : '50% 50%');
    function resetStyle() {
        parent.style.overflow = '';
        parent.style.userSelect = '';
        parent.style.touchAction = '';
        parent.style.cursor = '';
        elem.style.cursor = '';
        elem.style.userSelect = '';
        elem.style.touchAction = '';
        setStyle(elem, 'transformOrigin', '');
    }
    function setOptions(opts) {
        if (opts === void 0) { opts = {}; }
        for (var key in opts) {
            if (opts.hasOwnProperty(key)) {
                options[key] = opts[key];
            }
        }
        // Handle option side-effects
        if (opts.hasOwnProperty('cursor') || opts.hasOwnProperty('canvas')) {
            parent.style.cursor = elem.style.cursor = '';
            (options.canvas ? parent : elem).style.cursor = options.cursor;
        }
        if (opts.hasOwnProperty('overflow')) {
            parent.style.overflow = opts.overflow;
        }
        if (opts.hasOwnProperty('touchAction')) {
            parent.style.touchAction = opts.touchAction;
            elem.style.touchAction = opts.touchAction;
        }
    }
    var x = 0;
    var y = 0;
    var scale = 1;
    var isPanning = false;
    zoom(options.startScale, { animate: false, force: true });
    // Wait for scale to update
    // for accurate dimensions
    // to constrain initial values
    setTimeout(function () {
        pan(options.startX, options.startY, { animate: false, force: true });
    });
    function trigger(eventName, detail, opts) {
        if (opts.silent) {
            return;
        }
        var event = new CustomEvent(eventName, { detail: detail });
        elem.dispatchEvent(event);
    }
    function setTransformWithEvent(eventName, opts, originalEvent) {
        var value = { x: x, y: y, scale: scale, isSVG: isSVG, originalEvent: originalEvent };
        requestAnimationFrame(function () {
            if (typeof opts.animate === 'boolean') {
                if (opts.animate) {
                    setTransition(elem, opts);
                }
                else {
                    setStyle(elem, 'transition', 'none');
                }
            }
            opts.setTransform(elem, value, opts);
            trigger(eventName, value, opts);
            trigger('panzoomchange', value, opts);
        });
        return value;
    }
    function constrainXY(toX, toY, toScale, panOptions) {
        var opts = __assign(__assign({}, options), panOptions);
        var result = { x: x, y: y, opts: opts };
        if (!opts.force && (opts.disablePan || (opts.panOnlyWhenZoomed && scale === opts.startScale))) {
            return result;
        }
        toX = parseFloat(toX);
        toY = parseFloat(toY);
        if (!opts.disableXAxis) {
            result.x = (opts.relative ? x : 0) + toX;
        }
        if (!opts.disableYAxis) {
            result.y = (opts.relative ? y : 0) + toY;
        }
        if (opts.contain) {
            var dims = getDimensions(elem);
            var realWidth = dims.elem.width / scale;
            var realHeight = dims.elem.height / scale;
            var scaledWidth = realWidth * toScale;
            var scaledHeight = realHeight * toScale;
            var diffHorizontal = (scaledWidth - realWidth) / 2;
            var diffVertical = (scaledHeight - realHeight) / 2;
            if (opts.contain === 'inside') {
                var minX = (-dims.elem.margin.left - dims.parent.padding.left + diffHorizontal) / toScale;
                var maxX = (dims.parent.width -
                    scaledWidth -
                    dims.parent.padding.left -
                    dims.elem.margin.left -
                    dims.parent.border.left -
                    dims.parent.border.right +
                    diffHorizontal) /
                    toScale;
                result.x = Math.max(Math.min(result.x, maxX), minX);
                var minY = (-dims.elem.margin.top - dims.parent.padding.top + diffVertical) / toScale;
                var maxY = (dims.parent.height -
                    scaledHeight -
                    dims.parent.padding.top -
                    dims.elem.margin.top -
                    dims.parent.border.top -
                    dims.parent.border.bottom +
                    diffVertical) /
                    toScale;
                result.y = Math.max(Math.min(result.y, maxY), minY);
            }
            else if (opts.contain === 'outside') {
                var minX = (-(scaledWidth - dims.parent.width) -
                    dims.parent.padding.left -
                    dims.parent.border.left -
                    dims.parent.border.right +
                    diffHorizontal) /
                    toScale;
                var maxX = (diffHorizontal - dims.parent.padding.left) / toScale;
                result.x = Math.max(Math.min(result.x, maxX), minX);
                var minY = (-(scaledHeight - dims.parent.height) -
                    dims.parent.padding.top -
                    dims.parent.border.top -
                    dims.parent.border.bottom +
                    diffVertical) /
                    toScale;
                var maxY = (diffVertical - dims.parent.padding.top) / toScale;
                result.y = Math.max(Math.min(result.y, maxY), minY);
            }
        }
        if (opts.roundPixels) {
            result.x = Math.round(result.x);
            result.y = Math.round(result.y);
        }
        return result;
    }
    function constrainScale(toScale, zoomOptions) {
        var opts = __assign(__assign({}, options), zoomOptions);
        var result = { scale: scale, opts: opts };
        if (!opts.force && opts.disableZoom) {
            return result;
        }
        var minScale = options.minScale;
        var maxScale = options.maxScale;
        if (opts.contain) {
            var dims = getDimensions(elem);
            var elemWidth = dims.elem.width / scale;
            var elemHeight = dims.elem.height / scale;
            if (elemWidth > 1 && elemHeight > 1) {
                var parentWidth = dims.parent.width - dims.parent.border.left - dims.parent.border.right;
                var parentHeight = dims.parent.height - dims.parent.border.top - dims.parent.border.bottom;
                var elemScaledWidth = parentWidth / elemWidth;
                var elemScaledHeight = parentHeight / elemHeight;
                if (options.contain === 'inside') {
                    maxScale = Math.min(maxScale, elemScaledWidth, elemScaledHeight);
                }
                else if (options.contain === 'outside') {
                    minScale = Math.max(minScale, elemScaledWidth, elemScaledHeight);
                }
            }
        }
        result.scale = Math.min(Math.max(toScale, minScale), maxScale);
        return result;
    }
    function pan(toX, toY, panOptions, originalEvent) {
        var result = constrainXY(toX, toY, scale, panOptions);
        // Only try to set if the result is somehow different
        if (x !== result.x || y !== result.y) {
            x = result.x;
            y = result.y;
            return setTransformWithEvent('panzoompan', result.opts, originalEvent);
        }
        return { x: x, y: y, scale: scale, isSVG: isSVG, originalEvent: originalEvent };
    }
    function zoom(toScale, zoomOptions, originalEvent) {
        var result = constrainScale(toScale, zoomOptions);
        var opts = result.opts;
        if (!opts.force && opts.disableZoom) {
            return;
        }
        toScale = result.scale;
        var toX = x;
        var toY = y;
        if (opts.focal) {
            // The difference between the point after the scale and the point before the scale
            // plus the current translation after the scale
            // neutralized to no scale (as the transform scale will apply to the translation)
            var focal = opts.focal;
            toX = (focal.x / toScale - focal.x / scale + x * toScale) / toScale;
            toY = (focal.y / toScale - focal.y / scale + y * toScale) / toScale;
        }
        var panResult = constrainXY(toX, toY, toScale, { relative: false, force: true });
        x = panResult.x;
        y = panResult.y;
        scale = toScale;
        return setTransformWithEvent('panzoomzoom', opts, originalEvent);
    }
    function zoomInOut(isIn, zoomOptions) {
        var opts = __assign(__assign(__assign({}, options), { animate: true }), zoomOptions);
        return zoom(scale * Math.exp((isIn ? 1 : -1) * opts.step), opts);
    }
    function zoomIn(zoomOptions) {
        return zoomInOut(true, zoomOptions);
    }
    function zoomOut(zoomOptions) {
        return zoomInOut(false, zoomOptions);
    }
    function zoomToPoint(toScale, point, zoomOptions, originalEvent) {
        var dims = getDimensions(elem);
        // Instead of thinking of operating on the panzoom element,
        // think of operating on the area inside the panzoom
        // element's parent
        // Subtract padding and border
        var effectiveArea = {
            width: dims.parent.width -
                dims.parent.padding.left -
                dims.parent.padding.right -
                dims.parent.border.left -
                dims.parent.border.right,
            height: dims.parent.height -
                dims.parent.padding.top -
                dims.parent.padding.bottom -
                dims.parent.border.top -
                dims.parent.border.bottom
        };
        // Adjust the clientX/clientY to ignore the area
        // outside the effective area
        var clientX = point.clientX -
            dims.parent.left -
            dims.parent.padding.left -
            dims.parent.border.left -
            dims.elem.margin.left;
        var clientY = point.clientY -
            dims.parent.top -
            dims.parent.padding.top -
            dims.parent.border.top -
            dims.elem.margin.top;
        // Adjust the clientX/clientY for HTML elements,
        // because they have a transform-origin of 50% 50%
        if (!isSVG) {
            clientX -= dims.elem.width / scale / 2;
            clientY -= dims.elem.height / scale / 2;
        }
        // Convert the mouse point from it's position over the
        // effective area before the scale to the position
        // over the effective area after the scale.
        var focal = {
            x: (clientX / effectiveArea.width) * (effectiveArea.width * toScale),
            y: (clientY / effectiveArea.height) * (effectiveArea.height * toScale)
        };
        return zoom(toScale, __assign(__assign({}, zoomOptions), { animate: false, focal: focal }), originalEvent);
    }
    function zoomWithWheel(event, zoomOptions) {
        // Need to prevent the default here
        // or it conflicts with regular page scroll
        event.preventDefault();
        var opts = __assign(__assign(__assign({}, options), zoomOptions), { animate: false });
        // Normalize to deltaX in case shift modifier is used on Mac
        var delta = event.deltaY === 0 && event.deltaX ? event.deltaX : event.deltaY;
        var wheel = delta < 0 ? 1 : -1;
        var toScale = constrainScale(scale * Math.exp((wheel * opts.step) / 3), opts).scale;
        return zoomToPoint(toScale, event, opts, event);
    }
    function reset(resetOptions) {
        var opts = __assign(__assign(__assign({}, options), { animate: true, force: true }), resetOptions);
        scale = constrainScale(opts.startScale, opts).scale;
        var panResult = constrainXY(opts.startX, opts.startY, scale, opts);
        x = panResult.x;
        y = panResult.y;
        return setTransformWithEvent('panzoomreset', opts);
    }
    var origX;
    var origY;
    var startClientX;
    var startClientY;
    var startScale;
    var startDistance;
    var pointers = [];
    function handleDown(event) {
        // Don't handle this event if the target is excluded
        if (isExcluded(event.target, options)) {
            return;
        }
        addPointer(pointers, event);
        isPanning = true;
        options.handleStartEvent(event);
        origX = x;
        origY = y;
        trigger('panzoomstart', { x: x, y: y, scale: scale, isSVG: isSVG, originalEvent: event }, options);
        // This works whether there are multiple
        // pointers or not
        var point = getMiddle(pointers);
        startClientX = point.clientX;
        startClientY = point.clientY;
        startScale = scale;
        startDistance = getDistance(pointers);
    }
    function handleMove(event) {
        if (!isPanning ||
            origX === undefined ||
            origY === undefined ||
            startClientX === undefined ||
            startClientY === undefined) {
            return;
        }
        addPointer(pointers, event);
        var current = getMiddle(pointers);
        var hasMultiple = pointers.length > 1;
        var toScale = scale;
        if (hasMultiple) {
            // A startDistance of 0 means
            // that there weren't 2 pointers
            // handled on start
            if (startDistance === 0) {
                startDistance = getDistance(pointers);
            }
            // Use the distance between the first 2 pointers
            // to determine the current scale
            var diff = getDistance(pointers) - startDistance;
            toScale = constrainScale((diff * options.step) / 80 + startScale).scale;
            zoomToPoint(toScale, current, { animate: false }, event);
        }
        // Pan during pinch if pinchAndPan is true.
        // Note: some calculations may be off because the zoom
        // above has not yet rendered. However, the behavior
        // was removed before the new scale was used in the following
        // pan calculation.
        // See https://github.com/timmywil/panzoom/issues/512
        // and https://github.com/timmywil/panzoom/issues/606
        if (!hasMultiple || options.pinchAndPan) {
            pan(origX + (current.clientX - startClientX) / toScale, origY + (current.clientY - startClientY) / toScale, {
                animate: false
            }, event);
        }
    }
    function handleUp(event) {
        // Don't call panzoomend when panning with 2 touches
        // until both touches end
        if (pointers.length === 1) {
            trigger('panzoomend', { x: x, y: y, scale: scale, isSVG: isSVG, originalEvent: event }, options);
        }
        // Note: don't  remove all pointers
        // Can restart without having to reinitiate all of them
        // Remove the pointer regardless of the isPanning state
        removePointer(pointers, event);
        if (!isPanning) {
            return;
        }
        isPanning = false;
        origX = origY = startClientX = startClientY = undefined;
    }
    var bound = false;
    function bind() {
        if (bound) {
            return;
        }
        bound = true;
        onPointer('down', options.canvas ? parent : elem, handleDown);
        onPointer('move', document, handleMove, { passive: true });
        onPointer('up', document, handleUp, { passive: true });
    }
    function destroy() {
        bound = false;
        destroyPointer('down', options.canvas ? parent : elem, handleDown);
        destroyPointer('move', document, handleMove);
        destroyPointer('up', document, handleUp);
    }
    if (!options.noBind) {
        bind();
    }
    return {
        bind: bind,
        destroy: destroy,
        eventNames: events,
        getPan: function () { return ({ x: x, y: y }); },
        getScale: function () { return scale; },
        getOptions: function () { return shallowClone(options); },
        handleDown: handleDown,
        handleMove: handleMove,
        handleUp: handleUp,
        pan: pan,
        reset: reset,
        resetStyle: resetStyle,
        setOptions: setOptions,
        setStyle: function (name, value) { return setStyle(elem, name, value); },
        zoom: zoom,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        zoomToPoint: zoomToPoint,
        zoomWithWheel: zoomWithWheel
    };
}
Panzoom.defaultOptions = defaultOptions;

class ZoomController {
    constructor(element, options) {
        // Is the controller zoomed in at all?
        this._zoomed = false;
        // Is the controller set to the default zoom/pan settings?
        this._default = true;
        // Should clicks be allowed to propagate, or consumed as a pan/zoom action?
        this._allowClick = true;
        // These values should be suitably less than the value of STEP_DELAY_SECONDS
        // in the ptz_digital action, in order to ensure smooth movements of the
        // digital PTZ actions.
        this._debouncedChangeHandler = throttle(this._changeHandler.bind(this), 50);
        this._debouncedUpdater = throttle(this._updateBasedOnConfig.bind(this), 50);
        this._resizeObserver = new ResizeObserver(this._debouncedUpdater);
        this._events = isHoverableDevice()
            ? {
                down: ['pointerdown'],
                move: ['pointermove'],
                up: ['pointerup', 'pointerleave', 'pointercancel'],
            }
            : {
                down: ['touchstart'],
                move: ['touchmove'],
                up: ['touchend', 'touchcancel'],
            };
        this._downHandler = (ev) => {
            if (this._shouldZoomOrPan(ev)) {
                this._panzoom?.handleDown(ev);
                ev.stopPropagation();
                // If we do not prevent default here, the media carousels scroll.
                ev.preventDefault();
                this._allowClick = false;
            }
            else {
                this._allowClick = true;
            }
        };
        this._clickHandler = (ev) => {
            // When mouse clicking is used to pan, need to avoid that causing a click
            // handler elsewhere in the card being called. Example: Viewing a snapshot,
            // and panning within it should not cause a related clip to play (the click
            // handler in the viewer).
            if (!this._allowClick) {
                ev.stopPropagation();
                // Even though the click is stopped,the card still needs to gain focus so
                // that keyboard shortcuts will work immediately after the card is clicked
                // upon.
                fireAdvancedCameraCardEvent(this._element, 'focus');
            }
            this._allowClick = true;
        };
        this._moveHandler = (ev) => {
            if (this._shouldZoomOrPan(ev)) {
                this._panzoom?.handleMove(ev);
                ev.stopPropagation();
            }
        };
        this._upHandler = (ev) => {
            if (this._shouldZoomOrPan(ev)) {
                this._panzoom?.handleUp(ev);
                ev.stopPropagation();
            }
        };
        this._wheelHandler = (ev) => {
            if (ev instanceof WheelEvent && this._shouldZoomOrPan(ev)) {
                this._panzoom?.zoomWithWheel(ev);
                ev.stopPropagation();
            }
        };
        this._element = element;
        this._settings = options?.config ?? null;
        this._defaultSettings = options?.defaultConfig ?? null;
    }
    activate() {
        const config = this._getConfigToUse();
        const converted = this._convertPercentToXYPan(config?.pan?.x ?? ZOOM_DEFAULT_PAN_X, config?.pan?.y ?? ZOOM_DEFAULT_PAN_Y, config?.zoom ?? ZOOM_DEFAULT_SCALE);
        this._panzoom = Panzoom(this._element, {
            contain: 'outside',
            maxScale: 10,
            minScale: 1,
            noBind: true,
            // Do not force the cursor style (by default it will always show the
            // 'move' type cursor whether or not it is zoomed in).
            cursor: undefined,
            // Disable automatic touchAction setting from Panzoom() as otherwise it
            // effectively disables dashboard scrolling. See:
            // https://github.com/dermotduffy/advanced-camera-card/issues/1181
            touchAction: '',
            // Set the initial pan/zoom values to avoid an initial unzoomed view.
            ...(config && converted && { startX: converted.x }),
            ...(config && converted && { startY: converted.y }),
            ...(config &&
                converted && {
                startScale: config.zoom ??
                    // This is not reachable as without a zoom value, a default of 1 is
                    // assumed in _convertPercentToXYPan, which will return null @
                    // default zoom, and so this cannot be reached in practice.
                    /* istanbul ignore next @preserve */
                    ZOOM_DEFAULT_SCALE,
            }),
        });
        const registerListeners = (events, func, options) => {
            events.forEach((eventName) => {
                this._element.addEventListener(eventName, func, options);
            });
        };
        registerListeners(this._events['down'], this._downHandler, { capture: true });
        registerListeners(this._events['move'], this._moveHandler, { capture: true });
        registerListeners(this._events['up'], this._upHandler, { capture: true });
        registerListeners(['wheel'], this._wheelHandler);
        registerListeners(['click'], this._clickHandler, { capture: true });
        this._resizeObserver.observe(this._element);
        this._element.addEventListener('panzoomchange', this._debouncedChangeHandler);
    }
    deactivate() {
        const unregisterListener = (events, func, options) => {
            events.forEach((eventName) => {
                this._element.removeEventListener(eventName, func, options);
            });
        };
        unregisterListener(this._events['down'], this._downHandler, { capture: true });
        unregisterListener(this._events['move'], this._moveHandler, { capture: true });
        unregisterListener(this._events['up'], this._upHandler, { capture: true });
        unregisterListener(['wheel'], this._wheelHandler);
        unregisterListener(['click'], this._clickHandler, { capture: true });
        this._resizeObserver.disconnect();
        this._element.removeEventListener('panzoomchange', this._debouncedChangeHandler);
    }
    setDefaultSettings(config) {
        this._defaultSettings = config;
        this._debouncedUpdater();
    }
    setSettings(config) {
        this._settings = config;
        this._debouncedUpdater();
    }
    _changeHandler(ev) {
        const pz = ev.detail;
        const unzoomed = this._isUnzoomed(pz.scale);
        // Take care here to only dispatch the zoomed/unzoomed events when the
        // absolute state changes (rather than on every single zoom adjustment).
        if (unzoomed && this._zoomed) {
            this._zoomed = false;
            this._setTouchAction(true);
            fireAdvancedCameraCardEvent(this._element, 'zoom:unzoomed');
        }
        else if (!unzoomed && !this._zoomed) {
            this._zoomed = true;
            this._setTouchAction(false);
            fireAdvancedCameraCardEvent(this._element, 'zoom:zoomed');
        }
        const converted = this._convertXYPanToPercent(pz.x, pz.y, pz.scale);
        const observed = {
            pan: {
                x: converted?.x ?? ZOOM_DEFAULT_PAN_X,
                y: converted?.y ?? ZOOM_DEFAULT_PAN_Y,
            },
            zoom: pz.scale,
            isDefault: this._isAtDefaultZoomAndPan(pz.x, pz.y, pz.scale),
            unzoomed: unzoomed,
        };
        fireAdvancedCameraCardEvent(this._element, 'zoom:change', observed);
    }
    _isZoomEqual(a, b) {
        // The ?? clauses below cannot be reached since this function is only ever
        // used fully specified by this object. It's kept as-is for completeness.
        return (arefloatsApproximatelyEqual(
        /* istanbul ignore next @preserve */
        a.zoom ?? ZOOM_DEFAULT_SCALE, 
        /* istanbul ignore next @preserve */
        b.zoom ?? ZOOM_DEFAULT_SCALE, ZOOM_PRECISION) &&
            arefloatsApproximatelyEqual(
            /* istanbul ignore next @preserve */
            a.pan?.x ?? ZOOM_DEFAULT_PAN_X, 
            /* istanbul ignore next @preserve */
            b.pan?.x ?? ZOOM_DEFAULT_PAN_X, ZOOM_PRECISION) &&
            arefloatsApproximatelyEqual(
            /* istanbul ignore next @preserve */
            a.pan?.y ?? ZOOM_DEFAULT_PAN_Y, 
            /* istanbul ignore next @preserve */
            b.pan?.y ?? ZOOM_DEFAULT_PAN_Y, ZOOM_PRECISION));
    }
    _getConfigToUse() {
        return isZoomEmpty(this._settings) ? this._defaultSettings : this._settings;
    }
    _updateBasedOnConfig() {
        if (!this._panzoom) {
            return;
        }
        const config = this._getConfigToUse();
        const desiredScale = config?.zoom ?? ZOOM_DEFAULT_SCALE;
        // Transform won't exist (will be null) if the element has no dimensions, or
        // if the desired scale has no zoom (i.e. is 1).
        const converted = this._convertPercentToXYPan(config?.pan?.x ?? ZOOM_DEFAULT_PAN_X, config?.pan?.y ?? ZOOM_DEFAULT_PAN_Y, desiredScale);
        const x = converted?.x ?? 0;
        const y = converted?.y ?? 0;
        // Verify there is a material change in the pan/zoom settings before acting.
        if (this._isZoomEqual({ zoom: desiredScale, pan: { x: x, y: y } }, {
            zoom: this._panzoom.getScale(),
            pan: this._panzoom.getPan(),
        })) {
            return;
        }
        this._panzoom.zoom(desiredScale, {
            // Zoom is stepped, not animated. If it is animated, there is interaction
            // between the zoom and the pan below, and the pan would need to be
            // delayed until after the zoom is complete.
            animate: false,
        });
        // Panzoom must allow the browser to paint the zoomed image in order to
        // "contain" the pan within the parent, this creates somewhat of an async
        // situation where we need to ensure the zoom completes first. Using
        // `requestAnimationFrame` appears to reliably allow the zoom to finish
        // rendering first, before the pan is applied.
        //
        // See: https://github.com/timmywil/panzoom?tab=readme-ov-file#a-note-on-the-async-nature-of-panzoom
        window.requestAnimationFrame(() => {
            // On slow Android WebView devices, the zoom transform may not have fully
            // painted by the time this callback runs. Panzoom's contain logic would
            // then clip the pan to incorrect bounds. Temporarily disable containment
            // for this programmatic pan, then restore it.
            // See: https://github.com/dermotduffy/advanced-camera-card/issues/2223
            this._panzoom?.setOptions({ contain: undefined });
            this._panzoom?.pan(x, y, {
                animate: true,
                duration: 100,
            });
            this._panzoom?.setOptions({ contain: 'outside' });
        });
    }
    /**
     * Convert from Advanced Camera Card pan % values to Panzoom X/Y transformation
     * coordinates.
     * @param x The x translation value.
     * @param y The y translation value.
     * @param scale The desired (not current) scale.
     * @returns An object with x/y pan % values or null on error.
     */
    _convertPercentToXYPan(x, y, scale) {
        const minMax = this._getTransformMinMax(scale, this._panzoom?.getScale());
        if (minMax === null) {
            return null;
        }
        return {
            x: minMax.minX + (minMax.maxX - minMax.minX) * (x / 100),
            y: minMax.minY + (minMax.maxY - minMax.minY) * (y / 100),
        };
    }
    _convertXYPanToPercent(x, y, scale) {
        const minMax = this._getTransformMinMax(scale, this._panzoom?.getScale());
        if (minMax === null) {
            return null;
        }
        return {
            x: ((-x + Math.abs(minMax.minX)) /
                (Math.abs(minMax.maxX) + Math.abs(minMax.minX))) *
                100,
            y: ((-y + Math.abs(minMax.minY)) /
                (Math.abs(minMax.maxY) + Math.abs(minMax.minY))) *
                100,
        };
    }
    _getTransformMinMax(desiredScale, currentScale) {
        const rendered = this._getRenderedSize(currentScale);
        if (!rendered.width || !rendered.height) {
            return null;
        }
        const minX = (rendered.width * (desiredScale - 1)) / desiredScale / 2;
        const minY = (rendered.height * (desiredScale - 1)) / desiredScale / 2;
        if (arefloatsApproximatelyEqual(minX, 0) || arefloatsApproximatelyEqual(minY, 0)) {
            return null;
        }
        return {
            minX: minX,
            maxX: -minX,
            minY: minY,
            maxY: -minY,
        };
    }
    _getRenderedSize(scale) {
        const rect = this._element.getBoundingClientRect();
        return {
            width: rect.width / (scale ?? ZOOM_DEFAULT_SCALE),
            height: rect.height / (scale ?? ZOOM_DEFAULT_SCALE),
        };
    }
    _isUnzoomed(scale) {
        return scale !== undefined && round(scale, ZOOM_PRECISION) <= 1;
    }
    _isAtDefaultZoomAndPan(x, y, scale) {
        if (!this._defaultSettings) {
            return this._isUnzoomed(scale);
        }
        const convertedDefault = this._convertPercentToXYPan(this._defaultSettings.pan?.x ?? ZOOM_DEFAULT_PAN_X, this._defaultSettings.pan?.y ?? ZOOM_DEFAULT_PAN_Y, this._defaultSettings.zoom ?? ZOOM_DEFAULT_SCALE);
        if (!convertedDefault) {
            return true;
        }
        return (arefloatsApproximatelyEqual(x, convertedDefault.x) &&
            arefloatsApproximatelyEqual(y, convertedDefault.y) &&
            arefloatsApproximatelyEqual(scale, this._defaultSettings.zoom ??
                // The ZOOM_DEFAULT_SCALE clause below cannot be reached since when
                // this._defaultConfig.zoom is undefined, convertedDefault will end up
                // null above and this function will have already returned.
                /* istanbul ignore next @preserve */
                ZOOM_DEFAULT_SCALE));
    }
    _shouldZoomOrPan(ev) {
        return (!this._isUnzoomed(this._panzoom?.getScale()) ||
            // TouchEvent does not exist on Firefox on non-touch events. See:
            // https://github.com/dermotduffy/advanced-camera-card/issues/1174
            (window.TouchEvent && ev instanceof TouchEvent && ev.touches.length > 1) ||
            (ev instanceof WheelEvent && ev.ctrlKey));
    }
    _setTouchAction(touchEnabled) {
        this._element.style.touchAction = touchEnabled ? '' : 'none';
    }
}

let AdvancedCameraCardZoomer = class AdvancedCameraCardZoomer extends s {
    constructor() {
        super(...arguments);
        this._zoom = null;
        this._zoomed = false;
        this._zoomHandler = () => (this._zoomed = true);
        this._unzoomHandler = () => (this._zoomed = false);
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('advanced-camera-card:zoom:zoomed', this._zoomHandler);
        this.addEventListener('advanced-camera-card:zoom:unzoomed', this._unzoomHandler);
        // Call for an update to activate.
        this.requestUpdate();
    }
    disconnectedCallback() {
        this._zoom?.deactivate();
        this.removeEventListener('advanced-camera-card:zoom:zoomed', this._zoomHandler);
        this.removeEventListener('advanced-camera-card:zoom:unzoomed', this._unzoomHandler);
        super.disconnectedCallback();
    }
    willUpdate(changedProps) {
        if (changedProps.has('_zoomed')) {
            setOrRemoveAttribute(this, this._zoomed, 'zoomed');
        }
        if (this._zoom) {
            if (changedProps.has('defaultSettings')) {
                this._zoom.setDefaultSettings(this.defaultSettings ?? null);
            }
            // If config is null, make no change to the zoom.
            if (changedProps.has('settings') && this.settings) {
                this._zoom.setSettings(this.settings);
            }
        }
        else {
            // Ensure that the configuration will be set before activation (vs
            // activating in `connectedCallback`).
            this._zoom = new ZoomController(this, {
                config: this.settings,
                defaultConfig: this.defaultSettings,
            });
            this._zoom.activate();
        }
    }
    render() {
        return x ` <slot></slot> `;
    }
    static get styles() {
        return i `
      :host {
        width: 100%;
        height: 100%;
        display: block;
        cursor: auto;
      }
      :host([zoomed]) {
        cursor: move;
      }
    `;
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardZoomer.prototype, "defaultSettings", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardZoomer.prototype, "settings", void 0);
__decorate([
    r()
], AdvancedCameraCardZoomer.prototype, "_zoomed", void 0);
AdvancedCameraCardZoomer = __decorate([
    t('advanced-camera-card-zoomer')
], AdvancedCameraCardZoomer);

export { AdvancedCameraCardZoomer };
//# sourceMappingURL=zoomer-2af85980.js.map
