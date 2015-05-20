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
    function _move(amount){
        document.documentElement.scrollTop = amount;
        document.body.parentNode.scrollTop = amount;
        document.body.scrollTop = amount;
    }

    function _position(){
        return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }

    function _animateScroll() {
        // increment the time
        _currentTime += _increment;
        // find the value with the quadratic in-out easing function
        var val = vital.u_ease.easeInOutQuad(_currentTime, _start, _change, _duration);
        // move the document.body
        _move(val);
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
    function to(st, duration, callback){
        
        _start = _position();
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
    };

}()); //vital.u_animateScroll