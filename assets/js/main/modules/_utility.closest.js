/*------------------------------------*\
    _utility - closest function
\*------------------------------------*/

/**
 * $closest - function to find closest element that matches a supplied function
 *      http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/ 
 *
 * Example Usage:
        // Get the "starting point" element
        var srcEl = document.getElementsByClassName('nav__item-3');

        // The element with a class of `.nav` is the wanted element in this case
        // The first parameter for the `closest()` is the starting point
        var nav = closest(srcEl[0], function(el) {
            // Here's the beauty of this function, we have control
            // on the target, here we're using class name `.nav`
            return el.className === 'nav';
        });

        // Now the variable `nav` contains the closest element
        // with a class `.nav`
        console.log(nav);

        // Here the target is given as id, #nav-id
        var nav = closest(srcEl[0], function(el) {
            return el.id === 'nav-id';
        });

        // Here it's the tag <nav>
        var nav = closest(srcEl[0], function(el) {
            return el.tagName.toLowerCase() === 'nav';
        });
 */


vital.u_closest = (function(){

    
    function closest(el, fn){
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    }


    //revealing public methods
    return {
        closest : closest,
    };

}()); //vital.u_closest