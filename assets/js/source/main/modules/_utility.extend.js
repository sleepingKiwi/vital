/*------------------------------------*\
    _utility - extend function
\*------------------------------------*/

/**
 * generic function to extend properties of one object onto another..
 * used primarily to merge user defined options into a set of defaults (overwriting defaults where relevant).
 * http://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
 *
 * OBJECT USED AS FIRST ARGUMENT WILL BE MODIFIED.
 **
 * an example of the situation above would look like this:
    
        //this creates a copy of the default options so they aren't overwritten
    var finishedOptions = vital.u_extend.extend( {}, someDefaultOptions );

        //this overwrites any defaults that need to be overwritten from the passed (newer) options
        //it modified the object used as first option...
    vital.u_extend.extend( finishedOptions, someNewOptions );

 *
 */

vital.u_extend = (function(){

    
    function extend( to, from ){
        var prop;
        for (prop in from) {
            if (Object.prototype.hasOwnProperty.call(from, prop)) {
                to[prop] = from[prop];
            }
        }
        return to;
    }//extend


    //revealing public methods
    return {
        extend : extend,
    };

}()); //vital.u_extend