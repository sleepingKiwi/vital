/*------------------------------------*\
    _utility - ease
\*------------------------------------*/

/**
 * Easing utilities from: http://goo.gl/5HLl8
 */
 
vital.u_ease = (function(){


    function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) {
            return c/2*t*t + b;
        }
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    function easeInCubic(t, b, c, d) {
        var tc = (t/=d)*t*t;
        return b+c*(tc);
    }

    function easeInOutQuintic(t, b, c, d) {
        var ts = (t/=d)*t,
        tc = ts*t;
        return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
    }

    //revealing public methods
    return {
        easeInOutQuad : easeInOutQuad,
        easeInCubic : easeInCubic,
        easeInOutQuintic : easeInOutQuintic,
    };

}()); //vital.u_ease