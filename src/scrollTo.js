import * as easing from "@degjs/easing";

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
            totalIterations = Math.ceil(fps*(settings.duration/1000));
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

        if(finalPosition > maxPosition) {
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
        return Math.max(
                    document.documentElement.clientHeight,
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight);
    }

    function animateScroll() {
        
        if (currentIteration < totalIterations) {
            currentIteration++;
        
            var val = Math.round(easingFunction(currentIteration, initialPosition, totalPositionChange, totalIterations));
          
            move(val);
        
            window.requestAnimationFrame(animateScroll);
        } 
    };

    function getEasingFunction() {
        switch(settings.easing) {
            case "easeOut":
                return easing.easeOutCubic;
            case "easeInOut":
                return easing.easeInOutCubic;
            case "easeIn":
                return easing.easeInCubic;
            default:
                return easing.linear;
        }
    }

    init();
}

export default scrollTo;