# scrollTo
[![Build Status](https://travis-ci.org/DEGJS/scrollTo.svg?branch=master)](https://travis-ci.org/DEGJS/scrollTo)

ScrollTo is a module that will scroll to a specified element or position on a page with animated movement. It takes advantage of the native [window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) method to ensure smooth animation.

## Demo
You can view a demo of scrollTo [here](http://degjs.github.io/scrollTo/).

## Install
ScrollTo is an ES6 module. Consequently, you'll need an ES6 transpiler ([Babel](https://babeljs.io) is a nice one) as part of your Javascript workflow.

If you're already using NPM for your project, you can install scrollTo with the following command:

```
$ npm install @degjs/scroll-to
```
## Usage
```js
import scrollTo from "@degjs/scroll-to";

/* Scroll to an element with a 1-second, eased-in animation */
let destinationElement = document.querySelector('.some-element');
scrollTo({
    element: destinationElement,
    duration: 1000,
    easing: 'easeIn'
});
```

## Parameters

### options
Type: `Object`

#### options.element
Type: `Element`   
The element to scroll to. This option or the `position` option is required.

#### options.position
Type: `Number`   
The vertical position (in pixels) on the page to scroll to. This option or the `element` option is required.

#### options.duration
Type: `Number` Default: `500`   
The duration (in milliseconds) of the scroll animation. This option is optional.

#### options.easing
Type: `String` Default: `easeOut`   
The easing function for the animation. This option is optional. Valid values are:
+ linear
+ easeIn
+ easeOut
+ easeInOut

## Browser Support
ScrollTo depends on the following browser APIs:
+ [window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) (Note: scrollTo will still technically function if window.requestAnimationFrame is not supported, but the scrolling movement will be instantaneous with no animation)
+ [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

To support legacy browsers, you'll need to include polyfills for the above APIs.