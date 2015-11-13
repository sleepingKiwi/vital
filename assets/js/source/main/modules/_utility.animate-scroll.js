/*------------------------------------*\
    _utility - animate scroll
\*------------------------------------*/

/**
 * Animated scrolling to a set position for the window to scroll to over a set time!
 * based on https://gist.github.com/james2doyle/5694700
 */


vital.u_animateScroll = (function(){

    /**
     * PRIVATE
     */
    function _animateScroll() {
        // increment the time
        _currentTime += _increment;
        // find the value with the quadratic in-out easing function
        var val = vital.u_ease.easeInOutQuad(_currentTime, _start, _change, _duration);
        // move the document.body
        move(val);
        // do the animation unless its over
        if (_currentTime < _duration) {
            requestAnimationFrame(_animateScroll);
        } else {
            if (_callback && typeof(_callback) === 'function') {
                // the animation is done so let's callback
                _callback();
            }
        }
    }

    var _start;
    var _change;
    var _currentTime;
    var _increment;
    var _duration;
    var _callback;



    /**
     * PUBLIC
     */
    function findTop(obj){
        //http://www.quirksmode.org/js/findpos.html
        var curleft = 0;
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }

        return [curtop, curleft];

    }

    function position(){
        return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }

    function move(amount){
        document.documentElement.scrollTop = amount;
        document.body.parentNode.scrollTop = amount;
        document.body.scrollTop = amount;
    }

    function to(st, duration, callback){
        
        _start = position();
        _change = st - _start;
        _currentTime = 0;
        _increment = 20;

        _duration = (typeof(duration) === 'undefined') ? 500 : duration;
        _callback = callback;

        _animateScroll();

    }//to();



    //revealing public methods
    return {
        to : to,
        findTop : findTop,
        position : position,
        move : move,
    };

}()); //vital.u_animateScroll