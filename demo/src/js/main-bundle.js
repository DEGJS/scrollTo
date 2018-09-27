this['main-bundle'] = this['main-bundle'] || {};
this['main-bundle'].js = (function () {
	'use strict';

	function linear(currentIteration, startValue, changeInValue, totalIterations) {
	  return changeInValue * currentIteration / totalIterations + startValue;
	}
	function easeInOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
	  if ((currentIteration /= totalIterations / 2) < 1) {
	    return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
	  }

	  return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
	}
	function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
	  return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
	}
	function easeInCubic(currentIteration, startValue, changeInValue, totalIterations) {
	  return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
	}

	const scrollTo = function (options) {
	  const fps = 60;
	  let currentIteration = 0;
	  let totalIterations;
	  let initialPosition;
	  let totalPositionChange;
	  let easingFunction;
	  let settings;
	  const defaults = {
	    element: null,
	    position: null,
	    duration: 500,
	    easing: 'easeOut'
	  };

	  function init() {
	    settings = Object.assign({}, defaults, options);
	    const finalPosition = getFinalPosition();

	    if (!window.requestAnimationFrame || settings.duration === 0) {
	      move(finalPosition);
	    } else {
	      initialPosition = getInitialPosition();
	      totalIterations = Math.ceil(fps * (settings.duration / 1000));
	      totalPositionChange = finalPosition - initialPosition;
	      easingFunction = getEasingFunction();
	      animateScroll();
	    }
	  }

	  function move(amount) {
	    document.documentElement.scrollTop = amount;
	    document.body.parentNode.scrollTop = amount;
	    document.body.scrollTop = amount;
	  }

	  function getFinalPosition() {
	    let finalPosition = settings.element ? settings.element.offsetTop : settings.position;
	    let viewportHeight = getViewportHeight();
	    let documentHeight = getDocumentHeight();
	    let maxPosition = documentHeight - viewportHeight;

	    if (finalPosition > maxPosition) {
	      finalPosition = maxPosition;
	    }

	    return finalPosition;
	  }

	  function getInitialPosition() {
	    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
	  }

	  function getViewportHeight() {
	    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	  }

	  function getDocumentHeight() {
	    return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
	  }

	  function animateScroll() {
	    if (currentIteration < totalIterations) {
	      currentIteration++;
	      const val = Math.round(easingFunction(currentIteration, initialPosition, totalPositionChange, totalIterations));
	      move(val);
	      window.requestAnimationFrame(animateScroll);
	    }
	  }

	  function getEasingFunction() {
	    switch (settings.easing) {
	      case "easeOut":
	        return easeOutCubic;

	      case "easeInOut":
	        return easeInOutCubic;

	      case "easeIn":
	        return easeInCubic;

	      default:
	        return linear;
	    }
	  }

	  init();
	};

	var demo = function demo() {
	  var examples = {};

	  function init() {
	    examples = {
	      example1: {
	        options: {
	          element: document.querySelector('#example2')
	        }
	      },
	      example2: {
	        options: {
	          element: document.querySelector('#example3'),
	          duration: 3000
	        }
	      },
	      example3: {
	        options: {
	          element: document.querySelector('#example4'),
	          easing: 'easeIn',
	          duration: 1500
	        }
	      },
	      example4: {
	        options: {
	          position: 0
	        }
	      }
	    };
	    document.addEventListener('click', onDocumentClick);
	  }

	  function onDocumentClick(e) {
	    if (e.target.matches('.example__button')) {
	      e.preventDefault();
	      runExample(e.target.closest('.example'));
	    }
	  }

	  function runExample(containerEl) {
	    var example = examples[containerEl.id];
	    scrollTo(example.options);
	  }

	  init();
	};

	var main = demo();

	return main;

}());
